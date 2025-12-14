'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Volume2, CheckCircle, X, Settings } from 'lucide-react';
import Link from 'next/link';

export default function Lesson1() {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
  const [vocabMode, setVocabMode] = useState<'drill' | 'review'>('drill');
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [matchedWords, setMatchedWords] = useState<number[]>([]);
  const [matchOptions, setMatchOptions] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [audioCache, setAudioCache] = useState<{[key: string]: string}>({});

  const sections = [
    'vocabulary',
    'grammar',
    'story',
    'comprehension',
    'practical'
  ];

  const sectionTitles = {
    vocabulary: 'Vocabulary',
    grammar: 'Grammar',
    story: 'Story',
    comprehension: 'Comprehension',
    practical: 'Practical Expressions'
  };

  const vocabularyWords = [
    { kanji: '私', reading: 'わたし', meaning: 'I, me' },
    { kanji: '名前', reading: 'なまえ', meaning: 'name' },
    { kanji: '学生', reading: 'がくせい', meaning: 'student' },
    { kanji: '先生', reading: 'せんせい', meaning: 'teacher' },
    { kanji: '日本', reading: 'にほん', meaning: 'Japan' },
    { kanji: '人', reading: 'ひと', meaning: 'person' },
    { kanji: 'アメリカ', reading: 'アメリカ', meaning: 'America' },
    { kanji: '大学', reading: 'だいがく', meaning: 'university' },
  ];

  const grammarPoints = [
    {
      pattern: 'です',
      explanation: 'Polite copula - "to be"',
      examples: [
        { japanese: '私は学生です。', english: 'I am a student.' },
        { japanese: '田中さんは先生です。', english: 'Tanaka-san is a teacher.' }
      ]
    },
    {
      pattern: 'は (topic marker)',
      explanation: 'Marks the topic of the sentence',
      examples: [
        { japanese: '私は田中です。', english: 'As for me, I am Tanaka.' },
        { japanese: '名前はさくらです。', english: 'As for my name, it is Sakura.' }
      ]
    }
  ];

  const story = {
    title: 'さくらさんの初日',
    titleEnglish: 'Sakura\'s First Day',
    text: [
      { japanese: '私は田中さくらです。', english: 'I am Tanaka Sakura.' },
      { japanese: 'アメリカから来ました。', english: 'I came from America.' },
      { japanese: '二十歳です。', english: 'I am 20 years old.' },
      { japanese: '東京大学の学生です。', english: 'I am a student at Tokyo University.' },
      { japanese: '日本語を勉強しています。', english: 'I am studying Japanese.' },
      { japanese: 'よろしくお願いします。', english: 'Please treat me well.' }
    ]
  };

  const comprehensionQuestions = [
    {
      question: 'What is Sakura\'s full name?',
      options: ['田中さくら', '山田さくら', '佐藤さくら', '鈴木さくら'],
      correct: 0
    },
    {
      question: 'Where did Sakura come from?',
      options: ['イギリス', 'カナダ', 'アメリカ', 'オーストラリア'],
      correct: 2
    },
    {
      question: 'What is Sakura studying?',
      options: ['英語', '中国語', '韓国語', '日本語'],
      correct: 3
    }
  ];

  const practicalExpressions = [
    { japanese: 'はじめまして', reading: 'hajimemashite', english: 'Nice to meet you (first time)' },
    { japanese: 'よろしくお願いします', reading: 'yoroshiku onegaishimasu', english: 'Please treat me well' },
    { japanese: 'どうぞよろしく', reading: 'douzo yoroshiku', english: 'Pleased to meet you (casual)' },
    { japanese: 'お名前は？', reading: 'onamae wa?', english: 'What is your name?' },
    { japanese: 'どちらから来ましたか？', reading: 'dochira kara kimashita ka?', english: 'Where did you come from?' }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      if (!completedSections.includes(currentSection)) {
        setCompletedSections([...completedSections, currentSection]);
      }
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const preloadAudio = async (text: string) => {
    // Check if already cached
    if (audioCache[text]) return;
    
    try {
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
        // Convert binary response to blob URL
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setAudioCache(prev => ({ ...prev, [text]: blobUrl }));
      }
    } catch (error) {
      console.error('Audio preload error:', error);
    }
  };

  const playAudio = async (text: string) => {
    try {
      // Check cache first
      if (audioCache[text]) {
        const audio = new Audio(audioCache[text]);
        await audio.play();
        return;
      }

      // Otherwise fetch and play
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

      if (!response.ok) {
        console.error('TTS API error:', response.status);
        return;
      }
      
      // Convert binary response to blob URL
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      // Cache and play
      setAudioCache(prev => ({ ...prev, [text]: blobUrl }));
      const audio = new Audio(blobUrl);
      await audio.play();
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  };

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate options when vocab index changes (client-side only)
  useEffect(() => {
    if (!isClient) return;
    
    const currentWord = vocabularyWords[currentVocabIndex];
    const otherMeanings = vocabularyWords
      .filter((_, idx) => idx !== currentVocabIndex)
      .map(w => w.meaning)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const options = [currentWord.meaning, ...otherMeanings].sort(() => Math.random() - 0.5);
    setMatchOptions(options);
    
    // Preload audio for current word
    preloadAudio(currentWord.kanji);
  }, [currentVocabIndex, isClient]);

  const handleVocabMatch = (answer: string) => {
    const currentWord = vocabularyWords[currentVocabIndex];
    const isCorrect = answer === currentWord.meaning;
    
    setSelectedMatch(answer);
    
    if (isCorrect) {
      // Play correct sound
      const correctSound = new Audio('/sounds/new-notification-07-210334.mp3');
      correctSound.play();
      
      // Play Japanese audio after a short delay
      setTimeout(() => {
        playAudio(currentWord.kanji);
      }, 500);
      
      // Correct match
      setMatchedWords([...matchedWords, currentVocabIndex]);
    } else {
      // Play incorrect sound
      const incorrectSound = new Audio('/sounds/notification-off-269282 (1).mp3');
      incorrectSound.play();
      
      // Play correct answer audio after a short delay
      setTimeout(() => {
        playAudio(currentWord.kanji);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-between px-6 py-4">
          <Link 
            href="/roadmap"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </Link>
          <div className="flex-1 mx-8">
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-500 ease-out"
                style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
              />
            </div>
          </div>
          <button className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pt-20 pb-8">
        
        {/* Vocabulary Section */}
        {sections[currentSection] === 'vocabulary' && (
          <div>
            {vocabMode === 'drill' ? (
              // Drill Mode - One word at a time with matching
              <div className="max-w-4xl mx-auto py-8 pb-40">
                <div className="grid grid-cols-2 gap-28 items-start">
                  {/* Left Column - Word */}
                  <div className="text-center flex flex-col items-center justify-center">
                    <div className="w-full px-4">
                      <div className="font-bold text-gray-900 dark:text-white mb-3 font-japanese leading-none" 
                           style={{ 
                             fontSize: vocabularyWords[currentVocabIndex].kanji.length > 3 ? 'clamp(3rem, 8vw, 8rem)' : 'clamp(4rem, 12vw, 12rem)',
                             wordBreak: 'keep-all'
                           }}>
                        {vocabularyWords[currentVocabIndex].kanji}
                      </div>
                    </div>
                    <div className="text-xl text-gray-500 dark:text-gray-400 mb-4">
                      {vocabularyWords[currentVocabIndex].reading}
                    </div>
                    <button
                      onClick={() => playAudio(vocabularyWords[currentVocabIndex].kanji)}
                      className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                    >
                      <Volume2 className="h-5 w-5" />
                      <span className="text-sm font-medium">Play audio</span>
                    </button>
                  </div>

                  {/* Right Column - Options */}
                  <div className="space-y-3 max-w-md">
                    {isClient && matchOptions.map((option: string, idx: number) => {
                      const isSelected = selectedMatch === option;
                      const isCorrect = option === vocabularyWords[currentVocabIndex].meaning;
                      const showResult = selectedMatch !== null;
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => handleVocabMatch(option)}
                          disabled={selectedMatch !== null}
                          className={`w-full p-5 rounded-lg rounded-b-xl border-2 border-b-4 font-medium transition-all ${
                            showResult && isSelected && isCorrect
                              ? 'bg-green-500 border-green-500 border-b-green-600 text-white'
                              : showResult && isSelected && !isCorrect
                              ? 'bg-gray-200 dark:bg-gray-700 border-gray-400 dark:border-gray-600 border-b-gray-500 dark:border-b-gray-500 text-gray-700 dark:text-gray-300'
                              : showResult && !isSelected && isCorrect
                              ? 'bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-600 border-b-green-500 dark:border-b-green-500 text-green-800 dark:text-green-300 animate-pulse'
                              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 border-b-gray-400 dark:border-b-gray-600 text-gray-900 dark:text-white hover:border-pink-500 hover:border-b-pink-600'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              // Review Mode - Summary with two columns
              <div className="max-w-4xl mx-auto py-8">
                <div className="grid grid-cols-2 gap-8">
                  {/* Left Column - Results */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Vocabulary Results</h2>
                    
                    {/* Correct Words */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Correct ({matchedWords.length})
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {vocabularyWords.map((word, index) => {
                          if (!matchedWords.includes(index)) return null;
                          return (
                            <div key={index} className="text-sm text-gray-600 dark:text-gray-400 font-japanese">
                              {word.kanji} ({word.reading})
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Incorrect Words */}
                    {matchedWords.length < vocabularyWords.length && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <X className="h-5 w-5 text-red-500" />
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            Review ({vocabularyWords.length - matchedWords.length})
                          </h3>
                        </div>
                        <div className="space-y-2">
                          {vocabularyWords.map((word, index) => {
                            if (matchedWords.includes(index)) return null;
                            return (
                              <div key={index} className="flex items-center justify-between text-sm">
                                <span className="text-gray-900 dark:text-white font-japanese">
                                  {word.kanji} ({word.reading})
                                </span>
                                <button
                                  onClick={() => playAudio(word.kanji)}
                                  className="text-gray-400 hover:text-pink-500 transition-colors"
                                >
                                  <Volume2 className="h-4 w-4" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Continue */}
                  <div className="flex flex-col justify-center items-center">
                    <div className="text-center mb-8">
                      <div className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
                        {matchedWords.length}/{vocabularyWords.length}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">Words Mastered</p>
                    </div>
                    <button
                      onClick={handleNext}
                      className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all text-lg"
                    >
                      Continue Lesson →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Grammar Section */}
        {sections[currentSection] === 'grammar' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Grammar Points</h2>
            <div className="space-y-6">
              {grammarPoints.map((point, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 border-b-4 border-b-gray-300 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-japanese">
                        {point.pattern}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {point.explanation}
                      </p>
                    </div>
                    <button
                      onClick={() => playAudio(point.pattern)}
                      className="w-12 h-12 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center transition-colors"
                    >
                      <Volume2 className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Examples:</div>
                    {point.examples.map((example, exIndex) => (
                      <div key={exIndex} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="text-lg font-japanese text-gray-900 dark:text-white mb-1">
                              {example.japanese}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {example.english}
                            </div>
                          </div>
                          <button
                            onClick={() => playAudio(example.japanese)}
                            className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-pink-500 hover:text-white text-gray-600 dark:text-gray-400 flex items-center justify-center transition-colors"
                          >
                            <Volume2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Story Section */}
        {sections[currentSection] === 'story' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-japanese">
                {story.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {story.titleEnglish}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 border-b-4 border-b-pink-500 p-8">
              <div className="space-y-6">
                {story.text.map((line, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="text-xl font-japanese text-gray-900 dark:text-white mb-2">
                        {line.japanese}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {line.english}
                      </div>
                    </div>
                    <button
                      onClick={() => playAudio(line.japanese)}
                      className="w-12 h-12 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center transition-colors flex-shrink-0"
                    >
                      <Volume2 className="h-6 w-6" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => playAudio(story.text.map(t => t.japanese).join(''))}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-3"
                >
                  <Volume2 className="h-6 w-6" />
                  Play Full Story
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Comprehension Section */}
        {sections[currentSection] === 'comprehension' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comprehension Check</h2>
            <div className="space-y-6">
              {comprehensionQuestions.map((q, qIndex) => (
                <div 
                  key={qIndex}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 border-b-4 border-b-gray-300 p-6"
                >
                  <div className="mb-4">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                      Question {qIndex + 1}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                      {q.question}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {q.options.map((option, oIndex) => (
                      <button
                        key={oIndex}
                        onClick={() => handleAnswerSelect(qIndex, oIndex)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                          selectedAnswers[qIndex] === oIndex
                            ? selectedAnswers[qIndex] === q.correct
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-pink-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-japanese text-gray-900 dark:text-white">
                            {option}
                          </span>
                          {selectedAnswers[qIndex] === oIndex && (
                            <CheckCircle className={`h-5 w-5 ${
                              selectedAnswers[qIndex] === q.correct ? 'text-green-500' : 'text-red-500'
                            }`} />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Practical Expressions Section */}
        {sections[currentSection] === 'practical' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Practical Expressions</h2>
            <div className="space-y-4">
              {practicalExpressions.map((expr, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 border-b-4 border-b-gray-300 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1 font-japanese">
                        {expr.japanese}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {expr.reading}
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {expr.english}
                      </div>
                    </div>
                    <button
                      onClick={() => playAudio(expr.japanese)}
                      className="w-12 h-12 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center transition-colors flex-shrink-0"
                    >
                      <Volume2 className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Completion Badge */}
            <div className="mt-8 bg-gradient-to-r from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20 rounded-lg border-2 border-pink-200 dark:border-pink-800 p-8 text-center">
              <div className="text-6xl mb-4">🎌</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Lesson Complete!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You've earned the <strong>Gakusei Badge</strong>
              </p>
              <Link
                href="/roadmap"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all"
              >
                Return to Roadmap
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar - Slides up after answer */}
      {sections[currentSection] === 'vocabulary' && vocabMode === 'drill' && selectedMatch && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t-2 border-gray-200 dark:border-gray-700 shadow-lg animate-slide-up">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {selectedMatch === vocabularyWords[currentVocabIndex].meaning ? (
                  <>
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                      <CheckCircle className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">Correct!</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Great job!</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                      <X className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">Incorrect</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Correct answer: {vocabularyWords[currentVocabIndex].meaning}
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <button
                onClick={() => {
                  if (currentVocabIndex < vocabularyWords.length - 1) {
                    setCurrentVocabIndex(currentVocabIndex + 1);
                    setSelectedMatch(null);
                  } else {
                    setVocabMode('review');
                  }
                }}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation for other sections */}
      {currentSection < sections.length - 1 && sections[currentSection] !== 'vocabulary' && (
        <div className="fixed bottom-8 right-8">
          <button
            onClick={handleNext}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
