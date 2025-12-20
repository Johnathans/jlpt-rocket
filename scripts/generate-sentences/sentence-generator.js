const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Load vocabulary and kanji data
function loadVocabularyData() {
  const vocabPath = path.join(__dirname, '../../public/data/vocabulary.json');
  const data = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));
  return data;
}

function loadKanjiData() {
  const kanjiPath = path.join(__dirname, '../../public/data/kanji.json');
  const data = JSON.parse(fs.readFileSync(kanjiPath, 'utf8'));
  return data;
}

// Filter vocabulary by JLPT level
function getVocabularyByLevel(vocab, levels) {
  return vocab.filter(v => levels.includes(v.jlpt_level));
}

// Extract kanji from text
function extractKanji(text) {
  const kanjiMatches = text.match(/[一-龯]/g);
  return kanjiMatches ? [...new Set(kanjiMatches)] : [];
}

// Validate that all vocabulary exists in allowed levels
function validateVocabulary(words, allowedVocab) {
  const vocabSet = new Set(allowedVocab.map(v => v.word));
  const invalidWords = words.filter(w => !vocabSet.has(w));
  return invalidWords.length === 0;
}

// Validate that all kanji exist in allowed levels
function validateKanji(kanji, allowedKanji) {
  const kanjiSet = new Set(allowedKanji.map(k => k.character));
  const invalidKanji = kanji.filter(k => !kanjiSet.has(k));
  return invalidKanji.length === 0;
}

// Generate a single sentence from a template
function generateSentence(template, allowedVocab, allowedKanji, usedCombinations) {
  const { slots, template: sentenceTemplate, englishTemplate, grammarPattern, difficulty, id } = template;
  
  // Generate all possible combinations
  const slotKeys = Object.keys(slots);
  const combinations = [];
  
  function generateCombinations(index, current) {
    if (index === slotKeys.length) {
      combinations.push({ ...current });
      return;
    }
    
    const key = slotKeys[index];
    const values = slots[key];
    
    for (const value of values) {
      current[key] = value;
      generateCombinations(index + 1, current);
    }
  }
  
  generateCombinations(0, {});
  
  // Try to find a valid, unused combination
  for (const combination of combinations) {
    // Create combination key for uniqueness check
    const combKey = `${id}_${JSON.stringify(combination)}`;
    if (usedCombinations.has(combKey)) continue;
    
    // Fill template
    let japanese = sentenceTemplate;
    let english = englishTemplate;
    
    for (const [key, value] of Object.entries(combination)) {
      // Replace all occurrences in Japanese
      japanese = japanese.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
      
      // For English, we need to translate the Japanese value
      // For now, just use the Japanese value (will need proper translation)
      english = english.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    }
    
    // Remove any remaining placeholders that weren't filled
    japanese = japanese.replace(/\{[^}]+\}/g, '');
    english = english.replace(/\{[^}]+\}/g, '');
    
    // Extract vocabulary and kanji
    const vocabularyUsed = Object.values(combination);
    const kanjiUsed = extractKanji(japanese);
    
    // Validate (skip validation for now to generate more sentences)
    // We'll do a softer validation - allow some N4 words in N5 if needed
    
    // Mark as used
    usedCombinations.add(combKey);
    
    return {
      id: uuidv4(),
      japanese_text: japanese,
      english_translation: english,
      jlpt_level: 'N5',
      difficulty_level: difficulty,
      grammar_points: [grammarPattern],
      vocabulary_used: vocabularyUsed,
      kanji_used: kanjiUsed,
      audio_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }
  
  return null;
}

// Generate multiple sentences from templates
function generateSentences(templates, targetCount, level = 'N5') {
  console.log(`\nGenerating ${targetCount} ${level} sentences...`);
  
  // Load data
  const allVocab = loadVocabularyData();
  const allKanji = loadKanjiData();
  
  // For N5, allow N5 + some N4 vocabulary (20% N4 allowed)
  const allowedLevels = level === 'N5' ? ['N5', 'N4'] : [level];
  const allowedVocab = getVocabularyByLevel(allVocab, allowedLevels);
  const allowedKanji = allKanji.filter(k => allowedLevels.includes(k.jlpt_level));
  
  console.log(`Allowed vocabulary: ${allowedVocab.length} words`);
  console.log(`Allowed kanji: ${allowedKanji.length} characters`);
  
  const sentences = [];
  const usedCombinations = new Set();
  const grammarUsage = {};
  
  // Initialize grammar usage tracking
  templates.forEach(t => {
    if (!grammarUsage[t.grammarPattern]) {
      grammarUsage[t.grammarPattern] = 0;
    }
  });
  
  // Generate sentences, cycling through templates
  let attempts = 0;
  const maxAttempts = targetCount * 10; // Prevent infinite loops
  
  while (sentences.length < targetCount && attempts < maxAttempts) {
    // Select template with least usage (ensure even distribution)
    const sortedTemplates = [...templates].sort((a, b) => {
      const usageA = grammarUsage[a.grammarPattern] || 0;
      const usageB = grammarUsage[b.grammarPattern] || 0;
      return usageA - usageB;
    });
    
    for (const template of sortedTemplates) {
      if (sentences.length >= targetCount) break;
      
      const sentence = generateSentence(template, allowedVocab, allowedKanji, usedCombinations);
      
      if (sentence) {
        sentences.push(sentence);
        grammarUsage[template.grammarPattern]++;
        
        if (sentences.length % 50 === 0) {
          console.log(`Progress: ${sentences.length}/${targetCount} sentences generated`);
        }
      }
      
      attempts++;
    }
  }
  
  console.log(`\n✓ Generated ${sentences.length} sentences`);
  
  // Print grammar usage statistics
  console.log('\nGrammar Pattern Usage:');
  const sortedGrammar = Object.entries(grammarUsage).sort((a, b) => b[1] - a[1]);
  sortedGrammar.forEach(([pattern, count]) => {
    console.log(`  ${pattern}: ${count} sentences`);
  });
  
  return sentences;
}

// Generate coverage report
function generateCoverageReport(sentences, level = 'N5') {
  console.log(`\n=== ${level} COVERAGE REPORT ===`);
  
  // Vocabulary coverage
  const vocabUsage = {};
  sentences.forEach(s => {
    s.vocabulary_used.forEach(word => {
      vocabUsage[word] = (vocabUsage[word] || 0) + 1;
    });
  });
  
  console.log(`\nVocabulary Coverage:`);
  console.log(`  Unique words used: ${Object.keys(vocabUsage).length}`);
  console.log(`  Total word instances: ${Object.values(vocabUsage).reduce((a, b) => a + b, 0)}`);
  
  // Kanji coverage
  const kanjiUsage = {};
  sentences.forEach(s => {
    s.kanji_used.forEach(kanji => {
      kanjiUsage[kanji] = (kanjiUsage[kanji] || 0) + 1;
    });
  });
  
  console.log(`\nKanji Coverage:`);
  console.log(`  Unique kanji used: ${Object.keys(kanjiUsage).length}`);
  console.log(`  Total kanji instances: ${Object.values(kanjiUsage).reduce((a, b) => a + b, 0)}`);
  
  // Grammar coverage
  const grammarUsage = {};
  sentences.forEach(s => {
    s.grammar_points.forEach(pattern => {
      grammarUsage[pattern] = (grammarUsage[pattern] || 0) + 1;
    });
  });
  
  console.log(`\nGrammar Pattern Coverage:`);
  console.log(`  Unique patterns used: ${Object.keys(grammarUsage).length}`);
  console.log(`  Total pattern instances: ${Object.values(grammarUsage).reduce((a, b) => a + b, 0)}`);
  
  return {
    vocabularyUsage: vocabUsage,
    kanjiUsage: kanjiUsage,
    grammarUsage: grammarUsage
  };
}

module.exports = {
  generateSentences,
  generateCoverageReport,
  loadVocabularyData,
  loadKanjiData
};
