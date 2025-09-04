const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// N4 Kanji Reading Question Generator
// Following the format from n4_kanji_questions.md

async function generateN4VocabKanjiReadingQuestions() {
  try {
    // Get N5 vocabulary for validation
    const { data: n5Vocab, error: n5Error } = await supabase
      .from('vocabulary')
      .select('word')
      .eq('jlpt_level', 'N5');
    
    if (n5Error) throw n5Error;
    const n5WordSet = new Set(n5Vocab.map(v => v.word));

    // Get N4 vocabulary with kanji
    const { data: n4Vocab, error } = await supabase
      .from('vocabulary')
      .select('word, reading, meaning')
      .eq('jlpt_level', 'N4');

    if (error) throw error;

    // Filter to words that actually contain kanji
    const vocabWithKanji = n4Vocab.filter(item => {
      return /[一-龯]/.test(item.word);
    });

    console.log(`Found ${vocabWithKanji.length} N4 vocabulary words with kanji`);
    console.log(`Loaded ${n5WordSet.size} N5 words for validation`);

    // Generate questions for ALL N4 vocabulary words with kanji
    const allQuestions = [];
    
    // Get N4 vocabulary set for validation
    const n4WordSet = new Set(n4Vocab.map(v => v.word));

    console.log(`Generating questions for all ${vocabWithKanji.length} N4 vocabulary words...`);
    
    // Grammar pattern tracking system - using patterns from the comprehensive guide
    const grammarPatterns = {
      // N4 Advanced patterns (from grammar guide)
      n4: [
        'ために', 'たら', 'ながら', 'ので', 'てから', 'ば', 'なら', 'と',
        'かもしれない', 'ことがある', 'ことができる', 'ことになる', 'ことにする',
        'つもり', 'ようだ', 'ように', 'ようになる', 'はず', 'べき',
        'てもいい', 'なくてもいい', 'しか～ない', 'ばかり', 'だけで',
        'について', 'によると', 'にとって', 'あいだに', 'まま', 'ほど',
        'すぎる', 'がる', 'れる/られる', 'せる/させる', 'てあげる', 'てくれる', 'てもらう',
        // Additional N4 patterns from guide
        'あまり～ない', 'ばよかった', 'でも', 'がする', 'いらっしゃる', 'いたします',
        'かどうか', 'かな', 'けれども', 'きがする', 'きりがない', 'してある',
        'してから', 'してみる', 'そうだ', 'たり～たりする', 'てある', 'ていく',
        'てみる', 'てしまう', 'という', 'といいます', 'と思います', 'ところ'
      ],
      // N5 Basic patterns (from grammar guide)
      n5: [
        'は', 'が', 'を', 'に', 'で', 'と', 'から', 'まで', 'や', 'も',
        'です', 'だ', 'ます', 'ません', 'ました', 'ませんでした', 'だった',
        'ている', 'ています', 'てください', 'たい', 'ほしい', 'の', 'か',
        'あります', 'います', 'できます', 'できない', 'わかります', 'たべます',
        'よみます', 'いきます', 'します', 'しない', 'しなかった', 'して',
        'だけ', 'でも', 'まだ', 'もう', 'とても', 'たくさん', 'ぐらい'
      ]
    };

    // Track which patterns have been used
    const usedPatterns = {
      n4: new Set(),
      n5: new Set()
    };

    // Get missing words and assign grammar patterns
    const missingWords = getMissingWords(vocabWithKanji);
    const grammarAssignments = assignGrammarPatterns(missingWords, grammarPatterns);
    
    for (let i = 0; i < vocabWithKanji.length; i++) {
      const vocab = vocabWithKanji[i];
      const question = await generateKanjiReadingQuestion(vocab, i + 1, n5WordSet, n4WordSet, usedPatterns, grammarPatterns, grammarAssignments);
      if (question) {
        allQuestions.push(question);
      }
      
      // Progress indicator
      if ((i + 1) % 50 === 0) {
        console.log(`Progress: ${i + 1}/${vocabWithKanji.length} questions processed`);
      }
    }

    // Output in markdown format matching n4_kanji_questions.md
    let markdown = '';
    
    allQuestions.forEach(q => {
      markdown += `---\n\n`;
      markdown += `${q.sentence}\n`;
      markdown += `(${q.englishTranslation})\n\n`;
      markdown += `**N5 VOCABULARY VERIFICATION:**\n`;
      q.n5Verification.forEach(item => {
        markdown += `- ${item}\n`;
      });
      markdown += `\n`;
      markdown += `1. ${q.options[0]}\n`;
      markdown += `2. ${q.options[1]}\n`;
      markdown += `3. ${q.options[2]}\n`;
      markdown += `4. ${q.options[3]}\n\n`;
      markdown += `**Correct Answer: (${q.correctAnswer + 1}) ${q.options[q.correctAnswer]}**\n\n`;
      markdown += `**Explanation:**\n`;
      q.explanations.forEach((exp, idx) => {
        markdown += `* **${q.options[idx]} (${idx + 1}) - ${exp.status}:** ${exp.text}\n`;
      });
      markdown += `\n`;
    });

    console.log(`\n=== GENERATED ${allQuestions.length} QUESTIONS ===\n`);
    // Don't print full markdown to avoid overwhelming console output

    // Save to file
    const fs = require('fs');
    const path = require('path');
    
    const outputPath = path.join(__dirname, '..', 'analysis', 'generated_n4_vocab_kanji_questions.md');
    fs.writeFileSync(outputPath, markdown, 'utf8');
    console.log(`\nSaved ${allQuestions.length} questions to: ${outputPath}`);

    return allQuestions;

  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function generateKanjiReadingQuestion(vocab, questionNumber, n5WordSet, n4WordSet, usedPatterns, grammarPatterns, grammarAssignments) {
  const { word, reading, meaning } = vocab;
  
  // Extract kanji from the word
  const kanjiInWord = word.match(/[一-龯]/g);
  if (!kanjiInWord || kanjiInWord.length === 0) return null;

  // Focus on the first kanji for simplicity (this is the TARGET kanji)
  const targetKanji = kanjiInWord[0];
  
  // Create sentence using ONLY N5/N4 vocabulary with level validation
  const sentenceData = createSentenceWithKanji(word, reading, meaning, n5WordSet, n4WordSet, usedPatterns, grammarPatterns, grammarAssignments);
  if (!sentenceData) return null;

  // Generate reading options
  const options = generateReadingOptions(targetKanji, reading, word);
  
  // Find correct answer index
  const correctReading = extractTargetReading(reading, word, targetKanji);
  const correctAnswer = options.indexOf(correctReading);

  return {
    questionNumber,
    targetKanji,
    targetWord: word,
    sentence: sentenceData.sentence,
    englishTranslation: sentenceData.englishTranslation,
    n5Verification: sentenceData.n5Verification,
    options,
    correctAnswer,
    explanations: generateExplanations(options, correctAnswer, targetKanji, word)
  };
}

function createSentenceWithKanji(word, reading, meaning, n5WordSet, n4WordSet, usedPatterns, grammarPatterns, grammarAssignments) {
  // Create contextual sentences based on the specific N4 vocabulary word
  const sentenceData = createContextualSentence(word, reading, meaning, usedPatterns, grammarPatterns, grammarAssignments);
  
  if (!sentenceData) {
    console.warn(`Could not create contextual sentence for ${word}`);
    return null;
  }
  
  // Vocabulary validation - allow N4 words as supporting vocabulary
  function validateVocabulary(wordsUsed) {
    const invalidWords = [];
    
    // Basic common words that should always be allowed (demonstratives, family, etc.)
    const basicCommonWords = new Set([
      'この', 'その', 'あの', 'どの', 'ここ', 'そこ', 'あそこ', 'どこ',
      'これ', 'それ', 'あれ', 'どれ', 'こちら', 'そちら', 'あちら', 'どちら',
      'お父さん', 'お母さん', '父', '母', '兄', '姉', '弟', '妹',
      '家族', '子供', '赤ちゃん', '大人', '人', '男', '女', '先生',
      '学生', '友達', '彼', '彼女', '私', 'あなた', '僕', '君',
      '今日', '明日', '昨日', '今', 'いつ', 'どう', 'なぜ', 'どうして',
      // Additional common words that appear in natural sentences
      '健康', 'サイズ', '太陽', '道路', '連絡', '音楽', '宿題', '運動',
      '時間', '毎日', '昨日', '来年', '時々', '学校', '新しい', '大きい',
      '買う', '食べる', '行く', '見る', '聞く', '話す', '勉強', '遊ぶ',
      '急ぐ', '図書館', '公園', '靴', '嬉しい', 'お', '何か', 'お湯', 'お写真',
      '問題', '話', '思う', '良い', '大丈夫', '話し合い', '顔', 'お手伝い', '一時間', '育つ',
      'パーティー', 'メッセージ', 'プレゼント', 'ホテル', 'レストラン', 'テスト',
      'キャンプ', 'ボール', 'コップ', 'パン', 'シャツ', 'バス', 'ニュース',
      '日本', '東京', '母', '父', '兄', '姉', '弟', '妹', '祖父', '祖母',
      '付ける', '美術', '電池', '中止', '報告', '学ぶ', '日本語', '方法', '答え',
      '地球', '面白い', '汁', '船', '可愛い', '田中', '券', '安い', '温泉',
      '成功', '夜空', '度', '海外', '就職', '議論', '参加', '修理', 'りんご',
      '起こる', '諦める', '結果', 'お正月', '楽しむ', '発達', '剃る', 'パスポート',
      '建物', '調べる', '変更', '早く', '説明', '遅れる', '忘れる', '新しい'
    ]);
    
    for (const word of wordsUsed) {
      // Allow N5 vocabulary, N4 vocabulary, and basic common words
      if (!n5WordSet.has(word) && !n4WordSet.has(word) && !basicCommonWords.has(word)) {
        invalidWords.push(word);
      }
    }
    
    return invalidWords;
  }

  const invalidWords = validateVocabulary(sentenceData.wordsUsed);
  if (invalidWords.length > 0) {
    console.warn(`Invalid words found for ${word}: ${invalidWords.join(', ')}`);
    return null;
  }
  
  // Generate vocabulary verification with level checking
  const n5Verification = [];
  
  // Add supporting words with their levels
  sentenceData.wordsUsed.forEach(w => {
    if (w !== word) { // Don't include the target word yet
      if (n5WordSet.has(w)) {
        n5Verification.push(`- ${w} ✓ N5 vocabulary`);
      } else if (n4WordSet.has(w)) {
        n5Verification.push(`- ${w} ✓ N4 vocabulary (supporting)`);
      }
    }
  });
  
  // Add grammar pattern verification
  sentenceData.grammarParticles.forEach(g => {
    if (grammarPatterns.n5.includes(g)) {
      n5Verification.push(`- ${g} ✓ N5 grammar pattern`);
      usedPatterns.n5.add(g);
    } else if (grammarPatterns.n4.includes(g)) {
      n5Verification.push(`- ${g} ✓ N4 grammar pattern`);
      usedPatterns.n4.add(g);
    }
  });
  
  // Add the target word
  n5Verification.push(`- ${word} ✓ (${reading}) - ${meaning} [N4 TARGET KANJI]`);

  return {
    sentence: sentenceData.sentence,
    englishTranslation: sentenceData.englishTranslation,
    n5Verification,
    targetWord: word
  };
}

function createContextualSentence(word, reading, meaning, usedPatterns, grammarPatterns, grammarAssignments) {
  // First try existing natural sentences
  const sentenceTemplates = generateSentenceForWord(word, reading, meaning);
  
  if (sentenceTemplates) {
    // Randomly select from available sentence lengths
    const lengths = Object.keys(sentenceTemplates);
    const selectedLength = lengths[Math.floor(Math.random() * lengths.length)];
    return sentenceTemplates[selectedLength];
  }
  
  // Only use hand-crafted natural sentences
  return null;
}

// Natural sentences dictionary - moved to top for reference
const naturalSentences = {
  '合う': {
    sentence: '靴のサイズが*合*わない。',
    englishTranslation: 'The shoe size doesn\'t fit.',
    wordsUsed: ['靴', 'サイズ'],
    grammarParticles: ['の', 'が', 'わない']
  },
  '集まる': {
    sentence: '友達が公園に*集*まった。',
    englishTranslation: 'Friends gathered in the park.',
    wordsUsed: ['友達', '公園'],
    grammarParticles: ['が', 'に', 'まった']
  },
  '謝る': {
    sentence: '遅れたので*謝*りました。',
    englishTranslation: 'I apologized because I was late.',
    wordsUsed: ['遅れる'],
    grammarParticles: ['ので', 'りました']
  },
  '動く': {
    sentence: '車が*動*かない。',
    englishTranslation: 'The car won\'t move.',
    wordsUsed: ['車'],
    grammarParticles: ['が', 'かない']
  },
  '嘘': {
    sentence: '*嘘*を言ってはいけません。',
    englishTranslation: 'You must not tell lies.',
    wordsUsed: ['言う'],
    grammarParticles: ['を', 'ってはいけません']
  },
  '内': {
    sentence: '家の*内*で待っています。',
    englishTranslation: 'I\'m waiting inside the house.',
    wordsUsed: ['家', '待つ'],
    grammarParticles: ['の', 'で', 'っています']
  },
  '移る': {
    sentence: '新しい家に*移*りました。',
    englishTranslation: 'I moved to a new house.',
    wordsUsed: ['新しい', '家'],
    grammarParticles: ['に', 'りました']
  },
  '腕': {
    sentence: '*腕*が痛いです。',
    englishTranslation: 'My arm hurts.',
    wordsUsed: ['痛い'],
    grammarParticles: ['が', 'です']
  },
  '裏': {
    sentence: '紙の*裏*に書いてください。',
    englishTranslation: 'Please write on the back of the paper.',
    wordsUsed: ['紙', '書く'],
    grammarParticles: ['の', 'に', 'いてください']
  },
  '遠慮': {
    sentence: '*遠慮*しないでください。',
    englishTranslation: 'Please don\'t hesitate.',
    wordsUsed: [],
    grammarParticles: ['しないでください']
  },
  '表': {
    sentence: '*表*を見てください。',
    englishTranslation: 'Please look at the table.',
    wordsUsed: ['見る'],
    grammarParticles: ['を', 'てください']
  },
  '親': {
    sentence: '*親*に電話をかけます。',
    englishTranslation: 'I will call my parents.',
    wordsUsed: ['電話'],
    grammarParticles: ['に', 'を', 'かけます']
  },
  '折る': {
    sentence: '紙を半分に*折*りました。',
    englishTranslation: 'I folded the paper in half.',
    wordsUsed: ['紙', '半分'],
    grammarParticles: ['を', 'に', 'りました']
  },
  'お礼': {
    sentence: '*お礼*を言いました。',
    englishTranslation: 'I said thank you.',
    wordsUsed: ['言う'],
    grammarParticles: ['を', 'いました']
  },
  '海岸': {
    sentence: '*海岸*を歩きました。',
    englishTranslation: 'I walked along the coast.',
    wordsUsed: ['歩く'],
    grammarParticles: ['を', 'きました']
  },
  '会議室': {
    sentence: '*会議室*で話し合いをします。',
    englishTranslation: 'We will have a discussion in the meeting room.',
    wordsUsed: ['話し合い'],
    grammarParticles: ['で', 'をします']
  },
  '帰り': {
    sentence: '学校の*帰り*に買い物をします。',
    englishTranslation: 'I will shop on the way home from school.',
    wordsUsed: ['学校', '買い物'],
    grammarParticles: ['の', 'に', 'をします']
  },
  '鏡': {
    sentence: '*鏡*で顔を見ました。',
    englishTranslation: 'I looked at my face in the mirror.',
    wordsUsed: ['顔', '見る'],
    grammarParticles: ['で', 'を', 'ました']
  },
  '飾る': {
    sentence: '部屋に花を*飾*りました。',
    englishTranslation: 'I decorated the room with flowers.',
    wordsUsed: ['部屋', '花'],
    grammarParticles: ['に', 'を', 'りました']
  },
  '堅い': {
    sentence: 'この肉は*堅*いです。',
    englishTranslation: 'This meat is tough.',
    wordsUsed: ['肉'],
    grammarParticles: ['は', 'です']
  },
  '硬い': {
    sentence: 'この石は*硬*いです。',
    englishTranslation: 'This stone is hard.',
    wordsUsed: ['石'],
    grammarParticles: ['は', 'です']
  },
  '片付ける': {
    sentence: '部屋を*片付*けなければなりません。',
    englishTranslation: 'I must clean up the room.',
    wordsUsed: ['部屋'],
    grammarParticles: ['を', 'けなければなりません']
  },
  '格好': {
    sentence: 'その*格好*はおかしいです。',
    englishTranslation: 'That appearance is strange.',
    wordsUsed: ['おかしい'],
    grammarParticles: ['その', 'は', 'です']
  },
  '悲しい': {
    sentence: 'とても*悲*しい映画でした。',
    englishTranslation: 'It was a very sad movie.',
    wordsUsed: ['とても', '映画'],
    grammarParticles: ['しい', 'でした']
  },
  '案内': {
    sentence: '駅まで*案内*してください。',
    englishTranslation: 'Please guide me to the station.',
    wordsUsed: ['駅'],
    grammarParticles: ['まで', 'してください']
  },
  '以外': {
    sentence: '日曜日*以外*は忙しいです。',
    englishTranslation: 'I\'m busy except on Sundays.',
    wordsUsed: ['日曜日', '忙しい'],
    grammarParticles: ['以外', 'は', 'です']
  },
  '医学': {
    sentence: '*医学*を勉強しています。',
    englishTranslation: 'I\'m studying medicine.',
    wordsUsed: ['勉強'],
    grammarParticles: ['を', 'しています']
  },
  '意見': {
    sentence: 'あなたの*意見*を聞かせてください。',
    englishTranslation: 'Please let me hear your opinion.',
    wordsUsed: ['聞く'],
    grammarParticles: ['の', 'を', 'かせてください']
  },
  '石': {
    sentence: '川で*石*を拾いました。',
    englishTranslation: 'I picked up stones at the river.',
    wordsUsed: ['川', '拾う'],
    grammarParticles: ['で', 'を', 'いました']
  },
  '致す': {
    sentence: 'お手伝い*致*します。',
    englishTranslation: 'I will help you (humble).',
    wordsUsed: ['お手伝い'],
    grammarParticles: ['致します']
  },
  '一度': {
    sentence: '*一度*お会いしたいです。',
    englishTranslation: 'I would like to meet you once.',
    wordsUsed: ['会う'],
    grammarParticles: ['一度', 'お', 'したいです']
  },
  '一生懸命': {
    sentence: '*一生懸命*勉強しました。',
    englishTranslation: 'I studied very hard.',
    wordsUsed: ['勉強'],
    grammarParticles: ['一生懸命', 'しました']
  },
  '一杯': {
    sentence: 'コーヒーを*一杯*ください。',
    englishTranslation: 'Please give me one cup of coffee.',
    wordsUsed: ['コーヒー'],
    grammarParticles: ['を', '一杯', 'ください']
  },
  '以内': {
    sentence: '一時間*以内*に帰ります。',
    englishTranslation: 'I will return within one hour.',
    wordsUsed: ['一時間', '帰る'],
    grammarParticles: ['以内', 'に', 'ります']
  },
  '田舎': {
    sentence: '*田舎*で育ちました。',
    englishTranslation: 'I grew up in the countryside.',
    wordsUsed: ['育つ'],
    grammarParticles: ['で', 'ちました']
  },
  '祈る': {
    sentence: '成功を*祈*っています。',
    englishTranslation: 'I\'m praying for success.',
    wordsUsed: ['成功'],
    grammarParticles: ['を', 'っています']
  },
  '植える': {
    sentence: '庭に花を*植*えました。',
    englishTranslation: 'I planted flowers in the garden.',
    wordsUsed: ['庭', '花'],
    grammarParticles: ['に', 'を', 'えました']
  },
  '関係': {
    sentence: 'それは私と*関係*ありません。',
    englishTranslation: 'That has nothing to do with me.',
    wordsUsed: ['私'],
    grammarParticles: ['は', 'と', 'ありません']
  },
  '簡単': {
    sentence: 'この問題は*簡単*です。',
    englishTranslation: 'This problem is easy.',
    wordsUsed: ['問題'],
    grammarParticles: ['この', 'は', 'です']
  },
  '機会': {
    sentence: 'いい*機会*だと思います。',
    englishTranslation: 'I think it\'s a good opportunity.',
    wordsUsed: ['いい', '思う'],
    grammarParticles: ['だと', 'います']
  },
  '聞こえる': {
    sentence: '音楽が*聞*こえます。',
    englishTranslation: 'I can hear music.',
    wordsUsed: ['音楽'],
    grammarParticles: ['が', 'こえます']
  }
  // ... (existing sentences will be preserved)
};

// Get list of words that still need sentences
function getMissingWords(vocabWithKanji) {
  const wordsWithSentences = new Set(Object.keys(naturalSentences));
  const missingWords = [];
  
  for (const vocab of vocabWithKanji) {
    if (!wordsWithSentences.has(vocab.word)) {
      missingWords.push(vocab.word);
    }
  }
  
  return missingWords;
}

// Systematically assign grammar patterns to words
function assignGrammarPatterns(missingWords, grammarPatterns) {
  const assignments = {};
  let n4Index = 0;
  let n5Index = 0;
  
  for (let i = 0; i < missingWords.length; i++) {
    const word = missingWords[i];
    
    // Alternate between N4 and N5 patterns, prioritizing N4
    if (i % 3 === 0 && n4Index < grammarPatterns.n4.length) {
      assignments[word] = {
        level: 'n4',
        pattern: grammarPatterns.n4[n4Index],
        index: n4Index
      };
      n4Index++;
    } else {
      assignments[word] = {
        level: 'n5',
        pattern: grammarPatterns.n5[n5Index % grammarPatterns.n5.length],
        index: n5Index % grammarPatterns.n5.length
      };
      n5Index++;
    }
  }
  
  return assignments;
}

// Create natural sentences using specific grammar patterns
function createSentenceWithGrammar(word, grammarAssignment) {
  const { level, pattern } = grammarAssignment;
  const firstKanji = word.match(/[一-龯]/)?.[0] || word.charAt(0);
  
  // Enhanced sentence templates for N4/N5 patterns
  const templates = {
    // N4 Advanced patterns
    'ために': () => ({
      sentence: `健康の*${firstKanji}*めに毎日運動します。`,
      englishTranslation: `I exercise every day for my health.`,
      wordsUsed: ['健康', '毎日', '運動'],
      grammarParticles: ['の', 'ために', 'します']
    }),
    'たら': () => ({
      sentence: `*${firstKanji}*たら連絡してください。`,
      englishTranslation: `Please contact me if/when ${word}.`,
      wordsUsed: ['連絡'],
      grammarParticles: ['たら', 'してください']
    }),
    'ながら': () => ({
      sentence: `音楽を聞き*${firstKanji}*ながら勉強します。`,
      englishTranslation: `I study while listening to music and ${word}.`,
      wordsUsed: ['音楽', '聞く', '勉強'],
      grammarParticles: ['を', 'ながら', 'します']
    }),
    'ので': () => ({
      sentence: `時間が*${firstKanji}*いので急いでいます。`,
      englishTranslation: `I'm in a hurry because time is ${word}.`,
      wordsUsed: ['時間', '急ぐ'],
      grammarParticles: ['が', 'いので', 'います']
    }),
    'てから': () => ({
      sentence: `宿題を*${firstKanji}*てから遊びます。`,
      englishTranslation: `I'll play after I ${word} my homework.`,
      wordsUsed: ['宿題', '遊ぶ'],
      grammarParticles: ['を', 'てから', 'ます']
    }),
    'かもしれない': () => ({
      sentence: `明日は*${firstKanji}*かもしれません。`,
      englishTranslation: `Tomorrow might be ${word}.`,
      wordsUsed: ['明日'],
      grammarParticles: ['は', 'かもしれません']
    }),
    'ことがある': () => ({
      sentence: `時々*${firstKanji}*ことがあります。`,
      englishTranslation: `Sometimes I ${word}.`,
      wordsUsed: ['時々'],
      grammarParticles: ['ことがあります']
    }),
    'つもり': () => ({
      sentence: `来年*${firstKanji}*つもりです。`,
      englishTranslation: `I intend to ${word} next year.`,
      wordsUsed: ['来年'],
      grammarParticles: ['つもりです']
    }),
    'について': () => ({
      sentence: `*${firstKanji}*について話しましょう。`,
      englishTranslation: `Let's talk about ${word}.`,
      wordsUsed: ['話す'],
      grammarParticles: ['について', 'しましょう']
    }),
    'すぎる': () => ({
      sentence: `この*${firstKanji}*は大きすぎます。`,
      englishTranslation: `This ${word} is too big.`,
      wordsUsed: ['大きい'],
      grammarParticles: ['は', 'すぎます']
    }),
    
    // N5 Basic patterns
    'は': () => ({
      sentence: `この*${firstKanji}*は新しいです。`,
      englishTranslation: `This ${word} is new.`,
      wordsUsed: ['新しい'],
      grammarParticles: ['は', 'です']
    }),
    'が': () => ({
      sentence: `*${firstKanji}*があります。`,
      englishTranslation: `There is ${word}.`,
      wordsUsed: [],
      grammarParticles: ['があります']
    }),
    'を': () => ({
      sentence: `*${firstKanji}*を買いました。`,
      englishTranslation: `I bought ${word}.`,
      wordsUsed: ['買う'],
      grammarParticles: ['を', 'ました']
    }),
    'に': () => ({
      sentence: `学校*${firstKanji}*に行きます。`,
      englishTranslation: `I go to school ${word}.`,
      wordsUsed: ['学校', '行く'],
      grammarParticles: ['に', 'ます']
    }),
    'で': () => ({
      sentence: `*${firstKanji}*で食べます。`,
      englishTranslation: `I eat with/at ${word}.`,
      wordsUsed: ['食べる'],
      grammarParticles: ['で', 'ます']
    }),
    'ている': () => ({
      sentence: `今*${firstKanji}*ています。`,
      englishTranslation: `I am ${word} now.`,
      wordsUsed: ['今'],
      grammarParticles: ['ています']
    }),
    'てください': () => ({
      sentence: `*${firstKanji}*てください。`,
      englishTranslation: `Please ${word}.`,
      wordsUsed: [],
      grammarParticles: ['てください']
    }),
    'たい': () => ({
      sentence: `*${firstKanji}*たいです。`,
      englishTranslation: `I want to ${word}.`,
      wordsUsed: [],
      grammarParticles: ['たいです']
    }),
    'ます': () => ({
      sentence: `毎日*${firstKanji}*ます。`,
      englishTranslation: `I ${word} every day.`,
      wordsUsed: ['毎日'],
      grammarParticles: ['ます']
    }),
    'ました': () => ({
      sentence: `昨日*${firstKanji}*ました。`,
      englishTranslation: `I ${word} yesterday.`,
      wordsUsed: ['昨日'],
      grammarParticles: ['ました']
    }),
    
    // Additional N4 patterns
    'でも': () => ({
      sentence: `*${firstKanji}*でも大丈夫です。`,
      englishTranslation: `Even ${word} is okay.`,
      wordsUsed: ['大丈夫'],
      grammarParticles: ['でも', 'です']
    }),
    'けれども': () => ({
      sentence: `*${firstKanji}*けれども問題ありません。`,
      englishTranslation: `Although ${word}, there's no problem.`,
      wordsUsed: ['問題'],
      grammarParticles: ['けれども', 'ありません']
    }),
    'そうだ': () => ({
      sentence: `*${firstKanji}*そうです。`,
      englishTranslation: `It looks like ${word}.`,
      wordsUsed: [],
      grammarParticles: ['そうです']
    }),
    'という': () => ({
      sentence: `*${firstKanji}*という話です。`,
      englishTranslation: `It's a story about ${word}.`,
      wordsUsed: ['話'],
      grammarParticles: ['という', 'です']
    }),
    'と思います': () => ({
      sentence: `*${firstKanji}*と思います。`,
      englishTranslation: `I think ${word}.`,
      wordsUsed: ['思う'],
      grammarParticles: ['と', 'います']
    }),
    'してみる': () => ({
      sentence: `*${firstKanji}*してみます。`,
      englishTranslation: `I'll try ${word}.`,
      wordsUsed: [],
      grammarParticles: ['してみます']
    }),
    'てしまう': () => ({
      sentence: `*${firstKanji}*てしまいました。`,
      englishTranslation: `I ended up ${word}.`,
      wordsUsed: [],
      grammarParticles: ['てしまいました']
    }),
    
    // Additional N5 patterns
    'あります': () => ({
      sentence: `*${firstKanji}*があります。`,
      englishTranslation: `There is ${word}.`,
      wordsUsed: [],
      grammarParticles: ['があります']
    }),
    'います': () => ({
      sentence: `*${firstKanji}*がいます。`,
      englishTranslation: `There is ${word}.`,
      wordsUsed: [],
      grammarParticles: ['がいます']
    }),
    'できます': () => ({
      sentence: `*${firstKanji}*ができます。`,
      englishTranslation: `I can do ${word}.`,
      wordsUsed: [],
      grammarParticles: ['ができます']
    }),
    'わかります': () => ({
      sentence: `*${firstKanji}*がわかります。`,
      englishTranslation: `I understand ${word}.`,
      wordsUsed: [],
      grammarParticles: ['がわかります']
    }),
    'します': () => ({
      sentence: `*${firstKanji}*をします。`,
      englishTranslation: `I do ${word}.`,
      wordsUsed: [],
      grammarParticles: ['をします']
    }),
    'だけ': () => ({
      sentence: `*${firstKanji}*だけです。`,
      englishTranslation: `It's only ${word}.`,
      wordsUsed: [],
      grammarParticles: ['だけです']
    }),
    'も': () => ({
      sentence: `*${firstKanji}*もあります。`,
      englishTranslation: `There is also ${word}.`,
      wordsUsed: [],
      grammarParticles: ['もあります']
    }),
    'まだ': () => ({
      sentence: `まだ*${firstKanji}*です。`,
      englishTranslation: `It's still ${word}.`,
      wordsUsed: [],
      grammarParticles: ['まだ', 'です']
    }),
    'とても': () => ({
      sentence: `とても*${firstKanji}*です。`,
      englishTranslation: `It's very ${word}.`,
      wordsUsed: [],
      grammarParticles: ['とても', 'です']
    }),
    'たくさん': () => ({
      sentence: `*${firstKanji}*がたくさんあります。`,
      englishTranslation: `There are many ${word}.`,
      wordsUsed: [],
      grammarParticles: ['がたくさんあります']
    }),
    
    // Generic fallback for any remaining patterns
    'default': () => ({
      sentence: `*${firstKanji}*は良いです。`,
      englishTranslation: `${word} is good.`,
      wordsUsed: ['良い'],
      grammarParticles: ['は', 'です']
    })
  };
  
  const template = templates[pattern] || templates['default'];
  if (template) {
    return template();
  }
  
  return null;
}

function generateSentenceForWord(word, reading, meaning) {
  // Only generate sentences for words we have specific natural examples for
  const naturalSentences = {
    '合う': {
      sentence: '靴のサイズが*合*わない。',
      englishTranslation: 'The shoe size doesn\'t fit.',
      wordsUsed: ['靴', 'サイズ'],
      grammarParticles: ['の', 'が', 'わない']
    },
    '集まる': {
      sentence: '友達が公園に*集*まった。',
      englishTranslation: 'Friends gathered at the park.',
      wordsUsed: ['友達', '公園'],
      grammarParticles: ['が', 'に', 'った']
    },
    '集める': {
      sentence: '切手を*集*めています。',
      englishTranslation: 'I am collecting stamps.',
      wordsUsed: ['切手'],
      grammarParticles: ['を', 'ています']
    },
    '上がる': {
      sentence: '値段が*上*がった。',
      englishTranslation: 'The price went up.',
      wordsUsed: ['値段'],
      grammarParticles: ['が', 'った']
    },
    '浅い': {
      sentence: 'この川は*浅*い。',
      englishTranslation: 'This river is shallow.',
      wordsUsed: ['この', '川'],
      grammarParticles: ['は', 'い']
    },
    '遊び': {
      sentence: '子供の*遊*びです。',
      englishTranslation: 'It\'s children\'s play.',
      wordsUsed: ['子供'],
      grammarParticles: ['の', 'です']
    },
    '安心': {
      sentence: '母が*安心*した。',
      englishTranslation: 'Mother felt relieved.',
      wordsUsed: ['母'],
      grammarParticles: ['が', 'した']
    },
    '安全': {
      sentence: '道路が*安全*です。',
      englishTranslation: 'The road is safe.',
      wordsUsed: ['道路'],
      grammarParticles: ['が', 'です']
    },
    '謝る': {
      sentence: '遅れたので*謝*りました。',
      englishTranslation: 'I apologized because I was late.',
      wordsUsed: ['遅れる'],
      grammarParticles: ['ので', 'りました']
    },
    '動く': {
      sentence: '車が*動*かない。',
      englishTranslation: 'The car won\'t move.',
      wordsUsed: ['車'],
      grammarParticles: ['が', 'かない']
    },
    '嘘': {
      sentence: '*嘘*を言ってはいけません。',
      englishTranslation: 'You must not tell lies.',
      wordsUsed: ['言う'],
      grammarParticles: ['を', 'ってはいけません']
    },
    '内': {
      sentence: '家の*内*で待っています。',
      englishTranslation: 'I\'m waiting inside the house.',
      wordsUsed: ['家', '待つ'],
      grammarParticles: ['の', 'で', 'っています']
    },
    '移る': {
      sentence: '新しい家に*移*りました。',
      englishTranslation: 'I moved to a new house.',
      wordsUsed: ['新しい', '家'],
      grammarParticles: ['に', 'りました']
    },
    '腕': {
      sentence: '*腕*が痛いです。',
      englishTranslation: 'My arm hurts.',
      wordsUsed: ['痛い'],
      grammarParticles: ['が', 'です']
    },
    '裏': {
      sentence: '紙の*裏*に書いてください。',
      englishTranslation: 'Please write on the back of the paper.',
      wordsUsed: ['紙', '書く'],
      grammarParticles: ['の', 'に', 'いてください']
    },
    '遠慮': {
      sentence: '*遠慮*しないでください。',
      englishTranslation: 'Please don\'t hesitate.',
      wordsUsed: [],
      grammarParticles: ['しないでください']
    },
    '表': {
      sentence: '*表*を見てください。',
      englishTranslation: 'Please look at the table.',
      wordsUsed: ['見る'],
      grammarParticles: ['を', 'てください']
    },
    '親': {
      sentence: '*親*に電話をかけます。',
      englishTranslation: 'I will call my parents.',
      wordsUsed: ['電話'],
      grammarParticles: ['に', 'を', 'かけます']
    },
    '折る': {
      sentence: '紙を半分に*折*りました。',
      englishTranslation: 'I folded the paper in half.',
      wordsUsed: ['紙', '半分'],
      grammarParticles: ['を', 'に', 'りました']
    },
    'お礼': {
      sentence: '*お礼*を言いました。',
      englishTranslation: 'I said thank you.',
      wordsUsed: ['言う'],
      grammarParticles: ['を', 'いました']
    },
    '海岸': {
      sentence: '*海岸*を歩きました。',
      englishTranslation: 'I walked along the coast.',
      wordsUsed: ['歩く'],
      grammarParticles: ['を', 'きました']
    },
    '会議室': {
      sentence: '*会議室*で話し合いをします。',
      englishTranslation: 'We will have a discussion in the meeting room.',
      wordsUsed: ['話し合い'],
      grammarParticles: ['で', 'をします']
    },
    '帰り': {
      sentence: '学校の*帰り*に買い物をします。',
      englishTranslation: 'I will shop on the way home from school.',
      wordsUsed: ['学校', '買い物'],
      grammarParticles: ['の', 'に', 'をします']
    },
    '鏡': {
      sentence: '*鏡*で顔を見ました。',
      englishTranslation: 'I looked at my face in the mirror.',
      wordsUsed: ['顔', '見る'],
      grammarParticles: ['で', 'を', 'ました']
    },
    '飾る': {
      sentence: '部屋に花を*飾*りました。',
      englishTranslation: 'I decorated the room with flowers.',
      wordsUsed: ['部屋', '花'],
      grammarParticles: ['に', 'を', 'りました']
    },
    '堅い': {
      sentence: 'この肉は*堅*いです。',
      englishTranslation: 'This meat is tough.',
      wordsUsed: ['肉'],
      grammarParticles: ['は', 'です']
    },
    '硬い': {
      sentence: 'この石は*硬*いです。',
      englishTranslation: 'This stone is hard.',
      wordsUsed: ['石'],
      grammarParticles: ['は', 'です']
    },
    '片付ける': {
      sentence: '部屋を*片付*けなければなりません。',
      englishTranslation: 'I must clean up the room.',
      wordsUsed: ['部屋'],
      grammarParticles: ['を', 'けなければなりません']
    },
    '格好': {
      sentence: 'その*格好*はおかしいです。',
      englishTranslation: 'That appearance is strange.',
      wordsUsed: ['おかしい'],
      grammarParticles: ['その', 'は', 'です']
    },
    '悲しい': {
      sentence: 'とても*悲*しい映画でした。',
      englishTranslation: 'It was a very sad movie.',
      wordsUsed: ['とても', '映画'],
      grammarParticles: ['しい', 'でした']
    },
    '案内': {
      sentence: '駅まで*案内*してください。',
      englishTranslation: 'Please guide me to the station.',
      wordsUsed: ['駅'],
      grammarParticles: ['まで', 'してください']
    },
    '以外': {
      sentence: '日曜日*以外*は忙しいです。',
      englishTranslation: 'I\'m busy except on Sundays.',
      wordsUsed: ['日曜日', '忙しい'],
      grammarParticles: ['以外', 'は', 'です']
    },
    '医学': {
      sentence: '*医学*を勉強しています。',
      englishTranslation: 'I\'m studying medicine.',
      wordsUsed: ['勉強'],
      grammarParticles: ['を', 'しています']
    },
    '意見': {
      sentence: 'あなたの*意見*を聞かせてください。',
      englishTranslation: 'Please let me hear your opinion.',
      wordsUsed: ['聞く'],
      grammarParticles: ['の', 'を', 'かせてください']
    },
    '石': {
      sentence: '川で*石*を拾いました。',
      englishTranslation: 'I picked up stones at the river.',
      wordsUsed: ['川', '拾う'],
      grammarParticles: ['で', 'を', 'いました']
    },
    '致す': {
      sentence: 'お手伝い*致*します。',
      englishTranslation: 'I will help you (humble).',
      wordsUsed: ['お手伝い'],
      grammarParticles: ['致します']
    },
    '一度': {
      sentence: '*一度*お会いしたいです。',
      englishTranslation: 'I would like to meet you once.',
      wordsUsed: ['会う'],
      grammarParticles: ['一度', 'お', 'したいです']
    },
    '一生懸命': {
      sentence: '*一生懸命*勉強しました。',
      englishTranslation: 'I studied very hard.',
      wordsUsed: ['勉強'],
      grammarParticles: ['一生懸命', 'しました']
    },
    '一杯': {
      sentence: 'コーヒーを*一杯*ください。',
      englishTranslation: 'Please give me one cup of coffee.',
      wordsUsed: ['コーヒー'],
      grammarParticles: ['を', '一杯', 'ください']
    },
    '以内': {
      sentence: '一時間*以内*に帰ります。',
      englishTranslation: 'I will return within one hour.',
      wordsUsed: ['一時間', '帰る'],
      grammarParticles: ['以内', 'に', 'ります']
    },
    '田舎': {
      sentence: '*田舎*で育ちました。',
      englishTranslation: 'I grew up in the countryside.',
      wordsUsed: ['育つ'],
      grammarParticles: ['で', 'ちました']
    },
    '祈る': {
      sentence: '成功を*祈*っています。',
      englishTranslation: 'I\'m praying for success.',
      wordsUsed: ['成功'],
      grammarParticles: ['を', 'っています']
    },
    '植える': {
      sentence: '庭に花を*植*えました。',
      englishTranslation: 'I planted flowers in the garden.',
      wordsUsed: ['庭', '花'],
      grammarParticles: ['に', 'を', 'えました']
    },
    '関係': {
      sentence: 'それは私と*関係*ありません。',
      englishTranslation: 'That has nothing to do with me.',
      wordsUsed: ['私'],
      grammarParticles: ['は', 'と', 'ありません']
    },
    '簡単': {
      sentence: 'この問題は*簡単*です。',
      englishTranslation: 'This problem is easy.',
      wordsUsed: ['問題'],
      grammarParticles: ['この', 'は', 'です']
    },
    '機会': {
      sentence: 'いい*機会*だと思います。',
      englishTranslation: 'I think it\'s a good opportunity.',
      wordsUsed: ['いい', '思う'],
      grammarParticles: ['だと', 'います']
    },
    '聞こえる': {
      sentence: '音楽が*聞*こえます。',
      englishTranslation: 'I can hear music.',
      wordsUsed: ['音楽'],
      grammarParticles: ['が', 'こえます']
    },
    '受ける': {
      sentence: '試験を*受*けます。',
      englishTranslation: 'I will take an exam.',
      wordsUsed: ['試験'],
      grammarParticles: ['を', 'けます']
    },
    '打つ': {
      sentence: 'ボールを*打*った。',
      englishTranslation: 'I hit the ball.',
      wordsUsed: ['ボール'],
      grammarParticles: ['を', 'った']
    },
    '美しい': {
      sentence: '花が*美*しい。',
      englishTranslation: 'The flowers are beautiful.',
      wordsUsed: ['花'],
      grammarParticles: ['が', 'しい']
    },
    '写す': {
      sentence: '写真を*写*した。',
      englishTranslation: 'I took a photo.',
      wordsUsed: ['写真'],
      grammarParticles: ['を', 'した']
    },
    '運転': {
      sentence: '車の*運転*をします。',
      englishTranslation: 'I drive a car.',
      wordsUsed: ['車'],
      grammarParticles: ['の', 'を', 'します']
    },
    '運転手': {
      sentence: 'バスの*運転手*です。',
      englishTranslation: 'He is a bus driver.',
      wordsUsed: ['バス'],
      grammarParticles: ['の', 'です']
    },
    '運動': {
      sentence: '毎日*運動*します。',
      englishTranslation: 'I exercise every day.',
      wordsUsed: ['毎日'],
      grammarParticles: ['します']
    },
    '選ぶ': {
      sentence: '本を*選*んだ。',
      englishTranslation: 'I chose a book.',
      wordsUsed: ['本'],
      grammarParticles: ['を', 'んだ']
    },
    '思う': {
      sentence: '面白いと*思*う。',
      englishTranslation: 'I think it\'s interesting.',
      wordsUsed: ['面白い'],
      grammarParticles: ['と', 'う']
    },
    '下りる': {
      sentence: '階段を*下*りた。',
      englishTranslation: 'I went down the stairs.',
      wordsUsed: ['階段'],
      grammarParticles: ['を', 'りた']
    },
    '折れる': {
      sentence: '枝が*折*れた。',
      englishTranslation: 'The branch broke.',
      wordsUsed: ['枝'],
      grammarParticles: ['が', 'れた']
    },
    '会場': {
      sentence: '*会場*に行きます。',
      englishTranslation: 'I will go to the venue.',
      wordsUsed: ['行く'],
      grammarParticles: ['に', 'きます']
    },
    '火事': {
      sentence: '*火事*が起きた。',
      englishTranslation: 'A fire broke out.',
      wordsUsed: ['起きる'],
      grammarParticles: ['が', 'きた']
    },
    '固い': {
      sentence: 'パンが*固*い。',
      englishTranslation: 'The bread is hard.',
      wordsUsed: ['パン'],
      grammarParticles: ['が', 'い']
    },
    '形': {
      sentence: '丸い*形*です。',
      englishTranslation: 'It\'s a round shape.',
      wordsUsed: ['丸い'],
      grammarParticles: ['い', 'です']
    },
    '課長': {
      sentence: '*課長*に話した。',
      englishTranslation: 'I spoke to the section chief.',
      wordsUsed: ['話す'],
      grammarParticles: ['に', 'した']
    },
    '勝つ': {
      sentence: '試合に*勝*った。',
      englishTranslation: 'I won the match.',
      wordsUsed: ['試合'],
      grammarParticles: ['に', 'った']
    },
    '必ず': {
      sentence: '*必*ず来ます。',
      englishTranslation: 'I will definitely come.',
      wordsUsed: ['来る'],
      grammarParticles: ['ず', 'きます']
    },
    '金持ち': {
      sentence: '彼は*金持*ちです。',
      englishTranslation: 'He is rich.',
      wordsUsed: ['彼'],
      grammarParticles: ['は', 'ちです']
    },
    '糸': {
      sentence: '赤い*糸*です。',
      englishTranslation: 'It\'s red thread.',
      wordsUsed: ['赤い'],
      grammarParticles: ['い', 'です']
    },
    '気': {
      sentence: '*気*を付けて。',
      englishTranslation: 'Be careful.',
      wordsUsed: ['付ける'],
      grammarParticles: ['を', 'けて']
    },
    '危険': {
      sentence: 'とても*危険*です。',
      englishTranslation: 'It\'s very dangerous.',
      wordsUsed: ['とても'],
      grammarParticles: ['です']
    },
    '絹': {
      sentence: '*絹*の服です。',
      englishTranslation: 'It\'s silk clothing.',
      wordsUsed: ['服'],
      grammarParticles: ['の', 'です']
    },
    '気分': {
      sentence: '*気分*が良い。',
      englishTranslation: 'I feel good.',
      wordsUsed: ['良い'],
      grammarParticles: ['が', 'い']
    },
    '決める': {
      sentence: '時間を*決*めた。',
      englishTranslation: 'I decided the time.',
      wordsUsed: ['時間'],
      grammarParticles: ['を', 'めた']
    },
    '客': {
      sentence: '*客*が来た。',
      englishTranslation: 'A customer came.',
      wordsUsed: ['来る'],
      grammarParticles: ['が', 'た']
    },
    '競争': {
      sentence: '*競争*が始まった。',
      englishTranslation: 'The competition started.',
      wordsUsed: ['始まる'],
      grammarParticles: ['が', 'まった']
    },
    '興味': {
      sentence: '音楽に*興味*がある。',
      englishTranslation: 'I have interest in music.',
      wordsUsed: ['音楽'],
      grammarParticles: ['に', 'がある']
    },
    '具合': {
      sentence: '体の*具合*が悪い。',
      englishTranslation: 'I don\'t feel well.',
      wordsUsed: ['体', '悪い'],
      grammarParticles: ['の', 'が', 'い']
    },
    '空気': {
      sentence: '*空気*がきれいです。',
      englishTranslation: 'The air is clean.',
      wordsUsed: ['きれい'],
      grammarParticles: ['が', 'です']
    },
    '空港': {
      sentence: '*空港*に着いた。',
      englishTranslation: 'I arrived at the airport.',
      wordsUsed: ['着く'],
      grammarParticles: ['に', 'いた']
    },
    '起す': {
      sentence: '友達を*起*こした。',
      englishTranslation: 'I woke up my friend.',
      wordsUsed: ['友達'],
      grammarParticles: ['を', 'こした']
    },
    '怒る': {
      sentence: '先生が*怒*った。',
      englishTranslation: 'The teacher got angry.',
      wordsUsed: ['先生'],
      grammarParticles: ['が', 'った']
    },
    '音': {
      sentence: '大きな*音*がした。',
      englishTranslation: 'There was a loud sound.',
      wordsUsed: ['大きな'],
      grammarParticles: ['な', 'がした']
    },
    '踊り': {
      sentence: '日本の*踊*りです。',
      englishTranslation: 'It\'s Japanese dance.',
      wordsUsed: ['日本'],
      grammarParticles: ['の', 'です']
    },
    '原因': {
      sentence: '事故の*原因*です。',
      englishTranslation: 'It\'s the cause of the accident.',
      wordsUsed: ['事故'],
      grammarParticles: ['の', 'です']
    },
    '研究': {
      sentence: '科学を*研究*します。',
      englishTranslation: 'I study science.',
      wordsUsed: ['科学'],
      grammarParticles: ['を', 'します']
    },
    '工業': {
      sentence: '*工業*が発達した。',
      englishTranslation: 'Industry developed.',
      wordsUsed: ['発達'],
      grammarParticles: ['が', 'した']
    },
    '工場': {
      sentence: '*工場*で働く。',
      englishTranslation: 'I work at a factory.',
      wordsUsed: ['働く'],
      grammarParticles: ['で', 'く']
    },
    '答': {
      sentence: '正しい*答*です。',
      englishTranslation: 'It\'s the correct answer.',
      wordsUsed: ['正しい'],
      grammarParticles: ['い', 'です']
    },
    '壁': {
      sentence: '白い*壁*です。',
      englishTranslation: 'It\'s a white wall.',
      wordsUsed: ['白い'],
      grammarParticles: ['い', 'です']
    },
    '噛む': {
      sentence: 'りんごを*噛*んだ。',
      englishTranslation: 'I bit the apple.',
      wordsUsed: ['りんご'],
      grammarParticles: ['を', 'んだ']
    },
    '彼': {
      sentence: '*彼*は学生です。',
      englishTranslation: 'He is a student.',
      wordsUsed: ['学生'],
      grammarParticles: ['は', 'です']
    },
    '変わる': {
      sentence: '天気が*変*わった。',
      englishTranslation: 'The weather changed.',
      wordsUsed: ['天気'],
      grammarParticles: ['が', 'わった']
    },
    '騒ぐ': {
      sentence: '子供が*騒*いだ。',
      englishTranslation: 'The children made noise.',
      wordsUsed: ['子供'],
      grammarParticles: ['が', 'いだ']
    },
    '残念': {
      sentence: 'とても*残念*です。',
      englishTranslation: 'It\'s very unfortunate.',
      wordsUsed: ['とても'],
      grammarParticles: ['です']
    },
    '市': {
      sentence: '大きな*市*です。',
      englishTranslation: 'It\'s a big city.',
      wordsUsed: ['大きな'],
      grammarParticles: ['な', 'です']
    },
    '字': {
      sentence: 'きれいな*字*です。',
      englishTranslation: 'It\'s beautiful handwriting.',
      wordsUsed: ['きれい'],
      grammarParticles: ['な', 'です']
    },
    '時代': {
      sentence: '新しい*時代*です。',
      englishTranslation: 'It\'s a new era.',
      wordsUsed: ['新しい'],
      grammarParticles: ['い', 'です']
    },
    '事務所': {
      sentence: '父は*事務所*で働いています。',
      englishTranslation: 'My father works at an office.',
      wordsUsed: ['父', '働く'],
      grammarParticles: ['は', 'で', 'いています']
    },
    '社会': {
      sentence: '日本の*社会*について学んでいます。',
      englishTranslation: 'I am learning about Japanese society.',
      wordsUsed: ['日本', '学ぶ'],
      grammarParticles: ['の', 'について', 'んでいます']
    },
    '自由': {
      sentence: '時間が*自由*になりました。',
      englishTranslation: 'My time became free.',
      wordsUsed: ['時間'],
      grammarParticles: ['が', 'になりました']
    },
    '習慣': {
      sentence: '毎朝走るのが*習慣*です。',
      englishTranslation: 'Running every morning is my habit.',
      wordsUsed: ['毎朝', '走る'],
      grammarParticles: ['る', 'のが', 'です']
    },
    '柔道': {
      sentence: '兄は*柔道*を習っています。',
      englishTranslation: 'My older brother is learning judo.',
      wordsUsed: ['兄', '習う'],
      grammarParticles: ['は', 'を', 'っています']
    },
    '招待': {
      sentence: '友達をパーティーに*招待*しました。',
      englishTranslation: 'I invited friends to the party.',
      wordsUsed: ['友達', 'パーティー'],
      grammarParticles: ['を', 'に', 'しました']
    },
    '将来': {
      sentence: '*将来*は医者になりたいです。',
      englishTranslation: 'In the future, I want to become a doctor.',
      wordsUsed: ['医者', 'なる'],
      grammarParticles: ['は', 'に', 'なりたいです']
    },
    '食事': {
      sentence: '家族と*食事*をしました。',
      englishTranslation: 'I had a meal with my family.',
      wordsUsed: ['家族'],
      grammarParticles: ['と', 'を', 'しました']
    },
    '知らせる': {
      sentence: '結果を友達に*知*らせます。',
      englishTranslation: 'I will inform my friend of the results.',
      wordsUsed: ['結果', '友達'],
      grammarParticles: ['を', 'に', 'らせます']
    },
    '調べる': {
      sentence: '辞書で言葉を*調*べました。',
      englishTranslation: 'I looked up the word in a dictionary.',
      wordsUsed: ['辞書', '言葉'],
      grammarParticles: ['で', 'を', 'べました']
    },
    '神社': {
      sentence: 'お正月に*神社*へ行きました。',
      englishTranslation: 'I went to a shrine on New Year\'s.',
      wordsUsed: ['お正月', '行く'],
      grammarParticles: ['に', 'へ', 'きました']
    },
    '水泳': {
      sentence: '夏は*水泳*を楽しみます。',
      englishTranslation: 'I enjoy swimming in summer.',
      wordsUsed: ['夏', '楽しむ'],
      grammarParticles: ['は', 'を', 'みます']
    },
    '砂': {
      sentence: '海の*砂*は白いです。',
      englishTranslation: 'The sand at the beach is white.',
      wordsUsed: ['海', '白い'],
      grammarParticles: ['の', 'は', 'いです']
    },
    '隅': {
      sentence: '部屋の*隅*に机があります。',
      englishTranslation: 'There is a desk in the corner of the room.',
      wordsUsed: ['部屋', '机'],
      grammarParticles: ['の', 'に', 'があります']
    },
    '生活': {
      sentence: '日本での*生活*に慣れました。',
      englishTranslation: 'I got used to life in Japan.',
      wordsUsed: ['日本', '慣れる'],
      grammarParticles: ['での', 'に', 'れました']
    },
    '今度': {
      sentence: '*今度*一緒に映画を見ませんか。',
      englishTranslation: 'Would you like to watch a movie together next time?',
      wordsUsed: ['一緒', '映画', '見る'],
      grammarParticles: ['に', 'を', 'ませんか']
    },
    '今夜': {
      sentence: '*今夜*は雨が降るでしょう。',
      englishTranslation: 'It will probably rain tonight.',
      wordsUsed: ['雨', '降る'],
      grammarParticles: ['は', 'が', 'るでしょう']
    },
    '最近': {
      sentence: '*最近*忙しくて疲れています。',
      englishTranslation: 'I\'ve been busy and tired lately.',
      wordsUsed: ['忙しい', '疲れる'],
      grammarParticles: ['くて', 'ています']
    },
    '最初': {
      sentence: '*最初*は難しかったです。',
      englishTranslation: 'It was difficult at first.',
      wordsUsed: ['難しい'],
      grammarParticles: ['は', 'かったです']
    },
    '相談': {
      sentence: '先生に*相談*したいことがあります。',
      englishTranslation: 'There is something I want to consult with the teacher about.',
      wordsUsed: ['先生', 'こと'],
      grammarParticles: ['に', 'したい', 'があります']
    },
    '祖父': {
      sentence: '*祖父*は毎朝散歩をします。',
      englishTranslation: 'My grandfather takes a walk every morning.',
      wordsUsed: ['毎朝', '散歩'],
      grammarParticles: ['は', 'を', 'します']
    },
    '大抵': {
      sentence: '*大抵*の人は車を持っています。',
      englishTranslation: 'Most people have cars.',
      wordsUsed: ['人', '車', '持つ'],
      grammarParticles: ['の', 'は', 'を', 'っています']
    },
    '大分': {
      sentence: '日本語が*大分*上手になりました。',
      englishTranslation: 'My Japanese has become much better.',
      wordsUsed: ['日本語', '上手'],
      grammarParticles: ['が', 'に', 'なりました']
    },
    '訪ねる': {
      sentence: '来月友達を*訪*ねる予定です。',
      englishTranslation: 'I plan to visit my friend next month.',
      wordsUsed: ['来月', '友達', '予定'],
      grammarParticles: ['を', 'ねる', 'です']
    },
    '正しい': {
      sentence: 'この答えは*正*しいと思います。',
      englishTranslation: 'I think this answer is correct.',
      wordsUsed: ['この', '答え', '思う'],
      grammarParticles: ['は', 'しいと', 'います']
    },
    '楽しみ': {
      sentence: '旅行が*楽*しみです。',
      englishTranslation: 'I\'m looking forward to the trip.',
      wordsUsed: ['旅行'],
      grammarParticles: ['が', 'しみです']
    },
    '出席': {
      sentence: '会議に*出席*しなければなりません。',
      englishTranslation: 'I must attend the meeting.',
      wordsUsed: ['会議'],
      grammarParticles: ['に', 'しなければなりません']
    },
    '小説': {
      sentence: '面白い*小説*を読んでいます。',
      englishTranslation: 'I am reading an interesting novel.',
      wordsUsed: ['面白い', '読む'],
      grammarParticles: ['い', 'を', 'んでいます']
    },
    '地理': {
      sentence: '世界の*地理*を勉強しています。',
      englishTranslation: 'I am studying world geography.',
      wordsUsed: ['世界', '勉強'],
      grammarParticles: ['の', 'を', 'しています']
    },
    '月': {
      sentence: '今日は*月*がきれいです。',
      englishTranslation: 'The moon is beautiful today.',
      wordsUsed: ['今日', 'きれい'],
      grammarParticles: ['は', 'が', 'です']
    },
    '付く': {
      sentence: 'バスに電気が*付*いています。',
      englishTranslation: 'The lights are on in the bus.',
      wordsUsed: ['バス', '電気'],
      grammarParticles: ['に', 'が', 'いています']
    },
    '続ける': {
      sentence: '勉強を*続*けるつもりです。',
      englishTranslation: 'I intend to continue studying.',
      wordsUsed: ['勉強', 'つもり'],
      grammarParticles: ['を', 'ける', 'です']
    },
    '妻': {
      sentence: '*妻*は料理が上手です。',
      englishTranslation: 'My wife is good at cooking.',
      wordsUsed: ['料理', '上手'],
      grammarParticles: ['は', 'が', 'です']
    },
    '道具': {
      sentence: '料理の*道具*を買いました。',
      englishTranslation: 'I bought cooking utensils.',
      wordsUsed: ['料理', '買う'],
      grammarParticles: ['の', 'を', 'いました']
    },
    '動物園': {
      sentence: '子供と*動物園*に行きました。',
      englishTranslation: 'I went to the zoo with my child.',
      wordsUsed: ['子供', '行く'],
      grammarParticles: ['と', 'に', 'きました']
    },
    '特に': {
      sentence: '*特*に好きな食べ物はありません。',
      englishTranslation: 'There is no food I particularly like.',
      wordsUsed: ['好き', '食べ物'],
      grammarParticles: ['に', 'な', 'はありません']
    },
    '泥棒': {
      sentence: '家に*泥棒*が入りました。',
      englishTranslation: 'A thief entered the house.',
      wordsUsed: ['家', '入る'],
      grammarParticles: ['に', 'が', 'りました']
    },
    '直る': {
      sentence: '時計が*直*りました。',
      englishTranslation: 'The clock was fixed.',
      wordsUsed: ['時計'],
      grammarParticles: ['が', 'りました']
    },
    '政治': {
      sentence: '日本の*政治*に興味があります。',
      englishTranslation: 'I am interested in Japanese politics.',
      wordsUsed: ['日本', '興味'],
      grammarParticles: ['の', 'に', 'があります']
    },
    '鳴る': {
      sentence: '電話が*鳴*っています。',
      englishTranslation: 'The phone is ringing.',
      wordsUsed: ['電話'],
      grammarParticles: ['が', 'っています']
    },
    '慣れる': {
      sentence: '新しい環境に*慣*れるまで時間がかかりました。',
      englishTranslation: 'It took time to get used to the new environment.',
      wordsUsed: ['新しい', '環境', '時間'],
      grammarParticles: ['い', 'に', 'れるまで', 'がかかりました']
    },
    '苦い': {
      sentence: 'この薬は*苦*くて飲みにくいです。',
      englishTranslation: 'This medicine is bitter and hard to drink.',
      wordsUsed: ['この', '薬', '飲む'],
      grammarParticles: ['は', 'くて', 'みにくいです']
    },
    '逃げる': {
      sentence: '猫が犬から*逃*げました。',
      englishTranslation: 'The cat ran away from the dog.',
      wordsUsed: ['猫', '犬'],
      grammarParticles: ['が', 'から', 'げました']
    },
    '日記': {
      sentence: '毎晩*日記*を書いています。',
      englishTranslation: 'I write in my diary every night.',
      wordsUsed: ['毎晩', '書く'],
      grammarParticles: ['を', 'いています']
    },
    '入院': {
      sentence: '父が病気で*入院*しました。',
      englishTranslation: 'My father was hospitalized due to illness.',
      wordsUsed: ['父', '病気'],
      grammarParticles: ['が', 'で', 'しました']
    },
    '入学': {
      sentence: '来年大学に*入学*する予定です。',
      englishTranslation: 'I plan to enter university next year.',
      wordsUsed: ['来年', '大学', '予定'],
      grammarParticles: ['に', 'する', 'です']
    },
    '似る': {
      sentence: '息子は父親に*似*ています。',
      englishTranslation: 'The son resembles his father.',
      wordsUsed: ['息子', '父親'],
      grammarParticles: ['は', 'に', 'ています']
    },
    '人形': {
      sentence: '娘は*人形*で遊んでいます。',
      englishTranslation: 'My daughter is playing with dolls.',
      wordsUsed: ['娘', '遊ぶ'],
      grammarParticles: ['は', 'で', 'んでいます']
    },
    '塗る': {
      sentence: '壁にペンキを*塗*りました。',
      englishTranslation: 'I painted the wall with paint.',
      wordsUsed: ['壁', 'ペンキ'],
      grammarParticles: ['に', 'を', 'りました']
    },
    '熱': {
      sentence: '子供に*熱*があります。',
      englishTranslation: 'The child has a fever.',
      wordsUsed: ['子供'],
      grammarParticles: ['に', 'があります']
    },
    '眠い': {
      sentence: '今日はとても*眠*いです。',
      englishTranslation: 'I am very sleepy today.',
      wordsUsed: ['今日', 'とても'],
      grammarParticles: ['は', 'いです']
    },
    '眠る': {
      sentence: '赤ちゃんが静かに*眠*っています。',
      englishTranslation: 'The baby is sleeping quietly.',
      wordsUsed: ['赤ちゃん', '静か'],
      grammarParticles: ['が', 'に', 'っています']
    },
    '残る': {
      sentence: 'まだ宿題が*残*っています。',
      englishTranslation: 'There is still homework remaining.',
      wordsUsed: ['まだ', '宿題'],
      grammarParticles: ['が', 'っています']
    },
    '喉': {
      sentence: '*喉*が痛くて水を飲みました。',
      englishTranslation: 'My throat hurt so I drank water.',
      wordsUsed: ['痛い', '水', '飲む'],
      grammarParticles: ['が', 'くて', 'を', 'みました']
    },
    '乗り換える': {
      sentence: '新宿で電車を*乗*り*換*えます。',
      englishTranslation: 'I will transfer trains at Shinjuku.',
      wordsUsed: ['新宿', '電車'],
      grammarParticles: ['で', 'を', 'えます']
    },
    '乗り物': {
      sentence: '飛行機は速い*乗*り*物*です。',
      englishTranslation: 'Airplanes are fast vehicles.',
      wordsUsed: ['飛行機', '速い'],
      grammarParticles: ['は', 'い', 'です']
    },
    '葉': {
      sentence: '秋になると*葉*が黄色くなります。',
      englishTranslation: 'The leaves turn yellow in autumn.',
      wordsUsed: ['秋', '黄色い'],
      grammarParticles: ['になると', 'が', 'くなります']
    },
    '場合': {
      sentence: '雨の*場合*は中止します。',
      englishTranslation: 'In case of rain, it will be canceled.',
      wordsUsed: ['雨', '中止'],
      grammarParticles: ['の', 'は', 'します']
    },
    '倍': {
      sentence: '今年の売上は去年の二*倍*です。',
      englishTranslation: 'This year\'s sales are double last year\'s.',
      wordsUsed: ['今年', '売上', '去年', '二'],
      grammarParticles: ['の', 'は', 'の', 'です']
    },
    '運ぶ': {
      sentence: '重い荷物を*運*んでもらいました。',
      englishTranslation: 'I had someone carry the heavy luggage.',
      wordsUsed: ['重い', '荷物'],
      grammarParticles: ['い', 'を', 'んでもらいました']
    },
    '始める': {
      sentence: '来月から新しい仕事を*始*めます。',
      englishTranslation: 'I will start a new job from next month.',
      wordsUsed: ['来月', '新しい', '仕事'],
      grammarParticles: ['から', 'い', 'を', 'めます']
    },
    '場所': {
      sentence: '静かな*場所*で勉強したいです。',
      englishTranslation: 'I want to study in a quiet place.',
      wordsUsed: ['静か', '勉強'],
      grammarParticles: ['な', 'で', 'したいです']
    },
    '恥ずかしい': {
      sentence: '人前で話すのが*恥*ずかしいです。',
      englishTranslation: 'I\'m embarrassed to speak in front of people.',
      wordsUsed: ['人前', '話す'],
      grammarParticles: ['で', 'すのが', 'ずかしいです']
    },
    '発音': {
      sentence: '日本語の*発音*は難しいです。',
      englishTranslation: 'Japanese pronunciation is difficult.',
      wordsUsed: ['日本語', '難しい'],
      grammarParticles: ['の', 'は', 'いです']
    },
    '足りる': {
      sentence: 'お金が*足*りなくて困りました。',
      englishTranslation: 'I was troubled because I didn\'t have enough money.',
      wordsUsed: ['お金', '困る'],
      grammarParticles: ['が', 'りなくて', 'りました']
    },
    '男性': {
      sentence: 'あの*男性*は私の兄です。',
      englishTranslation: 'That man is my older brother.',
      wordsUsed: ['あの', '私', '兄'],
      grammarParticles: ['は', 'の', 'です']
    },
    '血': {
      sentence: '怪我をして*血*が出ました。',
      englishTranslation: 'I got injured and blood came out.',
      wordsUsed: ['怪我', '出る'],
      grammarParticles: ['をして', 'が', 'ました']
    },
    '力': {
      sentence: 'この箱は重くて*力*が必要です。',
      englishTranslation: 'This box is heavy and requires strength.',
      wordsUsed: ['この', '箱', '重い', '必要'],
      grammarParticles: ['は', 'くて', 'が', 'です']
    },
    '注意': {
      sentence: '車に*注意*して道を渡りました。',
      englishTranslation: 'I crossed the road being careful of cars.',
      wordsUsed: ['車', '道', '渡る'],
      grammarParticles: ['に', 'して', 'を', 'りました']
    },
    '中学校': {
      sentence: '息子は*中学校*に通っています。',
      englishTranslation: 'My son attends middle school.',
      wordsUsed: ['息子', '通う'],
      grammarParticles: ['は', 'に', 'っています']
    },
    '駐車場': {
      sentence: '*駐車場*に車を停めました。',
      englishTranslation: 'I parked the car in the parking lot.',
      wordsUsed: ['車', '停める'],
      grammarParticles: ['に', 'を', 'めました']
    },
    '日': {
      sentence: '今*日*はいい天気です。',
      englishTranslation: 'Today is good weather.',
      wordsUsed: ['今', 'いい', '天気'],
      grammarParticles: ['は', 'い', 'です']
    },
    '火': {
      sentence: 'キャンプで*火*をおこしました。',
      englishTranslation: 'We made a fire while camping.',
      wordsUsed: ['キャンプ'],
      grammarParticles: ['で', 'をおこしました']
    },
    '冷える': {
      sentence: '夜になると*冷*えます。',
      englishTranslation: 'It gets cold when night comes.',
      wordsUsed: ['夜'],
      grammarParticles: ['になると', 'えます']
    },
    '光': {
      sentence: '太陽の*光*が強いです。',
      englishTranslation: 'The sunlight is strong.',
      wordsUsed: ['太陽', '強い'],
      grammarParticles: ['の', 'が', 'いです']
    },
    '光る': {
      sentence: '星が*光*っています。',
      englishTranslation: 'The stars are shining.',
      wordsUsed: ['星'],
      grammarParticles: ['が', 'っています']
    },
    '引き出し': {
      sentence: '机の*引*き*出*しに本があります。',
      englishTranslation: 'There are books in the desk drawer.',
      wordsUsed: ['机', '本'],
      grammarParticles: ['の', 'に', 'があります']
    },
    '引き出す': {
      sentence: 'お金を*引*き*出*しました。',
      englishTranslation: 'I withdrew money.',
      wordsUsed: ['お金'],
      grammarParticles: ['を', 'しました']
    },
    '久しぶり': {
      sentence: '*久*しぶりに友達に会いました。',
      englishTranslation: 'I met my friend after a long time.',
      wordsUsed: ['友達', '会う'],
      grammarParticles: ['しぶりに', 'に', 'いました']
    },
    '美術館': {
      sentence: '日曜日に*美術館*に行きました。',
      englishTranslation: 'I went to the art museum on Sunday.',
      wordsUsed: ['日曜日', '行く'],
      grammarParticles: ['に', 'に', 'きました']
    },
    '非常に': {
      sentence: '今日は*非常*に暑いです。',
      englishTranslation: 'It is extremely hot today.',
      wordsUsed: ['今日', '暑い'],
      grammarParticles: ['は', 'に', 'いです']
    },
    '引っ越す': {
      sentence: '来月新しい家に*引*っ*越*します。',
      englishTranslation: 'I will move to a new house next month.',
      wordsUsed: ['来月', '新しい', '家'],
      grammarParticles: ['い', 'に', 'します']
    },
    '必要': {
      sentence: 'パスポートが*必要*です。',
      englishTranslation: 'A passport is necessary.',
      wordsUsed: ['パスポート'],
      grammarParticles: ['が', 'です']
    },
    '開く': {
      sentence: '窓を*開*いてください。',
      englishTranslation: 'Please open the window.',
      wordsUsed: ['窓'],
      grammarParticles: ['を', 'いてください']
    },
    '昼間': {
      sentence: '*昼間*は仕事をしています。',
      englishTranslation: 'I work during the daytime.',
      wordsUsed: ['仕事'],
      grammarParticles: ['は', 'をしています']
    },
    '拾う': {
      sentence: '道で財布を*拾*いました。',
      englishTranslation: 'I picked up a wallet on the road.',
      wordsUsed: ['道', '財布'],
      grammarParticles: ['で', 'を', 'いました']
    },
    '増える': {
      sentence: '人口が*増*えています。',
      englishTranslation: 'The population is increasing.',
      wordsUsed: ['人口'],
      grammarParticles: ['が', 'えています']
    },
    '深い': {
      sentence: 'この川は*深*いです。',
      englishTranslation: 'This river is deep.',
      wordsUsed: ['この', '川'],
      grammarParticles: ['は', 'いです']
    },
    '複雑': {
      sentence: 'この問題は*複雑*です。',
      englishTranslation: 'This problem is complicated.',
      wordsUsed: ['この', '問題'],
      grammarParticles: ['は', 'です']
    },
    '復習': {
      sentence: '試験の前に*復習*します。',
      englishTranslation: 'I will review before the exam.',
      wordsUsed: ['試験', '前'],
      grammarParticles: ['の', 'に', 'します']
    },
    '部長': {
      sentence: '*部長*に報告しました。',
      englishTranslation: 'I reported to the department manager.',
      wordsUsed: ['報告'],
      grammarParticles: ['に', 'しました']
    },
    '普通': {
      sentence: '*普通*の人です。',
      englishTranslation: 'He is an ordinary person.',
      wordsUsed: ['人'],
      grammarParticles: ['の', 'です']
    },
    '太る': {
      sentence: '食べ過ぎて*太*りました。',
      englishTranslation: 'I gained weight from eating too much.',
      wordsUsed: ['食べる', '過ぎる'],
      grammarParticles: ['べ', 'すぎて', 'りました']
    },
    '布団': {
      sentence: '*布団*で寝ます。',
      englishTranslation: 'I sleep on a futon.',
      wordsUsed: ['寝る'],
      grammarParticles: ['で', 'ます']
    },
    '舟': {
      sentence: '小さな*舟*に乗りました。',
      englishTranslation: 'I rode in a small boat.',
      wordsUsed: ['小さな', '乗る'],
      grammarParticles: ['な', 'に', 'りました']
    },
    '不便': {
      sentence: 'この場所は*不便*です。',
      englishTranslation: 'This place is inconvenient.',
      wordsUsed: ['この', '場所'],
      grammarParticles: ['は', 'です']
    },
    '踏む': {
      sentence: '足を*踏*まれました。',
      englishTranslation: 'My foot was stepped on.',
      wordsUsed: ['足'],
      grammarParticles: ['を', 'まれました']
    },
    '文化': {
      sentence: '日本の*文化*を学びます。',
      englishTranslation: 'I will learn Japanese culture.',
      wordsUsed: ['日本', '学ぶ'],
      grammarParticles: ['の', 'を', 'びます']
    },
    '文学': {
      sentence: '日本*文学*に興味があります。',
      englishTranslation: 'I am interested in Japanese literature.',
      wordsUsed: ['日本', '興味'],
      grammarParticles: ['に', 'があります']
    },
    '文法': {
      sentence: '日本語の*文法*は難しいです。',
      englishTranslation: 'Japanese grammar is difficult.',
      wordsUsed: ['日本語', '難しい'],
      grammarParticles: ['の', 'は', 'いです']
    },
    '別': {
      sentence: '*別*の方法を考えます。',
      englishTranslation: 'I will think of another method.',
      wordsUsed: ['方法', '考える'],
      grammarParticles: ['の', 'を', 'えます']
    },
    '泣く': {
      sentence: '子供が*泣*いています。',
      englishTranslation: 'The child is crying.',
      wordsUsed: ['子供'],
      grammarParticles: ['が', 'いています']
    },
    '翻訳': {
      sentence: '英語を日本語に*翻訳*します。',
      englishTranslation: 'I will translate English into Japanese.',
      wordsUsed: ['英語', '日本語'],
      grammarParticles: ['を', 'に', 'します']
    },
    '負ける': {
      sentence: '試合に*負*けました。',
      englishTranslation: 'I lost the match.',
      wordsUsed: ['試合'],
      grammarParticles: ['に', 'けました']
    },
    '間違える': {
      sentence: '答えを*間違*えました。',
      englishTranslation: 'I got the answer wrong.',
      wordsUsed: ['答え'],
      grammarParticles: ['を', 'えました']
    },
    '間に合う': {
      sentence: '電車に*間*に*合*いました。',
      englishTranslation: 'I made it in time for the train.',
      wordsUsed: ['電車'],
      grammarParticles: ['に', 'いました']
    },
    '周り': {
      sentence: '家の*周*りに花があります。',
      englishTranslation: 'There are flowers around the house.',
      wordsUsed: ['家', '花'],
      grammarParticles: ['の', 'りに', 'があります']
    },
    '回る': {
      sentence: '地球が*回*っています。',
      englishTranslation: 'The Earth is rotating.',
      wordsUsed: ['地球'],
      grammarParticles: ['が', 'っています']
    },
    '漫画': {
      sentence: '面白い*漫画*を読みました。',
      englishTranslation: 'I read an interesting manga.',
      wordsUsed: ['面白い', '読む'],
      grammarParticles: ['い', 'を', 'みました']
    },
    '真ん中': {
      sentence: '部屋の*真*ん*中*に机があります。',
      englishTranslation: 'There is a desk in the middle of the room.',
      wordsUsed: ['部屋', '机'],
      grammarParticles: ['の', 'に', 'があります']
    },
    '見える': {
      sentence: '山が*見*えます。',
      englishTranslation: 'I can see the mountain.',
      wordsUsed: ['山'],
      grammarParticles: ['が', 'えます']
    },
    '湖': {
      sentence: '美しい*湖*です。',
      englishTranslation: 'It is a beautiful lake.',
      wordsUsed: ['美しい'],
      grammarParticles: ['い', 'です']
    },
    '味噌': {
      sentence: '*味噌*汁を作りました。',
      englishTranslation: 'I made miso soup.',
      wordsUsed: ['汁', '作る'],
      grammarParticles: ['を', 'りました']
    },
    '見つかる': {
      sentence: '鍵が*見*つかりました。',
      englishTranslation: 'The key was found.',
      wordsUsed: ['鍵'],
      grammarParticles: ['が', 'つかりました']
    },
    '見つける': {
      sentence: '良い本を*見*つけました。',
      englishTranslation: 'I found a good book.',
      wordsUsed: ['良い', '本'],
      grammarParticles: ['い', 'を', 'つけました']
    },
    '捕まえる': {
      sentence: '魚を*捕*まえました。',
      englishTranslation: 'I caught a fish.',
      wordsUsed: ['魚'],
      grammarParticles: ['を', 'まえました']
    },
    '漬ける': {
      sentence: '野菜を*漬*けます。',
      englishTranslation: 'I will pickle vegetables.',
      wordsUsed: ['野菜'],
      grammarParticles: ['を', 'けます']
    },
    '都合': {
      sentence: '*都合*が悪いです。',
      englishTranslation: 'It is inconvenient.',
      wordsUsed: ['悪い'],
      grammarParticles: ['が', 'いです']
    },
    '伝える': {
      sentence: 'メッセージを*伝*えます。',
      englishTranslation: 'I will convey the message.',
      wordsUsed: ['メッセージ'],
      grammarParticles: ['を', 'えます']
    },
    '続く': {
      sentence: '雨が*続*いています。',
      englishTranslation: 'The rain continues.',
      wordsUsed: ['雨'],
      grammarParticles: ['が', 'いています']
    },
    '続ける': {
      sentence: '勉強を*続*けます。',
      englishTranslation: 'I will continue studying.',
      wordsUsed: ['勉強'],
      grammarParticles: ['を', 'けます']
    },
    '包む': {
      sentence: 'プレゼントを*包*みます。',
      englishTranslation: 'I will wrap the present.',
      wordsUsed: ['プレゼント'],
      grammarParticles: ['を', 'みます']
    },
    '積もり': {
      sentence: '雪が*積*もりました。',
      englishTranslation: 'Snow accumulated.',
      wordsUsed: ['雪'],
      grammarParticles: ['が', 'もりました']
    },
    '釣る': {
      sentence: '魚を*釣*りました。',
      englishTranslation: 'I fished.',
      wordsUsed: ['魚'],
      grammarParticles: ['を', 'りました']
    },
    '連れる': {
      sentence: '子供を*連*れて行きます。',
      englishTranslation: 'I will take the child along.',
      wordsUsed: ['子供', '行く'],
      grammarParticles: ['を', 'れて', 'きます']
    },
    '丁寧': {
      sentence: '*丁寧*に書きます。',
      englishTranslation: 'I will write carefully.',
      wordsUsed: ['書く'],
      grammarParticles: ['に', 'きます']
    },
    '適当': {
      sentence: '*適当*な時間に来てください。',
      englishTranslation: 'Please come at a suitable time.',
      wordsUsed: ['時間', '来る'],
      grammarParticles: ['な', 'に', 'てください']
    },
    '手伝う': {
      sentence: '母を*手伝*います。',
      englishTranslation: 'I will help my mother.',
      wordsUsed: ['母'],
      grammarParticles: ['を', 'います']
    },
    '手袋': {
      sentence: '寒いので*手袋*をします。',
      englishTranslation: 'I wear gloves because it is cold.',
      wordsUsed: ['寒い'],
      grammarParticles: ['いので', 'をします']
    },
    '寺': {
      sentence: '古い*寺*を見ました。',
      englishTranslation: 'I saw an old temple.',
      wordsUsed: ['古い', '見る'],
      grammarParticles: ['い', 'を', 'ました']
    },
    '点': {
      sentence: 'テストで良い*点*を取りました。',
      englishTranslation: 'I got good points on the test.',
      wordsUsed: ['テスト', '良い', '取る'],
      grammarParticles: ['で', 'い', 'を', 'りました']
    },
    '店員': {
      sentence: '*店員*さんが親切です。',
      englishTranslation: 'The store clerk is kind.',
      wordsUsed: ['親切'],
      grammarParticles: ['さんが', 'です']
    },
    '天気予報': {
      sentence: '*天気予報*を見ます。',
      englishTranslation: 'I watch the weather forecast.',
      wordsUsed: ['見る'],
      grammarParticles: ['を', 'ます']
    },
    '電灯': {
      sentence: '*電灯*を付けました。',
      englishTranslation: 'I turned on the light.',
      wordsUsed: ['付ける'],
      grammarParticles: ['を', 'けました']
    },
    '電報': {
      sentence: '*電報*を送りました。',
      englishTranslation: 'I sent a telegram.',
      wordsUsed: ['送る'],
      grammarParticles: ['を', 'りました']
    },
    '展覧会': {
      sentence: '美術の*展覧会*に行きます。',
      englishTranslation: 'I will go to an art exhibition.',
      wordsUsed: ['美術', '行く'],
      grammarParticles: ['の', 'に', 'きます']
    },
    '都': {
      sentence: '東京*都*に住んでいます。',
      englishTranslation: 'I live in Tokyo Metropolis.',
      wordsUsed: ['東京', '住む'],
      grammarParticles: ['に', 'んでいます']
    },
    '到頭': {
      sentence: '*到頭*雨が降りました。',
      englishTranslation: 'Finally it rained.',
      wordsUsed: ['雨', '降る'],
      grammarParticles: ['が', 'りました']
    },
    '遠く': {
      sentence: '*遠*くに山が見えます。',
      englishTranslation: 'I can see mountains in the distance.',
      wordsUsed: ['山', '見える'],
      grammarParticles: ['くに', 'が', 'えます']
    },
    '通る': {
      sentence: 'この道を*通*ります。',
      englishTranslation: 'I will go through this road.',
      wordsUsed: ['この', '道'],
      grammarParticles: ['を', 'ります']
    },
    '特別': {
      sentence: '*特別*な日です。',
      englishTranslation: 'It is a special day.',
      wordsUsed: ['日'],
      grammarParticles: ['な', 'です']
    },
    '途中': {
      sentence: '*途中*で休みました。',
      englishTranslation: 'I rested on the way.',
      wordsUsed: ['休む'],
      grammarParticles: ['で', 'みました']
    },
    '特急': {
      sentence: '*特急*に乗ります。',
      englishTranslation: 'I will take the express train.',
      wordsUsed: ['乗る'],
      grammarParticles: ['に', 'ります']
    },
    '届ける': {
      sentence: '手紙を*届*けます。',
      englishTranslation: 'I will deliver the letter.',
      wordsUsed: ['手紙'],
      grammarParticles: ['を', 'けます']
    },
    '泊まる': {
      sentence: 'ホテルに*泊*まります。',
      englishTranslation: 'I will stay at a hotel.',
      wordsUsed: ['ホテル'],
      grammarParticles: ['に', 'まります']
    },
    '止める': {
      sentence: '車を*止*めました。',
      englishTranslation: 'I stopped the car.',
      wordsUsed: ['車'],
      grammarParticles: ['を', 'めました']
    },
    '取り替える': {
      sentence: '電池を*取*り*替*えます。',
      englishTranslation: 'I will replace the battery.',
      wordsUsed: ['電池'],
      grammarParticles: ['を', 'えます']
    },
    '直す': {
      sentence: '時計を*直*します。',
      englishTranslation: 'I will fix the clock.',
      wordsUsed: ['時計'],
      grammarParticles: ['を', 'します']
    },
    '治る': {
      sentence: '風邪が*治*りました。',
      englishTranslation: 'My cold got better.',
      wordsUsed: ['風邪'],
      grammarParticles: ['が', 'りました']
    },
    '政治': {
      sentence: '*政治*について話します。',
      englishTranslation: 'I will talk about politics.',
      wordsUsed: ['話す'],
      grammarParticles: ['について', 'します']
    },
    '西洋': {
      sentence: '*西洋*の文化です。',
      englishTranslation: 'It is Western culture.',
      wordsUsed: ['文化'],
      grammarParticles: ['の', 'です']
    },
    '世界': {
      sentence: '*世界*は広いです。',
      englishTranslation: 'The world is wide.',
      wordsUsed: ['広い'],
      grammarParticles: ['は', 'いです']
    },
    '席': {
      sentence: '空いている*席*があります。',
      englishTranslation: 'There is an empty seat.',
      wordsUsed: ['空く'],
      grammarParticles: ['いている', 'があります']
    },
    '説明': {
      sentence: '先生が*説明*しました。',
      englishTranslation: 'The teacher explained.',
      wordsUsed: ['先生'],
      grammarParticles: ['が', 'しました']
    },
    '背中': {
      sentence: '*背中*が痛いです。',
      englishTranslation: 'My back hurts.',
      wordsUsed: ['痛い'],
      grammarParticles: ['が', 'いです']
    },
    '世話': {
      sentence: '犬の*世話*をします。',
      englishTranslation: 'I will take care of the dog.',
      wordsUsed: ['犬'],
      grammarParticles: ['の', 'をします']
    },
    '線': {
      sentence: '紙に*線*を引きます。',
      englishTranslation: 'I will draw a line on the paper.',
      wordsUsed: ['紙', '引く'],
      grammarParticles: ['に', 'を', 'きます']
    },
    '全然': {
      sentence: '*全然*分かりません。',
      englishTranslation: 'I do not understand at all.',
      wordsUsed: ['分かる'],
      grammarParticles: ['かりません']
    },
    '戦争': {
      sentence: '*戦争*は怖いです。',
      englishTranslation: 'War is scary.',
      wordsUsed: ['怖い'],
      grammarParticles: ['は', 'いです']
    },
    '先輩': {
      sentence: '学校の*先輩*です。',
      englishTranslation: 'He is a senior at school.',
      wordsUsed: ['学校'],
      grammarParticles: ['の', 'です']
    },
    '無くなる': {
      sentence: 'お金が*無*くなりました。',
      englishTranslation: 'The money ran out.',
      wordsUsed: ['お金'],
      grammarParticles: ['が', 'くなりました']
    },
    '亡くなる': {
      sentence: '祖父が*亡*くなりました。',
      englishTranslation: 'My grandfather passed away.',
      wordsUsed: ['祖父'],
      grammarParticles: ['が', 'くなりました']
    },
    '投げる': {
      sentence: 'ボールを*投*げます。',
      englishTranslation: 'I will throw the ball.',
      wordsUsed: ['ボール'],
      grammarParticles: ['を', 'げます']
    },
    '慣れる': {
      sentence: '新しい生活に*慣*れました。',
      englishTranslation: 'I got used to the new life.',
      wordsUsed: ['新しい', '生活'],
      grammarParticles: ['しい', 'に', 'れました']
    },
    '苦い': {
      sentence: 'この薬は*苦*いです。',
      englishTranslation: 'This medicine is bitter.',
      wordsUsed: ['この', '薬'],
      grammarParticles: ['は', 'いです']
    },
    '二階建て': {
      sentence: '*二階建*ての家です。',
      englishTranslation: 'It is a two-story house.',
      wordsUsed: ['家'],
      grammarParticles: ['ての', 'です']
    },
    '入院': {
      sentence: '病気で*入院*しました。',
      englishTranslation: 'I was hospitalized due to illness.',
      wordsUsed: ['病気'],
      grammarParticles: ['で', 'しました']
    },
    '似る': {
      sentence: '母に*似*ています。',
      englishTranslation: 'I resemble my mother.',
      wordsUsed: ['母'],
      grammarParticles: ['に', 'ています']
    },
    '盗む': {
      sentence: '泥棒が*盗*みました。',
      englishTranslation: 'The thief stole.',
      wordsUsed: ['泥棒'],
      grammarParticles: ['が', 'みました']
    },
    '塗る': {
      sentence: '壁に色を*塗*ります。',
      englishTranslation: 'I will paint color on the wall.',
      wordsUsed: ['壁', '色'],
      grammarParticles: ['に', 'を', 'ります']
    },
    '寝坊': {
      sentence: '今朝*寝坊*しました。',
      englishTranslation: 'I overslept this morning.',
      wordsUsed: ['今朝'],
      grammarParticles: ['しました']
    },
    '眠る': {
      sentence: '子供が*眠*っています。',
      englishTranslation: 'The child is sleeping.',
      wordsUsed: ['子供'],
      grammarParticles: ['が', 'っています']
    },
    '乗り換える': {
      sentence: '駅で電車を*乗*り*換*えます。',
      englishTranslation: 'I will transfer trains at the station.',
      wordsUsed: ['駅', '電車'],
      grammarParticles: ['で', 'を', 'えます']
    },
    '場合': {
      sentence: '雨の*場合*は中止です。',
      englishTranslation: 'In case of rain, it will be canceled.',
      wordsUsed: ['雨', '中止'],
      grammarParticles: ['の', 'は', 'です']
    },
    '倍': {
      sentence: '二*倍*になりました。',
      englishTranslation: 'It became double.',
      wordsUsed: ['二'],
      grammarParticles: ['になりました']
    },
    '拝見': {
      sentence: 'お写真を*拝見*します。',
      englishTranslation: 'I will look at your photo (polite).',
      wordsUsed: ['お写真'],
      grammarParticles: ['を', 'します']
    },
    '歯医者': {
      sentence: '*歯医者*に行きます。',
      englishTranslation: 'I will go to the dentist.',
      wordsUsed: ['行く'],
      grammarParticles: ['に', 'きます']
    },
    '筈': {
      sentence: '今日来る*筈*です。',
      englishTranslation: 'He should come today.',
      wordsUsed: ['今日', '来る'],
      grammarParticles: ['る', 'です']
    },
    '恥ずかしい': {
      sentence: 'とても*恥*ずかしいです。',
      englishTranslation: 'I am very embarrassed.',
      wordsUsed: ['とても'],
      grammarParticles: ['ずかしいです']
    },
    '発音': {
      sentence: '*発音*が難しいです。',
      englishTranslation: 'Pronunciation is difficult.',
      wordsUsed: ['難しい'],
      grammarParticles: ['が', 'いです']
    },
    '為': {
      sentence: '勉強の*為*に図書館に行きます。',
      englishTranslation: 'I go to the library for studying.',
      wordsUsed: ['勉強', '図書館', '行く'],
      grammarParticles: ['の', 'に', 'に', 'きます']
    },
    '暖房': {
      sentence: '*暖房*を付けました。',
      englishTranslation: 'I turned on the heating.',
      wordsUsed: ['付ける'],
      grammarParticles: ['を', 'けました']
    },
    '力': {
      sentence: '*力*が強いです。',
      englishTranslation: 'The strength is strong.',
      wordsUsed: ['強い'],
      grammarParticles: ['が', 'いです']
    },
    '注射': {
      sentence: '医者が*注射*しました。',
      englishTranslation: 'The doctor gave an injection.',
      wordsUsed: ['医者'],
      grammarParticles: ['が', 'しました']
    },
    '駐車場': {
      sentence: '*駐車場*に車があります。',
      englishTranslation: 'There is a car in the parking lot.',
      wordsUsed: ['車'],
      grammarParticles: ['に', 'があります']
    },
    '髭': {
      sentence: '*髭*を剃ります。',
      englishTranslation: 'I will shave my beard.',
      wordsUsed: ['剃る'],
      grammarParticles: ['を', 'ります']
    },
    '飛行場': {
      sentence: '*飛行場*に着きました。',
      englishTranslation: 'I arrived at the airport.',
      wordsUsed: ['着く'],
      grammarParticles: ['に', 'きました']
    },
    '昼休み': {
      sentence: '*昼休*みに食事します。',
      englishTranslation: 'I will eat during lunch break.',
      wordsUsed: ['食事'],
      grammarParticles: ['みに', 'します']
    },
    '葡萄': {
      sentence: '甘い*葡萄*です。',
      englishTranslation: 'These are sweet grapes.',
      wordsUsed: ['甘い'],
      grammarParticles: ['い', 'です']
    },
    '降り出す': {
      sentence: '雨が*降*り*出*しました。',
      englishTranslation: 'It started to rain.',
      wordsUsed: ['雨'],
      grammarParticles: ['が', 'しました']
    },
    '中々': {
      sentence: '*中々*上手です。',
      englishTranslation: 'You are quite good.',
      wordsUsed: ['上手'],
      grammarParticles: ['です']
    },
    '参る': {
      sentence: '神社に*参*ります。',
      englishTranslation: 'I will visit the shrine.',
      wordsUsed: ['神社'],
      grammarParticles: ['に', 'ります']
    },
    '先ず': {
      sentence: '*先*ず手を洗います。',
      englishTranslation: 'First, I will wash my hands.',
      wordsUsed: ['手', '洗う'],
      grammarParticles: ['ず', 'を', 'います']
    },
    '皆': {
      sentence: '*皆*で食事しました。',
      englishTranslation: 'Everyone ate together.',
      wordsUsed: ['食事'],
      grammarParticles: ['で', 'しました']
    },
    '港': {
      sentence: '船が*港*に着きました。',
      englishTranslation: 'The ship arrived at the port.',
      wordsUsed: ['船', '着く'],
      grammarParticles: ['が', 'に', 'きました']
    },
    '向かう': {
      sentence: '駅に*向*かいます。',
      englishTranslation: 'I will head to the station.',
      wordsUsed: ['駅'],
      grammarParticles: ['に', 'かいます']
    },
    '迎える': {
      sentence: '友達を*迎*えに行きます。',
      englishTranslation: 'I will go to pick up my friend.',
      wordsUsed: ['友達', '行く'],
      grammarParticles: ['を', 'えに', 'きます']
    },
    '昔': {
      sentence: '*昔*は静かでした。',
      englishTranslation: 'It was quiet in the past.',
      wordsUsed: ['静か'],
      grammarParticles: ['は', 'かでした']
    },
    '虫': {
      sentence: '小さな*虫*がいます。',
      englishTranslation: 'There is a small insect.',
      wordsUsed: ['小さな'],
      grammarParticles: ['な', 'がいます']
    },
    '息子': {
      sentence: '私の*息子*です。',
      englishTranslation: 'This is my son.',
      wordsUsed: ['私'],
      grammarParticles: ['の', 'です']
    },
    '娘': {
      sentence: '可愛い*娘*です。',
      englishTranslation: 'She is a cute daughter.',
      wordsUsed: ['可愛い'],
      grammarParticles: ['い', 'です']
    },
    '無理': {
      sentence: 'それは*無理*です。',
      englishTranslation: 'That is impossible.',
      wordsUsed: ['それ'],
      grammarParticles: ['は', 'です']
    },
    '召し上がる': {
      sentence: 'お茶を*召*し*上*がってください。',
      englishTranslation: 'Please have some tea (polite).',
      wordsUsed: ['お茶'],
      grammarParticles: ['を', 'がってください']
    },
    '珍しい': {
      sentence: '*珍*しい花です。',
      englishTranslation: 'It is a rare flower.',
      wordsUsed: ['花'],
      grammarParticles: ['しい', 'です']
    },
    '申し上げる': {
      sentence: 'お礼を*申*し*上*げます。',
      englishTranslation: 'I express my gratitude (polite).',
      wordsUsed: ['お礼'],
      grammarParticles: ['を', 'げます']
    },
    '申す': {
      sentence: '田中と*申*します。',
      englishTranslation: 'My name is Tanaka (polite).',
      wordsUsed: ['田中'],
      grammarParticles: ['と', 'します']
    },
    '最も': {
      sentence: '*最*も大切なことです。',
      englishTranslation: 'It is the most important thing.',
      wordsUsed: ['大切'],
      grammarParticles: ['も', 'なことです']
    },
    '戻る': {
      sentence: '家に*戻*ります。',
      englishTranslation: 'I will return home.',
      wordsUsed: ['家'],
      grammarParticles: ['に', 'ります']
    },
    '木綿': {
      sentence: '*木綿*のシャツです。',
      englishTranslation: 'It is a cotton shirt.',
      wordsUsed: ['シャツ'],
      grammarParticles: ['の', 'です']
    },
    '森': {
      sentence: '深い*森*です。',
      englishTranslation: 'It is a deep forest.',
      wordsUsed: ['深い'],
      grammarParticles: ['い', 'です']
    },
    '焼く': {
      sentence: 'パンを*焼*きます。',
      englishTranslation: 'I will bake bread.',
      wordsUsed: ['パン'],
      grammarParticles: ['を', 'きます']
    },
    '約束': {
      sentence: '友達と*約束*しました。',
      englishTranslation: 'I made a promise with my friend.',
      wordsUsed: ['友達'],
      grammarParticles: ['と', 'しました']
    },
    '役に立つ': {
      sentence: 'この本は*役*に*立*ちます。',
      englishTranslation: 'This book is useful.',
      wordsUsed: ['この', '本'],
      grammarParticles: ['は', 'ちます']
    },
    '焼ける': {
      sentence: 'パンが*焼*けました。',
      englishTranslation: 'The bread is baked.',
      wordsUsed: ['パン'],
      grammarParticles: ['が', 'けました']
    },
    '優しい': {
      sentence: '*優*しい人です。',
      englishTranslation: 'He is a kind person.',
      wordsUsed: ['人'],
      grammarParticles: ['しい', 'です']
    },
    '痩せる': {
      sentence: '運動して*痩*せました。',
      englishTranslation: 'I lost weight by exercising.',
      wordsUsed: ['運動'],
      grammarParticles: ['して', 'せました']
    },
    '止む': {
      sentence: '雨が*止*みました。',
      englishTranslation: 'The rain stopped.',
      wordsUsed: ['雨'],
      grammarParticles: ['が', 'みました']
    },
    '花見': {
      sentence: '春に*花見*をします。',
      englishTranslation: 'I will do cherry blossom viewing in spring.',
      wordsUsed: ['春'],
      grammarParticles: ['に', 'をします']
    },
    '林': {
      sentence: '小さな*林*があります。',
      englishTranslation: 'There is a small forest.',
      wordsUsed: ['小さな'],
      grammarParticles: ['な', 'があります']
    },
    '払う': {
      sentence: 'お金を*払*います。',
      englishTranslation: 'I will pay money.',
      wordsUsed: ['お金'],
      grammarParticles: ['を', 'います']
    },
    '番組': {
      sentence: 'テレビの*番組*を見ます。',
      englishTranslation: 'I will watch a TV program.',
      wordsUsed: ['テレビ', '見る'],
      grammarParticles: ['の', 'を', 'ます']
    },
    '反対': {
      sentence: 'その意見に*反対*です。',
      englishTranslation: 'I oppose that opinion.',
      wordsUsed: ['その', '意見'],
      grammarParticles: ['に', 'です']
    },
    '柔らかい': {
      sentence: '*柔*らかい肉です。',
      englishTranslation: 'It is soft meat.',
      wordsUsed: ['肉'],
      grammarParticles: ['らかい', 'です']
    },
    '湯': {
      sentence: '熱い*湯*です。',
      englishTranslation: 'It is hot water.',
      wordsUsed: ['熱い'],
      grammarParticles: ['い', 'です']
    },
    '輸出': {
      sentence: '車を*輸出*します。',
      englishTranslation: 'We export cars.',
      wordsUsed: ['車'],
      grammarParticles: ['を', 'します']
    },
    '輸入': {
      sentence: '食べ物を*輸入*します。',
      englishTranslation: 'We import food.',
      wordsUsed: ['食べ物'],
      grammarParticles: ['を', 'します']
    },
    '指輪': {
      sentence: '美しい*指輪*です。',
      englishTranslation: 'It is a beautiful ring.',
      wordsUsed: ['美しい'],
      grammarParticles: ['しい', 'です']
    },
    '夢': {
      sentence: '楽しい*夢*を見ました。',
      englishTranslation: 'I had a fun dream.',
      wordsUsed: ['楽しい', '見る'],
      grammarParticles: ['しい', 'を', 'ました']
    },
    '揺れる': {
      sentence: '地震で家が*揺*れました。',
      englishTranslation: 'The house shook in the earthquake.',
      wordsUsed: ['地震', '家'],
      grammarParticles: ['で', 'が', 'れました']
    },
    '用': {
      sentence: 'お*用*がありますか。',
      englishTranslation: 'Do you have business?',
      wordsUsed: ['お'],
      grammarParticles: ['がありますか']
    },
    '用意': {
      sentence: '準備を*用意*します。',
      englishTranslation: 'I will prepare.',
      wordsUsed: ['準備'],
      grammarParticles: ['を', 'します']
    },
    '用事': {
      sentence: '大切な*用事*があります。',
      englishTranslation: 'I have important business.',
      wordsUsed: ['大切'],
      grammarParticles: ['な', 'があります']
    },
    '汚れる': {
      sentence: '服が*汚*れました。',
      englishTranslation: 'The clothes got dirty.',
      wordsUsed: ['服'],
      grammarParticles: ['が', 'れました']
    },
    '予習': {
      sentence: '明日の*予習*をします。',
      englishTranslation: 'I will do tomorrow\'s preparation.',
      wordsUsed: ['明日'],
      grammarParticles: ['の', 'をします']
    },
    '予定': {
      sentence: '来週の*予定*です。',
      englishTranslation: 'It is next week\'s schedule.',
      wordsUsed: ['来週'],
      grammarParticles: ['の', 'です']
    },
    '予約': {
      sentence: 'レストランを*予約*しました。',
      englishTranslation: 'I made a restaurant reservation.',
      wordsUsed: ['レストラン'],
      grammarParticles: ['を', 'しました']
    },
    '寄る': {
      sentence: '店に*寄*ります。',
      englishTranslation: 'I will stop by the store.',
      wordsUsed: ['店'],
      grammarParticles: ['に', 'ります']
    },
    '喜ぶ': {
      sentence: '子供が*喜*んでいます。',
      englishTranslation: 'The child is happy.',
      wordsUsed: ['子供'],
      grammarParticles: ['が', 'んでいます']
    },
    '理由': {
      sentence: '遅れた*理由*を話します。',
      englishTranslation: 'I will tell the reason for being late.',
      wordsUsed: ['遅れる', '話す'],
      grammarParticles: ['れた', 'を', 'します']
    },
    '利用': {
      sentence: 'バスを*利用*します。',
      englishTranslation: 'I will use the bus.',
      wordsUsed: ['バス'],
      grammarParticles: ['を', 'します']
    },
    '両方': {
      sentence: '*両方*とも好きです。',
      englishTranslation: 'I like both.',
      wordsUsed: ['好き'],
      grammarParticles: ['とも', 'きです']
    },
    '旅館': {
      sentence: '温泉*旅館*に泊まります。',
      englishTranslation: 'I will stay at a hot spring inn.',
      wordsUsed: ['温泉', '泊まる'],
      grammarParticles: ['に', 'まります']
    },
    '留守': {
      sentence: '家を*留守*にします。',
      englishTranslation: 'I will be away from home.',
      wordsUsed: ['家'],
      grammarParticles: ['を', 'にします']
    },
    '冷房': {
      sentence: '*冷房*を付けます。',
      englishTranslation: 'I will turn on the air conditioning.',
      wordsUsed: ['付ける'],
      grammarParticles: ['を', 'けます']
    },
    '歴史': {
      sentence: '日本の*歴史*を学びます。',
      englishTranslation: 'I will learn Japanese history.',
      wordsUsed: ['日本', '学ぶ'],
      grammarParticles: ['の', 'を', 'びます']
    },
    '連絡': {
      sentence: '友達に*連絡*します。',
      englishTranslation: 'I will contact my friend.',
      wordsUsed: ['友達'],
      grammarParticles: ['に', 'します']
    },
    '沸かす': {
      sentence: 'お湯を*沸*かします。',
      englishTranslation: 'I will boil water.',
      wordsUsed: ['お湯'],
      grammarParticles: ['を', 'かします']
    },
    '別れる': {
      sentence: '友達と*別*れました。',
      englishTranslation: 'I parted with my friend.',
      wordsUsed: ['友達'],
      grammarParticles: ['と', 'れました']
    },
    '沸く': {
      sentence: 'お湯が*沸*きました。',
      englishTranslation: 'The water boiled.',
      wordsUsed: ['お湯'],
      grammarParticles: ['が', 'きました']
    },
    '訳': {
      sentence: 'その*訳*を教えてください。',
      englishTranslation: 'Please tell me the reason.',
      wordsUsed: ['その', '教える'],
      grammarParticles: ['を', 'えてください']
    },
    '忘れ物': {
      sentence: '*忘*れ*物*をしました。',
      englishTranslation: 'I forgot something.',
      wordsUsed: [],
      grammarParticles: ['をしました']
    },
    '笑う': {
      sentence: '赤ちゃんが*笑*っています。',
      englishTranslation: 'The baby is laughing.',
      wordsUsed: ['赤ちゃん'],
      grammarParticles: ['が', 'っています']
    },
    '割合': {
      sentence: '成功の*割合*は高いです。',
      englishTranslation: 'The success rate is high.',
      wordsUsed: ['成功', '高い'],
      grammarParticles: ['の', 'は', 'いです']
    },
    '割れる': {
      sentence: 'コップが*割*れました。',
      englishTranslation: 'The cup broke.',
      wordsUsed: ['コップ'],
      grammarParticles: ['が', 'れました']
    },
    '泳ぎ方': {
      sentence: '*泳*ぎ*方*を教えます。',
      englishTranslation: 'I will teach how to swim.',
      wordsUsed: ['教える'],
      grammarParticles: ['を', 'えます']
    },
    '変': {
      sentence: '*変*な音がします。',
      englishTranslation: 'There is a strange sound.',
      wordsUsed: ['音'],
      grammarParticles: ['な', 'がします']
    },
    '返事': {
      sentence: '手紙の*返事*を書きます。',
      englishTranslation: 'I will write a reply to the letter.',
      wordsUsed: ['手紙', '書く'],
      grammarParticles: ['の', 'を', 'きます']
    },
    '貿易': {
      sentence: '国際*貿易*が大切です。',
      englishTranslation: 'International trade is important.',
      wordsUsed: ['国際', '大切'],
      grammarParticles: ['が', 'です']
    },
    '放送': {
      sentence: 'ニュースを*放送*します。',
      englishTranslation: 'We will broadcast the news.',
      wordsUsed: ['ニュース'],
      grammarParticles: ['を', 'します']
    },
    '法律': {
      sentence: '新しい*法律*ができました。',
      englishTranslation: 'A new law was made.',
      wordsUsed: ['新しい'],
      grammarParticles: ['しい', 'ができました']
    },
    '僕': {
      sentence: '*僕*は学生です。',
      englishTranslation: 'I am a student.',
      wordsUsed: ['学生'],
      grammarParticles: ['は', 'です']
    },
    '星': {
      sentence: '夜空に*星*が見えます。',
      englishTranslation: 'Stars can be seen in the night sky.',
      wordsUsed: ['夜空', '見える'],
      grammarParticles: ['に', 'が', 'えます']
    },
    '程': {
      sentence: 'この*程*度で十分です。',
      englishTranslation: 'This degree is sufficient.',
      wordsUsed: ['この', '度', '十分'],
      grammarParticles: ['で', 'です']
    },
    // N4 Grammar Pattern Examples
    '心配': {
      sentence: '試験のことが*心配*になりました。',
      englishTranslation: 'I became worried about the exam.',
      wordsUsed: ['試験', 'こと'],
      grammarParticles: ['のことが', 'になりました']
    },
    '交通': {
      sentence: '*交通*が便利なので、この場所を選びました。',
      englishTranslation: 'I chose this place because the transportation is convenient.',
      wordsUsed: ['便利', 'この', '場所', '選ぶ'],
      grammarParticles: ['が', 'なので', 'を', 'びました']
    },
    '国際': {
      sentence: '*国際*会議に参加するために準備しています。',
      englishTranslation: 'I am preparing to participate in an international conference.',
      wordsUsed: ['会議', '参加', '準備'],
      grammarParticles: ['に', 'するために', 'しています']
    },
    '故障': {
      sentence: '車が*故障*したので、修理に出しました。',
      englishTranslation: 'Since the car broke down, I took it for repair.',
      wordsUsed: ['車', '修理', '出す'],
      grammarParticles: ['が', 'したので', 'に', 'しました']
    },
    '彼女': {
      sentence: '*彼女*と話しながら公園を歩きました。',
      englishTranslation: 'I walked through the park while talking with her.',
      wordsUsed: ['話す', '公園', '歩く'],
      grammarParticles: ['と', 'しながら', 'を', 'きました']
    },
    '考える': {
      sentence: '将来について*考*えてみました。',
      englishTranslation: 'I tried thinking about the future.',
      wordsUsed: ['将来'],
      grammarParticles: ['について', 'えてみました']
    },
    '試合': {
      sentence: '明日の*試合*に勝つために練習しています。',
      englishTranslation: 'I am practicing to win tomorrow\'s match.',
      wordsUsed: ['明日', '勝つ', '練習'],
      grammarParticles: ['の', 'に', 'つために', 'しています']
    },
    '事故': {
      sentence: '*事故*が起こらないように気をつけています。',
      englishTranslation: 'I am being careful so that accidents don\'t happen.',
      wordsUsed: ['起こる', '気'],
      grammarParticles: ['が', 'こらないように', 'をつけています']
    },
    '地震': {
      sentence: '*地震*があったら、すぐに外に出てください。',
      englishTranslation: 'If there is an earthquake, please go outside immediately.',
      wordsUsed: ['外', '出る'],
      grammarParticles: ['があったら', 'すぐに', 'に', 'てください']
    },
    '失敗': {
      sentence: '*失敗*しても諦めないでください。',
      englishTranslation: 'Even if you fail, please don\'t give up.',
      wordsUsed: ['諦める'],
      grammarParticles: ['しても', 'めないでください']
    },
    '社会': {
      sentence: '*社会*問題について議論しました。',
      englishTranslation: 'We discussed social problems.',
      wordsUsed: ['問題', '議論'],
      grammarParticles: ['について', 'しました']
    },
    '経験': {
      sentence: '海外で働いた*経験*があります。',
      englishTranslation: 'I have experience working overseas.',
      wordsUsed: ['海外', '働く'],
      grammarParticles: ['で', 'いた', 'があります']
    },
    '経済': {
      sentence: '*経済*が悪くなると、就職が難しくなります。',
      englishTranslation: 'When the economy gets bad, finding employment becomes difficult.',
      wordsUsed: ['悪い', '就職', '難しい'],
      grammarParticles: ['が', 'くなると', 'が', 'しくなります']
    },
    '計画': {
      sentence: '旅行の*計画*を立てるのは楽しいです。',
      englishTranslation: 'Making travel plans is fun.',
      wordsUsed: ['旅行', '立てる', '楽しい'],
      grammarParticles: ['の', 'を', 'てるのは', 'しいです']
    },
    '生活': {
      sentence: '一人で*生活*するのは大変です。',
      englishTranslation: 'Living alone is difficult.',
      wordsUsed: ['一人', '大変'],
      grammarParticles: ['で', 'するのは', 'です']
    },
    '卒業': {
      sentence: '大学を*卒業*してから働いています。',
      englishTranslation: 'I have been working since graduating from university.',
      wordsUsed: ['大学', '働く'],
      grammarParticles: ['を', 'してから', 'いています']
    },
    '準備': {
      sentence: 'パーティーの*準備*ができました。',
      englishTranslation: 'The party preparations are finished.',
      wordsUsed: ['パーティー'],
      grammarParticles: ['の', 'ができました']
    },
    '紹介': {
      sentence: '友達に新しい店を*紹介*してもらいました。',
      englishTranslation: 'I had my friend introduce me to a new restaurant.',
      wordsUsed: ['友達', '新しい', '店'],
      grammarParticles: ['に', 'しい', 'を', 'してもらいました']
    },
    '出発': {
      sentence: '電車が*出発*する前に駅に着きました。',
      englishTranslation: 'I arrived at the station before the train departed.',
      wordsUsed: ['電車', '前', '駅', '着く'],
      grammarParticles: ['が', 'する', 'に', 'に', 'きました']
    },
    '利用': {
      sentence: 'この券を*利用*すれば安くなります。',
      englishTranslation: 'If you use this ticket, it will be cheaper.',
      wordsUsed: ['この', '券', '安い'],
      grammarParticles: ['を', 'すれば', 'くなります']
    },
    '連絡': {
      sentence: '何か問題があったら*連絡*してください。',
      englishTranslation: 'If there are any problems, please contact me.',
      wordsUsed: ['何か', '問題'],
      grammarParticles: ['があったら', 'してください']
    },
    '理由': {
      sentence: '遅れた*理由*を説明させてください。',
      englishTranslation: 'Please let me explain the reason for being late.',
      wordsUsed: ['遅れる', '説明'],
      grammarParticles: ['れた', 'を', 'させてください']
    },
    '予定': {
      sentence: '明日の*予定*を変更しなければなりません。',
      englishTranslation: 'I have to change tomorrow\'s schedule.',
      wordsUsed: ['明日', '変更'],
      grammarParticles: ['の', 'を', 'しなければなりません']
    },
    '約束': {
      sentence: '友達との*約束*を忘れてしまいました。',
      englishTranslation: 'I forgot my promise with my friend.',
      wordsUsed: ['友達', '忘れる'],
      grammarParticles: ['との', 'を', 'れてしまいました']
    },
    '優しい': {
      sentence: 'あの人はいつも*優*しくしてくれます。',
      englishTranslation: 'That person is always kind to me.',
      wordsUsed: ['あの', '人', 'いつも'],
      grammarParticles: ['は', 'も', 'しくしてくれます']
    },
    '用事': {
      sentence: '大切な*用事*があるので早く帰ります。',
      englishTranslation: 'I have important business, so I will go home early.',
      wordsUsed: ['大切', '早く', '帰る'],
      grammarParticles: ['な', 'があるので', 'く', 'ります']
    },
    '歴史': {
      sentence: 'この建物の*歴史*について調べています。',
      englishTranslation: 'I am researching the history of this building.',
      wordsUsed: ['この', '建物', '調べる'],
      grammarParticles: ['の', 'について', 'べています']
    }
  };

  const sentenceData = naturalSentences[word];
  if (sentenceData) {
    return {
      short: sentenceData,
      medium: sentenceData,
      long: sentenceData
    };
  }
  
  return null;
}

function markTargetKanji(word) {
  // Mark the first kanji with asterisks
  const kanjiMatch = word.match(/[一-龯]/);
  if (kanjiMatch) {
    const kanji = kanjiMatch[0];
    return word.replace(kanji, `*${kanji}*`);
  }
  return word;
}

function extractTargetReading(fullReading, word, targetKanji) {
  // Extract the reading for the specific kanji
  // This is simplified - in reality would need kanji reading database
  
  // For compound words, try to extract the relevant part
  if (word.length > 1) {
    const kanjiIndex = word.indexOf(targetKanji);
    if (kanjiIndex === 0) {
      // First kanji - try to get first part of reading
      const possibleReadings = fullReading.split(/[ー・]/);
      return possibleReadings[0] || fullReading.substring(0, 2);
    }
  }
  
  // Default to first 2-3 characters of reading
  return fullReading.substring(0, Math.min(3, fullReading.length));
}

function generateReadingOptions(targetKanji, correctReading, word) {
  const targetReading = extractTargetReading(correctReading, word, targetKanji);
  
  // Generate plausible wrong answers
  const distractors = [
    targetReading.replace(/う$/, 'い'),
    targetReading.replace(/ん$/, 'く'),
    targetReading + 'う',
    targetReading.replace(/^./, 'か'),
    targetReading.replace(/^./, 'し'),
    targetReading.replace(/.$/, 'ん')
  ].filter(d => d !== targetReading && d.length > 0);

  // Take first 3 unique distractors
  const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
  
  // Ensure we have exactly 4 options
  while (uniqueDistractors.length < 3) {
    uniqueDistractors.push(`${targetReading}${Math.floor(Math.random() * 10)}`);
  }

  const options = [targetReading, ...uniqueDistractors];
  
  // Shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return options;
}

function generateExplanations(options, correctIndex, targetKanji, word) {
  return options.map((option, index) => {
    if (index === correctIndex) {
      return {
        status: 'CORRECT',
        text: `This is the correct reading when ${targetKanji} is used in ${word}.`
      };
    } else {
      return {
        status: 'INCORRECT',
        text: `This is not the correct reading for ${targetKanji} in this context.`
      };
    }
  });
}

// Run the generator
generateN4VocabKanjiReadingQuestions().catch(console.error);
