// N5 Contextual Expressions Test Data
// Generated from custom_n5_questions_vocab_grammar (1).md

export interface ContextualExpressionQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  context: string;
  explanation: string;
  type: 'multiple-choice';
}

export const n5ContextualExpressions: ContextualExpressionQuestion[] = [
  {
    id: 7,
    question: "すみません、ぎんこうは　________ですか。",
    options: [
      "どこ",
      "なに",
      "だれ",
      "いつ"
    ],
    correctAnswer: 0,
    context: "Asking for location*",
    explanation: "where (asking for bank location)*",
    type: "multiple-choice" as const
  },
  {
    id: 9,
    question: "コーヒーと　こうちゃと　________が　いいですか。",
    options: [
      "どちら",
      "どの",
      "どれ",
      "なに"
    ],
    correctAnswer: 0,
    context: "Choosing between two drinks*",
    explanation: "which of two (coffee or tea)*",
    type: "multiple-choice" as const
  },
  {
    id: 12,
    question: "いま　________じですか。",
    options: [
      "なん",
      "どの",
      "いくつ",
      "どちら"
    ],
    correctAnswer: 0,
    context: "Asking current time*",
    explanation: "what (what time is it)*",
    type: "multiple-choice" as const
  },
  {
    id: 19,
    question: "くるまと　でんしゃと　________が　はやいですか。",
    options: [
      "どちら",
      "どの",
      "どれ",
      "なん"
    ],
    correctAnswer: 0,
    context: "Comparing speed of car and train*",
    explanation: "which of two (car or train)*",
    type: "multiple-choice" as const
  },
  {
    id: 24,
    question: "あついですから、まどを　________ましょう。",
    options: [
      "しめ",
      "あけ",
      "け",
      "つけ"
    ],
    correctAnswer: 1,
    context: "It's hot, so let's do something with the window*",
    explanation: "open (open window when hot)*",
    type: "multiple-choice" as const
  },
  {
    id: 26,
    question: "おいしい　りょうりが　________。",
    options: [
      "たべたいです",
      "のみたいです",
      "みたいです",
      "ききたいです"
    ],
    correctAnswer: 0,
    context: "Wanting something related to delicious food*",
    explanation: "want to eat (makes sense with food)*",
    type: "multiple-choice" as const
  },
  {
    id: 28,
    question: "せんせいは　________いますか。",
    options: [
      "どこに",
      "なにに",
      "だれに",
      "いつに"
    ],
    correctAnswer: 0,
    context: "Asking about teacher's location*",
    explanation: "where (where is the teacher)*",
    type: "multiple-choice" as const
  },
  {
    id: 32,
    question: "あぶないですから、________。",
    options: [
      "はしって　ください",
      "きを　つけて　ください",
      "はやく　いって　ください",
      "たくさん　たべて　ください"
    ],
    correctAnswer: 1,
    context: "It's dangerous, so...*",
    explanation: "please be careful (appropriate warning)*",
    type: "multiple-choice" as const
  },
  {
    id: 33,
    question: "にほんごが　________。",
    options: [
      "むずかしいです",
      "おいしいです",
      "あついです",
      "つめたいです"
    ],
    correctAnswer: 0,
    context: "Talking about Japanese language*",
    explanation: "difficult (appropriate for language)*",
    type: "multiple-choice" as const
  },
  {
    id: 37,
    question: "せんたくを　してから、________。",
    options: [
      "そうじを　します",
      "せんたくを　します",
      "りょうりを　します",
      "べんきょうを　します"
    ],
    correctAnswer: 0,
    context: "After doing laundry... (てから pattern)*",
    explanation: "I'll clean (logical sequence of housework)*",
    type: "multiple-choice" as const
  },
  {
    id: 38,
    question: "もう　じゅうにじですから、________。",
    options: [
      "おきましょう",
      "ねましょう",
      "あさごはんを　たべましょう",
      "がっこうに　いきましょう"
    ],
    correctAnswer: 1,
    context: "It's already 12 o'clock (midnight context)*",
    explanation: "let's sleep (appropriate for midnight)*",
    type: "multiple-choice" as const
  },
  {
    id: 39,
    question: "きのう　ともだちに　________。",
    options: [
      "あいました",
      "つくりました",
      "かいました",
      "よみました"
    ],
    correctAnswer: 0,
    context: "Yesterday, with friend... (に particle suggests meeting)*",
    explanation: "met (met with friend)*",
    type: "multiple-choice" as const
  },
  {
    id: 40,
    question: "しゅくだいが　おわったら、________。",
    options: [
      "べんきょうします",
      "しゅくだいを　します",
      "テレビを　みます",
      "がっこうに　いきます"
    ],
    correctAnswer: 2,
    context: "When homework is finished... (たら conditional)*",
    explanation: "I'll watch TV (leisure activity after work)*",
    type: "multiple-choice" as const
  },
  {
    id: 41,
    question: "えきまで　________かかりますか。",
    options: [
      "どのくらい",
      "なに",
      "だれ",
      "どちら"
    ],
    correctAnswer: 0,
    context: "To the station, how much does it... (asking about time/distance)*",
    explanation: "how much/how long (time to station)*",
    type: "multiple-choice" as const
  },
  {
    id: 42,
    question: "きょうは　あめですから、________。",
    options: [
      "およぎましょう",
      "さんぽしましょう",
      "うちに　いましょう",
      "こうえんに　いきましょう"
    ],
    correctAnswer: 2,
    context: "It's raining today, so...*",
    explanation: "let's stay home (appropriate for rainy day)*",
    type: "multiple-choice" as const
  },
  {
    id: 43,
    question: "すみません、ちょっと　________が　あります。",
    options: [
      "しつもん",
      "こたえ",
      "あたま",
      "なまえ"
    ],
    correctAnswer: 0,
    context: "Excuse me, I have a little...*",
    explanation: "question (polite way to ask question)*",
    type: "multiple-choice" as const
  },
  {
    id: 44,
    question: "たんじょうびに　________を　もらいました。",
    options: [
      "プレゼント",
      "しつもん",
      "しゅくだい",
      "しごと"
    ],
    correctAnswer: 0,
    context: "On birthday, received...*",
    explanation: "present (appropriate for birthday)*",
    type: "multiple-choice" as const
  },
  {
    id: 45,
    question: "おなまえは　________ですか。",
    options: [
      "なん",
      "どこ",
      "いつ",
      "だれ"
    ],
    correctAnswer: 0,
    context: "What is your name?*",
    explanation: "what (asking for name)*",
    type: "multiple-choice" as const
  },
  {
    id: 46,
    question: "きょうは　つかれていますから、________。",
    options: [
      "たくさん　はたらきます",
      "はやく　ねます",
      "たくさん　あそびます",
      "ともだちに　あいます"
    ],
    correctAnswer: 1,
    context: "Tired today, so...*",
    explanation: "sleep early (appropriate when tired)*",
    type: "multiple-choice" as const
  },
  {
    id: 48,
    question: "ごはんを　たべる　まえに、________。",
    options: [
      "はを　みがきます",
      "てを　あらいます",
      "ふくを　きます",
      "くつを　はきます"
    ],
    correctAnswer: 1,
    context: "Before eating rice/meal...*",
    explanation: "wash hands (appropriate before eating)*",
    type: "multiple-choice" as const
  },
  {
    id: 49,
    question: "すみません、________を　おとしました。",
    options: [
      "かぎ",
      "そら",
      "ひかり",
      "こえ"
    ],
    correctAnswer: 0,
    context: "Excuse me, I dropped...*",
    explanation: "key (something you can drop)*",
    type: "multiple-choice" as const
  },
  {
    id: 50,
    question: "でんしゃが　きましたから、________。",
    options: [
      "いそぎましょう",
      "ゆっくり　あるきましょう",
      "やすみましょう",
      "かえりましょう"
    ],
    correctAnswer: 0,
    context: "The train came, so...*",
    explanation: "let's hurry (appropriate when train arrives)*",
    type: "multiple-choice" as const
  },
  {
    id: 53,
    question: "あしたは　どようびですから、________。",
    options: [
      "がっこうに　いきます",
      "しごとを　します",
      "ゆっくり　やすみます",
      "はやく　おきます"
    ],
    correctAnswer: 2,
    context: "Tomorrow is Saturday, so...*",
    explanation: "rest slowly (weekend relaxation)*",
    type: "multiple-choice" as const
  },
  {
    id: 54,
    question: "みちが　わかりませんから、________。",
    options: [
      "ちずを　みましょう",
      "ねましょう",
      "たべましょう",
      "およぎましょう"
    ],
    correctAnswer: 0,
    context: "Don't know the way, so...*",
    explanation: "let's look at a map (logical solution)*",
    type: "multiple-choice" as const
  },
  {
    id: 56,
    question: "くつが　________です。",
    options: [
      "おいしい",
      "きたない",
      "からい",
      "あまい"
    ],
    correctAnswer: 1,
    context: "Talking about shoes*",
    explanation: "dirty (appropriate adjective for shoes)*",
    type: "multiple-choice" as const
  },
  {
    id: 59,
    question: "じしょを　________。",
    options: [
      "わすれました",
      "おぼえました",
      "しりました",
      "ならいました"
    ],
    correctAnswer: 0,
    context: "About dictionary (forgot to bring)*",
    explanation: "forgot (common with bringing dictionary)*",
    type: "multiple-choice" as const
  },
  {
    id: 60,
    question: "あめが　ふって　いますから、________。",
    options: [
      "せんたくものを　そとに　だします",
      "せんたくものを　うちに　いれます",
      "まどを　あけます",
      "かさを　おきます"
    ],
    correctAnswer: 1,
    context: "It's raining, so...*",
    explanation: "bring laundry inside (protect from rain)*",
    type: "multiple-choice" as const
  },
  {
    id: 61,
    question: "ともだちの　たんじょうびに　________を　あげました。",
    options: [
      "しつもん",
      "プレゼント",
      "しゅくだい",
      "しごと"
    ],
    correctAnswer: 1,
    context: "For friend's birthday, gave...*",
    explanation: "present (appropriate birthday gift)*",
    type: "multiple-choice" as const
  },
  {
    id: 62,
    question: "かんじが　よめませんから、________。",
    options: [
      "じしょを　つかいます",
      "ねます",
      "たべます",
      "あそびます"
    ],
    correctAnswer: 0,
    context: "Can't read kanji, so...*",
    explanation: "use dictionary (logical solution)*",
    type: "multiple-choice" as const
  },
  {
    id: 63,
    question: "もう　おそいですから、________。",
    options: [
      "おきましょう",
      "でかけましょう",
      "かえりましょう",
      "はじめましょう"
    ],
    correctAnswer: 2,
    context: "It's already late, so...*",
    explanation: "let's go home (appropriate when late)*",
    type: "multiple-choice" as const
  },
  {
    id: 67,
    question: "あたらしい　くつを　________。",
    options: [
      "かいたいです",
      "のみたいです",
      "ききたいです",
      "みたいです"
    ],
    correctAnswer: 0,
    context: "New shoes, want to...*",
    explanation: "want to buy (appropriate with shoes)*",
    type: "multiple-choice" as const
  },
  {
    id: 68,
    question: "らいしゅう　しけんが　ありますから、________。",
    options: [
      "あそびます",
      "やすみます",
      "べんきょうします",
      "りょこうします"
    ],
    correctAnswer: 2,
    context: "Exam next week, so...*",
    explanation: "study (prepare for exam)*",
    type: "multiple-choice" as const
  },
  {
    id: 69,
    question: "せんせいに　てがみを　________。",
    options: [
      "かきました",
      "よみました",
      "ききました",
      "みました"
    ],
    correctAnswer: 0,
    context: "To teacher, letter... (wrote letter)*",
    explanation: "wrote (wrote letter to teacher)*",
    type: "multiple-choice" as const
  },
  {
    id: 70,
    question: "きょうは　さむいですから、________を　きて　ください。",
    options: [
      "Tシャツ",
      "コート",
      "みじかい　ズボン",
      "サンダル"
    ],
    correctAnswer: 1,
    context: "It's cold today, so please wear...*",
    explanation: "coat (appropriate for cold weather)*",
    type: "multiple-choice" as const
  },
  {
    id: 71,
    question: "あした　あさ　はやく　________。",
    options: [
      "ねたいです",
      "おきなければ　なりません",
      "およぎたいです",
      "あそびたいです"
    ],
    correctAnswer: 1,
    context: "Tomorrow morning early... (must wake up)*",
    explanation: "must wake up (obligation with なければなりません)*",
    type: "multiple-choice" as const
  },
  {
    id: 72,
    question: "ともだちを　________。",
    options: [
      "まって　います",
      "つくって　います",
      "のんで　います",
      "よんで　います"
    ],
    correctAnswer: 0,
    context: "Friend... (waiting for friend)*",
    explanation: "waiting for (appropriate with friend)*",
    type: "multiple-choice" as const
  },
  {
    id: 75,
    question: "しんぶんを　________ことが　あります。",
    options: [
      "よむ",
      "よんだ",
      "よんで",
      "よみ"
    ],
    correctAnswer: 1,
    context: "Have experience of... newspaper*",
    explanation: "read (past experience with たことがある)*",
    type: "multiple-choice" as const
  },
  {
    id: 76,
    question: "いま　べんきょうして　いますから、________。",
    options: [
      "テレビを　みます",
      "しずかに　して　ください",
      "うたを　うたいます",
      "ともだちを　よびます"
    ],
    correctAnswer: 1,
    context: "Studying now, so...*",
    explanation: "please be quiet (need quiet for studying)*",
    type: "multiple-choice" as const
  },
  {
    id: 77,
    question: "あついですから、エアコンを　________。",
    options: [
      "けして　ください",
      "つけて　ください",
      "あけて　ください",
      "しめて　ください"
    ],
    correctAnswer: 1,
    context: "It's hot, so air conditioner...*",
    explanation: "please turn on (turn on AC when hot)*",
    type: "multiple-choice" as const
  },
  {
    id: 79,
    question: "きのう　えいがを　みに　いくつもりでしたが、________。",
    options: [
      "いきました",
      "いきませんでした",
      "みました",
      "かいました"
    ],
    correctAnswer: 1,
    context: "Planned to see movie yesterday, but... (didn't go)*",
    explanation: "didn't go (contrast with つもりでした)*",
    type: "multiple-choice" as const
  },
  {
    id: 81,
    question: "ばんごはんの　あとで、________。",
    options: [
      "あさごはんを　たべます",
      "はを　みがきます",
      "おきます",
      "がっこうに　いきます"
    ],
    correctAnswer: 1,
    context: "After dinner...*",
    explanation: "brush teeth (appropriate after meal)*",
    type: "multiple-choice" as const
  },
  {
    id: 82,
    question: "らいげつ　にほんに　________。",
    options: [
      "いきます",
      "きます",
      "かえります",
      "でます"
    ],
    correctAnswer: 0,
    context: "Next month to Japan... (will go)*",
    explanation: "go (going to Japan)*",
    type: "multiple-choice" as const
  },
  {
    id: 84,
    question: "ちょっと　________ですが、いいですか。",
    options: [
      "しつもん",
      "こたえ",
      "ともだち",
      "がくせい"
    ],
    correctAnswer: 0,
    context: "A little... but is it okay? (asking permission to ask)*",
    explanation: "question (polite way to ask question)*",
    type: "multiple-choice" as const
  },
  {
    id: 86,
    question: "あしたの　よていは　________ですか。",
    options: [
      "なに",
      "どこ",
      "だれ",
      "いつ"
    ],
    correctAnswer: 0,
    context: "What are tomorrow's plans?*",
    explanation: "what (asking about plans)*",
    type: "multiple-choice" as const
  },
  {
    id: 91,
    question: "すみません、ペンを　________。",
    options: [
      "かして　ください",
      "かりて　ください",
      "あげて　ください",
      "もらって　ください"
    ],
    correctAnswer: 0,
    context: "Excuse me, pen... (asking to borrow)*",
    explanation: "please lend (asking someone to lend pen)*",
    type: "multiple-choice" as const
  },
  {
    id: 94,
    question: "やさいを　たくさん　________ほうが　いいです。",
    options: [
      "たべる",
      "のむ",
      "きく",
      "みる"
    ],
    correctAnswer: 0,
    context: "Vegetables, a lot... better to do*",
    explanation: "eat (appropriate with vegetables)*",
    type: "multiple-choice" as const
  },
  {
    id: 95,
    question: "きのう　ともだちに　でんわしましたが、________。",
    options: [
      "でました",
      "でませんでした",
      "みました",
      "ききました"
    ],
    correctAnswer: 1,
    context: "Called friend yesterday, but... (didn't answer)*",
    explanation: "didn't answer (common phone situation)*",
    type: "multiple-choice" as const
  },
  {
    id: 96,
    question: "あたらしい　しごとは　________ですか。",
    options: [
      "どう",
      "どこ",
      "だれ",
      "いつ"
    ],
    correctAnswer: 0,
    context: "How is the new job?*",
    explanation: "how (asking about job quality)*",
    type: "multiple-choice" as const
  },
  {
    id: 97,
    question: "くもって　いますから、________。",
    options: [
      "およぎましょう",
      "あめが　ふるでしょう",
      "あついでしょう",
      "はれるでしょう"
    ],
    correctAnswer: 1,
    context: "It's cloudy, so...*",
    explanation: "it will probably rain (logical weather progression)*",
    type: "multiple-choice" as const
  },
  {
    id: 98,
    question: "じゅぎょうが　おわってから、________。",
    options: [
      "じゅぎょうに　でます",
      "ともだちと　あそびます",
      "がっこうに　いきます",
      "べんきょうを　はじめます"
    ],
    correctAnswer: 1,
    context: "After class ends...*",
    explanation: "play with friends (logical after-class activity)*",
    type: "multiple-choice" as const
  },
  {
    id: 99,
    question: "すみません、みちを　________。",
    options: [
      "おしえて　ください",
      "ならって　ください",
      "わすれて　ください",
      "おぼえて　ください"
    ],
    correctAnswer: 0,
    context: "Excuse me, the way... (asking for directions)*",
    explanation: "please teach (asking for directions)*",
    type: "multiple-choice" as const
  },
  {
    id: 100,
    question: "きょうは　きんようびですから、________あした　やすみです。",
    options: [
      "でも",
      "それから",
      "だから",
      "しかし"
    ],
    correctAnswer: 2,
    context: "Today is Friday, so... tomorrow is a holiday*",
    explanation: "therefore (logical conclusion)*",
    type: "multiple-choice" as const
  },
  {
    id: 102,
    question: "しお　________しょうゆ、どちらが　いいですか。",
    options: [
      "や",
      "と",
      "も",
      "で"
    ],
    correctAnswer: 0,
    context: "Choosing between salt or soy sauce*",
    explanation: "or (choosing between salt or soy sauce)*",
    type: "multiple-choice" as const
  },
  {
    id: 103,
    question: "あかるい　ところで　ほんを　________。",
    options: [
      "よんだほうが　いいです",
      "よまないほうが　いいです",
      "よみたいです",
      "よみたくないです"
    ],
    correctAnswer: 0,
    context: "Reading in bright place*",
    explanation: "better to read (better to read in bright place)*",
    type: "multiple-choice" as const
  },
  {
    id: 104,
    question: "いもうとの　なまえは　________ですか。",
    options: [
      "どなた",
      "なん",
      "どこ",
      "いつ"
    ],
    correctAnswer: 1,
    context: "Asking for sister's name*",
    explanation: "what (asking for sister's name)*",
    type: "multiple-choice" as const
  },
  {
    id: 105,
    question: "おじいさんは　________に　います。",
    options: [
      "びょういん",
      "ほんだな",
      "つくえ",
      "はこ"
    ],
    correctAnswer: 0,
    context: "Where grandfather is*",
    explanation: "hospital (place where grandfather can be)*",
    type: "multiple-choice" as const
  },
  {
    id: 106,
    question: "ふゆに　スキーを　したい　ですが、________。",
    options: [
      "できます",
      "できません",
      "しています",
      "しました"
    ],
    correctAnswer: 1,
    context: "Want to ski in winter but...*",
    explanation: "can't do (want to ski but can't)*",
    type: "multiple-choice" as const
  },
  {
    id: 107,
    question: "せっけんで　てを　________。",
    options: [
      "あらったほうが　いいです",
      "あらわないほうが　いいです",
      "あらいたいです",
      "あらいたくないです"
    ],
    correctAnswer: 0,
    context: "Washing hands with soap*",
    explanation: "better to wash (better to wash hands with soap)*",
    type: "multiple-choice" as const
  },
  {
    id: 108,
    question: "バターを　パンに　________。",
    options: [
      "はります",
      "はりました",
      "はるつもりです",
      "はりたいです"
    ],
    correctAnswer: 0,
    context: "Butter on bread*",
    explanation: "spread (spread butter on bread)*",
    type: "multiple-choice" as const
  },
  {
    id: 109,
    question: "まんねんひつ　________ボールペン、どちらを　つかいますか。",
    options: [
      "や",
      "と",
      "も",
      "で"
    ],
    correctAnswer: 0,
    context: "Fountain pen or ballpoint pen*",
    explanation: "or (fountain pen or ballpoint pen)*",
    type: "multiple-choice" as const
  },
  {
    id: 110,
    question: "やまに　のぼるのが　________。",
    options: [
      "すき",
      "きらい",
      "じょうず",
      "へた"
    ],
    correctAnswer: 0,
    context: "Mountain climbing preference*",
    explanation: "like (like climbing mountains)*",
    type: "multiple-choice" as const
  },
  {
    id: 111,
    question: "ちちは　タクシーの　ひとに　________。",
    options: [
      "なりたいです",
      "なるつもりです",
      "なりました",
      "なって　います"
    ],
    correctAnswer: 2,
    context: "Father became taxi person*",
    explanation: "became (father became a taxi person)*",
    type: "multiple-choice" as const
  },
  {
    id: 112,
    question: "はがきに　きってを　________。",
    options: [
      "はります",
      "はりました",
      "はるつもりです",
      "はりましょう"
    ],
    correctAnswer: 1,
    context: "Stamp on postcard*",
    explanation: "stuck (stuck stamp on postcard)*",
    type: "multiple-choice" as const
  },
  {
    id: 113,
    question: "せんげつ　うまれた　こどもは　________。",
    options: [
      "つよくて　げんきです",
      "よわくて　びょうきです",
      "おおきくて　ふといです",
      "ちいさくて　かわいいです"
    ],
    correctAnswer: 3,
    context: "Last month born child*",
    explanation: "small and cute (appropriate for newborn)*",
    type: "multiple-choice" as const
  },
  {
    id: 114,
    question: "むらの　ひとたちは　とても　________。",
    options: [
      "にぎやか",
      "しずか",
      "やさしい",
      "うるさい"
    ],
    correctAnswer: 2,
    context: "Village people*",
    explanation: "kind (village people are kind)*",
    type: "multiple-choice" as const
  },
  {
    id: 115,
    question: "ふうとうの　なかに　________が　あります。",
    options: [
      "てがみ",
      "はし",
      "いえ",
      "やま"
    ],
    correctAnswer: 0,
    context: "Inside envelope*",
    explanation: "letter (letter inside envelope)*",
    type: "multiple-choice" as const
  },
  {
    id: 116,
    question: "かぜで　はなが　________。",
    options: [
      "でて　います",
      "はいって　います",
      "つまって　います",
      "あいて　います"
    ],
    correctAnswer: 2,
    context: "Cold and nose*",
    explanation: "is stuffed (nose stuffed from cold)*",
    type: "multiple-choice" as const
  },
  {
    id: 117,
    question: "ひがしから　にしまで　________。",
    options: [
      "わたりました",
      "のぼりました",
      "おりました",
      "とびました"
    ],
    correctAnswer: 0,
    context: "From east to west*",
    explanation: "crossed (crossed from east to west)*",
    type: "multiple-choice" as const
  },
  {
    id: 118,
    question: "いけに　とりが　________。",
    options: [
      "およいで　います",
      "とんで　います",
      "はしって　います",
      "あるいて　います"
    ],
    correctAnswer: 0,
    context: "Birds in pond*",
    explanation: "swimming (birds swimming in pond)*",
    type: "multiple-choice" as const
  },
  {
    id: 119,
    question: "きたから　かぜが　________。",
    options: [
      "ふいて　います",
      "ふって　います",
      "なって　います",
      "でて　います"
    ],
    correctAnswer: 0,
    context: "Wind from north*",
    explanation: "blowing (wind blowing from north)*",
    type: "multiple-choice" as const
  },
  {
    id: 120,
    question: "ゆきが　そらから　________。",
    options: [
      "ふって　います",
      "ふいて　います",
      "とんで　います",
      "はしって　います"
    ],
    correctAnswer: 0,
    context: "Snow from sky*",
    explanation: "falling (snow falling from sky)*",
    type: "multiple-choice" as const
  },
  {
    id: 121,
    question: "ストーブを　________、あたたかく　なりました。",
    options: [
      "つけてから",
      "けしてから",
      "あけてから",
      "しめてから"
    ],
    correctAnswer: 0,
    context: "After turning on heater*",
    explanation: "after turning on (warm after turning on heater)*",
    type: "multiple-choice" as const
  },
  {
    id: 122,
    question: "おかあさんが　りょうりを　________。",
    options: [
      "つくって　います",
      "たべて　います",
      "よんで　います",
      "きいて　います"
    ],
    correctAnswer: 0,
    context: "Mother and cooking*",
    explanation: "making (mother making food)*",
    type: "multiple-choice" as const
  },
  {
    id: 123,
    question: "おとうとは　ギターを　________のが　じょうずです。",
    options: [
      "ひく",
      "みる",
      "きく",
      "かく"
    ],
    correctAnswer: 0,
    context: "Brother good at guitar*",
    explanation: "play (good at playing guitar)*",
    type: "multiple-choice" as const
  },
  {
    id: 124,
    question: "このみちは　________から、きを　つけて　ください。",
    options: [
      "あぶない",
      "たのしい",
      "きれい",
      "きたない"
    ],
    correctAnswer: 0,
    context: "Warning about road*",
    explanation: "dangerous (be careful because road is dangerous)*",
    type: "multiple-choice" as const
  },
  {
    id: 125,
    question: "いりぐちで　スリッパに　________。",
    options: [
      "はきかえます",
      "ぬぎます",
      "きます",
      "かぶります"
    ],
    correctAnswer: 0,
    context: "At entrance with slippers*",
    explanation: "change into (change into slippers at entrance)*",
    type: "multiple-choice" as const
  },
  {
    id: 126,
    question: "でぐちは　________ですか。",
    options: [
      "どちら",
      "だれ",
      "なに",
      "いつ"
    ],
    correctAnswer: 0,
    context: "Asking for exit*",
    explanation: "which way (asking for exit direction)*",
    type: "multiple-choice" as const
  },
  {
    id: 127,
    question: "エレベーターで　________かいまで　いきます。",
    options: [
      "なん",
      "どの",
      "どちら",
      "いくつ"
    ],
    correctAnswer: 0,
    context: "Elevator to what floor*",
    explanation: "what (what floor by elevator)*",
    type: "multiple-choice" as const
  },
  {
    id: 128,
    question: "かいだんを　のぼって　________。",
    options: [
      "つかれました",
      "つかれて　います",
      "つかれるでしょう",
      "つかれた　ことが　あります"
    ],
    correctAnswer: 0,
    context: "Climbing stairs result*",
    explanation: "got tired (got tired from climbing stairs)*",
    type: "multiple-choice" as const
  },
  {
    id: 129,
    question: "ろうかを　はしらないほうが　________。",
    options: [
      "いいです",
      "わるいです",
      "すきです",
      "きらいです"
    ],
    correctAnswer: 0,
    context: "Running in corridor*",
    explanation: "better (better not to run in corridor)*",
    type: "multiple-choice" as const
  },
  {
    id: 130,
    question: "ちゃわんが　われて　________。",
    options: [
      "います",
      "あります",
      "しまいました",
      "きました"
    ],
    correctAnswer: 2,
    context: "Rice bowl broke*",
    explanation: "broke (rice bowl broke completely)*",
    type: "multiple-choice" as const
  },
  {
    id: 131,
    question: "おふろに　みずを　________。",
    options: [
      "いれます",
      "だします",
      "とります",
      "おきます"
    ],
    correctAnswer: 0,
    context: "Water in bath*",
    explanation: "put (put water in bath)*",
    type: "multiple-choice" as const
  },
  {
    id: 132,
    question: "ゆうべ　ゆきが　________。",
    options: [
      "ふりました",
      "ふって　います",
      "ふるでしょう",
      "ふった　ことが　あります"
    ],
    correctAnswer: 0,
    context: "Snow last night*",
    explanation: "fell (snow fell last night)*",
    type: "multiple-choice" as const
  },
  {
    id: 133,
    question: "かみに　えを　________。",
    options: [
      "かきます",
      "よみます",
      "ききます",
      "みます"
    ],
    correctAnswer: 0,
    context: "Picture on paper*",
    explanation: "draw (draw picture on paper)*",
    type: "multiple-choice" as const
  },
  {
    id: 134,
    question: "にわで　はなが　________。",
    options: [
      "さいて　います",
      "かれて　います",
      "たおれて　います",
      "おちて　います"
    ],
    correctAnswer: 0,
    context: "Flowers in garden*",
    explanation: "blooming (flowers blooming in garden)*",
    type: "multiple-choice" as const
  },
  {
    id: 135,
    question: "ねこが　きから　________。",
    options: [
      "おちました",
      "のぼりました",
      "はいりました",
      "でました"
    ],
    correctAnswer: 0,
    context: "Cat and tree*",
    explanation: "fell (cat fell from tree)*",
    type: "multiple-choice" as const
  },
  {
    id: 136,
    question: "いぬが　________なきました。",
    options: [
      "げんきに",
      "しずかに",
      "おおきな　こえで",
      "ちいさな　こえで"
    ],
    correctAnswer: 2,
    context: "Dog barking*",
    explanation: "with loud voice (dog barked loudly)*",
    type: "multiple-choice" as const
  },
  {
    id: 137,
    question: "フィルムを　カメラに　________。",
    options: [
      "いれます",
      "だします",
      "とります",
      "かえします"
    ],
    correctAnswer: 0,
    context: "Film in camera*",
    explanation: "put (put film in camera)*",
    type: "multiple-choice" as const
  },
  {
    id: 138,
    question: "プールで　________。",
    options: [
      "およぎたいです",
      "およぎたくないです",
      "およがないほうが　いいです",
      "およぐことが　できます"
    ],
    correctAnswer: 3,
    context: "Swimming in pool*",
    explanation: "can swim (can swim in pool)*",
    type: "multiple-choice" as const
  },
  {
    id: 139,
    question: "このキログラムは　________グラムですか。",
    options: [
      "せん",
      "ひゃく",
      "じゅう",
      "いち"
    ],
    correctAnswer: 0,
    context: "Kilogram to gram conversion*",
    explanation: "thousand (1 kilogram = 1000 grams)*",
    type: "multiple-choice" as const
  },
  {
    id: 140,
    question: "ここから　えきまで　________キロメートルですか。",
    options: [
      "なん",
      "いくつ",
      "どの",
      "どちら"
    ],
    correctAnswer: 0,
    context: "Distance to station*",
    explanation: "how many (how many kilometers to station)*",
    type: "multiple-choice" as const
  },
  {
    id: 141,
    question: "ポケットに　おかねを　________。",
    options: [
      "いれます",
      "だします",
      "みせます",
      "わたします"
    ],
    correctAnswer: 0,
    context: "Money in pocket*",
    explanation: "put (put money in pocket)*",
    type: "multiple-choice" as const
  },
  {
    id: 142,
    question: "やおやで　やさいを　________。",
    options: [
      "うって　います",
      "かって　います",
      "つくって　います",
      "たべて　います"
    ],
    correctAnswer: 0,
    context: "Vegetables at greengrocer*",
    explanation: "selling (selling vegetables at greengrocer)*",
    type: "multiple-choice" as const
  },
  {
    id: 143,
    question: "こうばんで　おまわりさんに　________。",
    options: [
      "あいました",
      "わかれました",
      "けっこんしました",
      "うまれました"
    ],
    correctAnswer: 0,
    context: "Police officer at police box*",
    explanation: "met (met policeman at police box)*",
    type: "multiple-choice" as const
  },
  {
    id: 144,
    question: "しょくどうで　ひるごはんを　________。",
    options: [
      "つくります",
      "たべます",
      "うります",
      "かいます"
    ],
    correctAnswer: 1,
    context: "Lunch in dining hall*",
    explanation: "eat (eat lunch in dining hall)*",
    type: "multiple-choice" as const
  },
  {
    id: 145,
    question: "としょかんで　ほんを　________。",
    options: [
      "かります",
      "うります",
      "あげます",
      "もらいます"
    ],
    correctAnswer: 0,
    context: "Books at library*",
    explanation: "borrow (borrow books at library)*",
    type: "multiple-choice" as const
  },
  {
    id: 146,
    question: "きっさてんで　コーヒーを　________。",
    options: [
      "つくります",
      "のみます",
      "あらいます",
      "かします"
    ],
    correctAnswer: 1,
    context: "Coffee at coffee shop*",
    explanation: "drink (drink coffee at coffee shop)*",
    type: "multiple-choice" as const
  },
  {
    id: 147,
    question: "えいがかんで　えいがを　________。",
    options: [
      "つくります",
      "みます",
      "うります",
      "かいます"
    ],
    correctAnswer: 1,
    context: "Movie at cinema*",
    explanation: "watch (watch movie at cinema)*",
    type: "multiple-choice" as const
  },
  {
    id: 148,
    question: "ぎんこうで　おかねを　________。",
    options: [
      "つくります",
      "かります",
      "すてます",
      "なくします"
    ],
    correctAnswer: 1,
    context: "Money at bank*",
    explanation: "borrow (borrow money at bank)*",
    type: "multiple-choice" as const
  },
  {
    id: 149,
    question: "ゆうびんきょくで　きってを　________。",
    options: [
      "つくります",
      "かいます",
      "すてます",
      "なくします"
    ],
    correctAnswer: 1,
    context: "Stamps at post office*",
    explanation: "buy (buy stamps at post office)*",
    type: "multiple-choice" as const
  },
  {
    id: 150,
    question: "ホテルに　________。",
    options: [
      "とまります",
      "およぎます",
      "のぼります",
      "わたります"
    ],
    correctAnswer: 0,
    context: "At hotel*",
    explanation: "stay (stay at hotel)*",
    type: "multiple-choice" as const
  },
  {
    id: 151,
    question: "アパートに　________。",
    options: [
      "すんで　います",
      "およいで　います",
      "とんで　います",
      "はしって　います"
    ],
    correctAnswer: 0,
    context: "In apartment*",
    explanation: "living (living in apartment)*",
    type: "multiple-choice" as const
  },
  {
    id: 152,
    question: "にほんごの　じゅぎょうに　________。",
    options: [
      "でたいです",
      "でたくないです",
      "でないほうが　いいです",
      "でることが　できます"
    ],
    correctAnswer: 3,
    context: "Japanese class*",
    explanation: "can attend (can attend Japanese class)*",
    type: "multiple-choice" as const
  },
  {
    id: 153,
    question: "びょういんで　いしゃに　________。",
    options: [
      "みてもらいたいです",
      "みせたいです",
      "みたいです",
      "みせます"
    ],
    correctAnswer: 0,
    context: "Doctor at hospital*",
    explanation: "want to have look at (want doctor to examine)*",
    type: "multiple-choice" as const
  },
  {
    id: 154,
    question: "かいしゃで　________。",
    options: [
      "つとめて　います",
      "やすんで　います",
      "あそんで　います",
      "ねて　います"
    ],
    correctAnswer: 0,
    context: "At company*",
    explanation: "working (working at company)*",
    type: "multiple-choice" as const
  },
  {
    id: 155,
    question: "だいがくで　えいごを　________。",
    options: [
      "ならって　います",
      "おしえて　います",
      "わすれて　います",
      "やめて　います"
    ],
    correctAnswer: 0,
    context: "English at university*",
    explanation: "learning (learning English at university)*",
    type: "multiple-choice" as const
  },
  {
    id: 156,
    question: "にもつを　________すぎて、つかれました。",
    options: [
      "もち",
      "もって",
      "もった",
      "もつ"
    ],
    correctAnswer: 0,
    context: "Carried too much luggage*",
    explanation: "carried too much (すぎる pattern)*",
    type: "multiple-choice" as const
  },
  {
    id: 157,
    question: "あめが　________すぎて、そとに　でられません。",
    options: [
      "ふり",
      "ふって",
      "ふった",
      "ふる"
    ],
    correctAnswer: 0,
    context: "Raining too much*",
    explanation: "raining too much (すぎる pattern)*",
    type: "multiple-choice" as const
  },
  {
    id: 158,
    question: "おさけを　________すぎました。",
    options: [
      "のみ",
      "のんで",
      "のんだ",
      "のむ"
    ],
    correctAnswer: 0,
    context: "Drank too much alcohol*",
    explanation: "drank too much (すぎる pattern)*",
    type: "multiple-choice" as const
  },
  {
    id: 159,
    question: "テープレコーダーで　________。",
    options: [
      "おんがくを　きいて　います",
      "しゃしんを　とって　います",
      "てがみを　かいて　います",
      "りょうりを　つくって　います"
    ],
    correctAnswer: 0,
    context: "Using tape recorder*",
    explanation: "listening to music (appropriate for tape recorder)*",
    type: "multiple-choice" as const
  },
  {
    id: 160,
    question: "ラジオで　ニュースを　________。",
    options: [
      "みて　います",
      "きいて　います",
      "よんで　います",
      "かいて　います"
    ],
    correctAnswer: 1,
    context: "News on radio*",
    explanation: "listening (listen to news on radio)*",
    type: "multiple-choice" as const
  },
  {
    id: 161,
    question: "テレビで　スポーツを　________。",
    options: [
      "きいて　います",
      "よんで　います",
      "みて　います",
      "かいて　います"
    ],
    correctAnswer: 2,
    context: "Sports on TV*",
    explanation: "watching (watch sports on TV)*",
    type: "multiple-choice" as const
  },
  {
    id: 162,
    question: "でんきが　________います。",
    options: [
      "ついて",
      "きえて",
      "つけて",
      "けして"
    ],
    correctAnswer: 0,
    context: "Electric lights state*",
    explanation: "turned on (lights are on)*",
    type: "multiple-choice" as const
  },
  {
    id: 163,
    question: "まどが　________います。",
    options: [
      "あいて",
      "しまって",
      "あけて",
      "しめて"
    ],
    correctAnswer: 0,
    context: "Window state*",
    explanation: "open (window is open)*",
    type: "multiple-choice" as const
  },
  {
    id: 164,
    question: "ドアが　________います。",
    options: [
      "しまって",
      "あいて",
      "たって",
      "すわって"
    ],
    correctAnswer: 0,
    context: "Door state*",
    explanation: "closed (door is closed)*",
    type: "multiple-choice" as const
  },
  {
    id: 165,
    question: "テーブルの　うえに　はなが　________。",
    options: [
      "あります",
      "います",
      "おきます",
      "とります"
    ],
    correctAnswer: 0,
    context: "Flowers on table*",
    explanation: "there are (flowers are on table)*",
    type: "multiple-choice" as const
  },
  {
    id: 166,
    question: "まどに　しゃしんが　________。",
    options: [
      "あります",
      "います",
      "はります",
      "とります"
    ],
    correctAnswer: 0,
    context: "Photo on window*",
    explanation: "there are (photo is on window)*",
    type: "multiple-choice" as const
  },
  {
    id: 167,
    question: "つくえの　うえに　ノートが　________。",
    options: [
      "あります",
      "います",
      "おきます",
      "とります"
    ],
    correctAnswer: 0,
    context: "Notebook on desk*",
    explanation: "there is (notebook is on desk)*",
    type: "multiple-choice" as const
  },
  {
    id: 168,
    question: "きょうしつに　いすが　________。",
    options: [
      "あります",
      "います",
      "ならびます",
      "すわります"
    ],
    correctAnswer: 0,
    context: "Chairs in classroom*",
    explanation: "there are (chairs are in classroom)*",
    type: "multiple-choice" as const
  },
  {
    id: 169,
    question: "かいだんに　ひとが　________。",
    options: [
      "ならんで　います",
      "すわって　います",
      "ねて　います",
      "およいで　います"
    ],
    correctAnswer: 0,
    context: "People on stairs*",
    explanation: "lined up (people lined up on stairs)*",
    type: "multiple-choice" as const
  },
  {
    id: 170,
    question: "げんかんで　くつを　________。",
    options: [
      "ぬぎます",
      "はきます",
      "きます",
      "かぶります"
    ],
    correctAnswer: 0,
    context: "Shoes at entrance*",
    explanation: "take off (take off shoes at entrance)*",
    type: "multiple-choice" as const
  },
  {
    id: 171,
    question: "そとは　________ですから、ぼうしを　かぶります。",
    options: [
      "あつい",
      "さむい",
      "あかるい",
      "くらい"
    ],
    correctAnswer: 0,
    context: "Wearing hat outside*",
    explanation: "hot (wear hat because it's hot outside)*",
    type: "multiple-choice" as const
  },
  {
    id: 172,
    question: "あしが　________ですから、くつしたを　はきます。",
    options: [
      "あつい",
      "つめたい",
      "あかるい",
      "くらい"
    ],
    correctAnswer: 1,
    context: "Wearing socks*",
    explanation: "cold (wear socks because feet are cold)*",
    type: "multiple-choice" as const
  },
  {
    id: 173,
    question: "おとこのこが　________。",
    options: [
      "ないて　います",
      "わらって　います",
      "おこって　います",
      "よろこんで　います"
    ],
    correctAnswer: 1,
    context: "Boy's state*",
    explanation: "laughing (boy is laughing)*",
    type: "multiple-choice" as const
  },
  {
    id: 174,
    question: "おんなのこが　うたを　________。",
    options: [
      "うたって　います",
      "きいて　います",
      "よんで　います",
      "かいて　います"
    ],
    correctAnswer: 0,
    context: "Girl and song*",
    explanation: "singing (girl singing song)*",
    type: "multiple-choice" as const
  },
  {
    id: 175,
    question: "こどもたちが　こうえんで　________。",
    options: [
      "あそんで　います",
      "はたらいて　います",
      "べんきょうして　います",
      "りょうりして　います"
    ],
    correctAnswer: 0,
    context: "Children in park*",
    explanation: "playing (children playing in park)*",
    type: "multiple-choice" as const
  },
  {
    id: 176,
    question: "せいとが　しつもんに　________。",
    options: [
      "こたえて　います",
      "きいて　います",
      "よんで　います",
      "かいて　います"
    ],
    correctAnswer: 0,
    context: "Student and question*",
    explanation: "answering (student answering question)*",
    type: "multiple-choice" as const
  },
  {
    id: 177,
    question: "がくせいが　さくぶんを　________。",
    options: [
      "かいて　います",
      "よんで　います",
      "きいて　います",
      "みて　います"
    ],
    correctAnswer: 0,
    context: "Student and composition*",
    explanation: "writing (student writing composition)*",
    type: "multiple-choice" as const
  },
  {
    id: 178,
    question: "りゅうがくせいが　にほんごを　________。",
    options: [
      "べんきょうして　います",
      "おしえて　います",
      "わすれて　います",
      "やめて　います"
    ],
    correctAnswer: 0,
    context: "Exchange student and Japanese*",
    explanation: "studying (exchange student studying Japanese)*",
    type: "multiple-choice" as const
  },
  {
    id: 179,
    question: "おとなが　こどもに　ほんを　________。",
    options: [
      "よんで　います",
      "かいて　います",
      "みせて　います",
      "おしえて　います"
    ],
    correctAnswer: 0,
    context: "Adult reading to child*",
    explanation: "reading (adult reading book to child)*",
    type: "multiple-choice" as const
  },
  {
    id: 180,
    question: "わたしは　ともだちに　てがみを　________。",
    options: [
      "かきました",
      "よみました",
      "もらいました",
      "あげました"
    ],
    correctAnswer: 3,
    context: "Letter to friend*",
    explanation: "gave (I gave letter to friend)*",
    type: "multiple-choice" as const
  },
  {
    id: 181,
    question: "ははが　わたしに　セーターを　________。",
    options: [
      "つくりました",
      "かいました",
      "くれました",
      "もらいました"
    ],
    correctAnswer: 2,
    context: "Mother gave sweater*",
    explanation: "gave me (mother gave sweater to me)*",
    type: "multiple-choice" as const
  },
  {
    id: 182,
    question: "わたしは　せんせいに　しゅくだいを　________。",
    options: [
      "みせました",
      "みました",
      "もらいました",
      "あげました"
    ],
    correctAnswer: 0,
    context: "Homework to teacher*",
    explanation: "showed (showed homework to teacher)*",
    type: "multiple-choice" as const
  },
  {
    id: 183,
    question: "きのう　________はじめて　すしを　つくりました。",
    options: [
      "で",
      "に",
      "を",
      "が"
    ],
    correctAnswer: 0,
    context: "First time making sushi*",
    explanation: "for the first time yesterday (time+で)*",
    type: "multiple-choice" as const
  },
  {
    id: 184,
    question: "まいにち　________がっこうに　いきます。",
    options: [
      "あさ",
      "あさに",
      "あさで",
      "あさを"
    ],
    correctAnswer: 0,
    context: "Daily school routine*",
    explanation: "every morning (time without particle)*",
    type: "multiple-choice" as const
  },
  {
    id: 185,
    question: "________いちど　にほんに　いきたいです。",
    options: [
      "いつか",
      "いつかに",
      "いつかで",
      "いつかを"
    ],
    correctAnswer: 0,
    context: "Wanting to go to Japan*",
    explanation: "sometime (want to go to Japan sometime)*",
    type: "multiple-choice" as const
  },
  {
    id: 186,
    question: "________がっこうが　はじまります。",
    options: [
      "らいげつ",
      "らいげつに",
      "らいげつで",
      "らいげつを"
    ],
    correctAnswer: 0,
    context: "School starting*",
    explanation: "next month (school starts next month)*",
    type: "multiple-choice" as const
  },
  {
    id: 187,
    question: "きょうは　________の　たんじょうびです。",
    options: [
      "あね",
      "あねが",
      "あねを",
      "あねに"
    ],
    correctAnswer: 0,
    context: "Sister's birthday*",
    explanation: "older sister's (possessive no implied)*",
    type: "multiple-choice" as const
  },
  {
    id: 188,
    question: "________の　くるまは　あかいです。",
    options: [
      "おとうさん",
      "おとうさんが",
      "おとうさんを",
      "おとうさんに"
    ],
    correctAnswer: 0,
    context: "Father's car*",
    explanation: "father's (possessive)*",
    type: "multiple-choice" as const
  },
  {
    id: 189,
    question: "________りょうしんに　あいます。",
    options: [
      "らいしゅう",
      "らいしゅうに",
      "らいしゅうで",
      "らいしゅうを"
    ],
    correctAnswer: 0,
    context: "Meeting parents*",
    explanation: "next week (will meet parents next week)*",
    type: "multiple-choice" as const
  },
  {
    id: 197,
    question: "すみません、ぎんこうは　________ですか。",
    options: [
      "どこ",
      "なに",
      "だれ",
      "いつ"
    ],
    correctAnswer: 0,
    context: "Asking for location*",
    explanation: "where (asking for bank location)*",
    type: "multiple-choice" as const
  },
  {
    id: 199,
    question: "コーヒーと　こうちゃと　________が　いいですか。",
    options: [
      "どちら",
      "どの",
      "どれ",
      "なに"
    ],
    correctAnswer: 0,
    context: "Choosing between two drinks*",
    explanation: "which of two (coffee or tea)*",
    type: "multiple-choice" as const
  },
  {
    id: 202,
    question: "いま　________じですか。",
    options: [
      "なん",
      "どの",
      "いくつ",
      "どちら"
    ],
    correctAnswer: 0,
    context: "Asking current time*",
    explanation: "what (what time is it)*",
    type: "multiple-choice" as const
  },
  {
    id: 209,
    question: "くるまと　でんしゃと　________が　はやいですか。",
    options: [
      "どちら",
      "どの",
      "どれ",
      "なん"
    ],
    correctAnswer: 0,
    context: "Comparing speed of car and train*",
    explanation: "which of two (car or train)*",
    type: "multiple-choice" as const
  },
  {
    id: 214,
    question: "あついですから、まどを　________ましょう。",
    options: [
      "しめ",
      "あけ",
      "け",
      "つけ"
    ],
    correctAnswer: 1,
    context: "It's hot, so let's do something with the window*",
    explanation: "open (open window when hot)*",
    type: "multiple-choice" as const
  },
  {
    id: 216,
    question: "おいしい　りょうりが　________。",
    options: [
      "たべたいです",
      "のみたいです",
      "みたいです",
      "ききたいです"
    ],
    correctAnswer: 0,
    context: "Wanting something related to delicious food*",
    explanation: "want to eat (makes sense with food)*",
    type: "multiple-choice" as const
  },
  {
    id: 218,
    question: "せんせいは　________いますか。",
    options: [
      "どこに",
      "なにに",
      "だれに",
      "いつに"
    ],
    correctAnswer: 0,
    context: "Asking about teacher's location*",
    explanation: "where (where is the teacher)*",
    type: "multiple-choice" as const
  },
  {
    id: 222,
    question: "あぶないですから、________。",
    options: [
      "はしって　ください",
      "きを　つけて　ください",
      "はやく　いって　ください",
      "たくさん　たべて　ください"
    ],
    correctAnswer: 1,
    context: "It's dangerous, so...*",
    explanation: "please be careful (appropriate warning)*",
    type: "multiple-choice" as const
  },
  {
    id: 223,
    question: "にほんごが　________。",
    options: [
      "むずかしいです",
      "おいしいです",
      "あついです",
      "つめたいです"
    ],
    correctAnswer: 0,
    context: "Talking about Japanese language*",
    explanation: "difficult (appropriate for language)*",
    type: "multiple-choice" as const
  },
  {
    id: 227,
    question: "せんたくを　してから、________。",
    options: [
      "そうじを　します",
      "せんたくを　します",
      "りょうりを　します",
      "べんきょうを　します"
    ],
    correctAnswer: 0,
    context: "After doing laundry... (てから pattern)*",
    explanation: "I'll clean (logical sequence of housework)*",
    type: "multiple-choice" as const
  },
  {
    id: 228,
    question: "もう　じゅうにじですから、________。",
    options: [
      "おきましょう",
      "ねましょう",
      "あさごはんを　たべましょう",
      "がっこうに　いきましょう"
    ],
    correctAnswer: 1,
    context: "It's already 12 o'clock (midnight context)*",
    explanation: "let's sleep (appropriate for midnight)*",
    type: "multiple-choice" as const
  },
  {
    id: 229,
    question: "きのう　ともだちに　________。",
    options: [
      "あいました",
      "つくりました",
      "かいました",
      "よみました"
    ],
    correctAnswer: 0,
    context: "Yesterday, with friend... (に particle suggests meeting)*",
    explanation: "met (met with friend)*",
    type: "multiple-choice" as const
  },
  {
    id: 230,
    question: "しゅくだいが　おわったら、________。",
    options: [
      "べんきょうします",
      "しゅくだいを　します",
      "テレビを　みます",
      "がっこうに　いきます"
    ],
    correctAnswer: 2,
    context: "When homework is finished... (たら conditional)*",
    explanation: "I'll watch TV (leisure activity after work)*",
    type: "multiple-choice" as const
  },
  {
    id: 231,
    question: "えきまで　________かかりますか。",
    options: [
      "どのくらい",
      "なに",
      "だれ",
      "どちら"
    ],
    correctAnswer: 0,
    context: "To the station, how much does it... (asking about time/distance)*",
    explanation: "how much/how long (time to station)*",
    type: "multiple-choice" as const
  },
  {
    id: 232,
    question: "きょうは　あめですから、________。",
    options: [
      "およぎましょう",
      "さんぽしましょう",
      "うちに　いましょう",
      "こうえんに　いきましょう"
    ],
    correctAnswer: 2,
    context: "It's raining today, so...*",
    explanation: "let's stay home (appropriate for rainy day)*",
    type: "multiple-choice" as const
  },
  {
    id: 233,
    question: "すみません、ちょっと　________が　あります。",
    options: [
      "しつもん",
      "こたえ",
      "あたま",
      "なまえ"
    ],
    correctAnswer: 0,
    context: "Excuse me, I have a little...*",
    explanation: "question (polite way to ask question)*",
    type: "multiple-choice" as const
  },
  {
    id: 234,
    question: "たんじょうびに　________を　もらいました。",
    options: [
      "プレゼント",
      "しつもん",
      "しゅくだい",
      "しごと"
    ],
    correctAnswer: 0,
    context: "On birthday, received...*",
    explanation: "present (appropriate for birthday)*",
    type: "multiple-choice" as const
  },
  {
    id: 235,
    question: "おなまえは　________ですか。",
    options: [
      "なん",
      "どこ",
      "いつ",
      "だれ"
    ],
    correctAnswer: 0,
    context: "What is your name?*",
    explanation: "what (asking for name)*",
    type: "multiple-choice" as const
  },
  {
    id: 236,
    question: "きょうは　つかれていますから、________。",
    options: [
      "たくさん　はたらきます",
      "はやく　ねます",
      "たくさん　あそびます",
      "ともだちに　あいます"
    ],
    correctAnswer: 1,
    context: "Tired today, so...*",
    explanation: "sleep early (appropriate when tired)*",
    type: "multiple-choice" as const
  },
  {
    id: 238,
    question: "ごはんを　たべる　まえに、________。",
    options: [
      "はを　みがきます",
      "てを　あらいます",
      "ふくを　きます",
      "くつを　はきます"
    ],
    correctAnswer: 1,
    context: "Before eating rice/meal...*",
    explanation: "wash hands (appropriate before eating)*",
    type: "multiple-choice" as const
  },
  {
    id: 239,
    question: "すみません、________を　おとしました。",
    options: [
      "かぎ",
      "そら",
      "ひかり",
      "こえ"
    ],
    correctAnswer: 0,
    context: "Excuse me, I dropped...*",
    explanation: "key (something you can drop)*",
    type: "multiple-choice" as const
  },
  {
    id: 240,
    question: "でんしゃが　きましたから、________。",
    options: [
      "いそぎましょう",
      "ゆっくり　あるきましょう",
      "やすみましょう",
      "かえりましょう"
    ],
    correctAnswer: 0,
    context: "The train came, so...*",
    explanation: "let's hurry (appropriate when train arrives)*",
    type: "multiple-choice" as const
  }
];

// Export total count for convenience
export const totalContextualExpressions = 162;
