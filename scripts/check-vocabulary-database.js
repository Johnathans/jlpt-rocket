const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkVocabularyDatabase() {
  try {
    console.log('🔍 Checking vocabulary database status...\n');
    
    // Get total count
    const { count: totalCount, error: totalError } = await supabase
      .from('vocabulary')
      .select('*', { count: 'exact', head: true });
    
    if (totalError) {
      console.error('Error getting total count:', totalError);
      return;
    }
    
    console.log(`📊 Total vocabulary entries: ${totalCount}`);
    
    // Get counts by level with proper query
    const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
    const levelCounts = {};
    
    for (const level of levels) {
      const { count, error } = await supabase
        .from('vocabulary')
        .select('*', { count: 'exact', head: true })
        .eq('jlpt_level', level);
      
      if (error) {
        console.error(`Error counting ${level}:`, error);
        levelCounts[level] = 'ERROR';
      } else {
        levelCounts[level] = count;
      }
    }
    
    console.log('\n📊 Vocabulary counts by JLPT level:');
    levels.forEach(level => {
      console.log(`  ${level}: ${levelCounts[level]} entries`);
    });
    
    const totalFromLevels = Object.values(levelCounts)
      .filter(count => typeof count === 'number')
      .reduce((a, b) => a + b, 0);
    
    console.log(`  Sum of levels: ${totalFromLevels}`);
    
    if (totalCount !== totalFromLevels) {
      console.log(`⚠️  Discrepancy: Total (${totalCount}) ≠ Sum of levels (${totalFromLevels})`);
      
      // Check for entries with null or unexpected jlpt_level
      const { data: unexpectedLevels, error: unexpectedError } = await supabase
        .from('vocabulary')
        .select('jlpt_level')
        .not('jlpt_level', 'in', '(N1,N2,N3,N4,N5)')
        .limit(10);
      
      if (!unexpectedError && unexpectedLevels.length > 0) {
        console.log('Found entries with unexpected JLPT levels:');
        unexpectedLevels.forEach(item => {
          console.log(`  - jlpt_level: "${item.jlpt_level}"`);
        });
      }
    }
    
    // Sample entries from each level
    console.log('\n✅ Sample entries from each level:');
    for (const level of levels) {
      if (levelCounts[level] > 0) {
        const { data: samples, error: sampleError } = await supabase
          .from('vocabulary')
          .select('word, reading, meaning')
          .eq('jlpt_level', level)
          .limit(2);
        
        if (!sampleError && samples.length > 0) {
          console.log(`\n${level} (${levelCounts[level]} total):`);
          samples.forEach(item => {
            console.log(`  - ${item.word} (${item.reading}) = ${item.meaning}`);
          });
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Error checking vocabulary database:', error);
  }
}

checkVocabularyDatabase();
