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

// N3 Grammar patterns from the app
const n3GrammarPatterns = [
  '～たばかり', '～ようになる', '～ことになる', '～とても～ない', '～らしい', '～て初めて',
  '～ないで', '～によって', '～のような', '～ば～ほど', 'N+ばかり', '～は～で有名',
  'N+を始め', '的', '～は～くらいです', '～さえ～ば', 'ほど', 'まま', 'わざわざ',
  '～としたら', '～たものだ', '～たて', '～ぐらい', '～かえって', '～には～の～がある',
  '～っぽい', '～に関する', 'まさか', 'まい', 'きり', 'いったい（一体）', 'ふり',
  'どうやら', 'おかげで', 'さらに（更に）', 'すでに（既に）', 'つい', 'むしろ', 'さえ',
  '～になれる', '～に違いない', 'なかなか', '～ために', '～ず', '～によると', '～代わり',
  'ようにする', '～始める', '～ても', '～として', 'ように', 'こそ', '～ないうちに',
  'どうしても', '～がち', 'せいぜい', '限る', '～とともに～', '～たび～', 'すぎない（過ぎない）',
  'おいて（於いて）', '～げ', 'つもりで'
];

async function generateSentenceWithOpenAI(grammarPattern, vocabularyList, kanjiList, usedVocab, unusedN3Vocab) {
  // Prioritize unused N3 vocabulary
  const vocabToHighlight = unusedN3Vocab.length > 0 
    ? unusedN3Vocab.slice(0, 5).join(', ')
    : 'any appropriate N3 vocabulary';
  
  const prompt = `You are a Japanese language teacher creating natural, everyday JLPT N3 sentences.

Grammar pattern to use: ${grammarPattern}

Try to use these N3 vocabulary words if they fit naturally: ${vocabToHighlight}

Create ONE natural Japanese sentence that:
- Uses the grammar pattern "${grammarPattern}" correctly
- Uses N3/N4/N5 vocabulary (avoid N2 unless absolutely necessary)
- Is something people actually say in everyday conversation
- Sounds completely natural to a native speaker
- Is about realistic situations: daily life, work, school, hobbies, feelings, plans, experiences
- Is LONGER than N4 sentences (add more context, details, or connected clauses)
- Uses natural, everyday language - NOT literary or overly formal
- Expresses more complete thoughts with context (why, when, how, feelings, etc.)

Good examples of natural N3 sentences (note the length and natural flow):
- 最近、仕事が忙しくて運動する時間がなかったけど、健康のために毎朝ジョギングするようにしています。 (Recently, I've been busy with work and haven't had time to exercise, but for my health I've been making sure to jog every morning.)
- 子供の頃はピーマンが嫌いだったけど、大人になってから食べられるようになりました。 (When I was a child I hated green peppers, but after becoming an adult I came to be able to eat them.)
- この仕事は大変だけど、みんなのおかげで楽しく続けることができています。 (This job is tough, but thanks to everyone I'm able to continue it enjoyably.)
- 勉強すればするほど、まだまだ知らないことがたくさんあることに気づきます。 (The more I study, the more I realize there are still many things I don't know.)

Avoid:
- Overly complex or literary language
- Unnatural word combinations
- Rare or unusual situations
- Forcing vocabulary unnaturally
- Short, simple sentences (make them longer with natural context)

Respond ONLY with valid JSON in this exact format:
{
  "japanese": "your natural Japanese sentence",
  "english": "accurate, natural English translation",
  "vocabulary_used": ["word1", "word2"],
  "grammar_points": ["${grammarPattern}"],
  "difficulty": 3
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
      jlpt_level: 'N3',
      difficulty_level: sentenceData.difficulty || 3,
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

async function generateN3Sentences() {
  console.log('=== Generating N3 Sentences with OpenAI ===\n');
  
  // Load data
  const vocabulary = loadVocabulary();
  const kanji = loadKanji();
  const existingSentences = loadExistingSentences();
  
  // Filter N3/N2/N4/N5 vocabulary and kanji (prefer N3, can use N4/N5, N2 only if necessary)
  const n3Vocab = vocabulary.filter(v => ['N3', 'N2', 'N4', 'N5'].includes(v.jlpt_level));
  const n3Kanji = kanji.filter(k => ['N3', 'N2', 'N4', 'N5'].includes(k.jlpt_level));
  
  console.log(`Loaded ${n3Vocab.length} N3/N2/N4/N5 vocabulary words`);
  console.log(`Loaded ${n3Kanji.length} N3/N2/N4/N5 kanji`);
  
  const currentN3Count = existingSentences.filter(s => s.jlpt_level === 'N3').length;
  
  // Check grammar pattern coverage
  const grammarCoverage = {};
  n3GrammarPatterns.forEach(pattern => {
    grammarCoverage[pattern] = 0;
  });
  
  existingSentences.filter(s => s.jlpt_level === 'N3').forEach(s => {
    if (s.grammar_points) {
      s.grammar_points.forEach(pattern => {
        if (grammarCoverage[pattern] !== undefined) {
          grammarCoverage[pattern]++;
        }
      });
    }
  });
  
  console.log(`\nCurrent N3 sentences: ${currentN3Count}`);
  console.log(`Grammar patterns: ${n3GrammarPatterns.length}`);
  
  // Calculate how many sentences needed for good coverage (aim for 10 per pattern)
  const minPerPattern = 10;
  const totalNeeded = n3GrammarPatterns.length * minPerPattern;
  const needed = Math.max(0, totalNeeded - currentN3Count);
  
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
  const vocabWords = n3Vocab.map(v => v.word);
  const usedVocab = new Set();
  
  // Track N3-specific vocabulary for coverage
  const n3VocabOnly = vocabulary.filter(v => v.jlpt_level === 'N3');
  const n3VocabWords = n3VocabOnly.map(v => v.word);
  const usedN3Vocab = new Set();
  
  // Track existing Japanese sentences to prevent duplicates
  const existingJapanese = new Set();
  existingSentences.forEach(s => {
    existingJapanese.add(s.japanese_text);
  });
  
  // Track vocabulary from existing sentences
  existingSentences.filter(s => s.jlpt_level === 'N3').forEach(s => {
    if (s.vocabulary_used) {
      s.vocabulary_used.forEach(v => {
        usedVocab.add(v);
        if (n3VocabWords.includes(v)) {
          usedN3Vocab.add(v);
        }
      });
    }
  });
  
  console.log(`Total N3 vocabulary words: ${n3VocabWords.length}`);
  console.log(`Already used ${usedN3Vocab.size} N3 vocabulary words (${((usedN3Vocab.size / n3VocabWords.length) * 100).toFixed(1)}% coverage)`);
  console.log(`Tracking ${existingJapanese.size} existing sentences to prevent duplicates\n`);
  
  // Generate sentences by cycling through grammar patterns
  let patternIndex = 0;
  let attempts = 0;
  const maxAttempts = needed * 3; // Allow retries for duplicates
  
  while (newSentences.length < needed && attempts < maxAttempts) {
    const grammarPattern = n3GrammarPatterns[patternIndex % n3GrammarPatterns.length];
    
    // Get unused N3 vocabulary to prioritize
    const unusedN3Vocab = n3VocabWords.filter(v => !usedN3Vocab.has(v));
    
    console.log(`Generating ${newSentences.length + 1}/${needed}: ${grammarPattern}...`);
    
    const sentence = await generateSentenceWithOpenAI(grammarPattern, vocabWords, n3Kanji, usedVocab, unusedN3Vocab);
    
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
        sentence.vocabulary_used.forEach(v => {
          usedVocab.add(v);
          if (n3VocabWords.includes(v)) {
            usedN3Vocab.add(v);
          }
        });
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
  console.log(`Total N3 sentences: ${currentN3Count + newSentences.length}`);
  console.log(`Total sentences: ${allSentences.length}`);
  
  // Final vocabulary coverage report
  const finalN3VocabCoverage = ((usedN3Vocab.size / n3VocabWords.length) * 100).toFixed(1);
  console.log(`\n=== N3 VOCABULARY COVERAGE ===`);
  console.log(`N3 vocabulary used: ${usedN3Vocab.size} / ${n3VocabWords.length} (${finalN3VocabCoverage}%)`);
  console.log(`Unused N3 vocabulary: ${n3VocabWords.length - usedN3Vocab.size} words`);
  
  console.log(`\n✓ Saved to: ${sentencesPath}`);
}

generateN3Sentences().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
