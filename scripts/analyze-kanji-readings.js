const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function analyzeKanjiReadings() {
  console.log('Analyzing kanji readings...\n');

  // Fetch all N5 kanji (start with the basics)
  const { data: kanjiList, error } = await supabase
    .from('kanji')
    .select('*')
    .eq('jlpt_level', 'N5')
    .order('frequency_rank', { ascending: true });

  if (error) {
    console.error('Error fetching kanji:', error);
    return;
  }

  console.log(`Found ${kanjiList.length} N5 kanji\n`);
  console.log('Character | Meaning | Kun Reading | On Reading | Examples');
  console.log('----------|---------|-------------|------------|----------');

  for (const kanji of kanjiList) {
    const kunReadings = kanji.kun_reading?.join(', ') || 'none';
    const onReadings = kanji.on_reading?.join(', ') || 'none';
    const exampleReading = kanji.examples?.[0]?.reading || 'none';
    
    console.log(`${kanji.character.padEnd(9)} | ${kanji.meaning.padEnd(20).substring(0, 20)} | ${kunReadings.padEnd(11)} | ${onReadings.padEnd(10)} | ${exampleReading}`);
  }

  console.log('\n\nAnalysis Summary:');
  console.log('================');
  
  let kunPrimaryCount = 0;
  let onPrimaryCount = 0;
  let noKunCount = 0;
  
  for (const kanji of kanjiList) {
    if (!kanji.kun_reading || kanji.kun_reading.length === 0) {
      noKunCount++;
      console.log(`\n${kanji.character} (${kanji.meaning}): NO KUN'YOMI - must use on'yomi: ${kanji.on_reading?.[0]}`);
    } else if (kanji.examples && kanji.examples.length > 0) {
      const exampleReading = kanji.examples[0].reading;
      const usesKun = kanji.kun_reading.some(r => exampleReading.includes(r));
      const usesOn = kanji.on_reading?.some(r => exampleReading.includes(r));
      
      if (usesKun) {
        kunPrimaryCount++;
      } else if (usesOn) {
        onPrimaryCount++;
      }
    }
  }
  
  console.log(`\nKanji with kun'yomi as primary: ${kunPrimaryCount}`);
  console.log(`Kanji with on'yomi as primary: ${onPrimaryCount}`);
  console.log(`Kanji with no kun'yomi: ${noKunCount}`);
  console.log(`\nRecommendation: Use kun'yomi[0] as default, fallback to on'yomi[0] if no kun'yomi exists`);
}

analyzeKanjiReadings().catch(console.error);
