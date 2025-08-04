'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Play, ArrowLeft, ArrowRight, Volume2 } from 'lucide-react';
import StoryModuleHeader from '@/components/StoryModuleHeader';
import { useTTS } from '@/lib/useTTS';

interface StoryModuleClientProps {
  story: {
    id: number;
    title: string;
    titleEn: string;
    level: string;
    wordCount: number;
    description: string;
    content: string;
    imageUrl: string;
    vocabulary?: Array<{
      id: number;
      word: string;
      reading: string;
      meaning: string;
      type: string;
      known: boolean;
    }>;
  };
}

export default function StoryModuleClient({ story }: StoryModuleClientProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  
  const { speak, isLoading, isPlaying } = useTTS();
  
  const totalSteps = 4;

  // Split story content into sentences
  const sentences = story.content.split('。').filter(s => s.trim()).map(s => s + '。');
  const vocabularyItems = story.vocabulary || [];

  const handleClose = () => {
    router.push(`/story/${story.id}`);
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setCurrentFlashcardIndex(0);
      setCurrentSentenceIndex(0);
      setShowAnswer(false);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setCurrentFlashcardIndex(0);
      setCurrentSentenceIndex(0);
      setShowAnswer(false);
    }
  };

  const handlePlayStory = async () => {
    try {
      await speak(story.content);
    } catch (error) {
      console.error('TTS Error:', error);
    }
  };

  const handlePlayFlashcard = async (text: string) => {
    try {
      await speak(text);
    } catch (error) {
      console.error('TTS Error:', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: // Listen to Story
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
            <div className="max-w-md w-full text-center">
              <img
                src={story.imageUrl}
                alt={story.titleEn}
                className="w-full h-64 object-cover rounded-lg mb-8 shadow-lg"
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Listen to the Story
              </h2>
              <p className="text-gray-600 mb-8">
                Listen carefully to the full story before moving to the next step.
              </p>
              <button
                onClick={handlePlayStory}
                disabled={isLoading || isPlaying}
                className="w-32 h-32 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 disabled:scale-100"
              >
                {isLoading || isPlaying ? (
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
                ) : (
                  <Play className="h-12 w-12 ml-2" />
                )}
              </button>
            </div>
          </div>
        );

      case 2: // Flashcards
        const currentItem = vocabularyItems[currentFlashcardIndex];
        if (!currentItem) {
          return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
              <div className="text-center max-w-md">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-xl text-gray-600 mb-8">No vocabulary items available</p>
                <button
                  onClick={handleNextStep}
                  className="inline-flex items-center justify-center px-8 py-4 text-white bg-green-500 hover:bg-green-600 font-semibold transition-colors rounded-lg border-b-4 border-green-600 hover:border-green-700"
                >
                  Continue to Reading
                </button>
              </div>
            </div>
          );
        }

        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
            <div className="max-w-md w-full">
              {/* Progress indicator */}
              <div className="text-center mb-8">
                <span className="text-sm text-gray-500">
                  {currentFlashcardIndex + 1} of {vocabularyItems.length}
                </span>
              </div>
              
              {/* Flashcard */}
              <div 
                className="bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer transition-all hover:shadow-xl mb-6"
                onClick={() => setShowAnswer(!showAnswer)}
              >
                <div className="text-4xl font-bold text-black font-japanese mb-4">
                  {currentItem.word}
                </div>
                
                {showAnswer && (
                  <div className="space-y-2">
                    <div className="text-lg text-gray-600 font-japanese">
                      {currentItem.reading}
                    </div>
                    <div className="text-lg text-gray-800">
                      {currentItem.meaning}
                    </div>
                  </div>
                )}
                
                {!showAnswer && (
                  <div className="text-sm text-gray-400 mt-4">
                    Tap to reveal
                  </div>
                )}
              </div>

              {/* Audio button */}
              <div className="flex justify-center mb-6">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayFlashcard(currentItem.word);
                  }}
                  disabled={isLoading || isPlaying}
                  className="inline-flex items-center justify-center p-4 text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 rounded-lg transition-colors border-b-4 border-blue-600 hover:border-blue-700 disabled:border-gray-500"
                >
                  {isLoading || isPlaying ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                  ) : (
                    <Volume2 className="h-6 w-6" />
                  )}
                </button>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    if (currentFlashcardIndex > 0) {
                      setCurrentFlashcardIndex(currentFlashcardIndex - 1);
                      setShowAnswer(false);
                    }
                  }}
                  disabled={currentFlashcardIndex === 0}
                  className="inline-flex items-center justify-center p-3 text-gray-900 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 rounded-lg transition-colors border-b-4 border-gray-300 hover:border-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
                
                <button
                  onClick={() => {
                    if (currentFlashcardIndex < vocabularyItems.length - 1) {
                      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
                      setShowAnswer(false);
                    } else {
                      handleNextStep();
                    }
                  }}
                  className="inline-flex items-center justify-center p-3 text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors border-b-4 border-green-600 hover:border-green-700"
                >
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        );

      case 3: // Read Story
        const currentSentence = sentences[currentSentenceIndex];
        if (!currentSentence) {
          return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
              <p className="text-xl text-gray-600 mb-8">Story reading complete</p>
              <button
                onClick={handleNextStep}
                className="px-6 py-3 bg-green-500 text-white hover:bg-green-600 font-semibold transition-all rounded-lg"
              >
                Continue to Matching
              </button>
            </div>
          );
        }

        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
            <div className="max-w-2xl w-full">
              <img
                src={story.imageUrl}
                alt={story.titleEn}
                className="w-full h-48 object-cover rounded-lg mb-8 shadow-lg"
              />
              
              <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-6">
                <div className="text-2xl font-japanese leading-relaxed text-gray-900">
                  {currentSentence}
                </div>
              </div>

              <div className="text-center mb-6">
                <span className="text-sm text-gray-500">
                  {currentSentenceIndex + 1} of {sentences.length}
                </span>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => {
                    if (currentSentenceIndex > 0) {
                      setCurrentSentenceIndex(currentSentenceIndex - 1);
                    }
                  }}
                  disabled={currentSentenceIndex === 0}
                  className="px-6 py-3 text-gray-600 border border-gray-300 hover:bg-gray-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                
                <button
                  onClick={() => {
                    if (currentSentenceIndex < sentences.length - 1) {
                      setCurrentSentenceIndex(currentSentenceIndex + 1);
                    } else {
                      handleNextStep();
                    }
                  }}
                  className="px-6 py-3 bg-green-500 text-white hover:bg-green-600 font-semibold transition-all rounded-lg"
                >
                  {currentSentenceIndex < sentences.length - 1 ? 'Next' : 'Continue'}
                </button>
              </div>
            </div>
          </div>
        );

      case 4: // Match Words
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
            <div className="max-w-md w-full text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Match the Words
              </h2>
              <p className="text-gray-600 mb-8">
                Coming soon! This will be a matching exercise for the vocabulary you just learned.
              </p>
              <button
                onClick={() => router.push(`/story/${story.id}`)}
                className="px-6 py-3 bg-green-500 text-white hover:bg-green-600 font-semibold transition-all rounded-lg"
              >
                Complete Module
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <StoryModuleHeader
        currentStep={currentStep}
        totalSteps={totalSteps}
        onClose={handleClose}
      />
      
      <div className="pb-20">
        {renderStep()}
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-between max-w-4xl mx-auto">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 text-gray-600 border border-gray-300 hover:bg-gray-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Previous Step
          </button>
          
          <button
            onClick={handleNextStep}
            disabled={currentStep === totalSteps}
            className="px-6 py-3 bg-green-500 text-white hover:bg-green-600 font-semibold transition-all rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}
