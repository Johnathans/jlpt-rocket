const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifyVocabularyQuality() {
  try {
    console.log('🔍 Verifying vocabulary data quality...\n');
    
    // Get counts by level
    const { data: levelCounts, error: countError } = await supabase
      .from('vocabulary')
      .select('jlpt_level')
      .order('jlpt_level');
    
    if (countError) {
      console.error('Error fetching level counts:', countError);
      return;
    }
    
    const counts = levelCounts.reduce((acc, item) => {
      acc[item.jlpt_level] = (acc[item.jlpt_level] || 0) + 1;
      return acc;
    }, {});
    
    console.log('📊 Vocabulary counts by JLPT level:');
    ['N5', 'N4', 'N3', 'N2', 'N1'].forEach(level => {
      console.log(`  ${level}: ${counts[level] || 0} entries`);
    });
    console.log(`  Total: ${Object.values(counts).reduce((a, b) => a + b, 0)} entries\n`);
    
    // Check for reading quality issues
    console.log('🔍 Checking reading quality...');
    
    const { data: readingIssues, error: readingError } = await supabase
      .from('vocabulary')
      .select('word, reading, meaning, jlpt_level')
      .eq('word', 'reading')
      .limit(10);
    
    if (readingError) {
      console.error('Error checking readings:', readingError);
    } else {
      console.log(`Found ${readingIssues.length} entries where word equals reading (should be 0)`);
      if (readingIssues.length > 0) {
        console.log('Sample problematic entries:');
        readingIssues.slice(0, 5).forEach(item => {
          console.log(`  - ${item.word} = ${item.reading} (${item.jlpt_level})`);
        });
      }
    }
    
    // Sample good entries from each level
    console.log('\n✅ Sample vocabulary entries with proper readings:');
    for (const level of ['N5', 'N4', 'N3', 'N2', 'N1']) {
      const { data: samples, error: sampleError } = await supabase
        .from('vocabulary')
        .select('word, reading, meaning')
        .eq('jlpt_level', level)
        .limit(3);
      
      if (!sampleError && samples.length > 0) {
        console.log(`\n${level} samples:`);
        samples.forEach(item => {
          console.log(`  - ${item.word} (${item.reading}) = ${item.meaning}`);
        });
      }
    }
    
    // Check kanji extraction
    console.log('\n🔍 Checking kanji extraction...');
    const { data: kanjiSamples, error: kanjiError } = await supabase
      .from('vocabulary')
      .select('word, kanji_used')
      .not('kanji_used', 'eq', '{}')
      .limit(5);
    
    if (!kanjiError && kanjiSamples.length > 0) {
      console.log('Sample kanji extraction:');
      kanjiSamples.forEach(item => {
        console.log(`  - ${item.word} → kanji: [${item.kanji_used.join(', ')}]`);
      });
    }
    
    console.log('\n✅ Vocabulary quality verification complete!');
    
  } catch (error) {
    console.error('❌ Error verifying vocabulary quality:', error);
  }
}

verifyVocabularyQuality();
