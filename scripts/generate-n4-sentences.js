const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Load data
function loadVocabulary() {
  const vocabPath = path.join(__dirname, '../public/data/vocabulary.json');
  return JSON.parse(fs.readFileSync(vocabPath, 'utf8'));
}

function loadKanji() {
  const kanjiPath = path.join(__dirname, '../public/data/kanji.json');
  return JSON.parse(fs.readFileSync(kanjiPath, 'utf8'));
}

function loadExistingSentences() {
  const sentencesPath = path.join(__dirname, '../public/data/sentences.json');
  return JSON.parse(fs.readFileSync(sentencesPath, 'utf8'));
}

// N4 Grammar patterns from the app
const n4GrammarPatterns = [
  '～し', 'そうです', 'てみる', 'なら', '(period)に(frequency)', '～がほしい', '～たがる',
  '～かもしれない', '～たらどうですか', 'Number+も', 'しか～ない', '～ておく', '～よう',
  '～おう', '～てあげる', '～てくれる', '～てもらう', '～ていただけませんか', '～といいです',
  '～てすみません', '～そうです', '～させる', '～なさい', '～ば/～れば', '～ても', '～たら',
  '～なくてもいい', '～みたい', '～てしまう', 'Dictionary form+と', '～ながら', '～ばよかった',
  '～てくれてありがとう', '～てよかった', '～はずです', '～ないで', '～かどうか', '～という～',
  '～やすい', '～にくい', '～られる', '～てある', '～ているあいだに,～', '～く/～にする',
  '～てほしい', 'のに', '～のような', '～のように', '～させられる', '～ことにする'
];

async function generateSentenceWithOpenAI(grammarPattern, vocabularyList, kanjiList, usedVocab) {
  const prompt = `You are a Japanese language teacher creating natural, authentic JLPT N4 sentences that students would actually encounter.

Grammar pattern to use: ${grammarPattern}

Create ONE natural Japanese sentence that:
- Uses the grammar pattern "${grammarPattern}" correctly
- Uses primarily N4-level vocabulary and kanji
- Can use N5 vocabulary as needed for natural sentences
- Use N3 vocabulary ONLY if absolutely necessary for variety (prefer N4/N5)
- Is something an intermediate beginner would actually say or hear in real life
- Sounds natural to a native speaker
- Is about daily life, work, school, relationships, opinions, experiences, etc.
- Is UNIQUE and CREATIVE - avoid overly simple or common sentences
- Uses varied vocabulary and situations
- Is slightly more complex than N5 level (longer sentences, more nuanced meanings)

Good examples of natural N4 sentences:
- 安いし、おいしいし、最高です。 (It's cheap, delicious, and the best.)
- 雨が降りそうです。 (It looks like it will rain.)
- 新しい車がほしいです。 (I want a new car.)
- 音楽を聞きながら勉強します。 (I study while listening to music.)
- 会えてよかったです。 (I'm glad I could meet you.)

Avoid:
- Unnatural combinations
- Forcing specific vocabulary unnaturally
- Overly complex or rare situations
- Sentences that sound like textbook exercises
- Very simple sentences that are too basic for N4 level

Respond ONLY with valid JSON in this exact format:
{
  "japanese": "your natural Japanese sentence",
  "english": "accurate, natural English translation",
  "vocabulary_used": ["word1", "word2"],
  "grammar_points": ["${grammarPattern}"],
  "difficulty": 2
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "You are a Japanese language expert. Always respond with valid JSON only, no additional text."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    const response = completion.choices[0].message.content.trim();
    
    // Parse JSON response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    
    const sentenceData = JSON.parse(jsonMatch[0]);
    
    // Extract kanji from the Japanese text
    const kanjiUsed = (sentenceData.japanese.match(/[一-龯]/g) || []);
    const uniqueKanji = [...new Set(kanjiUsed)];
    
    return {
      id: uuidv4(),
      japanese_text: sentenceData.japanese,
      english_translation: sentenceData.english,
      jlpt_level: 'N4',
      difficulty_level: sentenceData.difficulty || 2,
      grammar_points: sentenceData.grammar_points || [grammarPattern],
      vocabulary_used: sentenceData.vocabulary_used || [],
      kanji_used: uniqueKanji,
      audio_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error generating sentence for ${grammarPattern}:`, error.message);
    return null;
  }
}

async function generateN4Sentences() {
  console.log('=== Generating N4 Sentences with OpenAI ===\n');
  
  // Load data
  const vocabulary = loadVocabulary();
  const kanji = loadKanji();
  const existingSentences = loadExistingSentences();
  
  // Filter N4/N5 vocabulary and kanji (prefer N4, can use N5, N3 only if necessary)
  const n4Vocab = vocabulary.filter(v => ['N4', 'N5', 'N3'].includes(v.jlpt_level));
  const n4Kanji = kanji.filter(k => ['N4', 'N5', 'N3'].includes(k.jlpt_level));
  
  console.log(`Loaded ${n4Vocab.length} N4/N3/N5 vocabulary words`);
  console.log(`Loaded ${n4Kanji.length} N4/N3/N5 kanji`);
  
  const currentN4Count = existingSentences.filter(s => s.jlpt_level === 'N4').length;
  
  // Check grammar pattern coverage
  const grammarCoverage = {};
  n4GrammarPatterns.forEach(pattern => {
    grammarCoverage[pattern] = 0;
  });
  
  existingSentences.filter(s => s.jlpt_level === 'N4').forEach(s => {
    if (s.grammar_points) {
      s.grammar_points.forEach(pattern => {
        if (grammarCoverage[pattern] !== undefined) {
          grammarCoverage[pattern]++;
        }
      });
    }
  });
  
  console.log(`\nCurrent N4 sentences: ${currentN4Count}`);
  console.log(`Grammar patterns: ${n4GrammarPatterns.length}`);
  
  // Calculate how many sentences needed for good coverage (aim for 10 per pattern)
  const minPerPattern = 10;
  const totalNeeded = n4GrammarPatterns.length * minPerPattern;
  const needed = Math.max(0, totalNeeded - currentN4Count);
  
  console.log(`Target for full coverage: ~${totalNeeded} sentences (${minPerPattern} per pattern)`);
  console.log(`Need to generate: ~${needed}\n`);
  
  console.log('Current grammar coverage:');
  const sortedCoverage = Object.entries(grammarCoverage).sort((a, b) => a[1] - b[1]);
  sortedCoverage.slice(0, 10).forEach(([pattern, count]) => {
    console.log(`  ${pattern}: ${count} sentences`);
  });
  console.log(`  ... (showing patterns with least coverage)\n`);
  
  if (needed <= 0) {
    console.log('✓ Good coverage already achieved!');
    return;
  }
  
  const newSentences = [];
  const vocabWords = n4Vocab.map(v => v.word);
  const usedVocab = new Set();
  
  // Track existing Japanese sentences to prevent duplicates
  const existingJapanese = new Set();
  existingSentences.forEach(s => {
    existingJapanese.add(s.japanese_text);
  });
  
  // Track vocabulary from existing sentences
  existingSentences.filter(s => s.jlpt_level === 'N4').forEach(s => {
    if (s.vocabulary_used) {
      s.vocabulary_used.forEach(v => usedVocab.add(v));
    }
  });
  
  console.log(`Already used ${usedVocab.size} unique vocabulary words in existing sentences`);
  console.log(`Tracking ${existingJapanese.size} existing sentences to prevent duplicates\n`);
  
  // Generate sentences by cycling through grammar patterns
  let patternIndex = 0;
  let attempts = 0;
  const maxAttempts = needed * 3; // Allow retries for duplicates
  
  while (newSentences.length < needed && attempts < maxAttempts) {
    const grammarPattern = n4GrammarPatterns[patternIndex % n4GrammarPatterns.length];
    
    console.log(`Generating ${newSentences.length + 1}/${needed}: ${grammarPattern}...`);
    
    const sentence = await generateSentenceWithOpenAI(grammarPattern, vocabWords, n4Kanji, usedVocab);
    
    if (sentence) {
      // Check for duplicate
      if (existingJapanese.has(sentence.japanese_text)) {
        console.log(`  ⚠️  Duplicate detected, skipping: ${sentence.japanese_text}\n`);
        attempts++;
        continue;
      }
      
      // Add to tracking sets
      existingJapanese.add(sentence.japanese_text);
      newSentences.push(sentence);
      
      // Track newly used vocabulary
      if (sentence.vocabulary_used) {
        sentence.vocabulary_used.forEach(v => usedVocab.add(v));
      }
      
      console.log(`  ✓ ${sentence.japanese_text}`);
      console.log(`     ${sentence.english_translation}\n`);
    } else {
      console.log(`  ✗ Failed to generate\n`);
    }
    
    patternIndex++;
    attempts++;
    
    // Save progress every 10 sentences
    if (newSentences.length % 10 === 0 && newSentences.length > 0) {
      const allSentences = [...existingSentences, ...newSentences];
      allSentences.sort((a, b) => {
        const levelOrder = { 'N5': 1, 'N4': 2, 'N3': 3, 'N2': 4, 'N1': 5 };
        const levelDiff = levelOrder[a.jlpt_level] - levelOrder[b.jlpt_level];
        if (levelDiff !== 0) return levelDiff;
        return a.difficulty_level - b.difficulty_level;
      });
      
      const sentencesPath = path.join(__dirname, '../public/data/sentences.json');
      fs.writeFileSync(sentencesPath, JSON.stringify(allSentences, null, 2), 'utf8');
      console.log(`  💾 Progress saved (${newSentences.length} new sentences)\n`);
    }
    
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Final save
  const allSentences = [...existingSentences, ...newSentences];
  allSentences.sort((a, b) => {
    const levelOrder = { 'N5': 1, 'N4': 2, 'N3': 3, 'N2': 4, 'N1': 5 };
    const levelDiff = levelOrder[a.jlpt_level] - levelOrder[b.jlpt_level];
    if (levelDiff !== 0) return levelDiff;
    return a.difficulty_level - b.difficulty_level;
  });
  
  const sentencesPath = path.join(__dirname, '../public/data/sentences.json');
  fs.writeFileSync(sentencesPath, JSON.stringify(allSentences, null, 2), 'utf8');
  
  console.log(`\n=== SUMMARY ===`);
  console.log(`Generated: ${newSentences.length} new sentences`);
  console.log(`Total N4 sentences: ${currentN4Count + newSentences.length}`);
  console.log(`Total sentences: ${allSentences.length}`);
  console.log(`\n✓ Saved to: ${sentencesPath}`);
}

generateN4Sentences().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
