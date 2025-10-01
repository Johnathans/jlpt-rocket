'use client';

import { useState } from 'react';
import { X, Zap, BookOpen } from 'lucide-react';
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

  const handleModeSelect = async (mode: 'match' | 'flashcard') => {
    setIsNavigating(true);
    
    try {
      // Store selected data in localStorage for the training page
      const storageKey = itemType === 'kanji' ? 'selectedKanjiData' : 'selectedVocabularyData';
      localStorage.setItem(storageKey, JSON.stringify(selectedData));
      
      // Navigate to the appropriate training mode
      if (mode === 'match') {
        router.push(`/match?type=${itemType}&items=${selectedItems.join(',')}`);
      } else {
        router.push(`/flashcard?type=${itemType}&items=${selectedItems.join(',')}`);
      }
      
      onClose();
    } catch (error) {
      console.error('Error navigating to training mode:', error);
      setIsNavigating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          disabled={isNavigating}
        >
          <X size={24} />
        </button>

        {/* Modal content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Choose Training Mode
          </h2>
          <p className="text-gray-600 mb-6">
            Select how you'd like to study your {selectedItems.length} selected {itemType}
          </p>

          <div className="space-y-4">
            {/* Match Mode */}
            <button
              onClick={() => handleModeSelect('match')}
              disabled={isNavigating}
              className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200 text-left group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Match Mode
                  </h3>
                  <p className="text-sm text-gray-600">
                    Multiple choice questions to test your knowledge quickly
                  </p>
                </div>
              </div>
            </button>

            {/* Flashcard Mode */}
            <button
              onClick={() => handleModeSelect('flashcard')}
              disabled={isNavigating}
              className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Flashcard Mode
                  </h3>
                  <p className="text-sm text-gray-600">
                    Interactive 3D cards for focused study and memorization
                  </p>
                </div>
              </div>
            </button>
          </div>

          {isNavigating && (
            <div className="mt-4 text-center">
              <div className="inline-flex items-center space-x-2 text-gray-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                <span>Loading training mode...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
