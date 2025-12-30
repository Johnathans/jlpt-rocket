'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ReviewSystemSupabase } from '@/lib/reviewSystemSupabase';
import { getContentCountsByLevel, JLPTLevel } from '@/lib/static-data';

interface ReviewStats {
  kanji: { learning: number; mastered: number; total: number };
  vocabulary: { learning: number; mastered: number; total: number };
  sentences: { learning: number; mastered: number; total: number };
}

// Real data counts - loaded dynamically from Supabase
interface ContentCounts {
  kanji: number;
  vocabulary: number;
  sentences: number;
}

function ProgressPageContent() {
  const searchParams = useSearchParams();
  const selectedLevel = searchParams.get('level') || 'N5';
  
  const [contentCounts, setContentCounts] = useState<ContentCounts>({
    kanji: 0,
    vocabulary: 0,
    sentences: 0
  });
  
  const [stats, setStats] = useState<ReviewStats>({
    kanji: { learning: 0, mastered: 0, total: 0 },
    vocabulary: { learning: 0, mastered: 0, total: 0 },
    sentences: { learning: 0, mastered: 0, total: 0 }
  });

  // Load content counts from Supabase for the selected level
  useEffect(() => {
    const loadContentCounts = async () => {
      try {
        const counts = await getContentCountsByLevel(selectedLevel as JLPTLevel);
        setContentCounts(counts);
      } catch (error) {
        console.error('Failed to load content counts:', error);
        // Fallback to default values
        setContentCounts({ kanji: 0, vocabulary: 0, sentences: 0 });
      }
    };
    
    loadContentCounts();
  }, [selectedLevel]);

  // Load real progress data from review system
  useEffect(() => {
    const loadProgressData = async () => {
      const progressMap = await ReviewSystemSupabase.getProgressData();
      
      const newStats = {
        kanji: { learning: 0, mastered: 0, total: contentCounts.kanji },
        vocabulary: { learning: 0, mastered: 0, total: contentCounts.vocabulary },
        sentences: { learning: 0, mastered: 0, total: contentCounts.sentences }
      };
      
      
      // Count progress for each type
      progressMap.forEach((progress) => {
        if (progress.type === 'kanji') {
          if (progress.masteryLevel >= 100) {
            newStats.kanji.mastered++;
          } else if (progress.correctCount > 0 || progress.incorrectCount > 0) {
            newStats.kanji.learning++;
          }
        } else if (progress.type === 'vocabulary') {
          if (progress.masteryLevel >= 100) {
            newStats.vocabulary.mastered++;
          } else if (progress.correctCount > 0 || progress.incorrectCount > 0) {
            newStats.vocabulary.learning++;
          }
        } else if (progress.type === 'sentences') {
          if (progress.masteryLevel >= 100) {
            newStats.sentences.mastered++;
          } else if (progress.correctCount > 0 || progress.incorrectCount > 0) {
            newStats.sentences.learning++;
          }
        }
      });
      
      setStats(newStats);
    };
    
    if (contentCounts.kanji > 0 || contentCounts.vocabulary > 0 || contentCounts.sentences > 0) {
      loadProgressData();
    }
  }, [contentCounts]);
  
  // Refresh data when page becomes visible (user returns from training)
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (!document.hidden) {
        const progressMap = await ReviewSystemSupabase.getProgressData();
        
        const newStats = {
          kanji: { learning: 0, mastered: 0, total: contentCounts.kanji },
          vocabulary: { learning: 0, mastered: 0, total: contentCounts.vocabulary },
          sentences: { learning: 0, mastered: 0, total: contentCounts.sentences }
        };
        
        progressMap.forEach((progress) => {
          if (progress.type === 'kanji') {
            if (progress.masteryLevel >= 100) {
              newStats.kanji.mastered++;
            } else if (progress.correctCount > 0 || progress.incorrectCount > 0) {
              newStats.kanji.learning++;
            }
          } else if (progress.type === 'vocabulary') {
            if (progress.masteryLevel >= 100) {
              newStats.vocabulary.mastered++;
            } else if (progress.correctCount > 0 || progress.incorrectCount > 0) {
              newStats.vocabulary.learning++;
            }
          } else if (progress.type === 'sentences') {
            if (progress.masteryLevel >= 100) {
              newStats.sentences.mastered++;
            } else if (progress.correctCount > 0 || progress.incorrectCount > 0) {
              newStats.sentences.learning++;
            }
          }
        });
        
        setStats(newStats);
      }
    };
    
    const handleFocus = () => {
      handleVisibilityChange();
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [contentCounts]);

  const categories = [
    { name: 'Kanji', data: stats.kanji },
    { name: 'Vocabulary', data: stats.vocabulary },
    { name: 'Sentences', data: stats.sentences }
  ];



  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Progress</h1>
          <p className="text-gray-600 dark:text-gray-300">Track your learning progress across all content types</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
          <div className="space-y-8">
            {categories.map((category) => {
              const masteredPercent = category.data.total > 0 ? (category.data.mastered / category.data.total) * 100 : 0;
              const learningPercent = category.data.total > 0 ? (category.data.learning / category.data.total) * 100 : 0;
              const totalProgress = category.data.mastered + category.data.learning;
              
              return (
                <div key={category.name}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{category.name}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600 dark:text-gray-300">
                        <span className="font-bold text-gray-900 dark:text-white">{totalProgress}</span> / {category.data.total}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {category.data.total > 0 ? Math.round((totalProgress / category.data.total) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg h-12 overflow-hidden">
                      <div className="flex h-12">
                        {/* Mastered */}
                        <div 
                          className="bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold transition-all duration-300"
                          style={{ width: `${masteredPercent}%` }}
                        >
                          {category.data.mastered > 0 && masteredPercent > 8 && (
                            <span className="px-2">{category.data.mastered}</span>
                          )}
                        </div>
                        {/* Learning */}
                        <div 
                          className="bg-orange-200 dark:bg-orange-400 flex items-center justify-center text-gray-800 dark:text-gray-900 text-sm font-bold transition-all duration-300"
                          style={{ width: `${learningPercent}%` }}
                        >
                          {category.data.learning > 0 && learningPercent > 8 && (
                            <span className="px-2">{category.data.learning}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats Row */}
                  <div className="flex items-center gap-6 mt-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-gradient-to-r from-pink-500 to-orange-500"></div>
                      <span className="text-gray-600 dark:text-gray-300">
                        <span className="font-semibold text-gray-900 dark:text-white">{category.data.mastered}</span> mastered
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-orange-200 dark:bg-orange-400"></div>
                      <span className="text-gray-600 dark:text-gray-300">
                        <span className="font-semibold text-gray-900 dark:text-white">{category.data.learning}</span> learning
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">{category.data.total - totalProgress}</span> not started
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}

export default function ProgressPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading progress...</p>
        </div>
      </div>
    }>
      <ProgressPageContent />
    </Suspense>
  );
}