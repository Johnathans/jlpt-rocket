'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TrainingHeader from '@/components/TrainingHeader';
import MatchCompletionScreen from '@/components/MatchCompletionScreen';
import QuitConfirmationModal from '@/components/QuitConfirmationModal';
import { ReviewSystem } from '@/lib/reviewSystem';
import { StreakSystem } from '@/lib/streakSystem';
import { speakText, useTTS } from '@/lib/useTTS';
import { playIncorrectSound, playCorrectSound, shouldPlayVoice, playButtonClickSound } from '@/lib/audioUtils';

interface TrainingItem {
  id: number;
  character: string;
  meaning: string;
  reading?: string;
  type: 'kanji' | 'vocabulary' | 'sentences';
}

interface WrongAnswer {
  id: number;
  character: string;
  meaning: string;
  reading?: string;
  userAnswer: string;
  correctAnswer: string;
  type: 'kanji' | 'vocabulary' | 'sentences';
}

// Vocabulary data
const vocabularyData = [
  { id: 1, word: '学校', reading: 'がっこう', meaning: 'school', level: 'N5' },
  { id: 2, word: '友達', reading: 'ともだち', meaning: 'friend', level: 'N5' },
  { id: 3, word: '勉強', reading: 'べんきょう', meaning: 'study', level: 'N5' },
  { id: 4, word: '電車', reading: 'でんしゃ', meaning: 'train', level: 'N4' },
  { id: 5, word: '料理', reading: 'りょうり', meaning: 'cooking, cuisine', level: 'N4' },
  { id: 6, word: '経験', reading: 'けいけん', meaning: 'experience', level: 'N3' },
];

// Kanji data
const kanjiData = [
  { id: 1, kanji: '学', meaning: 'study, learning', level: 'N5' },
  { id: 2, kanji: '友', meaning: 'friend', level: 'N5' },
  { id: 3, kanji: '本', meaning: 'book, origin', level: 'N5' },
  { id: 4, kanji: '電', meaning: 'electricity', level: 'N4' },
  { id: 5, kanji: '料', meaning: 'fee, materials', level: 'N4' },
  { id: 6, kanji: '経', meaning: 'sutra, longitude, pass thru', level: 'N3' },
];

// Sample fallback data
const sampleItems: TrainingItem[] = [
  { id: 1, character: '学校', meaning: 'school', reading: 'がっこう', type: 'vocabulary' },
  { id: 2, character: '友達', meaning: 'friend', reading: 'ともだち', type: 'vocabulary' },
  { id: 3, character: '勉強', meaning: 'study', reading: 'べんきょう', type: 'vocabulary' },
  { id: 4, character: '学', meaning: 'study, learning', type: 'kanji' },
  { id: 5, character: '友', meaning: 'friend', type: 'kanji' },
  { id: 6, character: '本', meaning: 'book', type: 'kanji' },
  { id: 7, character: '水', meaning: 'water', type: 'kanji' },
  { id: 8, character: '火', meaning: 'fire', type: 'kanji' },
];

export default function FlashcardPage() {
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
  
  const { speak, playAudio } = useTTS();

  // Load selected items from URL parameters
  useEffect(() => {
    const type = searchParams.get('type');
    const itemIds = searchParams.get('items')?.split(',').map(id => parseInt(id)) || [];
    
    if (type && itemIds.length > 0) {
      let selectedItems: TrainingItem[] = [];
      
      if (type === 'vocabulary') {
        selectedItems = vocabularyData
          .filter(item => itemIds.includes(item.id))
          .map(item => ({
            id: item.id,
            character: item.word,
            meaning: item.meaning,
            reading: item.reading,
            type: 'vocabulary'
          }));
      } else if (type === 'kanji') {
        selectedItems = kanjiData
          .filter(item => itemIds.includes(item.id))
          .map(item => ({
            id: item.id,
            character: item.kanji,
            meaning: item.meaning,
            type: 'kanji'
          }));
      }
      
      if (selectedItems.length > 0) {
        setTrainingItems(selectedItems);
      } else {
        setTrainingItems(sampleItems);
      }
    } else {
      setTrainingItems(sampleItems);
    }
  }, [searchParams]);

  const currentItem = trainingItems[currentIndex];

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
          handleFlipCard();
          break;
        case '1':
        case 'x':
          event.preventDefault();
          if (isFlipped) {
            handleForget();
          }
          break;
        case '2':
        case 'c':
          event.preventDefault();
          if (isFlipped) {
            handleRemember();
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

  const handleRemember = () => {
    playButtonClickSound();
    playCorrectSound();
    
    // Update review system
    ReviewSystem.updateItemProgress(currentItem.id, currentItem.type, true);
    
    setScore(score + 1);
    handleNext();
  };

  const handleForget = () => {
    playButtonClickSound();
    playIncorrectSound();
    
    // Update review system
    ReviewSystem.updateItemProgress(currentItem.id, currentItem.type, false);
    
    // Add to wrong answers
    setWrongAnswers([...wrongAnswers, {
      id: currentItem.id,
      character: currentItem.character,
      meaning: currentItem.meaning,
      reading: currentItem.reading,
      userAnswer: 'forgot',
      correctAnswer: currentItem.meaning || 'unknown',
      type: currentItem.type
    }]);
    
    handleNext();
  };

  const handleNext = () => {
    if (currentIndex < trainingItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      // Training completed
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

  const handleQuit = () => {
    const xp = score * 10;
    setEarnedXP(xp);
    StreakSystem.recordSession();
    
    // Record partial completion
    trainingItems.slice(0, currentIndex).forEach(item => {
      ReviewSystem.updateItemProgress(item.id, item.type, true);
    });
    
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
    router.push('/');
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
    <div className="min-h-screen bg-gray-50">
      <TrainingHeader
        progress={(currentIndex / trainingItems.length) * 100}
        onClose={handleClose}
      />

      <div className="flex flex-col items-center justify-center px-6 py-12" style={{ minHeight: 'calc(100vh - 120px)' }}>
        {/* Flashcard */}
        <div className="relative w-full max-w-xl h-[30rem] mb-10">
          <div 
            className={`absolute inset-0 w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={handleFlipCard}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front of card */}
            <div 
              className="absolute inset-0 w-full h-full bg-white rounded-2xl shadow-xl border-2 border-gray-200 flex flex-col items-center justify-center backface-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="text-center">
                <div className="text-6xl sm:text-7xl md:text-8xl font-bold font-japanese leading-none mb-4" style={{ color: '#333333' }}>
                  {currentItem.character}
                </div>
                {currentItem.reading && (
                  <p className="text-lg sm:text-xl text-gray-600 font-japanese">
                    {currentItem.reading}
                  </p>
                )}
              </div>
              <div className="absolute bottom-4 text-sm text-gray-400">
                Tap to flip
              </div>
            </div>

            {/* Back of card */}
            <div 
              className="absolute inset-0 w-full h-full bg-gray-50 rounded-2xl shadow-xl border-2 border-gray-200 flex flex-col items-center justify-center backface-hidden rotate-y-180"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              {/* Audio icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (currentItem.character) {
                    playJapaneseAudio(currentItem.character);
                  }
                }}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6 15h3l4.5 4.5V4.5L9 9H6v6z" />
                </svg>
              </button>
              
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-800 mb-4">
                  {currentItem.meaning}
                </div>
                {currentItem.reading && (
                  <p className="text-xl font-japanese font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-lg inline-block mt-2">
                    {currentItem.reading}
                  </p>
                )}
              </div>
              <div className="absolute bottom-4 text-sm text-gray-400">
                Tap to flip back
              </div>
            </div>
          </div>
        </div>

        {/* Prompt */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">
            Do you remember?
          </h2>
        </div>
        <div className="flex gap-6">
          <button
            onClick={handleForget}
            disabled={!isFlipped}
            className={`px-20 py-5 rounded-lg font-semibold transition-all duration-200 border-b-4 min-w-[240px] ${
              isFlipped
                ? 'bg-gray-200 hover:bg-gray-300 text-gray-700 border-gray-400 cursor-pointer'
                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
            }`}
          >
            ✗&nbsp;&nbsp;&nbsp;&nbsp;Forgot
          </button>
          <button
            onClick={handleRemember}
            disabled={!isFlipped}
            className={`px-20 py-5 rounded-lg font-semibold transition-all duration-200 border-b-4 min-w-[240px] ${
              isFlipped
                ? 'bg-green-500 hover:bg-green-600 text-white border-green-700 cursor-pointer'
                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
            }`}
          >
            ✓&nbsp;&nbsp;&nbsp;&nbsp;Remember
          </button>
        </div>

        {/* Keyboard Shortcuts Display */}
        <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 px-4">
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-3 text-xs text-gray-400">
            <span className="whitespace-nowrap text-xs"><kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">Space</kbd> Flip</span>
            <span className="whitespace-nowrap text-xs"><kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">1</kbd> or <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">X</kbd> Forgot</span>
            <span className="whitespace-nowrap text-xs"><kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">2</kbd> or <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">C</kbd> Remember</span>
            <span className="whitespace-nowrap text-xs"><kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">A</kbd> Audio</span>
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
