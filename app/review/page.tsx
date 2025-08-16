'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useReviewStore } from '@/lib/store/useReviewStore';
import { ItemProgress, ReviewSystem } from '@/lib/reviewSystem';
import { Calendar, Clock, Target, TrendingUp, BookOpen } from 'lucide-react';
import { getVocabularyByLevel, getKanjiByLevel, getSentencesByLevel, JLPTLevel } from '@/lib/supabase-data';

// Cache for fetched data to avoid repeated API calls
const dataCache = {
  vocabulary: new Map(),
  kanji: new Map(),
  sentences: new Map()
};

async function getItemDetails(progress: ItemProgress) {
  try {
    if (progress.type === 'vocabulary') {
      // Check cache first
      if (dataCache.vocabulary.has(progress.id)) {
        return dataCache.vocabulary.get(progress.id);
      }
      
      // Fetch all vocabulary data for all levels if not cached
      const levels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
      for (const level of levels) {
        const levelData = await getVocabularyByLevel(level);
        levelData.forEach(item => {
          dataCache.vocabulary.set(item.id, {
            id: item.id,
            word: item.word,
            reading: item.reading,
            meaning: item.meaning,
            level: level
          });
        });
      }
      
      return dataCache.vocabulary.get(progress.id);
    } else if (progress.type === 'kanji') {
      // Check cache first
      if (dataCache.kanji.has(progress.id)) {
        return dataCache.kanji.get(progress.id);
      }
      
      // Fetch all kanji data for all levels if not cached
      const levels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
      for (const level of levels) {
        const levelData = await getKanjiByLevel(level);
        levelData.forEach(item => {
          dataCache.kanji.set(item.id, {
            id: item.id,
            kanji: item.character,
            meaning: item.meaning,
            level: level
          });
        });
      }
      
      return dataCache.kanji.get(progress.id);
    } else if (progress.type === 'sentences') {
      // Check cache first
      if (dataCache.sentences.has(progress.id)) {
        return dataCache.sentences.get(progress.id);
      }
      
      // Fetch all sentences data for all levels if not cached
      const levels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
      for (const level of levels) {
        const levelData = await getSentencesByLevel(level);
        levelData.forEach(item => {
          dataCache.sentences.set(item.id, {
            id: item.id,
            fullSentence: item.japanese_text,
            fullReading: item.japanese_text, // Note: SentenceData doesn't have separate reading field
            meaning: item.english_translation,
            level: level
          });
        });
      }
      
      return dataCache.sentences.get(progress.id);
    }
  } catch (error) {
    console.error('Error fetching item details:', error);
    return null;
  }
  return null;
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
    loadReviewItems();
    setStats(getReviewStats());
    
    // Fetch item details for all review items
    const detailsMap = new Map();
    const currentReviewItems = useReviewStore.getState().reviewItems;
    
    for (const item of currentReviewItems) {
      const details = await getItemDetails(item);
      if (details) {
        detailsMap.set(item.id, details);
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

  const handleClearReviewData = () => {
    ReviewSystem.clearAllReviewData();
    refreshData();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Simplified Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="text-center">
            <div className="text-8xl font-bold text-gray-900 mb-4">{reviewItems.length}</div>
            <div className="text-2xl text-gray-600 mb-8">
              {reviewItems.length === 1 ? 'item due for review' : 'items due for review'}
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleStartReview}
                disabled={reviewItems.length === 0}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Start Review Session
              </button>
              <button
                onClick={handleClearReviewData}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Clear Review Data
              </button>
            </div>
          </div>
        </div>

        {/* Items to Review */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Items Due for Review</h2>
            <Link 
              href="/review/settings" 
              className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
            >
              <Target className="h-4 w-4" />
              Review Settings
            </Link>
          </div>
          
          {reviewItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
              <p className="text-gray-600">No items are due for review right now. Great job!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
                  <p className="text-gray-600 mt-2">Loading review items...</p>
                </div>
              ) : (
                currentItems.map((progress) => {
                  const details = itemDetails.get(progress.id);
                  if (!details) {
                    // Skip items with invalid IDs (empty strings, etc.)
                    return null;
                  }
                
                  const masteryColor = progress.masteryLevel >= 75 ? 'text-green-600' : 
                                     progress.masteryLevel >= 50 ? 'text-yellow-600' : 
                                     progress.masteryLevel >= 25 ? 'text-orange-600' : 'text-red-600';
                  const masteryBg = progress.masteryLevel >= 75 ? 'bg-green-100' : 
                                     progress.masteryLevel >= 50 ? 'bg-yellow-100' : 
                                     progress.masteryLevel >= 25 ? 'bg-orange-100' : 'bg-red-100';
                  
                  return (
                    <div key={`${progress.type}_${progress.id}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-black font-japanese">
                            {progress.type === 'sentences' 
                              ? details.fullSentence
                              : progress.type === 'vocabulary' 
                              ? details.word 
                              : details.kanji
                            }
                          </h3>
                          {(progress.type === 'vocabulary' || progress.type === 'sentences') && (
                            <span className="text-sm text-gray-600 font-japanese">
                              {progress.type === 'sentences' 
                                ? details.fullReading
                                : details.reading
                              }
                            </span>
                          )}
                        </div>
                        <p className="text-gray-800 font-medium mb-1">
                          {details.meaning}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="uppercase tracking-wide font-medium">{progress.type}</span>
                          <span className={`font-medium ${masteryColor}`}>
                            {progress.masteryLevel}% mastered
                          </span>
                          <span>
                            {progress.correctCount}/{progress.correctCount + progress.incorrectCount} correct
                          </span>
                          {progress.nextReviewDate > new Date() && (
                            <span>
                              Next: {progress.nextReviewDate.toLocaleDateString()}
                            </span>
                          )}
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
                                ? 'bg-green-500 text-white shadow-md hover:bg-green-600'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
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
              <div className="text-center text-sm text-gray-600 py-2">
                Showing {startIndex + 1}-{Math.min(endIndex, reviewItems.length)} of {reviewItems.length} items
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}