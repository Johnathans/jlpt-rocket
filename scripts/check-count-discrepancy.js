const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkCountDiscrepancy() {
  try {
    console.log('Checking kanji count discrepancy between database and app...');
    
    // Check actual database counts
    console.log('\n=== Database Counts ===');
    const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
    
    for (const level of levels) {
      const { count, error } = await supabase
        .from('kanji')
        .select('*', { count: 'exact', head: true })
        .eq('jlpt_level', level);
      
      if (error) {
        console.error(`Error counting ${level}:`, error);
      } else {
        console.log(`${level}: ${count} kanji in database`);
      }
    }
    
    // Check what the app-style query returns (mimicking the app's data fetching)
    console.log('\n=== App-Style Query Counts (with limits) ===');
    
    for (const level of levels) {
      // Test with different limits to see if there's a constraint
      const { data: unlimited, error: unlimitedError } = await supabase
        .from('kanji')
        .select('*')
        .eq('jlpt_level', level)
        .order('frequency_rank', { ascending: true });
      
      const { data: limited5000, error: limited5000Error } = await supabase
        .from('kanji')
        .select('*')
        .eq('jlpt_level', level)
        .order('frequency_rank', { ascending: true })
        .limit(5000);
      
      const { data: limited1000, error: limited1000Error } = await supabase
        .from('kanji')
        .select('*')
        .eq('jlpt_level', level)
        .order('frequency_rank', { ascending: true })
        .limit(1000);
      
      if (unlimitedError) {
        console.error(`Error fetching unlimited ${level}:`, unlimitedError);
      } else {
        console.log(`${level}: ${unlimited?.length || 0} unlimited | ${limited5000?.length || 0} limit(5000) | ${limited1000?.length || 0} limit(1000)`);
      }
    }
    
    // Check for any data integrity issues
    console.log('\n=== Data Integrity Check ===');
    
    // Check for null or empty jlpt_level
    const { count: nullLevels, error: nullError } = await supabase
      .from('kanji')
      .select('*', { count: 'exact', head: true })
      .is('jlpt_level', null);
    
    if (!nullError) {
      console.log(`Kanji with null jlpt_level: ${nullLevels}`);
    }
    
    // Check for invalid jlpt_level values
    const { data: allLevels, error: allLevelsError } = await supabase
      .from('kanji')
      .select('jlpt_level');
    
    if (!allLevelsError) {
      const levelCounts = {};
      allLevels.forEach(k => {
        const level = k.jlpt_level;
        levelCounts[level] = (levelCounts[level] || 0) + 1;
      });
      
      console.log('\nAll jlpt_level values found:');
      Object.entries(levelCounts).forEach(([level, count]) => {
        console.log(`"${level}": ${count} kanji`);
      });
    }
    
    // Test the exact query pattern used by getKanjiByLevel
    console.log('\n=== Testing getKanjiByLevel Pattern ===');
    
    for (const level of levels) {
      const { data, error } = await supabase
        .from('kanji')
        .select('*')
        .eq('jlpt_level', level)
        .order('frequency_rank', { ascending: true })
        .limit(5000);
      
      if (error) {
        console.error(`getKanjiByLevel error for ${level}:`, error);
      } else {
        console.log(`getKanjiByLevel ${level}: ${data.length} kanji returned`);
      }
    }
    
  } catch (error) {
    console.error('Error checking count discrepancy:', error);
  }
}

checkCountDiscrepancy();
