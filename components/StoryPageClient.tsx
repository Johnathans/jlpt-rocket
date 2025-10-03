'use client';

import { ArrowLeft, BookOpen, Target } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface StoryPageClientProps {
  story: {
    id: number;
    title: string;
    titleEn: string;
    level: string;
    wordCount: number;
    description: string;
    content: string;
    imageUrl: string;
    vocabulary?: Array<{
      id: number;
      word: string;
      reading: string;
      meaning: string;
      type: string;
      known: boolean;
    }>;
  };
}

export default function StoryPageClient({ story }: StoryPageClientProps) {
  const router = useRouter();

  return (
    <div className="p-6">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 font-medium transition-all mb-6 rounded-md shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Stories
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-black font-japanese mb-2">
                {story.title}
              </h1>
              <p className="text-xl text-gray-600 mb-4">{story.titleEn}</p>
              <span className="inline-block px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-full text-sm font-semibold">
                {story.level}
              </span>
            </div>
            
            {/* Progress Circle */}
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20 mb-2">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-green-500"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${(story.vocabulary?.filter(item => item.known).length || 0) / (story.vocabulary?.length || 1) * 100}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-800">
                    {Math.round(((story.vocabulary?.filter(item => item.known).length || 0) / (story.vocabulary?.length || 1)) * 100)}%
                  </span>
                </div>
              </div>
              <span className="text-sm text-gray-600 text-center">Known</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <Link
              href={`/story/${story.id}/module`}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-green-500 text-white hover:bg-green-600 font-semibold transition-all rounded-lg shadow-sm border-b-4 border-green-600 hover:border-green-700 hover:translate-y-0.5 active:translate-y-0.5"
            >
              <BookOpen className="h-5 w-5" />
              Start Story Module
            </Link>
            <Link
              href={`/story/${story.id}/read`}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-blue-500 text-white hover:bg-blue-600 font-semibold transition-all rounded-lg shadow-sm border-b-4 border-blue-600 hover:border-blue-700 hover:translate-y-0.5 active:translate-y-0.5"
            >
              <Target className="h-5 w-5" />
              Read Only
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
