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

async function generateKanjiExamplesByLevel() {
  try {
    console.log('📝 Generating kanji examples level by level...\n');
    
    const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
    const allKanjiExamples = {};
    
    // Get all vocabulary once (we'll use it for all levels)
    console.log('Fetching all vocabulary...');
    const { count: totalVocab } = await supabase
      .from('vocabulary')
      .select('*', { count: 'exact', head: true });
    
    // Fetch vocabulary in chunks to avoid limits
    let allVocab = [];
    const chunkSize = 1000;
    let offset = 0;
    
    while (true) {
      const { data: chunk, error: chunkError } = await supabase
        .from('vocabulary')
        .select('*')
        .order('id', { ascending: true })
        .range(offset, offset + chunkSize - 1);
      
      if (chunkError) {
        console.error('Error fetching vocabulary chunk:', chunkError);
        break;
      }
      
      if (!chunk || chunk.length === 0) break;
      
      allVocab = allVocab.concat(chunk);
      offset += chunkSize;
      console.log(`  Fetched ${allVocab.length} vocabulary entries...`);
      
      if (chunk.length < chunkSize) break;
    }
    
    
    console.log(`Using ${allVocab.length} vocabulary entries\n`);
    
    // Process each level
    for (const level of levels) {
      console.log(`🔄 Processing ${level} kanji...`);
      
      // Get kanji for this level
      const { data: levelKanji, error: kanjiError } = await supabase
        .from('kanji')
        .select('*')
        .eq('jlpt_level', level)
        .order('frequency_rank', { ascending: true });
      
      if (kanjiError) {
        console.error(`Error fetching ${level} kanji:`, kanjiError);
        continue;
      }
      
      console.log(`  Found ${levelKanji.length} ${level} kanji`);
      
      // Generate examples for this level's kanji
      let examplesFound = 0;
      levelKanji.forEach(kanji => {
        const examples = allVocab
          .filter(vocab => vocab.kanji_used && vocab.kanji_used.includes(kanji.character))
          .sort((a, b) => (a.frequency_rank || 9999) - (b.frequency_rank || 9999))
          .slice(0, 2)
          .map(vocab => ({
            word: vocab.word,
            reading: vocab.reading,
            meaning: vocab.meaning
          }));
        
        allKanjiExamples[kanji.character] = examples;
        if (examples.length > 0) examplesFound++;
      });
      
      console.log(`  Generated examples for ${examplesFound}/${levelKanji.length} kanji`);
      
      // Save progress after each level
      const outputPath = path.join(process.cwd(), 'public', 'data', 'kanji-examples.json');
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(outputPath, JSON.stringify(allKanjiExamples, null, 2));
      console.log(`  ✅ Saved progress for ${level}\n`);
    }
    
    console.log(`✅ Generated ${path.join(process.cwd(), 'public', 'data', 'kanji-examples.json')}`);
    console.log(`📊 Examples for ${Object.keys(allKanjiExamples).length} kanji characters`);
    
    // Show stats by level
    console.log('\n📈 Examples by level:');
    for (const level of levels) {
      const { data: levelKanji } = await supabase
        .from('kanji')
        .select('character')
        .eq('jlpt_level', level);
      
      if (levelKanji) {
        const withExamples = levelKanji.filter(k => 
          allKanjiExamples[k.character] && allKanjiExamples[k.character].length > 0
        ).length;
        
        console.log(`  ${level}: ${withExamples}/${levelKanji.length} kanji have examples`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

generateKanjiExamplesByLevel();
