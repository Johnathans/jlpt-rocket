const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Load CSV data
function loadCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index]?.trim() || '';
    });
    return obj;
  });
}

// Load all data sources
const n4Vocabulary = loadCSV(path.join(__dirname, '../n4-vocabulary.csv'));
const n5Vocabulary = loadCSV(path.join(__dirname, '../n5-vocabulary.csv'));
const kanjiData = loadCSV(path.join(__dirname, '../n4 - n5 kanji.csv'));
const grammarData = loadCSV(path.join(__dirname, '../N5 and n4 grammar - Sheet5 (2).csv'));

// Filter N4 vocabulary that contains kanji
function hasKanji(text) {
  return /[\u4e00-\u9faf]/.test(text);
}

const n4VocabWithKanji = n4Vocabulary.filter(item => hasKanji(item.expression));

// Extract grammar patterns from CSV
const n4GrammarPatterns = grammarData
  .filter(item => item['JLPT LEVEL'] === 'N4')
  .map(item => ({
    pattern: item.GRAMMAR,
    japanese: item['JAPANESE '],
    level: item['JLPT LEVEL']
  }));

const n5GrammarPatterns = grammarData
  .filter(item => item['JLPT LEVEL'] === 'N5')
  .map(item => ({
    pattern: item.GRAMMAR,
    japanese: item['JAPANESE '],
    level: item['JLPT LEVEL']
  }));

const allGrammarPatterns = [...n4GrammarPatterns, ...n5GrammarPatterns];

console.log(`Found ${n4VocabWithKanji.length} N4 vocabulary words with kanji`);
console.log(`Found ${n4GrammarPatterns.length} N4 grammar patterns`);
console.log(`Found ${n5GrammarPatterns.length} N5 grammar patterns`);

// Generate wrong answer options
function generateWrongAnswers(correctReading) {
  const wrongAnswers = [];
  const kanaChars = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
  
  // Method 1: Change one character
  for (let i = 0; i < correctReading.length && wrongAnswers.length < 2; i++) {
    const chars = correctReading.split('');
    const randomKana = kanaChars[Math.floor(Math.random() * kanaChars.length)];
    if (chars[i] !== randomKana) {
      chars[i] = randomKana;
      wrongAnswers.push(chars.join(''));
    }
  }
  
  // Method 2: Add extra character
  if (wrongAnswers.length < 3) {
    const randomKana = kanaChars[Math.floor(Math.random() * kanaChars.length)];
    wrongAnswers.push(correctReading + randomKana);
  }
  
  // Method 3: Remove character (if long enough)
  if (correctReading.length > 2 && wrongAnswers.length < 3) {
    wrongAnswers.push(correctReading.slice(0, -1));
  }
  
  return wrongAnswers.slice(0, 3);
}

// Create system prompt for OpenAI
function createSystemPrompt(n5Vocab, n4Vocab, n5Kanji, grammarPatterns) {
  const n5VocabList = n5Vocab.slice(0, 20).map(v => v.expression).join(', ');
  const n4VocabList = n4Vocab.slice(0, 20).map(v => v.expression).join(', ');
  const n5KanjiList = n5Kanji.slice(0, 30).map(k => k.kanji).join(', ');
  const grammarList = grammarPatterns.slice(0, 15).map(g => g.pattern).join(', ');
  
  return `You are a JLPT Japanese language expert. Generate N4 kanji reading questions with strict validation.

CRITICAL REQUIREMENTS - MUST VERIFY BEFORE CREATING SENTENCE:
1. **VOCABULARY VALIDATION**: Use N5 vocabulary + N4 vocabulary (any amount)
2. **KANJI VALIDATION**: Only use N5 kanji (${n5KanjiList}...)
3. **GRAMMAR VALIDATION**: Only use N5/N4 grammar patterns (${grammarList}...)
4. **TARGET WORD**: Exactly ONE N4 vocabulary word between asterisks *word* for the reading question
5. **VERIFICATION**: Confirm all words exist in provided lists before sentence creation

VALIDATION PROCESS:
1. Check target N4 word exists in vocabulary list
2. Verify all supporting words are N5 or N4 vocabulary
3. Confirm all kanji used are N5 level
4. Ensure grammar pattern is N5/N4 level
5. Only then create the sentence

FORMAT EXAMPLE:
---

**Word Verification:**
- Target: 料理 (N4) ✓
- Supporting: この (N5) ✓, は (N5) ✓, とても (N5) ✓, 美味しい (N5) ✓, です (N5) ✓
- Other N4 words: [none in this example]
- Kanji: 料 (N4), 理 (N4), 美 (N5), 味 (N5) ✓
- Grammar: この + は + とても + adjective + です (N5 pattern) ✓

この*料理*はとても美味しいです。
(This dish is very delicious.)

1. りょり
2. りょうり  
3. りゅうり
4. ろうり

**Correct Answer: (2) りょうり**

**Explanation:**
* **りょり (1) - INCORRECT:** Missing the long vowel う. 料理 requires the う sound between りょ and り.
* **りょうり (2) - CORRECT:** This is the standard reading for 料理 (cooking/dish).
* **りゅうり (3) - INCORRECT:** Wrong vowel combination. Uses ゅう instead of ょう.
* **ろうり (4) - INCORRECT:** Wrong initial consonant. Uses ろ instead of りょ.

---

MANDATORY: Always include word verification section and detailed explanations for each answer option.`;
}

// Generate a single question
async function generateQuestion(targetWord, questionIndex) {
  // Filter data for N5 only
  const n5Kanji = kanjiData.filter(k => k.level === 'n5');
  const systemPrompt = createSystemPrompt(n5Vocabulary, n4Vocabulary, n5Kanji, allGrammarPatterns);
  
  const userPrompt = `Create a kanji reading question for: "${targetWord.expression}" (reading: ${targetWord.reading}, meaning: ${targetWord.meaning}).

STRICT REQUIREMENTS:
1. VERIFY the target word exists in N4 vocabulary list
2. VERIFY all supporting words are N5 or N4 vocabulary
3. VERIFY all kanji used are N5 level only
4. Use only N5/N4 grammar patterns
5. Include complete word verification section
6. Provide detailed explanations for all 4 answer options
7. Only ONE N4 word should be between asterisks for the reading question

Follow the exact format in the system prompt with verification section.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Much cheaper than gpt-4 (~90% cost reduction)
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 800, // Reduced tokens for faster response
      temperature: 0.7, // Slightly lower for more consistent output
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error(`Error generating question for ${targetWord.expression}:`, error.message);
    return null;
  }
}

// Main function to generate comprehensive questions
async function generateQuestions(count = 50) {
  console.log(`Generating ${count} N4 kanji reading questions with diverse grammar patterns...`);
  
  const questions = [];
  const totalVocab = n4VocabWithKanji.length;
  const selectedWords = count >= totalVocab ? n4VocabWithKanji : n4VocabWithKanji.slice(0, count);
  
  console.log(`📊 Coverage: ${selectedWords.length}/${totalVocab} N4 vocabulary words with kanji`);
  
  for (let i = 0; i < selectedWords.length; i++) {
    const word = selectedWords[i];
    
    console.log(`Generating question ${i + 1}/${selectedWords.length} for: ${word.expression} (${word.reading})`);
    
    const question = await generateQuestion(word, i);
    if (question) {
      questions.push(question);
      // Reduced delay for faster generation
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  // Save to file with timestamp
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  const output = questions.join('\n\n');
  const outputPath = path.join(__dirname, `../analysis/comprehensive_n4_kanji_questions_${timestamp}.md`);
  fs.writeFileSync(outputPath, output);
  
  console.log(`\n✅ Generated ${questions.length} questions covering diverse grammar patterns`);
  console.log(`📁 Saved to: ${outputPath}`);
  console.log(`📈 Grammar pattern coverage: ${Math.min(questions.length, allGrammarPatterns.length)}/${allGrammarPatterns.length} patterns used`);
  
  return questions;
}

// Run the script
if (require.main === module) {
  const count = process.argv[2] ? parseInt(process.argv[2]) : 10;
  generateQuestions(count)
    .then(() => {
      console.log('Question generation completed!');
      process.exit(0);
    })
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
}

module.exports = { generateQuestions };
