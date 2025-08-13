'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings, X, ChevronLeft, ChevronRight, BookOpen, Volume2, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';

interface StoryReadingProps {
  storyTitle: string;
  storyImage: string;
  storyText: string;
  storyTextWithFurigana: string;
  onClose: () => void;
  onContinue: () => void;
}

// Mock flashcard data - replace with real data
const mockFlashcards = [
  { id: 1, kanji: '幸せ', reading: 'しあわせ', meaning: 'happiness, good fortune' },
  { id: 2, kanji: '母', reading: 'はは', meaning: 'mother' },
  { id: 3, kanji: '勝つ', reading: 'かつ', meaning: 'to win' },
  { id: 4, kanji: '受話器', reading: 'じゅわき', meaning: 'telephone receiver' },
  { id: 5, kanji: '腰痛', reading: 'ようつう', meaning: 'lower back pain' },
];

export default function StoryReading({
  storyTitle,
  storyImage,
  storyText,
  storyTextWithFurigana,
  onClose,
  onContinue
}: StoryReadingProps) {
  const [showFurigana, setShowFurigana] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');
  const [selectedFlashcard, setSelectedFlashcard] = useState<number | null>(null);
  const [currentSentence, setCurrentSentence] = useState<number>(-1);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [kuroshiro, setKuroshiro] = useState<Kuroshiro | null>(null);
  const [fontSize, setFontSize] = useState(18); // Default font size in pixels
  const [furiganaText, setFuriganaText] = useState<string>('');
  const [tokenizedSentences, setTokenizedSentences] = useState<any[]>([]);
  const [selectedWord, setSelectedWord] = useState<any>(null);
  const [wordMeanings, setWordMeanings] = useState<{[key: string]: string}>({});

  // Use the actual story text from props
  const rawText = storyText || 'ストーリーテキストが読み込まれていません。';
  const displayText = showFurigana && furiganaText ? furiganaText : rawText;

  console.log('StoryReading - Using sample story with', displayText.split('。').filter(s => s.trim()).length, 'sentences');

  // Initialize speech synthesis
  useState(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  });

  // Google Cloud TTS function using Chirp 3
  const speakTextWithChirp = async (text: string, sentenceIndex?: number) => {
    try {
      if (sentenceIndex !== undefined) {
        setCurrentSentence(sentenceIndex);
      }
      
      // Stop any current audio
      speechSynthesis?.cancel();
      
      // Call our Google Cloud TTS API
      console.log('🎵 Calling TTS API with Chirp 3 voice:', 'ja-JP-Chirp3-HD-Leda');
      console.log('🎵 Text to speak:', text.substring(0, 50) + '...');
      
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          languageCode: 'ja-JP',
          voiceName: 'ja-JP-Chirp3-HD-Leda', // Chirp 3 voice (confirmed working in cloze mode)
        }),
      });
      
      console.log('🎵 TTS API response status:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('🎵 TTS API error response:', errorText);
        throw new Error(`TTS API request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('🎵 TTS API success! Audio data length:', data.audio?.length);
      
      // Create audio element and play
      const audio = new Audio(`data:audio/mpeg;base64,${data.audio}`);
      audio.playbackRate = parseFloat(playbackSpeed.replace('x', ''));
      
      audio.onended = () => {
        if (sentenceIndex !== undefined) {
          setCurrentSentence(-1);
        }
      };
      
      console.log('🎵 Playing Chirp 3 audio...');
      await audio.play();
      
    } catch (error) {
      console.error('🎵 Google Cloud TTS Error:', error);
      console.log('🎵 Falling back to browser TTS (NOT Chirp 3)');
      
      // Fallback to browser TTS if Google Cloud fails
      if (speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        utterance.rate = parseFloat(playbackSpeed.replace('x', ''));
        
        utterance.onend = () => {
          if (sentenceIndex !== undefined) {
            setCurrentSentence(-1);
          }
        };
        
        console.log('🎵 Playing browser TTS (fallback)');
        speechSynthesis.speak(utterance);
      }
      
      if (sentenceIndex !== undefined) {
        setCurrentSentence(-1);
      }
    }
  };
  
  const speakText = speakTextWithChirp;

  const togglePlayback = () => {
    if (isPlaying) {
      speechSynthesis?.cancel();
      setIsPlaying(false);
      setCurrentSentence(-1);
    } else {
      setIsPlaying(true);
      speakText(displayText);
    }
  };

  const cyclePlaybackSpeed = () => {
    const speeds = ['1x', '0.5x', '0.75x', '1.25x', '1.5x'];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  // Font size adjustment functions
  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 32)); // Max 32px
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12)); // Min 12px
  };

  const resetFontSize = () => {
    setFontSize(18); // Reset to default
  };

  // Helper function to determine if furigana should be shown for a token
  const shouldShowFurigana = (token: any): boolean => {
    if (!token.reading) return false;
    if (token.surface_form === token.reading) return false;
    
    // Check if the surface form contains kanji (not just hiragana/katakana)
    const hasKanji = /[\u4e00-\u9faf]/.test(token.surface_form);
    return hasKanji;
  };

  // Function to get English meaning for a word using server-side dictionary API
  const getWordMeaning = async (word: string, basicForm?: string): Promise<void> => {
    const lookupWord = basicForm || word;
    if (wordMeanings[lookupWord]) return; // Already cached
    
    try {
      console.log(`Looking up word: ${lookupWord}`);
      
      // Call our server-side dictionary API
      const response = await fetch('/api/dictionary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word: lookupWord }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`Dictionary lookup for "${lookupWord}": ${data.meaning} (source: ${data.source})`);
        setWordMeanings(prev => ({ ...prev, [lookupWord]: data.meaning }));
      } else {
        console.error('Dictionary API failed:', response.status);
        setWordMeanings(prev => ({ ...prev, [lookupWord]: 'Translation unavailable' }));
      }
    } catch (error) {
      console.error('Failed to get word meaning:', error);
      setWordMeanings(prev => ({ ...prev, [lookupWord]: 'Translation unavailable' }));
    }
  };

  // Initialize Kuroshiro for furigana processing
  useEffect(() => {
    const initKuroshiro = async () => {
      try {
        const kuroshiroInstance = new Kuroshiro();
        // Configure kuromoji analyzer with correct dictionary path
        const analyzer = new KuromojiAnalyzer({ dictPath: '/dict/' });
        await kuroshiroInstance.init(analyzer);
        setKuroshiro(kuroshiroInstance);
        console.log('✅ Kuroshiro initialized successfully');
      } catch (error) {
        console.error('❌ Failed to initialize Kuroshiro:', error);
        console.error('❌ Error details:', error instanceof Error ? error.message : String(error));
        // Disable furigana if kuroshiro fails
        setShowFurigana(false);
      }
    };

    initKuroshiro();
  }, []);

  // Generate furigana and tokenize text when kuroshiro is ready
  useEffect(() => {
    const processText = async () => {
      if (!kuroshiro) {
        setFuriganaText('');
        setTokenizedSentences([]);
        return;
      }

      try {
        // Split text into sentences for processing
        const sentences = rawText.split('。').filter(s => s.trim());
        const processedSentences = [];

        for (const sentence of sentences) {
          if (!sentence.trim()) continue;

          // Get tokenized version with word-level information
          console.log('🔄 Tokenizing sentence:', sentence.substring(0, 30) + '...');
          
          // Use kuroshiro to get detailed token information
          const tokens = await kuroshiro._analyzer.parse(sentence.trim());
          
          // Generate furigana for display if needed
          let furiganaHtml = '';
          if (showFurigana) {
            furiganaHtml = await kuroshiro.convert(sentence.trim(), {
              to: 'hiragana',
              mode: 'furigana',
              romajiSystem: 'passport'
            });
          }

          processedSentences.push({
            original: sentence.trim(),
            tokens: tokens,
            furigana: furiganaHtml
          });
        }

        setTokenizedSentences(processedSentences);
        
        // Also set the full furigana text for backward compatibility
        if (showFurigana) {
          const fullFurigana = await kuroshiro.convert(rawText, {
            to: 'hiragana',
            mode: 'furigana',
            romajiSystem: 'passport'
          });
          setFuriganaText(fullFurigana);
        } else {
          setFuriganaText('');
        }

        console.log('✅ Text processing completed');
        console.log('📝 Processed', processedSentences.length, 'sentences with tokens');
      } catch (error) {
        console.error('❌ Failed to process text:', error);
        setFuriganaText(rawText); // Fallback to original text
        setTokenizedSentences([]);
      }
    };

    processText();
  }, [kuroshiro, showFurigana, rawText]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left: JLPT Rocket Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/6110736_rocket_spaceship_icon (2).png" 
              alt="Rocket JLPT Logo" 
              className="h-8 w-8 flex-shrink-0"
            />
            <span className="text-xl text-gray-900">
              <span className="font-black">Rocket</span>
              <span className="font-medium ml-1">JLPT</span>
            </span>
          </div>
          
          {/* Center: Episode Info */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">EPISODE 2</span>
            <h1 className="text-lg font-semibold text-gray-900">{storyTitle}</h1>
          </div>
          
          {/* Right: Close Button */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content - Simplified Layout */}
      <div className="min-h-[calc(100vh-80px)] bg-white">
        <div className="max-w-4xl mx-auto p-8">
          {/* Title and Controls */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button 
                onClick={togglePlayback}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-gray-600" />
                ) : (
                  <Play className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <h2 className="text-2xl font-bold text-gray-900">{storyTitle || 'ストーリータイトル'}</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Font Size Controls */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={decreaseFontSize}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Decrease font size"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <span className="px-2 text-sm font-medium text-gray-700 min-w-[3rem] text-center">
                  {fontSize}px
                </span>
                <button
                  onClick={increaseFontSize}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Increase font size"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={resetFontSize}
                  className="p-1 hover:bg-gray-200 rounded transition-colors ml-1"
                  title="Reset font size"
                >
                  <RotateCcw className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <button
                onClick={cyclePlaybackSpeed}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded hover:bg-gray-200 transition-colors"
              >
                {playbackSpeed}
              </button>
              <button
                onClick={() => setShowFurigana(!showFurigana)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  showFurigana
                    ? 'bg-purple-100 text-purple-700 border border-purple-200'
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}
              >
                {showFurigana ? 'Hide Furigana' : 'Show Furigana'}
              </button>
            </div>
          </div>

          {/* Japanese Text with Word-Level Interactive Layout */}
          <div className="space-y-4">
            {tokenizedSentences.length > 0 ? (
              // Use tokenized sentences with word-level interaction
              tokenizedSentences.map((sentenceData, sentenceIndex) => (
                <div key={sentenceIndex} className={`flex items-start space-x-4 group p-4 rounded-lg transition-all ${
                  currentSentence === sentenceIndex ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                }`}>
                  <button 
                    onClick={() => speakText(sentenceData.original + '。', sentenceIndex)}
                    className="mt-1 p-2 opacity-0 group-hover:opacity-100 hover:bg-blue-100 rounded-full transition-all"
                    title="Play sentence"
                  >
                    <Play className="w-4 h-4 text-blue-600" />
                  </button>
                  <div className="flex-1">
                    <div 
                      className="leading-relaxed text-gray-900 font-japanese select-text" 
                      style={{ fontSize: `${fontSize}px`, lineHeight: '2.2' }}
                    >
                      {/* Render individual words as interactive elements */}
                      {sentenceData.tokens.map((token: any, tokenIndex: number) => (
                        <span
                          key={tokenIndex}
                          className="inline-block cursor-pointer hover:bg-yellow-100 hover:shadow-sm rounded px-1 py-0.5 transition-all relative group/word"
                          onClick={async () => {
                            setSelectedWord(token);
                            console.log('Word clicked:', token);
                            // Try to get English meaning
                            await getWordMeaning(token.basic_form || token.surface_form);
                          }}
                          onMouseEnter={async () => {
                            console.log('Word hovered:', token.surface_form, 'Reading:', token.reading);
                            // Preload meaning on hover
                            await getWordMeaning(token.basic_form || token.surface_form);
                          }}
                        >
                          {showFurigana && shouldShowFurigana(token) ? (
                            <ruby>
                              {token.surface_form}
                              <rt className="text-xs text-gray-600">{token.reading}</rt>
                            </ruby>
                          ) : (
                            token.surface_form
                          )}
                          
                          {/* Enhanced Tooltip with English meaning */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover/word:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 max-w-xs">
                            <div className="font-semibold">{token.surface_form}</div>
                            {token.reading && shouldShowFurigana(token) && (
                              <div className="text-gray-300">Reading: {token.reading}</div>
                            )}
                            {wordMeanings[token.basic_form || token.surface_form] && (
                              <div className="text-blue-200 mt-1">
                                {wordMeanings[token.basic_form || token.surface_form]}
                              </div>
                            )}
                            {token.basic_form && token.basic_form !== token.surface_form && (
                              <div className="text-gray-400 text-xs">Base: {token.basic_form}</div>
                            )}
                            <div className="text-gray-400 text-xs">{token.pos}</div>
                          </div>
                        </span>
                      ))}
                      。
                    </div>
                  </div>
                  <button 
                    onClick={() => speakText(sentenceData.original + '。', sentenceIndex)}
                    className="mt-1 p-2 opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded-full transition-all"
                    title="Repeat sentence"
                  >
                    <RotateCcw className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              ))
            ) : (
              // Fallback to original sentence-based rendering
              rawText
                .split('。')
                .filter(sentence => sentence.trim())
                .map((sentence, index) => {
                  const displaySentence = showFurigana && furiganaText 
                    ? furiganaText.split('。')[index] || sentence 
                    : sentence;
                  const cleanSentence = sentence.replace(/<[^>]*>/g, ''); // Remove HTML tags for TTS

                  return (
                    <div key={index} className={`flex items-start space-x-4 group p-4 rounded-lg transition-all ${
                      currentSentence === index ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                    }`}>
                      <button 
                        onClick={() => speakText(cleanSentence + '。', index)}
                        className="mt-1 p-2 opacity-0 group-hover:opacity-100 hover:bg-blue-100 rounded-full transition-all"
                        title="Play sentence"
                      >
                        <Play className="w-4 h-4 text-blue-600" />
                      </button>
                      <div className="flex-1">
                        <div 
                          className="leading-relaxed text-gray-900 select-text" 
                          style={{ fontSize: `${fontSize}px`, lineHeight: '2.2' }}
                          dangerouslySetInnerHTML={{ __html: displaySentence + '。' }}
                        />
                      </div>
                      <button 
                        onClick={() => speakText(sentence + '。', index)}
                        className="mt-1 p-2 opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded-full transition-all"
                        title="Repeat sentence"
                      >
                        <RotateCcw className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  );
                })
            )}
          </div>

          {/* Continue Button */}
          <div className="mt-12 text-center">
            <button
              onClick={onContinue}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              Continue to Recall Exercise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
