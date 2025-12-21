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
  sentenceText: string;
  preloadedData?: Record<string, KanjiData>;
}

export default function SentenceKanjiModal({
  isOpen,
  onClose,
  kanjiCharacters,
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Kanji in Sentence ({kanjiCharacters.length})
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading kanji data...</p>
            </div>
          ) : (
            <>
              {/* Kanji Display */}
              <div className="text-center mb-8">
                <div className="text-8xl font-japanese text-gray-900 dark:text-white mb-4">
                  {currentKanji}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {currentIndex + 1} of {kanjiCharacters.length}
                </p>
              </div>

              {/* Kanji Details */}
              {currentData ? (
                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Meaning</p>
                    <p className="text-lg text-gray-900 dark:text-white">{currentData.meaning}</p>
                  </div>
                  
                  {currentData.on_reading && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">On Reading</p>
                      <p className="text-lg text-gray-900 dark:text-white font-japanese">
                        {currentData.on_reading}
                      </p>
                    </div>
                  )}
                  
                  {currentData.kun_reading && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Kun Reading</p>
                      <p className="text-lg text-gray-900 dark:text-white font-japanese">
                        {currentData.kun_reading}
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">JLPT Level</p>
                    <span className="inline-block px-3 py-1 bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-sm rounded-full">
                      {currentData.jlpt_level}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No data available for this kanji</p>
                </div>
              )}

              {/* Navigation */}
              {kanjiCharacters.length > 1 && (
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={handlePrevious}
                    className="p-3 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <div className="flex gap-2">
                    {kanjiCharacters.map((kanji, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-12 h-12 rounded-lg font-japanese text-xl transition-colors ${
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
                    className="p-3 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
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
