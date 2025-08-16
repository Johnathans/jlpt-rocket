'use client';

import { useState, useEffect } from 'react';
import { RotateCcw, Home } from 'lucide-react';
import Lottie from 'lottie-react';

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
  const [animationData, setAnimationData] = useState(null);

  // Load Lottie animation
  useEffect(() => {
    // Load the extracted Lottie animation JSON
    fetch('/rocket-launch-animation.json')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load animation');
        return response.json();
      })
      .then(data => {
        console.log('Loaded rocket launch animation successfully!');
        setAnimationData(data);
      })
      .catch(error => {
        console.log('Using fallback animation:', error);
        setAnimationData(null);
      });
  }, []);

  // Animate XP counter
  useEffect(() => {
    const timer = setTimeout(() => {
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
      }, 50);
    }, 1000);

    return () => clearTimeout(timer);
  }, [xpGained]);

  const percentage = Math.round((score / totalQuestions) * 100);
  const isGoodScore = percentage >= 80;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        {/* Rocket Animation */}
        <div className="text-center mb-8">
          <div className="w-80 h-80 mx-auto mb-4 flex items-center justify-center">
            {animationData ? (
              <Lottie 
                animationData={animationData}
                style={{ width: 320, height: 320 }}
                loop={false}
                autoplay={true}
              />
            ) : (
              <div className="w-80 h-80 flex items-center justify-center animate-bounce">
                <div className="text-9xl">🚀</div>
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isGoodScore ? 'Excellent Work!' : 'Training Complete!'}
          </h1>
          <p className="text-lg text-gray-600">
            You scored {score}/{totalQuestions} ({percentage}%)
          </p>
        </div>

        {/* XP Gained */}
        {showContent && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full shadow-lg animate-pulse">
              <span className="text-lg font-bold">+{displayedXP} XP</span>
            </div>
          </div>
        )}

        {/* Wrong Answers Section */}
        {showContent && wrongAnswers.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-6 max-w-2xl w-full mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Review Missed Questions ({wrongAnswers.length})
            </h2>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {wrongAnswers.map((answer) => (
                <div key={answer.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-japanese font-bold text-gray-900">
                          {answer.character}
                        </span>
                        {answer.reading && (
                          <span className="text-sm text-gray-600 font-japanese">
                            {answer.reading}
                          </span>
                        )}
                      </div>
                      <div className="text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium">Your answer:</span> {answer.userAnswer}
                        </p>
                        <p className="text-gray-900">
                          <span className="font-medium">Correct answer:</span> {answer.correctAnswer}
                        </p>
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
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg w-full">
            {wrongAnswers.length > 0 && (
              <button
                onClick={onPracticeMissed}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white hover:bg-gray-700 font-semibold transition-colors rounded-lg"
              >
                <RotateCcw className="h-5 w-5" />
                Practice Missed ({wrongAnswers.length})
              </button>
            )}
            <button
              onClick={onGoHome}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white hover:bg-green-700 font-semibold transition-colors rounded-lg"
            >
              <Home className="h-5 w-5" />
              Continue
            </button>
          </div>
        )}
    </div>
  );
}
