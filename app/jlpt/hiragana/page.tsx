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

export default function HiraganaPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Basic Hiragana
  const basicHiragana: KanaItem[] = [
    { character: 'あ', romaji: 'a', type: 'basic' },
    { character: 'い', romaji: 'i', type: 'basic' },
    { character: 'う', romaji: 'u', type: 'basic' },
    { character: 'え', romaji: 'e', type: 'basic' },
    { character: 'お', romaji: 'o', type: 'basic' },
    { character: 'か', romaji: 'ka', type: 'basic' },
    { character: 'き', romaji: 'ki', type: 'basic' },
    { character: 'く', romaji: 'ku', type: 'basic' },
    { character: 'け', romaji: 'ke', type: 'basic' },
    { character: 'こ', romaji: 'ko', type: 'basic' },
    { character: 'さ', romaji: 'sa', type: 'basic' },
    { character: 'し', romaji: 'shi', type: 'basic' },
    { character: 'す', romaji: 'su', type: 'basic' },
    { character: 'せ', romaji: 'se', type: 'basic' },
    { character: 'そ', romaji: 'so', type: 'basic' },
    { character: 'た', romaji: 'ta', type: 'basic' },
    { character: 'ち', romaji: 'chi', type: 'basic' },
    { character: 'つ', romaji: 'tsu', type: 'basic' },
    { character: 'て', romaji: 'te', type: 'basic' },
    { character: 'と', romaji: 'to', type: 'basic' },
    { character: 'な', romaji: 'na', type: 'basic' },
    { character: 'に', romaji: 'ni', type: 'basic' },
    { character: 'ぬ', romaji: 'nu', type: 'basic' },
    { character: 'ね', romaji: 'ne', type: 'basic' },
    { character: 'の', romaji: 'no', type: 'basic' },
    { character: 'は', romaji: 'ha', type: 'basic' },
    { character: 'ひ', romaji: 'hi', type: 'basic' },
    { character: 'ふ', romaji: 'fu', type: 'basic' },
    { character: 'へ', romaji: 'he', type: 'basic' },
    { character: 'ほ', romaji: 'ho', type: 'basic' },
    { character: 'ま', romaji: 'ma', type: 'basic' },
    { character: 'み', romaji: 'mi', type: 'basic' },
    { character: 'む', romaji: 'mu', type: 'basic' },
    { character: 'め', romaji: 'me', type: 'basic' },
    { character: 'も', romaji: 'mo', type: 'basic' },
    { character: 'や', romaji: 'ya', type: 'basic' },
    { character: 'ゆ', romaji: 'yu', type: 'basic' },
    { character: 'よ', romaji: 'yo', type: 'basic' },
    { character: 'ら', romaji: 'ra', type: 'basic' },
    { character: 'り', romaji: 'ri', type: 'basic' },
    { character: 'る', romaji: 'ru', type: 'basic' },
    { character: 'れ', romaji: 're', type: 'basic' },
    { character: 'ろ', romaji: 'ro', type: 'basic' },
    { character: 'わ', romaji: 'wa', type: 'basic' },
    { character: 'を', romaji: 'wo', type: 'basic' },
    { character: 'ん', romaji: 'n', type: 'basic' },
  ];

  // Dakuten & Handakuten
  const dakutenHiragana: KanaItem[] = [
    { character: 'が', romaji: 'ga', type: 'dakuten' },
    { character: 'ぎ', romaji: 'gi', type: 'dakuten' },
    { character: 'ぐ', romaji: 'gu', type: 'dakuten' },
    { character: 'げ', romaji: 'ge', type: 'dakuten' },
    { character: 'ご', romaji: 'go', type: 'dakuten' },
    { character: 'ざ', romaji: 'za', type: 'dakuten' },
    { character: 'じ', romaji: 'ji', type: 'dakuten' },
    { character: 'ず', romaji: 'zu', type: 'dakuten' },
    { character: 'ぜ', romaji: 'ze', type: 'dakuten' },
    { character: 'ぞ', romaji: 'zo', type: 'dakuten' },
    { character: 'だ', romaji: 'da', type: 'dakuten' },
    { character: 'ぢ', romaji: 'ji', type: 'dakuten' },
    { character: 'づ', romaji: 'zu', type: 'dakuten' },
    { character: 'で', romaji: 'de', type: 'dakuten' },
    { character: 'ど', romaji: 'do', type: 'dakuten' },
    { character: 'ば', romaji: 'ba', type: 'dakuten' },
    { character: 'び', romaji: 'bi', type: 'dakuten' },
    { character: 'ぶ', romaji: 'bu', type: 'dakuten' },
    { character: 'べ', romaji: 'be', type: 'dakuten' },
    { character: 'ぼ', romaji: 'bo', type: 'dakuten' },
    { character: 'ぱ', romaji: 'pa', type: 'dakuten' },
    { character: 'ぴ', romaji: 'pi', type: 'dakuten' },
    { character: 'ぷ', romaji: 'pu', type: 'dakuten' },
    { character: 'ぺ', romaji: 'pe', type: 'dakuten' },
    { character: 'ぽ', romaji: 'po', type: 'dakuten' },
  ];

  // Combinations (Yōon)
  const combinationHiragana: KanaItem[] = [
    { character: 'きゃ', romaji: 'kya', type: 'combination' },
    { character: 'きゅ', romaji: 'kyu', type: 'combination' },
    { character: 'きょ', romaji: 'kyo', type: 'combination' },
    { character: 'しゃ', romaji: 'sha', type: 'combination' },
    { character: 'しゅ', romaji: 'shu', type: 'combination' },
    { character: 'しょ', romaji: 'sho', type: 'combination' },
    { character: 'ちゃ', romaji: 'cha', type: 'combination' },
    { character: 'ちゅ', romaji: 'chu', type: 'combination' },
    { character: 'ちょ', romaji: 'cho', type: 'combination' },
    { character: 'にゃ', romaji: 'nya', type: 'combination' },
    { character: 'にゅ', romaji: 'nyu', type: 'combination' },
    { character: 'にょ', romaji: 'nyo', type: 'combination' },
    { character: 'ひゃ', romaji: 'hya', type: 'combination' },
    { character: 'ひゅ', romaji: 'hyu', type: 'combination' },
    { character: 'ひょ', romaji: 'hyo', type: 'combination' },
    { character: 'みゃ', romaji: 'mya', type: 'combination' },
    { character: 'みゅ', romaji: 'myu', type: 'combination' },
    { character: 'みょ', romaji: 'myo', type: 'combination' },
    { character: 'りゃ', romaji: 'rya', type: 'combination' },
    { character: 'りゅ', romaji: 'ryu', type: 'combination' },
    { character: 'りょ', romaji: 'ryo', type: 'combination' },
    { character: 'ぎゃ', romaji: 'gya', type: 'combination' },
    { character: 'ぎゅ', romaji: 'gyu', type: 'combination' },
    { character: 'ぎょ', romaji: 'gyo', type: 'combination' },
    { character: 'じゃ', romaji: 'ja', type: 'combination' },
    { character: 'じゅ', romaji: 'ju', type: 'combination' },
    { character: 'じょ', romaji: 'jo', type: 'combination' },
    { character: 'びゃ', romaji: 'bya', type: 'combination' },
    { character: 'びゅ', romaji: 'byu', type: 'combination' },
    { character: 'びょ', romaji: 'byo', type: 'combination' },
    { character: 'ぴゃ', romaji: 'pya', type: 'combination' },
    { character: 'ぴゅ', romaji: 'pyu', type: 'combination' },
    { character: 'ぴょ', romaji: 'pyo', type: 'combination' },
  ];

  const allHiragana = [...basicHiragana, ...dakutenHiragana, ...combinationHiragana];

  const filteredHiragana = allHiragana.filter(kana => 
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
  const pageTitle = 'Hiragana Chart - Complete Reference | Rocket JLPT';
  const pageDescription = 'Complete hiragana chart with all 104 characters including basic, dakuten, and combination characters. Learn Japanese hiragana with audio pronunciation.';
  const pageUrl = 'https://rocketjlpt.com/jlpt/hiragana';

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
    updateMetaTag('keywords', 'hiragana, hiragana chart, Japanese hiragana, learn hiragana, hiragana pronunciation, Japanese alphabet');
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
                <span className="text-gray-900">Hiragana</span>
              </div>
              
              {/* Title with gradient accent */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl font-bold text-gray-900">
                    Hiragana Chart
                  </h1>
                  <span className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full">
                    {filteredHiragana.length} characters
                  </span>
                </div>
                <p className="text-lg text-gray-600">
                  Complete reference for all hiragana characters with romaji and audio pronunciation
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
                  {/* Progress segments - showing 0% */}
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
        {/* Basic Hiragana Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Hiragana (46)</h2>
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3">
            {basicHiragana.filter(kana => 
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
            {dakutenHiragana.filter(kana => 
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
            {combinationHiragana.filter(kana => 
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
              Master hiragana and prepare for your JLPT exam with interactive practice tools.
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
