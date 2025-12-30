import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';
import { pageStories } from '@/data/pageStoryData';

export default function PageStoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Story Mode</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn Japanese through engaging visual stories. Click through pages with anime-style images and practice reading Japanese sentences.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pageStories.map((story) => (
            <Link
              key={story.id}
              href={`/page-stories/${story.id}`}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${story.pages[0].imageUrl})`,
                }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 min-h-[280px] flex flex-col justify-between">
                {/* Top section */}
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-pink-600 text-sm font-bold rounded-full">
                      {story.level}
                    </span>
                    <ChevronRight className="h-6 w-6 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">
                    {story.title}
                  </h3>
                </div>

                {/* Bottom section */}
                <div>
                  <div className="flex items-center gap-2 text-white/90 mb-3">
                    <BookOpen className="h-4 w-4" />
                    <span className="text-sm font-medium">{story.pages.length} pages</span>
                  </div>
                  
                  <p className="text-sm text-white/80 font-japanese line-clamp-2 leading-relaxed">
                    {story.pages[0].japanese}
                  </p>
                </div>
              </div>

              {/* Thick bottom border with rounded corners */}
              <div className="relative h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-b-2xl">
                <div className="absolute inset-x-0 -top-1 h-2 bg-gradient-to-r from-pink-500 to-orange-500 opacity-50 blur-sm"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state if no stories */}
        {pageStories.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No stories available yet</h3>
            <p className="text-gray-600">Check back soon for new stories!</p>
          </div>
        )}
      </div>
    </div>
  );
}
