'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { BookOpen, FileText, MessageSquare, Flame, ChevronRight, Play, RotateCcw, CheckCircle, ArrowLeftRight, BookMarked, ClipboardCheck, Volume2, Brush, GraduationCap, Lock, Star } from 'lucide-react';
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
  const [selectedHiragana, setSelectedHiragana] = useState<Set<string>>(new Set());
  const [selectedKatakana, setSelectedKatakana] = useState<Set<string>>(new Set());
  const [knownKatakana, setKnownKatakana] = useState<Set<string>>(new Set());
  const [knownHiragana, setKnownHiragana] = useState<Set<string>>(new Set());
  const [knownKanji, setKnownKanji] = useState<Set<string>>(new Set());
  const [knownVocabulary, setKnownVocabulary] = useState<Set<string>>(new Set());
  const [selectionMode, setSelectionMode] = useState(false);
  const [markKnownMode, setMarkKnownMode] = useState(false);

  // Get user's first name
  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'there';
  const firstName = userName.split(' ')[0];

  // Define hiragana and katakana data
  const hiraganaData = [
    { char: 'あ', romaji: 'a' }, { char: 'い', romaji: 'i' }, { char: 'う', romaji: 'u' }, { char: 'え', romaji: 'e' }, { char: 'お', romaji: 'o' },
    { char: 'か', romaji: 'ka' }, { char: 'き', romaji: 'ki' }, { char: 'く', romaji: 'ku' }, { char: 'け', romaji: 'ke' }, { char: 'こ', romaji: 'ko' },
    { char: 'が', romaji: 'ga' }, { char: 'ぎ', romaji: 'gi' }, { char: 'ぐ', romaji: 'gu' }, { char: 'げ', romaji: 'ge' }, { char: 'ご', romaji: 'go' },
    { char: 'さ', romaji: 'sa' }, { char: 'し', romaji: 'shi' }, { char: 'す', romaji: 'su' }, { char: 'せ', romaji: 'se' }, { char: 'そ', romaji: 'so' },
    { char: 'ざ', romaji: 'za' }, { char: 'じ', romaji: 'ji' }, { char: 'ず', romaji: 'zu' }, { char: 'ぜ', romaji: 'ze' }, { char: 'ぞ', romaji: 'zo' },
    { char: 'た', romaji: 'ta' }, { char: 'ち', romaji: 'chi' }, { char: 'つ', romaji: 'tsu' }, { char: 'て', romaji: 'te' }, { char: 'と', romaji: 'to' },
    { char: 'だ', romaji: 'da' }, { char: 'ぢ', romaji: 'ji' }, { char: 'づ', romaji: 'zu' }, { char: 'で', romaji: 'de' }, { char: 'ど', romaji: 'do' },
    { char: 'な', romaji: 'na' }, { char: 'に', romaji: 'ni' }, { char: 'ぬ', romaji: 'nu' }, { char: 'ね', romaji: 'ne' }, { char: 'の', romaji: 'no' },
    { char: 'は', romaji: 'ha' }, { char: 'ひ', romaji: 'hi' }, { char: 'ふ', romaji: 'fu' }, { char: 'へ', romaji: 'he' }, { char: 'ほ', romaji: 'ho' },
    { char: 'ば', romaji: 'ba' }, { char: 'び', romaji: 'bi' }, { char: 'ぶ', romaji: 'bu' }, { char: 'べ', romaji: 'be' }, { char: 'ぼ', romaji: 'bo' },
    { char: 'ぱ', romaji: 'pa' }, { char: 'ぴ', romaji: 'pi' }, { char: 'ぷ', romaji: 'pu' }, { char: 'ぺ', romaji: 'pe' }, { char: 'ぽ', romaji: 'po' },
    { char: 'ま', romaji: 'ma' }, { char: 'み', romaji: 'mi' }, { char: 'む', romaji: 'mu' }, { char: 'め', romaji: 'me' }, { char: 'も', romaji: 'mo' },
    { char: 'や', romaji: 'ya' }, { char: 'ゆ', romaji: 'yu' }, { char: 'よ', romaji: 'yo' },
    { char: 'ら', romaji: 'ra' }, { char: 'り', romaji: 'ri' }, { char: 'る', romaji: 'ru' }, { char: 'れ', romaji: 're' }, { char: 'ろ', romaji: 'ro' },
    { char: 'わ', romaji: 'wa' }, { char: 'を', romaji: 'wo' }, { char: 'ん', romaji: 'n' },
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
  ];

  const katakanaData = [
    { char: 'ア', romaji: 'a' }, { char: 'イ', romaji: 'i' }, { char: 'ウ', romaji: 'u' }, { char: 'エ', romaji: 'e' }, { char: 'オ', romaji: 'o' },
    { char: 'カ', romaji: 'ka' }, { char: 'キ', romaji: 'ki' }, { char: 'ク', romaji: 'ku' }, { char: 'ケ', romaji: 'ke' }, { char: 'コ', romaji: 'ko' },
    { char: 'ガ', romaji: 'ga' }, { char: 'ギ', romaji: 'gi' }, { char: 'グ', romaji: 'gu' }, { char: 'ゲ', romaji: 'ge' }, { char: 'ゴ', romaji: 'go' },
    { char: 'サ', romaji: 'sa' }, { char: 'シ', romaji: 'shi' }, { char: 'ス', romaji: 'su' }, { char: 'セ', romaji: 'se' }, { char: 'ソ', romaji: 'so' },
    { char: 'ザ', romaji: 'za' }, { char: 'ジ', romaji: 'ji' }, { char: 'ズ', romaji: 'zu' }, { char: 'ゼ', romaji: 'ze' }, { char: 'ゾ', romaji: 'zo' },
    { char: 'タ', romaji: 'ta' }, { char: 'チ', romaji: 'chi' }, { char: 'ツ', romaji: 'tsu' }, { char: 'テ', romaji: 'te' }, { char: 'ト', romaji: 'to' },
    { char: 'ダ', romaji: 'da' }, { char: 'ヂ', romaji: 'ji' }, { char: 'ヅ', romaji: 'zu' }, { char: 'デ', romaji: 'de' }, { char: 'ド', romaji: 'do' },
    { char: 'ナ', romaji: 'na' }, { char: 'ニ', romaji: 'ni' }, { char: 'ヌ', romaji: 'nu' }, { char: 'ネ', romaji: 'ne' }, { char: 'ノ', romaji: 'no' },
    { char: 'ハ', romaji: 'ha' }, { char: 'ヒ', romaji: 'hi' }, { char: 'フ', romaji: 'fu' }, { char: 'ヘ', romaji: 'he' }, { char: 'ホ', romaji: 'ho' },
    { char: 'バ', romaji: 'ba' }, { char: 'ビ', romaji: 'bi' }, { char: 'ブ', romaji: 'bu' }, { char: 'ベ', romaji: 'be' }, { char: 'ボ', romaji: 'bo' },
    { char: 'パ', romaji: 'pa' }, { char: 'ピ', romaji: 'pi' }, { char: 'プ', romaji: 'pu' }, { char: 'ペ', romaji: 'pe' }, { char: 'ポ', romaji: 'po' },
    { char: 'マ', romaji: 'ma' }, { char: 'ミ', romaji: 'mi' }, { char: 'ム', romaji: 'mu' }, { char: 'メ', romaji: 'me' }, { char: 'モ', romaji: 'mo' },
    { char: 'ヤ', romaji: 'ya' }, { char: 'ユ', romaji: 'yu' }, { char: 'ヨ', romaji: 'yo' },
    { char: 'ラ', romaji: 'ra' }, { char: 'リ', romaji: 'ri' }, { char: 'ル', romaji: 'ru' }, { char: 'レ', romaji: 're' }, { char: 'ロ', romaji: 'ro' },
    { char: 'ワ', romaji: 'wa' }, { char: 'ヲ', romaji: 'wo' }, { char: 'ン', romaji: 'n' },
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
  ];

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

  const toggleHiraganaSelection = useCallback((id: string) => {
    setSelectedHiragana(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  }, []);

  const toggleKatakanaSelection = useCallback((id: string) => {
    setSelectedKatakana(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  }, []);

  const toggleKatakanaKnown = useCallback((id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setKnownKatakana(prev => {
      const newKnown = new Set(prev);
      if (newKnown.has(id)) {
        newKnown.delete(id);
      } else {
        newKnown.add(id);
      }
      return newKnown;
    });
  }, []);

  const toggleHiraganaKnown = useCallback((id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setKnownHiragana(prev => {
      const newKnown = new Set(prev);
      if (newKnown.has(id)) {
        newKnown.delete(id);
      } else {
        newKnown.add(id);
      }
      return newKnown;
    });
  }, []);

  const toggleKanjiKnown = useCallback(async (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const isCurrentlyKnown = knownKanji.has(id);
    
    setKnownKanji(prev => {
      const newKnown = new Set(prev);
      if (newKnown.has(id)) {
        newKnown.delete(id);
      } else {
        newKnown.add(id);
      }
      return newKnown;
    });
    
    // Update ReviewSystem for persistence
    if (isCurrentlyKnown) {
      await ReviewSystemSupabase.resetItemProgress(id, 'kanji');
    } else {
      await ReviewSystemSupabase.setItemMastered(id, 'kanji');
    }
  }, [knownKanji]);

  const toggleVocabularyKnown = useCallback(async (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const isCurrentlyKnown = knownVocabulary.has(id);
    
    setKnownVocabulary(prev => {
      const newKnown = new Set(prev);
      if (newKnown.has(id)) {
        newKnown.delete(id);
      } else {
        newKnown.add(id);
      }
      return newKnown;
    });
    
    // Update ReviewSystem for persistence
    if (isCurrentlyKnown) {
      await ReviewSystemSupabase.resetItemProgress(id, 'vocabulary');
    } else {
      await ReviewSystemSupabase.setItemMastered(id, 'vocabulary');
    }
  }, [knownVocabulary]);

  const handleStartTraining = (type: 'kanji' | 'vocabulary' | 'hiragana' | 'katakana') => {
    // Hiragana and katakana use typing mode directly, not the training modal
    if (type === 'hiragana' || type === 'katakana') {
      // Auto-select all if none selected
      if (type === 'hiragana' && selectedHiragana.size === 0) {
        setSelectedHiragana(new Set(hiraganaData.map(h => h.romaji)));
      } else if (type === 'katakana' && selectedKatakana.size === 0) {
        setSelectedKatakana(new Set(katakanaData.map(k => k.romaji)));
      }
      
      // Navigate to typing page with selected items
      const selectedItems = type === 'hiragana' 
        ? Array.from(selectedHiragana.size > 0 ? selectedHiragana : new Set(hiraganaData.map(h => h.romaji)))
        : Array.from(selectedKatakana.size > 0 ? selectedKatakana : new Set(katakanaData.map(k => k.romaji)));
      
      router.push(`/typing?type=${type}&items=${selectedItems.join(',')}`);
      setSelectionMode(false);
      return;
    }
    
    setTrainingType(type as any);
    
    // If in selection mode and items are selected, use selected items
    // Otherwise, select all items automatically
    if (type === 'kanji' && selectedKanji.size === 0) {
      setSelectedKanji(new Set(kanjiData.map(k => k.id)));
    } else if (type === 'vocabulary' && selectedVocabulary.size === 0) {
      setSelectedVocabulary(new Set(vocabularyData.map(v => v.id)));
    }
    
    setShowTrainingModal(true);
  };

  const handleSelectMode = (type: 'kanji' | 'vocabulary' | 'hiragana' | 'katakana') => {
    setTrainingType(type as any);
    setSelectionMode(true);
  };

  const getSelectedData = () => {
    if (trainingType === 'kanji') {
      // Transform to match the format expected by training pages (same as kanji page)
      return kanjiData
        .filter(k => selectedKanji.has(k.id))
        .map(k => ({
          id: k.id,
          kanji: k.character, // Training pages expect 'kanji' property
          character: k.character, // Keep original for compatibility
          meaning: k.meaning,
          level: k.jlpt_level,
          strokes: k.stroke_count,
          kun_reading: k.kun_reading,
          on_reading: k.on_reading,
          primary_reading: (k as any).primary_reading,
          primary_meaning: (k as any).primary_meaning
        }));
    } else {
      // Transform to match the format expected by training pages (same as vocabulary page)
      return vocabularyData
        .filter(v => selectedVocabulary.has(v.id))
        .map(v => ({
          id: v.id,
          word: v.word,
          reading: v.reading,
          meaning: v.meaning,
          level: v.jlpt_level
        }));
    }
  };

  const getSelectedItems = () => {
    if (trainingType === 'kanji') {
      return Array.from(selectedKanji);
    } else {
      return Array.from(selectedVocabulary);
    }
  };

  // Load progress stats from Supabase (source of truth)
  useEffect(() => {
    const loadStats = async () => {
      try {
        const { getContentCountsByLevel } = await import('@/lib/supabase-data');
        const counts = await getContentCountsByLevel(currentLevel);
        const reviewItems = await ReviewSystemSupabase.getItemsDueForReview();
        
        // Get all progress data from Supabase (source of truth)
        const allProgress = await ReviewSystemSupabase.getProgressData();
        
        // Count mastered and learning items by type
        let kanjiMastered = 0, kanjiLearning = 0;
        let vocabMastered = 0, vocabLearning = 0;
        let sentencesMastered = 0, sentencesLearning = 0;
        
        allProgress.forEach((progress, key) => {
          if (progress.masteryLevel >= 100) {
            if (progress.type === 'kanji') kanjiMastered++;
            else if (progress.type === 'vocabulary') vocabMastered++;
            else if (progress.type === 'sentences') sentencesMastered++;
          } else if (progress.masteryLevel > 0) {
            if (progress.type === 'kanji') kanjiLearning++;
            else if (progress.type === 'vocabulary') vocabLearning++;
            else if (progress.type === 'sentences') sentencesLearning++;
          }
        });
        
        setStats({
          kanji: {
            total: counts.kanji,
            mastered: kanjiMastered,
            learning: kanjiLearning
          },
          vocabulary: {
            total: counts.vocabulary,
            mastered: vocabMastered,
            learning: vocabLearning
          },
          sentences: {
            total: counts.sentences,
            mastered: sentencesMastered,
            learning: sentencesLearning
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

  // Load all content data on mount for progress meter
  // IMPORTANT: Always fetch from Supabase (source of truth) when authenticated
  useEffect(() => {
    const loadAllContent = async () => {
      try {
        // Load all progress data from Supabase (source of truth)
        const allProgress = await ReviewSystemSupabase.getProgressData();
        
        // Debug: Log all progress keys
        console.log(`[Roadmap] Total progress items from Supabase: ${allProgress.size}`);
        const progressKeys = Array.from(allProgress.keys());
        console.log(`[Roadmap] Progress keys sample:`, progressKeys.slice(0, 5));
        
        // Load kanji data
        const kanjiDataResult = await getKanjiByLevel(currentLevel);
        setKanjiData(kanjiDataResult);
        
        // Debug: Log kanji IDs
        console.log(`[Roadmap] Kanji items for ${currentLevel}: ${kanjiDataResult.length}`);
        if (kanjiDataResult.length > 0) {
          console.log(`[Roadmap] Sample kanji ID: ${kanjiDataResult[0].id}`);
        }
        
        // Filter mastered kanji from batch progress data
        const masteredKanjiIds = new Set<string>();
        for (const item of kanjiDataResult) {
          const key = `kanji_${item.id}`;
          const progress = allProgress.get(key);
          if (progress && progress.masteryLevel >= 100) {
            masteredKanjiIds.add(item.id);
          }
        }
        setKnownKanji(masteredKanjiIds);
        
        // Load vocabulary data
        const vocabDataResult = await getVocabularyByLevel(currentLevel);
        setVocabularyData(vocabDataResult);
        
        // Debug: Log vocabulary IDs
        console.log(`[Roadmap] Vocabulary items for ${currentLevel}: ${vocabDataResult.length}`);
        if (vocabDataResult.length > 0) {
          console.log(`[Roadmap] Sample vocabulary ID: ${vocabDataResult[0].id}`);
        }
        
        // Filter mastered vocabulary from batch progress data
        const masteredVocabIds = new Set<string>();
        for (const item of vocabDataResult) {
          const key = `vocabulary_${item.id}`;
          const progress = allProgress.get(key);
          if (progress && progress.masteryLevel >= 100) {
            masteredVocabIds.add(item.id);
          }
        }
        setKnownVocabulary(masteredVocabIds);
        
        console.log(`[Roadmap] Synced from Supabase: ${masteredKanjiIds.size} kanji, ${masteredVocabIds.size} vocabulary mastered`);
      } catch (error) {
        console.error('Error loading content:', error);
      }
    };

    loadAllContent();
    
    // Refresh data when page becomes visible (returning from training or other device sync)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadAllContent();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', loadAllContent);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', loadAllContent);
    };
  }, [currentLevel]);

  // Load content data when tab changes
  useEffect(() => {
    const loadContent = async () => {
      setContentLoading(true);
      try {
        if (activeTab === 'kanji') {
          const data = await getKanjiByLevel(currentLevel);
          setKanjiData(data);
        } else if (activeTab === 'vocabulary') {
          const data = await getVocabularyByLevel(currentLevel);
          setVocabularyData(data);
        } else if (activeTab === 'sentences') {
          const data = await getSentencesByLevel(currentLevel);
          setSentencesData(data);
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

  // Calculate progress metrics directly - React will re-render when state changes
  const totalKnown = knownKanji.size + knownVocabulary.size;
  const totalItems = kanjiData.length + vocabularyData.length;
  const progressPercent = totalItems > 0 ? Math.round((totalKnown / totalItems) * 100) : 0;
  const filledSegments = Math.round((progressPercent / 100) * 20); // 20 segments = 5% each

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
            <div className="text-sm text-gray-600 mt-1 mb-3">items to review</div>
            {(stats?.reviewDue || 0) > 0 && (
              <Link
                href="/review"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all"
              >
                <Play className="h-4 w-4" />
                Start Reviews
              </Link>
            )}
          </div>

          {/* Progress Meter */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 p-6 flex flex-col items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90">
                {/* All segments - render each one with appropriate color */}
                {Array.from({ length: 20 }, (_, i) => {
                  const isFilled = i < filledSegments;
                  const strokeColor = isFilled 
                    ? (i < 10 ? "#ec4899" : "#f97316")
                    : "#e5e7eb";
                  
                  return (
                    <circle
                      key={`segment-${i}`}
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth="12"
                      strokeDasharray="16.5 335"
                      strokeDashoffset={-i * 17.59}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                  );
                })}
              </svg>
              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{progressPercent}%</span>
              </div>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400 mt-2 font-medium">
              {totalKnown} / {totalItems} mastered
            </span>
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
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setMarkKnownMode(!markKnownMode);
                        setSelectionMode(false);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 border-2 font-medium rounded-lg transition-all text-sm ${
                        markKnownMode
                          ? 'bg-green-50 border-green-500 text-green-600'
                          : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {markKnownMode ? 'Done Marking' : 'Mark Known'}
                    </button>
                    <button
                      onClick={() => handleSelectMode('hiragana')}
                      className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-pink-500 text-pink-600 hover:bg-pink-50 font-medium rounded-lg transition-all text-sm"
                    >
                      Select Items to Study
                    </button>
                    <button
                      onClick={() => handleStartTraining('hiragana')}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all text-sm"
                    >
                      Start Practice
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
                  {hiraganaData.map((item) => (
                    selectionMode ? (
                      <button
                        key={item.romaji}
                        onClick={() => toggleHiraganaSelection(item.romaji)}
                        className={`relative rounded-lg border border-gray-200 border-b-4 p-3 text-center ${
                          selectedHiragana.has(item.romaji)
                            ? 'bg-pink-50 border-pink-300 border-b-pink-500'
                            : 'bg-white border-b-gray-300'
                        }`}
                      >
                        {selectedHiragana.has(item.romaji) && (
                          <div className="absolute top-1 right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                        )}
                        <div className="text-3xl font-bold text-gray-900 mb-1 font-japanese">
                          {item.char}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.romaji}
                        </div>
                      </button>
                    ) : markKnownMode ? (
                      <button
                        key={item.romaji}
                        onClick={() => toggleHiraganaKnown(item.romaji)}
                        className={`relative rounded-lg border border-gray-200 border-b-4 p-3 text-center ${
                          knownHiragana.has(item.romaji)
                            ? 'bg-green-50 border-green-300 border-b-green-500'
                            : 'bg-white border-b-gray-300 hover:border-green-200'
                        }`}
                      >
                        {knownHiragana.has(item.romaji) && (
                          <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                        )}
                        <div className="text-3xl font-bold text-gray-900 mb-1 font-japanese">
                          {item.char}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.romaji}
                        </div>
                      </button>
                    ) : (
                      <div
                        key={item.romaji}
                        className={`relative rounded-lg border border-gray-200 border-b-4 p-3 text-center ${
                          knownHiragana.has(item.romaji)
                            ? 'bg-green-50 border-green-300 border-b-green-500'
                            : 'bg-white border-b-gray-300'
                        }`}
                      >
                        {knownHiragana.has(item.romaji) && (
                          <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                        )}
                        <div className="text-3xl font-bold text-gray-900 mb-1 font-japanese">
                          {item.char}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.romaji}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'katakana' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Katakana</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setMarkKnownMode(!markKnownMode);
                        setSelectionMode(false);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 border-2 font-medium rounded-lg transition-all text-sm ${
                        markKnownMode
                          ? 'bg-green-50 border-green-500 text-green-600'
                          : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {markKnownMode ? 'Done Marking' : 'Mark Known'}
                    </button>
                    <button
                      onClick={() => handleSelectMode('katakana')}
                      className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-pink-500 text-pink-600 hover:bg-pink-50 font-medium rounded-lg transition-all text-sm"
                    >
                      Select Items to Study
                    </button>
                    <button
                      onClick={() => handleStartTraining('katakana')}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all text-sm"
                    >
                      Start Practice
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
                  {katakanaData.map((item) => (
                    selectionMode ? (
                      <button
                        key={item.romaji}
                        onClick={() => toggleKatakanaSelection(item.romaji)}
                        className={`relative rounded-lg border border-gray-200 border-b-4 p-3 text-center ${
                          selectedKatakana.has(item.romaji)
                            ? 'bg-pink-50 border-pink-300 border-b-pink-500'
                            : 'bg-white border-b-gray-300'
                        }`}
                      >
                        {selectedKatakana.has(item.romaji) && (
                          <div className="absolute top-1 right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                        )}
                        {knownKatakana.has(item.romaji) && (
                          <div className="absolute bottom-1 right-1 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full font-medium">
                            Known
                          </div>
                        )}
                        <div className="text-3xl font-bold text-gray-900 mb-1 font-japanese">
                          {item.char}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.romaji}
                        </div>
                      </button>
                    ) : markKnownMode ? (
                      <button
                        key={item.romaji}
                        onClick={() => toggleKatakanaKnown(item.romaji)}
                        className={`relative rounded-lg border border-gray-200 border-b-4 p-3 text-center ${
                          knownKatakana.has(item.romaji)
                            ? 'bg-green-50 border-green-300 border-b-green-500'
                            : 'bg-white border-b-gray-300 hover:border-green-200'
                        }`}
                      >
                        {knownKatakana.has(item.romaji) && (
                          <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                        )}
                        <div className="text-3xl font-bold text-gray-900 mb-1 font-japanese">
                          {item.char}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.romaji}
                        </div>
                      </button>
                    ) : (
                      <div
                        key={item.romaji}
                        className={`relative rounded-lg border border-gray-200 border-b-4 p-3 text-center ${
                          knownKatakana.has(item.romaji)
                            ? 'bg-green-50 border-green-300 border-b-green-500'
                            : 'bg-white border-b-gray-300'
                        }`}
                      >
                        {knownKatakana.has(item.romaji) && (
                          <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                        )}
                        <div className="text-3xl font-bold text-gray-900 mb-1 font-japanese">
                          {item.char}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.romaji}
                        </div>
                      </div>
                    )
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
                      onClick={() => {
                        setMarkKnownMode(!markKnownMode);
                        setSelectionMode(false);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 border-2 font-medium rounded-lg transition-all text-sm ${
                        markKnownMode
                          ? 'bg-green-50 border-green-500 text-green-600'
                          : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {markKnownMode ? 'Done Marking' : 'Mark Known'}
                    </button>
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
                            {item.primary_meaning || item.meaning?.split(',')[0]}
                          </div>
                        </button>
                      ) : markKnownMode ? (
                        <button
                          key={item.id}
                          onClick={() => toggleKanjiKnown(item.id)}
                          className={`relative rounded-lg border border-gray-200 border-b-4 p-3 text-center ${
                            knownKanji.has(item.id)
                              ? 'bg-green-50 border-green-300 border-b-green-500'
                              : 'bg-white border-b-gray-300 hover:border-green-200'
                          }`}
                        >
                          {knownKanji.has(item.id) && (
                            <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">✓</span>
                            </div>
                          )}
                          <div className="text-4xl font-bold text-gray-900 mb-1 font-japanese">
                            {item.character}
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-1">
                            {item.primary_meaning || item.meaning?.split(',')[0]}
                          </div>
                        </button>
                      ) : (
                        <div
                          key={item.id}
                          className={`relative rounded-lg border border-gray-200 border-b-4 p-3 text-center ${
                            knownKanji.has(item.id)
                              ? 'bg-green-50 border-green-300 border-b-green-500'
                              : 'bg-white border-b-gray-300'
                          }`}
                        >
                          {knownKanji.has(item.id) && (
                            <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">✓</span>
                            </div>
                          )}
                          <div className="text-4xl font-bold text-gray-900 mb-1 font-japanese">
                            {item.character}
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-1">
                            {item.primary_meaning || item.meaning?.split(',')[0]}
                          </div>
                        </div>
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
                      onClick={() => {
                        setMarkKnownMode(!markKnownMode);
                        setSelectionMode(false);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 border-2 font-medium rounded-lg transition-all text-sm ${
                        markKnownMode
                          ? 'bg-green-50 border-green-500 text-green-600'
                          : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {markKnownMode ? 'Done Marking' : 'Mark Known'}
                    </button>
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {vocabularyData.map((item: any) => (
                      selectionMode ? (
                        <button
                          key={item.id}
                          onClick={() => toggleVocabularySelection(item.id)}
                          className={`relative rounded-lg border border-gray-200 border-b-4 p-3 text-center ${
                            selectedVocabulary.has(item.id)
                              ? 'bg-pink-50 border-pink-300 border-b-pink-500'
                              : 'bg-white border-b-gray-300'
                          }`}
                        >
                          {selectedVocabulary.has(item.id) && (
                            <div className="absolute top-1 right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">✓</span>
                            </div>
                          )}
                          <div className="text-2xl font-bold text-gray-900 mb-1 font-japanese">
                            {item.word}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            {item.reading}
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-2">
                            {item.meaning}
                          </div>
                        </button>
                      ) : markKnownMode ? (
                        <button
                          key={item.id}
                          onClick={() => toggleVocabularyKnown(item.id)}
                          className={`relative rounded-lg border border-gray-200 border-b-4 p-3 text-center ${
                            knownVocabulary.has(item.id)
                              ? 'bg-green-50 border-green-300 border-b-green-500'
                              : 'bg-white border-b-gray-300 hover:border-green-200'
                          }`}
                        >
                          {knownVocabulary.has(item.id) && (
                            <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">✓</span>
                            </div>
                          )}
                          <div className="text-2xl font-bold text-gray-900 mb-1 font-japanese">
                            {item.word}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            {item.reading}
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-2">
                            {item.meaning}
                          </div>
                        </button>
                      ) : (
                        <div
                          key={item.id}
                          className={`relative rounded-lg border border-gray-200 border-b-4 p-3 text-center ${
                            knownVocabulary.has(item.id)
                              ? 'bg-green-50 border-green-300 border-b-green-500'
                              : 'bg-white border-b-gray-300'
                          }`}
                        >
                          {knownVocabulary.has(item.id) && (
                            <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">✓</span>
                            </div>
                          )}
                          <div className="text-2xl font-bold text-gray-900 mb-1 font-japanese">
                            {item.word}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            {item.reading}
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-2">
                            {item.meaning}
                          </div>
                        </div>
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
