'use client';

import { X, Settings, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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
  const [xp, setXp] = useState(0);

  useEffect(() => {
    // Load XP from localStorage on client side
    const storedXP = localStorage.getItem('userXP');
    setXp(storedXP ? parseInt(storedXP) : 0);
  }, []);
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Close Button */}
        <div className="flex-shrink-0">
          {onClose ? (
            <button
              onClick={onClose}
              className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors border-b-4 border-transparent hover:border-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          ) : (
            <Link
              href={closeHref}
              className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors border-b-4 border-transparent hover:border-gray-300"
            >
              <X className="h-6 w-6" />
            </Link>
          )}
        </div>
        
        {/* Inline Progress Bar - Thicker */}
        <div className="flex-1 mx-8">
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-6 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
            />
          </div>
        </div>
        
        {/* XP Counter and Settings Button */}
        <div className="flex-shrink-0 flex items-center gap-3">
          {/* XP Counter */}
          <div className="flex items-center gap-2 px-3 py-2 bg-yellow-500 text-white rounded-lg shadow-sm">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-bold">{xp} XP</span>
          </div>
          
          {/* Settings Button */}
          <button
            onClick={onSettings}
            className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors border-b-4 border-transparent hover:border-gray-300"
          >
            <Settings className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
