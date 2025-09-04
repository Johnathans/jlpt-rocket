// 10 additional N4 vocabulary questions using revised standard:
// One PRIMARY N4 vocab + supporting N5/basic N4 vocab + N4 grammar

const additionalQuestions = [
  {
    id: 11,
    sentence: "昨日、友達と一緒に泳ぎました。",
    englishTranslation: "Yesterday, I swam together with my friend.",
    targetWord: "泳ぐ", // N4 vocab (PRIMARY)
    targetReading: "およぐ",
    options: ["およぐ", "あるく", "はしる", "とぶ"],
    correctAnswer: 0,
    breakdown: {
      n5_vocab: ["昨日", "一緒に"],
      supporting_n4_vocab: ["友達"], // basic N4 supporting
      n5_kanji: ["昨", "日", "一", "緒"],
      n5_grammar: ["と", "ました"],
      n4_grammar: ["～と一緒に (together with)"],
      primary_n4_vocab: ["泳ぐ"]
    }
  },
  {
    id: 12,
    sentence: "この問題は簡単だと思います。",
    englishTranslation: "I think this problem is simple.",
    targetWord: "簡単", // N4 vocab (PRIMARY)
    targetReading: "かんたん",
    options: ["かんたん", "かんじ", "かんがえ", "かんけい"],
    correctAnswer: 0,
    breakdown: {
      n5_vocab: ["この", "思う"],
      supporting_n4_vocab: ["問題"], // basic N4 supporting
      n5_kanji: ["思"],
      n5_grammar: ["は", "だ", "と", "ます"],
      n4_grammar: ["～だと思います (I think that)"],
      primary_n4_vocab: ["簡単"]
    }
  },
  {
    id: 13,
    sentence: "今度の試験について説明します。",
    englishTranslation: "I will explain about the upcoming exam.",
    targetWord: "説明", // N4 vocab (PRIMARY)
    targetReading: "せつめい",
    options: ["せつめい", "せんせい", "せいかつ", "せんもん"],
    correctAnswer: 0,
    breakdown: {
      n5_vocab: ["今度"],
      supporting_n4_vocab: ["試験"], // basic N4 supporting
      n5_kanji: ["今", "度"],
      n5_grammar: ["の", "について", "ます"],
      n4_grammar: ["～について (about/regarding)"],
      primary_n4_vocab: ["説明"]
    }
  },
  {
    id: 14,
    sentence: "彼女は毎日練習しています。",
    englishTranslation: "She practices every day.",
    targetWord: "練習", // N4 vocab (PRIMARY)
    targetReading: "れんしゅう",
    options: ["れんしゅう", "れんらく", "れきし", "れいぞうこ"],
    correctAnswer: 0,
    breakdown: {
      n5_vocab: ["彼女", "毎日"],
      supporting_n4_vocab: [], // no supporting N4 needed
      n5_kanji: ["彼", "女", "毎", "日"],
      n5_grammar: ["は", "しています"],
      n4_grammar: ["～しています (ongoing action)"],
      primary_n4_vocab: ["練習"]
    }
  },
  {
    id: 15,
    sentence: "先生が授業で教えてくれました。",
    englishTranslation: "The teacher taught us in class.",
    targetWord: "授業", // N4 vocab (PRIMARY)
    targetReading: "じゅぎょう",
    options: ["じゅぎょう", "じゅんび", "じゅうしょ", "じゅうぶん"],
    correctAnswer: 0,
    breakdown: {
      n5_vocab: ["先生", "教える"],
      supporting_n4_vocab: [], // no supporting N4 needed
      n5_kanji: ["先", "生", "教"],
      n5_grammar: ["が", "で", "てくれました"],
      n4_grammar: ["～てくれる (do for someone)"],
      primary_n4_vocab: ["授業"]
    }
  },
  {
    id: 16,
    sentence: "この料理の作り方を覚えました。",
    englishTranslation: "I memorized how to make this dish.",
    targetWord: "料理", // N4 vocab (PRIMARY)
    targetReading: "りょうり",
    options: ["りょうり", "りょこう", "りゆう", "りそう"],
    correctAnswer: 0,
    breakdown: {
      n5_vocab: ["この", "作る", "覚える"],
      supporting_n4_vocab: [], // no supporting N4 needed
      n5_kanji: ["作", "覚"],
      n5_grammar: ["の", "方", "を", "ました"],
      n4_grammar: ["～方 (way of doing)"],
      primary_n4_vocab: ["料理"]
    }
  },
  {
    id: 17,
    sentence: "会社で働くのは大変です。",
    englishTranslation: "Working at a company is tough.",
    targetWord: "会社", // N4 vocab (PRIMARY)
    targetReading: "かいしゃ",
    options: ["かいしゃ", "かいぎ", "かいだん", "かいがい"],
    correctAnswer: 0,
    breakdown: {
      n5_vocab: ["働く", "大変"],
      supporting_n4_vocab: [], // no supporting N4 needed
      n5_kanji: ["働", "大", "変"],
      n5_grammar: ["で", "の", "は", "です"],
      n4_grammar: ["～のは (the thing of doing)"],
      primary_n4_vocab: ["会社"]
    }
  },
  {
    id: 18,
    sentence: "電車が遅れて困りました。",
    englishTranslation: "I was troubled because the train was late.",
    targetWord: "遅れる", // N4 vocab (PRIMARY)
    targetReading: "おくれる",
    options: ["おくれる", "おわる", "おりる", "おこる"],
    correctAnswer: 0,
    breakdown: {
      n5_vocab: ["電車", "困る"],
      supporting_n4_vocab: [], // no supporting N4 needed
      n5_kanji: ["電", "車", "困"],
      n5_grammar: ["が", "て", "ました"],
      n4_grammar: ["～て (cause and effect)"],
      primary_n4_vocab: ["遅れる"]
    }
  },
  {
    id: 19,
    sentence: "部屋を掃除してから出かけます。",
    englishTranslation: "I will go out after cleaning my room.",
    targetWord: "掃除", // N4 vocab (PRIMARY)
    targetReading: "そうじ",
    options: ["そうじ", "そうだん", "そつぎょう", "そんけい"],
    correctAnswer: 0,
    breakdown: {
      n5_vocab: ["部屋", "出かける"],
      supporting_n4_vocab: [], // no supporting N4 needed
      n5_kanji: ["部", "屋", "出"],
      n5_grammar: ["を", "して", "から", "ます"],
      n4_grammar: ["～してから (after doing)"],
      primary_n4_vocab: ["掃除"]
    }
  },
  {
    id: 20,
    sentence: "この店の商品は安いです。",
    englishTranslation: "The products at this store are cheap.",
    targetWord: "商品", // N4 vocab (PRIMARY)
    targetReading: "しょうひん",
    options: ["しょうひん", "しょうがく", "しょうかい", "しょうらい"],
    correctAnswer: 0,
    breakdown: {
      n5_vocab: ["この", "店", "安い"],
      supporting_n4_vocab: [], // no supporting N4 needed
      n5_kanji: ["店", "安"],
      n5_grammar: ["の", "は", "です"],
      n4_grammar: ["この～の (this ~ 's)"],
      primary_n4_vocab: ["商品"]
    }
  }
];

console.log('Generated 10 additional N4 vocabulary questions using revised standard:');
console.log(JSON.stringify(additionalQuestions, null, 2));

// Verify each question follows the revised standard
additionalQuestions.forEach(q => {
  console.log(`\nQuestion ${q.id}: ${q.targetWord} (PRIMARY N4)`);
  console.log(`- N5 vocab: ${q.breakdown.n5_vocab.length} items`);
  console.log(`- Supporting N4 vocab: ${q.breakdown.supporting_n4_vocab.length} items`);
  console.log(`- N5 kanji: ${q.breakdown.n5_kanji.length} items`);
  console.log(`- N5 grammar: ${q.breakdown.n5_grammar.length} items`);
  console.log(`- N4 grammar: ${q.breakdown.n4_grammar.length} items`);
  console.log(`- PRIMARY N4 vocab: ${q.breakdown.primary_n4_vocab.length} items`);
});

module.exports = additionalQuestions;
