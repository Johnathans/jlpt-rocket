const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkKanjiCounts() {
  try {
    console.log('🔍 Checking kanji counts across all JLPT levels...\n');
    
    // Expected counts from kanji-data repository
    const expectedCounts = {
      'N5': 79,
      'N4': 166,
      'N3': 367,
      'N2': 367,
      'N1': 1232
    };
    
    const totalExpected = Object.values(expectedCounts).reduce((a, b) => a + b, 0);
    
    console.log('📊 Expected kanji counts:');
    Object.entries(expectedCounts).forEach(([level, count]) => {
      console.log(`  ${level}: ${count} kanji`);
    });
    console.log(`  Total: ${totalExpected} kanji\n`);
    
    // Get actual counts
    const actualCounts = {};
    let totalActual = 0;
    
    for (const level of Object.keys(expectedCounts)) {
      const { count, error } = await supabase
        .from('kanji')
        .select('*', { count: 'exact', head: true })
        .eq('jlpt_level', level);
      
      if (error) {
        console.error(`Error counting ${level}:`, error);
        actualCounts[level] = 'ERROR';
      } else {
        actualCounts[level] = count;
        totalActual += count;
      }
    }
    
    console.log('📊 Actual kanji counts:');
    Object.entries(actualCounts).forEach(([level, count]) => {
      const expected = expectedCounts[level];
      const status = count === expected ? '✅' : count === 0 ? '❌ MISSING' : '⚠️ MISMATCH';
      console.log(`  ${level}: ${count} kanji (expected ${expected}) ${status}`);
    });
    console.log(`  Total: ${totalActual} kanji (expected ${totalExpected})\n`);
    
    // Check for missing levels
    const missingLevels = Object.entries(actualCounts)
      .filter(([level, count]) => count === 0)
      .map(([level]) => level);
    
    if (missingLevels.length > 0) {
      console.log(`❌ Missing kanji data for levels: ${missingLevels.join(', ')}`);
    }
    
    // Check for mismatched levels
    const mismatchedLevels = Object.entries(actualCounts)
      .filter(([level, count]) => count !== 0 && count !== expectedCounts[level])
      .map(([level, count]) => ({ level, actual: count, expected: expectedCounts[level] }));
    
    if (mismatchedLevels.length > 0) {
      console.log('⚠️ Mismatched kanji counts:');
      mismatchedLevels.forEach(({ level, actual, expected }) => {
        console.log(`  ${level}: Got ${actual}, expected ${expected} (difference: ${actual - expected})`);
      });
    }
    
    // Sample kanji from each level that has data
    console.log('\n📝 Sample kanji from each level:');
    for (const level of Object.keys(expectedCounts)) {
      if (actualCounts[level] > 0) {
        const { data: samples, error: sampleError } = await supabase
          .from('kanji')
          .select('character, meanings, kun_readings, on_readings')
          .eq('jlpt_level', level)
          .limit(3);
        
        if (!sampleError && samples.length > 0) {
          console.log(`\n${level} (${actualCounts[level]} total):`);
          samples.forEach(kanji => {
            console.log(`  - ${kanji.character}: ${kanji.meanings?.join(', ') || 'no meanings'}`);
          });
        }
      } else {
        console.log(`\n${level}: NO DATA FOUND`);
      }
    }
    
    return { expectedCounts, actualCounts, missingLevels, mismatchedLevels };
    
  } catch (error) {
    console.error('❌ Error checking kanji counts:', error);
  }
}

checkKanjiCounts();
