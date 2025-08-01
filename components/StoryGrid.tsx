'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import StoryCard from './StoryCard';
import { stories } from '@/lib/data/stories';

export default function StoryGrid() {
  const searchParams = useSearchParams();
  const selectedLevel = searchParams.get('level') || 'N5';

  return (
    <section className="py-6 px-6">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">JLPT {selectedLevel} Stories</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}