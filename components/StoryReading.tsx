'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, X, Volume2, Eye, EyeOff } from 'lucide-react';

interface StoryReadingProps {
  storyTitle: string;
  storyImage: string;
  storyText: string;
  storyTextWithFurigana: string;
  onClose: () => void;
  onContinue: () => void;
}

interface StoryLine {
  japanese: string;
  english: string;
  id: number;
}

// Sample story data with English translations
const sampleStoryLines: StoryLine[] = [
  { id: 1, japanese: "今日は天気がいいですね。", english: "The weather is nice today, isn't it?" },
  { id: 2, japanese: "公園で散歩をしましょう。", english: "Let's take a walk in the park." },
  { id: 3, japanese: "桜の花がとてもきれいです。", english: "The cherry blossoms are very beautiful." },
  { id: 4, japanese: "写真を撮りませんか。", english: "Shall we take some photos?" },
  { id: 5, japanese: "はい、いいアイデアですね。", english: "Yes, that's a good idea." },
  { id: 6, japanese: "この場所は人気があります。", english: "This place is popular." },
  { id: 7, japanese: "多くの人が来ています。", english: "Many people are coming here." },
  { id: 8, japanese: "でも、とても楽しいです。", english: "But it's very enjoyable." }
];

export default function StoryReading({
  storyTitle,
  storyImage,
  storyText,
  storyTextWithFurigana,
  onClose,
  onContinue
}: StoryReadingProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showEnglish, setShowEnglish] = useState(true);
  const [showJapanese, setShowJapanese] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [storyLines, setStoryLines] = useState<StoryLine[]>(sampleStoryLines);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  // Process story text into lines if provided
  useEffect(() => {
    if (storyText && storyText.trim()) {
      const sentences = storyText.split('。').filter(s => s.trim());
      const processedLines = sentences.map((sentence, index) => ({
        id: index + 1,
        japanese: sentence.trim() + '。',
        english: `English translation for: ${sentence.trim()}` // Placeholder - would come from actual data
      }));
      setStoryLines(processedLines.length > 0 ? processedLines : sampleStoryLines);
    }
  }, [storyText]);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  // TTS function for individual lines
  const speakLine = async (text: string, lineIndex: number) => {
    try {
      setCurrentLineIndex(lineIndex);
      
      // Stop any current audio
      speechSynthesis?.cancel();
      
      // Try Google Cloud TTS first
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          languageCode: 'ja-JP',
          voiceName: 'ja-JP-Chirp3-HD-Leda',
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        const audio = new Audio(`data:audio/mpeg;base64,${data.audio}`);
        audio.playbackRate = playbackSpeed;
        
        audio.onended = () => {
          // Auto-advance to next line if playing full story
          if (isPlaying && lineIndex < storyLines.length - 1) {
            setTimeout(() => {
              speakLine(storyLines[lineIndex + 1].japanese, lineIndex + 1);
            }, 500);
          } else {
            setIsPlaying(false);
            setCurrentLineIndex(-1);
          }
        };
        
        await audio.play();
      } else {
        throw new Error('TTS API failed');
      }
    } catch (error) {
      console.error('TTS Error:', error);
      
      // Fallback to browser TTS
      if (speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        utterance.rate = playbackSpeed;
        
        utterance.onend = () => {
          if (isPlaying && lineIndex < storyLines.length - 1) {
            setTimeout(() => {
              speakLine(storyLines[lineIndex + 1].japanese, lineIndex + 1);
            }, 500);
          } else {
            setIsPlaying(false);
            setCurrentLineIndex(-1);
          }
        };
        
        speechSynthesis.speak(utterance);
      }
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      speechSynthesis?.cancel();
      setIsPlaying(false);
      setCurrentLineIndex(-1);
    } else {
      setIsPlaying(true);
      speakLine(storyLines[0].japanese, 0);
    }
  };

  const cyclePlaybackSpeed = () => {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  // Handle individual line playback
  const playLine = (lineIndex: number) => {
    speakLine(storyLines[lineIndex].japanese, lineIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left: Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <img 
                src="/6110736_rocket_spaceship_icon (2).png" 
                alt="JLPT Rocket Logo" 
                className="h-6 w-6 filter brightness-0 invert"
              />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                JLPT Rocket
              </span>
              <div className="text-xs text-green-500 font-medium">Story Mode</div>
            </div>
          </div>
          
          {/* Center: Story Title */}
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-gray-800">{storyTitle}</h1>
          </div>
          
          {/* Right: Mark Complete Button */}
          <button
            onClick={onContinue}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Mark Complete
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-[calc(100vh-140px)]">
        <div className="max-w-5xl mx-auto px-8 py-8">
          {/* Story Lines */}
          <div className="space-y-6 mb-8">
            {storyLines.map((line, index) => (
              <div 
                key={line.id} 
                className={`group relative bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer ${
                  currentLineIndex === index 
                    ? 'border-green-300 shadow-green-100 bg-gradient-to-r from-green-50/80 to-white/80' 
                    : 'border-green-100 hover:border-green-200'
                }`}
                onClick={() => playLine(index)}
              >
                {/* Gradient overlay for active state */}
                {currentLineIndex === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent rounded-2xl" />
                )}
                
                <div className="relative flex items-center p-8">
                  {/* Line Number */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center mr-8 transition-all ${
                    currentLineIndex === index 
                      ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-200' 
                      : 'bg-gradient-to-br from-green-100 to-green-200 group-hover:from-green-200 group-hover:to-green-300'
                  }`}>
                    <span className={`text-lg font-bold ${
                      currentLineIndex === index ? 'text-white' : 'text-green-700'
                    }`}>
                      {index + 1}
                    </span>
                  </div>
                  
                  {/* Japanese Text */}
                  <div className="flex-1 pr-8">
                    <div className={`text-xl leading-relaxed font-medium transition-all duration-300 ${
                      showJapanese ? 'opacity-100' : 'opacity-20 blur-sm'
                    } ${currentLineIndex === index ? 'text-green-900' : 'text-gray-800'}`}>
                      {line.japanese}
                    </div>
                  </div>
                  
                  {/* Divider */}
                  <div className="w-px h-16 bg-gradient-to-b from-transparent via-green-200 to-transparent mx-4" />
                  
                  {/* English Text */}
                  <div className="flex-1 pl-4">
                    <div className={`text-lg leading-relaxed transition-all duration-300 ${
                      showEnglish ? 'opacity-100' : 'opacity-20 blur-sm'
                    } ${currentLineIndex === index ? 'text-green-700' : 'text-gray-600'}`}>
                      {line.english}
                    </div>
                  </div>
                  
                  {/* Audio Indicator */}
                  <div className="flex-shrink-0 ml-6">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      currentLineIndex === index 
                        ? 'bg-green-500 shadow-lg shadow-green-200' 
                        : 'bg-green-100 group-hover:bg-green-200'
                    }`}>
                      <Volume2 className={`w-4 h-4 ${
                        currentLineIndex === index ? 'text-white' : 'text-green-600'
                      }`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-green-100 shadow-2xl">
        <div className="max-w-5xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Language Toggles */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-green-700">Japanese</span>
                <button
                  onClick={() => setShowJapanese(!showJapanese)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                    showJapanese ? 'bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-200' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${
                      showJapanese ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-green-700">English</span>
                <button
                  onClick={() => setShowEnglish(!showEnglish)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                    showEnglish ? 'bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-200' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${
                      showEnglish ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            
            {/* Play Button */}
            <button 
              onClick={togglePlayback}
              className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full flex items-center justify-center transition-all shadow-2xl shadow-green-300 hover:shadow-green-400 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
              {isPlaying ? (
                <Pause className="w-10 h-10 text-white relative z-10" />
              ) : (
                <Play className="w-10 h-10 text-white ml-1 relative z-10" />
              )}
            </button>
            
            {/* Speed Control */}
            <div className="flex items-center">
              <button
                onClick={cyclePlaybackSpeed}
                className="px-6 py-3 bg-white border-2 border-green-200 rounded-xl text-sm font-medium text-green-700 hover:bg-green-50 hover:border-green-300 transition-all shadow-lg"
              >
                {playbackSpeed}x Speed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
