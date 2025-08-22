const fs = require('fs');
const path = require('path');

// Parse the N5 kanji questions markdown file and convert to test data format
function parseN5KanjiQuestions() {
  const mdFilePath = path.join(__dirname, '../analysis/n5_kanji_questions (1).md');
  const content = fs.readFileSync(mdFilePath, 'utf8');
  
  // Split content by questions
  const questionBlocks = content.split(/## Question \d+/).filter(block => block.trim());
  
  const testQuestions = [];
  let questionId = 1;
  
  questionBlocks.forEach(block => {
    try {
      const lines = block.split('\n').map(line => line.trim()).filter(line => line);
      
      // Extract target word
      const targetWordLine = lines.find(line => line.startsWith('TARGET WORD:'));
      if (!targetWordLine) return;
      const targetWord = targetWordLine.replace('TARGET WORD:', '').trim();
      
      // Extract CSV entry for meaning
      const csvEntryLine = lines.find(line => line.startsWith('CSV ENTRY:'));
      if (!csvEntryLine) return;
      const csvMatch = csvEntryLine.match(/CSV ENTRY: "(.+?)" ✓ FOUND/);
      if (!csvMatch) return;
      const csvEntry = csvMatch[1];
      
      // Extract sentence and English translation
      const sentenceIndex = lines.findIndex(line => line.includes('*' + targetWord + '*'));
      if (sentenceIndex === -1) return;
      const sentence = lines[sentenceIndex].replace(/\*/g, '');
      const englishTranslation = lines[sentenceIndex + 1]?.replace(/[()]/g, '') || '';
      
      // Extract options (numbered 1-4)
      const options = [];
      for (let i = 1; i <= 4; i++) {
        const optionLine = lines.find(line => line.startsWith(`${i}.`));
        if (optionLine) {
          options.push(optionLine.replace(`${i}.`, '').trim());
        }
      }
      
      // Extract correct answer
      const correctAnswerLine = lines.find(line => line.startsWith('**Correct Answer:'));
      if (!correctAnswerLine) return;
      const correctAnswerMatch = correctAnswerLine.match(/\((\d+)\)/);
      if (!correctAnswerMatch) return;
      const correctAnswer = parseInt(correctAnswerMatch[1]) - 1; // Convert to 0-based index
      
      // Extract explanations
      const explanations = [];
      const explanationStart = lines.findIndex(line => line === '**Explanation:**');
      if (explanationStart !== -1) {
        for (let i = explanationStart + 1; i < lines.length; i++) {
          const line = lines[i];
          if (line.startsWith('- **')) {
            const match = line.match(/- \*\*(.+?) \(\d+\) - (CORRECT|INCORRECT):\*\* (.+)/);
            if (match) {
              explanations.push({
                option: match[1],
                isCorrect: match[2] === 'CORRECT',
                reasoning: match[3]
              });
            }
          }
        }
      }
      
      // Find kanji position in sentence
      const kanjiPosition = sentence.indexOf(targetWord);
      
      // Create test question object
      const testQuestion = {
        id: questionId++,
        sentence: sentence,
        englishTranslation: englishTranslation,
        underlinedKanji: targetWord,
        kanjiPosition: kanjiPosition,
        options: options,
        correctAnswer: correctAnswer,
        type: 'multiple-choice',
        csvEntry: csvEntry,
        explanations: explanations,
        verification: true
      };
      
      testQuestions.push(testQuestion);
      
    } catch (error) {
      console.warn(`Error parsing question block: ${error.message}`);
    }
  });
  
  return testQuestions;
}

// Generate the test data file
function generateTestDataFile() {
  const questions = parseN5KanjiQuestions();
  
  const outputContent = `// N5 Kanji Reading Test Data
// Generated from n5_kanji_questions.md
// Total questions: ${questions.length}

export interface KanjiTestQuestion {
  id: number;
  sentence: string;
  englishTranslation: string;
  underlinedKanji: string;
  kanjiPosition: number;
  options: string[];
  correctAnswer: number;
  type: 'multiple-choice' | 'fill-in-blank';
  csvEntry: string;
  explanations: {
    option: string;
    isCorrect: boolean;
    reasoning: string;
  }[];
  verification: boolean;
}

export const n5KanjiReadingQuestions: KanjiTestQuestion[] = ${JSON.stringify(questions, null, 2)};

export default n5KanjiReadingQuestions;
`;
  
  const outputPath = path.join(__dirname, '../lib/n5-kanji-test-data.ts');
  fs.writeFileSync(outputPath, outputContent, 'utf8');
  
  console.log(`✅ Generated ${questions.length} test questions`);
  console.log(`📁 Output file: ${outputPath}`);
  console.log(`🎯 Sample question: ${questions[0]?.sentence || 'None'}`);
  
  return questions;
}

// Run the script
if (require.main === module) {
  generateTestDataFile();
}

module.exports = { parseN5KanjiQuestions, generateTestDataFile };
