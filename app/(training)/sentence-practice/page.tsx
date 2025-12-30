'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Volume2, Play, Pause, SkipForward, SkipBack, RotateCcw, User, UserRound, Eye, EyeOff, CheckCircle2, Languages, BookOpen } from 'lucide-react';
import { addFurigana, initializeKuroshiro, extractCompounds } from '@/lib/furigana';
import TrainingHeader from '@/components/TrainingHeader';
import QuitConfirmationModal from '@/components/QuitConfirmationModal';
import SentenceKanjiModal from '@/components/SentenceKanjiModal';
import { useTTS } from '@/lib/useTTS';
import { getSentencesByLevel } from '@/lib/static-data';
import type { JLPTLevel } from '@/lib/static-data';

interface SentenceItem {
  id: string;
  japanese_text: string;
  english_translation: string;
  jlpt_level: JLPTLevel;
  difficulty_level?: number;
  grammar_points?: string[];
  vocabulary_used?: string[];
  kanji_used?: string[];
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
  const [showFurigana, setShowFurigana] = useState(true);
  const [processedText, setProcessedText] = useState<string>('');
  const [showKanjiModal, setShowKanjiModal] = useState(false);
  const [sentenceKanji, setSentenceKanji] = useState<string[]>([]);
  const [sentenceCompounds, setSentenceCompounds] = useState<string[]>([]);
  const [preloadedKanjiData, setPreloadedKanjiData] = useState<Record<string, any>>({});
  const [preloadedVocabData, setPreloadedVocabData] = useState<Record<string, any>>({});
  
  const { speak, playAudio, stop, isLoading } = useTTS();

  // Load selected sentences - try sessionStorage first for instant loading
  useEffect(() => {
    const loadSentences = async () => {
      // Try to get pre-loaded data from sessionStorage
      const cachedData = sessionStorage.getItem('trainingData');
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          setSentences(parsedData);
          sessionStorage.removeItem('trainingData'); // Clean up after use
          return;
        } catch (error) {
          console.error('Error parsing cached training data:', error);
        }
      }
      
      // Fallback: load from URL parameters (legacy support)
      const itemIds = searchParams.get('items')?.split(',') || [];
      const level = searchParams.get('level') as JLPTLevel;
      
      if (itemIds.length > 0 && level) {
        const allSentences = await getSentencesByLevel(level);
        const selectedSentences = allSentences.filter(s => itemIds.includes(s.id));
        setSentences(selectedSentences);
      }
    };

    loadSentences();
  }, [searchParams]);

  // Process furigana and preload kanji data when sentence changes
  useEffect(() => {
    const processSentence = async () => {
      if (sentences.length > 0 && currentIndex < sentences.length) {
        // Process furigana
        try {
          await initializeKuroshiro();
          const furiganaText = await addFurigana(sentences[currentIndex].japanese_text);
          setProcessedText(furiganaText);
        } catch (error) {
          console.error('Error processing furigana:', error);
          setProcessedText(sentences[currentIndex].japanese_text);
        }

        // Preload kanji data and extract compounds in background
        const kanji = extractKanji(sentences[currentIndex].japanese_text);
        setSentenceKanji(kanji);
        
        // Extract compound words
        let compounds: string[] = [];
        try {
          compounds = await extractCompounds(sentences[currentIndex].japanese_text);
          setSentenceCompounds(compounds);
        } catch (error) {
          console.error('Error extracting compounds:', error);
          setSentenceCompounds([]);
        }
        
        // Preload kanji data
        if (kanji.length > 0) {
          try {
            const response = await fetch('/api/kanji/lookup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ characters: kanji }),
            });
            if (response.ok) {
              const data = await response.json();
              setPreloadedKanjiData(data);
            }
          } catch (error) {
            console.error('Error preloading kanji data:', error);
          }
        }
        
        // Preload vocabulary data for compounds
        if (compounds.length > 0) {
          try {
            const response = await fetch('/api/vocabulary/lookup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ words: compounds }),
            });
            if (response.ok) {
              const data = await response.json();
              setPreloadedVocabData(data);
            }
          } catch (error) {
            console.error('Error preloading vocabulary data:', error);
          }
        }
      }
    };
    processSentence();
  }, [currentIndex, sentences]);

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

  const extractKanji = (text: string): string[] => {
    // Remove HTML tags first (from furigana processing)
    const cleanText = text.replace(/<[^>]*>/g, '');
    
    // Match all kanji characters (Unicode range for CJK Unified Ideographs)
    const kanjiRegex = /[\u4e00-\u9faf]/g;
    const matches = cleanText.match(kanjiRegex);
    if (!matches) return [];
    
    // Remove duplicates while preserving order
    const seen = new Set<string>();
    const result: string[] = [];
    for (const kanji of matches) {
      if (!seen.has(kanji)) {
        seen.add(kanji);
        result.push(kanji);
      }
    }
    return result;
  };

  const handleShowKanji = useCallback(() => {
    if (sentences.length > 0 && currentIndex < sentences.length) {
      setShowKanjiModal(true);
    }
  }, [sentences, currentIndex]);

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-3xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Practice Complete
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              You've completed {sentences.length} sentences
            </p>
          </div>

          {/* Stats Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {/* Sentences Completed */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</span>
                <CheckCircle2 className="h-5 w-5" style={{ color: '#dfef87' }} />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{sentences.length}</div>
            </div>

            {/* Continue Card */}
            <div className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Great Job!</span>
              </div>
              <div className="text-lg font-bold">Keep Learning</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleRestart}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-pink-300 dark:hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 font-semibold transition-all rounded-lg"
            >
              <RotateCcw className="h-5 w-5" />
              Practice Again
            </button>
            <button
              onClick={handleFinish}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold transition-all rounded-lg shadow-lg hover:shadow-xl"
            >
              Continue
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
          <div className="text-center mb-14 pt-8">
            {showFurigana ? (
              <div 
                className="text-4xl font-light font-japanese text-gray-900 dark:text-white leading-relaxed tracking-wide"
                dangerouslySetInnerHTML={{ __html: processedText || currentSentence.japanese_text }}
              />
            ) : (
              <p className="text-4xl font-light font-japanese text-gray-900 dark:text-white leading-relaxed tracking-wide">
                {currentSentence.japanese_text}
              </p>
            )}
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
              className="p-3 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
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
            
            <button
              onClick={() => setShowFurigana(!showFurigana)}
              className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              title="Toggle furigana readings"
            >
              <Languages className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleShowKanji}
              className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              title="View kanji in sentence"
            >
              <BookOpen className="w-5 h-5" />
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

      {/* Kanji Modal */}
      <SentenceKanjiModal
        isOpen={showKanjiModal}
        onClose={() => setShowKanjiModal(false)}
        kanjiCharacters={sentenceKanji}
        compounds={sentenceCompounds}
        sentenceText={currentSentence?.japanese_text || ''}
        preloadedKanjiData={preloadedKanjiData}
        preloadedVocabData={preloadedVocabData}
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
