const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function debugKanjiCountDiscrepancy() {
  try {
    console.log('🔍 Debugging N3 kanji count discrepancy...\n');
    
    // Test different query methods for N3 kanji
    console.log('📊 Testing different N3 kanji queries:\n');
    
    // Method 1: Direct count query
    const { count: directCount, error: directError } = await supabase
      .from('kanji')
      .select('*', { count: 'exact', head: true })
      .eq('jlpt_level', 'N3');
    
    console.log(`1. Direct count query: ${directCount} kanji`);
    if (directError) console.log(`   Error:`, directError);
    
    // Method 2: Fetch all and count
    const { data: allN3, error: fetchError } = await supabase
      .from('kanji')
      .select('id, character, jlpt_level')
      .eq('jlpt_level', 'N3');
    
    console.log(`2. Fetch all and count: ${allN3?.length || 0} kanji`);
    if (fetchError) console.log(`   Error:`, fetchError);
    
    // Method 3: Same query as the app uses (from supabase-data.ts)
    const { data: appStyleQuery, count: appCount, error: appError } = await supabase
      .from('kanji')
      .select('*', { count: 'exact' })
      .eq('jlpt_level', 'N3')
      .order('character')
      .range(0, 999); // Large range to get all
    
    console.log(`3. App-style query: ${appCount} kanji (returned ${appStyleQuery?.length || 0} items)`);
    if (appError) console.log(`   Error:`, appError);
    
    // Method 4: Check for any filtering issues
    const { data: withNulls, error: nullError } = await supabase
      .from('kanji')
      .select('id, character, jlpt_level, meanings, kun_readings, on_readings')
      .eq('jlpt_level', 'N3')
      .limit(5);
    
    if (!nullError && withNulls) {
      console.log(`\n4. Sample N3 kanji data quality:`);
      withNulls.forEach((kanji, i) => {
        const hasNullFields = !kanji.meanings || !kanji.kun_readings || !kanji.on_readings;
        console.log(`   ${i+1}. ${kanji.character} - ${hasNullFields ? 'HAS NULL FIELDS' : 'OK'}`);
        if (hasNullFields) {
          console.log(`      meanings: ${kanji.meanings ? 'OK' : 'NULL'}`);
          console.log(`      kun_readings: ${kanji.kun_readings ? 'OK' : 'NULL'}`);
          console.log(`      on_readings: ${kanji.on_readings ? 'OK' : 'NULL'}`);
        }
      });
    }
    
    // Method 5: Check if there are kanji with different jlpt_level values
    const { data: levelVariations, error: levelError } = await supabase
      .from('kanji')
      .select('jlpt_level')
      .neq('jlpt_level', 'N3')
      .limit(10);
    
    if (!levelError) {
      const uniqueLevels = [...new Set(levelVariations.map(k => k.jlpt_level))];
      console.log(`\n5. Other JLPT levels in database: ${uniqueLevels.join(', ')}`);
    }
    
    // Method 6: Check the exact query pattern the app might be using
    console.log(`\n6. Testing pagination-style queries:`);
    
    // Simulate what the app does for pagination
    const itemsPerPage = 20;
    const maxPages = Math.ceil(367 / itemsPerPage); // Expected pages for 367 kanji
    
    let totalFound = 0;
    let pageCount = 0;
    
    for (let page = 0; page < maxPages && pageCount < 5; page++) {
      const start = page * itemsPerPage;
      const end = start + itemsPerPage - 1;
      
      const { data: pageData, count: pageCount, error: pageError } = await supabase
        .from('kanji')
        .select('character', { count: 'exact' })
        .eq('jlpt_level', 'N3')
        .order('character')
        .range(start, end);
      
      if (!pageError && pageData) {
        totalFound += pageData.length;
        console.log(`   Page ${page + 1}: ${pageData.length} kanji (range ${start}-${end})`);
        
        if (pageData.length === 0) {
          console.log(`   ⚠️  Empty page at ${page + 1}, stopping pagination test`);
          break;
        }
      }
      pageCount++;
    }
    
    console.log(`   Total found through pagination: ${totalFound} kanji`);
    
    // Method 7: Check for any RLS or filtering issues
    const { data: rawQuery, error: rawError } = await supabase
      .rpc('get_kanji_count_by_level', { level_param: 'N3' });
    
    if (rawError) {
      console.log(`\n7. RPC query failed (expected): ${rawError.message}`);
    } else {
      console.log(`\n7. RPC query result: ${rawQuery}`);
    }
    
  } catch (error) {
    console.error('❌ Error debugging kanji count:', error);
  }
}

debugKanjiCountDiscrepancy();
