const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkCacheFiltering() {
  try {
    console.log('🔍 Checking if caching or localStorage is filtering kanji...\n');
    
    // Get all N3 kanji
    const { data: n3Kanji, error } = await supabase
      .from('kanji')
      .select('*')
      .eq('jlpt_level', 'N3');
    
    if (error) {
      console.error('Error:', error);
      return;
    }
    
    console.log(`Total N3 kanji from database: ${n3Kanji.length}`);
    
    // Simulate the exact process the UI does
    const transformedKanji = n3Kanji.map(kanji => {
      return {
        id: kanji.id,
        kanji: kanji.character,
        meaning: kanji.meaning,
        level: kanji.jlpt_level,
        strokes: kanji.stroke_count,
        examples: []
      };
    });
    
    console.log(`After transformation: ${transformedKanji.length}`);
    
    // Test JSON serialization (what happens during caching)
    const jsonString = JSON.stringify(transformedKanji);
    const parsedBack = JSON.parse(jsonString);
    
    console.log(`After JSON serialization: ${parsedBack.length}`);
    
    if (parsedBack.length !== transformedKanji.length) {
      console.log('❌ JSON serialization is losing data!');
    }
    
    // Check if any kanji fail JSON serialization
    const serializationFailures = [];
    transformedKanji.forEach((kanji, index) => {
      try {
        const testJson = JSON.stringify(kanji);
        const testParsed = JSON.parse(testJson);
        
        // Check if all properties survived
        if (!testParsed.id || !testParsed.kanji || !testParsed.meaning || 
            !testParsed.level || !testParsed.strokes) {
          serializationFailures.push({ index, kanji, issue: 'missing properties after serialization' });
        }
      } catch (e) {
        serializationFailures.push({ index, kanji, issue: e.message });
      }
    });
    
    console.log(`Serialization failures: ${serializationFailures.length}`);
    
    if (serializationFailures.length === 47) {
      console.log('🎯 FOUND IT! 47 kanji fail JSON serialization');
      
      serializationFailures.slice(0, 10).forEach(failure => {
        console.log(`  ${failure.kanji.kanji}: ${failure.issue}`);
      });
    }
    
    // Check for specific data issues that might cause filtering
    const dataIssues = transformedKanji.filter(kanji => {
      // Check for values that might cause issues in React or JSON
      return kanji.id === null || kanji.id === undefined ||
             kanji.kanji === null || kanji.kanji === undefined ||
             kanji.meaning === null || kanji.meaning === undefined ||
             kanji.level === null || kanji.level === undefined ||
             kanji.strokes === null || kanji.strokes === undefined ||
             kanji.strokes === 0 ||
             typeof kanji.id !== 'string' ||
             typeof kanji.kanji !== 'string' ||
             typeof kanji.meaning !== 'string' ||
             typeof kanji.level !== 'string' ||
             typeof kanji.strokes !== 'number' ||
             isNaN(kanji.strokes);
    });
    
    console.log(`Data type/value issues: ${dataIssues.length}`);
    
    if (dataIssues.length === 47) {
      console.log('🎯 FOUND IT! 47 kanji have data type or value issues');
      
      dataIssues.slice(0, 10).forEach(kanji => {
        const issues = [];
        if (kanji.id === null || kanji.id === undefined) issues.push('null/undefined id');
        if (kanji.kanji === null || kanji.kanji === undefined) issues.push('null/undefined kanji');
        if (kanji.meaning === null || kanji.meaning === undefined) issues.push('null/undefined meaning');
        if (kanji.level === null || kanji.level === undefined) issues.push('null/undefined level');
        if (kanji.strokes === null || kanji.strokes === undefined) issues.push('null/undefined strokes');
        if (kanji.strokes === 0) issues.push('zero strokes');
        if (typeof kanji.id !== 'string') issues.push('id not string');
        if (typeof kanji.kanji !== 'string') issues.push('kanji not string');
        if (typeof kanji.meaning !== 'string') issues.push('meaning not string');
        if (typeof kanji.level !== 'string') issues.push('level not string');
        if (typeof kanji.strokes !== 'number') issues.push('strokes not number');
        if (isNaN(kanji.strokes)) issues.push('strokes is NaN');
        
        console.log(`  ${kanji.kanji || 'NULL'}: ${issues.join(', ')}`);
      });
    }
    
    // Check the original database data for these issues
    console.log('\n🔍 Checking original database data:');
    
    const originalDataIssues = n3Kanji.filter(kanji => {
      return kanji.id === null || kanji.id === undefined ||
             kanji.character === null || kanji.character === undefined ||
             kanji.meaning === null || kanji.meaning === undefined ||
             kanji.jlpt_level === null || kanji.jlpt_level === undefined ||
             kanji.stroke_count === null || kanji.stroke_count === undefined ||
             kanji.stroke_count === 0 ||
             typeof kanji.stroke_count !== 'number' ||
             isNaN(kanji.stroke_count);
    });
    
    console.log(`Original data issues: ${originalDataIssues.length}`);
    
    if (originalDataIssues.length > 0) {
      console.log('Sample original data issues:');
      originalDataIssues.slice(0, 5).forEach(kanji => {
        console.log(`  ${kanji.character || 'NULL'}: stroke_count = ${kanji.stroke_count} (type: ${typeof kanji.stroke_count})`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkCacheFiltering();
