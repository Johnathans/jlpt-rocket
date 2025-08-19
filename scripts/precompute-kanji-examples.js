const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function precomputeKanjiExamples() {
  try {
    console.log('🔄 Pre-computing kanji examples...\n');
    
    // Get all kanji
    const { data: allKanji, error: kanjiError } = await supabase
      .from('kanji')
      .select('*')
      .limit(3000);
    
    if (kanjiError) {
      console.error('Error fetching kanji:', kanjiError);
      return;
    }
    
    console.log(`Processing ${allKanji.length} kanji...`);
    
    // Get all vocabulary
    const { data: allVocab, error: vocabError } = await supabase
      .from('vocabulary')
      .select('*')
      .limit(10000);
    
    if (vocabError) {
      console.error('Error fetching vocabulary:', vocabError);
      return;
    }
    
    console.log(`Using ${allVocab.length} vocabulary entries\n`);
    
    // Process in batches to avoid memory issues
    const batchSize = 100;
    const batches = [];
    
    for (let i = 0; i < allKanji.length; i += batchSize) {
      batches.push(allKanji.slice(i, i + batchSize));
    }
    
    console.log(`Processing ${batches.length} batches of ${batchSize} kanji each...\n`);
    
    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];
      console.log(`Processing batch ${batchIndex + 1}/${batches.length}...`);
      
      const updates = batch.map(kanji => {
        // Find vocabulary examples for this kanji
        const examples = allVocab
          .filter(vocab => vocab.kanji_used && vocab.kanji_used.includes(kanji.character))
          .sort((a, b) => (a.frequency_rank || 9999) - (b.frequency_rank || 9999))
          .slice(0, 2) // Top 2 examples
          .map(vocab => ({
            word: vocab.word,
            reading: vocab.reading,
            meaning: vocab.meaning,
            level: vocab.jlpt_level
          }));
        
        return {
          id: kanji.id,
          examples: examples
        };
      });
      
      // Update kanji with examples in batch
      for (const update of updates) {
        const { error: updateError } = await supabase
          .from('kanji')
          .update({ examples: update.examples })
          .eq('id', update.id);
        
        if (updateError) {
          console.error(`Error updating kanji ${update.id}:`, updateError);
        }
      }
      
      console.log(`  ✅ Completed batch ${batchIndex + 1}`);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('\n✅ Pre-computation complete!');
    console.log('Kanji examples are now cached in the database.');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

precomputeKanjiExamples();
