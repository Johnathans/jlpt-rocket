'use client';

import { useState, useEffect } from 'react';
import { BookOpen, FileText, MessageSquare, Flame, TrendingUp, Target, ChevronRight, Play, RotateCcw, CheckCircle } from 'lucide-react';
import { useJLPTLevel } from '@/contexts/JLPTLevelContext';
import { getContentCounts } from '@/lib/supabase-data';
import { StreakSystem } from '@/lib/streakSystem';
import { ReviewSystem } from '@/lib/reviewSystem';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ProgressStats {
  kanji: { total: number; mastered: number; learning: number };
  vocabulary: { total: number; mastered: number; learning: number };
  sentences: { total: number; mastered: number; learning: number };
  reviewDue: number;
}

export default function RoadmapPage() {
  const { currentLevel } = useJLPTLevel();
  const router = useRouter();
  const [stats, setStats] = useState<ProgressStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [streakData, setStreakData] = useState({ currentStreak: 0 });

  // Load progress stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        const counts = await getContentCounts();
        const reviewItems = ReviewSystem.getItemsDueForReview();
        
        // Get all progress data from localStorage
        const kanjiProgress = JSON.parse(localStorage.getItem('kanjiProgress') || '{}');
        const vocabProgress = JSON.parse(localStorage.getItem('vocabularyProgress') || '{}');
        const sentenceProgress = JSON.parse(localStorage.getItem('sentencesProgress') || '{}');
        
        const getMastered = (progress: any) => {
          return Object.values(progress).filter((p: any) => p.masteryLevel >= 100).length;
        };
        
        const getLearning = (progress: any) => {
          return Object.values(progress).filter((p: any) => p.masteryLevel > 0 && p.masteryLevel < 100).length;
        };
        
        setStats({
          kanji: {
            total: counts.kanji,
            mastered: getMastered(kanjiProgress),
            learning: getLearning(kanjiProgress)
          },
          vocabulary: {
            total: counts.vocabulary,
            mastered: getMastered(vocabProgress),
            learning: getLearning(vocabProgress)
          },
          sentences: {
            total: counts.sentences,
            mastered: getMastered(sentenceProgress),
            learning: getLearning(sentenceProgress)
          },
          reviewDue: reviewItems.length
        });
        
        // Load streak data
        const streak = StreakSystem.getStreakData();
        setStreakData({
          currentStreak: streak.currentStreak
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Learning Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            {currentLevel} · Track your progress and continue learning
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* JLPT Level Card */}
          <div className="bg-white rounded-lg border-2 border-pink-500 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Current Level</span>
              <Target className="h-5 w-5 text-pink-500" />
            </div>
            <div className="text-5xl font-black text-pink-600">{currentLevel}</div>
            <div className="text-sm text-gray-600 mt-1">studying now</div>
          </div>

          {/* Streak Card */}
          <div className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium opacity-90">Current Streak</span>
              <Flame className="h-5 w-5" />
            </div>
            <div className="text-4xl font-bold">{streakData.currentStreak}</div>
            <div className="text-sm opacity-90 mt-1">days in a row</div>
          </div>

          {/* Review Due Card */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Reviews Due</span>
              <RotateCcw className="h-5 w-5 text-pink-500" />
            </div>
            <div className="text-4xl font-bold text-gray-900">{stats?.reviewDue || 0}</div>
            <div className="text-sm text-gray-600 mt-1">items to review</div>
          </div>

          {/* Total Mastered */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Mastered</span>
              <CheckCircle className="h-5 w-5 text-pink-500" />
            </div>
            <div className="text-4xl font-bold text-gray-900">
              {(stats?.kanji.mastered || 0) + (stats?.vocabulary.mastered || 0) + (stats?.sentences.mastered || 0)}
            </div>
            <div className="text-sm text-gray-600 mt-1">total items</div>
          </div>

          {/* Total Learning */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Learning</span>
              <BookOpen className="h-5 w-5 text-pink-500" />
            </div>
            <div className="text-4xl font-bold text-gray-900">
              {(stats?.kanji.learning || 0) + (stats?.vocabulary.learning || 0) + (stats?.sentences.learning || 0)}
            </div>
            <div className="text-sm text-gray-600 mt-1">in progress</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Start</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Kanji */}
            <Link
              href="/kanji"
              className="group border-2 border-gray-200 rounded-lg p-6 hover:border-pink-300 hover:bg-pink-50 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <FileText className="h-8 w-8 text-pink-500" />
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Kanji</h3>
              <p className="text-sm text-gray-600 mb-3">
                {stats?.kanji.total || 0} total · {stats?.kanji.mastered || 0} mastered
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-orange-500 h-2 rounded-full transition-all"
                  style={{ width: `${stats?.kanji.total ? (stats.kanji.mastered / stats.kanji.total * 100) : 0}%` }}
                />
              </div>
            </Link>

            {/* Vocabulary */}
            <Link
              href="/vocabulary"
              className="group border-2 border-gray-200 rounded-lg p-6 hover:border-pink-300 hover:bg-pink-50 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <BookOpen className="h-8 w-8 text-pink-500" />
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Vocabulary</h3>
              <p className="text-sm text-gray-600 mb-3">
                {stats?.vocabulary.total || 0} total · {stats?.vocabulary.mastered || 0} mastered
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-orange-500 h-2 rounded-full transition-all"
                  style={{ width: `${stats?.vocabulary.total ? (stats.vocabulary.mastered / stats.vocabulary.total * 100) : 0}%` }}
                />
              </div>
            </Link>

            {/* Sentences */}
            <Link
              href="/sentences"
              className="group border-2 border-gray-200 rounded-lg p-6 hover:border-pink-300 hover:bg-pink-50 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <MessageSquare className="h-8 w-8 text-pink-500" />
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Sentences</h3>
              <p className="text-sm text-gray-600 mb-3">
                {stats?.sentences.total || 0} total · {stats?.sentences.mastered || 0} mastered
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-orange-500 h-2 rounded-full transition-all"
                  style={{ width: `${stats?.sentences.total ? (stats.sentences.mastered / stats.sentences.total * 100) : 0}%` }}
                />
              </div>
            </Link>
          </div>
        </div>

        {/* Review Section */}
        {stats && stats.reviewDue > 0 && (
          <div className="bg-gradient-to-r from-pink-50 to-orange-50 border-2 border-pink-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  You have {stats.reviewDue} items to review
                </h2>
                <p className="text-gray-600">
                  Keep your streak going by reviewing items you've learned
                </p>
              </div>
              <Link
                href="/review"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Play className="h-5 w-5" />
                Start Review
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
