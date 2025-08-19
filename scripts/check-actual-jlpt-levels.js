const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkActualJLPTLevels() {
  try {
    console.log('Checking actual JLPT level assignments in database...');
    
    // Get sample kanji from each level to verify they're correct
    const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
    
    for (const level of levels) {
      console.log(`\n=== ${level} Sample Kanji ===`);
      
      const { data: kanji, error } = await supabase
        .from('kanji')
        .select('character, meaning, frequency_rank')
        .eq('jlpt_level', level)
        .order('frequency_rank', { ascending: true })
        .limit(10);
      
      if (error) {
        console.error(`Error fetching ${level}:`, error);
        continue;
      }
      
      if (kanji.length === 0) {
        console.log(`No kanji found for ${level}`);
        continue;
      }
      
      console.log(`Count: ${kanji.length} (showing first 10)`);
      kanji.forEach((k, i) => {
        console.log(`${i+1}. ${k.character} (${k.meaning}) - freq: ${k.frequency_rank}`);
      });
    }
    
    // Check if N5 has the expected basic kanji
    console.log('\n=== Verifying N5 Basic Kanji ===');
    const basicKanji = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    
    for (const char of basicKanji) {
      const { data, error } = await supabase
        .from('kanji')
        .select('jlpt_level')
        .eq('character', char)
        .single();
      
      if (error) {
        console.log(`${char}: NOT FOUND`);
      } else {
        console.log(`${char}: ${data.jlpt_level}`);
      }
    }
    
  } catch (error) {
    console.error('Error checking JLPT levels:', error);
  }
}

checkActualJLPTLevels();
