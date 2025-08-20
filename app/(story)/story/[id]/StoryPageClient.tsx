'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StoryLearningFlow from '../../../../components/StoryLearningFlow';
import { StoryData } from '../../../../data/storyData';
import { StreakSystem } from '@/lib/streakSystem';

interface StoryPageClientProps {
  story: StoryData;
}

export default function StoryPageClient({ story }: StoryPageClientProps) {
  const router = useRouter();

  const handleComplete = () => {
    // Record session for streak tracking
    StreakSystem.recordSession();
    router.push('/stories');
  };

  const handleClose = () => {
    router.push('/stories');
  };

  return (
    <div className="min-h-screen">
      <StoryLearningFlow
        story={story}
        isOpen={true}
        onClose={handleClose}
        onComplete={handleComplete}
      />
    </div>
  );
}
