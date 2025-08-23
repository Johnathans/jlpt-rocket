const fs = require('fs');

// Read the markdown file
const filePath = '/Users/john/Desktop/jlpt rocket/project/analysis/n5_orthography_questions.md';
console.log('Reading orthography questions from:', filePath);

const content = fs.readFileSync(filePath, 'utf8');

// Parse the markdown content
const questions = [];
let currentQuestion = null;
let debugCount = 0;

const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  // Match question headers
  if (line.match(/^## Question \d+/)) {
    if (currentQuestion && currentQuestion.question && currentQuestion.options.length === 4) {
      questions.push(currentQuestion);
    }
    
    const questionNumber = parseInt(line.match(/\d+/)[0]);
    currentQuestion = {
      id: questionNumber,
      question: '',
      options: [],
      correctAnswer: 0,
      explanation: '',
      targetWord: '',
      englishTranslation: ''
    };
  }
  
  // Extract target word
  if (line.startsWith('TARGET WORD:') && currentQuestion) {
    currentQuestion.targetWord = line.replace('TARGET WORD:', '').trim();
  }
  
  // Extract Japanese sentence with underlined portion - keep the <u> tags
  if (line.includes('<u>') && line.includes('</u>') && currentQuestion && !currentQuestion.question) {
    currentQuestion.question = line;
  }
  
  // Extract English translation
  if (line.startsWith('(') && line.endsWith(')') && currentQuestion && !currentQuestion.englishTranslation) {
    currentQuestion.englishTranslation = line.slice(1, -1);
  }
  
  // Extract options (looking for numbered list items with kanji in asterisks)
  if (line.match(/^\d+\.\s*\*.*\*/) && currentQuestion) {
    const optionText = line.replace(/^\d+\.\s*\*/, '').replace(/\*$/, '');
    if (optionText && currentQuestion.options.length < 4) {
      currentQuestion.options.push(optionText);
    }
  }
  
  // Extract correct answer
  if (line.includes('**Correct Answer:') && currentQuestion) {
    const match = line.match(/\((\d+)\)/);
    if (match) {
      currentQuestion.correctAnswer = parseInt(match[1]) - 1; // Convert to 0-based index
    }
  }
  
  // Extract explanation
  if (line.startsWith('- ***') && line.includes('- CORRECT:') && currentQuestion) {
    const explanationMatch = line.match(/- CORRECT:\*\*\s*(.+)\*/);
    if (explanationMatch) {
      currentQuestion.explanation = explanationMatch[1];
    }
  }
}

// Add the last question if valid
if (currentQuestion && currentQuestion.question && currentQuestion.options.length === 4) {
  questions.push(currentQuestion);
}

console.log(`Parsed ${questions.length} orthography questions`);

// Filter out invalid questions and clean up data
const validQuestions = questions.filter(q => 
  q.question && 
  q.options.length === 4 && 
  q.targetWord &&
  q.englishTranslation &&
  q.correctAnswer >= 0 && 
  q.correctAnswer < 4
).map(q => ({
  ...q,
  explanation: q.explanation || `This is the correct kanji for "${q.targetWord}"`
}));

console.log(`Filtered to ${validQuestions.length} valid questions`);

// Generate TypeScript interface and data
const tsContent = `// N5 Orthography Test Data
// Auto-generated from n5_orthography_questions.md

export interface OrthographyQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  targetWord: string;
  englishTranslation: string;
}

export const n5OrthographyQuestions: OrthographyQuestion[] = ${JSON.stringify(validQuestions, null, 2)};

export default n5OrthographyQuestions;
`;

// Write the TypeScript file
const outputFile = '/Users/john/Desktop/jlpt rocket/project/lib/n5-orthography-data.ts';
fs.writeFileSync(outputFile, tsContent, 'utf8');

console.log(`Generated TypeScript data file: ${outputFile}`);
console.log(`Total questions: ${validQuestions.length}`);

// Show sample question
if (validQuestions.length > 0) {
  console.log('\nSample question:');
  console.log(JSON.stringify(validQuestions[0], null, 2));
}
