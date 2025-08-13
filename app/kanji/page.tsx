'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Volume2, BookOpen, Brush } from 'lucide-react';
import { ReviewSystem } from '@/lib/reviewSystem';

interface KanjiItem {
  id: number;
  kanji: string;
  meaning: string;
  level: string;
  strokes: number;
  examples: Array<{
    word: string;
    reading: string;
    meaning: string;
  }>;
  mastered?: boolean;
}

const kanjiData: KanjiItem[] = [
  {
    id: 1,
    kanji: '学',
    meaning: 'study, learning',
    level: 'N5',
    strokes: 8,
    examples: [
      { word: '学校', reading: 'がっこう', meaning: 'school' },
      { word: '学生', reading: 'がくせい', meaning: 'student' }
    ]
  },
  {
    id: 2,
    kanji: '友',
    meaning: 'friend',
    level: 'N5',
    strokes: 4,
    examples: [
      { word: '友達', reading: 'ともだち', meaning: 'friend' },
      { word: '友人', reading: 'ゆうじん', meaning: 'friend' }
    ]
  },
  {
    id: 3,
    kanji: '本',
    meaning: 'book, origin',
    level: 'N5',
    strokes: 5,
    examples: [
      { word: '本', reading: 'ほん', meaning: 'book' },
      { word: '日本', reading: 'にほん', meaning: 'Japan' }
    ]
  },
  {
    id: 4,
    kanji: '電',
    meaning: 'electricity',
    level: 'N4',
    strokes: 13,
    examples: [
      { word: '電車', reading: 'でんしゃ', meaning: 'train' },
      { word: '電話', reading: 'でんわ', meaning: 'telephone' }
    ]
  },
  {
    id: 5,
    kanji: '料',
    meaning: 'fee, materials',
    level: 'N4',
    strokes: 10,
    examples: [
      { word: '料理', reading: 'りょうり', meaning: 'cooking' },
      { word: '料金', reading: 'りょうきん', meaning: 'fee' }
    ]
  },
  {
    id: 6,
    kanji: '経',
    meaning: 'sutra, longitude, pass thru',
    level: 'N3',
    strokes: 11,
    examples: [
      { word: '経験', reading: 'けいけん', meaning: 'experience' },
      { word: '経済', reading: 'けいざい', meaning: 'economy' }
    ]
  }
];

export default function KanjiPage() {
  const searchParams = useSearchParams();
  const selectedLevel = searchParams.get('level') || 'N5';
  const [masteredKanji, setMasteredKanji] = useState<Set<number>>(new Set());
  const [selectedKanji, setSelectedKanji] = useState<Set<number>>(new Set());

  // Sync mastery state with ReviewSystem on component mount and when returning from training
  useEffect(() => {
    const syncMasteryState = () => {
      const newMasteredKanji = new Set(masteredKanji);
      let hasChanges = false;

      kanjiData.forEach(item => {
        const progress = ReviewSystem.getItemProgress(item.id, 'kanji');
        const isCurrentlyMastered = masteredKanji.has(item.id);
        const shouldBeMastered = progress.masteryLevel >= 100;

        if (shouldBeMastered && !isCurrentlyMastered) {
          newMasteredKanji.add(item.id);
          hasChanges = true;
          console.log(`[KanjiPage] Auto-mastered kanji ${item.id}: ${item.kanji}`);
        }
      });

      if (hasChanges) {
        setMasteredKanji(newMasteredKanji);
      }
    };

    syncMasteryState();

    // Also sync when the page becomes visible (returning from training)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        syncMasteryState();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', syncMasteryState);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', syncMasteryState);
    };
  }, [masteredKanji]);

  const getLevelColor = (level: string) => {
    return 'bg-gray-100 text-gray-900 border-gray-200';
  };

  const playAudio = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const selectAll = () => {
    setSelectedKanji(new Set(kanjiData.map(item => item.id)));
  };

  const clearAll = () => {
    setSelectedKanji(new Set());
  };

  const toggleSelected = (id: number) => {
    const newSelectedKanji = new Set(selectedKanji);
    if (newSelectedKanji.has(id)) {
      newSelectedKanji.delete(id);
    } else {
      newSelectedKanji.add(id);
    }
    setSelectedKanji(newSelectedKanji);
  };

  const toggleMastered = (id: number) => {
    const newMasteredKanji = new Set(masteredKanji);
    const isCurrentlyMastered = newMasteredKanji.has(id);
    
    if (isCurrentlyMastered) {
      newMasteredKanji.delete(id);
      // Reset progress in review system when unmarking as mastered
      ReviewSystem.resetItemProgress(id, 'kanji');
    } else {
      newMasteredKanji.add(id);
      // Mark as mastered in review system (set to 100% mastery)
      ReviewSystem.setItemMastered(id, 'kanji');
    }
    
    setMasteredKanji(newMasteredKanji);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16">
      <div className="mb-6 flex justify-between items-center">
        <p className="text-sm text-gray-600">Select kanji to begin studying</p>
        <div className="flex gap-3">
          <button
            onClick={selectAll}
            className="px-6 py-3 bg-green-500 text-white hover:bg-green-600 font-medium transition-colors rounded-md shadow-sm border-b-4 border-green-700 hover:border-green-800 text-base"
          >
            Select All
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-3 bg-gray-400 text-white hover:bg-gray-500 font-medium transition-colors rounded-md shadow-sm border-b-4 border-gray-600 hover:border-gray-700 text-base"
          >
            Clear All
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kanjiData.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleSelected(item.id)}
            className={`border-t-4 border-l-6 border-r-6 border-b-8 border-gray-200 transition-all duration-200 hover:shadow-lg rounded-2xl p-6 relative cursor-pointer ${
              selectedKanji.has(item.id)
                ? 'bg-blue-50 border-blue-200 border-b-blue-500'
                : 
              masteredKanji.has(item.id)
                ? 'bg-green-50 border-green-200 border-b-green-500'
                : 'bg-white border-gray-200 border-b-gray-400 hover:border-gray-300 hover:border-b-gray-600'
            }`}
          >
            <div className="text-center mb-4">
              <div className="text-8xl font-bold text-black font-japanese mb-2">
                {item.kanji}
              </div>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-2">
                <Brush className="h-3 w-3" />
                <span>{item.strokes} strokes</span>
              </div>
              <p className="text-lg text-gray-800 font-medium">
                {item.meaning}
              </p>
            </div>

            {/* Top left badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getLevelColor(item.level)}`}>
                {item.level}
              </span>
            </div>

            {/* Top right audio button */}
            <div className="absolute top-4 right-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playAudio(item.kanji);
                }}
                className="p-2 text-gray-500 hover:text-green-600 hover:bg-white/80 rounded-full transition-colors"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>

            {/* Selected indicator */}
            {selectedKanji.has(item.id) && (
              <div className="absolute top-4 right-16 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            )}

            <div className="border-t border-gray-100 pt-4 mb-12">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Examples:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.examples.map((example, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <BookOpen className="h-3 w-3 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-900 font-japanese">
                        {example.word} ({example.reading})
                      </p>
                      <p className="text-xs text-gray-600">
                        {example.meaning}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mastery Toggle Switch */}
            <div className="absolute bottom-4 right-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {masteredKanji.has(item.id) ? 'Mastered' : 'Learning'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMastered(item.id);
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                    masteredKanji.has(item.id) ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      masteredKanji.has(item.id) ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Study Footer Bar */}
      {selectedKanji.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {selectedKanji.size} kanji selected
                </span>
              </div>
              <Link 
                href={`/match?type=kanji&items=${Array.from(selectedKanji).join(',')}`}
                className="px-6 py-3 bg-green-500 text-white hover:bg-green-600 font-semibold transition-all rounded-lg shadow-sm border-b-4 border-green-600 hover:border-green-700 hover:translate-y-0.5 active:translate-y-0.5 inline-block"
              >
                Study Selected Kanji
              </Link>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}