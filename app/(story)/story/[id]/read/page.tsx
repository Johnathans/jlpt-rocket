import StoryReader from '@/components/StoryReader';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { stories } from '@/lib/data/stories';

export async function generateStaticParams() {
  return stories.map((story) => ({
    id: story.id.toString(),
  }));
}

interface StoryReadPageProps {
  params: {
    id: string;
  };
}

export default function StoryReadPage({ params }: StoryReadPageProps) {
  const storyId = parseInt(params.id, 10);
  const story = stories.find(s => s.id === storyId);

  if (!story) {
    return (
      <div className="min-h-full flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Story not found</h1>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white hover:bg-green-600 font-semibold transition-all rounded-md shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Stories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          href={`/story/${story.id}`}
          className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 font-medium transition-all mb-6 rounded-md shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Story
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-black font-japanese mb-2">
              {story.title}
            </h1>
            <p className="text-xl text-gray-600 mb-4">{story.titleEn}</p>
            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-full text-sm font-semibold">
              {story.level}
            </span>
          </div>
        </div>

        <StoryReader content={story.content} />
      </div>
    </div>
  );
}