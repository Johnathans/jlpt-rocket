const fs = require('fs');

// Read the markdown file
const filePath = '/Users/john/Desktop/jlpt rocket/project/analysis/jlpt_n5_paraphrase_questions.md';
console.log('Reading paraphrase questions from:', filePath);

const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const questions = [];
let currentQuestion = null;

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
      englishTranslation: ''
    };
  }
  
  // Extract original sentence (after "**Original Sentence:**")
  if (line.startsWith('**Original Sentence:**') && currentQuestion && !currentQuestion.question) {
    const sentence = line.replace('**Original Sentence:**', '').trim();
    if (sentence) {
      currentQuestion.question = sentence;
    }
  }
  
  // Extract options (numbered list items starting with ①②③④)
  if (line.match(/^[①②③④]\s+/) && currentQuestion) {
    const optionText = line.replace(/^[①②③④]\s+/, '').trim();
    if (optionText && currentQuestion.options.length < 4) {
      currentQuestion.options.push(optionText);
    }
  }
  
  // Extract correct answer
  if (line.includes('**Correct Answer:**') && currentQuestion) {
    const match = line.match(/[①②③④]/);
    if (match) {
      const answerMap = {'①': 0, '②': 1, '③': 2, '④': 3};
      currentQuestion.correctAnswer = answerMap[match[0]];
    }
  }
  
  // Extract explanation from the correct option
  if (line.includes('- **Correct (Option') && currentQuestion) {
    const explanationMatch = line.match(/- \*\*Correct \(Option [①②③④]\):\*\*\s*(.+)/);
    if (explanationMatch) {
      currentQuestion.explanation = explanationMatch[1];
    }
  }
}

// Add the last question if valid
if (currentQuestion && currentQuestion.question && currentQuestion.options.length === 4) {
  questions.push(currentQuestion);
}

console.log(`Parsed ${questions.length} paraphrase questions`);

// Filter out invalid questions and clean up data
const validQuestions = questions.filter(q => 
  q.question && 
  q.options.length === 4 && 
  q.correctAnswer >= 0 && 
  q.correctAnswer < 4
).map(q => ({
  ...q,
  explanation: q.explanation || `This option has the same meaning as the original sentence.`,
  englishTranslation: '' // Will be empty for paraphrase questions as they focus on Japanese comprehension
}));

console.log(`Filtered to ${validQuestions.length} valid questions`);

// Generate TypeScript interface and data
const tsContent = `// N5 Paraphrase Test Data
// Auto-generated from jlpt_n5_paraphrase_questions.md

export interface ParaphraseQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  englishTranslation: string;
}

export const n5ParaphraseQuestions: ParaphraseQuestion[] = ${JSON.stringify(validQuestions, null, 2)};

export default n5ParaphraseQuestions;
`;

// Write the TypeScript file
const outputFile = '/Users/john/Desktop/jlpt rocket/project/lib/n5-paraphrase-data.ts';
fs.writeFileSync(outputFile, tsContent, 'utf8');

console.log(`Generated TypeScript data file: ${outputFile}`);
console.log(`Total questions: ${validQuestions.length}`);

// Show sample question
if (validQuestions.length > 0) {
  console.log('\nSample question:');
  console.log(JSON.stringify(validQuestions[0], null, 2));
}
