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

// N5 Grammar patterns
const n5GrammarPatterns = [
  'です', 'も', 'で', 'に/へ', 'に', 'を', '～ませんか', 'は', '～があります', '～がいます',
  'と', '～ましょう', '～ましょうか', '～てください', '～てもいいです', '～てはいけません',
  '～から', '～ている', '～にいく', 'ないでください', '～のがすきです', '～のがじょうずです',
  '～のがへたです', 'まだ～ていません', '～のほうが～より', '～のなかで～がいちばん～',
  'つもりです', '～く/～になる', 'stem +たいです', '～たり…～たりする', '～たことがある',
  'や', '～んです', '～すぎる', '～ほうがいい', 'ので', '～なくちゃいけない', 'でしょう',
  '～まえに', '～てから'
];

async function generateSentenceWithOpenAI(grammarPattern, vocabularyList, kanjiList, usedVocab) {
  const prompt = `You are a Japanese language teacher creating natural, authentic JLPT N5 sentences that students would actually encounter.

Grammar pattern to use: ${grammarPattern}

Create ONE natural Japanese sentence that:
- Uses the grammar pattern "${grammarPattern}" correctly
- Uses only N5-level vocabulary and kanji (N4 is acceptable if it makes the sentence more natural)
- Is something a beginner would actually say or hear in real life
- Sounds natural to a native speaker
- Is about common daily life topics (food, family, school, hobbies, weather, time, etc.)
- Is UNIQUE and CREATIVE - avoid overly simple or common sentences like "学校へ行きます"
- Uses varied vocabulary and situations

Good examples of natural N5 sentences:
- 今日は暑いです。 (It's hot today.)
- 毎朝パンを食べます。 (I eat bread every morning.)
- 友達と映画を見ました。 (I watched a movie with my friend.)
- 日本語を勉強しています。 (I'm studying Japanese.)
- 週末に買い物に行きます。 (I'll go shopping on the weekend.)

Avoid:
- Unnatural combinations (like "blue dog" or "blue foot")
- Forcing specific vocabulary unnaturally
- Overly complex or rare situations
- Sentences that sound like textbook exercises
- Very simple/common sentences that likely already exist (like "学校へ行きます", "図書館で本を読みます")

Respond ONLY with valid JSON in this exact format:
{
  "japanese": "your natural Japanese sentence",
  "english": "accurate, natural English translation",
  "vocabulary_used": ["word1", "word2"],
  "grammar_points": ["${grammarPattern}"],
  "difficulty": 1
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
      jlpt_level: 'N5',
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

async function generateN5Sentences() {
  console.log('=== Generating N5 Sentences with OpenAI ===\n');
  
  // Load data
  const vocabulary = loadVocabulary();
  const kanji = loadKanji();
  const existingSentences = loadExistingSentences();
  
  // Filter N5 vocabulary and kanji
  const n5Vocab = vocabulary.filter(v => v.jlpt_level === 'N5' || v.jlpt_level === 'N4');
  const n5Kanji = kanji.filter(k => k.jlpt_level === 'N5' || k.jlpt_level === 'N4');
  
  console.log(`Loaded ${n5Vocab.length} N5/N4 vocabulary words`);
  console.log(`Loaded ${n5Kanji.length} N5/N4 kanji`);
  
  const currentN5Count = existingSentences.filter(s => s.jlpt_level === 'N5').length;
  const target = 500;
  const needed = target - currentN5Count;
  
  console.log(`\nCurrent N5 sentences: ${currentN5Count}`);
  console.log(`Target: ${target}`);
  console.log(`Need to generate: ${needed}\n`);
  
  if (needed <= 0) {
    console.log('✓ Target already reached!');
    return;
  }
  
  const newSentences = [];
  const vocabWords = n5Vocab.map(v => v.word);
  const usedVocab = new Set();
  
  // Track existing Japanese sentences to prevent duplicates
  const existingJapanese = new Set();
  existingSentences.forEach(s => {
    existingJapanese.add(s.japanese_text);
  });
  
  // Track vocabulary from existing sentences
  existingSentences.filter(s => s.jlpt_level === 'N5').forEach(s => {
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
    const grammarPattern = n5GrammarPatterns[patternIndex % n5GrammarPatterns.length];
    
    console.log(`Generating ${newSentences.length + 1}/${needed}: ${grammarPattern}...`);
    
    const sentence = await generateSentenceWithOpenAI(grammarPattern, vocabWords, n5Kanji, usedVocab);
    
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
  console.log(`Total N5 sentences: ${currentN5Count + newSentences.length}`);
  console.log(`Total sentences: ${allSentences.length}`);
  console.log(`\n✓ Saved to: ${sentencesPath}`);
}

generateN5Sentences().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
