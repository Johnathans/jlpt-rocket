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
}

export default function TrainingHeader({ 
  progress, 
  onClose, 
  onSettings, 
  closeHref = "/" 
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
    <div className="sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
        {/* Close Button */}
        <div className="flex-shrink-0">
          {onClose ? (
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center p-3 text-red-700 bg-red-100 rounded-lg transition-colors border-b-4 border-red-300 hover:bg-red-200 hover:border-red-400"
            >
              <X className="h-6 w-6" />
            </button>
          ) : (
            <Link
              href={closeHref}
              className="inline-flex items-center justify-center p-3 text-red-700 bg-red-100 rounded-lg transition-colors border-b-4 border-red-300 hover:bg-red-200 hover:border-red-400"
            >
              <X className="h-6 w-6" />
            </Link>
          )}
        </div>
        
        {/* Inline Progress Bar with Review Bubble */}
        <div className="flex-1 flex justify-center items-center gap-2 sm:gap-3 mx-2 sm:mx-4">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
            />
          </div>
          {/* Review Bubble */}
          <div className="w-4 h-3 sm:w-6 bg-gray-400 rounded-full flex-shrink-0"></div>
        </div>
        
        {/* Settings Button */}
        <div className="flex-shrink-0">
          <button
            onClick={handleSettingsClick}
            className="p-3 text-gray-900 bg-gray-100 rounded-lg transition-colors border-b-4 border-gray-300 hover:bg-gray-200 hover:border-gray-400"
          >
            <Settings className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
