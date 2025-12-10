'use client';

import React from 'react';
import { X, Target } from 'lucide-react';
import { useJLPTLevel } from '@/contexts/JLPTLevelContext';

interface LevelSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LevelSwitcherModal({ isOpen, onClose }: LevelSwitcherModalProps) {
  const { currentLevel, setCurrentLevel } = useJLPTLevel();

  if (!isOpen) return null;

  const levels: Array<'N5' | 'N4' | 'N3' | 'N2' | 'N1'> = ['N5', 'N4', 'N3', 'N2', 'N1'];
  
  const levelDescriptions: Record<string, string> = {
    'N5': 'Basic - Beginner level',
    'N4': 'Elementary - Basic conversations',
    'N3': 'Intermediate - Daily situations',
    'N2': 'Advanced - Professional contexts',
    'N1': 'Expert - Native-like fluency'
  };

  const handleLevelSelect = (level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1') => {
    setCurrentLevel(level);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Change Level</h2>
            <p className="text-sm text-gray-600">Select your target JLPT level</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Level Options */}
        <div className="p-6 space-y-3">
          {levels.map((level) => {
            const isSelected = level === currentLevel;
            
            return (
              <button
                key={level}
                onClick={() => handleLevelSelect(level)}
                className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 hover:border-pink-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                    isSelected
                      ? 'bg-gradient-to-r from-pink-500 to-orange-500'
                      : 'bg-gray-100'
                  }`}>
                    <span className={`text-xl font-black ${
                      isSelected ? 'text-white' : 'text-gray-600'
                    }`}>
                      {level}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className={`text-lg font-bold ${
                      isSelected ? 'text-pink-600' : 'text-gray-900'
                    }`}>
                      {level}
                    </div>
                    <div className="text-sm text-gray-600">
                      {levelDescriptions[level]}
                    </div>
                  </div>
                </div>
                {isSelected && (
                  <Target className="h-5 w-5 text-pink-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <div className="bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 rounded-lg p-4">
            <p className="text-sm text-gray-700 text-center">
              Your progress will be saved. You can switch levels anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
