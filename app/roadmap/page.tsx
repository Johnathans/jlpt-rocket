'use client';

import { useState, useEffect } from 'react';
import { BookOpen, FileText, MessageSquare, Flame, TrendingUp, ChevronRight, Play, RotateCcw, CheckCircle, ArrowLeftRight, BookMarked, ClipboardCheck } from 'lucide-react';
import { useJLPTLevel } from '@/contexts/JLPTLevelContext';
import { getContentCounts } from '@/lib/supabase-data';
import { StreakSystem } from '@/lib/streakSystem';
import { ReviewSystem } from '@/lib/reviewSystem';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LevelSwitcherModal from '@/components/LevelSwitcherModal';
import { useAuth } from '@/lib/auth';

interface ProgressStats {
  kanji: { total: number; mastered: number; learning: number };
  vocabulary: { total: number; mastered: number; learning: number };
  sentences: { total: number; mastered: number; learning: number };
  reviewDue: number;
}

export default function RoadmapPage() {
  const { currentLevel } = useJLPTLevel();
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<ProgressStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [streakData, setStreakData] = useState({ currentStreak: 0 });
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'kanji' | 'vocabulary' | 'sentences' | 'stories' | 'tests'>('kanji');

  // Get user's first name
  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'there';
  const firstName = userName.split(' ')[0];

  // Load progress stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        const { getContentCountsByLevel } = await import('@/lib/supabase-data');
        const counts = await getContentCountsByLevel(currentLevel);
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
  }, [currentLevel]);

  // Listen for level switcher event from navbar
  useEffect(() => {
    const handleOpenLevelSwitcher = () => {
      setIsLevelModalOpen(true);
    };

    window.addEventListener('open-level-switcher', handleOpenLevelSwitcher);
    return () => window.removeEventListener('open-level-switcher', handleOpenLevelSwitcher);
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
            Welcome, {firstName}!
          </h1>
          <p className="text-lg text-gray-600">
            {currentLevel} · Track your progress and continue learning
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* JLPT Level Card - Clickable */}
          <button
            onClick={() => setIsLevelModalOpen(true)}
            className="bg-white rounded-lg border-2 border-pink-500 p-6 hover:border-pink-600 hover:shadow-md transition-all text-left w-full"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Current Level</span>
              <ArrowLeftRight className="h-5 w-5 text-pink-500" />
            </div>
            <div className="text-5xl font-black text-gray-900">{currentLevel}</div>
            <div className="text-sm text-gray-600 mt-1">click to change</div>
          </button>

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

          {/* Progress Card - Combined Mastered & Learning */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">Your Progress</span>
              <TrendingUp className="h-5 w-5 text-pink-500" />
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-500">Mastered</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {(stats?.kanji.mastered || 0) + (stats?.vocabulary.mastered || 0) + (stats?.sentences.mastered || 0)}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">Learning</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {(stats?.kanji.learning || 0) + (stats?.vocabulary.learning || 0) + (stats?.sentences.learning || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-8">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('kanji')}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'kanji'
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <FileText className="h-4 w-4" />
                Kanji
              </button>
              <button
                onClick={() => setActiveTab('vocabulary')}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'vocabulary'
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                Vocabulary
              </button>
              <button
                onClick={() => setActiveTab('sentences')}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'sentences'
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                Sentences
              </button>
              <button
                onClick={() => setActiveTab('stories')}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'stories'
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <BookMarked className="h-4 w-4" />
                Stories
              </button>
              <button
                onClick={() => setActiveTab('tests')}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'tests'
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <ClipboardCheck className="h-4 w-4" />
                Tests
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'kanji' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Kanji</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {stats?.kanji.total || 0} total · {stats?.kanji.mastered || 0} mastered · {stats?.kanji.learning || 0} learning
                    </p>
                  </div>
                  <Link
                    href="/kanji"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all"
                  >
                    Start Learning
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-orange-500 h-3 rounded-full transition-all"
                    style={{ width: `${stats?.kanji.total ? (stats.kanji.mastered / stats.kanji.total * 100) : 0}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Master essential kanji characters for {currentLevel}. Learn readings, meanings, and stroke order.
                </p>
              </div>
            )}

            {activeTab === 'vocabulary' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Vocabulary</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {stats?.vocabulary.total || 0} total · {stats?.vocabulary.mastered || 0} mastered · {stats?.vocabulary.learning || 0} learning
                    </p>
                  </div>
                  <Link
                    href="/vocabulary"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all"
                  >
                    Start Learning
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-orange-500 h-3 rounded-full transition-all"
                    style={{ width: `${stats?.vocabulary.total ? (stats.vocabulary.mastered / stats.vocabulary.total * 100) : 0}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Build your vocabulary with essential words and phrases for {currentLevel}.
                </p>
              </div>
            )}

            {activeTab === 'sentences' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Sentences</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {stats?.sentences.total || 0} total · {stats?.sentences.mastered || 0} mastered · {stats?.sentences.learning || 0} learning
                    </p>
                  </div>
                  <Link
                    href="/sentences"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all"
                  >
                    Start Learning
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-orange-500 h-3 rounded-full transition-all"
                    style={{ width: `${stats?.sentences.total ? (stats.sentences.mastered / stats.sentences.total * 100) : 0}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Practice reading and understanding complete sentences in context.
                </p>
              </div>
            )}

            {activeTab === 'stories' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Stories</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Immersive reading practice with engaging stories
                    </p>
                  </div>
                  <Link
                    href="/stories"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all"
                  >
                    Read Stories
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <p className="text-sm text-gray-600">
                  Improve your reading comprehension with level-appropriate stories that use vocabulary and grammar you've learned.
                </p>
              </div>
            )}

            {activeTab === 'tests' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Tests</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Practice exams and quizzes
                    </p>
                  </div>
                  <Link
                    href="/test"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all"
                  >
                    Take a Test
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <p className="text-sm text-gray-600">
                  Test your knowledge with practice exams that simulate the real JLPT experience.
                </p>
              </div>
            )}
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

      {/* Level Switcher Modal */}
      <LevelSwitcherModal 
        isOpen={isLevelModalOpen} 
        onClose={() => setIsLevelModalOpen(false)} 
      />
    </div>
  );
}
