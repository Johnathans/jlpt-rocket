'use client';

import { useState, useEffect } from 'react';
import { BookOpen, FileText, MessageSquare, Flame, TrendingUp, ChevronRight, Play, RotateCcw, CheckCircle, ArrowLeftRight, BookMarked, ClipboardCheck, Volume2, Brush, GraduationCap, Lock } from 'lucide-react';
import { useJLPTLevel } from '@/contexts/JLPTLevelContext';
import { getContentCounts, getKanjiByLevel, getVocabularyByLevel, getSentencesByLevel } from '@/lib/supabase-data';
import { StreakSystem } from '@/lib/streakSystem';
import { ReviewSystemSupabase } from '@/lib/reviewSystemSupabase';
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
  const [activeTab, setActiveTab] = useState<'lessons' | 'kanji' | 'vocabulary' | 'sentences' | 'stories' | 'tests'>('lessons');
  const [kanjiData, setKanjiData] = useState<any[]>([]);
  const [vocabularyData, setVocabularyData] = useState<any[]>([]);
  const [sentencesData, setSentencesData] = useState<any[]>([]);
  const [contentLoading, setContentLoading] = useState(false);

  // Get user's first name
  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'there';
  const firstName = userName.split(' ')[0];

  // Load progress stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        const { getContentCountsByLevel } = await import('@/lib/supabase-data');
        const counts = await getContentCountsByLevel(currentLevel);
        const reviewItems = await ReviewSystemSupabase.getItemsDueForReview();
        
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

  // Load content data when tab changes
  useEffect(() => {
    const loadContent = async () => {
      setContentLoading(true);
      try {
        if (activeTab === 'kanji') {
          const data = await getKanjiByLevel(currentLevel);
          setKanjiData(data.slice(0, 40)); // Show first 40
        } else if (activeTab === 'vocabulary') {
          const data = await getVocabularyByLevel(currentLevel);
          setVocabularyData(data.slice(0, 20)); // Show first 20
        } else if (activeTab === 'sentences') {
          const data = await getSentencesByLevel(currentLevel);
          setSentencesData(data.slice(0, 15)); // Show first 15
        }
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setContentLoading(false);
      }
    };

    loadContent();
  }, [activeTab, currentLevel]);

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome, {firstName}!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {currentLevel} · Track your progress and continue learning
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* JLPT Level Card - Clickable */}
          <button
            onClick={() => setIsLevelModalOpen(true)}
            className="bg-white dark:bg-gray-800 dark:bg-gray-800 rounded-lg border-2 border-pink-500 dark:border-pink-400 p-6 hover:border-pink-600 dark:hover:border-pink-500 hover:shadow-md transition-all text-left w-full"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Level</h3>
              <ArrowLeftRight className="h-5 w-5 text-pink-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{currentLevel}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">click to change</p>
          </button>

          {/* Streak Card */}
          <div className="bg-gradient-to-r from-pink-500 to-orange-500 dark:from-pink-400 dark:to-orange-400 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium opacity-90">Current Streak</span>
              <Flame className="h-5 w-5" />
            </div>
            <div className="text-4xl font-bold">{streakData.currentStreak}</div>
            <div className="text-sm opacity-90 mt-1">days in a row</div>
          </div>

          {/* Review Due Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Reviews Due</span>
              <RotateCcw className="h-5 w-5 text-pink-500" />
            </div>
            <div className="text-4xl font-bold text-gray-900 dark:text-white">{stats?.reviewDue || 0}</div>
            <div className="text-sm text-gray-600 mt-1">items to review</div>
          </div>

          {/* Progress Card - Combined Mastered & Learning */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Your Progress</span>
              <TrendingUp className="h-5 w-5 text-pink-500" />
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-500">Mastered</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(stats?.kanji.mastered || 0) + (stats?.vocabulary.mastered || 0) + (stats?.sentences.mastered || 0)}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">Learning</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(stats?.kanji.learning || 0) + (stats?.vocabulary.learning || 0) + (stats?.sentences.learning || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 mb-8">
          {/* Tab Headers */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('lessons')}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'lessons'
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                N5 Lessons
              </button>
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
            {activeTab === 'lessons' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">N5 Lessons</h3>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {/* Lesson 1 - Unlocked */}
                  <Link href="/lessons/1" className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 border-b-4 border-b-gray-300 hover:border-pink-200 hover:border-b-pink-500 transition-all cursor-pointer p-4 text-center">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">1</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Self-Introduction</div>
                    <div className="text-xs text-gray-500">5 Kanji · 20 Vocab</div>
                  </Link>

                  {/* Lesson 2 - Locked */}
                  <div className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 border-b-4 border-b-gray-300 p-4 text-center">
                    <Lock className="h-4 w-4 text-gray-400 absolute top-2 right-2" />
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">2</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Time & Schedule</div>
                    <div className="text-xs text-gray-500">12 Kanji · 25 Vocab</div>
                  </div>

                  {/* Lesson 3 - Locked */}
                  <div className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 border-b-4 border-b-gray-300 p-4 text-center">
                    <Lock className="h-4 w-4 text-gray-400 absolute top-2 right-2" />
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">3</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Daily Actions</div>
                    <div className="text-xs text-gray-500">7 Kanji · 20 Vocab</div>
                  </div>

                  {/* Lesson 4 - Locked */}
                  <div className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 border-b-4 border-b-gray-300 p-4 text-center">
                    <Lock className="h-4 w-4 text-gray-400 absolute top-2 right-2" />
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">4</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Family & People</div>
                    <div className="text-xs text-gray-500">8 Kanji · 25 Vocab</div>
                  </div>

                  {/* Lesson 5 - Locked */}
                  <div className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 border-b-4 border-b-gray-300 p-4 text-center">
                    <Lock className="h-4 w-4 text-gray-400 absolute top-2 right-2" />
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">5</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Places & Directions</div>
                    <div className="text-xs text-gray-500">10 Kanji · 30 Vocab</div>
                  </div>

                  {/* Lesson 6 - Locked */}
                  <div className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 border-b-4 border-b-gray-300 p-4 text-center">
                    <Lock className="h-4 w-4 text-gray-400 absolute top-2 right-2" />
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">6</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Shopping</div>
                    <div className="text-xs text-gray-500">6 Kanji · 25 Vocab</div>
                  </div>

                  {/* Coming Soon */}
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 p-4 text-center flex flex-col items-center justify-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400">+14 more</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'kanji' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Kanji Preview</h3>
                  <Link
                    href="/kanji"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all text-sm"
                  >
                    View All ({stats?.kanji.total || 0})
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                {contentLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                    {kanjiData.map((item: any) => (
                      <Link
                        key={item.id}
                        href="/kanji"
                        className="relative bg-white rounded-lg border border-gray-200 border-b-4 border-b-gray-300 hover:border-pink-200 hover:border-b-pink-400 hover:shadow-md transition-all duration-200 p-3 text-center group overflow-hidden"
                      >
                        {/* Subtle gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
                        
                        <div className="relative">
                          <div className="text-4xl font-bold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors font-japanese">
                            {item.character}
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-1">
                            {item.meaning}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'vocabulary' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Vocabulary Preview</h3>
                  <Link
                    href="/vocabulary"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all text-sm"
                  >
                    View All ({stats?.vocabulary.total || 0})
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                {contentLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {vocabularyData.map((item: any) => (
                      <Link
                        key={item.id}
                        href="/vocabulary"
                        className="flex items-center justify-between p-4 bg-white border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 rounded-lg transition-all group"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-2xl font-bold text-black font-japanese">{item.word}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{item.reading}</span>
                          </div>
                          <p className="text-sm text-gray-700">{item.meaning}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-pink-500" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'sentences' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sentences Preview</h3>
                  <Link
                    href="/sentences"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all text-sm"
                  >
                    View All ({stats?.sentences.total || 0})
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                {contentLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sentencesData.map((item: any) => (
                      <Link
                        key={item.id}
                        href="/sentences"
                        className="block p-4 bg-white border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 rounded-lg transition-all group"
                      >
                        <div className="text-xl font-japanese text-black mb-2">{item.japanese}</div>
                        <p className="text-sm text-gray-700">{item.english}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'stories' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Stories</h3>
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
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Improve your reading comprehension with level-appropriate stories that use vocabulary and grammar you've learned.
                </p>
              </div>
            )}

            {activeTab === 'tests' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Tests</h3>
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
                <p className="text-sm text-gray-600 dark:text-gray-300">
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
                <p className="text-gray-600 dark:text-gray-300">
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
