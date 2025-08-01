'use client';

import { useEffect, useState } from 'react';
import { Volume2, RotateCcw, Settings, BookOpen } from 'lucide-react';
import { addFurigana, initializeKuroshiro } from '@/lib/furigana';

interface StoryReaderProps {
  content: string;
}

export default function StoryReader({ content }: StoryReaderProps) {
  const [processedContent, setProcessedContent] = useState<string>('');
  const [showFurigana, setShowFurigana] = useState(true);
  const [fontSize, setFontSize] = useState('text-lg');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processTextWithFurigana = async () => {
      try {

        // Initialize kuroshiro if not already done
        await initializeKuroshiro();
        
        // Process the content with real furigana
        const furiganaContent = await addFurigana(content);
        setProcessedContent(furiganaContent);
        setIsLoading(false);
      } catch (error) {
        console.error('Error processing text:', error);
        // Fallback to original content if processing fails
        setProcessedContent(content);
        setIsLoading(false);
      }
    };

    processTextWithFurigana();
  }, [content]);

  const readAloud = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const resetProgress = () => {
    // In a real app, this would reset reading progress
    console.log('Progress reset');
  };

  const displayContent = showFurigana ? processedContent : content;

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-600">Processing text with furigana...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Reading Controls */}
      <div className="bg-gray-50 p-6 border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Reading Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={readAloud}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white hover:bg-green-600 font-semibold transition-all rounded-md shadow-sm"
          >
            <Volume2 className="h-4 w-4" />
            Read Aloud
          </button>
          
          <button
            onClick={() => setShowFurigana(!showFurigana)}
            className="flex items-center justify-center gap-2 px-6 py-3 text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 font-semibold transition-all rounded-md shadow-sm"
          >
            <BookOpen className="h-4 w-4" />
            {showFurigana ? 'Hide' : 'Show'} Furigana
          </button>
          
          <button
            onClick={resetProgress}
            className="flex items-center justify-center gap-2 px-6 py-3 text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 font-semibold transition-all rounded-md shadow-sm"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Progress
          </button>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Size
          </label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="border border-gray-300 px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-md shadow-sm"
          >
            <option value="text-sm">Small</option>
            <option value="text-base">Medium</option>
            <option value="text-lg">Large</option>
            <option value="text-xl">Extra Large</option>
            <option value="text-2xl">XXL</option>
          </select>
        </div>
      </div>

      {/* Story Content */}
      <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
        <div 
          className={`font-japanese ${fontSize} leading-relaxed text-gray-900 space-y-4`}
          dangerouslySetInnerHTML={{ __html: displayContent.replace(/。/g, '。<br><br>') }}
          style={{
            lineHeight: '2.2',
            wordSpacing: '0.1em',
          }}
        />
      </div>

      {/* Progress and Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-2 text-gray-600">
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full w-full"></div>
          </div>
          <span className="text-sm">100% Complete</span>
        </div>
        
        <div className="flex gap-4">
          <button className="px-6 py-3 text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 font-semibold transition-all rounded-md shadow-sm">
            Previous Story
          </button>
          <button className="px-6 py-3 bg-green-500 text-white hover:bg-green-600 font-semibold transition-all rounded-md shadow-sm">
            Next Story
          </button>
        </div>
      </div>
    </div>
  );
}