// Generate sample N4 vocabulary questions following the standard:
// N5 vocab + N5 kanji + N5 grammar + N4 grammar + single N4 vocab item

const sampleQuestions = [
  {
    id: 1,
    sentence: "友達が病気なので、とても心配しています。",
    englishTranslation: "Because my friend is sick, I am very worried.",
    targetWord: "心配", // N4 vocab
    targetReading: "しんぱい",
    options: ["しんぱい", "しんせつ", "しんぶん", "しんじん"],
    correctAnswer: 0,
    breakdown: {
      n5_vocab: ["友達", "病気", "とても"],
      n5_kanji: ["友", "達", "病", "気"],
      n5_grammar: ["が", "なので", "います"],
      n4_grammar: ["～ので (because)"],
      n4_vocab: ["心配"]
    }
  },
  {
    id: 2,
    sentence: "雨が降ったので、運動ができませんでした。",
    englishTranslation: "Because it rained, I couldn't exercise.",
    targetWord: "運動",
    targetReading: "うんどう",
    options: ["うんどう", "うんてん", "うんめい", "うんが"],
    correctAnswer: 0,
    breakdown: {
      n5_vocab: ["雨", "降る", "できる"],
      n5_kanji: ["雨", "降"],
      n5_grammar: ["が", "ので", "ません", "でした"],
      n4_grammar: ["～ので (because)"],
      n4_vocab: ["運動"]
    }
  },
  {
    id: 3,
    sentence: "母の意見を聞いてから、決めるつもりです。",
    englishTranslation: "I plan to decide after listening to my mother's opinion.",
    targetWord: "意見",
    targetReading: "いけん",
    options: ["いけん", "いがく", "いしゃ", "いろ"],
    correctAnswer: 0,
    breakdown: {
      n5_vocab: ["母", "聞く", "決める"],
      n5_kanji: ["母", "聞", "決"],
      n5_grammar: ["の", "を", "から", "です"],
      n4_grammar: ["～つもりです (plan to)"],
      n4_vocab: ["意見"]
    }
  },
  {
    id: 4,
    sentence: "今日は必ず宿題を終わらせます。",
    englishTranslation: "I will definitely finish my homework today.",
    targetWord: "必ず",
    targetReading: "かならず",
    options: ["かならず", "きっと", "たぶん", "ぜったい"],
    correctAnswer: 0,
    breakdown: {
      n5_vocab: ["今日", "宿題", "終わる"],
      n5_kanji: ["今", "日", "宿", "題", "終"],
      n5_grammar: ["は", "を", "ます"],
      n4_grammar: ["～させます (causative)"],
      n4_vocab: ["必ず"]
    }
  },
  {
    id: 5,
    sentence: "この本は別の店で買いました。",
    englishTranslation: "I bought this book at a different store.",
    targetWord: "別",
    targetReading: "べつ",
    options: ["べつ", "べんり", "べんきょう", "べんとう"],
    correctAnswer: 0,
    breakdown: {
      n5_vocab: ["この", "本", "店", "買う"],
      n5_kanji: ["本", "店", "買"],
      n5_grammar: ["は", "の", "で", "ました"],
      n4_grammar: ["別の (different/another)"],
      n4_vocab: ["別"]
    }
  },
  {
    id: 6,
    sentence: "漫画を読むのが好きです。",
    englishTranslation: "I like reading manga.",
    targetWord: "漫画",
    targetReading: "まんが",
    options: ["まんが", "まんぞく", "まんいん", "まんねん"],
    correctAnswer: 0,
    breakdown: {
      n5_vocab: ["読む", "好き"],
      n5_kanji: ["読", "好"],
      n5_grammar: ["を", "の", "が", "です"],
      n4_grammar: ["～のが好きです (like doing)"],
      n4_vocab: ["漫画"]
    }
  },
  {
    id: 7,
    sentence: "大学生になってから、一人で住んでいます。",
    englishTranslation: "Since becoming a university student, I have been living alone.",
    targetWord: "大学生",
    targetReading: "だいがくせい",
    options: ["だいがくせい", "だいがくいん", "だいがっこう", "だいがくか"],
    correctAnswer: 0,
    breakdown: {
      n5_vocab: ["なる", "一人", "住む"],
      n5_kanji: ["一", "人", "住"],
      n5_grammar: ["に", "で", "います"],
      n4_grammar: ["～てから (after doing)", "～ています (ongoing state)"],
      n4_vocab: ["大学生"]
    }
  },
  {
    id: 8,
    sentence: "怒らないでください。",
    englishTranslation: "Please don't get angry.",
    targetWord: "怒る",
    targetReading: "おこる",
    options: ["おこる", "おきる", "おわる", "おちる"],
    correctAnswer: 0,
    breakdown: {
      n5_vocab: ["ください"],
      n5_kanji: [],
      n5_grammar: ["ください"],
      n4_grammar: ["～ないで (without doing)", "～ないでください (please don't)"],
      n4_vocab: ["怒る"]
    }
  },
  {
    id: 9,
    sentence: "もし時間があったら、映画を見に行きましょう。",
    englishTranslation: "If we have time, let's go see a movie.",
    targetWord: "もし",
    targetReading: "もし",
    options: ["もし", "もう", "まだ", "もっと"],
    correctAnswer: 0,
    breakdown: {
      n5_vocab: ["時間", "ある", "映画", "見る", "行く"],
      n5_kanji: ["時", "間", "映", "画", "見", "行"],
      n5_grammar: ["が", "を", "に", "ましょう"],
      n4_grammar: ["もし～たら (if)", "～に行く (go to do)"],
      n4_vocab: ["もし"]
    }
  },
  {
    id: 10,
    sentence: "この薬は苦いですが、体にいいです。",
    englishTranslation: "This medicine is bitter, but it's good for your body.",
    targetWord: "苦い",
    targetReading: "にがい",
    options: ["にがい", "あまい", "からい", "すっぱい"],
    correctAnswer: 0,
    breakdown: {
      n5_vocab: ["この", "薬", "体", "いい"],
      n5_kanji: ["薬", "体"],
      n5_grammar: ["は", "です", "が"],
      n4_grammar: ["～ですが (but)", "～にいい (good for)"],
      n4_vocab: ["苦い"]
    }
  }
];

console.log('Generated 10 sample N4 vocabulary questions:');
console.log(JSON.stringify(sampleQuestions, null, 2));

// Verify each question follows the standard
sampleQuestions.forEach(q => {
  console.log(`\nQuestion ${q.id}: ${q.targetWord}`);
  console.log(`- N5 vocab: ${q.breakdown.n5_vocab.length} items`);
  console.log(`- N5 kanji: ${q.breakdown.n5_kanji.length} items`);
  console.log(`- N5 grammar: ${q.breakdown.n5_grammar.length} items`);
  console.log(`- N4 grammar: ${q.breakdown.n4_grammar.length} items`);
  console.log(`- N4 vocab: ${q.breakdown.n4_vocab.length} items`);
});

module.exports = sampleQuestions;
