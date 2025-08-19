const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testExactUILogic() {
  try {
    console.log('🔍 Testing exact UI logic from kanji page...\n');
    
    // Simulate the exact same queries the kanji page makes
    console.log('Step 1: getAllKanji() query...');
    const { data: supabaseKanji, error: kanjiError } = await supabase
      .from('kanji')
      .select('*')
      .order('frequency_rank', { ascending: true });
    
    if (kanjiError) {
      console.error('Error fetching kanji:', kanjiError);
      return;
    }
    
    console.log(`Total kanji fetched: ${supabaseKanji.length}`);
    
    console.log('\nStep 2: getVocabularyByLevel() query...');
    const { data: vocabularyData, error: vocabError } = await supabase
      .from('vocabulary')
      .select('*')
      .eq('jlpt_level', 'N3')
      .order('frequency_rank', { ascending: true });
    
    if (vocabError) {
      console.error('Error fetching vocabulary:', vocabError);
      return;
    }
    
    console.log(`N3 vocabulary fetched: ${vocabularyData.length}`);
    
    console.log('\nStep 3: Filter kanji by N3 level...');
    const filteredKanji = supabaseKanji.filter(kanji => kanji.jlpt_level === 'N3');
    console.log(`N3 kanji after filtering: ${filteredKanji.length}`);
    
    console.log('\nStep 4: Transform kanji (exact UI logic)...');
    const transformedKanji = filteredKanji.map(kanji => {
      // Find vocabulary examples that use this kanji
      const examples = vocabularyData
        .filter(vocab => vocab.kanji_used && vocab.kanji_used.includes(kanji.character))
        .slice(0, 2) // Limit to 2 examples
        .map(vocab => ({
          word: vocab.word,
          reading: vocab.reading,
          meaning: vocab.meaning
        }));

      return {
        id: kanji.id,
        kanji: kanji.character,
        meaning: kanji.meaning,
        level: kanji.jlpt_level,
        strokes: kanji.stroke_count,
        examples
      };
    });
    
    console.log(`Transformed kanji: ${transformedKanji.length}`);
    
    // Check if any transformation failed
    const validTransformed = transformedKanji.filter(k => 
      k.id && k.kanji && k.meaning && k.level && k.strokes
    );
    
    console.log(`Valid transformed kanji: ${validTransformed.length}`);
    
    // Check for transformation issues
    const invalidTransformed = transformedKanji.filter(k => 
      !k.id || !k.kanji || !k.meaning || !k.level || !k.strokes
    );
    
    if (invalidTransformed.length > 0) {
      console.log(`\n❌ Invalid transformed kanji: ${invalidTransformed.length}`);
      invalidTransformed.slice(0, 5).forEach(k => {
        console.log(`  - ID: ${k.id}, kanji: ${k.kanji}, meaning: ${k.meaning}, strokes: ${k.strokes}`);
      });
    }
    
    // Check if the issue is in vocabulary filtering
    console.log('\nStep 5: Check vocabulary filtering impact...');
    
    let kanjiWithoutExamples = 0;
    let kanjiWithExamples = 0;
    
    transformedKanji.forEach(kanji => {
      if (kanji.examples.length === 0) {
        kanjiWithoutExamples++;
      } else {
        kanjiWithExamples++;
      }
    });
    
    console.log(`Kanji with examples: ${kanjiWithExamples}`);
    console.log(`Kanji without examples: ${kanjiWithoutExamples}`);
    
    // Check if there's a hidden filter for kanji that must have examples
    if (kanjiWithExamples === 320) {
      console.log(`\n🎯 FOUND IT! The UI might be filtering out kanji without vocabulary examples`);
      
      console.log('\nSample kanji without examples:');
      const withoutExamples = transformedKanji.filter(k => k.examples.length === 0);
      withoutExamples.slice(0, 5).forEach(k => {
        console.log(`  - ${k.kanji}: ${k.meaning} (no vocabulary examples found)`);
      });
    }
    
    // Final check: simulate the exact data that would be cached
    console.log('\nStep 6: Check what gets cached...');
    const cacheData = JSON.stringify(transformedKanji);
    const parsedCache = JSON.parse(cacheData);
    
    console.log(`Cached data length: ${parsedCache.length}`);
    
    if (parsedCache.length !== transformedKanji.length) {
      console.log('❌ JSON serialization issue detected!');
    }
    
  } catch (error) {
    console.error('❌ Error testing UI logic:', error);
  }
}

testExactUILogic();
