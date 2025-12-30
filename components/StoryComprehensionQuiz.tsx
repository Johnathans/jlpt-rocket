'use client';

import { useState } from 'react';
import { ComprehensionQuestion } from '@/data/pageStoryData';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

interface StoryComprehensionQuizProps {
  questions: ComprehensionQuestion[];
  onComplete: (score: number) => void;
}

export default function StoryComprehensionQuiz({ questions, onComplete }: StoryComprehensionQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(questions.length).fill(false));

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowFeedback(true);
    
    if (isCorrect && !answeredQuestions[currentQuestionIndex]) {
      setScore(score + 1);
      setAnsweredQuestions(prev => {
        const newAnswered = [...prev];
        newAnswered[currentQuestionIndex] = true;
        return newAnswered;
      });
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      onComplete(score + (isCorrect && !answeredQuestions[currentQuestionIndex] ? 1 : 0));
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Comprehension Quiz</h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <p className="text-sm font-semibold text-gray-700">
              Score: {score}/{questions.length}
            </p>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Question */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <p className="text-2xl md:text-3xl font-light font-japanese text-gray-900 mb-4 leading-relaxed">
            {currentQuestion.question}
          </p>
          <p className="text-lg text-gray-600">
            {currentQuestion.questionEnglish}
          </p>
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === currentQuestion.correctAnswer;
            const showCorrect = showFeedback && isCorrectAnswer;
            const showIncorrect = showFeedback && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback}
                className={`w-full p-5 rounded-xl text-left font-japanese text-lg transition-all ${
                  showCorrect
                    ? 'bg-green-100 border-2 border-green-500'
                    : showIncorrect
                    ? 'bg-red-100 border-2 border-red-500'
                    : isSelected
                    ? 'bg-pink-50 border-2 border-pink-500'
                    : 'bg-white border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">{option}</span>
                  {showCorrect && <CheckCircle2 className="h-6 w-6 text-green-600" />}
                  {showIncorrect && <XCircle className="h-6 w-6 text-red-600" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`rounded-xl p-6 mb-6 ${
            isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
          }`}>
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              ) : (
                <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
              )}
              <div>
                <p className={`font-semibold mb-2 ${isCorrect ? 'text-green-900' : 'text-red-900'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-gray-700 font-japanese leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          {!showFeedback ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                selectedAnswer === null
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:shadow-lg'
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              {isLastQuestion ? 'See Results' : 'Next Question'}
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2.5 mt-8">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2.5 rounded-full transition-all ${
                index === currentQuestionIndex
                  ? 'w-10 bg-gradient-to-r from-pink-500 to-orange-500'
                  : index < currentQuestionIndex
                  ? 'w-2.5 bg-green-500'
                  : 'w-2.5 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
