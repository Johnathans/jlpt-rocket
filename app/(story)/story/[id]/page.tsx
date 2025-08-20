import StoryPageClient from './StoryPageClient';
import { sampleStories } from '../../../../data/storyData';

// Generate static params for all available stories
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
  ];
}

interface StoryPageProps {
  params: {
    id: string;
  };
}

export default function StoryPage({ params }: StoryPageProps) {
  // Map URL id to our story data keys
  const storyMapping: Record<string, string> = {
    '1': 'story-1',
    '2': 'story-2', 
    '3': 'story-3',
    '4': 'story-4',
  };
  
  const storyKey = storyMapping[params.id];
  const story = storyKey ? sampleStories[storyKey] : null;

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Story not found</h1>
          <a 
            href="/stories"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white hover:bg-green-600 font-semibold transition-all rounded-md shadow-sm"
          >
            Back to Stories
          </a>
        </div>
      </div>
    );
  }

  return <StoryPageClient story={story} />;
}