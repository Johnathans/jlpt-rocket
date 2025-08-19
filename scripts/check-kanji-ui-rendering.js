const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkKanjiUIRendering() {
  try {
    console.log('🔍 Checking if UI components filter kanji during rendering...\n');
    
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
    
    // Simulate the exact transformation from the kanji page
    const transformedKanji = n3Kanji.map(kanji => {
      return {
        id: kanji.id,
        kanji: kanji.character,
        meaning: kanji.meaning,
        level: kanji.jlpt_level,
        strokes: kanji.stroke_count,
        examples: [] // Simplified for testing
      };
    });
    
    console.log(`After transformation: ${transformedKanji.length}`);
    
    // Check if any would fail React rendering due to null/undefined values
    const renderableKanji = transformedKanji.filter(item => {
      // Simulate React component requirements
      return item.id && 
             item.kanji && 
             item.meaning && 
             item.level && 
             item.strokes && 
             item.strokes > 0 &&
             typeof item.kanji === 'string' &&
             typeof item.meaning === 'string' &&
             typeof item.level === 'string' &&
             typeof item.strokes === 'number';
    });
    
    console.log(`Renderable kanji: ${renderableKanji.length}`);
    
    if (renderableKanji.length === 320) {
      console.log(`\n🎯 FOUND IT! UI rendering filters out kanji with invalid data types or values`);
      
      const nonRenderable = transformedKanji.filter(item => {
        return !(item.id && 
                item.kanji && 
                item.meaning && 
                item.level && 
                item.strokes && 
                item.strokes > 0 &&
                typeof item.kanji === 'string' &&
                typeof item.meaning === 'string' &&
                typeof item.level === 'string' &&
                typeof item.strokes === 'number');
      });
      
      console.log(`\nNon-renderable kanji (${nonRenderable.length}):`);
      nonRenderable.slice(0, 10).forEach(item => {
        const issues = [];
        if (!item.id) issues.push('no id');
        if (!item.kanji) issues.push('no kanji');
        if (!item.meaning) issues.push('no meaning');
        if (!item.level) issues.push('no level');
        if (!item.strokes || item.strokes <= 0) issues.push('invalid strokes');
        if (typeof item.kanji !== 'string') issues.push('kanji not string');
        if (typeof item.meaning !== 'string') issues.push('meaning not string');
        if (typeof item.level !== 'string') issues.push('level not string');
        if (typeof item.strokes !== 'number') issues.push('strokes not number');
        
        console.log(`  ${item.kanji || 'NULL'}: ${issues.join(', ')}`);
      });
    }
    
    // Check if there's a specific stroke count issue
    const strokeIssues = transformedKanji.filter(item => !item.strokes || item.strokes <= 0);
    console.log(`\nKanji with stroke count issues: ${strokeIssues.length}`);
    
    if (strokeIssues.length === 47) {
      console.log(`🎯 FOUND IT! 47 kanji have stroke count issues`);
      
      console.log('Sample stroke count issues:');
      strokeIssues.slice(0, 10).forEach(item => {
        console.log(`  ${item.kanji}: strokes = ${item.strokes}`);
      });
    }
    
    // Check original data for stroke count issues
    const originalStrokeIssues = n3Kanji.filter(k => !k.stroke_count || k.stroke_count <= 0);
    console.log(`\nOriginal data stroke issues: ${originalStrokeIssues.length}`);
    
    if (originalStrokeIssues.length === 47) {
      console.log(`🎯 FOUND IT! 47 kanji in database have stroke_count <= 0 or null`);
      
      console.log('Kanji with stroke count problems:');
      originalStrokeIssues.slice(0, 10).forEach(k => {
        console.log(`  ${k.character}: stroke_count = ${k.stroke_count}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkKanjiUIRendering();
