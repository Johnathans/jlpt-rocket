'use client';

import { useRouter } from 'next/navigation';
import PageStoryReader from '@/components/PageStoryReader';
import { PageStory } from '@/data/pageStoryData';
import { StreakSystemSupabase as StreakSystem } from '@/lib/streakSystemSupabase';

interface PageStoryClientProps {
  story: PageStory;
}

export default function PageStoryClient({ story }: PageStoryClientProps) {
  const router = useRouter();

  const handleComplete = async () => {
    // Record session for streak tracking
    await StreakSystem.recordSession();
    router.push('/page-stories');
  };

  const handleClose = () => {
    router.push('/page-stories');
  };

  return (
    <PageStoryReader
      story={story}
      onClose={handleClose}
      onComplete={handleComplete}
    />
  );
}
