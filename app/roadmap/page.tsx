'use client';

import { useState, useEffect, useCallback } from 'react';
import { BookOpen, FileText, MessageSquare, Flame, TrendingUp, ChevronRight, Play, RotateCcw, CheckCircle, ArrowLeftRight, BookMarked, ClipboardCheck, Volume2, Brush, GraduationCap, Lock } from 'lucide-react';
import { useJLPTLevel } from '@/contexts/JLPTLevelContext';
import { getContentCounts, getKanjiByLevel, getVocabularyByLevel, getSentencesByLevel } from '@/lib/supabase-data';
import { StreakSystem } from '@/lib/streakSystem';
import { ReviewSystemSupabase } from '@/lib/reviewSystemSupabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LevelSwitcherModal from '@/components/LevelSwitcherModal';
import TrainingModeModal from '@/components/TrainingModeModal';
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
  const [activeTab, setActiveTab] = useState<'hiragana' | 'katakana' | 'kanji' | 'vocabulary' | 'sentences' | 'stories'>('kanji');
  const [kanjiData, setKanjiData] = useState<any[]>([]);
  const [vocabularyData, setVocabularyData] = useState<any[]>([]);
  const [sentencesData, setSentencesData] = useState<any[]>([]);
  const [contentLoading, setContentLoading] = useState(false);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [trainingType, setTrainingType] = useState<'kanji' | 'vocabulary'>('kanji');
  const [selectedKanji, setSelectedKanji] = useState<Set<string>>(new Set());
  const [selectedVocabulary, setSelectedVocabulary] = useState<Set<string>>(new Set());
  const [selectionMode, setSelectionMode] = useState(false);

  // Get user's first name
  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'there';
  const firstName = userName.split(' ')[0];

  // Helper functions for selection (optimized with useCallback)
  const toggleKanjiSelection = useCallback((id: string) => {
    setSelectedKanji(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  }, []);

  const toggleVocabularySelection = useCallback((id: string) => {
    setSelectedVocabulary(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  }, []);

  const handleStartTraining = (type: 'kanji' | 'vocabulary') => {
    setTrainingType(type);
    
    // If in selection mode and items are selected, use selected items
    // Otherwise, select all items automatically
    if (type === 'kanji' && selectedKanji.size === 0) {
      setSelectedKanji(new Set(kanjiData.map(k => k.id)));
    } else if (type === 'vocabulary' && selectedVocabulary.size === 0) {
      setSelectedVocabulary(new Set(vocabularyData.map(v => v.id)));
    }
    
    setShowTrainingModal(true);
  };

  const handleSelectMode = (type: 'kanji' | 'vocabulary') => {
    setTrainingType(type);
    setSelectionMode(true);
  };

  const getSelectedData = () => {
    if (trainingType === 'kanji') {
      return kanjiData.filter(k => selectedKanji.has(k.id));
    } else {
      return vocabularyData.filter(v => selectedVocabulary.has(v.id));
    }
  };

  const getSelectedItems = () => {
    if (trainingType === 'kanji') {
      return Array.from(selectedKanji);
    } else {
      return Array.from(selectedVocabulary);
    }
  };

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
          setKanjiData(data); // Show all kanji
        } else if (activeTab === 'vocabulary') {
          const data = await getVocabularyByLevel(currentLevel);
          setVocabularyData(data); // Show all vocabulary
        } else if (activeTab === 'sentences') {
          const data = await getSentencesByLevel(currentLevel);
          setSentencesData(data); // Show all sentences
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-8">
          {/* Tab Headers */}
          <div className="flex gap-2 p-2 overflow-x-auto">
            {currentLevel === 'N5' && (
              <>
                <button
                  onClick={() => setActiveTab('hiragana')}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded transition-all whitespace-nowrap ${
                    activeTab === 'hiragana'
                      ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Hiragana
                </button>
                <button
                  onClick={() => setActiveTab('katakana')}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded transition-all whitespace-nowrap ${
                    activeTab === 'katakana'
                      ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Katakana
                </button>
              </>
            )}
            <button
              onClick={() => setActiveTab('kanji')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded transition-all whitespace-nowrap ${
                activeTab === 'kanji'
                  ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <FileText className="h-4 w-4" />
              Kanji
            </button>
            <button
              onClick={() => setActiveTab('vocabulary')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded transition-all whitespace-nowrap ${
                activeTab === 'vocabulary'
                  ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Vocabulary
            </button>
            <button
              onClick={() => setActiveTab('sentences')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded transition-all whitespace-nowrap ${
                activeTab === 'sentences'
                  ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              Sentences
            </button>
            {/* Stories tab hidden for now */}
            {/* <button
              onClick={() => setActiveTab('stories')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded transition-all whitespace-nowrap ${
                activeTab === 'stories'
                  ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <BookMarked className="h-4 w-4" />
              Stories
            </button> */}
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700"></div>
          
          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'hiragana' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Hiragana</h3>
                  <Link
                    href="/typing?type=hiragana"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all text-sm"
                  >
                    Start Practice
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
                  {[
                    // Basic vowels
                    { char: 'あ', romaji: 'a' }, { char: 'い', romaji: 'i' }, { char: 'う', romaji: 'u' }, { char: 'え', romaji: 'e' }, { char: 'お', romaji: 'o' },
                    // K row
                    { char: 'か', romaji: 'ka' }, { char: 'き', romaji: 'ki' }, { char: 'く', romaji: 'ku' }, { char: 'け', romaji: 'ke' }, { char: 'こ', romaji: 'ko' },
                    // G row (dakuten)
                    { char: 'が', romaji: 'ga' }, { char: 'ぎ', romaji: 'gi' }, { char: 'ぐ', romaji: 'gu' }, { char: 'げ', romaji: 'ge' }, { char: 'ご', romaji: 'go' },
                    // S row
                    { char: 'さ', romaji: 'sa' }, { char: 'し', romaji: 'shi' }, { char: 'す', romaji: 'su' }, { char: 'せ', romaji: 'se' }, { char: 'そ', romaji: 'so' },
                    // Z row (dakuten)
                    { char: 'ざ', romaji: 'za' }, { char: 'じ', romaji: 'ji' }, { char: 'ず', romaji: 'zu' }, { char: 'ぜ', romaji: 'ze' }, { char: 'ぞ', romaji: 'zo' },
                    // T row
                    { char: 'た', romaji: 'ta' }, { char: 'ち', romaji: 'chi' }, { char: 'つ', romaji: 'tsu' }, { char: 'て', romaji: 'te' }, { char: 'と', romaji: 'to' },
                    // D row (dakuten)
                    { char: 'だ', romaji: 'da' }, { char: 'ぢ', romaji: 'ji' }, { char: 'づ', romaji: 'zu' }, { char: 'で', romaji: 'de' }, { char: 'ど', romaji: 'do' },
                    // N row
                    { char: 'な', romaji: 'na' }, { char: 'に', romaji: 'ni' }, { char: 'ぬ', romaji: 'nu' }, { char: 'ね', romaji: 'ne' }, { char: 'の', romaji: 'no' },
                    // H row
                    { char: 'は', romaji: 'ha' }, { char: 'ひ', romaji: 'hi' }, { char: 'ふ', romaji: 'fu' }, { char: 'へ', romaji: 'he' }, { char: 'ほ', romaji: 'ho' },
                    // B row (dakuten)
                    { char: 'ば', romaji: 'ba' }, { char: 'び', romaji: 'bi' }, { char: 'ぶ', romaji: 'bu' }, { char: 'べ', romaji: 'be' }, { char: 'ぼ', romaji: 'bo' },
                    // P row (handakuten)
                    { char: 'ぱ', romaji: 'pa' }, { char: 'ぴ', romaji: 'pi' }, { char: 'ぷ', romaji: 'pu' }, { char: 'ぺ', romaji: 'pe' }, { char: 'ぽ', romaji: 'po' },
                    // M row
                    { char: 'ま', romaji: 'ma' }, { char: 'み', romaji: 'mi' }, { char: 'む', romaji: 'mu' }, { char: 'め', romaji: 'me' }, { char: 'も', romaji: 'mo' },
                    // Y row
                    { char: 'や', romaji: 'ya' }, { char: 'ゆ', romaji: 'yu' }, { char: 'よ', romaji: 'yo' },
                    // R row
                    { char: 'ら', romaji: 'ra' }, { char: 'り', romaji: 'ri' }, { char: 'る', romaji: 'ru' }, { char: 'れ', romaji: 're' }, { char: 'ろ', romaji: 'ro' },
                    // W row
                    { char: 'わ', romaji: 'wa' }, { char: 'を', romaji: 'wo' }, { char: 'ん', romaji: 'n' },
                    // Combination sounds (きゃ, きゅ, きょ, etc.)
                    { char: 'きゃ', romaji: 'kya' }, { char: 'きゅ', romaji: 'kyu' }, { char: 'きょ', romaji: 'kyo' },
                    { char: 'ぎゃ', romaji: 'gya' }, { char: 'ぎゅ', romaji: 'gyu' }, { char: 'ぎょ', romaji: 'gyo' },
                    { char: 'しゃ', romaji: 'sha' }, { char: 'しゅ', romaji: 'shu' }, { char: 'しょ', romaji: 'sho' },
                    { char: 'じゃ', romaji: 'ja' }, { char: 'じゅ', romaji: 'ju' }, { char: 'じょ', romaji: 'jo' },
                    { char: 'ちゃ', romaji: 'cha' }, { char: 'ちゅ', romaji: 'chu' }, { char: 'ちょ', romaji: 'cho' },
                    { char: 'にゃ', romaji: 'nya' }, { char: 'にゅ', romaji: 'nyu' }, { char: 'にょ', romaji: 'nyo' },
                    { char: 'ひゃ', romaji: 'hya' }, { char: 'ひゅ', romaji: 'hyu' }, { char: 'ひょ', romaji: 'hyo' },
                    { char: 'びゃ', romaji: 'bya' }, { char: 'びゅ', romaji: 'byu' }, { char: 'びょ', romaji: 'byo' },
                    { char: 'ぴゃ', romaji: 'pya' }, { char: 'ぴゅ', romaji: 'pyu' }, { char: 'ぴょ', romaji: 'pyo' },
                    { char: 'みゃ', romaji: 'mya' }, { char: 'みゅ', romaji: 'myu' }, { char: 'みょ', romaji: 'myo' },
                    { char: 'りゃ', romaji: 'rya' }, { char: 'りゅ', romaji: 'ryu' }, { char: 'りょ', romaji: 'ryo' }
                  ].map((item, idx) => (
                    <Link
                      key={idx}
                      href="/typing?type=hiragana"
                      className="relative bg-white rounded-lg border border-gray-200 border-b-4 border-b-gray-300 hover:border-pink-200 hover:border-b-pink-400 hover:shadow-md transition-all duration-200 p-3 text-center group overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
                      <div className="relative">
                        <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors font-japanese">
                          {item.char}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.romaji}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'katakana' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Katakana</h3>
                  <Link
                    href="/typing?type=katakana"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all text-sm"
                  >
                    Start Practice
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
                  {[
                    // Basic vowels
                    { char: 'ア', romaji: 'a' }, { char: 'イ', romaji: 'i' }, { char: 'ウ', romaji: 'u' }, { char: 'エ', romaji: 'e' }, { char: 'オ', romaji: 'o' },
                    // K row
                    { char: 'カ', romaji: 'ka' }, { char: 'キ', romaji: 'ki' }, { char: 'ク', romaji: 'ku' }, { char: 'ケ', romaji: 'ke' }, { char: 'コ', romaji: 'ko' },
                    // G row (dakuten)
                    { char: 'ガ', romaji: 'ga' }, { char: 'ギ', romaji: 'gi' }, { char: 'グ', romaji: 'gu' }, { char: 'ゲ', romaji: 'ge' }, { char: 'ゴ', romaji: 'go' },
                    // S row
                    { char: 'サ', romaji: 'sa' }, { char: 'シ', romaji: 'shi' }, { char: 'ス', romaji: 'su' }, { char: 'セ', romaji: 'se' }, { char: 'ソ', romaji: 'so' },
                    // Z row (dakuten)
                    { char: 'ザ', romaji: 'za' }, { char: 'ジ', romaji: 'ji' }, { char: 'ズ', romaji: 'zu' }, { char: 'ゼ', romaji: 'ze' }, { char: 'ゾ', romaji: 'zo' },
                    // T row
                    { char: 'タ', romaji: 'ta' }, { char: 'チ', romaji: 'chi' }, { char: 'ツ', romaji: 'tsu' }, { char: 'テ', romaji: 'te' }, { char: 'ト', romaji: 'to' },
                    // D row (dakuten)
                    { char: 'ダ', romaji: 'da' }, { char: 'ヂ', romaji: 'ji' }, { char: 'ヅ', romaji: 'zu' }, { char: 'デ', romaji: 'de' }, { char: 'ド', romaji: 'do' },
                    // N row
                    { char: 'ナ', romaji: 'na' }, { char: 'ニ', romaji: 'ni' }, { char: 'ヌ', romaji: 'nu' }, { char: 'ネ', romaji: 'ne' }, { char: 'ノ', romaji: 'no' },
                    // H row
                    { char: 'ハ', romaji: 'ha' }, { char: 'ヒ', romaji: 'hi' }, { char: 'フ', romaji: 'fu' }, { char: 'ヘ', romaji: 'he' }, { char: 'ホ', romaji: 'ho' },
                    // B row (dakuten)
                    { char: 'バ', romaji: 'ba' }, { char: 'ビ', romaji: 'bi' }, { char: 'ブ', romaji: 'bu' }, { char: 'ベ', romaji: 'be' }, { char: 'ボ', romaji: 'bo' },
                    // P row (handakuten)
                    { char: 'パ', romaji: 'pa' }, { char: 'ピ', romaji: 'pi' }, { char: 'プ', romaji: 'pu' }, { char: 'ペ', romaji: 'pe' }, { char: 'ポ', romaji: 'po' },
                    // M row
                    { char: 'マ', romaji: 'ma' }, { char: 'ミ', romaji: 'mi' }, { char: 'ム', romaji: 'mu' }, { char: 'メ', romaji: 'me' }, { char: 'モ', romaji: 'mo' },
                    // Y row
                    { char: 'ヤ', romaji: 'ya' }, { char: 'ユ', romaji: 'yu' }, { char: 'ヨ', romaji: 'yo' },
                    // R row
                    { char: 'ラ', romaji: 'ra' }, { char: 'リ', romaji: 'ri' }, { char: 'ル', romaji: 'ru' }, { char: 'レ', romaji: 're' }, { char: 'ロ', romaji: 'ro' },
                    // W row
                    { char: 'ワ', romaji: 'wa' }, { char: 'ヲ', romaji: 'wo' }, { char: 'ン', romaji: 'n' },
                    // Combination sounds
                    { char: 'キャ', romaji: 'kya' }, { char: 'キュ', romaji: 'kyu' }, { char: 'キョ', romaji: 'kyo' },
                    { char: 'ギャ', romaji: 'gya' }, { char: 'ギュ', romaji: 'gyu' }, { char: 'ギョ', romaji: 'gyo' },
                    { char: 'シャ', romaji: 'sha' }, { char: 'シュ', romaji: 'shu' }, { char: 'ショ', romaji: 'sho' },
                    { char: 'ジャ', romaji: 'ja' }, { char: 'ジュ', romaji: 'ju' }, { char: 'ジョ', romaji: 'jo' },
                    { char: 'チャ', romaji: 'cha' }, { char: 'チュ', romaji: 'chu' }, { char: 'チョ', romaji: 'cho' },
                    { char: 'ニャ', romaji: 'nya' }, { char: 'ニュ', romaji: 'nyu' }, { char: 'ニョ', romaji: 'nyo' },
                    { char: 'ヒャ', romaji: 'hya' }, { char: 'ヒュ', romaji: 'hyu' }, { char: 'ヒョ', romaji: 'hyo' },
                    { char: 'ビャ', romaji: 'bya' }, { char: 'ビュ', romaji: 'byu' }, { char: 'ビョ', romaji: 'byo' },
                    { char: 'ピャ', romaji: 'pya' }, { char: 'ピュ', romaji: 'pyu' }, { char: 'ピョ', romaji: 'pyo' },
                    { char: 'ミャ', romaji: 'mya' }, { char: 'ミュ', romaji: 'myu' }, { char: 'ミョ', romaji: 'myo' },
                    { char: 'リャ', romaji: 'rya' }, { char: 'リュ', romaji: 'ryu' }, { char: 'リョ', romaji: 'ryo' }
                  ].map((item, idx) => (
                    <Link
                      key={idx}
                      href="/typing?type=katakana"
                      className="relative bg-white rounded-lg border border-gray-200 border-b-4 border-b-gray-300 hover:border-pink-200 hover:border-b-pink-400 hover:shadow-md transition-all duration-200 p-3 text-center group overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
                      <div className="relative">
                        <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors font-japanese">
                          {item.char}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.romaji}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'kanji' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Kanji Preview</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSelectMode('kanji')}
                      className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-pink-500 text-pink-600 hover:bg-pink-50 font-medium rounded-lg transition-all text-sm"
                    >
                      Select Items to Study
                    </button>
                    <button
                      onClick={() => handleStartTraining('kanji')}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all text-sm"
                    >
                      Start Practice
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {contentLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                    {kanjiData.map((item: any) => (
                      selectionMode ? (
                        <button
                          key={item.id}
                          onClick={() => toggleKanjiSelection(item.id)}
                          className={`relative rounded-lg border border-gray-200 border-b-4 p-3 text-center ${
                            selectedKanji.has(item.id)
                              ? 'bg-pink-50 border-pink-300 border-b-pink-500'
                              : 'bg-white border-b-gray-300'
                          }`}
                        >
                          {selectedKanji.has(item.id) && (
                            <div className="absolute top-1 right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">✓</span>
                            </div>
                          )}
                          <div className="text-4xl font-bold text-gray-900 mb-1 font-japanese">
                            {item.character}
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-1">
                            {item.meaning}
                          </div>
                        </button>
                      ) : (
                        <Link
                          key={item.id}
                          href="/kanji"
                          className="relative bg-white rounded-lg border border-gray-200 border-b-4 border-b-gray-300 hover:border-pink-200 hover:border-b-pink-400 hover:shadow-md transition-all duration-200 p-3 text-center group overflow-hidden"
                        >
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
                      )
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'vocabulary' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Vocabulary Preview</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSelectMode('vocabulary')}
                      className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-pink-500 text-pink-600 hover:bg-pink-50 font-medium rounded-lg transition-all text-sm"
                    >
                      Select Items to Study
                    </button>
                    <button
                      onClick={() => handleStartTraining('vocabulary')}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all text-sm"
                    >
                      Start Practice
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {contentLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {vocabularyData.map((item: any) => (
                      selectionMode ? (
                        <button
                          key={item.id}
                          onClick={() => toggleVocabularySelection(item.id)}
                          className={`flex items-center justify-between p-4 border-2 rounded-lg w-full text-left relative ${
                            selectedVocabulary.has(item.id)
                              ? 'bg-pink-50 border-pink-300'
                              : 'bg-white border-gray-200'
                          }`}
                        >
                          {selectedVocabulary.has(item.id) && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">✓</span>
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-2xl font-bold text-black font-japanese">{item.word}</span>
                              <span className="text-sm text-gray-600 dark:text-gray-300">{item.reading}</span>
                            </div>
                            <p className="text-sm text-gray-700">{item.meaning}</p>
                          </div>
                        </button>
                      ) : (
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
                      )
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
                    Start Practice
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

      {/* Training Mode Modal */}
      <TrainingModeModal
        isOpen={showTrainingModal}
        onClose={() => {
          setShowTrainingModal(false);
          setSelectionMode(false);
        }}
        selectedItems={getSelectedItems()}
        itemType={trainingType}
        selectedData={getSelectedData()}
      />
    </div>
  );
}
