'use client';

import { useState } from 'react';

interface KanaKeyboardProps {
  type: 'hiragana' | 'katakana';
  onKanaSelect: (kana: string) => void;
  correctKana: string[];
  wrongKana: string[];
}

// Hiragana characters organized by type
const hiraganaMap = {
  vowels: ['あ', 'い', 'う', 'え', 'お'],
  k: ['か', 'き', 'く', 'け', 'こ'],
  s: ['さ', 'し', 'す', 'せ', 'そ'],
  t: ['た', 'ち', 'つ', 'て', 'と'],
  n: ['な', 'に', 'ぬ', 'ね', 'の'],
  h: ['は', 'ひ', 'ふ', 'へ', 'ほ'],
  m: ['ま', 'み', 'む', 'め', 'も'],
  y: ['や', 'ゆ', 'よ'],
  r: ['ら', 'り', 'る', 'れ', 'ろ'],
  w: ['わ', 'を'],
  nn: ['ん'],
  g: ['が', 'ぎ', 'ぐ', 'げ', 'ご'],
  z: ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'],
  d: ['だ', 'ぢ', 'づ', 'で', 'ど'],
  b: ['ば', 'び', 'ぶ', 'べ', 'ぼ'],
  p: ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'],
  small: ['っ', 'ゃ', 'ゅ', 'ょ']
};

// Katakana characters organized by type
const katakanaMap = {
  vowels: ['ア', 'イ', 'ウ', 'エ', 'オ'],
  k: ['カ', 'キ', 'ク', 'ケ', 'コ'],
  s: ['サ', 'シ', 'ス', 'セ', 'ソ'],
  t: ['タ', 'チ', 'ツ', 'テ', 'ト'],
  n: ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
  h: ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
  m: ['マ', 'ミ', 'ム', 'メ', 'モ'],
  y: ['ヤ', 'ユ', 'ヨ'],
  r: ['ラ', 'リ', 'ル', 'レ', 'ロ'],
  w: ['ワ', 'ヲ'],
  nn: ['ン'],
  g: ['ガ', 'ギ', 'グ', 'ゲ', 'ゴ'],
  z: ['ザ', 'ジ', 'ズ', 'ゼ', 'ゾ'],
  d: ['ダ', 'ヂ', 'ヅ', 'デ', 'ド'],
  b: ['バ', 'ビ', 'ブ', 'ベ', 'ボ'],
  p: ['パ', 'ピ', 'プ', 'ペ', 'ポ'],
  small: ['ッ', 'ャ', 'ュ', 'ョ']
};

export default function KanaKeyboard({ type, onKanaSelect, correctKana, wrongKana }: KanaKeyboardProps) {
  const [selectedTab, setSelectedTab] = useState<string>('vowels');
  
  const kanaMap = type === 'hiragana' ? hiraganaMap : katakanaMap;
  
  // Combine correct and wrong kana for display
  const displayKana = [...correctKana, ...wrongKana];
  
  // Filter kana to show only relevant ones based on what's needed
  const getRelevantKana = (category: string) => {
    const categoryKana = kanaMap[category as keyof typeof kanaMap] || [];
    return categoryKana.filter(kana => displayKana.includes(kana));
  };

  // Get tabs that have relevant kana
  const relevantTabs = Object.keys(kanaMap).filter(category => 
    getRelevantKana(category).length > 0
  );

  const tabLabels: { [key: string]: string } = {
    vowels: 'あ行',
    k: 'か行',
    s: 'さ行',
    t: 'た行',
    n: 'な行',
    h: 'は行',
    m: 'ま行',
    y: 'や行',
    r: 'ら行',
    w: 'わ行',
    nn: 'ん',
    g: 'が行',
    z: 'ざ行',
    d: 'だ行',
    b: 'ば行',
    p: 'ぱ行',
    small: '小文字'
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          {type === 'hiragana' ? 'ひらがな' : 'カタカナ'} Keyboard
        </h3>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-4">
          {relevantTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                selectedTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>
      </div>

      {/* Kana Grid */}
      <div className="grid grid-cols-5 gap-2">
        {getRelevantKana(selectedTab).map((kana) => {
          const isCorrect = correctKana.includes(kana);
          const isWrong = wrongKana.includes(kana);
          
          return (
            <button
              key={kana}
              onClick={() => onKanaSelect(kana)}
              className={`
                p-3 text-xl font-japanese rounded-lg border-2 transition-all duration-200
                ${isCorrect 
                  ? 'border-green-500 bg-green-50 text-green-700 hover:bg-green-100' 
                  : isWrong 
                    ? 'border-red-300 bg-red-50 text-red-600 hover:bg-red-100'
                    : 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100'
                }
                hover:scale-105 active:scale-95
              `}
            >
              {kana}
            </button>
          );
        })}
      </div>
      
      {/* Helper text */}
      <div className="mt-4 text-sm text-gray-600 text-center">
        Click the characters to type them into the input field above
      </div>
    </div>
  );
}
