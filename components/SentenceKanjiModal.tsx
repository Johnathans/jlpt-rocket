'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface KanjiData {
  character: string;
  meaning: string;
  on_reading: string;
  kun_reading: string;
  jlpt_level: string;
}

interface SentenceKanjiModalProps {
  isOpen: boolean;
  onClose: () => void;
  kanjiCharacters: string[];
  compounds?: string[];
  sentenceText: string;
  preloadedData?: Record<string, KanjiData>;
}

export default function SentenceKanjiModal({
  isOpen,
  onClose,
  kanjiCharacters,
  compounds = [],
  sentenceText,
  preloadedData,
}: SentenceKanjiModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [kanjiData, setKanjiData] = useState<Record<string, KanjiData>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Use preloaded data if available, otherwise fetch
    if (isOpen && kanjiCharacters.length > 0) {
      if (preloadedData && Object.keys(preloadedData).length > 0) {
        setKanjiData(preloadedData);
        setIsLoading(false);
      } else {
        fetchKanjiData();
      }
    }
  }, [isOpen, kanjiCharacters, preloadedData]);

  const fetchKanjiData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/kanji/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ characters: kanjiCharacters }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setKanjiData(data);
      }
    } catch (error) {
      console.error('Error fetching kanji data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : kanjiCharacters.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < kanjiCharacters.length - 1 ? prev + 1 : 0));
  };

  if (!isOpen) return null;

  const currentKanji = kanjiCharacters[currentIndex];
  const currentData = kanjiData[currentKanji];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
            Kanji in Sentence ({kanjiCharacters.length})
            {compounds.length > 0 && (
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                • {compounds.length} compound{compounds.length !== 1 ? 's' : ''}
              </span>
            )}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors touch-manipulation"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading kanji data...</p>
            </div>
          ) : (
            <>
              {/* Kanji Display and Details - Vertical Layout */}
              {currentData ? (
                <div className="mb-6">
                  {/* Large Kanji - Centered on Top */}
                  <div className="text-center mb-6">
                    <div className="text-7xl sm:text-8xl font-japanese text-gray-900 dark:text-white leading-none mb-2">
                      {currentKanji}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {currentIndex + 1} of {kanjiCharacters.length}
                    </p>
                  </div>
                  
                  {/* Meaning */}
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Meaning</p>
                    <p className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white">{currentData.meaning}</p>
                  </div>
                  
                  {/* Readings - Side by Side */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                    {currentData.on_reading && (
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">On Reading</p>
                        <p className="text-base sm:text-lg text-gray-900 dark:text-white font-japanese font-medium">
                          {currentData.on_reading}
                        </p>
                      </div>
                    )}
                    
                    {currentData.kun_reading && (
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Kun Reading</p>
                        <p className="text-base sm:text-lg text-gray-900 dark:text-white font-japanese font-medium">
                          {currentData.kun_reading}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* JLPT Level Badge */}
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-xs font-medium rounded-full">
                      {currentData.jlpt_level}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-7xl sm:text-8xl font-japanese text-gray-900 dark:text-white mb-4">
                    {currentKanji}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">No data available for this kanji</p>
                </div>
              )}

              {/* Compound Words Section */}
              {compounds.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Compound Words in Sentence
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {compounds.map((compound: string, idx: number) => (
                      <div
                        key={idx}
                        className="px-3 py-2 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 rounded-lg font-japanese text-base font-medium border border-pink-200 dark:border-pink-800"
                      >
                        {compound}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              {kanjiCharacters.length > 1 && (
                <div className="flex items-center justify-center gap-2 sm:gap-4">
                  <button
                    onClick={handlePrevious}
                    className="p-2 sm:p-3 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors touch-manipulation"
                    aria-label="Previous kanji"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  
                  <div className="flex gap-1.5 sm:gap-2 overflow-x-auto max-w-[200px] sm:max-w-none">
                    {kanjiCharacters.map((kanji, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-lg font-japanese text-lg sm:text-xl transition-colors touch-manipulation ${
                          idx === currentIndex
                            ? 'bg-pink-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {kanji}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={handleNext}
                    className="p-2 sm:p-3 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors touch-manipulation"
                    aria-label="Next kanji"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
