'use client';

import React, { useState, useEffect } from 'react';
import { X, Flame, Calendar, TrendingUp } from 'lucide-react';
import { StreakSystemSupabase as StreakSystem } from '@/lib/streakSystemSupabase';

interface StreakModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StreakModal({ isOpen, onClose }: StreakModalProps) {
  const [streakInfo, setStreakInfo] = useState({ currentStreak: 0, totalDays: 0 });

  useEffect(() => {
    const loadStreakData = async () => {
      if (isOpen) {
        const data = await StreakSystem.getStreakData();
        const totalDays = Object.values(data.dailyStreaks).filter(Boolean).length;
        setStreakInfo({
          currentStreak: data.currentStreak,
          totalDays
        });
      }
    };
    loadStreakData();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Your Streak</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Current Streak - Large Display */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 mx-auto mb-4">
              <Flame className="w-10 h-10 text-white" />
            </div>
            <div className="text-6xl font-bold text-gray-900 mb-2">{streakInfo.currentStreak}</div>
            <div className="text-lg text-gray-600">day streak</div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="h-5 w-5 text-pink-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{streakInfo.totalDays}</div>
              <div className="text-sm text-gray-600 mt-1">total days</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-5 w-5 text-pink-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{streakInfo.currentStreak}</div>
              <div className="text-sm text-gray-600 mt-1">current streak</div>
            </div>
          </div>

          {/* Message */}
          <div className="bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-700">
              {streakInfo.currentStreak > 0 
                ? 'Keep learning every day to maintain your streak! 🔥'
                : 'Start learning today to begin your streak! 🚀'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
