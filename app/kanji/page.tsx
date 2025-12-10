'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Volume2, BookOpen, Brush } from 'lucide-react';
import { ReviewSystem } from '@/lib/reviewSystem';
import { getKanjiByLevel, KanjiData } from '@/lib/supabase-data';
import { useJLPTLevel } from '@/contexts/JLPTLevelContext';
import TrainingModeModal from '@/components/TrainingModeModal';

interface KanjiItem {
  id: string;
  kanji: string;
  meaning: string;
  level: string;
  strokes: number;
  examples: Array<{
    word: string;
    reading: string;
    meaning: string;
    level?: string;
  }>;
  mastered?: boolean;
}

const ITEMS_PER_PAGE = 50;
const CACHE_DURATION = 1 * 60 * 1000; // 1 minute

function KanjiPageContent() {
  const searchParams = useSearchParams();
  const { currentLevel } = useJLPTLevel();
  const selectedLevel = searchParams.get('level') || currentLevel;
  const [allKanjiData, setAllKanjiData] = useState<KanjiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [kanjiExamples, setKanjiExamples] = useState<Record<string, Array<{word: string, reading: string, meaning: string, level: string}>>>({});
  const [masteredKanji, setMasteredKanji] = useState<Set<string>>(new Set());
  const [selectedKanji, setSelectedKanji] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [showTrainingModal, setShowTrainingModal] = useState(false);

  // Update page metadata for SEO
  useEffect(() => {
    const levelCounts: Record<string, number> = {
      'N5': 80,
      'N4': 167,
      'N3': 370,
      'N2': 415,
      'N1': 1179
    };

    const count = levelCounts[selectedLevel] || 2211;
    const pageTitle = `JLPT ${selectedLevel} Kanji List - ${count} Essential Japanese Characters | Rocket JLPT`;
    const pageDescription = `Master all ${count} JLPT ${selectedLevel} kanji with stroke order diagrams, readings, meanings, and vocabulary examples. Free interactive study tool for Japanese learners.`;
    const pageUrl = `https://www.rocketjlpt.com/kanji?level=${selectedLevel}`;

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
    updateMetaTag('keywords', `JLPT ${selectedLevel} kanji, Japanese kanji list, kanji study, ${selectedLevel} kanji meanings, kanji readings, Japanese characters, JLPT preparation`);

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
    let script = document.querySelector('script[type="application/ld+json"][data-page="kanji-list"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-page', 'kanji-list');
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
          "name": "Kanji",
          "item": "https://www.rocketjlpt.com/kanji"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `${selectedLevel} Kanji`,
          "item": pageUrl
        }
      ]
    });
  }, [selectedLevel]);

  // Calculate paginated data
  const totalPages = Math.ceil(allKanjiData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const kanjiData = allKanjiData.slice(startIndex, endIndex);

  // Load level-filtered kanji examples JSON
  useEffect(() => {
    const loadKanjiExamples = async () => {
      try {
        const response = await fetch('/data/kanji-examples-by-level.json');
        const allLevelExamples = await response.json();
        // Get examples for current user level (includes current level and below)
        const levelExamples = allLevelExamples[selectedLevel] || {};
        setKanjiExamples(levelExamples);
      } catch (error) {
        console.error('Failed to load kanji examples:', error);
      }
    };
    
    loadKanjiExamples();
  }, [selectedLevel]);

  // Fetch kanji data from Supabase with caching
  useEffect(() => {
    const fetchKanjiData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check cache first
        const cacheKey = `kanji-data-${selectedLevel}`;
        const cached = localStorage.getItem(cacheKey);
        const cacheTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);
        
        if (cached && cacheTimestamp) {
          const isExpired = Date.now() - parseInt(cacheTimestamp) > CACHE_DURATION;
          if (!isExpired) {
            console.log('Loading kanji from cache');
            setAllKanjiData(JSON.parse(cached));
            setLoading(false);
            return;
          }
        }
        
        console.log('Fetching kanji from Supabase');
        const filteredKanji = await getKanjiByLevel(selectedLevel as any);
        
        // Use static examples from JSON file with display prioritization
        const transformedKanji: KanjiItem[] = filteredKanji.map(kanji => {
          const allExamples = kanjiExamples[kanji.character] || [];
          
          // Prioritize examples: current level first, then lower levels
          const currentLevelExamples = allExamples.filter(ex => ex.level === selectedLevel);
          const otherLevelExamples = allExamples.filter(ex => ex.level !== selectedLevel);
          
          // Take up to 2 examples, prioritizing current level
          const displayExamples = [
            ...currentLevelExamples.slice(0, 2),
            ...otherLevelExamples.slice(0, Math.max(0, 2 - currentLevelExamples.length))
          ].slice(0, 2);
          
          return {
            id: kanji.id,
            kanji: kanji.character,
            meaning: kanji.meaning,
            level: kanji.jlpt_level,
            strokes: kanji.stroke_count,
            examples: displayExamples.map(ex => ({
              word: ex.word,
              reading: ex.reading,
              meaning: ex.meaning
            }))
          };
        });

        // Cache the data
        localStorage.setItem(cacheKey, JSON.stringify(transformedKanji));
        localStorage.setItem(`${cacheKey}-timestamp`, Date.now().toString());
        
        setAllKanjiData(transformedKanji);
        setCurrentPage(1); // Reset to first page when data changes
      } catch (err) {
        console.error('Error fetching kanji data:', err);
        setError('Failed to load kanji data');
      } finally {
        setLoading(false);
      }
    };

    if (Object.keys(kanjiExamples).length > 0) {
      fetchKanjiData();
    }
  }, [selectedLevel, kanjiExamples]);

  // Sync mastery state with ReviewSystem on component mount and when returning from training
  useEffect(() => {
    if (kanjiData.length === 0) return;
    
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
  }, [masteredKanji, kanjiData]);

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

  const toggleSelected = (id: string) => {
    const newSelectedKanji = new Set(selectedKanji);
    if (newSelectedKanji.has(id)) {
      newSelectedKanji.delete(id);
    } else {
      newSelectedKanji.add(id);
    }
    setSelectedKanji(newSelectedKanji);
  };

  const toggleMastered = (id: string) => {
    const newMasteredKanji = new Set(masteredKanji);
    const isCurrentlyMastered = newMasteredKanji.has(id);
    
    if (isCurrentlyMastered) {
      newMasteredKanji.delete(id);
      // Reset progress in review system when unmarking as mastered
      ReviewSystem.resetItemProgress(id, 'kanji');
      console.log(`Reset progress for kanji ${id}`);
    } else {
      newMasteredKanji.add(id);
      // Mark as mastered in review system (set to 100% mastery)
      ReviewSystem.setItemMastered(id, 'kanji');
      console.log(`Set kanji ${id} as mastered`);
    }
    
    setMasteredKanji(newMasteredKanji);
  };

  const handleStartTraining = () => {
    setShowTrainingModal(true);
  };

  const getSelectedKanjiData = () => {
    return allKanjiData.filter(kanji => selectedKanji.has(kanji.id));
  };

  if (loading) {
    return (
      <div className="min-h-screen pb-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading kanji data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pb-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">Select kanji to begin studying ({kanjiData.length} available)</p>
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
        {kanjiData.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleSelected(item.id)}
            className={`border-t-4 border-l-4 sm:border-l-6 border-r-4 sm:border-r-6 border-b-6 sm:border-b-8 border-gray-200 transition-all duration-200 hover:shadow-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 relative cursor-pointer ${
              selectedKanji.has(item.id)
                ? 'bg-pink-50 border-pink-200 border-b-pink-500'
                : masteredKanji.has(item.id)
                  ? 'bg-green-50 border-green-200 border-b-green-500'
                  : 'bg-white border-gray-200 border-b-gray-400 hover:border-gray-300 hover:border-b-gray-600'
            }`}
          >
            <div className="text-center mb-4">
              <div className="text-6xl sm:text-8xl font-bold text-black font-japanese mb-2">
                {item.kanji}
              </div>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-2">
                <Brush className="h-3 w-3" />
                <span>{item.strokes} strokes</span>
              </div>
              <p className="text-base sm:text-lg text-gray-800 font-medium">
                {item.meaning}
              </p>
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
                  playAudio(item.kanji);
                }}
                className="p-1.5 sm:p-2 text-gray-500 hover:text-green-600 hover:bg-white/80 rounded-full transition-colors"
              >
                <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>

            {/* Selected indicator */}
            {selectedKanji.has(item.id) && (
              <div className="absolute top-4 right-16 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
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
                      <p className="text-xs text-gray-600 dark:text-gray-300">
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
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8 mb-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              if (pageNum > totalPages) return null;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 rounded-lg ${
                    pageNum === currentPage
                      ? 'bg-green-500 text-white'
                      : 'bg-white border border-gray-300 hover:bg-gray-50'
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
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Page Info */}
      <div className="text-center text-sm text-gray-600 mb-8">
        Showing {startIndex + 1}-{Math.min(endIndex, allKanjiData.length)} of {allKanjiData.length} kanji
      </div>

      {/* Study Footer Bar */}
      {selectedKanji.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {selectedKanji.size} kanji selected
                </span>
              </div>
              <button
                onClick={handleStartTraining}
                className="px-6 py-3 bg-pink-500 text-white hover:bg-pink-600 font-semibold transition-all rounded-lg shadow-sm hover:translate-y-0.5 active:translate-y-0.5"
              >
                Study Selected Kanji
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Training Mode Selection Modal */}
      <TrainingModeModal
        isOpen={showTrainingModal}
        onClose={() => setShowTrainingModal(false)}
        selectedItems={Array.from(selectedKanji)}
        itemType="kanji"
        selectedData={getSelectedKanjiData()}
      />
      </div>
    </div>
  );
}

export default function KanjiPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">Loading...</div>}>
      <KanjiPageContent />
    </Suspense>
  );
}