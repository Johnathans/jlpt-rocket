'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TrainingHeader from '@/components/TrainingHeader';
import { ReviewSystem } from '@/lib/reviewSystem';
import { StreakSystem } from '@/lib/streakSystem';
import { useTTS } from '@/lib/useTTS';
import { playIncorrectSound, playCorrectSound, shouldPlayVoice, playButtonClickSound } from '@/lib/audioUtils';

interface WordInSentence {
  id: number;
  word: string;
  reading: string;
  meaning: string;
  isTarget?: boolean;
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

// Same sentences data as in the sentences page
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

export default function ClozePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { speak, isLoading: ttsLoading } = useTTS();
  
  // State variables
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);
  const [clozeWord, setClozeWord] = useState<WordInSentence | null>(null);
  
  // Get selected items from URL params
  const selectedIds = searchParams.get('items')?.split(',').map(Number) || [];

  // Memoize training items to prevent unnecessary re-renders
  const trainingItems = useMemo(() => {
    return selectedIds.length > 0 
      ? sentencesData.filter(item => selectedIds.includes(item.id))
      : sentencesData.slice(0, 3); // Fallback to first 3 sentences
  }, [selectedIds]);

  const currentItem = trainingItems[currentIndex];

  // Generate cloze question when item changes
  useEffect(() => {
    if (currentItem) {
      // Reset state for new item
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowResult(false);
      
      // Get all target words (words that can be cloze targets)
      const targetWords = currentItem.words.filter(word => word.isTarget);
      
      if (targetWords.length > 0) {
        // Randomly select one word to be the cloze
        const randomCloze = targetWords[Math.floor(Math.random() * targetWords.length)];
        setClozeWord(randomCloze);
        
        // Generate answer options (correct answer + 3 wrong answers)
        const correctAnswer = randomCloze.word;
        const wrongAnswers = getWrongAnswers(randomCloze, targetWords);
        const allOptions = [correctAnswer, ...wrongAnswers];
        setAnswerOptions(allOptions.sort(() => Math.random() - 0.5));
      } else {
        setClozeWord(null);
        setAnswerOptions([]);
      }
    }
  }, [currentItem]); // Depend on currentItem instead of currentIndex

  const getWrongAnswers = (correctWord: WordInSentence, availableWords: WordInSentence[]): string[] => {
    // Get wrong answers from other target words in the same sentence or from other sentences
    const otherWords = availableWords.filter(word => word.id !== correctWord.id);
    const allTargetWords = sentencesData.flatMap(sentence => 
      sentence.words.filter(word => word.isTarget && word.id !== correctWord.id)
    );
    
    const wrongOptions = [...otherWords, ...allTargetWords]
      .map(word => word.word)
      .filter((word, index, arr) => arr.indexOf(word) === index) // Remove duplicates
      .slice(0, 3);
    
    // If we don't have enough wrong answers, add some generic ones
    while (wrongOptions.length < 3) {
      const genericOptions = ['です', 'ます', 'した', 'から', 'まで', 'ので'];
      const randomGeneric = genericOptions[Math.floor(Math.random() * genericOptions.length)];
      if (!wrongOptions.includes(randomGeneric) && randomGeneric !== correctWord.word) {
        wrongOptions.push(randomGeneric);
      }
    }
    
    return wrongOptions.slice(0, 3);
  };

  const renderSentenceWithCloze = () => {
    if (!currentItem || !clozeWord) return null;
    
    return (
      <div className="text-center">
        <div className="text-5xl font-japanese leading-relaxed mb-4">
          {currentItem.words.map((word, index) => (
            <span key={word.id}>
              {word.id === clozeWord.id ? (
                <span 
                  className={`inline-block min-w-20 px-3 py-2 mx-1 rounded border-2 text-center align-middle ${
                    selectedAnswer
                      ? showResult
                        ? isCorrect
                          ? 'bg-green-100 border-green-500 text-green-600'
                          : 'bg-red-100 border-red-500 text-red-600'
                        : 'bg-blue-50 border-blue-300 text-blue-800'
                      : 'bg-gray-200 border-dashed border-gray-400 text-gray-500'
                  }`}
                >
                  {selectedAnswer || '___'}
                </span>
              ) : (
                word.word
              )}
            </span>
          ))}
        </div>
        <div className="text-lg text-gray-600 font-japanese mb-6">
          {currentItem.fullReading}
        </div>
        <div className="text-gray-800 font-medium">
          {currentItem.meaning}
        </div>
      </div>
    );
  };

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    playButtonClickSound();
    setSelectedAnswer(answer);
  };

  const handleCheckAnswer = async () => {
    if (!selectedAnswer) return;
    
    const correct = selectedAnswer === clozeWord?.word;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      // Play correct answer sound
      playCorrectSound();
      setScore(score + 1);
      
      // Play TTS after a small delay for correct answers if voice is enabled
      if (shouldPlayVoice()) {
        setTimeout(async () => {
          try {
            await speak(currentItem.fullSentence, {
              languageCode: 'ja-JP',
              voiceName: 'ja-JP-Chirp3-HD-Leda',
              autoPlay: true
            });
          } catch (error) {
            console.error('TTS Error:', error);
          }
        }, 300);
      }
    } else {
      // Play incorrect answer sound
      playIncorrectSound();
      
      // Play TTS immediately for incorrect answers if voice is enabled
      if (shouldPlayVoice()) {
        try {
          await speak(currentItem.fullSentence, {
            languageCode: 'ja-JP',
            voiceName: 'ja-JP-Chirp3-HD-Leda',
            autoPlay: true
          });
        } catch (error) {
          console.error('TTS Error:', error);
        }
      }
    }

    // Update progress in review system (using sentence ID and 'sentences' type)
    ReviewSystem.updateItemProgress(
      currentItem.id,
      'sentences',
      correct
    );
  };

  const handleNext = () => {
    if (currentIndex < trainingItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowResult(false);
    } else {
      // Training complete - record session for streak
      StreakSystem.recordSession();
      router.push('/');
    }
  };

  const progress = trainingItems.length > 0 ? ((currentIndex + 1) / trainingItems.length) * 100 : 0;

  if (!currentItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No sentences selected</h2>
          <p className="text-gray-600 mb-6">Please select some sentences to practice with.</p>
          <button
            onClick={() => router.push('/sentences')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Sentences
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TrainingHeader 
        progress={progress}
        closeHref="/sentences"
      />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-24 pt-8 space-y-8">
        <div className="w-full max-w-4xl">
          {/* Question Counter */}
          <div className="text-center mb-8">
            <span className="text-sm text-gray-600">
              Question {currentIndex + 1} of {trainingItems.length}
            </span>
          </div>

          {/* Sentence with Cloze */}
          <div className="mb-12">
            {renderSentenceWithCloze()}
          </div>

          {/* Answer Options */}
          <div className="w-full max-w-2xl mx-auto">
            <div className="grid grid-cols-2 gap-4">
              {answerOptions.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrectAnswer = option === clozeWord?.word;
                
                let buttonClass = "w-full p-4 text-center text-base font-semibold rounded-lg transition-all duration-200 border-2 border-gray-300 relative ";
                
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
                    className={buttonClass}
                    disabled={showResult}
                  >
                    {option}
                    {showResult && isCorrectAnswer && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-600 rounded flex items-center justify-center">
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



          {/* Score */}
          <div className="text-center mt-8">
            <span className="text-sm text-gray-600">
              Score: {score}/{trainingItems.length}
            </span>
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
              className={`py-4 px-32 rounded-full font-semibold text-sm transition-all duration-200 ${
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
              className="py-4 px-32 rounded-full font-semibold text-sm bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {currentIndex < trainingItems.length - 1 ? 'CONTINUE' : 'FINISH'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
