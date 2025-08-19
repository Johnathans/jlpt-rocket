const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// JLPT level mapping
const jlptMapping = {
  5: 'N5',
  4: 'N4', 
  3: 'N3',
  2: 'N2',
  1: 'N1'
};

async function importSingleLevel(targetLevel) {
  try {
    if (!targetLevel || !['N5', 'N4', 'N3', 'N2', 'N1'].includes(targetLevel)) {
      console.error('Please specify a valid JLPT level: N5, N4, N3, N2, or N1');
      console.log('Usage: node import-single-level.js N5');
      return;
    }
    
    console.log(`Importing ${targetLevel} kanji only...`);
    
    // Download kanji data
    console.log('Downloading kanji data...');
    const response = await fetch('https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json');
    const kanjiData = await response.json();
    
    // Find the corresponding jlpt_new value for our target level
    const targetJlptNew = Object.keys(jlptMapping).find(key => jlptMapping[key] === targetLevel);
    
    // Process only the target level
    const levelKanji = [];
    let processedCount = 0;
    
    for (const [character, data] of Object.entries(kanjiData)) {
      // Only process kanji for the target level
      if (data.jlpt_new != targetJlptNew) continue;
      
      const kanjiEntry = {
        character: character,
        meaning: (data.meanings && data.meanings.length > 0) ? data.meanings[0] : '',
        on_reading: data.readings_on || [],
        kun_reading: data.readings_kun || [],
        jlpt_level: targetLevel,
        frequency_rank: data.freq || 9999,
        stroke_count: data.strokes || 0,
        radical: ''
      };
      
      levelKanji.push(kanjiEntry);
      processedCount++;
    }
    
    console.log(`Found ${levelKanji.length} ${targetLevel} kanji to import`);
    
    if (levelKanji.length === 0) {
      console.log('No kanji found for this level');
      return;
    }
    
    // Delete existing kanji for this level first
    console.log(`Deleting existing ${targetLevel} kanji...`);
    const { error: deleteError } = await supabase
      .from('kanji')
      .delete()
      .eq('jlpt_level', targetLevel);
    
    if (deleteError) {
      console.error(`Error deleting existing ${targetLevel} kanji:`, deleteError);
      return;
    }
    
    // Upload in small batches
    console.log(`Uploading ${levelKanji.length} ${targetLevel} kanji...`);
    const batchSize = 50;
    let successCount = 0;
    
    for (let i = 0; i < levelKanji.length; i += batchSize) {
      const batch = levelKanji.slice(i, i + batchSize);
      
      const { error: insertError } = await supabase
        .from('kanji')
        .insert(batch);
      
      if (insertError) {
        console.error(`Error inserting batch ${Math.floor(i/batchSize) + 1}:`, insertError);
      } else {
        successCount += batch.length;
        console.log(`Uploaded batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(levelKanji.length/batchSize)}`);
      }
    }
    
    console.log(`✅ Successfully uploaded ${successCount}/${levelKanji.length} ${targetLevel} kanji`);
    
    // Verify the import
    const { count, error: countError } = await supabase
      .from('kanji')
      .select('*', { count: 'exact', head: true })
      .eq('jlpt_level', targetLevel);
    
    if (countError) {
      console.error('Error verifying count:', countError);
    } else {
      console.log(`Verification: ${count} ${targetLevel} kanji in database`);
    }
    
    // Show sample kanji
    const { data: sampleKanji, error: sampleError } = await supabase
      .from('kanji')
      .select('character, meaning, frequency_rank')
      .eq('jlpt_level', targetLevel)
      .order('frequency_rank', { ascending: true })
      .limit(5);
    
    if (!sampleError && sampleKanji.length > 0) {
      console.log(`\nSample ${targetLevel} kanji:`);
      sampleKanji.forEach((k, i) => {
        console.log(`${i+1}. ${k.character} (${k.meaning}) - freq: ${k.frequency_rank}`);
      });
    }
    
  } catch (error) {
    console.error('Error importing single level:', error);
  }
}

// Get target level from command line argument
const targetLevel = process.argv[2];
importSingleLevel(targetLevel);
