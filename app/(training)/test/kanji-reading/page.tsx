'use client';

import { useState } from 'react';
import { List, Volume2 } from 'lucide-react';
import TrainingHeader from '@/components/TrainingHeader';

interface TestQuestion {
  id: number;
  sentence: string;
  underlinedKanji: string;
  kanjiPosition: number; // Position in sentence where kanji appears
  options: string[];
  correctAnswer: number; // Index of correct option (0-3)
  explanation?: string;
}

const kanjiReadingQuestions: TestQuestion[] = [
  {
    id: 1,
    sentence: "私は毎日学校に行きます。",
    underlinedKanji: "学校",
    kanjiPosition: 4, // Position where 学校 starts
    options: ["がっこう", "がくこう", "まなびや", "がくしゃ"],
    correctAnswer: 0,
    explanation: "学校 is read as がっこう (gakkou), meaning 'school'."
  },
  {
    id: 2,
    sentence: "今日は天気がいいですね。",
    underlinedKanji: "天気",
    kanjiPosition: 3,
    options: ["てんき", "あまき", "そらき", "てんけ"],
    correctAnswer: 0,
    explanation: "天気 is read as てんき (tenki), meaning 'weather'."
  },
  {
    id: 3,
    sentence: "友達と映画を見ました。",
    underlinedKanji: "映画",
    kanjiPosition: 3,
    options: ["えいが", "えが", "かげえ", "うつしえ"],
    correctAnswer: 0,
    explanation: "映画 is read as えいが (eiga), meaning 'movie'."
  },
  {
    id: 4,
    sentence: "新しい本を買いました。",
    underlinedKanji: "新しい",
    kanjiPosition: 0,
    options: ["あたらしい", "しんしい", "にいしい", "あらたしい"],
    correctAnswer: 0,
    explanation: "新しい is read as あたらしい (atarashii), meaning 'new'."
  },
  {
    id: 5,
    sentence: "電車で会社に行きます。",
    underlinedKanji: "電車",
    kanjiPosition: 0,
    options: ["でんしゃ", "でんくるま", "いなずまぐるま", "らいしゃ"],
    correctAnswer: 0,
    explanation: "電車 is read as でんしゃ (densha), meaning 'train'."
  }
];

export default function KanjiReadingTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(kanjiReadingQuestions.length).fill(null));
  const [score, setScore] = useState(0);

  const question = kanjiReadingQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / kanjiReadingQuestions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    // Update answers array
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
    
    // Update score if correct
    if (answerIndex === question.correctAnswer && answers[currentQuestion] === null) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < kanjiReadingQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
      setShowResult(answers[currentQuestion + 1] !== null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
      setShowResult(answers[currentQuestion - 1] !== null);
    }
  };

  const renderSentenceWithUnderline = () => {
    const { sentence, underlinedKanji, kanjiPosition } = question;
    const before = sentence.substring(0, kanjiPosition);
    const after = sentence.substring(kanjiPosition + underlinedKanji.length);
    
    return (
      <p className="text-2xl font-japanese leading-relaxed text-center">
        {before}
        <span className="underline decoration-2 underline-offset-4 font-bold text-gray-900">
          {underlinedKanji}
        </span>
        {after}
      </p>
    );
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const goToQuestion = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
    setSelectedAnswer(answers[questionIndex]);
    setShowResult(answers[questionIndex] !== null);
    setIsDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Training Header */}
      <TrainingHeader 
        progress={progress}
        onClose={() => window.history.back()}
        rightButton={
          <button
            onClick={toggleDrawer}
            className="p-3 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-100"
          >
            <List className="h-6 w-6" />
          </button>
        }
      />

      {/* Main Content */}
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-12rem)]">
            
            {/* Left Content Area */}
            <div className="lg:col-span-2 flex flex-col justify-center items-center bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="text-center space-y-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-8">
                  Choose the correct reading for the underlined kanji:
                </h2>
                
                <div className="bg-gray-50 rounded-xl p-8">
                  {renderSentenceWithUnderline()}
                </div>

                {/* Audio button (placeholder) */}
                <button className="flex items-center gap-2 mx-auto px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                  <Volume2 className="h-5 w-5" />
                  <span className="text-sm">Play Audio</span>
                </button>
              </div>
            </div>

            {/* Right Answer Area */}
            <div className="flex flex-col justify-center space-y-4">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const isWrong = showResult && isSelected && !isCorrect;
                const shouldShowCorrect = showResult && isCorrect;
                
                return (
                  <button
                    key={index}
                    onClick={() => !showResult && handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`
                      relative p-6 rounded-2xl border border-gray-200 border-b-4 transition-all duration-200 text-left
                      ${!showResult 
                        ? 'bg-white border-b-gray-400 hover:border-b-gray-500 hover:shadow-md' 
                        : shouldShowCorrect
                        ? 'bg-green-50 border-green-200 border-b-green-500 text-green-800'
                        : isWrong
                        ? 'bg-red-50 border-red-200 border-b-red-500 text-red-800'
                        : 'bg-gray-50 border-gray-200 border-b-gray-400 text-gray-500'
                      }
                      ${!showResult ? 'cursor-pointer' : 'cursor-default'}
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold
                        ${!showResult 
                          ? 'bg-gray-900 text-white' 
                          : shouldShowCorrect
                          ? 'bg-green-500 text-white'
                          : isWrong
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-400 text-white'
                        }
                      `}>
                        {index + 1}
                      </div>
                      <span className="text-xl font-japanese font-medium">
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* Explanation */}
              {showResult && question.explanation && (
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                <button
                  onClick={handleNext}
                  disabled={currentQuestion === kanjiReadingQuestions.length - 1}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Drawer */}
      {isDrawerOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleDrawer}
          />
          
          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Questions</h3>
                <button
                  onClick={toggleDrawer}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-2">
                {kanjiReadingQuestions.map((q, index) => {
                  const isAnswered = answers[index] !== null;
                  const isCorrect = isAnswered && answers[index] === q.correctAnswer;
                  const isCurrent = index === currentQuestion;
                  
                  return (
                    <button
                      key={q.id}
                      onClick={() => goToQuestion(index)}
                      className={`
                        w-full p-3 rounded-lg text-left transition-colors
                        ${isCurrent 
                          ? 'bg-green-100 border-2 border-green-500' 
                          : isAnswered
                          ? isCorrect
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-red-50 border border-red-200'
                          : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-6 h-6 rounded flex items-center justify-center text-xs font-bold
                          ${isCurrent
                            ? 'bg-green-500 text-white'
                            : isAnswered
                            ? isCorrect
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                            : 'bg-gray-300 text-gray-700'
                          }
                        `}>
                          {index + 1}
                        </div>
                        <span className="text-sm font-japanese truncate">
                          {q.underlinedKanji}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              {/* Score */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Score</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {score}/{kanjiReadingQuestions.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
