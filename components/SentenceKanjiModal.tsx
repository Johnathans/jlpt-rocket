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

interface VocabData {
  word: string;
  reading: string;
  meaning: string;
  jlpt_level: string;
}

interface SentenceKanjiModalProps {
  isOpen: boolean;
  onClose: () => void;
  kanjiCharacters: string[];
  compounds?: string[];
  sentenceText: string;
  preloadedKanjiData?: Record<string, KanjiData>;
  preloadedVocabData?: Record<string, VocabData>;
}

export default function SentenceKanjiModal({
  isOpen,
  onClose,
  kanjiCharacters,
  compounds = [],
  sentenceText,
  preloadedKanjiData,
  preloadedVocabData,
}: SentenceKanjiModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'kanji' | 'compounds'>('kanji');
  const [kanjiData, setKanjiData] = useState<Record<string, KanjiData>>({});
  const [vocabData, setVocabData] = useState<Record<string, VocabData>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Use preloaded data if available, otherwise fetch
    if (isOpen && kanjiCharacters.length > 0) {
      if (preloadedKanjiData && Object.keys(preloadedKanjiData).length > 0) {
        setKanjiData(preloadedKanjiData);
        setIsLoading(false);
      } else {
        fetchKanjiData();
      }
    }
    
    // Load vocabulary data for compounds
    if (isOpen && compounds.length > 0) {
      if (preloadedVocabData && Object.keys(preloadedVocabData).length > 0) {
        setVocabData(preloadedVocabData);
      } else {
        fetchVocabData();
      }
    }
  }, [isOpen, kanjiCharacters, compounds, preloadedKanjiData, preloadedVocabData]);

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

  const fetchVocabData = async () => {
    try {
      const response = await fetch('/api/vocabulary/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ words: compounds }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setVocabData(data);
      }
    } catch (error) {
      console.error('Error fetching vocabulary data:', error);
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
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
              Sentence Breakdown
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors touch-manipulation"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('kanji')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'kanji'
                  ? 'text-pink-600 dark:text-pink-400 border-b-2 border-pink-600 dark:border-pink-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Kanji ({kanjiCharacters.length})
            </button>
            {compounds.length > 0 && (
              <button
                onClick={() => setActiveTab('compounds')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'compounds'
                    ? 'text-pink-600 dark:text-pink-400 border-b-2 border-pink-600 dark:border-pink-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Compounds ({compounds.length})
              </button>
            )}
          </div>
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
              {/* Kanji Tab Content */}
              {activeTab === 'kanji' && currentData ? (
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
              )}
              
              {activeTab === 'kanji' && !currentData && (
                <div className="text-center py-8">
                  <div className="text-7xl sm:text-8xl font-japanese text-gray-900 dark:text-white mb-4">
                    {currentKanji}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">No data available for this kanji</p>
                </div>
              )}

              {/* Compounds Tab Content */}
              {activeTab === 'compounds' && (
                <div className="space-y-4">
                  {compounds.map((compound: string, idx: number) => {
                    const vocab = vocabData[compound];
                    return (
                      <div
                        key={idx}
                        className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="text-3xl font-japanese text-gray-900 dark:text-white">
                            {compound}
                          </div>
                          {vocab?.jlpt_level && (
                            <span className="px-2 py-1 bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-xs font-medium rounded-full">
                              {vocab.jlpt_level}
                            </span>
                          )}
                        </div>
                        {vocab ? (
                          <>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-japanese mb-1">
                              {vocab.reading}
                            </p>
                            <p className="text-base text-gray-900 dark:text-white">
                              {vocab.meaning}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            No vocabulary data available
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Navigation for Kanji */}
              {activeTab === 'kanji' && kanjiCharacters.length > 1 && (
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
