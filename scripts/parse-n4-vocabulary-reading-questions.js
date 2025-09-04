const fs = require('fs');
const path = require('path');

// Parse N4 vocabulary reading questions from markdown files
function parseN4VocabularyReadingQuestions() {
  const file1 = path.join(__dirname, '..', 'n4-vocabulary-reading-questions.md');
  const file2 = path.join(__dirname, '..', 'n4-vocabulary-reading-questions-part2.md');
  
  const content1 = fs.readFileSync(file1, 'utf8');
  const content2 = fs.readFileSync(file2, 'utf8');
  
  const questions1 = parseQuestionsFromContent(content1, 1);
  const questions2 = parseQuestionsFromContent(content2, questions1.length + 1);
  
  const allQuestions = [...questions1, ...questions2];
  
  console.log(`Parsed ${allQuestions.length} N4 vocabulary reading questions`);
  return allQuestions;
}

function parseQuestionsFromContent(content, startId) {
  const questions = [];
  
  // Split content by question markers
  const questionBlocks = content.split(/## Question \d+/).slice(1);
  
  questionBlocks.forEach((block, index) => {
    try {
      const questionId = startId + index;
      
      // Extract sentence with asterisk-marked word
      const sentenceMatch = block.match(/(.+?\*[^*]+\*.+?)(?:\n|$)/);
      if (!sentenceMatch) return;
      
      const sentence = sentenceMatch[1].trim();
      
      // Extract vocabulary from asterisk-marked word in sentence
      const vocabInSentenceMatch = sentence.match(/\*([^*]+)\*/);
      if (!vocabInSentenceMatch) return;
      
      const vocabulary = vocabInSentenceMatch[1];
      const reading = ''; // Will be determined by correct answer
      const meaning = ''; // Extract from English translation if available
      
      // Extract options (1-4)
      const optionMatches = block.match(/1\. (.+?)\n2\. (.+?)\n3\. (.+?)\n4\. (.+?)\n/);
      if (!optionMatches) return;
      
      const options = [optionMatches[1], optionMatches[2], optionMatches[3], optionMatches[4]];
      
      // Extract correct answer
      const correctAnswerMatch = block.match(/\*\*Correct Answer: \((\d+)\)/);
      if (!correctAnswerMatch) return;
      
      const correctAnswer = parseInt(correctAnswerMatch[1]) - 1; // Convert to 0-based index
      
      // Extract explanations
      const explanations = [];
      const explanationSection = block.split('**Explanation:**')[1];
      if (explanationSection) {
        const explanationLines = explanationSection.split('\n').filter(line => line.trim().startsWith('*'));
        
        explanationLines.forEach((line, idx) => {
          const isCorrect = line.includes('CORRECT');
          const reasoning = line.replace(/^\*\s*\*\*[^*]+\*\*\s*-\s*(CORRECT|INCORRECT):\s*/, '').trim();
          
          explanations.push({
            option: options[idx] || '',
            isCorrect,
            reasoning
          });
        });
      }
      
      // Extract English translation from parentheses
      const englishMatch = block.match(/\(([^)]+)\)/);
      const englishTranslation = englishMatch ? englishMatch[1].trim() : '';
      
      questions.push({
        id: questionId,
        vocabulary,
        reading,
        meaning,
        sentence,
        options,
        correctAnswer,
        explanations,
        englishTranslation
      });
      
    } catch (error) {
      console.error(`Error parsing question ${startId + index}:`, error.message);
    }
  });
  
  return questions;
}

// Generate expanded N4 kanji data file with vocabulary reading questions
function generateExpandedN4KanjiData() {
  // Get existing N4 kanji questions
  const existingDataPath = path.join(__dirname, '..', 'lib', 'n4-kanji-data.ts');
  const existingContent = fs.readFileSync(existingDataPath, 'utf8');
  
  // Extract existing questions array
  const existingMatch = existingContent.match(/export const n4KanjiQuestions: N4KanjiQuestion\[\] = (\[[\s\S]*?\]);/);
  if (!existingMatch) {
    throw new Error('Could not find existing N4 kanji questions');
  }
  
  const existingQuestions = eval(existingMatch[1]);
  console.log(`Found ${existingQuestions.length} existing N4 kanji questions`);
  
  // Parse vocabulary reading questions
  const vocabQuestions = parseN4VocabularyReadingQuestions();
  
  // Convert vocabulary questions to kanji question format
  const convertedQuestions = vocabQuestions.map((vq, index) => ({
    id: existingQuestions.length + index + 1,
    kanji: vq.vocabulary,
    sentence: vq.sentence,
    options: vq.options,
    correctAnswer: vq.correctAnswer,
    explanations: vq.explanations,
    englishTranslation: vq.englishTranslation
  }));
  
  // Combine all questions
  const allQuestions = [...existingQuestions, ...convertedQuestions];
  
  const tsContent = `// N4 Kanji Reading Test Data
// Generated from n4_kanji_questions (1).md + n4-vocabulary-reading-questions.md + n4-vocabulary-reading-questions-part2.md
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

export const n4KanjiQuestions: N4KanjiQuestion[] = ${JSON.stringify(allQuestions, null, 2)};

export default n4KanjiQuestions;
`;

  fs.writeFileSync(existingDataPath, tsContent);
  
  console.log(`Updated ${existingDataPath} with ${allQuestions.length} total questions (${existingQuestions.length} existing + ${convertedQuestions.length} new)`);
  return allQuestions;
}

// Run the script
if (require.main === module) {
  generateExpandedN4KanjiData();
}

module.exports = { parseN4VocabularyReadingQuestions, generateExpandedN4KanjiData };
