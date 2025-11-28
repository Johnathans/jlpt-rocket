'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, Clock, BookOpen, Target, Award, ArrowRight } from 'lucide-react';

export default function HowToPassN5Page() {
  useEffect(() => {
    document.title = 'How to Pass JLPT N5: Beginner Study Guide 2025 - Rocket JLPT';
    
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', 'Complete beginner guide to passing JLPT N5 in 2025. Learn basic Japanese, hiragana, katakana, 80 kanji, and 800 vocabulary words. Start your Japanese journey.');
    updateMetaTag('keywords', 'jlpt n5, how to pass n5, jlpt n5 study guide, beginner japanese, learn japanese');

    // Add Article structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Pass JLPT N5: Beginner Study Guide 2025",
      "description": "Complete beginner guide to passing JLPT N5. Learn hiragana, katakana, basic kanji, and essential vocabulary.",
      "author": {
        "@type": "Organization",
        "name": "Rocket JLPT"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Rocket JLPT",
        "logo": {
          "@type": "ImageObject",
          "url": "https://rocketjlpt.com/icon.svg"
        }
      },
      "datePublished": "2025-11-27",
      "dateModified": "2025-11-27",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://rocketjlpt.com/how-to-pass/n5"
      }
    };

    // Add HowTo structured data
    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Pass JLPT N5",
      "description": "Step-by-step guide for absolute beginners to pass the JLPT N5 exam",
      "totalTime": "P3M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "step": [
        {
          "@type": "HowToStep",
          "name": "Master Hiragana and Katakana",
          "text": "Learn all 46 hiragana and 46 katakana characters with proper pronunciation"
        },
        {
          "@type": "HowToStep",
          "name": "Learn Basic Kanji",
          "text": "Master 80 fundamental kanji characters used in everyday situations"
        },
        {
          "@type": "HowToStep",
          "name": "Build Core Vocabulary",
          "text": "Learn 800 essential vocabulary words for daily conversations"
        },
        {
          "@type": "HowToStep",
          "name": "Study Basic Grammar",
          "text": "Understand fundamental sentence structures and basic particles"
        },
        {
          "@type": "HowToStep",
          "name": "Practice Daily",
          "text": "Complete practice exercises and listen to beginner Japanese content"
        }
      ]
    };

    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.textContent = JSON.stringify(howToSchema);
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-pink-600">Home</Link>
              <span>/</span>
              <Link href="/how-to-pass/n5" className="text-gray-900">How to Pass N5</Link>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              How to Pass JLPT N5: Beginner's Guide
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Start your Japanese learning journey with our complete N5 preparation guide for absolute beginners.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                12 min read
              </span>
              <span className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Beginner Level
              </span>
              <span>Updated November 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <article className="prose prose-lg max-w-none">
              {/* What is JLPT N5 Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">What is JLPT N5?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The <strong>JLPT N5</strong> is the entry-level test of the Japanese Language Proficiency Test, perfect for absolute beginners. It assesses your ability to understand basic Japanese used in everyday situations.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  At the N5 level, you should be able to read and understand typical expressions and sentences written in hiragana, katakana, and basic kanji, and comprehend slow-paced conversations about familiar topics.
                </p>
              </div>

              {/* Key Takeaways Box */}
              <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg border border-pink-200 p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="h-6 w-6 text-pink-600" />
                  Key Takeaways
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Master <strong>hiragana, katakana, and ~80 kanji</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Learn <strong>~800 vocabulary words</strong> for daily life</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Study time: <strong>325-462 hours</strong> depending on background</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Passing score: <strong>80/180 points</strong> with sectional minimums</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Test duration: <strong>105 minutes</strong> total</span>
                  </li>
                </ul>
              </div>

              {/* Test Structure */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Test Structure</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Section 1: Language Knowledge (Vocabulary/Grammar) & Reading</h3>
                    <p className="text-gray-700 mb-3"><strong>Time:</strong> 70 minutes</p>
                    <p className="text-gray-700 mb-3"><strong>Minimum Score:</strong> 38/120 points</p>
                    <p className="text-gray-700 mb-3">This section tests:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Hiragana and katakana recognition</li>
                      <li>Basic vocabulary and kanji</li>
                      <li>Simple grammar patterns</li>
                      <li>Reading short, simple sentences</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Section 2: Listening</h3>
                    <p className="text-gray-700 mb-3"><strong>Time:</strong> 35 minutes</p>
                    <p className="text-gray-700 mb-3"><strong>Minimum Score:</strong> 19/60 points</p>
                    <p className="text-gray-700 mb-3">This section tests:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Understanding very slow, clearly spoken conversations</li>
                      <li>Comprehension of basic greetings and introductions</li>
                      <li>Following simple instructions</li>
                      <li>Identifying numbers, time, and dates</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* What You Need to Know */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What You Need to Know</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-pink-600" />
                      Hiragana & Katakana: 92 Characters
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Before starting N5 preparation, you <strong>must master</strong> both Japanese syllabaries:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li><strong>Hiragana (46 characters):</strong> Used for native Japanese words and grammar</li>
                      <li><strong>Katakana (46 characters):</strong> Used for foreign loanwords and emphasis</li>
                      <li>Combined characters (が, ぎ, etc.) and small characters (きゃ, しゅ, etc.)</li>
                      <li>Proper stroke order and pronunciation</li>
                    </ul>
                    <div className="mt-4 p-4 bg-pink-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Pro Tip:</strong> Spend 1-2 weeks mastering hiragana and katakana before moving to kanji. This foundation is crucial!
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-orange-600" />
                      Kanji: ~80 Characters
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Learn approximately <strong>80 basic kanji</strong>, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Numbers (一, 二, 三, 四, 五, 六, 七, 八, 九, 十, 百, 千, 万)</li>
                      <li>Time and dates (日, 月, 火, 水, 木, 金, 土, 年, 時, 分)</li>
                      <li>Family members (父, 母, 兄, 弟, 姉, 妹, 子)</li>
                      <li>Common verbs (見る, 行く, 来る, 食べる, 飲む, 書く, 読む)</li>
                      <li>Basic nouns (人, 山, 川, 田, 車, 学校, 先生)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Vocabulary: ~800 Words</h3>
                    <p className="text-gray-700 mb-3">
                      Essential vocabulary categories:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Greetings and basic phrases (おはよう, こんにちは, ありがとう)</li>
                      <li>Numbers, time, and dates</li>
                      <li>Family and personal pronouns</li>
                      <li>Food and drinks (ご飯, 水, お茶, パン)</li>
                      <li>Common adjectives (大きい, 小さい, 新しい, 古い)</li>
                      <li>Basic verbs in present and past tense</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Grammar: Foundation Patterns</h3>
                    <p className="text-gray-700 mb-3">
                      Core grammar points to master:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Basic particles (は, が, を, に, で, へ, の)</li>
                      <li>です/だ and ます forms</li>
                      <li>Present and past tense (positive and negative)</li>
                      <li>Question formation with か</li>
                      <li>Basic adjectives (い-adjectives and な-adjectives)</li>
                      <li>Location words (ここ, そこ, あそこ)</li>
                      <li>Counting and numbers</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Study Strategy */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Beginner Study Strategies</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Start with the Basics (Weeks 1-2)</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Master hiragana completely (1 week)</li>
                      <li>Master katakana completely (1 week)</li>
                      <li>Practice writing each character 20+ times</li>
                      <li>Use flashcards and mobile apps for daily review</li>
                      <li>Read simple words and practice pronunciation</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Build Your Foundation (Months 1-2)</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Learn 5-10 new vocabulary words daily</li>
                      <li>Study 2-3 new kanji per week</li>
                      <li>Focus on high-frequency words first</li>
                      <li>Practice basic sentence patterns</li>
                      <li>Listen to beginner Japanese podcasts</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Practice Grammar (Month 3)</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Study one grammar point per day</li>
                      <li>Create your own example sentences</li>
                      <li>Do textbook exercises (Genki I, Minna no Nihongo)</li>
                      <li>Practice verb conjugations daily</li>
                      <li>Review particles and their usage</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Develop Listening Skills</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Watch Japanese children's shows with subtitles</li>
                      <li>Listen to slow Japanese podcasts (JapanesePod101 Absolute Beginner)</li>
                      <li>Practice with JLPT N5 listening exercises</li>
                      <li>Repeat after native speakers (shadowing)</li>
                      <li>Listen to the same content multiple times</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Take Practice Tests (Final Month)</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Start with individual section practice</li>
                      <li>Take at least 3 full practice tests</li>
                      <li>Time yourself to simulate real conditions</li>
                      <li>Review every mistake thoroughly</li>
                      <li>Focus on weak areas in final weeks</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Beginner Mistakes</h2>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Skipping Hiragana/Katakana</h4>
                      <p className="text-gray-700">Don't rely on romaji. Master both syllabaries before moving forward.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Learning Too Fast</h4>
                      <p className="text-gray-700">Quality over quantity. Make sure you truly understand each concept before moving on.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Ignoring Pronunciation</h4>
                      <p className="text-gray-700">Bad pronunciation habits are hard to fix later. Listen and repeat from day one.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Not Practicing Writing</h4>
                      <p className="text-gray-700">Writing by hand helps memory retention. Don't just type or use apps.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Studying Alone Without Context</h4>
                      <p className="text-gray-700">Always learn vocabulary and grammar in context, not isolated lists.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resources */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Recommended Study Resources</h2>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Textbooks:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Genki I (Beginner)</li>
                      <li>Minna no Nihongo I</li>
                      <li>Japanese from Zero! 1-2</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Apps & Websites:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Rocket JLPT (comprehensive N5 study)</li>
                      <li>Anki (flashcards with spaced repetition)</li>
                      <li>WaniKani (kanji learning)</li>
                      <li>JapanesePod101 (listening practice)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Practice Tests:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Official JLPT Practice Workbooks</li>
                      <li>Shin Kanzen Master N5</li>
                      <li>TRY! JLPT N5</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Final Section */}
              <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg border border-pink-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Begin Your Japanese Journey Today!</h2>
                <p className="text-gray-700 mb-6">
                  JLPT N5 is the perfect starting point for your Japanese learning adventure. With consistent daily practice and the right approach, you can pass N5 in 3-6 months. Remember: every expert was once a beginner!
                </p>
                <p className="text-gray-700 font-semibold">
                  Start with hiragana and katakana today, and you'll be reading Japanese in just a few weeks!
                </p>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* CTA Box */}
              <div className="bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg p-6 text-white">
                <h3 className="text-2xl font-bold mb-3">Start Learning N5 Today</h3>
                <p className="mb-6 text-pink-50">
                  Master hiragana, katakana, 80 kanji, and 800 vocabulary words with interactive lessons.
                </p>
                <Link
                  href="/signup"
                  className="block w-full bg-white text-pink-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  Sign Up Free
                </Link>
                <p className="text-xs text-pink-100 mt-3 text-center">
                  No credit card required
                </p>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <Link
                    href="/jlpt/n5/kanji"
                    className="flex items-center justify-between text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    <span>N5 Kanji List</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/jlpt/hiragana"
                    className="flex items-center justify-between text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    <span>Hiragana Chart</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/jlpt/katakana"
                    className="flex items-center justify-between text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    <span>Katakana Chart</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/schools"
                    className="flex items-center justify-between text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    <span>Language Schools</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Other Levels */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Other JLPT Levels</h3>
                <div className="space-y-2">
                  <Link
                    href="/how-to-pass/n4"
                    className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                  >
                    How to Pass N4
                  </Link>
                  <Link
                    href="/how-to-pass/n3"
                    className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                  >
                    How to Pass N3
                  </Link>
                  <Link
                    href="/how-to-pass/n2"
                    className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                  >
                    How to Pass N2
                  </Link>
                  <Link
                    href="/how-to-pass/n1"
                    className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                  >
                    How to Pass N1
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
