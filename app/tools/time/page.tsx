'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Volume2, RefreshCw, Check, X } from 'lucide-react';
import PublicNavbar from '@/components/PublicNavbar';

type Mode = 'practice' | 'quiz' | 'listening';

export default function TimePracticePage() {
  const [hours, setHours] = useState(3);
  const [minutes, setMinutes] = useState(30);
  const [mode, setMode] = useState<Mode>('practice');
  const [quizTime, setQuizTime] = useState<{ hours: number; minutes: number } | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // Generate Japanese time reading
  const generateTimeReading = (h: number, m: number): { japanese: string; romaji: string } => {
    const hourReadings = [
      '', 'いちじ', 'にじ', 'さんじ', 'よじ', 'ごじ', 'ろくじ',
      'しちじ', 'はちじ', 'くじ', 'じゅうじ', 'じゅういちじ', 'じゅうにじ'
    ];

    const minuteReadings: { [key: number]: string } = {
      1: 'いっぷん', 2: 'にふん', 3: 'さんぷん', 4: 'よんぷん', 5: 'ごふん',
      6: 'ろっぷん', 7: 'ななふん', 8: 'はっぷん', 9: 'きゅうふん', 10: 'じゅっぷん',
      11: 'じゅういっぷん', 12: 'じゅうにふん', 13: 'じゅうさんぷん', 14: 'じゅうよんぷん', 15: 'じゅうごふん',
      16: 'じゅうろっぷん', 17: 'じゅうななふん', 18: 'じゅうはっぷん', 19: 'じゅうきゅうふん', 20: 'にじゅっぷん',
      21: 'にじゅういっぷん', 22: 'にじゅうにふん', 23: 'にじゅうさんぷん', 24: 'にじゅうよんぷん', 25: 'にじゅうごふん',
      26: 'にじゅうろっぷん', 27: 'にじゅうななふん', 28: 'にじゅうはっぷん', 29: 'にじゅうきゅうふん', 30: 'さんじゅっぷん',
      31: 'さんじゅういっぷん', 32: 'さんじゅうにふん', 33: 'さんじゅうさんぷん', 34: 'さんじゅうよんぷん', 35: 'さんじゅうごふん',
      36: 'さんじゅうろっぷん', 37: 'さんじゅうななふん', 38: 'さんじゅうはっぷん', 39: 'さんじゅうきゅうふん', 40: 'よんじゅっぷん',
      41: 'よんじゅういっぷん', 42: 'よんじゅうにふん', 43: 'よんじゅうさんぷん', 44: 'よんじゅうよんぷん', 45: 'よんじゅうごふん',
      46: 'よんじゅうろっぷん', 47: 'よんじゅうななふん', 48: 'よんじゅうはっぷん', 49: 'よんじゅうきゅうふん', 50: 'ごじゅっぷん',
      51: 'ごじゅういっぷん', 52: 'ごじゅうにふん', 53: 'ごじゅうさんぷん', 54: 'ごじゅうよんぷん', 55: 'ごじゅうごふん',
      56: 'ごじゅうろっぷん', 57: 'ごじゅうななふん', 58: 'ごじゅうはっぷん', 59: 'ごじゅうきゅうふん'
    };

    let japanese = hourReadings[h];
    
    if (m === 0) {
      // On the hour - just the hour
    } else if (m === 30) {
      japanese += 'はん'; // Half hour
    } else {
      japanese += minuteReadings[m] || '';
    }

    return {
      japanese,
      romaji: `${h}:${m.toString().padStart(2, '0')}`
    };
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.75;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      const voices = window.speechSynthesis.getVoices();
      const japaneseVoices = voices.filter(voice => 
        voice.lang.startsWith('ja') || voice.lang.startsWith('jp')
      );
      
      const preferredVoice = japaneseVoices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Kyoko') || 
        voice.name.includes('Otoya') ||
        voice.name.includes('Premium')
      ) || japaneseVoices[0];
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const generateRandomTime = () => {
    const h = Math.floor(Math.random() * 12) + 1;
    const m = Math.floor(Math.random() * 60);
    return { hours: h, minutes: m };
  };

  const startQuiz = () => {
    const time = generateRandomTime();
    setQuizTime(time);
    setUserAnswer('');
    setShowResult(false);
  };

  const checkAnswer = () => {
    if (!quizTime) return;
    
    const correctReading = generateTimeReading(quizTime.hours, quizTime.minutes);
    const isMatch = userAnswer.trim() === correctReading.japanese;
    
    setIsCorrect(isMatch);
    setShowResult(true);
    setScore(prev => ({
      correct: prev.correct + (isMatch ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const startListeningQuiz = () => {
    const time = generateRandomTime();
    setQuizTime(time);
    setHours(6);
    setMinutes(0);
    setShowResult(false);
    
    // Auto-play the time
    setTimeout(() => {
      const reading = generateTimeReading(time.hours, time.minutes);
      playAudio(reading.japanese);
    }, 500);
  };

  const checkListeningAnswer = () => {
    if (!quizTime) return;
    
    const isMatch = hours === quizTime.hours && minutes === quizTime.minutes;
    setIsCorrect(isMatch);
    setShowResult(true);
    setScore(prev => ({
      correct: prev.correct + (isMatch ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const currentReading = generateTimeReading(hours, minutes);

  // SEO: Set meta tags
  useEffect(() => {
    const pageTitle = 'Japanese Time Practice Tool - Learn to Tell Time in Japanese | Rocket JLPT';
    const pageDescription = 'Free interactive Japanese time-telling practice tool. Master hours (時) and minutes (分) with interactive clock, audio pronunciation, and quiz modes for JLPT preparation.';
    const pageUrl = 'https://rocketjlpt.com/tools/time';

    document.title = pageTitle;

    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updateOGTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', pageDescription);
    updateMetaTag('keywords', 'Japanese time, telling time Japanese, 時, 分, time practice, JLPT time, Japanese clock, learn Japanese time');
    updateOGTag('og:title', pageTitle);
    updateOGTag('og:description', pageDescription);
    updateOGTag('og:url', pageUrl);
    updateOGTag('og:type', 'website');
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', pageTitle);
    updateMetaTag('twitter:description', pageDescription);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = pageUrl;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Japanese Time Practice
          </h1>
          <p className="text-lg text-gray-600">
            Master telling time in Japanese with interactive practice and quizzes
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Mode Selection */}
        <div className="mb-8 flex gap-3">
          <button
            onClick={() => setMode('practice')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              mode === 'practice'
                ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-pink-300'
            }`}
          >
            Free Practice
          </button>
          <button
            onClick={() => { setMode('quiz'); startQuiz(); }}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              mode === 'quiz'
                ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-pink-300'
            }`}
          >
            Reading Quiz
          </button>
          <button
            onClick={() => { setMode('listening'); startListeningQuiz(); }}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              mode === 'listening'
                ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-pink-300'
            }`}
          >
            Listening Quiz
          </button>
        </div>

        {/* Score Display */}
        {(mode === 'quiz' || mode === 'listening') && score.total > 0 && (
          <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-900">
                Score: {score.correct} / {score.total}
              </span>
              <span className="ml-4 text-lg text-gray-600">
                ({Math.round((score.correct / score.total) * 100)}%)
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side - Clock & Controls */}
          <div className="space-y-6">
            
            {/* Analog Clock */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                {mode === 'listening' ? 'Set the Clock' : 'Current Time'}
              </h2>
              
              <div className="flex justify-center mb-8">
                <svg width="280" height="280" viewBox="0 0 280 280" className="drop-shadow-lg">
                  {/* Clock face */}
                  <circle cx="140" cy="140" r="130" fill="white" stroke="#e5e7eb" strokeWidth="4"/>
                  
                  {/* Hour markers */}
                  {[...Array(12)].map((_, i) => {
                    const angle = (i * 30 - 90) * (Math.PI / 180);
                    const x1 = 140 + Math.cos(angle) * 110;
                    const y1 = 140 + Math.sin(angle) * 110;
                    const x2 = 140 + Math.cos(angle) * 120;
                    const y2 = 140 + Math.sin(angle) * 120;
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#374151"
                        strokeWidth="3"
                      />
                    );
                  })}
                  
                  {/* Hour numbers */}
                  {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
                    const angle = (i * 30 - 90) * (Math.PI / 180);
                    const x = 140 + Math.cos(angle) * 95;
                    const y = 140 + Math.sin(angle) * 95;
                    return (
                      <text
                        key={num}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-xl font-bold fill-gray-700"
                      >
                        {num}
                      </text>
                    );
                  })}
                  
                  {/* Hour hand */}
                  <line
                    x1="140"
                    y1="140"
                    x2={140 + Math.cos(((hours % 12) * 30 + minutes * 0.5 - 90) * (Math.PI / 180)) * 60}
                    y2={140 + Math.sin(((hours % 12) * 30 + minutes * 0.5 - 90) * (Math.PI / 180)) * 60}
                    stroke="#ec4899"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  
                  {/* Minute hand */}
                  <line
                    x1="140"
                    y1="140"
                    x2={140 + Math.cos((minutes * 6 - 90) * (Math.PI / 180)) * 90}
                    y2={140 + Math.sin((minutes * 6 - 90) * (Math.PI / 180)) * 90}
                    stroke="#f97316"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  
                  {/* Center dot */}
                  <circle cx="140" cy="140" r="8" fill="#374151"/>
                </svg>
              </div>

              {/* Digital Display */}
              <div className="text-center text-5xl font-bold text-gray-900 mb-6">
                {hours}:{minutes.toString().padStart(2, '0')}
              </div>

              {/* Time Controls */}
              {mode === 'practice' || mode === 'listening' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Hours: {hours}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={hours}
                      onChange={(e) => setHours(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                    />
                    <div className="flex gap-2 mt-2">
                      {[3, 6, 9, 12].map(h => (
                        <button
                          key={h}
                          onClick={() => setHours(h)}
                          className="flex-1 px-3 py-1 text-sm bg-gray-100 hover:bg-pink-50 rounded transition-colors"
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Minutes: {minutes}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="59"
                      value={minutes}
                      onChange={(e) => setMinutes(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                    <div className="flex gap-2 mt-2">
                      {[0, 15, 30, 45].map(m => (
                        <button
                          key={m}
                          onClick={() => setMinutes(m)}
                          className="flex-1 px-3 py-1 text-sm bg-gray-100 hover:bg-orange-50 rounded transition-colors"
                        >
                          :{m.toString().padStart(2, '0')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Right Side - Japanese Display & Quiz */}
          <div className="space-y-6">
            
            {mode === 'practice' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Japanese Reading</h2>
                
                <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl p-8 border-2 border-pink-200 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Time in Japanese:</div>
                      <div className="text-5xl font-bold text-gray-900 font-japanese mb-2">
                        {currentReading.japanese}
                      </div>
                      <div className="text-xl text-gray-600">{currentReading.romaji}</div>
                    </div>
                    <button
                      onClick={() => playAudio(currentReading.japanese)}
                      className="p-4 bg-white rounded-full hover:bg-gray-50 transition-colors shadow-md"
                    >
                      <Volume2 className="h-6 w-6 text-pink-600" />
                    </button>
                  </div>
                </div>

                {/* Quick Reference */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Quick Reference:</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="font-semibold">1時</span> = いちじ</div>
                    <div><span className="font-semibold">2時</span> = にじ</div>
                    <div><span className="font-semibold">3時</span> = さんじ</div>
                    <div><span className="font-semibold">4時</span> = よじ</div>
                    <div><span className="font-semibold">5分</span> = ごふん</div>
                    <div><span className="font-semibold">10分</span> = じゅっぷん</div>
                    <div><span className="font-semibold">15分</span> = じゅうごふん</div>
                    <div><span className="font-semibold">30分</span> = はん</div>
                  </div>
                </div>
              </div>
            )}

            {mode === 'quiz' && quizTime && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Reading Quiz</h2>
                
                <div className="mb-6">
                  <div className="text-center mb-4">
                    <div className="text-6xl font-bold text-gray-900 mb-2">
                      {quizTime.hours}:{quizTime.minutes.toString().padStart(2, '0')}
                    </div>
                    <div className="text-gray-600">How do you say this time in Japanese?</div>
                  </div>

                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type in hiragana..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all text-lg font-japanese"
                    disabled={showResult}
                  />

                  {!showResult ? (
                    <button
                      onClick={checkAnswer}
                      className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <div className="mt-4 space-y-4">
                      <div className={`p-4 rounded-lg flex items-center gap-3 ${
                        isCorrect ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
                      }`}>
                        {isCorrect ? (
                          <>
                            <Check className="h-6 w-6 text-green-600" />
                            <span className="text-green-900 font-semibold">Correct!</span>
                          </>
                        ) : (
                          <>
                            <X className="h-6 w-6 text-red-600" />
                            <div className="flex-1">
                              <div className="text-red-900 font-semibold">Incorrect</div>
                              <div className="text-sm text-red-700">
                                Correct answer: <span className="font-japanese font-bold">{generateTimeReading(quizTime.hours, quizTime.minutes).japanese}</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <button
                        onClick={startQuiz}
                        className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="h-5 w-5" />
                        Next Question
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {mode === 'listening' && quizTime && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Listening Quiz</h2>
                
                <div className="mb-6">
                  <div className="text-center mb-6">
                    <button
                      onClick={() => playAudio(generateTimeReading(quizTime.hours, quizTime.minutes).japanese)}
                      className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all flex items-center gap-3 mx-auto"
                    >
                      <Volume2 className="h-6 w-6" />
                      Play Time
                    </button>
                    <p className="text-gray-600 mt-4">Listen and set the clock to match!</p>
                  </div>

                  {!showResult ? (
                    <button
                      onClick={checkListeningAnswer}
                      className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg flex items-center gap-3 ${
                        isCorrect ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
                      }`}>
                        {isCorrect ? (
                          <>
                            <Check className="h-6 w-6 text-green-600" />
                            <span className="text-green-900 font-semibold">Correct!</span>
                          </>
                        ) : (
                          <>
                            <X className="h-6 w-6 text-red-600" />
                            <div className="flex-1">
                              <div className="text-red-900 font-semibold">Incorrect</div>
                              <div className="text-sm text-red-700">
                                Correct time: <span className="font-bold">{quizTime.hours}:{quizTime.minutes.toString().padStart(2, '0')}</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <button
                        onClick={startListeningQuiz}
                        className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="h-5 w-5" />
                        Next Question
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
