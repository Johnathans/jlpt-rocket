'use client';

import { useState } from 'react';
import { X, BookOpen, Volume2 } from 'lucide-react';

interface StoryPreviewModalProps {
  story: {
    id: number;
    title: string;
    titleEn: string;
    level: string;
    description: string;
    imageUrl: string;
    vocabulary?: Array<{
      id: number;
      word: string;
      reading: string;
      meaning: string;
      type: 'vocabulary' | 'kanji';
      known: boolean;
    }>;
  };
  isOpen: boolean;
  onClose: () => void;
  onStartModule: () => void;
}

export default function StoryPreviewModal({ 
  story, 
  isOpen, 
  onClose, 
  onStartModule 
}: StoryPreviewModalProps) {
  if (!isOpen) return null;

  const vocabularyItems = story.vocabulary?.filter(item => item.type === 'vocabulary') || [];
  const kanjiItems = story.vocabulary?.filter(item => item.type === 'kanji') || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-black font-japanese">
              {story.title}
            </h2>
            <p className="text-lg text-gray-600">{story.titleEn}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Story Image */}
          <div className="mb-6">
            <img
              src={story.imageUrl}
              alt={story.titleEn}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          {/* Story Info */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-3">
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 border border-gray-300 rounded-full text-sm font-semibold">
                {story.level}
              </span>
              <span className="text-sm text-gray-600">
                {vocabularyItems.length + kanjiItems.length} items to learn
              </span>
            </div>
            <p className="text-gray-700">{story.description}</p>
          </div>

          {/* Vocabulary and Kanji Preview */}
          <div className="space-y-6">
            {vocabularyItems.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Vocabulary ({vocabularyItems.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vocabularyItems.slice(0, 6).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div>
                        <div className="font-bold text-black font-japanese">
                          {item.word}
                        </div>
                        <div className="text-sm text-gray-600 font-japanese">
                          {item.reading}
                        </div>
                      </div>
                      <div className="text-sm text-gray-800 text-right">
                        {item.meaning}
                      </div>
                    </div>
                  ))}
                  {vocabularyItems.length > 6 && (
                    <div className="col-span-full text-center text-sm text-gray-500 py-2">
                      ... and {vocabularyItems.length - 6} more vocabulary words
                    </div>
                  )}
                </div>
              </div>
            )}

            {kanjiItems.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">漢</span>
                  Kanji ({kanjiItems.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {kanjiItems.slice(0, 6).map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="text-2xl font-bold text-black font-japanese mb-1">
                        {item.word}
                      </div>
                      <div className="text-xs text-gray-600 font-japanese text-center">
                        {item.reading}
                      </div>
                      <div className="text-xs text-gray-800 text-center">
                        {item.meaning}
                      </div>
                    </div>
                  ))}
                  {kanjiItems.length > 6 && (
                    <div className="col-span-full text-center text-sm text-gray-500 py-2">
                      ... and {kanjiItems.length - 6} more kanji
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 font-medium transition-all rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onStartModule}
            className="flex-1 px-6 py-3 bg-green-500 text-white hover:bg-green-600 font-semibold transition-all rounded-lg shadow-sm border-b-4 border-green-600 hover:border-green-700 hover:translate-y-0.5 active:translate-y-0.5"
          >
            Start Module
          </button>
        </div>
      </div>
    </div>
  );
}
