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

async function analyzeMissingExamples() {
  try {
    console.log('🔍 Analyzing kanji without examples...\n');
    
    // Load the generated examples
    const examplesPath = path.join(process.cwd(), 'public', 'data', 'kanji-examples.json');
    const kanjiExamples = JSON.parse(fs.readFileSync(examplesPath, 'utf8'));
    
    // Check N2 missing examples
    console.log('📊 N2 Analysis:');
    const { data: n2Kanji } = await supabase
      .from('kanji')
      .select('*')
      .eq('jlpt_level', 'N2')
      .order('frequency_rank', { ascending: true });
    
    const n2Missing = n2Kanji.filter(k => !kanjiExamples[k.character] || kanjiExamples[k.character].length === 0);
    console.log(`Missing examples: ${n2Missing.length}/367 kanji`);
    
    if (n2Missing.length > 0) {
      console.log('Sample N2 kanji without examples:');
      n2Missing.slice(0, 10).forEach(k => {
        console.log(`  ${k.character} (${k.meaning}) - freq: ${k.frequency_rank}`);
      });
    }
    
    // Check N1 missing examples
    console.log('\n📊 N1 Analysis:');
    const { data: n1Kanji } = await supabase
      .from('kanji')
      .select('*')
      .eq('jlpt_level', 'N1')
      .order('frequency_rank', { ascending: true })
      .limit(1000); // We only processed 1000 N1 kanji
    
    const n1Missing = n1Kanji.filter(k => !kanjiExamples[k.character] || kanjiExamples[k.character].length === 0);
    console.log(`Missing examples: ${n1Missing.length}/1000 kanji (of 1232 total)`);
    
    if (n1Missing.length > 0) {
      console.log('Sample N1 kanji without examples:');
      n1Missing.slice(0, 10).forEach(k => {
        console.log(`  ${k.character} (${k.meaning}) - freq: ${k.frequency_rank}`);
      });
    }
    
    // Check if these kanji appear in any vocabulary at all
    console.log('\n🔍 Checking if missing kanji appear in vocabulary words...');
    
    // Get all vocabulary to check
    let allVocab = [];
    const chunkSize = 1000;
    let offset = 0;
    
    while (true) {
      const { data: chunk } = await supabase
        .from('vocabulary')
        .select('word, kanji_used')
        .order('id', { ascending: true })
        .range(offset, offset + chunkSize - 1);
      
      if (!chunk || chunk.length === 0) break;
      allVocab = allVocab.concat(chunk);
      offset += chunkSize;
      if (chunk.length < chunkSize) break;
    }
    
    // Check a few missing kanji
    const testKanji = [...n2Missing.slice(0, 3), ...n1Missing.slice(0, 3)];
    
    testKanji.forEach(kanji => {
      // Check if kanji appears in vocabulary words (not just kanji_used array)
      const vocabWithKanji = allVocab.filter(v => v.word && v.word.includes(kanji.character));
      const vocabInKanjiUsed = allVocab.filter(v => v.kanji_used && v.kanji_used.includes(kanji.character));
      
      console.log(`\n${kanji.character} (${kanji.meaning}):`);
      console.log(`  Appears in ${vocabWithKanji.length} vocabulary words`);
      console.log(`  Listed in ${vocabInKanjiUsed.length} kanji_used arrays`);
      
      if (vocabWithKanji.length > 0 && vocabInKanjiUsed.length === 0) {
        console.log(`  ⚠️  Found in words but missing from kanji_used arrays!`);
        console.log(`  Sample words: ${vocabWithKanji.slice(0, 3).map(v => v.word).join(', ')}`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

analyzeMissingExamples();
