const fs = require('fs');
const path = require('path');

// Read the markdown file
const inputFile = path.join(__dirname, '../analysis/custom_n5_questions_vocab_grammar (1).md');
const outputFile = path.join(__dirname, '../lib/n5-contextual-expressions-data.ts');

console.log('Reading N5 contextual expressions markdown file...');
const content = fs.readFileSync(inputFile, 'utf8');

// Parse the markdown content
const questions = [];
const questionBlocks = content.split('## Question ').slice(1); // Remove the header part

questionBlocks.forEach((block, index) => {
  const lines = block.trim().split('\n');
  
  // Extract question number
  const questionNumber = index + 1;
  
  // Find the main question text (bold text with blanks)
  let questionText = '';
  let options = [];
  let context = '';
  let correctAnswer = '';
  let explanation = '';
  
  let currentSection = 'question';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('**') && line.endsWith('**') && line.includes('________')) {
      // This is the main question text
      questionText = line.replace(/\*\*/g, '').trim();
    } else if (line.match(/^\d+\.\s/)) {
      // This is an option
      const optionText = line.replace(/^\d+\.\s/, '').trim();
      options.push(optionText);
    } else if (line.startsWith('*Context:')) {
      // Extract context
      context = line.replace('*Context:', '').trim();
    } else if (line.startsWith('*Answer:')) {
      // Extract answer and explanation
      const answerLine = line.replace('*Answer:', '').trim();
      const parts = answerLine.split(' - ');
      if (parts.length >= 2) {
        correctAnswer = parts[0].trim();
        explanation = parts.slice(1).join(' - ').replace(/"/g, '').trim();
      }
    }
  }
  
  // Determine correct answer index (convert "1" to 0, "2" to 1, etc.)
  const correctAnswerIndex = parseInt(correctAnswer) - 1;
  
  if (questionText && options.length === 4 && correctAnswerIndex >= 0) {
    questions.push({
      id: questionNumber,
      question: questionText,
      options: options,
      correctAnswer: correctAnswerIndex,
      context: context,
      explanation: explanation,
      type: 'multiple-choice'
    });
  }
});

console.log(`Parsed ${questions.length} contextual expression questions`);

// Generate TypeScript interface and data
const tsContent = `// N5 Contextual Expressions Test Data
// Generated from custom_n5_questions_vocab_grammar (1).md

export interface ContextualExpressionQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  context: string;
  explanation: string;
  type: 'multiple-choice';
}

export const n5ContextualExpressions: ContextualExpressionQuestion[] = [
${questions.map(q => `  {
    id: ${q.id},
    question: "${q.question.replace(/"/g, '\\"')}",
    options: [
      "${q.options[0].replace(/"/g, '\\"')}",
      "${q.options[1].replace(/"/g, '\\"')}",
      "${q.options[2].replace(/"/g, '\\"')}",
      "${q.options[3].replace(/"/g, '\\"')}"
    ],
    correctAnswer: ${q.correctAnswer},
    context: "${q.context.replace(/"/g, '\\"')}",
    explanation: "${q.explanation.replace(/"/g, '\\"')}",
    type: "multiple-choice" as const
  }`).join(',\n')}
];

// Export total count for convenience
export const totalContextualExpressions = ${questions.length};
`;

// Write the TypeScript file
fs.writeFileSync(outputFile, tsContent, 'utf8');

console.log(`✅ Generated TypeScript file: ${outputFile}`);
console.log(`📊 Total questions: ${questions.length}`);
console.log('🎯 Ready for integration into JLPT Rocket!');
