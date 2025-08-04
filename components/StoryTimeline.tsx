'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { stories } from '@/lib/data/stories';
import { Clock, ChevronDown, ChevronUp, BookOpen, Lock } from 'lucide-react';
import Link from 'next/link';

interface Story {
  id: number;
  title: string;
  titleEn: string;
  level: string;
  content: string;
  description: string;
  wordCount: number;
  imageUrl?: string;
  vocabulary?: Array<{
    id: number;
    word: string;
    reading: string;
    meaning: string;
    type: string;
    known: boolean;
  }>;
}

export default function StoryTimeline() {
  const searchParams = useSearchParams();
  const selectedLevel = searchParams.get('level') || 'N5';
  
  // Mock completion data - in a real app, this would come from user progress
  const [completedStories, setCompletedStories] = useState<Set<number>>(new Set([1]));
  const [expandedStories, setExpandedStories] = useState<Set<number>>(new Set());
  
  // Filter stories by selected level
  const levelStories = stories.filter(story => story.level === selectedLevel);
  
  const toggleExpanded = (storyId: number) => {
    const newExpanded = new Set(expandedStories);
    if (newExpanded.has(storyId)) {
      newExpanded.delete(storyId);
    } else {
      newExpanded.add(storyId);
    }
    setExpandedStories(newExpanded);
  };

  return (
    <section className="py-12 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Clean header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Story Collection</h1>
          <p className="text-lg text-gray-600">Learn Japanese through engaging stories</p>
        </div>

        {/* Story card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {levelStories.map((story, index) => {
            const isCompleted = completedStories.has(story.id);
            const isLocked = index > 1;
            const isExpanded = expandedStories.has(story.id);
            
            return (
              <div key={story.id} className={`relative group ${
                isLocked ? 'opacity-60' : ''
              }`}>
                {/* Story image positioned separately */}
                {story.imageUrl && (
                  <div className="relative mb-4">
                    <div className="w-full h-48 rounded-xl overflow-hidden">
                      <img 
                        src={story.imageUrl} 
                        alt={story.titleEn}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                          isLocked ? 'grayscale' : ''
                        }`}
                      />
                    </div>
                    {/* Status badge on image */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm ${
                        isLocked 
                          ? 'bg-white/90 text-gray-500'
                          : isCompleted
                            ? 'bg-white/90 text-green-700'
                            : 'bg-white/90 text-blue-700'
                      }`}>
                        {story.level}
                      </span>
                    </div>
                    {/* Lock/completion icon */}
                    <div className="absolute top-4 right-4">
                      {isLocked && (
                        <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Lock className="w-4 h-4 text-gray-500" />
                        </div>
                      )}
                      {isCompleted && (
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Story card content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200">
                  <div className="p-6">
                    {/* Title and description */}
                    <div className="mb-6">
                      <h3 className={`text-xl font-bold mb-2 ${
                        isLocked ? 'text-gray-500' : 'text-gray-900'
                      }`}>
                        {story.titleEn}
                      </h3>
                      <p className={`text-sm leading-relaxed ${
                        isLocked ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {story.description}
                      </p>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{story.wordCount}w</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-3 h-3 mr-1" />
                        <span>{story.vocabulary?.length || 0}v</span>
                      </div>
                      <div className="flex items-center">
                        <span>{story.vocabulary?.filter(v => v.type === 'kanji').length || 0}k</span>
                      </div>
                    </div>
                    
                    {/* Action buttons with thick bottom borders */}
                    <div className="space-y-3">
                      <Link href={isLocked ? '#' : `/story/${story.id}`} className="block">
                        <button className={`w-full px-4 py-3 rounded-lg font-semibold bg-white border-b-4 transition-all duration-200 ${
                          isLocked
                            ? 'border-b-gray-300 text-gray-400 cursor-not-allowed'
                            : isCompleted
                              ? 'border-b-green-400 text-gray-700 hover:bg-green-50 hover:border-b-green-500'
                              : 'border-b-blue-400 text-gray-700 hover:bg-blue-50 hover:border-b-blue-500'
                        }`}
                        disabled={isLocked}>
                          {isLocked ? 'Locked' : isCompleted ? 'Review Story' : 'Start Story'}
                        </button>
                      </Link>
                      
                      <button 
                        onClick={() => toggleExpanded(story.id)}
                        className={`w-full px-4 py-3 rounded-lg font-semibold bg-white border-b-4 border-b-gray-300 transition-all duration-200 flex items-center justify-center gap-2 ${
                          isLocked
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-gray-50 hover:border-b-gray-400'
                        }`}
                        disabled={isLocked}
                      >
                        <span>Details</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  {/* Expanded content */}
                  {isExpanded && story.vocabulary && (
                    <div className="border-t bg-gray-50 p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Story Content</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {story.vocabulary.slice(0, 4).map((vocab) => (
                          <div 
                            key={vocab.id} 
                            className={`bg-white rounded-lg p-3 border-b-4 shadow-sm ${
                              vocab.type === 'kanji' 
                                ? 'border-b-red-400' 
                                : 'border-b-blue-400'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-bold text-gray-900">
                                  {vocab.word}
                                </div>
                                <div className="text-xs text-gray-600">
                                  {vocab.reading}
                                </div>
                              </div>
                              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                vocab.type === 'kanji'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {vocab.type}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {vocab.meaning}
                            </div>
                          </div>
                        ))}
                        {story.vocabulary && story.vocabulary.length > 4 && (
                          <div className="text-center text-xs text-gray-500 mt-2">
                            +{story.vocabulary.length - 4} more items
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
