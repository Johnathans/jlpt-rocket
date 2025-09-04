// N4 Kanji Reading Test Data
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

export const n4KanjiQuestions: N4KanjiQuestion[] = [
  {
    "id": 1,
    "kanji": "彼",
    "sentence": "彼は卒*業*後、大きな会社に就職しました。",
    "options": [
      "ぎょう",
      "ごう",
      "わざ",
      "ぎょ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ぎょう",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 業 is used in 卒業 (そつぎょう - graduation)."
      },
      {
        "option": "ごう",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "わざ",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading but not used in this compound."
      },
      {
        "option": "ぎょ",
        "isCorrect": false,
        "reasoning": "This is an incomplete reading."
      }
    ],
    "englishTranslation": "After graduation, he got a job at a big company."
  },
  {
    "id": 2,
    "kanji": "電",
    "sentence": "電車が*発*車する時間を確認しました。",
    "options": [
      "はつ",
      "ほつ",
      "た",
      "はっ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "はつ",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 発 is used in 発車 (はっしゃ - departure)."
      },
      {
        "option": "ほつ",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "た",
        "isCorrect": false,
        "reasoning": "This relates to た.つ but not used in this compound."
      },
      {
        "option": "はっ",
        "isCorrect": false,
        "reasoning": "This is not the complete reading."
      }
    ],
    "englishTranslation": "I confirmed the time when the train departs."
  },
  {
    "id": 3,
    "kanji": "*",
    "sentence": "*黒*い猫が庭を走っていました。",
    "options": [
      "くろ",
      "こく",
      "ずむ",
      "あか"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "くろ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 黒 is used in 黒い (くろい - black)."
      },
      {
        "option": "こく",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds."
      },
      {
        "option": "ずむ",
        "isCorrect": false,
        "reasoning": "This relates to くろ.ずむ but not the main reading."
      },
      {
        "option": "あか",
        "isCorrect": false,
        "reasoning": "This is the reading for 赤 (red), not 黒."
      }
    ],
    "englishTranslation": "A black cat was running in the garden."
  },
  {
    "id": 4,
    "kanji": "昔",
    "sentence": "昔のことを*思*い出すと、懐かしい気持ちになります。",
    "options": [
      "おも",
      "し",
      "かんが",
      "おぼ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おも",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 思 is used in 思い出す (おもいだす - to remember)."
      },
      {
        "option": "し",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 思想 (しそう)."
      },
      {
        "option": "かんが",
        "isCorrect": false,
        "reasoning": "This is the reading for 考 (consider), not 思."
      },
      {
        "option": "おぼ",
        "isCorrect": false,
        "reasoning": "This relates to おぼ.す but is not the correct reading here."
      }
    ],
    "englishTranslation": "When I remember things from long ago, I get a nostalgic feeling."
  },
  {
    "id": 5,
    "kanji": "明",
    "sentence": "明日は*用*事があるので、早く帰ります。",
    "options": [
      "よう",
      "もち",
      "つか",
      "ゆう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "よう",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 用 is used in 用事 (ようじ - business/errand)."
      },
      {
        "option": "もち",
        "isCorrect": false,
        "reasoning": "This relates to もち.いる but not used in compounds."
      },
      {
        "option": "つか",
        "isCorrect": false,
        "reasoning": "This is not a reading of 用."
      },
      {
        "option": "ゆう",
        "isCorrect": false,
        "reasoning": "This is not a reading of 用."
      }
    ],
    "englishTranslation": "I have business to attend to tomorrow, so I'll go home early."
  },
  {
    "id": 6,
    "kanji": "母",
    "sentence": "母の*料*理はいつも美味しいです。",
    "options": [
      "りょう",
      "りょ",
      "ざい",
      "しょく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "りょう",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 料 is used in 料理 (りょうり - cooking)."
      },
      {
        "option": "りょ",
        "isCorrect": false,
        "reasoning": "This is an incomplete reading."
      },
      {
        "option": "ざい",
        "isCorrect": false,
        "reasoning": "This is not a reading of 料."
      },
      {
        "option": "しょく",
        "isCorrect": false,
        "reasoning": "This is the reading for 食, not 料."
      }
    ],
    "englishTranslation": "My mother's cooking is always delicious."
  },
  {
    "id": 7,
    "kanji": "将",
    "sentence": "将来のことをよく*考*える必要があります。",
    "options": [
      "かんが",
      "こう",
      "おも",
      "しんか"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かんが",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 考 is used in 考える (かんがえる - to think)."
      },
      {
        "option": "こう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 思考 (しこう)."
      },
      {
        "option": "おも",
        "isCorrect": false,
        "reasoning": "This is the reading for 思 (think), not 考."
      },
      {
        "option": "しんか",
        "isCorrect": false,
        "reasoning": "This is not a reading of 考."
      }
    ],
    "englishTranslation": "It's necessary to think carefully about the future."
  },
  {
    "id": 8,
    "kanji": "母",
    "sentence": "母が手料理を*作*ってくれるのは、いつも嬉しいです。",
    "options": [
      "つく",
      "さく",
      "さ",
      "づく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "つく",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 作 is used in 作る (つくる - to make)."
      },
      {
        "option": "さく",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 作品 (さくひん)."
      },
      {
        "option": "さ",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "づく",
        "isCorrect": false,
        "reasoning": "This is used in compound forms but not the main reading."
      }
    ],
    "englishTranslation": "I'm always happy when my mother makes home-cooked meals for me."
  },
  {
    "id": 9,
    "kanji": "運",
    "sentence": "運動不足で*体*の調子が悪いです。",
    "options": [
      "からだ",
      "たい",
      "てい",
      "かたち"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "からだ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 体 means \"body\" in everyday contexts."
      },
      {
        "option": "たい",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 体重 (たいじゅう)."
      },
      {
        "option": "てい",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "かたち",
        "isCorrect": false,
        "reasoning": "This is an alternative kun'yomi reading meaning \"shape.\""
      }
    ],
    "englishTranslation": "Due to lack of exercise, my body condition is poor."
  },
  {
    "id": 10,
    "kanji": "先",
    "sentence": "先生の質問に正しく*答*えることができませんでした。",
    "options": [
      "おな",
      "どう",
      "とも",
      "いっ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おな",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 同 is used in 同じ (おなじ - same)."
      },
      {
        "option": "どう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 同時 (どうじ)."
      },
      {
        "option": "とも",
        "isCorrect": false,
        "reasoning": "This is not a reading of 同."
      },
      {
        "option": "いっ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 同."
      }
    ],
    "englishTranslation": "I ate lunch together with a friend from the same class."
  },
  {
    "id": 11,
    "kanji": "電",
    "sentence": "電車の中で席がなかったので、ずっと*立*っていました。",
    "options": [
      "た",
      "りつ",
      "りゅう",
      "だ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "た",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 立 is used in 立つ (たつ - to stand)."
      },
      {
        "option": "りつ",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 立場 (たちば)."
      },
      {
        "option": "りゅう",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "だ",
        "isCorrect": false,
        "reasoning": "This relates to compound forms but not the verb reading."
      }
    ],
    "englishTranslation": "Since there were no seats on the train, I was standing the whole time."
  },
  {
    "id": 12,
    "kanji": "古",
    "sentence": "古い*物*を捨てて、部屋を片付けることにしました。",
    "options": [
      "もの",
      "ぶつ",
      "もつ",
      "ブツ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "もの",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 物 means \"thing\" in everyday contexts."
      },
      {
        "option": "ぶつ",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 物理 (ぶつり)."
      },
      {
        "option": "もつ",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "ブツ",
        "isCorrect": false,
        "reasoning": "This is not a standard reading of 物."
      }
    ],
    "englishTranslation": "I decided to throw away old things and tidy up my room."
  },
  {
    "id": 13,
    "kanji": "今",
    "sentence": "今日の夕食は*肉*料理にします。",
    "options": [
      "にく",
      "しし",
      "ミート",
      "ばい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "にく",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 肉 means \"meat\" in everyday contexts."
      },
      {
        "option": "しし",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading but less commonly used."
      },
      {
        "option": "ミート",
        "isCorrect": false,
        "reasoning": "This is not a reading of 肉."
      },
      {
        "option": "ばい",
        "isCorrect": false,
        "reasoning": "This is not a reading of 肉."
      }
    ],
    "englishTranslation": "I'll make meat dishes for today's dinner."
  },
  {
    "id": 14,
    "kanji": "来",
    "sentence": "来週、大学の入学試*験*があります。",
    "options": [
      "けん",
      "げん",
      "あかし",
      "しるし"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "けん",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 験 is used in 試験 (しけん - exam)."
      },
      {
        "option": "げん",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "あかし",
        "isCorrect": false,
        "reasoning": "This relates to the kun'yomi but not used in compounds."
      },
      {
        "option": "しるし",
        "isCorrect": false,
        "reasoning": "This relates to the kun'yomi but not used in compounds."
      }
    ],
    "englishTranslation": "I have a university entrance exam next week."
  },
  {
    "id": 15,
    "kanji": "祖",
    "sentence": "祖父は*田*んぼで米を作っています。",
    "options": [
      "た",
      "でん",
      "だ",
      "はた"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "た",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 田 is used in 田んぼ (たんぼ - rice field)."
      },
      {
        "option": "でん",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 水田 (すいでん)."
      },
      {
        "option": "だ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 田."
      },
      {
        "option": "はた",
        "isCorrect": false,
        "reasoning": "This is the reading for 畑 (field), not 田."
      }
    ],
    "englishTranslation": "My grandfather grows rice in the rice fields."
  },
  {
    "id": 16,
    "kanji": "*",
    "sentence": "*自*分の部屋を掃除しました。",
    "options": [
      "じ",
      "し",
      "みずか",
      "おの"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "じ",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 自 is used in 自分 (じぶん - oneself)."
      },
      {
        "option": "し",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "みずか",
        "isCorrect": false,
        "reasoning": "This relates to みずか.ら but not used in this compound."
      },
      {
        "option": "おの",
        "isCorrect": false,
        "reasoning": "This relates to おの.ずから but not used in this compound."
      }
    ],
    "englishTranslation": "I cleaned my own room."
  },
  {
    "id": 17,
    "kanji": "友",
    "sentence": "友達の*家*に遊びに行きました。",
    "options": [
      "いえ",
      "か",
      "け",
      "うち"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いえ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 家 means \"house\" in everyday contexts."
      },
      {
        "option": "か",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 家族 (かぞく)."
      },
      {
        "option": "け",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "うち",
        "isCorrect": false,
        "reasoning": "This is an alternative kun'yomi reading meaning \"home.\""
      }
    ],
    "englishTranslation": "I went to play at my friend's house."
  },
  {
    "id": 18,
    "kanji": "ス",
    "sentence": "スーパーで食べ物を*買*いました。",
    "options": [
      "か",
      "ばい",
      "こう",
      "うり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "か",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 買 is used in 買う (かう - to buy)."
      },
      {
        "option": "ばい",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 売買 (ばいばい)."
      },
      {
        "option": "こう",
        "isCorrect": false,
        "reasoning": "This is not a reading of 買."
      },
      {
        "option": "うり",
        "isCorrect": false,
        "reasoning": "This is not a reading of 買."
      }
    ],
    "englishTranslation": "I bought food at the supermarket."
  },
  {
    "id": 19,
    "kanji": "こ",
    "sentence": "この*町*はとても静かです。",
    "options": [
      "まち",
      "ちょう",
      "しまち",
      "たう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "まち",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 町 means \"town\" in everyday contexts."
      },
      {
        "option": "ちょう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds and formal addresses."
      },
      {
        "option": "しまち",
        "isCorrect": false,
        "reasoning": "This is not a reading of 町."
      },
      {
        "option": "たう",
        "isCorrect": false,
        "reasoning": "This is not a reading of 町."
      }
    ],
    "englishTranslation": "This town is very quiet."
  },
  {
    "id": 20,
    "kanji": "*",
    "sentence": "*漢*字の読み方を覚えるのは難しいです。",
    "options": [
      "かん",
      "から",
      "ひ",
      "しな"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かん",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 漢 is used in 漢字 (かんじ - kanji)."
      },
      {
        "option": "から",
        "isCorrect": false,
        "reasoning": "This is not a reading of 漢."
      },
      {
        "option": "ひ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 漢."
      },
      {
        "option": "しな",
        "isCorrect": false,
        "reasoning": "This is not a reading of 漢."
      }
    ],
    "englishTranslation": "Memorizing kanji readings is difficult."
  },
  {
    "id": 21,
    "kanji": "東",
    "sentence": "東*京*に住んでいる友達に会いに行きます。",
    "options": [
      "きょう",
      "けい",
      "きん",
      "みやこ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "きょう",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 京 is used in 東京 (とうきょう - Tokyo)."
      },
      {
        "option": "けい",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "きん",
        "isCorrect": false,
        "reasoning": "This is another alternative on'yomi reading."
      },
      {
        "option": "みやこ",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "I'm going to meet a friend who lives in Tokyo."
  },
  {
    "id": 22,
    "kanji": "明",
    "sentence": "明日のテストのために*勉*強しています。",
    "options": [
      "べん",
      "つと",
      "めん",
      "きょう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "べん",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 勉 is used in 勉強 (べんきょう - study)."
      },
      {
        "option": "つと",
        "isCorrect": false,
        "reasoning": "This relates to つと.める but not used in this compound."
      },
      {
        "option": "めん",
        "isCorrect": false,
        "reasoning": "This is not a reading of 勉."
      },
      {
        "option": "きょう",
        "isCorrect": false,
        "reasoning": "This is the reading for 強, not 勉."
      }
    ],
    "englishTranslation": "I'm studying for tomorrow's test."
  },
  {
    "id": 23,
    "kanji": "お",
    "sentence": "お寺の本*堂*で祈りました。",
    "options": [
      "どう",
      "たかどの",
      "でん",
      "やかた"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "どう",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 堂 is used in 本堂 (ほんどう - main hall)."
      },
      {
        "option": "たかどの",
        "isCorrect": false,
        "reasoning": "This is not a reading of 堂."
      },
      {
        "option": "でん",
        "isCorrect": false,
        "reasoning": "This is not a reading of 堂."
      },
      {
        "option": "やかた",
        "isCorrect": false,
        "reasoning": "This is the reading for 館, not 堂."
      }
    ],
    "englishTranslation": "I prayed in the main hall of the temple."
  },
  {
    "id": 24,
    "kanji": "友",
    "sentence": "友達にお金を*貸*してあげました。",
    "options": [
      "か",
      "たい",
      "し",
      "だ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "か",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 貸 is used in 貸す (かす - to lend)."
      },
      {
        "option": "たい",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 貸出 (かしだし)."
      },
      {
        "option": "し",
        "isCorrect": false,
        "reasoning": "This is not a reading of 貸."
      },
      {
        "option": "だ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 貸."
      }
    ],
    "englishTranslation": "I lent money to my friend."
  },
  {
    "id": 25,
    "kanji": "*",
    "sentence": "*弟*が高校に入学しました。",
    "options": [
      "おとうと",
      "てい",
      "だい",
      "で"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おとうと",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 弟 means \"younger brother\" in everyday contexts."
      },
      {
        "option": "てい",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 兄弟 (きょうだい)."
      },
      {
        "option": "だい",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "で",
        "isCorrect": false,
        "reasoning": "This is another alternative on'yomi reading."
      }
    ],
    "englishTranslation": "My younger brother entered high school."
  },
  {
    "id": 26,
    "kanji": "漢",
    "sentence": "漢*字*の書き方を練習しています。",
    "options": [
      "じ",
      "あざ",
      "あざな",
      "もじ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "じ",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 字 is used in 漢字 (かんじ - kanji)."
      },
      {
        "option": "あざ",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading but not used in this compound."
      },
      {
        "option": "あざな",
        "isCorrect": false,
        "reasoning": "This is an alternative kun'yomi reading."
      },
      {
        "option": "もじ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 字."
      }
    ],
    "englishTranslation": "I'm practicing how to write kanji."
  },
  {
    "id": 27,
    "kanji": "病",
    "sentence": "病*院*で診察を受けました。",
    "options": [
      "いん",
      "えん",
      "やかた",
      "どう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いん",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 院 is used in 病院 (びょういん - hospital)."
      },
      {
        "option": "えん",
        "isCorrect": false,
        "reasoning": "This is not a reading of 院."
      },
      {
        "option": "やかた",
        "isCorrect": false,
        "reasoning": "This is not a reading of 院."
      },
      {
        "option": "どう",
        "isCorrect": false,
        "reasoning": "This is not a reading of 院."
      }
    ],
    "englishTranslation": "I received a medical examination at the hospital."
  },
  {
    "id": 28,
    "kanji": "*",
    "sentence": "*兄*と一緒に映画を見に行きました。",
    "options": [
      "あに",
      "けい",
      "きょう",
      "おとうと"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "あに",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 兄 means \"older brother\" in everyday contexts."
      },
      {
        "option": "けい",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 兄弟 (きょうだい)."
      },
      {
        "option": "きょう",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading used in compounds."
      },
      {
        "option": "おとうと",
        "isCorrect": false,
        "reasoning": "This is the reading for 弟 (younger brother), not 兄."
      }
    ],
    "englishTranslation": "I went to see a movie together with my older brother."
  },
  {
    "id": 29,
    "kanji": "*",
    "sentence": "*新*聞を読んで、今日のニュースを知りました。",
    "options": [
      "しん",
      "あたら",
      "あら",
      "にい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しん",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 新 is used in 新聞 (しんぶん - newspaper)."
      },
      {
        "option": "あたら",
        "isCorrect": false,
        "reasoning": "This relates to あたら.しい but not used in this compound."
      },
      {
        "option": "あら",
        "isCorrect": false,
        "reasoning": "This relates to あら.た but not used in this compound."
      },
      {
        "option": "にい",
        "isCorrect": false,
        "reasoning": "This is used in some compounds but not this one."
      }
    ],
    "englishTranslation": "I read the newspaper and learned about today's news."
  },
  {
    "id": 30,
    "kanji": "今",
    "sentence": "今日は何*曜*日ですか。",
    "options": [
      "よう",
      "よ",
      "にち",
      "び"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "よう",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 曜 is used in 曜日 (ようび - day of the week)."
      },
      {
        "option": "よ",
        "isCorrect": false,
        "reasoning": "This is an incomplete reading."
      },
      {
        "option": "にち",
        "isCorrect": false,
        "reasoning": "This is the reading for 日, not 曜."
      },
      {
        "option": "び",
        "isCorrect": false,
        "reasoning": "This is also the reading for 日, not 曜."
      }
    ],
    "englishTranslation": "What day of the week is it today?"
  },
  {
    "id": 31,
    "kanji": "美",
    "sentence": "美術*館*で有名な絵を見ました。",
    "options": [
      "かん",
      "やかた",
      "たて",
      "だて"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かん",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 館 is used in 美術館 (びじゅつかん - art museum)."
      },
      {
        "option": "やかた",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading but not used in this compound."
      },
      {
        "option": "たて",
        "isCorrect": false,
        "reasoning": "This is an alternative kun'yomi reading but not used here."
      },
      {
        "option": "だて",
        "isCorrect": false,
        "reasoning": "This is not a reading of 館."
      }
    ],
    "englishTranslation": "I saw famous paintings at the art museum."
  },
  {
    "id": 32,
    "kanji": "赤",
    "sentence": "赤信号で車を*止*めました。",
    "options": [
      "と",
      "し",
      "どま",
      "や"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "と",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 止 is used in 止める (とめる - to stop something)."
      },
      {
        "option": "し",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 停止 (ていし)."
      },
      {
        "option": "どま",
        "isCorrect": false,
        "reasoning": "This relates to と.まる but not the correct form here."
      },
      {
        "option": "や",
        "isCorrect": false,
        "reasoning": "This relates to や.める but not the main reading."
      }
    ],
    "englishTranslation": "I stopped the car at the red light."
  },
  {
    "id": 33,
    "kanji": "疲",
    "sentence": "疲れて*目*が痛くなりました。",
    "options": [
      "め",
      "もく",
      "ぼく",
      "まなこ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "め",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 目 means \"eye\" in everyday contexts."
      },
      {
        "option": "もく",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 目標 (もくひょう)."
      },
      {
        "option": "ぼく",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "まなこ",
        "isCorrect": false,
        "reasoning": "This is not a standard reading of 目."
      }
    ],
    "englishTranslation": "I got tired and my eyes started to hurt."
  },
  {
    "id": 34,
    "kanji": "今",
    "sentence": "今日*以*降、毎日運動することにしました。",
    "options": [
      "い",
      "もっ",
      "より",
      "から"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "い",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 以 is used in 以降 (いこう - from now on)."
      },
      {
        "option": "もっ",
        "isCorrect": false,
        "reasoning": "This relates to もっ.て but not used in compounds."
      },
      {
        "option": "より",
        "isCorrect": false,
        "reasoning": "This is not a reading of 以."
      },
      {
        "option": "から",
        "isCorrect": false,
        "reasoning": "This is not a reading of 以."
      }
    ],
    "englishTranslation": "From today onwards, I decided to exercise every day."
  },
  {
    "id": 35,
    "kanji": "*",
    "sentence": "*野*菜を食べることは健康にいいです。",
    "options": [
      "や",
      "の",
      "しょ",
      "はら"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "や",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 野 is used in 野菜 (やさい - vegetables)."
      },
      {
        "option": "の",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading when 野 means \"field\" but not in this compound."
      },
      {
        "option": "しょ",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used here."
      },
      {
        "option": "はら",
        "isCorrect": false,
        "reasoning": "This is not a reading of 野."
      }
    ],
    "englishTranslation": "Eating vegetables is good for your health."
  },
  {
    "id": 36,
    "kanji": "こ",
    "sentence": "この道を*通*って学校に行きます。",
    "options": [
      "とお",
      "つう",
      "つ",
      "かよ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "とお",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 通 is used in 通る (とおる - to pass through)."
      },
      {
        "option": "つう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 交通 (こうつう)."
      },
      {
        "option": "つ",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "かよ",
        "isCorrect": false,
        "reasoning": "This relates to かよ.う but not the main reading here."
      }
    ],
    "englishTranslation": "I go to school by going through this road."
  },
  {
    "id": 37,
    "kanji": "大",
    "sentence": "大切な*事*を忘れてしまいました。",
    "options": [
      "こと",
      "じ",
      "ず",
      "もの"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こと",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 事 means \"thing/matter\" in everyday contexts."
      },
      {
        "option": "じ",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 仕事 (しごと)."
      },
      {
        "option": "ず",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "もの",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "I forgot something important."
  },
  {
    "id": 38,
    "kanji": "旅",
    "sentence": "旅行の*計*画を友達と相談しました。",
    "options": [
      "けい",
      "はか",
      "かぞ",
      "すう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "けい",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 計 is used in 計画 (けいかく - plan)."
      },
      {
        "option": "はか",
        "isCorrect": false,
        "reasoning": "This relates to はか.る but not used in this compound."
      },
      {
        "option": "かぞ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 計."
      },
      {
        "option": "すう",
        "isCorrect": false,
        "reasoning": "This is not a reading of 計."
      }
    ],
    "englishTranslation": "I consulted with friends about travel plans."
  },
  {
    "id": 39,
    "kanji": "ピ",
    "sentence": "ピアノを*習*い始めて三年になります。",
    "options": [
      "なら",
      "しゅう",
      "じゅ",
      "おし"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "なら",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 習 is used in 習う (ならう - to learn)."
      },
      {
        "option": "しゅう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 学習 (がくしゅう)."
      },
      {
        "option": "じゅ",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "おし",
        "isCorrect": false,
        "reasoning": "This is the reading for 教 (teach), not 習."
      }
    ],
    "englishTranslation": "It's been three years since I started learning piano."
  },
  {
    "id": 40,
    "kanji": "手",
    "sentence": "手紙を書くための*紙*がありません。",
    "options": [
      "かみ",
      "し",
      "がみ",
      "ぺーぱー"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かみ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 紙 means \"paper\" in everyday contexts."
      },
      {
        "option": "し",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 和紙 (わし)."
      },
      {
        "option": "がみ",
        "isCorrect": false,
        "reasoning": "This is a voiced variation but not correct here."
      },
      {
        "option": "ぺーぱー",
        "isCorrect": false,
        "reasoning": "This is not a reading of 紙."
      }
    ],
    "englishTranslation": "I don't have paper for writing a letter."
  },
  {
    "id": 41,
    "kanji": "ス",
    "sentence": "スポーツ*界*で有名になりたいです。",
    "options": [
      "かい",
      "せかい",
      "き",
      "がい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かい",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 界 means \"world/realm\" as in スポーツ界 (スポーツかい)."
      },
      {
        "option": "せかい",
        "isCorrect": false,
        "reasoning": "This is a compound word (世界), not just the reading of 界."
      },
      {
        "option": "き",
        "isCorrect": false,
        "reasoning": "This is not a reading of 界."
      },
      {
        "option": "がい",
        "isCorrect": false,
        "reasoning": "This is not a reading of 界."
      }
    ],
    "englishTranslation": "I want to become famous in the sports world."
  },
  {
    "id": 42,
    "kanji": "友",
    "sentence": "友達に誕生日プレゼントを*送*りました。",
    "options": [
      "おく",
      "そう",
      "とど",
      "はこ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おく",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 送 is used in 送る (おくる - to send)."
      },
      {
        "option": "そう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 郵送 (ゆうそう)."
      },
      {
        "option": "とど",
        "isCorrect": false,
        "reasoning": "This is not a reading of 送."
      },
      {
        "option": "はこ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 送."
      }
    ],
    "englishTranslation": "I sent a birthday present to my friend."
  },
  {
    "id": 43,
    "kanji": "こ",
    "sentence": "この店は*品*物の種類が多いです。",
    "options": [
      "ひん",
      "しな",
      "ほん",
      "もの"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ひん",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 品 is used in 品物 (しなもの - goods)."
      },
      {
        "option": "しな",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading but not used in this compound."
      },
      {
        "option": "ほん",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used here."
      },
      {
        "option": "もの",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "This store has many types of goods."
  },
  {
    "id": 44,
    "kanji": "こ",
    "sentence": "この仕事は*力*が必要です。",
    "options": [
      "ちから",
      "りょく",
      "りき",
      "つよさ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ちから",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 力 means \"strength/power\" in everyday contexts."
      },
      {
        "option": "りょく",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 能力 (のうりょく)."
      },
      {
        "option": "りき",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "つよさ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 力."
      }
    ],
    "englishTranslation": "This job requires strength."
  },
  {
    "id": 45,
    "kanji": "こ",
    "sentence": "この*地*域は静かで住みやすいです。",
    "options": [
      "ち",
      "じ",
      "つち",
      "どう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ち",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 地 is used in 地域 (ちいき - area/region)."
      },
      {
        "option": "じ",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "つち",
        "isCorrect": false,
        "reasoning": "This is not a standard reading of 地."
      },
      {
        "option": "どう",
        "isCorrect": false,
        "reasoning": "This is not a reading of 地."
      }
    ],
    "englishTranslation": "This area is quiet and easy to live in."
  },
  {
    "id": 46,
    "kanji": "今",
    "sentence": "今日は天気が*悪*くて外出できません。",
    "options": [
      "わる",
      "あく",
      "お",
      "にく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "わる",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 悪 is used in 悪い (わるい - bad)."
      },
      {
        "option": "あく",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 悪魔 (あくま)."
      },
      {
        "option": "お",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "にく",
        "isCorrect": false,
        "reasoning": "This relates to にく.い but not the main reading."
      }
    ],
    "englishTranslation": "The weather is bad today, so I can't go out."
  },
  {
    "id": 47,
    "kanji": "公",
    "sentence": "公園で可愛い*犬*と遊びました。",
    "options": [
      "いぬ",
      "けん",
      "わん",
      "ドッグ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いぬ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 犬 means \"dog\" in everyday contexts."
      },
      {
        "option": "けん",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 番犬 (ばんけん)."
      },
      {
        "option": "わん",
        "isCorrect": false,
        "reasoning": "This is not a reading of 犬."
      },
      {
        "option": "ドッグ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 犬."
      }
    ],
    "englishTranslation": "I played with a cute dog in the park."
  },
  {
    "id": 48,
    "kanji": "*",
    "sentence": "*正*しい答えを選んでください。",
    "options": [
      "ただ",
      "せい",
      "しょう",
      "まさ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ただ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 正 is used in 正しい (ただしい - correct)."
      },
      {
        "option": "せい",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 正解 (せいかい)."
      },
      {
        "option": "しょう",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "まさ",
        "isCorrect": false,
        "reasoning": "This relates to まさ.に but not used in adjectives."
      }
    ],
    "englishTranslation": "Please choose the correct answer."
  },
  {
    "id": 49,
    "kanji": "新",
    "sentence": "新しい*仕*事を始めることになりました。",
    "options": [
      "し",
      "じ",
      "つか",
      "はたら"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "し",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 仕 is used in 仕事 (しごと - job/work)."
      },
      {
        "option": "じ",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "つか",
        "isCorrect": false,
        "reasoning": "This relates to つか.える but not used in this compound."
      },
      {
        "option": "はたら",
        "isCorrect": false,
        "reasoning": "This is not a reading of 仕."
      }
    ],
    "englishTranslation": "I'm going to start a new job."
  },
  {
    "id": 50,
    "kanji": "本",
    "sentence": "本*屋*で面白い小説を買いました。",
    "options": [
      "や",
      "おく",
      "たな",
      "みせ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "や",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 屋 is used in 本屋 (ほんや - bookstore)."
      },
      {
        "option": "おく",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading but not used in this compound."
      },
      {
        "option": "たな",
        "isCorrect": false,
        "reasoning": "This is not a reading of 屋."
      },
      {
        "option": "みせ",
        "isCorrect": false,
        "reasoning": "This is the reading for 店 (store), not 屋."
      }
    ],
    "englishTranslation": "I bought an interesting novel at the bookstore."
  },
  {
    "id": 51,
    "kanji": "電",
    "sentence": "電車が*発*車する時間を確認しました。",
    "options": [
      "はつ",
      "ほつ",
      "た",
      "はっ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "はつ",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 発 is used in 発車 (はっしゃ - departure)."
      },
      {
        "option": "ほつ",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "た",
        "isCorrect": false,
        "reasoning": "This relates to た.つ but not used in this compound."
      },
      {
        "option": "はっ",
        "isCorrect": false,
        "reasoning": "This is not the complete reading."
      }
    ],
    "englishTranslation": "I confirmed the time when the train departs."
  },
  {
    "id": 52,
    "kanji": "*",
    "sentence": "*黒*い猫が庭を走っていました。",
    "options": [
      "くろ",
      "こく",
      "ずむ",
      "あか"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "くろ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 黒 is used in 黒い (くろい - black)."
      },
      {
        "option": "こく",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds."
      },
      {
        "option": "ずむ",
        "isCorrect": false,
        "reasoning": "This relates to くろ.ずむ but not the main reading."
      },
      {
        "option": "あか",
        "isCorrect": false,
        "reasoning": "This is the reading for 赤 (red), not 黒."
      }
    ],
    "englishTranslation": "A black cat was running in the garden."
  },
  {
    "id": 53,
    "kanji": "明",
    "sentence": "明日は*用*事があるので、早く帰ります。",
    "options": [
      "よう",
      "もち",
      "つか",
      "ゆう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "よう",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 用 is used in 用事 (ようじ - business/errand)."
      },
      {
        "option": "もち",
        "isCorrect": false,
        "reasoning": "This relates to もち.いる but not used in compounds."
      },
      {
        "option": "つか",
        "isCorrect": false,
        "reasoning": "This is not a reading of 用."
      },
      {
        "option": "ゆう",
        "isCorrect": false,
        "reasoning": "This is not a reading of 用."
      }
    ],
    "englishTranslation": "I have business to attend to tomorrow, so I'll go home early."
  },
  {
    "id": 54,
    "kanji": "母",
    "sentence": "母の*料*理はいつも美味しいです。",
    "options": [
      "りょう",
      "りょ",
      "ざい",
      "しょく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "りょう",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 料 is used in 料理 (りょうり - cooking)."
      },
      {
        "option": "りょ",
        "isCorrect": false,
        "reasoning": "This is an incomplete reading."
      },
      {
        "option": "ざい",
        "isCorrect": false,
        "reasoning": "This is not a reading of 料."
      },
      {
        "option": "しょく",
        "isCorrect": false,
        "reasoning": "This is the reading for 食, not 料."
      }
    ],
    "englishTranslation": "My mother's cooking is always delicious."
  },
  {
    "id": 55,
    "kanji": "将",
    "sentence": "将来のことをよく*考*える必要があります。",
    "options": [
      "かんが",
      "こう",
      "おも",
      "しんか"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かんが",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 考 is used in 考える (かんがえる - to think)."
      },
      {
        "option": "こう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 思考 (しこう)."
      },
      {
        "option": "おも",
        "isCorrect": false,
        "reasoning": "This is the reading for 思 (think), not 考."
      },
      {
        "option": "しんか",
        "isCorrect": false,
        "reasoning": "This is not a reading of 考."
      }
    ],
    "englishTranslation": "It's necessary to think carefully about the future."
  },
  {
    "id": 56,
    "kanji": "運",
    "sentence": "運動不足で*体*の調子が悪いです。",
    "options": [
      "からだ",
      "たい",
      "てい",
      "かたち"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "からだ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 体 means \"body\" in everyday contexts."
      },
      {
        "option": "たい",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 体重 (たいじゅう)."
      },
      {
        "option": "てい",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "かたち",
        "isCorrect": false,
        "reasoning": "This is an alternative kun'yomi reading meaning \"shape.\""
      }
    ],
    "englishTranslation": "Due to lack of exercise, my body condition is poor."
  },
  {
    "id": 57,
    "kanji": "*",
    "sentence": "*同*じクラスの友達と一緒に昼食を食べました。",
    "options": [
      "おな",
      "どう",
      "とも",
      "いっ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おな",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 同 is used in 同じ (おなじ - same)."
      },
      {
        "option": "どう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 同時 (どうじ)."
      },
      {
        "option": "とも",
        "isCorrect": false,
        "reasoning": "This is not a reading of 同."
      },
      {
        "option": "いっ",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "I ate lunch together with a friend from the same class."
  },
  {
    "id": 58,
    "kanji": "の",
    "sentence": "のどが渇いたので、冷たい水を*飲*みました。",
    "options": [
      "の",
      "いん",
      "おん",
      "い"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "の",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 飲 is used in 飲む (のむ - to drink)."
      },
      {
        "option": "いん",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 飲食 (いんしょく)."
      },
      {
        "option": "おん",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "い",
        "isCorrect": false,
        "reasoning": "This is not a reading of 飲."
      }
    ],
    "englishTranslation": "I was thirsty, so I drank cold water."
  },
  {
    "id": 59,
    "kanji": "*",
    "sentence": "*姉*が結婚することになりました。",
    "options": [
      "あね",
      "し",
      "はは",
      "いもうと"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "あね",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 姉 means \"older sister\" in everyday contexts."
      },
      {
        "option": "し",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 姉妹 (しまい)."
      },
      {
        "option": "はは",
        "isCorrect": false,
        "reasoning": "This is the reading for 母 (mother), not 姉."
      },
      {
        "option": "いもうと",
        "isCorrect": false,
        "reasoning": "This is the reading for 妹 (younger sister), not 姉."
      }
    ],
    "englishTranslation": "My older sister is going to get married."
  },
  {
    "id": 60,
    "kanji": "こ",
    "sentence": "この辞書はとても*有*名です。",
    "options": [
      "ゆう",
      "う",
      "あ",
      "めい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ゆう",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 有 is used in 有名 (ゆうめい - famous)."
      },
      {
        "option": "う",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "あ",
        "isCorrect": false,
        "reasoning": "This relates to あ.る but not used in compounds."
      },
      {
        "option": "めい",
        "isCorrect": false,
        "reasoning": "This is the reading for 名, not 有."
      }
    ],
    "englishTranslation": "This dictionary is very famous."
  },
  {
    "id": 61,
    "kanji": "*",
    "sentence": "*英*語の勉強を毎日続けています。",
    "options": [
      "えい",
      "はなぶさ",
      "い",
      "ご"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "えい",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 英 is used in 英語 (えいご - English language)."
      },
      {
        "option": "はなぶさ",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading but not used in this compound."
      },
      {
        "option": "い",
        "isCorrect": false,
        "reasoning": "This is not a reading of 英."
      },
      {
        "option": "ご",
        "isCorrect": false,
        "reasoning": "This is the reading for 語, not 英."
      }
    ],
    "englishTranslation": "I continue studying English every day."
  },
  {
    "id": 62,
    "kanji": "こ",
    "sentence": "この*古*い建物は歴史があります。",
    "options": [
      "ふる",
      "こ",
      "きゅう",
      "あたら"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ふる",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 古 is used in 古い (ふるい - old)."
      },
      {
        "option": "こ",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 古代 (こだい)."
      },
      {
        "option": "きゅう",
        "isCorrect": false,
        "reasoning": "This is not a reading of 古."
      },
      {
        "option": "あたら",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "This old building has history."
  },
  {
    "id": 63,
    "kanji": "公",
    "sentence": "公園で美しい*鳥*の鳴き声を聞きました。",
    "options": [
      "とり",
      "ちょう",
      "どり",
      "きん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "とり",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 鳥 means \"bird\" in everyday contexts."
      },
      {
        "option": "ちょう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 小鳥 (ことり)."
      },
      {
        "option": "どり",
        "isCorrect": false,
        "reasoning": "This is a voiced variation but not correct here."
      },
      {
        "option": "きん",
        "isCorrect": false,
        "reasoning": "This is not a reading of 鳥."
      }
    ],
    "englishTranslation": "I heard beautiful bird songs in the park."
  },
  {
    "id": 64,
    "kanji": "*",
    "sentence": "*公*園で子供たちが遊んでいます。",
    "options": [
      "こう",
      "く",
      "おおやけ",
      "みん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こう",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 公 is used in 公園 (こうえん - park)."
      },
      {
        "option": "く",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "おおやけ",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading but not used in this compound."
      },
      {
        "option": "みん",
        "isCorrect": false,
        "reasoning": "This is not a reading of 公."
      }
    ],
    "englishTranslation": "Children are playing in the public park."
  },
  {
    "id": 65,
    "kanji": "こ",
    "sentence": "この部屋は*広*くて快適です。",
    "options": [
      "ひろ",
      "こう",
      "ひら",
      "おお"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ひろ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 広 is used in 広い (ひろい - wide/spacious)."
      },
      {
        "option": "こう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 広告 (こうこく)."
      },
      {
        "option": "ひら",
        "isCorrect": false,
        "reasoning": "This is not a reading of 広."
      },
      {
        "option": "おお",
        "isCorrect": false,
        "reasoning": "This is the reading for 大 (big), not 広."
      }
    ],
    "englishTranslation": "This room is spacious and comfortable."
  },
  {
    "id": 66,
    "kanji": "試",
    "sentence": "試験の結果が*不*安でよく眠れませんでした。",
    "options": [
      "ふ",
      "ぶ",
      "ひ",
      "びー"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ふ",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 不 is used in 不安 (ふあん - anxiety)."
      },
      {
        "option": "ぶ",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "ひ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 不."
      },
      {
        "option": "びー",
        "isCorrect": false,
        "reasoning": "This is not a reading of 不."
      }
    ],
    "englishTranslation": "I was anxious about the exam results and couldn't sleep well."
  },
  {
    "id": 67,
    "kanji": "重",
    "sentence": "重い荷物を*持*って歩くのは大変です。",
    "options": [
      "も",
      "じ",
      "ち",
      "しょう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "も",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 持 is used in 持つ (もつ - to hold/carry)."
      },
      {
        "option": "じ",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 持参 (じさん)."
      },
      {
        "option": "ち",
        "isCorrect": false,
        "reasoning": "This is not a reading of 持."
      },
      {
        "option": "しょう",
        "isCorrect": false,
        "reasoning": "This is not a reading of 持.# Complete N4 Kanji Reading Questions (Verified N5 Vocabulary Only)"
      }
    ],
    "englishTranslation": "It's hard to walk while carrying heavy luggage."
  },
  {
    "id": 68,
    "kanji": "昨",
    "sentence": "昨日から*足*の調子が悪くて、病院に行きました。",
    "options": [
      "あし",
      "そく",
      "たり",
      "あり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "あし",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 足 means \"leg\" or \"foot\" in everyday contexts."
      },
      {
        "option": "そく",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 足音 (あしおと - footsteps)."
      },
      {
        "option": "たり",
        "isCorrect": false,
        "reasoning": "This relates to た.りる (to be sufficient) but is not the correct reading here."
      },
      {
        "option": "あり",
        "isCorrect": false,
        "reasoning": "This is not a reading of 足."
      }
    ],
    "englishTranslation": "My leg has been in bad condition since yesterday, so I went to the hospital."
  },
  {
    "id": 69,
    "kanji": "知",
    "sentence": "知らない*道*を通って、迷子になってしまいました。",
    "options": [
      "みち",
      "どう",
      "とう",
      "みず"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "みち",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading of 道 when it means \"road\" or \"path.\""
      },
      {
        "option": "どう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 道路 (どうろ)."
      },
      {
        "option": "とう",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "みず",
        "isCorrect": false,
        "reasoning": "This is the reading for 水 (water), not 道."
      }
    ],
    "englishTranslation": "I got lost by going through an unfamiliar road."
  },
  {
    "id": 70,
    "kanji": "母",
    "sentence": "母が電話で何かを*言*っていましたが、よく聞こえませんでした。",
    "options": [
      "い",
      "げん",
      "ごん",
      "こ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "い",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 言 is used in 言う (いう - to say)."
      },
      {
        "option": "げん",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 言語 (げんご - language)."
      },
      {
        "option": "ごん",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading used in some compounds."
      },
      {
        "option": "こ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 言."
      }
    ],
    "englishTranslation": "My mother was saying something on the phone, but I couldn't hear it well."
  },
  {
    "id": 71,
    "kanji": "雨",
    "sentence": "雨が降っているので、早く家に*帰*りたいと思います。",
    "options": [
      "かえ",
      "き",
      "ひ",
      "けい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かえ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 帰 is used in 帰る (かえる - to return home)."
      },
      {
        "option": "き",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 帰国 (きこく)."
      },
      {
        "option": "ひ",
        "isCorrect": false,
        "reasoning": "This is the reading for 日, not 帰."
      },
      {
        "option": "けい",
        "isCorrect": false,
        "reasoning": "This is not a reading of 帰."
      }
    ],
    "englishTranslation": "Since it's raining, I think I want to go home early."
  },
  {
    "id": 72,
    "kanji": "料",
    "sentence": "料理をする時は、*手*を洗うことが大切です。",
    "options": [
      "て",
      "しゅ",
      "ず",
      "で"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "て",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 手 stands alone meaning \"hand.\""
      },
      {
        "option": "しゅ",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 手術 (しゅじゅつ)."
      },
      {
        "option": "ず",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading used in compounds like 上手 (じょうず)."
      },
      {
        "option": "で",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "When cooking, it's important to wash your hands."
  },
  {
    "id": 73,
    "kanji": "窓",
    "sentence": "窓を開けたら、気持ちいい*風*が入ってきました。",
    "options": [
      "かぜ",
      "ふう",
      "ふ",
      "かじ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かぜ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 風 means \"wind\" in everyday contexts."
      },
      {
        "option": "ふう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 台風 (たいふう)."
      },
      {
        "option": "ふ",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "かじ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 風."
      }
    ],
    "englishTranslation": "When I opened the window, a pleasant breeze came in."
  },
  {
    "id": 74,
    "kanji": "こ",
    "sentence": "この服の*色*は少し暗すぎると思いませんか。",
    "options": [
      "いろ",
      "しょく",
      "しき",
      "いり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いろ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 色 means \"color\" in everyday contexts."
      },
      {
        "option": "しょく",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 色彩 (しきさい)."
      },
      {
        "option": "しき",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading used in some compounds."
      },
      {
        "option": "いり",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "Don't you think this clothing's color is a bit too dark?"
  },
  {
    "id": 75,
    "kanji": "大",
    "sentence": "大学で環境問題について研*究*しています。",
    "options": [
      "きゅう",
      "く",
      "きわ",
      "けん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "きゅう",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 究 is used in 研究 (けんきゅう - research)."
      },
      {
        "option": "く",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "きわ",
        "isCorrect": false,
        "reasoning": "This relates to きわ.める but not used in compounds."
      },
      {
        "option": "けん",
        "isCorrect": false,
        "reasoning": "This is the reading for 研, not 究."
      }
    ],
    "englishTranslation": "I'm researching environmental problems at university."
  },
  {
    "id": 76,
    "kanji": "健",
    "sentence": "健康のために毎日三十分*歩*くようにしています。",
    "options": [
      "ある",
      "あゆ",
      "ほ",
      "ふ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ある",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 歩 is used in 歩く (あるく - to walk)."
      },
      {
        "option": "あゆ",
        "isCorrect": false,
        "reasoning": "This relates to あゆ.む but is not the correct reading here."
      },
      {
        "option": "ほ",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 歩道 (ほどう)."
      },
      {
        "option": "ふ",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      }
    ],
    "englishTranslation": "For my health, I try to walk for thirty minutes every day."
  },
  {
    "id": 77,
    "kanji": "友",
    "sentence": "友達と過ごした時間がとても*楽*しかったので、また会いたいです。",
    "options": [
      "たの",
      "がく",
      "らく",
      "ごう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "たの",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 楽 is used in 楽しい (たのしい - fun/enjoyable)."
      },
      {
        "option": "がく",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading when 楽 means \"music\" as in 音楽 (おんがく)."
      },
      {
        "option": "らく",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading when 楽 means \"easy/comfortable\" as in 楽な (らくな)."
      },
      {
        "option": "ごう",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      }
    ],
    "englishTranslation": "The time I spent with my friend was very enjoyable, so I want to meet again."
  },
  {
    "id": 78,
    "kanji": "時",
    "sentence": "時間が*少*ししかないので、急いで準備をしました。",
    "options": [
      "すこ",
      "しょう",
      "すく",
      "ちょっと"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "すこ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 少 is used in 少し (すこし - a little)."
      },
      {
        "option": "しょう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 少年 (しょうねん)."
      },
      {
        "option": "すく",
        "isCorrect": false,
        "reasoning": "This relates to すく.ない but not used in this form."
      },
      {
        "option": "ちょっと",
        "isCorrect": false,
        "reasoning": "This is a separate word meaning \"a little,\" not a reading of 少."
      }
    ],
    "englishTranslation": "There was only a little time, so I hurried to prepare."
  },
  {
    "id": 79,
    "kanji": "去",
    "sentence": "去年の*夏*は暑くて、毎日プールに行っていました。",
    "options": [
      "なつ",
      "か",
      "が",
      "かつ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "なつ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 夏 means \"summer\" in everyday contexts."
      },
      {
        "option": "か",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 夏期 (かき)."
      },
      {
        "option": "が",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "かつ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 夏."
      }
    ],
    "englishTranslation": "Last summer was hot, and I was going to the pool every day."
  },
  {
    "id": 80,
    "kanji": "こ",
    "sentence": "この地域は外国人が*多*くて、国際的な雰囲気があります。",
    "options": [
      "おお",
      "た",
      "まさ",
      "たく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おお",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 多 is used in 多い (おおい - many/much)."
      },
      {
        "option": "た",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 多数 (たすう)."
      },
      {
        "option": "まさ",
        "isCorrect": false,
        "reasoning": "This relates to まさ.に but not the main reading here."
      },
      {
        "option": "たく",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "This area has many foreigners and has an international atmosphere."
  },
  {
    "id": 81,
    "kanji": "*",
    "sentence": "*研*究室で先輩と一緒に実験をしました。",
    "options": [
      "けん",
      "と",
      "みが",
      "しら"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "けん",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 研 is used in 研究室 (けんきゅうしつ - research lab)."
      },
      {
        "option": "と",
        "isCorrect": false,
        "reasoning": "This relates to と.ぐ but not used in compounds."
      },
      {
        "option": "みが",
        "isCorrect": false,
        "reasoning": "This is not a reading of 研."
      },
      {
        "option": "しら",
        "isCorrect": false,
        "reasoning": "This is not a reading of 研."
      }
    ],
    "englishTranslation": "I did experiments with my senior in the research lab."
  },
  {
    "id": 82,
    "kanji": "*",
    "sentence": "*妹*が大学に合格して、家族皆で喜びました。",
    "options": [
      "いもうと",
      "まい",
      "あね",
      "しまい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いもうと",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 妹 means \"younger sister\" in everyday contexts."
      },
      {
        "option": "まい",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 姉妹 (しまい)."
      },
      {
        "option": "あね",
        "isCorrect": false,
        "reasoning": "This is the reading for 姉 (older sister), not 妹."
      },
      {
        "option": "しまい",
        "isCorrect": false,
        "reasoning": "This is a compound word, not the reading for 妹 alone."
      }
    ],
    "englishTranslation": "My younger sister passed the university entrance exam, and the whole family rejoiced."
  },
  {
    "id": 83,
    "kanji": "*",
    "sentence": "*春*になって、桜の花が咲き始めました。",
    "options": [
      "はる",
      "しゅん",
      "はり",
      "しゅ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "はる",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 春 means \"spring\" season."
      },
      {
        "option": "しゅん",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 春分 (しゅんぶん)."
      },
      {
        "option": "はり",
        "isCorrect": false,
        "reasoning": "This is not a reading of 春."
      },
      {
        "option": "しゅ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 春."
      }
    ],
    "englishTranslation": "Spring came, and the cherry blossoms started to bloom."
  },
  {
    "id": 84,
    "kanji": "父",
    "sentence": "父は建設会社で*工*事の管理をしています。",
    "options": [
      "こう",
      "く",
      "ぐ",
      "じ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こう",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 工 is used in 工事 (こうじ - construction work)."
      },
      {
        "option": "く",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "ぐ",
        "isCorrect": false,
        "reasoning": "This is another alternative on'yomi reading but not used here."
      },
      {
        "option": "じ",
        "isCorrect": false,
        "reasoning": "This is the reading for 事, not 工."
      }
    ],
    "englishTranslation": "My father manages construction work at a construction company."
  },
  {
    "id": 85,
    "kanji": "新",
    "sentence": "新しいテレビを*台*の上に置きました。",
    "options": [
      "だい",
      "たい",
      "うてな",
      "ばん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "だい",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 台 means \"stand/platform\" in everyday contexts."
      },
      {
        "option": "たい",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but less common."
      },
      {
        "option": "うてな",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading but not commonly used."
      },
      {
        "option": "ばん",
        "isCorrect": false,
        "reasoning": "This is not a reading of 台."
      }
    ],
    "englishTranslation": "I placed the new TV on top of the stand."
  },
  {
    "id": 86,
    "kanji": "家",
    "sentence": "家から学校まで*近*いので、いつも歩いて通っています。",
    "options": [
      "ちか",
      "きん",
      "こん",
      "そば"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ちか",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 近 is used in 近い (ちかい - close/near)."
      },
      {
        "option": "きん",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 近所 (きんじょ)."
      },
      {
        "option": "こん",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "そば",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "Since it's close from home to school, I always walk there."
  },
  {
    "id": 87,
    "kanji": "小",
    "sentence": "小さい時に飼っていた犬が*死*んでしまって、とても悲しかったです。",
    "options": [
      "し",
      "だい",
      "せい",
      "で"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "し",
        "isCorrect": true,
        "reasoning": "This is the reading when 死 is used in 死ぬ (しぬ - to die)."
      },
      {
        "option": "だい",
        "isCorrect": false,
        "reasoning": "This is not a reading of 死."
      },
      {
        "option": "せい",
        "isCorrect": false,
        "reasoning": "This is not a reading of 死."
      },
      {
        "option": "で",
        "isCorrect": false,
        "reasoning": "This is not a reading of 死."
      }
    ],
    "englishTranslation": "The dog I kept when I was small died, and I was very sad."
  },
  {
    "id": 88,
    "kanji": "こ",
    "sentence": "このペンは書きやすくて、よく*使*っています。",
    "options": [
      "つか",
      "し",
      "づか",
      "すか"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "つか",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 使 is used in 使う (つかう - to use)."
      },
      {
        "option": "し",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 使用 (しよう)."
      },
      {
        "option": "づか",
        "isCorrect": false,
        "reasoning": "This is a variation used in compounds but not the main reading."
      },
      {
        "option": "すか",
        "isCorrect": false,
        "reasoning": "This is not a reading of 使."
      }
    ],
    "englishTranslation": "This pen is easy to write with, and I use it often."
  },
  {
    "id": 89,
    "kanji": "分",
    "sentence": "分からないことがあったら、遠慮なく*問*い合わせてください。",
    "options": [
      "と",
      "もん",
      "とい",
      "たず"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "と",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 問 is used in 問い合わせる (といあわせる - to inquire)."
      },
      {
        "option": "もん",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 質問 (しつもん)."
      },
      {
        "option": "とい",
        "isCorrect": false,
        "reasoning": "This is the noun form but not the verb reading."
      },
      {
        "option": "たず",
        "isCorrect": false,
        "reasoning": "This is not a reading of 問."
      }
    ],
    "englishTranslation": "If there's something you don't understand, please don't hesitate to inquire."
  },
  {
    "id": 90,
    "kanji": "今",
    "sentence": "今年の*冬*は雪が多くて、車の運転が大変でした。",
    "options": [
      "ふゆ",
      "とう",
      "ふう",
      "とお"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ふゆ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 冬 means \"winter\" in everyday contexts."
      },
      {
        "option": "とう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 冬期 (とうき)."
      },
      {
        "option": "ふう",
        "isCorrect": false,
        "reasoning": "This is not a reading of 冬."
      },
      {
        "option": "とお",
        "isCorrect": false,
        "reasoning": "This is not a reading of 冬."
      }
    ],
    "englishTranslation": "This year's winter had a lot of snow, and driving was difficult."
  },
  {
    "id": 91,
    "kanji": "旅",
    "sentence": "旅行の思い出を*写*真に残しました。",
    "options": [
      "しゃ",
      "じゃ",
      "うつ",
      "コピー"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しゃ",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 写 is used in 写真 (しゃしん - photograph)."
      },
      {
        "option": "じゃ",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "うつ",
        "isCorrect": false,
        "reasoning": "This relates to うつ.す but not used in this compound."
      },
      {
        "option": "コピー",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "I preserved the memories of the trip in photographs."
  },
  {
    "id": 92,
    "kanji": "駅",
    "sentence": "駅への*方*向が分からなくて、道に迷いました。",
    "options": [
      "ほう",
      "かた",
      "がた",
      "むき"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ほう",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 方 is used in 方向 (ほうこう - direction)."
      },
      {
        "option": "かた",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading when 方 means \"person\" or \"way.\""
      },
      {
        "option": "がた",
        "isCorrect": false,
        "reasoning": "This is a variation of かた used in compounds."
      },
      {
        "option": "むき",
        "isCorrect": false,
        "reasoning": "This is not a reading of 方."
      }
    ],
    "englishTranslation": "I didn't know the direction to the station and got lost."
  },
  {
    "id": 93,
    "kanji": "隣",
    "sentence": "隣の部屋から変な*音*が聞こえてきて、心配になりました。",
    "options": [
      "おと",
      "おん",
      "いん",
      "ね"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おと",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 音 means \"sound\" in everyday contexts."
      },
      {
        "option": "おん",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 音楽 (おんがく)."
      },
      {
        "option": "いん",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading used in some compounds."
      },
      {
        "option": "ね",
        "isCorrect": false,
        "reasoning": "This is an alternative kun'yomi reading but not correct in this context."
      }
    ],
    "englishTranslation": "A strange sound came from the next room, and I became worried."
  },
  {
    "id": 94,
    "kanji": "彼",
    "sentence": "彼の*意*見に賛成できませんでした。",
    "options": [
      "い",
      "おも",
      "かんが",
      "こころ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "い",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 意 is used in 意見 (いけん - opinion)."
      },
      {
        "option": "おも",
        "isCorrect": false,
        "reasoning": "This is the reading for 思 (think), not 意."
      },
      {
        "option": "かんが",
        "isCorrect": false,
        "reasoning": "This is the reading for 考 (consider), not 意."
      },
      {
        "option": "こころ",
        "isCorrect": false,
        "reasoning": "This is the reading for 心 (heart), not 意."
      }
    ],
    "englishTranslation": "I couldn't agree with his opinion."
  },
  {
    "id": 95,
    "kanji": "新",
    "sentence": "新しい家を*建*てるために、お金を貯めています。",
    "options": [
      "た",
      "けん",
      "こん",
      "だ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "た",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 建 is used in 建てる (たてる - to build)."
      },
      {
        "option": "けん",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 建物 (たてもの)."
      },
      {
        "option": "こん",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "だ",
        "isCorrect": false,
        "reasoning": "This relates to the compound form -だて but not the verb reading."
      }
    ],
    "englishTranslation": "I am saving money in order to build a new house."
  },
  {
    "id": 96,
    "kanji": "新",
    "sentence": "新しい*服*を買いに、デパートに行きました。",
    "options": [
      "ふく",
      "はく",
      "きる",
      "よう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ふく",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 服 means \"clothing\" in everyday contexts."
      },
      {
        "option": "はく",
        "isCorrect": false,
        "reasoning": "This is not a reading of 服."
      },
      {
        "option": "きる",
        "isCorrect": false,
        "reasoning": "This is the reading for 着る (to wear), not 服."
      },
      {
        "option": "よう",
        "isCorrect": false,
        "reasoning": "This is not a reading of 服."
      }
    ],
    "englishTranslation": "I went to the department store to buy new clothes."
  },
  {
    "id": 97,
    "kanji": "来",
    "sentence": "来週の*会*議の準備をしています。",
    "options": [
      "かい",
      "え",
      "あ",
      "かつ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かい",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 会 is used in 会議 (かいぎ - meeting)."
      },
      {
        "option": "え",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "あ",
        "isCorrect": false,
        "reasoning": "This relates to あ.う but not used in compounds."
      },
      {
        "option": "かつ",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "I'm preparing for next week's meeting."
  },
  {
    "id": 98,
    "kanji": "こ",
    "sentence": "この*文*章の意味が分かりません。",
    "options": [
      "ぶん",
      "もん",
      "ふみ",
      "あや"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ぶん",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 文 is used in 文章 (ぶんしょう - sentence/text)."
      },
      {
        "option": "もん",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "ふみ",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading but not used in compounds."
      },
      {
        "option": "あや",
        "isCorrect": false,
        "reasoning": "This is an alternative kun'yomi reading."
      }
    ],
    "englishTranslation": "I don't understand the meaning of this sentence."
  },
  {
    "id": 99,
    "kanji": "図",
    "sentence": "図書館で本を*借*りるときは、カードが必要です。",
    "options": [
      "か",
      "しゃく",
      "からす",
      "き"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "か",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 借 is used in 借りる (かりる - to borrow)."
      },
      {
        "option": "しゃく",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 借金 (しゃっきん)."
      },
      {
        "option": "からす",
        "isCorrect": false,
        "reasoning": "This is not a reading of 借."
      },
      {
        "option": "き",
        "isCorrect": false,
        "reasoning": "This is not a reading of 借."
      }
    ],
    "englishTranslation": "When borrowing books at the library, a card is necessary."
  },
  {
    "id": 100,
    "kanji": "毎",
    "sentence": "毎朝六時に*起*きて、散歩をしています。",
    "options": [
      "お",
      "き",
      "こ",
      "た"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "お",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 起 is used in 起きる (おきる - to get up)."
      },
      {
        "option": "き",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 起立 (きりつ)."
      },
      {
        "option": "こ",
        "isCorrect": false,
        "reasoning": "This relates to お.こる but not the correct reading here."
      },
      {
        "option": "た",
        "isCorrect": false,
        "reasoning": "This relates to た.つ but not the main reading."
      }
    ],
    "englishTranslation": "I get up at six o'clock every morning and take a walk."
  },
  {
    "id": 101,
    "kanji": "電",
    "sentence": "電車の*代*金が高くなりました。",
    "options": [
      "だい",
      "たい",
      "か",
      "しろ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "だい",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 代 is used in 代金 (だいきん - fee/charge)."
      },
      {
        "option": "たい",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "か",
        "isCorrect": false,
        "reasoning": "This relates to か.わる but not used in compounds."
      },
      {
        "option": "しろ",
        "isCorrect": false,
        "reasoning": "This is an alternative kun'yomi reading but not used here."
      }
    ],
    "englishTranslation": "The train fare has become expensive."
  },
  {
    "id": 102,
    "kanji": "数",
    "sentence": "数学の*理*論が難しくて理解できません。",
    "options": [
      "り",
      "ことわり",
      "ただ",
      "みち"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "り",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 理 is used in 理論 (りろん - theory)."
      },
      {
        "option": "ことわり",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading but not used in compounds."
      },
      {
        "option": "ただ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 理."
      },
      {
        "option": "みち",
        "isCorrect": false,
        "reasoning": "This is the reading for 道 (road), not 理."
      }
    ],
    "englishTranslation": "The mathematical theory is difficult and I can't understand it."
  },
  {
    "id": 103,
    "kanji": "今",
    "sentence": "今日の気温は三十*度*まで上がりました。",
    "options": [
      "ど",
      "と",
      "たび",
      "たく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ど",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 度 means \"degrees\" in temperature measurement."
      },
      {
        "option": "と",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used for temperature."
      },
      {
        "option": "たび",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading meaning \"times/occasions.\""
      },
      {
        "option": "たく",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "Today's temperature rose to thirty degrees."
  },
  {
    "id": 104,
    "kanji": "朝",
    "sentence": "朝*飯*を食べる時間がありませんでした。",
    "options": [
      "はん",
      "めし",
      "ごはん",
      "しょく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "はん",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 飯 is used in 朝飯 (あさはん - breakfast)."
      },
      {
        "option": "めし",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading for standalone 飯 but not in this compound."
      },
      {
        "option": "ごはん",
        "isCorrect": false,
        "reasoning": "This is a separate word (ご飯), not the reading for 飯 in compounds."
      },
      {
        "option": "しょく",
        "isCorrect": false,
        "reasoning": "This is the reading for 食, not 飯."
      }
    ],
    "englishTranslation": "I didn't have time to eat breakfast."
  },
  {
    "id": 105,
    "kanji": "*",
    "sentence": "*図*書館で勉強する予定です。",
    "options": [
      "ず",
      "と",
      "え",
      "としょ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ず",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 図 is used in 図書館 (としょかん - library)."
      },
      {
        "option": "と",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "え",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading but not used in this compound."
      },
      {
        "option": "としょ",
        "isCorrect": false,
        "reasoning": "This is the reading for the whole compound, not just 図."
      }
    ],
    "englishTranslation": "I plan to study at the library."
  },
  {
    "id": 106,
    "kanji": "こ",
    "sentence": "この会社の*主*な事業は何ですか。",
    "options": [
      "おも",
      "しゅ",
      "ぬし",
      "あるじ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おも",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 主 is used in 主な (おもな - main/principal)."
      },
      {
        "option": "しゅ",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 主人 (しゅじん)."
      },
      {
        "option": "ぬし",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading when 主 means \"owner\" but not used here."
      },
      {
        "option": "あるじ",
        "isCorrect": false,
        "reasoning": "This is an alternative kun'yomi reading."
      }
    ],
    "englishTranslation": "What is the main business of this company?"
  },
  {
    "id": 107,
    "kanji": "友",
    "sentence": "友達を駅で*待*っていたら、電車が遅れて来ました。",
    "options": [
      "ま",
      "たい",
      "みち",
      "もち"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ま",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 待 is used in 待つ (まつ - to wait)."
      },
      {
        "option": "たい",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 待機 (たいき)."
      },
      {
        "option": "みち",
        "isCorrect": false,
        "reasoning": "This is the reading for 道 (road), not 待."
      },
      {
        "option": "もち",
        "isCorrect": false,
        "reasoning": "This is not a reading of 待."
      }
    ],
    "englishTranslation": "While I was waiting for my friend at the station, the train came late."
  },
  {
    "id": 108,
    "kanji": "駅",
    "sentence": "駅の改札*口*で友達と待ち合わせをしました。",
    "options": [
      "こう",
      "く",
      "くち",
      "ぐち"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こう",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 口 is used in 改札口 (かいさつぐち - ticket gate)."
      },
      {
        "option": "く",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "くち",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading when 口 means \"mouth\" but not used in compounds."
      },
      {
        "option": "ぐち",
        "isCorrect": false,
        "reasoning": "This is a voiced variation but not the correct reading here."
      }
    ],
    "englishTranslation": "I met up with a friend at the station ticket gate."
  },
  {
    "id": 109,
    "kanji": "今",
    "sentence": "今日の夕食は*牛*肉料理にしました。",
    "options": [
      "ぎゅう",
      "うし",
      "ぎゅ",
      "ぎん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ぎゅう",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 牛 is used in 牛肉 (ぎゅうにく - beef)."
      },
      {
        "option": "うし",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading when 牛 means \"cow\" as an animal."
      },
      {
        "option": "ぎゅ",
        "isCorrect": false,
        "reasoning": "This is an incomplete reading."
      },
      {
        "option": "ぎん",
        "isCorrect": false,
        "reasoning": "This is not a reading of 牛."
      }
    ],
    "englishTranslation": "I made beef dishes for today's dinner."
  },
  {
    "id": 110,
    "kanji": "病",
    "sentence": "病気が治って、*元*気になりました。",
    "options": [
      "げん",
      "もと",
      "がん",
      "はじめ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "げん",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 元 is used in 元気 (げんき - healthy/energetic)."
      },
      {
        "option": "もと",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading meaning \"origin\" but not used in this compound."
      },
      {
        "option": "がん",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "はじめ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 元."
      }
    ],
    "englishTranslation": "My illness was cured, and I became healthy again."
  },
  {
    "id": 111,
    "kanji": "ク",
    "sentence": "クラスメートが体育館に*集*まって、卒業式の練習をしました。",
    "options": [
      "あつ",
      "しゅう",
      "つど",
      "しゅ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "あつ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 集 is used in 集まる (あつまる - to gather)."
      },
      {
        "option": "しゅう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 集合 (しゅうごう)."
      },
      {
        "option": "つど",
        "isCorrect": false,
        "reasoning": "This relates to つど.う but not the main reading here."
      },
      {
        "option": "しゅ",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "The classmates gathered in the gymnasium and practiced for the graduation ceremony."
  },
  {
    "id": 112,
    "kanji": "こ",
    "sentence": "この店では新鮮な魚を*売*っているので、いつも買い物に来ます。",
    "options": [
      "う",
      "ばい",
      "うり",
      "はん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "う",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 売 is used in 売る (うる - to sell)."
      },
      {
        "option": "ばい",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 販売 (はんばい)."
      },
      {
        "option": "うり",
        "isCorrect": false,
        "reasoning": "This is not the correct reading of 売."
      },
      {
        "option": "はん",
        "isCorrect": false,
        "reasoning": "This is not a reading of 売."
      }
    ],
    "englishTranslation": "This store sells fresh fish, so I always come here to shop."
  },
  {
    "id": 113,
    "kanji": "経",
    "sentence": "経験の豊富な*者*から多くのことを学びました。",
    "options": [
      "もの",
      "しゃ",
      "ひと",
      "じん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "もの",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 者 means \"person\" in everyday contexts."
      },
      {
        "option": "しゃ",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 医者 (いしゃ)."
      },
      {
        "option": "ひと",
        "isCorrect": false,
        "reasoning": "This is the reading for 人 (person), not 者."
      },
      {
        "option": "じん",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "I learned many things from experienced people."
  },
  {
    "id": 114,
    "kanji": "彼",
    "sentence": "彼女の*真*面目な性格に、皆が感心しています。",
    "options": [
      "ま",
      "しん",
      "まこと",
      "しょう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ま",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 真 is used in 真面目 (まじめ - serious)."
      },
      {
        "option": "しん",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 真実 (しんじつ)."
      },
      {
        "option": "まこと",
        "isCorrect": false,
        "reasoning": "This is an alternative kun'yomi reading but not used in this compound."
      },
      {
        "option": "しょう",
        "isCorrect": false,
        "reasoning": "This is not a reading of 真."
      }
    ],
    "englishTranslation": "Everyone admires her serious character."
  },
  {
    "id": 115,
    "kanji": "今",
    "sentence": "今日は*特*別な日なので、美味しいレストランで食事をしました。",
    "options": [
      "とく",
      "とき",
      "べつ",
      "しゅ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "とく",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 特 is used in 特別 (とくべつ - special)."
      },
      {
        "option": "とき",
        "isCorrect": false,
        "reasoning": "This is the reading for 時 (time), not 特."
      },
      {
        "option": "べつ",
        "isCorrect": false,
        "reasoning": "This is the reading for 別, not 特."
      },
      {
        "option": "しゅ",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "Today is a special day, so we had dinner at a delicious restaurant."
  },
  {
    "id": 116,
    "kanji": "友",
    "sentence": "友達と一緒に北海道に*旅*行に行って、とても楽しかったです。",
    "options": [
      "りょ",
      "たび",
      "たく",
      "りゅう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "りょ",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 旅 is used in 旅行 (りょこう - trip/travel)."
      },
      {
        "option": "たび",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading for standalone 旅 but not in this compound."
      },
      {
        "option": "たく",
        "isCorrect": false,
        "reasoning": "This is not a reading of 旅."
      },
      {
        "option": "りゅう",
        "isCorrect": false,
        "reasoning": "This is not a reading of 旅."
      }
    ],
    "englishTranslation": "I went on a trip to Hokkaido with friends, and it was very enjoyable."
  },
  {
    "id": 117,
    "kanji": "窓",
    "sentence": "窓を開けたら、気持ちいい*風*が入ってきました。",
    "options": [
      "かぜ",
      "ふう",
      "ふ",
      "かじ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かぜ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 風 means \"wind\" in everyday contexts."
      },
      {
        "option": "ふう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 台風 (たいふう)."
      },
      {
        "option": "ふ",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "かじ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 風."
      }
    ],
    "englishTranslation": "When I opened the window, a pleasant breeze came in."
  },
  {
    "id": 118,
    "kanji": "疲",
    "sentence": "疲れた時は、温かいお*茶*を飲むとほっとします。",
    "options": [
      "ちゃ",
      "さ",
      "た",
      "ちょ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ちゃ",
        "isCorrect": true,
        "reasoning": "This is the common reading when 茶 means \"tea\" in everyday contexts."
      },
      {
        "option": "さ",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading used in some compounds."
      },
      {
        "option": "た",
        "isCorrect": false,
        "reasoning": "This is not a reading of 茶."
      },
      {
        "option": "ちょ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 茶."
      }
    ],
    "englishTranslation": "When I'm tired, drinking warm tea makes me feel relaxed."
  },
  {
    "id": 119,
    "kanji": "*",
    "sentence": "*秋*になると、山の葉っぱが美しく色づきます。",
    "options": [
      "あき",
      "しゅう",
      "とき",
      "はる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "あき",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 秋 means \"autumn\" in everyday contexts."
      },
      {
        "option": "しゅう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 秋分 (しゅうぶん)."
      },
      {
        "option": "とき",
        "isCorrect": false,
        "reasoning": "This is an alternative kun'yomi reading but not common."
      },
      {
        "option": "はる",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "When autumn comes, the mountain leaves turn beautiful colors."
  },
  {
    "id": 120,
    "kanji": "教",
    "sentence": "教*室*に忘れ物をしたので、取りに戻りました。",
    "options": [
      "しつ",
      "むろ",
      "へや",
      "ま"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しつ",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 室 is used in 教室 (きょうしつ - classroom)."
      },
      {
        "option": "むろ",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading for standalone 室 but not in this compound."
      },
      {
        "option": "へや",
        "isCorrect": false,
        "reasoning": "This is the reading for 部屋 (room), not 室."
      },
      {
        "option": "ま",
        "isCorrect": false,
        "reasoning": "This is not a reading of 室."
      }
    ],
    "englishTranslation": "I forgot something in the classroom, so I went back to get it."
  },
  {
    "id": 121,
    "kanji": "宿",
    "sentence": "宿*題*が難しくて、友達に教えてもらいました。",
    "options": [
      "だい",
      "とう",
      "しゅく",
      "もんだい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "だい",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 題 is used in 宿題 (しゅくだい - homework)."
      },
      {
        "option": "とう",
        "isCorrect": false,
        "reasoning": "This is not a reading of 題."
      },
      {
        "option": "しゅく",
        "isCorrect": false,
        "reasoning": "This is the reading for 宿, not 題."
      },
      {
        "option": "もんだい",
        "isCorrect": false,
        "reasoning": "This is a compound word, not the kanji reading itself."
      }
    ],
    "englishTranslation": "The homework was difficult, so I had a friend teach me."
  },
  {
    "id": 122,
    "kanji": "今",
    "sentence": "今日は*洋*服を着て、パーティーに参加しました。",
    "options": [
      "よう",
      "なみ",
      "うみ",
      "ひろ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "よう",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 洋 is used in 洋服 (ようふく - Western clothes)."
      },
      {
        "option": "なみ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 洋."
      },
      {
        "option": "うみ",
        "isCorrect": false,
        "reasoning": "This is the reading for 海 (sea), not 洋."
      },
      {
        "option": "ひろ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 洋."
      }
    ],
    "englishTranslation": "Today I wore Western clothes and participated in the party."
  },
  {
    "id": 123,
    "kanji": "試",
    "sentence": "試験中は*注*意深く問題を読むようにしています。",
    "options": [
      "ちゅう",
      "そそ",
      "さ",
      "つ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ちゅう",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 注 is used in 注意 (ちゅうい - attention/care)."
      },
      {
        "option": "そそ",
        "isCorrect": false,
        "reasoning": "This relates to そそ.ぐ but not used in this compound."
      },
      {
        "option": "さ",
        "isCorrect": false,
        "reasoning": "This relates to さ.す but not correct here."
      },
      {
        "option": "つ",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "During exams, I try to read the questions carefully."
  },
  {
    "id": 124,
    "kanji": "*",
    "sentence": "*夕*日がとても美しくて、写真を撮りました。",
    "options": [
      "ゆう",
      "せき",
      "ばん",
      "よる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ゆう",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 夕 is used in 夕日 (ゆうひ - sunset)."
      },
      {
        "option": "せき",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading but not commonly used."
      },
      {
        "option": "ばん",
        "isCorrect": false,
        "reasoning": "This is the reading for 晩 (evening), not 夕."
      },
      {
        "option": "よる",
        "isCorrect": false,
        "reasoning": "This is the reading for 夜 (night), not 夕."
      }
    ],
    "englishTranslation": "The sunset was very beautiful, so I took a photo."
  },
  {
    "id": 125,
    "kanji": "美",
    "sentence": "美術の授業で風景*画*を描きました。",
    "options": [
      "が",
      "かく",
      "え",
      "かい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "が",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 画 is used in 風景画 (ふうけいが - landscape painting)."
      },
      {
        "option": "かく",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "え",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used here."
      },
      {
        "option": "かい",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used here."
      }
    ],
    "englishTranslation": "I drew a landscape painting in art class."
  },
  {
    "id": 126,
    "kanji": "こ",
    "sentence": "この店の商品は品質がよくて*安*いので、よく利用しています。",
    "options": [
      "やす",
      "あん",
      "ひく",
      "たか"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "やす",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 安 means \"cheap/inexpensive\" as in 安い (やすい)."
      },
      {
        "option": "あん",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 安全 (あんぜん)."
      },
      {
        "option": "ひく",
        "isCorrect": false,
        "reasoning": "This is not a reading of 安."
      },
      {
        "option": "たか",
        "isCorrect": false,
        "reasoning": "This is the reading for 高 (expensive/high), not 安."
      }
    ],
    "englishTranslation": "This store's products are good quality and cheap, so I use it often."
  },
  {
    "id": 127,
    "kanji": "こ",
    "sentence": "この服の*色*は少し暗すぎると思いませんか。",
    "options": [
      "いろ",
      "しょく",
      "しき",
      "いり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いろ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 色 means \"color\" in everyday contexts."
      },
      {
        "option": "しょく",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 色彩 (しきさい)."
      },
      {
        "option": "しき",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading used in some compounds."
      },
      {
        "option": "いり",
        "isCorrect": false,
        "reasoning": "This is not a reading of 色."
      }
    ],
    "englishTranslation": "Don't you think this clothing's color is a bit too dark?"
  },
  {
    "id": 128,
    "kanji": "去",
    "sentence": "去年の*夏*は暑くて、毎日プールに行っていました。",
    "options": [
      "なつ",
      "か",
      "が",
      "かつ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "なつ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 夏 means \"summer\" in everyday contexts."
      },
      {
        "option": "か",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 夏期 (かき)."
      },
      {
        "option": "が",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "かつ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 夏."
      }
    ],
    "englishTranslation": "Last summer was hot, and I was going to the pool every day."
  },
  {
    "id": 129,
    "kanji": "小",
    "sentence": "小さい時に飼っていた犬が*死*んでしまって、とても悲しかったです。",
    "options": [
      "し",
      "だい",
      "せい",
      "で"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "し",
        "isCorrect": true,
        "reasoning": "This is the reading when 死 is used in 死ぬ (しぬ - to die)."
      },
      {
        "option": "だい",
        "isCorrect": false,
        "reasoning": "This is not a reading of 死."
      },
      {
        "option": "せい",
        "isCorrect": false,
        "reasoning": "This is not a reading of 死."
      },
      {
        "option": "で",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "The dog I kept when I was small died, and I was very sad."
  },
  {
    "id": 130,
    "kanji": "こ",
    "sentence": "このペンは書きやすくて、よく*使*っています。",
    "options": [
      "つか",
      "し",
      "づか",
      "すか"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "つか",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 使 is used in 使う (つかう - to use)."
      },
      {
        "option": "し",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 使用 (しよう)."
      },
      {
        "option": "づか",
        "isCorrect": false,
        "reasoning": "This is a variation used in compounds but not the main reading."
      },
      {
        "option": "すか",
        "isCorrect": false,
        "reasoning": "This is not a reading of 使."
      }
    ],
    "englishTranslation": "This pen is easy to write with, and I use it often."
  },
  {
    "id": 131,
    "kanji": "今",
    "sentence": "今年の*冬*は雪が多くて、車の運転が大変でした。",
    "options": [
      "ふゆ",
      "とう",
      "ふう",
      "とお"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ふゆ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 冬 means \"winter\" in everyday contexts."
      },
      {
        "option": "とう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 冬期 (とうき)."
      },
      {
        "option": "ふう",
        "isCorrect": false,
        "reasoning": "This is not a reading of 冬."
      },
      {
        "option": "とお",
        "isCorrect": false,
        "reasoning": "This is not a reading of 冬."
      }
    ],
    "englishTranslation": "This year's winter had a lot of snow, and driving was difficult."
  },
  {
    "id": 132,
    "kanji": "隣",
    "sentence": "隣の部屋から変な*音*が聞こえてきて、心配になりました。",
    "options": [
      "おと",
      "おん",
      "いん",
      "ね"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おと",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 音 means \"sound\" in everyday contexts."
      },
      {
        "option": "おん",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 音楽 (おんがく)."
      },
      {
        "option": "いん",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading used in some compounds."
      },
      {
        "option": "ね",
        "isCorrect": false,
        "reasoning": "This is an alternative kun'yomi reading but not correct in this context."
      }
    ],
    "englishTranslation": "A strange sound came from the next room, and I became worried."
  },
  {
    "id": 133,
    "kanji": "新",
    "sentence": "新しい家を*建*てるために、お金を貯めています。",
    "options": [
      "た",
      "けん",
      "こん",
      "だ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "た",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 建 is used in 建てる (たてる - to build)."
      },
      {
        "option": "けん",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 建物 (たてもの)."
      },
      {
        "option": "こん",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "だ",
        "isCorrect": false,
        "reasoning": "This relates to the compound form -だて but not the verb reading."
      }
    ],
    "englishTranslation": "I am saving money in order to build a new house."
  },
  {
    "id": 134,
    "kanji": "図",
    "sentence": "図書館で本を*借*りるときは、カードが必要です。",
    "options": [
      "か",
      "しゃく",
      "からす",
      "き"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "か",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 借 is used in 借りる (かりる - to borrow)."
      },
      {
        "option": "しゃく",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 借金 (しゃっきん)."
      },
      {
        "option": "からす",
        "isCorrect": false,
        "reasoning": "This is not a reading of 借."
      },
      {
        "option": "き",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "When borrowing books at the library, a card is necessary."
  },
  {
    "id": 135,
    "kanji": "友",
    "sentence": "友達を駅で*待*っていたら、電車が遅れて来ました。",
    "options": [
      "ま",
      "たい",
      "みち",
      "もち"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ま",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 待 is used in 待つ (まつ - to wait)."
      },
      {
        "option": "たい",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 待機 (たいき)."
      },
      {
        "option": "みち",
        "isCorrect": false,
        "reasoning": "This is the reading for 道 (road), not 待."
      },
      {
        "option": "もち",
        "isCorrect": false,
        "reasoning": "This is not a reading of 待."
      }
    ],
    "englishTranslation": "While I was waiting for my friend at the station, the train came late."
  },
  {
    "id": 136,
    "kanji": "先",
    "sentence": "先生の質問に正しく*答*えることができませんでした。",
    "options": [
      "こた",
      "とう",
      "あんず",
      "いえ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こた",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 答 is used in 答える (こたえる - to answer)."
      },
      {
        "option": "とう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 解答 (かいとう)."
      },
      {
        "option": "あんず",
        "isCorrect": false,
        "reasoning": "This is not a reading of 答."
      },
      {
        "option": "いえ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 答."
      }
    ],
    "englishTranslation": "I was not able to answer the teacher's question correctly."
  },
  {
    "id": 137,
    "kanji": "会",
    "sentence": "会議に遅れそうだったので、*急*いで会社に向かいました。",
    "options": [
      "いそ",
      "きゅう",
      "はや",
      "そく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いそ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 急 is used in 急ぐ (いそぐ - to hurry)."
      },
      {
        "option": "きゅう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 急行 (きゅうこう)."
      },
      {
        "option": "はや",
        "isCorrect": false,
        "reasoning": "This is the reading for 早 (early), not 急."
      },
      {
        "option": "そく",
        "isCorrect": false,
        "reasoning": "This is not a reading of 急."
      }
    ],
    "englishTranslation": "Since I was likely to be late for the meeting, I hurried toward the company."
  },
  {
    "id": 138,
    "kanji": "昔",
    "sentence": "昔のことを*思*い出すと、懐かしい気持ちになります。",
    "options": [
      "おも",
      "し",
      "かんが",
      "おぼ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おも",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 思 is used in 思い出す (おもいだす - to remember)."
      },
      {
        "option": "し",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 思想 (しそう)."
      },
      {
        "option": "かんが",
        "isCorrect": false,
        "reasoning": "This is the reading for 考 (consider), not 思."
      },
      {
        "option": "おぼ",
        "isCorrect": false,
        "reasoning": "This relates to おぼ.す but is not the correct reading here."
      }
    ],
    "englishTranslation": "When I remember things from long ago, I get a nostalgic feeling."
  },
  {
    "id": 139,
    "kanji": "母",
    "sentence": "母が手料理を*作*ってくれるのは、いつも嬉しいです。",
    "options": [
      "つく",
      "さく",
      "さ",
      "づく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "つく",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 作 is used in 作る (つくる - to make)."
      },
      {
        "option": "さく",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 作品 (さくひん)."
      },
      {
        "option": "さ",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "づく",
        "isCorrect": false,
        "reasoning": "This is used in compound forms but not the main reading."
      }
    ],
    "englishTranslation": "I'm always happy when my mother makes home-cooked meals for me."
  },
  {
    "id": 140,
    "kanji": "窓",
    "sentence": "窓を開けたら、気持ちいい*風*が入ってきました。",
    "options": [
      "かぜ",
      "ふう",
      "ふ",
      "かじ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かぜ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 風 means \"wind\" in everyday contexts."
      },
      {
        "option": "ふう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 台風 (たいふう)."
      },
      {
        "option": "ふ",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "かじ",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "When I opened the window, a pleasant breeze came in."
  },
  {
    "id": 141,
    "kanji": "こ",
    "sentence": "この服の*色*は少し暗すぎると思いませんか。",
    "options": [
      "いろ",
      "しょく",
      "しき",
      "いり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いろ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 色 means \"color\" in everyday contexts."
      },
      {
        "option": "しょく",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 色彩 (しきさい)."
      },
      {
        "option": "しき",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading used in some compounds."
      },
      {
        "option": "いり",
        "isCorrect": false,
        "reasoning": "This is not a reading of 色."
      }
    ],
    "englishTranslation": "Don't you think this clothing's color is a bit too dark?"
  },
  {
    "id": 142,
    "kanji": "友",
    "sentence": "友達と過ごした時間がとても*楽*しかったので、また会いたいです。",
    "options": [
      "たの",
      "がく",
      "らく",
      "ごう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "たの",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 楽 is used in 楽しい (たのしい - fun/enjoyable)."
      },
      {
        "option": "がく",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading when 楽 means \"music\" as in 音楽 (おんがく)."
      },
      {
        "option": "らく",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading when 楽 means \"easy/comfortable\" as in 楽な (らくな)."
      },
      {
        "option": "ごう",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      }
    ],
    "englishTranslation": "The time I spent with my friend was very enjoyable, so I want to meet again."
  },
  {
    "id": 143,
    "kanji": "去",
    "sentence": "去年の*夏*は暑くて、毎日プールに行っていました。",
    "options": [
      "なつ",
      "か",
      "が",
      "かつ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "なつ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 夏 means \"summer\" in everyday contexts."
      },
      {
        "option": "か",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 夏期 (かき)."
      },
      {
        "option": "が",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      },
      {
        "option": "かつ",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "Last summer was hot, and I was going to the pool every day."
  },
  {
    "id": 144,
    "kanji": "小",
    "sentence": "小さい時に飼っていた犬が*死*んでしまって、とても悲しかったです。",
    "options": [
      "し",
      "だい",
      "せい",
      "で"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "し",
        "isCorrect": true,
        "reasoning": "This is the reading when 死 is used in 死ぬ (しぬ - to die)."
      },
      {
        "option": "だい",
        "isCorrect": false,
        "reasoning": "This is not a reading of 死."
      },
      {
        "option": "せい",
        "isCorrect": false,
        "reasoning": "This is not a reading of 死."
      },
      {
        "option": "で",
        "isCorrect": false,
        "reasoning": "This is not a reading of 死."
      }
    ],
    "englishTranslation": "The dog I kept when I was small died, and I was very sad."
  },
  {
    "id": 145,
    "kanji": "こ",
    "sentence": "このペンは書きやすくて、よく*使*っています。",
    "options": [
      "つか",
      "し",
      "づか",
      "すか"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "つか",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 使 is used in 使う (つかう - to use)."
      },
      {
        "option": "し",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 使用 (しよう)."
      },
      {
        "option": "づか",
        "isCorrect": false,
        "reasoning": "This is a variation used in compounds but not the main reading."
      },
      {
        "option": "すか",
        "isCorrect": false,
        "reasoning": "This is not a reading of 使."
      }
    ],
    "englishTranslation": "This pen is easy to write with, and I use it often."
  },
  {
    "id": 146,
    "kanji": "今",
    "sentence": "今年の*冬*は雪が多くて、車の運転が大変でした。",
    "options": [
      "ふゆ",
      "とう",
      "ふう",
      "とお"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ふゆ",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 冬 means \"winter\" in everyday contexts."
      },
      {
        "option": "とう",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 冬期 (とうき)."
      },
      {
        "option": "ふう",
        "isCorrect": false,
        "reasoning": "This is not a reading of 冬."
      },
      {
        "option": "とお",
        "isCorrect": false,
        "reasoning": "This is not a reading of 冬."
      }
    ],
    "englishTranslation": "This year's winter had a lot of snow, and driving was difficult."
  },
  {
    "id": 147,
    "kanji": "駅",
    "sentence": "駅への*方*向が分からなくて、道に迷いました。",
    "options": [
      "ほう",
      "かた",
      "がた",
      "むき"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ほう",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 方 is used in 方向 (ほうこう - direction)."
      },
      {
        "option": "かた",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading when 方 means \"person\" or \"way.\""
      },
      {
        "option": "がた",
        "isCorrect": false,
        "reasoning": "This is a variation of かた used in compounds."
      },
      {
        "option": "むき",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "I didn't know the direction to the station and got lost."
  },
  {
    "id": 148,
    "kanji": "彼",
    "sentence": "彼の*意*見に賛成できませんでした。",
    "options": [
      "い",
      "おも",
      "かんが",
      "こころ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "い",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 意 is used in 意見 (いけん - opinion)."
      },
      {
        "option": "おも",
        "isCorrect": false,
        "reasoning": "This is the reading for 思 (think), not 意."
      },
      {
        "option": "かんが",
        "isCorrect": false,
        "reasoning": "This is the reading for 考 (consider), not 意."
      },
      {
        "option": "こころ",
        "isCorrect": false,
        "reasoning": "This is the reading for 心 (heart), not 意."
      }
    ],
    "englishTranslation": "I couldn't agree with his opinion."
  },
  {
    "id": 149,
    "kanji": "新",
    "sentence": "新しい*服*を買いに、デパートに行きました。",
    "options": [
      "ふく",
      "はく",
      "きる",
      "よう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ふく",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 服 means \"clothing\" in everyday contexts."
      },
      {
        "option": "はく",
        "isCorrect": false,
        "reasoning": "This is not a reading of 服."
      },
      {
        "option": "きる",
        "isCorrect": false,
        "reasoning": "This is the reading for 着る (to wear), not 服."
      },
      {
        "option": "よう",
        "isCorrect": false,
        "reasoning": "This is not a reading of 服."
      }
    ],
    "englishTranslation": "I went to the department store to buy new clothes."
  },
  {
    "id": 150,
    "kanji": "来",
    "sentence": "来週の*会*議の準備をしています。",
    "options": [
      "かい",
      "え",
      "あ",
      "かつ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かい",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 会 is used in 会議 (かいぎ - meeting)."
      },
      {
        "option": "え",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "あ",
        "isCorrect": false,
        "reasoning": "This relates to あ.う but not used in compounds."
      },
      {
        "option": "かつ",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "I'm preparing for next week's meeting."
  },
  {
    "id": 151,
    "kanji": "こ",
    "sentence": "この*文*章の意味が分かりません。",
    "options": [
      "ぶん",
      "もん",
      "ふみ",
      "あや"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ぶん",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 文 is used in 文章 (ぶんしょう - sentence/text)."
      },
      {
        "option": "もん",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "ふみ",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading but not used in compounds."
      },
      {
        "option": "あや",
        "isCorrect": false,
        "reasoning": "This is an alternative kun'yomi reading."
      }
    ],
    "englishTranslation": "I don't understand the meaning of this sentence."
  },
  {
    "id": 152,
    "kanji": "毎",
    "sentence": "毎朝六時に*起*きて、散歩をしています。",
    "options": [
      "お",
      "き",
      "こ",
      "た"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "お",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 起 is used in 起きる (おきる - to get up)."
      },
      {
        "option": "き",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 起立 (きりつ)."
      },
      {
        "option": "こ",
        "isCorrect": false,
        "reasoning": "This relates to お.こる but not the correct reading here."
      },
      {
        "option": "た",
        "isCorrect": false,
        "reasoning": "This relates to た.つ but not the main reading."
      }
    ],
    "englishTranslation": "I get up at six o'clock every morning and take a walk."
  },
  {
    "id": 153,
    "kanji": "電",
    "sentence": "電車の*代*金が高くなりました。",
    "options": [
      "だい",
      "たい",
      "か",
      "しろ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "だい",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 代 is used in 代金 (だいきん - fee/charge)."
      },
      {
        "option": "たい",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "か",
        "isCorrect": false,
        "reasoning": "This relates to か.わる but not used in compounds."
      },
      {
        "option": "しろ",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "The train fare has become expensive."
  },
  {
    "id": 154,
    "kanji": "数",
    "sentence": "数学の*理*論が難しくて理解できません。",
    "options": [
      "り",
      "ことわり",
      "ただ",
      "みち"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "り",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 理 is used in 理論 (りろん - theory)."
      },
      {
        "option": "ことわり",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading but not used in compounds."
      },
      {
        "option": "ただ",
        "isCorrect": false,
        "reasoning": "This is not a reading of 理."
      },
      {
        "option": "みち",
        "isCorrect": false,
        "reasoning": "This is the reading for 道 (road), not 理."
      }
    ],
    "englishTranslation": "The mathematical theory is difficult and I can't understand it."
  },
  {
    "id": 155,
    "kanji": "今",
    "sentence": "今日の気温は三十*度*まで上がりました。",
    "options": [
      "ど",
      "と",
      "たび",
      "たく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ど",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 度 means \"degrees\" in temperature measurement."
      },
      {
        "option": "と",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used for temperature."
      },
      {
        "option": "たび",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading meaning \"times/occasions.\""
      },
      {
        "option": "たく",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading."
      }
    ],
    "englishTranslation": "Today's temperature rose to thirty degrees."
  },
  {
    "id": 156,
    "kanji": "朝",
    "sentence": "朝*飯*を食べる時間がありませんでした。",
    "options": [
      "はん",
      "めし",
      "ごはん",
      "しょく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "はん",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 飯 is used in 朝飯 (あさはん - breakfast)."
      },
      {
        "option": "めし",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading for standalone 飯 but not in this compound."
      },
      {
        "option": "ごはん",
        "isCorrect": false,
        "reasoning": "This is a separate word (ご飯), not the reading for 飯 in compounds."
      },
      {
        "option": "しょく",
        "isCorrect": false,
        "reasoning": "This is the reading for 食, not 飯."
      }
    ],
    "englishTranslation": "I didn't have time to eat breakfast."
  },
  {
    "id": 157,
    "kanji": "*",
    "sentence": "*図*書館で勉強する予定です。",
    "options": [
      "ず",
      "と",
      "え",
      "としょ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ず",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 図 is used in 図書館 (としょかん - library)."
      },
      {
        "option": "と",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "え",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading but not used in this compound."
      },
      {
        "option": "としょ",
        "isCorrect": false,
        "reasoning": "This is not the correct reading in this context."
      }
    ],
    "englishTranslation": "I plan to study at the library."
  },
  {
    "id": 158,
    "kanji": "こ",
    "sentence": "この会社の*主*な事業は何ですか。",
    "options": [
      "おも",
      "しゅ",
      "ぬし",
      "あるじ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おも",
        "isCorrect": true,
        "reasoning": "This is the kun'yomi reading when 主 is used in 主な (おもな - main/principal)."
      },
      {
        "option": "しゅ",
        "isCorrect": false,
        "reasoning": "This is the on'yomi reading used in compounds like 主人 (しゅじん)."
      },
      {
        "option": "ぬし",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading when 主 means \"owner\" but not used here."
      },
      {
        "option": "あるじ",
        "isCorrect": false,
        "reasoning": "This is an alternative kun'yomi reading."
      }
    ],
    "englishTranslation": "What is the main business of this company?"
  },
  {
    "id": 159,
    "kanji": "駅",
    "sentence": "駅の改札*口*で友達と待ち合わせをしました。",
    "options": [
      "こう",
      "く",
      "くち",
      "ぐち"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こう",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 口 is used in 改札口 (かいさつぐち - ticket gate)."
      },
      {
        "option": "く",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "くち",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading when 口 means \"mouth\" but not used in compounds."
      },
      {
        "option": "ぐち",
        "isCorrect": false,
        "reasoning": "This is a voiced variation but not the correct reading here."
      }
    ],
    "englishTranslation": "I met up with a friend at the station ticket gate."
  },
  {
    "id": 160,
    "kanji": "今",
    "sentence": "今日の夕食は*牛*肉料理にしました。",
    "options": [
      "ぎゅう",
      "うし",
      "ぎゅ",
      "ぎん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ぎゅう",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 牛 is used in 牛肉 (ぎゅうにく - beef)."
      },
      {
        "option": "うし",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading when 牛 means \"cow\" as an animal."
      },
      {
        "option": "ぎゅ",
        "isCorrect": false,
        "reasoning": "This is an incomplete reading."
      },
      {
        "option": "ぎん",
        "isCorrect": false,
        "reasoning": "This is not a reading of 牛."
      }
    ],
    "englishTranslation": "I made beef dishes for today's dinner."
  },
  {
    "id": 161,
    "kanji": "彼",
    "sentence": "彼は卒*業*後、大きな会社に就職しました。",
    "options": [
      "ぎょう",
      "ごう",
      "わざ",
      "ぎょ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ぎょう",
        "isCorrect": true,
        "reasoning": "This is the on'yomi reading when 業 is used in 卒業 (そつぎょう - graduation)."
      },
      {
        "option": "ごう",
        "isCorrect": false,
        "reasoning": "This is an alternative on'yomi reading but not used in this compound."
      },
      {
        "option": "わざ",
        "isCorrect": false,
        "reasoning": "This is the kun'yomi reading but not used in this compound."
      },
      {
        "option": "ぎょ",
        "isCorrect": false,
        "reasoning": "This is an incomplete reading."
      }
    ],
    "englishTranslation": "After graduation, he got a job at a big company."
  },
  {
    "id": 162,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "そぼ",
      "そば",
      "おばあさん",
      "ばあば"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "そぼ",
        "isCorrect": true,
        "reasoning": "* **そぼ (1) - CORRECT:** This is the standard reading for 祖母 (grandmother)."
      },
      {
        "option": "そば",
        "isCorrect": true,
        "reasoning": "* **そば (2) - INCORRECT:** Wrong vowel sound. Uses ば instead of ぼ."
      },
      {
        "option": "おばあさん",
        "isCorrect": true,
        "reasoning": "* **おばあさん (3) - INCORRECT:** This is a different word for grandmother, not the reading of 祖母."
      },
      {
        "option": "ばあば",
        "isCorrect": true,
        "reasoning": "* **ばあば (4) - INCORRECT:** This is informal for grandmother, not the reading of 祖母."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 163,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "むし",
      "ちゅう",
      "きゅう",
      "ぶし"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "むし",
        "isCorrect": true,
        "reasoning": "* **むし (1) - CORRECT:** This is the standard reading for 虫 (insect)."
      },
      {
        "option": "ちゅう",
        "isCorrect": true,
        "reasoning": "* **ちゅう (2) - INCORRECT:** Wrong reading. Uses ちゅう instead of むし."
      },
      {
        "option": "きゅう",
        "isCorrect": true,
        "reasoning": "* **きゅう (3) - INCORRECT:** Wrong reading. Uses きゅう instead of むし."
      },
      {
        "option": "ぶし",
        "isCorrect": true,
        "reasoning": "* **ぶし (4) - INCORRECT:** Wrong consonant. Uses ぶ instead of む."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 164,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "うら",
      "りつ",
      "うち",
      "おく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "うら",
        "isCorrect": true,
        "reasoning": "* **うら (1) - CORRECT:** This is the standard reading for 裏 (reverse side/back)."
      },
      {
        "option": "りつ",
        "isCorrect": true,
        "reasoning": "* **りつ (2) - INCORRECT:** Wrong reading. Uses りつ instead of うら."
      },
      {
        "option": "うち",
        "isCorrect": true,
        "reasoning": "* **うち (3) - INCORRECT:** Wrong reading. Uses うち instead of うら."
      },
      {
        "option": "おく",
        "isCorrect": true,
        "reasoning": "* **おく (4) - INCORRECT:** Wrong reading. Uses おく instead of うら."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 165,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "こうつう",
      "こうとう",
      "きょうつう",
      "かうつう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こうつう",
        "isCorrect": true,
        "reasoning": "* **こうつう (1) - CORRECT:** This is the standard reading for 交通 (traffic/transportation)."
      },
      {
        "option": "こうとう",
        "isCorrect": true,
        "reasoning": "* **こうとう (2) - INCORRECT:** Wrong vowel sound. Uses とう instead of つう."
      },
      {
        "option": "きょうつう",
        "isCorrect": true,
        "reasoning": "* **きょうつう (3) - INCORRECT:** Wrong initial sound. Uses きょう instead of こう."
      },
      {
        "option": "かうつう",
        "isCorrect": true,
        "reasoning": "* **かうつう (4) - INCORRECT:** Wrong vowel sound. Uses かう instead of こう."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 166,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ぶんか",
      "ぶんが",
      "もんか",
      "ふんか"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ぶんか",
        "isCorrect": true,
        "reasoning": "* **ぶんか (1) - CORRECT:** This is the standard reading for 文化 (culture)."
      },
      {
        "option": "ぶんが",
        "isCorrect": true,
        "reasoning": "* **ぶんが (2) - INCORRECT:** Wrong consonant sound. Uses が instead of か."
      },
      {
        "option": "もんか",
        "isCorrect": true,
        "reasoning": "* **もんか (3) - INCORRECT:** Wrong vowel sound. Uses もん instead of ぶん."
      },
      {
        "option": "ふんか",
        "isCorrect": true,
        "reasoning": "* **ふんか (4) - INCORRECT:** Wrong consonant sound. Uses ふん instead of ぶん."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 167,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "つたえる",
      "でんえる",
      "つだえる",
      "でんする"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "つたえる",
        "isCorrect": true,
        "reasoning": "* **つたえる (1) - CORRECT:** This is the standard reading for 伝える (to convey/report)."
      },
      {
        "option": "でんえる",
        "isCorrect": true,
        "reasoning": "* **でんえる (2) - INCORRECT:** Wrong reading. Uses でん instead of つた."
      },
      {
        "option": "つだえる",
        "isCorrect": true,
        "reasoning": "* **つだえる (3) - INCORRECT:** Wrong consonant. Uses だ instead of た."
      },
      {
        "option": "でんする",
        "isCorrect": true,
        "reasoning": "* **でんする (4) - INCORRECT:** Wrong reading and ending. Uses でんする instead of つたえる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 168,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "さいしょ",
      "さいはじ",
      "もっとも",
      "はじめ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "さいしょ",
        "isCorrect": true,
        "reasoning": "* **さいしょ (1) - CORRECT:** This is the standard reading for 最初 (beginning/first)."
      },
      {
        "option": "さいはじ",
        "isCorrect": true,
        "reasoning": "* **さいはじ (2) - INCORRECT:** Wrong reading for 初. Uses はじ instead of しょ."
      },
      {
        "option": "もっとも",
        "isCorrect": true,
        "reasoning": "* **もっとも (3) - INCORRECT:** This is the reading for 最も, not 最初."
      },
      {
        "option": "はじめ",
        "isCorrect": true,
        "reasoning": "* **はじめ (4) - INCORRECT:** This is a different word (始め) with similar meaning."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 169,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "とりかえる",
      "とりがえる",
      "しゅりかえる",
      "とりかわる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "とりかえる",
        "isCorrect": true,
        "reasoning": "* **とりかえる (1) - CORRECT:** This is the standard reading for 取り替える (to exchange/replace)."
      },
      {
        "option": "とりがえる",
        "isCorrect": true,
        "reasoning": "* **とりがえる (2) - INCORRECT:** Wrong consonant. Uses が instead of か."
      },
      {
        "option": "しゅりかえる",
        "isCorrect": true,
        "reasoning": "* **しゅりかえる (3) - INCORRECT:** Wrong reading for 取. Uses しゅり instead of とり."
      },
      {
        "option": "とりかわる",
        "isCorrect": true,
        "reasoning": "* **とりかわる (4) - INCORRECT:** Wrong ending. Uses かわる instead of かえる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 170,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かがみ",
      "きょう",
      "かがめ",
      "けい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かがみ",
        "isCorrect": true,
        "reasoning": "* **かがみ (1) - CORRECT:** This is the standard reading for 鏡 (mirror)."
      },
      {
        "option": "きょう",
        "isCorrect": true,
        "reasoning": "* **きょう (2) - INCORRECT:** Wrong reading. Uses きょう instead of かがみ."
      },
      {
        "option": "かがめ",
        "isCorrect": true,
        "reasoning": "* **かがめ (3) - INCORRECT:** Wrong ending vowel. Uses め instead of み."
      },
      {
        "option": "けい",
        "isCorrect": true,
        "reasoning": "* **けい (4) - INCORRECT:** Wrong reading. Uses けい instead of かがみ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 171,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ぬすむ",
      "とうむ",
      "ひろむ",
      "のすむ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ぬすむ",
        "isCorrect": true,
        "reasoning": "* **ぬすむ (1) - CORRECT:** This is the standard reading for 盗む (to steal)."
      },
      {
        "option": "とうむ",
        "isCorrect": true,
        "reasoning": "* **とうむ (2) - INCORRECT:** Wrong reading. Uses とう instead of ぬす."
      },
      {
        "option": "ひろむ",
        "isCorrect": true,
        "reasoning": "* **ひろむ (3) - INCORRECT:** Wrong reading. Uses ひろ instead of ぬす."
      },
      {
        "option": "のすむ",
        "isCorrect": true,
        "reasoning": "* **のすむ (4) - INCORRECT:** Wrong consonant. Uses の instead of ぬ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 172,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "まんなか",
      "しんなか",
      "まなか",
      "まんちゅう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "まんなか",
        "isCorrect": true,
        "reasoning": "* **まんなか (1) - CORRECT:** This is the standard reading for 真ん中 (middle)."
      },
      {
        "option": "しんなか",
        "isCorrect": true,
        "reasoning": "* **しんなか (2) - INCORRECT:** Wrong reading for 真. Uses しん instead of まん."
      },
      {
        "option": "まなか",
        "isCorrect": true,
        "reasoning": "* **まなか (3) - INCORRECT:** Missing ん sound. Uses まなか instead of まんなか."
      },
      {
        "option": "まんちゅう",
        "isCorrect": true,
        "reasoning": "* **まんちゅう (4) - INCORRECT:** Wrong reading for 中. Uses ちゅう instead of なか."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 173,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "なおす",
      "ちょくす",
      "ただす",
      "なほす"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "なおす",
        "isCorrect": true,
        "reasoning": "* **なおす (1) - CORRECT:** This is the standard reading for 直す (to fix/repair)."
      },
      {
        "option": "ちょくす",
        "isCorrect": true,
        "reasoning": "* **ちょくす (2) - INCORRECT:** Wrong reading. Uses ちょく instead of なお."
      },
      {
        "option": "ただす",
        "isCorrect": true,
        "reasoning": "* **ただす (3) - INCORRECT:** This is the reading for 正す (to correct), not 直す."
      },
      {
        "option": "なほす",
        "isCorrect": true,
        "reasoning": "* **なほす (4) - INCORRECT:** Old kana usage. Modern Japanese uses なおす."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 174,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かんごふ",
      "かんごぶ",
      "みまもりふ",
      "けんごふ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かんごふ",
        "isCorrect": true,
        "reasoning": "* **かんごふ (1) - CORRECT:** This is the standard reading for 看護婦 (female nurse)."
      },
      {
        "option": "かんごぶ",
        "isCorrect": true,
        "reasoning": "* **かんごぶ (2) - INCORRECT:** Wrong consonant. Uses ぶ instead of ふ."
      },
      {
        "option": "みまもりふ",
        "isCorrect": true,
        "reasoning": "* **みまもりふ (3) - INCORRECT:** Wrong reading for 看護. Uses みまもり instead of かんご."
      },
      {
        "option": "けんごふ",
        "isCorrect": true,
        "reasoning": "* **けんごふ (4) - INCORRECT:** Wrong vowel sound. Uses けん instead of かん."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 175,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "いちど",
      "ひとたび",
      "いちたび",
      "いっど"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いちど",
        "isCorrect": true,
        "reasoning": "* **いちど (1) - CORRECT:** This is the standard reading for 一度 (once)."
      },
      {
        "option": "ひとたび",
        "isCorrect": true,
        "reasoning": "* **ひとたび (2) - INCORRECT:** This is an alternative word (一旦) meaning \"once/temporarily\"."
      },
      {
        "option": "いちたび",
        "isCorrect": true,
        "reasoning": "* **いちたび (3) - INCORRECT:** Wrong reading for 度. Uses たび instead of ど."
      },
      {
        "option": "いっど",
        "isCorrect": true,
        "reasoning": "* **いっど (4) - INCORRECT:** Wrong pronunciation. Uses っ instead of ち."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 176,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かなしい",
      "ひしい",
      "かのしい",
      "ばなしい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かなしい",
        "isCorrect": true,
        "reasoning": "* **かなしい (1) - CORRECT:** This is the standard reading for 悲しい (sad)."
      },
      {
        "option": "ひしい",
        "isCorrect": true,
        "reasoning": "* **ひしい (2) - INCORRECT:** Wrong reading. Uses ひ instead of かな."
      },
      {
        "option": "かのしい",
        "isCorrect": true,
        "reasoning": "* **かのしい (3) - INCORRECT:** Wrong vowel sound. Uses の instead of な."
      },
      {
        "option": "ばなしい",
        "isCorrect": true,
        "reasoning": "* **ばなしい (4) - INCORRECT:** Wrong consonant. Uses ば instead of か."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 177,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "じむしょ",
      "ことむしょ",
      "じぎょうしょ",
      "じむじょ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "じむしょ",
        "isCorrect": true,
        "reasoning": "* **じむしょ (1) - CORRECT:** This is the standard reading for 事務所 (office)."
      },
      {
        "option": "ことむしょ",
        "isCorrect": true,
        "reasoning": "* **ことむしょ (2) - INCORRECT:** Wrong reading for 事. Uses こと instead of じ."
      },
      {
        "option": "じぎょうしょ",
        "isCorrect": true,
        "reasoning": "* **じぎょうしょ (3) - INCORRECT:** Wrong reading for 務. Uses ぎょう instead of む."
      },
      {
        "option": "じむじょ",
        "isCorrect": true,
        "reasoning": "* **じむじょ (4) - INCORRECT:** Wrong reading for 所. Uses じょ instead of しょ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 178,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かねもち",
      "きんもち",
      "おかねもち",
      "かねもつ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かねもち",
        "isCorrect": true,
        "reasoning": "* **かねもち (1) - CORRECT:** This is the standard reading for 金持ち (rich person)."
      },
      {
        "option": "きんもち",
        "isCorrect": true,
        "reasoning": "* **きんもち (2) - INCORRECT:** Wrong reading for 金. Uses きん instead of かね."
      },
      {
        "option": "おかねもち",
        "isCorrect": true,
        "reasoning": "* **おかねもち (3) - INCORRECT:** Adds お prefix which is not part of the kanji reading."
      },
      {
        "option": "かねもつ",
        "isCorrect": true,
        "reasoning": "* **かねもつ (4) - INCORRECT:** Wrong ending. Uses もつ instead of もち."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 179,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "じゅうしょ",
      "すみしょ",
      "じゅうどころ",
      "すまいしょ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "じゅうしょ",
        "isCorrect": true,
        "reasoning": "* **じゅうしょ (1) - CORRECT:** This is the standard reading for 住所 (address/residence)."
      },
      {
        "option": "すみしょ",
        "isCorrect": true,
        "reasoning": "* **すみしょ (2) - INCORRECT:** Wrong reading for 住. Uses すみ instead of じゅう."
      },
      {
        "option": "じゅうどころ",
        "isCorrect": true,
        "reasoning": "* **じゅうどころ (3) - INCORRECT:** Wrong reading for 所. Uses どころ instead of しょ."
      },
      {
        "option": "すまいしょ",
        "isCorrect": true,
        "reasoning": "* **すまいしょ (4) - INCORRECT:** Wrong reading for 住. Uses すまい instead of じゅう."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 180,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ふむ",
      "とむ",
      "ふみ",
      "どむ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ふむ",
        "isCorrect": true,
        "reasoning": "* **ふむ (1) - CORRECT:** This is the standard reading for 踏む (to step on)."
      },
      {
        "option": "とむ",
        "isCorrect": true,
        "reasoning": "* **とむ (2) - INCORRECT:** Wrong consonant. Uses と instead of ふ."
      },
      {
        "option": "ふみ",
        "isCorrect": true,
        "reasoning": "* **ふみ (3) - INCORRECT:** Wrong ending vowel. Uses み instead of む."
      },
      {
        "option": "どむ",
        "isCorrect": true,
        "reasoning": "* **どむ (4) - INCORRECT:** Wrong consonant. Uses ど instead of ふ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 181,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "なおす",
      "ちょくす",
      "ただす",
      "すなお"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "なおす",
        "isCorrect": true,
        "reasoning": "* **なおす (1) - CORRECT:** This is the standard reading for 直す (to fix/correct)."
      },
      {
        "option": "ちょくす",
        "isCorrect": true,
        "reasoning": "* **ちょくす (2) - INCORRECT:** Wrong reading. Uses ちょく instead of なお."
      },
      {
        "option": "ただす",
        "isCorrect": true,
        "reasoning": "* **ただす (3) - INCORRECT:** This is the reading for 正す (to correct), not 直す."
      },
      {
        "option": "すなお",
        "isCorrect": true,
        "reasoning": "* **すなお (4) - INCORRECT:** This is the reading for 素直 (honest), not 直す."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 182,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "なくなる",
      "むくなる",
      "ぶくなる",
      "なくなり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "なくなる",
        "isCorrect": true,
        "reasoning": "* **なくなる (1) - CORRECT:** This is the standard reading for 無くなる (to disappear/get lost)."
      },
      {
        "option": "むくなる",
        "isCorrect": true,
        "reasoning": "* **むくなる (2) - INCORRECT:** Wrong reading for 無. Uses む instead of な."
      },
      {
        "option": "ぶくなる",
        "isCorrect": true,
        "reasoning": "* **ぶくなる (3) - INCORRECT:** Wrong reading for 無. Uses ぶ instead of な."
      },
      {
        "option": "なくなり",
        "isCorrect": true,
        "reasoning": "* **なくなり (4) - INCORRECT:** Wrong verb ending. Uses り instead of る."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 183,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しま",
      "とう",
      "じま",
      "しめ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しま",
        "isCorrect": true,
        "reasoning": "* **しま (1) - CORRECT:** This is the standard reading for 島 (island)."
      },
      {
        "option": "とう",
        "isCorrect": true,
        "reasoning": "* **とう (2) - INCORRECT:** Wrong reading. Uses とう instead of しま."
      },
      {
        "option": "じま",
        "isCorrect": true,
        "reasoning": "* **じま (3) - INCORRECT:** Wrong consonant. Uses じ instead of し."
      },
      {
        "option": "しめ",
        "isCorrect": true,
        "reasoning": "* **しめ (4) - INCORRECT:** Wrong ending vowel. Uses め instead of ま."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 184,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "くも",
      "うん",
      "ぐも",
      "くろ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "くも",
        "isCorrect": true,
        "reasoning": "* **くも (1) - CORRECT:** This is the standard reading for 雲 (cloud)."
      },
      {
        "option": "うん",
        "isCorrect": true,
        "reasoning": "* **うん (2) - INCORRECT:** Wrong reading. Uses うん instead of くも."
      },
      {
        "option": "ぐも",
        "isCorrect": true,
        "reasoning": "* **ぐも (3) - INCORRECT:** Wrong consonant. Uses ぐ instead of く."
      },
      {
        "option": "くろ",
        "isCorrect": true,
        "reasoning": "* **くろ (4) - INCORRECT:** Wrong reading. Uses くろ instead of くも."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 185,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "たおれる",
      "とうれる",
      "たおられる",
      "だおれる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "たおれる",
        "isCorrect": true,
        "reasoning": "* **たおれる (1) - CORRECT:** This is the standard reading for 倒れる (to fall down/collapse)."
      },
      {
        "option": "とうれる",
        "isCorrect": true,
        "reasoning": "* **とうれる (2) - INCORRECT:** Wrong reading. Uses とう instead of たお."
      },
      {
        "option": "たおられる",
        "isCorrect": true,
        "reasoning": "* **たおられる (3) - INCORRECT:** Wrong form. Adds passive られる ending."
      },
      {
        "option": "だおれる",
        "isCorrect": true,
        "reasoning": "* **だおれる (4) - INCORRECT:** Wrong consonant. Uses だ instead of た."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 186,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かいわ",
      "あいわ",
      "かいばなし",
      "えわ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かいわ",
        "isCorrect": true,
        "reasoning": "* **かいわ (1) - CORRECT:** This is the standard reading for 会話 (conversation)."
      },
      {
        "option": "あいわ",
        "isCorrect": true,
        "reasoning": "* **あいわ (2) - INCORRECT:** Wrong reading for 会. Uses あい instead of かい."
      },
      {
        "option": "かいばなし",
        "isCorrect": true,
        "reasoning": "* **かいばなし (3) - INCORRECT:** Wrong reading for 話. Uses ばなし instead of わ."
      },
      {
        "option": "えわ",
        "isCorrect": true,
        "reasoning": "* **えわ (4) - INCORRECT:** Wrong reading for 会. Uses え instead of かい."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 187,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "なさる",
      "なする",
      "さなる",
      "なざる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "なさる",
        "isCorrect": true,
        "reasoning": "* **なさる (1) - CORRECT:** This is the respectful form meaning \"to do.\""
      },
      {
        "option": "なする",
        "isCorrect": true,
        "reasoning": "* **なする (2) - INCORRECT:** Wrong vowel sound. Uses する instead of さる."
      },
      {
        "option": "さなる",
        "isCorrect": true,
        "reasoning": "* **さなる (3) - INCORRECT:** Wrong order. Uses さな instead of なさ."
      },
      {
        "option": "なざる",
        "isCorrect": true,
        "reasoning": "* **なざる (4) - INCORRECT:** Wrong consonant. Uses ざ instead of さ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 188,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かのじょ",
      "ひじょ",
      "かれじょ",
      "かのおんな"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かのじょ",
        "isCorrect": true,
        "reasoning": "* **かのじょ (1) - CORRECT:** This is the standard reading for 彼女 (she/girlfriend)."
      },
      {
        "option": "ひじょ",
        "isCorrect": true,
        "reasoning": "* **ひじょ (2) - INCORRECT:** Wrong reading for 彼. Uses ひ instead of かの."
      },
      {
        "option": "かれじょ",
        "isCorrect": true,
        "reasoning": "* **かれじょ (3) - INCORRECT:** Wrong reading for 彼. Uses かれ instead of かの."
      },
      {
        "option": "かのおんな",
        "isCorrect": true,
        "reasoning": "* **かのおんな (4) - INCORRECT:** Wrong reading for 女. Uses おんな instead of じょ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 189,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かざる",
      "しょくる",
      "かさる",
      "そうる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かざる",
        "isCorrect": true,
        "reasoning": "* **かざる (1) - CORRECT:** This is the standard reading for 飾る (to decorate)."
      },
      {
        "option": "しょくる",
        "isCorrect": true,
        "reasoning": "* **しょくる (2) - INCORRECT:** Wrong reading. Uses しょく instead of かざ."
      },
      {
        "option": "かさる",
        "isCorrect": true,
        "reasoning": "* **かさる (3) - INCORRECT:** Wrong consonant. Uses さ instead of ざ."
      },
      {
        "option": "そうる",
        "isCorrect": true,
        "reasoning": "* **そうる (4) - INCORRECT:** Wrong reading. Uses そう instead of かざ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 190,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "あがる",
      "のぼる",
      "うえる",
      "じょうる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "あがる",
        "isCorrect": true,
        "reasoning": "* **あがる (1) - CORRECT:** This is the standard reading for 上る (to rise) in this context."
      },
      {
        "option": "のぼる",
        "isCorrect": true,
        "reasoning": "* **のぼる (2) - INCORRECT:** While のぼる is also a reading for 上る, あがる is more common for sun rising."
      },
      {
        "option": "うえる",
        "isCorrect": true,
        "reasoning": "* **うえる (3) - INCORRECT:** Wrong reading. Uses うえ instead of あが."
      },
      {
        "option": "じょうる",
        "isCorrect": true,
        "reasoning": "* **じょうる (4) - INCORRECT:** Wrong reading. Uses じょう instead of あが."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 191,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "きぬ",
      "けん",
      "きん",
      "ぎぬ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "きぬ",
        "isCorrect": true,
        "reasoning": "* **きぬ (1) - CORRECT:** This is the standard reading for 絹 (silk)."
      },
      {
        "option": "けん",
        "isCorrect": true,
        "reasoning": "* **けん (2) - INCORRECT:** Wrong reading. Uses けん instead of きぬ."
      },
      {
        "option": "きん",
        "isCorrect": true,
        "reasoning": "* **きん (3) - INCORRECT:** Wrong reading. Uses きん instead of きぬ."
      },
      {
        "option": "ぎぬ",
        "isCorrect": true,
        "reasoning": "* **ぎぬ (4) - INCORRECT:** Wrong consonant. Uses ぎ instead of き."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 192,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "あう",
      "がう",
      "こう",
      "ごう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "あう",
        "isCorrect": true,
        "reasoning": "* **あう (1) - CORRECT:** This is the standard reading for 合う (to match/suit)."
      },
      {
        "option": "がう",
        "isCorrect": true,
        "reasoning": "* **がう (2) - INCORRECT:** Wrong consonant. Uses が instead of あ."
      },
      {
        "option": "こう",
        "isCorrect": true,
        "reasoning": "* **こう (3) - INCORRECT:** Wrong reading. Uses こう instead of あう."
      },
      {
        "option": "ごう",
        "isCorrect": true,
        "reasoning": "* **ごう (4) - INCORRECT:** Wrong reading. Uses ごう instead of あう."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 193,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ひきだし",
      "いんしゅつ",
      "ひっぱりだし",
      "いんだし"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ひきだし",
        "isCorrect": true,
        "reasoning": "* **ひきだし (1) - CORRECT:** This is the standard reading for 引き出し (drawer)."
      },
      {
        "option": "いんしゅつ",
        "isCorrect": true,
        "reasoning": "* **いんしゅつ (2) - INCORRECT:** Wrong on'yomi reading. Uses いん・しゅつ instead of ひき・だし."
      },
      {
        "option": "ひっぱりだし",
        "isCorrect": true,
        "reasoning": "* **ひっぱりだし (3) - INCORRECT:** Too long. Uses ひっぱり instead of ひき."
      },
      {
        "option": "いんだし",
        "isCorrect": true,
        "reasoning": "* **いんだし (4) - INCORRECT:** Mixed reading. Uses いん instead of ひき."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 194,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "つづく",
      "ぞくく",
      "つずく",
      "そくく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "つづく",
        "isCorrect": true,
        "reasoning": "* **つづく (1) - CORRECT:** This is the standard reading for 続く (to continue)."
      },
      {
        "option": "ぞくく",
        "isCorrect": true,
        "reasoning": "* **ぞくく (2) - INCORRECT:** Wrong reading. Uses ぞく instead of つづ."
      },
      {
        "option": "つずく",
        "isCorrect": true,
        "reasoning": "* **つずく (3) - INCORRECT:** Wrong consonant. Uses ず instead of づ."
      },
      {
        "option": "そくく",
        "isCorrect": true,
        "reasoning": "* **そくく (4) - INCORRECT:** Wrong reading. Uses そく instead of つづ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 195,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "みつかる",
      "けんつかる",
      "みあたる",
      "みえる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "みつかる",
        "isCorrect": true,
        "reasoning": "* **みつかる (1) - CORRECT:** This is the standard reading for 見つかる (to be found)."
      },
      {
        "option": "けんつかる",
        "isCorrect": true,
        "reasoning": "* **けんつかる (2) - INCORRECT:** Wrong reading for 見. Uses けん instead of み."
      },
      {
        "option": "みあたる",
        "isCorrect": true,
        "reasoning": "* **みあたる (3) - INCORRECT:** Wrong reading. Uses あたる instead of つかる."
      },
      {
        "option": "みえる",
        "isCorrect": true,
        "reasoning": "* **みえる (4) - INCORRECT:** Wrong word. This is 見える (to be visible), not 見つかる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 196,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ベル",
      "ペル",
      "ヘル",
      "メル"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ベル",
        "isCorrect": true,
        "reasoning": "* **ベル (1) - CORRECT:** This is the standard katakana for bell."
      },
      {
        "option": "ペル",
        "isCorrect": true,
        "reasoning": "* **ペル (2) - INCORRECT:** Wrong consonant. Uses ペ instead of ベ."
      },
      {
        "option": "ヘル",
        "isCorrect": true,
        "reasoning": "* **ヘル (3) - INCORRECT:** Wrong consonant. Uses ヘ instead of ベ."
      },
      {
        "option": "メル",
        "isCorrect": true,
        "reasoning": "* **メル (4) - INCORRECT:** Wrong consonant. Uses メ instead of ベ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 197,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "どうぐ",
      "みちぐ",
      "どうき",
      "みちき"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "どうぐ",
        "isCorrect": true,
        "reasoning": "* **どうぐ (1) - CORRECT:** This is the standard reading for 道具 (tool)."
      },
      {
        "option": "みちぐ",
        "isCorrect": true,
        "reasoning": "* **みちぐ (2) - INCORRECT:** Wrong reading for 道. Uses みち instead of どう."
      },
      {
        "option": "どうき",
        "isCorrect": true,
        "reasoning": "* **どうき (3) - INCORRECT:** Wrong reading for 具. Uses き instead of ぐ."
      },
      {
        "option": "みちき",
        "isCorrect": true,
        "reasoning": "* **みちき (4) - INCORRECT:** Wrong readings for both kanji. Uses みち・き instead of どう・ぐ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 198,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "いない",
      "いうち",
      "ない",
      "うち"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いない",
        "isCorrect": true,
        "reasoning": "* **いない (1) - CORRECT:** This is the standard reading for 以内 (within)."
      },
      {
        "option": "いうち",
        "isCorrect": true,
        "reasoning": "* **いうち (2) - INCORRECT:** Wrong reading for 内. Uses うち instead of ない."
      },
      {
        "option": "ない",
        "isCorrect": true,
        "reasoning": "* **ない (3) - INCORRECT:** Missing the 以 reading. Only reads 内."
      },
      {
        "option": "うち",
        "isCorrect": true,
        "reasoning": "* **うち (4) - INCORRECT:** Wrong reading for both kanji. Uses うち instead of いない."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 199,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ふつう",
      "ふどう",
      "ほつう",
      "ほどう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ふつう",
        "isCorrect": true,
        "reasoning": "* **ふつう (1) - CORRECT:** This is the standard reading for 普通 (usual/normal)."
      },
      {
        "option": "ふどう",
        "isCorrect": true,
        "reasoning": "* **ふどう (2) - INCORRECT:** Wrong reading for 通. Uses どう instead of つう."
      },
      {
        "option": "ほつう",
        "isCorrect": true,
        "reasoning": "* **ほつう (3) - INCORRECT:** Wrong reading for 普. Uses ほ instead of ふ."
      },
      {
        "option": "ほどう",
        "isCorrect": true,
        "reasoning": "* **ほどう (4) - INCORRECT:** Wrong readings for both kanji. Uses ほ・どう instead of ふ・つう."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 200,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "なく",
      "きゅう",
      "なき",
      "きく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "なく",
        "isCorrect": true,
        "reasoning": "* **なく (1) - CORRECT:** This is the standard reading for 泣く (to cry)."
      },
      {
        "option": "きゅう",
        "isCorrect": true,
        "reasoning": "* **きゅう (2) - INCORRECT:** Wrong on'yomi reading. Uses きゅう instead of なく."
      },
      {
        "option": "なき",
        "isCorrect": true,
        "reasoning": "* **なき (3) - INCORRECT:** Wrong ending. Uses き instead of く."
      },
      {
        "option": "きく",
        "isCorrect": true,
        "reasoning": "* **きく (4) - INCORRECT:** Wrong reading. Uses きく instead of なく."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 201,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かえる",
      "へんる",
      "かわる",
      "へんえる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かえる",
        "isCorrect": true,
        "reasoning": "* **かえる (1) - CORRECT:** This is the standard reading for 変える (to change - transitive)."
      },
      {
        "option": "へんる",
        "isCorrect": true,
        "reasoning": "* **へんる (2) - INCORRECT:** Wrong reading. Uses へん instead of かえ."
      },
      {
        "option": "かわる",
        "isCorrect": true,
        "reasoning": "* **かわる (3) - INCORRECT:** This is 変わる (to change - intransitive), not 変える."
      },
      {
        "option": "へんえる",
        "isCorrect": true,
        "reasoning": "* **へんえる (4) - INCORRECT:** Wrong reading. Uses へん instead of か."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 202,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ねぼう",
      "しんぼう",
      "ねぼ",
      "みんぼう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ねぼう",
        "isCorrect": true,
        "reasoning": "* **ねぼう (1) - CORRECT:** This is the standard reading for 寝坊 (oversleeping)."
      },
      {
        "option": "しんぼう",
        "isCorrect": true,
        "reasoning": "* **しんぼう (2) - INCORRECT:** Wrong reading for 寝. Uses しん instead of ね."
      },
      {
        "option": "ねぼ",
        "isCorrect": true,
        "reasoning": "* **ねぼ (3) - INCORRECT:** Incomplete reading. Missing ぼう ending."
      },
      {
        "option": "みんぼう",
        "isCorrect": true,
        "reasoning": "* **みんぼう (4) - INCORRECT:** Wrong reading for 寝. Uses みん instead of ね."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 203,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ゆにゅう",
      "しゅにゅう",
      "ゆうにゅう",
      "いりゅう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ゆにゅう",
        "isCorrect": true,
        "reasoning": "* **ゆにゅう (1) - CORRECT:** This is the standard reading for 輸入 (import)."
      },
      {
        "option": "しゅにゅう",
        "isCorrect": true,
        "reasoning": "* **しゅにゅう (2) - INCORRECT:** Wrong reading for 輸. Uses しゅ instead of ゆ."
      },
      {
        "option": "ゆうにゅう",
        "isCorrect": true,
        "reasoning": "* **ゆうにゅう (3) - INCORRECT:** Wrong reading for 輸. Uses ゆう instead of ゆ."
      },
      {
        "option": "いりゅう",
        "isCorrect": true,
        "reasoning": "* **いりゅう (4) - INCORRECT:** Wrong readings for both kanji. Uses いりゅう instead of ゆにゅう."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 204,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "くれる",
      "ごれる",
      "くる",
      "これる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "くれる",
        "isCorrect": true,
        "reasoning": "* **くれる (1) - CORRECT:** This is the standard reading for 呉れる (to give to me)."
      },
      {
        "option": "ごれる",
        "isCorrect": true,
        "reasoning": "* **ごれる (2) - INCORRECT:** Wrong consonant. Uses ご instead of く."
      },
      {
        "option": "くる",
        "isCorrect": true,
        "reasoning": "* **くる (3) - INCORRECT:** Incomplete reading. Missing れる ending."
      },
      {
        "option": "これる",
        "isCorrect": true,
        "reasoning": "* **これる (4) - INCORRECT:** Wrong vowel. Uses こ instead of く."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 205,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かっこう",
      "かくこう",
      "がっこう",
      "かくよし"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かっこう",
        "isCorrect": true,
        "reasoning": "* **かっこう (1) - CORRECT:** This is the standard reading for 格好 (appearance/outfit)."
      },
      {
        "option": "かくこう",
        "isCorrect": true,
        "reasoning": "* **かくこう (2) - INCORRECT:** Wrong reading for 格. Uses かく instead of かっ."
      },
      {
        "option": "がっこう",
        "isCorrect": true,
        "reasoning": "* **がっこう (3) - INCORRECT:** This is 学校 (school), not 格好."
      },
      {
        "option": "かくよし",
        "isCorrect": true,
        "reasoning": "* **かくよし (4) - INCORRECT:** Wrong reading for 好. Uses よし instead of こう."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 206,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "てきとう",
      "てきあて",
      "せきとう",
      "てきどう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "てきとう",
        "isCorrect": true,
        "reasoning": "* **てきとう (1) - CORRECT:** This is the standard reading for 適当 (appropriate/suitable)."
      },
      {
        "option": "てきあて",
        "isCorrect": true,
        "reasoning": "* **てきあて (2) - INCORRECT:** Wrong reading for 当. Uses あて instead of とう."
      },
      {
        "option": "せきとう",
        "isCorrect": true,
        "reasoning": "* **せきとう (3) - INCORRECT:** Wrong reading for 適. Uses せき instead of てき."
      },
      {
        "option": "てきどう",
        "isCorrect": true,
        "reasoning": "* **てきどう (4) - INCORRECT:** Wrong reading for 当. Uses どう instead of とう."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 207,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ひっこす",
      "いんこす",
      "ひきこす",
      "ひっえつ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ひっこす",
        "isCorrect": true,
        "reasoning": "* **ひっこす (1) - CORRECT:** This is the standard reading for 引っ越す (to move house)."
      },
      {
        "option": "いんこす",
        "isCorrect": true,
        "reasoning": "* **いんこす (2) - INCORRECT:** Wrong reading for 引. Uses いん instead of ひっ."
      },
      {
        "option": "ひきこす",
        "isCorrect": true,
        "reasoning": "* **ひきこす (3) - INCORRECT:** Wrong reading for 引. Uses ひき instead of ひっ."
      },
      {
        "option": "ひっえつ",
        "isCorrect": true,
        "reasoning": "* **ひっえつ (4) - INCORRECT:** Wrong reading for 越. Uses えつ instead of こす."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 208,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "もし",
      "もじ",
      "まし",
      "もち"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "もし",
        "isCorrect": true,
        "reasoning": "* **もし (1) - CORRECT:** This is the standard reading for もし (if)."
      },
      {
        "option": "もじ",
        "isCorrect": true,
        "reasoning": "* **もじ (2) - INCORRECT:** Wrong consonant. Uses じ instead of し."
      },
      {
        "option": "まし",
        "isCorrect": true,
        "reasoning": "* **まし (3) - INCORRECT:** Wrong vowel. Uses ま instead of も."
      },
      {
        "option": "もち",
        "isCorrect": true,
        "reasoning": "* **もち (4) - INCORRECT:** Wrong consonant. Uses ち instead of し."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 209,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "コンピューター",
      "コンピュータ",
      "コンピュウター",
      "コンビューター"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "コンピューター",
        "isCorrect": true,
        "reasoning": "* **コンピューター (1) - CORRECT:** This is the standard katakana for computer."
      },
      {
        "option": "コンピュータ",
        "isCorrect": true,
        "reasoning": "* **コンピュータ (2) - INCORRECT:** Missing the long vowel mark. Uses コンピュータ instead of コンピューター."
      },
      {
        "option": "コンピュウター",
        "isCorrect": true,
        "reasoning": "* **コンピュウター (3) - INCORRECT:** Wrong vowel. Uses ウ instead of ュー."
      },
      {
        "option": "コンビューター",
        "isCorrect": true,
        "reasoning": "* **コンビューター (4) - INCORRECT:** Wrong consonant. Uses ンビ instead of ンピ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 210,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "そう",
      "さう",
      "そお",
      "すう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "そう",
        "isCorrect": true,
        "reasoning": "* **そう (1) - CORRECT:** This is the standard reading for そう (so/that way)."
      },
      {
        "option": "さう",
        "isCorrect": true,
        "reasoning": "* **さう (2) - INCORRECT:** Wrong vowel. Uses さ instead of そ."
      },
      {
        "option": "そお",
        "isCorrect": true,
        "reasoning": "* **そお (3) - INCORRECT:** Wrong long vowel. Uses お instead of う."
      },
      {
        "option": "すう",
        "isCorrect": true,
        "reasoning": "* **すう (4) - INCORRECT:** Wrong vowel. Uses す instead of そ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 211,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "けれど",
      "けれと",
      "げれど",
      "けれろ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "けれど",
        "isCorrect": true,
        "reasoning": "* **けれど (1) - CORRECT:** This is the standard reading for けれど (but/however)."
      },
      {
        "option": "けれと",
        "isCorrect": true,
        "reasoning": "* **けれと (2) - INCORRECT:** Wrong consonant. Uses と instead of ど."
      },
      {
        "option": "げれど",
        "isCorrect": true,
        "reasoning": "* **げれど (3) - INCORRECT:** Wrong consonant. Uses げ instead of け."
      },
      {
        "option": "けれろ",
        "isCorrect": true,
        "reasoning": "* **けれろ (4) - INCORRECT:** Wrong consonant. Uses ろ instead of ど."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 212,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しょうたい",
      "しょうだい",
      "まねたい",
      "しょうまち"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しょうたい",
        "isCorrect": true,
        "reasoning": "* **しょうたい (1) - CORRECT:** This is the standard reading for 招待 (invitation)."
      },
      {
        "option": "しょうだい",
        "isCorrect": true,
        "reasoning": "* **しょうだい (2) - INCORRECT:** Wrong reading for 待. Uses だい instead of たい."
      },
      {
        "option": "まねたい",
        "isCorrect": true,
        "reasoning": "* **まねたい (3) - INCORRECT:** Wrong reading for 招. Uses まね instead of しょう."
      },
      {
        "option": "しょうまち",
        "isCorrect": true,
        "reasoning": "* **しょうまち (4) - INCORRECT:** Wrong reading for 待. Uses まち instead of たい."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 213,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かたい",
      "こうい",
      "かわい",
      "がたい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かたい",
        "isCorrect": true,
        "reasoning": "* **かたい (1) - CORRECT:** This is the standard reading for 硬い (hard)."
      },
      {
        "option": "こうい",
        "isCorrect": true,
        "reasoning": "* **こうい (2) - INCORRECT:** Wrong on'yomi reading. Uses こう instead of かた."
      },
      {
        "option": "かわい",
        "isCorrect": true,
        "reasoning": "* **かわい (3) - INCORRECT:** Wrong reading. Uses かわ instead of かた."
      },
      {
        "option": "がたい",
        "isCorrect": true,
        "reasoning": "* **がたい (4) - INCORRECT:** Wrong consonant. Uses が instead of か."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 214,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "パソコン",
      "パスコン",
      "バソコン",
      "パソゴン"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "パソコン",
        "isCorrect": true,
        "reasoning": "* **パソコン (1) - CORRECT:** This is the standard katakana for personal computer."
      },
      {
        "option": "パスコン",
        "isCorrect": true,
        "reasoning": "* **パスコン (2) - INCORRECT:** Wrong consonant. Uses ス instead of ソ."
      },
      {
        "option": "バソコン",
        "isCorrect": true,
        "reasoning": "* **バソコン (3) - INCORRECT:** Wrong consonant. Uses バ instead of パ."
      },
      {
        "option": "パソゴン",
        "isCorrect": true,
        "reasoning": "* **パソゴン (4) - INCORRECT:** Wrong consonant. Uses ゴ instead of コ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 215,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "でんとう",
      "でんどう",
      "でんひ",
      "でんとお"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "でんとう",
        "isCorrect": true,
        "reasoning": "* **でんとう (1) - CORRECT:** This is the standard reading for 電灯 (electric light)."
      },
      {
        "option": "でんどう",
        "isCorrect": true,
        "reasoning": "* **でんどう (2) - INCORRECT:** Wrong reading for 灯. Uses どう instead of とう."
      },
      {
        "option": "でんひ",
        "isCorrect": true,
        "reasoning": "* **でんひ (3) - INCORRECT:** Wrong reading for 灯. Uses ひ instead of とう."
      },
      {
        "option": "でんとお",
        "isCorrect": true,
        "reasoning": "* **でんとお (4) - INCORRECT:** Wrong long vowel. Uses とお instead of とう."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 216,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "くださる",
      "ください",
      "くだする",
      "くれる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "くださる",
        "isCorrect": true,
        "reasoning": "* **くださる (1) - CORRECT:** This is the respectful form of くれる (to give to me)."
      },
      {
        "option": "ください",
        "isCorrect": true,
        "reasoning": "* **ください (2) - INCORRECT:** This is the imperative form, not the verb stem."
      },
      {
        "option": "くだする",
        "isCorrect": true,
        "reasoning": "* **くだする (3) - INCORRECT:** Wrong ending. Uses する instead of さる."
      },
      {
        "option": "くれる",
        "isCorrect": true,
        "reasoning": "* **くれる (4) - INCORRECT:** This is the plain form, not the respectful くださる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 217,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "よごれる",
      "けがれる",
      "よこれる",
      "きたなれる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "よごれる",
        "isCorrect": true,
        "reasoning": "* **よごれる (1) - CORRECT:** This is the standard reading for 汚れる (to get dirty)."
      },
      {
        "option": "けがれる",
        "isCorrect": true,
        "reasoning": "* **けがれる (2) - INCORRECT:** Wrong reading. Uses けが instead of よご."
      },
      {
        "option": "よこれる",
        "isCorrect": true,
        "reasoning": "* **よこれる (3) - INCORRECT:** Wrong consonant. Uses こ instead of ご."
      },
      {
        "option": "きたなれる",
        "isCorrect": true,
        "reasoning": "* **きたなれる (4) - INCORRECT:** Wrong reading. Uses きたな instead of よご."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 218,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しょうち",
      "しょうじ",
      "じょうち",
      "しょうし"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しょうち",
        "isCorrect": true,
        "reasoning": "* **しょうち (1) - CORRECT:** This is the standard reading for 承知 (acknowledgment/consent)."
      },
      {
        "option": "しょうじ",
        "isCorrect": true,
        "reasoning": "* **しょうじ (2) - INCORRECT:** Wrong reading for 知. Uses じ instead of ち."
      },
      {
        "option": "じょうち",
        "isCorrect": true,
        "reasoning": "* **じょうち (3) - INCORRECT:** Wrong reading for 承. Uses じょう instead of しょう."
      },
      {
        "option": "しょうし",
        "isCorrect": true,
        "reasoning": "* **しょうし (4) - INCORRECT:** Wrong reading for 知. Uses し instead of ち."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 219,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "パート",
      "バート",
      "ハート",
      "パーツ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "パート",
        "isCorrect": true,
        "reasoning": "* **パート (1) - CORRECT:** This is the standard katakana for part-time work."
      },
      {
        "option": "バート",
        "isCorrect": true,
        "reasoning": "* **バート (2) - INCORRECT:** Wrong consonant. Uses バ instead of パ."
      },
      {
        "option": "ハート",
        "isCorrect": true,
        "reasoning": "* **ハート (3) - INCORRECT:** Wrong consonant. Uses ハ instead of パ."
      },
      {
        "option": "パーツ",
        "isCorrect": true,
        "reasoning": "* **パーツ (4) - INCORRECT:** Wrong ending. Uses ツ instead of ト."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 220,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "と",
      "みやこ",
      "つ",
      "ど"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "と",
        "isCorrect": true,
        "reasoning": "* **と (1) - CORRECT:** This is the standard reading for 都 in 東京都 (Tokyo Metropolitan)."
      },
      {
        "option": "みやこ",
        "isCorrect": true,
        "reasoning": "* **みやこ (2) - INCORRECT:** This reading is used when 都 means \"capital city,\" not in compound words."
      },
      {
        "option": "つ",
        "isCorrect": true,
        "reasoning": "* **つ (3) - INCORRECT:** Wrong reading. Uses つ instead of と."
      },
      {
        "option": "ど",
        "isCorrect": true,
        "reasoning": "* **ど (4) - INCORRECT:** Wrong consonant. Uses ど instead of と."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 221,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "もらう",
      "もろう",
      "もらお",
      "もりう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "もらう",
        "isCorrect": true,
        "reasoning": "* **もらう (1) - CORRECT:** This is the standard reading for もらう (to receive)."
      },
      {
        "option": "もろう",
        "isCorrect": true,
        "reasoning": "* **もろう (2) - INCORRECT:** Wrong vowel. Uses ろ instead of ら."
      },
      {
        "option": "もらお",
        "isCorrect": true,
        "reasoning": "* **もらお (3) - INCORRECT:** Wrong ending. Uses お instead of う."
      },
      {
        "option": "もりう",
        "isCorrect": true,
        "reasoning": "* **もりう (4) - INCORRECT:** Wrong vowel. Uses り instead of ら."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 222,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ようじ",
      "ようこと",
      "もちじ",
      "ようし"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ようじ",
        "isCorrect": true,
        "reasoning": "* **ようじ (1) - CORRECT:** This is the standard reading for 用事 (business/errand)."
      },
      {
        "option": "ようこと",
        "isCorrect": true,
        "reasoning": "* **ようこと (2) - INCORRECT:** Wrong reading for 事. Uses こと instead of じ."
      },
      {
        "option": "もちじ",
        "isCorrect": true,
        "reasoning": "* **もちじ (3) - INCORRECT:** Wrong reading for 用. Uses もち instead of よう."
      },
      {
        "option": "ようし",
        "isCorrect": true,
        "reasoning": "* **ようし (4) - INCORRECT:** Wrong reading for 事. Uses し instead of じ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 223,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かたい",
      "こい",
      "がたい",
      "かだい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かたい",
        "isCorrect": true,
        "reasoning": "* **かたい (1) - CORRECT:** This is the standard reading for 固い (hard/firm)."
      },
      {
        "option": "こい",
        "isCorrect": true,
        "reasoning": "* **こい (2) - INCORRECT:** Wrong reading. Uses こ instead of かた."
      },
      {
        "option": "がたい",
        "isCorrect": true,
        "reasoning": "* **がたい (3) - INCORRECT:** Wrong consonant. Uses が instead of か."
      },
      {
        "option": "かだい",
        "isCorrect": true,
        "reasoning": "* **かだい (4) - INCORRECT:** Wrong consonant. Uses だ instead of た."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 224,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "すばらしい",
      "すばらちい",
      "すばらじい",
      "すばらない"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "すばらしい",
        "isCorrect": true,
        "reasoning": "* **すばらしい (1) - CORRECT:** This is the standard reading for すばらしい (wonderful)."
      },
      {
        "option": "すばらちい",
        "isCorrect": true,
        "reasoning": "* **すばらちい (2) - INCORRECT:** Wrong consonant. Uses ち instead of し."
      },
      {
        "option": "すばらじい",
        "isCorrect": true,
        "reasoning": "* **すばらじい (3) - INCORRECT:** Wrong consonant. Uses じ instead of し."
      },
      {
        "option": "すばらない",
        "isCorrect": true,
        "reasoning": "* **すばらない (4) - INCORRECT:** Wrong ending. Uses ない instead of しい."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 225,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ばしょ",
      "じょうしょ",
      "ばじょ",
      "ばところ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ばしょ",
        "isCorrect": true,
        "reasoning": "* **ばしょ (1) - CORRECT:** This is the standard reading for 場所 (place/location)."
      },
      {
        "option": "じょうしょ",
        "isCorrect": true,
        "reasoning": "* **じょうしょ (2) - INCORRECT:** Wrong on'yomi reading. Uses じょう・しょ instead of ば・しょ."
      },
      {
        "option": "ばじょ",
        "isCorrect": true,
        "reasoning": "* **ばじょ (3) - INCORRECT:** Wrong reading for 所. Uses じょ instead of しょ."
      },
      {
        "option": "ばところ",
        "isCorrect": true,
        "reasoning": "* **ばところ (4) - INCORRECT:** Wrong reading for 所. Uses ところ instead of しょ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 226,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かわり",
      "だいわり",
      "かえり",
      "しろがわり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かわり",
        "isCorrect": true,
        "reasoning": "* **かわり (1) - CORRECT:** This is the standard reading for 代わり (substitute/in place of)."
      },
      {
        "option": "だいわり",
        "isCorrect": true,
        "reasoning": "* **だいわり (2) - INCORRECT:** Wrong on'yomi reading. Uses だい instead of か."
      },
      {
        "option": "かえり",
        "isCorrect": true,
        "reasoning": "* **かえり (3) - INCORRECT:** Wrong reading. Uses かえ instead of かわ."
      },
      {
        "option": "しろがわり",
        "isCorrect": true,
        "reasoning": "* **しろがわり (4) - INCORRECT:** Wrong reading for 代. Uses しろ instead of か."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 227,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しゅっせき",
      "でせき",
      "しゅつせき",
      "でざ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しゅっせき",
        "isCorrect": true,
        "reasoning": "* **しゅっせき (1) - CORRECT:** This is the standard reading for 出席 (attendance)."
      },
      {
        "option": "でせき",
        "isCorrect": true,
        "reasoning": "* **でせき (2) - INCORRECT:** Wrong reading for 出. Uses で instead of しゅっ."
      },
      {
        "option": "しゅつせき",
        "isCorrect": true,
        "reasoning": "* **しゅつせき (3) - INCORRECT:** Wrong reading for 出. Uses しゅつ instead of しゅっ."
      },
      {
        "option": "でざ",
        "isCorrect": true,
        "reasoning": "* **でざ (4) - INCORRECT:** Wrong readings for both kanji. Uses で・ざ instead of しゅっ・せき."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 228,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "うで",
      "かいな",
      "わん",
      "ひじ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "うで",
        "isCorrect": true,
        "reasoning": "* **うで (1) - CORRECT:** This is the standard reading for 腕 (arm)."
      },
      {
        "option": "かいな",
        "isCorrect": true,
        "reasoning": "* **かいな (2) - INCORRECT:** This is an archaic reading for arm, not standard modern usage."
      },
      {
        "option": "わん",
        "isCorrect": true,
        "reasoning": "* **わん (3) - INCORRECT:** Wrong on'yomi reading. Uses わん instead of うで."
      },
      {
        "option": "ひじ",
        "isCorrect": true,
        "reasoning": "* **ひじ (4) - INCORRECT:** This refers to elbow (肘), not arm (腕)."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 229,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "やわらかい",
      "じゅうらかい",
      "やからかい",
      "にゅうらかい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "やわらかい",
        "isCorrect": true,
        "reasoning": "* **やわらかい (1) - CORRECT:** This is the standard reading for 柔らかい (soft)."
      },
      {
        "option": "じゅうらかい",
        "isCorrect": true,
        "reasoning": "* **じゅうらかい (2) - INCORRECT:** Wrong reading for 柔. Uses じゅう instead of やわ."
      },
      {
        "option": "やからかい",
        "isCorrect": true,
        "reasoning": "* **やからかい (3) - INCORRECT:** Wrong consonant. Uses か instead of わ."
      },
      {
        "option": "にゅうらかい",
        "isCorrect": true,
        "reasoning": "* **にゅうらかい (4) - INCORRECT:** Wrong reading for 柔. Uses にゅう instead of やわ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 230,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "もちろん",
      "もちらん",
      "もじろん",
      "もちるん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "もちろん",
        "isCorrect": true,
        "reasoning": "* **もちろん (1) - CORRECT:** This is the standard reading for もちろん (of course)."
      },
      {
        "option": "もちらん",
        "isCorrect": true,
        "reasoning": "* **もちらん (2) - INCORRECT:** Wrong vowel. Uses ら instead of ろ."
      },
      {
        "option": "もじろん",
        "isCorrect": true,
        "reasoning": "* **もじろん (3) - INCORRECT:** Wrong consonant. Uses じ instead of ち."
      },
      {
        "option": "もちるん",
        "isCorrect": true,
        "reasoning": "* **もちるん (4) - INCORRECT:** Wrong vowel. Uses る instead of ろ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 231,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ひらく",
      "かいく",
      "あく",
      "ひらき"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ひらく",
        "isCorrect": true,
        "reasoning": "* **ひらく (1) - CORRECT:** This is the standard reading for 開く when meaning \"to hold/open an event.\""
      },
      {
        "option": "かいく",
        "isCorrect": true,
        "reasoning": "* **かいく (2) - INCORRECT:** Wrong on'yomi reading. Uses かい instead of ひら."
      },
      {
        "option": "あく",
        "isCorrect": true,
        "reasoning": "* **あく (3) - INCORRECT:** This reading means \"to open\" (intransitive), not \"to hold an event.\""
      },
      {
        "option": "ひらき",
        "isCorrect": true,
        "reasoning": "* **ひらき (4) - INCORRECT:** Wrong ending. Uses き instead of く."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 232,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "くび",
      "しゅ",
      "こうべ",
      "くぶ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "くび",
        "isCorrect": true,
        "reasoning": "* **くび (1) - CORRECT:** This is the standard reading for 首 (neck)."
      },
      {
        "option": "しゅ",
        "isCorrect": true,
        "reasoning": "* **しゅ (2) - INCORRECT:** Wrong on'yomi reading. Uses しゅ instead of くび."
      },
      {
        "option": "こうべ",
        "isCorrect": true,
        "reasoning": "* **こうべ (3) - INCORRECT:** This is an archaic reading meaning \"head,\" not modern usage."
      },
      {
        "option": "くぶ",
        "isCorrect": true,
        "reasoning": "* **くぶ (4) - INCORRECT:** Wrong consonant. Uses ぶ instead of び."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 233,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "くん",
      "きみ",
      "ぐん",
      "くに"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "くん",
        "isCorrect": true,
        "reasoning": "* **くん (1) - CORRECT:** This is the standard reading for 君 as a suffix for young males."
      },
      {
        "option": "きみ",
        "isCorrect": true,
        "reasoning": "* **きみ (2) - INCORRECT:** This reading means \"you\" when 君 is used as a pronoun, not as a suffix."
      },
      {
        "option": "ぐん",
        "isCorrect": true,
        "reasoning": "* **ぐん (3) - INCORRECT:** Wrong consonant. Uses ぐ instead of く."
      },
      {
        "option": "くに",
        "isCorrect": true,
        "reasoning": "* **くに (4) - INCORRECT:** This is the reading for 国 (country), not 君."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 234,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "みな",
      "みんな",
      "かい",
      "みなさん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "みな",
        "isCorrect": true,
        "reasoning": "* **みな (1) - CORRECT:** This is the standard reading for 皆 (everyone/all)."
      },
      {
        "option": "みんな",
        "isCorrect": true,
        "reasoning": "* **みんな (2) - INCORRECT:** This is written in hiragana, not the kanji reading."
      },
      {
        "option": "かい",
        "isCorrect": true,
        "reasoning": "* **かい (3) - INCORRECT:** Wrong on'yomi reading. Uses かい instead of みな."
      },
      {
        "option": "みなさん",
        "isCorrect": true,
        "reasoning": "* **みなさん (4) - INCORRECT:** This adds さん which is not part of the kanji 皆."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 235,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しあい",
      "しごう",
      "ためし",
      "しけん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しあい",
        "isCorrect": true,
        "reasoning": "* **しあい (1) - CORRECT:** This is the standard reading for 試合 (match/game)."
      },
      {
        "option": "しごう",
        "isCorrect": true,
        "reasoning": "* **しごう (2) - INCORRECT:** Wrong reading for 合. Uses ごう instead of あい."
      },
      {
        "option": "ためし",
        "isCorrect": true,
        "reasoning": "* **ためし (3) - INCORRECT:** This is the reading for 試 alone, not 試合."
      },
      {
        "option": "しけん",
        "isCorrect": true,
        "reasoning": "* **しけん (4) - INCORRECT:** This is 試験 (test/exam), not 試合."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 236,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "つかまえる",
      "とらまえる",
      "ほまえる",
      "つかめる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "つかまえる",
        "isCorrect": true,
        "reasoning": "* **つかまえる (1) - CORRECT:** This is the standard reading for 捕まえる (to catch/seize)."
      },
      {
        "option": "とらまえる",
        "isCorrect": true,
        "reasoning": "* **とらまえる (2) - INCORRECT:** Wrong reading for 捕. Uses とら instead of つか."
      },
      {
        "option": "ほまえる",
        "isCorrect": true,
        "reasoning": "* **ほまえる (3) - INCORRECT:** Wrong reading for 捕. Uses ほ instead of つか."
      },
      {
        "option": "つかめる",
        "isCorrect": true,
        "reasoning": "* **つかめる (4) - INCORRECT:** This is 掴める (to be able to grasp), not 捕まえる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 237,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "もうしあげる",
      "もうしのぼる",
      "しんしあげる",
      "もうしかみる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "もうしあげる",
        "isCorrect": true,
        "reasoning": "* **もうしあげる (1) - CORRECT:** This is the standard reading for 申し上げる (humble form of \"to say\")."
      },
      {
        "option": "もうしのぼる",
        "isCorrect": true,
        "reasoning": "* **もうしのぼる (2) - INCORRECT:** Wrong reading for 上. Uses のぼる instead of あげる."
      },
      {
        "option": "しんしあげる",
        "isCorrect": true,
        "reasoning": "* **しんしあげる (3) - INCORRECT:** Wrong reading for 申. Uses しん instead of もう."
      },
      {
        "option": "もうしかみる",
        "isCorrect": true,
        "reasoning": "* **もうしかみる (4) - INCORRECT:** Wrong reading for 上. Uses かみる instead of あげる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 238,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ぜひ",
      "ぜい",
      "ぜび",
      "せひ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ぜひ",
        "isCorrect": true,
        "reasoning": "* **ぜひ (1) - CORRECT:** This is the standard reading for ぜひ (by all means/definitely)."
      },
      {
        "option": "ぜい",
        "isCorrect": true,
        "reasoning": "* **ぜい (2) - INCORRECT:** Wrong ending. Uses い instead of ひ."
      },
      {
        "option": "ぜび",
        "isCorrect": true,
        "reasoning": "* **ぜび (3) - INCORRECT:** Wrong consonant. Uses び instead of ひ."
      },
      {
        "option": "せひ",
        "isCorrect": true,
        "reasoning": "* **せひ (4) - INCORRECT:** Wrong consonant. Uses せ instead of ぜ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 239,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おしいれ",
      "おしはいり",
      "おしにゅう",
      "おしいり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おしいれ",
        "isCorrect": true,
        "reasoning": "* **おしいれ (1) - CORRECT:** This is the standard reading for 押し入れ (closet)."
      },
      {
        "option": "おしはいり",
        "isCorrect": true,
        "reasoning": "* **おしはいり (2) - INCORRECT:** Wrong reading for 入. Uses はいり instead of いれ."
      },
      {
        "option": "おしにゅう",
        "isCorrect": true,
        "reasoning": "* **おしにゅう (3) - INCORRECT:** Wrong reading for 入. Uses にゅう instead of いれ."
      },
      {
        "option": "おしいり",
        "isCorrect": true,
        "reasoning": "* **おしいり (4) - INCORRECT:** Missing れ ending. Uses いり instead of いれ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 240,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ちゅうい",
      "ちゅうこころ",
      "そそぎい",
      "ちゅうおもい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ちゅうい",
        "isCorrect": true,
        "reasoning": "* **ちゅうい (1) - CORRECT:** This is the standard reading for 注意 (attention/caution)."
      },
      {
        "option": "ちゅうこころ",
        "isCorrect": true,
        "reasoning": "* **ちゅうこころ (2) - INCORRECT:** Wrong reading for 意. Uses こころ instead of い."
      },
      {
        "option": "そそぎい",
        "isCorrect": true,
        "reasoning": "* **そそぎい (3) - INCORRECT:** Wrong reading for 注. Uses そそぎ instead of ちゅう."
      },
      {
        "option": "ちゅうおもい",
        "isCorrect": true,
        "reasoning": "* **ちゅうおもい (4) - INCORRECT:** Wrong reading for 意. Uses おもい instead of い."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 241,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "アフリカ",
      "アフリガ",
      "アブリカ",
      "アフリキ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "アフリカ",
        "isCorrect": true,
        "reasoning": "* **アフリカ (1) - CORRECT:** This is the standard katakana for Africa."
      },
      {
        "option": "アフリガ",
        "isCorrect": true,
        "reasoning": "* **アフリガ (2) - INCORRECT:** Wrong consonant. Uses ガ instead of カ."
      },
      {
        "option": "アブリカ",
        "isCorrect": true,
        "reasoning": "* **アブリカ (3) - INCORRECT:** Wrong consonant. Uses ブ instead of フ."
      },
      {
        "option": "アフリキ",
        "isCorrect": true,
        "reasoning": "* **アフリキ (4) - INCORRECT:** Wrong ending. Uses キ instead of カ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 242,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "やはり",
      "やばり",
      "やかり",
      "やわり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "やはり",
        "isCorrect": true,
        "reasoning": "* **やはり (1) - CORRECT:** This is the standard reading for やはり (as I thought/after all)."
      },
      {
        "option": "やばり",
        "isCorrect": true,
        "reasoning": "* **やばり (2) - INCORRECT:** Wrong consonant. Uses ば instead of は."
      },
      {
        "option": "やかり",
        "isCorrect": true,
        "reasoning": "* **やかり (3) - INCORRECT:** Wrong consonant. Uses か instead of は."
      },
      {
        "option": "やわり",
        "isCorrect": true,
        "reasoning": "* **やわり (4) - INCORRECT:** Wrong consonant. Uses わ instead of は."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 243,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "なる",
      "めいる",
      "なき",
      "ないる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "なる",
        "isCorrect": true,
        "reasoning": "* **なる (1) - CORRECT:** This is the standard reading for 鳴る (to ring/sound)."
      },
      {
        "option": "めいる",
        "isCorrect": true,
        "reasoning": "* **めいる (2) - INCORRECT:** Wrong on'yomi reading. Uses めい instead of な."
      },
      {
        "option": "なき",
        "isCorrect": true,
        "reasoning": "* **なき (3) - INCORRECT:** Wrong ending. Uses き instead of る."
      },
      {
        "option": "ないる",
        "isCorrect": true,
        "reasoning": "* **ないる (4) - INCORRECT:** Wrong vowel. Uses ない instead of な."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 244,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "とおく",
      "えんく",
      "とうく",
      "とおき"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "とおく",
        "isCorrect": true,
        "reasoning": "* **とおく (1) - CORRECT:** This is the standard reading for 遠く (far/distant)."
      },
      {
        "option": "えんく",
        "isCorrect": true,
        "reasoning": "* **えんく (2) - INCORRECT:** Wrong on'yomi reading. Uses えん instead of とお."
      },
      {
        "option": "とうく",
        "isCorrect": true,
        "reasoning": "* **とうく (3) - INCORRECT:** Wrong vowel. Uses とう instead of とお."
      },
      {
        "option": "とおき",
        "isCorrect": true,
        "reasoning": "* **とおき (4) - INCORRECT:** Wrong ending. Uses き instead of く."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 245,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "よしゅう",
      "よならい",
      "まえしゅう",
      "よがく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "よしゅう",
        "isCorrect": true,
        "reasoning": "* **よしゅう (1) - CORRECT:** This is the standard reading for 予習 (preparation for lesson)."
      },
      {
        "option": "よならい",
        "isCorrect": true,
        "reasoning": "* **よならい (2) - INCORRECT:** Wrong reading for 習. Uses ならい instead of しゅう."
      },
      {
        "option": "まえしゅう",
        "isCorrect": true,
        "reasoning": "* **まえしゅう (3) - INCORRECT:** Wrong reading for 予. Uses まえ instead of よ."
      },
      {
        "option": "よがく",
        "isCorrect": true,
        "reasoning": "* **よがく (4) - INCORRECT:** Wrong reading for 習. Uses がく instead of しゅう."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 246,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かみ",
      "はつ",
      "がみ",
      "けみ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かみ",
        "isCorrect": true,
        "reasoning": "* **かみ (1) - CORRECT:** This is the standard reading for 髪 (hair)."
      },
      {
        "option": "はつ",
        "isCorrect": true,
        "reasoning": "* **はつ (2) - INCORRECT:** Wrong on'yomi reading. Uses はつ instead of かみ."
      },
      {
        "option": "がみ",
        "isCorrect": true,
        "reasoning": "* **がみ (3) - INCORRECT:** Wrong consonant. Uses が instead of か."
      },
      {
        "option": "けみ",
        "isCorrect": true,
        "reasoning": "* **けみ (4) - INCORRECT:** Wrong vowel. Uses け instead of か."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 247,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "むすこ",
      "いきこ",
      "そくし",
      "むすめ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "むすこ",
        "isCorrect": true,
        "reasoning": "* **むすこ (1) - CORRECT:** This is the standard reading for 息子 (son)."
      },
      {
        "option": "いきこ",
        "isCorrect": true,
        "reasoning": "* **いきこ (2) - INCORRECT:** Wrong reading for 息. Uses いき instead of むす."
      },
      {
        "option": "そくし",
        "isCorrect": true,
        "reasoning": "* **そくし (3) - INCORRECT:** Wrong on'yomi reading. Uses そく・し instead of むす・こ."
      },
      {
        "option": "むすめ",
        "isCorrect": true,
        "reasoning": "* **むすめ (4) - INCORRECT:** This is 娘 (daughter), not 息子 (son)."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 248,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "やせる",
      "そうせる",
      "やける",
      "こせる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "やせる",
        "isCorrect": true,
        "reasoning": "* **やせる (1) - CORRECT:** This is the standard reading for 痩せる (to become thin)."
      },
      {
        "option": "そうせる",
        "isCorrect": true,
        "reasoning": "* **そうせる (2) - INCORRECT:** Wrong reading for 痩. Uses そう instead of や."
      },
      {
        "option": "やける",
        "isCorrect": true,
        "reasoning": "* **やける (3) - INCORRECT:** Wrong reading. Uses やける instead of やせる."
      },
      {
        "option": "こせる",
        "isCorrect": true,
        "reasoning": "* **こせる (4) - INCORRECT:** Wrong reading for 痩. Uses こ instead of や."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 249,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ゆびわ",
      "しりん",
      "ゆびりん",
      "しわ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ゆびわ",
        "isCorrect": true,
        "reasoning": "* **ゆびわ (1) - CORRECT:** This is the standard reading for 指輪 (ring)."
      },
      {
        "option": "しりん",
        "isCorrect": true,
        "reasoning": "* **しりん (2) - INCORRECT:** Wrong on'yomi reading. Uses し・りん instead of ゆび・わ."
      },
      {
        "option": "ゆびりん",
        "isCorrect": true,
        "reasoning": "* **ゆびりん (3) - INCORRECT:** Wrong reading for 輪. Uses りん instead of わ."
      },
      {
        "option": "しわ",
        "isCorrect": true,
        "reasoning": "* **しわ (4) - INCORRECT:** Wrong reading. Uses しわ instead of ゆびわ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 250,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "とめる",
      "しめる",
      "やめる",
      "どめる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "とめる",
        "isCorrect": true,
        "reasoning": "* **とめる (1) - CORRECT:** This is the standard reading for 止める (to stop something)."
      },
      {
        "option": "しめる",
        "isCorrect": true,
        "reasoning": "* **しめる (2) - INCORRECT:** This is 締める (to tighten), not 止める."
      },
      {
        "option": "やめる",
        "isCorrect": true,
        "reasoning": "* **やめる (3) - INCORRECT:** This is 辞める (to quit), not 止める."
      },
      {
        "option": "どめる",
        "isCorrect": true,
        "reasoning": "* **どめる (4) - INCORRECT:** Wrong consonant. Uses ど instead of と."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 251,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "いけん",
      "いみ",
      "こころみ",
      "いしき"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いけん",
        "isCorrect": true,
        "reasoning": "* **いけん (1) - CORRECT:** This is the standard reading for 意見 (opinion)."
      },
      {
        "option": "いみ",
        "isCorrect": true,
        "reasoning": "* **いみ (2) - INCORRECT:** This is 意味 (meaning), not 意見."
      },
      {
        "option": "こころみ",
        "isCorrect": true,
        "reasoning": "* **こころみ (3) - INCORRECT:** This is 試み (attempt), not 意見."
      },
      {
        "option": "いしき",
        "isCorrect": true,
        "reasoning": "* **いしき (4) - INCORRECT:** This is 意識 (consciousness), not 意見."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 252,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "こんや",
      "いまよる",
      "きんや",
      "こんよる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こんや",
        "isCorrect": true,
        "reasoning": "* **こんや (1) - CORRECT:** This is the standard reading for 今夜 (tonight)."
      },
      {
        "option": "いまよる",
        "isCorrect": true,
        "reasoning": "* **いまよる (2) - INCORRECT:** Wrong reading for both kanji. Uses いま・よる instead of こん・や."
      },
      {
        "option": "きんや",
        "isCorrect": true,
        "reasoning": "* **きんや (3) - INCORRECT:** Wrong reading for 今. Uses きん instead of こん."
      },
      {
        "option": "こんよる",
        "isCorrect": true,
        "reasoning": "* **こんよる (4) - INCORRECT:** Wrong reading for 夜. Uses よる instead of や."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 253,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かれ",
      "ひ",
      "かの",
      "がれ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かれ",
        "isCorrect": true,
        "reasoning": "* **かれ (1) - CORRECT:** This is the standard reading for 彼 (he/boyfriend)."
      },
      {
        "option": "ひ",
        "isCorrect": true,
        "reasoning": "* **ひ (2) - INCORRECT:** Wrong reading. Uses ひ instead of かれ."
      },
      {
        "option": "かの",
        "isCorrect": true,
        "reasoning": "* **かの (3) - INCORRECT:** This reading is used in 彼女 (kanojo), not 彼 alone."
      },
      {
        "option": "がれ",
        "isCorrect": true,
        "reasoning": "* **がれ (4) - INCORRECT:** Wrong consonant. Uses が instead of か."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 254,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ごらんになる",
      "ごらんなる",
      "ごみになる",
      "ごらんする"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ごらんになる",
        "isCorrect": true,
        "reasoning": "* **ごらんになる (1) - CORRECT:** This is the respectful form of 見る (to see)."
      },
      {
        "option": "ごらんなる",
        "isCorrect": true,
        "reasoning": "* **ごらんなる (2) - INCORRECT:** Missing に. Uses ごらんなる instead of ごらんになる."
      },
      {
        "option": "ごみになる",
        "isCorrect": true,
        "reasoning": "* **ごみになる (3) - INCORRECT:** Wrong reading. Uses ごみ instead of ごらん."
      },
      {
        "option": "ごらんする",
        "isCorrect": true,
        "reasoning": "* **ごらんする (4) - INCORRECT:** Wrong ending. Uses する instead of になる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 255,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "さわる",
      "ふれる",
      "しょくる",
      "そくる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "さわる",
        "isCorrect": true,
        "reasoning": "* **さわる (1) - CORRECT:** This is the standard reading for 触る (to touch)."
      },
      {
        "option": "ふれる",
        "isCorrect": true,
        "reasoning": "* **ふれる (2) - INCORRECT:** This is 触れる (to touch lightly), not 触る."
      },
      {
        "option": "しょくる",
        "isCorrect": true,
        "reasoning": "* **しょくる (3) - INCORRECT:** Wrong on'yomi reading. Uses しょく instead of さわ."
      },
      {
        "option": "そくる",
        "isCorrect": true,
        "reasoning": "* **そくる (4) - INCORRECT:** Wrong reading. Uses そく instead of さわ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 256,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "わりあい",
      "かつあい",
      "わりごう",
      "かっこう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "わりあい",
        "isCorrect": true,
        "reasoning": "* **わりあい (1) - CORRECT:** This is the standard reading for 割合 (relatively/rate)."
      },
      {
        "option": "かつあい",
        "isCorrect": true,
        "reasoning": "* **かつあい (2) - INCORRECT:** Wrong reading for 割. Uses かつ instead of わり."
      },
      {
        "option": "わりごう",
        "isCorrect": true,
        "reasoning": "* **わりごう (3) - INCORRECT:** Wrong reading for 合. Uses ごう instead of あい."
      },
      {
        "option": "かっこう",
        "isCorrect": true,
        "reasoning": "* **かっこう (4) - INCORRECT:** This is 格好 (appearance), not 割合."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 257,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ひきだす",
      "いんしゅつ",
      "ひっぱりだす",
      "ひきでる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ひきだす",
        "isCorrect": true,
        "reasoning": "* **ひきだす (1) - CORRECT:** This is the standard reading for 引き出す (to withdraw)."
      },
      {
        "option": "いんしゅつ",
        "isCorrect": true,
        "reasoning": "* **いんしゅつ (2) - INCORRECT:** Wrong on'yomi reading. Uses いん・しゅつ instead of ひき・だす."
      },
      {
        "option": "ひっぱりだす",
        "isCorrect": true,
        "reasoning": "* **ひっぱりだす (3) - INCORRECT:** This is 引っ張り出す (to pull out), not 引き出す."
      },
      {
        "option": "ひきでる",
        "isCorrect": true,
        "reasoning": "* **ひきでる (4) - INCORRECT:** Wrong reading for 出. Uses でる instead of だす."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 258,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おもちゃ",
      "おもじゃ",
      "おもつゃ",
      "おもしゃ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おもちゃ",
        "isCorrect": true,
        "reasoning": "* **おもちゃ (1) - CORRECT:** This is the standard reading for おもちゃ (toy)."
      },
      {
        "option": "おもじゃ",
        "isCorrect": true,
        "reasoning": "* **おもじゃ (2) - INCORRECT:** Wrong consonant. Uses じ instead of ち."
      },
      {
        "option": "おもつゃ",
        "isCorrect": true,
        "reasoning": "* **おもつゃ (3) - INCORRECT:** Wrong consonant. Uses つ instead of ち."
      },
      {
        "option": "おもしゃ",
        "isCorrect": true,
        "reasoning": "* **おもしゃ (4) - INCORRECT:** Wrong consonant. Uses し instead of ち."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 259,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しゅっぱつ",
      "でぱつ",
      "しゅつはつ",
      "でばつ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しゅっぱつ",
        "isCorrect": true,
        "reasoning": "* **しゅっぱつ (1) - CORRECT:** This is the standard reading for 出発 (departure)."
      },
      {
        "option": "でぱつ",
        "isCorrect": true,
        "reasoning": "* **でぱつ (2) - INCORRECT:** Wrong reading for 出. Uses で instead of しゅっ."
      },
      {
        "option": "しゅつはつ",
        "isCorrect": true,
        "reasoning": "* **しゅつはつ (3) - INCORRECT:** Wrong reading for 出. Uses しゅつ instead of しゅっ."
      },
      {
        "option": "でばつ",
        "isCorrect": true,
        "reasoning": "* **でばつ (4) - INCORRECT:** Wrong readings for both kanji. Uses で・ばつ instead of しゅっ・ぱつ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 260,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "みえる",
      "けんえる",
      "みれる",
      "みある"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "みえる",
        "isCorrect": true,
        "reasoning": "* **みえる (1) - CORRECT:** This is the standard reading for 見える (to be visible)."
      },
      {
        "option": "けんえる",
        "isCorrect": true,
        "reasoning": "* **けんえる (2) - INCORRECT:** Wrong reading for 見. Uses けん instead of み."
      },
      {
        "option": "みれる",
        "isCorrect": true,
        "reasoning": "* **みれる (3) - INCORRECT:** This is 見れる (potential form of 見る), not 見える."
      },
      {
        "option": "みある",
        "isCorrect": true,
        "reasoning": "* **みある (4) - INCORRECT:** Wrong ending. Uses ある instead of える."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 261,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かんけい",
      "せきけい",
      "かんがかり",
      "せきがかり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かんけい",
        "isCorrect": true,
        "reasoning": "* **かんけい (1) - CORRECT:** This is the standard reading for 関係 (relationship)."
      },
      {
        "option": "せきけい",
        "isCorrect": true,
        "reasoning": "* **せきけい (2) - INCORRECT:** Wrong reading for 関. Uses せき instead of かん."
      },
      {
        "option": "かんがかり",
        "isCorrect": true,
        "reasoning": "* **かんがかり (3) - INCORRECT:** Wrong reading for 係. Uses がかり instead of けい."
      },
      {
        "option": "せきがかり",
        "isCorrect": true,
        "reasoning": "* **せきがかり (4) - INCORRECT:** Wrong readings for both kanji. Uses せき・がかり instead of かん・けい."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 262,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "たとえば",
      "れいえば",
      "たとえは",
      "れいは"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "たとえば",
        "isCorrect": true,
        "reasoning": "* **たとえば (1) - CORRECT:** This is the standard reading for 例えば (for example)."
      },
      {
        "option": "れいえば",
        "isCorrect": true,
        "reasoning": "* **れいえば (2) - INCORRECT:** Wrong reading for 例. Uses れい instead of たと."
      },
      {
        "option": "たとえは",
        "isCorrect": true,
        "reasoning": "* **たとえは (3) - INCORRECT:** Wrong reading for ば. Uses は instead of ば."
      },
      {
        "option": "れいは",
        "isCorrect": true,
        "reasoning": "* **れいは (4) - INCORRECT:** Wrong readings for both kanji. Uses れい・は instead of たと・えば."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 263,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "むかう",
      "こうかう",
      "むこう",
      "きょうかう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "むかう",
        "isCorrect": true,
        "reasoning": "* **むかう (1) - CORRECT:** This is the standard reading for 向かう (to face/head toward)."
      },
      {
        "option": "こうかう",
        "isCorrect": true,
        "reasoning": "* **こうかう (2) - INCORRECT:** Wrong on'yomi reading. Uses こう instead of む."
      },
      {
        "option": "むこう",
        "isCorrect": true,
        "reasoning": "* **むこう (3) - INCORRECT:** This is 向こう (over there), not 向かう."
      },
      {
        "option": "きょうかう",
        "isCorrect": true,
        "reasoning": "* **きょうかう (4) - INCORRECT:** Wrong reading. Uses きょう instead of む."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 264,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ああ",
      "あー",
      "おお",
      "うう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ああ",
        "isCorrect": true,
        "reasoning": "* **ああ (1) - CORRECT:** This is the standard reading for ああ (ah/like that)."
      },
      {
        "option": "あー",
        "isCorrect": true,
        "reasoning": "* **あー (2) - INCORRECT:** Wrong length. Uses long vowel instead of double あ."
      },
      {
        "option": "おお",
        "isCorrect": true,
        "reasoning": "* **おお (3) - INCORRECT:** Wrong vowel. Uses おお instead of ああ."
      },
      {
        "option": "うう",
        "isCorrect": true,
        "reasoning": "* **うう (4) - INCORRECT:** Wrong vowel. Uses うう instead of ああ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 265,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "たてる",
      "りつてる",
      "たつる",
      "りってる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "たてる",
        "isCorrect": true,
        "reasoning": "* **たてる (1) - CORRECT:** This is the standard reading for 立てる (to stand something up)."
      },
      {
        "option": "りつてる",
        "isCorrect": true,
        "reasoning": "* **りつてる (2) - INCORRECT:** Wrong reading for 立. Uses りつ instead of た."
      },
      {
        "option": "たつる",
        "isCorrect": true,
        "reasoning": "* **たつる (3) - INCORRECT:** This is 立つ (to stand), not 立てる."
      },
      {
        "option": "りってる",
        "isCorrect": true,
        "reasoning": "* **りってる (4) - INCORRECT:** Wrong reading. Uses りっ instead of た."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 266,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "すいどう",
      "みずみち",
      "すいみち",
      "みずどう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "すいどう",
        "isCorrect": true,
        "reasoning": "* **すいどう (1) - CORRECT:** This is the standard reading for 水道 (water supply)."
      },
      {
        "option": "みずみち",
        "isCorrect": true,
        "reasoning": "* **みずみち (2) - INCORRECT:** Wrong readings for both kanji. Uses みず・みち instead of すい・どう."
      },
      {
        "option": "すいみち",
        "isCorrect": true,
        "reasoning": "* **すいみち (3) - INCORRECT:** Wrong reading for 道. Uses みち instead of どう."
      },
      {
        "option": "みずどう",
        "isCorrect": true,
        "reasoning": "* **みずどう (4) - INCORRECT:** Wrong reading for 水. Uses みず instead of すい."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 267,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "じてん",
      "じてん",
      "してん",
      "じでん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "じてん",
        "isCorrect": true,
        "reasoning": "* **じてん (1) - CORRECT:** This is the standard reading for 辞典 (dictionary)."
      },
      {
        "option": "じてん",
        "isCorrect": true,
        "reasoning": "* **じてん (2) - INCORRECT:** Same as option 1, duplicate."
      },
      {
        "option": "してん",
        "isCorrect": true,
        "reasoning": "* **してん (3) - INCORRECT:** Wrong reading for 辞. Uses し instead of じ."
      },
      {
        "option": "じでん",
        "isCorrect": true,
        "reasoning": "* **じでん (4) - INCORRECT:** Wrong reading for 典. Uses でん instead of てん."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 268,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "あそび",
      "ゆうび",
      "あそい",
      "ゆび"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "あそび",
        "isCorrect": true,
        "reasoning": "* **あそび (1) - CORRECT:** This is the standard reading for 遊び (play)."
      },
      {
        "option": "ゆうび",
        "isCorrect": true,
        "reasoning": "* **ゆうび (2) - INCORRECT:** Wrong reading for 遊. Uses ゆう instead of あそ."
      },
      {
        "option": "あそい",
        "isCorrect": true,
        "reasoning": "* **あそい (3) - INCORRECT:** Wrong ending. Uses い instead of び."
      },
      {
        "option": "ゆび",
        "isCorrect": true,
        "reasoning": "* **ゆび (4) - INCORRECT:** This is 指 (finger), not 遊び."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 269,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ひかり",
      "こう",
      "みつ",
      "ひか"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ひかり",
        "isCorrect": true,
        "reasoning": "* **ひかり (1) - CORRECT:** This is the standard reading for 光 (light)."
      },
      {
        "option": "こう",
        "isCorrect": true,
        "reasoning": "* **こう (2) - INCORRECT:** Wrong on'yomi reading. Uses こう instead of ひかり."
      },
      {
        "option": "みつ",
        "isCorrect": true,
        "reasoning": "* **みつ (3) - INCORRECT:** Wrong reading. Uses みつ instead of ひかり."
      },
      {
        "option": "ひか",
        "isCorrect": true,
        "reasoning": "* **ひか (4) - INCORRECT:** Incomplete reading. Missing り ending."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 270,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "くうき",
      "そらき",
      "からき",
      "くき"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "くうき",
        "isCorrect": true,
        "reasoning": "* **くうき (1) - CORRECT:** This is the standard reading for 空気 (air/atmosphere)."
      },
      {
        "option": "そらき",
        "isCorrect": true,
        "reasoning": "* **そらき (2) - INCORRECT:** Wrong reading for 空. Uses そら instead of くう."
      },
      {
        "option": "からき",
        "isCorrect": true,
        "reasoning": "* **からき (3) - INCORRECT:** Wrong reading for 空. Uses から instead of くう."
      },
      {
        "option": "くき",
        "isCorrect": true,
        "reasoning": "* **くき (4) - INCORRECT:** Missing う. Uses く instead of くう."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 271,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "せんそう",
      "たたかいそう",
      "せんあらそい",
      "いくさそう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "せんそう",
        "isCorrect": true,
        "reasoning": "* **せんそう (1) - CORRECT:** This is the standard reading for 戦争 (war)."
      },
      {
        "option": "たたかいそう",
        "isCorrect": true,
        "reasoning": "* **たたかいそう (2) - INCORRECT:** Wrong reading for 戦. Uses たたかい instead of せん."
      },
      {
        "option": "せんあらそい",
        "isCorrect": true,
        "reasoning": "* **せんあらそい (3) - INCORRECT:** Wrong reading for 争. Uses あらそい instead of そう."
      },
      {
        "option": "いくさそう",
        "isCorrect": true,
        "reasoning": "* **いくさそう (4) - INCORRECT:** Wrong reading for 戦. Uses いくさ instead of せん."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 272,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しょくりょうひん",
      "しょくりょうしな",
      "たべりょうひん",
      "しょくもの"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しょくりょうひん",
        "isCorrect": true,
        "reasoning": "* **しょくりょうひん (1) - CORRECT:** This is the standard reading for 食料品 (groceries)."
      },
      {
        "option": "しょくりょうしな",
        "isCorrect": true,
        "reasoning": "* **しょくりょうしな (2) - INCORRECT:** Wrong reading for 品. Uses しな instead of ひん."
      },
      {
        "option": "たべりょうひん",
        "isCorrect": true,
        "reasoning": "* **たべりょうひん (3) - INCORRECT:** Wrong reading for 食. Uses たべ instead of しょく."
      },
      {
        "option": "しょくもの",
        "isCorrect": true,
        "reasoning": "* **しょくもの (4) - INCORRECT:** Wrong reading for 料品. Uses もの instead of りょうひん."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 273,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かまう",
      "がまう",
      "かもう",
      "こまう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かまう",
        "isCorrect": true,
        "reasoning": "* **かまう (1) - CORRECT:** This is the standard reading for かまう (to mind)."
      },
      {
        "option": "がまう",
        "isCorrect": true,
        "reasoning": "* **がまう (2) - INCORRECT:** Wrong consonant. Uses が instead of か."
      },
      {
        "option": "かもう",
        "isCorrect": true,
        "reasoning": "* **かもう (3) - INCORRECT:** Wrong vowel. Uses も instead of ま."
      },
      {
        "option": "こまう",
        "isCorrect": true,
        "reasoning": "* **こまう (4) - INCORRECT:** Wrong vowel. Uses こ instead of か."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 274,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "よろこぶ",
      "きぶ",
      "うれしぶ",
      "よろしぶ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "よろこぶ",
        "isCorrect": true,
        "reasoning": "* **よろこぶ (1) - CORRECT:** This is the standard reading for 喜ぶ (to be delighted)."
      },
      {
        "option": "きぶ",
        "isCorrect": true,
        "reasoning": "* **きぶ (2) - INCORRECT:** Wrong reading. Uses き instead of よろこ."
      },
      {
        "option": "うれしぶ",
        "isCorrect": true,
        "reasoning": "* **うれしぶ (3) - INCORRECT:** Wrong reading. Uses うれし instead of よろこ."
      },
      {
        "option": "よろしぶ",
        "isCorrect": true,
        "reasoning": "* **よろしぶ (4) - INCORRECT:** Wrong reading. Uses よろし instead of よろこ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 275,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ワープロ",
      "ワーブロ",
      "ワープル",
      "ワーポロ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ワープロ",
        "isCorrect": true,
        "reasoning": "* **ワープロ (1) - CORRECT:** This is the standard reading for ワープロ (word processor)."
      },
      {
        "option": "ワーブロ",
        "isCorrect": true,
        "reasoning": "* **ワーブロ (2) - INCORRECT:** Wrong consonant. Uses ブ instead of プ."
      },
      {
        "option": "ワープル",
        "isCorrect": true,
        "reasoning": "* **ワープル (3) - INCORRECT:** Wrong ending. Uses ル instead of ロ."
      },
      {
        "option": "ワーポロ",
        "isCorrect": true,
        "reasoning": "* **ワーポロ (4) - INCORRECT:** Wrong consonant. Uses ポ instead of プ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 276,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かんたん",
      "かんだん",
      "けんたん",
      "かんとう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かんたん",
        "isCorrect": true,
        "reasoning": "* **かんたん (1) - CORRECT:** This is the standard reading for 簡単 (simple)."
      },
      {
        "option": "かんだん",
        "isCorrect": true,
        "reasoning": "* **かんだん (2) - INCORRECT:** Wrong consonant. Uses だん instead of たん."
      },
      {
        "option": "けんたん",
        "isCorrect": true,
        "reasoning": "* **けんたん (3) - INCORRECT:** Wrong vowel. Uses けん instead of かん."
      },
      {
        "option": "かんとう",
        "isCorrect": true,
        "reasoning": "* **かんとう (4) - INCORRECT:** Wrong reading for 単. Uses とう instead of たん."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 277,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おくじょう",
      "やじょう",
      "おくうえ",
      "やうえ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おくじょう",
        "isCorrect": true,
        "reasoning": "* **おくじょう (1) - CORRECT:** This is the standard reading for 屋上 (rooftop)."
      },
      {
        "option": "やじょう",
        "isCorrect": true,
        "reasoning": "* **やじょう (2) - INCORRECT:** Wrong reading for 屋. Uses や instead of おく."
      },
      {
        "option": "おくうえ",
        "isCorrect": true,
        "reasoning": "* **おくうえ (3) - INCORRECT:** Wrong reading for 上. Uses うえ instead of じょう."
      },
      {
        "option": "やうえ",
        "isCorrect": true,
        "reasoning": "* **やうえ (4) - INCORRECT:** Wrong readings for both kanji. Uses や・うえ instead of おく・じょう."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 278,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "にゅうがく",
      "いりがく",
      "はいりがく",
      "にゅうまなび"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "にゅうがく",
        "isCorrect": true,
        "reasoning": "* **にゅうがく (1) - CORRECT:** This is the standard reading for 入学 (to enter school)."
      },
      {
        "option": "いりがく",
        "isCorrect": true,
        "reasoning": "* **いりがく (2) - INCORRECT:** Wrong reading for 入. Uses いり instead of にゅう."
      },
      {
        "option": "はいりがく",
        "isCorrect": true,
        "reasoning": "* **はいりがく (3) - INCORRECT:** Wrong reading for 入. Uses はいり instead of にゅう."
      },
      {
        "option": "にゅうまなび",
        "isCorrect": true,
        "reasoning": "* **にゅうまなび (4) - INCORRECT:** Wrong reading for 学. Uses まなび instead of がく."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 279,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "すぎる",
      "かぎる",
      "こえる",
      "とおる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "すぎる",
        "isCorrect": true,
        "reasoning": "* **すぎる (1) - CORRECT:** This is the standard reading for 過ぎる (to exceed/pass)."
      },
      {
        "option": "かぎる",
        "isCorrect": true,
        "reasoning": "* **かぎる (2) - INCORRECT:** This is 限る (to limit), not 過ぎる."
      },
      {
        "option": "こえる",
        "isCorrect": true,
        "reasoning": "* **こえる (3) - INCORRECT:** This is 越える (to cross over), not 過ぎる."
      },
      {
        "option": "とおる",
        "isCorrect": true,
        "reasoning": "* **とおる (4) - INCORRECT:** This is 通る (to pass through), not 過ぎる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 280,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "プレゼント",
      "プレセント",
      "ブレゼント",
      "プレゼンド"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "プレゼント",
        "isCorrect": true,
        "reasoning": "* **プレゼント (1) - CORRECT:** This is the standard reading for プレゼント (present)."
      },
      {
        "option": "プレセント",
        "isCorrect": true,
        "reasoning": "* **プレセント (2) - INCORRECT:** Wrong consonant. Uses セ instead of ゼ."
      },
      {
        "option": "ブレゼント",
        "isCorrect": true,
        "reasoning": "* **ブレゼント (3) - INCORRECT:** Wrong consonant. Uses ブ instead of プ."
      },
      {
        "option": "プレゼンド",
        "isCorrect": true,
        "reasoning": "* **プレゼンド (4) - INCORRECT:** Wrong ending. Uses ンド instead of ント."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 281,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ちゅうしゃ",
      "ちゅうしゃ",
      "そそぎしゃ",
      "ちゅうい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ちゅうしゃ",
        "isCorrect": true,
        "reasoning": "* **ちゅうしゃ (1) - CORRECT:** This is the standard reading for 注射 (injection)."
      },
      {
        "option": "ちゅうしゃ",
        "isCorrect": true,
        "reasoning": "* **ちゅうしゃ (2) - INCORRECT:** Same as option 1, duplicate."
      },
      {
        "option": "そそぎしゃ",
        "isCorrect": true,
        "reasoning": "* **そそぎしゃ (3) - INCORRECT:** Wrong reading for 注. Uses そそぎ instead of ちゅう."
      },
      {
        "option": "ちゅうい",
        "isCorrect": true,
        "reasoning": "* **ちゅうい (4) - INCORRECT:** Wrong reading for 射. Uses い instead of しゃ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 282,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "うごく",
      "どうく",
      "みうごく",
      "うごける"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "うごく",
        "isCorrect": true,
        "reasoning": "* **うごく (1) - CORRECT:** This is the standard reading for 動く (to move)."
      },
      {
        "option": "どうく",
        "isCorrect": true,
        "reasoning": "* **どうく (2) - INCORRECT:** Wrong on'yomi reading. Uses どう instead of うご."
      },
      {
        "option": "みうごく",
        "isCorrect": true,
        "reasoning": "* **みうごく (3) - INCORRECT:** Wrong reading. Uses み instead of う."
      },
      {
        "option": "うごける",
        "isCorrect": true,
        "reasoning": "* **うごける (4) - INCORRECT:** This is the potential form, not the basic form."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 283,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "いと",
      "し",
      "いとう",
      "みと"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いと",
        "isCorrect": true,
        "reasoning": "* **いと (1) - CORRECT:** This is the standard reading for 糸 (thread)."
      },
      {
        "option": "し",
        "isCorrect": true,
        "reasoning": "* **し (2) - INCORRECT:** Wrong on'yomi reading. Uses し instead of いと."
      },
      {
        "option": "いとう",
        "isCorrect": true,
        "reasoning": "* **いとう (3) - INCORRECT:** Wrong ending. Uses う instead of just いと."
      },
      {
        "option": "みと",
        "isCorrect": true,
        "reasoning": "* **みと (4) - INCORRECT:** Wrong consonant. Uses み instead of い."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 284,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "こむ",
      "ごむ",
      "こみ",
      "きむ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こむ",
        "isCorrect": true,
        "reasoning": "* **こむ (1) - CORRECT:** This is the standard reading for 込む (to be crowded)."
      },
      {
        "option": "ごむ",
        "isCorrect": true,
        "reasoning": "* **ごむ (2) - INCORRECT:** Wrong consonant. Uses ご instead of こ."
      },
      {
        "option": "こみ",
        "isCorrect": true,
        "reasoning": "* **こみ (3) - INCORRECT:** Wrong ending. Uses み instead of む."
      },
      {
        "option": "きむ",
        "isCorrect": true,
        "reasoning": "* **きむ (4) - INCORRECT:** Wrong vowel. Uses き instead of こ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 285,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "まける",
      "ふける",
      "おける",
      "かける"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "まける",
        "isCorrect": true,
        "reasoning": "* **まける (1) - CORRECT:** This is the standard reading for 負ける (to lose)."
      },
      {
        "option": "ふける",
        "isCorrect": true,
        "reasoning": "* **ふける (2) - INCORRECT:** Wrong reading. Uses ふ instead of ま."
      },
      {
        "option": "おける",
        "isCorrect": true,
        "reasoning": "* **おける (3) - INCORRECT:** This is 置ける (can place), not 負ける."
      },
      {
        "option": "かける",
        "isCorrect": true,
        "reasoning": "* **かける (4) - INCORRECT:** This is 掛ける (to hang), not 負ける."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 286,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "きっと",
      "きつと",
      "きっど",
      "ぎっと"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "きっと",
        "isCorrect": true,
        "reasoning": "* **きっと (1) - CORRECT:** This is the standard reading for きっと (surely)."
      },
      {
        "option": "きつと",
        "isCorrect": true,
        "reasoning": "* **きつと (2) - INCORRECT:** Wrong consonant. Uses つ instead of っと."
      },
      {
        "option": "きっど",
        "isCorrect": true,
        "reasoning": "* **きっど (3) - INCORRECT:** Wrong ending. Uses ど instead of と."
      },
      {
        "option": "ぎっと",
        "isCorrect": true,
        "reasoning": "* **ぎっと (4) - INCORRECT:** Wrong consonant. Uses ぎ instead of き."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 287,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ぼうえき",
      "ぼえき",
      "ばうえき",
      "もうえき"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ぼうえき",
        "isCorrect": true,
        "reasoning": "* **ぼうえき (1) - CORRECT:** This is the standard reading for 貿易 (trade)."
      },
      {
        "option": "ぼえき",
        "isCorrect": true,
        "reasoning": "* **ぼえき (2) - INCORRECT:** Missing う. Uses ぼ instead of ぼう."
      },
      {
        "option": "ばうえき",
        "isCorrect": true,
        "reasoning": "* **ばうえき (3) - INCORRECT:** Wrong consonant. Uses ば instead of ぼ."
      },
      {
        "option": "もうえき",
        "isCorrect": true,
        "reasoning": "* **もうえき (4) - INCORRECT:** Wrong consonant. Uses も instead of ぼ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 288,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "さしあげる",
      "さしあがる",
      "ささげる",
      "さしのぼる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "さしあげる",
        "isCorrect": true,
        "reasoning": "* **さしあげる (1) - CORRECT:** This is the standard reading for 差し上げる (polite \"to give\")."
      },
      {
        "option": "さしあがる",
        "isCorrect": true,
        "reasoning": "* **さしあがる (2) - INCORRECT:** Wrong reading for 上げる. Uses あがる instead of あげる."
      },
      {
        "option": "ささげる",
        "isCorrect": true,
        "reasoning": "* **ささげる (3) - INCORRECT:** This is 捧げる (to offer), not 差し上げる."
      },
      {
        "option": "さしのぼる",
        "isCorrect": true,
        "reasoning": "* **さしのぼる (4) - INCORRECT:** Wrong reading for 上げる. Uses のぼる instead of あげる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 289,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "じんこう",
      "ひとぐち",
      "にんこう",
      "じんくち"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "じんこう",
        "isCorrect": true,
        "reasoning": "* **じんこう (1) - CORRECT:** This is the standard reading for 人口 (population)."
      },
      {
        "option": "ひとぐち",
        "isCorrect": true,
        "reasoning": "* **ひとぐち (2) - INCORRECT:** Wrong readings for both kanji. Uses ひと・ぐち instead of じん・こう."
      },
      {
        "option": "にんこう",
        "isCorrect": true,
        "reasoning": "* **にんこう (3) - INCORRECT:** Wrong reading for 人. Uses にん instead of じん."
      },
      {
        "option": "じんくち",
        "isCorrect": true,
        "reasoning": "* **じんくち (4) - INCORRECT:** Wrong reading for 口. Uses くち instead of こう."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 290,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "わかす",
      "ふっかす",
      "たかす",
      "ふかす"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "わかす",
        "isCorrect": true,
        "reasoning": "* **わかす (1) - CORRECT:** This is the standard reading for 沸かす (to boil)."
      },
      {
        "option": "ふっかす",
        "isCorrect": true,
        "reasoning": "* **ふっかす (2) - INCORRECT:** Wrong reading. Uses ふっ instead of わ."
      },
      {
        "option": "たかす",
        "isCorrect": true,
        "reasoning": "* **たかす (3) - INCORRECT:** Wrong reading. Uses た instead of わ."
      },
      {
        "option": "ふかす",
        "isCorrect": true,
        "reasoning": "* **ふかす (4) - INCORRECT:** Wrong reading. Uses ふ instead of わ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 291,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おみまい",
      "おけんまい",
      "おみおどり",
      "おみぶ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おみまい",
        "isCorrect": true,
        "reasoning": "* **おみまい (1) - CORRECT:** This is the standard reading for お見舞い (visiting the sick)."
      },
      {
        "option": "おけんまい",
        "isCorrect": true,
        "reasoning": "* **おけんまい (2) - INCORRECT:** Wrong reading for 見. Uses けん instead of み."
      },
      {
        "option": "おみおどり",
        "isCorrect": true,
        "reasoning": "* **おみおどり (3) - INCORRECT:** Wrong reading for 舞. Uses おどり instead of まい."
      },
      {
        "option": "おみぶ",
        "isCorrect": true,
        "reasoning": "* **おみぶ (4) - INCORRECT:** Wrong reading for 舞. Uses ぶ instead of まい."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 292,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ピアノ",
      "ピヤノ",
      "ビアノ",
      "ピアーノ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ピアノ",
        "isCorrect": true,
        "reasoning": "* **ピアノ (1) - CORRECT:** This is the standard reading for ピアノ (piano)."
      },
      {
        "option": "ピヤノ",
        "isCorrect": true,
        "reasoning": "* **ピヤノ (2) - INCORRECT:** Wrong consonant. Uses ヤ instead of ア."
      },
      {
        "option": "ビアノ",
        "isCorrect": true,
        "reasoning": "* **ビアノ (3) - INCORRECT:** Wrong consonant. Uses ビ instead of ピ."
      },
      {
        "option": "ピアーノ",
        "isCorrect": true,
        "reasoning": "* **ピアーノ (4) - INCORRECT:** Wrong length. Uses long vowel ー instead of short ア."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 293,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ステレオ",
      "ステリオ",
      "スデレオ",
      "ステーレオ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ステレオ",
        "isCorrect": true,
        "reasoning": "* **ステレオ (1) - CORRECT:** This is the standard reading for ステレオ (stereo)."
      },
      {
        "option": "ステリオ",
        "isCorrect": true,
        "reasoning": "* **ステリオ (2) - INCORRECT:** Wrong vowel. Uses リ instead of レ."
      },
      {
        "option": "スデレオ",
        "isCorrect": true,
        "reasoning": "* **スデレオ (3) - INCORRECT:** Wrong consonant. Uses ス instead of ス and デ instead of テ."
      },
      {
        "option": "ステーレオ",
        "isCorrect": true,
        "reasoning": "* **ステーレオ (4) - INCORRECT:** Wrong length. Uses long vowel ー."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 294,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "てんきよほう",
      "てんきよほ",
      "あまきよほう",
      "てんけよほう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "てんきよほう",
        "isCorrect": true,
        "reasoning": "* **てんきよほう (1) - CORRECT:** This is the standard reading for 天気予報 (weather forecast)."
      },
      {
        "option": "てんきよほ",
        "isCorrect": true,
        "reasoning": "* **てんきよほ (2) - INCORRECT:** Missing う ending. Uses よほ instead of よほう."
      },
      {
        "option": "あまきよほう",
        "isCorrect": true,
        "reasoning": "* **あまきよほう (3) - INCORRECT:** Wrong reading for 天. Uses あま instead of てん."
      },
      {
        "option": "てんけよほう",
        "isCorrect": true,
        "reasoning": "* **てんけよほう (4) - INCORRECT:** Wrong reading for 気. Uses け instead of き."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 295,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "いらっしゃる",
      "いらしゃる",
      "いらっさる",
      "いらしゃーる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いらっしゃる",
        "isCorrect": true,
        "reasoning": "* **いらっしゃる (1) - CORRECT:** This is the standard reading for いらっしゃる (respectful \"to be\")."
      },
      {
        "option": "いらしゃる",
        "isCorrect": true,
        "reasoning": "* **いらしゃる (2) - INCORRECT:** Missing っ. Uses いらしゃる instead of いらっしゃる."
      },
      {
        "option": "いらっさる",
        "isCorrect": true,
        "reasoning": "* **いらっさる (3) - INCORRECT:** Wrong consonant. Uses さ instead of しゃ."
      },
      {
        "option": "いらしゃーる",
        "isCorrect": true,
        "reasoning": "* **いらしゃーる (4) - INCORRECT:** Wrong length and missing っ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 296,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "けいざい",
      "きょうざい",
      "けいさい",
      "けいじ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "けいざい",
        "isCorrect": true,
        "reasoning": "* **けいざい (1) - CORRECT:** This is the standard reading for 経済 (economics)."
      },
      {
        "option": "きょうざい",
        "isCorrect": true,
        "reasoning": "* **きょうざい (2) - INCORRECT:** Wrong reading for 経. Uses きょう instead of けい."
      },
      {
        "option": "けいさい",
        "isCorrect": true,
        "reasoning": "* **けいさい (3) - INCORRECT:** Wrong reading for 済. Uses さい instead of ざい."
      },
      {
        "option": "けいじ",
        "isCorrect": true,
        "reasoning": "* **けいじ (4) - INCORRECT:** Wrong reading for 済. Uses じ instead of ざい."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 297,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "まわり",
      "しゅうり",
      "あたり",
      "めぐり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "まわり",
        "isCorrect": true,
        "reasoning": "* **まわり (1) - CORRECT:** This is the standard reading for 周り (surroundings)."
      },
      {
        "option": "しゅうり",
        "isCorrect": true,
        "reasoning": "* **しゅうり (2) - INCORRECT:** Wrong on'yomi reading. Uses しゅうり instead of まわり."
      },
      {
        "option": "あたり",
        "isCorrect": true,
        "reasoning": "* **あたり (3) - INCORRECT:** This is 辺り (vicinity), not 周り."
      },
      {
        "option": "めぐり",
        "isCorrect": true,
        "reasoning": "* **めぐり (4) - INCORRECT:** This is 巡り (circulation), not 周り."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 298,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おどろく",
      "きょうく",
      "おどりく",
      "びっくりく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おどろく",
        "isCorrect": true,
        "reasoning": "* **おどろく (1) - CORRECT:** This is the standard reading for 驚く (to be surprised)."
      },
      {
        "option": "きょうく",
        "isCorrect": true,
        "reasoning": "* **きょうく (2) - INCORRECT:** Wrong on'yomi reading. Uses きょう instead of おどろ."
      },
      {
        "option": "おどりく",
        "isCorrect": true,
        "reasoning": "* **おどりく (3) - INCORRECT:** Wrong reading. Uses おどり instead of おどろ."
      },
      {
        "option": "びっくりく",
        "isCorrect": true,
        "reasoning": "* **びっくりく (4) - INCORRECT:** Wrong reading. Uses びっくり instead of おどろ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 299,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ひじょうに",
      "ひじょに",
      "ひつじょうに",
      "ひじゃうに"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ひじょうに",
        "isCorrect": true,
        "reasoning": "* **ひじょうに (1) - CORRECT:** This is the standard reading for 非常に (extremely)."
      },
      {
        "option": "ひじょに",
        "isCorrect": true,
        "reasoning": "* **ひじょに (2) - INCORRECT:** Missing う. Uses ひじょ instead of ひじょう."
      },
      {
        "option": "ひつじょうに",
        "isCorrect": true,
        "reasoning": "* **ひつじょうに (3) - INCORRECT:** Wrong consonant. Uses つ instead of nothing."
      },
      {
        "option": "ひじゃうに",
        "isCorrect": true,
        "reasoning": "* **ひじゃうに (4) - INCORRECT:** Wrong vowel. Uses じゃ instead of じょ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 300,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "うんてんしゅ",
      "うんでんしゅ",
      "うんてんて",
      "うんころがしゅ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "うんてんしゅ",
        "isCorrect": true,
        "reasoning": "* **うんてんしゅ (1) - CORRECT:** This is the standard reading for 運転手 (driver)."
      },
      {
        "option": "うんでんしゅ",
        "isCorrect": true,
        "reasoning": "* **うんでんしゅ (2) - INCORRECT:** Wrong consonant. Uses でん instead of てん."
      },
      {
        "option": "うんてんて",
        "isCorrect": true,
        "reasoning": "* **うんてんて (3) - INCORRECT:** Wrong reading for 手. Uses て instead of しゅ."
      },
      {
        "option": "うんころがしゅ",
        "isCorrect": true,
        "reasoning": "* **うんころがしゅ (4) - INCORRECT:** Wrong reading for 転. Uses ころが instead of てん."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 301,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しらべる",
      "ちょうべる",
      "しらえる",
      "ととのべる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しらべる",
        "isCorrect": true,
        "reasoning": "* **しらべる (1) - CORRECT:** This is the standard reading for 調べる (to investigate)."
      },
      {
        "option": "ちょうべる",
        "isCorrect": true,
        "reasoning": "* **ちょうべる (2) - INCORRECT:** Wrong on'yomi reading. Uses ちょう instead of しら."
      },
      {
        "option": "しらえる",
        "isCorrect": true,
        "reasoning": "* **しらえる (3) - INCORRECT:** Wrong ending. Uses え instead of べ."
      },
      {
        "option": "ととのべる",
        "isCorrect": true,
        "reasoning": "* **ととのべる (4) - INCORRECT:** This is 整える (to arrange), not 調べる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 302,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "なるほど",
      "なりほど",
      "なるぽど",
      "なろほど"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "なるほど",
        "isCorrect": true,
        "reasoning": "* **なるほど (1) - CORRECT:** This is the standard reading for なるほど (now I understand)."
      },
      {
        "option": "なりほど",
        "isCorrect": true,
        "reasoning": "* **なりほど (2) - INCORRECT:** Wrong vowel. Uses り instead of る."
      },
      {
        "option": "なるぽど",
        "isCorrect": true,
        "reasoning": "* **なるぽど (3) - INCORRECT:** Wrong consonant. Uses ぽ instead of ほ."
      },
      {
        "option": "なろほど",
        "isCorrect": true,
        "reasoning": "* **なろほど (4) - INCORRECT:** Wrong vowel. Uses ろ instead of る."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 303,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "すみ",
      "ぐう",
      "かど",
      "すま"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "すみ",
        "isCorrect": true,
        "reasoning": "* **すみ (1) - CORRECT:** This is the standard reading for 隅 (corner/nook)."
      },
      {
        "option": "ぐう",
        "isCorrect": true,
        "reasoning": "* **ぐう (2) - INCORRECT:** Wrong on'yomi reading. Uses ぐう instead of すみ."
      },
      {
        "option": "かど",
        "isCorrect": true,
        "reasoning": "* **かど (3) - INCORRECT:** This is 角 (corner), not 隅."
      },
      {
        "option": "すま",
        "isCorrect": true,
        "reasoning": "* **すま (4) - INCORRECT:** Wrong ending. Uses ま instead of み."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 304,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "つづける",
      "そくける",
      "つずける",
      "ぞくける"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "つづける",
        "isCorrect": true,
        "reasoning": "* **つづける (1) - CORRECT:** This is the standard reading for 続ける (to continue)."
      },
      {
        "option": "そくける",
        "isCorrect": true,
        "reasoning": "* **そくける (2) - INCORRECT:** Wrong reading. Uses そく instead of つづ."
      },
      {
        "option": "つずける",
        "isCorrect": true,
        "reasoning": "* **つずける (3) - INCORRECT:** Wrong consonant. Uses ず instead of づ."
      },
      {
        "option": "ぞくける",
        "isCorrect": true,
        "reasoning": "* **ぞくける (4) - INCORRECT:** Wrong reading. Uses ぞく instead of つづ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 305,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "めしあがる",
      "しょうあがる",
      "めしのぼる",
      "しょうじょうがる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "めしあがる",
        "isCorrect": true,
        "reasoning": "* **めしあがる (1) - CORRECT:** This is the standard reading for 召し上がる (polite \"to eat\")."
      },
      {
        "option": "しょうあがる",
        "isCorrect": true,
        "reasoning": "* **しょうあがる (2) - INCORRECT:** Wrong reading for 召. Uses しょう instead of めし."
      },
      {
        "option": "めしのぼる",
        "isCorrect": true,
        "reasoning": "* **めしのぼる (3) - INCORRECT:** Wrong reading for 上がる. Uses のぼる instead of あがる."
      },
      {
        "option": "しょうじょうがる",
        "isCorrect": true,
        "reasoning": "* **しょうじょうがる (4) - INCORRECT:** Wrong readings for both kanji."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 306,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "もめん",
      "きめん",
      "もくめん",
      "きわた"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "もめん",
        "isCorrect": true,
        "reasoning": "* **もめん (1) - CORRECT:** This is the standard reading for 木綿 (cotton)."
      },
      {
        "option": "きめん",
        "isCorrect": true,
        "reasoning": "* **きめん (2) - INCORRECT:** Wrong reading for 木. Uses き instead of も."
      },
      {
        "option": "もくめん",
        "isCorrect": true,
        "reasoning": "* **もくめん (3) - INCORRECT:** Wrong reading for 木. Uses もく instead of も."
      },
      {
        "option": "きわた",
        "isCorrect": true,
        "reasoning": "* **きわた (4) - INCORRECT:** Wrong readings for both kanji. Uses き・わた instead of も・めん."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 307,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ジャム",
      "ジヤム",
      "ジャーム",
      "ジャン"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ジャム",
        "isCorrect": true,
        "reasoning": "* **ジャム (1) - CORRECT:** This is the standard reading for ジャム (jam)."
      },
      {
        "option": "ジヤム",
        "isCorrect": true,
        "reasoning": "* **ジヤム (2) - INCORRECT:** Wrong consonant. Uses ヤ instead of ャ."
      },
      {
        "option": "ジャーム",
        "isCorrect": true,
        "reasoning": "* **ジャーム (3) - INCORRECT:** Wrong length. Uses long vowel ー."
      },
      {
        "option": "ジャン",
        "isCorrect": true,
        "reasoning": "* **ジャン (4) - INCORRECT:** Wrong ending. Uses ン instead of ム."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 308,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "たずねる",
      "じんねる",
      "たずれる",
      "ひろねる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "たずねる",
        "isCorrect": true,
        "reasoning": "* **たずねる (1) - CORRECT:** This is the standard reading for 尋ねる (to ask)."
      },
      {
        "option": "じんねる",
        "isCorrect": true,
        "reasoning": "* **じんねる (2) - INCORRECT:** Wrong on'yomi reading. Uses じん instead of たず."
      },
      {
        "option": "たずれる",
        "isCorrect": true,
        "reasoning": "* **たずれる (3) - INCORRECT:** Wrong ending. Uses れる instead of ねる."
      },
      {
        "option": "ひろねる",
        "isCorrect": true,
        "reasoning": "* **ひろねる (4) - INCORRECT:** Wrong reading. Uses ひろ instead of たず."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 309,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ちゃん",
      "ちやん",
      "じゃん",
      "ちゃーん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ちゃん",
        "isCorrect": true,
        "reasoning": "* **ちゃん (1) - CORRECT:** This is the standard reading for ちゃん (familiar suffix)."
      },
      {
        "option": "ちやん",
        "isCorrect": true,
        "reasoning": "* **ちやん (2) - INCORRECT:** Wrong consonant. Uses や instead of ゃ."
      },
      {
        "option": "じゃん",
        "isCorrect": true,
        "reasoning": "* **じゃん (3) - INCORRECT:** Wrong consonant. Uses じ instead of ち."
      },
      {
        "option": "ちゃーん",
        "isCorrect": true,
        "reasoning": "* **ちゃーん (4) - INCORRECT:** Wrong length. Uses long vowel ー."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 310,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ぶどう",
      "ほとう",
      "ぶとう",
      "ふどう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ぶどう",
        "isCorrect": true,
        "reasoning": "* **ぶどう (1) - CORRECT:** This is the standard reading for 葡萄 (grapes)."
      },
      {
        "option": "ほとう",
        "isCorrect": true,
        "reasoning": "* **ほとう (2) - INCORRECT:** Wrong consonant. Uses ほ instead of ぶ."
      },
      {
        "option": "ぶとう",
        "isCorrect": true,
        "reasoning": "* **ぶとう (3) - INCORRECT:** Wrong consonant. Uses と instead of ど."
      },
      {
        "option": "ふどう",
        "isCorrect": true,
        "reasoning": "* **ふどう (4) - INCORRECT:** Wrong consonant. Uses ふ instead of ぶ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 311,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "きゅう",
      "いそぎ",
      "せま",
      "はや"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "きゅう",
        "isCorrect": true,
        "reasoning": "* **きゅう (1) - CORRECT:** This is the standard reading for 急 (urgent/steep)."
      },
      {
        "option": "いそぎ",
        "isCorrect": true,
        "reasoning": "* **いそぎ (2) - INCORRECT:** This is 急ぎ (hurry), not the adjective 急."
      },
      {
        "option": "せま",
        "isCorrect": true,
        "reasoning": "* **せま (3) - INCORRECT:** This is 狭 (narrow), not 急."
      },
      {
        "option": "はや",
        "isCorrect": true,
        "reasoning": "* **はや (4) - INCORRECT:** This is 早 (early), not 急."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 312,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "それほど",
      "そればど",
      "それぽど",
      "それほと"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "それほど",
        "isCorrect": true,
        "reasoning": "* **それほど (1) - CORRECT:** This is the standard reading for それほど (to that extent)."
      },
      {
        "option": "そればど",
        "isCorrect": true,
        "reasoning": "* **そればど (2) - INCORRECT:** Wrong consonant. Uses ば instead of ほ."
      },
      {
        "option": "それぽど",
        "isCorrect": true,
        "reasoning": "* **それぽど (3) - INCORRECT:** Wrong consonant. Uses ぽ instead of ほ."
      },
      {
        "option": "それほと",
        "isCorrect": true,
        "reasoning": "* **それほと (4) - INCORRECT:** Wrong ending. Uses と instead of ど."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 313,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "じゅうぶん",
      "じゅっぷん",
      "とおぶん",
      "じゅうふん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "じゅうぶん",
        "isCorrect": true,
        "reasoning": "* **じゅうぶん (1) - CORRECT:** This is the standard reading for 十分 (enough)."
      },
      {
        "option": "じゅっぷん",
        "isCorrect": true,
        "reasoning": "* **じゅっぷん (2) - INCORRECT:** This is the time reading (10 minutes), not the adverb."
      },
      {
        "option": "とおぶん",
        "isCorrect": true,
        "reasoning": "* **とおぶん (3) - INCORRECT:** Wrong reading for 十. Uses とお instead of じゅう."
      },
      {
        "option": "じゅうふん",
        "isCorrect": true,
        "reasoning": "* **じゅうふん (4) - INCORRECT:** Wrong consonant. Uses ふん instead of ぶん."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 314,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "サラダ",
      "サラタ",
      "サーラダ",
      "サラーダ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "サラダ",
        "isCorrect": true,
        "reasoning": "* **サラダ (1) - CORRECT:** This is the standard reading for サラダ (salad)."
      },
      {
        "option": "サラタ",
        "isCorrect": true,
        "reasoning": "* **サラタ (2) - INCORRECT:** Wrong consonant. Uses タ instead of ダ."
      },
      {
        "option": "サーラダ",
        "isCorrect": true,
        "reasoning": "* **サーラダ (3) - INCORRECT:** Wrong length. Uses long vowel ー."
      },
      {
        "option": "サラーダ",
        "isCorrect": true,
        "reasoning": "* **サラーダ (4) - INCORRECT:** Wrong length. Uses long vowel ー."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 315,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ねつ",
      "あつ",
      "ねち",
      "あち"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ねつ",
        "isCorrect": true,
        "reasoning": "* **ねつ (1) - CORRECT:** This is the standard reading for 熱 (fever)."
      },
      {
        "option": "あつ",
        "isCorrect": true,
        "reasoning": "* **あつ (2) - INCORRECT:** This is the reading for 熱い (hot), not 熱 (fever)."
      },
      {
        "option": "ねち",
        "isCorrect": true,
        "reasoning": "* **ねち (3) - INCORRECT:** Wrong ending. Uses ち instead of つ."
      },
      {
        "option": "あち",
        "isCorrect": true,
        "reasoning": "* **あち (4) - INCORRECT:** Wrong reading. Uses あち instead of ねつ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 316,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おこす",
      "きこす",
      "おきる",
      "たつ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おこす",
        "isCorrect": true,
        "reasoning": "* **おこす (1) - CORRECT:** This is the standard reading for 起こす (to wake someone)."
      },
      {
        "option": "きこす",
        "isCorrect": true,
        "reasoning": "* **きこす (2) - INCORRECT:** Wrong reading. Uses き instead of お."
      },
      {
        "option": "おきる",
        "isCorrect": true,
        "reasoning": "* **おきる (3) - INCORRECT:** This is 起きる (to wake up), not 起こす (to wake someone)."
      },
      {
        "option": "たつ",
        "isCorrect": true,
        "reasoning": "* **たつ (4) - INCORRECT:** This is 立つ (to stand), not 起こす."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 317,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ひるま",
      "ちゅうかん",
      "ひるあいだ",
      "ちゅうま"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ひるま",
        "isCorrect": true,
        "reasoning": "* **ひるま (1) - CORRECT:** This is the standard reading for 昼間 (daytime)."
      },
      {
        "option": "ちゅうかん",
        "isCorrect": true,
        "reasoning": "* **ちゅうかん (2) - INCORRECT:** Wrong on'yomi reading. Uses ちゅう・かん instead of ひる・ま."
      },
      {
        "option": "ひるあいだ",
        "isCorrect": true,
        "reasoning": "* **ひるあいだ (3) - INCORRECT:** Wrong reading for 間. Uses あいだ instead of ま."
      },
      {
        "option": "ちゅうま",
        "isCorrect": true,
        "reasoning": "* **ちゅうま (4) - INCORRECT:** Wrong reading for 昼. Uses ちゅう instead of ひる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 318,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おこなう",
      "いく",
      "ゆく",
      "こうう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おこなう",
        "isCorrect": true,
        "reasoning": "* **おこなう (1) - CORRECT:** This is the standard reading for 行う (to do/conduct)."
      },
      {
        "option": "いく",
        "isCorrect": true,
        "reasoning": "* **いく (2) - INCORRECT:** This is 行く (to go), not 行う."
      },
      {
        "option": "ゆく",
        "isCorrect": true,
        "reasoning": "* **ゆく (3) - INCORRECT:** This is also 行く (to go), not 行う."
      },
      {
        "option": "こうう",
        "isCorrect": true,
        "reasoning": "* **こうう (4) - INCORRECT:** Wrong on'yomi reading. Uses こう・う instead of おこな・う."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 319,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "あげる",
      "あがる",
      "のぼる",
      "たかめる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "あげる",
        "isCorrect": true,
        "reasoning": "* **あげる (1) - CORRECT:** This is the standard reading for あげる (to give)."
      },
      {
        "option": "あがる",
        "isCorrect": true,
        "reasoning": "* **あがる (2) - INCORRECT:** This is 上がる (to go up), not あげる."
      },
      {
        "option": "のぼる",
        "isCorrect": true,
        "reasoning": "* **のぼる (3) - INCORRECT:** This is 上る (to climb), not あげる."
      },
      {
        "option": "たかめる",
        "isCorrect": true,
        "reasoning": "* **たかめる (4) - INCORRECT:** This is 高める (to raise), not あげる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 320,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "はんたい",
      "はんだい",
      "ばんたい",
      "はんつい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "はんたい",
        "isCorrect": true,
        "reasoning": "* **はんたい (1) - CORRECT:** This is the standard reading for 反対 (opposition)."
      },
      {
        "option": "はんだい",
        "isCorrect": true,
        "reasoning": "* **はんだい (2) - INCORRECT:** Wrong consonant. Uses だい instead of たい."
      },
      {
        "option": "ばんたい",
        "isCorrect": true,
        "reasoning": "* **ばんたい (3) - INCORRECT:** Wrong consonant. Uses ばん instead of はん."
      },
      {
        "option": "はんつい",
        "isCorrect": true,
        "reasoning": "* **はんつい (4) - INCORRECT:** Wrong reading for 対. Uses つい instead of たい."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 321,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ふえる",
      "ぞうえる",
      "ますえる",
      "ふやす"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ふえる",
        "isCorrect": true,
        "reasoning": "* **ふえる (1) - CORRECT:** This is the standard reading for 増える (to increase)."
      },
      {
        "option": "ぞうえる",
        "isCorrect": true,
        "reasoning": "* **ぞうえる (2) - INCORRECT:** Wrong reading. Uses ぞう instead of ふ."
      },
      {
        "option": "ますえる",
        "isCorrect": true,
        "reasoning": "* **ますえる (3) - INCORRECT:** Wrong reading. Uses ます instead of ふ."
      },
      {
        "option": "ふやす",
        "isCorrect": true,
        "reasoning": "* **ふやす (4) - INCORRECT:** This is 増やす (to increase something), not 増える."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 322,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "いじょう",
      "いうえ",
      "いかみ",
      "いがみ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いじょう",
        "isCorrect": true,
        "reasoning": "* **いじょう (1) - CORRECT:** This is the standard reading for 以上 (more than/that's all)."
      },
      {
        "option": "いうえ",
        "isCorrect": true,
        "reasoning": "* **いうえ (2) - INCORRECT:** Wrong reading. Uses うえ instead of じょう."
      },
      {
        "option": "いかみ",
        "isCorrect": true,
        "reasoning": "* **いかみ (3) - INCORRECT:** Wrong reading. Uses かみ instead of じょう."
      },
      {
        "option": "いがみ",
        "isCorrect": true,
        "reasoning": "* **いがみ (4) - INCORRECT:** Wrong reading. Uses がみ instead of じょう."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 323,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "は",
      "よう",
      "ば",
      "ぱ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "は",
        "isCorrect": true,
        "reasoning": "* **は (1) - CORRECT:** This is the standard reading for 葉 (leaf)."
      },
      {
        "option": "よう",
        "isCorrect": true,
        "reasoning": "* **よう (2) - INCORRECT:** Wrong on'yomi reading. Uses よう instead of は."
      },
      {
        "option": "ば",
        "isCorrect": true,
        "reasoning": "* **ば (3) - INCORRECT:** Wrong reading. Uses ば instead of は."
      },
      {
        "option": "ぱ",
        "isCorrect": true,
        "reasoning": "* **ぱ (4) - INCORRECT:** Wrong reading. Uses ぱ instead of は."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 324,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "みそ",
      "みしょ",
      "あじそ",
      "びそう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "みそ",
        "isCorrect": true,
        "reasoning": "* **みそ (1) - CORRECT:** This is the standard reading for 味噌 (miso)."
      },
      {
        "option": "みしょ",
        "isCorrect": true,
        "reasoning": "* **みしょ (2) - INCORRECT:** Wrong reading. Uses しょ instead of そ."
      },
      {
        "option": "あじそ",
        "isCorrect": true,
        "reasoning": "* **あじそ (3) - INCORRECT:** Wrong reading for 味. Uses あじ instead of み."
      },
      {
        "option": "びそう",
        "isCorrect": true,
        "reasoning": "* **びそう (4) - INCORRECT:** Wrong reading. Uses びそう instead of みそ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 325,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おくる",
      "そうる",
      "はこぶ",
      "とどける"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おくる",
        "isCorrect": true,
        "reasoning": "* **おくる (1) - CORRECT:** This is the standard reading for 送る (to send)."
      },
      {
        "option": "そうる",
        "isCorrect": true,
        "reasoning": "* **そうる (2) - INCORRECT:** Wrong reading. Uses そう instead of おく."
      },
      {
        "option": "はこぶ",
        "isCorrect": true,
        "reasoning": "* **はこぶ (3) - INCORRECT:** This is 運ぶ (to carry), not 送る."
      },
      {
        "option": "とどける",
        "isCorrect": true,
        "reasoning": "* **とどける (4) - INCORRECT:** This is 届ける (to deliver), not 送る."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 326,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ふね",
      "しゅう",
      "ぼーと",
      "せん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ふね",
        "isCorrect": true,
        "reasoning": "* **ふね (1) - CORRECT:** This is the standard reading for 舟 (boat)."
      },
      {
        "option": "しゅう",
        "isCorrect": true,
        "reasoning": "* **しゅう (2) - INCORRECT:** Wrong on'yomi reading. Uses しゅう instead of ふね."
      },
      {
        "option": "ぼーと",
        "isCorrect": true,
        "reasoning": "* **ぼーと (3) - INCORRECT:** This is the English loanword ボート, not 舟."
      },
      {
        "option": "せん",
        "isCorrect": true,
        "reasoning": "* **せん (4) - INCORRECT:** This is 船 (ship), not 舟."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 327,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "はつおん",
      "はっとん",
      "ほつおん",
      "はつねん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "はつおん",
        "isCorrect": true,
        "reasoning": "* **はつおん (1) - CORRECT:** This is the standard reading for 発音 (pronunciation)."
      },
      {
        "option": "はっとん",
        "isCorrect": true,
        "reasoning": "* **はっとん (2) - INCORRECT:** Wrong reading. Uses っとん instead of つおん."
      },
      {
        "option": "ほつおん",
        "isCorrect": true,
        "reasoning": "* **ほつおん (3) - INCORRECT:** Wrong reading for 発. Uses ほつ instead of はつ."
      },
      {
        "option": "はつねん",
        "isCorrect": true,
        "reasoning": "* **はつねん (4) - INCORRECT:** Wrong reading for 音. Uses ねん instead of おん."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 328,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "だいぶ",
      "おおぶん",
      "たいぶん",
      "だいぶん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "だいぶ",
        "isCorrect": true,
        "reasoning": "* **だいぶ (1) - CORRECT:** This is the standard reading for 大分 (greatly/much)."
      },
      {
        "option": "おおぶん",
        "isCorrect": true,
        "reasoning": "* **おおぶん (2) - INCORRECT:** Wrong reading for 大. Uses おお instead of だい."
      },
      {
        "option": "たいぶん",
        "isCorrect": true,
        "reasoning": "* **たいぶん (3) - INCORRECT:** Wrong reading for 大. Uses たい instead of だい."
      },
      {
        "option": "だいぶん",
        "isCorrect": true,
        "reasoning": "* **だいぶん (4) - INCORRECT:** Wrong reading for 分. Uses ぶん instead of ぶ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 329,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おじょうさん",
      "おむすめさん",
      "おこさん",
      "おねえさん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おじょうさん",
        "isCorrect": true,
        "reasoning": "* **おじょうさん (1) - CORRECT:** This is the standard reading for お嬢さん (young lady/daughter)."
      },
      {
        "option": "おむすめさん",
        "isCorrect": true,
        "reasoning": "* **おむすめさん (2) - INCORRECT:** This is お娘さん, not お嬢さん."
      },
      {
        "option": "おこさん",
        "isCorrect": true,
        "reasoning": "* **おこさん (3) - INCORRECT:** This is お子さん (child), not お嬢さん."
      },
      {
        "option": "おねえさん",
        "isCorrect": true,
        "reasoning": "* **おねえさん (4) - INCORRECT:** This is お姉さん (older sister), not お嬢さん."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 330,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "たてる",
      "けんてる",
      "つくる",
      "こんりゅう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "たてる",
        "isCorrect": true,
        "reasoning": "* **たてる (1) - CORRECT:** This is the standard reading for 建てる (to build)."
      },
      {
        "option": "けんてる",
        "isCorrect": true,
        "reasoning": "* **けんてる (2) - INCORRECT:** Wrong reading. Uses けん instead of た."
      },
      {
        "option": "つくる",
        "isCorrect": true,
        "reasoning": "* **つくる (3) - INCORRECT:** This is 作る (to make), not 建てる."
      },
      {
        "option": "こんりゅう",
        "isCorrect": true,
        "reasoning": "* **こんりゅう (4) - INCORRECT:** This is 建立 (construction), not 建てる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 331,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "このごろ",
      "このころ",
      "こんごろ",
      "このぐろ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "このごろ",
        "isCorrect": true,
        "reasoning": "* **このごろ (1) - CORRECT:** This is the standard reading for このごろ (these days)."
      },
      {
        "option": "このころ",
        "isCorrect": true,
        "reasoning": "* **このころ (2) - INCORRECT:** Wrong reading. Uses ころ instead of ごろ."
      },
      {
        "option": "こんごろ",
        "isCorrect": true,
        "reasoning": "* **こんごろ (3) - INCORRECT:** Wrong reading. Uses こん instead of この."
      },
      {
        "option": "このぐろ",
        "isCorrect": true,
        "reasoning": "* **このぐろ (4) - INCORRECT:** Wrong reading. Uses ぐろ instead of ごろ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 332,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ビル",
      "ビール",
      "ビリ",
      "ビロ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ビル",
        "isCorrect": true,
        "reasoning": "* **ビル (1) - CORRECT:** This is the standard reading for ビル (building)."
      },
      {
        "option": "ビール",
        "isCorrect": true,
        "reasoning": "* **ビール (2) - INCORRECT:** This is ビール (beer), not ビル."
      },
      {
        "option": "ビリ",
        "isCorrect": true,
        "reasoning": "* **ビリ (3) - INCORRECT:** Wrong reading. Uses リ instead of ル."
      },
      {
        "option": "ビロ",
        "isCorrect": true,
        "reasoning": "* **ビロ (4) - INCORRECT:** Wrong reading. Uses ロ instead of ル."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 333,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "じゃま",
      "じゃあま",
      "しゃま",
      "じゃば"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "じゃま",
        "isCorrect": true,
        "reasoning": "* **じゃま (1) - CORRECT:** This is the standard reading for じゃま (hindrance)."
      },
      {
        "option": "じゃあま",
        "isCorrect": true,
        "reasoning": "* **じゃあま (2) - INCORRECT:** Wrong length. Uses あ instead of short vowel."
      },
      {
        "option": "しゃま",
        "isCorrect": true,
        "reasoning": "* **しゃま (3) - INCORRECT:** Wrong consonant. Uses しゃ instead of じゃ."
      },
      {
        "option": "じゃば",
        "isCorrect": true,
        "reasoning": "* **じゃば (4) - INCORRECT:** Wrong ending. Uses ば instead of ま."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 334,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しかる",
      "ぜんる",
      "そんる",
      "ねんる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しかる",
        "isCorrect": true,
        "reasoning": "* **しかる (1) - CORRECT:** This is the standard reading for 然る (a certain)."
      },
      {
        "option": "ぜんる",
        "isCorrect": true,
        "reasoning": "* **ぜんる (2) - INCORRECT:** Wrong reading. Uses ぜん instead of しか."
      },
      {
        "option": "そんる",
        "isCorrect": true,
        "reasoning": "* **そんる (3) - INCORRECT:** Wrong reading. Uses そん instead of しか."
      },
      {
        "option": "ねんる",
        "isCorrect": true,
        "reasoning": "* **ねんる (4) - INCORRECT:** Wrong reading. Uses ねん instead of しか."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 335,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "うん",
      "うーん",
      "あん",
      "いん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "うん",
        "isCorrect": true,
        "reasoning": "* **うん (1) - CORRECT:** This is the standard reading for うん (informal yes)."
      },
      {
        "option": "うーん",
        "isCorrect": true,
        "reasoning": "* **うーん (2) - INCORRECT:** This is うーん (hmm), not うん."
      },
      {
        "option": "あん",
        "isCorrect": true,
        "reasoning": "* **あん (3) - INCORRECT:** Wrong vowel. Uses あん instead of うん."
      },
      {
        "option": "いん",
        "isCorrect": true,
        "reasoning": "* **いん (4) - INCORRECT:** Wrong vowel. Uses いん instead of うん."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 336,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おどり",
      "とうり",
      "ようり",
      "どうり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おどり",
        "isCorrect": true,
        "reasoning": "* **おどり (1) - CORRECT:** This is the standard reading for 踊り (dance)."
      },
      {
        "option": "とうり",
        "isCorrect": true,
        "reasoning": "* **とうり (2) - INCORRECT:** Wrong reading. Uses とう instead of おど."
      },
      {
        "option": "ようり",
        "isCorrect": true,
        "reasoning": "* **ようり (3) - INCORRECT:** Wrong reading. Uses よう instead of おど."
      },
      {
        "option": "どうり",
        "isCorrect": true,
        "reasoning": "* **どうり (4) - INCORRECT:** Wrong reading. Uses どう instead of おど."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 337,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しゃちょう",
      "かいちょう",
      "しゃなが",
      "しゃおさ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しゃちょう",
        "isCorrect": true,
        "reasoning": "* **しゃちょう (1) - CORRECT:** This is the standard reading for 社長 (company president)."
      },
      {
        "option": "かいちょう",
        "isCorrect": true,
        "reasoning": "* **かいちょう (2) - INCORRECT:** This is 会長 (chairman), not 社長."
      },
      {
        "option": "しゃなが",
        "isCorrect": true,
        "reasoning": "* **しゃなが (3) - INCORRECT:** Wrong reading for 長. Uses なが instead of ちょう."
      },
      {
        "option": "しゃおさ",
        "isCorrect": true,
        "reasoning": "* **しゃおさ (4) - INCORRECT:** Wrong reading for 長. Uses おさ instead of ちょう."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 338,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "てぶくろ",
      "しゅぶくろ",
      "てふくろ",
      "でぶくろ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "てぶくろ",
        "isCorrect": true,
        "reasoning": "* **てぶくろ (1) - CORRECT:** This is the standard reading for 手袋 (glove)."
      },
      {
        "option": "しゅぶくろ",
        "isCorrect": true,
        "reasoning": "* **しゅぶくろ (2) - INCORRECT:** Wrong reading for 手. Uses しゅ instead of て."
      },
      {
        "option": "てふくろ",
        "isCorrect": true,
        "reasoning": "* **てふくろ (3) - INCORRECT:** Wrong consonant. Uses ふ instead of ぶ."
      },
      {
        "option": "でぶくろ",
        "isCorrect": true,
        "reasoning": "* **でぶくろ (4) - INCORRECT:** Wrong consonant. Uses で instead of て."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 339,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "きめる",
      "けつめる",
      "さだめる",
      "ていめる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "きめる",
        "isCorrect": true,
        "reasoning": "* **きめる (1) - CORRECT:** This is the standard reading for 決める (to decide)."
      },
      {
        "option": "けつめる",
        "isCorrect": true,
        "reasoning": "* **けつめる (2) - INCORRECT:** Wrong reading. Uses けつ instead of き."
      },
      {
        "option": "さだめる",
        "isCorrect": true,
        "reasoning": "* **さだめる (3) - INCORRECT:** This is 定める (to establish), not 決める."
      },
      {
        "option": "ていめる",
        "isCorrect": true,
        "reasoning": "* **ていめる (4) - INCORRECT:** Wrong reading. Uses てい instead of き."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 340,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "だんぼう",
      "あたたかぼう",
      "だんぼ",
      "なんぼう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "だんぼう",
        "isCorrect": true,
        "reasoning": "* **だんぼう (1) - CORRECT:** This is the standard reading for 暖房 (heating)."
      },
      {
        "option": "あたたかぼう",
        "isCorrect": true,
        "reasoning": "* **あたたかぼう (2) - INCORRECT:** Wrong reading for 暖. Uses あたたか instead of だん."
      },
      {
        "option": "だんぼ",
        "isCorrect": true,
        "reasoning": "* **だんぼ (3) - INCORRECT:** Wrong reading for 房. Uses ぼ instead of ぼう."
      },
      {
        "option": "なんぼう",
        "isCorrect": true,
        "reasoning": "* **なんぼう (4) - INCORRECT:** Wrong reading for 暖. Uses なん instead of だん."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 341,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "きこえる",
      "ききえる",
      "ぶんこえる",
      "もんこえる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "きこえる",
        "isCorrect": true,
        "reasoning": "* **きこえる (1) - CORRECT:** This is the standard reading for 聞こえる (to be heard)."
      },
      {
        "option": "ききえる",
        "isCorrect": true,
        "reasoning": "* **ききえる (2) - INCORRECT:** Wrong reading. Uses きき instead of きこ."
      },
      {
        "option": "ぶんこえる",
        "isCorrect": true,
        "reasoning": "* **ぶんこえる (3) - INCORRECT:** Wrong reading for 聞. Uses ぶん instead of きこ."
      },
      {
        "option": "もんこえる",
        "isCorrect": true,
        "reasoning": "* **もんこえる (4) - INCORRECT:** Wrong reading for 聞. Uses もん instead of きこ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 342,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "みずうみ",
      "こ",
      "うみ",
      "いけ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "みずうみ",
        "isCorrect": true,
        "reasoning": "* **みずうみ (1) - CORRECT:** This is the standard reading for 湖 (lake)."
      },
      {
        "option": "こ",
        "isCorrect": true,
        "reasoning": "* **こ (2) - INCORRECT:** This is the on'yomi reading, not used alone."
      },
      {
        "option": "うみ",
        "isCorrect": true,
        "reasoning": "* **うみ (3) - INCORRECT:** This is 海 (sea/ocean), not 湖."
      },
      {
        "option": "いけ",
        "isCorrect": true,
        "reasoning": "* **いけ (4) - INCORRECT:** This is 池 (pond), not 湖."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 343,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "いし",
      "せき",
      "こく",
      "がん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いし",
        "isCorrect": true,
        "reasoning": "* **いし (1) - CORRECT:** This is the standard reading for 石 (stone)."
      },
      {
        "option": "せき",
        "isCorrect": true,
        "reasoning": "* **せき (2) - INCORRECT:** This is the on'yomi reading used in compounds."
      },
      {
        "option": "こく",
        "isCorrect": true,
        "reasoning": "* **こく (3) - INCORRECT:** Wrong on'yomi reading. This is not 石."
      },
      {
        "option": "がん",
        "isCorrect": true,
        "reasoning": "* **がん (4) - INCORRECT:** This is 岩 (rock), not 石."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 344,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "タイプ",
      "タイープ",
      "ダイプ",
      "タイブ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "タイプ",
        "isCorrect": true,
        "reasoning": "* **タイプ (1) - CORRECT:** This is the standard reading for タイプ (type)."
      },
      {
        "option": "タイープ",
        "isCorrect": true,
        "reasoning": "* **タイープ (2) - INCORRECT:** Wrong length. Uses long vowel イー."
      },
      {
        "option": "ダイプ",
        "isCorrect": true,
        "reasoning": "* **ダイプ (3) - INCORRECT:** Wrong consonant. Uses ダ instead of タ."
      },
      {
        "option": "タイブ",
        "isCorrect": true,
        "reasoning": "* **タイブ (4) - INCORRECT:** Wrong ending. Uses ブ instead of プ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 345,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かいぎ",
      "えぎ",
      "かいき",
      "あいぎ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かいぎ",
        "isCorrect": true,
        "reasoning": "* **かいぎ (1) - CORRECT:** This is the standard reading for 会議 (meeting)."
      },
      {
        "option": "えぎ",
        "isCorrect": true,
        "reasoning": "* **えぎ (2) - INCORRECT:** Wrong reading for 会. Uses え instead of かい."
      },
      {
        "option": "かいき",
        "isCorrect": true,
        "reasoning": "* **かいき (3) - INCORRECT:** Wrong reading for 議. Uses き instead of ぎ."
      },
      {
        "option": "あいぎ",
        "isCorrect": true,
        "reasoning": "* **あいぎ (4) - INCORRECT:** Wrong reading for 会. Uses あい instead of かい."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 346,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "つもり",
      "つぼり",
      "ともり",
      "つまり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "つもり",
        "isCorrect": true,
        "reasoning": "* **つもり (1) - CORRECT:** This is the standard reading for つもり (intention)."
      },
      {
        "option": "つぼり",
        "isCorrect": true,
        "reasoning": "* **つぼり (2) - INCORRECT:** Wrong consonant. Uses ぼ instead of も."
      },
      {
        "option": "ともり",
        "isCorrect": true,
        "reasoning": "* **ともり (3) - INCORRECT:** Wrong vowel. Uses と instead of つ."
      },
      {
        "option": "つまり",
        "isCorrect": true,
        "reasoning": "* **つまり (4) - INCORRECT:** This is つまり (in other words), not つもり."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 347,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "どんどん",
      "だんだん",
      "どうどう",
      "どんだん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "どんどん",
        "isCorrect": true,
        "reasoning": "* **どんどん (1) - CORRECT:** This is the standard reading for どんどん (more and more)."
      },
      {
        "option": "だんだん",
        "isCorrect": true,
        "reasoning": "* **だんだん (2) - INCORRECT:** This is だんだん (gradually), not どんどん."
      },
      {
        "option": "どうどう",
        "isCorrect": true,
        "reasoning": "* **どうどう (3) - INCORRECT:** This is 堂々 (dignified), not どんどん."
      },
      {
        "option": "どんだん",
        "isCorrect": true,
        "reasoning": "* **どんだん (4) - INCORRECT:** Wrong reading. Uses だん instead of どん."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 348,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "つき",
      "げつ",
      "がつ",
      "つく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "つき",
        "isCorrect": true,
        "reasoning": "* **つき (1) - CORRECT:** This is the standard reading for 月 (moon) when used alone."
      },
      {
        "option": "げつ",
        "isCorrect": true,
        "reasoning": "* **げつ (2) - INCORRECT:** This is the on'yomi reading used in compounds like 月曜日."
      },
      {
        "option": "がつ",
        "isCorrect": true,
        "reasoning": "* **がつ (3) - INCORRECT:** This is the reading for months like 一月."
      },
      {
        "option": "つく",
        "isCorrect": true,
        "reasoning": "* **つく (4) - INCORRECT:** Wrong reading. Uses つく instead of つき."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 349,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "れいぼう",
      "ひやしぼう",
      "つめたいぼう",
      "れいほう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "れいぼう",
        "isCorrect": true,
        "reasoning": "* **れいぼう (1) - CORRECT:** This is the standard reading for 冷房 (air conditioning)."
      },
      {
        "option": "ひやしぼう",
        "isCorrect": true,
        "reasoning": "* **ひやしぼう (2) - INCORRECT:** Wrong reading for 冷. Uses ひやし instead of れい."
      },
      {
        "option": "つめたいぼう",
        "isCorrect": true,
        "reasoning": "* **つめたいぼう (3) - INCORRECT:** Wrong reading for 冷. Uses つめたい instead of れい."
      },
      {
        "option": "れいほう",
        "isCorrect": true,
        "reasoning": "* **れいほう (4) - INCORRECT:** Wrong reading for 房. Uses ほう instead of ぼう."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 350,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ハンドバッグ",
      "ハンドバック",
      "ハンドパッグ",
      "ハンドバーグ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ハンドバッグ",
        "isCorrect": true,
        "reasoning": "* **ハンドバッグ (1) - CORRECT:** This is the standard reading for ハンドバッグ (handbag)."
      },
      {
        "option": "ハンドバック",
        "isCorrect": true,
        "reasoning": "* **ハンドバック (2) - INCORRECT:** Wrong ending. Uses バック instead of バッグ."
      },
      {
        "option": "ハンドパッグ",
        "isCorrect": true,
        "reasoning": "* **ハンドパッグ (3) - INCORRECT:** Wrong consonant. Uses パッグ instead of バッグ."
      },
      {
        "option": "ハンドバーグ",
        "isCorrect": true,
        "reasoning": "* **ハンドバーグ (4) - INCORRECT:** This is ハンバーグ (hamburger), not ハンドバッグ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 351,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ほど",
      "てい",
      "ほう",
      "どう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ほど",
        "isCorrect": true,
        "reasoning": "* **ほど (1) - CORRECT:** This is the standard reading for 程 (extent/degree)."
      },
      {
        "option": "てい",
        "isCorrect": true,
        "reasoning": "* **てい (2) - INCORRECT:** Wrong on'yomi reading. Uses てい instead of ほど."
      },
      {
        "option": "ほう",
        "isCorrect": true,
        "reasoning": "* **ほう (3) - INCORRECT:** Wrong reading. Uses ほう instead of ほど."
      },
      {
        "option": "どう",
        "isCorrect": true,
        "reasoning": "* **どう (4) - INCORRECT:** Wrong reading. Uses どう instead of ほど."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 352,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "れんらく",
      "れんがく",
      "つうらく",
      "りんらく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "れんらく",
        "isCorrect": true,
        "reasoning": "* **れんらく (1) - CORRECT:** This is the standard reading for 連絡 (contact)."
      },
      {
        "option": "れんがく",
        "isCorrect": true,
        "reasoning": "* **れんがく (2) - INCORRECT:** Wrong reading for 絡. Uses がく instead of らく."
      },
      {
        "option": "つうらく",
        "isCorrect": true,
        "reasoning": "* **つうらく (3) - INCORRECT:** Wrong reading for 連. Uses つう instead of れん."
      },
      {
        "option": "りんらく",
        "isCorrect": true,
        "reasoning": "* **りんらく (4) - INCORRECT:** Wrong reading for 連. Uses りん instead of れん."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 353,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "もどる",
      "かえる",
      "ぼどる",
      "れいる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "もどる",
        "isCorrect": true,
        "reasoning": "* **もどる (1) - CORRECT:** This is the standard reading for 戻る (to return/go back)."
      },
      {
        "option": "かえる",
        "isCorrect": true,
        "reasoning": "* **かえる (2) - INCORRECT:** This is 帰る (to go home), not 戻る."
      },
      {
        "option": "ぼどる",
        "isCorrect": true,
        "reasoning": "* **ぼどる (3) - INCORRECT:** Wrong reading. Uses ぼ instead of も."
      },
      {
        "option": "れいる",
        "isCorrect": true,
        "reasoning": "* **れいる (4) - INCORRECT:** Wrong reading. Uses れい instead of もど."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 354,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おれる",
      "せつれる",
      "われる",
      "きれる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おれる",
        "isCorrect": true,
        "reasoning": "* **おれる (1) - CORRECT:** This is the standard reading for 折れる (to break/snap)."
      },
      {
        "option": "せつれる",
        "isCorrect": true,
        "reasoning": "* **せつれる (2) - INCORRECT:** Wrong reading. Uses せつ instead of お."
      },
      {
        "option": "われる",
        "isCorrect": true,
        "reasoning": "* **われる (3) - INCORRECT:** This is 割れる (to crack/split), not 折れる."
      },
      {
        "option": "きれる",
        "isCorrect": true,
        "reasoning": "* **きれる (4) - INCORRECT:** This is 切れる (to cut/break), not 折れる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 355,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "いがい",
      "いそと",
      "いほか",
      "いげ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いがい",
        "isCorrect": true,
        "reasoning": "* **いがい (1) - CORRECT:** This is the standard reading for 以外 (except/other than)."
      },
      {
        "option": "いそと",
        "isCorrect": true,
        "reasoning": "* **いそと (2) - INCORRECT:** Wrong reading for 外. Uses そと instead of がい."
      },
      {
        "option": "いほか",
        "isCorrect": true,
        "reasoning": "* **いほか (3) - INCORRECT:** Wrong reading for 外. Uses ほか instead of がい."
      },
      {
        "option": "いげ",
        "isCorrect": true,
        "reasoning": "* **いげ (4) - INCORRECT:** Wrong reading for 外. Uses げ instead of がい."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 356,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しばらく",
      "しばらぐ",
      "じばらく",
      "しぱらく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しばらく",
        "isCorrect": true,
        "reasoning": "* **しばらく (1) - CORRECT:** This is the standard reading for しばらく (for a while)."
      },
      {
        "option": "しばらぐ",
        "isCorrect": true,
        "reasoning": "* **しばらぐ (2) - INCORRECT:** Wrong ending. Uses ぐ instead of く."
      },
      {
        "option": "じばらく",
        "isCorrect": true,
        "reasoning": "* **じばらく (3) - INCORRECT:** Wrong consonant. Uses じ instead of し."
      },
      {
        "option": "しぱらく",
        "isCorrect": true,
        "reasoning": "* **しぱらく (4) - INCORRECT:** Wrong consonant. Uses ぱ instead of ば."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 357,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しんぶんしゃ",
      "しんもんしゃ",
      "あたらしいぶんしゃ",
      "しんぶんじゃ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しんぶんしゃ",
        "isCorrect": true,
        "reasoning": "* **しんぶんしゃ (1) - CORRECT:** This is the standard reading for 新聞社 (newspaper company)."
      },
      {
        "option": "しんもんしゃ",
        "isCorrect": true,
        "reasoning": "* **しんもんしゃ (2) - INCORRECT:** Wrong reading for 聞. Uses もん instead of ぶん."
      },
      {
        "option": "あたらしいぶんしゃ",
        "isCorrect": true,
        "reasoning": "* **あたらしいぶんしゃ (3) - INCORRECT:** Wrong reading for 新. Uses あたらしい instead of しん."
      },
      {
        "option": "しんぶんじゃ",
        "isCorrect": true,
        "reasoning": "* **しんぶんじゃ (4) - INCORRECT:** Wrong reading for 社. Uses じゃ instead of しゃ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 358,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おくりもの",
      "ぞうりもの",
      "そうりもの",
      "おくりぶつ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おくりもの",
        "isCorrect": true,
        "reasoning": "* **おくりもの (1) - CORRECT:** This is the standard reading for 贈り物 (gift)."
      },
      {
        "option": "ぞうりもの",
        "isCorrect": true,
        "reasoning": "* **ぞうりもの (2) - INCORRECT:** Wrong reading for 贈. Uses ぞう instead of おく."
      },
      {
        "option": "そうりもの",
        "isCorrect": true,
        "reasoning": "* **そうりもの (3) - INCORRECT:** Wrong reading for 贈. Uses そう instead of おく."
      },
      {
        "option": "おくりぶつ",
        "isCorrect": true,
        "reasoning": "* **おくりぶつ (4) - INCORRECT:** Wrong reading for 物. Uses ぶつ instead of もの."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 359,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "うけつけ",
      "じゅつけ",
      "うけふ",
      "しゅけい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "うけつけ",
        "isCorrect": true,
        "reasoning": "* **うけつけ (1) - CORRECT:** This is the standard reading for 受付 (reception)."
      },
      {
        "option": "じゅつけ",
        "isCorrect": true,
        "reasoning": "* **じゅつけ (2) - INCORRECT:** Wrong reading for 受. Uses じゅ instead of うけ."
      },
      {
        "option": "うけふ",
        "isCorrect": true,
        "reasoning": "* **うけふ (3) - INCORRECT:** Wrong reading for 付. Uses ふ instead of つけ."
      },
      {
        "option": "しゅけい",
        "isCorrect": true,
        "reasoning": "* **しゅけい (4) - INCORRECT:** Wrong reading. Uses しゅけい instead of うけつけ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 360,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "けしき",
      "けいしょく",
      "かげいろ",
      "けいしき"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "けしき",
        "isCorrect": true,
        "reasoning": "* **けしき (1) - CORRECT:** This is the standard reading for 景色 (scenery)."
      },
      {
        "option": "けいしょく",
        "isCorrect": true,
        "reasoning": "* **けいしょく (2) - INCORRECT:** Wrong on'yomi reading. Uses けい・しょく instead of けしき."
      },
      {
        "option": "かげいろ",
        "isCorrect": true,
        "reasoning": "* **かげいろ (3) - INCORRECT:** Wrong reading. Uses かげ・いろ instead of けしき."
      },
      {
        "option": "けいしき",
        "isCorrect": true,
        "reasoning": "* **けいしき (4) - INCORRECT:** Wrong reading. Uses けい・しき instead of けしき."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 361,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ふとん",
      "ぬのだん",
      "ふだん",
      "ぶとん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ふとん",
        "isCorrect": true,
        "reasoning": "* **ふとん (1) - CORRECT:** This is the standard reading for 布団 (futon bedding)."
      },
      {
        "option": "ぬのだん",
        "isCorrect": true,
        "reasoning": "* **ぬのだん (2) - INCORRECT:** Wrong reading for 布. Uses ぬの instead of ふ."
      },
      {
        "option": "ふだん",
        "isCorrect": true,
        "reasoning": "* **ふだん (3) - INCORRECT:** This is 普段 (usually), not 布団."
      },
      {
        "option": "ぶとん",
        "isCorrect": true,
        "reasoning": "* **ぶとん (4) - INCORRECT:** Wrong consonant. Uses ぶ instead of ふ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 362,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "あやまる",
      "わびる",
      "しゃざい",
      "あやまつ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "あやまる",
        "isCorrect": true,
        "reasoning": "* **あやまる (1) - CORRECT:** This is the standard reading for 謝る (to apologize)."
      },
      {
        "option": "わびる",
        "isCorrect": true,
        "reasoning": "* **わびる (2) - INCORRECT:** This is 詫びる (to apologize), not 謝る."
      },
      {
        "option": "しゃざい",
        "isCorrect": true,
        "reasoning": "* **しゃざい (3) - INCORRECT:** This is 謝罪 (apology noun), not the verb 謝る."
      },
      {
        "option": "あやまつ",
        "isCorrect": true,
        "reasoning": "* **あやまつ (4) - INCORRECT:** Wrong ending. Uses つ instead of る."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 363,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "まちがえる",
      "あやまる",
      "ちがえる",
      "まちがう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "まちがえる",
        "isCorrect": true,
        "reasoning": "* **まちがえる (1) - CORRECT:** This is the standard reading for 間違える (to make a mistake)."
      },
      {
        "option": "あやまる",
        "isCorrect": true,
        "reasoning": "* **あやまる (2) - INCORRECT:** This is 謝る (to apologize), not 間違える."
      },
      {
        "option": "ちがえる",
        "isCorrect": true,
        "reasoning": "* **ちがえる (3) - INCORRECT:** Wrong reading. Uses ちが instead of まちが."
      },
      {
        "option": "まちがう",
        "isCorrect": true,
        "reasoning": "* **まちがう (4) - INCORRECT:** This is 間違う (to be wrong), not 間違える."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 364,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "せいかつ",
      "なまかつ",
      "しょうかつ",
      "いきかつ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "せいかつ",
        "isCorrect": true,
        "reasoning": "* **せいかつ (1) - CORRECT:** This is the standard reading for 生活 (life/living)."
      },
      {
        "option": "なまかつ",
        "isCorrect": true,
        "reasoning": "* **なまかつ (2) - INCORRECT:** Wrong reading for 生. Uses なま instead of せい."
      },
      {
        "option": "しょうかつ",
        "isCorrect": true,
        "reasoning": "* **しょうかつ (3) - INCORRECT:** Wrong reading for 生. Uses しょう instead of せい."
      },
      {
        "option": "いきかつ",
        "isCorrect": true,
        "reasoning": "* **いきかつ (4) - INCORRECT:** Wrong reading for 生. Uses いき instead of せい."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 365,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "うち",
      "ない",
      "だい",
      "なか"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "うち",
        "isCorrect": true,
        "reasoning": "* **うち (1) - CORRECT:** This is the standard reading for 内 (inside/within)."
      },
      {
        "option": "ない",
        "isCorrect": true,
        "reasoning": "* **ない (2) - INCORRECT:** Wrong on'yomi reading. Uses ない instead of うち."
      },
      {
        "option": "だい",
        "isCorrect": true,
        "reasoning": "* **だい (3) - INCORRECT:** Wrong reading. Uses だい instead of うち."
      },
      {
        "option": "なか",
        "isCorrect": true,
        "reasoning": "* **なか (4) - INCORRECT:** This is 中 (inside), not 内."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 366,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "あつめる",
      "しゅうめる",
      "まとめる",
      "つどめる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "あつめる",
        "isCorrect": true,
        "reasoning": "* **あつめる (1) - CORRECT:** This is the standard reading for 集める (to collect)."
      },
      {
        "option": "しゅうめる",
        "isCorrect": true,
        "reasoning": "* **しゅうめる (2) - INCORRECT:** Wrong reading. Uses しゅう instead of あつ."
      },
      {
        "option": "まとめる",
        "isCorrect": true,
        "reasoning": "* **まとめる (3) - INCORRECT:** This is まとめる (to summarize), not 集める."
      },
      {
        "option": "つどめる",
        "isCorrect": true,
        "reasoning": "* **つどめる (4) - INCORRECT:** Wrong reading. Uses つど instead of あつ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 367,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "こうとうがっこう",
      "たかとうがっこう",
      "こうどうがっこう",
      "こうとがっこう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こうとうがっこう",
        "isCorrect": true,
        "reasoning": "* **こうとうがっこう (1) - CORRECT:** This is the standard reading for 高等学校 (high school)."
      },
      {
        "option": "たかとうがっこう",
        "isCorrect": true,
        "reasoning": "* **たかとうがっこう (2) - INCORRECT:** Wrong reading for 高. Uses たか instead of こう."
      },
      {
        "option": "こうどうがっこう",
        "isCorrect": true,
        "reasoning": "* **こうどうがっこう (3) - INCORRECT:** Wrong reading for 等. Uses どう instead of とう."
      },
      {
        "option": "こうとがっこう",
        "isCorrect": true,
        "reasoning": "* **こうとがっこう (4) - INCORRECT:** Wrong reading for 等. Uses と instead of とう."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 368,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "きそく",
      "きしょく",
      "きぞく",
      "ぎそく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "きそく",
        "isCorrect": true,
        "reasoning": "* **きそく (1) - CORRECT:** This is the standard reading for 規則 (rules/regulations)."
      },
      {
        "option": "きしょく",
        "isCorrect": true,
        "reasoning": "* **きしょく (2) - INCORRECT:** Wrong reading for 則. Uses しょく instead of そく."
      },
      {
        "option": "きぞく",
        "isCorrect": true,
        "reasoning": "* **きぞく (3) - INCORRECT:** Wrong reading for 則. Uses ぞく instead of そく."
      },
      {
        "option": "ぎそく",
        "isCorrect": true,
        "reasoning": "* **ぎそく (4) - INCORRECT:** Wrong reading for 規. Uses ぎ instead of き."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 369,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ぎじゅつ",
      "わざじゅつ",
      "きじゅつ",
      "ぎすべ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ぎじゅつ",
        "isCorrect": true,
        "reasoning": "* **ぎじゅつ (1) - CORRECT:** This is the standard reading for 技術 (technology/skill)."
      },
      {
        "option": "わざじゅつ",
        "isCorrect": true,
        "reasoning": "* **わざじゅつ (2) - INCORRECT:** Wrong reading for 技. Uses わざ instead of ぎ."
      },
      {
        "option": "きじゅつ",
        "isCorrect": true,
        "reasoning": "* **きじゅつ (3) - INCORRECT:** Wrong reading for 技. Uses き instead of ぎ."
      },
      {
        "option": "ぎすべ",
        "isCorrect": true,
        "reasoning": "* **ぎすべ (4) - INCORRECT:** Wrong reading for 術. Uses すべ instead of じゅつ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 370,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "さげる",
      "おろす",
      "くだげる",
      "したげる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "さげる",
        "isCorrect": true,
        "reasoning": "* **さげる (1) - CORRECT:** This is the standard reading for 下げる (to lower/hang down)."
      },
      {
        "option": "おろす",
        "isCorrect": true,
        "reasoning": "* **おろす (2) - INCORRECT:** This is 降ろす (to unload), not 下げる."
      },
      {
        "option": "くだげる",
        "isCorrect": true,
        "reasoning": "* **くだげる (3) - INCORRECT:** Wrong reading. Uses くだ instead of さ."
      },
      {
        "option": "したげる",
        "isCorrect": true,
        "reasoning": "* **したげる (4) - INCORRECT:** Wrong reading. Uses した instead of さ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 371,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "なげる",
      "とうげる",
      "ほうげる",
      "だげる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "なげる",
        "isCorrect": true,
        "reasoning": "* **なげる (1) - CORRECT:** This is the standard reading for 投げる (to throw)."
      },
      {
        "option": "とうげる",
        "isCorrect": true,
        "reasoning": "* **とうげる (2) - INCORRECT:** Wrong reading. Uses とう instead of な."
      },
      {
        "option": "ほうげる",
        "isCorrect": true,
        "reasoning": "* **ほうげる (3) - INCORRECT:** Wrong reading. Uses ほう instead of な."
      },
      {
        "option": "だげる",
        "isCorrect": true,
        "reasoning": "* **だげる (4) - INCORRECT:** Wrong reading. Uses だ instead of な."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 372,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "こわい",
      "おそろしい",
      "きょうふ",
      "ふあん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こわい",
        "isCorrect": true,
        "reasoning": "* **こわい (1) - CORRECT:** This is the standard reading for 怖い (scary/frightening)."
      },
      {
        "option": "おそろしい",
        "isCorrect": true,
        "reasoning": "* **おそろしい (2) - INCORRECT:** This is 恐ろしい (terrifying), not 怖い."
      },
      {
        "option": "きょうふ",
        "isCorrect": true,
        "reasoning": "* **きょうふ (3) - INCORRECT:** This is 恐怖 (fear noun), not the adjective 怖い."
      },
      {
        "option": "ふあん",
        "isCorrect": true,
        "reasoning": "* **ふあん (4) - INCORRECT:** This is 不安 (anxiety), not 怖い."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 373,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "さんぎょう",
      "さんごう",
      "うみぎょう",
      "さんぎょ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "さんぎょう",
        "isCorrect": true,
        "reasoning": "* **さんぎょう (1) - CORRECT:** This is the standard reading for 産業 (industry)."
      },
      {
        "option": "さんごう",
        "isCorrect": true,
        "reasoning": "* **さんごう (2) - INCORRECT:** Wrong reading for 業. Uses ごう instead of ぎょう."
      },
      {
        "option": "うみぎょう",
        "isCorrect": true,
        "reasoning": "* **うみぎょう (3) - INCORRECT:** Wrong reading for 産. Uses うみ instead of さん."
      },
      {
        "option": "さんぎょ",
        "isCorrect": true,
        "reasoning": "* **さんぎょ (4) - INCORRECT:** Wrong reading for 業. Uses ぎょ instead of ぎょう."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 374,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おと",
      "ね",
      "おん",
      "いん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おと",
        "isCorrect": true,
        "reasoning": "* **おと (1) - CORRECT:** This is the standard reading for 音 (sound) when used alone."
      },
      {
        "option": "ね",
        "isCorrect": true,
        "reasoning": "* **ね (2) - INCORRECT:** This is the reading used in music terms like 音符."
      },
      {
        "option": "おん",
        "isCorrect": true,
        "reasoning": "* **おん (3) - INCORRECT:** This is the on'yomi reading used in compounds."
      },
      {
        "option": "いん",
        "isCorrect": true,
        "reasoning": "* **いん (4) - INCORRECT:** This is the reading for 韻 (rhyme), not 音."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 375,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "あじ",
      "み",
      "びみ",
      "あじわい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "あじ",
        "isCorrect": true,
        "reasoning": "* **あじ (1) - CORRECT:** This is the standard reading for 味 (taste/flavor)."
      },
      {
        "option": "み",
        "isCorrect": true,
        "reasoning": "* **み (2) - INCORRECT:** This is the on'yomi reading used in compounds."
      },
      {
        "option": "びみ",
        "isCorrect": true,
        "reasoning": "* **びみ (3) - INCORRECT:** Wrong reading. Uses び instead of あ."
      },
      {
        "option": "あじわい",
        "isCorrect": true,
        "reasoning": "* **あじわい (4) - INCORRECT:** This is 味わい (flavor/taste), not just 味."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 376,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "におい",
      "かおり",
      "しゅうき",
      "くさみ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "におい",
        "isCorrect": true,
        "reasoning": "* **におい (1) - CORRECT:** This is the standard reading for におい (smell/scent)."
      },
      {
        "option": "かおり",
        "isCorrect": true,
        "reasoning": "* **かおり (2) - INCORRECT:** This is 香り (fragrance), not におい."
      },
      {
        "option": "しゅうき",
        "isCorrect": true,
        "reasoning": "* **しゅうき (3) - INCORRECT:** This is 臭気 (odor), not におい."
      },
      {
        "option": "くさみ",
        "isCorrect": true,
        "reasoning": "* **くさみ (4) - INCORRECT:** This is 臭み (bad smell), not におい."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 377,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "こわす",
      "やぶる",
      "われる",
      "くずす"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こわす",
        "isCorrect": true,
        "reasoning": "* **こわす (1) - CORRECT:** This is the standard reading for 壊す (to break)."
      },
      {
        "option": "やぶる",
        "isCorrect": true,
        "reasoning": "* **やぶる (2) - INCORRECT:** This is 破る (to tear), not 壊す."
      },
      {
        "option": "われる",
        "isCorrect": true,
        "reasoning": "* **われる (3) - INCORRECT:** This is 割れる (to crack), not 壊す."
      },
      {
        "option": "くずす",
        "isCorrect": true,
        "reasoning": "* **くずす (4) - INCORRECT:** This is 崩す (to collapse), not 壊す."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 378,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "けんきゅうしつ",
      "けんきゅうま",
      "けんきゅうば",
      "けんきゅうじょ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "けんきゅうしつ",
        "isCorrect": true,
        "reasoning": "* **けんきゅうしつ (1) - CORRECT:** This is the standard reading for 研究室 (research lab)."
      },
      {
        "option": "けんきゅうま",
        "isCorrect": true,
        "reasoning": "* **けんきゅうま (2) - INCORRECT:** Wrong reading for 室. Uses ま instead of しつ."
      },
      {
        "option": "けんきゅうば",
        "isCorrect": true,
        "reasoning": "* **けんきゅうば (3) - INCORRECT:** Wrong reading for 室. Uses ば instead of しつ."
      },
      {
        "option": "けんきゅうじょ",
        "isCorrect": true,
        "reasoning": "* **けんきゅうじょ (4) - INCORRECT:** Wrong reading for 室. Uses じょ instead of しつ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 379,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "さかん",
      "もりあん",
      "せいあん",
      "じょうあん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "さかん",
        "isCorrect": true,
        "reasoning": "* **さかん (1) - CORRECT:** This is the standard reading for 盛ん (prosperous/active)."
      },
      {
        "option": "もりあん",
        "isCorrect": true,
        "reasoning": "* **もりあん (2) - INCORRECT:** Wrong reading. Uses もり instead of さか."
      },
      {
        "option": "せいあん",
        "isCorrect": true,
        "reasoning": "* **せいあん (3) - INCORRECT:** Wrong reading. Uses せい instead of さか."
      },
      {
        "option": "じょうあん",
        "isCorrect": true,
        "reasoning": "* **じょうあん (4) - INCORRECT:** Wrong reading. Uses じょう instead of さか."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 380,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かれら",
      "かのじょら",
      "かれたち",
      "あのひとら"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かれら",
        "isCorrect": true,
        "reasoning": "* **かれら (1) - CORRECT:** This is the standard reading for 彼ら (they - masculine)."
      },
      {
        "option": "かのじょら",
        "isCorrect": true,
        "reasoning": "* **かのじょら (2) - INCORRECT:** This is 彼女ら (they - feminine), not 彼ら."
      },
      {
        "option": "かれたち",
        "isCorrect": true,
        "reasoning": "* **かれたち (3) - INCORRECT:** This is 彼たち (they), not 彼ら."
      },
      {
        "option": "あのひとら",
        "isCorrect": true,
        "reasoning": "* **あのひとら (4) - INCORRECT:** This is あの人ら (those people), not 彼ら."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 381,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "うんどう",
      "うごき",
      "どうさ",
      "かつどう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "うんどう",
        "isCorrect": true,
        "reasoning": "* **うんどう (1) - CORRECT:** This is the standard reading for 運動 (exercise/movement)."
      },
      {
        "option": "うごき",
        "isCorrect": true,
        "reasoning": "* **うごき (2) - INCORRECT:** This is 動き (movement), not 運動."
      },
      {
        "option": "どうさ",
        "isCorrect": true,
        "reasoning": "* **どうさ (3) - INCORRECT:** This is 動作 (action/motion), not 運動."
      },
      {
        "option": "かつどう",
        "isCorrect": true,
        "reasoning": "* **かつどう (4) - INCORRECT:** This is 活動 (activity), not 運動."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 382,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "いのる",
      "きとう",
      "ねがう",
      "いのり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いのる",
        "isCorrect": true,
        "reasoning": "* **いのる (1) - CORRECT:** This is the standard reading for 祈る (to pray)."
      },
      {
        "option": "きとう",
        "isCorrect": true,
        "reasoning": "* **きとう (2) - INCORRECT:** This is 祈祷 (prayer noun), not the verb 祈る."
      },
      {
        "option": "ねがう",
        "isCorrect": true,
        "reasoning": "* **ねがう (3) - INCORRECT:** This is 願う (to wish), not 祈る."
      },
      {
        "option": "いのり",
        "isCorrect": true,
        "reasoning": "* **いのり (4) - INCORRECT:** This is 祈り (prayer noun), not the verb 祈る."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 383,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かわく",
      "ほす",
      "かんそう",
      "からす"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かわく",
        "isCorrect": true,
        "reasoning": "* **かわく (1) - CORRECT:** This is the standard reading for 乾く (to dry)."
      },
      {
        "option": "ほす",
        "isCorrect": true,
        "reasoning": "* **ほす (2) - INCORRECT:** This is 干す (to hang out to dry), not 乾く."
      },
      {
        "option": "かんそう",
        "isCorrect": true,
        "reasoning": "* **かんそう (3) - INCORRECT:** This is 乾燥 (dryness noun), not the verb 乾く."
      },
      {
        "option": "からす",
        "isCorrect": true,
        "reasoning": "* **からす (4) - INCORRECT:** Wrong reading. Uses からす instead of かわく."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 384,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "たな",
      "だな",
      "ほんだな",
      "しょうだな"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "たな",
        "isCorrect": true,
        "reasoning": "* **たな (1) - CORRECT:** This is the standard reading for 棚 (shelf)."
      },
      {
        "option": "だな",
        "isCorrect": true,
        "reasoning": "* **だな (2) - INCORRECT:** Wrong consonant. Uses だ instead of た."
      },
      {
        "option": "ほんだな",
        "isCorrect": true,
        "reasoning": "* **ほんだな (3) - INCORRECT:** This is 本棚 (bookshelf), not just 棚."
      },
      {
        "option": "しょうだな",
        "isCorrect": true,
        "reasoning": "* **しょうだな (4) - INCORRECT:** Wrong reading. Uses しょう instead of た."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 385,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "たしか",
      "かくじつ",
      "まちがい",
      "しんじつ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "たしか",
        "isCorrect": true,
        "reasoning": "* **たしか (1) - CORRECT:** This is the standard reading for 確か (certain/definite)."
      },
      {
        "option": "かくじつ",
        "isCorrect": true,
        "reasoning": "* **かくじつ (2) - INCORRECT:** This is 確実 (certainty), not 確か."
      },
      {
        "option": "まちがい",
        "isCorrect": true,
        "reasoning": "* **まちがい (3) - INCORRECT:** This is 間違い (mistake), not 確か."
      },
      {
        "option": "しんじつ",
        "isCorrect": true,
        "reasoning": "* **しんじつ (4) - INCORRECT:** This is 真実 (truth), not 確か."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 386,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "レジ",
      "レシ",
      "カウンター",
      "レジスター"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "レジ",
        "isCorrect": true,
        "reasoning": "* **レジ (1) - CORRECT:** This is the standard reading for レジ (cash register)."
      },
      {
        "option": "レシ",
        "isCorrect": true,
        "reasoning": "* **レシ (2) - INCORRECT:** Wrong consonant. Uses シ instead of ジ."
      },
      {
        "option": "カウンター",
        "isCorrect": true,
        "reasoning": "* **カウンター (3) - INCORRECT:** This is カウンター (counter), not レジ."
      },
      {
        "option": "レジスター",
        "isCorrect": true,
        "reasoning": "* **レジスター (4) - INCORRECT:** This is the full English word, not the shortened レジ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 387,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ごみ",
      "ちり",
      "あくた",
      "くず"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ごみ",
        "isCorrect": true,
        "reasoning": "* **ごみ (1) - CORRECT:** This is the standard reading for 塵 (dust/rubbish)."
      },
      {
        "option": "ちり",
        "isCorrect": true,
        "reasoning": "* **ちり (2) - INCORRECT:** This is the on'yomi reading, less common for standalone use."
      },
      {
        "option": "あくた",
        "isCorrect": true,
        "reasoning": "* **あくた (3) - INCORRECT:** This is 芥 (rubbish), not 塵."
      },
      {
        "option": "くず",
        "isCorrect": true,
        "reasoning": "* **くず (4) - INCORRECT:** This is 屑 (waste), not 塵."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 388,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ごちそう",
      "りょうり",
      "たべもの",
      "しょくじ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ごちそう",
        "isCorrect": true,
        "reasoning": "* **ごちそう (1) - CORRECT:** This is the standard reading for ごちそう (feast/treat)."
      },
      {
        "option": "りょうり",
        "isCorrect": true,
        "reasoning": "* **りょうり (2) - INCORRECT:** This is 料理 (cooking), not ごちそう."
      },
      {
        "option": "たべもの",
        "isCorrect": true,
        "reasoning": "* **たべもの (3) - INCORRECT:** This is 食べ物 (food), not ごちそう."
      },
      {
        "option": "しょくじ",
        "isCorrect": true,
        "reasoning": "* **しょくじ (4) - INCORRECT:** This is 食事 (meal), not ごちそう."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 389,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かえり",
      "きかん",
      "もどり",
      "ふっき"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かえり",
        "isCorrect": true,
        "reasoning": "* **かえり (1) - CORRECT:** This is the standard reading for 帰り (return/way home)."
      },
      {
        "option": "きかん",
        "isCorrect": true,
        "reasoning": "* **きかん (2) - INCORRECT:** This is 帰還 (return), not 帰り."
      },
      {
        "option": "もどり",
        "isCorrect": true,
        "reasoning": "* **もどり (3) - INCORRECT:** This is 戻り (return), not 帰り."
      },
      {
        "option": "ふっき",
        "isCorrect": true,
        "reasoning": "* **ふっき (4) - INCORRECT:** This is 復帰 (comeback), not 帰り."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 390,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おかげ",
      "たすけ",
      "しえん",
      "こうか"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おかげ",
        "isCorrect": true,
        "reasoning": "* **おかげ (1) - CORRECT:** This is the standard reading for おかげ (thanks to/owing to)."
      },
      {
        "option": "たすけ",
        "isCorrect": true,
        "reasoning": "* **たすけ (2) - INCORRECT:** This is 助け (help), not おかげ."
      },
      {
        "option": "しえん",
        "isCorrect": true,
        "reasoning": "* **しえん (3) - INCORRECT:** This is 支援 (support), not おかげ."
      },
      {
        "option": "こうか",
        "isCorrect": true,
        "reasoning": "* **こうか (4) - INCORRECT:** This is 効果 (effect), not おかげ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 391,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "にかいだて",
      "にかいたて",
      "ふたかいだて",
      "にそうだて"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "にかいだて",
        "isCorrect": true,
        "reasoning": "* **にかいだて (1) - CORRECT:** This is the standard reading for 二階建て (two-story building)."
      },
      {
        "option": "にかいたて",
        "isCorrect": true,
        "reasoning": "* **にかいたて (2) - INCORRECT:** Wrong consonant. Uses たて instead of だて."
      },
      {
        "option": "ふたかいだて",
        "isCorrect": true,
        "reasoning": "* **ふたかいだて (3) - INCORRECT:** Wrong reading for 二. Uses ふた instead of に."
      },
      {
        "option": "にそうだて",
        "isCorrect": true,
        "reasoning": "* **にそうだて (4) - INCORRECT:** Wrong reading for 階. Uses そう instead of かい."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 392,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しゅうかん",
      "しゅうぞく",
      "ならわし",
      "れんしゅう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しゅうかん",
        "isCorrect": true,
        "reasoning": "* **しゅうかん (1) - CORRECT:** This is the standard reading for 習慣 (habit/custom)."
      },
      {
        "option": "しゅうぞく",
        "isCorrect": true,
        "reasoning": "* **しゅうぞく (2) - INCORRECT:** This is 習俗 (custom/tradition), not 習慣."
      },
      {
        "option": "ならわし",
        "isCorrect": true,
        "reasoning": "* **ならわし (3) - INCORRECT:** This is 慣わし (custom), not 習慣."
      },
      {
        "option": "れんしゅう",
        "isCorrect": true,
        "reasoning": "* **れんしゅう (4) - INCORRECT:** This is 練習 (practice), not 習慣."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 393,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "はいしゃ",
      "しかい",
      "はいし",
      "しいしゃ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "はいしゃ",
        "isCorrect": true,
        "reasoning": "* **はいしゃ (1) - CORRECT:** This is the standard reading for 歯医者 (dentist)."
      },
      {
        "option": "しかい",
        "isCorrect": true,
        "reasoning": "* **しかい (2) - INCORRECT:** This is 歯科医 (dental doctor), not 歯医者."
      },
      {
        "option": "はいし",
        "isCorrect": true,
        "reasoning": "* **はいし (3) - INCORRECT:** This is 歯医 (incomplete word), not 歯医者."
      },
      {
        "option": "しいしゃ",
        "isCorrect": true,
        "reasoning": "* **しいしゃ (4) - INCORRECT:** Wrong reading. Uses しい instead of はい."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 394,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "やむ",
      "とまる",
      "とめる",
      "やめる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "やむ",
        "isCorrect": true,
        "reasoning": "* **やむ (1) - CORRECT:** This is the standard reading for 止む (to stop, for rain/wind)."
      },
      {
        "option": "とまる",
        "isCorrect": true,
        "reasoning": "* **とまる (2) - INCORRECT:** This is 止まる (to stop moving), not 止む."
      },
      {
        "option": "とめる",
        "isCorrect": true,
        "reasoning": "* **とめる (3) - INCORRECT:** This is 止める (to stop something), not 止む."
      },
      {
        "option": "やめる",
        "isCorrect": true,
        "reasoning": "* **やめる (4) - INCORRECT:** This is 辞める (to quit), not 止む."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 395,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ひげ",
      "かみ",
      "まゆげ",
      "もみあげ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ひげ",
        "isCorrect": true,
        "reasoning": "* **ひげ (1) - CORRECT:** This is the standard reading for 髭 (beard/mustache)."
      },
      {
        "option": "かみ",
        "isCorrect": true,
        "reasoning": "* **かみ (2) - INCORRECT:** This is 髪 (hair on head), not 髭."
      },
      {
        "option": "まゆげ",
        "isCorrect": true,
        "reasoning": "* **まゆげ (3) - INCORRECT:** This is 眉毛 (eyebrow), not 髭."
      },
      {
        "option": "もみあげ",
        "isCorrect": true,
        "reasoning": "* **もみあげ (4) - INCORRECT:** This is もみあげ (sideburns), not 髭."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 396,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "けんぶつ",
      "みもの",
      "かんこう",
      "けんがく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "けんぶつ",
        "isCorrect": true,
        "reasoning": "* **けんぶつ (1) - CORRECT:** This is the standard reading for 見物 (sightseeing)."
      },
      {
        "option": "みもの",
        "isCorrect": true,
        "reasoning": "* **みもの (2) - INCORRECT:** This is 見物 (spectacle/show), different meaning and reading."
      },
      {
        "option": "かんこう",
        "isCorrect": true,
        "reasoning": "* **かんこう (3) - INCORRECT:** This is 観光 (tourism), not 見物."
      },
      {
        "option": "けんがく",
        "isCorrect": true,
        "reasoning": "* **けんがく (4) - INCORRECT:** This is 見学 (inspection/study visit), not 見物."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 397,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "みなと",
      "こう",
      "しんこう",
      "りくこう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "みなと",
        "isCorrect": true,
        "reasoning": "* **みなと (1) - CORRECT:** This is the standard reading for 港 (harbor/port)."
      },
      {
        "option": "こう",
        "isCorrect": true,
        "reasoning": "* **こう (2) - INCORRECT:** This is the on'yomi reading, used in compounds like 港湾."
      },
      {
        "option": "しんこう",
        "isCorrect": true,
        "reasoning": "* **しんこう (3) - INCORRECT:** This is 新港 (new port), not just 港."
      },
      {
        "option": "りくこう",
        "isCorrect": true,
        "reasoning": "* **りくこう (4) - INCORRECT:** This is 陸港 (land port), not 港."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 398,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "だから",
      "それで",
      "なので",
      "そのため"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "だから",
        "isCorrect": true,
        "reasoning": "* **だから (1) - CORRECT:** This is the standard reading for だから (so/therefore)."
      },
      {
        "option": "それで",
        "isCorrect": true,
        "reasoning": "* **それで (2) - INCORRECT:** This is それで (and so), not だから."
      },
      {
        "option": "なので",
        "isCorrect": true,
        "reasoning": "* **なので (3) - INCORRECT:** This is なので (because/so), not だから."
      },
      {
        "option": "そのため",
        "isCorrect": true,
        "reasoning": "* **そのため (4) - INCORRECT:** This is そのため (for that reason), not だから."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 399,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "へん",
      "かわり",
      "へんか",
      "おかしい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "へん",
        "isCorrect": true,
        "reasoning": "* **へん (1) - CORRECT:** This is the standard reading for 変 (strange/odd)."
      },
      {
        "option": "かわり",
        "isCorrect": true,
        "reasoning": "* **かわり (2) - INCORRECT:** This is 代わり (substitute), not 変."
      },
      {
        "option": "へんか",
        "isCorrect": true,
        "reasoning": "* **へんか (3) - INCORRECT:** This is 変化 (change), not just 変."
      },
      {
        "option": "おかしい",
        "isCorrect": true,
        "reasoning": "* **おかしい (4) - INCORRECT:** This is おかしい (strange), but not the reading for 変."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 400,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "こころ",
      "しん",
      "きもち",
      "せいしん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こころ",
        "isCorrect": true,
        "reasoning": "* **こころ (1) - CORRECT:** This is the standard reading for 心 (heart/mind)."
      },
      {
        "option": "しん",
        "isCorrect": true,
        "reasoning": "* **しん (2) - INCORRECT:** This is the on'yomi reading, used in compounds like 心配."
      },
      {
        "option": "きもち",
        "isCorrect": true,
        "reasoning": "* **きもち (3) - INCORRECT:** This is 気持ち (feeling), not 心."
      },
      {
        "option": "せいしん",
        "isCorrect": true,
        "reasoning": "* **せいしん (4) - INCORRECT:** This is 精神 (spirit/mind), not 心."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 401,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "よる",
      "きる",
      "まわる",
      "たちよる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "よる",
        "isCorrect": true,
        "reasoning": "* **よる (1) - CORRECT:** This is the standard reading for 寄る (to drop by/visit)."
      },
      {
        "option": "きる",
        "isCorrect": true,
        "reasoning": "* **きる (2) - INCORRECT:** This is 切る (to cut), not 寄る."
      },
      {
        "option": "まわる",
        "isCorrect": true,
        "reasoning": "* **まわる (3) - INCORRECT:** This is 回る (to go around), not 寄る."
      },
      {
        "option": "たちよる",
        "isCorrect": true,
        "reasoning": "* **たちよる (4) - INCORRECT:** This is 立ち寄る (to stop by), but not the reading for 寄る alone."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 402,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "あく",
      "からっぽ",
      "そら",
      "くうき"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "あく",
        "isCorrect": true,
        "reasoning": "* **あく (1) - CORRECT:** This is the standard reading for 空く (to become empty/vacant)."
      },
      {
        "option": "からっぽ",
        "isCorrect": true,
        "reasoning": "* **からっぽ (2) - INCORRECT:** This is 空っぽ (empty), not the verb 空く."
      },
      {
        "option": "そら",
        "isCorrect": true,
        "reasoning": "* **そら (3) - INCORRECT:** This is 空 (sky), not the verb 空く."
      },
      {
        "option": "くうき",
        "isCorrect": true,
        "reasoning": "* **くうき (4) - INCORRECT:** This is 空気 (air), not the verb 空く."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 403,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "スクリーン",
      "スクリン",
      "ガメン",
      "エイゾウ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "スクリーン",
        "isCorrect": true,
        "reasoning": "* **スクリーン (1) - CORRECT:** This is the standard reading for スクリーン (screen)."
      },
      {
        "option": "スクリン",
        "isCorrect": true,
        "reasoning": "* **スクリン (2) - INCORRECT:** Wrong vowel. Uses リン instead of リーン."
      },
      {
        "option": "ガメン",
        "isCorrect": true,
        "reasoning": "* **ガメン (3) - INCORRECT:** This is 画面 (screen/display), not スクリーン."
      },
      {
        "option": "エイゾウ",
        "isCorrect": true,
        "reasoning": "* **エイゾウ (4) - INCORRECT:** This is 映像 (image/video), not スクリーン."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 404,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "または",
      "あるいは",
      "それとも",
      "もしくは"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "または",
        "isCorrect": true,
        "reasoning": "* **または (1) - CORRECT:** This is the standard reading for または (or/otherwise)."
      },
      {
        "option": "あるいは",
        "isCorrect": true,
        "reasoning": "* **あるいは (2) - INCORRECT:** This is あるいは (or/perhaps), not または."
      },
      {
        "option": "それとも",
        "isCorrect": true,
        "reasoning": "* **それとも (3) - INCORRECT:** This is それとも (or/otherwise in questions), not または."
      },
      {
        "option": "もしくは",
        "isCorrect": true,
        "reasoning": "* **もしくは (4) - INCORRECT:** This is もしくは (or/alternatively), not または."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 405,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "あさい",
      "ふかい",
      "うすい",
      "ひくい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "あさい",
        "isCorrect": true,
        "reasoning": "* **あさい (1) - CORRECT:** This is the standard reading for 浅い (shallow)."
      },
      {
        "option": "ふかい",
        "isCorrect": true,
        "reasoning": "* **ふかい (2) - INCORRECT:** This is 深い (deep), opposite of 浅い."
      },
      {
        "option": "うすい",
        "isCorrect": true,
        "reasoning": "* **うすい (3) - INCORRECT:** This is 薄い (thin), not 浅い."
      },
      {
        "option": "ひくい",
        "isCorrect": true,
        "reasoning": "* **ひくい (4) - INCORRECT:** This is 低い (low), not 浅い."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 406,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "へんじ",
      "かえし",
      "こたえ",
      "おうとう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "へんじ",
        "isCorrect": true,
        "reasoning": "* **へんじ (1) - CORRECT:** This is the standard reading for 返事 (reply/response)."
      },
      {
        "option": "かえし",
        "isCorrect": true,
        "reasoning": "* **かえし (2) - INCORRECT:** This is 返し (return), not 返事."
      },
      {
        "option": "こたえ",
        "isCorrect": true,
        "reasoning": "* **こたえ (3) - INCORRECT:** This is 答え (answer), not 返事."
      },
      {
        "option": "おうとう",
        "isCorrect": true,
        "reasoning": "* **おうとう (4) - INCORRECT:** This is 応答 (response), not 返事."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 407,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ふべん",
      "べんり",
      "こまる",
      "たいへん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ふべん",
        "isCorrect": true,
        "reasoning": "* **ふべん (1) - CORRECT:** This is the standard reading for 不便 (inconvenient)."
      },
      {
        "option": "べんり",
        "isCorrect": true,
        "reasoning": "* **べんり (2) - INCORRECT:** This is 便利 (convenient), opposite of 不便."
      },
      {
        "option": "こまる",
        "isCorrect": true,
        "reasoning": "* **こまる (3) - INCORRECT:** This is 困る (to be troubled), not 不便."
      },
      {
        "option": "たいへん",
        "isCorrect": true,
        "reasoning": "* **たいへん (4) - INCORRECT:** This is 大変 (difficult/tough), not 不便."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 408,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "こくさい",
      "こくない",
      "かいがい",
      "せかい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こくさい",
        "isCorrect": true,
        "reasoning": "* **こくさい (1) - CORRECT:** This is the standard reading for 国際 (international)."
      },
      {
        "option": "こくない",
        "isCorrect": true,
        "reasoning": "* **こくない (2) - INCORRECT:** This is 国内 (domestic), not 国際."
      },
      {
        "option": "かいがい",
        "isCorrect": true,
        "reasoning": "* **かいがい (3) - INCORRECT:** This is 海外 (overseas), not 国際."
      },
      {
        "option": "せかい",
        "isCorrect": true,
        "reasoning": "* **せかい (4) - INCORRECT:** This is 世界 (world), not 国際."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 409,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "じゅうどう",
      "からて",
      "けんどう",
      "たいそう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "じゅうどう",
        "isCorrect": true,
        "reasoning": "* **じゅうどう (1) - CORRECT:** This is the standard reading for 柔道 (judo)."
      },
      {
        "option": "からて",
        "isCorrect": true,
        "reasoning": "* **からて (2) - INCORRECT:** This is 空手 (karate), not 柔道."
      },
      {
        "option": "けんどう",
        "isCorrect": true,
        "reasoning": "* **けんどう (3) - INCORRECT:** This is 剣道 (kendo), not 柔道."
      },
      {
        "option": "たいそう",
        "isCorrect": true,
        "reasoning": "* **たいそう (4) - INCORRECT:** This is 体操 (gymnastics), not 柔道."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 410,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "じ",
      "もじ",
      "ぶんじ",
      "かんじ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "じ",
        "isCorrect": true,
        "reasoning": "* **じ (1) - CORRECT:** This is the standard reading for 字 (character/letter)."
      },
      {
        "option": "もじ",
        "isCorrect": true,
        "reasoning": "* **もじ (2) - INCORRECT:** This is 文字 (character/letter), not just 字."
      },
      {
        "option": "ぶんじ",
        "isCorrect": true,
        "reasoning": "* **ぶんじ (3) - INCORRECT:** This is 文字 (character), not 字."
      },
      {
        "option": "かんじ",
        "isCorrect": true,
        "reasoning": "* **かんじ (4) - INCORRECT:** This is 漢字 (kanji), not just 字."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 411,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ちから",
      "りょく",
      "つよさ",
      "きんりょく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ちから",
        "isCorrect": true,
        "reasoning": "* **ちから (1) - CORRECT:** This is the standard reading for 力 (strength/power)."
      },
      {
        "option": "りょく",
        "isCorrect": true,
        "reasoning": "* **りょく (2) - INCORRECT:** This is the on'yomi reading, used in compounds like 能力."
      },
      {
        "option": "つよさ",
        "isCorrect": true,
        "reasoning": "* **つよさ (3) - INCORRECT:** This is 強さ (strength), not 力."
      },
      {
        "option": "きんりょく",
        "isCorrect": true,
        "reasoning": "* **きんりょく (4) - INCORRECT:** This is 筋力 (muscle strength), not just 力."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 412,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "き",
      "きもち",
      "きぶん",
      "こころ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "き",
        "isCorrect": true,
        "reasoning": "* **き (1) - CORRECT:** This is the standard reading for 気 (spirit/mood/feeling)."
      },
      {
        "option": "きもち",
        "isCorrect": true,
        "reasoning": "* **きもち (2) - INCORRECT:** This is 気持ち (feeling), not just 気."
      },
      {
        "option": "きぶん",
        "isCorrect": true,
        "reasoning": "* **きぶん (3) - INCORRECT:** This is 気分 (mood), not just 気."
      },
      {
        "option": "こころ",
        "isCorrect": true,
        "reasoning": "* **こころ (4) - INCORRECT:** This is 心 (heart), not 気."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 413,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "げんいん",
      "りゆう",
      "もと",
      "はじまり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "げんいん",
        "isCorrect": true,
        "reasoning": "* **げんいん (1) - CORRECT:** This is the standard reading for 原因 (cause/source)."
      },
      {
        "option": "りゆう",
        "isCorrect": true,
        "reasoning": "* **りゆう (2) - INCORRECT:** This is 理由 (reason), not 原因."
      },
      {
        "option": "もと",
        "isCorrect": true,
        "reasoning": "* **もと (3) - INCORRECT:** This is 元 (origin), not 原因."
      },
      {
        "option": "はじまり",
        "isCorrect": true,
        "reasoning": "* **はじまり (4) - INCORRECT:** This is 始まり (beginning), not 原因."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 414,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おこる",
      "いかる",
      "むかつく",
      "はらだつ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おこる",
        "isCorrect": true,
        "reasoning": "* **おこる (1) - CORRECT:** This is the standard reading for 怒る (to get angry)."
      },
      {
        "option": "いかる",
        "isCorrect": true,
        "reasoning": "* **いかる (2) - INCORRECT:** This is 怒る with different reading, less common."
      },
      {
        "option": "むかつく",
        "isCorrect": true,
        "reasoning": "* **むかつく (3) - INCORRECT:** This is むかつく (to be irritated), not 怒る."
      },
      {
        "option": "はらだつ",
        "isCorrect": true,
        "reasoning": "* **はらだつ (4) - INCORRECT:** This is 腹立つ (to be annoyed), not 怒る."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 415,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ひさしぶり",
      "ながいあいだ",
      "しばらく",
      "きゅうに"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ひさしぶり",
        "isCorrect": true,
        "reasoning": "* **ひさしぶり (1) - CORRECT:** This is the standard reading for 久しぶり (after a long time)."
      },
      {
        "option": "ながいあいだ",
        "isCorrect": true,
        "reasoning": "* **ながいあいだ (2) - INCORRECT:** This is 長い間 (long period), not 久しぶり."
      },
      {
        "option": "しばらく",
        "isCorrect": true,
        "reasoning": "* **しばらく (3) - INCORRECT:** This is しばらく (for a while), not 久しぶり."
      },
      {
        "option": "きゅうに",
        "isCorrect": true,
        "reasoning": "* **きゅうに (4) - INCORRECT:** This is 急に (suddenly), not 久しぶり."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 416,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "きけん",
      "あぶない",
      "こわい",
      "やばい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "きけん",
        "isCorrect": true,
        "reasoning": "* **きけん (1) - CORRECT:** This is the standard reading for 危険 (danger)."
      },
      {
        "option": "あぶない",
        "isCorrect": true,
        "reasoning": "* **あぶない (2) - INCORRECT:** This is 危ない (dangerous), not 危険."
      },
      {
        "option": "こわい",
        "isCorrect": true,
        "reasoning": "* **こわい (3) - INCORRECT:** This is 怖い (scary), not 危険."
      },
      {
        "option": "やばい",
        "isCorrect": true,
        "reasoning": "* **やばい (4) - INCORRECT:** This is やばい (risky/bad), not 危険."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 417,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "つつむ",
      "くるむ",
      "まく",
      "かこむ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "つつむ",
        "isCorrect": true,
        "reasoning": "* **つつむ (1) - CORRECT:** This is the standard reading for 包む (to wrap)."
      },
      {
        "option": "くるむ",
        "isCorrect": true,
        "reasoning": "* **くるむ (2) - INCORRECT:** This is 包む with different reading, less common."
      },
      {
        "option": "まく",
        "isCorrect": true,
        "reasoning": "* **まく (3) - INCORRECT:** This is 巻く (to wind/roll), not 包む."
      },
      {
        "option": "かこむ",
        "isCorrect": true,
        "reasoning": "* **かこむ (4) - INCORRECT:** This is 囲む (to surround), not 包む."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 418,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ゆれる",
      "ふるえる",
      "うごく",
      "ゆらぐ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ゆれる",
        "isCorrect": true,
        "reasoning": "* **ゆれる (1) - CORRECT:** This is the standard reading for 揺れる (to shake/sway)."
      },
      {
        "option": "ふるえる",
        "isCorrect": true,
        "reasoning": "* **ふるえる (2) - INCORRECT:** This is 震える (to tremble), not 揺れる."
      },
      {
        "option": "うごく",
        "isCorrect": true,
        "reasoning": "* **うごく (3) - INCORRECT:** This is 動く (to move), not 揺れる."
      },
      {
        "option": "ゆらぐ",
        "isCorrect": true,
        "reasoning": "* **ゆらぐ (4) - INCORRECT:** This is 揺らぐ (to waver), not 揺れる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 419,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "のりもの",
      "くるま",
      "でんしゃ",
      "こうつう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "のりもの",
        "isCorrect": true,
        "reasoning": "* **のりもの (1) - CORRECT:** This is the standard reading for 乗り物 (vehicle)."
      },
      {
        "option": "くるま",
        "isCorrect": true,
        "reasoning": "* **くるま (2) - INCORRECT:** This is 車 (car), not 乗り物."
      },
      {
        "option": "でんしゃ",
        "isCorrect": true,
        "reasoning": "* **でんしゃ (3) - INCORRECT:** This is 電車 (train), not 乗り物."
      },
      {
        "option": "こうつう",
        "isCorrect": true,
        "reasoning": "* **こうつう (4) - INCORRECT:** This is 交通 (transportation), not 乗り物."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 420,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "あつまる",
      "よる",
      "そろう",
      "かたまる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "あつまる",
        "isCorrect": true,
        "reasoning": "* **あつまる (1) - CORRECT:** This is the standard reading for 集る (to gather)."
      },
      {
        "option": "よる",
        "isCorrect": true,
        "reasoning": "* **よる (2) - INCORRECT:** This is 寄る (to drop by), not 集る."
      },
      {
        "option": "そろう",
        "isCorrect": true,
        "reasoning": "* **そろう (3) - INCORRECT:** This is 揃う (to be complete), not 集る."
      },
      {
        "option": "かたまる",
        "isCorrect": true,
        "reasoning": "* **かたまる (4) - INCORRECT:** This is 固まる (to harden), not 集る."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 421,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しょうがっこう",
      "しょうがく",
      "がっこう",
      "こがっこう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しょうがっこう",
        "isCorrect": true,
        "reasoning": "* **しょうがっこう (1) - CORRECT:** This is the standard reading for 小学校 (elementary school)."
      },
      {
        "option": "しょうがく",
        "isCorrect": true,
        "reasoning": "* **しょうがく (2) - INCORRECT:** This is 小学 (elementary education), not 小学校."
      },
      {
        "option": "がっこう",
        "isCorrect": true,
        "reasoning": "* **がっこう (3) - INCORRECT:** This is 学校 (school), not 小学校."
      },
      {
        "option": "こがっこう",
        "isCorrect": true,
        "reasoning": "* **こがっこう (4) - INCORRECT:** Wrong reading for 小. Uses こ instead of しょう."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 422,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "せかい",
      "ちきゅう",
      "こくさい",
      "ばんこく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "せかい",
        "isCorrect": true,
        "reasoning": "* **せかい (1) - CORRECT:** This is the standard reading for 世界 (world)."
      },
      {
        "option": "ちきゅう",
        "isCorrect": true,
        "reasoning": "* **ちきゅう (2) - INCORRECT:** This is 地球 (earth/planet), not 世界."
      },
      {
        "option": "こくさい",
        "isCorrect": true,
        "reasoning": "* **こくさい (3) - INCORRECT:** This is 国際 (international), not 世界."
      },
      {
        "option": "ばんこく",
        "isCorrect": true,
        "reasoning": "* **ばんこく (4) - INCORRECT:** This is 万国 (all nations), not 世界."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 423,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "うつくしい",
      "きれい",
      "すてき",
      "りっぱ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "うつくしい",
        "isCorrect": true,
        "reasoning": "* **うつくしい (1) - CORRECT:** This is the standard reading for 美しい (beautiful)."
      },
      {
        "option": "きれい",
        "isCorrect": true,
        "reasoning": "* **きれい (2) - INCORRECT:** This is きれい (pretty/clean), not 美しい."
      },
      {
        "option": "すてき",
        "isCorrect": true,
        "reasoning": "* **すてき (3) - INCORRECT:** This is すてき (wonderful), not 美しい."
      },
      {
        "option": "りっぱ",
        "isCorrect": true,
        "reasoning": "* **りっぱ (4) - INCORRECT:** This is 立派 (splendid), not 美しい."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 424,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ばい",
      "ばん",
      "りょう",
      "すう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ばい",
        "isCorrect": true,
        "reasoning": "* **ばい (1) - CORRECT:** This is the standard reading for 倍 (times/double)."
      },
      {
        "option": "ばん",
        "isCorrect": true,
        "reasoning": "* **ばん (2) - INCORRECT:** This is 番 (number/turn), not 倍."
      },
      {
        "option": "りょう",
        "isCorrect": true,
        "reasoning": "* **りょう (3) - INCORRECT:** This is 量 (amount), not 倍."
      },
      {
        "option": "すう",
        "isCorrect": true,
        "reasoning": "* **すう (4) - INCORRECT:** This is 数 (number), not 倍."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 425,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "つま",
      "かない",
      "おくさん",
      "よめ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "つま",
        "isCorrect": true,
        "reasoning": "* **つま (1) - CORRECT:** This is the standard reading for 妻 (humble form of wife)."
      },
      {
        "option": "かない",
        "isCorrect": true,
        "reasoning": "* **かない (2) - INCORRECT:** This is 家内 (wife), not 妻."
      },
      {
        "option": "おくさん",
        "isCorrect": true,
        "reasoning": "* **おくさん (3) - INCORRECT:** This is 奥さん (polite form of wife), not 妻."
      },
      {
        "option": "よめ",
        "isCorrect": true,
        "reasoning": "* **よめ (4) - INCORRECT:** This is 嫁 (bride/daughter-in-law), not 妻."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 426,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "でんぽう",
      "でんわ",
      "でんしん",
      "つうしん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "でんぽう",
        "isCorrect": true,
        "reasoning": "* **でんぽう (1) - CORRECT:** This is the standard reading for 電報 (telegram)."
      },
      {
        "option": "でんわ",
        "isCorrect": true,
        "reasoning": "* **でんわ (2) - INCORRECT:** This is 電話 (telephone), not 電報."
      },
      {
        "option": "でんしん",
        "isCorrect": true,
        "reasoning": "* **でんしん (3) - INCORRECT:** This is 電信 (telegraph), not 電報."
      },
      {
        "option": "つうしん",
        "isCorrect": true,
        "reasoning": "* **つうしん (4) - INCORRECT:** This is 通信 (communication), not 電報."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 427,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "きんじょ",
      "となり",
      "ちかく",
      "まわり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "きんじょ",
        "isCorrect": true,
        "reasoning": "* **きんじょ (1) - CORRECT:** This is the standard reading for 近所 (neighborhood)."
      },
      {
        "option": "となり",
        "isCorrect": true,
        "reasoning": "* **となり (2) - INCORRECT:** This is 隣 (next door), not 近所."
      },
      {
        "option": "ちかく",
        "isCorrect": true,
        "reasoning": "* **ちかく (3) - INCORRECT:** This is 近く (nearby), not 近所."
      },
      {
        "option": "まわり",
        "isCorrect": true,
        "reasoning": "* **まわり (4) - INCORRECT:** This is 周り (surroundings), not 近所."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 428,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ファックス",
      "ファクス",
      "コピー",
      "プリンター"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ファックス",
        "isCorrect": true,
        "reasoning": "* **ファックス (1) - CORRECT:** This is the standard reading for ファックス (fax)."
      },
      {
        "option": "ファクス",
        "isCorrect": true,
        "reasoning": "* **ファクス (2) - INCORRECT:** Wrong vowel. Uses ファクス instead of ファックス."
      },
      {
        "option": "コピー",
        "isCorrect": true,
        "reasoning": "* **コピー (3) - INCORRECT:** This is コピー (copy), not ファックス."
      },
      {
        "option": "プリンター",
        "isCorrect": true,
        "reasoning": "* **プリンター (4) - INCORRECT:** This is プリンター (printer), not ファックス."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 429,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "もっとも",
      "いちばん",
      "たいへん",
      "とても"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "もっとも",
        "isCorrect": true,
        "reasoning": "* **もっとも (1) - CORRECT:** This is the standard reading for 最も (most/extremely)."
      },
      {
        "option": "いちばん",
        "isCorrect": true,
        "reasoning": "* **いちばん (2) - INCORRECT:** This is 一番 (number one/most), not 最も."
      },
      {
        "option": "たいへん",
        "isCorrect": true,
        "reasoning": "* **たいへん (3) - INCORRECT:** This is 大変 (very/difficult), not 最も."
      },
      {
        "option": "とても",
        "isCorrect": true,
        "reasoning": "* **とても (4) - INCORRECT:** This is とても (very), not 最も."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 430,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しけん",
      "テスト",
      "こうさ",
      "けんさ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しけん",
        "isCorrect": true,
        "reasoning": "* **しけん (1) - CORRECT:** This is the standard reading for 試験 (examination)."
      },
      {
        "option": "テスト",
        "isCorrect": true,
        "reasoning": "* **テスト (2) - INCORRECT:** This is テスト (test), not 試験."
      },
      {
        "option": "こうさ",
        "isCorrect": true,
        "reasoning": "* **こうさ (3) - INCORRECT:** This is 考査 (examination), not 試験."
      },
      {
        "option": "けんさ",
        "isCorrect": true,
        "reasoning": "* **けんさ (4) - INCORRECT:** This is 検査 (inspection), not 試験."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 431,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "わすれもの",
      "おとしもの",
      "なくしもの",
      "のこしもの"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "わすれもの",
        "isCorrect": true,
        "reasoning": "* **わすれもの (1) - CORRECT:** This is the standard reading for 忘れ物 (forgotten item)."
      },
      {
        "option": "おとしもの",
        "isCorrect": true,
        "reasoning": "* **おとしもの (2) - INCORRECT:** This is 落とし物 (lost item), not 忘れ物."
      },
      {
        "option": "なくしもの",
        "isCorrect": true,
        "reasoning": "* **なくしもの (3) - INCORRECT:** This is 無くし物 (lost item), not 忘れ物."
      },
      {
        "option": "のこしもの",
        "isCorrect": true,
        "reasoning": "* **のこしもの (4) - INCORRECT:** This is 残し物 (leftover), not 忘れ物."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 432,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ひえる",
      "さむい",
      "つめたい",
      "すずしい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ひえる",
        "isCorrect": true,
        "reasoning": "* **ひえる (1) - CORRECT:** This is the standard reading for 冷える (to grow cold)."
      },
      {
        "option": "さむい",
        "isCorrect": true,
        "reasoning": "* **さむい (2) - INCORRECT:** This is 寒い (cold), not 冷える."
      },
      {
        "option": "つめたい",
        "isCorrect": true,
        "reasoning": "* **つめたい (3) - INCORRECT:** This is 冷たい (cold to touch), not 冷える."
      },
      {
        "option": "すずしい",
        "isCorrect": true,
        "reasoning": "* **すずしい (4) - INCORRECT:** This is 涼しい (cool), not 冷える."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 433,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しらせる",
      "つたえる",
      "おしえる",
      "はなす"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しらせる",
        "isCorrect": true,
        "reasoning": "* **しらせる (1) - CORRECT:** This is the standard reading for 知らせる (to notify)."
      },
      {
        "option": "つたえる",
        "isCorrect": true,
        "reasoning": "* **つたえる (2) - INCORRECT:** This is 伝える (to convey), not 知らせる."
      },
      {
        "option": "おしえる",
        "isCorrect": true,
        "reasoning": "* **おしえる (3) - INCORRECT:** This is 教える (to teach), not 知らせる."
      },
      {
        "option": "はなす",
        "isCorrect": true,
        "reasoning": "* **はなす (4) - INCORRECT:** This is 話す (to speak), not 知らせる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 434,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しょうせつ",
      "ほん",
      "ものがたり",
      "ぶんがく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しょうせつ",
        "isCorrect": true,
        "reasoning": "* **しょうせつ (1) - CORRECT:** This is the standard reading for 小説 (novel)."
      },
      {
        "option": "ほん",
        "isCorrect": true,
        "reasoning": "* **ほん (2) - INCORRECT:** This is 本 (book), not 小説."
      },
      {
        "option": "ものがたり",
        "isCorrect": true,
        "reasoning": "* **ものがたり (3) - INCORRECT:** This is 物語 (story), not 小説."
      },
      {
        "option": "ぶんがく",
        "isCorrect": true,
        "reasoning": "* **ぶんがく (4) - INCORRECT:** This is 文学 (literature), not 小説."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 435,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "そふ",
      "おじいさん",
      "ちち",
      "おとうさん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "そふ",
        "isCorrect": true,
        "reasoning": "* **そふ (1) - CORRECT:** This is the standard reading for 祖父 (grandfather)."
      },
      {
        "option": "おじいさん",
        "isCorrect": true,
        "reasoning": "* **おじいさん (2) - INCORRECT:** This is おじいさん (grandfather), not 祖父."
      },
      {
        "option": "ちち",
        "isCorrect": true,
        "reasoning": "* **ちち (3) - INCORRECT:** This is 父 (father), not 祖父."
      },
      {
        "option": "おとうさん",
        "isCorrect": true,
        "reasoning": "* **おとうさん (4) - INCORRECT:** This is お父さん (father), not 祖父."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 436,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "よう",
      "つかう",
      "やく",
      "もく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "よう",
        "isCorrect": true,
        "reasoning": "* **よう (1) - CORRECT:** This is the standard reading for 用 (use/purpose)."
      },
      {
        "option": "つかう",
        "isCorrect": true,
        "reasoning": "* **つかう (2) - INCORRECT:** This is 使う (to use), not 用."
      },
      {
        "option": "やく",
        "isCorrect": true,
        "reasoning": "* **やく (3) - INCORRECT:** This is 役 (role), not 用."
      },
      {
        "option": "もく",
        "isCorrect": true,
        "reasoning": "* **もく (4) - INCORRECT:** This is 目 (eye), not 用."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 437,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "うける",
      "とる",
      "やる",
      "する"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "うける",
        "isCorrect": true,
        "reasoning": "* **うける (1) - CORRECT:** This is the standard reading for 受ける (to take a test/lesson)."
      },
      {
        "option": "とる",
        "isCorrect": true,
        "reasoning": "* **とる (2) - INCORRECT:** This is 取る (to take/get), not 受ける."
      },
      {
        "option": "やる",
        "isCorrect": true,
        "reasoning": "* **やる (3) - INCORRECT:** This is やる (to do), not 受ける."
      },
      {
        "option": "する",
        "isCorrect": true,
        "reasoning": "* **する (4) - INCORRECT:** This is する (to do), not 受ける."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 438,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "びじゅつかん",
      "はくぶつかん",
      "としょかん",
      "げきじょう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "びじゅつかん",
        "isCorrect": true,
        "reasoning": "* **びじゅつかん (1) - CORRECT:** This is the standard reading for 美術館 (art museum)."
      },
      {
        "option": "はくぶつかん",
        "isCorrect": true,
        "reasoning": "* **はくぶつかん (2) - INCORRECT:** This is 博物館 (museum), not 美術館."
      },
      {
        "option": "としょかん",
        "isCorrect": true,
        "reasoning": "* **としょかん (3) - INCORRECT:** This is 図書館 (library), not 美術館."
      },
      {
        "option": "げきじょう",
        "isCorrect": true,
        "reasoning": "* **げきじょう (4) - INCORRECT:** This is 劇場 (theater), not 美術館."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 439,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おっしゃる",
      "いう",
      "はなす",
      "のべる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おっしゃる",
        "isCorrect": true,
        "reasoning": "* **おっしゃる (1) - CORRECT:** This is the standard reading for おっしゃる (respectful form of \"to say\")."
      },
      {
        "option": "いう",
        "isCorrect": true,
        "reasoning": "* **いう (2) - INCORRECT:** This is 言う (to say), not おっしゃる."
      },
      {
        "option": "はなす",
        "isCorrect": true,
        "reasoning": "* **はなす (3) - INCORRECT:** This is 話す (to speak), not おっしゃる."
      },
      {
        "option": "のべる",
        "isCorrect": true,
        "reasoning": "* **のべる (4) - INCORRECT:** This is 述べる (to state), not おっしゃる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 440,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しかた",
      "ほうほう",
      "やりかた",
      "てじゅん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しかた",
        "isCorrect": true,
        "reasoning": "* **しかた (1) - CORRECT:** This is the standard reading for 仕方 (method/way)."
      },
      {
        "option": "ほうほう",
        "isCorrect": true,
        "reasoning": "* **ほうほう (2) - INCORRECT:** This is 方法 (method), not 仕方."
      },
      {
        "option": "やりかた",
        "isCorrect": true,
        "reasoning": "* **やりかた (3) - INCORRECT:** This is やり方 (way of doing), not 仕方."
      },
      {
        "option": "てじゅん",
        "isCorrect": true,
        "reasoning": "* **てじゅん (4) - INCORRECT:** This is 手順 (procedure), not 仕方."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 441,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "いそぐ",
      "はやい",
      "はしる",
      "あわてる"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いそぐ",
        "isCorrect": true,
        "reasoning": "* **いそぐ (1) - CORRECT:** This is the standard reading for 急ぐ (to hurry)."
      },
      {
        "option": "はやい",
        "isCorrect": true,
        "reasoning": "* **はやい (2) - INCORRECT:** This is 早い (early/fast), not 急ぐ."
      },
      {
        "option": "はしる",
        "isCorrect": true,
        "reasoning": "* **はしる (3) - INCORRECT:** This is 走る (to run), not 急ぐ."
      },
      {
        "option": "あわてる",
        "isCorrect": true,
        "reasoning": "* **あわてる (4) - INCORRECT:** This is 慌てる (to panic), not 急ぐ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 442,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "アメリカ",
      "イギリス",
      "フランス",
      "ドイツ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "アメリカ",
        "isCorrect": true,
        "reasoning": "* **アメリカ (1) - CORRECT:** This is the standard reading for アメリカ (America)."
      },
      {
        "option": "イギリス",
        "isCorrect": true,
        "reasoning": "* **イギリス (2) - INCORRECT:** This is イギリス (England), not アメリカ."
      },
      {
        "option": "フランス",
        "isCorrect": true,
        "reasoning": "* **フランス (3) - INCORRECT:** This is フランス (France), not アメリカ."
      },
      {
        "option": "ドイツ",
        "isCorrect": true,
        "reasoning": "* **ドイツ (4) - INCORRECT:** This is ドイツ (Germany), not アメリカ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 443,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "つれて",
      "いっしょに",
      "むかえて",
      "おくって"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "つれて",
        "isCorrect": true,
        "reasoning": "* **つれて (1) - CORRECT:** This is the standard reading for 連れる (to take/lead someone)."
      },
      {
        "option": "いっしょに",
        "isCorrect": true,
        "reasoning": "* **いっしょに (2) - INCORRECT:** This is 一緒に (together), not 連れる."
      },
      {
        "option": "むかえて",
        "isCorrect": true,
        "reasoning": "* **むかえて (3) - INCORRECT:** This is 迎えて (to meet/welcome), not 連れる."
      },
      {
        "option": "おくって",
        "isCorrect": true,
        "reasoning": "* **おくって (4) - INCORRECT:** This is 送って (to send/escort), not 連れる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 444,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "こたえ",
      "しつもん",
      "へんじ",
      "せつめい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こたえ",
        "isCorrect": true,
        "reasoning": "* **こたえ (1) - CORRECT:** This is the standard reading for 答 (answer)."
      },
      {
        "option": "しつもん",
        "isCorrect": true,
        "reasoning": "* **しつもん (2) - INCORRECT:** This is 質問 (question), not 答."
      },
      {
        "option": "へんじ",
        "isCorrect": true,
        "reasoning": "* **へんじ (3) - INCORRECT:** This is 返事 (reply), not 答."
      },
      {
        "option": "せつめい",
        "isCorrect": true,
        "reasoning": "* **せつめい (4) - INCORRECT:** This is 説明 (explanation), not 答."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 445,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "いただき",
      "もらい",
      "うけとり",
      "とり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いただき",
        "isCorrect": true,
        "reasoning": "* **いただき (1) - CORRECT:** This is the standard reading for いただく (humble form of \"to receive\")."
      },
      {
        "option": "もらい",
        "isCorrect": true,
        "reasoning": "* **もらい (2) - INCORRECT:** This is もらう (to receive), not いただく."
      },
      {
        "option": "うけとり",
        "isCorrect": true,
        "reasoning": "* **うけとり (3) - INCORRECT:** This is 受け取る (to receive), not いただく."
      },
      {
        "option": "とり",
        "isCorrect": true,
        "reasoning": "* **とり (4) - INCORRECT:** This is 取る (to take), not いただく."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 446,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "うれしい",
      "たのしい",
      "かなしい",
      "さびしい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "うれしい",
        "isCorrect": true,
        "reasoning": "* **うれしい (1) - CORRECT:** This is the standard reading for うれしい (happy/glad)."
      },
      {
        "option": "たのしい",
        "isCorrect": true,
        "reasoning": "* **たのしい (2) - INCORRECT:** This is 楽しい (fun), not うれしい."
      },
      {
        "option": "かなしい",
        "isCorrect": true,
        "reasoning": "* **かなしい (3) - INCORRECT:** This is 悲しい (sad), not うれしい."
      },
      {
        "option": "さびしい",
        "isCorrect": true,
        "reasoning": "* **さびしい (4) - INCORRECT:** This is 寂しい (lonely), not うれしい."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 447,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "やき",
      "にて",
      "むして",
      "あげて"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "やき",
        "isCorrect": true,
        "reasoning": "* **やき (1) - CORRECT:** This is the standard reading for 焼く (to bake/grill)."
      },
      {
        "option": "にて",
        "isCorrect": true,
        "reasoning": "* **にて (2) - INCORRECT:** This is 煮る (to boil), not 焼く."
      },
      {
        "option": "むして",
        "isCorrect": true,
        "reasoning": "* **むして (3) - INCORRECT:** This is 蒸す (to steam), not 焼く."
      },
      {
        "option": "あげて",
        "isCorrect": true,
        "reasoning": "* **あげて (4) - INCORRECT:** This is 揚げる (to deep fry), not 焼く."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 448,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "こうぎ",
      "じゅぎょう",
      "べんきょう",
      "しけん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こうぎ",
        "isCorrect": true,
        "reasoning": "* **こうぎ (1) - CORRECT:** This is the standard reading for 講義 (lecture)."
      },
      {
        "option": "じゅぎょう",
        "isCorrect": true,
        "reasoning": "* **じゅぎょう (2) - INCORRECT:** This is 授業 (class), not 講義."
      },
      {
        "option": "べんきょう",
        "isCorrect": true,
        "reasoning": "* **べんきょう (3) - INCORRECT:** This is 勉強 (study), not 講義."
      },
      {
        "option": "しけん",
        "isCorrect": true,
        "reasoning": "* **しけん (4) - INCORRECT:** This is 試験 (exam), not 講義."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 449,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "たいてい",
      "いつも",
      "ときどき",
      "たまに"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "たいてい",
        "isCorrect": true,
        "reasoning": "* **たいてい (1) - CORRECT:** This is the standard reading for 大抵 (usually)."
      },
      {
        "option": "いつも",
        "isCorrect": true,
        "reasoning": "* **いつも (2) - INCORRECT:** This is いつも (always), not 大抵."
      },
      {
        "option": "ときどき",
        "isCorrect": true,
        "reasoning": "* **ときどき (3) - INCORRECT:** This is 時々 (sometimes), not 大抵."
      },
      {
        "option": "たまに",
        "isCorrect": true,
        "reasoning": "* **たまに (4) - INCORRECT:** This is たまに (occasionally), not 大抵."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 450,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ねだん",
      "りょうきん",
      "だいきん",
      "かかく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ねだん",
        "isCorrect": true,
        "reasoning": "* **ねだん (1) - CORRECT:** This is the standard reading for 値段 (price)."
      },
      {
        "option": "りょうきん",
        "isCorrect": true,
        "reasoning": "* **りょうきん (2) - INCORRECT:** This is 料金 (fee), not 値段."
      },
      {
        "option": "だいきん",
        "isCorrect": true,
        "reasoning": "* **だいきん (3) - INCORRECT:** This is 代金 (payment), not 値段."
      },
      {
        "option": "かかく",
        "isCorrect": true,
        "reasoning": "* **かかく (4) - INCORRECT:** This is 価格 (price), not 値段."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 451,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ぼく",
      "わたし",
      "おれ",
      "じぶん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ぼく",
        "isCorrect": true,
        "reasoning": "* **ぼく (1) - CORRECT:** This is the standard reading for 僕 (I - used by males)."
      },
      {
        "option": "わたし",
        "isCorrect": true,
        "reasoning": "* **わたし (2) - INCORRECT:** This is 私 (I - formal), not 僕."
      },
      {
        "option": "おれ",
        "isCorrect": true,
        "reasoning": "* **おれ (3) - INCORRECT:** This is 俺 (I - casual male), not 僕."
      },
      {
        "option": "じぶん",
        "isCorrect": true,
        "reasoning": "* **じぶん (4) - INCORRECT:** This is 自分 (oneself), not 僕."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 452,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "きもの",
      "ふく",
      "ようふく",
      "ドレス"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "きもの",
        "isCorrect": true,
        "reasoning": "* **きもの (1) - CORRECT:** This is the standard reading for 着物 (kimono)."
      },
      {
        "option": "ふく",
        "isCorrect": true,
        "reasoning": "* **ふく (2) - INCORRECT:** This is 服 (clothes), not 着物."
      },
      {
        "option": "ようふく",
        "isCorrect": true,
        "reasoning": "* **ようふく (3) - INCORRECT:** This is 洋服 (western clothes), not 着物."
      },
      {
        "option": "ドレス",
        "isCorrect": true,
        "reasoning": "* **ドレス (4) - INCORRECT:** This is ドレス (dress), not 着物."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 453,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ステーキ",
      "ハンバーグ",
      "チキン",
      "フィッシュ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ステーキ",
        "isCorrect": true,
        "reasoning": "* **ステーキ (1) - CORRECT:** This is the standard reading for ステーキ (steak)."
      },
      {
        "option": "ハンバーグ",
        "isCorrect": true,
        "reasoning": "* **ハンバーグ (2) - INCORRECT:** This is ハンバーグ (hamburger steak), not ステーキ."
      },
      {
        "option": "チキン",
        "isCorrect": true,
        "reasoning": "* **チキン (3) - INCORRECT:** This is チキン (chicken), not ステーキ."
      },
      {
        "option": "フィッシュ",
        "isCorrect": true,
        "reasoning": "* **フィッシュ (4) - INCORRECT:** This is フィッシュ (fish), not ステーキ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 454,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "とちゅう",
      "みち",
      "あいだ",
      "とき"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "とちゅう",
        "isCorrect": true,
        "reasoning": "* **とちゅう (1) - CORRECT:** This is the standard reading for 途中 (on the way)."
      },
      {
        "option": "みち",
        "isCorrect": true,
        "reasoning": "* **みち (2) - INCORRECT:** This is 道 (road), not 途中."
      },
      {
        "option": "あいだ",
        "isCorrect": true,
        "reasoning": "* **あいだ (3) - INCORRECT:** This is 間 (between), not 途中."
      },
      {
        "option": "とき",
        "isCorrect": true,
        "reasoning": "* **とき (4) - INCORRECT:** This is 時 (time), not 途中."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 455,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "さいきん",
      "このごろ",
      "いま",
      "きょう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "さいきん",
        "isCorrect": true,
        "reasoning": "* **さいきん (1) - CORRECT:** This is the standard reading for 最近 (recently)."
      },
      {
        "option": "このごろ",
        "isCorrect": true,
        "reasoning": "* **このごろ (2) - INCORRECT:** This is この頃 (these days), not 最近."
      },
      {
        "option": "いま",
        "isCorrect": true,
        "reasoning": "* **いま (3) - INCORRECT:** This is 今 (now), not 最近."
      },
      {
        "option": "きょう",
        "isCorrect": true,
        "reasoning": "* **きょう (4) - INCORRECT:** This is 今日 (today), not 最近."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 456,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "し",
      "まち",
      "むら",
      "けん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "し",
        "isCorrect": true,
        "reasoning": "* **し (1) - CORRECT:** This is the standard reading for 市 (city)."
      },
      {
        "option": "まち",
        "isCorrect": true,
        "reasoning": "* **まち (2) - INCORRECT:** This is 町 (town), not 市."
      },
      {
        "option": "むら",
        "isCorrect": true,
        "reasoning": "* **むら (3) - INCORRECT:** This is 村 (village), not 市."
      },
      {
        "option": "けん",
        "isCorrect": true,
        "reasoning": "* **けん (4) - INCORRECT:** This is 県 (prefecture), not 市."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 457,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "きょういく",
      "べんきょう",
      "がくしゅう",
      "くんれん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "きょういく",
        "isCorrect": true,
        "reasoning": "* **きょういく (1) - CORRECT:** This is the standard reading for 教育 (education)."
      },
      {
        "option": "べんきょう",
        "isCorrect": true,
        "reasoning": "* **べんきょう (2) - INCORRECT:** This is 勉強 (study), not 教育."
      },
      {
        "option": "がくしゅう",
        "isCorrect": true,
        "reasoning": "* **がくしゅう (3) - INCORRECT:** This is 学習 (learning), not 教育."
      },
      {
        "option": "くんれん",
        "isCorrect": true,
        "reasoning": "* **くんれん (4) - INCORRECT:** This is 訓練 (training), not 教育."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 458,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しょうらい",
      "みらい",
      "あした",
      "らいねん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しょうらい",
        "isCorrect": true,
        "reasoning": "* **しょうらい (1) - CORRECT:** This is the standard reading for 将来 (future)."
      },
      {
        "option": "みらい",
        "isCorrect": true,
        "reasoning": "* **みらい (2) - INCORRECT:** This is 未来 (future), not 将来."
      },
      {
        "option": "あした",
        "isCorrect": true,
        "reasoning": "* **あした (3) - INCORRECT:** This is 明日 (tomorrow), not 将来."
      },
      {
        "option": "らいねん",
        "isCorrect": true,
        "reasoning": "* **らいねん (4) - INCORRECT:** This is 来年 (next year), not 将来."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 459,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "せんぱい",
      "こうはい",
      "せんせい",
      "ともだち"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "せんぱい",
        "isCorrect": true,
        "reasoning": "* **せんぱい (1) - CORRECT:** This is the standard reading for 先輩 (senior)."
      },
      {
        "option": "こうはい",
        "isCorrect": true,
        "reasoning": "* **こうはい (2) - INCORRECT:** This is 後輩 (junior), not 先輩."
      },
      {
        "option": "せんせい",
        "isCorrect": true,
        "reasoning": "* **せんせい (3) - INCORRECT:** This is 先生 (teacher), not 先輩."
      },
      {
        "option": "ともだち",
        "isCorrect": true,
        "reasoning": "* **ともだち (4) - INCORRECT:** This is 友達 (friend), not 先輩."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 460,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "やめ",
      "とめ",
      "おわり",
      "やすみ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "やめ",
        "isCorrect": true,
        "reasoning": "* **やめ (1) - CORRECT:** This is the standard reading for 止める (to stop/quit)."
      },
      {
        "option": "とめ",
        "isCorrect": true,
        "reasoning": "* **とめ (2) - INCORRECT:** This is 止める (to stop something), but wrong reading."
      },
      {
        "option": "おわり",
        "isCorrect": true,
        "reasoning": "* **おわり (3) - INCORRECT:** This is 終わり (end), not 止める."
      },
      {
        "option": "やすみ",
        "isCorrect": true,
        "reasoning": "* **やすみ (4) - INCORRECT:** This is 休み (rest), not 止める."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 461,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かたち",
      "かた",
      "すがた",
      "ようす"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かたち",
        "isCorrect": true,
        "reasoning": "* **かたち (1) - CORRECT:** This is the standard reading for 形 (shape)."
      },
      {
        "option": "かた",
        "isCorrect": true,
        "reasoning": "* **かた (2) - INCORRECT:** This is 型 (mold/type), not 形."
      },
      {
        "option": "すがた",
        "isCorrect": true,
        "reasoning": "* **すがた (3) - INCORRECT:** This is 姿 (figure), not 形."
      },
      {
        "option": "ようす",
        "isCorrect": true,
        "reasoning": "* **ようす (4) - INCORRECT:** This is 様子 (appearance), not 形."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 462,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "もり",
      "やま",
      "はやし",
      "にわ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "もり",
        "isCorrect": true,
        "reasoning": "* **もり (1) - CORRECT:** This is the standard reading for 森 (forest)."
      },
      {
        "option": "やま",
        "isCorrect": true,
        "reasoning": "* **やま (2) - INCORRECT:** This is 山 (mountain), not 森."
      },
      {
        "option": "はやし",
        "isCorrect": true,
        "reasoning": "* **はやし (3) - INCORRECT:** This is 林 (woods), not 森."
      },
      {
        "option": "にわ",
        "isCorrect": true,
        "reasoning": "* **にわ (4) - INCORRECT:** This is 庭 (garden), not 森."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 463,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "アルコール",
      "ビール",
      "ワイン",
      "さけ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "アルコール",
        "isCorrect": true,
        "reasoning": "* **アルコール (1) - CORRECT:** This is the standard reading for アルコール (alcohol)."
      },
      {
        "option": "ビール",
        "isCorrect": true,
        "reasoning": "* **ビール (2) - INCORRECT:** This is ビール (beer), not アルコール."
      },
      {
        "option": "ワイン",
        "isCorrect": true,
        "reasoning": "* **ワイン (3) - INCORRECT:** This is ワイン (wine), not アルコール."
      },
      {
        "option": "さけ",
        "isCorrect": true,
        "reasoning": "* **さけ (4) - INCORRECT:** This is 酒 (sake), not アルコール."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 464,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "たいふう",
      "あらし",
      "かぜ",
      "あめ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "たいふう",
        "isCorrect": true,
        "reasoning": "* **たいふう (1) - CORRECT:** This is the standard reading for 台風 (typhoon)."
      },
      {
        "option": "あらし",
        "isCorrect": true,
        "reasoning": "* **あらし (2) - INCORRECT:** This is 嵐 (storm), not 台風."
      },
      {
        "option": "かぜ",
        "isCorrect": true,
        "reasoning": "* **かぜ (3) - INCORRECT:** This is 風 (wind), not 台風."
      },
      {
        "option": "あめ",
        "isCorrect": true,
        "reasoning": "* **あめ (4) - INCORRECT:** This is 雨 (rain), not 台風."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 465,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "すすん",
      "はじまっ",
      "おわっ",
      "つづい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "すすん",
        "isCorrect": true,
        "reasoning": "* **すすん (1) - CORRECT:** This is the standard reading for 進む (to progress)."
      },
      {
        "option": "はじまっ",
        "isCorrect": true,
        "reasoning": "* **はじまっ (2) - INCORRECT:** This is 始まる (to begin), not 進む."
      },
      {
        "option": "おわっ",
        "isCorrect": true,
        "reasoning": "* **おわっ (3) - INCORRECT:** This is 終わる (to end), not 進む."
      },
      {
        "option": "つづい",
        "isCorrect": true,
        "reasoning": "* **つづい (4) - INCORRECT:** This is 続く (to continue), not 進む."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 466,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "にげ",
      "でかけ",
      "はしっ",
      "とん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "にげ",
        "isCorrect": true,
        "reasoning": "* **にげ (1) - CORRECT:** This is the standard reading for 逃げる (to escape)."
      },
      {
        "option": "でかけ",
        "isCorrect": true,
        "reasoning": "* **でかけ (2) - INCORRECT:** This is 出かける (to go out), not 逃げる."
      },
      {
        "option": "はしっ",
        "isCorrect": true,
        "reasoning": "* **はしっ (3) - INCORRECT:** This is 走る (to run), not 逃げる."
      },
      {
        "option": "とん",
        "isCorrect": true,
        "reasoning": "* **とん (4) - INCORRECT:** This is 飛ぶ (to fly), not 逃げる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 467,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ごぞんじ",
      "しって",
      "わかって",
      "おぼえて"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ごぞんじ",
        "isCorrect": true,
        "reasoning": "* **ごぞんじ (1) - CORRECT:** This is the standard reading for ご存じ (knowing - polite)."
      },
      {
        "option": "しって",
        "isCorrect": true,
        "reasoning": "* **しって (2) - INCORRECT:** This is 知る (to know), not ご存じ."
      },
      {
        "option": "わかって",
        "isCorrect": true,
        "reasoning": "* **わかって (3) - INCORRECT:** This is 分かる (to understand), not ご存じ."
      },
      {
        "option": "おぼえて",
        "isCorrect": true,
        "reasoning": "* **おぼえて (4) - INCORRECT:** This is 覚える (to remember), not ご存じ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 468,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "はやし",
      "もり",
      "にわ",
      "やま"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "はやし",
        "isCorrect": true,
        "reasoning": "* **はやし (1) - CORRECT:** This is the standard reading for 林 (woods)."
      },
      {
        "option": "もり",
        "isCorrect": true,
        "reasoning": "* **もり (2) - INCORRECT:** This is 森 (forest), not 林."
      },
      {
        "option": "にわ",
        "isCorrect": true,
        "reasoning": "* **にわ (3) - INCORRECT:** This is 庭 (garden), not 林."
      },
      {
        "option": "やま",
        "isCorrect": true,
        "reasoning": "* **やま (4) - INCORRECT:** This is 山 (mountain), not 林."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 469,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "りょかん",
      "ホテル",
      "やど",
      "みんしゅく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "りょかん",
        "isCorrect": true,
        "reasoning": "* **りょかん (1) - CORRECT:** This is the standard reading for 旅館 (Japanese inn)."
      },
      {
        "option": "ホテル",
        "isCorrect": true,
        "reasoning": "* **ホテル (2) - INCORRECT:** This is ホテル (hotel), not 旅館."
      },
      {
        "option": "やど",
        "isCorrect": true,
        "reasoning": "* **やど (3) - INCORRECT:** This is 宿 (inn), not 旅館."
      },
      {
        "option": "みんしゅく",
        "isCorrect": true,
        "reasoning": "* **みんしゅく (4) - INCORRECT:** This is 民宿 (guesthouse), not 旅館."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 470,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おどり",
      "うたい",
      "あるい",
      "はしり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おどり",
        "isCorrect": true,
        "reasoning": "* **おどり (1) - CORRECT:** This is the standard reading for 踊る (to dance)."
      },
      {
        "option": "うたい",
        "isCorrect": true,
        "reasoning": "* **うたい (2) - INCORRECT:** This is 歌う (to sing), not 踊る."
      },
      {
        "option": "あるい",
        "isCorrect": true,
        "reasoning": "* **あるい (3) - INCORRECT:** This is 歩く (to walk), not 踊る."
      },
      {
        "option": "はしり",
        "isCorrect": true,
        "reasoning": "* **はしり (4) - INCORRECT:** This is 走る (to run), not 踊る."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 471,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "さか",
      "やま",
      "みち",
      "がけ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "さか",
        "isCorrect": true,
        "reasoning": "* **さか (1) - CORRECT:** This is the standard reading for 坂 (slope/hill)."
      },
      {
        "option": "やま",
        "isCorrect": true,
        "reasoning": "* **やま (2) - INCORRECT:** This is 山 (mountain), not 坂."
      },
      {
        "option": "みち",
        "isCorrect": true,
        "reasoning": "* **みち (3) - INCORRECT:** This is 道 (road), not 坂."
      },
      {
        "option": "がけ",
        "isCorrect": true,
        "reasoning": "* **がけ (4) - INCORRECT:** This is 崖 (cliff), not 坂."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 472,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ふくざつ",
      "むずかしい",
      "たいへん",
      "ややこしい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ふくざつ",
        "isCorrect": true,
        "reasoning": "* **ふくざつ (1) - CORRECT:** This is the standard reading for 複雑 (complex)."
      },
      {
        "option": "むずかしい",
        "isCorrect": true,
        "reasoning": "* **むずかしい (2) - INCORRECT:** This is 難しい (difficult), not 複雑."
      },
      {
        "option": "たいへん",
        "isCorrect": true,
        "reasoning": "* **たいへん (3) - INCORRECT:** This is 大変 (tough), not 複雑."
      },
      {
        "option": "ややこしい",
        "isCorrect": true,
        "reasoning": "* **ややこしい (4) - INCORRECT:** This is ややこしい (complicated), not 複雑."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 473,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おもて",
      "うら",
      "なか",
      "よこ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おもて",
        "isCorrect": true,
        "reasoning": "* **おもて (1) - CORRECT:** This is the standard reading for 表 (front)."
      },
      {
        "option": "うら",
        "isCorrect": true,
        "reasoning": "* **うら (2) - INCORRECT:** This is 裏 (back), not 表."
      },
      {
        "option": "なか",
        "isCorrect": true,
        "reasoning": "* **なか (3) - INCORRECT:** This is 中 (inside), not 表."
      },
      {
        "option": "よこ",
        "isCorrect": true,
        "reasoning": "* **よこ (4) - INCORRECT:** This is 横 (side), not 表."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 474,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "わき",
      "あつく",
      "あたたまり",
      "もえ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "わき",
        "isCorrect": true,
        "reasoning": "* **わき (1) - CORRECT:** This is the standard reading for 沸く (to boil)."
      },
      {
        "option": "あつく",
        "isCorrect": true,
        "reasoning": "* **あつく (2) - INCORRECT:** This is 熱い (hot), not 沸く."
      },
      {
        "option": "あたたまり",
        "isCorrect": true,
        "reasoning": "* **あたたまり (3) - INCORRECT:** This is 温まる (to warm up), not 沸く."
      },
      {
        "option": "もえ",
        "isCorrect": true,
        "reasoning": "* **もえ (4) - INCORRECT:** This is 燃える (to burn), not 沸く."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 475,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "こうちょう",
      "せんせい",
      "きょうとう",
      "じむいん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こうちょう",
        "isCorrect": true,
        "reasoning": "* **こうちょう (1) - CORRECT:** This is the standard reading for 校長 (principal)."
      },
      {
        "option": "せんせい",
        "isCorrect": true,
        "reasoning": "* **せんせい (2) - INCORRECT:** This is 先生 (teacher), not 校長."
      },
      {
        "option": "きょうとう",
        "isCorrect": true,
        "reasoning": "* **きょうとう (3) - INCORRECT:** This is 教頭 (vice-principal), not 校長."
      },
      {
        "option": "じむいん",
        "isCorrect": true,
        "reasoning": "* **じむいん (4) - INCORRECT:** This is 事務員 (office staff), not 校長."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 476,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "のど",
      "くち",
      "はな",
      "あたま"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "のど",
        "isCorrect": true,
        "reasoning": "* **のど (1) - CORRECT:** This is the standard reading for 喉 (throat)."
      },
      {
        "option": "くち",
        "isCorrect": true,
        "reasoning": "* **くち (2) - INCORRECT:** This is 口 (mouth), not 喉."
      },
      {
        "option": "はな",
        "isCorrect": true,
        "reasoning": "* **はな (3) - INCORRECT:** This is 鼻 (nose), not 喉."
      },
      {
        "option": "あたま",
        "isCorrect": true,
        "reasoning": "* **あたま (4) - INCORRECT:** This is 頭 (head), not 喉."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 477,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かがく",
      "すうがく",
      "りか",
      "ぶつり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かがく",
        "isCorrect": true,
        "reasoning": "* **かがく (1) - CORRECT:** This is the standard reading for 科学 (science)."
      },
      {
        "option": "すうがく",
        "isCorrect": true,
        "reasoning": "* **すうがく (2) - INCORRECT:** This is 数学 (mathematics), not 科学."
      },
      {
        "option": "りか",
        "isCorrect": true,
        "reasoning": "* **りか (3) - INCORRECT:** This is 理科 (science subject), not 科学."
      },
      {
        "option": "ぶつり",
        "isCorrect": true,
        "reasoning": "* **ぶつり (4) - INCORRECT:** This is 物理 (physics), not 科学."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 478,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "とどけ",
      "はこび",
      "もって",
      "おくり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "とどけ",
        "isCorrect": true,
        "reasoning": "* **とどけ (1) - CORRECT:** This is the standard reading for 届ける (to deliver)."
      },
      {
        "option": "はこび",
        "isCorrect": true,
        "reasoning": "* **はこび (2) - INCORRECT:** This is 運ぶ (to carry), not 届ける."
      },
      {
        "option": "もって",
        "isCorrect": true,
        "reasoning": "* **もって (3) - INCORRECT:** This is 持つ (to hold), not 届ける."
      },
      {
        "option": "おくり",
        "isCorrect": true,
        "reasoning": "* **おくり (4) - INCORRECT:** This is 送る (to send), not 届ける."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 479,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ガス",
      "でんき",
      "みず",
      "せきゆ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ガス",
        "isCorrect": true,
        "reasoning": "* **ガス (1) - CORRECT:** This is the standard reading for ガス (gas)."
      },
      {
        "option": "でんき",
        "isCorrect": true,
        "reasoning": "* **でんき (2) - INCORRECT:** This is 電気 (electricity), not ガス."
      },
      {
        "option": "みず",
        "isCorrect": true,
        "reasoning": "* **みず (3) - INCORRECT:** This is 水 (water), not ガス."
      },
      {
        "option": "せきゆ",
        "isCorrect": true,
        "reasoning": "* **せきゆ (4) - INCORRECT:** This is 石油 (oil), not ガス."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 480,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "とくに",
      "とても",
      "すごく",
      "かなり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "とくに",
        "isCorrect": true,
        "reasoning": "* **とくに (1) - CORRECT:** This is the standard reading for 特に (especially)."
      },
      {
        "option": "とても",
        "isCorrect": true,
        "reasoning": "* **とても (2) - INCORRECT:** This is とても (very), not 特に."
      },
      {
        "option": "すごく",
        "isCorrect": true,
        "reasoning": "* **すごく (3) - INCORRECT:** This is すごく (extremely), not 特に."
      },
      {
        "option": "かなり",
        "isCorrect": true,
        "reasoning": "* **かなり (4) - INCORRECT:** This is かなり (quite), not 特に."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 481,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "じゆう",
      "ひま",
      "やすみ",
      "あき"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "じゆう",
        "isCorrect": true,
        "reasoning": "* **じゆう (1) - CORRECT:** This is the standard reading for 自由 (free/freedom)."
      },
      {
        "option": "ひま",
        "isCorrect": true,
        "reasoning": "* **ひま (2) - INCORRECT:** This is 暇 (leisure), not 自由."
      },
      {
        "option": "やすみ",
        "isCorrect": true,
        "reasoning": "* **やすみ (3) - INCORRECT:** This is 休み (rest), not 自由."
      },
      {
        "option": "あき",
        "isCorrect": true,
        "reasoning": "* **あき (4) - INCORRECT:** This is 空き (vacant), not 自由."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 482,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ただしい",
      "あたらしい",
      "むずかしい",
      "やさしい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ただしい",
        "isCorrect": true,
        "reasoning": "* **ただしい (1) - CORRECT:** This is the standard reading for 正しい (correct)."
      },
      {
        "option": "あたらしい",
        "isCorrect": true,
        "reasoning": "* **あたらしい (2) - INCORRECT:** This is 新しい (new), not 正しい."
      },
      {
        "option": "むずかしい",
        "isCorrect": true,
        "reasoning": "* **むずかしい (3) - INCORRECT:** This is 難しい (difficult), not 正しい."
      },
      {
        "option": "やさしい",
        "isCorrect": true,
        "reasoning": "* **やさしい (4) - INCORRECT:** This is 優しい (kind), not 正しい."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 483,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "むかえ",
      "まって",
      "よんで",
      "さがして"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "むかえ",
        "isCorrect": true,
        "reasoning": "* **むかえ (1) - CORRECT:** This is the standard reading for 迎える (to go out to meet)."
      },
      {
        "option": "まって",
        "isCorrect": true,
        "reasoning": "* **まって (2) - INCORRECT:** This is 待つ (to wait), not 迎える."
      },
      {
        "option": "よんで",
        "isCorrect": true,
        "reasoning": "* **よんで (3) - INCORRECT:** This is 呼ぶ (to call), not 迎える."
      },
      {
        "option": "さがして",
        "isCorrect": true,
        "reasoning": "* **さがして (4) - INCORRECT:** This is 探す (to search), not 迎える."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 484,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ふとり",
      "やせ",
      "つかれ",
      "よわく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ふとり",
        "isCorrect": true,
        "reasoning": "* **ふとり (1) - CORRECT:** This is the standard reading for 太る (to become fat)."
      },
      {
        "option": "やせ",
        "isCorrect": true,
        "reasoning": "* **やせ (2) - INCORRECT:** This is 痩せる (to lose weight), not 太る."
      },
      {
        "option": "つかれ",
        "isCorrect": true,
        "reasoning": "* **つかれ (3) - INCORRECT:** This is 疲れる (to get tired), not 太る."
      },
      {
        "option": "よわく",
        "isCorrect": true,
        "reasoning": "* **よわく (4) - INCORRECT:** This is 弱い (weak), not 太る."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 485,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "どろぼう",
      "ゆうびん",
      "でんき",
      "みず"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "どろぼう",
        "isCorrect": true,
        "reasoning": "* **どろぼう (1) - CORRECT:** This is the standard reading for 泥棒 (thief)."
      },
      {
        "option": "ゆうびん",
        "isCorrect": true,
        "reasoning": "* **ゆうびん (2) - INCORRECT:** This is 郵便 (mail), not 泥棒."
      },
      {
        "option": "でんき",
        "isCorrect": true,
        "reasoning": "* **でんき (3) - INCORRECT:** This is 電気 (electricity), not 泥棒."
      },
      {
        "option": "みず",
        "isCorrect": true,
        "reasoning": "* **みず (4) - INCORRECT:** This is 水 (water), not 泥棒."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 486,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "あいだ",
      "うえ",
      "した",
      "よこ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "あいだ",
        "isCorrect": true,
        "reasoning": "* **あいだ (1) - CORRECT:** This is the standard reading for 間 (between/space)."
      },
      {
        "option": "うえ",
        "isCorrect": true,
        "reasoning": "* **うえ (2) - INCORRECT:** This is 上 (above), not 間."
      },
      {
        "option": "した",
        "isCorrect": true,
        "reasoning": "* **した (3) - INCORRECT:** This is 下 (below), not 間."
      },
      {
        "option": "よこ",
        "isCorrect": true,
        "reasoning": "* **よこ (4) - INCORRECT:** This is 横 (side), not 間."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 487,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ほめ",
      "しかり",
      "よび",
      "たすけ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ほめ",
        "isCorrect": true,
        "reasoning": "* **ほめ (1) - CORRECT:** This is the standard reading for ほめる (to praise)."
      },
      {
        "option": "しかり",
        "isCorrect": true,
        "reasoning": "* **しかり (2) - INCORRECT:** This is 叱る (to scold), not ほめる."
      },
      {
        "option": "よび",
        "isCorrect": true,
        "reasoning": "* **よび (3) - INCORRECT:** This is 呼ぶ (to call), not ほめる."
      },
      {
        "option": "たすけ",
        "isCorrect": true,
        "reasoning": "* **たすけ (4) - INCORRECT:** This is 助ける (to help), not ほめる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 488,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "けが",
      "びょうき",
      "かぜ",
      "ねつ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "けが",
        "isCorrect": true,
        "reasoning": "* **けが (1) - CORRECT:** This is the standard reading for 怪我 (injury)."
      },
      {
        "option": "びょうき",
        "isCorrect": true,
        "reasoning": "* **びょうき (2) - INCORRECT:** This is 病気 (illness), not 怪我."
      },
      {
        "option": "かぜ",
        "isCorrect": true,
        "reasoning": "* **かぜ (3) - INCORRECT:** This is 風邪 (cold), not 怪我."
      },
      {
        "option": "ねつ",
        "isCorrect": true,
        "reasoning": "* **ねつ (4) - INCORRECT:** This is 熱 (fever), not 怪我."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 489,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "こわれ",
      "とまり",
      "おちて",
      "なくなり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こわれ",
        "isCorrect": true,
        "reasoning": "* **こわれ (1) - CORRECT:** This is the standard reading for 壊れる (to be broken)."
      },
      {
        "option": "とまり",
        "isCorrect": true,
        "reasoning": "* **とまり (2) - INCORRECT:** This is 止まる (to stop), not 壊れる."
      },
      {
        "option": "おちて",
        "isCorrect": true,
        "reasoning": "* **おちて (3) - INCORRECT:** This is 落ちる (to fall), not 壊れる."
      },
      {
        "option": "なくなり",
        "isCorrect": true,
        "reasoning": "* **なくなり (4) - INCORRECT:** This is なくなる (to disappear), not 壊れる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 490,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ひ",
      "てんき",
      "あさ",
      "ばん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ひ",
        "isCorrect": true,
        "reasoning": "* **ひ (1) - CORRECT:** This is the standard reading for 日 (day)."
      },
      {
        "option": "てんき",
        "isCorrect": true,
        "reasoning": "* **てんき (2) - INCORRECT:** This is 天気 (weather), not 日."
      },
      {
        "option": "あさ",
        "isCorrect": true,
        "reasoning": "* **あさ (3) - INCORRECT:** This is 朝 (morning), not 日."
      },
      {
        "option": "ばん",
        "isCorrect": true,
        "reasoning": "* **ばん (4) - INCORRECT:** This is 晩 (evening), not 日."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 491,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "それに",
      "でも",
      "だから",
      "しかし"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "それに",
        "isCorrect": true,
        "reasoning": "* **それに (1) - CORRECT:** This is the standard reading for それに (moreover)."
      },
      {
        "option": "でも",
        "isCorrect": true,
        "reasoning": "* **でも (2) - INCORRECT:** This is でも (but), not それに."
      },
      {
        "option": "だから",
        "isCorrect": true,
        "reasoning": "* **だから (3) - INCORRECT:** This is だから (so), not それに."
      },
      {
        "option": "しかし",
        "isCorrect": true,
        "reasoning": "* **しかし (4) - INCORRECT:** This is しかし (however), not それに."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 492,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "にっき",
      "てがみ",
      "しゅくだい",
      "れぽーと"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "にっき",
        "isCorrect": true,
        "reasoning": "* **にっき (1) - CORRECT:** This is the standard reading for 日記 (journal)."
      },
      {
        "option": "てがみ",
        "isCorrect": true,
        "reasoning": "* **てがみ (2) - INCORRECT:** This is 手紙 (letter), not 日記."
      },
      {
        "option": "しゅくだい",
        "isCorrect": true,
        "reasoning": "* **しゅくだい (3) - INCORRECT:** This is 宿題 (homework), not 日記."
      },
      {
        "option": "れぽーと",
        "isCorrect": true,
        "reasoning": "* **れぽーと (4) - INCORRECT:** This is レポート (report), not 日記."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 493,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "べつ",
      "あたらしい",
      "おなじ",
      "ふるい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "べつ",
        "isCorrect": true,
        "reasoning": "* **べつ (1) - CORRECT:** This is the standard reading for 別 (different)."
      },
      {
        "option": "あたらしい",
        "isCorrect": true,
        "reasoning": "* **あたらしい (2) - INCORRECT:** This is 新しい (new), not 別."
      },
      {
        "option": "おなじ",
        "isCorrect": true,
        "reasoning": "* **おなじ (3) - INCORRECT:** This is 同じ (same), not 別."
      },
      {
        "option": "ふるい",
        "isCorrect": true,
        "reasoning": "* **ふるい (4) - INCORRECT:** This is 古い (old), not 別."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 494,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "そだて",
      "おしえ",
      "あそび",
      "たすけ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "そだて",
        "isCorrect": true,
        "reasoning": "* **そだて (1) - CORRECT:** This is the standard reading for 育てる (to rear/bring up)."
      },
      {
        "option": "おしえ",
        "isCorrect": true,
        "reasoning": "* **おしえ (2) - INCORRECT:** This is 教える (to teach), not 育てる."
      },
      {
        "option": "あそび",
        "isCorrect": true,
        "reasoning": "* **あそび (3) - INCORRECT:** This is 遊ぶ (to play), not 育てる."
      },
      {
        "option": "たすけ",
        "isCorrect": true,
        "reasoning": "* **たすけ (4) - INCORRECT:** This is 助ける (to help), not 育てる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 495,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ようい",
      "しゅくだい",
      "べんきょう",
      "しごと"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ようい",
        "isCorrect": true,
        "reasoning": "* **ようい (1) - CORRECT:** This is the standard reading for 用意 (preparation)."
      },
      {
        "option": "しゅくだい",
        "isCorrect": true,
        "reasoning": "* **しゅくだい (2) - INCORRECT:** This is 宿題 (homework), not 用意."
      },
      {
        "option": "べんきょう",
        "isCorrect": true,
        "reasoning": "* **べんきょう (3) - INCORRECT:** This is 勉強 (study), not 用意."
      },
      {
        "option": "しごと",
        "isCorrect": true,
        "reasoning": "* **しごと (4) - INCORRECT:** This is 仕事 (work), not 用意."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 496,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "むり",
      "だめ",
      "むずかしい",
      "たいへん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "むり",
        "isCorrect": true,
        "reasoning": "* **むり (1) - CORRECT:** This is the standard reading for 無理 (impossible)."
      },
      {
        "option": "だめ",
        "isCorrect": true,
        "reasoning": "* **だめ (2) - INCORRECT:** This is だめ (no good), not 無理."
      },
      {
        "option": "むずかしい",
        "isCorrect": true,
        "reasoning": "* **むずかしい (3) - INCORRECT:** This is 難しい (difficult), not 無理."
      },
      {
        "option": "たいへん",
        "isCorrect": true,
        "reasoning": "* **たいへん (4) - INCORRECT:** This is 大変 (tough), not 無理."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 497,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ほうそう",
      "てれび",
      "にゅーす",
      "えいが"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ほうそう",
        "isCorrect": true,
        "reasoning": "* **ほうそう (1) - CORRECT:** This is the standard reading for 放送 (broadcast)."
      },
      {
        "option": "てれび",
        "isCorrect": true,
        "reasoning": "* **てれび (2) - INCORRECT:** This is テレビ (TV), not 放送."
      },
      {
        "option": "にゅーす",
        "isCorrect": true,
        "reasoning": "* **にゅーす (3) - INCORRECT:** This is ニュース (news), not 放送."
      },
      {
        "option": "えいが",
        "isCorrect": true,
        "reasoning": "* **えいが (4) - INCORRECT:** This is 映画 (movie), not 放送."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 498,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "きょうそう",
      "しあい",
      "うんどう",
      "れんしゅう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "きょうそう",
        "isCorrect": true,
        "reasoning": "* **きょうそう (1) - CORRECT:** This is the standard reading for 競争 (competition)."
      },
      {
        "option": "しあい",
        "isCorrect": true,
        "reasoning": "* **しあい (2) - INCORRECT:** This is 試合 (match), not 競争."
      },
      {
        "option": "うんどう",
        "isCorrect": true,
        "reasoning": "* **うんどう (3) - INCORRECT:** This is 運動 (exercise), not 競争."
      },
      {
        "option": "れんしゅう",
        "isCorrect": true,
        "reasoning": "* **れんしゅう (4) - INCORRECT:** This is 練習 (practice), not 競争."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 499,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "なかなか",
      "とても",
      "すごく",
      "ちょっと"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "なかなか",
        "isCorrect": true,
        "reasoning": "* **なかなか (1) - CORRECT:** This is the standard reading for 中々 (considerably)."
      },
      {
        "option": "とても",
        "isCorrect": true,
        "reasoning": "* **とても (2) - INCORRECT:** This is とても (very), not 中々."
      },
      {
        "option": "すごく",
        "isCorrect": true,
        "reasoning": "* **すごく (3) - INCORRECT:** This is すごく (extremely), not 中々."
      },
      {
        "option": "ちょっと",
        "isCorrect": true,
        "reasoning": "* **ちょっと (4) - INCORRECT:** This is ちょっと (a little), not 中々."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 500,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "てんいん",
      "きゃく",
      "ともだち",
      "かぞく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "てんいん",
        "isCorrect": true,
        "reasoning": "* **てんいん (1) - CORRECT:** This is the standard reading for 店員 (shop assistant)."
      },
      {
        "option": "きゃく",
        "isCorrect": true,
        "reasoning": "* **きゃく (2) - INCORRECT:** This is 客 (customer), not 店員."
      },
      {
        "option": "ともだち",
        "isCorrect": true,
        "reasoning": "* **ともだち (3) - INCORRECT:** This is 友達 (friend), not 店員."
      },
      {
        "option": "かぞく",
        "isCorrect": true,
        "reasoning": "* **かぞく (4) - INCORRECT:** This is 家族 (family), not 店員."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 501,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ゆしゅつ",
      "ゆにゅう",
      "はんばい",
      "せいぞう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ゆしゅつ",
        "isCorrect": true,
        "reasoning": "* **ゆしゅつ (1) - CORRECT:** This is the standard reading for 輸出 (to export)."
      },
      {
        "option": "ゆにゅう",
        "isCorrect": true,
        "reasoning": "* **ゆにゅう (2) - INCORRECT:** This is 輸入 (to import), not 輸出."
      },
      {
        "option": "はんばい",
        "isCorrect": true,
        "reasoning": "* **はんばい (3) - INCORRECT:** This is 販売 (to sell), not 輸出."
      },
      {
        "option": "せいぞう",
        "isCorrect": true,
        "reasoning": "* **せいぞう (4) - INCORRECT:** This is 製造 (to manufacture), not 輸出."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 502,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "くらべ",
      "えらび",
      "みつけ",
      "しらべ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "くらべ",
        "isCorrect": true,
        "reasoning": "* **くらべ (1) - CORRECT:** This is the standard reading for 比べる (to compare)."
      },
      {
        "option": "えらび",
        "isCorrect": true,
        "reasoning": "* **えらび (2) - INCORRECT:** This is 選ぶ (to choose), not 比べる."
      },
      {
        "option": "みつけ",
        "isCorrect": true,
        "reasoning": "* **みつけ (3) - INCORRECT:** This is 見つける (to find), not 比べる."
      },
      {
        "option": "しらべ",
        "isCorrect": true,
        "reasoning": "* **しらべ (4) - INCORRECT:** This is 調べる (to investigate), not 比べる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 503,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ほんやく",
      "べんきょう",
      "しごと",
      "れんしゅう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ほんやく",
        "isCorrect": true,
        "reasoning": "* **ほんやく (1) - CORRECT:** This is the standard reading for 翻訳 (translation)."
      },
      {
        "option": "べんきょう",
        "isCorrect": true,
        "reasoning": "* **べんきょう (2) - INCORRECT:** This is 勉強 (study), not 翻訳."
      },
      {
        "option": "しごと",
        "isCorrect": true,
        "reasoning": "* **しごと (3) - INCORRECT:** This is 仕事 (work), not 翻訳."
      },
      {
        "option": "れんしゅう",
        "isCorrect": true,
        "reasoning": "* **れんしゅう (4) - INCORRECT:** This is 練習 (practice), not 翻訳."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 504,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "えらび",
      "かい",
      "よみ",
      "かり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "えらび",
        "isCorrect": true,
        "reasoning": "* **えらび (1) - CORRECT:** This is the standard reading for 選ぶ (to choose)."
      },
      {
        "option": "かい",
        "isCorrect": true,
        "reasoning": "* **かい (2) - INCORRECT:** This is 買う (to buy), not 選ぶ."
      },
      {
        "option": "よみ",
        "isCorrect": true,
        "reasoning": "* **よみ (3) - INCORRECT:** This is 読む (to read), not 選ぶ."
      },
      {
        "option": "かり",
        "isCorrect": true,
        "reasoning": "* **かり (4) - INCORRECT:** This is 借りる (to borrow), not 選ぶ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 505,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ちゅうしゃじょう",
      "みち",
      "こうえん",
      "えき"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ちゅうしゃじょう",
        "isCorrect": true,
        "reasoning": "* **ちゅうしゃじょう (1) - CORRECT:** This is the standard reading for 駐車場 (parking lot)."
      },
      {
        "option": "みち",
        "isCorrect": true,
        "reasoning": "* **みち (2) - INCORRECT:** This is 道 (road), not 駐車場."
      },
      {
        "option": "こうえん",
        "isCorrect": true,
        "reasoning": "* **こうえん (3) - INCORRECT:** This is 公園 (park), not 駐車場."
      },
      {
        "option": "えき",
        "isCorrect": true,
        "reasoning": "* **えき (4) - INCORRECT:** This is 駅 (station), not 駐車場."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 506,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "だめ",
      "いい",
      "わるい",
      "むずかしい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "だめ",
        "isCorrect": true,
        "reasoning": "* **だめ (1) - CORRECT:** This is the standard reading for だめ (no good)."
      },
      {
        "option": "いい",
        "isCorrect": true,
        "reasoning": "* **いい (2) - INCORRECT:** This is いい (good), not だめ."
      },
      {
        "option": "わるい",
        "isCorrect": true,
        "reasoning": "* **わるい (3) - INCORRECT:** This is 悪い (bad), not だめ."
      },
      {
        "option": "むずかしい",
        "isCorrect": true,
        "reasoning": "* **むずかしい (4) - INCORRECT:** This is 難しい (difficult), not だめ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 507,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かいぎしつ",
      "きょうしつ",
      "じむしつ",
      "しょくどう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かいぎしつ",
        "isCorrect": true,
        "reasoning": "* **かいぎしつ (1) - CORRECT:** This is the standard reading for 会議室 (meeting room)."
      },
      {
        "option": "きょうしつ",
        "isCorrect": true,
        "reasoning": "* **きょうしつ (2) - INCORRECT:** This is 教室 (classroom), not 会議室."
      },
      {
        "option": "じむしつ",
        "isCorrect": true,
        "reasoning": "* **じむしつ (3) - INCORRECT:** This is 事務室 (office), not 会議室."
      },
      {
        "option": "しょくどう",
        "isCorrect": true,
        "reasoning": "* **しょくどう (4) - INCORRECT:** This is 食堂 (cafeteria), not 会議室."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 508,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "とおり",
      "あるき",
      "はしり",
      "わたり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "とおり",
        "isCorrect": true,
        "reasoning": "* **とおり (1) - CORRECT:** This is the standard reading for 通る (to go through)."
      },
      {
        "option": "あるき",
        "isCorrect": true,
        "reasoning": "* **あるき (2) - INCORRECT:** This is 歩く (to walk), not 通る."
      },
      {
        "option": "はしり",
        "isCorrect": true,
        "reasoning": "* **はしり (3) - INCORRECT:** This is 走る (to run), not 通る."
      },
      {
        "option": "わたり",
        "isCorrect": true,
        "reasoning": "* **わたり (4) - INCORRECT:** This is 渡る (to cross), not 通る."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 509,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "うんてん",
      "りょこう",
      "さんぽ",
      "かいもの"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "うんてん",
        "isCorrect": true,
        "reasoning": "* **うんてん (1) - CORRECT:** This is the standard reading for 運転 (to drive)."
      },
      {
        "option": "りょこう",
        "isCorrect": true,
        "reasoning": "* **りょこう (2) - INCORRECT:** This is 旅行 (travel), not 運転."
      },
      {
        "option": "さんぽ",
        "isCorrect": true,
        "reasoning": "* **さんぽ (3) - INCORRECT:** This is 散歩 (walk), not 運転."
      },
      {
        "option": "かいもの",
        "isCorrect": true,
        "reasoning": "* **かいもの (4) - INCORRECT:** This is 買い物 (shopping), not 運転."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 510,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "いじめる",
      "たすける",
      "ほめる",
      "よぶ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いじめる",
        "isCorrect": true,
        "reasoning": "* **いじめる (1) - CORRECT:** This is the standard reading for いじめる (to tease)."
      },
      {
        "option": "たすける",
        "isCorrect": true,
        "reasoning": "* **たすける (2) - INCORRECT:** This is 助ける (to help), not いじめる."
      },
      {
        "option": "ほめる",
        "isCorrect": true,
        "reasoning": "* **ほめる (3) - INCORRECT:** This is ほめる (to praise), not いじめる."
      },
      {
        "option": "よぶ",
        "isCorrect": true,
        "reasoning": "* **よぶ (4) - INCORRECT:** This is 呼ぶ (to call), not いじめる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 511,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "きゅうこう",
      "でんしゃ",
      "ばす",
      "ちかてつ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "きゅうこう",
        "isCorrect": true,
        "reasoning": "* **きゅうこう (1) - CORRECT:** This is the standard reading for 急行 (express)."
      },
      {
        "option": "でんしゃ",
        "isCorrect": true,
        "reasoning": "* **でんしゃ (2) - INCORRECT:** This is 電車 (train), not 急行."
      },
      {
        "option": "ばす",
        "isCorrect": true,
        "reasoning": "* **ばす (3) - INCORRECT:** This is バス (bus), not 急行."
      },
      {
        "option": "ちかてつ",
        "isCorrect": true,
        "reasoning": "* **ちかてつ (4) - INCORRECT:** This is 地下鉄 (subway), not 急行."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 512,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "きしゃ",
      "でんしゃ",
      "しんかんせん",
      "ちかてつ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "きしゃ",
        "isCorrect": true,
        "reasoning": "* **きしゃ (1) - CORRECT:** This is the standard reading for 汽車 (steam train)."
      },
      {
        "option": "でんしゃ",
        "isCorrect": true,
        "reasoning": "* **でんしゃ (2) - INCORRECT:** This is 電車 (electric train), not 汽車."
      },
      {
        "option": "しんかんせん",
        "isCorrect": true,
        "reasoning": "* **しんかんせん (3) - INCORRECT:** This is 新幹線 (bullet train), not 汽車."
      },
      {
        "option": "ちかてつ",
        "isCorrect": true,
        "reasoning": "* **ちかてつ (4) - INCORRECT:** This is 地下鉄 (subway), not 汽車."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 513,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おれい",
      "あいさつ",
      "しつもん",
      "へんじ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おれい",
        "isCorrect": true,
        "reasoning": "* **おれい (1) - CORRECT:** This is the standard reading for お礼 (expression of gratitude)."
      },
      {
        "option": "あいさつ",
        "isCorrect": true,
        "reasoning": "* **あいさつ (2) - INCORRECT:** This is 挨拶 (greeting), not お礼."
      },
      {
        "option": "しつもん",
        "isCorrect": true,
        "reasoning": "* **しつもん (3) - INCORRECT:** This is 質問 (question), not お礼."
      },
      {
        "option": "へんじ",
        "isCorrect": true,
        "reasoning": "* **へんじ (4) - INCORRECT:** This is 返事 (reply), not お礼."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 514,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かち",
      "まけ",
      "でて",
      "はいり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かち",
        "isCorrect": true,
        "reasoning": "* **かち (1) - CORRECT:** This is the standard reading for 勝つ (to win)."
      },
      {
        "option": "まけ",
        "isCorrect": true,
        "reasoning": "* **まけ (2) - INCORRECT:** This is 負ける (to lose), not 勝つ."
      },
      {
        "option": "でて",
        "isCorrect": true,
        "reasoning": "* **でて (3) - INCORRECT:** This is 出る (to go out), not 勝つ."
      },
      {
        "option": "はいり",
        "isCorrect": true,
        "reasoning": "* **はいり (4) - INCORRECT:** This is 入る (to enter), not 勝つ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 515,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "いっぱい",
      "すいて",
      "いたく",
      "つかれて"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いっぱい",
        "isCorrect": true,
        "reasoning": "* **いっぱい (1) - CORRECT:** This is the standard reading for 一杯 (full)."
      },
      {
        "option": "すいて",
        "isCorrect": true,
        "reasoning": "* **すいて (2) - INCORRECT:** This is 空く (to be empty), not 一杯."
      },
      {
        "option": "いたく",
        "isCorrect": true,
        "reasoning": "* **いたく (3) - INCORRECT:** This is 痛い (to hurt), not 一杯."
      },
      {
        "option": "つかれて",
        "isCorrect": true,
        "reasoning": "* **つかれて (4) - INCORRECT:** This is 疲れる (to be tired), not 一杯."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 516,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ごしゅじん",
      "おくさん",
      "おとうさん",
      "おかあさん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ごしゅじん",
        "isCorrect": true,
        "reasoning": "* **ごしゅじん (1) - CORRECT:** This is the standard reading for 御主人 (your husband)."
      },
      {
        "option": "おくさん",
        "isCorrect": true,
        "reasoning": "* **おくさん (2) - INCORRECT:** This is 奥さん (wife), not 御主人."
      },
      {
        "option": "おとうさん",
        "isCorrect": true,
        "reasoning": "* **おとうさん (3) - INCORRECT:** This is お父さん (father), not 御主人."
      },
      {
        "option": "おかあさん",
        "isCorrect": true,
        "reasoning": "* **おかあさん (4) - INCORRECT:** This is お母さん (mother), not 御主人."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 517,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "にがい",
      "あまい",
      "からい",
      "すっぱい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "にがい",
        "isCorrect": true,
        "reasoning": "* **にがい (1) - CORRECT:** This is the standard reading for 苦い (bitter)."
      },
      {
        "option": "あまい",
        "isCorrect": true,
        "reasoning": "* **あまい (2) - INCORRECT:** This is 甘い (sweet), not 苦い."
      },
      {
        "option": "からい",
        "isCorrect": true,
        "reasoning": "* **からい (3) - INCORRECT:** This is 辛い (spicy), not 苦い."
      },
      {
        "option": "すっぱい",
        "isCorrect": true,
        "reasoning": "* **すっぱい (4) - INCORRECT:** This is 酸っぱい (sour), not 苦い."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 518,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おち",
      "とび",
      "ながれ",
      "ころび"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おち",
        "isCorrect": true,
        "reasoning": "* **おち (1) - CORRECT:** This is the standard reading for 落る (to fall or drop)."
      },
      {
        "option": "とび",
        "isCorrect": true,
        "reasoning": "* **とび (2) - INCORRECT:** This is 飛ぶ (to fly), not 落る."
      },
      {
        "option": "ながれ",
        "isCorrect": true,
        "reasoning": "* **ながれ (3) - INCORRECT:** This is 流れる (to flow), not 落る."
      },
      {
        "option": "ころび",
        "isCorrect": true,
        "reasoning": "* **ころび (4) - INCORRECT:** This is 転ぶ (to tumble), not 落る."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 519,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "せなか",
      "あたま",
      "おなか",
      "むね"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "せなか",
        "isCorrect": true,
        "reasoning": "* **せなか (1) - CORRECT:** This is the standard reading for 背中 (back of the body)."
      },
      {
        "option": "あたま",
        "isCorrect": true,
        "reasoning": "* **あたま (2) - INCORRECT:** This is 頭 (head), not 背中."
      },
      {
        "option": "おなか",
        "isCorrect": true,
        "reasoning": "* **おなか (3) - INCORRECT:** This is お腹 (stomach), not 背中."
      },
      {
        "option": "むね",
        "isCorrect": true,
        "reasoning": "* **むね (4) - INCORRECT:** This is 胸 (chest), not 背中."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 520,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "とこや",
      "びよういん",
      "びょういん",
      "ぎんこう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "とこや",
        "isCorrect": true,
        "reasoning": "* **とこや (1) - CORRECT:** This is the standard reading for とこや (barber)."
      },
      {
        "option": "びよういん",
        "isCorrect": true,
        "reasoning": "* **びよういん (2) - INCORRECT:** This is 美容院 (beauty salon), not とこや."
      },
      {
        "option": "びょういん",
        "isCorrect": true,
        "reasoning": "* **びょういん (3) - INCORRECT:** This is 病院 (hospital), not とこや."
      },
      {
        "option": "ぎんこう",
        "isCorrect": true,
        "reasoning": "* **ぎんこう (4) - INCORRECT:** This is 銀行 (bank), not とこや."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 521,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "あんぜん",
      "きけん",
      "しずか",
      "べんり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "あんぜん",
        "isCorrect": true,
        "reasoning": "* **あんぜん (1) - CORRECT:** This is the standard reading for 安全 (safety)."
      },
      {
        "option": "きけん",
        "isCorrect": true,
        "reasoning": "* **きけん (2) - INCORRECT:** This is 危険 (danger), not 安全."
      },
      {
        "option": "しずか",
        "isCorrect": true,
        "reasoning": "* **しずか (3) - INCORRECT:** This is 静か (quiet), not 安全."
      },
      {
        "option": "べんり",
        "isCorrect": true,
        "reasoning": "* **べんり (4) - INCORRECT:** This is 便利 (convenient), not 安全."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 522,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ぐあい",
      "きぶん",
      "げんき",
      "ちょうし"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ぐあい",
        "isCorrect": true,
        "reasoning": "* **ぐあい (1) - CORRECT:** This is the standard reading for 具合 (condition/health)."
      },
      {
        "option": "きぶん",
        "isCorrect": true,
        "reasoning": "* **きぶん (2) - INCORRECT:** This is 気分 (mood), not 具合."
      },
      {
        "option": "げんき",
        "isCorrect": true,
        "reasoning": "* **げんき (3) - INCORRECT:** This is 元気 (energy), not 具合."
      },
      {
        "option": "ちょうし",
        "isCorrect": true,
        "reasoning": "* **ちょうし (4) - INCORRECT:** This is 調子 (condition), not 具合."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 523,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "せつめい",
      "しつもん",
      "はなし",
      "れんらく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "せつめい",
        "isCorrect": true,
        "reasoning": "* **せつめい (1) - CORRECT:** This is the standard reading for 説明 (explanation)."
      },
      {
        "option": "しつもん",
        "isCorrect": true,
        "reasoning": "* **しつもん (2) - INCORRECT:** This is 質問 (question), not 説明."
      },
      {
        "option": "はなし",
        "isCorrect": true,
        "reasoning": "* **はなし (3) - INCORRECT:** This is 話 (talk), not 説明."
      },
      {
        "option": "れんらく",
        "isCorrect": true,
        "reasoning": "* **れんらく (4) - INCORRECT:** This is 連絡 (contact), not 説明."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 524,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "きみ",
      "あなた",
      "かれ",
      "かのじょ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "きみ",
        "isCorrect": true,
        "reasoning": "* **きみ (1) - CORRECT:** This is the standard reading for 君 (you - informal, used by men)."
      },
      {
        "option": "あなた",
        "isCorrect": true,
        "reasoning": "* **あなた (2) - INCORRECT:** This is あなた (you - formal), not 君."
      },
      {
        "option": "かれ",
        "isCorrect": true,
        "reasoning": "* **かれ (3) - INCORRECT:** This is 彼 (he), not 君."
      },
      {
        "option": "かのじょ",
        "isCorrect": true,
        "reasoning": "* **かのじょ (4) - INCORRECT:** This is 彼女 (she), not 君."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 525,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "チェック",
      "テスト",
      "しけん",
      "べんきょう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "チェック",
        "isCorrect": true,
        "reasoning": "* **チェック (1) - CORRECT:** This is the standard reading for チェック (to check)."
      },
      {
        "option": "テスト",
        "isCorrect": true,
        "reasoning": "* **テスト (2) - INCORRECT:** This is テスト (test), not チェック."
      },
      {
        "option": "しけん",
        "isCorrect": true,
        "reasoning": "* **しけん (3) - INCORRECT:** This is 試験 (exam), not チェック."
      },
      {
        "option": "べんきょう",
        "isCorrect": true,
        "reasoning": "* **べんきょう (4) - INCORRECT:** This is 勉強 (study), not チェック."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 526,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ひどい",
      "いい",
      "わるい",
      "あつい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ひどい",
        "isCorrect": true,
        "reasoning": "* **ひどい (1) - CORRECT:** This is the standard reading for ひどい (awful)."
      },
      {
        "option": "いい",
        "isCorrect": true,
        "reasoning": "* **いい (2) - INCORRECT:** This is いい (good), not ひどい."
      },
      {
        "option": "わるい",
        "isCorrect": true,
        "reasoning": "* **わるい (3) - INCORRECT:** This is 悪い (bad), not ひどい."
      },
      {
        "option": "あつい",
        "isCorrect": true,
        "reasoning": "* **あつい (4) - INCORRECT:** This is 暑い (hot), not ひどい."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 527,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "えんりょ",
      "しんぱい",
      "あんしん",
      "きんちょう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "えんりょ",
        "isCorrect": true,
        "reasoning": "* **えんりょ (1) - CORRECT:** This is the standard reading for 遠慮 (to be reserved, to be restrained)."
      },
      {
        "option": "しんぱい",
        "isCorrect": true,
        "reasoning": "* **しんぱい (2) - INCORRECT:** This is 心配 (worry), not 遠慮."
      },
      {
        "option": "あんしん",
        "isCorrect": true,
        "reasoning": "* **あんしん (3) - INCORRECT:** This is 安心 (relief), not 遠慮."
      },
      {
        "option": "きんちょう",
        "isCorrect": true,
        "reasoning": "* **きんちょう (4) - INCORRECT:** This is 緊張 (tension), not 遠慮."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 528,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "スーツ",
      "シャツ",
      "ズボン",
      "くつ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "スーツ",
        "isCorrect": true,
        "reasoning": "* **スーツ (1) - CORRECT:** This is the standard reading for スーツ (suit)."
      },
      {
        "option": "シャツ",
        "isCorrect": true,
        "reasoning": "* **シャツ (2) - INCORRECT:** This is シャツ (shirt), not スーツ."
      },
      {
        "option": "ズボン",
        "isCorrect": true,
        "reasoning": "* **ズボン (3) - INCORRECT:** This is ズボン (pants), not スーツ."
      },
      {
        "option": "くつ",
        "isCorrect": true,
        "reasoning": "* **くつ (4) - INCORRECT:** This is 靴 (shoes), not スーツ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 529,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "うえ",
      "そだて",
      "かり",
      "つく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "うえ",
        "isCorrect": true,
        "reasoning": "* **うえ (1) - CORRECT:** This is the standard reading for 植える (to plant, to grow)."
      },
      {
        "option": "そだて",
        "isCorrect": true,
        "reasoning": "* **そだて (2) - INCORRECT:** This is 育てる (to raise), not 植える."
      },
      {
        "option": "かり",
        "isCorrect": true,
        "reasoning": "* **かり (3) - INCORRECT:** This is 刈る (to cut), not 植える."
      },
      {
        "option": "つく",
        "isCorrect": true,
        "reasoning": "* **つく (4) - INCORRECT:** This is 作る (to make), not 植える."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 530,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "だいがくせい",
      "こうこうせい",
      "がくせい",
      "せんせい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "だいがくせい",
        "isCorrect": true,
        "reasoning": "* **だいがくせい (1) - CORRECT:** This is the standard reading for 大学生 (university student)."
      },
      {
        "option": "こうこうせい",
        "isCorrect": true,
        "reasoning": "* **こうこうせい (2) - INCORRECT:** This is 高校生 (high school student), not 大学生."
      },
      {
        "option": "がくせい",
        "isCorrect": true,
        "reasoning": "* **がくせい (3) - INCORRECT:** This is 学生 (student), not 大学生."
      },
      {
        "option": "せんせい",
        "isCorrect": true,
        "reasoning": "* **せんせい (4) - INCORRECT:** This is 先生 (teacher), not 大学生."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 531,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "とまり",
      "いき",
      "かえり",
      "やすみ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "とまり",
        "isCorrect": true,
        "reasoning": "* **とまり (1) - CORRECT:** This is the standard reading for 泊まる (to lodge at, to stay)."
      },
      {
        "option": "いき",
        "isCorrect": true,
        "reasoning": "* **いき (2) - INCORRECT:** This is 行く (to go), not 泊まる."
      },
      {
        "option": "かえり",
        "isCorrect": true,
        "reasoning": "* **かえり (3) - INCORRECT:** This is 帰る (to return), not 泊まる."
      },
      {
        "option": "やすみ",
        "isCorrect": true,
        "reasoning": "* **やすみ (4) - INCORRECT:** This is 休む (to rest), not 泊まる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 532,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ぶんぽう",
      "たんご",
      "かんじ",
      "はつおん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ぶんぽう",
        "isCorrect": true,
        "reasoning": "* **ぶんぽう (1) - CORRECT:** This is the standard reading for 文法 (grammar)."
      },
      {
        "option": "たんご",
        "isCorrect": true,
        "reasoning": "* **たんご (2) - INCORRECT:** This is 単語 (vocabulary), not 文法."
      },
      {
        "option": "かんじ",
        "isCorrect": true,
        "reasoning": "* **かんじ (3) - INCORRECT:** This is 漢字 (kanji), not 文法."
      },
      {
        "option": "はつおん",
        "isCorrect": true,
        "reasoning": "* **はつおん (4) - INCORRECT:** This is 発音 (pronunciation), not 文法."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 533,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "さびしい",
      "うれしい",
      "かなしい",
      "たのしい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "さびしい",
        "isCorrect": true,
        "reasoning": "* **さびしい (1) - CORRECT:** This is the standard reading for 寂しい (lonely)."
      },
      {
        "option": "うれしい",
        "isCorrect": true,
        "reasoning": "* **うれしい (2) - INCORRECT:** This is 嬉しい (happy), not 寂しい."
      },
      {
        "option": "かなしい",
        "isCorrect": true,
        "reasoning": "* **かなしい (3) - INCORRECT:** This is 悲しい (sad), not 寂しい."
      },
      {
        "option": "たのしい",
        "isCorrect": true,
        "reasoning": "* **たのしい (4) - INCORRECT:** This is 楽しい (fun), not 寂しい."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 534,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "きょうみ",
      "しゅみ",
      "かんしん",
      "きもち"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "きょうみ",
        "isCorrect": true,
        "reasoning": "* **きょうみ (1) - CORRECT:** This is the standard reading for 興味 (interest)."
      },
      {
        "option": "しゅみ",
        "isCorrect": true,
        "reasoning": "* **しゅみ (2) - INCORRECT:** This is 趣味 (hobby), not 興味."
      },
      {
        "option": "かんしん",
        "isCorrect": true,
        "reasoning": "* **かんしん (3) - INCORRECT:** This is 関心 (concern), not 興味."
      },
      {
        "option": "きもち",
        "isCorrect": true,
        "reasoning": "* **きもち (4) - INCORRECT:** This is 気持ち (feeling), not 興味."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 535,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "こうこう",
      "だいがく",
      "しょうがっこう",
      "ちゅうがっこう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こうこう",
        "isCorrect": true,
        "reasoning": "* **こうこう (1) - CORRECT:** This is the standard reading for 高校 (high school)."
      },
      {
        "option": "だいがく",
        "isCorrect": true,
        "reasoning": "* **だいがく (2) - INCORRECT:** This is 大学 (university), not 高校."
      },
      {
        "option": "しょうがっこう",
        "isCorrect": true,
        "reasoning": "* **しょうがっこう (3) - INCORRECT:** This is 小学校 (elementary school), not 高校."
      },
      {
        "option": "ちゅうがっこう",
        "isCorrect": true,
        "reasoning": "* **ちゅうがっこう (4) - INCORRECT:** This is 中学校 (middle school), not 高校."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 536,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おいわい",
      "おまつり",
      "おれい",
      "おみやげ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おいわい",
        "isCorrect": true,
        "reasoning": "* **おいわい (1) - CORRECT:** This is the standard reading for お祝い (celebration)."
      },
      {
        "option": "おまつり",
        "isCorrect": true,
        "reasoning": "* **おまつり (2) - INCORRECT:** This is お祭り (festival), not お祝い."
      },
      {
        "option": "おれい",
        "isCorrect": true,
        "reasoning": "* **おれい (3) - INCORRECT:** This is お礼 (thanks), not お祝い."
      },
      {
        "option": "おみやげ",
        "isCorrect": true,
        "reasoning": "* **おみやげ (4) - INCORRECT:** This is お土産 (souvenir), not お祝い."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 537,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "びっくり",
      "がっかり",
      "すっきり",
      "ゆっくり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "びっくり",
        "isCorrect": true,
        "reasoning": "* **びっくり (1) - CORRECT:** This is the standard reading for びっくり (to be surprised)."
      },
      {
        "option": "がっかり",
        "isCorrect": true,
        "reasoning": "* **がっかり (2) - INCORRECT:** This means disappointed, not surprised."
      },
      {
        "option": "すっきり",
        "isCorrect": true,
        "reasoning": "* **すっきり (3) - INCORRECT:** This means refreshed/clear, not surprised."
      },
      {
        "option": "ゆっくり",
        "isCorrect": true,
        "reasoning": "* **ゆっくり (4) - INCORRECT:** This means slowly/leisurely, not surprised."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 538,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "けしゴム",
      "えんぴつ",
      "ペン",
      "ものさし"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "けしゴム",
        "isCorrect": true,
        "reasoning": "* **けしゴム (1) - CORRECT:** This is the standard reading for 消しゴム (eraser)."
      },
      {
        "option": "えんぴつ",
        "isCorrect": true,
        "reasoning": "* **えんぴつ (2) - INCORRECT:** This is 鉛筆 (pencil), not 消しゴム."
      },
      {
        "option": "ペン",
        "isCorrect": true,
        "reasoning": "* **ペン (3) - INCORRECT:** This is ペン (pen), not 消しゴム."
      },
      {
        "option": "ものさし",
        "isCorrect": true,
        "reasoning": "* **ものさし (4) - INCORRECT:** This is 物差し (ruler), not 消しゴム."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 539,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "わらい",
      "ないて",
      "おこって",
      "よろこんで"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "わらい",
        "isCorrect": true,
        "reasoning": "* **わらい (1) - CORRECT:** This is the standard reading for 笑う (to laugh, to smile)."
      },
      {
        "option": "ないて",
        "isCorrect": true,
        "reasoning": "* **ないて (2) - INCORRECT:** This is 泣く (to cry), not 笑う."
      },
      {
        "option": "おこって",
        "isCorrect": true,
        "reasoning": "* **おこって (3) - INCORRECT:** This is 怒る (to get angry), not 笑う."
      },
      {
        "option": "よろこんで",
        "isCorrect": true,
        "reasoning": "* **よろこんで (4) - INCORRECT:** This is 喜ぶ (to be happy), not 笑う."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 540,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "アクセサリー",
      "ドレス",
      "くつ",
      "かばん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "アクセサリー",
        "isCorrect": true,
        "reasoning": "* **アクセサリー (1) - CORRECT:** This is the standard reading for アクセサリー (accessory)."
      },
      {
        "option": "ドレス",
        "isCorrect": true,
        "reasoning": "* **ドレス (2) - INCORRECT:** This is ドレス (dress), not アクセサリー."
      },
      {
        "option": "くつ",
        "isCorrect": true,
        "reasoning": "* **くつ (3) - INCORRECT:** This is 靴 (shoes), not アクセサリー."
      },
      {
        "option": "かばん",
        "isCorrect": true,
        "reasoning": "* **かばん (4) - INCORRECT:** This is かばん (bag), not アクセサリー."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 541,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "こしょう",
      "じこ",
      "しゅうり",
      "うんてん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こしょう",
        "isCorrect": true,
        "reasoning": "* **こしょう (1) - CORRECT:** This is the standard reading for 故障 (to break-down)."
      },
      {
        "option": "じこ",
        "isCorrect": true,
        "reasoning": "* **じこ (2) - INCORRECT:** This is 事故 (accident), not 故障."
      },
      {
        "option": "しゅうり",
        "isCorrect": true,
        "reasoning": "* **しゅうり (3) - INCORRECT:** This is 修理 (repair), not 故障."
      },
      {
        "option": "うんてん",
        "isCorrect": true,
        "reasoning": "* **うんてん (4) - INCORRECT:** This is 運転 (driving), not 故障."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 542,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "すいえい",
      "やきゅう",
      "サッカー",
      "テニス"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "すいえい",
        "isCorrect": true,
        "reasoning": "* **すいえい (1) - CORRECT:** This is the standard reading for 水泳 (swimming)."
      },
      {
        "option": "やきゅう",
        "isCorrect": true,
        "reasoning": "* **やきゅう (2) - INCORRECT:** This is 野球 (baseball), not 水泳."
      },
      {
        "option": "サッカー",
        "isCorrect": true,
        "reasoning": "* **サッカー (3) - INCORRECT:** This is サッカー (soccer), not 水泳."
      },
      {
        "option": "テニス",
        "isCorrect": true,
        "reasoning": "* **テニス (4) - INCORRECT:** This is テニス (tennis), not 水泳."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 543,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "じだい",
      "きかん",
      "ねんだい",
      "せいき"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "じだい",
        "isCorrect": true,
        "reasoning": "* **じだい (1) - CORRECT:** This is the standard reading for 時代 (era)."
      },
      {
        "option": "きかん",
        "isCorrect": true,
        "reasoning": "* **きかん (2) - INCORRECT:** This is 期間 (period), not 時代."
      },
      {
        "option": "ねんだい",
        "isCorrect": true,
        "reasoning": "* **ねんだい (3) - INCORRECT:** This is 年代 (decade), not 時代."
      },
      {
        "option": "せいき",
        "isCorrect": true,
        "reasoning": "* **せいき (4) - INCORRECT:** This is 世紀 (century), not 時代."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 544,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おりて",
      "のって",
      "まって",
      "はしって"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おりて",
        "isCorrect": true,
        "reasoning": "* **おりて (1) - CORRECT:** This is the standard reading for 下りる (to get off)."
      },
      {
        "option": "のって",
        "isCorrect": true,
        "reasoning": "* **のって (2) - INCORRECT:** This is 乗る (to get on), not 下りる."
      },
      {
        "option": "まって",
        "isCorrect": true,
        "reasoning": "* **まって (3) - INCORRECT:** This is 待つ (to wait), not 下りる."
      },
      {
        "option": "はしって",
        "isCorrect": true,
        "reasoning": "* **はしって (4) - INCORRECT:** This is 走る (to run), not 下りる."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 545,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "とうとう",
      "すぐに",
      "やっと",
      "もうすぐ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "とうとう",
        "isCorrect": true,
        "reasoning": "* **とうとう (1) - CORRECT:** This is the standard reading for 到頭 (finally, after all)."
      },
      {
        "option": "すぐに",
        "isCorrect": true,
        "reasoning": "* **すぐに (2) - INCORRECT:** This means immediately, not finally."
      },
      {
        "option": "やっと",
        "isCorrect": true,
        "reasoning": "* **やっと (3) - INCORRECT:** This means at last, but not the reading for 到頭."
      },
      {
        "option": "もうすぐ",
        "isCorrect": true,
        "reasoning": "* **もうすぐ (4) - INCORRECT:** This means soon, not finally."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 546,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かよって",
      "いって",
      "あるいて",
      "はしって"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かよって",
        "isCorrect": true,
        "reasoning": "* **かよって (1) - CORRECT:** This is the standard reading for 通う (to commute)."
      },
      {
        "option": "いって",
        "isCorrect": true,
        "reasoning": "* **いって (2) - INCORRECT:** This is 行く (to go), not 通う."
      },
      {
        "option": "あるいて",
        "isCorrect": true,
        "reasoning": "* **あるいて (3) - INCORRECT:** This is 歩く (to walk), not 通う."
      },
      {
        "option": "はしって",
        "isCorrect": true,
        "reasoning": "* **はしって (4) - INCORRECT:** This is 走る (to run), not 通う."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 547,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "きかい",
      "じかん",
      "ばあい",
      "りゆう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "きかい",
        "isCorrect": true,
        "reasoning": "* **きかい (1) - CORRECT:** This is the standard reading for 機会 (opportunity)."
      },
      {
        "option": "じかん",
        "isCorrect": true,
        "reasoning": "* **じかん (2) - INCORRECT:** This is 時間 (time), not 機会."
      },
      {
        "option": "ばあい",
        "isCorrect": true,
        "reasoning": "* **ばあい (3) - INCORRECT:** This is 場合 (case), not 機会."
      },
      {
        "option": "りゆう",
        "isCorrect": true,
        "reasoning": "* **りゆう (4) - INCORRECT:** This is 理由 (reason), not 機会."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 548,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "てら",
      "じんじゃ",
      "きょうかい",
      "びょういん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "てら",
        "isCorrect": true,
        "reasoning": "* **てら (1) - CORRECT:** This is the standard reading for 寺 (temple)."
      },
      {
        "option": "じんじゃ",
        "isCorrect": true,
        "reasoning": "* **じんじゃ (2) - INCORRECT:** This is 神社 (shrine), not 寺."
      },
      {
        "option": "きょうかい",
        "isCorrect": true,
        "reasoning": "* **きょうかい (3) - INCORRECT:** This is 教会 (church), not 寺."
      },
      {
        "option": "びょういん",
        "isCorrect": true,
        "reasoning": "* **びょういん (4) - INCORRECT:** This is 病院 (hospital), not 寺."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 549,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ぜんぜん",
      "ぜったい",
      "たいてい",
      "きっと"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ぜんぜん",
        "isCorrect": true,
        "reasoning": "* **ぜんぜん (1) - CORRECT:** This is the standard reading for 全然 (not entirely)."
      },
      {
        "option": "ぜったい",
        "isCorrect": true,
        "reasoning": "* **ぜったい (2) - INCORRECT:** This is 絶対 (absolutely), not 全然."
      },
      {
        "option": "たいてい",
        "isCorrect": true,
        "reasoning": "* **たいてい (3) - INCORRECT:** This is 大抵 (usually), not 全然."
      },
      {
        "option": "きっと",
        "isCorrect": true,
        "reasoning": "* **きっと (4) - INCORRECT:** This is きっと (surely), not 全然."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 550,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "はっきり",
      "ゆっくり",
      "しっかり",
      "すっきり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "はっきり",
        "isCorrect": true,
        "reasoning": "* **はっきり (1) - CORRECT:** This is the standard reading for はっきり (clearly)."
      },
      {
        "option": "ゆっくり",
        "isCorrect": true,
        "reasoning": "* **ゆっくり (2) - INCORRECT:** This means slowly, not clearly."
      },
      {
        "option": "しっかり",
        "isCorrect": true,
        "reasoning": "* **しっかり (3) - INCORRECT:** This means firmly, not clearly."
      },
      {
        "option": "すっきり",
        "isCorrect": true,
        "reasoning": "* **すっきり (4) - INCORRECT:** This means refreshed, not clearly."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 551,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "やっと",
      "もう",
      "まだ",
      "すぐ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "やっと",
        "isCorrect": true,
        "reasoning": "* **やっと (1) - CORRECT:** This is the standard reading for やっと (at last)."
      },
      {
        "option": "もう",
        "isCorrect": true,
        "reasoning": "* **もう (2) - INCORRECT:** This means already, not at last."
      },
      {
        "option": "まだ",
        "isCorrect": true,
        "reasoning": "* **まだ (3) - INCORRECT:** This means still/yet, not at last."
      },
      {
        "option": "すぐ",
        "isCorrect": true,
        "reasoning": "* **すぐ (4) - INCORRECT:** This means immediately, not at last."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 552,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "こと",
      "もの",
      "ひと",
      "ばしょ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こと",
        "isCorrect": true,
        "reasoning": "* **こと (1) - CORRECT:** This is the standard reading for こと (thing, matter)."
      },
      {
        "option": "もの",
        "isCorrect": true,
        "reasoning": "* **もの (2) - INCORRECT:** This is 物 (physical thing), not こと."
      },
      {
        "option": "ひと",
        "isCorrect": true,
        "reasoning": "* **ひと (3) - INCORRECT:** This is 人 (person), not こと."
      },
      {
        "option": "ばしょ",
        "isCorrect": true,
        "reasoning": "* **ばしょ (4) - INCORRECT:** This is 場所 (place), not こと."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 553,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "コンピュータ",
      "テレビ",
      "でんわ",
      "ラジオ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "コンピュータ",
        "isCorrect": true,
        "reasoning": "* **コンピュータ (1) - CORRECT:** This is the standard reading for コンピュータ (computer)."
      },
      {
        "option": "テレビ",
        "isCorrect": true,
        "reasoning": "* **テレビ (2) - INCORRECT:** This is テレビ (television), not コンピュータ."
      },
      {
        "option": "でんわ",
        "isCorrect": true,
        "reasoning": "* **でんわ (3) - INCORRECT:** This is 電話 (telephone), not コンピュータ."
      },
      {
        "option": "ラジオ",
        "isCorrect": true,
        "reasoning": "* **ラジオ (4) - INCORRECT:** This is ラジオ (radio), not コンピュータ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 554,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "のりかえて",
      "おりて",
      "のって",
      "まって"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "のりかえて",
        "isCorrect": true,
        "reasoning": "* **のりかえて (1) - CORRECT:** This is the standard reading for 乗り換える (to change between buses or trains)."
      },
      {
        "option": "おりて",
        "isCorrect": true,
        "reasoning": "* **おりて (2) - INCORRECT:** This is 下りる (to get off), not 乗り換える."
      },
      {
        "option": "のって",
        "isCorrect": true,
        "reasoning": "* **のって (3) - INCORRECT:** This is 乗る (to get on), not 乗り換える."
      },
      {
        "option": "まって",
        "isCorrect": true,
        "reasoning": "* **まって (4) - INCORRECT:** This is 待つ (to wait), not 乗り換える."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 555,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "あす",
      "きのう",
      "きょう",
      "あさって"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "あす",
        "isCorrect": true,
        "reasoning": "* **あす (1) - CORRECT:** This is the standard reading for 明日 (tomorrow)."
      },
      {
        "option": "きのう",
        "isCorrect": true,
        "reasoning": "* **きのう (2) - INCORRECT:** This is 昨日 (yesterday), not 明日."
      },
      {
        "option": "きょう",
        "isCorrect": true,
        "reasoning": "* **きょう (3) - INCORRECT:** This is 今日 (today), not 明日."
      },
      {
        "option": "あさって",
        "isCorrect": true,
        "reasoning": "* **あさって (4) - INCORRECT:** This is あさって (day after tomorrow), not 明日."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 556,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "あいさつ",
      "しつもん",
      "おれい",
      "おねがい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "あいさつ",
        "isCorrect": true,
        "reasoning": "* **あいさつ (1) - CORRECT:** This is the standard reading for あいさつ (to greet)."
      },
      {
        "option": "しつもん",
        "isCorrect": true,
        "reasoning": "* **しつもん (2) - INCORRECT:** This is 質問 (question), not あいさつ."
      },
      {
        "option": "おれい",
        "isCorrect": true,
        "reasoning": "* **おれい (3) - INCORRECT:** This is お礼 (thanks), not あいさつ."
      },
      {
        "option": "おねがい",
        "isCorrect": true,
        "reasoning": "* **おねがい (4) - INCORRECT:** This is お願い (request), not あいさつ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 557,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "けんか",
      "あそび",
      "べんきょう",
      "はなし"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "けんか",
        "isCorrect": true,
        "reasoning": "* **けんか (1) - CORRECT:** This is the standard reading for 喧嘩 (to quarrel)."
      },
      {
        "option": "あそび",
        "isCorrect": true,
        "reasoning": "* **あそび (2) - INCORRECT:** This is 遊び (play), not 喧嘩."
      },
      {
        "option": "べんきょう",
        "isCorrect": true,
        "reasoning": "* **べんきょう (3) - INCORRECT:** This is 勉強 (study), not 喧嘩."
      },
      {
        "option": "はなし",
        "isCorrect": true,
        "reasoning": "* **はなし (4) - INCORRECT:** This is 話 (talk), not 喧嘩."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 558,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おく",
      "まん",
      "せん",
      "ひゃく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おく",
        "isCorrect": true,
        "reasoning": "* **おく (1) - CORRECT:** This is the standard reading for 億 (one hundred million)."
      },
      {
        "option": "まん",
        "isCorrect": true,
        "reasoning": "* **まん (2) - INCORRECT:** This is 万 (ten thousand), not 億."
      },
      {
        "option": "せん",
        "isCorrect": true,
        "reasoning": "* **せん (3) - INCORRECT:** This is 千 (thousand), not 億."
      },
      {
        "option": "ひゃく",
        "isCorrect": true,
        "reasoning": "* **ひゃく (4) - INCORRECT:** This is 百 (hundred), not 億."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 559,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "エスカレーター",
      "エレベーター",
      "かいだん",
      "ドア"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "エスカレーター",
        "isCorrect": true,
        "reasoning": "* **エスカレーター (1) - CORRECT:** This is the standard reading for エスカレーター (escalator)."
      },
      {
        "option": "エレベーター",
        "isCorrect": true,
        "reasoning": "* **エレベーター (2) - INCORRECT:** This is エレベーター (elevator), not エスカレーター."
      },
      {
        "option": "かいだん",
        "isCorrect": true,
        "reasoning": "* **かいだん (3) - INCORRECT:** This is 階段 (stairs), not エスカレーター."
      },
      {
        "option": "ドア",
        "isCorrect": true,
        "reasoning": "* **ドア (4) - INCORRECT:** This is ドア (door), not エスカレーター."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 560,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "やくそく",
      "よてい",
      "けいかく",
      "きぼう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "やくそく",
        "isCorrect": true,
        "reasoning": "* **やくそく (1) - CORRECT:** This is the standard reading for 約束 (promise)."
      },
      {
        "option": "よてい",
        "isCorrect": true,
        "reasoning": "* **よてい (2) - INCORRECT:** This is 予定 (plan), not 約束."
      },
      {
        "option": "けいかく",
        "isCorrect": true,
        "reasoning": "* **けいかく (3) - INCORRECT:** This is 計画 (plan), not 約束."
      },
      {
        "option": "きぼう",
        "isCorrect": true,
        "reasoning": "* **きぼう (4) - INCORRECT:** This is 希望 (hope), not 約束."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 561,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しょくじ",
      "りょうり",
      "ばんごはん",
      "あさごはん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しょくじ",
        "isCorrect": true,
        "reasoning": "* **しょくじ (1) - CORRECT:** This is the standard reading for 食事 (to have a meal)."
      },
      {
        "option": "りょうり",
        "isCorrect": true,
        "reasoning": "* **りょうり (2) - INCORRECT:** This is 料理 (cooking), not 食事."
      },
      {
        "option": "ばんごはん",
        "isCorrect": true,
        "reasoning": "* **ばんごはん (3) - INCORRECT:** This is 晩ご飯 (dinner), not 食事."
      },
      {
        "option": "あさごはん",
        "isCorrect": true,
        "reasoning": "* **あさごはん (4) - INCORRECT:** This is 朝ご飯 (breakfast), not 食事."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 562,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "せいさん",
      "せいぞう",
      "せいび",
      "しゅうり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "せいさん",
        "isCorrect": true,
        "reasoning": "* **せいさん (1) - CORRECT:** This is the standard reading for 生産 (to produce)."
      },
      {
        "option": "せいぞう",
        "isCorrect": true,
        "reasoning": "* **せいぞう (2) - INCORRECT:** This is 製造 (manufacturing), not 生産."
      },
      {
        "option": "せいび",
        "isCorrect": true,
        "reasoning": "* **せいび (3) - INCORRECT:** This is 整備 (maintenance), not 生産."
      },
      {
        "option": "しゅうり",
        "isCorrect": true,
        "reasoning": "* **しゅうり (4) - INCORRECT:** This is 修理 (repair), not 生産."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 563,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "えだ",
      "は",
      "ね",
      "み"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "えだ",
        "isCorrect": true,
        "reasoning": "* **えだ (1) - CORRECT:** This is the standard reading for 枝 (branch, twig)."
      },
      {
        "option": "は",
        "isCorrect": true,
        "reasoning": "* **は (2) - INCORRECT:** This is 葉 (leaf), not 枝."
      },
      {
        "option": "ね",
        "isCorrect": true,
        "reasoning": "* **ね (3) - INCORRECT:** This is 根 (root), not 枝."
      },
      {
        "option": "み",
        "isCorrect": true,
        "reasoning": "* **み (4) - INCORRECT:** This is 実 (fruit), not 枝."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 564,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "けんきゅう",
      "べんきょう",
      "ちょうさ",
      "じっけん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "けんきゅう",
        "isCorrect": true,
        "reasoning": "* **けんきゅう (1) - CORRECT:** This is the standard reading for 研究 (research)."
      },
      {
        "option": "べんきょう",
        "isCorrect": true,
        "reasoning": "* **べんきょう (2) - INCORRECT:** This is 勉強 (study), not 研究."
      },
      {
        "option": "ちょうさ",
        "isCorrect": true,
        "reasoning": "* **ちょうさ (3) - INCORRECT:** This is 調査 (investigation), not 研究."
      },
      {
        "option": "じっけん",
        "isCorrect": true,
        "reasoning": "* **じっけん (4) - INCORRECT:** This is 実験 (experiment), not 研究."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 565,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おっと",
      "つま",
      "ちち",
      "はは"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おっと",
        "isCorrect": true,
        "reasoning": "* **おっと (1) - CORRECT:** This is the standard reading for 夫 (husband)."
      },
      {
        "option": "つま",
        "isCorrect": true,
        "reasoning": "* **つま (2) - INCORRECT:** This is 妻 (wife), not 夫."
      },
      {
        "option": "ちち",
        "isCorrect": true,
        "reasoning": "* **ちち (3) - INCORRECT:** This is 父 (father), not 夫."
      },
      {
        "option": "はは",
        "isCorrect": true,
        "reasoning": "* **はは (4) - INCORRECT:** This is 母 (mother), not 夫."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 566,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "けいさつ",
      "きゅうきゅうしゃ",
      "しょうぼうしゃ",
      "びょういん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "けいさつ",
        "isCorrect": true,
        "reasoning": "* **けいさつ (1) - CORRECT:** This is the standard reading for 警察 (police)."
      },
      {
        "option": "きゅうきゅうしゃ",
        "isCorrect": true,
        "reasoning": "* **きゅうきゅうしゃ (2) - INCORRECT:** This is 救急車 (ambulance), not 警察."
      },
      {
        "option": "しょうぼうしゃ",
        "isCorrect": true,
        "reasoning": "* **しょうぼうしゃ (3) - INCORRECT:** This is 消防車 (fire truck), not 警察."
      },
      {
        "option": "びょういん",
        "isCorrect": true,
        "reasoning": "* **びょういん (4) - INCORRECT:** This is 病院 (hospital), not 警察."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 567,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "むかし",
      "いま",
      "みらい",
      "さいきん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "むかし",
        "isCorrect": true,
        "reasoning": "* **むかし (1) - CORRECT:** This is the standard reading for 昔 (olden days, former)."
      },
      {
        "option": "いま",
        "isCorrect": true,
        "reasoning": "* **いま (2) - INCORRECT:** This is 今 (now), not 昔."
      },
      {
        "option": "みらい",
        "isCorrect": true,
        "reasoning": "* **みらい (3) - INCORRECT:** This is 未来 (future), not 昔."
      },
      {
        "option": "さいきん",
        "isCorrect": true,
        "reasoning": "* **さいきん (4) - INCORRECT:** This is 最近 (recently), not 昔."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 568,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "いたそう",
      "しよう",
      "かけよう",
      "でんわしよう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "いたそう",
        "isCorrect": true,
        "reasoning": "* **いたそう (1) - CORRECT:** This is the standard reading for 致す (humble form of to do)."
      },
      {
        "option": "しよう",
        "isCorrect": true,
        "reasoning": "* **しよう (2) - INCORRECT:** This is する (to do), not 致す."
      },
      {
        "option": "かけよう",
        "isCorrect": true,
        "reasoning": "* **かけよう (3) - INCORRECT:** This is かける (to make a call), not 致す."
      },
      {
        "option": "でんわしよう",
        "isCorrect": true,
        "reasoning": "* **でんわしよう (4) - INCORRECT:** This is 電話する (to telephone), not 致す."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 569,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "くうこう",
      "えき",
      "みなと",
      "バスてい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "くうこう",
        "isCorrect": true,
        "reasoning": "* **くうこう (1) - CORRECT:** This is the standard reading for 空港 (airport)."
      },
      {
        "option": "えき",
        "isCorrect": true,
        "reasoning": "* **えき (2) - INCORRECT:** This is 駅 (station), not 空港."
      },
      {
        "option": "みなと",
        "isCorrect": true,
        "reasoning": "* **みなと (3) - INCORRECT:** This is 港 (port), not 空港."
      },
      {
        "option": "バスてい",
        "isCorrect": true,
        "reasoning": "* **バスてい (4) - INCORRECT:** This is バス停 (bus stop), not 空港."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 570,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ずいぶん",
      "とても",
      "すこし",
      "あまり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ずいぶん",
        "isCorrect": true,
        "reasoning": "* **ずいぶん (1) - CORRECT:** This is the standard reading for ずいぶん (extremely)."
      },
      {
        "option": "とても",
        "isCorrect": true,
        "reasoning": "* **とても (2) - INCORRECT:** This means very much, but not the reading for ずいぶん."
      },
      {
        "option": "すこし",
        "isCorrect": true,
        "reasoning": "* **すこし (3) - INCORRECT:** This means a little, not extremely."
      },
      {
        "option": "あまり",
        "isCorrect": true,
        "reasoning": "* **あまり (4) - INCORRECT:** This means not very much, not extremely."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 571,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "きぶん",
      "きもち",
      "たいちょう",
      "けんこう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "きぶん",
        "isCorrect": true,
        "reasoning": "* **きぶん (1) - CORRECT:** This is the standard reading for 気分 (mood)."
      },
      {
        "option": "きもち",
        "isCorrect": true,
        "reasoning": "* **きもち (2) - INCORRECT:** This is 気持ち (feeling), not 気分."
      },
      {
        "option": "たいちょう",
        "isCorrect": true,
        "reasoning": "* **たいちょう (3) - INCORRECT:** This is 体調 (physical condition), not 気分."
      },
      {
        "option": "けんこう",
        "isCorrect": true,
        "reasoning": "* **けんこう (4) - INCORRECT:** This is 健康 (health), not 気分."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 572,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "すんだら",
      "おわったら",
      "できたら",
      "やったら"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "すんだら",
        "isCorrect": true,
        "reasoning": "* **すんだら (1) - CORRECT:** This is the standard reading for 済む (to finish)."
      },
      {
        "option": "おわったら",
        "isCorrect": true,
        "reasoning": "* **おわったら (2) - INCORRECT:** This is 終わる (to end), not 済む."
      },
      {
        "option": "できたら",
        "isCorrect": true,
        "reasoning": "* **できたら (3) - INCORRECT:** This is できる (to be able to), not 済む."
      },
      {
        "option": "やったら",
        "isCorrect": true,
        "reasoning": "* **やったら (4) - INCORRECT:** This is やる (to do), not 済む."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 573,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ひつよう",
      "たいせつ",
      "だいじ",
      "べんり"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ひつよう",
        "isCorrect": true,
        "reasoning": "* **ひつよう (1) - CORRECT:** This is the standard reading for 必要 (necessary)."
      },
      {
        "option": "たいせつ",
        "isCorrect": true,
        "reasoning": "* **たいせつ (2) - INCORRECT:** This is 大切 (important), not 必要."
      },
      {
        "option": "だいじ",
        "isCorrect": true,
        "reasoning": "* **だいじ (3) - INCORRECT:** This is 大事 (important), not 必要."
      },
      {
        "option": "べんり",
        "isCorrect": true,
        "reasoning": "* **べんり (4) - INCORRECT:** This is 便利 (convenient), not 必要."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 574,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "まじめ",
      "げんき",
      "しずか",
      "やさしい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "まじめ",
        "isCorrect": true,
        "reasoning": "* **まじめ (1) - CORRECT:** This is the standard reading for まじめ (serious)."
      },
      {
        "option": "げんき",
        "isCorrect": true,
        "reasoning": "* **げんき (2) - INCORRECT:** This is 元気 (energetic), not まじめ."
      },
      {
        "option": "しずか",
        "isCorrect": true,
        "reasoning": "* **しずか (3) - INCORRECT:** This is 静か (quiet), not まじめ."
      },
      {
        "option": "やさしい",
        "isCorrect": true,
        "reasoning": "* **やさしい (4) - INCORRECT:** This is 優しい (kind), not まじめ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 575,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "きゃく",
      "ひと",
      "ともだち",
      "かぞく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "きゃく",
        "isCorrect": true,
        "reasoning": "* **きゃく (1) - CORRECT:** This is the standard reading for 客 (guest, customer)."
      },
      {
        "option": "ひと",
        "isCorrect": true,
        "reasoning": "* **ひと (2) - INCORRECT:** This is 人 (person), not 客."
      },
      {
        "option": "ともだち",
        "isCorrect": true,
        "reasoning": "* **ともだち (3) - INCORRECT:** This is 友だち (friend), not 客."
      },
      {
        "option": "かぞく",
        "isCorrect": true,
        "reasoning": "* **かぞく (4) - INCORRECT:** This is 家族 (family), not 客."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 576,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "うつし",
      "とり",
      "みて",
      "かいて"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "うつし",
        "isCorrect": true,
        "reasoning": "* **うつし (1) - CORRECT:** This is the standard reading for 写す (to copy or photograph)."
      },
      {
        "option": "とり",
        "isCorrect": true,
        "reasoning": "* **とり (2) - INCORRECT:** This is 撮る (to take photos), not 写す."
      },
      {
        "option": "みて",
        "isCorrect": true,
        "reasoning": "* **みて (3) - INCORRECT:** This is 見る (to see), not 写す."
      },
      {
        "option": "かいて",
        "isCorrect": true,
        "reasoning": "* **かいて (4) - INCORRECT:** This is 書く (to write), not 写す."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 577,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しゃかい",
      "せかい",
      "じだい",
      "ばしょ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しゃかい",
        "isCorrect": true,
        "reasoning": "* **しゃかい (1) - CORRECT:** This is the standard reading for 社会 (society, public)."
      },
      {
        "option": "せかい",
        "isCorrect": true,
        "reasoning": "* **せかい (2) - INCORRECT:** This is 世界 (world), not 社会."
      },
      {
        "option": "じだい",
        "isCorrect": true,
        "reasoning": "* **じだい (3) - INCORRECT:** This is 時代 (era), not 社会."
      },
      {
        "option": "ばしょ",
        "isCorrect": true,
        "reasoning": "* **ばしょ (4) - INCORRECT:** This is 場所 (place), not 社会."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 578,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "あかんぼう",
      "こども",
      "おとこのこ",
      "おんなのこ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "あかんぼう",
        "isCorrect": true,
        "reasoning": "* **あかんぼう (1) - CORRECT:** This is the standard reading for 赤ん坊 (baby)."
      },
      {
        "option": "こども",
        "isCorrect": true,
        "reasoning": "* **こども (2) - INCORRECT:** This is 子ども (child), not 赤ん坊."
      },
      {
        "option": "おとこのこ",
        "isCorrect": true,
        "reasoning": "* **おとこのこ (3) - INCORRECT:** This is 男の子 (boy), not 赤ん坊."
      },
      {
        "option": "おんなのこ",
        "isCorrect": true,
        "reasoning": "* **おんなのこ (4) - INCORRECT:** This is 女の子 (girl), not 赤ん坊."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 579,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "そろそろ",
      "もうすぐ",
      "いつも",
      "ときどき"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "そろそろ",
        "isCorrect": true,
        "reasoning": "* **そろそろ (1) - CORRECT:** This is the standard reading for そろそろ (gradually, soon)."
      },
      {
        "option": "もうすぐ",
        "isCorrect": true,
        "reasoning": "* **もうすぐ (2) - INCORRECT:** This means soon, but not the reading for そろそろ."
      },
      {
        "option": "いつも",
        "isCorrect": true,
        "reasoning": "* **いつも (3) - INCORRECT:** This means always, not gradually."
      },
      {
        "option": "ときどき",
        "isCorrect": true,
        "reasoning": "* **ときどき (4) - INCORRECT:** This means sometimes, not gradually."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 580,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "こう",
      "そう",
      "ああ",
      "どう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こう",
        "isCorrect": true,
        "reasoning": "* **こう (1) - CORRECT:** This is the standard reading for 斯う (this way)."
      },
      {
        "option": "そう",
        "isCorrect": true,
        "reasoning": "* **そう (2) - INCORRECT:** This means that way, not this way."
      },
      {
        "option": "ああ",
        "isCorrect": true,
        "reasoning": "* **ああ (3) - INCORRECT:** This means that way (over there), not this way."
      },
      {
        "option": "どう",
        "isCorrect": true,
        "reasoning": "* **どう (4) - INCORRECT:** This means how, not this way."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 581,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ぬって",
      "かいて",
      "はって",
      "つけて"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ぬって",
        "isCorrect": true,
        "reasoning": "* **ぬって (1) - CORRECT:** This is the standard reading for 塗る (to paint, to plaster)."
      },
      {
        "option": "かいて",
        "isCorrect": true,
        "reasoning": "* **かいて (2) - INCORRECT:** This is 書く (to write), not 塗る."
      },
      {
        "option": "はって",
        "isCorrect": true,
        "reasoning": "* **はって (3) - INCORRECT:** This is 貼る (to paste), not 塗る."
      },
      {
        "option": "つけて",
        "isCorrect": true,
        "reasoning": "* **つけて (4) - INCORRECT:** This is 付ける (to attach), not 塗る."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 582,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "けいかく",
      "よてい",
      "じゅんび",
      "りょこう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "けいかく",
        "isCorrect": true,
        "reasoning": "* **けいかく (1) - CORRECT:** This is the standard reading for 計画 (to plan)."
      },
      {
        "option": "よてい",
        "isCorrect": true,
        "reasoning": "* **よてい (2) - INCORRECT:** This is 予定 (schedule), not 計画."
      },
      {
        "option": "じゅんび",
        "isCorrect": true,
        "reasoning": "* **じゅんび (3) - INCORRECT:** This is 準備 (preparation), not 計画."
      },
      {
        "option": "りょこう",
        "isCorrect": true,
        "reasoning": "* **りょこう (4) - INCORRECT:** This is 旅行 (travel), not 計画."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 583,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "たのしみ",
      "うれしい",
      "おもしろい",
      "げんき"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "たのしみ",
        "isCorrect": true,
        "reasoning": "* **たのしみ (1) - CORRECT:** This is the standard reading for 楽しみ (joy)."
      },
      {
        "option": "うれしい",
        "isCorrect": true,
        "reasoning": "* **うれしい (2) - INCORRECT:** This is 嬉しい (happy), not 楽しみ."
      },
      {
        "option": "おもしろい",
        "isCorrect": true,
        "reasoning": "* **おもしろい (3) - INCORRECT:** This is 面白い (interesting), not 楽しみ."
      },
      {
        "option": "げんき",
        "isCorrect": true,
        "reasoning": "* **げんき (4) - INCORRECT:** This is 元気 (energetic), not 楽しみ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 584,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "はいけん",
      "けんがく",
      "かんしょう",
      "けんきゅう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "はいけん",
        "isCorrect": true,
        "reasoning": "* **はいけん (1) - CORRECT:** This is the standard reading for 拝見 (humble: to look at)."
      },
      {
        "option": "けんがく",
        "isCorrect": true,
        "reasoning": "* **けんがく (2) - INCORRECT:** This is 見学 (observation), not 拝見."
      },
      {
        "option": "かんしょう",
        "isCorrect": true,
        "reasoning": "* **かんしょう (3) - INCORRECT:** This is 鑑賞 (appreciation), not 拝見."
      },
      {
        "option": "けんきゅう",
        "isCorrect": true,
        "reasoning": "* **けんきゅう (4) - INCORRECT:** This is 研究 (research), not 拝見."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 585,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ちゅうがっこう",
      "しょうがっこう",
      "こうこう",
      "だいがく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ちゅうがっこう",
        "isCorrect": true,
        "reasoning": "* **ちゅうがっこう (1) - CORRECT:** This is the standard reading for 中学校 (junior high school, middle school)."
      },
      {
        "option": "しょうがっこう",
        "isCorrect": true,
        "reasoning": "* **しょうがっこう (2) - INCORRECT:** This is 小学校 (elementary school), not 中学校."
      },
      {
        "option": "こうこう",
        "isCorrect": true,
        "reasoning": "* **こうこう (3) - INCORRECT:** This is 高校 (high school), not 中学校."
      },
      {
        "option": "だいがく",
        "isCorrect": true,
        "reasoning": "* **だいがく (4) - INCORRECT:** This is 大学 (university), not 中学校."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 586,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "せん",
      "みち",
      "どうろ",
      "ばしょ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "せん",
        "isCorrect": true,
        "reasoning": "* **せん (1) - CORRECT:** This is the standard reading for 線 (line)."
      },
      {
        "option": "みち",
        "isCorrect": true,
        "reasoning": "* **みち (2) - INCORRECT:** This is 道 (road), not 線."
      },
      {
        "option": "どうろ",
        "isCorrect": true,
        "reasoning": "* **どうろ (3) - INCORRECT:** This is 道路 (road), not 線."
      },
      {
        "option": "ばしょ",
        "isCorrect": true,
        "reasoning": "* **ばしょ (4) - INCORRECT:** This is 場所 (place), not 線."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 587,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "せいよう",
      "とうよう",
      "ちゅうごく",
      "かんこく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "せいよう",
        "isCorrect": true,
        "reasoning": "* **せいよう (1) - CORRECT:** This is the standard reading for 西洋 (western countries)."
      },
      {
        "option": "とうよう",
        "isCorrect": true,
        "reasoning": "* **とうよう (2) - INCORRECT:** This is 東洋 (eastern countries), not 西洋."
      },
      {
        "option": "ちゅうごく",
        "isCorrect": true,
        "reasoning": "* **ちゅうごく (3) - INCORRECT:** This is 中国 (China), not 西洋."
      },
      {
        "option": "かんこく",
        "isCorrect": true,
        "reasoning": "* **かんこく (4) - INCORRECT:** This is 韓国 (Korea), not 西洋."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 588,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おつり",
      "おかね",
      "りょうきん",
      "ねだん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おつり",
        "isCorrect": true,
        "reasoning": "* **おつり (1) - CORRECT:** This is the standard reading for おつり (change from purchase, balance)."
      },
      {
        "option": "おかね",
        "isCorrect": true,
        "reasoning": "* **おかね (2) - INCORRECT:** This is お金 (money), not おつり."
      },
      {
        "option": "りょうきん",
        "isCorrect": true,
        "reasoning": "* **りょうきん (3) - INCORRECT:** This is 料金 (fee), not おつり."
      },
      {
        "option": "ねだん",
        "isCorrect": true,
        "reasoning": "* **ねだん (4) - INCORRECT:** This is 値段 (price), not おつり."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 589,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "りょうほう",
      "ふたつ",
      "みんな",
      "すべて"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "りょうほう",
        "isCorrect": true,
        "reasoning": "* **りょうほう (1) - CORRECT:** This is the standard reading for 両方 (both sides)."
      },
      {
        "option": "ふたつ",
        "isCorrect": true,
        "reasoning": "* **ふたつ (2) - INCORRECT:** This is 二つ (two things), not 両方."
      },
      {
        "option": "みんな",
        "isCorrect": true,
        "reasoning": "* **みんな (3) - INCORRECT:** This means everyone/everything, not both sides."
      },
      {
        "option": "すべて",
        "isCorrect": true,
        "reasoning": "* **すべて (4) - INCORRECT:** This means all/everything, not both sides."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 590,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "うそ",
      "ひみつ",
      "わるいこと",
      "まちがい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "うそ",
        "isCorrect": true,
        "reasoning": "* **うそ (1) - CORRECT:** This is the standard reading for 嘘 (a lie)."
      },
      {
        "option": "ひみつ",
        "isCorrect": true,
        "reasoning": "* **ひみつ (2) - INCORRECT:** This is 秘密 (secret), not 嘘."
      },
      {
        "option": "わるいこと",
        "isCorrect": true,
        "reasoning": "* **わるいこと (3) - INCORRECT:** This is 悪いこと (bad thing), not 嘘."
      },
      {
        "option": "まちがい",
        "isCorrect": true,
        "reasoning": "* **まちがい (4) - INCORRECT:** This is 間違い (mistake), not 嘘."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 591,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "すっと",
      "ゆっくり",
      "はやく",
      "しずかに"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "すっと",
        "isCorrect": true,
        "reasoning": "* **すっと (1) - CORRECT:** This is the standard reading for すっと (straight, all of a sudden)."
      },
      {
        "option": "ゆっくり",
        "isCorrect": true,
        "reasoning": "* **ゆっくり (2) - INCORRECT:** This means slowly, not straight/suddenly."
      },
      {
        "option": "はやく",
        "isCorrect": true,
        "reasoning": "* **はやく (3) - INCORRECT:** This means quickly, not straight/suddenly."
      },
      {
        "option": "しずかに",
        "isCorrect": true,
        "reasoning": "* **しずかに (4) - INCORRECT:** This means quietly, not straight/suddenly."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 592,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かたく",
      "おもく",
      "あつく",
      "つめたく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かたく",
        "isCorrect": true,
        "reasoning": "* **かたく (1) - CORRECT:** This is the standard reading for 堅い (hard)."
      },
      {
        "option": "おもく",
        "isCorrect": true,
        "reasoning": "* **おもく (2) - INCORRECT:** This is 重い (heavy), not 堅い."
      },
      {
        "option": "あつく",
        "isCorrect": true,
        "reasoning": "* **あつく (3) - INCORRECT:** This is 熱い (hot), not 堅い."
      },
      {
        "option": "つめたく",
        "isCorrect": true,
        "reasoning": "* **つめたく (4) - INCORRECT:** This is 冷たい (cold), not 堅い."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 593,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "せいじ",
      "けいざい",
      "しゃかい",
      "れきし"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "せいじ",
        "isCorrect": true,
        "reasoning": "* **せいじ (1) - CORRECT:** This is the standard reading for 政治 (politics, government)."
      },
      {
        "option": "けいざい",
        "isCorrect": true,
        "reasoning": "* **けいざい (2) - INCORRECT:** This is 経済 (economy), not 政治."
      },
      {
        "option": "しゃかい",
        "isCorrect": true,
        "reasoning": "* **しゃかい (3) - INCORRECT:** This is 社会 (society), not 政治."
      },
      {
        "option": "れきし",
        "isCorrect": true,
        "reasoning": "* **れきし (4) - INCORRECT:** This is 歴史 (history), not 政治."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 594,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "さらいしゅう",
      "らいしゅう",
      "こんしゅう",
      "せんしゅう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "さらいしゅう",
        "isCorrect": true,
        "reasoning": "* **さらいしゅう (1) - CORRECT:** This is the standard reading for さ来週 (the week after next)."
      },
      {
        "option": "らいしゅう",
        "isCorrect": true,
        "reasoning": "* **らいしゅう (2) - INCORRECT:** This is 来週 (next week), not さ来週."
      },
      {
        "option": "こんしゅう",
        "isCorrect": true,
        "reasoning": "* **こんしゅう (3) - INCORRECT:** This is 今週 (this week), not さ来週."
      },
      {
        "option": "せんしゅう",
        "isCorrect": true,
        "reasoning": "* **せんしゅう (4) - INCORRECT:** This is 先週 (last week), not さ来週."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 595,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ケーキ",
      "パン",
      "クッキー",
      "アイス"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ケーキ",
        "isCorrect": true,
        "reasoning": "* **ケーキ (1) - CORRECT:** This is the standard reading for ケーキ (cake)."
      },
      {
        "option": "パン",
        "isCorrect": true,
        "reasoning": "* **パン (2) - INCORRECT:** This means bread, not cake."
      },
      {
        "option": "クッキー",
        "isCorrect": true,
        "reasoning": "* **クッキー (3) - INCORRECT:** This means cookie, not cake."
      },
      {
        "option": "アイス",
        "isCorrect": true,
        "reasoning": "* **アイス (4) - INCORRECT:** This means ice cream, not cake."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 596,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "わけ",
      "りゆう",
      "もくてき",
      "けっか"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "わけ",
        "isCorrect": true,
        "reasoning": "* **わけ (1) - CORRECT:** This is the standard reading for 訳 (meaning, reason)."
      },
      {
        "option": "りゆう",
        "isCorrect": true,
        "reasoning": "* **りゆう (2) - INCORRECT:** This is 理由 (reason), not 訳."
      },
      {
        "option": "もくてき",
        "isCorrect": true,
        "reasoning": "* **もくてき (3) - INCORRECT:** This is 目的 (purpose), not 訳."
      },
      {
        "option": "けっか",
        "isCorrect": true,
        "reasoning": "* **けっか (4) - INCORRECT:** This is 結果 (result), not 訳."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 597,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "こうがい",
      "ちゅうしん",
      "きたく",
      "みなみ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こうがい",
        "isCorrect": true,
        "reasoning": "* **こうがい (1) - CORRECT:** This is the standard reading for 郊外 (outskirts)."
      },
      {
        "option": "ちゅうしん",
        "isCorrect": true,
        "reasoning": "* **ちゅうしん (2) - INCORRECT:** This is 中心 (center), not 郊外."
      },
      {
        "option": "きたく",
        "isCorrect": true,
        "reasoning": "* **きたく (3) - INCORRECT:** This is 帰宅 (returning home), not 郊外."
      },
      {
        "option": "みなみ",
        "isCorrect": true,
        "reasoning": "* **みなみ (4) - INCORRECT:** This is 南 (south), not 郊外."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 598,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "サンダル",
      "くつした",
      "くつ",
      "スニーカー"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "サンダル",
        "isCorrect": true,
        "reasoning": "* **サンダル (1) - CORRECT:** This is the standard reading for サンダル (sandal)."
      },
      {
        "option": "くつした",
        "isCorrect": true,
        "reasoning": "* **くつした (2) - INCORRECT:** This is 靴下 (socks), not サンダル."
      },
      {
        "option": "くつ",
        "isCorrect": true,
        "reasoning": "* **くつ (3) - INCORRECT:** This is 靴 (shoes), not サンダル."
      },
      {
        "option": "スニーカー",
        "isCorrect": true,
        "reasoning": "* **スニーカー (4) - INCORRECT:** This means sneakers, not サンダル."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 599,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "よてい",
      "けいかく",
      "じかん",
      "やくそく"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "よてい",
        "isCorrect": true,
        "reasoning": "* **よてい (1) - CORRECT:** This is the standard reading for 予定 (arrangement)."
      },
      {
        "option": "けいかく",
        "isCorrect": true,
        "reasoning": "* **けいかく (2) - INCORRECT:** This is 計画 (plan), not 予定."
      },
      {
        "option": "じかん",
        "isCorrect": true,
        "reasoning": "* **じかん (3) - INCORRECT:** This is 時間 (time), not 予定."
      },
      {
        "option": "やくそく",
        "isCorrect": true,
        "reasoning": "* **やくそく (4) - INCORRECT:** This is 約束 (promise), not 予定."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 600,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "せき",
      "ばしょ",
      "いす",
      "へや"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "せき",
        "isCorrect": true,
        "reasoning": "* **せき (1) - CORRECT:** This is the standard reading for 席 (seat)."
      },
      {
        "option": "ばしょ",
        "isCorrect": true,
        "reasoning": "* **ばしょ (2) - INCORRECT:** This is 場所 (place), not 席."
      },
      {
        "option": "いす",
        "isCorrect": true,
        "reasoning": "* **いす (3) - INCORRECT:** This is 椅子 (chair), not 席."
      },
      {
        "option": "へや",
        "isCorrect": true,
        "reasoning": "* **へや (4) - INCORRECT:** This is 部屋 (room), not 席."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 601,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "もうし",
      "いい",
      "よび",
      "なまえ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "もうし",
        "isCorrect": true,
        "reasoning": "* **もうし (1) - CORRECT:** This is the standard reading for 申す (humble: to be called, to say)."
      },
      {
        "option": "いい",
        "isCorrect": true,
        "reasoning": "* **いい (2) - INCORRECT:** This is 言う (to say), not 申す."
      },
      {
        "option": "よび",
        "isCorrect": true,
        "reasoning": "* **よび (3) - INCORRECT:** This is 呼ぶ (to call), not 申す."
      },
      {
        "option": "なまえ",
        "isCorrect": true,
        "reasoning": "* **なまえ (4) - INCORRECT:** This is 名前 (name), not 申す."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 602,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ほし",
      "つき",
      "たいよう",
      "くも"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ほし",
        "isCorrect": true,
        "reasoning": "* **ほし (1) - CORRECT:** This is the standard reading for 星 (star)."
      },
      {
        "option": "つき",
        "isCorrect": true,
        "reasoning": "* **つき (2) - INCORRECT:** This is 月 (moon), not 星."
      },
      {
        "option": "たいよう",
        "isCorrect": true,
        "reasoning": "* **たいよう (3) - INCORRECT:** This is 太陽 (sun), not 星."
      },
      {
        "option": "くも",
        "isCorrect": true,
        "reasoning": "* **くも (4) - INCORRECT:** This is 雲 (cloud), not 星."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 603,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "なるべく",
      "できるだけ",
      "いつも",
      "ときどき"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "なるべく",
        "isCorrect": true,
        "reasoning": "* **なるべく (1) - CORRECT:** This is the standard reading for なるべく (as much as possible)."
      },
      {
        "option": "できるだけ",
        "isCorrect": true,
        "reasoning": "* **できるだけ (2) - INCORRECT:** This means as much as possible, but not the reading for なるべく."
      },
      {
        "option": "いつも",
        "isCorrect": true,
        "reasoning": "* **いつも (3) - INCORRECT:** This means always, not as much as possible."
      },
      {
        "option": "ときどき",
        "isCorrect": true,
        "reasoning": "* **ときどき (4) - INCORRECT:** This means sometimes, not as much as possible."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 604,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ふくしゅう",
      "よしゅう",
      "べんきょう",
      "れんしゅう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ふくしゅう",
        "isCorrect": true,
        "reasoning": "* **ふくしゅう (1) - CORRECT:** This is the standard reading for 復習 (revision)."
      },
      {
        "option": "よしゅう",
        "isCorrect": true,
        "reasoning": "* **よしゅう (2) - INCORRECT:** This is 予習 (preparation), not 復習."
      },
      {
        "option": "べんきょう",
        "isCorrect": true,
        "reasoning": "* **べんきょう (3) - INCORRECT:** This is 勉強 (study), not 復習."
      },
      {
        "option": "れんしゅう",
        "isCorrect": true,
        "reasoning": "* **れんしゅう (4) - INCORRECT:** This is 練習 (practice), not 復習."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 605,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "るす",
      "りょこう",
      "しごと",
      "がっこう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "るす",
        "isCorrect": true,
        "reasoning": "* **るす (1) - CORRECT:** This is the standard reading for 留守 (absence)."
      },
      {
        "option": "りょこう",
        "isCorrect": true,
        "reasoning": "* **りょこう (2) - INCORRECT:** This is 旅行 (travel), not 留守."
      },
      {
        "option": "しごと",
        "isCorrect": true,
        "reasoning": "* **しごと (3) - INCORRECT:** This is 仕事 (work), not 留守."
      },
      {
        "option": "がっこう",
        "isCorrect": true,
        "reasoning": "* **がっこう (4) - INCORRECT:** This is 学校 (school), not 留守."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 606,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "りゆう",
      "わけ",
      "げんいん",
      "もくてき"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "りゆう",
        "isCorrect": true,
        "reasoning": "* **りゆう (1) - CORRECT:** This is the standard reading for 理由 (reason)."
      },
      {
        "option": "わけ",
        "isCorrect": true,
        "reasoning": "* **わけ (2) - INCORRECT:** This is 訳 (reason), not 理由."
      },
      {
        "option": "げんいん",
        "isCorrect": true,
        "reasoning": "* **げんいん (3) - INCORRECT:** This is 原因 (cause), not 理由."
      },
      {
        "option": "もくてき",
        "isCorrect": true,
        "reasoning": "* **もくてき (4) - INCORRECT:** This is 目的 (purpose), not 理由."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 607,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "こんど",
      "こんかい",
      "つぎ",
      "いま"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "こんど",
        "isCorrect": true,
        "reasoning": "* **こんど (1) - CORRECT:** This is the standard reading for 今度 (now, next time)."
      },
      {
        "option": "こんかい",
        "isCorrect": true,
        "reasoning": "* **こんかい (2) - INCORRECT:** This is 今回 (this time), not 今度."
      },
      {
        "option": "つぎ",
        "isCorrect": true,
        "reasoning": "* **つぎ (3) - INCORRECT:** This is 次 (next), not 今度."
      },
      {
        "option": "いま",
        "isCorrect": true,
        "reasoning": "* **いま (4) - INCORRECT:** This is 今 (now), not 今度."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 608,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "アナウンサー",
      "きしゃ",
      "せんせい",
      "いしゃ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "アナウンサー",
        "isCorrect": true,
        "reasoning": "* **アナウンサー (1) - CORRECT:** This is the standard reading for アナウンサー (announcer)."
      },
      {
        "option": "きしゃ",
        "isCorrect": true,
        "reasoning": "* **きしゃ (2) - INCORRECT:** This is 記者 (reporter), not アナウンサー."
      },
      {
        "option": "せんせい",
        "isCorrect": true,
        "reasoning": "* **せんせい (3) - INCORRECT:** This is 先生 (teacher), not アナウンサー."
      },
      {
        "option": "いしゃ",
        "isCorrect": true,
        "reasoning": "* **いしゃ (4) - INCORRECT:** This is 医者 (doctor), not アナウンサー."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 609,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ガソリンスタンド",
      "しゅうりこうじょう",
      "ちゅうしゃじょう",
      "こうじょう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ガソリンスタンド",
        "isCorrect": true,
        "reasoning": "* **ガソリンスタンド (1) - CORRECT:** This is the standard reading for ガソリンスタンド (petrol station)."
      },
      {
        "option": "しゅうりこうじょう",
        "isCorrect": true,
        "reasoning": "* **しゅうりこうじょう (2) - INCORRECT:** This is 修理工場 (repair shop), not ガソリンスタンド."
      },
      {
        "option": "ちゅうしゃじょう",
        "isCorrect": true,
        "reasoning": "* **ちゅうしゃじょう (3) - INCORRECT:** This is 駐車場 (parking lot), not ガソリンスタンド."
      },
      {
        "option": "こうじょう",
        "isCorrect": true,
        "reasoning": "* **こうじょう (4) - INCORRECT:** This is 工場 (factory), not ガソリンスタンド."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 610,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かならず",
      "ぜったい",
      "きっと",
      "たぶん"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かならず",
        "isCorrect": true,
        "reasoning": "* **かならず (1) - CORRECT:** This is the standard reading for 必ず (certainly, necessarily)."
      },
      {
        "option": "ぜったい",
        "isCorrect": true,
        "reasoning": "* **ぜったい (2) - INCORRECT:** This is 絶対 (absolute), not 必ず."
      },
      {
        "option": "きっと",
        "isCorrect": true,
        "reasoning": "* **きっと (3) - INCORRECT:** This means surely, but not the reading for 必ず."
      },
      {
        "option": "たぶん",
        "isCorrect": true,
        "reasoning": "* **たぶん (4) - INCORRECT:** This means probably, not certainly."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 611,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "しょうかい",
      "あんない",
      "せつめい",
      "おしえて"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "しょうかい",
        "isCorrect": true,
        "reasoning": "* **しょうかい (1) - CORRECT:** This is the standard reading for 紹介 (introduction)."
      },
      {
        "option": "あんない",
        "isCorrect": true,
        "reasoning": "* **あんない (2) - INCORRECT:** This is 案内 (guidance), not 紹介."
      },
      {
        "option": "せつめい",
        "isCorrect": true,
        "reasoning": "* **せつめい (3) - INCORRECT:** This is 説明 (explanation), not 紹介."
      },
      {
        "option": "おしえて",
        "isCorrect": true,
        "reasoning": "* **おしえて (4) - INCORRECT:** This is 教える (to teach), not 紹介."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 612,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おもい",
      "かんがえ",
      "しんじ",
      "きぼう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おもい",
        "isCorrect": true,
        "reasoning": "* **おもい (1) - CORRECT:** This is the standard reading for 思う (to think, to feel)."
      },
      {
        "option": "かんがえ",
        "isCorrect": true,
        "reasoning": "* **かんがえ (2) - INCORRECT:** This is 考える (to consider), not 思う."
      },
      {
        "option": "しんじ",
        "isCorrect": true,
        "reasoning": "* **しんじ (3) - INCORRECT:** This is 信じる (to believe), not 思う."
      },
      {
        "option": "きぼう",
        "isCorrect": true,
        "reasoning": "* **きぼう (4) - INCORRECT:** This is 希望 (hope), not 思う."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 613,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "ひかって",
      "てらして",
      "かがやいて",
      "うつって"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "ひかって",
        "isCorrect": true,
        "reasoning": "* **ひかって (1) - CORRECT:** This is the standard reading for 光る (to shine, to glitter)."
      },
      {
        "option": "てらして",
        "isCorrect": true,
        "reasoning": "* **てらして (2) - INCORRECT:** This is 照らす (to illuminate), not 光る."
      },
      {
        "option": "かがやいて",
        "isCorrect": true,
        "reasoning": "* **かがやいて (3) - INCORRECT:** This is 輝く (to shine brightly), not 光る."
      },
      {
        "option": "うつって",
        "isCorrect": true,
        "reasoning": "* **うつって (4) - INCORRECT:** This is 映る (to be reflected), not 光る."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 614,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "てつだって",
      "つくって",
      "じゅんび",
      "かたづけて"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "てつだって",
        "isCorrect": true,
        "reasoning": "* **てつだって (1) - CORRECT:** This is the standard reading for 手伝う (to assist)."
      },
      {
        "option": "つくって",
        "isCorrect": true,
        "reasoning": "* **つくって (2) - INCORRECT:** This is 作る (to make), not 手伝う."
      },
      {
        "option": "じゅんび",
        "isCorrect": true,
        "reasoning": "* **じゅんび (3) - INCORRECT:** This is 準備 (preparation), not 手伝う."
      },
      {
        "option": "かたづけて",
        "isCorrect": true,
        "reasoning": "* **かたづけて (4) - INCORRECT:** This is 片付ける (to clean up), not 手伝う."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 615,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "け",
      "かみ",
      "ひげ",
      "しっぽ"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "け",
        "isCorrect": true,
        "reasoning": "* **け (1) - CORRECT:** This is the standard reading for 毛 (hair or fur)."
      },
      {
        "option": "かみ",
        "isCorrect": true,
        "reasoning": "* **かみ (2) - INCORRECT:** This is 髪 (hair on head), not 毛."
      },
      {
        "option": "ひげ",
        "isCorrect": true,
        "reasoning": "* **ひげ (3) - INCORRECT:** This is ひげ (beard/whiskers), not 毛."
      },
      {
        "option": "しっぽ",
        "isCorrect": true,
        "reasoning": "* **しっぽ (4) - INCORRECT:** This is 尻尾 (tail), not 毛."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 616,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "オートバイ",
      "じてんしゃ",
      "でんしゃ",
      "バス"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "オートバイ",
        "isCorrect": true,
        "reasoning": "* **オートバイ (1) - CORRECT:** This is the standard reading for オートバイ (motorcycle)."
      },
      {
        "option": "じてんしゃ",
        "isCorrect": true,
        "reasoning": "* **じてんしゃ (2) - INCORRECT:** This is 自転車 (bicycle), not オートバイ."
      },
      {
        "option": "でんしゃ",
        "isCorrect": true,
        "reasoning": "* **でんしゃ (3) - INCORRECT:** This is 電車 (train), not オートバイ."
      },
      {
        "option": "バス",
        "isCorrect": true,
        "reasoning": "* **バス (4) - INCORRECT:** This is バス (bus), not オートバイ."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 617,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "とくべつ",
      "たいせつ",
      "べんり",
      "ゆうめい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "とくべつ",
        "isCorrect": true,
        "reasoning": "* **とくべつ (1) - CORRECT:** This is the standard reading for 特別 (special)."
      },
      {
        "option": "たいせつ",
        "isCorrect": true,
        "reasoning": "* **たいせつ (2) - INCORRECT:** This is 大切 (important), not 特別."
      },
      {
        "option": "べんり",
        "isCorrect": true,
        "reasoning": "* **べんり (3) - INCORRECT:** This is 便利 (convenient), not 特別."
      },
      {
        "option": "ゆうめい",
        "isCorrect": true,
        "reasoning": "* **ゆうめい (4) - INCORRECT:** This is 有名 (famous), not 特別."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 618,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かんがえて",
      "おもって",
      "しらべて",
      "べんきょうして"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かんがえて",
        "isCorrect": true,
        "reasoning": "* **かんがえて (1) - CORRECT:** This is the standard reading for 考える (to consider)."
      },
      {
        "option": "おもって",
        "isCorrect": true,
        "reasoning": "* **おもって (2) - INCORRECT:** This is 思う (to think), not 考える."
      },
      {
        "option": "しらべて",
        "isCorrect": true,
        "reasoning": "* **しらべて (3) - INCORRECT:** This is 調べる (to investigate), not 考える."
      },
      {
        "option": "べんきょうして",
        "isCorrect": true,
        "reasoning": "* **べんきょうして (4) - INCORRECT:** This is 勉強する (to study), not 考える."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 619,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "そつぎょう",
      "にゅうがく",
      "しゅうりょう",
      "かんせい"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "そつぎょう",
        "isCorrect": true,
        "reasoning": "* **そつぎょう (1) - CORRECT:** This is the standard reading for 卒業 (graduation)."
      },
      {
        "option": "にゅうがく",
        "isCorrect": true,
        "reasoning": "* **にゅうがく (2) - INCORRECT:** This is 入学 (entrance), not 卒業."
      },
      {
        "option": "しゅうりょう",
        "isCorrect": true,
        "reasoning": "* **しゅうりょう (3) - INCORRECT:** This is 終了 (completion), not 卒業."
      },
      {
        "option": "かんせい",
        "isCorrect": true,
        "reasoning": "* **かんせい (4) - INCORRECT:** This is 完成 (completion), not 卒業."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 620,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "かいじょう",
      "げきじょう",
      "たいいくかん",
      "こうどう"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "かいじょう",
        "isCorrect": true,
        "reasoning": "* **かいじょう (1) - CORRECT:** This is the standard reading for 会場 (assembly hall or meeting place)."
      },
      {
        "option": "げきじょう",
        "isCorrect": true,
        "reasoning": "* **げきじょう (2) - INCORRECT:** This is 劇場 (theater), not 会場."
      },
      {
        "option": "たいいくかん",
        "isCorrect": true,
        "reasoning": "* **たいいくかん (3) - INCORRECT:** This is 体育館 (gymnasium), not 会場."
      },
      {
        "option": "こうどう",
        "isCorrect": true,
        "reasoning": "* **こうどう (4) - INCORRECT:** This is 講堂 (auditorium), not 会場."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 621,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "むすめ",
      "むすこ",
      "こども",
      "あね"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "むすめ",
        "isCorrect": true,
        "reasoning": "* **むすめ (1) - CORRECT:** This is the standard reading for 娘 (humble: daughter)."
      },
      {
        "option": "むすこ",
        "isCorrect": true,
        "reasoning": "* **むすこ (2) - INCORRECT:** This is 息子 (son), not 娘."
      },
      {
        "option": "こども",
        "isCorrect": true,
        "reasoning": "* **こども (3) - INCORRECT:** This is 子ども (child), not 娘."
      },
      {
        "option": "あね",
        "isCorrect": true,
        "reasoning": "* **あね (4) - INCORRECT:** This is 姉 (older sister), not 娘."
      }
    ],
    "englishTranslation": "N4"
  },
  {
    "id": 622,
    "kanji": "Word Verification:",
    "sentence": "**Word Verification:**",
    "options": [
      "おとして",
      "なくして",
      "わすれて",
      "こわして"
    ],
    "correctAnswer": 0,
    "explanations": [
      {
        "option": "おとして",
        "isCorrect": true,
        "reasoning": "* **おとして (1) - CORRECT:** This is the standard reading for 落す (to drop)."
      },
      {
        "option": "なくして",
        "isCorrect": true,
        "reasoning": "* **なくして (2) - INCORRECT:** This is 無くす (to lose), not 落す."
      },
      {
        "option": "わすれて",
        "isCorrect": true,
        "reasoning": "* **わすれて (3) - INCORRECT:** This is 忘れる (to forget), not 落す."
      },
      {
        "option": "こわして",
        "isCorrect": true,
        "reasoning": "* **こわして (4) - INCORRECT:** This is 壊す (to break), not 落す."
      }
    ],
    "englishTranslation": "N4"
  }
];

export default n4KanjiQuestions;
