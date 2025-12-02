'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Volume2 } from 'lucide-react';
import PublicNavbar from '@/components/PublicNavbar';

interface KanaItem {
  character: string;
  romaji: string;
  type: 'basic' | 'dakuten' | 'combination';
}

export default function KatakanaPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Basic Katakana
  const basicKatakana: KanaItem[] = [
    { character: 'ア', romaji: 'a', type: 'basic' },
    { character: 'イ', romaji: 'i', type: 'basic' },
    { character: 'ウ', romaji: 'u', type: 'basic' },
    { character: 'エ', romaji: 'e', type: 'basic' },
    { character: 'オ', romaji: 'o', type: 'basic' },
    { character: 'カ', romaji: 'ka', type: 'basic' },
    { character: 'キ', romaji: 'ki', type: 'basic' },
    { character: 'ク', romaji: 'ku', type: 'basic' },
    { character: 'ケ', romaji: 'ke', type: 'basic' },
    { character: 'コ', romaji: 'ko', type: 'basic' },
    { character: 'サ', romaji: 'sa', type: 'basic' },
    { character: 'シ', romaji: 'shi', type: 'basic' },
    { character: 'ス', romaji: 'su', type: 'basic' },
    { character: 'セ', romaji: 'se', type: 'basic' },
    { character: 'ソ', romaji: 'so', type: 'basic' },
    { character: 'タ', romaji: 'ta', type: 'basic' },
    { character: 'チ', romaji: 'chi', type: 'basic' },
    { character: 'ツ', romaji: 'tsu', type: 'basic' },
    { character: 'テ', romaji: 'te', type: 'basic' },
    { character: 'ト', romaji: 'to', type: 'basic' },
    { character: 'ナ', romaji: 'na', type: 'basic' },
    { character: 'ニ', romaji: 'ni', type: 'basic' },
    { character: 'ヌ', romaji: 'nu', type: 'basic' },
    { character: 'ネ', romaji: 'ne', type: 'basic' },
    { character: 'ノ', romaji: 'no', type: 'basic' },
    { character: 'ハ', romaji: 'ha', type: 'basic' },
    { character: 'ヒ', romaji: 'hi', type: 'basic' },
    { character: 'フ', romaji: 'fu', type: 'basic' },
    { character: 'ヘ', romaji: 'he', type: 'basic' },
    { character: 'ホ', romaji: 'ho', type: 'basic' },
    { character: 'マ', romaji: 'ma', type: 'basic' },
    { character: 'ミ', romaji: 'mi', type: 'basic' },
    { character: 'ム', romaji: 'mu', type: 'basic' },
    { character: 'メ', romaji: 'me', type: 'basic' },
    { character: 'モ', romaji: 'mo', type: 'basic' },
    { character: 'ヤ', romaji: 'ya', type: 'basic' },
    { character: 'ユ', romaji: 'yu', type: 'basic' },
    { character: 'ヨ', romaji: 'yo', type: 'basic' },
    { character: 'ラ', romaji: 'ra', type: 'basic' },
    { character: 'リ', romaji: 'ri', type: 'basic' },
    { character: 'ル', romaji: 'ru', type: 'basic' },
    { character: 'レ', romaji: 're', type: 'basic' },
    { character: 'ロ', romaji: 'ro', type: 'basic' },
    { character: 'ワ', romaji: 'wa', type: 'basic' },
    { character: 'ヲ', romaji: 'wo', type: 'basic' },
    { character: 'ン', romaji: 'n', type: 'basic' },
  ];

  // Dakuten & Handakuten
  const dakutenKatakana: KanaItem[] = [
    { character: 'ガ', romaji: 'ga', type: 'dakuten' },
    { character: 'ギ', romaji: 'gi', type: 'dakuten' },
    { character: 'グ', romaji: 'gu', type: 'dakuten' },
    { character: 'ゲ', romaji: 'ge', type: 'dakuten' },
    { character: 'ゴ', romaji: 'go', type: 'dakuten' },
    { character: 'ザ', romaji: 'za', type: 'dakuten' },
    { character: 'ジ', romaji: 'ji', type: 'dakuten' },
    { character: 'ズ', romaji: 'zu', type: 'dakuten' },
    { character: 'ゼ', romaji: 'ze', type: 'dakuten' },
    { character: 'ゾ', romaji: 'zo', type: 'dakuten' },
    { character: 'ダ', romaji: 'da', type: 'dakuten' },
    { character: 'ヂ', romaji: 'ji', type: 'dakuten' },
    { character: 'ヅ', romaji: 'zu', type: 'dakuten' },
    { character: 'デ', romaji: 'de', type: 'dakuten' },
    { character: 'ド', romaji: 'do', type: 'dakuten' },
    { character: 'バ', romaji: 'ba', type: 'dakuten' },
    { character: 'ビ', romaji: 'bi', type: 'dakuten' },
    { character: 'ブ', romaji: 'bu', type: 'dakuten' },
    { character: 'ベ', romaji: 'be', type: 'dakuten' },
    { character: 'ボ', romaji: 'bo', type: 'dakuten' },
    { character: 'パ', romaji: 'pa', type: 'dakuten' },
    { character: 'ピ', romaji: 'pi', type: 'dakuten' },
    { character: 'プ', romaji: 'pu', type: 'dakuten' },
    { character: 'ペ', romaji: 'pe', type: 'dakuten' },
    { character: 'ポ', romaji: 'po', type: 'dakuten' },
  ];

  // Combinations (Yōon)
  const combinationKatakana: KanaItem[] = [
    { character: 'キャ', romaji: 'kya', type: 'combination' },
    { character: 'キュ', romaji: 'kyu', type: 'combination' },
    { character: 'キョ', romaji: 'kyo', type: 'combination' },
    { character: 'シャ', romaji: 'sha', type: 'combination' },
    { character: 'シュ', romaji: 'shu', type: 'combination' },
    { character: 'ショ', romaji: 'sho', type: 'combination' },
    { character: 'チャ', romaji: 'cha', type: 'combination' },
    { character: 'チュ', romaji: 'chu', type: 'combination' },
    { character: 'チョ', romaji: 'cho', type: 'combination' },
    { character: 'ニャ', romaji: 'nya', type: 'combination' },
    { character: 'ニュ', romaji: 'nyu', type: 'combination' },
    { character: 'ニョ', romaji: 'nyo', type: 'combination' },
    { character: 'ヒャ', romaji: 'hya', type: 'combination' },
    { character: 'ヒュ', romaji: 'hyu', type: 'combination' },
    { character: 'ヒョ', romaji: 'hyo', type: 'combination' },
    { character: 'ミャ', romaji: 'mya', type: 'combination' },
    { character: 'ミュ', romaji: 'myu', type: 'combination' },
    { character: 'ミョ', romaji: 'myo', type: 'combination' },
    { character: 'リャ', romaji: 'rya', type: 'combination' },
    { character: 'リュ', romaji: 'ryu', type: 'combination' },
    { character: 'リョ', romaji: 'ryo', type: 'combination' },
    { character: 'ギャ', romaji: 'gya', type: 'combination' },
    { character: 'ギュ', romaji: 'gyu', type: 'combination' },
    { character: 'ギョ', romaji: 'gyo', type: 'combination' },
    { character: 'ジャ', romaji: 'ja', type: 'combination' },
    { character: 'ジュ', romaji: 'ju', type: 'combination' },
    { character: 'ジョ', romaji: 'jo', type: 'combination' },
    { character: 'ビャ', romaji: 'bya', type: 'combination' },
    { character: 'ビュ', romaji: 'byu', type: 'combination' },
    { character: 'ビョ', romaji: 'byo', type: 'combination' },
    { character: 'ピャ', romaji: 'pya', type: 'combination' },
    { character: 'ピュ', romaji: 'pyu', type: 'combination' },
    { character: 'ピョ', romaji: 'pyo', type: 'combination' },
  ];

  const allKatakana = [...basicKatakana, ...dakutenKatakana, ...combinationKatakana];

  const filteredKatakana = allKatakana.filter(kana => 
    kana.character.includes(searchTerm) ||
    kana.romaji.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.7;
      window.speechSynthesis.speak(utterance);
    }
  };

  // SEO metadata
  const pageTitle = 'Katakana Chart - Complete Reference | Rocket JLPT';
  const pageDescription = 'Complete katakana chart with all 104 characters including basic, dakuten, and combination characters. Learn Japanese katakana with audio pronunciation.';

  useEffect(() => {
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

    updateMetaTag('description', pageDescription);
    updateMetaTag('keywords', 'katakana, katakana chart, Japanese katakana, learn katakana, katakana pronunciation, Japanese alphabet');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:text-pink-600 transition-colors">Home</Link>
                <span>/</span>
                <span className="text-gray-900">Katakana</span>
              </div>
              
              {/* Title with gradient accent */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl font-bold text-gray-900">
                    Katakana Chart
                  </h1>
                  <span className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full">
                    {filteredKatakana.length} characters
                  </span>
                </div>
                <p className="text-lg text-gray-600">
                  Complete reference for all katakana characters with romaji and audio pronunciation
                </p>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-lg">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by character or romaji..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-shadow"
                  />
                </div>
              </div>
            </div>

            {/* Progress Meter - Desktop Only */}
            <div className="hidden xl:flex flex-col items-center gap-4">
              <div className="relative w-44 h-44">
                {/* Background circles */}
                <svg className="w-44 h-44 transform -rotate-90">
                  {/* Background segments */}
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <circle
                      key={`bg-${i}`}
                      cx="88"
                      cy="88"
                      r="76"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="16"
                      strokeDasharray="59.69 417.83"
                      strokeDashoffset={-i * 59.69}
                      strokeLinecap="round"
                    />
                  ))}
                  {/* Progress segments - showing 30% (2.4 segments out of 8) */}
                  {[0, 1, 2].map((i) => (
                    <circle
                      key={`progress-${i}`}
                      cx="88"
                      cy="88"
                      r="76"
                      fill="none"
                      stroke={i < 2 ? "#ec4899" : "#f97316"}
                      strokeWidth="16"
                      strokeDasharray="59.69 417.83"
                      strokeDashoffset={-i * 59.69}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                  ))}
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">0%</span>
                </div>
              </div>
              <Link 
                href="/login"
                className="text-sm text-gray-600 hover:text-pink-600 transition-colors font-medium"
              >
                Login to track progress
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Basic Katakana Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Katakana (46)</h2>
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3">
            {basicKatakana.filter(kana => 
              kana.character.includes(searchTerm) ||
              kana.romaji.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((kana, index) => (
              <button
                key={index}
                onClick={() => playAudio(kana.character)}
                className="relative bg-white rounded-lg border border-gray-200 border-b-4 border-b-gray-300 hover:border-pink-200 hover:border-b-pink-400 hover:shadow-md transition-all duration-200 p-3 text-center group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
                
                <div className="relative">
                  <div className="text-4xl font-bold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors font-japanese">
                    {kana.character}
                  </div>
                  <div className="text-xs text-gray-500">
                    {kana.romaji}
                  </div>
                  <Volume2 className="h-3 w-3 text-gray-400 mx-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dakuten & Handakuten Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Dakuten & Handakuten (25)</h2>
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3">
            {dakutenKatakana.filter(kana => 
              kana.character.includes(searchTerm) ||
              kana.romaji.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((kana, index) => (
              <button
                key={index}
                onClick={() => playAudio(kana.character)}
                className="relative bg-white rounded-lg border border-gray-200 border-b-4 border-b-gray-300 hover:border-pink-200 hover:border-b-pink-400 hover:shadow-md transition-all duration-200 p-3 text-center group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
                
                <div className="relative">
                  <div className="text-4xl font-bold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors font-japanese">
                    {kana.character}
                  </div>
                  <div className="text-xs text-gray-500">
                    {kana.romaji}
                  </div>
                  <Volume2 className="h-3 w-3 text-gray-400 mx-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Combinations Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Combinations - Yōon (33)</h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
            {combinationKatakana.filter(kana => 
              kana.character.includes(searchTerm) ||
              kana.romaji.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((kana, index) => (
              <button
                key={index}
                onClick={() => playAudio(kana.character)}
                className="relative bg-white rounded-lg border border-gray-200 border-b-4 border-b-gray-300 hover:border-pink-200 hover:border-b-pink-400 hover:shadow-md transition-all duration-200 p-3 text-center group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
                
                <div className="relative">
                  <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors font-japanese">
                    {kana.character}
                  </div>
                  <div className="text-xs text-gray-500">
                    {kana.romaji}
                  </div>
                  <Volume2 className="h-3 w-3 text-gray-400 mx-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Start learning today
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Master katakana and prepare for your JLPT exam with interactive practice tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all shadow-sm"
              >
                Get Started Free
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-8 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
