import React from 'react';
import Link from 'next/link';
import { BookOpen, Clock, Target, Lock } from 'lucide-react';

interface Story {
  id: number;
  title: string;
  titleEn: string;
  level: string;
  content: string;
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

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'N5': return 'bg-green-100 text-green-800 border-green-200';
      case 'N4': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'N3': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'N2': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'N1': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const knownWords = story.vocabulary?.filter(item => item.known).length || 0;
  const totalWords = story.vocabulary?.length || 0;
  const progressPercentage = totalWords > 0 ? (knownWords / totalWords) * 100 : 0;
  const isLocked = story.id > 2;

  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border-2 border-gray-200 border-b-4 border-b-gray-400 hover:border-gray-300 hover:border-b-gray-500 relative ${isLocked ? 'opacity-75' : ''}`}>
        {isLocked && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10 rounded-lg">
            <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-gray-300">
              <Lock className="h-8 w-8 text-gray-600" />
            </div>
          </div>
        )}
        
        {story.imageUrl && (
          <div className="mb-4 -mx-6 -mt-6">
            <img 
              src={story.imageUrl} 
              alt={story.titleEn}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </div>
        )}
        
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{story.titleEn}</h3>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(story.level)}`}>
            {story.level}
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Target className="w-4 h-4 mr-1" />
              <span>{story.vocabulary?.filter(item => item.type === 'kanji').length || 0} kanji</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>{story.vocabulary?.filter(item => item.type === 'vocabulary').length || 0} vocab</span>
            </div>
          </div>
          
          {totalWords > 0 && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-1 text-gray-400" />
                <span className="text-xs text-gray-500">{knownWords}/{totalWords}</span>
              </div>
              <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
        
        <Link href={isLocked ? '#' : `/story/${story.id}`}>
          <button 
            className="w-full px-4 py-3 bg-white text-gray-700 font-semibold border-2 border-gray-300 border-b-4 border-b-gray-400 hover:bg-gray-50 hover:border-gray-400 hover:border-b-gray-500 hover:translate-y-0.5 active:translate-y-0.5 transition-all duration-200 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLocked}
          >
            {isLocked ? 'Locked' : 'Start Story'}
          </button>
        </Link>
    </div>
  );
}