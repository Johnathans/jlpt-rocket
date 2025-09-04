const fs = require('fs');

// Read the vocabulary reading questions files
const part1Content = fs.readFileSync('/Users/john/Desktop/jlpt rocket/project/n4-vocabulary-reading-questions.md', 'utf8');
const part2Content = fs.readFileSync('/Users/john/Desktop/jlpt rocket/project/n4-vocabulary-reading-questions-part2.md', 'utf8');

// Extract questions from markdown content
const extractQuestions = (content, startId) => {
  const questions = [];
  
  // Split by question headers
  const sections = content.split(/## Question \d+/);
  
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    
    // Extract sentence with kanji (between asterisks)
    const sentenceMatch = section.match(/([^(]*\*([^*]+)\*[^(]*)\s*\(([^)]+)\)/);
    if (!sentenceMatch) continue;
    
    const fullSentence = sentenceMatch[1].trim();
    const kanji = sentenceMatch[2];
    const sentence = fullSentence.replace(/\*/g, '');
    const englishTranslation = sentenceMatch[3];
    
    // Extract options (numbered list)
    const optionMatches = section.match(/\d+\.\s+([^\n]+)/g);
    const options = optionMatches ? optionMatches.map(opt => opt.replace(/\d+\.\s+/, '').trim()) : [];
    
    // Extract correct answer
    const correctMatch = section.match(/\*\*Correct Answer: \((\d+)\)/);
    const correctAnswer = correctMatch ? parseInt(correctMatch[1]) - 1 : 0;
    
    // Extract explanations
    const explanations = [];
    const explainMatches = section.match(/\* \*\*([^*]+) \((\d+)\) - (CORRECT|INCORRECT):\*\* ([^*\n]+)/g);
    
    if (explainMatches) {
      explainMatches.forEach(expl => {
        const explMatch = expl.match(/\* \*\*([^*]+) \((\d+)\) - (CORRECT|INCORRECT):\*\* ([^*\n]+)/);
        if (explMatch) {
          explanations.push({
            option: explMatch[1].trim(),
            isCorrect: explMatch[3] === 'CORRECT',
            reasoning: explMatch[4].trim()
          });
        }
      });
    }
    
    // Fill in missing explanations for options not found
    options.forEach((option, index) => {
      if (!explanations.find(exp => exp.option === option)) {
        explanations.push({
          option: option,
          isCorrect: index === correctAnswer,
          reasoning: "Standard reading explanation."
        });
      }
    });
    
    questions.push({
      id: startId + i - 1,
      kanji,
      sentence,
      options,
      correctAnswer,
      explanations,
      englishTranslation
    });
  }
  
  return questions;
};

// Extract questions from both files
const part1Questions = extractQuestions(part1Content, 186);
const part2Questions = extractQuestions(part2Content, 186 + part1Questions.length);

console.log(`Part 1 questions: ${part1Questions.length}`);
console.log(`Part 2 questions: ${part2Questions.length}`);

// Combine all questions
const allQuestions = [...part1Questions, ...part2Questions];
console.log(`Total questions: ${allQuestions.length}`);

// Generate TypeScript content
const tsContent = `// N4 Vocabulary Reading Test Data
// Converted from n4-vocabulary-reading-questions.md and n4-vocabulary-reading-questions-part2.md
// Compatible with existing N4KanjiQuestion interface

export interface N4VocabularyReadingQuestion {
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

export const n4VocabularyReadingQuestions: N4VocabularyReadingQuestion[] = [
${allQuestions.map(q => `  {
    id: ${q.id},
    kanji: "${q.kanji}",
    sentence: "${q.sentence}",
    options: [${q.options.map(opt => `"${opt}"`).join(', ')}],
    correctAnswer: ${q.correctAnswer},
    explanations: [
${q.explanations.map(exp => `      {
        option: "${exp.option}",
        isCorrect: ${exp.isCorrect},
        reasoning: "${exp.reasoning}"
      }`).join(',\n')}
    ],
    englishTranslation: "${q.englishTranslation}"
  }`).join(',\n')}
];`;

// Write the TypeScript file
fs.writeFileSync('/Users/john/Desktop/jlpt rocket/project/lib/n4-vocabulary-reading-data.ts', tsContent);
console.log('Generated TypeScript data file with all vocabulary reading questions');
