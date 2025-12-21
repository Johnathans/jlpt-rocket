'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Volume2, Play, Pause, SkipForward, SkipBack, RotateCcw, User, UserRound } from 'lucide-react';
import TrainingHeader from '@/components/TrainingHeader';
import QuitConfirmationModal from '@/components/QuitConfirmationModal';
import { useTTS } from '@/lib/useTTS';
import { getSentencesByLevel } from '@/lib/supabase-data';
import type { JLPTLevel } from '@/lib/supabase-data';

interface SentenceItem {
  id: string;
  japanese_text: string;
  english_translation: string;
  jlpt_level: JLPTLevel;
  difficulty_level: number;
  grammar_points: string[];
  vocabulary_used: string[];
  kanji_used: string[];
}

function SentencePracticeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sentences, setSentences] = useState<SentenceItem[]>([]);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [voiceGender, setVoiceGender] = useState<'male' | 'female'>('female');
  
  const { speak, playAudio, stop, isLoading } = useTTS();

  // Load selected sentences from URL parameters
  useEffect(() => {
    const fetchSentences = async () => {
      const itemIds = searchParams.get('items')?.split(',') || [];
      const level = searchParams.get('level') as JLPTLevel;
      
      if (itemIds.length > 0 && level) {
        const allSentences = await getSentencesByLevel(level);
        const selectedSentences = allSentences.filter(s => itemIds.includes(s.id));
        setSentences(selectedSentences);
      }
    };

    fetchSentences();
  }, [searchParams]);

  // Handle autoplay
  useEffect(() => {
    if (autoplay && sentences.length > 0 && !isPlaying && !isLoading) {
      playCurrentSentence();
    }
  }, [currentIndex, autoplay, sentences, isPlaying, isLoading]);

  const playCurrentSentence = useCallback(async () => {
    if (sentences.length === 0 || currentIndex >= sentences.length) return;
    
    const currentSentence = sentences[currentIndex];
    setIsPlaying(true);
    
    try {
      const audioUrl = await speak(currentSentence.japanese_text, { 
        autoPlay: false,
        voiceGender: voiceGender 
      });
      setCurrentAudioUrl(audioUrl);
      
      // Create audio element and play
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsPlaying(false);
        // Move to next if autoplay is on
        if (autoplay && currentIndex < sentences.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else if (autoplay) {
          setAutoplay(false); // Stop autoplay at end
        }
      };
      
      audio.onerror = () => {
        console.error('Error playing audio');
        setIsPlaying(false);
      };
      
      await audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  }, [sentences, currentIndex, speak, autoplay]);

  const handleReplay = useCallback(() => {
    if (currentAudioUrl) {
      playAudio(currentAudioUrl);
    } else {
      playCurrentSentence();
    }
  }, [currentAudioUrl, playAudio, playCurrentSentence]);

  const handleNext = useCallback(() => {
    stop();
    setIsPlaying(false);
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setCurrentAudioUrl(null);
    }
  }, [currentIndex, sentences.length, stop]);

  const handlePrevious = useCallback(() => {
    stop();
    setIsPlaying(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setCurrentAudioUrl(null);
    }
  }, [currentIndex, stop]);

  const handleToggleAutoplay = useCallback(() => {
    setAutoplay(prev => !prev);
  }, []);

  const handleQuit = useCallback(() => {
    setShowQuitModal(true);
  }, []);

  const confirmQuit = useCallback(() => {
    router.push('/roadmap');
  }, [router]);

  const progress = sentences.length > 0 ? ((currentIndex + 1) / sentences.length) * 100 : 0;
  const currentSentence = sentences[currentIndex];

  if (sentences.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading sentences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TrainingHeader 
        progress={progress}
        onClose={handleQuit}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Sentence Counter */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sentence {currentIndex + 1} of {sentences.length}
          </p>
        </div>

        {/* Main Sentence Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-6">
          {/* Japanese Text */}
          <div className="text-center mb-8">
            <p className="text-4xl font-japanese text-gray-900 dark:text-white mb-4 leading-relaxed">
              {currentSentence.japanese_text}
            </p>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <SkipBack className="w-6 h-6" />
            </button>

            <button
              onClick={handleReplay}
              disabled={!currentAudioUrl}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RotateCcw className="w-6 h-6" />
            </button>

            <button
              onClick={isPlaying ? () => stop() : playCurrentSentence}
              disabled={isLoading}
              className="p-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex >= sentences.length - 1}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <SkipForward className="w-6 h-6" />
            </button>

            <button
              onClick={() => setAutoplay(!autoplay)}
              className={`p-3 rounded-full transition-colors ${
                autoplay 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          {/* Voice Selection */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-sm text-gray-600 dark:text-gray-400">Voice:</span>
            <button
              onClick={() => setVoiceGender('male')}
              className={`p-2 rounded-lg transition-colors ${
                voiceGender === 'male'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              title="Male voice"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={() => setVoiceGender('female')}
              className={`p-2 rounded-lg transition-colors ${
                voiceGender === 'female'
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              title="Female voice"
            >
              <UserRound className="w-5 h-5" />
            </button>
          </div>

          {/* Autoplay Toggle */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <button
              onClick={handleToggleAutoplay}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                autoplay
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {autoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {autoplay ? 'Autoplay On' : 'Autoplay Off'}
            </button>
          </div>

          {/* English Translation */}
          <div className="text-center pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xl text-gray-700 dark:text-gray-300">
              {currentSentence.english_translation}
            </p>
          </div>

          {/* Grammar Points */}
          {currentSentence.grammar_points && currentSentence.grammar_points.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Grammar Points:</p>
              <div className="flex flex-wrap gap-2">
                {currentSentence.grammar_points.map((point, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-sm rounded-full"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentIndex === sentences.length - 1}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg hover:from-pink-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg"
          >
            {currentIndex === sentences.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>

      {/* Quit Confirmation Modal */}
      <QuitConfirmationModal
        isOpen={showQuitModal}
        onKeepLearning={() => setShowQuitModal(false)}
        onQuit={confirmQuit}
      />
    </div>
  );
}

export default function SentencePracticePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    }>
      <SentencePracticeContent />
    </Suspense>
  );
}
