'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface StoryHeaderProps {
  currentStep?: number;
  totalSteps?: number;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  showNavigation?: boolean;
}

export default function StoryHeader({
  currentStep = 3,
  totalSteps = 7,
  onClose,
  onPrevious,
  onNext,
  showNavigation = true
}: StoryHeaderProps) {
  return (
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
        
        {/* Center: Navigation and Progress */}
        {showNavigation && (
          <div className="flex items-center space-x-4">
            <button 
              onClick={onPrevious}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              disabled={!onPrevious}
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <span className="text-lg font-medium text-gray-700">
              {currentStep}/{totalSteps}
            </span>
            <button 
              onClick={onNext}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              disabled={!onNext}
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        )}
        
        {/* Right: Close Button */}
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
