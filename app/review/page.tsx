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

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Review</h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Items</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.mastered}</div>
            <div className="text-sm text-gray-600">Mastered</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.learning}</div>
            <div className="text-sm text-gray-600">Learning</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mx-auto mb-3">
              <Clock className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.review}</div>
            <div className="text-sm text-gray-600">In Review</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.dueToday}</div>
            <div className="text-sm text-gray-600">Due Today</div>
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
              {reviewItems.slice(0, 10).map((progress) => {
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
              
              {reviewItems.length > 10 && (
                <div className="text-center text-sm text-gray-600 py-2">
                  ... and {reviewItems.length - 10} more items
                </div>
              )}
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