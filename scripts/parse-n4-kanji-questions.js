const fs = require('fs');
const path = require('path');

// Read the N4 kanji questions markdown file
const inputFile = path.join(__dirname, '../analysis/n4_kanji_questions (1).md');
const outputFile = path.join(__dirname, '../lib/n4-kanji-data.ts');

console.log('Reading N4 kanji questions file...');
const content = fs.readFileSync(inputFile, 'utf8');
console.log(`File size: ${content.length} characters`);

// Split content into sections by "## **VERIFICATION:**"
const sections = content.split('## **VERIFICATION:**');

const questions = [];

for (let i = 1; i < sections.length; i++) {
  const section = sections[i];
  const lines = section.split('\n').map(line => line.trim()).filter(line => line);
  
  let currentQuestion = {
    sentence: '',
    targetKanji: '',
    options: [],
    correctAnswer: -1,
    explanation: '',
    englishTranslation: ''
  };
  
  let inExplanation = false;
  let explanations = [];
  
  for (let j = 0; j < lines.length; j++) {
    const line = lines[j];
    
    // Look for question sentence with asterisk-marked kanji
    if (line.includes('\\*') && !line.startsWith('**') && !line.startsWith('*')) {
      const kanjiMatch = line.match(/\\*(.+?)\\*/);
      if (kanjiMatch) {
        currentQuestion.sentence = line.replace(/\\*/g, '');
        currentQuestion.targetKanji = kanjiMatch[1];
      }
      continue;
    }
    
    // Look for English translation in parentheses
    if (line.startsWith('(') && line.endsWith(')') && !currentQuestion.englishTranslation) {
      currentQuestion.englishTranslation = line.slice(1, -1);
      continue;
    }
    
    // Look for numbered options
    if (/^\d+\.\s/.test(line)) {
      const option = line.replace(/^\d+\.\s/, '');
      currentQuestion.options.push(option);
      continue;
    }
    
    // Look for correct answer
    if (line.startsWith('**Correct Answer:')) {
      const answerMatch = line.match(/\((\d+)\)/);
      if (answerMatch) {
        currentQuestion.correctAnswer = parseInt(answerMatch[1]) - 1;
      }
      continue;
    }
    
    // Start collecting explanations
    if (line.startsWith('**Explanation:**')) {
      inExplanation = true;
      explanations = [];
      continue;
    }
    
    // Collect explanation lines
    if (inExplanation && line.startsWith('*')) {
      explanations.push(line);
      continue;
    }
  }
  
  // Process the question if it has all required parts
  if (currentQuestion.sentence && currentQuestion.options.length === 4 && currentQuestion.correctAnswer !== -1) {
    // Create structured explanations
    const structuredExplanations = currentQuestion.options.map((option, index) => {
      const isCorrect = index === currentQuestion.correctAnswer;
      const explanationLine = explanations.find(exp => exp.includes(`(${index + 1})`));
      let reasoning = '';
      
      if (explanationLine) {
        const reasoningMatch = explanationLine.match(/\*\*.*?\*\*\s*(.+)/);
        if (reasoningMatch) {
          reasoning = reasoningMatch[1];
        }
      }
      
      return {
        option: option,
        isCorrect: isCorrect,
        reasoning: reasoning || (isCorrect ? 'This is the correct reading in this context.' : 'This is not the correct reading in this context.')
      };
    });
    
    currentQuestion.explanations = structuredExplanations;
    questions.push(currentQuestion);
    console.log(`Parsed question ${questions.length}: ${currentQuestion.targetKanji} - ${currentQuestion.sentence.substring(0, 30)}...`);
  }
}

console.log(`Total questions parsed: ${questions.length}`);

// Generate TypeScript interface and data compatible with existing kanji reading test
const tsContent = `// N4 Kanji Reading Test Data
// Generated from n4_kanji_questions (1).md
// Compatible with existing KanjiQuestion interface

export interface N4KanjiQuestion {
  id: number;
  kanji: string;
  sentence: string;
  options: string[];
  correctAnswer: number;
  explanations: {
    option: string;
    isCorrect: boolean;
    reasoning: string;
  }[];
  englishTranslation: string;
}

export const n4KanjiQuestions: N4KanjiQuestion[] = [
${questions.map((q, index) => `  {
    id: ${index + 1},
    kanji: "${q.targetKanji}",
    sentence: "${q.sentence.replace(/"/g, '\\"')}",
    options: [${q.options.map(opt => `"${opt}"`).join(', ')}],
    correctAnswer: ${q.correctAnswer},
    explanations: [
${q.explanations.map(exp => `      {
        option: "${exp.option}",
        isCorrect: ${exp.isCorrect},
        reasoning: "${exp.reasoning.replace(/"/g, '\\"')}"
      }`).join(',\n')}
    ],
    englishTranslation: "${q.englishTranslation.replace(/"/g, '\\"')}"
  }`).join(',\n')}
];`;

// Write the TypeScript file
fs.writeFileSync(outputFile, tsContent);
console.log(`Generated TypeScript data file: ${outputFile}`);
console.log(`Total N4 kanji questions: ${questions.length}`);
