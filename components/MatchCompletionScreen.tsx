'use client';

import { useState, useEffect } from 'react';
import { RotateCcw, Home, CheckCircle, XCircle } from 'lucide-react';

interface WrongAnswer {
  id: string;
  character: string;
  meaning: string;
  reading?: string;
  userAnswer: string;
  correctAnswer: string;
  type: 'kanji' | 'vocabulary' | 'sentences';
}

interface MatchCompletionScreenProps {
  score: number;
  totalQuestions: number;
  wrongAnswers: WrongAnswer[];
  xpGained: number;
  onPracticeMissed: () => void;
  onGoHome: () => void;
}

export default function MatchCompletionScreen({
  score,
  totalQuestions,
  wrongAnswers,
  xpGained,
  onPracticeMissed,
  onGoHome
}: MatchCompletionScreenProps) {
  const [displayedXP, setDisplayedXP] = useState(0);
  const [showContent, setShowContent] = useState(false);

  // Animate XP counter
  useEffect(() => {
    setShowContent(true);
    // Animate XP counting up
    let current = 0;
    const increment = Math.ceil(xpGained / 20);
    const xpTimer = setInterval(() => {
      current += increment;
      if (current >= xpGained) {
        current = xpGained;
        clearInterval(xpTimer);
      }
      setDisplayedXP(current);
    }, 30);

    return () => clearInterval(xpTimer);
  }, [xpGained]);

  const percentage = Math.round((score / totalQuestions) * 100);
  const isGoodScore = percentage >= 80;

  const correctAnswers = score;
  const incorrectAnswers = wrongAnswers.length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Training Complete
          </h1>
          <p className="text-lg text-gray-600">
            {score} of {totalQuestions} correct ({percentage}%)
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Correct Answers */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Correct</span>
              <CheckCircle className="h-5 w-5" style={{ color: '#dfef87' }} />
            </div>
            <div className="text-3xl font-bold text-gray-900">{correctAnswers}</div>
          </div>

          {/* Incorrect Answers */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Incorrect</span>
              <XCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{incorrectAnswers}</div>
          </div>

          {/* XP Gained */}
          <div className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">XP Earned</span>
            </div>
            <div className="text-3xl font-bold">+{displayedXP}</div>
          </div>
        </div>

        {/* Wrong Answers Section */}
        {showContent && wrongAnswers.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <XCircle className="h-6 w-6 text-red-500" />
              Review Incorrect Answers
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {wrongAnswers.map((answer, index) => (
                <div key={answer.id} className="border border-gray-200 rounded-lg p-4 hover:border-pink-300 transition-colors">
                  <div className="flex items-start gap-4">
                    {/* Number Badge */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1">
                      {/* Character and Reading */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl font-japanese font-bold text-gray-900">
                          {answer.character}
                        </span>
                        {answer.reading && (
                          <span className="text-lg text-gray-600 font-japanese">
                            {answer.reading}
                          </span>
                        )}
                      </div>
                      
                      {/* Answers */}
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-xs font-medium text-gray-500 uppercase">Your Answer</span>
                            <p className="text-sm text-red-600 font-medium">{answer.userAnswer}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: '#dfef87' }} />
                          <div>
                            <span className="text-xs font-medium text-gray-500 uppercase">Correct Answer</span>
                            <p className="text-sm text-gray-900 font-medium">{answer.correctAnswer}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {showContent && (
          <div className="flex flex-col sm:flex-row gap-4">
            {wrongAnswers.length > 0 && (
              <button
                onClick={onPracticeMissed}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 hover:border-pink-300 hover:bg-pink-50 font-semibold transition-all rounded-lg"
              >
                <RotateCcw className="h-5 w-5" />
                Practice Missed ({wrongAnswers.length})
              </button>
            )}
            <button
              onClick={onGoHome}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold transition-all rounded-lg shadow-lg hover:shadow-xl"
            >
              <Home className="h-5 w-5" />
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
