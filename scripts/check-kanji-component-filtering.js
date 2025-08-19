const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkKanjiComponentFiltering() {
  try {
    console.log('🔍 Checking if kanji components are filtering based on readings...\n');
    
    // Get all N3 kanji
    const { data: n3Kanji, error } = await supabase
      .from('kanji')
      .select('*')
      .eq('jlpt_level', 'N3');
    
    if (error) {
      console.error('Error:', error);
      return;
    }
    
    console.log(`Total N3 kanji: ${n3Kanji.length}`);
    
    // Check if there's implicit filtering in the UI based on readings
    const kanjiWithEmptyReadings = n3Kanji.filter(k => 
      (Array.isArray(k.kun_reading) && k.kun_reading.length === 0) ||
      (Array.isArray(k.on_reading) && k.on_reading.length === 0)
    );
    
    console.log(`Kanji with empty readings: ${kanjiWithEmptyReadings.length}`);
    
    // Check if React components might be filtering out kanji with empty readings
    const kanjiWithBothReadings = n3Kanji.filter(k => 
      Array.isArray(k.kun_reading) && k.kun_reading.length > 0 &&
      Array.isArray(k.on_reading) && k.on_reading.length > 0
    );
    
    console.log(`Kanji with both kun and on readings: ${kanjiWithBothReadings.length}`);
    
    // Check if there's a pattern where kanji need at least one reading
    const kanjiWithAtLeastOneReading = n3Kanji.filter(k => 
      (Array.isArray(k.kun_reading) && k.kun_reading.length > 0) ||
      (Array.isArray(k.on_reading) && k.on_reading.length > 0)
    );
    
    console.log(`Kanji with at least one reading: ${kanjiWithAtLeastOneReading.length}`);
    
    // Check if the 320 count matches any of these patterns
    if (kanjiWithBothReadings.length === 320) {
      console.log(`\n🎯 FOUND IT! UI is filtering to show only kanji with BOTH kun and on readings`);
      
      console.log('\nKanji being filtered out (missing readings):');
      const filtered = n3Kanji.filter(k => 
        !(Array.isArray(k.kun_reading) && k.kun_reading.length > 0 &&
          Array.isArray(k.on_reading) && k.on_reading.length > 0)
      );
      
      filtered.slice(0, 10).forEach(k => {
        const kunEmpty = !Array.isArray(k.kun_reading) || k.kun_reading.length === 0;
        const onEmpty = !Array.isArray(k.on_reading) || k.on_reading.length === 0;
        console.log(`  ${k.character}: kun=${kunEmpty ? 'EMPTY' : 'OK'}, on=${onEmpty ? 'EMPTY' : 'OK'}`);
      });
    }
    
    if (kanjiWithAtLeastOneReading.length === 320) {
      console.log(`\n🎯 FOUND IT! UI is filtering to show only kanji with at least one reading`);
    }
    
    // Check if there's a React component that might be doing this filtering
    console.log('\n🔍 Checking for potential React filtering patterns...');
    
    // Simulate what might happen in a React component that checks for readings
    const reactFilteredKanji = n3Kanji.filter(kanji => {
      // Common React patterns that might filter kanji
      
      // Pattern 1: Check if readings exist and are not empty
      const hasValidKunReading = kanji.kun_reading && 
                                Array.isArray(kanji.kun_reading) && 
                                kanji.kun_reading.length > 0;
      
      const hasValidOnReading = kanji.on_reading && 
                               Array.isArray(kanji.on_reading) && 
                               kanji.on_reading.length > 0;
      
      // Pattern 2: Require both readings
      return hasValidKunReading && hasValidOnReading;
    });
    
    console.log(`React-style filtering (both readings required): ${reactFilteredKanji.length}`);
    
    // Pattern 3: Check if it's filtering based on rendering issues
    const renderableKanji = n3Kanji.filter(kanji => {
      // Check if the kanji would render properly in the UI
      const canRenderReadings = (kanji.kun_reading && Array.isArray(kanji.kun_reading)) ||
                               (kanji.on_reading && Array.isArray(kanji.on_reading));
      
      return kanji.character && 
             kanji.meaning && 
             kanji.stroke_count > 0 &&
             canRenderReadings;
    });
    
    console.log(`Renderable kanji: ${renderableKanji.length}`);
    
    // Check if there's a specific reading display component that might be filtering
    const kanjiWithDisplayableReadings = n3Kanji.filter(kanji => {
      // Simulate a reading display component that might filter empty arrays
      const kunDisplay = Array.isArray(kanji.kun_reading) && kanji.kun_reading.length > 0 
        ? kanji.kun_reading.join(', ') : null;
      const onDisplay = Array.isArray(kanji.on_reading) && kanji.on_reading.length > 0 
        ? kanji.on_reading.join(', ') : null;
      
      // If a component requires at least one readable reading
      return kunDisplay || onDisplay;
    });
    
    console.log(`Kanji with displayable readings: ${kanjiWithDisplayableReadings.length}`);
    
    if (kanjiWithDisplayableReadings.length === 320) {
      console.log(`\n🎯 FOUND IT! UI component is filtering kanji that have no displayable readings`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkKanjiComponentFiltering();
