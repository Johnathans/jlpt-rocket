'use client';

import { useState, useEffect } from 'react';
import { Check, X, BookOpen, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { ReviewSystem } from '@/lib/reviewSystem';
import { useSearchParams } from 'next/navigation';

interface VocabularyItem {
  id: number;
  word: string;
  reading: string;
  meaning: string;
  level: string;
  example: string;
  exampleTranslation: string;
  mastered?: boolean;
}

const vocabularyData: VocabularyItem[] = [
  {
    id: 1,
    word: '学校',
    reading: 'がっこう',
    meaning: 'school',
    level: 'N5',
    example: '学校に行きます。',
    exampleTranslation: 'I go to school.'
  },
  {
    id: 2,
    word: '友達',
    reading: 'ともだち',
    meaning: 'friend',
    level: 'N5',
    example: '友達と遊びます。',
    exampleTranslation: 'I play with friends.'
  },
  {
    id: 3,
    word: '勉強',
    reading: 'べんきょう',
    meaning: 'study',
    level: 'N5',
    example: '日本語を勉強します。',
    exampleTranslation: 'I study Japanese.'
  },
  {
    id: 4,
    word: '電車',
    reading: 'でんしゃ',
    meaning: 'train',
    level: 'N4',
    example: '電車で会社に行きます。',
    exampleTranslation: 'I go to work by train.'
  },
  {
    id: 5,
    word: '料理',
    reading: 'りょうり',
    meaning: 'cooking, cuisine',
    level: 'N4',
    example: '母の料理は美味しいです。',
    exampleTranslation: 'My mother\'s cooking is delicious.'
  },
  {
    id: 6,
    word: '経験',
    reading: 'けいけん',
    meaning: 'experience',
    level: 'N3',
    example: '貴重な経験をしました。',
    exampleTranslation: 'I had a valuable experience.'
  }
];

export default function VocabularyPage() {
  const searchParams = useSearchParams();
  const selectedLevel = searchParams.get('level') || 'N5';
  const [masteredVocab, setMasteredVocab] = useState<Set<number>>(new Set());
  const [selectedVocab, setSelectedVocab] = useState<Set<number>>(new Set());

  // Sync mastery state with ReviewSystem on component mount and when returning from training
  useEffect(() => {
    const syncMasteryState = () => {
      const newMasteredVocab = new Set(masteredVocab);
      let hasChanges = false;

      vocabularyData.forEach(item => {
        const progress = ReviewSystem.getItemProgress(item.id, 'vocabulary');
        const isCurrentlyMastered = masteredVocab.has(item.id);
        const shouldBeMastered = progress.masteryLevel >= 100;

        if (shouldBeMastered && !isCurrentlyMastered) {
          newMasteredVocab.add(item.id);
          hasChanges = true;
          console.log(`[VocabularyPage] Auto-mastered vocabulary ${item.id}: ${item.word}`);
        }
      });

      if (hasChanges) {
        setMasteredVocab(newMasteredVocab);
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
  }, [masteredVocab]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'N5':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'N4':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'N3':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'N2':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'N1':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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
    setSelectedVocab(new Set(vocabularyData.map(item => item.id)));
  };

  const clearAll = () => {
    setSelectedVocab(new Set());
  };

  const toggleSelected = (id: number) => {
    const newSelectedVocab = new Set(selectedVocab);
    if (newSelectedVocab.has(id)) {
      newSelectedVocab.delete(id);
    } else {
      newSelectedVocab.add(id);
    }
    setSelectedVocab(newSelectedVocab);
  };

  const toggleMastered = (id: number) => {
    const newMasteredVocab = new Set(masteredVocab);
    const isCurrentlyMastered = newMasteredVocab.has(id);
    
    if (isCurrentlyMastered) {
      newMasteredVocab.delete(id);
      // Reset progress in review system when unmarking as mastered
      ReviewSystem.resetItemProgress(id, 'vocabulary');
    } else {
      newMasteredVocab.add(id);
      // Mark as mastered in review system (set to 100% mastery)
      ReviewSystem.setItemMastered(id, 'vocabulary');
    }
    
    setMasteredVocab(newMasteredVocab);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <p className="text-sm text-gray-600">Select vocabulary to begin studying</p>
        <div className="flex gap-3">
          <button
            onClick={selectAll}
            className="px-6 py-3 bg-green-500 text-white hover:bg-green-600 font-medium transition-colors rounded-md shadow-sm border-b-4 border-green-700 hover:border-green-800 text-base"
          >
            Select All
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-3 bg-gray-500 text-white hover:bg-gray-600 font-medium transition-colors rounded-md shadow-sm border-b-4 border-gray-700 hover:border-gray-800 text-base"
          >
            Clear All
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vocabularyData.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleSelected(item.id)}
                className={`border border-gray-200 border-b-4 transition-all duration-200 hover:shadow-lg rounded-lg p-6 relative cursor-pointer ${
                  selectedVocab.has(item.id)
                    ? 'bg-blue-50 border-blue-200 border-b-blue-400'
                    : 
                  masteredVocab.has(item.id)
                    ? 'bg-green-50 border-green-200 border-b-green-400'
                    : 'bg-white border-gray-200 border-b-gray-400 hover:border-gray-300 hover:border-b-gray-500'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="text-center mb-4">
                      <div className="text-6xl font-bold text-black font-japanese mb-2">
                        {item.word}
                      </div>
                      <p className="text-lg text-gray-600 font-japanese mb-2">
                        {item.reading}
                      </p>
                      <p className="text-lg text-gray-800 font-medium">
                        {item.meaning}
                      </p>
                    </div>
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
                        playAudio(item.word);
                      }}
                      className="p-2 text-gray-500 hover:text-green-600 hover:bg-white/80 rounded-full transition-colors"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Selected indicator */}
                  {selectedVocab.has(item.id) && (
                    <div className="absolute top-4 right-16 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  )}
              </div>

            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-start gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 font-japanese leading-relaxed">
                    {item.example}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.exampleTranslation}
                  </p>
                </div>
              </div>
            </div>

            {/* Mastery Toggle Switch */}
            <div className="absolute bottom-4 right-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {masteredVocab.has(item.id) ? 'Mastered' : 'Learning'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMastered(item.id);
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                    masteredVocab.has(item.id) ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      masteredVocab.has(item.id) ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Study Footer Bar */}
      {selectedVocab.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {selectedVocab.size} vocabulary selected
                </span>
              </div>
              <Link 
                href={`/match?type=vocabulary&items=${Array.from(selectedVocab).join(',')}`}
                className="px-6 py-3 bg-green-500 text-white hover:bg-green-600 font-semibold transition-all rounded-lg shadow-sm border-b-4 border-green-600 hover:border-green-700 hover:translate-y-0.5 active:translate-y-0.5 inline-block"
              >
                Study Selected Vocabulary
              </Link>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}