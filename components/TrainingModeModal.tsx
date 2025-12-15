'use client';

import { useState } from 'react';
import { X, Zap, BookOpen, Keyboard } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TrainingModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: string[];
  itemType: 'kanji' | 'vocabulary';
  selectedData: any[];
}

export default function TrainingModeModal({
  isOpen,
  onClose,
  selectedItems,
  itemType,
  selectedData
}: TrainingModeModalProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  if (!isOpen) return null;

  const handleModeSelect = async (mode: 'match' | 'flashcard' | 'input') => {
    setIsNavigating(true);
    
    try {
      // Store selected data in localStorage for the training page
      const storageKey = itemType === 'kanji' ? 'selectedKanjiData' : 'selectedVocabularyData';
      localStorage.setItem(storageKey, JSON.stringify(selectedData));
      
      // Navigate to the appropriate training mode
      if (mode === 'match') {
        router.push(`/match?type=${itemType}&items=${selectedItems.join(',')}`);
      } else if (mode === 'flashcard') {
        router.push(`/flashcard?type=${itemType}&items=${selectedItems.join(',')}`);
      } else if (mode === 'input') {
        router.push(`/input?type=${itemType}&items=${selectedItems.join(',')}`);
      }
      
      onClose();
    } catch (error) {
      console.error('Error navigating to training mode:', error);
      setIsNavigating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors z-10"
          disabled={isNavigating}
        >
          <X size={24} />
        </button>

        {/* Modal content */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Choose Training Mode
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            Select how you'd like to study your {selectedItems.length} selected {itemType}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Match Mode */}
            <button
              onClick={() => handleModeSelect('match')}
              disabled={isNavigating}
              className="group relative overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-700 border-b-4 border-b-gray-300 dark:border-b-gray-600 hover:border-pink-400 dark:hover:border-pink-500 hover:border-b-pink-500 dark:hover:border-b-pink-500 bg-white dark:bg-gray-700 p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute top-3 left-3">
                <Zap className="w-5 h-5 text-pink-500" />
              </div>
              <div className="relative pt-12">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Match
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Multiple choice questions
                </p>
              </div>
            </button>

            {/* Flashcard Mode */}
            <button
              onClick={() => handleModeSelect('flashcard')}
              disabled={isNavigating}
              className="group relative overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-700 border-b-4 border-b-gray-300 dark:border-b-gray-600 hover:border-pink-400 dark:hover:border-pink-500 hover:border-b-pink-500 dark:hover:border-b-pink-500 bg-white dark:bg-gray-700 p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute top-3 left-3">
                <BookOpen className="w-5 h-5 text-pink-500" />
              </div>
              <div className="relative pt-12">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Flashcard
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Interactive 3D cards
                </p>
              </div>
            </button>

            {/* Input/Typing Mode */}
            <button
              onClick={() => handleModeSelect('input')}
              disabled={isNavigating}
              className="group relative overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-700 border-b-4 border-b-gray-300 dark:border-b-gray-600 hover:border-pink-400 dark:hover:border-pink-500 hover:border-b-pink-500 dark:hover:border-b-pink-500 bg-white dark:bg-gray-700 p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute top-3 left-3">
                <Keyboard className="w-5 h-5 text-pink-500" />
              </div>
              <div className="relative pt-12">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Input
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Type the reading
                </p>
              </div>
            </button>
          </div>

          {isNavigating && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pink-500"></div>
                <span className="text-lg">Loading training mode...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
