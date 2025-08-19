const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testKanjiFetch() {
  try {
    console.log('Testing kanji data fetch...');
    
    // Test basic kanji table query
    console.log('\n1. Testing basic kanji table access...');
    const { data: allKanji, error: allError } = await supabase
      .from('kanji')
      .select('*')
      .limit(5);
    
    if (allError) {
      console.error('Error fetching all kanji:', allError);
    } else {
      console.log(`✅ Successfully fetched ${allKanji.length} kanji`);
      console.log('Sample kanji:', allKanji[0]);
    }
    
    // Test N5 kanji specifically
    console.log('\n2. Testing N5 kanji fetch...');
    const { data: n5Kanji, error: n5Error } = await supabase
      .from('kanji')
      .select('*')
      .eq('jlpt_level', 'N5')
      .limit(10);
    
    if (n5Error) {
      console.error('Error fetching N5 kanji:', n5Error);
    } else {
      console.log(`✅ Successfully fetched ${n5Kanji.length} N5 kanji`);
      if (n5Kanji.length > 0) {
        console.log('Sample N5 kanji:', n5Kanji[0]);
      }
    }
    
    // Test count for each level
    console.log('\n3. Testing kanji counts by level...');
    const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
    
    for (const level of levels) {
      const { count, error } = await supabase
        .from('kanji')
        .select('*', { count: 'exact', head: true })
        .eq('jlpt_level', level);
      
      if (error) {
        console.error(`Error counting ${level} kanji:`, error);
      } else {
        console.log(`${level}: ${count} kanji`);
      }
    }
    
    // Test the exact query used by the app
    console.log('\n4. Testing app-style query...');
    const { data: appStyleKanji, error: appError } = await supabase
      .from('kanji')
      .select('*')
      .eq('jlpt_level', 'N5')
      .order('frequency_rank', { ascending: true })
      .limit(50);
    
    if (appError) {
      console.error('Error with app-style query:', appError);
    } else {
      console.log(`✅ App-style query returned ${appStyleKanji.length} kanji`);
      if (appStyleKanji.length > 0) {
        console.log('First kanji:', {
          character: appStyleKanji[0].character,
          meaning: appStyleKanji[0].meaning,
          jlpt_level: appStyleKanji[0].jlpt_level
        });
      }
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testKanjiFetch();
