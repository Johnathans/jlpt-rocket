'use client';

import { User, Trophy, Target, Calendar, Zap } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="p-6">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
              <p className="text-gray-600">Track your Japanese learning progress</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="h-6 w-6 text-yellow-500" />
                <h3 className="font-semibold text-gray-900">Current Streak</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">7 days</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="h-6 w-6 text-green-500" />
                <h3 className="font-semibold text-gray-900">Stories Read</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">12</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Target className="h-6 w-6 text-blue-500" />
                <h3 className="font-semibold text-gray-900">Words Learned</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">248</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">JLPT Progress</h2>
            <div className="space-y-4">
              {['N5', 'N4', 'N3', 'N2', 'N1'].map((level, index) => {
                const progress = Math.max(0, 100 - (index * 20));
                return (
                  <div key={level} className="flex items-center gap-4">
                    <span className="font-semibold text-gray-700 w-8">{level}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12">{progress}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}