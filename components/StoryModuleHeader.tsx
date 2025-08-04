'use client';

import { X, Settings, ToggleLeft, ToggleRight, BookOpen, Volume2, Eye, Target } from 'lucide-react';
import Link from 'next/link';

interface StoryModuleHeaderProps {
  currentStep: number; // 1-4
  totalSteps: number;
  onClose?: () => void;
  onSettings?: () => void;
  onClozeToggle?: () => void;
  clozeEnabled?: boolean;
  closeHref?: string;
}

const stepIcons = {
  1: Volume2,
  2: BookOpen,
  3: Eye,
  4: Target,
};

const stepLabels = {
  1: 'Listen',
  2: 'Flashcards',
  3: 'Read',
  4: 'Match',
};

export default function StoryModuleHeader({ 
  currentStep, 
  totalSteps,
  onClose, 
  onSettings, 
  onClozeToggle,
  clozeEnabled = false,
  closeHref = "/" 
}: StoryModuleHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Close Button */}
        <div className="flex-shrink-0">
          {onClose ? (
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center p-3 text-gray-900 bg-gray-100 rounded-lg transition-colors border-b-4 border-gray-300 hover:bg-gray-200 hover:border-gray-400"
            >
              <X className="h-6 w-6" />
            </button>
          ) : (
            <Link
              href={closeHref}
              className="inline-flex items-center justify-center p-3 text-gray-900 bg-gray-100 rounded-lg transition-colors border-b-4 border-gray-300 hover:bg-gray-200 hover:border-gray-400"
            >
              <X className="h-6 w-6" />
            </Link>
          )}
        </div>
        
        {/* Progress Bubbles with Labels */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-6">
            {Array.from({ length: totalSteps }, (_, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              const isCompleted = stepNumber < currentStep;
              const StepIcon = stepIcons[stepNumber as keyof typeof stepIcons];
              
              return (
                <div key={stepNumber} className="flex flex-col items-center gap-2">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-green-500 text-white shadow-md' 
                        : isCompleted
                        ? 'bg-green-400 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {StepIcon && <StepIcon className="h-4 w-4" />}
                  </div>
                  <div className={`text-xs font-medium transition-all ${
                    isActive ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {stepLabels[stepNumber as keyof typeof stepLabels]}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Progress Line */}
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200 -z-0">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
