'use client';

import { X, Settings } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import AudioSettingsModal from './AudioSettingsModal';

interface TrainingHeaderProps {
  progress: number; // 0-100
  onClose?: () => void;
  onSettings?: () => void;
  closeHref?: string;
  rightButton?: React.ReactNode;
}

export default function TrainingHeader({ 
  progress, 
  onClose, 
  onSettings, 
  closeHref = "/",
  rightButton
}: TrainingHeaderProps) {
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const handleSettingsClick = () => {
    if (onSettings) {
      onSettings();
    } else {
      setShowSettingsModal(true);
    }
  };

  return (
    <>
      <AudioSettingsModal 
        isOpen={showSettingsModal} 
        onClose={() => setShowSettingsModal(false)} 
      />
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Close Button - Minimal */}
        <div className="flex-shrink-0">
          {onClose ? (
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
          ) : (
            <Link
              href={closeHref}
              className="inline-flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </Link>
          )}
        </div>
        
        {/* Inline Progress Bar */}
        <div className="flex-1 flex justify-center items-center mx-8">
          <div className="w-full max-w-md bg-gray-200 dark:bg-gray-800 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-pink-500 to-orange-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
            />
          </div>
        </div>
        
        {/* Settings Button - Minimal */}
        <div className="flex-shrink-0 flex items-center gap-2">
          {rightButton && rightButton}
          <button
            onClick={handleSettingsClick}
            className="inline-flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
