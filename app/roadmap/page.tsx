'use client';

import { Lock, RotateCcw, ChevronDown, ChevronUp, Rewind, Play, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  description: string[];
  status: 'completed' | 'available' | 'locked';
  type: 'lesson' | 'review' | 'recap';
  icon: string;
  image?: string;
  kanji?: { character: string; meaning: string; reading: string }[];
  vocabulary?: { word: string; reading: string; meaning: string }[];
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
    icon: '💬',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
    kanji: [
      { character: '私', meaning: 'I, me', reading: 'わたし' },
      { character: '名', meaning: 'name', reading: 'な' },
      { character: '前', meaning: 'front, before', reading: 'まえ' }
    ],
    vocabulary: [
      { word: 'はじめまして', reading: 'はじめまして', meaning: 'Nice to meet you' },
      { word: 'よろしく', reading: 'よろしく', meaning: 'Please treat me favorably' },
      { word: 'こんにちは', reading: 'こんにちは', meaning: 'Hello' }
    ]
  },
  {
    id: 2,
    title: 'Review',
    subtitle: 'Review complete!',
    description: [],
    status: 'completed',
    type: 'review',
    icon: '🎯',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop'
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
    icon: '📝',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
    kanji: [
      { character: '時', meaning: 'time, hour', reading: 'じ' },
      { character: '分', meaning: 'minute', reading: 'ふん' },
      { character: '今', meaning: 'now', reading: 'いま' }
    ],
    vocabulary: [
      { word: '一時', reading: 'いちじ', meaning: 'one o\'clock' },
      { word: '三十分', reading: 'さんじゅっぷん', meaning: 'thirty minutes' },
      { word: '今日', reading: 'きょう', meaning: 'today' }
    ]
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
    icon: '👨‍👩‍👧‍👦',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop',
    kanji: [
      { character: '家', meaning: 'house, family', reading: 'いえ' },
      { character: '母', meaning: 'mother', reading: 'はは' },
      { character: '父', meaning: 'father', reading: 'ちち' }
    ],
    vocabulary: [
      { word: 'お母さん', reading: 'おかあさん', meaning: 'mother (polite)' },
      { word: 'お父さん', reading: 'おとうさん', meaning: 'father (polite)' },
      { word: '家族', reading: 'かぞく', meaning: 'family' }
    ]
  },
  {
    id: 5,
    title: 'Review',
    subtitle: 'Practice numbers and family vocabulary',
    description: [],
    status: 'available',
    type: 'review',
    icon: '📝',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop'
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
    icon: '🍜',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop'
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
    icon: '🚇',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop'
  },
  {
    id: 8,
    title: 'Review',
    subtitle: 'Unit 1 Final Review',
    description: [],
    status: 'locked',
    type: 'review',
    icon: '🚌'
  },
  {
    id: 9,
    title: 'Story 6 - Shopping Spree',
    subtitle: 'Shopping and Money',
    description: [
      'Explore the vibrant shopping districts of Tokyo with Tanaka-san. Learn how to ask for prices, negotiate, and make purchases while discovering Japanese consumer culture.'
    ],
    status: 'locked',
    type: 'lesson',
    icon: '🛍️',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
  },
  {
    id: 10,
    title: 'Story 7 - Weather Talk',
    subtitle: 'Weather and Seasons',
    description: [
      'Experience Tokyo\'s changing seasons and learn to discuss weather patterns. Master seasonal vocabulary and cultural expressions tied to Japan\'s four distinct seasons.'
    ],
    status: 'locked',
    type: 'lesson',
    icon: '🌸',
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=300&fit=crop'
  },
  {
    id: 11,
    title: 'Review',
    subtitle: 'Practice food, transport, and shopping vocabulary',
    description: [],
    status: 'locked',
    type: 'review',
    icon: '📝',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
  },
  {
    id: 12,
    title: 'Story 8 - School Days',
    subtitle: 'Education and School Life',
    description: [
      'Visit a local Japanese school with Tanaka-san\'s children. Learn about the Japanese education system and practice vocabulary related to school subjects and activities.'
    ],
    status: 'locked',
    type: 'lesson',
    icon: '🏫',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop'
  },
  {
    id: 13,
    title: 'Story 9 - Festival Fun',
    subtitle: 'Culture and Celebrations',
    description: [
      'Attend a traditional Japanese festival and immerse yourself in local customs. Learn festival-specific vocabulary and cultural expressions while enjoying the festivities.'
    ],
    status: 'locked',
    type: 'lesson',
    icon: '🎌',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop'
  },
  {
    id: 14,
    title: 'Recap',
    subtitle: 'Your Japanese Journey',
    description: [
      'Reflect on your incredible journey through Tokyo with Tanaka-san. Review all the vocabulary, grammar, and cultural insights you\'ve gained throughout your adventure.'
    ],
    status: 'locked',
    type: 'recap',
    icon: '🎓',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop'
  }
];

export default function RoadmapPage() {
  const router = useRouter();
  const [expandedLessons, setExpandedLessons] = useState<Set<number>>(new Set());

  const handleStoryClick = (lessonId: number) => {
    console.log('Story clicked:', lessonId);
    // Map lesson IDs to story route IDs
    const storyMapping: Record<number, string> = {
      1: '1', // Story 1 - Meeting Tanaka-san
      3: '2', // Story 2 - The Clock Tower  
      4: '3', // Story 3 - Family Photo
      6: '4', // Story 4 - Ramen Adventure
    };
    const storyId = storyMapping[lessonId];
    if (storyId) {
      console.log('Navigating to story:', storyId);
      router.push(`/story/${storyId}`);
    } else {
      console.log('Story not found for lesson ID:', lessonId);
    }
  };

  const toggleExpansion = (lessonId: number) => {
    const newExpanded = new Set(expandedLessons);
    if (newExpanded.has(lessonId)) {
      newExpanded.delete(lessonId);
    } else {
      newExpanded.add(lessonId);
    }
    setExpandedLessons(newExpanded);
  };

  const getStatusColor = (status: string, type: string) => {
    if (status === 'completed') {
      return 'bg-green-500';
    } else if (status === 'available') {
      return 'bg-green-400';
    } else {
      return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status: string, type: string) => {
    if (status === 'completed') {
      return <CheckCircle className="h-6 w-6 text-white" />;
    } else if (status === 'available') {
      return <Play className="h-6 w-6 text-white" />;
    } else {
      return <Lock className="h-6 w-6 text-white" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Roadmap</h1>
          <p className="text-gray-600">Follow your journey through Japanese stories and lessons</p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {lessons.map((lesson, index) => {
            const isClickable = lesson.status === 'available' && lesson.type === 'lesson';
            const statusColor = getStatusColor(lesson.status, lesson.type);
            
            return (
              <div
                key={lesson.id}
                onClick={() => {
                  if (isClickable) {
                    handleStoryClick(lesson.id);
                  }
                }}
                className={`
                  relative bg-white rounded-2xl shadow-sm border border-gray-200 border-b-4 border-b-gray-300 overflow-hidden
                  transition-all duration-200 hover:shadow-md
                  ${isClickable ? 'cursor-pointer hover:scale-105' : ''}
                  ${lesson.status === 'locked' ? 'opacity-60' : ''}
                `}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  {lesson.image ? (
                    <Image
                      src={lesson.image}
                      alt={lesson.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      <span className="text-4xl">{lesson.icon}</span>
                    </div>
                  )}
                  
                  {/* Status Badge - Only show for locked lessons */}
                  {lesson.status === 'locked' && (
                    <div className={`absolute top-3 right-3 ${statusColor} rounded-full p-2 shadow-lg`}>
                      {getStatusIcon(lesson.status, lesson.type)}
                    </div>
                  )}

                  {/* Lesson Number */}
                  <div className="absolute top-3 left-3 bg-black/20 backdrop-blur-sm text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {lesson.id}
                  </div>

                  {/* JLPT Level Badge */}
                  <div className="absolute bottom-3 right-3 bg-gray-800 text-white rounded-full px-2 py-1 text-xs font-bold shadow-lg">
                    N5
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-1">
                      {lesson.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  {lesson.description.length > 0 && (
                    <p className="text-xs text-gray-500 line-clamp-3 mb-3">
                      {lesson.description[0]}
                    </p>
                  )}

                  {/* Type Badge */}
                  <div className="flex justify-between items-center">
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${lesson.type === 'lesson' ? 'bg-green-100 text-green-700' : 
                        lesson.type === 'review' ? 'bg-green-100 text-green-700' : 
                        'bg-green-100 text-green-700'}
                    `}>
                      {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
                    </span>
                    
                    {/* Status Text */}
                    <span className={`
                      text-xs font-medium
                      ${lesson.status === 'completed' ? 'text-green-600' : 
                        lesson.status === 'available' ? 'text-green-600' : 
                        'text-gray-400'}
                    `}>
                      {lesson.status === 'completed' ? 'Complete' : 
                       lesson.status === 'available' ? 'Available' : 
                       'Locked'}
                    </span>
                  </div>
                </div>

                {/* Expandable Content for Lessons */}
                {lesson.type === 'lesson' && (lesson.kanji || lesson.vocabulary) && (
                  <div className="border-t border-gray-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpansion(lesson.id);
                      }}
                      className="w-full p-3 text-xs text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2"
                    >
                      {expandedLessons.has(lesson.id) ? (
                        <>
                          <ChevronUp className="h-4 w-4" />
                          Hide Details
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" />
                          Show Details
                        </>
                      )}
                    </button>
                    
                    {/* Expanded Content */}
                    {expandedLessons.has(lesson.id) && (
                      <div className="p-4 bg-gray-50 border-t border-gray-100">
                        {/* Kanji Preview */}
                        {lesson.kanji && lesson.kanji.length > 0 && (
                          <div className="mb-3">
                            <h4 className="text-xs font-semibold text-gray-700 mb-2">Kanji ({lesson.kanji.length})</h4>
                            <div className="flex flex-wrap gap-1">
                              {lesson.kanji.slice(0, 6).map((kanji, idx) => (
                                <div
                                  key={idx}
                                  className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center text-sm font-bold"
                                >
                                  {kanji.character}
                                </div>
                              ))}
                              {lesson.kanji.length > 6 && (
                                <div className="w-8 h-8 bg-gray-200 border border-gray-300 rounded flex items-center justify-center text-xs text-gray-600">
                                  +{lesson.kanji.length - 6}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Vocabulary Preview */}
                        {lesson.vocabulary && lesson.vocabulary.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold text-gray-700 mb-2">Vocabulary ({lesson.vocabulary.length})</h4>
                            <div className="flex flex-wrap gap-1">
                              {lesson.vocabulary.slice(0, 4).map((vocab, idx) => (
                                <div
                                  key={idx}
                                  className="px-2 py-1 bg-white border border-gray-200 rounded text-xs"
                                >
                                  {vocab.word}
                                </div>
                              ))}
                              {lesson.vocabulary.length > 4 && (
                                <div className="px-2 py-1 bg-gray-200 border border-gray-300 rounded text-xs text-gray-600">
                                  +{lesson.vocabulary.length - 4} more
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
