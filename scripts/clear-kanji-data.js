const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function clearKanjiData() {
  try {
    console.log('Clearing ALL kanji data from database...');
    
    const { error: deleteError } = await supabase
      .from('kanji')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
    
    if (deleteError) {
      console.error('Error clearing kanji data:', deleteError);
      return;
    }
    
    console.log('✅ All kanji data cleared successfully');
    
    // Verify it's empty
    const { count, error: countError } = await supabase
      .from('kanji')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Error checking count:', countError);
    } else {
      console.log(`Database now contains: ${count} kanji`);
    }
    
  } catch (error) {
    console.error('Error clearing kanji data:', error);
  }
}

clearKanjiData();
