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

// JLPT level hierarchy (current level and below)
const levelHierarchy = {
  'N5': ['N5'],
  'N4': ['N5', 'N4'],
  'N3': ['N5', 'N4', 'N3'],
  'N2': ['N5', 'N4', 'N3', 'N2'],
  'N1': ['N5', 'N4', 'N3', 'N2', 'N1']
};

// Level priority (current level first, then lower levels)
const levelPriority = {
  'N5': { 'N5': 1 },
  'N4': { 'N4': 1, 'N5': 2 },
  'N3': { 'N3': 1, 'N4': 2, 'N5': 3 },
  'N2': { 'N2': 1, 'N3': 2, 'N4': 3, 'N5': 4 },
  'N1': { 'N1': 1, 'N2': 2, 'N3': 3, 'N4': 4, 'N5': 5 }
};

async function generateLevelFilteredKanjiExamples() {
  try {
    console.log('📝 Generating level-filtered kanji examples JSON file...\n');
    
    // Get all kanji
    const { data: allKanji, error: kanjiError } = await supabase
      .from('kanji')
      .select('*')
      .limit(3000);
    
    if (kanjiError) {
      console.error('Error fetching kanji:', kanjiError);
      return;
    }
    
    // Get all vocabulary in batches
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
        break;
      }
      
      allVocab = allVocab.concat(batch);
      offset += batchSize;
      console.log(`  Fetched ${allVocab.length} vocabulary entries...`);
      
      if (batch.length < batchSize) {
        break;
      }
    }
    
    console.log(`Processing ${allKanji.length} kanji with ${allVocab.length} vocabulary entries...`);
    
    // Create level-specific examples
    const levelFilteredExamples = {};
    
    // Initialize structure for each level
    Object.keys(levelHierarchy).forEach(level => {
      levelFilteredExamples[level] = {};
    });
    
    // Process each kanji for each level
    allKanji.forEach(kanji => {
      Object.keys(levelHierarchy).forEach(userLevel => {
        const allowedLevels = levelHierarchy[userLevel];
        const priorities = levelPriority[userLevel];
        
        // Filter vocabulary to only include allowed levels for this user level
        const relevantVocab = allVocab.filter(vocab => 
          vocab.kanji_used && 
          vocab.kanji_used.includes(kanji.character) &&
          allowedLevels.includes(vocab.jlpt_level)
        );
        
        // Sort by level priority (current level first), then by frequency
        const sortedVocab = relevantVocab.sort((a, b) => {
          const aPriority = priorities[a.jlpt_level] || 999;
          const bPriority = priorities[b.jlpt_level] || 999;
          
          // First sort by level priority
          if (aPriority !== bPriority) {
            return aPriority - bPriority;
          }
          
          // Then sort by frequency rank within the same level
          return (a.frequency_rank || 9999) - (b.frequency_rank || 9999);
        });
        
        // Take ALL examples (not just 2)
        const examples = sortedVocab.map(vocab => ({
          word: vocab.word,
          reading: vocab.reading,
          meaning: vocab.meaning,
          level: vocab.jlpt_level
        }));
        
        levelFilteredExamples[userLevel][kanji.character] = examples;
      });
    });
    
    // Write to public directory
    const outputPath = path.join(process.cwd(), 'public', 'data', 'kanji-examples-by-level.json');
    
    // Create directory if it doesn't exist
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(levelFilteredExamples, null, 2));
    
    console.log(`✅ Generated ${outputPath}`);
    
    // Show some stats for each level
    Object.keys(levelFilteredExamples).forEach(level => {
      const examples = levelFilteredExamples[level];
      const withExamples = Object.values(examples).filter(ex => ex.length > 0).length;
      const withoutExamples = Object.keys(examples).length - withExamples;
      
      console.log(`📊 ${level} Level:`);
      console.log(`   - ${withExamples} kanji have examples`);
      console.log(`   - ${withoutExamples} kanji have no examples`);
      
      // Show example of prioritization
      const sampleKanji = Object.keys(examples).find(k => examples[k].length > 1);
      if (sampleKanji) {
        console.log(`   - Sample (${sampleKanji}): ${examples[sampleKanji].map(ex => `${ex.word} (${ex.level})`).join(', ')}`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

generateLevelFilteredKanjiExamples();
