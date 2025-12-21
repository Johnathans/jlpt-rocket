'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Volume2, Play, Pause, SkipForward, SkipBack, RotateCcw, User, UserRound, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
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
  const [showEnglish, setShowEnglish] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  
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
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setCurrentAudioUrl(null);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, sentences.length]);

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

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setIsComplete(false);
    setCurrentAudioUrl(null);
  }, []);

  const handleFinish = useCallback(() => {
    router.push('/roadmap');
  }, [router]);

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

  // Completion screen
  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-4">Practice Complete!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            You've completed {sentences.length} sentences
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Practice Again
            </button>
            <button
              onClick={handleFinish}
              className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
            >
              Finish
            </button>
          </div>
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

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Sentence Counter */}
        <div className="text-center mb-4">
          <p className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500">
            {currentIndex + 1} / {sentences.length}
          </p>
        </div>

        {/* Main Content */}
        <div className="mb-16">
          {/* Japanese Text */}
          <div className="text-center mb-14">
            <p className="text-4xl font-light font-japanese text-gray-900 dark:text-white leading-relaxed tracking-wide">
              {currentSentence.japanese_text}
            </p>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center justify-center gap-6 mb-10">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="p-3 text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Previous"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={handleReplay}
              disabled={!currentAudioUrl}
              className="p-3 text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Replay"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={isPlaying ? () => stop() : playCurrentSentence}
              disabled={isLoading}
              className="p-4 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Play"
            >
              {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7" />}
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex >= sentences.length - 1}
              className="p-3 text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Next"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={() => setAutoplay(!autoplay)}
              className={`p-3 transition-colors ${
                autoplay 
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              title="Autoplay"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Voice Selection & Controls */}
          <div className="flex items-center justify-center gap-6 mb-10">
            <div className="flex gap-4">
              <button
                onClick={() => setVoiceGender('male')}
                className={`px-4 py-2 text-sm transition-colors border-b-2 ${
                  voiceGender === 'male'
                    ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                Male
              </button>
              <button
                onClick={() => setVoiceGender('female')}
                className={`px-4 py-2 text-sm transition-colors border-b-2 ${
                  voiceGender === 'female'
                    ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                Female
              </button>
            </div>
            
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
            
            <button
              onClick={handleToggleAutoplay}
              className={`px-4 py-2 text-sm transition-colors border-b-2 ${
                autoplay
                  ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
              title="Toggle autoplay"
            >
              Autoplay
            </button>
            
            <button
              onClick={() => setShowEnglish(!showEnglish)}
              className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              title="Toggle English translation"
            >
              {showEnglish ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          </div>


          {/* English Translation */}
          {showEnglish && (
            <div className="text-center mb-10">
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {currentSentence.english_translation}
              </p>
            </div>
          )}

          {/* Grammar Points */}
          {currentSentence.grammar_points && currentSentence.grammar_points.length > 0 && (
            <div className="text-center">
              <div className="inline-flex flex-wrap gap-3 justify-center">
                {currentSentence.grammar_points.map((point, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-gray-400 dark:text-gray-500"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </div>
          )}
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
