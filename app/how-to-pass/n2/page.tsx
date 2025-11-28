'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, Clock, BookOpen, Target, Award, ArrowRight, Zap } from 'lucide-react';

export default function HowToPassN2Page() {
  useEffect(() => {
    document.title = 'How to Pass JLPT N2: Advanced Study Guide 2025 - Rocket JLPT';
    
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', 'Complete advanced guide to passing JLPT N2 in 2025. Master 1,000 kanji, 6,000 vocabulary words, and advanced grammar. Achieve near-native proficiency.');
    updateMetaTag('keywords', 'jlpt n2, how to pass n2, jlpt n2 study guide, advanced japanese, n2 exam preparation');

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Pass JLPT N2: Advanced Study Guide 2025",
      "description": "Complete guide to passing JLPT N2. Master advanced Japanese with 1,000 kanji and 6,000 vocabulary words.",
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
        "@id": "https://rocketjlpt.com/how-to-pass/n2"
      }
    };

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Pass JLPT N2",
      "description": "Advanced guide to passing the JLPT N2 exam",
      "totalTime": "P12M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "step": [
        {
          "@type": "HowToStep",
          "name": "Master Advanced Kanji",
          "text": "Learn 1,000 kanji including complex compounds and newspaper vocabulary"
        },
        {
          "@type": "HowToStep",
          "name": "Expand to 6,000 Vocabulary",
          "text": "Master advanced vocabulary for newspapers, magazines, and professional contexts"
        },
        {
          "@type": "HowToStep",
          "name": "Study Advanced Grammar",
          "text": "Learn 200+ advanced grammar patterns and nuanced expressions"
        },
        {
          "@type": "HowToStep",
          "name": "Read Complex Materials",
          "text": "Practice with newspapers, magazines, and literary texts"
        },
        {
          "@type": "HowToStep",
          "name": "Master Natural Speed Listening",
          "text": "Understand news broadcasts and natural conversations at native speed"
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
              <Link href="/how-to-pass/n2" className="text-gray-900">How to Pass N2</Link>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              How to Pass JLPT N2: Advanced Guide
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Achieve advanced Japanese proficiency with our comprehensive N2 preparation guide for serious learners.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                20 min read
              </span>
              <span className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Advanced Level
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
              {/* What is JLPT N2 */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">What is JLPT N2?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The <strong>JLPT N2</strong> is the second-highest level of the Japanese Language Proficiency Test, demonstrating advanced proficiency. It tests your ability to understand Japanese used in everyday situations and various circumstances to a considerable degree.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  At the N2 level, you should be able to read newspapers and magazines, understand complex written materials, follow news reports at near-natural speed, and comprehend relationships and nuances in conversations. N2 is often required for university admission and professional work in Japan.
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
                    <span>Master <strong>~1,000 kanji</strong> and <strong>~6,000 vocabulary words</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Study time: <strong>1,475-2,200 hours</strong> depending on background</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Passing score: <strong>90/180 points</strong> with sectional minimums</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Test duration: <strong>155 minutes</strong> total</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Minimum per section: <strong>19/60 points</strong> in each of 3 sections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Often required for <strong>university admission</strong> and <strong>professional work</strong></span>
                  </li>
                </ul>
              </div>

              {/* Test Structure */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Test Structure</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Section 1: Language Knowledge (Vocabulary/Grammar) & Reading</h3>
                    <p className="text-gray-700 mb-3"><strong>Time:</strong> 105 minutes</p>
                    <p className="text-gray-700 mb-3"><strong>Combined Score:</strong> 120 points (19-point minimum for each subsection)</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Advanced vocabulary and kanji usage</li>
                      <li>Complex grammar patterns and expressions</li>
                      <li>Reading comprehension of newspapers and magazines</li>
                      <li>Understanding writer's intent and opinions</li>
                      <li>Long passages (800-1000+ characters)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Section 2: Listening</h3>
                    <p className="text-gray-700 mb-3"><strong>Time:</strong> 50 minutes</p>
                    <p className="text-gray-700 mb-3"><strong>Minimum Score:</strong> 19/60 points</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Coherent conversations at near-natural speed</li>
                      <li>News reports and announcements</li>
                      <li>Understanding relationships between speakers</li>
                      <li>Comprehending nuanced expressions</li>
                      <li>Following complex discussions</li>
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
                      Kanji: ~1,000 Characters
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Expand to <strong>1,000 kanji</strong> with advanced readings:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Newspaper and magazine kanji</li>
                      <li>Literary and formal expressions</li>
                      <li>Complex compound words (3-4 kanji)</li>
                      <li>Multiple readings in different contexts</li>
                      <li>Nuanced meanings and connotations</li>
                      <li>Professional and technical vocabulary</li>
                    </ul>
                    <div className="mt-4 p-4 bg-pink-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Pro Tip:</strong> At N2, focus on understanding kanji in context rather than memorizing isolated characters. Read extensively to see how kanji are used naturally.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-orange-600" />
                      Vocabulary: ~6,000 Words
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Master <strong>6,000 vocabulary words</strong> including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Advanced abstract concepts</li>
                      <li>Professional and academic terminology</li>
                      <li>Idiomatic expressions and proverbs</li>
                      <li>Formal written language</li>
                      <li>Subtle distinctions between synonyms</li>
                      <li>Cultural and social vocabulary</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Grammar: 200+ Advanced Patterns</h3>
                    <p className="text-gray-700 mb-3">
                      Master advanced grammar including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Advanced honorific language (keigo)</li>
                      <li>Complex causative-passive forms</li>
                      <li>Formal written expressions</li>
                      <li>Nuanced conditional and hypothetical forms</li>
                      <li>Advanced sentence connectors</li>
                      <li>Expressing subtle emotions and opinions</li>
                      <li>Literary and formal grammar patterns</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Study Strategy */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Advanced Study Strategies</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Intensive Reading Practice (Daily)</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Read NHK News daily (30-45 minutes)</li>
                      <li>Study newspaper editorials and opinion pieces</li>
                      <li>Read Japanese novels and literature</li>
                      <li>Practice speed reading techniques</li>
                      <li>Analyze sentence structures and grammar</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Advanced Vocabulary Building</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Learn 20-30 new words daily in context</li>
                      <li>Study word families and derivatives</li>
                      <li>Master synonyms and subtle differences</li>
                      <li>Learn collocations and natural phrasing</li>
                      <li>Use vocabulary in writing practice</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Master Complex Grammar</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Study grammar in authentic materials</li>
                      <li>Practice transforming sentences</li>
                      <li>Learn formal and written expressions</li>
                      <li>Master honorific language usage</li>
                      <li>Understand nuanced meanings</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Natural Speed Listening</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Watch Japanese news programs daily</li>
                      <li>Listen to podcasts and radio shows</li>
                      <li>Watch dramas and documentaries</li>
                      <li>Practice with JLPT N2 listening materials</li>
                      <li>Focus on understanding main points quickly</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Comprehensive Test Preparation</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Take 7-10 full practice tests</li>
                      <li>Analyze every mistake in detail</li>
                      <li>Time yourself strictly</li>
                      <li>Practice test-taking strategies</li>
                      <li>Review weak areas intensively</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Common N2 Mistakes</h2>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Underestimating the Challenge</h4>
                      <p className="text-gray-700">N2 is significantly harder than N3. The jump requires serious dedication and study time.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Not Reading Enough</h4>
                      <p className="text-gray-700">You need extensive reading practice with authentic materials. Textbooks alone aren't enough.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Weak Listening Skills</h4>
                      <p className="text-gray-700">Many students fail the listening section. Practice with natural-speed content daily.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Memorizing Without Understanding</h4>
                      <p className="text-gray-700">Focus on understanding nuances and context, not just memorizing lists.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Final Section */}
              <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg border border-pink-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Achieve Advanced Japanese Proficiency!</h2>
                <p className="text-gray-700 mb-6">
                  JLPT N2 represents advanced Japanese proficiency and opens doors to university study and professional careers in Japan. It requires serious commitment, but with consistent daily practice and immersion in authentic materials, you can achieve this milestone. Many students find N2 to be the most rewarding level to pass!
                </p>
                <p className="text-gray-700 font-semibold">
                  Start your N2 journey today and join the ranks of advanced Japanese speakers!
                </p>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* CTA Box */}
              <div className="bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg p-6 text-white">
                <h3 className="text-2xl font-bold mb-3">Master N2 Today</h3>
                <p className="mb-6 text-pink-50">
                  Access 1,000 kanji, 6,000 vocabulary words, and advanced grammar lessons for N2 success.
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
                    href="/jlpt/n2/kanji"
                    className="flex items-center justify-between text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    <span>N2 Kanji List</span>
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
                    href="/how-to-pass/n3"
                    className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                  >
                    How to Pass N3
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
