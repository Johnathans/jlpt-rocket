'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, BookOpen, FileText, Target, ChevronRight, Check } from 'lucide-react';
import { useJLPTLevel } from '@/contexts/JLPTLevelContext';
import { getContentCounts } from '@/lib/supabase-data';

interface DailyPlan {
  day: number;
  date: string;
  kanji: number;
  vocabulary: number;
  testQuestions: number;
  completed: boolean;
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
  const [selectedDays, setSelectedDays] = useState(90);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [contentCounts, setContentCounts] = useState({ kanji: 0, vocabulary: 0, sentences: 0 });
  const [loading, setLoading] = useState(true);

  // Load content counts
  useEffect(() => {
    const loadContentCounts = async () => {
      try {
        const counts = await getContentCounts();
        setContentCounts(counts);
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
      
      schedule.push({
        day,
        date: currentDate.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        kanji: Math.min(dailyKanji, Math.max(0, targetKanji - (day - 1) * dailyKanji)),
        vocabulary: Math.min(dailyVocabulary, Math.max(0, targetVocabulary - (day - 1) * dailyVocabulary)),
        testQuestions: Math.min(dailyTestQuestions, Math.max(0, targetTestQuestions - (day - 1) * dailyTestQuestions)),
        completed: false
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading study plan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Study Roadmap
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Create your personalized study timeline for JLPT {currentLevel}
          </p>
          <p className="text-lg text-gray-500">
            Choose your timeline and get a day-by-day study plan
          </p>
        </div>

        {/* Timeline Selection */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Select Your Timeline
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {timelineOptions.map((option) => {
              const isSelected = selectedDays === option.days;
              
              return (
                <button
                  key={option.days}
                  onClick={() => setSelectedDays(option.days)}
                  className={`
                    p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105
                    ${isSelected 
                      ? 'bg-green-500 border-green-500 text-white shadow-lg' 
                      : 'bg-white border-gray-200 text-gray-700 hover:border-green-300 hover:shadow-md'
                    }
                  `}
                >
                  <div className="text-center">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3
                      ${isSelected ? 'bg-white/20' : 'bg-gray-100'}
                    `}>
                      <Clock className={`h-6 w-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <h3 className="text-lg font-bold mb-1">{option.label}</h3>
                    <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="flex justify-center mb-3">
                  <FileText className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Daily Kanji</h3>
                <p className="text-2xl font-bold text-gray-900">{studyPlan.dailyKanji}</p>
                <p className="text-sm text-gray-500">characters per day</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="flex justify-center mb-3">
                  <BookOpen className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Daily Vocabulary</h3>
                <p className="text-2xl font-bold text-gray-900">{studyPlan.dailyVocabulary}</p>
                <p className="text-sm text-gray-500">words per day</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="flex justify-center mb-3">
                  <Target className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Daily Practice</h3>
                <p className="text-2xl font-bold text-gray-900">{studyPlan.dailyTestQuestions}</p>
                <p className="text-sm text-gray-500">test questions per day</p>
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
              {studyPlan.schedule.slice(0, 14).map((day, index) => (
                <div
                  key={day.day}
                  className={`
                    flex items-center justify-between p-4 rounded-lg border transition-colors
                    ${day.completed 
                      ? 'bg-green-50 border-green-200' 
                      : index === 0 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }
                  `}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                      ${day.completed 
                        ? 'bg-green-500 text-white' 
                        : index === 0 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }
                    `}>
                      {day.completed ? <Check className="h-5 w-5" /> : day.day}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Day {day.day}
                        {index === 0 && !day.completed && (
                          <span className="ml-2 text-sm text-blue-600 font-normal">Today</span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500">{day.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">{day.kanji}</p>
                      <p className="text-gray-500">Kanji</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">{day.vocabulary}</p>
                      <p className="text-gray-500">Vocab</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">{day.testQuestions}</p>
                      <p className="text-gray-500">Tests</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
              
              {studyPlan.schedule.length > 14 && (
                <div className="text-center py-4">
                  <p className="text-gray-500">
                    ... and {studyPlan.schedule.length - 14} more days
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
