'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Volume2, RefreshCw, Check, X, Eye } from 'lucide-react';
import PublicNavbar from '@/components/PublicNavbar';

interface Sentence {
  jpFull: string;
  jpBlank: string;
  en: string;
}

interface LocationWord {
  id: string;
  kanji: string;
  reading: string;
  meaning: string;
  sentences: Sentence[];
}

const LOCATION_WORDS: LocationWord[] = [
  {
    id: "koko",
    kanji: "ここ",
    reading: "ここ",
    meaning: "here (near me)",
    sentences: [
      { jpFull: "ここにかばんを置いてください。", jpBlank: "＿＿にかばんを置いてください。", en: "Please put your bag here." },
      { jpFull: "ここは静かですね。", jpBlank: "＿＿は静かですね。", en: "It is quiet here." },
      { jpFull: "ここから歩けますか？", jpBlank: "＿＿から歩けますか？", en: "Can I walk from here?" }
    ]
  },
  {
    id: "soko",
    kanji: "そこ",
    reading: "そこ",
    meaning: "there (near listener)",
    sentences: [
      { jpFull: "そこに本を置いてください。", jpBlank: "＿＿に本を置いてください。", en: "Please put the book there." },
      { jpFull: "そこは私の席です。", jpBlank: "＿＿は私の席です。", en: "That is my seat." },
      { jpFull: "そこにペンがありますか？", jpBlank: "＿＿にペンがありますか？", en: "Is there a pen there?" }
    ]
  },
  {
    id: "asoko",
    kanji: "あそこ",
    reading: "あそこ",
    meaning: "over there (far)",
    sentences: [
      { jpFull: "あそこにコンビニがあります。", jpBlank: "＿＿にコンビニがあります。", en: "There is a convenience store over there." },
      { jpFull: "友だちはあそこで待っています。", jpBlank: "友だちは＿＿で待っています。", en: "My friend is waiting over there." },
      { jpFull: "あそこの店は安いです。", jpBlank: "＿＿の店は安いです。", en: "The store over there is cheap." }
    ]
  },
  {
    id: "kochira",
    kanji: "こちら",
    reading: "こちら",
    meaning: "this way; this direction (polite)",
    sentences: [
      { jpFull: "こちらへどうぞ。", jpBlank: "＿＿へどうぞ。", en: "This way, please." },
      { jpFull: "こちらでお待ちください。", jpBlank: "＿＿でお待ちください。", en: "Please wait here." },
      { jpFull: "ご案内はこちらです。", jpBlank: "ご案内は＿＿です。", en: "The guidance is this way." }
    ]
  },
  {
    id: "sochira",
    kanji: "そちら",
    reading: "そちら",
    meaning: "that way (polite, near listener)",
    sentences: [
      { jpFull: "そちらが出口です。", jpBlank: "＿＿が出口です。", en: "The exit is that way." },
      { jpFull: "書類はそちらにあります。", jpBlank: "書類は＿＿にあります。", en: "The documents are there near you." },
      { jpFull: "お名前はそちらに書いてください。", jpBlank: "お名前は＿＿に書いてください。", en: "Please write your name there." }
    ]
  },
  {
    id: "achira",
    kanji: "あちら",
    reading: "あちら",
    meaning: "that way over there (polite)",
    sentences: [
      { jpFull: "あちらが受付です。", jpBlank: "＿＿が受付です。", en: "The reception is over there." },
      { jpFull: "トイレはあちらです。", jpBlank: "トイレは＿＿です。", en: "The restroom is over there." },
      { jpFull: "ご案内はあちらになります。", jpBlank: "ご案内は＿＿になります。", en: "The information area is over there." }
    ]
  },
  {
    id: "mukou",
    kanji: "向こう",
    reading: "むこう",
    meaning: "opposite side; over there; across",
    sentences: [
      { jpFull: "銀行は道の向こうにあります。", jpBlank: "銀行は道の＿＿にあります。", en: "The bank is across the street." },
      { jpFull: "向こうで会いましょう。", jpBlank: "＿＿で会いましょう。", en: "Let's meet over there." },
      { jpFull: "川の向こうは静かです。", jpBlank: "川の＿＿は静かです。", en: "Across the river is quiet." }
    ]
  },
  {
    id: "ue",
    kanji: "上",
    reading: "うえ",
    meaning: "above; on top",
    sentences: [
      { jpFull: "コップはテーブルの上です。", jpBlank: "コップはテーブルの＿＿です。", en: "The cup is on the table." },
      { jpFull: "服は棚の上にあります。", jpBlank: "服は棚の＿＿にあります。", en: "The clothes are on the shelf." },
      { jpFull: "上の階に住んでいます。", jpBlank: "＿＿の階に住んでいます。", en: "I live on the upper floor." }
    ]
  },
  {
    id: "shita",
    kanji: "下",
    reading: "した",
    meaning: "under; below",
    sentences: [
      { jpFull: "猫はベッドの下にいます。", jpBlank: "猫はベッドの＿＿にいます。", en: "The cat is under the bed." },
      { jpFull: "ゴミ箱は机の下です。", jpBlank: "ゴミ箱は机の＿＿です。", en: "The trashcan is under the desk." },
      { jpFull: "下のボタンを押してください。", jpBlank: "＿＿のボタンを押してください。", en: "Please press the lower button." }
    ]
  },
  {
    id: "mae",
    kanji: "前",
    reading: "まえ",
    meaning: "in front",
    sentences: [
      { jpFull: "車の前で待っています。", jpBlank: "車の＿＿で待っています。", en: "I am waiting in front of the car." },
      { jpFull: "先生の前に座ってください。", jpBlank: "先生の＿＿に座ってください。", en: "Please sit in front of the teacher." },
      { jpFull: "前のページを見てください。", jpBlank: "＿＿のページを見てください。", en: "Please look at the previous page." }
    ]
  },
  {
    id: "ushiro",
    kanji: "後ろ",
    reading: "うしろ",
    meaning: "behind",
    sentences: [
      { jpFull: "犬は私の後ろにいます。", jpBlank: "犬は私の＿＿にいます。", en: "The dog is behind me." },
      { jpFull: "後ろの席が空いています。", jpBlank: "＿＿の席が空いています。", en: "The seat behind is open." },
      { jpFull: "後ろを見てください。", jpBlank: "＿＿を見てください。", en: "Please look behind you." }
    ]
  },
  {
    id: "naka",
    kanji: "中",
    reading: "なか",
    meaning: "inside",
    sentences: [
      { jpFull: "箱の中にプレゼントがあります。", jpBlank: "箱の＿＿にプレゼントがあります。", en: "There is a present inside the box." },
      { jpFull: "カバンの中に財布があります。", jpBlank: "カバンの＿＿に財布があります。", en: "There is a wallet inside the bag." },
      { jpFull: "中に入ってください。", jpBlank: "＿＿に入ってください。", en: "Please go inside." }
    ]
  },
  {
    id: "soto",
    kanji: "外",
    reading: "そと",
    meaning: "outside",
    sentences: [
      { jpFull: "外は寒いです。", jpBlank: "＿＿は寒いです。", en: "It is cold outside." },
      { jpFull: "子どもは外で遊んでいます。", jpBlank: "子どもは＿＿で遊んでいます。", en: "Children are playing outside." },
      { jpFull: "外の音が大きいです。", jpBlank: "＿＿の音が大きいです。", en: "The noise outside is loud." }
    ]
  },
  {
    id: "migi",
    kanji: "右",
    reading: "みぎ",
    meaning: "right (direction)",
    sentences: [
      { jpFull: "右に曲がってください。", jpBlank: "＿＿に曲がってください。", en: "Please turn right." },
      { jpFull: "リモコンはテレビの右です。", jpBlank: "リモコンはテレビの＿＿です。", en: "The remote is to the right of the TV." },
      { jpFull: "右のポケットに入っています。", jpBlank: "＿＿のポケットに入っています。", en: "It is in the right pocket." }
    ]
  },
  {
    id: "hidari",
    kanji: "左",
    reading: "ひだり",
    meaning: "left",
    sentences: [
      { jpFull: "左のページを開いてください。", jpBlank: "＿＿のページを開いてください。", en: "Open the left page." },
      { jpFull: "次の角を左に曲がります。", jpBlank: "次の角を＿＿に曲がります。", en: "Turn left at the next corner." },
      { jpFull: "左手に荷物を持っています。", jpBlank: "＿＿手に荷物を持っています。", en: "I am holding the bag in my left hand." }
    ]
  },
  {
    id: "chikaku",
    kanji: "近く",
    reading: "ちかく",
    meaning: "near; nearby",
    sentences: [
      { jpFull: "この近くにレストランがあります。", jpBlank: "この＿＿にレストランがあります。", en: "There is a restaurant near here." },
      { jpFull: "駅は家の近くです。", jpBlank: "駅は家の＿＿です。", en: "The station is near my house." },
      { jpFull: "近くでイベントがあります。", jpBlank: "＿＿でイベントがあります。", en: "There is an event nearby." }
    ]
  },
  {
    id: "tooku",
    kanji: "遠く",
    reading: "とおく",
    meaning: "far",
    sentences: [
      { jpFull: "学校は家から遠いです。", jpBlank: "学校は家から＿＿です。", en: "The school is far from home." },
      { jpFull: "遠くに山が見えます。", jpBlank: "＿＿に山が見えます。", en: "I can see mountains in the distance." },
      { jpFull: "ここから遠くないですか？", jpBlank: "ここから＿＿ないですか？", en: "Isn't it far from here?" }
    ]
  },
  {
    id: "aida",
    kanji: "間",
    reading: "あいだ",
    meaning: "between",
    sentences: [
      { jpFull: "猫はソファの間にいます。", jpBlank: "猫はソファの＿＿にいます。", en: "The cat is between the sofas." },
      { jpFull: "二つの店の間にあります。", jpBlank: "二つの店の＿＿にあります。", en: "It is between the two stores." },
      { jpFull: "この間を通ってください。", jpBlank: "この＿＿を通ってください。", en: "Please walk through this space." }
    ]
  },
  {
    id: "tonari",
    kanji: "となり",
    reading: "となり",
    meaning: "next to",
    sentences: [
      { jpFull: "銀行のとなりに薬局があります。", jpBlank: "銀行の＿＿に薬局があります。", en: "There is a pharmacy next to the bank." },
      { jpFull: "私は友だちのとなりに座りました。", jpBlank: "私は友だちの＿＿に座りました。", en: "I sat next to my friend." },
      { jpFull: "となりの部屋が静かです。", jpBlank: "＿＿の部屋が静かです。", en: "The room next door is quiet." }
    ]
  },
  {
    id: "yoko",
    kanji: "よこ",
    reading: "よこ",
    meaning: "beside",
    sentences: [
      { jpFull: "いすのよこにかばんがあります。", jpBlank: "いすの＿＿にかばんがあります。", en: "The bag is beside the chair." },
      { jpFull: "犬は私のよこにいます。", jpBlank: "犬は私の＿＿にいます。", en: "The dog is beside me." },
      { jpFull: "コンビニは郵便局のよこです。", jpBlank: "コンビニは郵便局の＿＿です。", en: "The convenience store is beside the post office." }
    ]
  },
  {
    id: "temaee",
    kanji: "手前",
    reading: "てまえ",
    meaning: "in front of; on this side",
    sentences: [
      { jpFull: "駅の手前で降りました。", jpBlank: "駅の＿＿で降りました。", en: "I got off before the station." },
      { jpFull: "手前の道を右に曲がります。", jpBlank: "＿＿の道を右に曲がります。", en: "Turn right at the road before it." },
      { jpFull: "手前にコンビニがあります。", jpBlank: "＿＿にコンビニがあります。", en: "There is a convenience store on this side." }
    ]
  },
  {
    id: "oku",
    kanji: "奥",
    reading: "おく",
    meaning: "inner part; in the back; deep inside",
    sentences: [
      { jpFull: "部屋の奥に席があります。", jpBlank: "部屋の＿＿に席があります。", en: "There are seats in the back of the room." },
      { jpFull: "冷蔵庫の奥に飲み物があります。", jpBlank: "冷蔵庫の＿＿に飲み物があります。", en: "There are drinks in the back of the fridge." },
      { jpFull: "奥のテーブルに座ってください。", jpBlank: "＿＿のテーブルに座ってください。", en: "Please sit at the table in the back." }
    ]
  },
  {
    id: "mawari",
    kanji: "周り",
    reading: "まわり",
    meaning: "around; surrounding",
    sentences: [
      { jpFull: "家の周りに木があります。", jpBlank: "家の＿＿に木があります。", en: "There are trees around the house." },
      { jpFull: "公園の周りを走りました。", jpBlank: "公園の＿＿を走りました。", en: "I ran around the park." },
      { jpFull: "店の周りがにぎやかです。", jpBlank: "店の＿＿がにぎやかです。", en: "The area around the store is lively." }
    ]
  },
  {
    id: "hashi",
    kanji: "端",
    reading: "はし",
    meaning: "edge; end",
    sentences: [
      { jpFull: "端の席に座りたいです。", jpBlank: "＿＿の席に座りたいです。", en: "I want to sit at the edge seat." },
      { jpFull: "紙の端を切ってください。", jpBlank: "紙の＿＿を切ってください。", en: "Please cut the edge of the paper." },
      { jpFull: "道の端を歩いてください。", jpBlank: "道の＿＿を歩いてください。", en: "Please walk on the edge of the road." }
    ]
  }
];

type Mode = 'browse' | 'quiz';

export default function LocationPracticePage() {
  const [mode, setMode] = useState<Mode>('browse');
  const [selectedWord, setSelectedWord] = useState<LocationWord | null>(null);
  const [quizQuestion, setQuizQuestion] = useState<{ word: LocationWord; sentence: Sentence } | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showAnswer, setShowAnswer] = useState(false);

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.75;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      const voices = window.speechSynthesis.getVoices();
      const japaneseVoices = voices.filter(voice => 
        voice.lang.startsWith('ja') || voice.lang.startsWith('jp')
      );
      
      const preferredVoice = japaneseVoices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Kyoko') || 
        voice.name.includes('Otoya') ||
        voice.name.includes('Premium')
      ) || japaneseVoices[0];
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const generateQuizQuestion = () => {
    const randomWord = LOCATION_WORDS[Math.floor(Math.random() * LOCATION_WORDS.length)];
    const randomSentence = randomWord.sentences[Math.floor(Math.random() * randomWord.sentences.length)];
    
    setQuizQuestion({ word: randomWord, sentence: randomSentence });
    setUserAnswer('');
    setShowResult(false);
    setShowAnswer(false);
  };

  const checkAnswer = () => {
    if (!quizQuestion) return;
    
    const correctAnswer = quizQuestion.word.kanji;
    const isMatch = userAnswer.trim() === correctAnswer;
    
    setIsCorrect(isMatch);
    setShowResult(true);
    setScore(prev => ({
      correct: prev.correct + (isMatch ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const startQuiz = () => {
    setMode('quiz');
    generateQuizQuestion();
  };

  // SEO: Set meta tags
  useEffect(() => {
    const pageTitle = 'Japanese Location & Direction Practice - Master こそあど Words | Rocket JLPT';
    const pageDescription = 'Free interactive Japanese location and direction practice. Master demonstratives (ここ, そこ, あそこ), positions (上, 下, 前, 後ろ), and directions with sentence examples and quizzes.';
    const pageUrl = 'https://rocketjlpt.com/tools/location';

    document.title = pageTitle;

    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updateOGTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', pageDescription);
    updateMetaTag('keywords', 'Japanese location words, direction practice, こそあど, demonstratives, position words, JLPT location, Japanese grammar');
    updateOGTag('og:title', pageTitle);
    updateOGTag('og:description', pageDescription);
    updateOGTag('og:url', pageUrl);
    updateOGTag('og:type', 'website');
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', pageTitle);
    updateMetaTag('twitter:description', pageDescription);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = pageUrl;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Location & Direction Practice
          </h1>
          <p className="text-lg text-gray-600">
            Master Japanese demonstratives, positions, and directional words
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Mode Selection */}
        <div className="mb-8 flex gap-3">
          <button
            onClick={() => setMode('browse')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              mode === 'browse'
                ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-pink-300'
            }`}
          >
            Browse & Study
          </button>
          <button
            onClick={startQuiz}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              mode === 'quiz'
                ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-pink-300'
            }`}
          >
            Fill-in-the-Blank Quiz
          </button>
        </div>

        {/* Score Display */}
        {mode === 'quiz' && score.total > 0 && (
          <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-900">
                Score: {score.correct} / {score.total}
              </span>
              <span className="ml-4 text-lg text-gray-600">
                ({Math.round((score.correct / score.total) * 100)}%)
              </span>
            </div>
          </div>
        )}

        {mode === 'browse' ? (
          <div className="flex gap-6">
            {/* Word List - Left Sidebar */}
            <div className="w-80 flex-shrink-0">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Location Words</h2>
              <div className="space-y-2 max-h-[calc(100vh-350px)] overflow-y-auto pr-2">
                {LOCATION_WORDS.map((word) => (
                  <button
                    key={word.id}
                    onClick={() => setSelectedWord(word)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedWord?.id === word.id
                        ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-orange-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-pink-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="text-2xl font-bold text-gray-900 font-japanese mb-1">
                      {word.kanji}
                    </div>
                    <div className="text-sm text-gray-600 mb-1">{word.reading}</div>
                    <div className="text-sm font-semibold text-gray-900">{word.meaning}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Word Details - Main Area */}
            <div className="flex-1">
              {selectedWord ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="text-5xl font-bold text-gray-900 font-japanese mb-2">
                        {selectedWord.kanji}
                      </div>
                      <div className="text-xl text-gray-600 mb-2">{selectedWord.reading}</div>
                      <div className="text-lg font-semibold text-gray-900">{selectedWord.meaning}</div>
                    </div>
                    <button
                      onClick={() => playAudio(selectedWord.kanji)}
                      className="p-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full hover:from-pink-600 hover:to-orange-600 transition-all shadow-md"
                    >
                      <Volume2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900">Example Sentences:</h3>
                    {selectedWord.sentences.map((sentence, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="text-lg font-japanese text-gray-900 flex-1">
                            {sentence.jpFull}
                          </div>
                          <button
                            onClick={() => playAudio(sentence.jpFull)}
                            className="ml-3 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <Volume2 className="h-4 w-4 text-pink-600" />
                          </button>
                        </div>
                        <div className="text-sm text-gray-600">{sentence.en}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
                  <ol className="space-y-3 text-gray-700">
                    <li className="flex gap-3">
                      <span className="font-bold text-pink-600">1.</span>
                      <span>Select a location word from the list on the left</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-pink-600">2.</span>
                      <span>Study the meaning and example sentences</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-pink-600">3.</span>
                      <span>Click the speaker icon to hear pronunciation</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-pink-600">4.</span>
                      <span>Switch to Quiz mode to test your knowledge</span>
                    </li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Quiz Mode */
          <div className="max-w-3xl mx-auto">
            {quizQuestion && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Fill in the Blank</h2>
                
                <div className="mb-6">
                  <div className="bg-gray-50 rounded-lg p-6 mb-4">
                    <div className="text-2xl font-japanese text-gray-900 mb-3">
                      {quizQuestion.sentence.jpBlank}
                    </div>
                    <div className="text-gray-600">{quizQuestion.sentence.en}</div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your answer (type in hiragana or kanji):
                    </label>
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type the location word..."
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all text-lg font-japanese"
                      disabled={showResult}
                    />
                  </div>

                  {!showResult ? (
                    <div className="flex gap-3">
                      <button
                        onClick={checkAnswer}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all"
                      >
                        Check Answer
                      </button>
                      <button
                        onClick={() => setShowAnswer(!showAnswer)}
                        className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
                      >
                        <Eye className="h-5 w-5" />
                        {showAnswer ? 'Hide' : 'Show'} Answer
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg flex items-center gap-3 ${
                        isCorrect ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
                      }`}>
                        {isCorrect ? (
                          <>
                            <Check className="h-6 w-6 text-green-600" />
                            <span className="text-green-900 font-semibold">Correct!</span>
                          </>
                        ) : (
                          <>
                            <X className="h-6 w-6 text-red-600" />
                            <div className="flex-1">
                              <div className="text-red-900 font-semibold">Incorrect</div>
                              <div className="text-sm text-red-700">
                                Correct answer: <span className="font-japanese font-bold">{quizQuestion.word.kanji}</span> ({quizQuestion.word.meaning})
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-2">Complete sentence:</div>
                        <div className="text-xl font-japanese text-gray-900 mb-2 flex items-center gap-3">
                          {quizQuestion.sentence.jpFull}
                          <button
                            onClick={() => playAudio(quizQuestion.sentence.jpFull)}
                            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <Volume2 className="h-4 w-4 text-pink-600" />
                          </button>
                        </div>
                        <div className="text-gray-600">{quizQuestion.sentence.en}</div>
                      </div>

                      <button
                        onClick={generateQuizQuestion}
                        className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="h-5 w-5" />
                        Next Question
                      </button>
                    </div>
                  )}

                  {showAnswer && !showResult && (
                    <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                      <div className="text-sm text-yellow-800 mb-1">Answer:</div>
                      <div className="text-xl font-japanese font-bold text-yellow-900">
                        {quizQuestion.word.kanji} ({quizQuestion.word.meaning})
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
