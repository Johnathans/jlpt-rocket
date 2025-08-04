'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useReviewStore } from '@/lib/store/useReviewStore';
import { ItemProgress } from '@/lib/reviewSystem';
import { Calendar, Clock, Target, TrendingUp, BookOpen } from 'lucide-react';

// Import vocabulary and kanji data to display full item details
const vocabularyData = [
  { id: 1, word: '学校', reading: 'がっこう', meaning: 'school', level: 'N5' },
  { id: 2, word: '友達', reading: 'ともだち', meaning: 'friend', level: 'N5' },
  { id: 3, word: '勉強', reading: 'べんきょう', meaning: 'study', level: 'N5' },
  { id: 4, word: '電車', reading: 'でんしゃ', meaning: 'train', level: 'N4' },
  { id: 5, word: '料理', reading: 'りょうり', meaning: 'cooking, cuisine', level: 'N4' },
  { id: 6, word: '経験', reading: 'けいけん', meaning: 'experience', level: 'N3' },
];

const kanjiData = [
  { id: 1, kanji: '学', meaning: 'study, learning', level: 'N5' },
  { id: 2, kanji: '友', meaning: 'friend', level: 'N5' },
  { id: 3, kanji: '電', meaning: 'electricity', level: 'N4' },
  { id: 4, kanji: '料', meaning: 'fee, materials', level: 'N4' },
  { id: 5, kanji: '経', meaning: 'sutra, longitude', level: 'N3' },
];

const sentencesData = [
  { id: 1, fullSentence: '今日は学校に行きます。', fullReading: 'きょうは がっこうに いきます。', meaning: 'Today I will go to school.', level: 'N5' },
  { id: 2, fullSentence: '友達と映画を見ました。', fullReading: 'ともだちと えいがを みました。', meaning: 'I watched a movie with my friend.', level: 'N5' },
  { id: 3, fullSentence: '日本語を勉強しています。', fullReading: 'にほんごを べんきょうしています。', meaning: 'I am studying Japanese.', level: 'N5' },
  { id: 4, fullSentence: '電車で会社に通っています。', fullReading: 'でんしゃで かいしゃに かよっています。', meaning: 'I commute to work by train.', level: 'N4' },
  { id: 5, fullSentence: '母の料理はとても美味しいです。', fullReading: 'ははの りょうりは とても おいしいです。', meaning: 'My mother\'s cooking is very delicious.', level: 'N4' },
];

function getItemDetails(progress: ItemProgress) {
  if (progress.type === 'vocabulary') {
    return vocabularyData.find(item => item.id === progress.id);
  } else if (progress.type === 'kanji') {
    return kanjiData.find(item => item.id === progress.id);
  } else if (progress.type === 'sentences') {
    return sentencesData.find(item => item.id === progress.id);
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
  const itemsPerPage = 10;

  // Load data on mount and when page becomes visible
  const refreshData = () => {
    loadReviewItems();
    setStats(getReviewStats());
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

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Review</h1>

        {/* Simplified Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">{reviewItems.length}</div>
            <div className="text-lg text-gray-600 mb-6">
              {reviewItems.length === 1 ? 'item due for review' : 'items due for review'}
            </div>
            <button 
              onClick={handleStartReview}
              disabled={reviewItems.length === 0}
              className="px-8 py-4 bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold transition-all rounded-lg shadow-sm border-b-4 border-green-600 hover:border-green-700 disabled:border-gray-400 hover:translate-y-0.5 active:translate-y-0.5 disabled:translate-y-0"
            >
              {reviewItems.length === 0 ? 'No Items to Review' : 'Start Review Session'}
            </button>
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
              {currentItems.map((progress) => {
                const itemDetails = getItemDetails(progress);
                if (!itemDetails) return null;
                
                const masteryColor = progress.masteryLevel >= 75 ? 'text-green-600' : 
                                   progress.masteryLevel >= 50 ? 'text-yellow-600' : 
                                   progress.masteryLevel >= 25 ? 'text-orange-600' : 'text-red-600';
                
                return (
                  <div key={`${progress.type}_${progress.id}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-black font-japanese">
                          {progress.type === 'sentences' 
                            ? (itemDetails as any).fullSentence
                            : progress.type === 'vocabulary' 
                            ? (itemDetails as any).word 
                            : (itemDetails as any).kanji
                          }
                        </h3>
                        {(progress.type === 'vocabulary' || progress.type === 'sentences') && (
                          <span className="text-sm text-gray-600 font-japanese">
                            {progress.type === 'sentences' 
                              ? (itemDetails as any).fullReading
                              : (itemDetails as any).reading
                            }
                          </span>
                        )}
                      </div>
                      <p className="text-gray-800 font-medium mb-1">
                        {itemDetails.meaning}
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
              })}
              
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
                        let page;
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

        {/* Review Button */}
        <div className="text-center">
          <button 
            onClick={handleStartReview}
            disabled={reviewItems.length === 0}
            className="px-8 py-4 bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold transition-all rounded-lg shadow-sm border-b-4 border-green-600 hover:border-green-700 disabled:border-gray-400 hover:translate-y-0.5 active:translate-y-0.5 disabled:translate-y-0"
          >
            {reviewItems.length === 0 ? 'No Items to Review' : `Start Review Session (${reviewItems.length} items)`}
          </button>
        </div>
      </div>
    </div>
  );
}