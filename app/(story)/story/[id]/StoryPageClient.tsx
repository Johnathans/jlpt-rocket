'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StoryLearningFlow from '../../../../components/StoryLearningFlow';
import { StoryData } from '../../../../data/storyData';

interface StoryPageClientProps {
  story: StoryData;
}

export default function StoryPageClient({ story }: StoryPageClientProps) {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/roadmap');
  };

  const handleClose = () => {
    router.push('/roadmap');
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
