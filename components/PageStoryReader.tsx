'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { PageStory } from '@/data/pageStoryData';
import TrainingHeader from './TrainingHeader';
import StoryComprehensionQuiz from './StoryComprehensionQuiz';
import { addFurigana, initializeKuroshiro } from '@/lib/furigana';

interface PageStoryReaderProps {
  story: PageStory;
  onClose: () => void;
  onComplete: () => void;
}

export default function PageStoryReader({ story, onClose, onComplete }: PageStoryReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [processedText, setProcessedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [showEnglish, setShowEnglish] = useState(false);
  const [showFurigana, setShowFurigana] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const totalPages = story.pages.length;
  const page = story.pages[currentPage];

  useEffect(() => {
    const processTextWithFurigana = async () => {
      try {
        setIsLoading(true);
        await initializeKuroshiro();
        const furiganaContent = await addFurigana(page.japanese);
        setProcessedText(furiganaContent);
        setIsLoading(false);
      } catch (error) {
        console.error('Error processing text:', error);
        setProcessedText(page.japanese);
        setIsLoading(false);
      }
    };

    processTextWithFurigana();
  }, [currentPage, page.japanese]);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Show quiz after final page
      setShowQuiz(true);
    }
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    onComplete();
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const progressPercentage = ((currentPage + 1) / totalPages) * 100;

  // Show quiz if story is complete
  if (showQuiz) {
    return (
      <StoryComprehensionQuiz 
        questions={story.comprehensionQuestions}
        onComplete={handleQuizComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Training Header with white background */}
      <div className="bg-white">
        <TrainingHeader 
          progress={progressPercentage}
          onClose={onClose}
          closeHref="/page-stories"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Image card - white background, smaller size */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 mb-6">
          <div className="w-full">
            <img
              src={page.imageUrl}
              alt={`Page ${currentPage + 1}`}
              className="w-full h-auto"
              style={{ maxHeight: '350px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Text content - outside white container */}
        <div className="mb-8 px-2">
          {/* Japanese text with furigana */}
          <div className="text-center mb-8">
            {showFurigana && !isLoading ? (
              <div 
                className="text-3xl md:text-4xl font-light font-japanese text-gray-900 leading-relaxed tracking-wide"
                dangerouslySetInnerHTML={{ __html: processedText }}
              />
            ) : (
              <p className="text-3xl md:text-4xl font-light font-japanese text-gray-900 leading-relaxed tracking-wide">
                {page.japanese}
              </p>
            )}
          </div>

          {/* Toggle English button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowEnglish(!showEnglish)}
              className="flex items-center gap-2 px-5 py-2.5 text-gray-600 hover:text-pink-500 transition-colors text-sm font-medium"
            >
              {showEnglish ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showEnglish ? 'Hide Translation' : 'Show Translation'}
            </button>
          </div>

          {/* English translation - only shown when toggled */}
          {showEnglish && (
            <div className="text-center">
              <p className="text-lg text-gray-600">
                {page.english}
              </p>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center gap-4 mb-6">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              currentPage === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:text-pink-500 hover:bg-pink-50'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            Previous
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            {currentPage === totalPages - 1 ? 'Complete' : 'Next'}
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Page indicators */}
        <div className="flex justify-center gap-2.5 pb-8">
          {story.pages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === currentPage
                  ? 'w-10 bg-gradient-to-r from-pink-500 to-orange-500'
                  : 'w-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
