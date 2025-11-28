'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, BookOpen, FileText, Target, ChevronRight, Check, Play, Zap, Flame } from 'lucide-react';
import { useJLPTLevel } from '@/contexts/JLPTLevelContext';
import { getContentCounts } from '@/lib/supabase-data';
import { StreakSystem } from '@/lib/streakSystem';
import { ReviewSystem } from '@/lib/reviewSystem';
import { useRouter } from 'next/navigation';

interface DailyPlan {
  day: number;
  date: string;
  kanji: number;
  vocabulary: number;
  testQuestions: number;
  completed: boolean;
  dateObj: Date;
}

interface StudyPlan {
  totalDays: number;
  dailyKanji: number;
  dailyVocabulary: number;
  dailyTestQuestions: number;
  schedule: DailyPlan[];
}

const timelineOptions = [
  { days: 60, label: '60 Days', description: 'Intensive study plan' },
  { days: 90, label: '90 Days', description: 'Balanced approach' },
  { days: 120, label: '120 Days', description: 'Comfortable pace' },
  { days: 180, label: '180 Days', description: 'Relaxed learning' }
];

export default function RoadmapPage() {
  const { currentLevel } = useJLPTLevel();
  const router = useRouter();
  const [selectedDays, setSelectedDays] = useState(90);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [contentCounts, setContentCounts] = useState({ kanji: 0, vocabulary: 0, sentences: 0 });
  const [loading, setLoading] = useState(true);
  const [completedDays, setCompletedDays] = useState<Set<string>>(new Set());
  const [showAllDays, setShowAllDays] = useState(false);

  // Load content counts and completed days
  useEffect(() => {
    const loadContentCounts = async () => {
      try {
        const counts = await getContentCounts();
        setContentCounts(counts);
        
        // Load completed days from streak system
        const streakData = StreakSystem.getStreakData();
        const completed = new Set<string>();
        Object.keys(streakData.dailyStreaks).forEach(dateStr => {
          if (streakData.dailyStreaks[dateStr]) {
            completed.add(dateStr);
          }
        });
        setCompletedDays(completed);
      } catch (error) {
        console.error('Error loading content counts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContentCounts();
  }, []);

  // Generate study plan when timeline or level changes
  useEffect(() => {
    if (!loading && contentCounts.kanji > 0) {
      generateStudyPlan();
    }
  }, [selectedDays, currentLevel, contentCounts, loading]);

  const generateStudyPlan = () => {
    // Estimate content based on JLPT level
    const levelMultipliers = {
      'N5': { kanji: 0.05, vocabulary: 0.08, test: 0.1 },
      'N4': { kanji: 0.15, vocabulary: 0.16, test: 0.2 },
      'N3': { kanji: 0.30, vocabulary: 0.35, test: 0.4 },
      'N2': { kanji: 0.50, vocabulary: 0.60, test: 0.7 },
      'N1': { kanji: 1.0, vocabulary: 1.0, test: 1.0 }
    };

    const multiplier = levelMultipliers[currentLevel];
    const targetKanji = Math.ceil(contentCounts.kanji * multiplier.kanji);
    const targetVocabulary = Math.ceil(contentCounts.vocabulary * multiplier.vocabulary);
    const targetTestQuestions = Math.ceil(500 * multiplier.test); // Base 500 test questions

    const dailyKanji = Math.ceil(targetKanji / selectedDays);
    const dailyVocabulary = Math.ceil(targetVocabulary / selectedDays);
    const dailyTestQuestions = Math.ceil(targetTestQuestions / selectedDays);

    // Generate daily schedule
    const schedule: DailyPlan[] = [];
    const startDate = new Date();

    for (let day = 1; day <= selectedDays; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + day - 1);
      const dateStr = currentDate.toISOString().split('T')[0];
      
      schedule.push({
        day,
        date: currentDate.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        kanji: Math.min(dailyKanji, Math.max(0, targetKanji - (day - 1) * dailyKanji)),
        vocabulary: Math.min(dailyVocabulary, Math.max(0, targetVocabulary - (day - 1) * dailyVocabulary)),
        testQuestions: Math.min(dailyTestQuestions, Math.max(0, targetTestQuestions - (day - 1) * dailyTestQuestions)),
        completed: completedDays.has(dateStr),
        dateObj: currentDate
      });
    }

    setStudyPlan({
      totalDays: selectedDays,
      dailyKanji,
      dailyVocabulary,
      dailyTestQuestions,
      schedule
    });
  };

  const getTodayIndex = () => {
    if (!studyPlan) return -1;
    const today = new Date().toISOString().split('T')[0];
    return studyPlan.schedule.findIndex(day => 
      day.dateObj.toISOString().split('T')[0] === today
    );
  };

  const handleStartKanji = (day: DailyPlan) => {
    router.push(`/kanji?level=${currentLevel}`);
  };

  const handleStartVocabulary = (day: DailyPlan) => {
    router.push(`/vocabulary?level=${currentLevel}`);
  };

  const handleStartTraining = (day: DailyPlan) => {
    router.push(`/match?type=mixed&level=${currentLevel}`);
  };

  const getCompletedCount = () => {
    if (!studyPlan) return 0;
    return studyPlan.schedule.filter(day => day.completed).length;
  };

  const getProgressPercentage = () => {
    if (!studyPlan) return 0;
    return Math.round((getCompletedCount() / studyPlan.schedule.length) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9fafb' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderBottomColor: '#ec4899' }}></div>
          <p className="text-gray-600">Loading study plan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: '#f9fafb' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Timeline Selection */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-8 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            Select Your Timeline
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {timelineOptions.map((option) => {
              const isSelected = selectedDays === option.days;
              
              return (
                <button
                  key={option.days}
                  onClick={() => setSelectedDays(option.days)}
                  className={`
                    p-3 sm:p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105
                    ${isSelected 
                      ? 'bg-white shadow-lg' 
                      : 'bg-white hover:shadow-md'
                    }
                  `}
                  style={isSelected ? { borderColor: '#ec4899' } : { borderColor: '#f9fafb' }}
                >
                  <div className="text-center">
                    <div 
                      className="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3"
                      style={{ backgroundColor: '#f9fafb' }}
                    >
                      <Clock className="h-4 w-4 sm:h-6 sm:w-6" style={{ color: '#ec4899' }} />
                    </div>
                    <h3 className="text-sm sm:text-lg font-bold mb-1" style={isSelected ? { color: '#ec4899' } : {}}>{option.label}</h3>
                    <p className="text-xs sm:text-sm" style={{ color: '#ec4899' }}>
                      {option.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Study Plan Overview */}
        {studyPlan && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your {selectedDays}-Day Study Plan
            </h2>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Progress Overview</h3>
                  <p className="text-sm text-gray-600">
                    {getCompletedCount()} of {studyPlan.schedule.length} days completed ({getProgressPercentage()}%)
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Current Streak</p>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl font-bold" style={{ color: '#ec4899' }}>
                      {StreakSystem.getStreakData().currentStreak}
                    </span>
                    <Flame className="h-5 w-5" style={{ color: '#ec4899' }} />
                  </div>
                </div>
              </div>
              <div className="w-full rounded-full h-3" style={{ backgroundColor: '#f9fafb' }}>
                <div 
                  className="h-3 rounded-full transition-all duration-300"
                  style={{ backgroundColor: '#ec4899', width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 rounded-xl" style={{ backgroundColor: '#f9fafb' }}>
                <div className="flex justify-center mb-3">
                  <FileText className="h-8 w-8" style={{ color: '#ec4899' }} />
                </div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: '#ec4899' }}>Daily Kanji</h3>
                <p className="text-2xl font-bold" style={{ color: '#ec4899' }}>{studyPlan.dailyKanji}</p>
                <p className="text-sm" style={{ color: '#ec4899' }}>characters per day</p>
              </div>
              
              <div className="text-center p-6 rounded-xl" style={{ backgroundColor: '#f9fafb' }}>
                <div className="flex justify-center mb-3">
                  <BookOpen className="h-8 w-8" style={{ color: '#ec4899' }} />
                </div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: '#ec4899' }}>Daily Vocabulary</h3>
                <p className="text-2xl font-bold" style={{ color: '#ec4899' }}>{studyPlan.dailyVocabulary}</p>
                <p className="text-sm" style={{ color: '#ec4899' }}>words per day</p>
              </div>
              
              <div className="text-center p-6 rounded-xl" style={{ backgroundColor: '#f9fafb' }}>
                <div className="flex justify-center mb-3">
                  <Target className="h-8 w-8" style={{ color: '#ec4899' }} />
                </div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: '#ec4899' }}>Daily Practice</h3>
                <p className="text-2xl font-bold" style={{ color: '#ec4899' }}>{studyPlan.dailyTestQuestions}</p>
                <p className="text-sm" style={{ color: '#ec4899' }}>test questions per day</p>
              </div>
            </div>
          </div>
        )}

        {/* Daily Timeline */}
        {studyPlan && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Daily Study Schedule
              </h2>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                {selectedDays} days total
              </div>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {(showAllDays ? studyPlan.schedule : studyPlan.schedule.slice(0, 14)).map((day, index) => {
                const todayIndex = getTodayIndex();
                const isToday = index === todayIndex;
                const isPast = index < todayIndex;
                const isFuture = index > todayIndex;
                
                return (
                <div
                  key={day.day}
                  className={`
                    flex items-center justify-between p-4 rounded-lg border transition-colors
                    bg-white hover:shadow-sm
                  `}
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                        ${day.completed 
                          ? 'text-white' 
                          : isToday 
                            ? 'text-white' 
                            : isPast
                              ? 'text-white'
                              : 'text-gray-600'
                        }
                      `}
                      style={day.completed || isToday || isPast ? { backgroundColor: '#ec4899' } : { backgroundColor: '#f9fafb' }}
                    >
                      {day.completed ? <Check className="h-5 w-5" /> : day.day}
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: '#ec4899' }}>
                        Day {day.day}
                        {isToday && !day.completed && (
                          <span className="ml-2 text-sm font-normal" style={{ color: '#ec4899' }}>Today</span>
                        )}
                        {isPast && !day.completed && (
                          <span className="ml-2 text-sm font-normal" style={{ color: '#ec4899' }}>Missed</span>
                        )}
                      </h3>
                      <p className="text-sm" style={{ color: '#ec4899' }}>{day.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="text-center">
                        <p className="font-semibold" style={{ color: '#ec4899' }}>{day.kanji}</p>
                        <p style={{ color: '#ec4899' }}>Kanji</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold" style={{ color: '#ec4899' }}>{day.vocabulary}</p>
                        <p style={{ color: '#ec4899' }}>Vocab</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold" style={{ color: '#ec4899' }}>{day.testQuestions}</p>
                        <p style={{ color: '#ec4899' }}>Tests</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end gap-2">
                      {(isToday || isFuture) && !day.completed && (
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <button
                            onClick={() => handleStartKanji(day)}
                            className="px-2 sm:px-3 py-1 text-white text-xs rounded-md transition-colors"
                            style={{ backgroundColor: '#ec4899' }}
                            title="Study Kanji"
                          >
                            <FileText className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleStartVocabulary(day)}
                            className="px-2 sm:px-3 py-1 text-white text-xs rounded-md transition-colors"
                            style={{ backgroundColor: '#ec4899' }}
                            title="Study Vocabulary"
                          >
                            <BookOpen className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleStartTraining(day)}
                            className="px-2 sm:px-3 py-1 text-white text-xs rounded-md transition-colors"
                            style={{ backgroundColor: '#ec4899' }}
                            title="Start Training"
                          >
                            <Zap className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                      
                      {day.completed && (
                        <div className="text-xs sm:text-sm font-medium" style={{ color: '#ec4899' }}>
                          ✓ Completed
                        </div>
                      )}
                      
                      {isPast && !day.completed && (
                        <div className="text-xs sm:text-sm font-medium" style={{ color: '#ec4899' }}>
                          Missed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
              })}
              
              {!showAllDays && studyPlan.schedule.length > 14 && (
                <div className="text-center py-4">
                  <button
                    onClick={() => setShowAllDays(true)}
                    className="px-4 py-2 text-pink-600 hover:text-pink-700 font-medium transition-colors"
                  >
                    Show all {studyPlan.schedule.length} days
                  </button>
                </div>
              )}
              
              {showAllDays && (
                <div className="text-center py-4">
                  <button
                    onClick={() => setShowAllDays(false)}
                    className="px-4 py-2 text-pink-600 hover:text-pink-700 font-medium transition-colors"
                  >
                    Show less
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
