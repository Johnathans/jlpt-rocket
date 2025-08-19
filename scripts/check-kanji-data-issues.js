const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkKanjiDataIssues() {
  try {
    console.log('🔍 Checking what causes kanji filtering...\n');
    
    // Get N3 kanji data
    const { data: n3Kanji, error } = await supabase
      .from('kanji')
      .select('*')
      .eq('jlpt_level', 'N3');
    
    if (error) {
      console.error('Error fetching N3 kanji:', error);
      return;
    }
    
    console.log(`📊 Total N3 kanji in database: ${n3Kanji.length}`);
    
    // Check for various data quality issues
    const issues = {
      nullMeaning: n3Kanji.filter(k => !k.meaning || k.meaning === null),
      emptyMeaning: n3Kanji.filter(k => k.meaning === ''),
      nullKunReading: n3Kanji.filter(k => !k.kun_reading || k.kun_reading === null),
      nullOnReading: n3Kanji.filter(k => !k.on_reading || k.on_reading === null),
      emptyKunReading: n3Kanji.filter(k => Array.isArray(k.kun_reading) && k.kun_reading.length === 0),
      emptyOnReading: n3Kanji.filter(k => Array.isArray(k.on_reading) && k.on_reading.length === 0),
      invalidKunReading: n3Kanji.filter(k => k.kun_reading && !Array.isArray(k.kun_reading)),
      invalidOnReading: n3Kanji.filter(k => k.on_reading && !Array.isArray(k.on_reading)),
      nullCharacter: n3Kanji.filter(k => !k.character || k.character === null),
      emptyCharacter: n3Kanji.filter(k => k.character === ''),
    };
    
    console.log('\n🔍 Data quality issues found:');
    Object.entries(issues).forEach(([issue, kanji]) => {
      if (kanji.length > 0) {
        console.log(`  ${issue}: ${kanji.length} kanji`);
        
        // Show samples
        if (kanji.length <= 5) {
          kanji.forEach(k => {
            console.log(`    - ${k.character || 'NULL'}: ${issue}`);
          });
        } else {
          kanji.slice(0, 3).forEach(k => {
            console.log(`    - ${k.character || 'NULL'}: ${issue}`);
          });
          console.log(`    ... and ${kanji.length - 3} more`);
        }
      }
    });
    
    // Check what the UI filtering logic would do
    console.log('\n🔍 Simulating UI filtering logic:');
    
    // The kanji page doesn't seem to have explicit filtering, let's check the data structure
    const validKanji = n3Kanji.filter(kanji => {
      // Check if the kanji would pass basic validation
      return kanji.character && 
             kanji.meaning && 
             kanji.kun_reading && 
             kanji.on_reading &&
             kanji.character.trim() !== '' &&
             kanji.meaning.trim() !== '';
    });
    
    console.log(`Valid kanji after basic checks: ${validKanji.length}`);
    
    // Check if the issue is in the data transformation
    const problematicKanji = n3Kanji.filter(kanji => {
      return !kanji.character || 
             !kanji.meaning || 
             !kanji.kun_reading || 
             !kanji.on_reading ||
             kanji.character.trim() === '' ||
             kanji.meaning.trim() === '';
    });
    
    console.log(`\n❌ Problematic kanji (${problematicKanji.length}):`);
    problematicKanji.slice(0, 10).forEach(kanji => {
      console.log(`  ${kanji.character || 'NULL'}: meaning="${kanji.meaning || 'NULL'}", kun=${JSON.stringify(kanji.kun_reading)}, on=${JSON.stringify(kanji.on_reading)}`);
    });
    
    // Check if there's a difference in the database schema vs expected
    if (n3Kanji.length > 0) {
      const sampleKanji = n3Kanji[0];
      console.log('\n📋 Sample kanji structure:');
      console.log(JSON.stringify(sampleKanji, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Error checking kanji data issues:', error);
  }
}

checkKanjiDataIssues();
