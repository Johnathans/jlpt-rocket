'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TrainingHeader from '@/components/TrainingHeader';

import MatchCompletionScreen from '@/components/MatchCompletionScreen';
import { ReviewSystem } from '@/lib/reviewSystem';
import { StreakSystem } from '@/lib/streakSystem';

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



export default function InputPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [trainingItems, setTrainingItems] = useState<TrainingItem[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);


  // Load selected items from URL parameters or use sample data
  useEffect(() => {
    const type = searchParams.get('type');
    const itemIds = searchParams.get('items')?.split(',').map(id => parseInt(id)) || [];
    
    let selectedItems: TrainingItem[] = [];
    
    if (type && itemIds.length > 0) {
      if (type === 'vocabulary') {
        selectedItems = vocabularyData
          .filter(item => itemIds.includes(item.id))
          .map(item => ({
            id: item.id,
            character: item.word,
            meaning: item.meaning,
            reading: item.reading,
            type: 'vocabulary' as const
          }));
      } else if (type === 'kanji') {
        selectedItems = kanjiData
          .filter(item => itemIds.includes(item.id))
          .map(item => ({
            id: item.id,
            character: item.kanji,
            meaning: item.meaning,
            type: 'kanji' as const
          }));
      }
    } else {
      // Use sample data if no URL parameters
      selectedItems = [
        { id: 1, character: '学校', meaning: 'school', reading: 'がっこう', type: 'vocabulary' },
        { id: 2, character: '友達', meaning: 'friend', reading: 'ともだち', type: 'vocabulary' },
        { id: 3, character: '勉強', meaning: 'study', reading: 'べんきょう', type: 'vocabulary' },
      ];
    }
    
    setTrainingItems(selectedItems);
  }, [searchParams]);



  const currentItem = trainingItems[currentIndex];
  const progress = trainingItems.length > 0 ? ((currentIndex + 1) / trainingItems.length) * 100 : 0;



  const handleSubmit = () => {
    if (!currentItem || !currentItem.reading) return;
    
    const correct = userInput.trim() === currentItem.reading;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(prev => prev + 1);
      // Record correct answer in review system
      ReviewSystem.updateItemProgress(currentItem.id, currentItem.type, true);
    } else {
      // Record wrong answer
      ReviewSystem.updateItemProgress(currentItem.id, currentItem.type, false);
      if (currentItem.reading) {
        setWrongAnswers(prev => [...prev, {
          id: currentItem.id,
          character: currentItem.character,
          meaning: currentItem.meaning,
          reading: currentItem.reading,
          userAnswer: userInput.trim(),
          correctAnswer: currentItem.reading,
          type: currentItem.type
        }]);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < trainingItems.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserInput('');
      setShowResult(false);
      setIsCorrect(null);
    } else {
      // Training completed
      const xpGained = score * 10 + (trainingItems.length - wrongAnswers.length) * 5;
      
      // Update streak
      if (score === trainingItems.length) {
        StreakSystem.recordSession();
      }
      
      // Store XP
      const currentXP = parseInt(localStorage.getItem('userXP') || '0');
      localStorage.setItem('userXP', (currentXP + xpGained).toString());
      
      setShowCompletion(true);
    }
  };

  const handleClose = () => {
    router.push('/');
  };

  const handleSettings = () => {
    console.log('Settings clicked');
  };

  const handlePracticeMissed = () => {
    const missedIds = wrongAnswers.map(answer => answer.id.toString());
    const type = wrongAnswers[0]?.type || 'vocabulary';
    router.push(`/input?type=${type}&items=${missedIds}`);
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const handleClearInput = () => {
    setUserInput('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userInput.trim() && !showResult) {
      handleSubmit();
    }
  };

  // Show completion screen
  if (showCompletion) {
    const xpGained = score * 10 + (trainingItems.length - wrongAnswers.length) * 5;
    return (
      <MatchCompletionScreen
        score={score}
        totalQuestions={trainingItems.length}
        wrongAnswers={wrongAnswers}
        xpGained={xpGained}
        onPracticeMissed={handlePracticeMissed}
        onGoHome={handleGoHome}
      />
    );
  }

  if (trainingItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading training items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Training Header */}
      <TrainingHeader 
        progress={progress}
        onClose={handleClose}
        onSettings={handleSettings}
      />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        {/* Large Kanji/Character */}
        <div className="text-center mb-8">
          <div className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-bold text-gray-900 font-japanese leading-none mb-6">
            {currentItem.character}
          </div>
          <p className="text-2xl sm:text-3xl md:text-4xl text-gray-600 mb-3">
            {currentItem.meaning}
          </p>
          <p className="text-lg md:text-xl text-gray-500">
            Type the reading in hiragana or katakana
          </p>
        </div>

        {/* Input Field */}
        <div className="w-full max-w-2xl lg:max-w-4xl mb-8">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type the correct reading"
              className={`
                w-full p-6 md:p-8 text-3xl md:text-4xl lg:text-5xl font-japanese text-center rounded-xl border-2 transition-all duration-200
                ${showResult 
                  ? isCorrect 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-300 bg-white focus:border-blue-500 focus:outline-none shadow-lg focus:shadow-xl'
                }
              `}
              disabled={showResult}
              autoFocus
            />
            {userInput && (
              <button
                onClick={handleClearInput}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>



        {/* Submit Button */}
        {!showResult && (
          <button
            onClick={handleSubmit}
            disabled={!userInput.trim()}
            className={`
              px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200
              ${userInput.trim()
                ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            Submit Answer
          </button>
        )}

        {/* Result Feedback */}
        {showResult && (
          <div className="text-center">
            {isCorrect ? (
              <div className="text-green-600 mb-6">
                <div className="text-5xl mb-2">✓</div>
                <p className="text-xl font-semibold">Correct!</p>
                <p className="text-lg text-gray-600">Your answer: {userInput}</p>
              </div>
            ) : (
              <div className="text-red-600 mb-6">
                <div className="text-5xl mb-2">✗</div>
                <p className="text-xl font-semibold">Incorrect</p>
                <p className="text-lg text-gray-600">Your answer: {userInput}</p>
                <p className="text-lg font-semibold text-gray-800">
                  Correct answer: {currentItem.reading}
                </p>
              </div>
            )}
            
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold text-lg hover:bg-blue-600 transition-colors"
            >
              {currentIndex < trainingItems.length - 1 ? 'Next Question' : 'Finish Training'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
