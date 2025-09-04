const fs = require('fs');
const path = require('path');

// Analyze N4 paraphrase questions to identify non-paraphrase questions
function analyzeN4ParaphraseQuestions() {
  const files = [
    'n4-paraphrase-questions.md',
    'n4-paraphrase-questions-extended.md',
    'n4-paraphrase-questions-part2.md',
    'n4-paraphrase-questions-part3.md',
    'n4-paraphrase-questions-part4.md'
  ];

  const problematicQuestions = [];
  let totalQuestions = 0;

  files.forEach(filename => {
    const filepath = path.join(__dirname, '..', filename);
    if (!fs.existsSync(filepath)) {
      console.log(`File not found: ${filename}`);
      return;
    }

    const content = fs.readFileSync(filepath, 'utf8');
    const questions = analyzeFileContent(content, filename);
    problematicQuestions.push(...questions);
    totalQuestions += questions.length;
  });

  console.log(`\n=== N4 PARAPHRASE QUALITY ANALYSIS ===`);
  console.log(`Total questions analyzed: ${totalQuestions}`);
  console.log(`Problematic questions found: ${problematicQuestions.length}\n`);

  if (problematicQuestions.length > 0) {
    console.log(`ISSUES FOUND:\n`);
    problematicQuestions.forEach(issue => {
      console.log(`${issue.file} - ${issue.question}:`);
      console.log(`  Original: ${issue.original}`);
      console.log(`  Answer: ${issue.answer}`);
      console.log(`  Issue: ${issue.issue}`);
      console.log(`  Explanation: ${issue.explanation}\n`);
    });
  } else {
    console.log(`✅ All paraphrase questions appear to be valid semantic equivalences.`);
  }

  return problematicQuestions;
}

function analyzeFileContent(content, filename) {
  const issues = [];
  const questionBlocks = content.split(/## Q\d+/).slice(1);

  questionBlocks.forEach((block, index) => {
    const questionNum = `Q${index + 1}`;
    
    // Extract original sentence
    const lines = block.trim().split('\n');
    const originalSentence = lines[0];
    
    // Extract answer line
    const answerLine = lines.find(line => line.includes('✅ Answer:'));
    if (!answerLine) return;

    // Extract the paraphrase explanation
    const paraphraseMatch = answerLine.match(/(".*?" ≈ ".*?" →.*)/);
    if (!paraphraseMatch) return;

    const explanation = paraphraseMatch[1];
    
    // Check for problematic patterns
    const issue = identifyIssues(originalSentence, answerLine, explanation);
    if (issue) {
      issues.push({
        file: filename,
        question: questionNum,
        original: originalSentence,
        answer: answerLine,
        issue: issue.type,
        explanation: issue.description
      });
    }
  });

  return issues;
}

function identifyIssues(original, answerLine, explanation) {
  // Pattern 1: Identical words/phrases (not true paraphrases)
  if (explanation.includes('≈') && explanation.includes('→')) {
    const parts = explanation.split('≈');
    if (parts.length >= 2) {
      const leftPhrase = parts[0].replace(/"/g, '').trim();
      const rightPhrase = parts[1].split('→')[0].replace(/"/g, '').trim();
      
      // Check if phrases are identical or nearly identical
      if (leftPhrase === rightPhrase) {
        return {
          type: 'IDENTICAL_PHRASES',
          description: 'Left and right phrases are identical - not a true paraphrase'
        };
      }
      
      // Check for minimal differences (like formality only)
      if (leftPhrase.replace(/です$/, '') === rightPhrase.replace(/です$/, '') ||
          leftPhrase.replace(/ます$/, '') === rightPhrase.replace(/ます$/, '')) {
        return {
          type: 'MINIMAL_DIFFERENCE',
          description: 'Only formality difference - may not test true paraphrase understanding'
        };
      }
    }
  }

  // Pattern 2: Poor semantic matches
  const poorMatches = [
    { left: 'つもりです', right: '予定です', issue: 'Different nuances - intention vs schedule' },
    { left: 'もちろん', right: 'ぜひ', issue: 'Different meanings - certainty vs enthusiasm' },
    { left: '代わりに', right: 'てあげます', issue: 'Different concepts - substitution vs favor' },
    { left: '都', right: '市', issue: 'Different administrative levels' },
    { left: 'パート', right: 'アルバイト', issue: 'Vocabulary synonyms rather than grammar paraphrase' }
  ];

  for (const match of poorMatches) {
    if (explanation.includes(match.left) && explanation.includes(match.right)) {
      return {
        type: 'POOR_SEMANTIC_MATCH',
        description: match.issue
      };
    }
  }

  // Pattern 3: Grammar pattern confusion
  if (explanation.includes('both express') && explanation.includes('hearsay')) {
    // This is actually good - hearsay patterns are valid paraphrases
    return null;
  }

  // Pattern 4: Vocabulary-focused rather than grammar-focused
  if (explanation.includes('same kanji, different readings') || 
      explanation.includes('both mean') && !explanation.includes('express')) {
    return {
      type: 'VOCABULARY_FOCUSED',
      description: 'Tests vocabulary knowledge rather than paraphrase/grammar understanding'
    };
  }

  return null;
}

// Run the analysis
if (require.main === module) {
  analyzeN4ParaphraseQuestions();
}

module.exports = { analyzeN4ParaphraseQuestions };
