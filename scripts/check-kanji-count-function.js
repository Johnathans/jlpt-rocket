const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkKanjiCountFunction() {
  try {
    console.log('🔍 Testing kanji count function used by the app...\n');
    
    // Add the missing getKanjiCountByLevel function to test
    async function getKanjiCountByLevel(level) {
      const { count, error } = await supabase
        .from('kanji')
        .select('*', { count: 'exact', head: true })
        .eq('jlpt_level', level);

      if (error) {
        console.error('Error fetching kanji count:', error);
        throw error;
      }

      return count || 0;
    }
    
    // Test the count function for each level
    const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
    
    console.log('📊 Testing getKanjiCountByLevel function:');
    for (const level of levels) {
      const count = await getKanjiCountByLevel(level);
      console.log(`  ${level}: ${count} kanji`);
    }
    
    // Test the exact same query pattern as the kanji page
    console.log('\n🔍 Testing kanji page query pattern:');
    
    for (const level of levels) {
      // Step 1: Get all kanji (like the page does)
      const { data: allKanji, error: allError } = await supabase
        .from('kanji')
        .select('*')
        .order('frequency_rank', { ascending: true });
      
      if (allError) {
        console.error(`Error fetching all kanji:`, allError);
        continue;
      }
      
      // Step 2: Filter by level (like the page does)
      const filteredKanji = allKanji.filter(kanji => kanji.jlpt_level === level);
      
      console.log(`  ${level}: ${filteredKanji.length} kanji (after client-side filtering)`);
      
      if (level === 'N3' && filteredKanji.length !== 367) {
        console.log(`    ⚠️  N3 discrepancy found!`);
        
        // Check for data quality issues
        const withNullData = filteredKanji.filter(k => 
          !k.meaning || !k.kun_reading || !k.on_reading
        );
        
        console.log(`    Kanji with null data: ${withNullData.length}`);
        
        if (withNullData.length > 0) {
          console.log(`    Sample null data entries:`);
          withNullData.slice(0, 3).forEach(k => {
            console.log(`      ${k.character}: meaning=${!!k.meaning}, kun=${!!k.kun_reading}, on=${!!k.on_reading}`);
          });
        }
        
        // Check for any filtering that might happen in the UI
        const validKanji = filteredKanji.filter(k => 
          k.meaning && k.kun_reading && k.on_reading && 
          k.meaning.trim() !== '' && 
          Array.isArray(k.kun_reading) && Array.isArray(k.on_reading)
        );
        
        console.log(`    Valid kanji after quality filter: ${validKanji.length}`);
        
        if (validKanji.length === 320) {
          console.log(`    🎯 Found the issue! 47 kanji have data quality problems`);
          
          const problemKanji = filteredKanji.filter(k => 
            !k.meaning || !k.kun_reading || !k.on_reading || 
            k.meaning.trim() === '' || 
            !Array.isArray(k.kun_reading) || !Array.isArray(k.on_reading)
          );
          
          console.log(`    Problem kanji details:`);
          problemKanji.slice(0, 10).forEach(k => {
            console.log(`      ${k.character}: meaning="${k.meaning}", kun=${JSON.stringify(k.kun_reading)}, on=${JSON.stringify(k.on_reading)}`);
          });
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Error testing kanji count function:', error);
  }
}

checkKanjiCountFunction();
