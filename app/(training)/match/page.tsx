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
import { getKanjiByLevel, getVocabularyByLevel, getSentencesByLevel } from '@/lib/supabase-data';
import type { JLPTLevel } from '@/lib/supabase-data';

interface TrainingItem {
  id: string;
  character: string;
  meaning: string;
  reading?: string;
  primary_reading?: string;
  primary_meaning?: string;
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
  const [itemQueue, setItemQueue] = useState<TrainingItem[]>([]);
  const [seenCount, setSeenCount] = useState(0);
  const [preloadedAudio, setPreloadedAudio] = useState<string | null>(null);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [correctlyAnsweredIds, setCorrectlyAnsweredIds] = useState<Set<string>>(new Set());
  
  const { speak, playAudio } = useTTS();

  // Load selected items from URL parameters
  useEffect(() => {
    const fetchTrainingItems = async () => {
      // Check if this is a review session
      const mode = searchParams.get('mode');
      const isReviewMode = mode === 'review';
      
      let type: string | null = null;
      let itemIds: string[] = [];
      
      if (isReviewMode) {
        // Review mode: get ids and types from review page
        const reviewIds = searchParams.get('ids')?.split(',') || [];
        const reviewTypes = searchParams.get('types')?.split(',') || [];
        
        // For now, handle mixed types by taking the first type
        // TODO: Support mixed type training sessions
        type = reviewTypes[0] || null;
        itemIds = reviewIds;
      } else {
        // Normal training mode
        type = searchParams.get('type');
        itemIds = searchParams.get('items')?.split(',') || [];
      }
      
      if (type && itemIds.length > 0) {
        let selectedItems: TrainingItem[] = [];
        
        if (isReviewMode) {
          // Review mode: fetch actual content from database for each item
          const reviewIds = searchParams.get('ids')?.split(',') || [];
          const reviewTypes = searchParams.get('types')?.split(',') || [];
          
          // Group items by type
          const kanjiIds: string[] = [];
          const vocabIds: string[] = [];
          const sentenceIds: string[] = [];
          
          reviewIds.forEach((id, index) => {
            const itemType = reviewTypes[index];
            if (itemType === 'kanji') kanjiIds.push(id);
            else if (itemType === 'vocabulary') vocabIds.push(id);
            else if (itemType === 'sentences') sentenceIds.push(id);
          });
          
          const levels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
          
          // Fetch kanji data
          if (kanjiIds.length > 0) {
            for (const level of levels) {
              const kanjiData = await getKanjiByLevel(level);
              for (const kanji of kanjiData) {
                if (kanjiIds.includes(kanji.id)) {
                  selectedItems.push({
                    id: kanji.id,
                    character: kanji.character,
                    meaning: kanji.meaning,
                    type: 'kanji'
                  });
                }
              }
            }
          }
          
          // Fetch vocabulary data
          if (vocabIds.length > 0) {
            for (const level of levels) {
              const vocabData = await getVocabularyByLevel(level);
              for (const vocab of vocabData) {
                if (vocabIds.includes(vocab.id)) {
                  selectedItems.push({
                    id: vocab.id,
                    character: vocab.word,
                    meaning: vocab.meaning,
                    reading: vocab.reading,
                    type: 'vocabulary'
                  });
                }
              }
            }
          }
          
          // Fetch sentence data
          if (sentenceIds.length > 0) {
            for (const level of levels) {
              const sentenceData = await getSentencesByLevel(level);
              for (const sentence of sentenceData) {
                if (sentenceIds.includes(sentence.id)) {
                  selectedItems.push({
                    id: sentence.id,
                    character: sentence.japanese_text,
                    meaning: sentence.english_translation,
                    type: 'sentences'
                  });
                }
              }
            }
          }
        } else if (type === 'vocabulary') {
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
                character: item.kanji || item.character, // Support both 'kanji' (from kanji page) and 'character' (from roadmap)
                meaning: item.meaning,
                primary_reading: item.primary_reading,
                primary_meaning: item.primary_meaning,
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
                  primary_reading: (item as any).primary_reading,
                  primary_meaning: (item as any).primary_meaning,
                  type: 'kanji' as const
                }));
            } catch (error) {
              console.error('Failed to fetch kanji from Supabase:', error);
            }
          }
        }
        
        const items = selectedItems.length > 0 ? selectedItems : sampleItems;
        setTrainingItems(items);
        setItemQueue(items);
      } else {
        // Fallback to sample items if no selection
        setTrainingItems(sampleItems);
        setItemQueue(sampleItems);
      }
    };

    fetchTrainingItems();
  }, [searchParams]);

  const currentItem = itemQueue[0];
  const isComplete = itemQueue.length === 0;

  useEffect(() => {
    if (currentItem && trainingItems.length > 0) {
      // Create options: correct answer + 3 random wrong answers
      // Use primary_meaning for kanji (single word), fall back to first meaning
      const getDisplayMeaning = (item: TrainingItem) => {
        if (item.primary_meaning) return item.primary_meaning;
        return item.meaning?.split(',')[0]?.trim() || item.meaning;
      };
      
      const correctAnswer = getDisplayMeaning(currentItem);
      
      // Get wrong answers from training items and sample items
      const allMeanings = [
        ...trainingItems.map(item => getDisplayMeaning(item)),
        ...sampleItems.map(item => getDisplayMeaning(item))
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
      // For kanji, use pre-generated audio files based on character code
      if (currentItem.type === 'kanji') {
        const charCode = currentItem.character.charCodeAt(0);
        const audioPath = `/audio/kanji/${charCode}.mp3`;
        setPreloadedAudio(audioPath);
        // Preload the audio file
        const audio = new Audio(audioPath);
        audio.preload = 'auto';
        audio.load();
        console.log('Preloaded kanji audio:', audioPath);
        return;
      }
      
      // For vocabulary, use TTS API
      const audioText = currentItem.reading || currentItem.character;
      try {
        console.log('Preloading audio for:', audioText);
        const audioUrl = await speak(audioText, {
          languageCode: 'ja-JP',
          voiceName: 'ja-JP-Chirp3-HD-Leda',
          autoPlay: false
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
      // If we have preloaded audio (either file path or data URL), play it
      if (preloadedAudio) {
        console.log('Playing preloaded audio:', preloadedAudio);
        // Check if it's a file path (starts with /) or data URL
        if (preloadedAudio.startsWith('/audio/')) {
          const audio = new Audio(preloadedAudio);
          audio.volume = 1.0;
          await audio.play();
          console.log('Preloaded file audio played successfully');
        } else {
          await playAudio(preloadedAudio);
          console.log('Preloaded TTS audio played successfully');
        }
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
    
    // Auto-submit the answer after a brief delay
    setTimeout(() => {
      handleCheckAnswer(answer);
    }, 300);
  };

  const handleCheckAnswer = async (answer?: string) => {
    const answerToCheck = answer || selectedAnswer;
    if (!answerToCheck) return;
    
    // Use primary_meaning for comparison (same as options generation)
    const correctMeaning = currentItem.primary_meaning || currentItem.meaning?.split(',')[0]?.trim() || currentItem.meaning;
    const correct = answerToCheck === correctMeaning;
    setIsCorrect(correct);
    setShowResult(true);
    
    setSeenCount(seenCount + 1);
    
    if (correct) {
      // Play correct answer sound
      playCorrectSound();
      
      // Play Japanese audio after a small delay if voice is enabled
      if (shouldPlayVoice()) {
        const audioText = currentItem.primary_reading || currentItem.reading || currentItem.character;
        setTimeout(() => {
          playJapaneseAudio(audioText);
        }, 300);
      }
      
      setScore(score + 1);
      
      // Mark this item as correctly answered
      setCorrectlyAnsweredIds(prev => {
        const newSet = new Set(prev);
        newSet.add(currentItem.id);
        return newSet;
      });
      
      // Update review system for correct answer
      await ReviewSystemSupabase.updateItemProgress(currentItem.id, currentItem.type, true, currentItem);
      
      // Check if all original items have been answered correctly
      const allAnsweredCorrectly = trainingItems.every(item => 
        correctlyAnsweredIds.has(item.id) || item.id === currentItem.id
      );
      
      // Auto-advance to next question after 1.5 seconds for correct answers (but not if all items done)
      if (!allAnsweredCorrectly) {
        setTimeout(() => {
          handleNext();
        }, 1500);
      }
    } else {
      // Play Japanese audio immediately for incorrect answers if voice is enabled
      if (shouldPlayVoice()) {
        const audioText = currentItem.primary_reading || currentItem.reading || currentItem.character;
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
        userAnswer: answerToCheck,
        correctAnswer: currentItem.meaning,
        type: currentItem.type
      };
      setWrongAnswers([...wrongAnswers, wrongAnswer]);
      // Update review system for incorrect answer
      await ReviewSystemSupabase.updateItemProgress(currentItem.id, currentItem.type, false, currentItem);
      
      // Auto-advance to next question after 2 seconds for incorrect answers (but not on last item)
      if (itemQueue.length > 1) {
        setTimeout(() => {
          handleNext();
        }, 2000);
      }
    }
  };

  const handleNext = () => {
    // Check if all original items have been answered correctly
    const allAnsweredCorrectly = trainingItems.every(item => correctlyAnsweredIds.has(item.id));
    
    if (allAnsweredCorrectly) {
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
      return;
    }
    
    // Remove current item from queue
    const newQueue = itemQueue.slice(1);
    
    // If answer was incorrect, re-queue the item (Anki-style)
    if (!isCorrect && currentItem) {
      const insertPosition = Math.min(Math.floor(Math.random() * 3) + 3, newQueue.length);
      newQueue.splice(insertPosition, 0, currentItem);
    }
    
    setItemQueue(newQueue);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(null);
    setPreloadedAudio(null);
  };

  const handleClose = () => {
    setShowQuitModal(true);
  };

  const handleKeepLearning = () => {
    setShowQuitModal(false);
  };

  const handleQuit = () => {
    setShowQuitModal(false);
    router.push('/roadmap');
  };



  const handlePracticeMissed = () => {
    // Create a new training session with only wrong answers
    const missedIds = wrongAnswers.map(answer => answer.id).join(',');
    const type = wrongAnswers[0]?.type || 'vocabulary';
    router.push(`/match?type=${type}&items=${missedIds}`);
  };

  const handleGoHome = () => {
    router.push('/roadmap');
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading training items...</p>
        </div>
      </div>
    );
  }

  // Calculate progress based on seen items (not just completed)
  const totalCompleted = seenCount;
  const progress = trainingItems.length > 0 ? (totalCompleted / trainingItems.length) * 100 : 0;
  const accuracy = totalCompleted > 0 ? Math.round((score / totalCompleted) * 100) : 0;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-24 pt-8 space-y-8">
        {/* Large Kanji/Character - Not in container */}
        <div className="text-center mb-12">
          <div className="text-[10rem] sm:text-9xl md:text-[12rem] lg:text-[14rem] font-bold font-japanese leading-none mb-4 text-gray-900 dark:text-white">
            {currentItem.character}
          </div>
          {currentItem.reading && (
            <p className="text-2xl sm:text-3xl text-gray-600 dark:text-gray-300 font-japanese">
              {currentItem.reading}
            </p>
          )}
        </div>

        {/* Answer Buttons - Two columns */}
        <div className="w-full max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            {shuffledOptions.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const correctMeaning = currentItem.primary_meaning || currentItem.meaning?.split(',')[0]?.trim() || currentItem.meaning;
              const isCorrectAnswer = option === correctMeaning;
              
              let buttonClass = "w-full p-4 text-center text-base font-semibold rounded-lg transition-all duration-200 border-2 border-black ";
              
              if (!showResult) {
                if (isSelected) {
                  buttonClass += "bg-gradient-to-r from-pink-100 to-orange-100 text-pink-700 shadow-md";
                } else {
                  buttonClass += "bg-white dark:bg-gray-800 hover:bg-pink-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm hover:shadow-md cursor-pointer";
                }
              } else {
                if (isSelected && isCorrectAnswer) {
                  buttonClass += "bg-emerald-50 text-emerald-700";
                } else if (isSelected && !isCorrectAnswer) {
                  buttonClass += "bg-red-50 text-red-600";
                } else if (isCorrectAnswer) {
                  buttonClass += "bg-emerald-50 text-emerald-700";
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
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded flex items-center justify-center">
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

      {/* Bottom Row with Finish Button - Show when all items answered correctly */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
        <div className="max-w-2xl mx-auto flex justify-center">
          {showResult && isCorrect && trainingItems.every(item => 
            correctlyAnsweredIds.has(item.id) || item.id === currentItem.id
          ) && (
            <button
              onClick={handleNext}
              className="py-4 px-32 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white"
            >
              FINISH
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
    <Suspense fallback={<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">Loading...</div>}>
      <MatchPageContent />
    </Suspense>
  );
}