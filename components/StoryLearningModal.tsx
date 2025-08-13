'use client';

import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

interface StoryItem {
  id: string;
  japanese: string;
  reading?: string;
  english: string;
  type: 'kanji' | 'vocabulary';
  known: boolean;
}

interface StoryLearningModalProps {
  isOpen: boolean;
  onClose: () => void;
  storyTitle: string;
  storyItems: StoryItem[];
  onStartLearning: (knownItems: string[]) => void;
}

export default function StoryLearningModal({
  isOpen,
  onClose,
  storyTitle,
  storyItems,
  onStartLearning
}: StoryLearningModalProps) {
  const [items, setItems] = useState<StoryItem[]>(storyItems);

  if (!isOpen) return null;

  const toggleItemKnown = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, known: !item.known } : item
    ));
  };

  const markAllAsKnown = () => {
    setItems(prev => prev.map(item => ({ ...item, known: true })));
  };

  const handleStartLearning = () => {
    console.log('Continue learning clicked');
    const knownItemIds = items.filter(item => item.known).map(item => item.id);
    console.log('Known items:', knownItemIds);
    console.log('Calling onStartLearning with:', knownItemIds);
    onStartLearning(knownItemIds);
  };

  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{storyTitle}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Continue Learning Button */}
          <button
            onClick={handleStartLearning}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg mb-4 transition-colors border-b-4 border-b-green-700 hover:border-b-green-800"
          >
            Continue learning
          </button>

          {/* Mark All as Known */}
          <button
            onClick={markAllAsKnown}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-6 border-b-4 border-b-gray-400 hover:border-b-gray-500"
          >
            <CheckCircle className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Mark all as known</span>
          </button>

          {/* Items List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleItemKnown(item.id)}
                className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                  item.known 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Progress Circle */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.known ? 'bg-green-500' : 'bg-gray-200'
                  }`}>
                    {item.known && (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>

                  {/* Item Content */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{item.japanese}</span>
                      {item.reading && (
                        <span className="text-sm text-gray-500">({item.reading})</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">{item.english}</div>
                  </div>
                </div>

                {/* Three dots menu */}
                <button className="p-1 hover:bg-gray-200 rounded">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
