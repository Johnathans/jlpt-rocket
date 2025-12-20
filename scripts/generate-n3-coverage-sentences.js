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

// N3 Grammar patterns
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

async function generateSentenceWithOpenAI(grammarPattern, unusedVocabList) {
  const vocabToUse = unusedVocabList.slice(0, 15).map(v => `${v.word} (${v.reading}) - ${v.meaning}`).join(', ');
  
  const prompt = `You are a Japanese language teacher creating natural, everyday JLPT N3 sentences.

Grammar pattern to use: ${grammarPattern}

CRITICAL REQUIREMENT: You MUST use AT LEAST ONE of these specific N3 vocabulary words in your sentence:
${vocabToUse}

Create ONE natural Japanese sentence that:
- Uses the grammar pattern "${grammarPattern}" correctly
- MUST include AT LEAST ONE of the N3 vocabulary words listed above (this is mandatory)
- Can freely use any N3, N4, and N5 vocabulary and kanji to make the sentence natural
- Is something people actually say in everyday conversation
- Sounds completely natural to a native speaker
- Is about realistic situations: daily life, work, school, hobbies, feelings, plans, experiences
- Is LONGER than N4 sentences (add more context, details, or connected clauses)
- Uses natural, everyday language - NOT literary or overly formal
- Expresses complete thoughts with context (why, when, how, feelings, etc.)
- Be UNIQUE and CREATIVE - avoid overly simple or common sentences

IMPORTANT: The sentence must sound natural even with the required vocabulary. Don't force words unnaturally.

Good examples of natural N3 sentences:
- 最近、仕事が忙しくて運動する時間がなかったけど、健康のために毎朝ジョギングするようにしています。
- 子供の頃はピーマンが嫌いだったけど、大人になってから食べられるようになりました。
- この仕事は大変だけど、みんなのおかげで楽しく続けることができています。

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

    const content = completion.choices[0].message.content.trim();
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found in response');
      return null;
    }

    const data = JSON.parse(jsonMatch[0]);

    return {
      id: uuidv4(),
      japanese_text: data.japanese,
      english_translation: data.english,
      jlpt_level: 'N3',
      difficulty_level: data.difficulty || 3,
      grammar_points: data.grammar_points || [grammarPattern],
      vocabulary_used: data.vocabulary_used || [],
      kanji_used: (data.japanese.match(/[\u4e00-\u9faf]/g) || []),
      audio_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error generating sentence:', error.message);
    return null;
  }
}

async function main() {
  console.log('=== N3 Coverage Sentence Generator ===\n');

  const vocabulary = loadVocabulary();
  const kanji = loadKanji();
  const existingSentences = loadExistingSentences();

  const n3Sentences = existingSentences.filter(s => s.jlpt_level === 'N3');
  const n3Vocab = vocabulary.filter(v => v.jlpt_level === 'N3');
  const n3Kanji = kanji.filter(k => k.jlpt_level === 'N3');

  // Find unused N3 vocabulary
  const usedN3Vocab = new Set();
  n3Sentences.forEach(s => {
    n3Vocab.forEach(v => {
      if (s.japanese_text.includes(v.word)) {
        usedN3Vocab.add(v.word);
      }
    });
  });

  // Find unused N3 kanji
  const usedN3Kanji = new Set();
  n3Sentences.forEach(s => {
    const kanjiInSentence = s.japanese_text.match(/[\u4e00-\u9faf]/g) || [];
    kanjiInSentence.forEach(k => {
      if (n3Kanji.some(nk => nk.character === k)) {
        usedN3Kanji.add(k);
      }
    });
  });

  const unusedVocab = n3Vocab.filter(v => !usedN3Vocab.has(v.word));
  const unusedKanji = n3Kanji.filter(k => !usedN3Kanji.has(k.character));

  console.log(`Current N3 Coverage:`);
  console.log(`Vocabulary: ${usedN3Vocab.size}/${n3Vocab.length} (${((usedN3Vocab.size/n3Vocab.length)*100).toFixed(1)}%)`);
  console.log(`Kanji: ${usedN3Kanji.size}/${n3Kanji.length} (${((usedN3Kanji.size/n3Kanji.length)*100).toFixed(1)}%)`);
  console.log(`\nUnused vocabulary: ${unusedVocab.length} words`);
  console.log(`Unused kanji: ${unusedKanji.length} characters\n`);

  // Estimate sentences needed for better coverage
  // Target: 100% vocab coverage and 100% kanji coverage
  const targetVocabCoverage = n3Vocab.length;
  const targetKanjiCoverage = n3Kanji.length;
  const vocabNeeded = targetVocabCoverage - usedN3Vocab.size;
  const kanjiNeeded = targetKanjiCoverage - usedN3Kanji.size;
  
  // Since we're requiring 1 unused vocab per sentence, estimate 1:1 ratio
  // But account for some vocab being used multiple times
  const sentencesForVocab = Math.ceil(vocabNeeded * 1.2);
  const sentencesForKanji = Math.ceil(kanjiNeeded / 2);
  const sentencesToGenerate = Math.max(sentencesForVocab, sentencesForKanji);

  console.log(`Target Coverage:`);
  console.log(`Vocabulary: 100% (${targetVocabCoverage} words) - need ${vocabNeeded} more`);
  console.log(`Kanji: 100% (${targetKanjiCoverage} characters) - need ${kanjiNeeded} more`);
  console.log(`\nEstimated sentences needed: ~${sentencesToGenerate}\n`);

  const userInput = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  userInput.question(`Generate ${sentencesToGenerate} sentences? (yes/no): `, async (answer) => {
    userInput.close();
    
    if (answer.toLowerCase() !== 'yes' && answer.toLowerCase() !== 'y') {
      console.log('Generation cancelled.');
      return;
    }

    console.log(`\nGenerating ${sentencesToGenerate} sentences...\n`);

    const newSentences = [];
    const existingJapanese = new Set(existingSentences.map(s => s.japanese_text));
    
    // Shuffle unused vocab for variety
    let shuffledUnusedVocab = [...unusedVocab].sort(() => Math.random() - 0.5);
    
    let attempts = 0;
    const maxAttempts = sentencesToGenerate * 3;

    while (newSentences.length < sentencesToGenerate && attempts < maxAttempts) {
      const grammarPattern = n3GrammarPatterns[newSentences.length % n3GrammarPatterns.length];

      // Refresh unused vocab list every 20 sentences
      if (newSentences.length > 0 && newSentences.length % 20 === 0) {
        const currentUsedVocab = new Set();
        [...existingSentences, ...newSentences].filter(s => s.jlpt_level === 'N3').forEach(s => {
          n3Vocab.forEach(v => {
            if (s.japanese_text.includes(v.word)) {
              currentUsedVocab.add(v.word);
            }
          });
        });
        const currentUnused = n3Vocab.filter(v => !currentUsedVocab.has(v.word));
        shuffledUnusedVocab = [...currentUnused].sort(() => Math.random() - 0.5);
        console.log(`  📊 Refreshed unused vocab list: ${currentUnused.length} words remaining\n`);
      }

      // Rotate through unused vocab (smaller batches for stricter targeting)
      const vocabBatch = shuffledUnusedVocab.slice((newSentences.length * 15) % shuffledUnusedVocab.length, ((newSentences.length * 15) % shuffledUnusedVocab.length) + 15);
      if (vocabBatch.length < 15) {
        vocabBatch.push(...shuffledUnusedVocab.slice(0, 15 - vocabBatch.length));
      }

      console.log(`Generating ${newSentences.length + 1}/${sentencesToGenerate}: ${grammarPattern}...`);

      const sentence = await generateSentenceWithOpenAI(grammarPattern, vocabBatch);

      if (sentence) {
        if (existingJapanese.has(sentence.japanese_text)) {
          console.log(`  ⚠️  Duplicate detected, skipping\n`);
          attempts++;
          continue;
        }

        existingJapanese.add(sentence.japanese_text);
        newSentences.push(sentence);

        console.log(`  ✓ ${sentence.japanese_text}`);
        console.log(`     ${sentence.english_translation}\n`);
      } else {
        console.log(`  ✗ Failed to generate\n`);
      }

      attempts++;

      // Save progress every 10 sentences
      if (newSentences.length % 10 === 0 && newSentences.length > 0) {
        const allSentences = [...existingSentences, ...newSentences];
        allSentences.sort((a, b) => {
          const levelOrder = { 'N5': 1, 'N4': 2, 'N3': 3, 'N2': 4, 'N1': 5 };
          return levelOrder[a.jlpt_level] - levelOrder[b.jlpt_level];
        });
        
        const sentencesPath = path.join(__dirname, '../public/data/sentences.json');
        fs.writeFileSync(sentencesPath, JSON.stringify(allSentences, null, 2));
        console.log(`  💾 Progress saved (${newSentences.length} new sentences)\n`);
      }
    }

    // Final save
    const allSentences = [...existingSentences, ...newSentences];
    allSentences.sort((a, b) => {
      const levelOrder = { 'N5': 1, 'N4': 2, 'N3': 3, 'N2': 4, 'N1': 5 };
      return levelOrder[a.jlpt_level] - levelOrder[b.jlpt_level];
    });

    const sentencesPath = path.join(__dirname, '../public/data/sentences.json');
    fs.writeFileSync(sentencesPath, JSON.stringify(allSentences, null, 2));

    // Calculate final coverage
    const finalN3Sentences = allSentences.filter(s => s.jlpt_level === 'N3');
    const finalUsedVocab = new Set();
    const finalUsedKanji = new Set();

    finalN3Sentences.forEach(s => {
      n3Vocab.forEach(v => {
        if (s.japanese_text.includes(v.word)) {
          finalUsedVocab.add(v.word);
        }
      });
      const kanjiInSentence = s.japanese_text.match(/[\u4e00-\u9faf]/g) || [];
      kanjiInSentence.forEach(k => {
        if (n3Kanji.some(nk => nk.character === k)) {
          finalUsedKanji.add(k);
        }
      });
    });

    console.log('\n=== SUMMARY ===');
    console.log(`Generated: ${newSentences.length} new sentences`);
    console.log(`Total N3 sentences: ${finalN3Sentences.length}`);
    console.log(`Total sentences: ${allSentences.length}`);
    console.log('');
    console.log('=== FINAL N3 COVERAGE ===');
    console.log(`Vocabulary: ${finalUsedVocab.size}/${n3Vocab.length} (${((finalUsedVocab.size/n3Vocab.length)*100).toFixed(1)}%)`);
    console.log(`Kanji: ${finalUsedKanji.size}/${n3Kanji.length} (${((finalUsedKanji.size/n3Kanji.length)*100).toFixed(1)}%)`);
    console.log(`\n✓ Saved to: ${sentencesPath}`);
  });
}

main().catch(console.error);
