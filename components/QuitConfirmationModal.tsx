'use client';

import { X } from 'lucide-react';

interface QuitConfirmationModalProps {
  isOpen: boolean;
  onKeepLearning: () => void;
  onQuit: () => void;
}

export default function QuitConfirmationModal({ 
  isOpen, 
  onKeepLearning, 
  onQuit 
}: QuitConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Leave training?
        </h2>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-base mb-8">
          Your progress won't be saved if you quit now.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col gap-3">
          {/* Keep Learning Button - Pink/Orange Gradient */}
          <button
            onClick={onKeepLearning}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Keep Learning
          </button>
          
          {/* Quit Button - Minimal */}
          <button
            onClick={onQuit}
            className="w-full py-3.5 px-6 text-gray-600 dark:text-gray-400 font-medium bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
          >
            Quit
          </button>
        </div>
      </div>
    </div>
  );
}
