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

// JLPT level mapping from new JLPT numbers to our format
const jlptMapping = {
  1: 'N5',
  2: 'N4', 
  3: 'N3',
  4: 'N2',
  5: 'N1'
};

async function processKanjiDataSimple() {
  try {
    console.log('Starting kanji data processing (simple version)...');
    
    // Download the kanji data file
    console.log('Downloading kanji data from GitHub...');
    const response = await fetch('https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json');
    const kanjiData = await response.json();
    
    console.log(`Downloaded ${Object.keys(kanjiData).length} kanji entries`);
    
    // Process and transform the data for current table structure
    const processedKanji = [];
    let processedCount = 0;
    
    for (const [character, data] of Object.entries(kanjiData)) {
      // Skip if no JLPT level data
      if (!data.jlpt_new) continue;
      
      // Map JLPT level
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
    
    // Group by JLPT level for batch upload
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
    
    // Upload to Supabase in batches
    for (const [level, kanji] of Object.entries(kanjiByLevel)) {
      if (kanji.length === 0) continue;
      
      console.log(`\nUploading ${kanji.length} ${level} kanji...`);
      
      // Delete existing kanji for this level
      const { error: deleteError } = await supabase
        .from('kanji')
        .delete()
        .eq('jlpt_level', level);
      
      if (deleteError) {
        console.error(`Error deleting existing ${level} kanji:`, deleteError);
        continue;
      }
      
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
    
    console.log('\n🎉 Kanji data processing completed!');
    
    // Print summary
    console.log('\nSummary:');
    Object.entries(kanjiByLevel).forEach(([level, kanji]) => {
      console.log(`${level}: ${kanji.length} kanji`);
    });
    
  } catch (error) {
    console.error('Error processing kanji data:', error);
  }
}

// Run the script
processKanjiDataSimple();
