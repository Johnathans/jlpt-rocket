const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// CORRECTED JLPT level mapping
const jlptMapping = {
  5: 'N5', // Easiest level
  4: 'N4', 
  3: 'N3',
  2: 'N2',
  1: 'N1'  // Hardest level
};

async function cleanReimportKanji() {
  try {
    console.log('Starting CLEAN kanji data re-import...');
    
    // Step 1: Clear ALL existing kanji data
    console.log('\n1. Clearing all existing kanji data...');
    const { error: deleteError } = await supabase
      .from('kanji')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows
    
    if (deleteError) {
      console.error('Error clearing kanji data:', deleteError);
      return;
    }
    console.log('✅ All existing kanji data cleared');
    
    // Step 2: Download fresh kanji data
    console.log('\n2. Downloading fresh kanji data from GitHub...');
    const response = await fetch('https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json');
    const kanjiData = await response.json();
    
    console.log(`Downloaded ${Object.keys(kanjiData).length} kanji entries`);
    
    // Step 3: Process and transform the data
    const processedKanji = [];
    let processedCount = 0;
    
    for (const [character, data] of Object.entries(kanjiData)) {
      // Skip if no JLPT level data
      if (!data.jlpt_new) continue;
      
      // Map JLPT level with CORRECTED mapping
      const jlptLevel = jlptMapping[data.jlpt_new];
      if (!jlptLevel) continue;
      
      // Clean and process readings
      const onReadings = data.readings_on || [];
      const kunReadings = data.readings_kun || [];
      
      // Get primary meaning (first one)
      const primaryMeaning = data.meanings && data.meanings.length > 0 ? data.meanings[0] : '';
      
      // Use existing table structure only
      const kanjiEntry = {
        character: character,
        meaning: primaryMeaning,
        on_reading: onReadings,
        kun_reading: kunReadings,
        jlpt_level: jlptLevel,
        frequency_rank: data.freq || 9999,
        stroke_count: data.strokes || 0,
        radical: '' // Keep empty for now
      };
      
      processedKanji.push(kanjiEntry);
      processedCount++;
      
      if (processedCount % 100 === 0) {
        console.log(`Processed ${processedCount} kanji...`);
      }
    }
    
    console.log(`Total processed kanji: ${processedKanji.length}`);
    
    // Step 4: Group by JLPT level
    const kanjiByLevel = {
      N5: [],
      N4: [],
      N3: [],
      N2: [],
      N1: []
    };
    
    processedKanji.forEach(kanji => {
      kanjiByLevel[kanji.jlpt_level].push(kanji);
    });
    
    // Show distribution
    console.log('\n3. JLPT Level Distribution:');
    Object.entries(kanjiByLevel).forEach(([level, kanji]) => {
      console.log(`${level}: ${kanji.length} kanji`);
    });
    
    // Step 5: Upload to Supabase in batches
    console.log('\n4. Uploading kanji data...');
    
    for (const [level, kanji] of Object.entries(kanjiByLevel)) {
      if (kanji.length === 0) continue;
      
      console.log(`\nUploading ${kanji.length} ${level} kanji...`);
      
      // Insert new kanji in batches of 100
      const batchSize = 100;
      for (let i = 0; i < kanji.length; i += batchSize) {
        const batch = kanji.slice(i, i + batchSize);
        
        const { error: insertError } = await supabase
          .from('kanji')
          .insert(batch);
        
        if (insertError) {
          console.error(`Error inserting ${level} kanji batch ${i/batchSize + 1}:`, insertError);
        } else {
          console.log(`Uploaded batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(kanji.length/batchSize)} for ${level}`);
        }
      }
      
      console.log(`✅ Successfully uploaded ${kanji.length} ${level} kanji`);
    }
    
    console.log('\n🎉 Clean kanji data re-import completed!');
    
    // Step 6: Verify final counts
    console.log('\n5. Verifying final counts...');
    for (const level of ['N5', 'N4', 'N3', 'N2', 'N1']) {
      const { count, error } = await supabase
        .from('kanji')
        .select('*', { count: 'exact', head: true })
        .eq('jlpt_level', level);
      
      if (error) {
        console.error(`Error counting ${level}:`, error);
      } else {
        console.log(`${level}: ${count} kanji in database`);
      }
    }
    
  } catch (error) {
    console.error('Error during clean re-import:', error);
  }
}

// Run the script
cleanReimportKanji();
