const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testKanjiExamples() {
  try {
    console.log('🔍 Testing kanji examples logic...\n');
    
    // Get a few N3 kanji to test
    const { data: n3Kanji, error: kanjiError } = await supabase
      .from('kanji')
      .select('*')
      .eq('jlpt_level', 'N3')
      .limit(5);
    
    if (kanjiError) {
      console.error('Error fetching kanji:', kanjiError);
      return;
    }
    
    // Get all vocabulary
    const { data: allVocab, error: vocabError } = await supabase
      .from('vocabulary')
      .select('*');
    
    if (vocabError) {
      console.error('Error fetching vocabulary:', vocabError);
      return;
    }
    
    console.log(`Total vocabulary entries: ${allVocab.length}`);
    console.log(`Testing with ${n3Kanji.length} N3 kanji:\n`);
    
    n3Kanji.forEach(kanji => {
      console.log(`\n📝 Testing kanji: ${kanji.character} (${kanji.meaning})`);
      
      // Find vocabulary examples that use this kanji
      const examples = allVocab
        .filter(vocab => {
          // Check if kanji_used array includes this kanji character
          return vocab.kanji_used && vocab.kanji_used.includes(kanji.character);
        })
        .slice(0, 5) // Show up to 5 examples for testing
        .map(vocab => ({
          word: vocab.word,
          reading: vocab.reading,
          meaning: vocab.meaning,
          level: vocab.jlpt_level
        }));
      
      console.log(`  Found ${examples.length} examples:`);
      
      if (examples.length === 0) {
        console.log('  ❌ No examples found');
        
        // Debug: check if any vocabulary contains this kanji in the word itself
        const wordMatches = allVocab.filter(vocab => vocab.word && vocab.word.includes(kanji.character));
        console.log(`  Debug: ${wordMatches.length} vocabulary words contain this kanji character`);
        
        if (wordMatches.length > 0) {
          console.log('  Sample words containing this kanji:');
          wordMatches.slice(0, 3).forEach(vocab => {
            console.log(`    ${vocab.word} (${vocab.reading}) - kanji_used: ${JSON.stringify(vocab.kanji_used)}`);
          });
        }
      } else {
        examples.forEach(example => {
          console.log(`    ${example.word} (${example.reading}) - ${example.meaning} [${example.level}]`);
        });
      }
    });
    
    // Check kanji_used field structure
    console.log('\n🔍 Checking kanji_used field structure:');
    const sampleVocab = allVocab.slice(0, 5);
    sampleVocab.forEach(vocab => {
      console.log(`${vocab.word}: kanji_used = ${JSON.stringify(vocab.kanji_used)} (type: ${typeof vocab.kanji_used})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testKanjiExamples();
