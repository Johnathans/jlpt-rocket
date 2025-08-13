import { stories } from '@/lib/data/stories';
import StoryModuleClient from '@/components/StoryModuleClient';

export async function generateStaticParams() {
  return stories.map((story) => ({
    id: story.id.toString(),
  }));
}

interface StoryModulePageProps {
  params: {
    id: string;
  };
}

export default function StoryModulePage({ params }: StoryModulePageProps) {
  const storyId = parseInt(params.id, 10);
  const story = stories.find(s => s.id === storyId);

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Story not found</h1>
          <a 
            href="/"
            className="px-6 py-3 bg-green-500 text-white hover:bg-green-600 font-semibold transition-all rounded-md"
          >
            Back to Stories
          </a>
        </div>
      </div>
    );
  }

  return <StoryModuleClient story={story} />;
}
