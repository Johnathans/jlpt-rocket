const fs = require('fs');
const path = require('path');

// Count questions in N4 kanji data
function countN4KanjiQuestions() {
  const filePath = path.join(__dirname, '..', 'lib', 'n4-kanji-data.ts');
  if (!fs.existsSync(filePath)) {
    console.log('N4 kanji data file not found');
    return 0;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  // Look for JSON-style id properties
  const matches = content.match(/"id":\s*\d+/g);
  return matches ? matches.length : 0;
}

// Count questions in paraphrase files
function countN4ParaphraseQuestions() {
  const files = [
    'n4-paraphrase-questions.md',
    'n4-paraphrase-questions-extended.md', 
    'n4-paraphrase-questions-part2.md',
    'n4-paraphrase-questions-part3.md',
    'n4-paraphrase-questions-part4.md'
  ];
  
  let totalCount = 0;
  files.forEach(filename => {
    const filepath = path.join(__dirname, '..', filename);
    if (fs.existsSync(filepath)) {
      const content = fs.readFileSync(filepath, 'utf8');
      const matches = content.match(/## Q\d+/g);
      if (matches) {
        totalCount += matches.length;
      }
    }
  });
  
  return totalCount;
}

// Count vocabulary from CSV files
function countVocabulary() {
  const n4VocabPath = path.join(__dirname, '..', 'n4 vocabulary - n4 vocabulary.csv');
  const n5VocabPath = path.join(__dirname, '..', 'n5-vocabulary.csv');
  
  let n4Count = 0;
  let n5Count = 0;
  
  if (fs.existsSync(n4VocabPath)) {
    const content = fs.readFileSync(n4VocabPath, 'utf8');
    const lines = content.split('\n').filter(line => line.trim());
    n4Count = Math.max(0, lines.length - 1); // Subtract header
  }
  
  if (fs.existsSync(n5VocabPath)) {
    const content = fs.readFileSync(n5VocabPath, 'utf8');
    const lines = content.split('\n').filter(line => line.trim());
    n5Count = Math.max(0, lines.length - 1); // Subtract header
  }
  
  return { n4: n4Count, n5: n5Count, total: n4Count + n5Count };
}

// Count grammar patterns (estimate based on common N4/N5 patterns)
function countGrammarPatterns() {
  // Based on standard JLPT curriculum
  const n5Grammar = 47; // Standard N5 grammar points
  const n4Grammar = 83; // Standard N4 grammar points
  return { n4: n4Grammar, n5: n5Grammar, total: n4Grammar + n5Grammar };
}

// Main function
function countAllData() {
  console.log('📊 JLPT Data Counts Analysis\n');
  
  const kanjiCount = countN4KanjiQuestions();
  console.log(`🔤 N4 Kanji/Reading Questions: ${kanjiCount}`);
  
  const paraphraseCount = countN4ParaphraseQuestions();
  console.log(`📝 N4 Paraphrase Questions: ${paraphraseCount}`);
  
  const vocabCounts = countVocabulary();
  console.log(`📚 Vocabulary Words:`);
  console.log(`   N4: ${vocabCounts.n4}`);
  console.log(`   N5: ${vocabCounts.n5}`);
  console.log(`   Total: ${vocabCounts.total}`);
  
  const grammarCounts = countGrammarPatterns();
  console.log(`📖 Grammar Patterns:`);
  console.log(`   N4: ${grammarCounts.n4}`);
  console.log(`   N5: ${grammarCounts.n5}`);
  console.log(`   Total: ${grammarCounts.total}`);
  
  console.log('\n🎯 Recommended Progress Page Totals:');
  console.log(`   Kanji: ${kanjiCount} (reading questions)`);
  console.log(`   Vocabulary: ${vocabCounts.total} (words from CSV)`);
  console.log(`   Sentences: ${paraphraseCount} (paraphrase questions)`);
  
  return {
    kanji: kanjiCount,
    vocabulary: vocabCounts.total,
    sentences: paraphraseCount,
    grammar: grammarCounts.total
  };
}

if (require.main === module) {
  countAllData();
}

module.exports = { countAllData };
