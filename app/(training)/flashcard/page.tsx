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
        case ' ': // Spacebar
        case 'enter':
          event.preventDefault();
          if (!isFlipped) {
            handleFlipCard();
          } else {
            handleDifficulty('good');
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
  }, [isFlipped, currentItem]);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TrainingHeader
        progress={((trainingItems.length - itemQueue.length) / trainingItems.length) * 100}
        onClose={handleClose}
        rightButton={
          <div className="flex items-center gap-4 text-sm text-gray-600 mr-2">
            <span>{itemQueue.length} left</span>
            <span className="text-gray-400">•</span>
            <span>{score}/{trainingItems.length}</span>
          </div>
        }
      />

      <div className="flex flex-col items-center justify-center px-6 py-8" style={{ minHeight: 'calc(100vh - 120px)' }}>
        {/* Flashcard */}
        <div className="relative w-full max-w-2xl mb-6">
          <div className="relative w-full min-h-[28rem]">
            {!isFlipped ? (
              /* Front of card */
              <div 
                className="w-full bg-white rounded-lg shadow border border-gray-200 p-12 flex flex-col items-center justify-center min-h-[28rem] cursor-pointer relative"
                onClick={handleFlipCard}
              >
                <div className="text-center">
                  <div className="text-8xl font-bold font-japanese leading-none mb-6 text-gray-900">
                    {currentItem.character}
                  </div>
                  {currentItem.reading && (
                    <p className="text-2xl text-gray-500 font-japanese">
                      {currentItem.reading}
                    </p>
                  )}
                </div>
                <div className="absolute bottom-6 text-sm text-gray-400">
                  Click to reveal • Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Space</kbd>
                </div>
              </div>
            ) : (
              /* Back of card */
              <div className="w-full bg-white rounded-lg shadow border border-gray-200 p-12 flex flex-col items-center justify-center min-h-[28rem] relative">
                {/* Audio button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (currentItem.character) {
                      playJapaneseAudio(currentItem.character);
                    }
                  }}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
                  title="Play audio (A)"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6 15h3l4.5 4.5V4.5L9 9H6v6z" />
                  </svg>
                </button>
                
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900 mb-6">
                    {currentItem.meaning}
                  </div>
                  <div className="text-6xl font-bold font-japanese text-gray-400 mb-4">
                    {currentItem.character}
                  </div>
                  {currentItem.reading && (
                    <p className="text-xl font-japanese text-gray-500">
                      {currentItem.reading}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Difficulty Buttons - Always Visible */}
        <div className="w-full max-w-2xl">
          <div className="flex justify-center gap-2">
            <button
              onClick={() => isFlipped && handleDifficulty('again')}
              disabled={!isFlipped}
              className={`px-4 py-1.5 bg-white rounded border border-gray-200 flex items-center gap-2 ${
                isFlipped ? 'hover:border-gray-300 hover:shadow-sm cursor-pointer' : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex gap-0.5 h-5 items-end">
                <div className="w-1.5 h-1.5 bg-gradient-to-br from-pink-500 to-orange-500 rounded-sm"></div>
                <div className="w-1.5 h-2.5 bg-gray-200 rounded-sm"></div>
                <div className="w-1.5 h-3.5 bg-gray-200 rounded-sm"></div>
                <div className="w-1.5 h-5 bg-gray-200 rounded-sm"></div>
              </div>
              <div className="text-xs font-medium text-gray-700">Again</div>
            </button>
            <button
              onClick={() => isFlipped && handleDifficulty('hard')}
              disabled={!isFlipped}
              className={`px-4 py-1.5 bg-white rounded border border-gray-200 flex items-center gap-2 ${
                isFlipped ? 'hover:border-gray-300 hover:shadow-sm cursor-pointer' : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex gap-0.5 h-5 items-end">
                <div className="w-1.5 h-1.5 bg-gradient-to-br from-pink-500 to-orange-500 rounded-sm"></div>
                <div className="w-1.5 h-2.5 bg-gradient-to-br from-pink-500 to-orange-500 rounded-sm"></div>
                <div className="w-1.5 h-3.5 bg-gray-200 rounded-sm"></div>
                <div className="w-1.5 h-5 bg-gray-200 rounded-sm"></div>
              </div>
              <div className="text-xs font-medium text-gray-700">Hard</div>
            </button>
            <button
              onClick={() => isFlipped && handleDifficulty('good')}
              disabled={!isFlipped}
              className={`px-4 py-1.5 bg-white rounded border border-gray-200 flex items-center gap-2 ${
                isFlipped ? 'hover:border-gray-300 hover:shadow-sm cursor-pointer' : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex gap-0.5 h-5 items-end">
                <div className="w-1.5 h-1.5 bg-gradient-to-br from-pink-500 to-orange-500 rounded-sm"></div>
                <div className="w-1.5 h-2.5 bg-gradient-to-br from-pink-500 to-orange-500 rounded-sm"></div>
                <div className="w-1.5 h-3.5 bg-gradient-to-br from-pink-500 to-orange-500 rounded-sm"></div>
                <div className="w-1.5 h-5 bg-gray-200 rounded-sm"></div>
              </div>
              <div className="text-xs font-medium text-gray-700">Good</div>
            </button>
            <button
              onClick={() => isFlipped && handleDifficulty('easy')}
              disabled={!isFlipped}
              className={`px-4 py-1.5 bg-white rounded border border-gray-200 flex items-center gap-2 ${
                isFlipped ? 'hover:border-gray-300 hover:shadow-sm cursor-pointer' : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex gap-0.5 h-5 items-end">
                <div className="w-1.5 h-1.5 bg-gradient-to-br from-pink-500 to-orange-500 rounded-sm"></div>
                <div className="w-1.5 h-2.5 bg-gradient-to-br from-pink-500 to-orange-500 rounded-sm"></div>
                <div className="w-1.5 h-3.5 bg-gradient-to-br from-pink-500 to-orange-500 rounded-sm"></div>
                <div className="w-1.5 h-5 bg-gradient-to-br from-pink-500 to-orange-500 rounded-sm"></div>
              </div>
              <div className="text-xs font-medium text-gray-700">Easy</div>
            </button>
          </div>
          
          {/* Keyboard Shortcuts */}
          <div className="mt-3 flex justify-center gap-4 text-xs text-gray-400">
            <span><kbd className="px-1.5 py-0.5 bg-gray-100 rounded">1</kbd> Again</span>
            <span><kbd className="px-1.5 py-0.5 bg-gray-100 rounded">2</kbd> Hard</span>
            <span><kbd className="px-1.5 py-0.5 bg-gray-100 rounded">3</kbd> Good</span>
            <span><kbd className="px-1.5 py-0.5 bg-gray-100 rounded">4</kbd> Easy</span>
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
