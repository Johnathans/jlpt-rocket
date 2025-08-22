// N5 Kanji Reading Test Data
// Generated from n5_kanji_questions.md
// Total questions: 185

export interface KanjiTestQuestion {
  id: number;
  sentence: string;
  englishTranslation: string;
  underlinedKanji: string;
  kanjiPosition: number;
  options: string[];
  correctAnswer: number;
  type: 'multiple-choice' | 'fill-in-blank';
  csvEntry: string;
  explanations: {
    option: string;
    isCorrect: boolean;
    reasoning: string;
  }[];
  verification: boolean;
}

export const n5KanjiReadingQuestions: KanjiTestQuestion[] = [
  {
    "id": 1,
    "sentence": "十こかいました。",
    "englishTranslation": "I bought ten.",
    "underlinedKanji": "十",
    "kanjiPosition": 0,
    "options": [
      "とお",
      "じゅう",
      "と",
      "じゅ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "十 (とお) - Ten",
    "explanations": [
      {
        "option": "とお",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 十 when counting objects"
      },
      {
        "option": "じゅう",
        "isCorrect": false,
        "reasoning": "While this is an on-yomi for 十, とお is used for counting"
      },
      {
        "option": "と",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 十"
      },
      {
        "option": "じゅ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 十"
      }
    ],
    "verification": true
  },
  {
    "id": 2,
    "sentence": "わたしの弟はがくせいです。",
    "englishTranslation": "My younger brother is a student.",
    "underlinedKanji": "弟",
    "kanjiPosition": 4,
    "options": [
      "おとうと",
      "てい",
      "だい",
      "おとと"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "弟 (おとうと) - younger brother",
    "explanations": [
      {
        "option": "おとうと",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 弟, meaning \"younger brother\""
      },
      {
        "option": "てい",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not the standard reading for brother"
      },
      {
        "option": "だい",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not the standard reading for brother"
      },
      {
        "option": "おとと",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 弟"
      }
    ],
    "verification": true
  },
  {
    "id": 3,
    "sentence": "朝はやくおきました。",
    "englishTranslation": "I woke up early in the morning.",
    "underlinedKanji": "朝",
    "kanjiPosition": 0,
    "options": [
      "あさ",
      "ちょう",
      "あそ",
      "ちょ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "朝 (あさ) - morning",
    "explanations": [
      {
        "option": "あさ",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 朝, meaning \"morning\""
      },
      {
        "option": "ちょう",
        "isCorrect": false,
        "reasoning": "While this is an on-yomi for 朝, あさ is the standard reading"
      },
      {
        "option": "あそ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 朝"
      },
      {
        "option": "ちょ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 朝"
      }
    ],
    "verification": true
  },
  {
    "id": 4,
    "sentence": "大丈夫ですか。",
    "englishTranslation": "Are you all right?",
    "underlinedKanji": "大丈夫",
    "kanjiPosition": 0,
    "options": [
      "だいじょうぶ",
      "おおじょうぶ",
      "たいじょうぶ",
      "だいじょふ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "大丈夫 (だいじょうぶ) - all right",
    "explanations": [
      {
        "option": "だいじょうぶ",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 大丈夫, meaning \"all right/okay\""
      },
      {
        "option": "おおじょうぶ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 大丈夫"
      },
      {
        "option": "たいじょうぶ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 大丈夫"
      },
      {
        "option": "だいじょふ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 大丈夫"
      }
    ],
    "verification": true
  },
  {
    "id": 5,
    "sentence": "ほんを返すました。",
    "englishTranslation": "I returned the book.",
    "underlinedKanji": "返す",
    "kanjiPosition": 3,
    "options": [
      "かえす",
      "へん",
      "がえす",
      "もどす"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "返す (かえす) - to return something",
    "explanations": [
      {
        "option": "かえす",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 返す, meaning \"to return (something)\""
      },
      {
        "option": "へん",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not used for the verb 返す"
      },
      {
        "option": "がえす",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 返す"
      },
      {
        "option": "もどす",
        "isCorrect": false,
        "reasoning": "This means \"to put back\" but not the reading for 返す"
      }
    ],
    "verification": true
  },
  {
    "id": 6,
    "sentence": "多分あめがふるでしょう。",
    "englishTranslation": "It will probably rain.",
    "underlinedKanji": "多分",
    "kanjiPosition": 0,
    "options": [
      "たぶん",
      "おおぶん",
      "たふん",
      "おおふん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "多分 (たぶん) - probably",
    "explanations": [
      {
        "option": "たぶん",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 多分, meaning \"probably\""
      },
      {
        "option": "おおぶん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 多分"
      },
      {
        "option": "たふん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 多分"
      },
      {
        "option": "おおふん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 多分"
      }
    ],
    "verification": true
  },
  {
    "id": 7,
    "sentence": "あたらしいくるまが欲しいです。",
    "englishTranslation": "I want a new car.",
    "underlinedKanji": "欲しい",
    "kanjiPosition": 9,
    "options": [
      "ほしい",
      "よくしい",
      "ほちい",
      "ぼしい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "欲しい (ほしい) - want",
    "explanations": [
      {
        "option": "ほしい",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 欲しい, meaning \"want\""
      },
      {
        "option": "よくしい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 欲しい"
      },
      {
        "option": "ほちい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 欲しい"
      },
      {
        "option": "ぼしい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 欲しい"
      }
    ],
    "verification": true
  },
  {
    "id": 8,
    "sentence": "春にはながさきます。",
    "englishTranslation": "Flowers bloom in spring.",
    "underlinedKanji": "春",
    "kanjiPosition": 0,
    "options": [
      "はる",
      "しゅん",
      "はら",
      "しゅ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "春 (はる) - spring",
    "explanations": [
      {
        "option": "はる",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 春, meaning \"spring\""
      },
      {
        "option": "しゅん",
        "isCorrect": false,
        "reasoning": "While this is an on-yomi for 春, はる is the standard reading"
      },
      {
        "option": "はら",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 春"
      },
      {
        "option": "しゅ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 春"
      }
    ],
    "verification": true
  },
  {
    "id": 9,
    "sentence": "きれいなうたを歌うました。",
    "englishTranslation": "I sang a beautiful song.",
    "underlinedKanji": "歌う",
    "kanjiPosition": 7,
    "options": [
      "うたう",
      "か",
      "うだう",
      "がう"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "歌う (うたう) - to sing",
    "explanations": [
      {
        "option": "うたう",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 歌う, meaning \"to sing\""
      },
      {
        "option": "か",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not used for the verb 歌う"
      },
      {
        "option": "うだう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 歌う"
      },
      {
        "option": "がう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 歌う"
      }
    ],
    "verification": true
  },
  {
    "id": 10,
    "sentence": "わたしの兄はいしゃです。",
    "englishTranslation": "My older brother is a doctor.",
    "underlinedKanji": "兄",
    "kanjiPosition": 4,
    "options": [
      "あに",
      "けい",
      "きょう",
      "えい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "兄 (あに) - (humble) older brother",
    "explanations": [
      {
        "option": "あに",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 兄, meaning \"older brother\""
      },
      {
        "option": "けい",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not the standard reading for brother"
      },
      {
        "option": "きょう",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not the standard reading for brother"
      },
      {
        "option": "えい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 兄"
      }
    ],
    "verification": true
  },
  {
    "id": 11,
    "sentence": "来週にあいましょう。",
    "englishTranslation": "Let's meet next week.",
    "underlinedKanji": "来週",
    "kanjiPosition": 0,
    "options": [
      "らいしゅう",
      "くるしゅう",
      "きしゅう",
      "らいす"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "来週 (らいしゅう) - next week",
    "explanations": [
      {
        "option": "らいしゅう",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 来週, meaning \"next week\""
      },
      {
        "option": "くるしゅう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 来週"
      },
      {
        "option": "きしゅう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 来週"
      },
      {
        "option": "らいす",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 来週"
      }
    ],
    "verification": true
  },
  {
    "id": 12,
    "sentence": "あたらしい洋服をかいました。",
    "englishTranslation": "I bought new western-style clothes.",
    "underlinedKanji": "洋服",
    "kanjiPosition": 5,
    "options": [
      "ようふく",
      "ひろふく",
      "ようぷく",
      "ひろぷく"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "洋服 (ようふく) - western-style clothes",
    "explanations": [
      {
        "option": "ようふく",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 洋服, meaning \"western clothes\""
      },
      {
        "option": "ひろふく",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 洋服"
      },
      {
        "option": "ようぷく",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 洋服"
      },
      {
        "option": "ひろぷく",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 洋服"
      }
    ],
    "verification": true
  },
  {
    "id": 13,
    "sentence": "ははを病院につれていきました。",
    "englishTranslation": "I took my mother to the hospital.",
    "underlinedKanji": "病院",
    "kanjiPosition": 3,
    "options": [
      "びょういん",
      "やまいいん",
      "びょうえん",
      "へいいん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "病院 (びょういん) - hospital",
    "explanations": [
      {
        "option": "びょういん",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 病院, meaning \"hospital\""
      },
      {
        "option": "やまいいん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 病院"
      },
      {
        "option": "びょうえん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 病院"
      },
      {
        "option": "へいいん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 病院"
      }
    ],
    "verification": true
  },
  {
    "id": 14,
    "sentence": "時間がたりません。",
    "englishTranslation": "I don't have enough time.",
    "underlinedKanji": "時間",
    "kanjiPosition": 0,
    "options": [
      "じかん",
      "ときかん",
      "しかん",
      "ときま"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "時間 (じかん) - Time",
    "explanations": [
      {
        "option": "じかん",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 時間, meaning \"time\""
      },
      {
        "option": "ときかん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 時間"
      },
      {
        "option": "しかん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 時間"
      },
      {
        "option": "ときま",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 時間"
      }
    ],
    "verification": true
  },
  {
    "id": 15,
    "sentence": "野菜をたくさんたべます。",
    "englishTranslation": "I eat a lot of vegetables.",
    "underlinedKanji": "野菜",
    "kanjiPosition": 0,
    "options": [
      "やさい",
      "のさい",
      "やそう",
      "のそう"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "野菜 (やさい) - vegetable",
    "explanations": [
      {
        "option": "やさい",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 野菜, meaning \"vegetable\""
      },
      {
        "option": "のさい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 野菜"
      },
      {
        "option": "やそう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 野菜"
      },
      {
        "option": "のそう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 野菜"
      }
    ],
    "verification": true
  },
  {
    "id": 16,
    "sentence": "きょうはひとが多いです。",
    "englishTranslation": "There are many people today.",
    "underlinedKanji": "多い",
    "kanjiPosition": 7,
    "options": [
      "おおい",
      "たい",
      "おい",
      "だい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "多い (おおい) - many",
    "explanations": [
      {
        "option": "おおい",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 多い, meaning \"many/much\""
      },
      {
        "option": "たい",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not the standard reading for many"
      },
      {
        "option": "おい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 多い"
      },
      {
        "option": "だい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 多い"
      }
    ],
    "verification": true
  },
  {
    "id": 17,
    "sentence": "がっこうは遠いです。",
    "englishTranslation": "The school is far.",
    "underlinedKanji": "遠い",
    "kanjiPosition": 5,
    "options": [
      "とおい",
      "えんい",
      "とい",
      "おんい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "遠い (とおい) - far",
    "explanations": [
      {
        "option": "とおい",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 遠い, meaning \"far\""
      },
      {
        "option": "えんい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 遠い"
      },
      {
        "option": "とい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 遠い"
      },
      {
        "option": "おんい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 遠い"
      }
    ],
    "verification": true
  },
  {
    "id": 18,
    "sentence": "左にまがってください。",
    "englishTranslation": "Please turn left.",
    "underlinedKanji": "左",
    "kanjiPosition": 0,
    "options": [
      "ひだり",
      "さ",
      "しゃ",
      "みぎ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "左 (ひだり) - left hand side",
    "explanations": [
      {
        "option": "ひだり",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 左, meaning \"left\""
      },
      {
        "option": "さ",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not the standard reading for direction"
      },
      {
        "option": "しゃ",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not the standard reading for direction"
      },
      {
        "option": "みぎ",
        "isCorrect": false,
        "reasoning": "This means \"right\" (右) but not the reading for 左"
      }
    ],
    "verification": true
  },
  {
    "id": 19,
    "sentence": "らいげつの二日にあいましょう。",
    "englishTranslation": "Let's meet on the 2nd of next month.",
    "underlinedKanji": "二日",
    "kanjiPosition": 5,
    "options": [
      "ふつか",
      "ににち",
      "にじつ",
      "ふか"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "二日 (ふつか) - two days, second day of the month",
    "explanations": [
      {
        "option": "ふつか",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 二日, meaning \"2nd day\""
      },
      {
        "option": "ににち",
        "isCorrect": false,
        "reasoning": "While this could be read this way, ふつか is the standard reading"
      },
      {
        "option": "にじつ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 二日"
      },
      {
        "option": "ふか",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for"
      }
    ],
    "verification": true
  },
  {
    "id": 20,
    "sentence": "三じにあいましょう。",
    "englishTranslation": "Let's meet at three o'clock.",
    "underlinedKanji": "三",
    "kanjiPosition": 0,
    "options": [
      "さん",
      "み",
      "みっつ",
      "ざん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "三 (さん) - Three",
    "explanations": [
      {
        "option": "さん",
        "isCorrect": true,
        "reasoning": "This is the correct on-yomi reading for 三, meaning \"three\""
      },
      {
        "option": "み",
        "isCorrect": false,
        "reasoning": "While this is a kun-yomi for 三, さん is used for time"
      },
      {
        "option": "みっつ",
        "isCorrect": false,
        "reasoning": "This is for counting objects but not for time"
      },
      {
        "option": "ざん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 三"
      }
    ],
    "verification": true
  },
  {
    "id": 21,
    "sentence": "らいげつの三日にあいましょう。",
    "englishTranslation": "Let's meet on the 3rd of next month.",
    "underlinedKanji": "三日",
    "kanjiPosition": 5,
    "options": [
      "みっか",
      "さんにち",
      "みにち",
      "さんか"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "三日 (みっか) - three days, third day of the month",
    "explanations": [
      {
        "option": "みっか",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 三日, meaning \"3rd day\""
      },
      {
        "option": "さんにち",
        "isCorrect": false,
        "reasoning": "While this could be read this way, みっか is the standard reading"
      },
      {
        "option": "みにち",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 三日"
      },
      {
        "option": "さんか",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 三日"
      }
    ],
    "verification": true
  },
  {
    "id": 22,
    "sentence": "あたらしい背広をかいました。",
    "englishTranslation": "I bought a new business suit.",
    "underlinedKanji": "背広",
    "kanjiPosition": 5,
    "options": [
      "せびろ",
      "はいこう",
      "せこう",
      "はいひろ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "背広 (せびろ) - business suit",
    "explanations": [
      {
        "option": "せびろ",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 背広, meaning \"business suit\""
      },
      {
        "option": "はいこう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 背広"
      },
      {
        "option": "せこう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 背広"
      },
      {
        "option": "はいひろ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 背広"
      }
    ],
    "verification": true
  },
  {
    "id": 23,
    "sentence": "かべにポスターを貼るました。",
    "englishTranslation": "I stuck a poster on the wall.",
    "underlinedKanji": "貼る",
    "kanjiPosition": 8,
    "options": [
      "はる",
      "ちょう",
      "てん",
      "ばる"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "貼る (はる) - to stick",
    "explanations": [
      {
        "option": "はる",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 貼る, meaning \"to stick/paste\""
      },
      {
        "option": "ちょう",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not used for the verb 貼る"
      },
      {
        "option": "てん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 貼る"
      },
      {
        "option": "ばる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 貼る"
      }
    ],
    "verification": true
  },
  {
    "id": 24,
    "sentence": "きょうは寒いです。",
    "englishTranslation": "Today is cold.",
    "underlinedKanji": "寒い",
    "kanjiPosition": 4,
    "options": [
      "さむい",
      "かんい",
      "さびい",
      "はんい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "寒い (さむい) - Cold",
    "explanations": [
      {
        "option": "さむい",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 寒い, meaning \"cold\""
      },
      {
        "option": "かんい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 寒い"
      },
      {
        "option": "さびい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 寒い"
      },
      {
        "option": "はんい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 寒い"
      }
    ],
    "verification": true
  },
  {
    "id": 25,
    "sentence": "まいばん風呂にはいります。",
    "englishTranslation": "I take a bath every evening.",
    "underlinedKanji": "風呂",
    "kanjiPosition": 4,
    "options": [
      "ふろ",
      "かぜろ",
      "ふうろ",
      "ばんろ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "風呂 (ふろ) - bath",
    "explanations": [
      {
        "option": "ふろ",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 風呂, meaning \"bath\""
      },
      {
        "option": "かぜろ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 風呂"
      },
      {
        "option": "ふうろ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 風呂"
      },
      {
        "option": "ばんろ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 風呂"
      }
    ],
    "verification": true
  },
  {
    "id": 26,
    "sentence": "しろい猫をかっています。",
    "englishTranslation": "I keep a white cat.",
    "underlinedKanji": "猫",
    "kanjiPosition": 3,
    "options": [
      "ねこ",
      "びょう",
      "ねっこ",
      "めこ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "猫 (ねこ) - cat",
    "explanations": [
      {
        "option": "ねこ",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 猫, meaning \"cat\""
      },
      {
        "option": "びょう",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not the standard reading for cat"
      },
      {
        "option": "ねっこ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 猫"
      },
      {
        "option": "めこ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 猫"
      }
    ],
    "verification": true
  },
  {
    "id": 27,
    "sentence": "この賑やかなまちがすきです。",
    "englishTranslation": "I like this bustling town.",
    "underlinedKanji": "賑やか",
    "kanjiPosition": 2,
    "options": [
      "にぎやか",
      "けんやか",
      "にがやか",
      "しんやか"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "賑やか (にぎやか) - bustling,busy",
    "explanations": [
      {
        "option": "にぎやか",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 賑やか, meaning \"lively/bustling\""
      },
      {
        "option": "けんやか",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 賑やか"
      },
      {
        "option": "にがやか",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 賑やか"
      },
      {
        "option": "しんやか",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 賑やか"
      }
    ],
    "verification": true
  },
  {
    "id": 28,
    "sentence": "なつやすみに旅行します。",
    "englishTranslation": "I will travel during summer vacation.",
    "underlinedKanji": "旅行",
    "kanjiPosition": 6,
    "options": [
      "りょこう",
      "たびいく",
      "りょうこう",
      "りこう"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "旅行 (りょこう) - travel",
    "explanations": [
      {
        "option": "りょこう",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 旅行, meaning \"travel\""
      },
      {
        "option": "たびいく",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 旅行"
      },
      {
        "option": "りょうこう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 旅行"
      },
      {
        "option": "りこう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 旅行"
      }
    ],
    "verification": true
  },
  {
    "id": 29,
    "sentence": "てを洗うてください。",
    "englishTranslation": "Please wash your hands.",
    "underlinedKanji": "洗う",
    "kanjiPosition": 2,
    "options": [
      "あらう",
      "せんう",
      "あろう",
      "せんじゅ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "洗う (あらう) - to wash",
    "explanations": [
      {
        "option": "あらう",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 洗う, meaning \"to wash\""
      },
      {
        "option": "せんう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 洗う"
      },
      {
        "option": "あろう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 洗う"
      },
      {
        "option": "せんじゅ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 洗う"
      }
    ],
    "verification": true
  },
  {
    "id": 30,
    "sentence": "あたまが痛いです。",
    "englishTranslation": "My head hurts.",
    "underlinedKanji": "痛い",
    "kanjiPosition": 4,
    "options": [
      "いたい",
      "つうい",
      "いだい",
      "とうい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "痛い (いたい) - painful",
    "explanations": [
      {
        "option": "いたい",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 痛い, meaning \"painful\""
      },
      {
        "option": "つうい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 痛い"
      },
      {
        "option": "いだい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 痛い"
      },
      {
        "option": "とうい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 痛い"
      }
    ],
    "verification": true
  },
  {
    "id": 31,
    "sentence": "五じにかえります。",
    "englishTranslation": "I will go home at five o'clock.",
    "underlinedKanji": "五",
    "kanjiPosition": 0,
    "options": [
      "ご",
      "いつ",
      "いつつ",
      "こ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "五 (ご) - Five",
    "explanations": [
      {
        "option": "ご",
        "isCorrect": true,
        "reasoning": "This is the correct on-yomi reading for 五, meaning \"five\""
      },
      {
        "option": "いつ",
        "isCorrect": false,
        "reasoning": "While this is a kun-yomi for 五, ご is used for time"
      },
      {
        "option": "いつつ",
        "isCorrect": false,
        "reasoning": "This is for counting objects but not for time"
      },
      {
        "option": "こ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 五"
      }
    ],
    "verification": true
  },
  {
    "id": 32,
    "sentence": "体がつかれています。",
    "englishTranslation": "My body is tired.",
    "underlinedKanji": "体",
    "kanjiPosition": 0,
    "options": [
      "からだ",
      "たい",
      "かたい",
      "がらだ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "体 (からだ) - Body",
    "explanations": [
      {
        "option": "からだ",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 体, meaning \"body\""
      },
      {
        "option": "たい",
        "isCorrect": false,
        "reasoning": "While this is an on-yomi for 体, からだ is the standard reading"
      },
      {
        "option": "かたい",
        "isCorrect": false,
        "reasoning": "This means \"hard\" but not the reading for 体"
      },
      {
        "option": "がらだ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 体"
      }
    ],
    "verification": true
  },
  {
    "id": 33,
    "sentence": "牛肉をたべました。",
    "englishTranslation": "I ate beef.",
    "underlinedKanji": "牛肉",
    "kanjiPosition": 0,
    "options": [
      "ぎゅうにく",
      "うしにく",
      "きゅうにく",
      "ぎゅうろく"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "牛肉 (ぎゅうにく) - Beef",
    "explanations": [
      {
        "option": "ぎゅうにく",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 牛肉, meaning \"beef\""
      },
      {
        "option": "うしにく",
        "isCorrect": false,
        "reasoning": "While うし means cow, ぎゅうにく is the standard reading"
      },
      {
        "option": "きゅうにく",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 牛肉"
      },
      {
        "option": "ぎゅうろく",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 牛肉"
      }
    ],
    "verification": true
  },
  {
    "id": 34,
    "sentence": "黄色のくるまがすきです。",
    "englishTranslation": "I like yellow cars.",
    "underlinedKanji": "黄色",
    "kanjiPosition": 0,
    "options": [
      "きいろ",
      "おうしょく",
      "きろ",
      "おういろ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "黄色 (きいろ) - yellow",
    "explanations": [
      {
        "option": "きいろ",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 黄色, meaning \"yellow\""
      },
      {
        "option": "おうしょく",
        "isCorrect": false,
        "reasoning": "This is not a standard reading for 黄色"
      },
      {
        "option": "きろ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 黄色"
      },
      {
        "option": "おういろ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 黄色"
      }
    ],
    "verification": true
  },
  {
    "id": 35,
    "sentence": "両親にあいにいきます。",
    "englishTranslation": "I'm going to see my parents.",
    "underlinedKanji": "両親",
    "kanjiPosition": 0,
    "options": [
      "りょうしん",
      "りょうおや",
      "りょうちち",
      "ふたりおや"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "両親 (りょうしん) - both parents",
    "explanations": [
      {
        "option": "りょうしん",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 両親, meaning \"both parents\""
      },
      {
        "option": "りょうおや",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 両親"
      },
      {
        "option": "りょうちち",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 両親"
      },
      {
        "option": "ふたりおや",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 両親"
      }
    ],
    "verification": true
  },
  {
    "id": 36,
    "sentence": "しろい紙にかきました。",
    "englishTranslation": "I wrote on white paper.",
    "underlinedKanji": "紙",
    "kanjiPosition": 3,
    "options": [
      "かみ",
      "し",
      "がみ",
      "ぺい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "紙 (かみ) - paper",
    "explanations": [
      {
        "option": "かみ",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 紙, meaning \"paper\""
      },
      {
        "option": "し",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not the standard reading for paper"
      },
      {
        "option": "がみ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 紙"
      },
      {
        "option": "ぺい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 紙"
      }
    ],
    "verification": true
  },
  {
    "id": 37,
    "sentence": "せんせいに質問しました。",
    "englishTranslation": "I asked the teacher a question.",
    "underlinedKanji": "質問",
    "kanjiPosition": 5,
    "options": [
      "しつもん",
      "しちもん",
      "ひつもん",
      "きつもん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "質問 (しつもん) - Question",
    "explanations": [
      {
        "option": "しつもん",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 質問, meaning \"question\""
      },
      {
        "option": "しちもん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 質問"
      },
      {
        "option": "ひつもん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 質問"
      },
      {
        "option": "きつもん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 質問"
      }
    ],
    "verification": true
  },
  {
    "id": 38,
    "sentence": "交番でみちをききました。",
    "englishTranslation": "I asked for directions at the police box.",
    "underlinedKanji": "交番",
    "kanjiPosition": 0,
    "options": [
      "こうばん",
      "きょうばん",
      "こばん",
      "こうはん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "交番 (こうばん) - police box",
    "explanations": [
      {
        "option": "こうばん",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 交番, meaning \"police box\""
      },
      {
        "option": "きょうばん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 交番"
      },
      {
        "option": "こばん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 交番"
      },
      {
        "option": "こうはん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 交番"
      }
    ],
    "verification": true
  },
  {
    "id": 39,
    "sentence": "らいげつの五日にあいましょう。",
    "englishTranslation": "Let's meet on the 5th of next month.",
    "underlinedKanji": "五日",
    "kanjiPosition": 5,
    "options": [
      "いつか",
      "ごにち",
      "ごか",
      "いつにち"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "五日 (いつか) - five days, fifth day",
    "explanations": [
      {
        "option": "いつか",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 五日, meaning \"5th day\""
      },
      {
        "option": "ごにち",
        "isCorrect": false,
        "reasoning": "While this could be read this way, いつか is the standard reading"
      },
      {
        "option": "ごか",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 五日"
      },
      {
        "option": "いつにち",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 五日"
      }
    ],
    "verification": true
  },
  {
    "id": 40,
    "sentence": "作文をかきました。",
    "englishTranslation": "I wrote a composition.",
    "underlinedKanji": "作文",
    "kanjiPosition": 0,
    "options": [
      "さくぶん",
      "つくりぶん",
      "さくもん",
      "つくもん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "作文 (さくぶん) - composition, writing",
    "explanations": [
      {
        "option": "さくぶん",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 作文, meaning \"composition\""
      },
      {
        "option": "つくりぶん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 作文"
      },
      {
        "option": "さくもん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 作文"
      },
      {
        "option": "つくもん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 作文"
      }
    ],
    "verification": true
  },
  {
    "id": 41,
    "sentence": "にほんごが分かるません。",
    "englishTranslation": "I don't understand Japanese.",
    "underlinedKanji": "分かる",
    "kanjiPosition": 5,
    "options": [
      "わかる",
      "ぶかる",
      "ふんかる",
      "みんかる"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "分かる (わかる) - to be understood",
    "explanations": [
      {
        "option": "わかる",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 分かる, meaning \"to understand\""
      },
      {
        "option": "ぶかる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 分かる"
      },
      {
        "option": "ふんかる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 分かる"
      },
      {
        "option": "みんかる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 分かる"
      }
    ],
    "verification": true
  },
  {
    "id": 42,
    "sentence": "この道をまっすぐいってください。",
    "englishTranslation": "Please go straight on this road.",
    "underlinedKanji": "道",
    "kanjiPosition": 2,
    "options": [
      "みち",
      "どう",
      "みじ",
      "とう"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "道 (みち) - street",
    "explanations": [
      {
        "option": "みち",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 道, meaning \"road/street\""
      },
      {
        "option": "どう",
        "isCorrect": false,
        "reasoning": "While this is an on-yomi for 道, みち is the standard reading"
      },
      {
        "option": "みじ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 道"
      },
      {
        "option": "とう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 道"
      }
    ],
    "verification": true
  },
  {
    "id": 43,
    "sentence": "頭がいたいです。",
    "englishTranslation": "My head hurts.",
    "underlinedKanji": "頭",
    "kanjiPosition": 0,
    "options": [
      "あたま",
      "とう",
      "ず",
      "だま"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "頭 (あたま) - head",
    "explanations": [
      {
        "option": "あたま",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 頭, meaning \"head\""
      },
      {
        "option": "とう",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not the standard reading for head"
      },
      {
        "option": "ず",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not the standard reading for head"
      },
      {
        "option": "だま",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 頭"
      }
    ],
    "verification": true
  },
  {
    "id": 44,
    "sentence": "冬はさむいです。",
    "englishTranslation": "Winter is cold.",
    "underlinedKanji": "冬",
    "kanjiPosition": 0,
    "options": [
      "ふゆ",
      "とう",
      "ふあ",
      "どう"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "冬 (ふゆ) - winter",
    "explanations": [
      {
        "option": "ふゆ",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 冬, meaning \"winter\""
      },
      {
        "option": "とう",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not the standard reading for winter"
      },
      {
        "option": "ふあ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 冬"
      },
      {
        "option": "どう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 冬"
      }
    ],
    "verification": true
  },
  {
    "id": 45,
    "sentence": "向こうにともだちがいます。",
    "englishTranslation": "My friend is over there.",
    "underlinedKanji": "向こう",
    "kanjiPosition": 0,
    "options": [
      "むこう",
      "こうこう",
      "ひこう",
      "みこう"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "向こう (むこう) - over there",
    "explanations": [
      {
        "option": "むこう",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 向こう, meaning \"over there\""
      },
      {
        "option": "こうこう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 向こう"
      },
      {
        "option": "ひこう",
        "isCorrect": false,
        "reasoning": "This means \"flight\" but not the reading for 向こう"
      },
      {
        "option": "みこう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 向こう"
      }
    ],
    "verification": true
  },
  {
    "id": 46,
    "sentence": "千えんかしてください。",
    "englishTranslation": "Please lend me 1000 yen.",
    "underlinedKanji": "千",
    "kanjiPosition": 0,
    "options": [
      "せん",
      "ち",
      "ぜん",
      "さん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "千 (せん) - Thousand",
    "explanations": [
      {
        "option": "せん",
        "isCorrect": true,
        "reasoning": "This is the correct on-yomi reading for 千, meaning \"thousand\""
      },
      {
        "option": "ち",
        "isCorrect": false,
        "reasoning": "This is a kun-yomi but not used for counting"
      },
      {
        "option": "ぜん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 千"
      }
    ],
    "verification": true
  },
  {
    "id": 47,
    "sentence": "風邪をひいてしまいました。",
    "englishTranslation": "I caught a cold.",
    "underlinedKanji": "風邪",
    "kanjiPosition": 0,
    "options": [
      "かぜ",
      "ふうじゃ",
      "かざ",
      "ふうざ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "風邪 (かぜ) - a cold",
    "explanations": [
      {
        "option": "かぜ",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 風邪, meaning \"a cold\""
      },
      {
        "option": "ふうじゃ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 風邪"
      },
      {
        "option": "かざ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 風邪"
      },
      {
        "option": "ふうざ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 風邪"
      }
    ],
    "verification": true
  },
  {
    "id": 48,
    "sentence": "ともだちと出かけるました。",
    "englishTranslation": "I went out with my friend.",
    "underlinedKanji": "出かける",
    "kanjiPosition": 5,
    "options": [
      "でかける",
      "しゅつかける",
      "だかける",
      "ではかける"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "出かける (でかける) - to go out",
    "explanations": [
      {
        "option": "でかける",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 出かける, meaning \"to go out\""
      },
      {
        "option": "しゅつかける",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 出かける"
      },
      {
        "option": "だかける",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 出かける"
      },
      {
        "option": "ではかける",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 出かける"
      }
    ],
    "verification": true
  },
  {
    "id": 49,
    "sentence": "こどもに飴をあげました。",
    "englishTranslation": "I gave candy to the child.",
    "underlinedKanji": "飴",
    "kanjiPosition": 4,
    "options": [
      "あめ",
      "とう",
      "がい",
      "あま"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "飴 (あめ) - candy",
    "explanations": [
      {
        "option": "あめ",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 飴, meaning \"candy\""
      },
      {
        "option": "とう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 飴"
      },
      {
        "option": "がい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 飴"
      },
      {
        "option": "あま",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 飴"
      }
    ],
    "verification": true
  },
  {
    "id": 50,
    "sentence": "じかんが少ないです。",
    "englishTranslation": "There is little time.",
    "underlinedKanji": "少ない",
    "kanjiPosition": 4,
    "options": [
      "すくない",
      "しょうない",
      "すこない",
      "しょない"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "少ない (すくない) - a few",
    "explanations": [
      {
        "option": "すくない",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 少ない, meaning \"few/little\""
      },
      {
        "option": "しょうない",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 少ない"
      },
      {
        "option": "すこない",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 少ない"
      },
      {
        "option": "しょない",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 少ない"
      }
    ],
    "verification": true
  },
  {
    "id": 51,
    "sentence": "この薄いほんをよみました。",
    "englishTranslation": "I read this thin book.",
    "underlinedKanji": "薄い",
    "kanjiPosition": 2,
    "options": [
      "うすい",
      "はくい",
      "うずい",
      "ばくい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "薄い (うすい) - thin,weak",
    "explanations": [
      {
        "option": "うすい",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 薄い, meaning \"thin\""
      },
      {
        "option": "はくい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 薄い"
      },
      {
        "option": "うずい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 薄い"
      },
      {
        "option": "ばくい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 薄い"
      }
    ],
    "verification": true
  },
  {
    "id": 52,
    "sentence": "はを磨くました。",
    "englishTranslation": "I brushed my teeth.",
    "underlinedKanji": "磨く",
    "kanjiPosition": 2,
    "options": [
      "みがく",
      "まく",
      "とく",
      "みかく"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "磨く (みがく) - to brush teeth, to polish",
    "explanations": [
      {
        "option": "みがく",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 磨く, meaning \"to brush/polish\""
      },
      {
        "option": "まく",
        "isCorrect": false,
        "reasoning": "This means \"to roll up\" but not the reading for 磨く"
      },
      {
        "option": "とく",
        "isCorrect": false,
        "reasoning": "This means \"to solve\" but not the reading for 磨く"
      },
      {
        "option": "みかく",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 磨く"
      }
    ],
    "verification": true
  },
  {
    "id": 53,
    "sentence": "あの女の子はだれですか。",
    "englishTranslation": "Who is that girl?",
    "underlinedKanji": "女の子",
    "kanjiPosition": 2,
    "options": [
      "おんなのこ",
      "じょのこ",
      "おんなのご",
      "めのこ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "女の子 (おんなのこ) - Girl",
    "explanations": [
      {
        "option": "おんなのこ",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 女の子, meaning \"girl\""
      },
      {
        "option": "じょのこ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 女の子"
      },
      {
        "option": "おんなのご",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 女の子"
      },
      {
        "option": "めのこ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 女の子"
      }
    ],
    "verification": true
  },
  {
    "id": 54,
    "sentence": "七じにでかけます。",
    "englishTranslation": "I will go out at seven o'clock.",
    "underlinedKanji": "七",
    "kanjiPosition": 0,
    "options": [
      "なな",
      "しち",
      "ひち",
      "せん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "七 (なな) - Seven",
    "explanations": [
      {
        "option": "なな",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 七, meaning \"seven\""
      },
      {
        "option": "しち",
        "isCorrect": false,
        "reasoning": "While this is also a reading for 七, なな is preferred before じ"
      },
      {
        "option": "ひち",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 七"
      },
      {
        "option": "せん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 七"
      }
    ],
    "verification": true
  },
  {
    "id": 55,
    "sentence": "この暗いへやがきらいです。",
    "englishTranslation": "I dislike this dark room.",
    "underlinedKanji": "暗い",
    "kanjiPosition": 2,
    "options": [
      "くらい",
      "あんい",
      "きらい",
      "からい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "暗い (くらい) - Gloomy",
    "explanations": [
      {
        "option": "くらい",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 暗い, meaning \"dark\""
      },
      {
        "option": "あんい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 暗い"
      },
      {
        "option": "きらい",
        "isCorrect": false,
        "reasoning": "This means \"dislike\" but not the reading for 暗い"
      },
      {
        "option": "からい",
        "isCorrect": false,
        "reasoning": "This means \"spicy\" but not the reading for 暗い"
      }
    ],
    "verification": true
  },
  {
    "id": 56,
    "sentence": "テレビを見るました。",
    "englishTranslation": "I watched TV.",
    "underlinedKanji": "見る",
    "kanjiPosition": 4,
    "options": [
      "みる",
      "けん",
      "げん",
      "きる"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "見る (みる) - to see, to watch",
    "explanations": [
      {
        "option": "みる",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 見る, meaning \"to see/watch\""
      },
      {
        "option": "けん",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not used for the verb 見る"
      },
      {
        "option": "げん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 見る"
      },
      {
        "option": "きる",
        "isCorrect": false,
        "reasoning": "This means \"to cut\" but not the reading for 見る"
      }
    ],
    "verification": true
  },
  {
    "id": 57,
    "sentence": "豚肉のりょうりをつくりました。",
    "englishTranslation": "I made a pork dish.",
    "underlinedKanji": "豚肉",
    "kanjiPosition": 0,
    "options": [
      "ぶたにく",
      "とんにく",
      "ぶたろく",
      "とんろく"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "豚肉 (ぶたにく) - pork",
    "explanations": [
      {
        "option": "ぶたにく",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 豚肉, meaning \"pork\""
      },
      {
        "option": "とんにく",
        "isCorrect": false,
        "reasoning": "While とん is used in some compounds, ぶたにく is standard"
      },
      {
        "option": "ぶたろく",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 豚肉"
      },
      {
        "option": "とんろく",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 豚肉"
      }
    ],
    "verification": true
  },
  {
    "id": 58,
    "sentence": "らいげつの六日にあいましょう。",
    "englishTranslation": "Let's meet on the 6th of next month.",
    "underlinedKanji": "六日",
    "kanjiPosition": 5,
    "options": [
      "むいか",
      "ろくにち",
      "ろっか",
      "むっか"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "六日 (むいか) - six days, sixth day of the month",
    "explanations": [
      {
        "option": "むいか",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 六日, meaning \"6th day\""
      },
      {
        "option": "ろくにち",
        "isCorrect": false,
        "reasoning": "While this could be read this way, むいか is the standard reading"
      },
      {
        "option": "ろっか",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 六日"
      },
      {
        "option": "むっか",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 六日"
      }
    ],
    "verification": true
  },
  {
    "id": 59,
    "sentence": "なまえを覚えるました。",
    "englishTranslation": "I remembered the name.",
    "underlinedKanji": "覚える",
    "kanjiPosition": 4,
    "options": [
      "おぼえる",
      "かくえる",
      "おもえる",
      "がくえる"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "覚える (おぼえる) - to remember",
    "explanations": [
      {
        "option": "おぼえる",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 覚える, meaning \"to remember\""
      },
      {
        "option": "かくえる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 覚える"
      },
      {
        "option": "おもえる",
        "isCorrect": false,
        "reasoning": "This means \"to think\" but not the reading for 覚える"
      },
      {
        "option": "がくえる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 覚える"
      }
    ],
    "verification": true
  },
  {
    "id": 60,
    "sentence": "映画館でえいがをみました。",
    "englishTranslation": "I watched a movie at the cinema.",
    "underlinedKanji": "映画館",
    "kanjiPosition": 0,
    "options": [
      "えいがかん",
      "えいがやかた",
      "いがかん",
      "ようがかん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "映画館 (えいがかん) - cinema",
    "explanations": [
      {
        "option": "えいがかん",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 映画館, meaning \"cinema\""
      },
      {
        "option": "えいがやかた",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 映画館"
      },
      {
        "option": "いがかん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 映画館"
      },
      {
        "option": "ようがかん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 映画館"
      }
    ],
    "verification": true
  },
  {
    "id": 61,
    "sentence": "ほんを借りるました。",
    "englishTranslation": "I borrowed a book.",
    "underlinedKanji": "借りる",
    "kanjiPosition": 3,
    "options": [
      "かりる",
      "しゃくりる",
      "がりる",
      "きりる"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "借りる (かりる) - to borrow",
    "explanations": [
      {
        "option": "かりる",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 借りる, meaning \"to borrow\""
      },
      {
        "option": "しゃくりる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 借りる"
      },
      {
        "option": "がりる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 借りる"
      },
      {
        "option": "きりる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 借りる"
      }
    ],
    "verification": true
  },
  {
    "id": 62,
    "sentence": "つめたい水をのみました。",
    "englishTranslation": "I drank cold water.",
    "underlinedKanji": "水",
    "kanjiPosition": 4,
    "options": [
      "みず",
      "すい",
      "みづ",
      "にず"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "水 (みず) - water",
    "explanations": [
      {
        "option": "みず",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 水, meaning \"water\""
      },
      {
        "option": "すい",
        "isCorrect": false,
        "reasoning": "While this is an on-yomi for 水, みず is the standard reading"
      },
      {
        "option": "みづ",
        "isCorrect": false,
        "reasoning": "This is an old spelling but not standard"
      },
      {
        "option": "にず",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 水"
      }
    ],
    "verification": true
  },
  {
    "id": 63,
    "sentence": "誰かきましたか。",
    "englishTranslation": "Did somebody come?",
    "underlinedKanji": "誰か",
    "kanjiPosition": 0,
    "options": [
      "だれか",
      "たれか",
      "すいか",
      "どれか"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "誰か (だれか) - somebody",
    "explanations": [
      {
        "option": "だれか",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 誰か, meaning \"somebody\""
      },
      {
        "option": "たれか",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 誰か"
      },
      {
        "option": "すいか",
        "isCorrect": false,
        "reasoning": "This means \"watermelon\" but not the reading for 誰か"
      },
      {
        "option": "どれか",
        "isCorrect": false,
        "reasoning": "This means \"which one\" but not the reading for 誰か"
      }
    ],
    "verification": true
  },
  {
    "id": 64,
    "sentence": "電話をかけました。",
    "englishTranslation": "I made a phone call.",
    "underlinedKanji": "電話",
    "kanjiPosition": 0,
    "options": [
      "でんわ",
      "でんはなし",
      "でんご",
      "てんわ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "電話 (でんわ) - telephone",
    "explanations": [
      {
        "option": "でんわ",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 電話, meaning \"telephone\""
      },
      {
        "option": "でんはなし",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 電話"
      },
      {
        "option": "でんご",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 電話"
      },
      {
        "option": "てんわ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 電話"
      }
    ],
    "verification": true
  },
  {
    "id": 65,
    "sentence": "大使館にいきました。",
    "englishTranslation": "I went to the embassy.",
    "underlinedKanji": "大使館",
    "kanjiPosition": 0,
    "options": [
      "たいしかん",
      "だいしかん",
      "おおしかん",
      "たいつかいかん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "大使館 (たいしかん) - embassy",
    "explanations": [
      {
        "option": "たいしかん",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 大使館, meaning \"embassy\""
      },
      {
        "option": "だいしかん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 大使館"
      },
      {
        "option": "おおしかん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 大使館"
      },
      {
        "option": "たいつかいかん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 大使館"
      }
    ],
    "verification": true
  },
  {
    "id": 66,
    "sentence": "ともだちが来るました。",
    "englishTranslation": "My friend came.",
    "underlinedKanji": "来る",
    "kanjiPosition": 5,
    "options": [
      "くる",
      "らい",
      "こい",
      "きる"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "来る (くる) - to come",
    "explanations": [
      {
        "option": "くる",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 来る, meaning \"to come\""
      },
      {
        "option": "らい",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not used for the verb 来る"
      },
      {
        "option": "こい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 来る"
      },
      {
        "option": "きる",
        "isCorrect": false,
        "reasoning": "This means \"to cut\" but not the reading for 来る"
      }
    ],
    "verification": true
  },
  {
    "id": 67,
    "sentence": "この安いほんをかいました。",
    "englishTranslation": "I bought this cheap book.",
    "underlinedKanji": "安い",
    "kanjiPosition": 2,
    "options": [
      "やすい",
      "あんい",
      "あすい",
      "たかい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "安い (やすい) - cheap",
    "explanations": [
      {
        "option": "やすい",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 安い, meaning \"cheap\""
      },
      {
        "option": "あんい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 安い"
      },
      {
        "option": "あすい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 安い"
      },
      {
        "option": "たかい",
        "isCorrect": false,
        "reasoning": "This means \"expensive\" (高い) but not the reading for 安い"
      }
    ],
    "verification": true
  },
  {
    "id": 68,
    "sentence": "漢字をかくのはむずかしいです。",
    "englishTranslation": "Writing kanji is difficult.",
    "underlinedKanji": "漢字",
    "kanjiPosition": 0,
    "options": [
      "かんじ",
      "からじ",
      "はんじ",
      "がんじ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "漢字 (かんじ) - Chinese character",
    "explanations": [
      {
        "option": "かんじ",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 漢字, meaning \"kanji/Chinese character\""
      },
      {
        "option": "からじ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 漢字"
      },
      {
        "option": "はんじ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 漢字"
      },
      {
        "option": "がんじ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 漢字"
      }
    ],
    "verification": true
  },
  {
    "id": 69,
    "sentence": "この易しいもんだいができました。",
    "englishTranslation": "I was able to solve this easy problem.",
    "underlinedKanji": "易しい",
    "kanjiPosition": 2,
    "options": [
      "やさしい",
      "いしい",
      "えきしい",
      "むずかしい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "易しい (やさしい) - easy, simple",
    "explanations": [
      {
        "option": "やさしい",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 易しい, meaning \"easy\""
      },
      {
        "option": "いしい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 易しい"
      },
      {
        "option": "えきしい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 易しい"
      },
      {
        "option": "むずかしい",
        "isCorrect": false,
        "reasoning": "This means \"difficult\" (難しい) but not the reading for 易しい"
      }
    ],
    "verification": true
  },
  {
    "id": 70,
    "sentence": "有名なじんじゃにいきました。",
    "englishTranslation": "I went to a famous shrine.",
    "underlinedKanji": "有名",
    "kanjiPosition": 0,
    "options": [
      "ゆうめい",
      "ありめい",
      "うめい",
      "ゆめい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "有名 (ゆうめい) - famous",
    "explanations": [
      {
        "option": "ゆうめい",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 有名, meaning \"famous\""
      },
      {
        "option": "ありめい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 有名"
      },
      {
        "option": "うめい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 有名"
      },
      {
        "option": "ゆめい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 有名"
      }
    ],
    "verification": true
  },
  {
    "id": 71,
    "sentence": "黒いねこがいます。",
    "englishTranslation": "There is a black cat.",
    "underlinedKanji": "黒",
    "kanjiPosition": 0,
    "options": [
      "くろ",
      "こく",
      "きろ",
      "ぐろ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "黒 (くろ) - Black",
    "explanations": [
      {
        "option": "くろ",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 黒, meaning \"black\""
      },
      {
        "option": "こく",
        "isCorrect": false,
        "reasoning": "While this is an on-yomi for 黒, くろ is the standard reading"
      },
      {
        "option": "きろ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 黒"
      }
    ],
    "verification": true
  },
  {
    "id": 72,
    "sentence": "八じにねました。",
    "englishTranslation": "I went to bed at eight o'clock.",
    "underlinedKanji": "八",
    "kanjiPosition": 0,
    "options": [
      "はち",
      "や",
      "ぱち",
      "はつ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "八 (はち) - eight",
    "explanations": [
      {
        "option": "はち",
        "isCorrect": true,
        "reasoning": "This is the correct on-yomi reading for 八, meaning \"eight\""
      },
      {
        "option": "や",
        "isCorrect": false,
        "reasoning": "While this is a kun-yomi for 八, はち is used for time"
      },
      {
        "option": "ぱち",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 八"
      },
      {
        "option": "はつ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 八"
      }
    ],
    "verification": true
  },
  {
    "id": 73,
    "sentence": "少しまってください。",
    "englishTranslation": "Please wait a little.",
    "underlinedKanji": "少し",
    "kanjiPosition": 0,
    "options": [
      "すこし",
      "しょうし",
      "ちょっと",
      "すくし"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "少し (すこし) - Few",
    "explanations": [
      {
        "option": "すこし",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 少し, meaning \"a little\""
      },
      {
        "option": "しょうし",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 少し"
      },
      {
        "option": "ちょっと",
        "isCorrect": false,
        "reasoning": "This means \"a little\" but is not the reading for 少し"
      },
      {
        "option": "すくし",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 少し"
      }
    ],
    "verification": true
  },
  {
    "id": 74,
    "sentence": "今朝はやくおきました。",
    "englishTranslation": "I woke up early this morning.",
    "underlinedKanji": "今朝",
    "kanjiPosition": 0,
    "options": [
      "けさ",
      "こんあさ",
      "いまあさ",
      "きんちょう"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "今朝 (けさ) - this morning",
    "explanations": [
      {
        "option": "けさ",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 今朝, meaning \"this morning\""
      },
      {
        "option": "こんあさ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 今朝"
      },
      {
        "option": "いまあさ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 今朝"
      },
      {
        "option": "きんちょう",
        "isCorrect": false,
        "reasoning": "This means \"tension\" but not the reading for 今朝"
      }
    ],
    "verification": true
  },
  {
    "id": 75,
    "sentence": "一日じゅうべんきょうしました。",
    "englishTranslation": "I studied all day long.",
    "underlinedKanji": "一日",
    "kanjiPosition": 0,
    "options": [
      "いちにち",
      "ついたち",
      "ひとひ",
      "いちび"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "一日 (いちにち) - first of the month",
    "explanations": [
      {
        "option": "いちにち",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 一日 meaning \"one day/all day\""
      },
      {
        "option": "ついたち",
        "isCorrect": false,
        "reasoning": "This is the reading for 一日 as \"first day of month\""
      },
      {
        "option": "ひとひ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 一日"
      },
      {
        "option": "いちび",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 一日"
      }
    ],
    "verification": true
  },
  {
    "id": 76,
    "sentence": "出口はどこですか。",
    "englishTranslation": "Where is the exit?",
    "underlinedKanji": "出口",
    "kanjiPosition": 0,
    "options": [
      "でぐち",
      "しゅつこう",
      "だぐち",
      "でくち"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "出口 (でぐち) - exit",
    "explanations": [
      {
        "option": "でぐち",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 出口, meaning \"exit\""
      },
      {
        "option": "しゅつこう",
        "isCorrect": false,
        "reasoning": "This is not a standard reading for 出口"
      },
      {
        "option": "だぐち",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 出口"
      },
      {
        "option": "でくち",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 出口"
      }
    ],
    "verification": true
  },
  {
    "id": 77,
    "sentence": "月曜日からしごとがはじまります。",
    "englishTranslation": "Work starts from Monday.",
    "underlinedKanji": "月曜日",
    "kanjiPosition": 0,
    "options": [
      "げつようび",
      "つきようび",
      "がつようび",
      "もくようび"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "月曜日 (げつようび) - Monday",
    "explanations": [
      {
        "option": "げつようび",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 月曜日, meaning \"Monday\""
      },
      {
        "option": "つきようび",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 月曜日"
      },
      {
        "option": "がつようび",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 月曜日"
      },
      {
        "option": "もくようび",
        "isCorrect": false,
        "reasoning": "This means \"Thursday\" (木曜日) but not the reading for 月曜日"
      }
    ],
    "verification": true
  },
  {
    "id": 78,
    "sentence": "がっこうの近くにすんでいます。",
    "englishTranslation": "I live near the school.",
    "underlinedKanji": "近く",
    "kanjiPosition": 5,
    "options": [
      "ちかく",
      "きんく",
      "ちがく",
      "じかく"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "近く (ちかく) - near",
    "explanations": [
      {
        "option": "ちかく",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 近く, meaning \"near\""
      },
      {
        "option": "きんく",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 近く"
      },
      {
        "option": "ちがく",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 近く"
      },
      {
        "option": "じかく",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 近く"
      }
    ],
    "verification": true
  },
  {
    "id": 79,
    "sentence": "お弁当をつくりました。",
    "englishTranslation": "I made a boxed lunch.",
    "underlinedKanji": "お弁当",
    "kanjiPosition": 0,
    "options": [
      "おべんとう",
      "おべんどう",
      "おぺんとう",
      "おでんとう"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "お弁当 (おべんとう) - boxed lunch",
    "explanations": [
      {
        "option": "おべんとう",
        "isCorrect": true,
        "reasoning": "This is the correct reading for お弁当, meaning \"boxed lunch\""
      },
      {
        "option": "おべんどう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for お弁当"
      },
      {
        "option": "おぺんとう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for お弁当"
      },
      {
        "option": "おでんとう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for お弁当"
      }
    ],
    "verification": true
  },
  {
    "id": 80,
    "sentence": "一ばんすきなたべものはなんですか。",
    "englishTranslation": "What is your number one favorite food?",
    "underlinedKanji": "一",
    "kanjiPosition": 0,
    "options": [
      "いち",
      "ひと",
      "いっ",
      "ワン"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "一 (いち) - one",
    "explanations": [
      {
        "option": "いち",
        "isCorrect": true,
        "reasoning": "This is the correct on-yomi reading for 一, meaning \"one\""
      },
      {
        "option": "ひと",
        "isCorrect": false,
        "reasoning": "This is a kun-yomi for 一, but いち is used in 一番"
      },
      {
        "option": "いっ",
        "isCorrect": false,
        "reasoning": "This is not a complete reading for 一"
      },
      {
        "option": "ワン",
        "isCorrect": false,
        "reasoning": "This is katakana for \"one\" but not the reading for 一"
      }
    ],
    "verification": true
  },
  {
    "id": 81,
    "sentence": "どあが開くました。",
    "englishTranslation": "The door opened.",
    "underlinedKanji": "開く",
    "kanjiPosition": 3,
    "options": [
      "あく",
      "ひらく",
      "かい",
      "はなく"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "開く (あく) - to open, to become open",
    "explanations": [
      {
        "option": "あく",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 開く (intransitive), meaning \"to open\""
      },
      {
        "option": "ひらく",
        "isCorrect": false,
        "reasoning": "This is the transitive reading for 開く"
      },
      {
        "option": "かい",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not used for the verb 開く"
      },
      {
        "option": "はなく",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 開く"
      }
    ],
    "verification": true
  },
  {
    "id": 82,
    "sentence": "良いてんきですね。",
    "englishTranslation": "It's good weather, isn't it?",
    "underlinedKanji": "良い",
    "kanjiPosition": 0,
    "options": [
      "よい",
      "いい",
      "りょう",
      "らい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "良い (よい) - good",
    "explanations": [
      {
        "option": "よい",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 良い, meaning \"good\""
      },
      {
        "option": "いい",
        "isCorrect": false,
        "reasoning": "While this also means \"good,\" it's written as いい, not 良い"
      },
      {
        "option": "りょう",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not used for the adjective 良い"
      },
      {
        "option": "らい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 良い"
      }
    ],
    "verification": true
  },
  {
    "id": 83,
    "sentence": "あしたは晴れるでしょう。",
    "englishTranslation": "It will probably be sunny tomorrow.",
    "underlinedKanji": "晴れる",
    "kanjiPosition": 4,
    "options": [
      "はれる",
      "せいる",
      "あかる",
      "てれる"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "晴れる (はれる) - to be sunny",
    "explanations": [
      {
        "option": "はれる",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 晴れる, meaning \"to be sunny\""
      },
      {
        "option": "せいる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 晴れる"
      },
      {
        "option": "あかる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 晴れる"
      },
      {
        "option": "てれる",
        "isCorrect": false,
        "reasoning": "This means \"to be shy\" but not the reading for 晴れる"
      }
    ],
    "verification": true
  },
  {
    "id": 84,
    "sentence": "ははに手紙をかきました。",
    "englishTranslation": "I wrote a letter to my mother.",
    "underlinedKanji": "手紙",
    "kanjiPosition": 3,
    "options": [
      "てがみ",
      "しゅし",
      "てし",
      "でがみ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "手紙 (てがみ) - letter",
    "explanations": [
      {
        "option": "てがみ",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 手紙, meaning \"letter\""
      },
      {
        "option": "しゅし",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 手紙"
      },
      {
        "option": "てし",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 手紙"
      },
      {
        "option": "でがみ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 手紙"
      }
    ],
    "verification": true
  },
  {
    "id": 85,
    "sentence": "赤いばらをもらいました。",
    "englishTranslation": "I received red roses.",
    "underlinedKanji": "赤い",
    "kanjiPosition": 0,
    "options": [
      "あかい",
      "せきい",
      "しゃくい",
      "あがい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "赤い (あかい) - red",
    "explanations": [
      {
        "option": "あかい",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 赤い, meaning \"red\""
      },
      {
        "option": "せきい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 赤い"
      },
      {
        "option": "しゃくい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 赤い"
      },
      {
        "option": "あがい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 赤い"
      }
    ],
    "verification": true
  },
  {
    "id": 86,
    "sentence": "今晩はやくかえります。",
    "englishTranslation": "I will return home early this evening.",
    "underlinedKanji": "今晩",
    "kanjiPosition": 0,
    "options": [
      "こんばん",
      "いまばん",
      "きんばん",
      "こんぱん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "今晩 (こんばん) - this evening",
    "explanations": [
      {
        "option": "こんばん",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 今晩, meaning \"this evening\""
      },
      {
        "option": "いまばん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 今晩"
      },
      {
        "option": "きんばん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 今晩"
      }
    ],
    "verification": true
  },
  {
    "id": 87,
    "sentence": "丸いテーブルをかいました。",
    "englishTranslation": "I bought a round table.",
    "underlinedKanji": "丸い",
    "kanjiPosition": 0,
    "options": [
      "まるい",
      "がんい",
      "わい",
      "えんい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "丸い (まるい) - round,circular",
    "explanations": [
      {
        "option": "まるい",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 丸い, meaning \"round\""
      },
      {
        "option": "がんい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 丸い"
      },
      {
        "option": "わい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 丸い"
      },
      {
        "option": "えんい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 丸い"
      }
    ],
    "verification": true
  },
  {
    "id": 88,
    "sentence": "今週はいそがしいです。",
    "englishTranslation": "This week is busy.",
    "underlinedKanji": "今週",
    "kanjiPosition": 0,
    "options": [
      "こんしゅう",
      "いましゅう",
      "きんしゅう",
      "こんす"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "今週 (こんしゅう) - this week",
    "explanations": [
      {
        "option": "こんしゅう",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 今週, meaning \"this week\""
      },
      {
        "option": "いましゅう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 今週"
      },
      {
        "option": "きんしゅう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 今週"
      },
      {
        "option": "こんす",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 今週"
      }
    ],
    "verification": true
  },
  {
    "id": 89,
    "sentence": "あたらしい映画をみました。",
    "englishTranslation": "I watched a new movie.",
    "underlinedKanji": "映画",
    "kanjiPosition": 5,
    "options": [
      "えいが",
      "えいかく",
      "いが",
      "ようが"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "映画 (えいが) - movie",
    "explanations": [
      {
        "option": "えいが",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 映画, meaning \"movie\""
      },
      {
        "option": "えいかく",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 映画"
      },
      {
        "option": "いが",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 映画"
      },
      {
        "option": "ようが",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 映画"
      }
    ],
    "verification": true
  },
  {
    "id": 90,
    "sentence": "しゃしんを撮るました。",
    "englishTranslation": "I took a photo.",
    "underlinedKanji": "撮る",
    "kanjiPosition": 5,
    "options": [
      "とる",
      "さつ",
      "うつ",
      "どる"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "撮る (とる) - to take a photo or record a film",
    "explanations": [
      {
        "option": "とる",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 撮る, meaning \"to take (photo)\""
      },
      {
        "option": "さつ",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not used for the verb 撮る"
      },
      {
        "option": "うつ",
        "isCorrect": false,
        "reasoning": "This means \"to hit\" but not the reading for 撮る"
      },
      {
        "option": "どる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 撮る"
      }
    ],
    "verification": true
  },
  {
    "id": 91,
    "sentence": "黒いくるまがほしいです。",
    "englishTranslation": "I want a black car.",
    "underlinedKanji": "黒い",
    "kanjiPosition": 0,
    "options": [
      "くろい",
      "こくい",
      "きろい",
      "ぐろい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "黒い (くろい) - black",
    "explanations": [
      {
        "option": "くろい",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 黒い, meaning \"black\""
      },
      {
        "option": "こくい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 黒い"
      },
      {
        "option": "きろい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 黒い"
      },
      {
        "option": "ぐろい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 黒い"
      }
    ],
    "verification": true
  },
  {
    "id": 92,
    "sentence": "自転車でがっこうにいきます。",
    "englishTranslation": "I go to school by bicycle.",
    "underlinedKanji": "自転車",
    "kanjiPosition": 0,
    "options": [
      "じてんしゃ",
      "しでんしゃ",
      "じでんしゃ",
      "じころしゃ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "自転車 (じてんしゃ) - Bicycle",
    "explanations": [
      {
        "option": "じてんしゃ",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 自転車, meaning \"bicycle\""
      },
      {
        "option": "しでんしゃ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 自転車"
      },
      {
        "option": "じでんしゃ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 自転車"
      },
      {
        "option": "じころしゃ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 自転車"
      }
    ],
    "verification": true
  },
  {
    "id": 93,
    "sentence": "あの人はだれですか。",
    "englishTranslation": "Who is that person?",
    "underlinedKanji": "人",
    "kanjiPosition": 2,
    "options": [
      "ひと",
      "じん",
      "にん",
      "びと"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "人 (ひと) - person",
    "explanations": [
      {
        "option": "ひと",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 人, meaning \"person\""
      },
      {
        "option": "じん",
        "isCorrect": false,
        "reasoning": "This is an on-yomi used in compounds but not for \"person\""
      },
      {
        "option": "にん",
        "isCorrect": false,
        "reasoning": "This is an on-yomi used for counting people but not for \"person\""
      },
      {
        "option": "びと",
        "isCorrect": false,
        "reasoning": "This is not a standard reading for 人"
      }
    ],
    "verification": true
  },
  {
    "id": 94,
    "sentence": "この甘いケーキがすきです。",
    "englishTranslation": "I like this sweet cake.",
    "underlinedKanji": "甘い",
    "kanjiPosition": 2,
    "options": [
      "あまい",
      "かんい",
      "あめい",
      "うまい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "甘い (あまい) - sweet",
    "explanations": [
      {
        "option": "あまい",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 甘い, meaning \"sweet\""
      },
      {
        "option": "かんい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 甘い"
      },
      {
        "option": "あめい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 甘い"
      },
      {
        "option": "うまい",
        "isCorrect": false,
        "reasoning": "This means \"delicious\" but not the reading for 甘い"
      }
    ],
    "verification": true
  },
  {
    "id": 95,
    "sentence": "じゅうじ半にあいましょう。",
    "englishTranslation": "Let's meet at half past ten.",
    "underlinedKanji": "半",
    "kanjiPosition": 4,
    "options": [
      "はん",
      "なか",
      "ぱん",
      "ばん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "半 (はん) - half",
    "explanations": [
      {
        "option": "はん",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 半, meaning \"half\""
      },
      {
        "option": "なか",
        "isCorrect": false,
        "reasoning": "This means \"middle\" but not the reading for 半"
      },
      {
        "option": "ぱん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 半"
      },
      {
        "option": "ばん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 半"
      }
    ],
    "verification": true
  },
  {
    "id": 96,
    "sentence": "友達とあそびました。",
    "englishTranslation": "I played with my friend.",
    "underlinedKanji": "友達",
    "kanjiPosition": 0,
    "options": [
      "ともだち",
      "ゆうたつ",
      "ともたつ",
      "ゆうだち"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "友達 (ともだち) - friend",
    "explanations": [
      {
        "option": "ともだち",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 友達, meaning \"friend\""
      },
      {
        "option": "ゆうたつ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 友達"
      },
      {
        "option": "ともたつ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 友達"
      },
      {
        "option": "ゆうだち",
        "isCorrect": false,
        "reasoning": "This means \"sudden shower\" but not the reading for 友達"
      }
    ],
    "verification": true
  },
  {
    "id": 97,
    "sentence": "交差点でとまってください。",
    "englishTranslation": "Please stop at the intersection.",
    "underlinedKanji": "交差点",
    "kanjiPosition": 0,
    "options": [
      "こうさてん",
      "こうしゃてん",
      "きょうさてん",
      "こさてん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "交差点 (こうさてん) - intersection",
    "explanations": [
      {
        "option": "こうさてん",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 交差点, meaning \"intersection\""
      },
      {
        "option": "こうしゃてん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 交差点"
      },
      {
        "option": "きょうさてん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 交差点"
      },
      {
        "option": "こさてん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 交差点"
      }
    ],
    "verification": true
  },
  {
    "id": 98,
    "sentence": "じゅぎょうが始まるました。",
    "englishTranslation": "Class began.",
    "underlinedKanji": "始まる",
    "kanjiPosition": 6,
    "options": [
      "はじまる",
      "しまる",
      "はしまる",
      "しはじまる"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "始まる (はじまる) - to begin",
    "explanations": [
      {
        "option": "はじまる",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 始まる, meaning \"to begin\""
      },
      {
        "option": "しまる",
        "isCorrect": false,
        "reasoning": "This means \"to close\" but not the reading for 始まる"
      },
      {
        "option": "はしまる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 始まる"
      },
      {
        "option": "しはじまる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 始まる"
      }
    ],
    "verification": true
  },
  {
    "id": 99,
    "sentence": "この冷たいのみものがおいしいです。",
    "englishTranslation": "This cold drink is delicious.",
    "underlinedKanji": "冷たい",
    "kanjiPosition": 2,
    "options": [
      "つめたい",
      "れいたい",
      "さむい",
      "ひやたい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "冷たい (つめたい) - cold to the touch",
    "explanations": [
      {
        "option": "つめたい",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 冷たい, meaning \"cold (to touch)\""
      },
      {
        "option": "れいたい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 冷たい"
      },
      {
        "option": "さむい",
        "isCorrect": false,
        "reasoning": "This means \"cold (weather)\" (寒い) but not the reading for 冷たい"
      },
      {
        "option": "ひやたい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 冷たい"
      }
    ],
    "verification": true
  },
  {
    "id": 100,
    "sentence": "わたしは背がたかいです。",
    "englishTranslation": "I am tall.",
    "underlinedKanji": "背",
    "kanjiPosition": 4,
    "options": [
      "せ",
      "はい",
      "うしろ",
      "そむ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "背 (せ) - height, stature",
    "explanations": [
      {
        "option": "せ",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 背, meaning \"height/stature\""
      },
      {
        "option": "はい",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not used for height"
      },
      {
        "option": "うしろ",
        "isCorrect": false,
        "reasoning": "This means \"behind\" but not the reading for 背"
      },
      {
        "option": "そむ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 背"
      }
    ],
    "verification": true
  },
  {
    "id": 101,
    "sentence": "果物をたべませんか。",
    "englishTranslation": "Would you like to eat some fruit?",
    "underlinedKanji": "果物",
    "kanjiPosition": 0,
    "options": [
      "くだもの",
      "かぶつ",
      "はたもの",
      "かもの"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "果物 (くだもの) - Fruit",
    "explanations": [
      {
        "option": "くだもの",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 果物, meaning \"fruit\""
      },
      {
        "option": "かぶつ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 果物"
      },
      {
        "option": "はたもの",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 果物"
      },
      {
        "option": "かもの",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 果物# N5 Kanji Reading Questions"
      }
    ],
    "verification": true
  },
  {
    "id": 102,
    "sentence": "きょうともだちと買うものをさがしました。",
    "englishTranslation": "Today I looked for things to buy with my friend.",
    "underlinedKanji": "買う",
    "kanjiPosition": 8,
    "options": [
      "かう",
      "こう",
      "ばう",
      "がう"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "買う (かう) - to buy",
    "explanations": [
      {
        "option": "かう",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 買う, meaning \"to buy\""
      },
      {
        "option": "こう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 買う"
      },
      {
        "option": "ばう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 買う"
      },
      {
        "option": "がう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 買う"
      }
    ],
    "verification": true
  },
  {
    "id": 103,
    "sentence": "このほんはとても古いです。",
    "englishTranslation": "This book is very old.",
    "underlinedKanji": "古い",
    "kanjiPosition": 8,
    "options": [
      "ふるい",
      "あたらしい",
      "おおい",
      "こい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "古い (ふるい) - old (not used for people)",
    "explanations": [
      {
        "option": "ふるい",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 古い, meaning \"old\""
      },
      {
        "option": "あたらしい",
        "isCorrect": false,
        "reasoning": "This means \"new\" (新しい), opposite of old"
      },
      {
        "option": "おおい",
        "isCorrect": false,
        "reasoning": "This reading doesn't match 古い"
      },
      {
        "option": "こい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 古い"
      }
    ],
    "verification": true
  },
  {
    "id": 104,
    "sentence": "せんせいのまえで立つことができません。",
    "englishTranslation": "I cannot stand in front of the teacher.",
    "underlinedKanji": "立つ",
    "kanjiPosition": 8,
    "options": [
      "たつ",
      "すつ",
      "りつ",
      "たち"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "立つ (たつ) - to stand",
    "explanations": [
      {
        "option": "たつ",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 立つ, meaning \"to stand\""
      },
      {
        "option": "すつ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 立つ"
      },
      {
        "option": "りつ",
        "isCorrect": false,
        "reasoning": "While this is an on-yomi for 立, it's not used for the verb 立つ"
      },
      {
        "option": "たち",
        "isCorrect": false,
        "reasoning": "This is not the correct reading for 立つ"
      }
    ],
    "verification": true
  },
  {
    "id": 105,
    "sentence": "あのひとの声はとてもおおきいです。",
    "englishTranslation": "That person's voice is very loud.",
    "underlinedKanji": "声",
    "kanjiPosition": 5,
    "options": [
      "こえ",
      "せい",
      "おと",
      "ね"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "声 (こえ) - Voice",
    "explanations": [
      {
        "option": "こえ",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 声, meaning \"voice\""
      },
      {
        "option": "せい",
        "isCorrect": false,
        "reasoning": "While this is an on-yomi for 声, こえ is the standard reading"
      },
      {
        "option": "おと",
        "isCorrect": false,
        "reasoning": "This means \"sound\" (音) but not the reading for 声"
      },
      {
        "option": "ね",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 声"
      }
    ],
    "verification": true
  },
  {
    "id": 106,
    "sentence": "駅まであるいていきます。",
    "englishTranslation": "I will walk to the station.",
    "underlinedKanji": "駅",
    "kanjiPosition": 0,
    "options": [
      "えき",
      "いき",
      "やく",
      "えく"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "駅 (えき) - station",
    "explanations": [
      {
        "option": "えき",
        "isCorrect": true,
        "reasoning": "This is the correct on-yomi reading for 駅, meaning \"station\""
      },
      {
        "option": "いき",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 駅"
      },
      {
        "option": "やく",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 駅"
      },
      {
        "option": "えく",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 駅"
      }
    ],
    "verification": true
  },
  {
    "id": 107,
    "sentence": "これは何ですか。",
    "englishTranslation": "What is this?",
    "underlinedKanji": "何",
    "kanjiPosition": 3,
    "options": [
      "なん",
      "なに",
      "か",
      "どう"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "何 (なん) - what",
    "explanations": [
      {
        "option": "なん",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 何 before です"
      },
      {
        "option": "なに",
        "isCorrect": false,
        "reasoning": "While なに is also a reading for 何, なん is used before です"
      },
      {
        "option": "か",
        "isCorrect": false,
        "reasoning": "This is not a reading for 何"
      },
      {
        "option": "どう",
        "isCorrect": false,
        "reasoning": "This means \"how\" (どう) but not the reading for 何"
      }
    ],
    "verification": true
  },
  {
    "id": 108,
    "sentence": "なつに海にいきました。",
    "englishTranslation": "I went to the sea in summer.",
    "underlinedKanji": "海",
    "kanjiPosition": 3,
    "options": [
      "うみ",
      "かい",
      "みず",
      "いけ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "海 (うみ) - sea",
    "explanations": [
      {
        "option": "うみ",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 海, meaning \"sea\""
      },
      {
        "option": "かい",
        "isCorrect": false,
        "reasoning": "While this is an on-yomi for 海, うみ is the standard reading"
      },
      {
        "option": "みず",
        "isCorrect": false,
        "reasoning": "This means \"water\" (水) but not the reading for 海"
      },
      {
        "option": "いけ",
        "isCorrect": false,
        "reasoning": "This means \"pond\" (池) but not the reading for 海"
      }
    ],
    "verification": true
  },
  {
    "id": 109,
    "sentence": "このちかくに店がありますか。",
    "englishTranslation": "Is there a shop near here?",
    "underlinedKanji": "店",
    "kanjiPosition": 6,
    "options": [
      "みせ",
      "てん",
      "たな",
      "いえ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "店 (みせ) - shop",
    "explanations": [
      {
        "option": "みせ",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 店, meaning \"shop\""
      },
      {
        "option": "てん",
        "isCorrect": false,
        "reasoning": "While this is an on-yomi for 店, みせ is the standard reading for shop"
      },
      {
        "option": "たな",
        "isCorrect": false,
        "reasoning": "This means \"shelf\" (棚) but not the reading for 店"
      },
      {
        "option": "いえ",
        "isCorrect": false,
        "reasoning": "This means \"house\" (家) but not the reading for 店"
      }
    ],
    "verification": true
  },
  {
    "id": 110,
    "sentence": "きれいな花をもらいました。",
    "englishTranslation": "I received beautiful flowers.",
    "underlinedKanji": "花",
    "kanjiPosition": 4,
    "options": [
      "はな",
      "か",
      "ばな",
      "はば"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "花 (はな) - flower",
    "explanations": [
      {
        "option": "はな",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 花, meaning \"flower\""
      },
      {
        "option": "か",
        "isCorrect": false,
        "reasoning": "While this is an on-yomi for 花, はな is the standard reading"
      },
      {
        "option": "ばな",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 花"
      },
      {
        "option": "はば",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 花"
      }
    ],
    "verification": true
  },
  {
    "id": 111,
    "sentence": "外はさむいです。",
    "englishTranslation": "It's cold outside.",
    "underlinedKanji": "外",
    "kanjiPosition": 0,
    "options": [
      "そと",
      "がい",
      "うち",
      "した"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "外 (そと) - Outside",
    "explanations": [
      {
        "option": "そと",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 外, meaning \"outside\""
      },
      {
        "option": "がい",
        "isCorrect": false,
        "reasoning": "While this is an on-yomi for 外, そと is the standard reading for \"outside\""
      },
      {
        "option": "うち",
        "isCorrect": false,
        "reasoning": "This means \"inside\" (内) but not the reading for 外"
      },
      {
        "option": "した",
        "isCorrect": false,
        "reasoning": "This means \"under\" (下) but not the reading for 外"
      }
    ],
    "verification": true
  },
  {
    "id": 112,
    "sentence": "このことをもう知るていました。",
    "englishTranslation": "I already knew about this.",
    "underlinedKanji": "知る",
    "kanjiPosition": 7,
    "options": [
      "しる",
      "ちる",
      "しり",
      "きる"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "知る (しる) - to know",
    "explanations": [
      {
        "option": "しる",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 知る, meaning \"to know\""
      },
      {
        "option": "ちる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 知る"
      },
      {
        "option": "しり",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 知る"
      },
      {
        "option": "きる",
        "isCorrect": false,
        "reasoning": "This means \"to cut\" (切る) but not the reading for 知る"
      }
    ],
    "verification": true
  },
  {
    "id": 113,
    "sentence": "がっこうの門のまえでまっています。",
    "englishTranslation": "I'm waiting in front of the school gate.",
    "underlinedKanji": "門",
    "kanjiPosition": 5,
    "options": [
      "もん",
      "かど",
      "と",
      "どあ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "門 (もん) - gate",
    "explanations": [
      {
        "option": "もん",
        "isCorrect": true,
        "reasoning": "This is the correct on-yomi reading for 門, meaning \"gate\""
      },
      {
        "option": "かど",
        "isCorrect": false,
        "reasoning": "This means \"corner\" (角) but not the reading for 門"
      },
      {
        "option": "と",
        "isCorrect": false,
        "reasoning": "This means \"door\" (戸) but not the reading for 門"
      },
      {
        "option": "どあ",
        "isCorrect": false,
        "reasoning": "This means \"door\" (ドア) but not the reading for 門"
      }
    ],
    "verification": true
  },
  {
    "id": 114,
    "sentence": "誰がこれをつくりましたか。",
    "englishTranslation": "Who made this?",
    "underlinedKanji": "誰",
    "kanjiPosition": 0,
    "options": [
      "だれ",
      "たれ",
      "すい",
      "どの"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "誰 (だれ) - who",
    "explanations": [
      {
        "option": "だれ",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 誰, meaning \"who\""
      },
      {
        "option": "たれ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 誰"
      },
      {
        "option": "すい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 誰"
      },
      {
        "option": "どの",
        "isCorrect": false,
        "reasoning": "This means \"which\" but not the reading for 誰"
      }
    ],
    "verification": true
  },
  {
    "id": 115,
    "sentence": "まいあさろくじに起きるです。",
    "englishTranslation": "I get up at 6 o'clock every morning.",
    "underlinedKanji": "起きる",
    "kanjiPosition": 8,
    "options": [
      "おきる",
      "あきる",
      "たきる",
      "ひきる"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "起きる (おきる) - to get up",
    "explanations": [
      {
        "option": "おきる",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 起きる, meaning \"to get up\""
      },
      {
        "option": "あきる",
        "isCorrect": false,
        "reasoning": "This means \"to get tired of\" (飽きる) but not the reading for 起きる"
      },
      {
        "option": "たきる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 起きる"
      },
      {
        "option": "ひきる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 起きる"
      }
    ],
    "verification": true
  },
  {
    "id": 116,
    "sentence": "わたしの部屋はせまいです。",
    "englishTranslation": "My room is small.",
    "underlinedKanji": "部屋",
    "kanjiPosition": 4,
    "options": [
      "へや",
      "ぶや",
      "べや",
      "ぺや"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "部屋 (へや) - room",
    "explanations": [
      {
        "option": "へや",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 部屋, meaning \"room\""
      },
      {
        "option": "ぶや",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 部屋"
      },
      {
        "option": "べや",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 部屋"
      },
      {
        "option": "ぺや",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 部屋"
      }
    ],
    "verification": true
  },
  {
    "id": 117,
    "sentence": "台所でりょうりをつくります。",
    "englishTranslation": "I cook in the kitchen.",
    "underlinedKanji": "台所",
    "kanjiPosition": 0,
    "options": [
      "だいどころ",
      "たいしょ",
      "だいしょ",
      "たいどころ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "台所 (だいどころ) - kitchen",
    "explanations": [
      {
        "option": "だいどころ",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 台所, meaning \"kitchen\""
      },
      {
        "option": "たいしょ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 台所"
      },
      {
        "option": "だいしょ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 台所"
      },
      {
        "option": "たいどころ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 台所"
      }
    ],
    "verification": true
  },
  {
    "id": 118,
    "sentence": "こうえんに池があります。",
    "englishTranslation": "There is a pond in the park.",
    "underlinedKanji": "池",
    "kanjiPosition": 5,
    "options": [
      "いけ",
      "ち",
      "みず",
      "うみ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "池 (いけ) - pond",
    "explanations": [
      {
        "option": "いけ",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 池, meaning \"pond\""
      },
      {
        "option": "ち",
        "isCorrect": false,
        "reasoning": "While this is an on-yomi for 池, いけ is the standard reading"
      },
      {
        "option": "みず",
        "isCorrect": false,
        "reasoning": "This means \"water\" (水) but not the reading for 池"
      },
      {
        "option": "うみ",
        "isCorrect": false,
        "reasoning": "This means \"sea\" (海) but not the reading for 池"
      }
    ],
    "verification": true
  },
  {
    "id": 119,
    "sentence": "ははがうちに居る。",
    "englishTranslation": "Mother is at home.",
    "underlinedKanji": "居る",
    "kanjiPosition": 6,
    "options": [
      "いる",
      "ある",
      "おる",
      "きる"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "居る (いる) - to be, to have (used for people and animals)",
    "explanations": [
      {
        "option": "いる",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 居る, meaning \"to be\" (for people/animals)"
      },
      {
        "option": "ある",
        "isCorrect": false,
        "reasoning": "This means \"to be\" (for things) but not the reading for 居る"
      },
      {
        "option": "おる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 居る"
      },
      {
        "option": "きる",
        "isCorrect": false,
        "reasoning": "This means \"to wear\" (着る) but not the reading for 居る"
      }
    ],
    "verification": true
  },
  {
    "id": 120,
    "sentence": "ともだちにほんを渡すました。",
    "englishTranslation": "I handed a book to my friend.",
    "underlinedKanji": "渡す",
    "kanjiPosition": 8,
    "options": [
      "わたす",
      "とす",
      "わたし",
      "どす"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "渡す (わたす) - to hand over",
    "explanations": [
      {
        "option": "わたす",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 渡す, meaning \"to hand over\""
      },
      {
        "option": "とす",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 渡す"
      },
      {
        "option": "わたし",
        "isCorrect": false,
        "reasoning": "This means \"I\" but not the reading for 渡す"
      },
      {
        "option": "どす",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 渡す"
      }
    ],
    "verification": true
  },
  {
    "id": 121,
    "sentence": "つぎのかどを曲るてください。",
    "englishTranslation": "Please turn at the next corner.",
    "underlinedKanji": "曲る",
    "kanjiPosition": 6,
    "options": [
      "まがる",
      "きょくる",
      "くる",
      "わる"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "曲る (まがる) - to turn,to bend",
    "explanations": [
      {
        "option": "まがる",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 曲る, meaning \"to turn/bend\""
      },
      {
        "option": "きょくる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 曲る"
      },
      {
        "option": "くる",
        "isCorrect": false,
        "reasoning": "This means \"to come\" but not the reading for 曲る"
      },
      {
        "option": "わる",
        "isCorrect": false,
        "reasoning": "This means \"to break\" but not the reading for 曲る"
      }
    ],
    "verification": true
  },
  {
    "id": 122,
    "sentence": "この黄色いはながすきです。",
    "englishTranslation": "I like this yellow flower.",
    "underlinedKanji": "黄色い",
    "kanjiPosition": 2,
    "options": [
      "きいろい",
      "きろい",
      "おういろい",
      "あかい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "黄色い (きいろい) - yellow",
    "explanations": [
      {
        "option": "きいろい",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 黄色い, meaning \"yellow\""
      },
      {
        "option": "きろい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 黄色い"
      },
      {
        "option": "おういろい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 黄色い"
      },
      {
        "option": "あかい",
        "isCorrect": false,
        "reasoning": "This means \"red\" (赤い) but not the reading for 黄色い"
      }
    ],
    "verification": true
  },
  {
    "id": 123,
    "sentence": "たかい建物がみえます。",
    "englishTranslation": "I can see a tall building.",
    "underlinedKanji": "建物",
    "kanjiPosition": 3,
    "options": [
      "たてもの",
      "けんぶつ",
      "たちもの",
      "きんもの"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "建物 (たてもの) - building",
    "explanations": [
      {
        "option": "たてもの",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 建物, meaning \"building\""
      },
      {
        "option": "けんぶつ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 建物"
      },
      {
        "option": "たちもの",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 建物"
      },
      {
        "option": "きんもの",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 建物"
      }
    ],
    "verification": true
  },
  {
    "id": 124,
    "sentence": "きょうはしごとが大変でした。",
    "englishTranslation": "Work was difficult today.",
    "underlinedKanji": "大変",
    "kanjiPosition": 8,
    "options": [
      "たいへん",
      "だいへん",
      "おおへん",
      "たへん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "大変 (たいへん) - difficult situation",
    "explanations": [
      {
        "option": "たいへん",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 大変, meaning \"difficult/terrible\""
      },
      {
        "option": "だいへん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 大変"
      },
      {
        "option": "おおへん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 大変"
      },
      {
        "option": "たへん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 大変"
      }
    ],
    "verification": true
  },
  {
    "id": 125,
    "sentence": "らいげつの二十日にあいましょう。",
    "englishTranslation": "Let's meet on the 20th of next month.",
    "underlinedKanji": "二十日",
    "kanjiPosition": 5,
    "options": [
      "はつか",
      "にじゅうにち",
      "ふつか",
      "にじゅか"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "二十日 (はつか) - twenty days,twentieth",
    "explanations": [
      {
        "option": "はつか",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 二十日, meaning \"20th day\""
      },
      {
        "option": "にじゅうにち",
        "isCorrect": false,
        "reasoning": "While this could be read this way, はつか is the standard reading"
      },
      {
        "option": "ふつか",
        "isCorrect": false,
        "reasoning": "This means \"2nd day\" (二日) but not the reading for 二十日"
      },
      {
        "option": "にじゅか",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 二十日"
      }
    ],
    "verification": true
  },
  {
    "id": 126,
    "sentence": "あしたともだちと行くます。",
    "englishTranslation": "I will go with my friend tomorrow.",
    "underlinedKanji": "行く",
    "kanjiPosition": 8,
    "options": [
      "いく",
      "ゆく",
      "こう",
      "ぎょう"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "行く (いく) - to go",
    "explanations": [
      {
        "option": "いく",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 行く, meaning \"to go\""
      },
      {
        "option": "ゆく",
        "isCorrect": false,
        "reasoning": "While this is also a reading for 行く, いく is more common"
      },
      {
        "option": "こう",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not used for the verb 行く"
      },
      {
        "option": "ぎょう",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not used for the verb 行く"
      }
    ],
    "verification": true
  },
  {
    "id": 127,
    "sentence": "昼御飯をたべませんでした。",
    "englishTranslation": "I didn't eat lunch.",
    "underlinedKanji": "昼御飯",
    "kanjiPosition": 0,
    "options": [
      "ひるごはん",
      "ちゅうごはん",
      "あさごはん",
      "ばんごはん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "昼御飯 (ひるごはん) - midday meal",
    "explanations": [
      {
        "option": "ひるごはん",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 昼御飯, meaning \"lunch\""
      },
      {
        "option": "ちゅうごはん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 昼御飯"
      },
      {
        "option": "あさごはん",
        "isCorrect": false,
        "reasoning": "This means \"breakfast\" (朝御飯) but not the reading for 昼御飯"
      },
      {
        "option": "ばんごはん",
        "isCorrect": false,
        "reasoning": "This means \"dinner\" (晩御飯) but not the reading for 昼御飯"
      }
    ],
    "verification": true
  },
  {
    "id": 128,
    "sentence": "りんごを半分にきりました。",
    "englishTranslation": "I cut the apple in half.",
    "underlinedKanji": "半分",
    "kanjiPosition": 4,
    "options": [
      "はんぶん",
      "はんふん",
      "なかぶん",
      "べつぶん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "半分 (はんぶん) - half minute",
    "explanations": [
      {
        "option": "はんぶん",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 半分, meaning \"half\""
      },
      {
        "option": "はんふん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 半分"
      },
      {
        "option": "なかぶん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 半分"
      },
      {
        "option": "べつぶん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 半分"
      }
    ],
    "verification": true
  },
  {
    "id": 129,
    "sentence": "お手洗いはどこですか。",
    "englishTranslation": "Where is the bathroom?",
    "underlinedKanji": "お手洗い",
    "kanjiPosition": 0,
    "options": [
      "おてあらい",
      "おでんらい",
      "おてがらい",
      "おであらい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "お手洗い (おてあらい) - bathroom",
    "explanations": [
      {
        "option": "おてあらい",
        "isCorrect": true,
        "reasoning": "This is the correct reading for お手洗い, meaning \"bathroom\""
      },
      {
        "option": "おでんらい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for お手洗い"
      },
      {
        "option": "おてがらい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for お手洗い"
      }
    ],
    "verification": true
  },
  {
    "id": 130,
    "sentence": "紅茶をのみませんか。",
    "englishTranslation": "Would you like to drink black tea?",
    "underlinedKanji": "紅茶",
    "kanjiPosition": 0,
    "options": [
      "こうちゃ",
      "べにちゃ",
      "くろちゃ",
      "あかちゃ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "紅茶 (こうちゃ) - black tea",
    "explanations": [
      {
        "option": "こうちゃ",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 紅茶, meaning \"black tea\""
      },
      {
        "option": "べにちゃ",
        "isCorrect": false,
        "reasoning": "While 紅 can be read べに, this combination is not used for tea"
      },
      {
        "option": "くろちゃ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 紅茶"
      },
      {
        "option": "あかちゃ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 紅茶"
      }
    ],
    "verification": true
  },
  {
    "id": 131,
    "sentence": "金曜日にともだちとあいます。",
    "englishTranslation": "I will meet with my friend on Friday.",
    "underlinedKanji": "金曜日",
    "kanjiPosition": 0,
    "options": [
      "きんようび",
      "かねようび",
      "きむようび",
      "ごるようび"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "金曜日 (きんようび) - Friday",
    "explanations": [
      {
        "option": "きんようび",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 金曜日, meaning \"Friday\""
      },
      {
        "option": "かねようび",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 金曜日"
      },
      {
        "option": "きむようび",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 金曜日"
      },
      {
        "option": "ごるようび",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 金曜日"
      }
    ],
    "verification": true
  },
  {
    "id": 132,
    "sentence": "あの男のひとはだれですか。",
    "englishTranslation": "Who is that man?",
    "underlinedKanji": "男",
    "kanjiPosition": 2,
    "options": [
      "おとこ",
      "だん",
      "なん",
      "おんな"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "男 (おとこ) - Man",
    "explanations": [
      {
        "option": "おとこ",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 男, meaning \"man\""
      },
      {
        "option": "だん",
        "isCorrect": false,
        "reasoning": "While this is an on-yomi for 男, おとこ is the standard reading"
      },
      {
        "option": "なん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 男"
      },
      {
        "option": "おんな",
        "isCorrect": false,
        "reasoning": "This means \"woman\" (女) but not the reading for 男"
      }
    ],
    "verification": true
  },
  {
    "id": 133,
    "sentence": "ゆきは白いです。",
    "englishTranslation": "Snow is white.",
    "underlinedKanji": "白い",
    "kanjiPosition": 3,
    "options": [
      "しろい",
      "はくい",
      "きろい",
      "くろい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "白い (しろい) - White",
    "explanations": [
      {
        "option": "しろい",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 白い, meaning \"white\""
      },
      {
        "option": "はくい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 白い"
      },
      {
        "option": "きろい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 白い"
      },
      {
        "option": "くろい",
        "isCorrect": false,
        "reasoning": "This means \"black\" (黒い) but not the reading for 白い"
      }
    ],
    "verification": true
  },
  {
    "id": 134,
    "sentence": "がっこうの側にすんでいます。",
    "englishTranslation": "I live near the school.",
    "underlinedKanji": "側",
    "kanjiPosition": 5,
    "options": [
      "そば",
      "そく",
      "がわ",
      "きわ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "側 (そば) - near, beside",
    "explanations": [
      {
        "option": "そば",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 側, meaning \"near/beside\""
      },
      {
        "option": "そく",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not the standard reading for this usage"
      },
      {
        "option": "がわ",
        "isCorrect": false,
        "reasoning": "This reading is used in some compounds but not for \"near\""
      },
      {
        "option": "きわ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 側"
      }
    ],
    "verification": true
  },
  {
    "id": 135,
    "sentence": "おんがくを聞くのがすきです。",
    "englishTranslation": "I like listening to music.",
    "underlinedKanji": "聞く",
    "kanjiPosition": 5,
    "options": [
      "きく",
      "ぶん",
      "もん",
      "きき"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "聞く (きく) - to hear, to listen to, to ask",
    "explanations": [
      {
        "option": "きく",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 聞く, meaning \"to hear/listen\""
      },
      {
        "option": "ぶん",
        "isCorrect": false,
        "reasoning": "This is not a reading for 聞く"
      },
      {
        "option": "もん",
        "isCorrect": false,
        "reasoning": "This is not a reading for 聞く"
      },
      {
        "option": "きき",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 聞く"
      }
    ],
    "verification": true
  },
  {
    "id": 136,
    "sentence": "にほんごを出来るようになりました。",
    "englishTranslation": "I became able to speak Japanese.",
    "underlinedKanji": "出来る",
    "kanjiPosition": 5,
    "options": [
      "できる",
      "でくる",
      "しゅつらい",
      "だくる"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "出来る (できる) - to be able to",
    "explanations": [
      {
        "option": "できる",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 出来る, meaning \"to be able to\""
      },
      {
        "option": "でくる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 出来る"
      },
      {
        "option": "しゅつらい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 出来る"
      },
      {
        "option": "だくる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 出来る"
      }
    ],
    "verification": true
  },
  {
    "id": 137,
    "sentence": "この新しいほんをよみました。",
    "englishTranslation": "I read this new book.",
    "underlinedKanji": "新しい",
    "kanjiPosition": 2,
    "options": [
      "あたらしい",
      "しんしい",
      "あらしい",
      "ふるしい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "新しい (あたらしい) - new",
    "explanations": [
      {
        "option": "あたらしい",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 新しい, meaning \"new\""
      },
      {
        "option": "しんしい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 新しい"
      },
      {
        "option": "あらしい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 新しい"
      },
      {
        "option": "ふるしい",
        "isCorrect": false,
        "reasoning": "This would mean \"old\" but is not the reading for 新しい"
      }
    ],
    "verification": true
  },
  {
    "id": 138,
    "sentence": "隣のひとはしんせつです。",
    "englishTranslation": "The person next door is kind.",
    "underlinedKanji": "隣",
    "kanjiPosition": 0,
    "options": [
      "となり",
      "りん",
      "ちかく",
      "まえ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "隣 (となり) - next door to",
    "explanations": [
      {
        "option": "となり",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 隣, meaning \"next door\""
      },
      {
        "option": "りん",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not the standard reading for neighbor"
      },
      {
        "option": "ちかく",
        "isCorrect": false,
        "reasoning": "This means \"near\" but not the reading for 隣"
      },
      {
        "option": "まえ",
        "isCorrect": false,
        "reasoning": "This means \"front\" (前) but not the reading for 隣"
      }
    ],
    "verification": true
  },
  {
    "id": 139,
    "sentence": "口をあけてください。",
    "englishTranslation": "Please open your mouth.",
    "underlinedKanji": "口",
    "kanjiPosition": 0,
    "options": [
      "くち",
      "こう",
      "ぐち",
      "くつ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "口 (くち) - mouth, opening",
    "explanations": [
      {
        "option": "くち",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 口, meaning \"mouth\""
      },
      {
        "option": "こう",
        "isCorrect": false,
        "reasoning": "While this is an on-yomi for 口, くち is the standard reading"
      },
      {
        "option": "ぐち",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 口"
      },
      {
        "option": "くつ",
        "isCorrect": false,
        "reasoning": "This means \"shoes\" (靴) but not the reading for 口"
      }
    ],
    "verification": true
  },
  {
    "id": 140,
    "sentence": "地下鉄でかいしゃにいきます。",
    "englishTranslation": "I go to the company by subway.",
    "underlinedKanji": "地下鉄",
    "kanjiPosition": 0,
    "options": [
      "ちかてつ",
      "じかてつ",
      "ちげてつ",
      "ちかでん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "地下鉄 (ちかてつ) - underground train",
    "explanations": [
      {
        "option": "ちかてつ",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 地下鉄, meaning \"subway\""
      },
      {
        "option": "じかてつ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 地下鉄"
      },
      {
        "option": "ちげてつ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 地下鉄"
      }
    ],
    "verification": true
  },
  {
    "id": 141,
    "sentence": "きょうの天気はどうですか。",
    "englishTranslation": "How is the weather today?",
    "underlinedKanji": "天気",
    "kanjiPosition": 4,
    "options": [
      "てんき",
      "あめ",
      "はれ",
      "くもり"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "天気 (てんき) - weather",
    "explanations": [
      {
        "option": "てんき",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 天気, meaning \"weather\""
      },
      {
        "option": "あめ",
        "isCorrect": false,
        "reasoning": "This means \"rain\" (雨) but not the reading for 天気"
      },
      {
        "option": "はれ",
        "isCorrect": false,
        "reasoning": "This means \"clear weather\" (晴れ) but not the reading for 天気"
      },
      {
        "option": "くもり",
        "isCorrect": false,
        "reasoning": "This means \"cloudy\" (曇り) but not the reading for 天気"
      }
    ],
    "verification": true
  },
  {
    "id": 142,
    "sentence": "りんごを一つください。",
    "englishTranslation": "Please give me one apple.",
    "underlinedKanji": "一つ",
    "kanjiPosition": 4,
    "options": [
      "ひとつ",
      "いちつ",
      "いっつ",
      "ひつ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "一つ (ひとつ) - one",
    "explanations": [
      {
        "option": "ひとつ",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 一つ, meaning \"one (thing)\""
      },
      {
        "option": "いちつ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 一つ"
      },
      {
        "option": "いっつ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 一つ"
      },
      {
        "option": "ひつ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 一つ"
      }
    ],
    "verification": true
  },
  {
    "id": 143,
    "sentence": "すきな色はなんですか。",
    "englishTranslation": "What is your favorite color?",
    "underlinedKanji": "色",
    "kanjiPosition": 3,
    "options": [
      "いろ",
      "しき",
      "しょく",
      "ころ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "色 (いろ) - colour",
    "explanations": [
      {
        "option": "いろ",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 色, meaning \"color\""
      },
      {
        "option": "しき",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not the standard reading for \"color\""
      },
      {
        "option": "しょく",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not the standard reading for \"color\""
      },
      {
        "option": "ころ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 色"
      }
    ],
    "verification": true
  },
  {
    "id": 144,
    "sentence": "こどもたちはお菓子がすきです。",
    "englishTranslation": "Children like sweets.",
    "underlinedKanji": "お菓子",
    "kanjiPosition": 6,
    "options": [
      "おかし",
      "おかこ",
      "おがし",
      "おけし"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "お菓子 (おかし) - sweets, candy",
    "explanations": [
      {
        "option": "おかし",
        "isCorrect": true,
        "reasoning": "This is the correct reading for お菓子, meaning \"sweets/candy\""
      },
      {
        "option": "おかこ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for お菓子"
      },
      {
        "option": "おがし",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for お菓子"
      },
      {
        "option": "おけし",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for お菓子"
      }
    ],
    "verification": true
  },
  {
    "id": 145,
    "sentence": "ほんやでほんを売るています。",
    "englishTranslation": "They are selling books at the bookstore.",
    "underlinedKanji": "売る",
    "kanjiPosition": 7,
    "options": [
      "うる",
      "ばい",
      "ばいる",
      "える"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "売る (うる) - to sell",
    "explanations": [
      {
        "option": "うる",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 売る, meaning \"to sell\""
      },
      {
        "option": "ばい",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not used for the verb 売る"
      },
      {
        "option": "ばいる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 売る"
      },
      {
        "option": "える",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 売る"
      }
    ],
    "verification": true
  },
  {
    "id": 146,
    "sentence": "今年はあつかったです。",
    "englishTranslation": "This year was hot.",
    "underlinedKanji": "今年",
    "kanjiPosition": 0,
    "options": [
      "ことし",
      "こんねん",
      "いまとし",
      "きんねん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "今年 (ことし) - this year",
    "explanations": [
      {
        "option": "ことし",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 今年, meaning \"this year\""
      },
      {
        "option": "こんねん",
        "isCorrect": false,
        "reasoning": "While this could be an on-yomi reading, ことし is standard"
      },
      {
        "option": "いまとし",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 今年"
      },
      {
        "option": "きんねん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 今年"
      }
    ],
    "verification": true
  },
  {
    "id": 147,
    "sentence": "雑誌をよむのがすきです。",
    "englishTranslation": "I like reading magazines.",
    "underlinedKanji": "雑誌",
    "kanjiPosition": 0,
    "options": [
      "ざっし",
      "ざつし",
      "まっし",
      "ざし"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "雑誌 (ざっし) - Magazine",
    "explanations": [
      {
        "option": "ざっし",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 雑誌, meaning \"magazine\""
      },
      {
        "option": "ざつし",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 雑誌"
      },
      {
        "option": "まっし",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 雑誌"
      },
      {
        "option": "ざし",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 雑誌"
      }
    ],
    "verification": true
  },
  {
    "id": 148,
    "sentence": "らいげつの八日にりょこうします。",
    "englishTranslation": "I will travel on the 8th of next month.",
    "underlinedKanji": "八日",
    "kanjiPosition": 5,
    "options": [
      "ようか",
      "はちにち",
      "やにち",
      "はっか"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "八日 (ようか) - eight days, eighth day of the month",
    "explanations": [
      {
        "option": "ようか",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 八日, meaning \"8th day\""
      },
      {
        "option": "はちにち",
        "isCorrect": false,
        "reasoning": "While this could be read this way, ようか is the standard reading"
      },
      {
        "option": "やにち",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 八日"
      },
      {
        "option": "はっか",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 八日"
      }
    ],
    "verification": true
  },
  {
    "id": 149,
    "sentence": "机のうえにほんがあります。",
    "englishTranslation": "There is a book on the desk.",
    "underlinedKanji": "机",
    "kanjiPosition": 0,
    "options": [
      "つくえ",
      "き",
      "つくい",
      "でき"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "机 (つくえ) - desk",
    "explanations": [
      {
        "option": "つくえ",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 机, meaning \"desk\""
      },
      {
        "option": "き",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not the standard reading for desk"
      },
      {
        "option": "つくい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 机"
      },
      {
        "option": "でき",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 机"
      }
    ],
    "verification": true
  },
  {
    "id": 150,
    "sentence": "たなかさんの奥さんはしんせつです。",
    "englishTranslation": "Mr. Tanaka's wife is kind.",
    "underlinedKanji": "奥さん",
    "kanjiPosition": 6,
    "options": [
      "おくさん",
      "おうさん",
      "おっさん",
      "おこさん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "奥さん (おくさん) - (honorable) wife",
    "explanations": [
      {
        "option": "おくさん",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 奥さん, meaning \"wife\" (polite)"
      },
      {
        "option": "おうさん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 奥さん"
      },
      {
        "option": "おっさん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 奥さん"
      },
      {
        "option": "おこさん",
        "isCorrect": false,
        "reasoning": "This means \"child\" (お子さん) but not the reading for 奥さん"
      }
    ],
    "verification": true
  },
  {
    "id": 151,
    "sentence": "地図をみながらあるきました。",
    "englishTranslation": "I walked while looking at the map.",
    "underlinedKanji": "地図",
    "kanjiPosition": 0,
    "options": [
      "ちず",
      "じず",
      "ちと",
      "とち"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "地図 (ちず) - map",
    "explanations": [
      {
        "option": "ちず",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 地図, meaning \"map\""
      },
      {
        "option": "じず",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 地図"
      },
      {
        "option": "ちと",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 地図"
      },
      {
        "option": "とち",
        "isCorrect": false,
        "reasoning": "This means \"land\" but not the reading for 地図"
      }
    ],
    "verification": true
  },
  {
    "id": 152,
    "sentence": "この文章はむずかしいです。",
    "englishTranslation": "This sentence is difficult.",
    "underlinedKanji": "文章",
    "kanjiPosition": 2,
    "options": [
      "ぶんしょう",
      "もんしょう",
      "ぶんそう",
      "ふんしょう"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "文章 (ぶんしょう) - sentence,text",
    "explanations": [
      {
        "option": "ぶんしょう",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 文章, meaning \"sentence/text\""
      },
      {
        "option": "もんしょう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 文章"
      },
      {
        "option": "ぶんそう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 文章"
      },
      {
        "option": "ふんしょう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 文章"
      }
    ],
    "verification": true
  },
  {
    "id": 153,
    "sentence": "荷物がおもいです。",
    "englishTranslation": "The luggage is heavy.",
    "underlinedKanji": "荷物",
    "kanjiPosition": 0,
    "options": [
      "にもつ",
      "かもつ",
      "にぶつ",
      "こもつ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "荷物 (にもつ) - luggage",
    "explanations": [
      {
        "option": "にもつ",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 荷物, meaning \"luggage\""
      },
      {
        "option": "かもつ",
        "isCorrect": false,
        "reasoning": "This means \"freight\" but not the reading for 荷物"
      },
      {
        "option": "にぶつ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 荷物"
      },
      {
        "option": "こもつ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 荷物"
      }
    ],
    "verification": true
  },
  {
    "id": 154,
    "sentence": "飛行機でとうきょうにいきます。",
    "englishTranslation": "I will go to Tokyo by airplane.",
    "underlinedKanji": "飛行機",
    "kanjiPosition": 0,
    "options": [
      "ひこうき",
      "とびこうき",
      "ひぎょうき",
      "ひこき"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "飛行機 (ひこうき) - aeroplane",
    "explanations": [
      {
        "option": "ひこうき",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 飛行機, meaning \"airplane\""
      },
      {
        "option": "とびこうき",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 飛行機"
      },
      {
        "option": "ひぎょうき",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 飛行機"
      }
    ],
    "verification": true
  },
  {
    "id": 155,
    "sentence": "鉛筆でかきました。",
    "englishTranslation": "I wrote with a pencil.",
    "underlinedKanji": "鉛筆",
    "kanjiPosition": 0,
    "options": [
      "えんぴつ",
      "えんひつ",
      "でんぴつ",
      "なまりぴつ"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "鉛筆 (えんぴつ) - pencil",
    "explanations": [
      {
        "option": "えんぴつ",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 鉛筆, meaning \"pencil\""
      },
      {
        "option": "えんひつ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 鉛筆"
      },
      {
        "option": "でんぴつ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 鉛筆"
      },
      {
        "option": "なまりぴつ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 鉛筆"
      }
    ],
    "verification": true
  },
  {
    "id": 156,
    "sentence": "目がいたいです。",
    "englishTranslation": "My eyes hurt.",
    "underlinedKanji": "目",
    "kanjiPosition": 0,
    "options": [
      "め",
      "もく",
      "ぼく",
      "が"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "目 (め) - eye",
    "explanations": [
      {
        "option": "め",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 目, meaning \"eye\""
      },
      {
        "option": "もく",
        "isCorrect": false,
        "reasoning": "While this is an on-yomi for 目, め is the standard reading"
      },
      {
        "option": "ぼく",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 目"
      },
      {
        "option": "が",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 目"
      }
    ],
    "verification": true
  },
  {
    "id": 157,
    "sentence": "先生におしえてもらいました。",
    "englishTranslation": "I was taught by the teacher.",
    "underlinedKanji": "先生",
    "kanjiPosition": 0,
    "options": [
      "せんせい",
      "せんしょう",
      "さきせい",
      "さきなま"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "先生 (せんせい) - teacher, doctor",
    "explanations": [
      {
        "option": "せんせい",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 先生, meaning \"teacher\""
      },
      {
        "option": "せんしょう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 先生"
      },
      {
        "option": "さきせい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 先生"
      },
      {
        "option": "さきなま",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 先生"
      }
    ],
    "verification": true
  },
  {
    "id": 158,
    "sentence": "次のでんしゃにのります。",
    "englishTranslation": "I will take the next train.",
    "underlinedKanji": "次",
    "kanjiPosition": 0,
    "options": [
      "つぎ",
      "じ",
      "し",
      "つき"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "次 (つぎ) - next",
    "explanations": [
      {
        "option": "つぎ",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 次, meaning \"next\""
      },
      {
        "option": "じ",
        "isCorrect": false,
        "reasoning": "While this is an on-yomi for 次, つぎ is the standard reading"
      },
      {
        "option": "し",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 次"
      },
      {
        "option": "つき",
        "isCorrect": false,
        "reasoning": "This means \"moon\" (月) but not the reading for 次"
      }
    ],
    "verification": true
  },
  {
    "id": 159,
    "sentence": "四じにはじまります。",
    "englishTranslation": "It starts at four o'clock.",
    "underlinedKanji": "四",
    "kanjiPosition": 0,
    "options": [
      "し",
      "よん",
      "yon",
      "す"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "四 (し) - Four",
    "explanations": [
      {
        "option": "し",
        "isCorrect": true,
        "reasoning": "This is the correct on-yomi reading for 四, meaning \"four\""
      },
      {
        "option": "よん",
        "isCorrect": false,
        "reasoning": "While this is also a reading for 四, し is used before じ (o'clock)"
      },
      {
        "option": "yon",
        "isCorrect": false,
        "reasoning": "This is romaji, not hiragana"
      },
      {
        "option": "す",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 四"
      }
    ],
    "verification": true
  },
  {
    "id": 160,
    "sentence": "毎月ほんをかいます。",
    "englishTranslation": "I buy books every month.",
    "underlinedKanji": "毎月",
    "kanjiPosition": 0,
    "options": [
      "まいつき",
      "まいげつ",
      "まつき",
      "べいつき"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "毎月 (まいつき) - every month",
    "explanations": [
      {
        "option": "まいつき",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 毎月, meaning \"every month\""
      },
      {
        "option": "まいげつ",
        "isCorrect": false,
        "reasoning": "While this could be an alternate reading, まいつき is standard"
      },
      {
        "option": "まつき",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 毎月"
      },
      {
        "option": "べいつき",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 毎月"
      }
    ],
    "verification": true
  },
  {
    "id": 161,
    "sentence": "でんわの番号をおしえてください。",
    "englishTranslation": "Please tell me your phone number.",
    "underlinedKanji": "番号",
    "kanjiPosition": 4,
    "options": [
      "ばんごう",
      "ばんこう",
      "はんごう",
      "ぼんごう"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "番号 (ばんごう) - number",
    "explanations": [
      {
        "option": "ばんごう",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 番号, meaning \"number\""
      },
      {
        "option": "ばんこう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 番号"
      },
      {
        "option": "はんごう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 番号"
      },
      {
        "option": "ぼんごう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 番号"
      }
    ],
    "verification": true
  },
  {
    "id": 162,
    "sentence": "らいねんは年をとります。",
    "englishTranslation": "I will get older next year.",
    "underlinedKanji": "年",
    "kanjiPosition": 5,
    "options": [
      "とし",
      "ねん",
      "とち",
      "どし"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "年 (とし) - year",
    "explanations": [
      {
        "option": "とし",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 年, meaning \"year/age\""
      },
      {
        "option": "ねん",
        "isCorrect": false,
        "reasoning": "While this is an on-yomi for 年, とし is used for \"getting older\""
      },
      {
        "option": "とち",
        "isCorrect": false,
        "reasoning": "This means \"land\" but not the reading for 年"
      },
      {
        "option": "どし",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 年"
      }
    ],
    "verification": true
  },
  {
    "id": 163,
    "sentence": "一昨年にりょこうしました。",
    "englishTranslation": "I traveled the year before last.",
    "underlinedKanji": "一昨年",
    "kanjiPosition": 0,
    "options": [
      "おととし",
      "いっさくねん",
      "いちさくねん",
      "ひとつさくねん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "一昨年 (おととし) - year before last",
    "explanations": [
      {
        "option": "おととし",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 一昨年, meaning \"year before last\""
      },
      {
        "option": "いっさくねん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 一昨年"
      },
      {
        "option": "いちさくねん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 一昨年"
      },
      {
        "option": "ひとつさくねん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 一昨年"
      }
    ],
    "verification": true
  },
  {
    "id": 164,
    "sentence": "まどを閉めるてください。",
    "englishTranslation": "Please close the window.",
    "underlinedKanji": "閉める",
    "kanjiPosition": 3,
    "options": [
      "しめる",
      "とじる",
      "へいめる",
      "しまる"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "閉める (しめる) - to close something",
    "explanations": [
      {
        "option": "しめる",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 閉める, meaning \"to close\""
      },
      {
        "option": "とじる",
        "isCorrect": false,
        "reasoning": "This means \"to close\" (閉じる) but not the reading for 閉める"
      },
      {
        "option": "へいめる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 閉める"
      },
      {
        "option": "しまる",
        "isCorrect": false,
        "reasoning": "This means \"to close\" (intransitive) but not the reading for 閉める"
      }
    ],
    "verification": true
  },
  {
    "id": 165,
    "sentence": "おもしろい話をききました。",
    "englishTranslation": "I heard an interesting story.",
    "underlinedKanji": "話",
    "kanjiPosition": 5,
    "options": [
      "はなし",
      "わ",
      "だん",
      "ばなし"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "話 (はなし) - talk,story",
    "explanations": [
      {
        "option": "はなし",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 話, meaning \"story/talk\""
      },
      {
        "option": "わ",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not used for \"story\""
      },
      {
        "option": "だん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 話"
      },
      {
        "option": "ばなし",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 話"
      }
    ],
    "verification": true
  },
  {
    "id": 166,
    "sentence": "時計をみてください。",
    "englishTranslation": "Please look at the clock.",
    "underlinedKanji": "時計",
    "kanjiPosition": 0,
    "options": [
      "とけい",
      "じけい",
      "ときけい",
      "しけい"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "時計 (とけい) - watch,clock",
    "explanations": [
      {
        "option": "とけい",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 時計, meaning \"clock/watch\""
      },
      {
        "option": "じけい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 時計"
      },
      {
        "option": "ときけい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 時計"
      },
      {
        "option": "しけい",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 時計"
      }
    ],
    "verification": true
  },
  {
    "id": 167,
    "sentence": "このみちは危ないです。",
    "englishTranslation": "This road is dangerous.",
    "underlinedKanji": "危ない",
    "kanjiPosition": 5,
    "options": [
      "あぶない",
      "きけん",
      "やばい",
      "あやない"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "危ない (あぶない) - dangerous",
    "explanations": [
      {
        "option": "あぶない",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 危ない, meaning \"dangerous\""
      },
      {
        "option": "きけん",
        "isCorrect": false,
        "reasoning": "This means \"danger\" (危険) but not the reading for 危ない"
      },
      {
        "option": "やばい",
        "isCorrect": false,
        "reasoning": "This is slang for \"dangerous\" but not the reading for 危ない"
      },
      {
        "option": "あやない",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 危ない"
      }
    ],
    "verification": true
  },
  {
    "id": 168,
    "sentence": "八百屋でやさいをかいました。",
    "englishTranslation": "I bought vegetables at the greengrocer.",
    "underlinedKanji": "八百屋",
    "kanjiPosition": 0,
    "options": [
      "やおや",
      "はっぴゃくや",
      "やひゃくや",
      "はちひゃくや"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "八百屋 (やおや) - greengrocer",
    "explanations": [
      {
        "option": "やおや",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 八百屋, meaning \"greengrocer\""
      },
      {
        "option": "はっぴゃくや",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 八百屋"
      },
      {
        "option": "やひゃくや",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 八百屋"
      },
      {
        "option": "はちひゃくや",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 八百屋"
      }
    ],
    "verification": true
  },
  {
    "id": 169,
    "sentence": "歯がいたいです。",
    "englishTranslation": "My tooth hurts.",
    "underlinedKanji": "歯",
    "kanjiPosition": 0,
    "options": [
      "は",
      "し",
      "が",
      "ば"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "歯 (は) - tooth",
    "explanations": [
      {
        "option": "は",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 歯, meaning \"tooth\""
      },
      {
        "option": "し",
        "isCorrect": false,
        "reasoning": "While this is an on-yomi for 歯, は is the standard reading"
      },
      {
        "option": "が",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 歯"
      },
      {
        "option": "ば",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 歯"
      }
    ],
    "verification": true
  },
  {
    "id": 170,
    "sentence": "とりが鳴くています。",
    "englishTranslation": "The bird is singing.",
    "underlinedKanji": "鳴く",
    "kanjiPosition": 3,
    "options": [
      "なく",
      "めい",
      "りん",
      "ねく"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "鳴く (なく) - animal noise. to chirp, roar or croak etc.",
    "explanations": [
      {
        "option": "なく",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 鳴く, meaning \"to cry/sing (animals)\""
      },
      {
        "option": "めい",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not used for the verb 鳴く"
      },
      {
        "option": "りん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 鳴く"
      }
    ],
    "verification": true
  },
  {
    "id": 171,
    "sentence": "かぎを無くすてしまいました。",
    "englishTranslation": "I lost my keys.",
    "underlinedKanji": "無くす",
    "kanjiPosition": 3,
    "options": [
      "なくす",
      "むくす",
      "ぶくす",
      "まくす"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "無くす (なくす) - to lose something",
    "explanations": [
      {
        "option": "なくす",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 無くす, meaning \"to lose\""
      },
      {
        "option": "むくす",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 無くす"
      },
      {
        "option": "ぶくす",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 無くす"
      },
      {
        "option": "まくす",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 無くす"
      }
    ],
    "verification": true
  },
  {
    "id": 172,
    "sentence": "ピアノを弾くことができます。",
    "englishTranslation": "I can play the piano.",
    "underlinedKanji": "弾く",
    "kanjiPosition": 4,
    "options": [
      "ひく",
      "だん",
      "はじく",
      "とばす"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "弾く (ひく) - to play an instrument with strings, including piano",
    "explanations": [
      {
        "option": "ひく",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 弾く, meaning \"to play (instrument)\""
      },
      {
        "option": "だん",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not used for playing instruments"
      },
      {
        "option": "はじく",
        "isCorrect": false,
        "reasoning": "This means \"to flick\" but not the reading for 弾く"
      },
      {
        "option": "とばす",
        "isCorrect": false,
        "reasoning": "This means \"to fly\" but not the reading for 弾く"
      }
    ],
    "verification": true
  },
  {
    "id": 173,
    "sentence": "あめなので傘をもっていきます。",
    "englishTranslation": "Since it's raining, I'll take an umbrella.",
    "underlinedKanji": "傘",
    "kanjiPosition": 5,
    "options": [
      "かさ",
      "さん",
      "がさ",
      "から"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "傘 (かさ) - Umbrella",
    "explanations": [
      {
        "option": "かさ",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 傘, meaning \"umbrella\""
      },
      {
        "option": "さん",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not the standard reading for umbrella"
      },
      {
        "option": "がさ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 傘"
      },
      {
        "option": "から",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 傘"
      }
    ],
    "verification": true
  },
  {
    "id": 174,
    "sentence": "肉をたべるのがすきです。",
    "englishTranslation": "I like eating meat.",
    "underlinedKanji": "肉",
    "kanjiPosition": 0,
    "options": [
      "にく",
      "ろく",
      "じく",
      "りく"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "肉 (にく) - meat",
    "explanations": [
      {
        "option": "にく",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 肉, meaning \"meat\""
      },
      {
        "option": "ろく",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 肉"
      },
      {
        "option": "じく",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 肉"
      },
      {
        "option": "りく",
        "isCorrect": false,
        "reasoning": "This means \"land\" (陸) but not the reading for 肉"
      }
    ],
    "verification": true
  },
  {
    "id": 175,
    "sentence": "外国人のともだちがいます。",
    "englishTranslation": "I have a foreign friend.",
    "underlinedKanji": "外国人",
    "kanjiPosition": 0,
    "options": [
      "がいこくじん",
      "そとこくじん",
      "がいごくじん",
      "そとごくじん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "外国人 (がいこくじん) - Foreigner",
    "explanations": [
      {
        "option": "がいこくじん",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 外国人, meaning \"foreigner\""
      },
      {
        "option": "そとこくじん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 外国人"
      },
      {
        "option": "がいごくじん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 外国人"
      },
      {
        "option": "そとごくじん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 外国人"
      }
    ],
    "verification": true
  },
  {
    "id": 176,
    "sentence": "それは本当ですか。",
    "englishTranslation": "Is that true?",
    "underlinedKanji": "本当",
    "kanjiPosition": 3,
    "options": [
      "ほんとう",
      "ほんどう",
      "もとう",
      "ぽんとう"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "本当 (ほんとう) - truth",
    "explanations": [
      {
        "option": "ほんとう",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 本当, meaning \"truth/really\""
      },
      {
        "option": "ほんどう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 本当"
      },
      {
        "option": "もとう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 本当"
      },
      {
        "option": "ぽんとう",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 本当"
      }
    ],
    "verification": true
  },
  {
    "id": 177,
    "sentence": "おかねがなくて困るています。",
    "englishTranslation": "I'm troubled because I have no money.",
    "underlinedKanji": "困る",
    "kanjiPosition": 7,
    "options": [
      "こまる",
      "こんる",
      "くるしむ",
      "こむる"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "困る (こまる) - to be worried",
    "explanations": [
      {
        "option": "こまる",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 困る, meaning \"to be troubled\""
      },
      {
        "option": "こんる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 困る"
      },
      {
        "option": "くるしむ",
        "isCorrect": false,
        "reasoning": "This means \"to suffer\" (苦しむ) but not the reading for 困る"
      },
      {
        "option": "こむる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 困る"
      }
    ],
    "verification": true
  },
  {
    "id": 178,
    "sentence": "空があおいです。",
    "englishTranslation": "The sky is blue.",
    "underlinedKanji": "空",
    "kanjiPosition": 0,
    "options": [
      "そら",
      "くう",
      "から",
      "あき"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "空 (そら) - Sky",
    "explanations": [
      {
        "option": "そら",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 空, meaning \"sky\""
      },
      {
        "option": "くう",
        "isCorrect": false,
        "reasoning": "While this is an on-yomi for 空, そら is the standard reading for sky"
      },
      {
        "option": "から",
        "isCorrect": false,
        "reasoning": "This means \"empty\" but not the reading for 空 meaning sky"
      },
      {
        "option": "あき",
        "isCorrect": false,
        "reasoning": "This means \"autumn\" (秋) but not the reading for 空"
      }
    ],
    "verification": true
  },
  {
    "id": 179,
    "sentence": "万年筆でてがみをかきました。",
    "englishTranslation": "I wrote a letter with a fountain pen.",
    "underlinedKanji": "万年筆",
    "kanjiPosition": 0,
    "options": [
      "まんねんひつ",
      "まんとしひつ",
      "ばんねんひつ",
      "まんねんぺん"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "万年筆 (まんねんひつ) - fountain pen",
    "explanations": [
      {
        "option": "まんねんひつ",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 万年筆, meaning \"fountain pen\""
      },
      {
        "option": "まんとしひつ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 万年筆"
      },
      {
        "option": "ばんねんひつ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 万年筆"
      },
      {
        "option": "まんねんぺん",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 万年筆"
      }
    ],
    "verification": true
  },
  {
    "id": 180,
    "sentence": "木曜日にかいぎがあります。",
    "englishTranslation": "There is a meeting on Thursday.",
    "underlinedKanji": "木曜日",
    "kanjiPosition": 0,
    "options": [
      "もくようび",
      "きようび",
      "ぼくようび",
      "もきようび"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "木曜日 (もくようび) - Thursday",
    "explanations": [
      {
        "option": "もくようび",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 木曜日, meaning \"Thursday\""
      },
      {
        "option": "きようび",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 木曜日"
      },
      {
        "option": "ぼくようび",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 木曜日"
      },
      {
        "option": "もきようび",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 木曜日"
      }
    ],
    "verification": true
  },
  {
    "id": 181,
    "sentence": "ボタンを押すてください。",
    "englishTranslation": "Please press the button.",
    "underlinedKanji": "押す",
    "kanjiPosition": 4,
    "options": [
      "おす",
      "あつ",
      "あっす",
      "ひっす"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "押す (おす) - to push, to stamp something",
    "explanations": [
      {
        "option": "おす",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 押す, meaning \"to push/press\""
      },
      {
        "option": "あつ",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not used for the verb 押す"
      },
      {
        "option": "あっす",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 押す"
      },
      {
        "option": "ひっす",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 押す"
      }
    ],
    "verification": true
  },
  {
    "id": 182,
    "sentence": "いえの鍵をわすれました。",
    "englishTranslation": "I forgot the house key.",
    "underlinedKanji": "鍵",
    "kanjiPosition": 3,
    "options": [
      "かぎ",
      "けん",
      "がぎ",
      "きー"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "鍵 (かぎ) - Key",
    "explanations": [
      {
        "option": "かぎ",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 鍵, meaning \"key\""
      },
      {
        "option": "けん",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not the standard reading for key"
      },
      {
        "option": "がぎ",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 鍵"
      },
      {
        "option": "きー",
        "isCorrect": false,
        "reasoning": "This is katakana for \"key\" but not the reading for 鍵"
      }
    ],
    "verification": true
  },
  {
    "id": 183,
    "sentence": "大学でべんきょうしています。",
    "englishTranslation": "I am studying at university.",
    "underlinedKanji": "大学",
    "kanjiPosition": 0,
    "options": [
      "だいがく",
      "おおがく",
      "たいがく",
      "だいまな"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "大学 (だいがく) - university",
    "explanations": [
      {
        "option": "だいがく",
        "isCorrect": true,
        "reasoning": "This is the correct reading for 大学, meaning \"university\""
      },
      {
        "option": "おおがく",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 大学"
      },
      {
        "option": "たいがく",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 大学"
      },
      {
        "option": "だいまな",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 大学"
      }
    ],
    "verification": true
  },
  {
    "id": 184,
    "sentence": "あさごはんを食べるませんでした。",
    "englishTranslation": "I didn't eat breakfast.",
    "underlinedKanji": "食べる",
    "kanjiPosition": 6,
    "options": [
      "たべる",
      "しょくべる",
      "くべる",
      "のべる"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "食べる (たべる) - to eat",
    "explanations": [
      {
        "option": "たべる",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 食べる, meaning \"to eat\""
      },
      {
        "option": "しょくべる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 食べる"
      },
      {
        "option": "くべる",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 食べる"
      },
      {
        "option": "のべる",
        "isCorrect": false,
        "reasoning": "This means \"to state\" but not the reading for 食べる"
      }
    ],
    "verification": true
  },
  {
    "id": 185,
    "sentence": "鼻がつまっています。",
    "englishTranslation": "My nose is stuffed up.",
    "underlinedKanji": "鼻",
    "kanjiPosition": 0,
    "options": [
      "はな",
      "び",
      "ばな",
      "ぱな"
    ],
    "correctAnswer": 0,
    "type": "multiple-choice",
    "csvEntry": "鼻 (はな) - nose",
    "explanations": [
      {
        "option": "はな",
        "isCorrect": true,
        "reasoning": "This is the correct kun-yomi reading for 鼻, meaning \"nose\""
      },
      {
        "option": "び",
        "isCorrect": false,
        "reasoning": "This is an on-yomi but not the standard reading for nose"
      },
      {
        "option": "ばな",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 鼻"
      },
      {
        "option": "ぱな",
        "isCorrect": false,
        "reasoning": "This is not a valid reading for 鼻"
      }
    ],
    "verification": true
  }
];

export default n5KanjiReadingQuestions;
