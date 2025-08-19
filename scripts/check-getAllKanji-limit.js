const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkGetAllKanjiLimit() {
  try {
    console.log('🔍 Checking if getAllKanji() has a limit causing the issue...\n');
    
    // Test the exact getAllKanji() query from the app
    const { data: allKanji, error } = await supabase
      .from('kanji')
      .select('*')
      .order('frequency_rank', { ascending: true });
    
    if (error) {
      console.error('Error:', error);
      return;
    }
    
    console.log(`getAllKanji() returned: ${allKanji.length} kanji`);
    
    // Count by level
    const levelCounts = {};
    allKanji.forEach(k => {
      levelCounts[k.jlpt_level] = (levelCounts[k.jlpt_level] || 0) + 1;
    });
    
    console.log('\nKanji counts by level from getAllKanji():');
    ['N5', 'N4', 'N3', 'N2', 'N1'].forEach(level => {
      console.log(`  ${level}: ${levelCounts[level] || 0}`);
    });
    
    // Check if N3 has exactly 320
    if (levelCounts['N3'] === 320) {
      console.log('\n🎯 FOUND IT! getAllKanji() is only returning 320 N3 kanji');
      
      // Check if there's a default limit
      console.log('\nTesting with explicit high limit...');
      const { data: allKanjiWithLimit, error: limitError } = await supabase
        .from('kanji')
        .select('*')
        .order('frequency_rank', { ascending: true })
        .limit(3000);
      
      if (!limitError) {
        const limitLevelCounts = {};
        allKanjiWithLimit.forEach(k => {
          limitLevelCounts[k.jlpt_level] = (limitLevelCounts[k.jlpt_level] || 0) + 1;
        });
        
        console.log(`With limit(3000): ${allKanjiWithLimit.length} total kanji`);
        console.log(`N3 with limit: ${limitLevelCounts['N3'] || 0}`);
        
        if (limitLevelCounts['N3'] === 367) {
          console.log('🎯 CONFIRMED! The issue is a default row limit in Supabase queries');
        }
      }
    }
    
    // Check the frequency_rank distribution for N3
    const n3Kanji = allKanji.filter(k => k.jlpt_level === 'N3');
    if (n3Kanji.length > 0) {
      const freqRanks = n3Kanji.map(k => k.frequency_rank).sort((a, b) => a - b);
      console.log(`\nN3 frequency_rank range: ${freqRanks[0]} to ${freqRanks[freqRanks.length - 1]}`);
      
      // Check if there's a cutoff at a specific frequency rank
      const maxFreqInResult = Math.max(...freqRanks);
      console.log(`Highest frequency_rank in N3 results: ${maxFreqInResult}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkGetAllKanjiLimit();
