'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TrainingHeader from '@/components/TrainingHeader';
import MatchCompletionScreen from '@/components/MatchCompletionScreen';
import QuitConfirmationModal from '@/components/QuitConfirmationModal';
import { ReviewSystemSupabase } from '@/lib/reviewSystemSupabase';
import { StreakSystem } from '@/lib/streakSystem';
import { speakText, useTTS } from '@/lib/useTTS';
import { playIncorrectSound, playCorrectSound, shouldPlayVoice, playButtonClickSound } from '@/lib/audioUtils';
import { getKanjiByLevel, getVocabularyByLevel, JLPTLevel } from '@/lib/supabase-data';

interface TrainingItem {
  id: string;
  character: string;
  meaning: string;
  reading?: string;
  type: 'kanji' | 'vocabulary' | 'sentences';
}

interface WrongAnswer {
  id: string;
  character: string;
  meaning: string;
  reading?: string;
  userAnswer: string;
  correctAnswer: string;
  type: 'kanji' | 'vocabulary' | 'sentences';
}

// No hardcoded data - we'll fetch from Supabase

function FlashcardPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [trainingItems, setTrainingItems] = useState<TrainingItem[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [itemQueue, setItemQueue] = useState<TrainingItem[]>([]);
  const [seenCount, setSeenCount] = useState(0);
  
  const { speak, playAudio } = useTTS();

  // Load selected items from URL parameters and localStorage
  useEffect(() => {
    const fetchTrainingItems = async () => {
      const type = searchParams.get('type');
      const itemIds = searchParams.get('items')?.split(',') || [];
      
      if (type && itemIds.length > 0) {
        let selectedItems: TrainingItem[] = [];
        
        if (type === 'vocabulary') {
          // Try to get vocabulary data from localStorage first (passed from vocabulary page)
          const storedVocabData = localStorage.getItem('selectedVocabularyData');
          if (storedVocabData) {
            try {
              const parsedVocabData = JSON.parse(storedVocabData);
              selectedItems = parsedVocabData.map((item: any) => ({
                id: item.id,
                character: item.word,
                meaning: item.meaning,
                reading: item.reading,
                type: 'vocabulary' as const
              }));
              localStorage.removeItem('selectedVocabularyData');
            } catch (error) {
              console.error('Failed to parse stored vocabulary data:', error);
            }
          }
          // Fallback to fetching from Supabase if localStorage fails
          if (selectedItems.length === 0) {
            const allVocabData = await getVocabularyByLevel('N5' as JLPTLevel);
            selectedItems = allVocabData
              .filter(item => itemIds.includes(item.id))
              .map(item => ({
                id: item.id,
                character: item.word,
                meaning: item.meaning,
                reading: item.reading,
                type: 'vocabulary' as const
              }));
          }
        } else if (type === 'kanji') {
          // Try to get kanji data from localStorage first (passed from kanji page)
          const storedKanjiData = localStorage.getItem('selectedKanjiData');
          if (storedKanjiData) {
            try {
              const parsedKanjiData = JSON.parse(storedKanjiData);
              selectedItems = parsedKanjiData.map((item: any) => ({
                id: item.id,
                character: item.kanji || item.character, // Support both 'kanji' (from kanji page) and 'character' (from roadmap)
                meaning: item.meaning,
                type: 'kanji' as const
              }));
              localStorage.removeItem('selectedKanjiData');
            } catch (error) {
              console.error('Failed to parse stored kanji data:', error);
            }
          }
          // Fallback to fetching from Supabase if localStorage fails
          if (selectedItems.length === 0) {
            const allKanjiData = await getKanjiByLevel('N5' as JLPTLevel);
            selectedItems = allKanjiData
              .filter(item => itemIds.includes(item.id))
              .map(item => ({
                id: item.id,
                character: item.character,
                meaning: item.meaning,
                type: 'kanji' as const
              }));
          }
        }
        
        setTrainingItems(selectedItems);
        setItemQueue(selectedItems);
      }
    };

    fetchTrainingItems();
  }, [searchParams]);

  const currentItem = itemQueue[0];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Prevent shortcuts if user is typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case ' ': // Spacebar - only flips card
          event.preventDefault();
          handleFlipCard();
          break;
        case 'arrowright': // Right arrow - next card (good)
          event.preventDefault();
          if (isFlipped) {
            handleDifficulty('good');
          }
          break;
        case 'arrowleft': // Left arrow - previous/again
          event.preventDefault();
          if (isFlipped) {
            handleDifficulty('again');
          }
          break;
        case '1':
          event.preventDefault();
          if (isFlipped) {
            handleDifficulty('again');
          }
          break;
        case '2':
          event.preventDefault();
          if (isFlipped) {
            handleDifficulty('hard');
          }
          break;
        case '3':
          event.preventDefault();
          if (isFlipped) {
            handleDifficulty('good');
          }
          break;
        case '4':
          event.preventDefault();
          if (isFlipped) {
            handleDifficulty('easy');
          }
          break;
        case 'a':
          event.preventDefault();
          if (currentItem?.character) {
            playJapaneseAudio(currentItem.character);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFlipped, currentItem, itemQueue]);

  const playJapaneseAudio = async (text: string) => {
    if (shouldPlayVoice()) {
      try {
        await speakText(text);
      } catch (error) {
        console.error('Error playing Japanese audio:', error);
      }
    }
  };

  // Anki-style difficulty handlers
  const handleDifficulty = async (difficulty: 'again' | 'hard' | 'good' | 'easy') => {
    playButtonClickSound();
    
    const isCorrect = difficulty !== 'again';
    
    if (isCorrect) {
      playCorrectSound();
      setScore(score + 1);
    } else {
      playIncorrectSound();
      // Add to wrong answers
      setWrongAnswers([...wrongAnswers, {
        id: currentItem.id.toString(),
        character: currentItem.character,
        meaning: currentItem.meaning,
        reading: currentItem.reading,
        userAnswer: 'forgot',
        correctAnswer: currentItem.meaning || 'unknown',
        type: currentItem.type
      }]);
    }
    
    // Update review system
    await ReviewSystemSupabase.updateItemProgress(currentItem.id, currentItem.type, isCorrect, currentItem);
    
    setSeenCount(seenCount + 1);
    
    // Queue management based on difficulty
    const newQueue = itemQueue.slice(1);
    
    if (difficulty === 'again') {
      // Re-queue soon (1-3 cards ahead)
      const insertPosition = Math.min(Math.floor(Math.random() * 2) + 1, newQueue.length);
      newQueue.splice(insertPosition, 0, currentItem);
    } else if (difficulty === 'hard') {
      // Re-queue later (5-7 cards ahead)
      const insertPosition = Math.min(Math.floor(Math.random() * 2) + 5, newQueue.length);
      newQueue.splice(insertPosition, 0, currentItem);
    }
    // 'good' and 'easy' don't re-queue
    
    setItemQueue(newQueue);
    setIsFlipped(false);
    
    // Check if training is complete
    if (newQueue.length === 0) {
      const xp = score * 10;
      setEarnedXP(xp);
      StreakSystem.recordSession();
      setShowCompletion(true);
    }
  };

  const handleClose = () => {
    setShowQuitModal(true);
  };

  const handleKeepLearning = () => {
    setShowQuitModal(false);
  };

  const handleQuit = async () => {
    const xp = score * 10;
    setEarnedXP(xp);
    StreakSystem.recordSession();
    
    // Record partial completion
    for (const item of trainingItems.slice(0, currentIndex)) {
      await ReviewSystemSupabase.updateItemProgress(item.id.toString(), item.type, true, item);
    }
    
    setShowCompletion(true);
  };

  const handlePracticeMissed = () => {
    // Practice only wrong answers
    const missedItems = wrongAnswers.map(wrong => ({
      id: wrong.id,
      character: wrong.character,
      meaning: wrong.meaning,
      reading: wrong.reading,
      type: wrong.type
    }));
    
    setTrainingItems(missedItems);
    setCurrentIndex(0);
    setScore(0);
    setWrongAnswers([]);
    setShowCompletion(false);
    setIsFlipped(false);
  };

  const handleGoHome = () => {
    router.push('/roadmap');
  };

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped && currentItem.character) {
      playJapaneseAudio(currentItem.character);
    }
  };

  if (showCompletion) {
    return (
      <MatchCompletionScreen
        score={score}
        totalQuestions={trainingItems.length}
        wrongAnswers={wrongAnswers}
        xpGained={earnedXP}
        onPracticeMissed={handlePracticeMissed}
        onGoHome={handleGoHome}
      />
    );
  }

  if (!currentItem) {
    return <div>Loading...</div>;
  }

  const totalCompleted = trainingItems.length - itemQueue.length;
  const progress = trainingItems.length > 0 ? (totalCompleted / trainingItems.length) * 100 : 0;
  const accuracy = totalCompleted > 0 ? Math.round((score / totalCompleted) * 100) : 0;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <TrainingHeader
        progress={progress}
        onClose={handleClose}
        rightButton={
          <div className="flex items-center gap-3 mr-2">
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">Accuracy</div>
              <div className="text-base font-bold text-gray-900 dark:text-white">{accuracy}%</div>
            </div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
              <div className="text-base font-bold text-gray-900 dark:text-white">{score}/{totalCompleted}</div>
            </div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">Cards</div>
              <div className="text-base font-bold text-gray-900 dark:text-white">{totalCompleted}/{trainingItems.length}</div>
            </div>
          </div>
        }
      />

      <div className="flex flex-col items-center justify-center px-6 py-8" style={{ minHeight: 'calc(100vh - 120px)' }}>
        {/* Flashcard - Clean design without box */}
        <div className="relative w-full max-w-2xl mb-12">
          <div className="relative w-full" style={{ minHeight: '400px' }}>
            {!isFlipped ? (
              /* Front of card */
              <div 
                className="w-full flex flex-col items-center justify-center cursor-pointer"
                onClick={handleFlipCard}
                style={{ minHeight: '400px' }}
              >
                <div className="text-center">
                  <div className="text-[10rem] sm:text-9xl md:text-[12rem] lg:text-[14rem] font-bold font-japanese leading-none mb-8 text-gray-900 dark:text-white">
                    {currentItem.character}
                  </div>
                  {currentItem.reading && (
                    <p className="text-3xl text-gray-600 dark:text-gray-300 font-japanese">
                      {currentItem.reading}
                    </p>
                  )}
                </div>
                <div className="mt-12 text-sm text-gray-400">
                  Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Space</kbd> to flip
                </div>
              </div>
            ) : (
              /* Back of card */
              <div className="w-full flex flex-col items-center justify-center" style={{ minHeight: '400px' }}>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                    {currentItem.meaning}
                  </div>
                  <div className="text-7xl sm:text-8xl font-bold font-japanese text-gray-400 dark:text-gray-600 mb-6">
                    {currentItem.character}
                  </div>
                  {currentItem.reading && (
                    <p className="text-2xl font-japanese text-gray-500 dark:text-gray-400">
                      {currentItem.reading}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Difficulty Buttons - Simple design */}
        <div className="w-full max-w-2xl">
          <div className="flex justify-center gap-3">
            <button
              onClick={() => isFlipped && handleDifficulty('again')}
              disabled={!isFlipped}
              className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                isFlipped 
                  ? 'bg-red-500 text-white hover:bg-red-600 cursor-pointer' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Again
            </button>
            <button
              onClick={() => isFlipped && handleDifficulty('hard')}
              disabled={!isFlipped}
              className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                isFlipped 
                  ? 'bg-orange-500 text-white hover:bg-orange-600 cursor-pointer' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Hard
            </button>
            <button
              onClick={() => isFlipped && handleDifficulty('good')}
              disabled={!isFlipped}
              className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                isFlipped 
                  ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:from-pink-600 hover:to-orange-600 cursor-pointer' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Good
            </button>
            <button
              onClick={() => isFlipped && handleDifficulty('easy')}
              disabled={!isFlipped}
              className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                isFlipped 
                  ? 'bg-green-500 text-white hover:bg-green-600 cursor-pointer' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Easy
            </button>
          </div>
          
          {/* Keyboard Shortcuts */}
          <div className="mt-4 flex justify-center gap-6 text-xs text-gray-400">
            <span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">←</kbd> Again</span>
            <span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Space</kbd> Flip</span>
            <span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">→</kbd> Good</span>
          </div>
        </div>
      </div>

      {/* Quit Confirmation Modal */}
      <QuitConfirmationModal
        isOpen={showQuitModal}
        onKeepLearning={handleKeepLearning}
        onQuit={handleQuit}
      />

      <style jsx>{`
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}

export default function FlashcardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">Loading...</div>}>
      <FlashcardPageContent />
    </Suspense>
  );
}
