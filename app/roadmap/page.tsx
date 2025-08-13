'use client';

import { Lock, RotateCcw, ChevronDown, ChevronUp, Rewind, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  description: string[];
  status: 'completed' | 'available' | 'locked';
  type: 'lesson' | 'review' | 'recap';
  icon: string;
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
    icon: '📝',
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content */}
        <div>

          {/* Stories Grid */}
          <div className="space-y-6">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div
                  onClick={() => {
                    if (lesson.status === 'available' && lesson.type === 'lesson') {
                      handleStoryClick(lesson.id);
                    }
                  }}
                  className={`flex items-start gap-6 transition-all duration-200 ${
                    lesson.status === 'available' && lesson.type === 'lesson' ? 'hover:bg-gray-50 cursor-pointer rounded-lg p-4 -m-4' : ''
                  } ${lesson.status === 'locked' ? 'opacity-60' : ''}`}
                >
                  {/* Photo */}
                  <div className="flex-shrink-0">
                    {lesson.type === 'lesson' ? (
                      <div className="w-52 h-52 rounded-lg overflow-hidden">
                        <img 
                          src={
                            lesson.id === 1 ? "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=208&h=208&fit=crop&crop=center" : // Tokyo greeting/meeting
                            lesson.id === 3 ? "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=208&h=208&fit=crop&crop=center" : // Clock tower
                            lesson.id === 4 ? "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=208&h=208&fit=crop&crop=center" : // Family photo
                            lesson.id === 6 ? "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=208&h=208&fit=crop&crop=center" : // Ramen
                            "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=208&h=208&fit=crop&crop=center" // Default Tokyo
                          }
                          alt={lesson.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : lesson.type === 'review' ? (
                      <div className="w-52 h-52 bg-blue-100 rounded-lg flex items-center justify-center">
                        <RotateCcw className="w-24 h-24 text-blue-600" strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-44 h-44 bg-green-100 rounded-lg flex items-center justify-center">
                        <img src="/check.png" alt="Completed" className="w-24 h-24" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 max-w-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900 text-2xl">{lesson.title}</h3>
                      {lesson.status === 'completed' && lesson.type === 'review' && (
                        <span className="text-base text-green-600 font-medium">Review complete!</span>
                      )}
                    </div>
                    
                    {lesson.description.length > 0 && (
                      <div className="text-base text-gray-600 leading-relaxed">
                        {lesson.description.map((item, idx) => (
                          <p key={idx}>{item}</p>
                        ))}
                      </div>
                    )}

                     {/* Expand/Collapse Button for lessons with content */}
                     {lesson.type === 'lesson' && (lesson.kanji || lesson.vocabulary) && (
                       <button
                         onClick={(e) => {
                           e.stopPropagation();
                           toggleExpansion(lesson.id);
                         }}
                         className="mt-6 flex items-center gap-3 text-blue-600 hover:text-blue-700 font-bold text-lg"
                       >
                         {expandedLessons.has(lesson.id) ? (
                           <>
                             <ChevronUp className="h-5 w-5" />
                             Hide Content
                           </>
                         ) : (
                           <>
                             <ChevronDown className="h-5 w-5" />
                             Show Kanji & Vocabulary
                           </>
                         )}
                       </button>
                     )}
                  </div>

                  {/* Right Side Actions */}
                  <div className="flex-shrink-0">
                     {lesson.status === 'completed' && lesson.type === 'lesson' && (
                       <button className="flex flex-col items-center gap-5 px-12 py-8 bg-gray-400 text-white hover:bg-gray-500 font-semibold transition-all duration-200 rounded-xl shadow-lg border-b-4 border-b-gray-500 hover:border-b-gray-600 text-xl hover:scale-105 min-w-[180px]">
                         Redo lesson
                         <div className="bg-white bg-opacity-20 rounded-full p-4">
                           <Play className="w-12 h-12 text-white fill-white" />
                         </div>
                       </button>
                     )}
                     {lesson.status === 'available' && lesson.type === 'lesson' && (
                       <button className="flex flex-col items-center gap-5 px-12 py-8 bg-green-500 text-white hover:bg-green-600 font-semibold transition-all duration-200 rounded-xl shadow-lg border-b-4 border-green-700 hover:border-green-800 text-xl hover:scale-105 min-w-[180px]">
                         Start lesson
                         <div className="bg-white bg-opacity-20 rounded-full p-4">
                           <Play className="w-12 h-12 text-white fill-white" />
                         </div>
                       </button>
                     )}
                    {lesson.status === 'locked' && (
                      <Lock className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Content - Kanji and Vocabulary Cards */}
                {expandedLessons.has(lesson.id) && lesson.type === 'lesson' && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    {/* Kanji Section */}
                    {lesson.kanji && lesson.kanji.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-base font-semibold text-gray-900 mb-2">Kanji</h4>
                        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-10 gap-1">
                          {lesson.kanji.map((kanji, idx) => (
                            <div
                              key={idx}
                              className="bg-white border border-gray-200 border-b-4 border-b-gray-300 rounded p-2 shadow-sm hover:shadow-md transition-shadow"
                            >
                              <div className="text-center">
                                <div className="text-lg font-bold text-gray-900 font-japanese">
                                  {kanji.character}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                     {lesson.kanji && lesson.kanji.length > 0 && (
                       <div className="mb-4">
                         <h4 className="text-base font-semibold text-gray-900 mb-2">Kanji</h4>
                         <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-10 gap-1">
                           {lesson.kanji.map((kanji, idx) => (
                             <div
                               key={idx}
                               className="bg-white border border-gray-200 border-b-4 border-b-gray-300 rounded p-2 shadow-sm hover:shadow-md transition-shadow"
                             >
                               <div className="text-center">
                                 <div className="text-lg font-bold text-gray-900 font-japanese">
                                   {kanji.character}
                                 </div>
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>
                     )}

                     {/* Vocabulary Section */}
                     {lesson.vocabulary && lesson.vocabulary.length > 0 && (
                       <div>
                         <h4 className="text-base font-semibold text-gray-900 mb-2">Vocabulary</h4>
                         <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-1">
                           {lesson.vocabulary.map((vocab, idx) => (
                             <div
                               key={idx}
                               className="bg-white border border-gray-200 border-b-4 border-b-gray-300 rounded p-2 shadow-sm hover:shadow-md transition-shadow"
                             >
                               <div className="text-center">
                                 <div className="text-sm font-bold text-gray-900 font-japanese truncate">
                                   {vocab.word}
                                 </div>
                                 {vocab.word !== vocab.reading && (
                                   <div className="text-xs text-gray-600 truncate">
                                     {vocab.reading}
                                   </div>
                                 )}
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>
                     )}
                   </div>
                 )}
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
