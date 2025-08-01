'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useReviewStore } from '@/lib/store/useReviewStore';
import { ReviewSettings } from '@/lib/reviewSystem';
import { ArrowLeft, Save, RotateCcw, Info } from 'lucide-react';

export default function ReviewSettingsPage() {
  const { reviewSettings, updateReviewSettings } = useReviewStore();
  const [settings, setSettings] = useState<ReviewSettings>(reviewSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(reviewSettings);
  }, [reviewSettings]);

  const handleSave = () => {
    updateReviewSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const defaultSettings: ReviewSettings = {
      maxReviewsPerRound: 5,
      reviewOrder: 'due_date',
      maxReviewsPerDay: 50,
      intervals: {
        mastered0: 0,
        mastered25: 1,
        mastered50: 10,
        mastered75: 30,
        mastered100: 180
      }
    };
    setSettings(defaultSettings);
  };

  const updateInterval = (key: keyof ReviewSettings['intervals'], value: number) => {
    setSettings(prev => ({
      ...prev,
      intervals: {
        ...prev.intervals,
        [key]: value
      }
    }));
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/review" 
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Review Settings</h1>
        </div>

        {/* Settings Form */}
        <div className="space-y-8">
          {/* Spaced Repetition Intervals */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Spaced Repetition Intervals</h2>
              <div className="group relative">
                <Info className="h-4 w-4 text-gray-400 cursor-help" />
                <div className="absolute left-0 top-6 w-80 p-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  Configure how long to wait before reviewing items again based on mastery level. 
                  Items are considered mastered after 4 correct answers.
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* 0% Mastered */}
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">0% Mastered (0 correct)</h3>
                  <p className="text-sm text-gray-600">Items answered incorrectly or never seen</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    max="365"
                    value={settings.intervals.mastered0}
                    onChange={(e) => updateInterval('mastered0', parseInt(e.target.value) || 0)}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <span className="text-sm text-gray-600 w-12">days</span>
                </div>
              </div>

              {/* 25% Mastered */}
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">25% Mastered (1 correct)</h3>
                  <p className="text-sm text-gray-600">Items answered correctly once</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    max="365"
                    value={settings.intervals.mastered25}
                    onChange={(e) => updateInterval('mastered25', parseInt(e.target.value) || 0)}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <span className="text-sm text-gray-600 w-12">days</span>
                </div>
              </div>

              {/* 50% Mastered */}
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">50% Mastered (2 correct)</h3>
                  <p className="text-sm text-gray-600">Items answered correctly twice</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    max="365"
                    value={settings.intervals.mastered50}
                    onChange={(e) => updateInterval('mastered50', parseInt(e.target.value) || 0)}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <span className="text-sm text-gray-600 w-12">days</span>
                </div>
              </div>

              {/* 75% Mastered */}
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">75% Mastered (3 correct)</h3>
                  <p className="text-sm text-gray-600">Items answered correctly three times</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    max="365"
                    value={settings.intervals.mastered75}
                    onChange={(e) => updateInterval('mastered75', parseInt(e.target.value) || 0)}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <span className="text-sm text-gray-600 w-12">days</span>
                </div>
              </div>

              {/* 100% Mastered */}
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">100% Mastered (4+ correct)</h3>
                  <p className="text-sm text-gray-600">Items fully mastered</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    max="365"
                    value={settings.intervals.mastered100}
                    onChange={(e) => updateInterval('mastered100', parseInt(e.target.value) || 0)}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <span className="text-sm text-gray-600 w-12">days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Session Settings */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Session Settings</h2>
            
            <div className="space-y-6">
              {/* Max Reviews Per Round */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Max Reviews Per Round</h3>
                  <p className="text-sm text-gray-600">Maximum number of items to review in one session</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={settings.maxReviewsPerRound}
                    onChange={(e) => setSettings(prev => ({ ...prev, maxReviewsPerRound: parseInt(e.target.value) || 1 }))}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <span className="text-sm text-gray-600 w-12">items</span>
                </div>
              </div>

              {/* Max Reviews Per Day */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Max Reviews Per Day</h3>
                  <p className="text-sm text-gray-600">Daily limit for review sessions</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={settings.maxReviewsPerDay}
                    onChange={(e) => setSettings(prev => ({ ...prev, maxReviewsPerDay: parseInt(e.target.value) || 1 }))}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <span className="text-sm text-gray-600 w-12">items</span>
                </div>
              </div>

              {/* Review Order */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Review Order</h3>
                  <p className="text-sm text-gray-600">How to order items in review sessions</p>
                </div>
                <select
                  value={settings.reviewOrder}
                  onChange={(e) => setSettings(prev => ({ ...prev, reviewOrder: e.target.value as any }))}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="due_date">Due Date</option>
                  <option value="random">Random</option>
                  <option value="difficulty">Difficulty</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset to Defaults
          </button>
          
          <button
            onClick={handleSave}
            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              saved 
                ? 'bg-green-500 text-white' 
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            <Save className="h-4 w-4" />
            {saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
