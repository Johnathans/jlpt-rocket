import { pageStories } from '@/data/pageStoryData';
import PageStoryClient from './PageStoryClient';

export async function generateStaticParams() {
  return pageStories.map((story) => ({
    id: story.id,
  }));
}

interface PageStoryPageProps {
  params: {
    id: string;
  };
}

export default function PageStoryPage({ params }: PageStoryPageProps) {
  const story = pageStories.find((s) => s.id === params.id);

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Story not found</h1>
          <a 
            href="/page-stories"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:shadow-lg font-semibold transition-all rounded-lg"
          >
            Back to Stories
          </a>
        </div>
      </div>
    );
  }

  return <PageStoryClient story={story} />;
}
