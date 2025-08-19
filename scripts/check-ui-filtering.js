const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkUIFiltering() {
  try {
    console.log('🔍 Checking if UI components filter out kanji with empty readings...\n');
    
    // Get N3 kanji
    const { data: n3Kanji, error } = await supabase
      .from('kanji')
      .select('*')
      .eq('jlpt_level', 'N3');
    
    if (error) {
      console.error('Error:', error);
      return;
    }
    
    console.log(`Total N3 kanji: ${n3Kanji.length}`);
    
    // Simulate the exact transformation the kanji page does
    const transformedKanji = n3Kanji.map(kanji => {
      return {
        id: kanji.id,
        kanji: kanji.character,
        meaning: kanji.meaning,
        level: kanji.jlpt_level,
        strokes: kanji.stroke_count,
        examples: [] // We'll ignore examples for this test
      };
    });
    
    console.log(`After transformation: ${transformedKanji.length}`);
    
    // Check if any kanji would be filtered out by common UI patterns
    const withValidMeaning = transformedKanji.filter(k => k.meaning && k.meaning.trim() !== '');
    const withValidCharacter = transformedKanji.filter(k => k.kanji && k.kanji.trim() !== '');
    const withValidStrokes = transformedKanji.filter(k => k.strokes && k.strokes > 0);
    
    console.log(`With valid meaning: ${withValidMeaning.length}`);
    console.log(`With valid character: ${withValidCharacter.length}`);
    console.log(`With valid strokes: ${withValidStrokes.length}`);
    
    // Check the original kanji data for reading issues
    const kanjiWithEmptyKun = n3Kanji.filter(k => !k.kun_reading || k.kun_reading.length === 0);
    const kanjiWithEmptyOn = n3Kanji.filter(k => !k.on_reading || k.on_reading.length === 0);
    
    console.log(`\nKanji with empty kun_reading: ${kanjiWithEmptyKun.length}`);
    console.log(`Kanji with empty on_reading: ${kanjiWithEmptyOn.length}`);
    
    // The missing 47 kanji calculation
    const totalMissing = kanjiWithEmptyKun.length + kanjiWithEmptyOn.length;
    console.log(`\nTotal with reading issues: ${totalMissing}`);
    console.log(`Expected visible: ${367 - totalMissing} (but we see 320)`);
    
    // Let's check if there's overlap
    const kanjiWithBothEmpty = n3Kanji.filter(k => 
      (!k.kun_reading || k.kun_reading.length === 0) && 
      (!k.on_reading || k.on_reading.length === 0)
    );
    
    console.log(`Kanji with both readings empty: ${kanjiWithBothEmpty.length}`);
    
    // Calculate unique kanji with any reading issue
    const kanjiWithAnyReadingIssue = n3Kanji.filter(k => 
      (!k.kun_reading || k.kun_reading.length === 0) || 
      (!k.on_reading || k.on_reading.length === 0)
    );
    
    console.log(`Unique kanji with any reading issue: ${kanjiWithAnyReadingIssue.length}`);
    console.log(`Expected visible after filtering: ${367 - kanjiWithAnyReadingIssue.length}`);
    
    if (367 - kanjiWithAnyReadingIssue.length === 320) {
      console.log(`\n🎯 FOUND IT! The UI is filtering out kanji with empty kun_reading OR on_reading arrays`);
      
      console.log(`\nSample filtered kanji:`);
      kanjiWithAnyReadingIssue.slice(0, 5).forEach(k => {
        const kunEmpty = !k.kun_reading || k.kun_reading.length === 0;
        const onEmpty = !k.on_reading || k.on_reading.length === 0;
        console.log(`  ${k.character}: kun_reading=${kunEmpty ? 'EMPTY' : 'OK'}, on_reading=${onEmpty ? 'EMPTY' : 'OK'}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkUIFiltering();
