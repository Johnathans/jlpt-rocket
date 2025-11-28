'use client';

import React, { useState, useEffect } from 'react';
import { List, BookOpen, Clock } from 'lucide-react';
import { n5OrthographyQuestions, OrthographyQuestion } from '@/lib/n5-orthography-data';

// Enhanced interface for orthography with explanations
interface EnhancedOrthographyQuestion extends OrthographyQuestion {
  // Already includes all needed fields from OrthographyQuestion
}

// Shuffle array utility function
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Convert N5 orthography questions with randomized options
const randomizeQuestions = (questions: OrthographyQuestion[]): EnhancedOrthographyQuestion[] => {
  return questions.map(q => {
    // Create array of options with their original indices
    const optionsWithIndex = q.options.map((option, index) => ({ option, originalIndex: index }));
    
    // Shuffle the options
    const shuffledOptions = shuffleArray(optionsWithIndex);
    
    // Find the new position of the correct answer
    const newCorrectAnswer = shuffledOptions.findIndex(item => item.originalIndex === q.correctAnswer);
    
    return {
      ...q,
      options: shuffledOptions.map(item => item.option),
      correctAnswer: newCorrectAnswer
    };
  });
};

export default function OrthographyTestPage() {
  const [orthographyQuestions, setOrthographyQuestions] = useState<EnhancedOrthographyQuestion[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showFinalResult, setShowFinalResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes for 217 questions

  // Initialize questions on client side only
  useEffect(() => {
    const randomizedQuestions = randomizeQuestions(n5OrthographyQuestions);
    setOrthographyQuestions(randomizedQuestions);
    setAnswers(new Array(randomizedQuestions.length).fill(null));
    setIsLoaded(true);
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft > 0 && isLoaded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isLoaded]);

  // Format time display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    // Update answers array
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
    
    // Update score if correct
    if (answerIndex === question.correctAnswer && answers[currentQuestion] === null) {
      setScore(score + 1);
    }
  };

  // Navigate to next question
  const handleNext = () => {
    if (currentQuestion < orthographyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      const nextAnswer = answers[currentQuestion + 1];
      setSelectedAnswer(nextAnswer);
      setShowResult(nextAnswer !== null);
      setShowExplanation(false);
    }
  };

  // Navigate to previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const prevAnswer = answers[currentQuestion - 1];
      setSelectedAnswer(prevAnswer);
      setShowResult(prevAnswer !== null);
      setShowExplanation(false);
    }
  };

  // Calculate final score
  const calculateScore = () => {
    let correctCount = 0;
    answers.forEach((answer, index) => {
      if (answer === orthographyQuestions[index]?.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowFinalResult(true);
  };

  // Show loading state
  if (!isLoaded || orthographyQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orthography test...</p>
        </div>
      </div>
    );
  }

  const question = orthographyQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / orthographyQuestions.length) * 100;

  // Final results screen
  if (showFinalResult) {
    const percentage = Math.round((score / orthographyQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-8">
              <div className="text-6xl font-bold text-pink-600 mb-2">{percentage}%</div>
              <div className="text-xl text-gray-600 mb-4">
                {score} out of {orthographyQuestions.length} correct
              </div>
              <div className="text-lg text-gray-500">
                Time remaining: {formatTime(timeLeft)}
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                Retake Test
              </button>
              <button
                onClick={() => window.history.back()}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render sentence with underlined portion
  const renderSentenceWithUnderline = () => {
    const sentence = question.question;
    const targetWord = question.targetWord;
    
    // Convert <u> tags to styled spans
    const processedSentence = sentence.replace(
      /<u>(.*?)<\/u>/g, 
      '<span class="border-b-2 border-gray-600 pb-1">$1</span>'
    );
    
    return (
      <div className="text-4xl font-japanese leading-relaxed text-center">
        <div dangerouslySetInnerHTML={{ __html: processedSentence }} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Custom Test Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Close Button and Test Badge */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.history.back()}
                className="p-2 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Test Badge */}
              <div className="bg-white px-3 py-1 rounded-full border border-purple-500">
                <span className="text-black text-sm font-medium">Orthography</span>
              </div>
            </div>

            {/* Question Counter */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
                <span className="text-gray-600 text-sm font-medium mr-2">Question</span>
                <span className="text-gray-900 font-bold text-lg">
                  {currentQuestion + 1}/{orthographyQuestions.length}
                </span>
              </div>
            </div>

            {/* Right Side - Timer and Questions List Button */}
            <div className="flex items-center gap-3">
              {/* Timer */}
              <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-lg border border-green-200">
                <Clock className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium text-sm">
                  {formatTime(timeLeft)}
                </span>
              </div>

              {/* Questions List Button */}
              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="p-3 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-100"
              >
                <List className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-28 px-4 flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            {/* Question Section */}
            <div className="text-center space-y-6 mb-8">
              <div className="p-8">
                {renderSentenceWithUnderline()}
                <div className="text-sm text-gray-600 mt-4 italic">
                  ({question.englishTranslation})
                </div>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const isWrong = showResult && isSelected && !isCorrect;
                const shouldShowCorrect = showResult && isCorrect;
                
                return (
                  <button
                    key={index}
                    onClick={() => !showResult && handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`
                      relative p-6 rounded-2xl border-2 border-gray-200 border-b-4 transition-all duration-200 text-left
                      ${!showResult 
                        ? 'bg-white hover:shadow-md border-b-gray-300' 
                        : shouldShowCorrect
                        ? 'bg-green-50 border-pink-300 border-b-green-400 text-green-800'
                        : isWrong
                        ? 'bg-red-50 border-red-300 border-b-red-400 text-red-800'
                        : 'bg-gray-50 border-gray-300 border-b-gray-400 text-gray-500'
                      }
                      ${!showResult ? 'cursor-pointer' : 'cursor-default'}
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold
                        ${!showResult 
                          ? 'bg-gray-200 text-black' 
                          : shouldShowCorrect
                          ? 'bg-green-500 text-white'
                          : isWrong
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-400 text-white'
                        }
                      `}>
                        {index + 1}
                      </div>
                      <span className="text-xl font-japanese font-medium">
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation button */}
            <div className="text-center mt-6">
              <button 
                onClick={() => setShowExplanation(!showExplanation)}
                className="flex items-center gap-2 mx-auto px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                <span className="text-sm">{showExplanation ? 'Hide Explanation' : 'See Explanation'}</span>
              </button>
            </div>

            {/* Explanation Section */}
            {showExplanation && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Target Word:</p>
                    <p className="text-lg font-medium text-gray-900 font-japanese">{question.targetWord}</p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Answer Explanation:</h4>
                    <div className="space-y-3">
                      {question.options.map((option, index) => (
                        <div 
                          key={index}
                          className={`p-3 rounded-lg border ${
                            index === question.correctAnswer 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-red-50 border-red-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`
                              w-6 h-6 rounded flex items-center justify-center text-xs font-bold
                              ${index === question.correctAnswer 
                                ? 'bg-green-500 text-white' 
                                : 'bg-red-500 text-white'
                              }
                            `}>
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-japanese font-medium">{option}</span>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  index === question.correctAnswer 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {index === question.correctAnswer ? 'CORRECT' : 'INCORRECT'}
                                </span>
                              </div>
                              {index === question.correctAnswer && (
                                <p className="text-sm text-gray-700">{question.explanation}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-20">
            {/* Centered Previous and Next Buttons */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-6">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg border border-gray-300 border-b-4 border-b-gray-400 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              
              <button
                onClick={handleNext}
                disabled={currentQuestion === orthographyQuestions.length - 1}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg border border-gray-300 border-b-4 border-b-gray-400 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Right Side - Finish Button */}
            <div className="ml-auto">
              <button
                onClick={calculateScore}
                className="px-8 py-3 bg-green-500 text-white rounded-lg border border-green-600 border-b-4 border-b-green-700 hover:bg-green-600 transition-colors"
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Drawer */}
      {isDrawerOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsDrawerOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Questions</h3>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-2">
                {orthographyQuestions.map((q, index) => {
                  const isAnswered = answers[index] !== null;
                  const isCorrect = isAnswered && answers[index] === q.correctAnswer;
                  const isCurrent = index === currentQuestion;
                  
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentQuestion(index);
                        setSelectedAnswer(answers[index]);
                        setIsDrawerOpen(false);
                        setShowExplanation(false);
                      }}
                      className={`
                        w-full p-3 rounded-lg text-left transition-colors
                        ${isCurrent 
                          ? 'bg-purple-100 border-2 border-purple-500' 
                          : isAnswered
                          ? isCorrect
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-red-50 border border-red-200'
                          : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-6 h-6 rounded flex items-center justify-center text-xs font-bold
                          ${isCurrent
                            ? 'bg-purple-500 text-white'
                            : isAnswered
                            ? isCorrect
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                            : 'bg-gray-300 text-gray-700'
                          }
                        `}>
                          {index + 1}
                        </div>
                        <span className="text-sm font-japanese truncate">
                          {q.targetWord}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              {/* Score */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Score</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {score}/{orthographyQuestions.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
