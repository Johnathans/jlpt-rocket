'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Volume2, BookOpen, MessageSquare, X, Home, RotateCcw } from 'lucide-react';
import { ReviewSystem } from '@/lib/reviewSystem';
import { StreakSystem } from '@/lib/streakSystem';
import MatchCompletionScreen from '@/components/MatchCompletionScreen';

interface WordInSentence {
  id: number;
  word: string;
  reading: string;
  meaning: string;
  isTarget?: boolean; // Can this word be used as a cloze target?
}

interface SentenceItem {
  id: number;
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
  id: number;
  character: string;
  meaning: string;
  reading?: string;
  userAnswer: string;
  correctAnswer: string;
  type: 'kanji' | 'vocabulary' | 'sentences';
}

const sentencesData: SentenceItem[] = [
  {
    id: 1,
    words: [
      { id: 101, word: '今日', reading: 'きょう', meaning: 'today', isTarget: true },
      { id: 102, word: 'は', reading: 'は', meaning: 'topic particle', isTarget: false },
      { id: 103, word: '学校', reading: 'がっこう', meaning: 'school', isTarget: true },
      { id: 104, word: 'に', reading: 'に', meaning: 'to/direction particle', isTarget: false },
      { id: 105, word: '行きます', reading: 'いきます', meaning: 'go (polite)', isTarget: true },
      { id: 106, word: '。', reading: '。', meaning: 'period', isTarget: false }
    ],
    fullSentence: '今日は学校に行きます。',
    fullReading: 'きょうは がっこうに いきます。',
    meaning: 'Today I will go to school.',
    level: 'N5',
    context: '毎日学校に行くのが楽しいです。',
    contextTranslation: 'Going to school every day is fun.'
  },
  {
    id: 2,
    words: [
      { id: 201, word: '友達', reading: 'ともだち', meaning: 'friend', isTarget: true },
      { id: 202, word: 'と', reading: 'と', meaning: 'with particle', isTarget: false },
      { id: 203, word: '映画', reading: 'えいが', meaning: 'movie', isTarget: true },
      { id: 204, word: 'を', reading: 'を', meaning: 'object particle', isTarget: false },
      { id: 205, word: '見ました', reading: 'みました', meaning: 'watched (past)', isTarget: true },
      { id: 206, word: '。', reading: '。', meaning: 'period', isTarget: false }
    ],
    fullSentence: '友達と映画を見ました。',
    fullReading: 'ともだちと えいがを みました。',
    meaning: 'I watched a movie with my friend.',
    level: 'N5',
    context: '週末に友達と映画館に行きました。',
    contextTranslation: 'I went to the movie theater with my friend on the weekend.'
  },
  {
    id: 3,
    words: [
      { id: 301, word: '日本語', reading: 'にほんご', meaning: 'Japanese language', isTarget: true },
      { id: 302, word: 'を', reading: 'を', meaning: 'object particle', isTarget: false },
      { id: 303, word: '勉強しています', reading: 'べんきょうしています', meaning: 'studying (continuous)', isTarget: true },
      { id: 304, word: '。', reading: '。', meaning: 'period', isTarget: false }
    ],
    fullSentence: '日本語を勉強しています。',
    fullReading: 'にほんごを べんきょうしています。',
    meaning: 'I am studying Japanese.',
    level: 'N5',
    context: '毎日一時間日本語を勉強しています。',
    contextTranslation: 'I study Japanese for one hour every day.'
  },
  {
    id: 4,
    words: [
      { id: 401, word: '電車', reading: 'でんしゃ', meaning: 'train', isTarget: true },
      { id: 402, word: 'で', reading: 'で', meaning: 'by means of particle', isTarget: false },
      { id: 403, word: '会社', reading: 'かいしゃ', meaning: 'company', isTarget: true },
      { id: 404, word: 'に', reading: 'に', meaning: 'to particle', isTarget: false },
      { id: 405, word: '通っています', reading: 'かよっています', meaning: 'commuting (continuous)', isTarget: true },
      { id: 406, word: '。', reading: '。', meaning: 'period', isTarget: false }
    ],
    fullSentence: '電車で会社に通っています。',
    fullReading: 'でんしゃで かいしゃに かよっています。',
    meaning: 'I commute to work by train.',
    level: 'N4',
    context: '毎朝満員電車に乗るのは大変です。',
    contextTranslation: 'Taking the crowded train every morning is tough.'
  },
  {
    id: 5,
    words: [
      { id: 501, word: '母', reading: 'はは', meaning: 'mother', isTarget: true },
      { id: 502, word: 'の', reading: 'の', meaning: 'possessive particle', isTarget: false },
      { id: 503, word: '料理', reading: 'りょうり', meaning: 'cooking', isTarget: true },
      { id: 504, word: 'は', reading: 'は', meaning: 'topic particle', isTarget: false },
      { id: 505, word: 'とても', reading: 'とても', meaning: 'very', isTarget: true },
      { id: 506, word: '美味しい', reading: 'おいしい', meaning: 'delicious', isTarget: true },
      { id: 507, word: 'です', reading: 'です', meaning: 'polite copula', isTarget: false },
      { id: 508, word: '。', reading: '。', meaning: 'period', isTarget: false }
    ],
    fullSentence: '母の料理はとても美味しいです。',
    fullReading: 'ははの りょうりは とても おいしいです。',
    meaning: 'My mother\'s cooking is very delicious.',
    level: 'N4',
    context: '特に母の作るカレーが大好きです。',
    contextTranslation: 'I especially love the curry my mother makes.'
  }
];

export default function SentencesPage() {
  const searchParams = useSearchParams();
  const selectedLevel = searchParams.get('level') || 'N5';
  const [masteredSentences, setMasteredSentences] = useState<Set<number>>(new Set());
  const [selectedSentences, setSelectedSentences] = useState<Set<number>>(new Set());
  const [isTraining, setIsTraining] = useState(false);

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
    switch (level) {
      case 'N5':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'N4':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'N3':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'N2':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'N1':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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

  const toggleSelected = (id: number) => {
    const newSelectedSentences = new Set(selectedSentences);
    if (newSelectedSentences.has(id)) {
      newSelectedSentences.delete(id);
    } else {
      newSelectedSentences.add(id);
    }
    setSelectedSentences(newSelectedSentences);
  };

  const toggleMastered = (id: number) => {
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
    ReviewSystem.updateItemProgress(currentItem.id, 'sentences', correct);

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
      <div className="min-h-screen bg-gray-50">
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
                      : 'bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50 active:scale-95'
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
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <p className="text-sm text-gray-600">Select sentences to begin studying</p>
        <div className="flex gap-3">
          <button
            onClick={selectAll}
            className="px-6 py-3 bg-green-500 text-white hover:bg-green-600 font-medium transition-colors rounded-md shadow-sm border-b-4 border-green-700 hover:border-green-800 text-base"
          >
            Select All
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-3 bg-gray-500 text-white hover:bg-gray-600 font-medium transition-colors rounded-md shadow-sm border-b-4 border-gray-700 hover:border-gray-800 text-base"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sentencesData.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleSelected(item.id)}
            className={`border border-gray-200 border-b-4 transition-all duration-200 hover:shadow-lg rounded-lg p-6 relative cursor-pointer ${
              selectedSentences.has(item.id)
                ? 'bg-blue-50 border-blue-200 border-b-blue-400'
                : 
              masteredSentences.has(item.id)
                ? 'bg-green-50 border-green-200 border-b-green-400'
                : 'bg-white border-gray-200 border-b-gray-400 hover:border-gray-300 hover:border-b-gray-500'
            }`}
          >
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-black font-japanese mb-2 leading-relaxed">
                {item.fullSentence}
              </div>
              <p className="text-base text-gray-600 font-japanese mb-2 leading-relaxed">
                {item.fullReading}
              </p>
              <p className="text-gray-800 font-medium">
                {item.meaning}
              </p>
            </div>

            {/* Top left badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getLevelColor(item.level)}`}>
                {item.level}
              </span>
            </div>

            {/* Top right audio button */}
            <div className="absolute top-4 right-4">
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

            {/* Selected indicator */}
            {selectedSentences.has(item.id) && (
              <div className="absolute top-4 right-16 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            )}

            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-start gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 font-japanese leading-relaxed">
                    {item.context}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.contextTranslation}
                  </p>
                </div>
              </div>
            </div>

            {/* Mastery Toggle Switch */}
            <div className="absolute bottom-4 right-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {masteredSentences.has(item.id) ? 'Mastered' : 'Learning'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMastered(item.id);
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
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
                className="px-6 py-3 bg-green-500 text-white hover:bg-green-600 font-semibold transition-all rounded-lg shadow-sm border-b-4 border-green-600 hover:border-green-700 hover:translate-y-0.5 active:translate-y-0.5 inline-block"
              >
                Study Selected Sentences
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
