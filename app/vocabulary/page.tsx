'use client';

import { useState, useEffect } from 'react';
import { Check, X, BookOpen, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { ReviewSystem } from '@/lib/reviewSystem';
import { useSearchParams } from 'next/navigation';
import { getAllVocabulary, VocabularyData } from '@/lib/supabase-data';

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
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default function VocabularyPage() {
  const searchParams = useSearchParams();
  const selectedLevel = searchParams.get('level') || 'N5';
  const [allVocabularyData, setAllVocabularyData] = useState<VocabularyItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [masteredVocab, setMasteredVocab] = useState<Set<string>>(new Set());
  const [selectedVocab, setSelectedVocab] = useState<Set<string>>(new Set());

  // Calculate paginated data
  const totalPages = Math.ceil(allVocabularyData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const vocabularyData = allVocabularyData.slice(startIndex, endIndex);

  // Fetch vocabulary data from Supabase with caching
  useEffect(() => {
    const fetchVocabularyData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check cache first
        const cacheKey = `vocabulary-${selectedLevel}`;
        const cached = localStorage.getItem(cacheKey);
        const cacheTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);
        
        if (cached && cacheTimestamp) {
          const isExpired = Date.now() - parseInt(cacheTimestamp) > CACHE_DURATION;
          if (!isExpired) {
            console.log('Loading vocabulary from cache');
            setAllVocabularyData(JSON.parse(cached));
            setLoading(false);
            return;
          }
        }
        
        console.log('Fetching vocabulary from Supabase');
        const supabaseVocab = await getAllVocabulary();
        
        // Transform Supabase data to match VocabularyItem interface
        const transformedVocab: VocabularyItem[] = supabaseVocab.map(vocab => ({
          id: vocab.id,
          word: vocab.word,
          reading: vocab.reading,
          meaning: vocab.meaning,
          level: vocab.jlpt_level,
          example: vocab.example_sentence,
          exampleTranslation: vocab.example_translation
        }));

        // Cache the data
        localStorage.setItem(cacheKey, JSON.stringify(transformedVocab));
        localStorage.setItem(`${cacheKey}-timestamp`, Date.now().toString());
        
        setAllVocabularyData(transformedVocab);
        setCurrentPage(1); // Reset to first page when data changes
      } catch (err) {
        console.error('Error fetching vocabulary data:', err);
        setError('Failed to load vocabulary data');
      } finally {
        setLoading(false);
      }
    };

    fetchVocabularyData();
  }, [selectedLevel]);

  // Sync mastery state with ReviewSystem on component mount and when returning from training
  useEffect(() => {
    if (vocabularyData.length === 0) return;
    
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16">
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
            className="px-6 py-3 bg-gray-400 text-white hover:bg-gray-500 font-medium transition-colors rounded-md shadow-sm border-b-4 border-gray-600 hover:border-gray-700 text-base"
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
                className={`border-t-4 border-l-6 border-r-6 border-b-8 border-gray-200 transition-all duration-200 hover:shadow-lg rounded-2xl p-6 relative cursor-pointer ${
                  selectedVocab.has(item.id)
                    ? 'bg-blue-50 border-blue-200 border-b-blue-500'
                    : 
                  masteredVocab.has(item.id)
                    ? 'bg-green-50 border-green-200 border-b-green-500'
                    : 'bg-white border-gray-200 border-b-gray-400 hover:border-gray-300 hover:border-b-gray-600'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="text-center mb-4 pt-4">
                      <div className="text-7xl font-bold text-black font-japanese mb-3">
                        {item.word}
                      </div>
                      <p className="text-xl text-gray-600 font-japanese mb-3">
                        {item.reading}
                      </p>
                      <p className="text-xl text-gray-800 font-medium">
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



            {/* Mastery Toggle Switch */}
            <div className="absolute bottom-4 right-4 pt-2">
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
        Showing {startIndex + 1}-{Math.min(endIndex, allVocabularyData.length)} of {allVocabularyData.length} vocabulary
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
                onClick={() => {
                  // Store selected vocabulary data in localStorage for the match page
                  const selectedVocabData = allVocabularyData.filter(vocab => 
                    selectedVocab.has(vocab.id.toString())
                  );
                  localStorage.setItem('selectedVocabularyData', JSON.stringify(selectedVocabData));
                }}
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