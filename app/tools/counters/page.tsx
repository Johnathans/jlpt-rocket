'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Volume2 } from 'lucide-react';
import PublicNavbar from '@/components/PublicNavbar';

interface Counter {
  id: string;
  kanji: string;
  reading: string;
  meaning: string;
  examples: string;
  rules: {
    number: number;
    japanese: string;
    romaji: string;
  }[];
}

const COUNTERS: Counter[] = [
  {
    id: 'tsu',
    kanji: 'つ',
    reading: 'つ',
    meaning: 'Generic counter',
    examples: 'General items, abstract things',
    rules: [
      { number: 1, japanese: 'ひとつ', romaji: 'hitotsu' },
      { number: 2, japanese: 'ふたつ', romaji: 'futatsu' },
      { number: 3, japanese: 'みっつ', romaji: 'mittsu' },
      { number: 4, japanese: 'よっつ', romaji: 'yottsu' },
      { number: 5, japanese: 'いつつ', romaji: 'itsutsu' },
      { number: 6, japanese: 'むっつ', romaji: 'muttsu' },
      { number: 7, japanese: 'ななつ', romaji: 'nanatsu' },
      { number: 8, japanese: 'やっつ', romaji: 'yattsu' },
      { number: 9, japanese: 'ここのつ', romaji: 'kokonotsu' },
      { number: 10, japanese: 'とお', romaji: 'too' }
    ]
  },
  {
    id: 'nin',
    kanji: '人',
    reading: 'にん／り',
    meaning: 'People',
    examples: 'Counting people',
    rules: [
      { number: 1, japanese: 'ひとり', romaji: 'hitori' },
      { number: 2, japanese: 'ふたり', romaji: 'futari' },
      { number: 3, japanese: 'さんにん', romaji: 'sannin' },
      { number: 4, japanese: 'よにん', romaji: 'yonin' },
      { number: 5, japanese: 'ごにん', romaji: 'gonin' },
      { number: 6, japanese: 'ろくにん', romaji: 'rokunin' },
      { number: 7, japanese: 'しちにん／ななにん', romaji: 'shichinin/nananin' },
      { number: 8, japanese: 'はちにん', romaji: 'hachinin' },
      { number: 9, japanese: 'きゅうにん', romaji: 'kyuunin' },
      { number: 10, japanese: 'じゅうにん', romaji: 'juunin' }
    ]
  },
  {
    id: 'hon',
    kanji: '本',
    reading: 'ほん',
    meaning: 'Long cylindrical objects',
    examples: 'Pens, bottles, umbrellas, trees',
    rules: [
      { number: 1, japanese: 'いっぽん', romaji: 'ippon' },
      { number: 2, japanese: 'にほん', romaji: 'nihon' },
      { number: 3, japanese: 'さんぼん', romaji: 'sanbon' },
      { number: 4, japanese: 'よんほん', romaji: 'yonhon' },
      { number: 5, japanese: 'ごほん', romaji: 'gohon' },
      { number: 6, japanese: 'ろっぽん', romaji: 'roppon' },
      { number: 7, japanese: 'ななほん', romaji: 'nanahon' },
      { number: 8, japanese: 'はっぽん', romaji: 'happon' },
      { number: 9, japanese: 'きゅうほん', romaji: 'kyuuhon' },
      { number: 10, japanese: 'じゅっぽん', romaji: 'juppon' }
    ]
  },
  {
    id: 'mai',
    kanji: '枚',
    reading: 'まい',
    meaning: 'Flat objects',
    examples: 'Paper, tickets, plates, shirts',
    rules: [
      { number: 1, japanese: 'いちまい', romaji: 'ichimai' },
      { number: 2, japanese: 'にまい', romaji: 'nimai' },
      { number: 3, japanese: 'さんまい', romaji: 'sanmai' },
      { number: 4, japanese: 'よんまい', romaji: 'yonmai' },
      { number: 5, japanese: 'ごまい', romaji: 'gomai' },
      { number: 6, japanese: 'ろくまい', romaji: 'rokumai' },
      { number: 7, japanese: 'ななまい', romaji: 'nanamai' },
      { number: 8, japanese: 'はちまい', romaji: 'hachimai' },
      { number: 9, japanese: 'きゅうまい', romaji: 'kyuumai' },
      { number: 10, japanese: 'じゅうまい', romaji: 'juumai' }
    ]
  },
  {
    id: 'ko',
    kanji: '個',
    reading: 'こ',
    meaning: 'Small round objects / general pieces',
    examples: 'Apples, balls, general items',
    rules: [
      { number: 1, japanese: 'いっこ', romaji: 'ikko' },
      { number: 2, japanese: 'にこ', romaji: 'niko' },
      { number: 3, japanese: 'さんこ', romaji: 'sanko' },
      { number: 4, japanese: 'よんこ', romaji: 'yonko' },
      { number: 5, japanese: 'ごこ', romaji: 'goko' },
      { number: 6, japanese: 'ろっこ', romaji: 'rokko' },
      { number: 7, japanese: 'ななこ', romaji: 'nanako' },
      { number: 8, japanese: 'はっこ', romaji: 'hakko' },
      { number: 9, japanese: 'きゅうこ', romaji: 'kyuuko' },
      { number: 10, japanese: 'じゅっこ', romaji: 'jukko' }
    ]
  },
  {
    id: 'hiki',
    kanji: '匹',
    reading: 'ひき',
    meaning: 'Small animals',
    examples: 'Cats, dogs, fish, insects',
    rules: [
      { number: 1, japanese: 'いっぴき', romaji: 'ippiki' },
      { number: 2, japanese: 'にひき', romaji: 'nihiki' },
      { number: 3, japanese: 'さんびき', romaji: 'sanbiki' },
      { number: 4, japanese: 'よんひき', romaji: 'yonhiki' },
      { number: 5, japanese: 'ごひき', romaji: 'gohiki' },
      { number: 6, japanese: 'ろっぴき', romaji: 'roppiki' },
      { number: 7, japanese: 'ななひき', romaji: 'nanahiki' },
      { number: 8, japanese: 'はっぴき', romaji: 'happiki' },
      { number: 9, japanese: 'きゅうひき', romaji: 'kyuuhiki' },
      { number: 10, japanese: 'じゅっぴき', romaji: 'juppiki' }
    ]
  },
  {
    id: 'tou',
    kanji: '頭',
    reading: 'とう',
    meaning: 'Large animals',
    examples: 'Elephants, horses, cows',
    rules: [
      { number: 1, japanese: 'いっとう', romaji: 'ittou' },
      { number: 2, japanese: 'にとう', romaji: 'nitou' },
      { number: 3, japanese: 'さんとう', romaji: 'santou' },
      { number: 4, japanese: 'よんとう', romaji: 'yontou' },
      { number: 5, japanese: 'ごとう', romaji: 'gotou' },
      { number: 6, japanese: 'ろくとう', romaji: 'rokutou' },
      { number: 7, japanese: 'ななとう', romaji: 'nanatou' },
      { number: 8, japanese: 'はっとう', romaji: 'hattou' },
      { number: 9, japanese: 'きゅうとう', romaji: 'kyuutou' },
      { number: 10, japanese: 'じゅっとう', romaji: 'juttou' }
    ]
  },
  {
    id: 'dai',
    kanji: '台',
    reading: 'だい',
    meaning: 'Machines / vehicles',
    examples: 'Cars, computers, bicycles',
    rules: [
      { number: 1, japanese: 'いちだい', romaji: 'ichidai' },
      { number: 2, japanese: 'にだい', romaji: 'nidai' },
      { number: 3, japanese: 'さんだい', romaji: 'sandai' },
      { number: 4, japanese: 'よんだい', romaji: 'yondai' },
      { number: 5, japanese: 'ごだい', romaji: 'godai' },
      { number: 6, japanese: 'ろくだい', romaji: 'rokudai' },
      { number: 7, japanese: 'ななだい', romaji: 'nanadai' },
      { number: 8, japanese: 'はちだい', romaji: 'hachidai' },
      { number: 9, japanese: 'きゅうだい', romaji: 'kyuudai' },
      { number: 10, japanese: 'じゅうだい', romaji: 'juudai' }
    ]
  },
  {
    id: 'kai',
    kanji: '回',
    reading: 'かい',
    meaning: 'Times / occurrences',
    examples: 'Number of times something happens',
    rules: [
      { number: 1, japanese: 'いっかい', romaji: 'ikkai' },
      { number: 2, japanese: 'にかい', romaji: 'nikai' },
      { number: 3, japanese: 'さんかい', romaji: 'sankai' },
      { number: 4, japanese: 'よんかい', romaji: 'yonkai' },
      { number: 5, japanese: 'ごかい', romaji: 'gokai' },
      { number: 6, japanese: 'ろっかい', romaji: 'rokkai' },
      { number: 7, japanese: 'ななかい', romaji: 'nanakai' },
      { number: 8, japanese: 'はっかい', romaji: 'hakkai' },
      { number: 9, japanese: 'きゅうかい', romaji: 'kyuukai' },
      { number: 10, japanese: 'じゅっかい', romaji: 'jukkai' }
    ]
  },
  {
    id: 'fun',
    kanji: '分',
    reading: 'ふん／ぷん',
    meaning: 'Minutes',
    examples: 'Time duration in minutes',
    rules: [
      { number: 1, japanese: 'いっぷん', romaji: 'ippun' },
      { number: 2, japanese: 'にふん', romaji: 'nifun' },
      { number: 3, japanese: 'さんぷん', romaji: 'sanpun' },
      { number: 4, japanese: 'よんぷん', romaji: 'yonpun' },
      { number: 5, japanese: 'ごふん', romaji: 'gofun' },
      { number: 6, japanese: 'ろっぷん', romaji: 'roppun' },
      { number: 7, japanese: 'ななふん', romaji: 'nanafun' },
      { number: 8, japanese: 'はっぷん', romaji: 'happun' },
      { number: 9, japanese: 'きゅうふん', romaji: 'kyuufun' },
      { number: 10, japanese: 'じゅっぷん', romaji: 'juppun' }
    ]
  },
  {
    id: 'ji',
    kanji: '時',
    reading: 'じ',
    meaning: 'Hours (clock time)',
    examples: "O'clock time",
    rules: [
      { number: 1, japanese: 'いちじ', romaji: 'ichiji' },
      { number: 2, japanese: 'にじ', romaji: 'niji' },
      { number: 3, japanese: 'さんじ', romaji: 'sanji' },
      { number: 4, japanese: 'よじ', romaji: 'yoji' },
      { number: 5, japanese: 'ごじ', romaji: 'goji' },
      { number: 6, japanese: 'ろくじ', romaji: 'rokuji' },
      { number: 7, japanese: 'しちじ', romaji: 'shichiji' },
      { number: 8, japanese: 'はちじ', romaji: 'hachiji' },
      { number: 9, japanese: 'くじ', romaji: 'kuji' },
      { number: 10, japanese: 'じゅうじ', romaji: 'juuji' },
      { number: 11, japanese: 'じゅういちじ', romaji: 'juuichiji' },
      { number: 12, japanese: 'じゅうにじ', romaji: 'juuniji' }
    ]
  },
  {
    id: 'jikan',
    kanji: '時間',
    reading: 'じかん',
    meaning: 'Hours (duration)',
    examples: 'Duration of time in hours',
    rules: [
      { number: 1, japanese: 'いちじかん', romaji: 'ichijikan' },
      { number: 2, japanese: 'にじかん', romaji: 'nijikan' },
      { number: 3, japanese: 'さんじかん', romaji: 'sanjikan' },
      { number: 4, japanese: 'よじかん', romaji: 'yojikan' },
      { number: 5, japanese: 'ごじかん', romaji: 'gojikan' },
      { number: 6, japanese: 'ろくじかん', romaji: 'rokujikan' },
      { number: 7, japanese: 'しちじかん', romaji: 'shichijikan' },
      { number: 8, japanese: 'はちじかん', romaji: 'hachijikan' },
      { number: 9, japanese: 'くじかん', romaji: 'kujikan' },
      { number: 10, japanese: 'じゅうじかん', romaji: 'juujikan' }
    ]
  },
  {
    id: 'sai',
    kanji: '歳',
    reading: 'さい',
    meaning: 'Age',
    examples: 'Years old',
    rules: [
      { number: 1, japanese: 'いっさい', romaji: 'issai' },
      { number: 2, japanese: 'にさい', romaji: 'nisai' },
      { number: 3, japanese: 'さんさい', romaji: 'sansai' },
      { number: 4, japanese: 'よんさい', romaji: 'yonsai' },
      { number: 5, japanese: 'ごさい', romaji: 'gosai' },
      { number: 6, japanese: 'ろくさい', romaji: 'rokusai' },
      { number: 7, japanese: 'ななさい', romaji: 'nanasai' },
      { number: 8, japanese: 'はっさい', romaji: 'hassai' },
      { number: 9, japanese: 'きゅうさい', romaji: 'kyuusai' },
      { number: 10, japanese: 'じゅっさい', romaji: 'jussai' },
      { number: 20, japanese: 'はたち', romaji: 'hatachi' }
    ]
  },
  {
    id: 'kai-floor',
    kanji: '階',
    reading: 'かい',
    meaning: 'Floors in buildings',
    examples: 'Building floors',
    rules: [
      { number: 1, japanese: 'いっかい', romaji: 'ikkai' },
      { number: 2, japanese: 'にかい', romaji: 'nikai' },
      { number: 3, japanese: 'さんがい', romaji: 'sangai' },
      { number: 4, japanese: 'よんかい', romaji: 'yonkai' },
      { number: 5, japanese: 'ごかい', romaji: 'gokai' },
      { number: 6, japanese: 'ろっかい', romaji: 'rokkai' },
      { number: 7, japanese: 'ななかい', romaji: 'nanakai' },
      { number: 8, japanese: 'はっかい', romaji: 'hakkai' },
      { number: 9, japanese: 'きゅうかい', romaji: 'kyuukai' },
      { number: 10, japanese: 'じゅっかい', romaji: 'jukkai' }
    ]
  },
  {
    id: 'satsu',
    kanji: '冊',
    reading: 'さつ',
    meaning: 'Books / bound items',
    examples: 'Books, magazines, notebooks',
    rules: [
      { number: 1, japanese: 'いっさつ', romaji: 'issatsu' },
      { number: 2, japanese: 'にさつ', romaji: 'nisatsu' },
      { number: 3, japanese: 'さんさつ', romaji: 'sansatsu' },
      { number: 4, japanese: 'よんさつ', romaji: 'yonsatsu' },
      { number: 5, japanese: 'ごさつ', romaji: 'gosatsu' },
      { number: 6, japanese: 'ろくさつ', romaji: 'rokusatsu' },
      { number: 7, japanese: 'ななさつ', romaji: 'nanasatsu' },
      { number: 8, japanese: 'はっさつ', romaji: 'hassatsu' },
      { number: 9, japanese: 'きゅうさつ', romaji: 'kyuusatsu' },
      { number: 10, japanese: 'じゅっさつ', romaji: 'jussatsu' }
    ]
  },
  {
    id: 'chaku',
    kanji: '着',
    reading: 'ちゃく',
    meaning: 'Clothing outfits',
    examples: 'Suits, dresses, complete outfits',
    rules: [
      { number: 1, japanese: 'いっちゃく', romaji: 'icchaku' },
      { number: 2, japanese: 'にちゃく', romaji: 'nichaku' },
      { number: 3, japanese: 'さんちゃく', romaji: 'sanchaku' },
      { number: 4, japanese: 'よんちゃく', romaji: 'yonchaku' },
      { number: 5, japanese: 'ごちゃく', romaji: 'gochaku' },
      { number: 6, japanese: 'ろくちゃく', romaji: 'rokuchaku' },
      { number: 7, japanese: 'ななちゃく', romaji: 'nanachaku' },
      { number: 8, japanese: 'はっちゃく', romaji: 'hacchaku' },
      { number: 9, japanese: 'きゅうちゃく', romaji: 'kyuuchaku' },
      { number: 10, japanese: 'じゅっちゃく', romaji: 'jucchaku' }
    ]
  },
  {
    id: 'hai',
    kanji: '杯',
    reading: 'はい',
    meaning: 'Cups / glasses of drink',
    examples: 'Coffee, water, sake',
    rules: [
      { number: 1, japanese: 'いっぱい', romaji: 'ippai' },
      { number: 2, japanese: 'にはい', romaji: 'nihai' },
      { number: 3, japanese: 'さんばい', romaji: 'sanbai' },
      { number: 4, japanese: 'よんはい', romaji: 'yonhai' },
      { number: 5, japanese: 'ごはい', romaji: 'gohai' },
      { number: 6, japanese: 'ろっぱい', romaji: 'roppai' },
      { number: 7, japanese: 'ななはい', romaji: 'nanahai' },
      { number: 8, japanese: 'はっぱい', romaji: 'happai' },
      { number: 9, japanese: 'きゅうはい', romaji: 'kyuuhai' },
      { number: 10, japanese: 'じゅっぱい', romaji: 'juppai' }
    ]
  },
  {
    id: 'ken',
    kanji: '軒',
    reading: 'けん',
    meaning: 'Houses / buildings',
    examples: 'Houses, shops, restaurants',
    rules: [
      { number: 1, japanese: 'いっけん', romaji: 'ikken' },
      { number: 2, japanese: 'にけん', romaji: 'niken' },
      { number: 3, japanese: 'さんげん', romaji: 'sangen' },
      { number: 4, japanese: 'よんけん', romaji: 'yonken' },
      { number: 5, japanese: 'ごけん', romaji: 'goken' },
      { number: 6, japanese: 'ろっけん', romaji: 'rokken' },
      { number: 7, japanese: 'ななけん', romaji: 'nanaken' },
      { number: 8, japanese: 'はっけん', romaji: 'hakken' },
      { number: 9, japanese: 'きゅうけん', romaji: 'kyuuken' },
      { number: 10, japanese: 'じゅっけん', romaji: 'jukken' }
    ]
  }
];

export default function CountersPage() {
  const [selectedCounter, setSelectedCounter] = useState<Counter | null>(null);
  const [inputNumber, setInputNumber] = useState('');
  const [result, setResult] = useState<{ japanese: string; romaji: string } | null>(null);

  const handleCounterSelect = (counter: Counter) => {
    setSelectedCounter(counter);
    setInputNumber('');
    setResult(null);
  };

  const generateCounterReading = (counter: Counter, num: number): { japanese: string; romaji: string } => {
    // Check if we have the exact number in rules
    const exactRule = counter.rules.find(r => r.number === num);
    if (exactRule) {
      return { japanese: exactRule.japanese, romaji: exactRule.romaji };
    }

    // For numbers > 10, construct from base patterns
    if (num > 10 && num <= 99) {
      const ones = num % 10;
      const tens = Math.floor(num / 10);
      
      // Get the pattern for 10
      const tenRule = counter.rules.find(r => r.number === 10);
      if (!tenRule) return { japanese: '範囲外', romaji: 'Out of range' };
      
      // Build the number
      const tensPrefix = tens === 1 ? 'じゅう' : ['', '', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'][tens] + 'じゅう';
      
      if (ones === 0) {
        return { japanese: tensPrefix, romaji: `${tens}0` };
      }
      
      const onesRule = counter.rules.find(r => r.number === ones);
      if (onesRule) {
        // Extract the counter suffix from the ones reading
        const baseReading = onesRule.japanese;
        return { japanese: tensPrefix + baseReading, romaji: `${num}` };
      }
    }
    
    return { japanese: '範囲外', romaji: 'Out of range' };
  };

  const handleNumberInput = (value: string) => {
    setInputNumber(value);
    
    if (!selectedCounter || !value) {
      setResult(null);
      return;
    }

    const num = parseInt(value);
    if (isNaN(num) || num < 1) {
      setResult(null);
      return;
    }

    const reading = generateCounterReading(selectedCounter, num);
    setResult(reading);
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.75; // Slower for clarity
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Try to get the best Japanese voice available
      const voices = window.speechSynthesis.getVoices();
      const japaneseVoices = voices.filter(voice => 
        voice.lang.startsWith('ja') || voice.lang.startsWith('jp')
      );
      
      // Prefer Google voices or native voices
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

  // SEO: Set meta tags
  useEffect(() => {
    const pageTitle = 'Japanese Counter Practice Tool - Master 18 Essential Counters | Rocket JLPT';
    const pageDescription = 'Free interactive Japanese counter practice tool. Master 18 essential counters (つ, 人, 本, 枚, etc.) with audio pronunciation. Count from 1-99 for JLPT preparation.';
    const pageUrl = 'https://rocketjlpt.com/tools/counters';

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
    updateMetaTag('keywords', 'Japanese counters, counter practice, JLPT counters, Japanese counting, 助数詞, counter words, Japanese grammar, JLPT study tool');
    updateOGTag('og:title', pageTitle);
    updateOGTag('og:description', pageDescription);
    updateOGTag('og:url', pageUrl);
    updateOGTag('og:type', 'website');
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', pageTitle);
    updateMetaTag('twitter:description', pageDescription);

    // Add canonical link
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
            Japanese Counter Practice
          </h1>
          <p className="text-lg text-gray-600">
            Master the art of counting in Japanese with 18 essential counters
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Counter Selection - Left Sidebar */}
          <div className="w-64 flex-shrink-0">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Select Counter</h2>
            <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
              {COUNTERS.map((counter) => (
                <button
                  key={counter.id}
                  onClick={() => handleCounterSelect(counter)}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    selectedCounter?.id === counter.id
                      ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-orange-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-pink-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold text-gray-900 font-japanese">
                      {counter.kanji}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-600">{counter.reading}</div>
                      <div className="text-sm font-semibold text-gray-900">{counter.meaning}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Practice Section - Main Area */}
          <div className="flex-1">
            {selectedCounter ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Practice: {selectedCounter.kanji} ({selectedCounter.meaning})
            </h2>

            {/* Number Input */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter a number (1-99):
              </label>
              <input
                type="number"
                min="1"
                max="99"
                value={inputNumber}
                onChange={(e) => handleNumberInput(e.target.value)}
                className="w-full max-w-md px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all text-lg"
                placeholder="Enter a number..."
              />
            </div>

            {/* Result Display */}
            {result && (
              <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl p-8 border-2 border-pink-200 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Result:</div>
                    <div className="text-5xl font-bold text-gray-900 font-japanese mb-2">
                      {result.japanese}
                    </div>
                    <div className="text-xl text-gray-600">{result.romaji}</div>
                  </div>
                  <button
                    onClick={() => playAudio(result.japanese)}
                    className="p-4 bg-white rounded-full hover:bg-gray-50 transition-colors shadow-md"
                  >
                    <Volume2 className="h-6 w-6 text-pink-600" />
                  </button>
                </div>
              </div>
            )}

            {/* Reference Table */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reference Table</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {selectedCounter.rules.map((rule) => (
                  <div
                    key={rule.number}
                    className={`p-4 rounded-lg border transition-all ${
                      inputNumber === rule.number.toString()
                        ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-orange-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="text-sm text-gray-600 mb-1">{rule.number}</div>
                    <div className="text-xl font-bold text-gray-900 font-japanese mb-1">
                      {rule.japanese}
                    </div>
                    <div className="text-xs text-gray-500">{rule.romaji}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="font-bold text-pink-600">1.</span>
                    <span>Select a counter from the list on the left</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-pink-600">2.</span>
                    <span>Enter any number (1-99) to see how it's counted in Japanese</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-pink-600">3.</span>
                    <span>Click the speaker icon to hear the pronunciation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-pink-600">4.</span>
                    <span>Use the reference table to study common variations</span>
                  </li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
