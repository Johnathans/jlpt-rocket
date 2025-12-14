'use client';

import { useState, useEffect, Suspense } from 'react';
import { Check, X, BookOpen, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { ReviewSystemSupabase } from '@/lib/reviewSystemSupabase';
import { useSearchParams } from 'next/navigation';
import { getAllVocabulary, getVocabularyByLevel, getVocabularyCountByLevel, VocabularyData } from '@/lib/supabase-data';
import { useJLPTLevel } from '@/contexts/JLPTLevelContext';
import TrainingModeModal from '@/components/TrainingModeModal';

interface VocabularyItem {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  level: string;
  example: string;
  exampleTranslation: string;
  mastered?: boolean;
}

const ITEMS_PER_PAGE = 50;
const CACHE_DURATION = 1 * 60 * 1000; // 1 minute

function VocabularyPageContent() {
  const searchParams = useSearchParams();
  const { currentLevel } = useJLPTLevel();
  const selectedLevel = searchParams.get('level') || currentLevel;
  const [allVocabularyData, setAllVocabularyData] = useState<VocabularyItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [masteredVocab, setMasteredVocab] = useState<Set<string>>(new Set());
  const [selectedVocab, setSelectedVocab] = useState<Set<string>>(new Set());
  const [showTrainingModal, setShowTrainingModal] = useState(false);

  // Update page metadata for SEO
  useEffect(() => {
    const levelCounts: Record<string, number> = {
      'N5': 800,
      'N4': 1500,
      'N3': 3750,
      'N2': 6000,
      'N1': 10000
    };

    const count = levelCounts[selectedLevel] || 8245;
    const pageTitle = `JLPT ${selectedLevel} Vocabulary List - ${count}+ Japanese Words | Rocket JLPT`;
    const pageDescription = `Learn all ${count}+ JLPT ${selectedLevel} vocabulary words with readings, meanings, and example sentences. Interactive flashcards and audio pronunciation for effective Japanese study.`;
    const pageUrl = `https://www.rocketjlpt.com/vocabulary?level=${selectedLevel}`;

    // Update title
    document.title = pageTitle;

    // Update meta tags
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

    // Standard meta tags
    updateMetaTag('description', pageDescription);
    updateMetaTag('keywords', `JLPT ${selectedLevel} vocabulary, Japanese vocabulary list, ${selectedLevel} words, Japanese language learning, JLPT vocabulary study, Japanese flashcards`);

    // Open Graph tags
    updateOGTag('og:title', pageTitle);
    updateOGTag('og:description', pageDescription);
    updateOGTag('og:url', pageUrl);
    updateOGTag('og:type', 'website');
    updateOGTag('og:site_name', 'Rocket JLPT');
    updateOGTag('og:image', 'https://www.rocketjlpt.com/og-image.png');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', pageTitle);
    updateMetaTag('twitter:description', pageDescription);
    updateMetaTag('twitter:image', 'https://www.rocketjlpt.com/og-image.png');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = pageUrl;

    // Add BreadcrumbList schema
    let script = document.querySelector('script[type="application/ld+json"][data-page="vocabulary-list"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-page', 'vocabulary-list');
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.rocketjlpt.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Vocabulary",
          "item": "https://www.rocketjlpt.com/vocabulary"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `${selectedLevel} Vocabulary`,
          "item": pageUrl
        }
      ]
    });
  }, [selectedLevel]);

  // Calculate paginated data
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const vocabularyData = allVocabularyData.slice(startIndex, endIndex);

  // Load vocabulary data with caching
  useEffect(() => {
    const loadVocabularyData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const cacheKey = `vocabulary-${selectedLevel}`;
        const cachedData = localStorage.getItem(cacheKey);
        const cacheTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);
        
        // Check if we have valid cached data
        if (cachedData && cacheTimestamp) {
          const isExpired = Date.now() - parseInt(cacheTimestamp) > CACHE_DURATION;
          if (!isExpired) {
            const parsedData = JSON.parse(cachedData);
            const cachedCount = localStorage.getItem(`${cacheKey}-count`);
            setAllVocabularyData(parsedData);
            setTotalCount(cachedCount ? parseInt(cachedCount) : parsedData.length);
            setLoading(false);
            return;
          }
        }
        
        // Fetch total count for pagination and data in parallel
        const [totalVocabCount, vocabularyData] = await Promise.all([
          getVocabularyCountByLevel(selectedLevel as any),
          getVocabularyByLevel(selectedLevel as any)
        ]);
        
        setTotalCount(totalVocabCount);
        
        // Transform to match our interface
        const transformedData: VocabularyItem[] = vocabularyData.map(item => ({
          id: item.id,
          word: item.word,
          reading: item.reading,
          meaning: item.meaning,
          level: item.jlpt_level,
          example: item.example_sentence,
          exampleTranslation: item.example_translation
        }));
        
        setAllVocabularyData(transformedData);
        
        // Cache the data and count
        localStorage.setItem(cacheKey, JSON.stringify(transformedData));
        localStorage.setItem(`${cacheKey}-count`, totalVocabCount.toString());
        localStorage.setItem(`${cacheKey}-timestamp`, Date.now().toString());
        
      } catch (error) {
        console.error('Error loading vocabulary:', error);
        setError('Failed to load vocabulary data');
      } finally {
        setLoading(false);
      }
    };

    loadVocabularyData();
    
    // Listen for JLPT level changes
    const handleLevelChange = () => {
      setCurrentPage(1); // Reset to first page when level changes
      loadVocabularyData();
    };
    
    window.addEventListener('jlpt-level-changed', handleLevelChange);
    return () => window.removeEventListener('jlpt-level-changed', handleLevelChange);
  }, [selectedLevel]);

  // Sync mastery state with ReviewSystem on component mount and when returning from training
  useEffect(() => {
    if (vocabularyData.length === 0) return;
    
    const syncMasteryState = async () => {
      const newMasteredVocab = new Set(masteredVocab);
      let hasChanges = false;

      for (const item of vocabularyData) {
        const progress = await ReviewSystemSupabase.getItemProgress(item.id, 'vocabulary');
        const isCurrentlyMastered = masteredVocab.has(item.id);
        const shouldBeMastered = progress.masteryLevel >= 100;

        if (shouldBeMastered && !isCurrentlyMastered) {
          newMasteredVocab.add(item.id);
          hasChanges = true;
          console.log(`[VocabularyPage] Auto-mastered vocabulary ${item.id}: ${item.word}`);
        }
      }

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
  }, [masteredVocab, vocabularyData]);

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
    setSelectedVocab(new Set(vocabularyData.map(item => item.id)));
  };

  const clearAll = () => {
    setSelectedVocab(new Set());
  };

  const toggleSelected = (id: string) => {
    const newSelectedVocab = new Set(selectedVocab);
    if (newSelectedVocab.has(id)) {
      newSelectedVocab.delete(id);
    } else {
      newSelectedVocab.add(id);
    }
    setSelectedVocab(newSelectedVocab);
  };

  const toggleMastered = async (id: string) => {
    const newMastered = new Set(masteredVocab);
    if (masteredVocab.has(id)) {
      newMastered.delete(id);
      // Reset progress in review system
      await ReviewSystemSupabase.resetItemProgress(id, 'vocabulary');
      console.log(`[VocabularyPage] Unmarked vocabulary ${id} as mastered`);
    } else {
      newMastered.add(id);
      // Set as mastered in review system
      await ReviewSystemSupabase.setItemMastered(id, 'vocabulary');
      console.log(`[VocabularyPage] Marked vocabulary ${id} as mastered`);
    }
    setMasteredVocab(newMastered);
  };

  const handleStartTraining = () => {
    setShowTrainingModal(true);
  };

  const getSelectedVocabData = () => {
    return allVocabularyData.filter(vocab => selectedVocab.has(vocab.id));
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16">
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">Select vocabulary to begin studying</p>
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={selectAll}
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 bg-white text-pink-600 hover:bg-pink-50 font-medium transition-colors rounded-md shadow-sm border-b-4 border-pink-300 hover:border-pink-400 text-sm sm:text-base"
          >
            Select All
          </button>
          <button
            onClick={clearAll}
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 bg-gray-400 text-white hover:bg-gray-500 font-medium transition-colors rounded-md shadow-sm border-b-4 border-gray-600 hover:border-gray-700 text-sm sm:text-base"
          >
            Clear All
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {vocabularyData.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleSelected(item.id)}
                className={`border-t-4 border-l-4 sm:border-l-6 border-r-4 sm:border-r-6 border-b-6 sm:border-b-8 border-gray-200 transition-all duration-200 hover:shadow-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 relative cursor-pointer ${
                  selectedVocab.has(item.id)
                    ? 'bg-pink-50 border-pink-200 border-b-pink-500'
                    : 
                  masteredVocab.has(item.id)
                    ? 'bg-green-50 border-green-200 border-b-green-500'
                    : 'bg-white border-gray-200 border-b-gray-400 hover:border-gray-300 hover:border-b-gray-600'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="text-center mb-4 pt-2 sm:pt-4">
                    <div className="text-4xl sm:text-7xl font-bold text-black font-japanese mb-2 sm:mb-3">
                      {item.word}
                    </div>
                    <p className="text-lg sm:text-xl text-gray-600 font-japanese mb-2 sm:mb-3">
                      {item.reading}
                    </p>
                    <p className="text-base sm:text-xl text-gray-800 font-medium">
                      {item.meaning}
                    </p>
                  </div>
                </div>
                {/* Top left badge */}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border ${getLevelColor(item.level)}`}>
                    {item.level}
                  </span>
                </div>

                {/* Top right audio button */}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playAudio(item.word);
                      }}
                      className="p-1.5 sm:p-2 text-gray-500 hover:text-green-600 hover:bg-white/80 rounded-full transition-colors"
                    >
                      <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                  </div>

                {/* Selected indicator */}
                {selectedVocab.has(item.id) && (
                  <div className="absolute top-2 sm:top-4 right-12 sm:right-16 w-5 h-5 sm:w-6 sm:h-6 bg-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                )}
              </div>

              {/* Mastery Toggle Switch */}
              <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 pt-2">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-xs text-gray-500 hidden sm:inline">
                  {masteredVocab.has(item.id) ? 'Mastered' : 'Learning'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMastered(item.id);
                  }}
                  className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
                    masteredVocab.has(item.id) ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                      masteredVocab.has(item.id) ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Page Navigation */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-2 sm:px-3 py-1 rounded-md transition-colors text-sm ${
                    currentPage === pageNum
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Page Info */}
      <div className="text-center text-sm text-gray-600 mb-8">
        Showing {startIndex + 1}-{Math.min(endIndex, totalCount)} of {totalCount} vocabulary
      </div>

      {/* Study Footer Bar */}
      {selectedVocab.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {selectedVocab.size} vocabulary selected
                </span>
              </div>
              <button
                onClick={handleStartTraining}
                className="px-6 py-3 bg-pink-500 text-white hover:bg-pink-600 font-semibold transition-all rounded-lg shadow-sm hover:translate-y-0.5 active:translate-y-0.5"
              >
                Study Selected Vocabulary
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Training Mode Selection Modal */}
      <TrainingModeModal
        isOpen={showTrainingModal}
        onClose={() => setShowTrainingModal(false)}
        selectedItems={Array.from(selectedVocab)}
        itemType="vocabulary"
        selectedData={getSelectedVocabData()}
      />
      </div>
    </div>
  );
}

export default function VocabularyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">Loading...</div>}>
      <VocabularyPageContent />
    </Suspense>
  );
}