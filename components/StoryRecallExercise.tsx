'use client';

import { useState, useEffect } from 'react';
import { Volume2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface RecallItem {
  id: string;
  japanese: string;
  reading?: string;
  english: string;
  audio?: string;
  type: 'match' | 'listen';
}

interface RecallExerciseProps {
  items: RecallItem[];
  onClose: () => void;
  onComplete: () => void;
}

export default function StoryRecallExercise({
  items,
  onClose,
  onComplete
}: RecallExerciseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const currentItem = items[currentIndex];
  const progress = ((currentIndex + 1) / items.length) * 100;

  // Generate answer options (current correct answer + 2-3 wrong ones)
  const generateOptions = () => {
    const correctAnswer = currentItem.english;
    const wrongAnswers = items
      .filter(item => item.id !== currentItem.id)
      .map(item => item.english)
      .slice(0, 3);
    
    const allOptions = [correctAnswer, ...wrongAnswers];
    return allOptions.sort(() => Math.random() - 0.5);
  };

  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    setOptions(generateOptions());
    setSelectedAnswer(null);
    setShowResult(false);
  }, [currentIndex]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === currentItem.english;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
    
    setShowResult(true);
    
    // Auto advance after 1.5 seconds
    setTimeout(() => {
      if (currentIndex < items.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        onComplete();
      }
    }, 1500);
  };

  const playAudio = () => {
    // Audio playback logic would go here
    console.log('Playing audio for:', currentItem.japanese);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Story Learning Header - Matches Reference Image */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left: JLPT Rocket Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/6110736_rocket_spaceship_icon (2).png" 
              alt="Rocket JLPT Logo" 
              className="h-8 w-8 flex-shrink-0"
            />
            <span className="text-xl text-gray-900">
              <span className="font-black">Rocket</span>
              <span className="font-medium ml-1">JLPT</span>
            </span>
          </div>
          
          {/* Center: Progress Bar */}
          <div className="flex-1 mx-12">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {/* Right: Close Button */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col min-h-screen">
        {/* Question Area */}
        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="max-w-2xl w-full">
            <div className="text-center mb-8">
              <h2 className="text-lg font-medium text-gray-600 mb-4">
                {currentItem.type === 'listen' ? 'Listen and choose the correct answer' : 'Match the items'}
              </h2>
            </div>

            {/* Question Section */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              {currentItem.type === 'listen' ? (
                // Listening Exercise
                <div className="text-center">
                  <button
                    onClick={playAudio}
                    className="w-20 h-20 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center mb-6 mx-auto transition-colors"
                  >
                    <Volume2 className="w-8 h-8 text-gray-600" />
                  </button>
                  
                  {/* Audio visualization placeholder */}
                  <div className="w-32 h-8 bg-green-100 rounded mx-auto mb-8"></div>
                </div>
              ) : (
                // Matching Exercise
                <div className="text-center">
                  <div className="mb-8">
                    <Volume2 className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-6xl font-bold text-gray-900 mb-4">
                      {currentItem.japanese}
                    </h3>
                    {currentItem.reading && (
                      <p className="text-2xl text-gray-600 mb-6">({currentItem.reading})</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Answer Options Bar - Bottom */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentItem.english;
                const showCorrectAnswer = showResult && isCorrect;
                const showWrongAnswer = showResult && isSelected && !isCorrect;
                
                return (
                  <button
                    key={index}
                    onClick={() => !showResult && handleAnswerSelect(option)}
                    disabled={showResult}
                    className={`p-4 text-center rounded-lg border-2 transition-all ${
                      showCorrectAnswer
                        ? 'bg-green-100 border-green-300 text-green-800'
                        : showWrongAnswer
                        ? 'bg-red-100 border-red-300 text-red-800'
                        : isSelected
                        ? 'bg-blue-100 border-blue-300 text-blue-800'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="font-medium text-sm">{option}</span>
                      
                      {showResult && isCorrect && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Result Feedback - Overlay */}
        {showResult && (
          <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-10">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg ${
              selectedAnswer === currentItem.english
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}>
              {selectedAnswer === currentItem.english ? (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Correct!</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Incorrect</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
