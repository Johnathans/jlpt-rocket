const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function countN4VocabWithKanji() {
  try {
    // Get all N4 vocabulary
    const { data: vocab, error } = await supabase
      .from('vocabulary')
      .select('word, reading')
      .eq('jlpt_level', 'N4');
    
    if (error) throw error;
    
    // Filter words that contain kanji (not just hiragana/katakana)
    const wordsWithKanji = vocab.filter(item => {
      const word = item.word;
      // Check if word contains kanji (not just hiragana ひらがな or katakana カタカナ)
      const hasKanji = /[一-龯]/.test(word);
      return hasKanji;
    });
    
    console.log('Total N4 vocabulary entries:', vocab.length);
    console.log('N4 vocabulary with kanji:', wordsWithKanji.length);
    console.log('N4 kana-only words:', vocab.length - wordsWithKanji.length);
    
    // Show some examples
    console.log('\nExamples of N4 words with kanji:');
    wordsWithKanji.slice(0, 15).forEach(item => {
      console.log(`- ${item.word} (${item.reading})`);
    });
    
    // Show percentage
    const percentage = ((wordsWithKanji.length / vocab.length) * 100).toFixed(1);
    console.log(`\nPercentage with kanji: ${percentage}%`);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

countN4VocabWithKanji();
