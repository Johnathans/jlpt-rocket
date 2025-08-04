'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ReviewSystem } from '@/lib/reviewSystem';

interface ReviewStats {
  kanji: { learning: number; mastered: number; total: number };
  vocabulary: { learning: number; mastered: number; total: number };
  sentences: { learning: number; mastered: number; total: number };
}

// Real data counts - these should match the actual data in the app
const TOTAL_COUNTS = {
  kanji: 6, // Based on kanjiData in the app
  vocabulary: 6, // Based on vocabularyData in the app  
  sentences: 5 // Based on sentencesData in the app
};

export default function ProgressPage() {
  const searchParams = useSearchParams();
  const selectedLevel = searchParams.get('level') || 'N5';
  
  const [stats, setStats] = useState<ReviewStats>({
    kanji: { learning: 0, mastered: 0, total: TOTAL_COUNTS.kanji },
    vocabulary: { learning: 0, mastered: 0, total: TOTAL_COUNTS.vocabulary },
    sentences: { learning: 0, mastered: 0, total: TOTAL_COUNTS.sentences }
  });

  // Load real progress data from review system
  useEffect(() => {
    const loadProgressData = () => {
      const progressMap = ReviewSystem.getProgressData();
      
      const newStats = {
        kanji: { learning: 0, mastered: 0, total: TOTAL_COUNTS.kanji },
        vocabulary: { learning: 0, mastered: 0, total: TOTAL_COUNTS.vocabulary },
        sentences: { learning: 0, mastered: 0, total: TOTAL_COUNTS.sentences }
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
    
    loadProgressData();
  }, []);
  
  // Refresh data when page becomes visible (user returns from training)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const progressMap = ReviewSystem.getProgressData();
        
        const newStats = {
          kanji: { learning: 0, mastered: 0, total: TOTAL_COUNTS.kanji },
          vocabulary: { learning: 0, mastered: 0, total: TOTAL_COUNTS.vocabulary },
          sentences: { learning: 0, mastered: 0, total: TOTAL_COUNTS.sentences }
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
  }, []);

  const categories = [
    { name: 'Kanji', data: stats.kanji },
    { name: 'Vocabulary', data: stats.vocabulary },
    { name: 'Sentences', data: stats.sentences }
  ];

  const maxTotal = Math.max(stats.kanji.total, stats.vocabulary.total, stats.sentences.total);

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{selectedLevel} Progress</h1>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category.name}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-800">{category.name}</h3>
                  <span className="text-sm text-gray-600">
                    {category.data.mastered + category.data.learning} / {category.data.total}
                  </span>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded h-16">
                    <div className="flex h-16 rounded overflow-hidden">
                      <div 
                        className="bg-green-500 flex items-center justify-center text-white text-sm font-medium"
                        style={{ width: `${(category.data.mastered / maxTotal) * 100}%` }}
                      >
                        {category.data.mastered > 0 && (
                          <span className="px-2">{category.data.mastered}</span>
                        )}
                      </div>
                      <div 
                        className="bg-green-300 flex items-center justify-center text-gray-800 text-sm font-medium"
                        style={{ width: `${(category.data.learning / maxTotal) * 100}%` }}
                      >
                        {category.data.learning > 0 && (
                          <span className="px-2">{category.data.learning}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Mastered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-300 rounded"></div>
              <span>Learning</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}