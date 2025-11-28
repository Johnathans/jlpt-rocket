'use client';

import { useState } from 'react';
import { Book, PenTool, FileText, Headphones, RotateCcw } from 'lucide-react';

type TestType = 'vocabulary' | 'grammar' | 'reading' | 'listening';

const testCategories = [
  {
    id: 'vocabulary' as TestType,
    title: 'Vocabulary',
    icon: Book,
    description: 'Test your word knowledge'
  },
  {
    id: 'grammar' as TestType,
    title: 'Grammar',
    icon: PenTool,
    description: 'Practice grammar patterns'
  },
  {
    id: 'reading' as TestType,
    title: 'Reading',
    icon: FileText,
    description: 'Comprehension exercises'
  },
  {
    id: 'listening' as TestType,
    title: 'Listening',
    icon: Headphones,
    description: 'Audio comprehension'
  }
];

const exampleTests = {
  vocabulary: [
    { id: 1, name: 'Kanji Reading', description: 'Choose the correct reading for a given kanji in context', questions: 25, accuracy: 87, incorrectCount: 3 },
    { id: 2, name: 'Orthography', description: 'Choose the correct kanji/kana spelling for a given word', questions: 20, accuracy: 72, incorrectCount: 6 },
    { id: 3, name: 'Word Formation', description: 'Pick the word form that fits the sentence (noun, verb form, adjective, etc.)', questions: 18, accuracy: 94, incorrectCount: 1 },
    { id: 4, name: 'Contextually-defined Expressions', description: 'Pick the word/phrase that best fits the context of a sentence', questions: 22, accuracy: 78, incorrectCount: 5 },
    { id: 5, name: 'Paraphrases', description: 'Choose the option closest in meaning to a given phrase/sentence', questions: 15, accuracy: null, incorrectCount: 0 },
    { id: 6, name: 'Usage', description: 'Pick the option that uses the word naturally or identify the incorrect usage', questions: 20, accuracy: null, incorrectCount: 0 }
  ],
  grammar: [
    { id: 1, name: 'Sentential Grammar 1', description: 'Select the correct grammatical form or pattern for a sentence', questions: 18, accuracy: 89, incorrectCount: 2 },
    { id: 2, name: 'Sentential Grammar 2', description: 'Arrange clauses/phrases into the correct order to form a sentence', questions: 15, accuracy: 76, incorrectCount: 4 },
    { id: 3, name: 'Text Grammar', description: 'Choose correct cohesive devices (particles, conjunctions, pronouns) for a paragraph', questions: 12, accuracy: null, incorrectCount: 0 }
  ],
  reading: [
    { id: 1, name: 'Comprehension – Short Passages', description: 'Read a short passage and answer multiple-choice questions', questions: 8, accuracy: 83, incorrectCount: 1 },
    { id: 2, name: 'Comprehension – Mid-size Passages', description: 'Slightly longer passages with multiple related questions', questions: 6, accuracy: 67, incorrectCount: 2 },
    { id: 3, name: 'Comprehension – Long Passages', description: 'Long text, often narrative or descriptive, with multiple questions', questions: 4, accuracy: 75, incorrectCount: 1 },
    { id: 4, name: 'Integrated Comprehension', description: 'Multiple related texts (e.g., notices, emails, articles) linked together in questions', questions: 5, accuracy: null, incorrectCount: 0 },
    { id: 5, name: 'Thematic Comprehension', description: 'Longer text on a single topic, testing understanding of tone, opinion, or theme', questions: 3, accuracy: null, incorrectCount: 0 },
    { id: 6, name: 'Information Retrieval', description: 'Find information in structured data (timetables, charts, notices, advertisements)', questions: 7, accuracy: 86, incorrectCount: 1 }
  ],
  listening: [
    { id: 1, name: 'Task-based Comprehension', description: 'Listen to instructions or conversations to complete a task (may include visual aids)', questions: 6, accuracy: 83, incorrectCount: 1 },
    { id: 2, name: 'Key Points', description: 'Identify the main point of a conversation or announcement', questions: 8, accuracy: 75, incorrectCount: 2 },
    { id: 3, name: 'General Outline', description: 'Determine the overall gist or summary of a longer listening segment', questions: 5, accuracy: 60, incorrectCount: 2 },
    { id: 4, name: 'Verbal Expressions', description: 'Choose the most natural reply or expression based on the listening prompt', questions: 12, accuracy: 92, incorrectCount: 1 },
    { id: 5, name: 'Quick Response', description: 'Short prompts where you answer quickly, usually under a strict time limit', questions: 15, accuracy: null, incorrectCount: 0 },
    { id: 6, name: 'Integrated Comprehension', description: 'Multi-turn conversations or monologues that require synthesizing multiple pieces of information', questions: 4, accuracy: null, incorrectCount: 0 }
  ]
};

export default function TestPage() {
  const [selectedType, setSelectedType] = useState<TestType | null>(null);

  const handleStartTest = (testId: number) => {
    if (selectedType === 'vocabulary' && testId === 1) {
      // Navigate to Kanji Reading test (in training layout - no navbar)
      window.location.href = '/test/kanji-reading';
    } else {
      console.log(`Starting test ${testId} for ${selectedType}`);
      // TODO: Navigate to other specific tests
    }
  };

  const handleReviewIncorrect = (testId: number) => {
    console.log(`Reviewing incorrect items for test ${testId} of ${selectedType}`);
    // TODO: Navigate to review incorrect items
  };

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: '#f9fafb' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How would you like to test?
          </h1>
          <p className="text-xl text-gray-600">
            Choose a test category to begin your JLPT preparation
          </p>
        </div>

        {/* Test Category Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {testCategories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedType === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedType(category.id)}
                className={`
                  relative p-8 rounded-2xl border-2 transition-all duration-200 hover:scale-105
                  ${isSelected 
                    ? 'bg-green-500 border-green-500 text-white shadow-lg' 
                    : 'bg-white border-gray-200 text-gray-700 hover:border-pink-300 hover:shadow-md'
                  }
                `}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className={`
                    p-4 rounded-full
                    ${isSelected ? 'bg-white/20' : 'bg-gray-100'}
                  `}>
                    <Icon 
                      className={`h-8 w-8 ${isSelected ? 'text-white' : 'text-green-500'}`} 
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-1">{category.title}</h3>
                    <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                      {category.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Test Types List */}
        {selectedType && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 capitalize">
              {selectedType} Tests
            </h2>
            
            <div className="space-y-4">
              {exampleTests[selectedType].map((test) => (
                <div
                  key={test.id}
                  className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {test.name}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {test.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {test.questions} questions
                        </span>
                        {test.accuracy !== null && (
                          <span className={`flex items-center gap-1 font-medium ${
                            test.accuracy >= 80 ? 'text-green-600' : 
                            test.accuracy >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            Accuracy: {test.accuracy}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {test.incorrectCount > 0 && (
                        <button
                          onClick={() => handleReviewIncorrect(test.id)}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-700 bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors"
                        >
                          <RotateCcw className="h-4 w-4" />
                          Review {test.incorrectCount} incorrect
                        </button>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleStartTest(test.id)}
                      className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    >
                      {test.accuracy === null ? 'Start' : 'Retake'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!selectedType && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FileText className="h-16 w-16 mx-auto" />
            </div>
            <p className="text-xl text-gray-500">
              Select a test category above to see available tests
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
