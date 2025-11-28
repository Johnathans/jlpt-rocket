'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Volume2, BookOpen, MessageSquare, X, Home, RotateCcw } from 'lucide-react';
import { ReviewSystem } from '@/lib/reviewSystem';
import { StreakSystem } from '@/lib/streakSystem';
import MatchCompletionScreen from '@/components/MatchCompletionScreen';
import { getSentencesByLevel, SentenceData, JLPTLevel, parseClozeText } from '@/lib/supabase-data';
import { useJLPTLevel } from '@/contexts/JLPTLevelContext';

interface WordInSentence {
  id: number;
  word: string;
  reading: string;
  meaning: string;
  isTarget?: boolean; // Can this word be used as a cloze target?
}

interface SentenceItem {
  id: string;
  words: WordInSentence[];
  fullSentence: string;
  fullReading: string;
  meaning: string;
  level: string;
  context: string;
  contextTranslation: string;
  mastered?: boolean;
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

const ITEMS_PER_PAGE = 50;
const CACHE_DURATION = 1 * 60 * 1000; // 1 minute

// This will be populated from Supabase
let sentencesData: SentenceItem[] = [];

function SentencesPageContent() {
  const searchParams = useSearchParams();
  const { currentLevel } = useJLPTLevel();
  const selectedLevel = searchParams.get('level') || currentLevel;
  
  const [selectedSentences, setSelectedSentences] = useState<Set<string>>(new Set());
  const [masteredSentences, setMasteredSentences] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allSentences, setAllSentences] = useState<SentenceItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTraining, setIsTraining] = useState(false);

  // Calculate paginated data
  const totalPages = Math.ceil(allSentences.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const sentences = allSentences.slice(startIndex, endIndex);

  // Fetch sentences from Supabase with caching
  useEffect(() => {
    const fetchSentences = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check cache first
        const cacheKey = `sentences-${selectedLevel}`;
        const cached = localStorage.getItem(cacheKey);
        const cacheTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);
        
        if (cached && cacheTimestamp) {
          const isExpired = Date.now() - parseInt(cacheTimestamp) > CACHE_DURATION;
          if (!isExpired) {
            console.log('Loading sentences from cache');
            const cachedSentences = JSON.parse(cached);
            setAllSentences(cachedSentences);
            sentencesData = cachedSentences;
            setLoading(false);
            return;
          }
        }
        
        console.log('Fetching sentences from Supabase');
        const supabaseSentences = await getSentencesByLevel(selectedLevel as JLPTLevel);
        console.log(`Fetched ${supabaseSentences.length} sentences for level ${selectedLevel}:`, supabaseSentences);
        
        if (supabaseSentences.length === 0) {
          setError('No sentences found for this level');
          return;
        }
        
        // Transform SentenceData to SentenceItem format for existing UI
        const transformedSentences: SentenceItem[] = supabaseSentences.map((sentence, index) => {
          const parsed = parseClozeText(sentence.japanese_text);
          
          // Create words array - simplified approach for now
          const words: WordInSentence[] = [];
          let wordId = index * 100 + 1;
          
          // For now, create a simple structure with the first cloze word as target
          if (parsed.clozeWords.length > 0) {
            // Add the cloze word as the target
            words.push({
              id: wordId++,
              word: parsed.clozeWords[0],
              reading: '',
              meaning: '',
              isTarget: true
            });
          }
          
          return {
            id: sentence.id,
            words,
            fullSentence: parsed.cleanSentence,
            fullReading: '', // We don't have reading data in Supabase yet
            meaning: sentence.english_translation,
            level: sentence.jlpt_level,
            context: '', // We don't have context data in Supabase yet
            contextTranslation: ''
          };
        });
        
        // Cache the data
        localStorage.setItem(cacheKey, JSON.stringify(transformedSentences));
        localStorage.setItem(`${cacheKey}-timestamp`, Date.now().toString());
        
        setAllSentences(transformedSentences);
        setCurrentPage(1); // Reset to first page when data changes
        // Update the global sentencesData for compatibility
        sentencesData = transformedSentences;
      } catch (err) {
        console.error('Error fetching sentences:', err);
        setError('Failed to load sentences');
      } finally {
        setLoading(false);
      }
    };

    fetchSentences();
    
    // Listen for JLPT level changes
    const handleLevelChange = () => {
      setCurrentPage(1); // Reset to first page when level changes
      fetchSentences();
    };
    
    window.addEventListener('jlpt-level-changed', handleLevelChange);
    return () => window.removeEventListener('jlpt-level-changed', handleLevelChange);
  }, [selectedLevel]);

  // Sync mastery state with ReviewSystem on component mount and when returning from training
  useEffect(() => {
    const syncMasteryState = () => {
      const newMasteredSentences = new Set(masteredSentences);
      let hasChanges = false;

      sentencesData.forEach(item => {
        const progress = ReviewSystem.getItemProgress(item.id, 'sentences');
        const isCurrentlyMastered = masteredSentences.has(item.id);
        const shouldBeMastered = progress.masteryLevel >= 100;

        if (shouldBeMastered && !isCurrentlyMastered) {
          newMasteredSentences.add(item.id);
          hasChanges = true;
          console.log(`[SentencesPage] Auto-mastered sentence ${item.id}`);
        }
      });

      if (hasChanges) {
        setMasteredSentences(newMasteredSentences);
      }
    };

    syncMasteryState();

    // Also sync when the page becomes visible (returning from training)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        syncMasteryState();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', syncMasteryState);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', syncMasteryState);
    };
  }, [masteredSentences]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [trainingItems, setTrainingItems] = useState<SentenceItem[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  const getLevelColor = (level: string) => {
    return 'bg-gray-100 text-gray-900 border-gray-200';
  };

  const playAudio = (sentence: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  const selectAll = () => {
    setSelectedSentences(new Set(sentencesData.map(item => item.id)));
  };

  const clearAll = () => {
    setSelectedSentences(new Set());
  };

  const toggleSelected = (id: string) => {
    setSelectedSentences(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleMastered = (id: string) => {
    const newMastered = new Set(masteredSentences);
    if (newMastered.has(id)) {
      newMastered.delete(id);
      // Reset progress in review system when unmarking as mastered
      ReviewSystem.resetItemProgress(id, 'sentences');
      console.log(`Reset progress for sentence ${id}`);
    } else {
      newMastered.add(id);
      // Set as mastered in review system when marking as mastered
      ReviewSystem.setItemMastered(id, 'sentences');
      console.log(`Set sentence ${id} as mastered`);
    }
    setMasteredSentences(newMastered);
  };

  const startTraining = () => {
    const selectedItems = sentencesData.filter(item => selectedSentences.has(item.id));
    setTrainingItems(selectedItems);
    setIsTraining(true);
    setCurrentIndex(0);
    setScore(0);
    setWrongAnswers([]);
    setShowCompletionScreen(false);
  };

  const getWrongAnswers = (correctWord: WordInSentence, availableWords: WordInSentence[]): string[] => {
    const wrongOptions = availableWords
      .filter(w => w.word !== correctWord.word && w.isTarget)
      .map(w => w.word)
      .slice(0, 3);
    
    // If we don't have enough wrong answers, add some generic ones
    while (wrongOptions.length < 3) {
      const genericOptions = ['です', 'ます', 'した', 'ている', 'から', 'まで', 'について'];
      for (const option of genericOptions) {
        if (!wrongOptions.includes(option) && option !== correctWord.word) {
          wrongOptions.push(option);
          if (wrongOptions.length >= 3) break;
        }
      }
    }
    
    return wrongOptions;
  };

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    
    const currentItem = trainingItems[currentIndex];
    const clozeWord = currentItem.words.find(w => w.isTarget);
    if (!clozeWord) return;
    
    setSelectedAnswer(answer);
    const correct = answer === clozeWord.word;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
    } else {
      // Track wrong answer
      const wrongAnswer: WrongAnswer = {
        id: currentItem.id,
        character: currentItem.fullSentence,
        meaning: currentItem.meaning,
        reading: currentItem.fullReading,
        userAnswer: answer,
        correctAnswer: clozeWord.word,
        type: 'sentences'
      };
      setWrongAnswers(prev => [...prev, wrongAnswer]);
    }

    // Update progress in review system
    ReviewSystem.updateItemProgress(currentItem.id, 'sentences', correct, currentItem);

    // Auto-advance after 1.5 seconds
    setTimeout(() => {
      handleNext();
    }, 1500);
  };

  const handleNext = () => {
    if (currentIndex < trainingItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowResult(false);
    } else {
      // Training complete
      completeTraining();
    }
  };

  const completeTraining = () => {
    // Calculate and save XP
    const baseXP = score * 10;
    const bonusXP = trainingItems.length * 5;
    const totalXP = baseXP + bonusXP;
    
    const currentXP = parseInt(localStorage.getItem('userXP') || '0');
    const newXP = currentXP + totalXP;
    localStorage.setItem('userXP', newXP.toString());
    
    // Record session for streak tracking
    StreakSystem.recordSession();
    
    setEarnedXP(totalXP);
    setShowCompletionScreen(true);
  };

  const handlePracticeMissed = () => {
    // Start a new training session with only the wrong answers
    const missedItems = trainingItems.filter(item => 
      wrongAnswers.some(wrong => wrong.id === item.id)
    );
    setTrainingItems(missedItems);
    setCurrentIndex(0);
    setScore(0);
    setWrongAnswers([]);
    setShowCompletionScreen(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowResult(false);
  };

  const handleGoHome = () => {
    setIsTraining(false);
    setShowCompletionScreen(false);
    setSelectedSentences(new Set());
  };

  // Show completion screen
  if (showCompletionScreen) {
    return (
      <MatchCompletionScreen
        score={score}
        totalQuestions={trainingItems.length}
        xpGained={earnedXP}
        wrongAnswers={wrongAnswers}
        onPracticeMissed={handlePracticeMissed}
        onGoHome={handleGoHome}
      />
    );
  }

  // Show training interface
  if (isTraining && trainingItems.length > 0) {
    const currentItem = trainingItems[currentIndex];
    const clozeWord = currentItem.words.find(w => w.isTarget);
    if (!clozeWord) return null;

    const allWords = sentencesData.flatMap(s => s.words);
    const wrongOptions = getWrongAnswers(clozeWord, allWords);
    const answerOptions = [clozeWord.word, ...wrongOptions].sort(() => Math.random() - 0.5);
    const progress = ((currentIndex + 1) / trainingItems.length) * 100;

    return (
      <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
        {/* Training Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button
              onClick={handleGoHome}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {currentIndex + 1}/{trainingItems.length}
            </span>
          </div>
        </div>

        {/* Training Content */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6">
          <div className="w-full max-w-4xl">
            {/* Question Counter */}
            <div className="text-center mb-8">
              <span className="text-sm text-gray-600">
                Question {currentIndex + 1} of {trainingItems.length}
              </span>
            </div>

            {/* Sentence with Cloze */}
            <div className="mb-12 text-center">
              <div className="text-3xl font-japanese mb-4 leading-relaxed">
                {currentItem.words.map((word, index) => (
                  <span key={index}>
                    {word.isTarget ? (
                      <span className="inline-block w-24 h-12 bg-yellow-200 border-2 border-dashed border-yellow-400 rounded mx-1 align-middle"></span>
                    ) : (
                      word.word
                    )}
                  </span>
                ))}
              </div>
              <div className="text-lg text-gray-600 font-japanese mb-2">
                {currentItem.fullReading}
              </div>
              <div className="text-gray-800 font-medium">
                {currentItem.meaning}
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              {answerOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                  className={`p-6 text-xl font-japanese rounded-lg border-4 transition-all duration-200 ${
                    showResult
                      ? option === clozeWord.word
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : option === selectedAnswer
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : 'bg-gray-100 border-gray-300 text-gray-600'
                      : 'bg-white border-gray-300 hover:border-pink-400 hover:bg-pink-50 active:scale-95'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Result Feedback */}
            {showResult && (
              <div className="text-center mt-8">
                <div className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {isCorrect ? '正解！' : '不正解'}
                </div>
                <div className="text-gray-700">
                  <div className="font-japanese text-lg">{clozeWord.word} ({clozeWord.reading})</div>
                  <div className="text-sm">{clozeWord.meaning}</div>
                </div>
              </div>
            )}

            {/* Score */}
            <div className="text-center mt-8">
              <span className="text-sm text-gray-600">
                Score: {score}/{trainingItems.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#f9fafb' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16">
      <div className="mb-6 flex justify-between items-center">
        <p className="text-sm text-gray-600">Select sentences to begin studying</p>
        <div className="flex gap-3">
          <button
            onClick={selectAll}
            className="px-6 py-3 bg-white text-pink-600 hover:bg-pink-50 font-medium transition-colors rounded-md shadow-sm border-b-4 border-pink-300 hover:border-pink-400 text-base"
          >
            Select All
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-3 bg-gray-400 text-white hover:bg-gray-500 font-medium transition-colors rounded-md shadow-sm border-b-4 border-gray-600 hover:border-gray-700 text-base"
          >
            Clear All
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-600">Loading sentences...</div>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center py-12">
          <div className="text-red-600">Error: {error}</div>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sentences.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleSelected(item.id)}
            className={`border-t-4 border-l-6 border-r-6 border-b-8 border-gray-200 transition-all duration-200 hover:shadow-lg rounded-2xl p-6 relative cursor-pointer ${
              selectedSentences.has(item.id)
                ? 'bg-pink-50 border-pink-200 border-b-pink-500'
                : 
              masteredSentences.has(item.id)
                ? 'bg-green-50 border-green-200 border-b-green-500'
                : 'bg-white border-gray-200 border-b-gray-400 hover:border-gray-300 hover:border-b-gray-600'
            }`}
          >
            {/* Top row with badge and controls */}
            <div className="flex justify-between items-start mb-6">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getLevelColor(item.level)}`}>
                {item.level}
              </span>
              <div className="flex items-center gap-2">
                {selectedSentences.has(item.id) && (
                  <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playAudio(item.fullSentence);
                  }}
                  className="p-2 text-gray-500 hover:text-green-600 hover:bg-white/80 rounded-full transition-colors"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-2xl font-bold text-black font-japanese mb-3 leading-relaxed">
                {item.fullSentence}
              </div>
              <p className="text-base text-gray-600 font-japanese mb-3 leading-relaxed">
                {item.fullReading}
              </p>
              <p className="text-gray-800 font-medium">
                {item.meaning}
              </p>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-4">
              <div className="flex items-start gap-3 mb-3">
                <MessageSquare className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 font-japanese leading-relaxed mb-2">
                    {item.context}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.contextTranslation}
                  </p>
                </div>
              </div>
            </div>

            {/* Mastery Toggle Switch */}
            <div className="absolute bottom-4 right-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {masteredSentences.has(item.id) ? 'Mastered' : 'Learning'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMastered(item.id);
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
                    masteredSentences.has(item.id) ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      masteredSentences.has(item.id) ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8 mb-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              if (pageNum > totalPages) return null;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 rounded-lg ${
                    pageNum === currentPage
                      ? 'bg-green-500 text-white'
                      : 'bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Page Info */}
      <div className="text-center text-sm text-gray-600 mb-8">
        Showing {startIndex + 1}-{Math.min(endIndex, allSentences.length)} of {allSentences.length} sentences
      </div>

      {/* Study Footer Bar */}
      {selectedSentences.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {selectedSentences.size} sentence{selectedSentences.size !== 1 ? 's' : ''} selected
                </span>
              </div>
              <Link 
                href={`/cloze?type=sentences&items=${Array.from(selectedSentences).join(',')}`}
                className="px-6 py-3 bg-pink-500 text-white hover:bg-pink-600 font-semibold transition-all rounded-lg shadow-sm hover:translate-y-0.5 active:translate-y-0.5 inline-block"
              >
                Study Selected Sentences
              </Link>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default function SentencesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9fafb' }}>Loading...</div>}>
      <SentencesPageContent />
    </Suspense>
  );
}
