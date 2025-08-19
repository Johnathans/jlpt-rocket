const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function find47MissingKanji() {
  try {
    console.log('🔍 Finding the 47 missing kanji (367 - 320 = 47)...\n');
    
    // Get all N3 kanji
    const { data: n3Kanji, error } = await supabase
      .from('kanji')
      .select('*')
      .eq('jlpt_level', 'N3');
    
    if (error) {
      console.error('Error:', error);
      return;
    }
    
    console.log(`Total N3 kanji in database: ${n3Kanji.length}`);
    
    // Check various filtering patterns that might cause exactly 47 kanji to be filtered
    const filteringPatterns = [
      {
        name: 'Missing stroke_count or zero strokes',
        filter: k => !k.stroke_count || k.stroke_count <= 0,
        kanji: n3Kanji.filter(k => !k.stroke_count || k.stroke_count <= 0)
      },
      {
        name: 'Missing frequency_rank',
        filter: k => !k.frequency_rank || k.frequency_rank <= 0,
        kanji: n3Kanji.filter(k => !k.frequency_rank || k.frequency_rank <= 0)
      },
      {
        name: 'Empty or null meaning',
        filter: k => !k.meaning || k.meaning.trim() === '',
        kanji: n3Kanji.filter(k => !k.meaning || k.meaning.trim() === '')
      },
      {
        name: 'Empty or null character',
        filter: k => !k.character || k.character.trim() === '',
        kanji: n3Kanji.filter(k => !k.character || k.character.trim() === '')
      },
      {
        name: 'Missing radical field',
        filter: k => !k.radical || k.radical.trim() === '',
        kanji: n3Kanji.filter(k => !k.radical || k.radical.trim() === '')
      },
      {
        name: 'Both readings empty (kun AND on)',
        filter: k => (!k.kun_reading || k.kun_reading.length === 0) && (!k.on_reading || k.on_reading.length === 0),
        kanji: n3Kanji.filter(k => (!k.kun_reading || k.kun_reading.length === 0) && (!k.on_reading || k.on_reading.length === 0))
      },
      {
        name: 'Invalid reading arrays (not arrays)',
        filter: k => !Array.isArray(k.kun_reading) || !Array.isArray(k.on_reading),
        kanji: n3Kanji.filter(k => !Array.isArray(k.kun_reading) || !Array.isArray(k.on_reading))
      },
      {
        name: 'Missing ID',
        filter: k => !k.id || k.id.trim() === '',
        kanji: n3Kanji.filter(k => !k.id || k.id.trim() === '')
      }
    ];
    
    console.log('🔍 Checking filtering patterns:');
    filteringPatterns.forEach(pattern => {
      console.log(`  ${pattern.name}: ${pattern.kanji.length} kanji`);
      
      if (pattern.kanji.length === 47) {
        console.log(`    🎯 FOUND IT! This pattern filters exactly 47 kanji`);
        
        console.log(`    Sample filtered kanji:`);
        pattern.kanji.slice(0, 10).forEach(k => {
          console.log(`      ${k.character || 'NULL'}: ${pattern.name}`);
        });
      }
    });
    
    // Check combinations of filters
    console.log('\n🔍 Checking combined filtering patterns:');
    
    // Pattern: Missing stroke_count OR frequency_rank
    const missingStrokeOrFreq = n3Kanji.filter(k => 
      (!k.stroke_count || k.stroke_count <= 0) || 
      (!k.frequency_rank || k.frequency_rank <= 0)
    );
    console.log(`  Missing stroke_count OR frequency_rank: ${missingStrokeOrFreq.length}`);
    
    // Pattern: Missing any critical field
    const missingCriticalField = n3Kanji.filter(k => 
      !k.character || 
      !k.meaning || 
      !k.stroke_count || 
      k.stroke_count <= 0 ||
      !k.frequency_rank ||
      k.frequency_rank <= 0
    );
    console.log(`  Missing any critical field: ${missingCriticalField.length}`);
    
    // Pattern: UI validation failure
    const uiValidationFailure = n3Kanji.filter(k => {
      // Simulate strict UI validation
      return !k.id ||
             !k.character || k.character.trim() === '' ||
             !k.meaning || k.meaning.trim() === '' ||
             !k.stroke_count || k.stroke_count <= 0 ||
             !Array.isArray(k.kun_reading) ||
             !Array.isArray(k.on_reading);
    });
    console.log(`  UI validation failure: ${uiValidationFailure.length}`);
    
    if (missingCriticalField.length === 47) {
      console.log(`\n🎯 FOUND IT! 47 kanji are missing critical fields`);
      
      console.log('\nBreakdown of missing fields:');
      const breakdown = {
        noCharacter: missingCriticalField.filter(k => !k.character).length,
        noMeaning: missingCriticalField.filter(k => !k.meaning).length,
        noStrokeCount: missingCriticalField.filter(k => !k.stroke_count || k.stroke_count <= 0).length,
        noFrequencyRank: missingCriticalField.filter(k => !k.frequency_rank || k.frequency_rank <= 0).length
      };
      
      Object.entries(breakdown).forEach(([field, count]) => {
        if (count > 0) {
          console.log(`  ${field}: ${count} kanji`);
        }
      });
    }
    
    // Show the exact 47 kanji that are being filtered
    if (missingCriticalField.length === 47) {
      console.log('\n❌ The 47 filtered kanji:');
      missingCriticalField.forEach((k, i) => {
        const issues = [];
        if (!k.character) issues.push('no character');
        if (!k.meaning) issues.push('no meaning');
        if (!k.stroke_count || k.stroke_count <= 0) issues.push('no stroke_count');
        if (!k.frequency_rank || k.frequency_rank <= 0) issues.push('no frequency_rank');
        
        console.log(`  ${i+1}. ${k.character || 'NULL'}: ${issues.join(', ')}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

find47MissingKanji();
