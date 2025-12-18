'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Volume2, RotateCcw, ArrowRight, CheckCircle, X } from 'lucide-react';
import TrainingHeader from '@/components/TrainingHeader';
import QuitConfirmationModal from '@/components/QuitConfirmationModal';
import { ReviewSystemSupabase } from '@/lib/reviewSystemSupabase';
import { StreakSystem } from '@/lib/streakSystem';

interface TypingItem {
  id: string;
  character: string;
  romaji: string;
  meaning?: string;
  primary_reading?: string;
  primary_meaning?: string;
  type: 'hiragana' | 'katakana' | 'vocabulary' | 'kanji';
}

function TypingTrainingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [items, setItems] = useState<TypingItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [totalXP, setTotalXP] = useState(0);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const audioCacheRef = useRef<Record<string, string>>({});

  const trainingType = searchParams.get('type') || 'hiragana';
  const itemsParam = searchParams.get('items');
  const currentItem = items[currentIndex];
  const progress = items.length > 0 ? Math.round(((currentIndex + 1) / items.length) * 100) : 0;

  // Load items based on type
  useEffect(() => {
    loadItems();
  }, [trainingType]);

  // Focus input on mount and after each answer
  useEffect(() => {
    if (!showAnswer && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex, showAnswer]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Spacebar to toggle answer - JUST FLIPS, no scoring
      if (e.code === 'Space') {
        e.preventDefault();
        if (!currentItem) return;
        const wasHidden = !showAnswer;
        setShowAnswer(prev => !prev);
        setIsCorrect(null); // Clear any previous correct/incorrect state
        // Play audio immediately when revealing
        if (wasHidden) {
          playAudio(currentItem.character);
        }
      }
      // Right Arrow to go to next card (always works)
      if (e.code === 'ArrowRight') {
        e.preventDefault();
        if (currentIndex < items.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setUserInput('');
          setShowAnswer(false);
          setIsCorrect(null);
        } else {
          setCompleted(true);
        }
      }
      // Left Arrow to go back to previous (always works)
      if (e.code === 'ArrowLeft') {
        e.preventDefault();
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
          setUserInput('');
          setShowAnswer(false);
          setIsCorrect(null);
        }
      }
      // Enter to continue to next when answer is shown
      if (e.code === 'Enter' && showAnswer) {
        e.preventDefault();
        if (currentIndex < items.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setUserInput('');
          setShowAnswer(false);
          setIsCorrect(null);
        } else {
          setCompleted(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAnswer, currentItem, currentIndex, items.length]);

  const loadItems = () => {
    // Load items from URL parameter if provided
    if (itemsParam) {
      try {
        const parsedItems = JSON.parse(decodeURIComponent(itemsParam));
        setItems(parsedItems);
        return;
      } catch (error) {
        console.error('Failed to parse items:', error);
      }
    }

    // Mock data for now - replace with actual data loading
    if (trainingType === 'hiragana') {
      const hiraganaItems: TypingItem[] = [
        { id: '1', character: 'あ', romaji: 'a', type: 'hiragana' },
        { id: '2', character: 'い', romaji: 'i', type: 'hiragana' },
        { id: '3', character: 'う', romaji: 'u', type: 'hiragana' },
        { id: '4', character: 'え', romaji: 'e', type: 'hiragana' },
        { id: '5', character: 'お', romaji: 'o', type: 'hiragana' },
      ];
      setItems(hiraganaItems);
    } else if (trainingType === 'katakana') {
      const katakanaItems: TypingItem[] = [
        { id: '1', character: 'ア', romaji: 'a', type: 'katakana' },
        { id: '2', character: 'イ', romaji: 'i', type: 'katakana' },
        { id: '3', character: 'ウ', romaji: 'u', type: 'katakana' },
        { id: '4', character: 'エ', romaji: 'e', type: 'katakana' },
        { id: '5', character: 'オ', romaji: 'o', type: 'katakana' },
      ];
      setItems(katakanaItems);
    } else if (trainingType === 'vocabulary') {
      const vocabItems: TypingItem[] = [
        { id: '1', character: 'きょう', romaji: 'kyou', meaning: 'today', type: 'vocabulary' },
        { id: '2', character: 'あした', romaji: 'ashita', meaning: 'tomorrow', type: 'vocabulary' },
        { id: '3', character: 'きのう', romaji: 'kinou', meaning: 'yesterday', type: 'vocabulary' },
      ];
      setItems(vocabItems);
    } else if (trainingType === 'kanji') {
      const kanjiItems: TypingItem[] = [
        { id: '1', character: '一', romaji: 'ichi', meaning: 'one', type: 'kanji' },
        { id: '2', character: '水', romaji: 'mizu', meaning: 'water', type: 'kanji' },
        { id: '3', character: '日', romaji: 'hi', meaning: 'day, sun', type: 'kanji' },
      ];
      setItems(kanjiItems);
    }
  };

  // Get pre-generated audio file path for hiragana and kanji
  // For kanji, we use the character code since audio files are named by the kanji character code
  // The audio files contain the primary_reading pronunciation
  const getAudioPath = (character: string, type: string) => {
    if (type === 'hiragana') {
      // Use pre-generated audio files for hiragana
      const charCode = character.charCodeAt(0);
      return `/audio/hiragana/${charCode}.mp3`;
    }
    if (type === 'kanji') {
      // Use pre-generated audio files for kanji (contains primary_reading audio)
      const charCode = character.charCodeAt(0);
      return `/audio/kanji/${charCode}.mp3`;
    }
    // For other types, return null (will use API)
    return null;
  };

  // Preload audio for all items
  const preloadAudio = async (text: string, type: string) => {
    if (audioCacheRef.current[text]) {
      console.log('Already cached:', text);
      return audioCacheRef.current[text];
    }
    
    // Check if we have pre-generated audio
    const preGeneratedPath = getAudioPath(text, type);
    if (preGeneratedPath) {
      // Actually preload the audio file into browser cache
      const audio = new Audio(preGeneratedPath);
      audio.preload = 'auto';
      audio.load();
      
      audioCacheRef.current[text] = preGeneratedPath;
      console.log('Using pre-generated audio for:', text);
      return preGeneratedPath;
    }
    
    // Fallback to API for non-hiragana
    try {
      console.log('Fetching audio from API for:', text);
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          languageCode: 'ja-JP',
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('TTS API error:', response.status, errorData);
        return null;
      }
      
      const data = await response.json();
      if (data.audioUrl) {
        audioCacheRef.current[text] = data.audioUrl;
        console.log('Cached audio for:', text);
        return data.audioUrl;
      } else if (data.error) {
        console.error('TTS API returned error:', data.error, data.details);
      }
    } catch (error) {
      console.error('Preload failed for', text, ':', error);
    }
    return null;
  };

  // Preload all audio when items load
  useEffect(() => {
    const preloadAll = async () => {
      if (items.length > 0) {
        console.log('Preloading audio for', items.length, 'items...');
        const promises = items.map(item => preloadAudio(item.character, item.type));
        await Promise.all(promises);
        console.log('All audio preloaded!');
      }
    };
    preloadAll();
  }, [items, trainingType]);

  const playAudio = (text: string) => {
    try {
      console.log('playAudio called for:', text);
      console.log('Current cache:', Object.keys(audioCacheRef.current));
      
      // Use cached audio if available
      const audioUrl = audioCacheRef.current[text];
      
      if (!audioUrl) {
        console.error('Audio not in cache for:', text);
        return;
      }
      
      console.log('Playing from cache:', text);
      console.log('Audio URL:', audioUrl);
      console.log('Is pre-generated file?', audioUrl.startsWith('/audio/'));
      
      const audio = new Audio(audioUrl);
      audio.volume = 1.0;
      audio.preload = 'auto';
      
      // Wait for audio to be loaded before playing
      audio.addEventListener('canplaythrough', () => {
        audio.play().then(() => {
          console.log('Audio played successfully');
        }).catch(err => {
          console.error('Audio play failed:', err);
        });
      }, { once: true });
      
      // Trigger load
      audio.load();
    } catch (error) {
      console.error('TTS failed:', error);
    }
  };

  // Removed useEffect for audio - now plays immediately

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentItem) return;

    // Use romaji for answer comparison (user types in romaji)
    // Remove dots from romaji (e.g., "maru.i" -> "marui") since dots indicate okurigana boundaries
    const expectedAnswer = currentItem.romaji.replace(/\./g, '');
    const correct = userInput.toLowerCase().trim() === expectedAnswer.toLowerCase();
    setIsCorrect(correct);
    setShowAnswer(true);

    // Play sound effect
    if (correct) {
      const correctSound = new Audio('/sounds/new-notification-07-210334.mp3');
      correctSound.play().catch(err => console.log('Sound play failed:', err));
      setScore(score + 1);
      setTotalXP(totalXP + 10);
    } else {
      const incorrectSound = new Audio('/sounds/notification-off-269282 (1).mp3');
      incorrectSound.play().catch(err => console.log('Sound play failed:', err));
    }

    // Play audio immediately
    playAudio(currentItem.character);
  };

  const handleToggleAnswer = () => {
    if (!currentItem) return;
    
    if (!showAnswer) {
      // Reveal answer - use romaji for comparison (user types in romaji)
      // Remove dots from romaji (e.g., "maru.i" -> "marui")
      const expectedAnswer = currentItem.romaji.replace(/\./g, '');
      const correct = userInput.toLowerCase().trim() === expectedAnswer.toLowerCase();
      setIsCorrect(correct);
      setShowAnswer(true);
      if (correct) {
        setScore(score + 1);
        setTotalXP(totalXP + 10);
      }
      // Play audio immediately when revealing
      playAudio(currentItem.character);
    } else {
      // Hide answer
      setShowAnswer(false);
      setIsCorrect(null);
    }
  };

  const handleNext = async () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserInput('');
      setShowAnswer(false);
      setIsCorrect(null);
    } else {
      // Training complete
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserInput('');
    setShowAnswer(false);
    setIsCorrect(null);
    setScore(0);
    setTotalXP(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <TrainingHeader
          progress={100}
          closeHref="/roadmap"
        />
        
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Great Work!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              You completed the typing practice
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {score}/{items.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Correct</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-1">
                  +{totalXP} XP
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Earned</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleRestart}
                className="flex-1 px-6 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
              >
                <RotateCcw className="h-5 w-5 inline mr-2" />
                Practice Again
              </button>
              <button
                onClick={() => router.push('/roadmap')}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all"
              >
                Continue
                <ArrowRight className="h-5 w-5 inline ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentItem) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  const accuracy = items.length > 0 ? Math.round((score / (currentIndex + (showAnswer ? 1 : 0))) * 100) || 0 : 0;

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
              <div className="text-base font-bold text-gray-900 dark:text-white">{score}/{currentIndex + (showAnswer ? 1 : 0)}</div>
            </div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">Cards</div>
              <div className="text-base font-bold text-gray-900 dark:text-white">{currentIndex + (showAnswer ? 1 : 0)}/{items.length}</div>
            </div>
          </div>
        }
      />

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl flex flex-col" style={{ minHeight: 'calc(100vh - 80px)' }}>
          {/* Character Display - Massive and Centered */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              {/* Show character (kanji, hiragana, katakana, or vocabulary word) */}
              <div className={`transition-all leading-none ${
                showAnswer 
                  ? isCorrect 
                    ? 'text-gray-300 dark:text-gray-700' 
                    : 'text-gray-900 dark:text-white'
                  : 'text-gray-900 dark:text-white'
              }`} style={{ fontSize: 'clamp(6rem, 18vw, 11rem)', fontWeight: 700 }}>
                {currentItem.character}
              </div>
              
              {/* Show meaning as hint (for kanji and vocabulary) - use primary_meaning for kanji */}
              {(currentItem.primary_meaning || currentItem.meaning) && !showAnswer && (
                <div className="text-xl text-gray-400 dark:text-gray-500 mt-6">
                  {currentItem.primary_meaning || currentItem.meaning?.split(',')[0]}
                </div>
              )}

              {/* Show answer (romaji) when revealed - remove dots */}
              {showAnswer && (
                <div className={`text-4xl font-normal mt-6 ${
                  isCorrect 
                    ? 'text-gray-400 dark:text-gray-600' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {currentItem.romaji.replace(/\./g, '')}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Section - Input Only */}
          <div className="pb-12 flex flex-col items-center">
            {/* Input Section */}
            <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  readOnly={showAnswer}
                  placeholder="type phonetic english..."
                  className="w-full px-8 py-4 text-xl font-medium rounded-lg border-2 bg-white dark:bg-gray-800 transition-all text-center focus:outline-none border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-pink-400 dark:focus:border-pink-500 focus:ring-2 focus:ring-pink-100 dark:focus:ring-pink-900/30 shadow-sm"
                />
                {isCorrect === true && (
                  <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-2 text-green-600 dark:text-green-400 text-xl font-bold">
                    <CheckCircle className="h-6 w-6" />
                    <span>Correct!</span>
                  </div>
                )}
                {isCorrect === false && (
                  <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-2 text-red-600 dark:text-red-400 text-xl font-bold">
                    <X className="h-6 w-6" />
                    <span>Incorrect</span>
                  </div>
                )}
              </div>

              {!showAnswer ? (
                <button
                  type="submit"
                  disabled={!userInput.trim()}
                  className="w-full mt-12 px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:text-gray-300 dark:disabled:text-gray-700 transition-all disabled:cursor-not-allowed"
                >
                  Reveal Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full mt-12 px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all"
                >
                  {currentIndex < items.length - 1 ? 'Hide Answer' : 'Finish'}
                </button>
              )}
            </form>
            
            {/* Hotkey Hints */}
            <div className="flex items-center justify-center gap-6 mt-8 text-xs text-gray-400 dark:text-gray-600">
              <div className="flex items-center gap-1.5">
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-gray-700 dark:text-gray-400 font-mono">Space</kbd>
                <span>flip card</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-gray-700 dark:text-gray-400 font-mono">←</kbd>
                <span>previous</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-gray-700 dark:text-gray-400 font-mono">→</kbd>
                <span>next</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-gray-700 dark:text-gray-400 font-mono">Enter</kbd>
                <span>{showAnswer ? 'next' : 'submit'}</span>
              </div>
            </div>
          </div>
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

export default function TypingTrainingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    }>
      <TypingTrainingContent />
    </Suspense>
  );
}
