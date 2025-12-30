'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useReviewStore } from '@/lib/store/useReviewStore';
import { ItemProgress } from '@/lib/reviewSystem';
import { ReviewSystemSupabase } from '@/lib/reviewSystemSupabase';
import { Target, Play, RotateCcw, Trash2, CheckCircle } from 'lucide-react';
import { getVocabularyByLevel, getKanjiByLevel, getSentencesByLevel, JLPTLevel } from '@/lib/static-data';

function getItemDetails(progress: ItemProgress) {
  // Use stored content data instead of API calls
  if (progress.content) {
    if (progress.type === 'vocabulary') {
      return {
        id: progress.id,
        word: progress.content.word,
        reading: progress.content.reading,
        meaning: progress.content.meaning,
        level: progress.content.level
      };
    } else if (progress.type === 'kanji') {
      return {
        id: progress.id,
        kanji: progress.content.character,
        meaning: progress.content.meaning,
        level: progress.content.level
      };
    } else if (progress.type === 'sentences') {
      return {
        id: progress.id,
        fullSentence: progress.content.sentence,
        fullReading: progress.content.sentence,
        meaning: progress.content.meaning,
        level: progress.content.level
      };
    }
  }
  
  // Fallback for items without stored content (legacy data)
  return {
    id: progress.id,
    word: `${progress.type} ${progress.id}`,
    kanji: `${progress.type} ${progress.id}`,
    fullSentence: `${progress.type} ${progress.id}`,
    meaning: 'Content not available',
    level: 'Unknown'
  };
}

export default function ReviewPage() {
  const { 
    reviewItems, 
    loadReviewItems, 
    getReviewStats,
    startReviewSession 
  } = useReviewStore();
  
  const [stats, setStats] = useState({ total: 0, mastered: 0, learning: 0, review: 0, dueToday: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemDetails, setItemDetails] = useState<Map<string, any>>(new Map());
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  // Load data on mount and when page becomes visible
  const refreshData = async () => {
    setLoading(true);
    await loadReviewItems();
    const reviewStats = await getReviewStats();
    setStats(reviewStats);
    
    // Fetch actual content from database for review items
    const detailsMap = new Map();
    const currentReviewItems = useReviewStore.getState().reviewItems;
    
    // Group items by type for batch fetching
    const kanjiIds = currentReviewItems.filter(i => i.type === 'kanji').map(i => i.id);
    const vocabIds = currentReviewItems.filter(i => i.type === 'vocabulary').map(i => i.id);
    const sentenceIds = currentReviewItems.filter(i => i.type === 'sentences').map(i => i.id);
    
    // Fetch all content in parallel
    const levels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
    
    // Fetch kanji data
    if (kanjiIds.length > 0) {
      for (const level of levels) {
        const kanjiData = await getKanjiByLevel(level);
        for (const kanji of kanjiData) {
          if (kanjiIds.includes(kanji.id)) {
            detailsMap.set(kanji.id, {
              id: kanji.id,
              kanji: kanji.character,
              meaning: kanji.meaning,
              level: kanji.jlpt_level
            });
          }
        }
      }
    }
    
    // Fetch vocabulary data
    if (vocabIds.length > 0) {
      for (const level of levels) {
        const vocabData = await getVocabularyByLevel(level);
        for (const vocab of vocabData) {
          if (vocabIds.includes(vocab.id)) {
            detailsMap.set(vocab.id, {
              id: vocab.id,
              word: vocab.word,
              reading: vocab.reading,
              meaning: vocab.meaning,
              level: vocab.jlpt_level
            });
          }
        }
      }
    }
    
    // Fetch sentence data
    if (sentenceIds.length > 0) {
      for (const level of levels) {
        const sentenceData = await getSentencesByLevel(level);
        for (const sentence of sentenceData) {
          if (sentenceIds.includes(sentence.id)) {
            detailsMap.set(sentence.id, {
              id: sentence.id,
              fullSentence: sentence.japanese_text,
              fullReading: sentence.japanese_text,
              meaning: sentence.english_translation,
              level: sentence.jlpt_level
            });
          }
        }
      }
    }
    
    setItemDetails(detailsMap);
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Refresh data when the page becomes visible (user returns from training)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshData();
      }
    };

    const handleFocus = () => {
      refreshData();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleStartReview = () => {
    if (reviewItems.length > 0) {
      startReviewSession();
      // Navigate to match mode with review items
      const reviewIds = reviewItems.map(item => item.id).join(',');
      const reviewTypes = reviewItems.map(item => item.type).join(',');
      window.location.href = `/match?ids=${reviewIds}&types=${reviewTypes}&mode=review`;
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(reviewItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = reviewItems.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClearReviewData = async () => {
    await ReviewSystemSupabase.clearAllReviewData();
    refreshData();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Review</h1>
          <p className="text-gray-600">Practice items you've learned to strengthen your memory</p>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-6xl font-bold text-gray-900 mb-2">{reviewItems.length}</div>
              <div className="text-lg text-gray-600">
                {reviewItems.length === 1 ? 'item due for review' : 'items due for review'}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleStartReview}
                disabled={reviewItems.length === 0}
                className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
              >
                <Play className="h-5 w-5" />
                Start Review
              </button>
              <button
                onClick={handleClearReviewData}
                className="flex items-center gap-2 border-2 border-gray-300 hover:border-red-500 hover:bg-red-50 text-gray-700 hover:text-red-600 px-4 py-3 rounded-lg font-medium transition-all"
                title="Clear all review data"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Review Queue</h2>
          </div>
          
          {reviewItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-100 to-orange-100 rounded-full mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">All caught up!</h3>
              <p className="text-gray-600">No items are due for review right now. Great job!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
                  <p className="text-gray-600 mt-2">Loading review items...</p>
                </div>
              ) : (
                currentItems.map((progress) => {
                  const details = itemDetails.get(progress.id);
                  if (!details) {
                    return null;
                  }
                
                  const masteryColor = progress.masteryLevel >= 75 ? 'text-pink-600' : 
                                     progress.masteryLevel >= 50 ? 'text-orange-500' : 
                                     progress.masteryLevel >= 25 ? 'text-orange-600' : 'text-red-600';
                  
                  return (
                    <div key={`${progress.type}_${progress.id}`} className="border border-gray-200 rounded-lg p-4 hover:border-pink-300 hover:bg-pink-50 transition-all">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900 font-japanese">
                              {progress.type === 'sentences' 
                                ? details.fullSentence
                                : progress.type === 'vocabulary' 
                                ? details.word 
                                : details.kanji
                              }
                            </h3>
                            {(progress.type === 'vocabulary' || progress.type === 'sentences') && details.reading && (
                              <span className="text-sm text-gray-600 font-japanese">
                                {progress.type === 'sentences' 
                                  ? details.fullReading
                                  : details.reading
                                }
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700 mb-3">
                            {details.meaning}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium uppercase">
                              {progress.type}
                            </span>
                            <span className={`font-semibold ${masteryColor}`}>
                              {progress.masteryLevel}% mastered
                            </span>
                            <span className="text-gray-500">
                              {progress.correctCount}/{progress.correctCount + progress.incorrectCount} correct
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </button>
                    
                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let page: number;
                        if (totalPages <= 5) {
                          page = i + 1;
                        } else if (currentPage <= 3) {
                          page = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          page = totalPages - 4 + i;
                        } else {
                          page = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200 ${
                              currentPage === page
                                ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-pink-300'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all duration-200"
                    >
                      Next
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              
              {/* Items count info */}
              <div className="text-center text-sm text-gray-500 py-2">
                Showing {startIndex + 1}-{Math.min(endIndex, reviewItems.length)} of {reviewItems.length} items
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}