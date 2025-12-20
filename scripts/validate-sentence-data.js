const fs = require('fs');
const path = require('path');

// Load all data files
function loadSentences() {
  const sentencesPath = path.join(__dirname, '../public/data/sentences.json');
  return JSON.parse(fs.readFileSync(sentencesPath, 'utf8'));
}

function loadVocabulary() {
  const vocabPath = path.join(__dirname, '../public/data/vocabulary.json');
  return JSON.parse(fs.readFileSync(vocabPath, 'utf8'));
}

function loadKanji() {
  const kanjiPath = path.join(__dirname, '../public/data/kanji.json');
  return JSON.parse(fs.readFileSync(kanjiPath, 'utf8'));
}

// Extract all words from a sentence (including particles and verb forms)
function extractAllWords(sentence) {
  // Remove punctuation
  const cleaned = sentence.replace(/[。、！？]/g, '');
  
  // Split into potential words (this is a simple approach)
  const words = [];
  
  // Common particles and grammatical elements
  const particles = ['は', 'が', 'を', 'に', 'へ', 'で', 'と', 'から', 'まで', 'より', 'の', 'も', 'や'];
  
  // Extract individual characters and common combinations
  for (let i = 0; i < cleaned.length; i++) {
    // Single character
    words.push(cleaned[i]);
    
    // Two character combinations
    if (i < cleaned.length - 1) {
      words.push(cleaned.substring(i, i + 2));
    }
    
    // Three character combinations
    if (i < cleaned.length - 2) {
      words.push(cleaned.substring(i, i + 3));
    }
    
    // Four character combinations
    if (i < cleaned.length - 3) {
      words.push(cleaned.substring(i, i + 4));
    }
  }
  
  return [...new Set(words)];
}

// Main validation function
async function validateSentenceData() {
  console.log('=== Sentence Data Validation ===\n');
  
  // Load all data
  console.log('Loading data...');
  const sentences = loadSentences();
  const vocabulary = loadVocabulary();
  const kanji = loadKanji();
  
  console.log(`Loaded ${sentences.length} sentences`);
  console.log(`Loaded ${vocabulary.length} vocabulary entries`);
  console.log(`Loaded ${kanji.length} kanji entries\n`);
  
  // Create lookup sets
  const vocabSet = new Set(vocabulary.map(v => v.word));
  const kanjiSet = new Set(kanji.map(k => k.character));
  
  // Also add readings to vocab set (for verb forms, etc.)
  vocabulary.forEach(v => {
    if (v.reading) vocabSet.add(v.reading);
  });
  
  // Track issues
  const missingVocab = new Set();
  const missingKanji = new Set();
  const sentencesWithIssues = [];
  
  // Validate N5 sentences only (newly generated)
  const n5Sentences = sentences.filter(s => s.jlpt_level === 'N5');
  console.log(`Validating ${n5Sentences.length} N5 sentences...\n`);
  
  n5Sentences.forEach((sentence, index) => {
    const issues = {
      sentence: sentence.japanese_text,
      id: sentence.id,
      missingVocab: [],
      missingKanji: []
    };
    
    // Check vocabulary_used field
    if (sentence.vocabulary_used && Array.isArray(sentence.vocabulary_used)) {
      sentence.vocabulary_used.forEach(word => {
        if (!vocabSet.has(word)) {
          missingVocab.add(word);
          issues.missingVocab.push(word);
        }
      });
    }
    
    // Check kanji_used field
    if (sentence.kanji_used && Array.isArray(sentence.kanji_used)) {
      sentence.kanji_used.forEach(k => {
        if (!kanjiSet.has(k)) {
          missingKanji.add(k);
          issues.missingKanji.push(k);
        }
      });
    }
    
    // Also extract and check all words from the actual sentence text
    const allWords = extractAllWords(sentence.japanese_text);
    allWords.forEach(word => {
      // Skip single hiragana/katakana characters
      if (word.length === 1 && /[ぁ-んァ-ン]/.test(word)) return;
      
      // Check if it's a vocabulary word
      if (!vocabSet.has(word) && /[一-龯]/.test(word)) {
        // Contains kanji, might be a vocab word we're missing
        if (word.length >= 2) {
          missingVocab.add(word);
          if (!issues.missingVocab.includes(word)) {
            issues.missingVocab.push(word);
          }
        }
      }
    });
    
    if (issues.missingVocab.length > 0 || issues.missingKanji.length > 0) {
      sentencesWithIssues.push(issues);
    }
    
    if ((index + 1) % 100 === 0) {
      console.log(`Progress: ${index + 1}/${n5Sentences.length} sentences checked`);
    }
  });
  
  // Generate report
  console.log('\n=== VALIDATION REPORT ===\n');
  
  if (missingVocab.size === 0 && missingKanji.size === 0) {
    console.log('✓ All vocabulary and kanji exist in the database!');
    console.log('✓ No issues found.');
    return;
  }
  
  console.log(`⚠️  Found ${missingVocab.size} missing vocabulary items`);
  console.log(`⚠️  Found ${missingKanji.size} missing kanji items`);
  console.log(`⚠️  ${sentencesWithIssues.length} sentences have issues\n`);
  
  // Missing Vocabulary
  if (missingVocab.size > 0) {
    console.log('Missing Vocabulary:');
    const sortedVocab = Array.from(missingVocab).sort();
    sortedVocab.forEach(word => {
      console.log(`  - ${word}`);
    });
    console.log('');
  }
  
  // Missing Kanji
  if (missingKanji.size > 0) {
    console.log('Missing Kanji:');
    const sortedKanji = Array.from(missingKanji).sort();
    sortedKanji.forEach(k => {
      console.log(`  - ${k}`);
    });
    console.log('');
  }
  
  // Save detailed report
  const reportPath = path.join(__dirname, '../analysis/sentence-validation-report.json');
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalSentences: n5Sentences.length,
      sentencesWithIssues: sentencesWithIssues.length,
      missingVocabCount: missingVocab.size,
      missingKanjiCount: missingKanji.size
    },
    missingVocabulary: Array.from(missingVocab).sort(),
    missingKanji: Array.from(missingKanji).sort(),
    sentencesWithIssues: sentencesWithIssues.slice(0, 50) // First 50 for review
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`Detailed report saved to: ${reportPath}\n`);
  
  // Recommendations
  console.log('=== RECOMMENDATIONS ===\n');
  
  if (missingVocab.size > 0) {
    console.log('Vocabulary Issues:');
    console.log('  1. These might be verb conjugations or grammatical forms');
    console.log('  2. Check if base forms exist in vocabulary database');
    console.log('  3. May need to add common conjugated forms to vocabulary');
    console.log('  4. Some might be particles or grammatical elements (can be ignored)');
    console.log('');
  }
  
  if (missingKanji.size > 0) {
    console.log('Kanji Issues:');
    console.log('  1. Verify these kanji are appropriate for N5 level');
    console.log('  2. Add missing kanji to database if they are N5/N4 level');
    console.log('  3. Consider regenerating sentences without these kanji');
    console.log('');
  }
}

// Run validation
validateSentenceData().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
