'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TrainingHeader from '@/components/TrainingHeader';
import MatchCompletionScreen from '@/components/MatchCompletionScreen';
import { ReviewSystem } from '@/lib/reviewSystem';
import { StreakSystem } from '@/lib/streakSystem';
import { speakText, useTTS } from '@/lib/useTTS';

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

export default function MatchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [trainingItems, setTrainingItems] = useState<TrainingItem[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [preloadedAudio, setPreloadedAudio] = useState<string | null>(null);
  
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
      
      setTrainingItems(selectedItems.length > 0 ? selectedItems : sampleItems);
    } else {
      // Fallback to sample items if no selection
      setTrainingItems(sampleItems);
    }
  }, [searchParams]);

  const currentItem = trainingItems[currentIndex];
  const isComplete = currentIndex >= trainingItems.length;
  const progress = trainingItems.length > 0 ? ((currentIndex + 1) / trainingItems.length) * 100 : 0;

  useEffect(() => {
    if (currentItem && trainingItems.length > 0) {
      // Create options: correct answer + 3 random wrong answers
      const correctAnswer = currentItem.meaning;
      
      // Get wrong answers from all available data (not just training items)
      const allItems = [...vocabularyData.map(v => v.meaning), ...kanjiData.map(k => k.meaning)];
      const wrongAnswers = allItems
        .filter(meaning => meaning !== correctAnswer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      const allOptions = [correctAnswer, ...wrongAnswers];
      setShuffledOptions(allOptions.sort(() => Math.random() - 0.5));
      
      // Preload audio for the current question to avoid delay
      preloadCurrentAudio();
    }
  }, [currentItem, trainingItems]);
  
  const preloadCurrentAudio = async () => {
    if (currentItem) {
      const audioText = currentItem.reading || currentItem.character;
      try {
        console.log('Preloading audio for:', audioText);
        const audioUrl = await speak(audioText, {
          languageCode: 'ja-JP',
          voiceName: 'ja-JP-Chirp3-HD-Leda',
          autoPlay: false // Don't play automatically, just preload
        });
        setPreloadedAudio(audioUrl);
        console.log('Audio preloaded successfully');
      } catch (error) {
        console.error('Failed to preload audio:', error);
        setPreloadedAudio(null);
      }
    }
  };

  const playJapaneseAudio = async (text: string) => {
    console.log('Playing Japanese audio for:', text);
    try {
      // If we have preloaded audio, play it immediately
      if (preloadedAudio) {
        console.log('Playing preloaded audio');
        await playAudio(preloadedAudio);
        console.log('Preloaded audio played successfully');
        return;
      }
      
      console.log('No preloaded audio, generating on demand...');
      // Fallback to generating audio on demand
      await speakText(text, {
        languageCode: 'ja-JP',
        voiceName: 'ja-JP-Chirp3-HD-Leda',
        autoPlay: true
      });
      console.log('On-demand audio succeeded');
    } catch (error) {
      console.error('Audio playback failed:', error);
      console.log('Falling back to Web Speech API...');
      // Fallback to Web Speech API if TTS fails
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
        console.log('Web Speech API fallback used');
      }
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;
    
    const correct = selectedAnswer === currentItem.meaning;
    setIsCorrect(correct);
    setShowResult(true);
    
    // Play Japanese audio for the correct answer using Google TTS
    const audioText = currentItem.reading || currentItem.character;
    playJapaneseAudio(audioText);
    
    if (correct) {
      setScore(score + 1);
      // Update review system for correct answer
      ReviewSystem.updateItemProgress(currentItem.id, currentItem.type, true);
    } else {
      // Record wrong answer
      const wrongAnswer: WrongAnswer = {
        id: currentItem.id,
        character: currentItem.character,
        meaning: currentItem.meaning,
        reading: currentItem.reading,
        userAnswer: selectedAnswer,
        correctAnswer: currentItem.meaning,
        type: currentItem.type
      };
      setWrongAnswers([...wrongAnswers, wrongAnswer]);
      // Update review system for incorrect answer
      ReviewSystem.updateItemProgress(currentItem.id, currentItem.type, false);
    }
    
    // Auto-advance after 2 seconds
    setTimeout(() => {
      handleNext();
    }, 2000);
  };

  const handleNext = () => {
    if (currentIndex < trainingItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(null);
      setPreloadedAudio(null); // Clear preloaded audio for next question
    } else {
      // Training complete - show completion screen
      setShowCompletion(true);
      
      // Calculate and save XP
      const correctAnswers = score;
      const baseXP = correctAnswers * 10;
      const bonusXP = trainingItems.length * 5;
      const totalXP = baseXP + bonusXP;
      
      const currentXP = parseInt(localStorage.getItem('userXP') || '0');
      const newXP = currentXP + totalXP;
      localStorage.setItem('userXP', newXP.toString());
      
      // Record session for streak tracking
      StreakSystem.recordSession();
      
      setEarnedXP(totalXP);
    }
  };

  const handleClose = () => {
    router.push('/');
  };

  const handleSettings = () => {
    // TODO: Implement settings modal
    console.log('Settings clicked');
  };

  const handlePracticeMissed = () => {
    // Create a new training session with only wrong answers
    const missedIds = wrongAnswers.map(answer => answer.id).join(',');
    const type = wrongAnswers[0]?.type || 'vocabulary';
    router.push(`/match?type=${type}&items=${missedIds}`);
  };

  const handleGoHome = () => {
    router.push('/');
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
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
        {/* Large Kanji/Character - Not in container */}
        <div className="text-center mb-12">
          <div className="text-[10rem] sm:text-9xl md:text-[12rem] lg:text-[14rem] font-bold text-gray-900 font-japanese leading-none mb-4">
            {currentItem.character}
          </div>
          {currentItem.reading && (
            <p className="text-2xl sm:text-3xl text-gray-600 font-japanese">
              {currentItem.reading}
            </p>
          )}
        </div>

        {/* Answer Buttons - Two columns */}
        <div className="w-full max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            {shuffledOptions.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectAnswer = option === currentItem.meaning;
              
              let buttonClass = "w-full p-6 text-center text-lg font-semibold rounded-lg transition-all duration-200 border-2 border-black ";
              
              if (!showResult) {
                if (isSelected) {
                  buttonClass += "bg-blue-100 text-blue-800 shadow-md";
                } else {
                  buttonClass += "bg-white hover:bg-gray-50 text-gray-800 shadow-sm hover:shadow-md cursor-pointer";
                }
              } else {
                if (isSelected && isCorrectAnswer) {
                  buttonClass += "bg-green-100 text-green-800";
                } else if (isSelected && !isCorrectAnswer) {
                  buttonClass += "bg-red-100 text-red-800";
                } else if (isCorrectAnswer) {
                  buttonClass += "bg-green-100 text-green-800";
                } else {
                  buttonClass += "bg-gray-100 text-gray-500";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={buttonClass}
                  disabled={showResult}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Result Feedback */}
        {showResult && (
          <div className="mt-8 text-center">
            {isCorrect ? (
              <div className="text-green-600">
                <div className="text-5xl mb-2">✓</div>
                <p className="text-xl font-semibold">Correct!</p>
              </div>
            ) : (
              <div className="text-red-600">
                <div className="text-5xl mb-2">✗</div>
                <p className="text-xl font-semibold">
                  The answer is "{currentItem.meaning}"
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Row with Rocket Icon and Check Answer Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Rocket Icon and text on the left */}
          <div className="flex items-center space-x-3">
            <img 
              src="/6110736_rocket_spaceship_icon (2).png" 
              alt="Rocket JLPT Logo" 
              className="h-12 w-12"
            />
            <span className="text-lg font-medium text-gray-700">
              Select the Kanji meaning
            </span>
          </div>
          
          {/* Button on the right */}
          <div className="flex-shrink-0">
            {!showResult ? (
              <button
                onClick={handleCheckAnswer}
                disabled={!selectedAnswer}
                className={`py-4 px-12 rounded-lg font-semibold text-lg transition-all duration-200 border-b-4 border-black ${
                  selectedAnswer
                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                CHECK
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="py-4 px-12 rounded-lg font-semibold text-lg bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 border-b-4 border-black"
              >
                {currentIndex < trainingItems.length - 1 ? 'CONTINUE' : 'FINISH'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}