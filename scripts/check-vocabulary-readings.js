const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkVocabularyReadings() {
  try {
    console.log('Checking N4 vocabulary readings for errors...');
    
    // Get sample N4 vocabulary to check readings
    const { data: n4Vocab, error } = await supabase
      .from('vocabulary')
      .select('word, reading, meaning, jlpt_level')
      .eq('jlpt_level', 'N4')
      .order('word')
      .limit(20);
    
    if (error) {
      console.error('Error fetching N4 vocabulary:', error);
      return;
    }
    
    if (!n4Vocab || n4Vocab.length === 0) {
      console.log('No N4 vocabulary found in database');
      return;
    }
    
    console.log(`\nFound ${n4Vocab.length} N4 vocabulary entries (showing first 20):`);
    console.log('Word | Reading | Meaning');
    console.log('-----|---------|--------');
    
    n4Vocab.forEach((vocab, i) => {
      console.log(`${i+1}. ${vocab.word} | ${vocab.reading} | ${vocab.meaning}`);
    });
    
    // Check for common reading issues
    console.log('\n=== Checking for Reading Issues ===');
    
    const issues = [];
    
    n4Vocab.forEach(vocab => {
      // Check for empty readings
      if (!vocab.reading || vocab.reading.trim() === '') {
        issues.push(`${vocab.word}: Empty reading`);
      }
      
      // Check for readings that look like they might be wrong
      if (vocab.reading && vocab.reading.includes('?')) {
        issues.push(`${vocab.word}: Reading contains '?': ${vocab.reading}`);
      }
      
      // Check for readings that are the same as the word (might indicate missing hiragana)
      if (vocab.word === vocab.reading) {
        issues.push(`${vocab.word}: Reading same as word (might be missing hiragana)`);
      }
      
      // Check for readings with unusual characters
      if (vocab.reading && /[A-Za-z]/.test(vocab.reading)) {
        issues.push(`${vocab.word}: Reading contains Latin characters: ${vocab.reading}`);
      }
    });
    
    if (issues.length > 0) {
      console.log('\nPotential reading issues found:');
      issues.forEach(issue => console.log(`- ${issue}`));
    } else {
      console.log('\nNo obvious reading issues detected in sample');
    }
    
    // Check total vocabulary counts by level
    console.log('\n=== Vocabulary Counts by Level ===');
    const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
    
    for (const level of levels) {
      const { count, error: countError } = await supabase
        .from('vocabulary')
        .select('*', { count: 'exact', head: true })
        .eq('jlpt_level', level);
      
      if (countError) {
        console.error(`Error counting ${level}:`, countError);
      } else {
        console.log(`${level}: ${count} vocabulary words`);
      }
    }
    
  } catch (error) {
    console.error('Error checking vocabulary readings:', error);
  }
}

checkVocabularyReadings();
