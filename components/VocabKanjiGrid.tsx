'use client';

import { useState } from 'react';
import { Volume2, Check } from 'lucide-react';

interface VocabKanjiItem {
  id: number;
  word: string;
  reading: string;
  meaning: string;
  type: 'vocabulary' | 'kanji';
  known: boolean;
}

interface VocabKanjiGridProps {
  items: VocabKanjiItem[];
}

export default function VocabKanjiGrid({ items }: VocabKanjiGridProps) {
  const [knownItems, setKnownItems] = useState<Set<number>>(
    new Set(items.filter(item => item.known).map(item => item.id))
  );

  const toggleKnown = (id: number) => {
    const newKnownItems = new Set(knownItems);
    if (newKnownItems.has(id)) {
      newKnownItems.delete(id);
    } else {
      newKnownItems.add(id);
    }
    setKnownItems(newKnownItems);
  };

  const playAudio = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const vocabularyItems = items.filter(item => item.type === 'vocabulary');
  const kanjiItems = items.filter(item => item.type === 'kanji');

  const renderItems = (itemList: VocabKanjiItem[], title: string) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {itemList.map((item) => (
          <div
            key={item.id}
            className={`bg-white border-t-4 border-l-6 border-r-6 border-b-8 transition-all duration-200 hover:shadow-lg rounded-2xl p-4 cursor-pointer ${
              knownItems.has(item.id)
                ? 'border-green-300 border-b-green-600 bg-green-50'
                : 'border-gray-200 border-b-gray-400 hover:border-gray-300 hover:border-b-gray-600'
            }`}
            onClick={() => toggleKnown(item.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-black font-japanese">
                    {item.word}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudio(item.word);
                    }}
                    className="p-1 text-gray-500 hover:text-green-600 transition-colors"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-gray-600 font-japanese mb-1">
                  {item.reading}
                </p>
                <p className="text-gray-800 font-medium">
                  {item.meaning}
                </p>
              </div>
              
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                knownItems.has(item.id)
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 hover:border-green-400'
              }`}>
                {knownItems.has(item.id) && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
            </div>
            
            <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
              {item.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Mark items you already know
        </h2>
        <p className="text-gray-600 mb-6">
          Click on vocabulary and kanji cards to mark them as known. This helps track your progress through the story.
        </p>
        
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
            <span>Unknown</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-500 flex items-center justify-center">
              <Check className="h-2 w-2 text-white" />
            </div>
            <span>Known</span>
          </div>
        </div>
      </div>

      {vocabularyItems.length > 0 && renderItems(vocabularyItems, 'Vocabulary')}
      {kanjiItems.length > 0 && renderItems(kanjiItems, 'Kanji')}
    </div>
  );
}