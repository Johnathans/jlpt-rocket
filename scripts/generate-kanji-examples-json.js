const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function generateKanjiExamplesJSON() {
  try {
    console.log('📝 Generating static kanji examples JSON file...\n');
    
    // Get all kanji
    const { data: allKanji, error: kanjiError } = await supabase
      .from('kanji')
      .select('*')
      .limit(3000);
    
    if (kanjiError) {
      console.error('Error fetching kanji:', kanjiError);
      return;
    }
    
    // Get all vocabulary in batches to avoid 1000 row limit
    console.log('Fetching all vocabulary in batches...');
    let allVocab = [];
    let offset = 0;
    const batchSize = 1000;
    
    while (true) {
      const { data: batch, error: vocabError } = await supabase
        .from('vocabulary')
        .select('*')
        .range(offset, offset + batchSize - 1)
        .order('id');
      
      if (vocabError) {
        console.error('Error fetching vocabulary batch:', vocabError);
        return;
      }
      
      if (!batch || batch.length === 0) {
        break; // No more data
      }
      
      allVocab = allVocab.concat(batch);
      offset += batchSize;
      console.log(`  Fetched ${allVocab.length} vocabulary entries...`);
      
      if (batch.length < batchSize) {
        break; // Last batch was partial, we're done
      }
    }
    
    console.log(`Processing ${allKanji.length} kanji with ${allVocab.length} vocabulary entries...`);
    
    // Create examples map
    const kanjiExamples = {};
    
    allKanji.forEach(kanji => {
      const examples = allVocab
        .filter(vocab => vocab.kanji_used && vocab.kanji_used.includes(kanji.character))
        .sort((a, b) => (a.frequency_rank || 9999) - (b.frequency_rank || 9999))
        .slice(0, 2)
        .map(vocab => ({
          word: vocab.word,
          reading: vocab.reading,
          meaning: vocab.meaning
        }));
      
      kanjiExamples[kanji.character] = examples;
    });
    
    // Write to public directory
    const outputPath = path.join(process.cwd(), 'public', 'data', 'kanji-examples.json');
    
    // Create directory if it doesn't exist
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(kanjiExamples, null, 2));
    
    console.log(`✅ Generated ${outputPath}`);
    console.log(`📊 Examples for ${Object.keys(kanjiExamples).length} kanji characters`);
    
    // Show some stats
    const withExamples = Object.values(kanjiExamples).filter(examples => examples.length > 0).length;
    const withoutExamples = Object.keys(kanjiExamples).length - withExamples;
    
    console.log(`   - ${withExamples} kanji have examples`);
    console.log(`   - ${withoutExamples} kanji have no examples`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

generateKanjiExamplesJSON();
