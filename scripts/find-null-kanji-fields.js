const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function findNullKanjiFields() {
  try {
    console.log('🔍 Finding which kanji fields are null causing filtering...\n');
    
    // Get all N3 kanji
    const { data: n3Kanji, error } = await supabase
      .from('kanji')
      .select('*')
      .eq('jlpt_level', 'N3');
    
    if (error) {
      console.error('Error fetching N3 kanji:', error);
      return;
    }
    
    console.log(`Total N3 kanji in database: ${n3Kanji.length}`);
    
    // Check each field for null/empty values
    const fieldChecks = {
      nullId: n3Kanji.filter(k => !k.id),
      nullCharacter: n3Kanji.filter(k => !k.character),
      emptyCharacter: n3Kanji.filter(k => k.character === ''),
      nullMeaning: n3Kanji.filter(k => !k.meaning),
      emptyMeaning: n3Kanji.filter(k => k.meaning === ''),
      nullOnReading: n3Kanji.filter(k => !k.on_reading),
      nullKunReading: n3Kanji.filter(k => !k.kun_reading),
      emptyOnReading: n3Kanji.filter(k => Array.isArray(k.on_reading) && k.on_reading.length === 0),
      emptyKunReading: n3Kanji.filter(k => Array.isArray(k.kun_reading) && k.kun_reading.length === 0),
      nullStrokeCount: n3Kanji.filter(k => !k.stroke_count || k.stroke_count === 0),
      nullFrequencyRank: n3Kanji.filter(k => !k.frequency_rank),
      nullJlptLevel: n3Kanji.filter(k => !k.jlpt_level),
      wrongJlptLevel: n3Kanji.filter(k => k.jlpt_level !== 'N3'),
    };
    
    console.log('📊 Field validation results:');
    Object.entries(fieldChecks).forEach(([check, kanji]) => {
      if (kanji.length > 0) {
        console.log(`  ${check}: ${kanji.length} kanji`);
        
        // Show samples for significant issues
        if (kanji.length > 5) {
          console.log(`    Sample: ${kanji.slice(0, 3).map(k => k.character || 'NULL').join(', ')}...`);
        } else {
          console.log(`    All: ${kanji.map(k => k.character || 'NULL').join(', ')}`);
        }
      }
    });
    
    // Find kanji that would fail common validation patterns
    const commonValidationFailures = n3Kanji.filter(k => {
      return !k.id || 
             !k.character || 
             !k.meaning || 
             !k.on_reading || 
             !k.kun_reading ||
             k.character.trim() === '' ||
             k.meaning.trim() === '' ||
             !k.stroke_count ||
             k.stroke_count <= 0;
    });
    
    console.log(`\n❌ Kanji failing basic validation: ${commonValidationFailures.length}`);
    
    if (commonValidationFailures.length > 0) {
      console.log('Sample failing kanji:');
      commonValidationFailures.slice(0, 5).forEach(k => {
        const issues = [];
        if (!k.id) issues.push('no ID');
        if (!k.character) issues.push('no character');
        if (!k.meaning) issues.push('no meaning');
        if (!k.on_reading) issues.push('no on_reading');
        if (!k.kun_reading) issues.push('no kun_reading');
        if (!k.stroke_count || k.stroke_count <= 0) issues.push('no stroke_count');
        
        console.log(`  ${k.character || 'NULL'}: ${issues.join(', ')}`);
      });
    }
    
    // Check if the missing count matches our discrepancy
    const expectedMissing = 367 - 320; // 47 kanji
    console.log(`\nExpected missing kanji: ${expectedMissing}`);
    
    if (commonValidationFailures.length === expectedMissing) {
      console.log(`🎯 FOUND IT! ${expectedMissing} kanji fail basic validation checks`);
    }
    
    // Check for UI-specific filtering patterns
    const uiFilteringPatterns = [
      {
        name: 'Missing stroke count',
        filter: k => !k.stroke_count || k.stroke_count <= 0,
        kanji: n3Kanji.filter(k => !k.stroke_count || k.stroke_count <= 0)
      },
      {
        name: 'Missing frequency rank',
        filter: k => !k.frequency_rank,
        kanji: n3Kanji.filter(k => !k.frequency_rank)
      },
      {
        name: 'Empty readings arrays',
        filter: k => (Array.isArray(k.on_reading) && k.on_reading.length === 0) || 
                    (Array.isArray(k.kun_reading) && k.kun_reading.length === 0),
        kanji: n3Kanji.filter(k => (Array.isArray(k.on_reading) && k.on_reading.length === 0) || 
                                  (Array.isArray(k.kun_reading) && k.kun_reading.length === 0))
      }
    ];
    
    console.log('\n🔍 UI filtering pattern analysis:');
    uiFilteringPatterns.forEach(pattern => {
      console.log(`  ${pattern.name}: ${pattern.kanji.length} kanji`);
      if (pattern.kanji.length === expectedMissing) {
        console.log(`    🎯 This could be the filtering pattern!`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error finding null fields:', error);
  }
}

findNullKanjiFields();
