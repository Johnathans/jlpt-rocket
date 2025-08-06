'use client';

import { useState } from 'react';
import { CheckCircle, Lock, RotateCcw } from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  description: string[];
  status: 'completed' | 'available' | 'locked';
  type: 'lesson' | 'review' | 'recap';
  icon: string;
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Story 1 - Meeting Tanaka-san',
    subtitle: 'Basic Greetings',
    description: [
      'You arrive in Tokyo and meet your host family. Learn how to introduce yourself politely and make a great first impression with proper Japanese greetings.'
    ],
    status: 'completed',
    type: 'lesson',
    icon: '💬'
  },
  {
    id: 2,
    title: 'Review',
    subtitle: 'Review complete!',
    description: [],
    status: 'completed',
    type: 'review',
    icon: '🎯'
  },
  {
    id: 3,
    title: 'Story 2 - The Clock Tower',
    subtitle: 'Numbers and Time',
    description: [
      'You visit the famous Tokyo Clock Tower with Tanaka-san. Practice telling time and counting as you explore the city and plan your daily schedule.'
    ],
    status: 'completed',
    type: 'lesson',
    icon: '📝'
  },
  {
    id: 4,
    title: 'Story 3 - Family Photo',
    subtitle: 'Family and Relationships',
    description: [
      'Tanaka-san shows you old family photos and tells stories about each relative. Learn to describe family relationships and talk about ages in Japanese.'
    ],
    status: 'available',
    type: 'lesson',
    icon: '👨‍👩‍👧‍👦'
  },
  {
    id: 5,
    title: 'Review',
    subtitle: 'Practice numbers and family vocabulary',
    description: [],
    status: 'available',
    type: 'review',
    icon: '📝'
  },
  {
    id: 6,
    title: 'Story 4 - Ramen Adventure',
    subtitle: 'Food and Dining',
    description: [
      'You and Tanaka-san venture to a bustling ramen shop in Shibuya. Learn essential food vocabulary and practice ordering your first authentic Japanese meal.'
    ],
    status: 'locked',
    type: 'lesson',
    icon: '🍜'
  },
  {
    id: 7,
    title: 'Story 5 - Lost in Tokyo',
    subtitle: 'Transportation',
    description: [
      'After getting separated from Tanaka-san in the busy Tokyo station, you must navigate the complex train system and ask locals for directions to find your way back.'
    ],
    status: 'locked',
    type: 'lesson',
    icon: '🚇'
  },
  {
    id: 8,
    title: 'Review',
    subtitle: 'Unit 1 Final Review',
    description: [],
    status: 'locked',
    type: 'review',
    icon: '🚌'
  }
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Lessons */}
          <div className="lg:col-span-2">
            {/* Unit Container */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">


              {/* Lessons List */}
              <div className="space-y-0">
              {lessons.map((lesson, index) => (
                <div key={lesson.id}>
                  <div
                    className={`flex items-center gap-6 p-4 transition-all duration-200 ${
                      lesson.status === 'available' ? 'hover:bg-gray-50 cursor-pointer rounded-lg' : ''
                    } ${lesson.status === 'locked' ? 'opacity-60' : ''}`}
                  >
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {lesson.status === 'completed' ? (
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <img src="/check.png" alt="Completed" className="w-8 h-8" />
                      </div>
                    ) : lesson.type === 'lesson' ? (
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <img src="/story.png" alt="Lesson" className="w-8 h-8" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <img src="/write.png" alt="Review" className="w-8 h-8" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{lesson.title}</h3>
                      {lesson.status === 'completed' && lesson.type === 'review' && (
                        <span className="text-base text-green-600 font-medium">Review complete!</span>
                      )}
                    </div>
                    
                    {lesson.description.length > 0 && (
                      <div className="text-base text-gray-600">
                        {lesson.description.map((item, idx) => (
                          <p key={idx}>{item}</p>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Side Actions */}
                  <div className="flex-shrink-0">
                    {lesson.status === 'completed' && lesson.type === 'lesson' && (
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        Redo lesson
                      </button>
                    )}
                    {lesson.status === 'available' && lesson.type === 'lesson' && (
                      <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                        Start lesson
                      </button>
                    )}
                    {lesson.status === 'locked' && (
                      <Lock className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  </div>
                  {/* Divider line - show for all lessons except the last one */}
                  {index < lessons.length - 1 && (
                    <div className="border-b border-gray-300 mx-4"></div>
                  )}
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* Right Column - Course Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              {/* Course Level Badge */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">N5</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 font-medium">Next JLPT</span>
                  <span className="text-lg text-gray-700 font-semibold">Dec 1, 2025</span>
                </div>
              </div>

              {/* Course Info */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-3">1/29 lessons completed</p>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-gray-300 rounded-full h-4">
                    <div className="bg-green-500 h-4 rounded-full" style={{ width: `${(1/29) * 100}%` }}></div>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed">
                  Learn how to introduce yourself and answer simple questions about your basic needs.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full py-3 px-4 bg-white border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Register for the JLPT
                </button>
                <button className="w-full py-3 px-4 bg-white border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Change JLPT Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
