// N4 Vocabulary Reading Test Data
// Converted from n4-vocabulary-reading-questions.md and n4-vocabulary-reading-questions-part2.md
// Compatible with existing N4KanjiQuestion interface

export interface N4VocabularyReadingQuestion {
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

export const n4VocabularyReadingQuestions: N4VocabularyReadingQuestion[] = [
  {
    id: 186,
    kanji: "祖母",
    sentence: "私の祖母は元気です。",
    options: ["そぼ", "そば", "おばあさん", "ばあば"],
    correctAnswer: 0,
    explanations: [
      {
        option: "そぼ",
        isCorrect: true,
        reasoning: "This is the standard reading for 祖母 (grandmother)."
      },
      {
        option: "そば",
        isCorrect: false,
        reasoning: "Wrong vowel sound. Uses ば instead of ぼ."
      },
      {
        option: "おばあさん",
        isCorrect: false,
        reasoning: "This is a different word for grandmother, not the reading of 祖母."
      },
      {
        option: "ばあば",
        isCorrect: false,
        reasoning: "This is informal for grandmother, not the reading of 祖母."
      }
    ],
    englishTranslation: "My grandmother is healthy."
  },
  {
    id: 187,
    kanji: "虫",
    sentence: "小さい虫がいます。",
    options: ["むし", "ちゅう", "きゅう", "ぶし"],
    correctAnswer: 0,
    explanations: [
      {
        option: "むし",
        isCorrect: true,
        reasoning: "This is the standard reading for 虫 (insect)."
      },
      {
        option: "ちゅう",
        isCorrect: false,
        reasoning: "Wrong reading. Uses ちゅう instead of むし."
      },
      {
        option: "きゅう",
        isCorrect: false,
        reasoning: "Wrong reading. Uses きゅう instead of むし."
      },
      {
        option: "ぶし",
        isCorrect: false,
        reasoning: "Wrong consonant. Uses ぶ instead of む."
      }
    ],
    englishTranslation: "There is a small insect."
  },
  {
    id: 188,
    kanji: "裏",
    sentence: "紙の裏を見ます。",
    options: ["うら", "り", "はい", "ばい"],
    correctAnswer: 0,
    explanations: [
      {
        option: "うら",
        isCorrect: true,
        reasoning: "This is the standard kun'yomi reading for 裏 (back/behind)."
      },
      {
        option: "り",
        isCorrect: false,
        reasoning: "This is the on'yomi reading, not used when 裏 stands alone."
      },
      {
        option: "はい",
        isCorrect: false,
        reasoning: "This is not a reading of 裏."
      },
      {
        option: "ばい",
        isCorrect: false,
        reasoning: "This is not a reading of 裏."
      }
    ],
    englishTranslation: "I will look at the back of the paper."
  },
  {
    id: 189,
    kanji: "交通",
    sentence: "この道は交通が多いです。",
    options: ["こうつう", "こうどう", "きょうつう", "こうとう"],
    correctAnswer: 0,
    explanations: [
      {
        option: "こうつう",
        isCorrect: true,
        reasoning: "This is the standard reading for 交通 (traffic)."
      },
      {
        option: "こうどう",
        isCorrect: false,
        reasoning: "Wrong second kanji reading. 通 is つう, not どう."
      },
      {
        option: "きょうつう",
        isCorrect: false,
        reasoning: "Wrong first kanji reading. 交 is こう, not きょう."
      },
      {
        option: "こうとう",
        isCorrect: false,
        reasoning: "Wrong second kanji reading. 通 is つう, not とう."
      }
    ],
    englishTranslation: "This road has heavy traffic."
  },
  {
    id: 190,
    kanji: "文化",
    sentence: "日本の文化は面白いです。",
    options: ["ぶんか", "もんか", "ぶんが", "もんが"],
    correctAnswer: 0,
    explanations: [
      {
        option: "ぶんか",
        isCorrect: true,
        reasoning: "This is the standard reading for 文化 (culture)."
      },
      {
        option: "もんか",
        isCorrect: false,
        reasoning: "Wrong first kanji reading. 文 is ぶん, not もん."
      },
      {
        option: "ぶんが",
        isCorrect: false,
        reasoning: "Wrong second kanji reading. 化 is か, not が."
      },
      {
        option: "もんが",
        isCorrect: false,
        reasoning: "Both kanji readings are wrong."
      }
    ],
    englishTranslation: "Japanese culture is interesting."
  }
];
