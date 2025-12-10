'use client';

import { useState } from 'react';
import { GraduationCap, Book, FileText, MessageSquare } from 'lucide-react';
import { useJLPTLevel, type JLPTLevel } from '@/contexts/JLPTLevelContext';
import { useRouter } from 'next/navigation';

const jlptLevels = [
  {
    level: 'N5' as JLPTLevel,
    title: 'N5 - Beginner',
    description: 'Basic Japanese for everyday situations',
    requirements: {
      vocabulary: '800 words',
      kanji: '100 characters',
      grammar: '80 patterns',
      studyTime: '150-300 hours'
    }
  },
  {
    level: 'N4' as JLPTLevel,
    title: 'N4 - Elementary',
    description: 'Expanded basic Japanese for daily communication',
    requirements: {
      vocabulary: '1,500 words',
      kanji: '300 characters',
      grammar: '150 patterns',
      studyTime: '300-600 hours'
    }
  },
  {
    level: 'N3' as JLPTLevel,
    title: 'N3 - Intermediate',
    description: 'Practical Japanese for work and social situations',
    requirements: {
      vocabulary: '3,750 words',
      kanji: '650 characters',
      grammar: '200 patterns',
      studyTime: '450-900 hours'
    }
  },
  {
    level: 'N2' as JLPTLevel,
    title: 'N2 - Upper Intermediate',
    description: 'Advanced Japanese for professional and academic use',
    requirements: {
      vocabulary: '6,000 words',
      kanji: '1,000 characters',
      grammar: '250 patterns',
      studyTime: '600-1200 hours'
    }
  },
  {
    level: 'N1' as JLPTLevel,
    title: 'N1 - Advanced',
    description: 'Near-native Japanese proficiency',
    requirements: {
      vocabulary: '10,000 words',
      kanji: '2,000 characters',
      grammar: '300 patterns',
      studyTime: '900-1800 hours'
    }
  }
];

export default function ChangeJLPTLevelPage() {
  const { currentLevel, setCurrentLevel } = useJLPTLevel();
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel | null>(null);
  const [isChanging, setIsChanging] = useState(false);
  const router = useRouter();

  const handleLevelSelect = (level: JLPTLevel) => {
    setSelectedLevel(level);
  };

  const handleConfirmLevel = async () => {
    if (selectedLevel) {
      setIsChanging(true);
      
      // Update the global JLPT level
      setCurrentLevel(selectedLevel);
      
      // Show success message briefly
      setTimeout(() => {
        setIsChanging(false);
        // Redirect to vocabulary page to see the change
        router.push('/vocabulary');
      }, 1000);
    }
  };

  const selectedLevelData = selectedLevel ? jlptLevels.find(l => l.level === selectedLevel) : null;

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Select JLPT Goal
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Select the level you're preparing for to customize your learning experience
          </p>
          <p className="text-lg text-gray-500">
            Current level: <span className="font-semibold text-gray-700 dark:text-gray-300">{currentLevel}</span>
          </p>
        </div>

        {/* JLPT Level Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {jlptLevels.map((levelData) => {
            const isSelected = selectedLevel === levelData.level;
            const isCurrent = currentLevel === levelData.level;
            
            return (
              <button
                key={levelData.level}
                onClick={() => handleLevelSelect(levelData.level)}
                className={`
                  relative p-8 rounded-2xl border-2 transition-all duration-200 hover:scale-105
                  ${isSelected 
                    ? 'bg-pink-500 border-pink-500 text-white shadow-lg' 
                    : 'bg-white border-gray-200 text-gray-700 hover:border-pink-300 hover:shadow-md'
                  }
                  ${isCurrent && !isSelected ? 'ring-2 ring-pink-400' : ''}
                `}
              >
                {isCurrent && !isSelected && (
                  <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    Current
                  </div>
                )}
                
                <div className="flex flex-col items-center space-y-4">
                  <div className={`
                    w-20 h-20 rounded-full flex items-center justify-center
                    ${isSelected ? 'bg-white/20' : 'bg-gray-100'}
                  `}>
                    <span className={`text-4xl font-black ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                      {levelData.level}
                    </span>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-1">{levelData.title}</h3>
                    <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                      {levelData.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Level Requirements */}
        {selectedLevelData && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {selectedLevelData.title} Requirements
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="flex justify-center mb-3">
                  <Book className="h-8 w-8 text-gray-600 dark:text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Vocabulary</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedLevelData.requirements.vocabulary}</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="flex justify-center mb-3">
                  <FileText className="h-8 w-8 text-gray-600 dark:text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Kanji</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedLevelData.requirements.kanji}</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="flex justify-center mb-3">
                  <MessageSquare className="h-8 w-8 text-gray-600 dark:text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Grammar</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedLevelData.requirements.grammar}</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="flex justify-center mb-3">
                  <GraduationCap className="h-8 w-8 text-gray-600 dark:text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Study Time</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedLevelData.requirements.studyTime}</p>
              </div>
            </div>

            {/* Confirm Button */}
            {selectedLevel !== currentLevel && (
              <div className="text-center">
                <button
                  onClick={handleConfirmLevel}
                  disabled={isChanging}
                  className="px-8 py-4 bg-pink-500 text-white font-bold text-lg rounded-xl hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isChanging ? 'Switching...' : `Switch to ${selectedLevel}`}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!selectedLevel && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <GraduationCap className="h-16 w-16 mx-auto" />
            </div>
            <p className="text-xl text-gray-500">
              Select a JLPT level above to see the requirements
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
