'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import PublicNavbar from '@/components/PublicNavbar';
import { CheckCircle, Clock, BookOpen, Target, TrendingUp, Award, ArrowRight } from 'lucide-react';

export default function HowToPassN4Page() {
  useEffect(() => {
    document.title = 'How to Pass JLPT N4: Complete Study Guide 2025 - Rocket JLPT';
    
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', 'Complete guide to passing JLPT N4 in 2025. Learn test structure, study strategies, required vocabulary, kanji, and grammar. Get proven tips to ace the N4 exam.');
    updateMetaTag('keywords', 'jlpt n4, how to pass n4, jlpt n4 study guide, n4 exam tips, japanese proficiency test');

    // Add Article structured data for AI Overviews
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Pass JLPT N4: Complete Study Guide 2025",
      "description": "Complete guide to passing JLPT N4 in 2025. Learn test structure, study strategies, required vocabulary, kanji, and grammar.",
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
        "@id": "https://rocketjlpt.com/how-to-pass/n4"
      }
    };

    // Add HowTo structured data
    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Pass JLPT N4",
      "description": "Step-by-step guide to passing the JLPT N4 exam",
      "totalTime": "P6M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "step": [
        {
          "@type": "HowToStep",
          "name": "Master Kanji",
          "text": "Learn approximately 300 kanji characters including radicals and compound words"
        },
        {
          "@type": "HowToStep",
          "name": "Build Vocabulary",
          "text": "Master 1,500 vocabulary words through context and spaced repetition"
        },
        {
          "@type": "HowToStep",
          "name": "Study Grammar",
          "text": "Learn essential grammar patterns including particles, verb conjugations, and sentence structures"
        },
        {
          "@type": "HowToStep",
          "name": "Practice Listening",
          "text": "Improve listening comprehension through daily practice with Japanese audio content"
        },
        {
          "@type": "HowToStep",
          "name": "Take Practice Tests",
          "text": "Complete multiple full-length practice tests under timed conditions"
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
      <PublicNavbar />
      
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-pink-600">Home</Link>
              <span>/</span>
              <Link href="/how-to-pass/n4" className="text-gray-900">How to Pass N4</Link>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              How to Pass JLPT N4: Complete Study Guide
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Master the elementary level of Japanese proficiency with our comprehensive N4 preparation guide.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                15 min read
              </span>
              <span className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Elementary Level
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
              {/* What is JLPT N4 Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">What is JLPT N4?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The <strong>JLPT N4</strong> is the second level of the Japanese Language Proficiency Test, designed for elementary-level learners. It tests your ability to understand basic Japanese used in everyday situations.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  At the N4 level, you should be able to read and comprehend passages on familiar daily topics written in basic vocabulary and kanji, and listen to slow-paced conversations about everyday situations.
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
                    <span>Master <strong>~300 kanji</strong> and <strong>~1,500 vocabulary words</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Study time: <strong>550-787 hours</strong> depending on background</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Passing score: <strong>90/180 points</strong> with sectional minimums</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Test duration: <strong>95 minutes</strong> total</span>
                  </li>
                </ul>
              </div>

              {/* Test Structure */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Test Structure</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Section 1: Language Knowledge (Vocabulary/Grammar) & Reading</h3>
                    <p className="text-gray-700 mb-3"><strong>Time:</strong> 60 minutes</p>
                    <p className="text-gray-700 mb-3"><strong>Minimum Score:</strong> 38/120 points</p>
                    <p className="text-gray-700 mb-3">This section tests:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Vocabulary knowledge and usage</li>
                      <li>Grammar patterns and sentence structure</li>
                      <li>Reading comprehension of short passages</li>
                      <li>Understanding of basic daily topics</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Section 2: Listening</h3>
                    <p className="text-gray-700 mb-3"><strong>Time:</strong> 35 minutes</p>
                    <p className="text-gray-700 mb-3"><strong>Minimum Score:</strong> 19/60 points</p>
                    <p className="text-gray-700 mb-3">This section tests:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Understanding slow-paced conversations</li>
                      <li>Comprehension of daily life situations</li>
                      <li>Following simple instructions and announcements</li>
                      <li>Identifying key information from dialogues</li>
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
                      Kanji: ~300 Characters
                    </h3>
                    <p className="text-gray-700 mb-3">
                      The N4 requires knowledge of approximately <strong>300 kanji characters</strong>, building on the 100 kanji from N5. These include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>All N5 kanji (numbers, time, family, basic verbs)</li>
                      <li>Kanji for common places (restaurant, workplace, school)</li>
                      <li>Kanji for weather, nature, and animals</li>
                      <li>Kanji for hobbies and daily activities</li>
                      <li>Basic compound kanji words</li>
                    </ul>
                    <div className="mt-4 p-4 bg-pink-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Pro Tip:</strong> Learn kanji radicals and component meanings. This helps you memorize characters more efficiently and recognize new words.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-orange-600" />
                      Vocabulary: ~1,500 Words
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Master approximately <strong>1,500 vocabulary words</strong>, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Basic nouns, verbs, and adjectives</li>
                      <li>Commonly used expressions and phrases</li>
                      <li>Adverbs and conjunctions</li>
                      <li>Katakana loanwords for everyday items</li>
                      <li>Workplace and school-related vocabulary</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Grammar: Essential Patterns</h3>
                    <p className="text-gray-700 mb-3">
                      Key grammar points to master:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Particle usage (は, が, を, に, で, へ, と, から, まで)</li>
                      <li>Verb conjugations (past, present, negative, te-form)</li>
                      <li>Adjective types (い-adjectives and な-adjectives)</li>
                      <li>Polite and casual speech forms</li>
                      <li>Conditional expressions (たら, ば, と, なら)</li>
                      <li>Desire and intention (たい, つもり, よう)</li>
                      <li>Giving and receiving verbs (あげる, くれる, もらう)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Study Strategy */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Proven Study Strategies</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Create a Study Schedule</h3>
                    <p className="text-gray-700 mb-3">
                      Consistency is key. Aim for <strong>1-2 hours daily</strong> over 6-12 months:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li><strong>Months 1-3:</strong> Focus on vocabulary and kanji foundation</li>
                      <li><strong>Months 4-6:</strong> Deep dive into grammar patterns</li>
                      <li><strong>Months 7-9:</strong> Practice reading comprehension</li>
                      <li><strong>Months 10-12:</strong> Intensive listening practice and mock tests</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Master Kanji Systematically</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Learn 5-10 new kanji per day</li>
                      <li>Review previous kanji daily using spaced repetition</li>
                      <li>Write each kanji multiple times to memorize stroke order</li>
                      <li>Learn common compound words for each kanji</li>
                      <li>Use mnemonics and radical breakdowns</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Build Vocabulary Through Context</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Learn words in example sentences, not isolation</li>
                      <li>Group vocabulary by themes (food, travel, work)</li>
                      <li>Use flashcards with spaced repetition (Anki, Quizlet)</li>
                      <li>Practice writing sentences with new vocabulary</li>
                      <li>Read simple Japanese texts (manga, children's books)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Practice Grammar in Real Contexts</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Study one grammar point thoroughly before moving on</li>
                      <li>Create your own example sentences</li>
                      <li>Do grammar exercises from JLPT prep books</li>
                      <li>Identify grammar patterns while reading</li>
                      <li>Practice transforming sentences (positive ↔ negative, past ↔ present)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Improve Listening Skills</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Listen to Japanese podcasts for beginners</li>
                      <li>Watch anime with Japanese subtitles</li>
                      <li>Practice with JLPT listening exercises</li>
                      <li>Shadow native speakers to improve pronunciation</li>
                      <li>Listen to the same content multiple times</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Take Practice Tests</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Start practice tests 2-3 months before the exam</li>
                      <li>Simulate real test conditions (timing, no breaks)</li>
                      <li>Review mistakes thoroughly and understand why</li>
                      <li>Track your progress and identify weak areas</li>
                      <li>Take at least 3-5 full practice tests</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Mistakes to Avoid</h2>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Neglecting Listening Practice</h4>
                      <p className="text-gray-700">Many students focus only on reading and fail the listening section. Practice listening daily.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Cramming Before the Test</h4>
                      <p className="text-gray-700">Language learning requires consistent practice over time. Start studying at least 6 months in advance.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Ignoring Weak Areas</h4>
                      <p className="text-gray-700">You need to pass both sectional minimums. Don't rely on one strong section to carry you.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Not Reviewing Mistakes</h4>
                      <p className="text-gray-700">Simply doing practice tests isn't enough. Analyze every mistake and understand the correct answer.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Learning Kanji Without Context</h4>
                      <p className="text-gray-700">Memorizing kanji in isolation is inefficient. Always learn them with vocabulary words and example sentences.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Test Day Tips */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Test Day Tips</h2>
                
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Arrive early:</strong> Get to the test center 30 minutes before start time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Bring required items:</strong> Test voucher, photo ID, pencils, eraser, watch</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Manage your time:</strong> Don't spend too long on difficult questions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Read carefully:</strong> Many questions test subtle differences in meaning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Stay calm:</strong> If you don't know an answer, make an educated guess and move on</span>
                  </li>
                </ul>
              </div>

              {/* Final Section */}
              <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg border border-pink-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Your N4 Journey?</h2>
                <p className="text-gray-700 mb-6">
                  Passing JLPT N4 requires dedication and consistent practice, but with the right approach, it's absolutely achievable. Remember: focus on building a strong foundation, practice regularly, and don't neglect any section of the test.
                </p>
                <p className="text-gray-700 font-semibold">
                  Start your preparation today with Rocket JLPT's comprehensive study tools and track your progress every step of the way!
                </p>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* CTA Box */}
              <div className="bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg p-6 text-white">
                <h3 className="text-2xl font-bold mb-3">Start Studying N4 Today</h3>
                <p className="mb-6 text-pink-50">
                  Get access to 300+ kanji, 1,500+ vocabulary words, and comprehensive grammar lessons.
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
                    href="/jlpt/n4/kanji"
                    className="flex items-center justify-between text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    <span>N4 Kanji List</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/schools"
                    className="flex items-center justify-between text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    <span>Language Schools</span>
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
                </div>
              </div>

              {/* Other Levels */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Other JLPT Levels</h3>
                <div className="space-y-2">
                  <Link
                    href="/how-to-pass/n5"
                    className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                  >
                    How to Pass N5
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
