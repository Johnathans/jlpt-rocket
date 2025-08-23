'use client';

import { useState, useEffect } from 'react';
import { List, BookOpen, Clock } from 'lucide-react';
import { n5ParaphraseQuestions } from '@/lib/n5-paraphrase-data';

export default function ParaphraseTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(n5ParaphraseQuestions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [showExplanation, setShowExplanation] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const question = n5ParaphraseQuestions[currentQuestion];

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Shuffle options when question changes
  useEffect(() => {
    if (question) {
      const options = [...question.options];
      // Simple shuffle to randomize answer positions
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      setShuffledOptions(options);
    }
  }, [currentQuestion, question]);

  // Reset states when question changes
  useEffect(() => {
    const answer = answers[currentQuestion];
    setSelectedAnswer(answer);
    setShowResult(answer !== null);
    setShowExplanation(false);
  }, [currentQuestion, answers]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    // Find the correct answer index in shuffled options
    const selectedOption = shuffledOptions[answerIndex];
    const originalIndex = question.options.indexOf(selectedOption);
    
    setSelectedAnswer(originalIndex);
    setShowResult(true);
    
    // Update answers array
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = originalIndex;
    setAnswers(newAnswers);
    
    // Update score if correct
    if (originalIndex === question.correctAnswer && answers[currentQuestion] === null) {
      setScore(score + 1);
    }
  };

  // Navigate to next question
  const handleNext = () => {
    if (currentQuestion < n5ParaphraseQuestions.length - 1) {
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

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const goToQuestion = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
    setSelectedAnswer(answers[questionIndex]);
    setShowResult(answers[questionIndex] !== null);
    setIsDrawerOpen(false);
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
              <div className="bg-white px-3 py-1 rounded-full border border-green-500">
                <span className="text-black text-sm font-medium">Paraphrase</span>
              </div>
            </div>

            {/* Question Counter */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
                <span className="text-gray-600 text-sm font-medium mr-2">Question</span>
                <span className="text-gray-900 font-bold text-lg">
                  {currentQuestion + 1}/{n5ParaphraseQuestions.length}
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
                onClick={toggleDrawer}
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
                <p className="text-4xl font-japanese leading-relaxed text-center">
                  {question.question}
                </p>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shuffledOptions.map((option, index) => {
                const originalIndex = question.options.indexOf(option);
                const isSelected = selectedAnswer === originalIndex;
                const isCorrect = originalIndex === question.correctAnswer;
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
                        ? 'bg-green-50 border-green-300 border-b-green-400 text-green-800'
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

            {/* Explanation button - moved below answer options */}
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
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Answer Explanations:</h4>
                    <div className="space-y-3">
                      {shuffledOptions.map((option, index) => {
                        const originalIndex = question.options.indexOf(option);
                        const isCorrect = originalIndex === question.correctAnswer;
                        
                        return (
                          <div 
                            key={index}
                            className={`p-3 rounded-lg border ${
                              isCorrect 
                                ? 'bg-green-50 border-green-200' 
                                : 'bg-red-50 border-red-200'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`
                                w-6 h-6 rounded flex items-center justify-center text-xs font-bold
                                ${isCorrect 
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
                                    isCorrect 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {isCorrect ? 'CORRECT' : 'INCORRECT'}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700">
                                  {isCorrect 
                                    ? question.explanation 
                                    : `This option has a different meaning from the original sentence.`
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
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
                disabled={currentQuestion === n5ParaphraseQuestions.length - 1}
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
                onClick={() => {
                  // Handle finish logic here
                  console.log('Test finished!');
                }}
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
            onClick={toggleDrawer}
          />
          
          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Questions</h3>
                <button
                  onClick={toggleDrawer}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-2">
                {n5ParaphraseQuestions.map((q, index) => {
                  const isAnswered = answers[index] !== null;
                  const isCorrect = isAnswered && answers[index] === q.correctAnswer;
                  const isCurrent = index === currentQuestion;
                  
                  return (
                    <button
                      key={q.id}
                      onClick={() => goToQuestion(index)}
                      className={`
                        w-full p-3 rounded-lg text-left transition-colors
                        ${isCurrent 
                          ? 'bg-green-100 border-2 border-green-500' 
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
                            ? 'bg-green-500 text-white'
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
                          {q.question.substring(0, 20)}...
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
                    {score}/{n5ParaphraseQuestions.length}
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
