'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, Clock, BookOpen, Target, Award, ArrowRight, TrendingUp } from 'lucide-react';

export default function HowToPassN3Page() {
  useEffect(() => {
    document.title = 'How to Pass JLPT N3: Intermediate Study Guide 2025 - Rocket JLPT';
    
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', 'Complete intermediate guide to passing JLPT N3 in 2025. Master 650 kanji, 3,750 vocabulary words, and complex grammar. Bridge to advanced Japanese.');
    updateMetaTag('keywords', 'jlpt n3, how to pass n3, jlpt n3 study guide, intermediate japanese, n3 exam tips');

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Pass JLPT N3: Intermediate Study Guide 2025",
      "description": "Complete guide to passing JLPT N3. Learn intermediate Japanese with 650 kanji and 3,750 vocabulary words.",
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
        "@id": "https://rocketjlpt.com/how-to-pass/n3"
      }
    };

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Pass JLPT N3",
      "description": "Intermediate guide to passing the JLPT N3 exam",
      "totalTime": "P9M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "step": [
        {
          "@type": "HowToStep",
          "name": "Master Intermediate Kanji",
          "text": "Learn 650 kanji including newspaper and business vocabulary"
        },
        {
          "@type": "HowToStep",
          "name": "Expand Vocabulary",
          "text": "Master 3,750 vocabulary words for everyday and professional contexts"
        },
        {
          "@type": "HowToStep",
          "name": "Study Complex Grammar",
          "text": "Learn advanced sentence structures and nuanced expressions"
        },
        {
          "@type": "HowToStep",
          "name": "Practice Reading Comprehension",
          "text": "Read newspaper articles, essays, and longer passages"
        },
        {
          "@type": "HowToStep",
          "name": "Improve Natural Listening",
          "text": "Understand natural-paced conversations and news broadcasts"
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
              <Link href="/how-to-pass/n3" className="text-gray-900">How to Pass N3</Link>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              How to Pass JLPT N3: Intermediate Guide
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Bridge the gap to advanced Japanese with our comprehensive N3 preparation guide for intermediate learners.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                18 min read
              </span>
              <span className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Intermediate Level
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
              {/* What is JLPT N3 */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">What is JLPT N3?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The <strong>JLPT N3</strong> is the intermediate level of the Japanese Language Proficiency Test, serving as a crucial bridge between basic and advanced Japanese. It tests your ability to understand Japanese used in everyday situations to a certain degree.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  At the N3 level, you should be able to read and understand written materials about everyday topics, follow coherent conversations at near-natural speed, and comprehend newspaper headlines and simple business documents.
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg border border-pink-200 p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="h-6 w-6 text-pink-600" />
                  Key Takeaways
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Master <strong>~650 kanji</strong> and <strong>~3,750 vocabulary words</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Study time: <strong>900-1,325 hours</strong> depending on background</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Passing score: <strong>95/180 points</strong> with sectional minimums</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Test duration: <strong>140 minutes</strong> total</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Minimum per section: <strong>19/60 points</strong> in each of 3 sections</span>
                  </li>
                </ul>
              </div>

              {/* Test Structure */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Test Structure</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Section 1: Language Knowledge (Vocabulary/Grammar)</h3>
                    <p className="text-gray-700 mb-3"><strong>Time:</strong> 30 minutes</p>
                    <p className="text-gray-700 mb-3"><strong>Minimum Score:</strong> 19/60 points</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Vocabulary in context</li>
                      <li>Paraphrasing and synonyms</li>
                      <li>Grammar usage in sentences</li>
                      <li>Sentence formation and word order</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Section 2: Reading</h3>
                    <p className="text-gray-700 mb-3"><strong>Time:</strong> 70 minutes</p>
                    <p className="text-gray-700 mb-3"><strong>Minimum Score:</strong> 19/60 points</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Short passages (200-300 characters)</li>
                      <li>Medium passages (400-500 characters)</li>
                      <li>Long passages (600+ characters)</li>
                      <li>Information retrieval from texts</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Section 3: Listening</h3>
                    <p className="text-gray-700 mb-3"><strong>Time:</strong> 40 minutes</p>
                    <p className="text-gray-700 mb-3"><strong>Minimum Score:</strong> 19/60 points</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Task-based comprehension</li>
                      <li>Point comprehension</li>
                      <li>Verbal expressions</li>
                      <li>Quick response questions</li>
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
                      Kanji: ~650 Characters
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Build on your N4 foundation with <strong>350 additional kanji</strong>:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Newspaper and media vocabulary</li>
                      <li>Business and workplace kanji</li>
                      <li>Academic and formal expressions</li>
                      <li>Complex compound words</li>
                      <li>Multiple readings and nuanced meanings</li>
                    </ul>
                    <div className="mt-4 p-4 bg-pink-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Pro Tip:</strong> Focus on kanji compounds and how meanings change in different contexts. N3 tests your ability to infer meaning from context.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-orange-600" />
                      Vocabulary: ~3,750 Words
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Expand to <strong>3,750 vocabulary words</strong> including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Abstract concepts and ideas</li>
                      <li>Professional and business terminology</li>
                      <li>Idiomatic expressions and set phrases</li>
                      <li>Formal and written language</li>
                      <li>Synonyms and nuanced word choices</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Grammar: Intermediate Patterns</h3>
                    <p className="text-gray-700 mb-3">
                      Master complex grammar including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Causative and passive forms</li>
                      <li>Honorific and humble language (keigo basics)</li>
                      <li>Complex conditionals and hypotheticals</li>
                      <li>Sentence connectors and transitions</li>
                      <li>Expressing opinions, reasons, and purposes</li>
                      <li>Relative clauses and embedded sentences</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Study Strategy */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Intermediate Study Strategies</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Build on Your Foundation (Months 1-3)</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Review all N4 and N5 content thoroughly</li>
                      <li>Learn 15-20 new vocabulary words daily</li>
                      <li>Study 5-7 new kanji per week</li>
                      <li>Focus on kanji compounds and multiple readings</li>
                      <li>Start reading simple news articles</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Master Complex Grammar (Months 4-6)</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Study causative and passive constructions</li>
                      <li>Learn basic honorific language (keigo)</li>
                      <li>Practice complex sentence combinations</li>
                      <li>Understand nuanced expressions</li>
                      <li>Write essays using new grammar patterns</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Develop Reading Skills (Months 7-9)</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Read NHK Easy News daily</li>
                      <li>Practice with graded readers</li>
                      <li>Time yourself on reading passages</li>
                      <li>Learn to skim for main ideas</li>
                      <li>Build reading stamina with longer texts</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Improve Listening Comprehension</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Watch Japanese dramas without subtitles</li>
                      <li>Listen to podcasts at natural speed</li>
                      <li>Practice with JLPT N3 listening exercises</li>
                      <li>Focus on understanding main points</li>
                      <li>Take notes while listening</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Intensive Practice (Final 2 Months)</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Take 5-7 full practice tests</li>
                      <li>Analyze all mistakes thoroughly</li>
                      <li>Focus on weak sections</li>
                      <li>Practice time management</li>
                      <li>Review high-frequency vocabulary</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Common N3 Mistakes</h2>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Underestimating the Difficulty Jump</h4>
                      <p className="text-gray-700">N3 is significantly harder than N4. Don't rush - give yourself adequate preparation time.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Neglecting Reading Practice</h4>
                      <p className="text-gray-700">The reading section is long and challenging. Build reading stamina well in advance.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Ignoring Context Clues</h4>
                      <p className="text-gray-700">N3 tests your ability to understand meaning from context. Practice inferring unknown words.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Poor Time Management</h4>
                      <p className="text-gray-700">Practice pacing yourself. Don't spend too long on difficult questions.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Final Section */}
              <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg border border-pink-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready for the N3 Challenge?</h2>
                <p className="text-gray-700 mb-6">
                  JLPT N3 is a significant milestone in your Japanese journey. It demonstrates solid intermediate proficiency and opens doors to more advanced study and work opportunities in Japan. With dedicated study and the right strategies, you can bridge the gap to advanced Japanese!
                </p>
                <p className="text-gray-700 font-semibold">
                  Start your N3 preparation today and take your Japanese to the next level!
                </p>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* CTA Box */}
              <div className="bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg p-6 text-white">
                <h3 className="text-2xl font-bold mb-3">Master N3 Today</h3>
                <p className="mb-6 text-pink-50">
                  Access 650 kanji, 3,750 vocabulary words, and comprehensive intermediate grammar lessons.
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
                    href="/jlpt/n3/kanji"
                    className="flex items-center justify-between text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    <span>N3 Kanji List</span>
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
                    href="/how-to-pass/n4"
                    className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                  >
                    How to Pass N4
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
