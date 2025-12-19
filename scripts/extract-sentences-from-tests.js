const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Extract sentences from N5 and N4 test data files
async function extractSentences() {
  console.log('Starting sentence extraction from test data...\n');

  const sentences = [];
  let sentenceId = 1;

  // Helper function to extract kanji from text
  function extractKanji(text) {
    const cleanText = text.replace(/\*/g, '');
    const kanjiMatches = cleanText.match(/[一-龯]/g);
    return kanjiMatches ? [...new Set(kanjiMatches)] : [];
  }

  // Helper function to clean sentence (remove asterisks)
  function cleanSentence(text) {
    return text.replace(/\*/g, '');
  }

  // Helper function to determine difficulty level
  function getDifficultyLevel(level, questionComplexity) {
    if (level === 'N5') return questionComplexity || 1;
    if (level === 'N4') return questionComplexity || 3;
    return 1;
  }

  // 1. Extract from N5 Kanji Test Data (185 questions)
  console.log('Extracting from N5 Kanji Test Data...');
  try {
    const n5KanjiFile = fs.readFileSync(path.join(__dirname, '../lib/n5-kanji-test-data.ts'), 'utf8');
    // Extract the array data using regex
    const arrayMatch = n5KanjiFile.match(/export const n5KanjiReadingQuestions.*?=\s*(\[[\s\S]*?\]);/);
    if (arrayMatch) {
      // Use eval to parse the array (safe since it's our own code)
      const questions = eval(arrayMatch[1]);
      
      questions.forEach((q, index) => {
        const kanji = extractKanji(q.sentence);
        const cleanedSentence = cleanSentence(q.sentence);
        
        sentences.push({
          id: uuidv4(),
          japanese_text: cleanedSentence,
          english_translation: q.englishTranslation,
          jlpt_level: 'N5',
          difficulty_level: getDifficultyLevel('N5', Math.ceil((index + 1) / 37)), // 1-5 scale
          grammar_points: ['kanji reading practice'],
          vocabulary_used: [q.underlinedKanji],
          kanji_used: kanji,
          audio_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      });
      
      console.log(`✓ Extracted ${questions.length} sentences from N5 Kanji Test Data`);
    }
  } catch (error) {
    console.error('Error extracting N5 Kanji data:', error.message);
  }

  // 2. Extract from N4 Kanji Data (166 questions)
  console.log('Extracting from N4 Kanji Data...');
  try {
    const n4KanjiFile = fs.readFileSync(path.join(__dirname, '../lib/n4-kanji-data.ts'), 'utf8');
    const arrayMatch = n4KanjiFile.match(/export const n4KanjiQuestions.*?=\s*(\[[\s\S]*?\]);/);
    if (arrayMatch) {
      const questions = eval(arrayMatch[1]);
      
      questions.forEach((q, index) => {
        const kanji = extractKanji(q.sentence);
        const cleanedSentence = cleanSentence(q.sentence);
        
        sentences.push({
          id: uuidv4(),
          japanese_text: cleanedSentence,
          english_translation: q.englishTranslation,
          jlpt_level: 'N4',
          difficulty_level: getDifficultyLevel('N4', Math.ceil((index + 1) / 33) + 2), // 3-7 scale
          grammar_points: ['kanji reading practice'],
          vocabulary_used: q.targetWord ? [q.targetWord] : [],
          kanji_used: kanji,
          audio_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      });
      
      console.log(`✓ Extracted ${questions.length} sentences from N4 Kanji Data`);
    }
  } catch (error) {
    console.error('Error extracting N4 Kanji data:', error.message);
  }

  // 3. Extract from N4 Vocabulary Reading Data (280 questions)
  console.log('Extracting from N4 Vocabulary Reading Data...');
  try {
    const n4VocabFile = fs.readFileSync(path.join(__dirname, '../lib/n4-vocabulary-reading-data.ts'), 'utf8');
    const arrayMatch = n4VocabFile.match(/export const n4VocabularyReadingQuestions.*?=\s*(\[[\s\S]*?\]);/);
    if (arrayMatch) {
      const questions = eval(arrayMatch[1]);
      
      questions.forEach((q, index) => {
        const kanji = extractKanji(q.sentence);
        const cleanedSentence = cleanSentence(q.sentence);
        
        sentences.push({
          id: uuidv4(),
          japanese_text: cleanedSentence,
          english_translation: q.englishTranslation,
          jlpt_level: 'N4',
          difficulty_level: getDifficultyLevel('N4', Math.ceil((index + 1) / 56) + 2), // 3-7 scale
          grammar_points: ['vocabulary reading practice'],
          vocabulary_used: q.targetWord ? [q.targetWord] : [],
          kanji_used: kanji,
          audio_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      });
      
      console.log(`✓ Extracted ${questions.length} sentences from N4 Vocabulary Reading Data`);
    }
  } catch (error) {
    console.error('Error extracting N4 Vocabulary data:', error.message);
  }

  // 4. Extract from N5 Contextual Expressions (190 questions)
  console.log('Extracting from N5 Contextual Expressions Data...');
  try {
    const n5ContextFile = fs.readFileSync(path.join(__dirname, '../lib/n5-contextual-expressions-data.ts'), 'utf8');
    const arrayMatch = n5ContextFile.match(/export const n5ContextualExpressions.*?=\s*(\[[\s\S]*?\]);/);
    if (arrayMatch) {
      const questions = eval(arrayMatch[1]);
      
      questions.forEach((q, index) => {
        const kanji = extractKanji(q.sentence);
        const cleanedSentence = cleanSentence(q.sentence);
        
        sentences.push({
          id: uuidv4(),
          japanese_text: cleanedSentence,
          english_translation: q.englishTranslation || q.context || 'Contextual expression practice',
          jlpt_level: 'N5',
          difficulty_level: getDifficultyLevel('N5', Math.ceil((index + 1) / 38)), // 1-5 scale
          grammar_points: q.grammarPoints || ['contextual expression'],
          vocabulary_used: q.vocabularyUsed || [],
          kanji_used: kanji,
          audio_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      });
      
      console.log(`✓ Extracted ${questions.length} sentences from N5 Contextual Expressions`);
    }
  } catch (error) {
    console.error('Error extracting N5 Contextual data:', error.message);
  }

  // 5. Extract from N5 Paraphrase Data (~80 questions)
  console.log('Extracting from N5 Paraphrase Data...');
  try {
    const n5ParaphraseFile = fs.readFileSync(path.join(__dirname, '../lib/n5-paraphrase-data.ts'), 'utf8');
    const arrayMatch = n5ParaphraseFile.match(/export const n5ParaphraseQuestions.*?=\s*(\[[\s\S]*?\]);/);
    if (arrayMatch) {
      const questions = eval(arrayMatch[1]);
      
      questions.forEach((q, index) => {
        const kanji = extractKanji(q.sentence);
        const cleanedSentence = cleanSentence(q.sentence);
        
        // Add both the original sentence and the correct paraphrase
        sentences.push({
          id: uuidv4(),
          japanese_text: cleanedSentence,
          english_translation: q.englishTranslation || 'Paraphrase practice',
          jlpt_level: 'N5',
          difficulty_level: getDifficultyLevel('N5', Math.ceil((index + 1) / 16) + 1), // 2-6 scale
          grammar_points: ['paraphrase', 'semantic equivalence'],
          vocabulary_used: q.vocabularyUsed || [],
          kanji_used: kanji,
          audio_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      });
      
      console.log(`✓ Extracted ${questions.length} sentences from N5 Paraphrase Data`);
    }
  } catch (error) {
    console.error('Error extracting N5 Paraphrase data:', error.message);
  }

  // Summary
  console.log('\n=== EXTRACTION SUMMARY ===');
  console.log(`Total sentences extracted: ${sentences.length}`);
  
  const n5Count = sentences.filter(s => s.jlpt_level === 'N5').length;
  const n4Count = sentences.filter(s => s.jlpt_level === 'N4').length;
  
  console.log(`N5 sentences: ${n5Count}`);
  console.log(`N4 sentences: ${n4Count}`);

  // Save to JSON file
  const outputPath = path.join(__dirname, '..', 'public', 'data', 'sentences.json');
  fs.writeFileSync(outputPath, JSON.stringify(sentences, null, 2), 'utf8');
  console.log(`\n✓ Saved ${sentences.length} sentences to: ${outputPath}`);

  return sentences;
}

// Run the extraction
extractSentences()
  .then(() => {
    console.log('\n✓ Sentence extraction completed successfully!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n✗ Error during extraction:', error);
    process.exit(1);
  });
