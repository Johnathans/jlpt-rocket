'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TrainingHeader from '@/components/TrainingHeader';
import { ReviewSystemSupabase } from '@/lib/reviewSystemSupabase';
import { StreakSystem } from '@/lib/streakSystem';
import { useTTS } from '@/lib/useTTS';
import { playIncorrectSound, playCorrectSound, shouldPlayVoice, playButtonClickSound } from '@/lib/audioUtils';
import { parseClozeText, getSentencesByLevel, SentenceData, JLPTLevel, getRandomVocabulary } from '@/lib/supabase-data';

interface WordInSentence {
  id: number;
  word: string;
  reading: string;
  meaning: string;
  isTarget?: boolean;
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

function ClozePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { speak, isLoading: ttsLoading } = useTTS();
  
  // State variables
  const [sentencesData, setSentencesData] = useState<SentenceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);
  const [currentClozeData, setCurrentClozeData] = useState<{
    sentence: string;
    clozeWord: string;
    options: string[];
  } | null>(null);
  const [clozeWord, setClozeWord] = useState<WordInSentence | null>(null);

  // Fetch sentences from Supabase
  useEffect(() => {
    const fetchSentences = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const level = searchParams.get('level') || 'N5';
        const sentences = await getSentencesByLevel(level as JLPTLevel);
        
        if (sentences.length === 0) {
          setError('No sentences found for this level');
          return;
        }
        
        // Transform SentenceData to SentenceItem format for existing UI
        const transformedSentences: SentenceItem[] = sentences.map((sentence, index) => {
          const parsed = parseClozeText(sentence.japanese_text);
          
          // Create words array - simplified approach for now
          // We'll create a basic word structure that the existing UI can work with
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
            id: sentence.id, // Keep the original UUID string ID from Supabase
            words,
            fullSentence: sentence.japanese_text, // Keep the original sentence with asterisks!
            fullReading: '', // We don't have reading data in Supabase yet
            meaning: sentence.english_translation,
            level: sentence.jlpt_level,
            context: '', // We don't have context data in Supabase yet
            contextTranslation: ''
          };
        });
        
        setSentencesData(transformedSentences);
      } catch (err) {
        console.error('Error fetching sentences:', err);
        setError('Failed to load sentences');
      } finally {
        setLoading(false);
      }
    };

    fetchSentences();
  }, [searchParams]);
  
  // Get selected items from URL params
  const selectedIds = searchParams.get('items')?.split(',') || [];
  console.log('Selected IDs from URL:', selectedIds);
  console.log('Available sentences data:', sentencesData);

  // Memoize training items to prevent unnecessary re-renders
  const trainingItems = useMemo(() => {
    if (selectedIds.length > 0) {
      // Filter sentences by matching UUIDs directly
      const filtered = sentencesData.filter(item => selectedIds.includes(item.id));
      console.log('Filtered training items:', filtered);
      console.log('Sentence IDs in data:', sentencesData.map(s => s.id));
      return filtered;
    }
    return sentencesData.slice(0, 3); // Fallback to first 3 sentences
  }, [selectedIds, sentencesData]);

  const currentItem = trainingItems[currentIndex];

  // Generate cloze question when item changes
  useEffect(() => {
    const generateClozeQuestion = async () => {
      if (currentItem) {
        // Reset state for new item
        setSelectedAnswer(null);
        setIsCorrect(null);
        setShowResult(false);
        
        // Parse the sentence to get cloze words
        const parsed = parseClozeText(currentItem.fullSentence);
        console.log('Parsed sentence:', parsed);
        console.log('Full sentence:', currentItem.fullSentence);
        
        if (parsed.hasCloze && parsed.clozeWords.length > 0) {
          // Randomly select one cloze word to be the target
          const randomClozeWord = parsed.clozeWords[Math.floor(Math.random() * parsed.clozeWords.length)];
          console.log('Selected cloze word:', randomClozeWord);
          
          // Set up current cloze data
          setCurrentClozeData({
            sentence: parsed.cleanSentence,
            clozeWord: randomClozeWord,
            options: []
          });
          
          // Create a temporary WordInSentence for compatibility with existing functions
          const tempClozeWord: WordInSentence = {
            id: 1,
            word: randomClozeWord,
            reading: '',
            meaning: '',
            isTarget: true
          };
          setClozeWord(tempClozeWord);
          
          // Generate answer options (correct answer + 3 wrong answers)
          const correctAnswer = randomClozeWord;
          const wrongAnswers = await generateWrongAnswersForCloze(randomClozeWord);
          const allOptions = [correctAnswer, ...wrongAnswers];
          console.log('Generated answer options:', allOptions);
          setAnswerOptions(allOptions.sort(() => Math.random() - 0.5));
        } else {
          console.log('No cloze words found in sentence');
          // Fallback: create a simple cloze from the sentence
          const fallbackOptions = ['学校', '今日', '友達', '本'];
          setAnswerOptions(fallbackOptions);
          setClozeWord({
            id: 1,
            word: '学校',
            reading: 'がっこう',
            meaning: 'school',
            isTarget: true
          });
          setCurrentClozeData({
            sentence: currentItem.fullSentence,
            clozeWord: '学校',
            options: fallbackOptions
          });
        }
      }
    };

    generateClozeQuestion();
  }, [currentItem]); // Depend on currentItem instead of currentIndex

  // Generate wrong answers for cloze questions
  const generateWrongAnswersForCloze = async (correctWord: string): Promise<string[]> => {
    try {
      // Get random vocabulary words from Supabase to use as wrong answers
      const randomVocab = await getRandomVocabulary('N5', 10);
      const wrongAnswers = randomVocab
        .map(vocab => vocab.word)
        .filter(word => word !== correctWord)
        .slice(0, 3);
      
      // If we don't have enough wrong answers, add some fallback options
      const fallbackOptions = ['今日', '明日', '昨日', '学校', '友達', '先生', '学生', '日本', '英語', '勉強'];
      const additionalOptions = fallbackOptions
        .filter(word => word !== correctWord && !wrongAnswers.includes(word))
        .slice(0, 3 - wrongAnswers.length);
      
      return [...wrongAnswers, ...additionalOptions].slice(0, 3);
    } catch (error) {
      console.error('Error generating wrong answers:', error);
      // Fallback to hardcoded options
      const fallbackOptions = ['今日', '明日', '昨日', '学校', '友達', '先生'];
      return fallbackOptions.filter(word => word !== correctWord).slice(0, 3);
    }
  };

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
    if (!currentItem) return null;
    
    // Use the original sentence from Supabase which contains asterisks
    const originalText = currentItem.fullSentence;
    
    // Check if the sentence has asterisks (cloze format)
    const firstAsterisk = originalText.indexOf('*');
    const secondAsterisk = originalText.indexOf('*', firstAsterisk + 1);
    
    if (firstAsterisk === -1 || secondAsterisk === -1) {
      // No asterisks found, just show the sentence as is
      return (
        <div className="text-center">
          <div className="text-5xl font-japanese font-bold leading-relaxed mb-4 text-gray-900 dark:text-white">
            {originalText}
          </div>
          <div className="text-lg text-gray-600 dark:text-gray-300 font-japanese mb-6">
            {currentItem.fullReading}
          </div>
          <div className="text-gray-800 dark:text-gray-200 font-medium">
            {currentItem.meaning}
          </div>
        </div>
      );
    }
    
    // Split the sentence into parts
    const beforeCloze = originalText.substring(0, firstAsterisk);
    const clozeWord = originalText.substring(firstAsterisk + 1, secondAsterisk);
    const afterCloze = originalText.substring(secondAsterisk + 1);
    
    return (
      <div className="text-center">
        <div className="text-5xl font-japanese font-bold leading-relaxed mb-4 text-gray-900 dark:text-white">
          <span>{beforeCloze}</span>
          <span 
            className={`inline-block min-w-20 px-3 py-2 mx-1 rounded border-2 text-center align-middle ${
              selectedAnswer
                ? showResult
                  ? isCorrect
                    ? 'bg-green-100 border-green-500 text-green-600'
                    : 'bg-red-100 border-red-500 text-red-600'
                  : 'bg-blue-50 border-blue-300 text-blue-800'
                : 'bg-gray-200 dark:bg-gray-700 border-dashed border-gray-400 dark:border-gray-600 text-gray-500 dark:text-gray-400'
            }`}
          >
            {selectedAnswer || '___'}
          </span>
          <span>{afterCloze}</span>
        </div>
        <div className="text-lg text-gray-600 dark:text-gray-300 font-japanese mb-6">
          {currentItem.fullReading}
        </div>
        <div className="text-gray-800 dark:text-gray-200 font-medium">
          {currentItem.meaning}
        </div>
      </div>
    );
  };

  const handleAnswerSelect = async (answer: string) => {
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
            // Use clean sentence without asterisks for TTS
            const cleanSentence = parseClozeText(currentItem.fullSentence).cleanSentence;
            await speak(cleanSentence, {
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
          // Use clean sentence without asterisks for TTS
          const cleanSentence = parseClozeText(currentItem.fullSentence).cleanSentence;
          await speak(cleanSentence, {
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
    await ReviewSystemSupabase.updateItemProgress(
      currentItem.id,
      'sentences',
      correct,
      currentItem
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

  // Only show "no sentences" message if we're done loading and truly have no sentences
  if (!loading && !currentItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No sentences selected</h2>
          <p className="text-gray-600 mb-6">Please select some sentences to practice with.</p>
          <button
            onClick={() => router.push('/sentences')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-pink-500 transition-colors"
          >
            Go to Sentences
          </button>
        </div>
      </div>
    );
  }

  // Show nothing (blank) while loading - let it load seamlessly
  if (loading || !currentItem) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <TrainingHeader 
        progress={progress}
        closeHref="/sentences"
      />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-24 pt-8 space-y-8">
        <div className="w-full max-w-4xl">


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
                
                let buttonClass = "w-full p-4 text-center text-base font-semibold rounded-lg transition-all duration-200 border-2 border-gray-300 dark:border-gray-600 relative ";
                
                if (!showResult) {
                  if (isSelected) {
                    buttonClass += "bg-blue-100 text-blue-800 shadow-md";
                  } else {
                    buttonClass += "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm hover:shadow-md cursor-pointer";
                  }
                } else {
                  if (isSelected && isCorrectAnswer) {
                    buttonClass += "bg-green-100 text-green-600";
                  } else if (isSelected && !isCorrectAnswer) {
                    buttonClass += "bg-red-100 text-red-600";
                  } else if (isCorrectAnswer) {
                    buttonClass += "bg-green-100 text-green-600";
                  } else {
                    buttonClass += "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400";
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
    </div>
  );
}

export default function ClozePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">Loading...</div>}>
      <ClozePageContent />
    </Suspense>
  );
}
