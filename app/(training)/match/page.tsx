'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TrainingHeader from '@/components/TrainingHeader';
import MatchCompletionScreen from '@/components/MatchCompletionScreen';
import QuitConfirmationModal from '@/components/QuitConfirmationModal';
import { ReviewSystem } from '@/lib/reviewSystem';
import { StreakSystem } from '@/lib/streakSystem';
import { speakText, useTTS } from '@/lib/useTTS';
import { playIncorrectSound, playCorrectSound, shouldPlayVoice, playButtonClickSound } from '@/lib/audioUtils';
import { getKanjiByLevel, getVocabularyByLevel } from '@/lib/supabase-data';
import type { JLPTLevel } from '@/lib/supabase-data';

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

// Sample fallback data
const sampleItems: TrainingItem[] = [
  { id: '1', character: '学校', meaning: 'school', reading: 'がっこう', type: 'vocabulary' },
  { id: '2', character: '友達', meaning: 'friend', reading: 'ともだち', type: 'vocabulary' },
  { id: '3', character: '勉強', meaning: 'study', reading: 'べんきょう', type: 'vocabulary' },
  { id: '4', character: '学', meaning: 'study, learning', type: 'kanji' },
  { id: '5', character: '友', meaning: 'friend', type: 'kanji' },
  { id: '6', character: '本', meaning: 'book', type: 'kanji' },
  { id: '7', character: '水', meaning: 'water', type: 'kanji' },
  { id: '8', character: '火', meaning: 'fire', type: 'kanji' },
];

function MatchPageContent() {
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
  const [showQuitModal, setShowQuitModal] = useState(false);
  
  const { speak, playAudio } = useTTS();

  // Load selected items from URL parameters
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
              // Clear the stored data after use
              localStorage.removeItem('selectedVocabularyData');
            } catch (error) {
              console.error('Failed to parse stored vocabulary data:', error);
            }
          }
          
          // If localStorage failed, fetch from Supabase
          if (selectedItems.length === 0) {
            try {
              const allVocabData = await getVocabularyByLevel('N5' as JLPTLevel); // Default to N5, could be improved
              selectedItems = allVocabData
                .filter(item => itemIds.includes(item.id))
                .map(item => ({
                  id: item.id,
                  character: item.word,
                  meaning: item.meaning,
                  reading: item.reading,
                  type: 'vocabulary' as const
                }));
            } catch (error) {
              console.error('Failed to fetch vocabulary from Supabase:', error);
            }
          }
        } else if (type === 'kanji') {
          // Try to get kanji data from localStorage first (passed from kanji page)
          const storedKanjiData = localStorage.getItem('selectedKanjiData');
          if (storedKanjiData) {
            try {
              const parsedKanjiData = JSON.parse(storedKanjiData);
              selectedItems = parsedKanjiData.map((item: any) => ({
                id: item.id,
                character: item.kanji, // Fix: use 'kanji' property, not 'character'
                meaning: item.meaning,
                type: 'kanji' as const
              }));
              localStorage.removeItem('selectedKanjiData'); // Clear localStorage immediately
            } catch (error) {
              console.error('Failed to parse stored kanji data:', error);
            }
          } else {
            console.log('No stored kanji data found in localStorage');
          }
          
          // If localStorage failed, fetch from Supabase
          if (selectedItems.length === 0) {
            try {
              const allKanjiData = await getKanjiByLevel('N5' as JLPTLevel); // Default to N5, could be improved
              selectedItems = allKanjiData
                .filter(item => itemIds.includes(item.id))
                .map(item => ({
                  id: item.id,
                  character: item.character,
                  meaning: item.meaning,
                  type: 'kanji' as const
                }));
            } catch (error) {
              console.error('Failed to fetch kanji from Supabase:', error);
            }
          }
        }
        
        setTrainingItems(selectedItems.length > 0 ? selectedItems : sampleItems);
      } else {
        // Fallback to sample items if no selection
        setTrainingItems(sampleItems);
      }
    };

    fetchTrainingItems();
  }, [searchParams]);

  const currentItem = trainingItems[currentIndex];
  const isComplete = currentIndex >= trainingItems.length;
  const progress = trainingItems.length > 0 ? ((currentIndex + 1) / trainingItems.length) * 100 : 0;

  useEffect(() => {
    if (currentItem && trainingItems.length > 0) {
      // Create options: correct answer + 3 random wrong answers
      const correctAnswer = currentItem.meaning;
      
      // Get wrong answers from training items and sample items
      const allMeanings = [
        ...trainingItems.map(item => item.meaning),
        ...sampleItems.map(item => item.meaning)
      ];
      
      const wrongAnswers = allMeanings
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
    playButtonClickSound();
    setSelectedAnswer(answer);
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;
    
    const correct = selectedAnswer === currentItem.meaning;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      // Play correct answer sound
      playCorrectSound();
      
      // Play Japanese audio after a small delay if voice is enabled
      if (shouldPlayVoice()) {
        const audioText = currentItem.reading || currentItem.character;
        setTimeout(() => {
          playJapaneseAudio(audioText);
        }, 300);
      }
      
      setScore(score + 1);
      // Update review system for correct answer
      ReviewSystem.updateItemProgress(currentItem.id, currentItem.type, true);
    } else {
      // Play Japanese audio immediately for incorrect answers if voice is enabled
      if (shouldPlayVoice()) {
        const audioText = currentItem.reading || currentItem.character;
        playJapaneseAudio(audioText);
      }
      
      // Play incorrect answer sound
      playIncorrectSound();
      
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
    setShowQuitModal(true);
  };

  const handleKeepLearning = () => {
    setShowQuitModal(false);
  };

  const handleQuit = () => {
    setShowQuitModal(false);
    // Navigate back to the original page based on the training type
    const type = searchParams.get('type');
    if (type === 'vocabulary') {
      router.push('/vocabulary');
    } else if (type === 'kanji') {
      router.push('/kanji');
    } else if (type === 'sentences') {
      router.push('/sentences');
    } else {
      // Fallback to home page if type is unknown
      router.push('/');
    }
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
    <div className="min-h-screen bg-white flex flex-col">
      <TrainingHeader 
        progress={(currentIndex / trainingItems.length) * 100}
        onClose={handleClose}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-24 pt-8 space-y-8">
        {/* Large Kanji/Character - Not in container */}
        <div className="text-center mb-12">
          <div className="text-[10rem] sm:text-9xl md:text-[12rem] lg:text-[14rem] font-bold font-japanese leading-none mb-4" style={{ color: '#333333' }}>
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
              
              let buttonClass = "w-full p-4 text-center text-base font-semibold rounded-lg transition-all duration-200 border-2 border-gray-300 ";
              
              if (!showResult) {
                if (isSelected) {
                  buttonClass += "bg-blue-100 text-blue-800 shadow-md";
                } else {
                  buttonClass += "bg-white hover:bg-gray-50 text-gray-800 shadow-sm hover:shadow-md cursor-pointer";
                }
              } else {
                if (isSelected && isCorrectAnswer) {
                  buttonClass += "bg-green-100 text-green-600";
                } else if (isSelected && !isCorrectAnswer) {
                  buttonClass += "bg-red-100 text-red-600";
                } else if (isCorrectAnswer) {
                  buttonClass += "bg-green-100 text-green-600";
                } else {
                  buttonClass += "bg-gray-100 text-gray-500";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`${buttonClass} relative`}
                  disabled={showResult}
                >
                  {option}
                  {showResult && isCorrectAnswer && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  )}
                  {showResult && isSelected && !isCorrectAnswer && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✗</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>


      </div>

      {/* Bottom Row with Centered Check Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
        <div className="max-w-2xl mx-auto flex justify-center">
          {!showResult ? (
            <button
              onClick={handleCheckAnswer}
              disabled={!selectedAnswer}
              className={`py-4 px-32 rounded-full font-semibold text-sm transition-all duration-200 border-b-4 border-gray-300 ${
                selectedAnswer
                  ? 'text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              style={selectedAnswer ? { backgroundColor: '#333333' } : {}}
            >
              CHECK
            </button>
          ) : (
            <button
              onClick={handleNext}
              className={`py-4 px-32 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 border-b-4 ${
                isCorrect
                  ? 'bg-green-500 hover:bg-green-600 text-white border-green-700'
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-700 border-gray-500'
              }`}
            >
              {currentIndex < trainingItems.length - 1 ? 'CONTINUE' : 'FINISH'}
            </button>
          )}
        </div>
      </div>

      {/* Quit Confirmation Modal */}
      <QuitConfirmationModal
        isOpen={showQuitModal}
        onKeepLearning={handleKeepLearning}
        onQuit={handleQuit}
      />
    </div>
  );
}

export default function MatchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <MatchPageContent />
    </Suspense>
  );
}