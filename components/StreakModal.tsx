'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { StreakSystem } from '@/lib/streakSystem';

interface StreakModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StreakModal({ isOpen, onClose }: StreakModalProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [streakData, setStreakData] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load streak data from StreakSystem
    const loadStreakData = () => {
      const data = StreakSystem.getStreakData();
      setStreakData(data.dailyStreaks);
    };
    loadStreakData();
  }, [isOpen]);

  if (!isOpen) return null;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday (0) to be last (6)
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isToday = (year: number, month: number, day: number) => {
    const today = new Date();
    return year === today.getFullYear() && 
           month === today.getMonth() && 
           day === today.getDate();
  };

  const hasStreak = (year: number, month: number, day: number) => {
    const dateKey = formatDateKey(year, month, day);
    return streakData?.[dateKey] || false;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-16 h-16"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentDay = isToday(year, month, day);
      const hasActivity = hasStreak(year, month, day);
      
      days.push(
        <div
          key={day}
          className={`
            w-16 h-16 flex flex-col items-center justify-center text-lg font-medium relative
            ${isCurrentDay ? 'border-2 border-gray-800 rounded-lg' : ''}
          `}
        >
          <span className="text-gray-700 text-sm mb-1">{day}</span>
          <Zap 
            className={`w-6 h-6 ${
              hasActivity 
                ? 'text-orange-500 fill-orange-500' 
                : 'text-gray-300'
            }`}
          />
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-yellow-500 fill-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-900">Start a new streak</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Description */}
        <div className="px-6 pt-4">
          <p className="text-gray-600 text-center">
            Learn today to start a streak. Continue learning every day to increase it.
          </p>
        </div>

        {/* Calendar */}
        <div className="p-6">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <h3 className="text-lg font-semibold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map(day => (
              <div key={day} className="w-16 h-10 flex items-center justify-center">
                <span className="text-base font-medium text-gray-500">{day}</span>
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {renderCalendar()}
          </div>
        </div>
      </div>
    </div>
  );
}
