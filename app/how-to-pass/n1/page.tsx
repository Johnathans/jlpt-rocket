'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, Clock, BookOpen, Target, Award, ArrowRight, Trophy } from 'lucide-react';

export default function HowToPassN1Page() {
  useEffect(() => {
    document.title = 'How to Pass JLPT N1: Expert Study Guide 2025 - Rocket JLPT';
    
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', 'Complete expert guide to passing JLPT N1 in 2025. Master 2,000 kanji, 10,000 vocabulary words, and achieve near-native Japanese proficiency.');
    updateMetaTag('keywords', 'jlpt n1, how to pass n1, jlpt n1 study guide, expert japanese, native level japanese');

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Pass JLPT N1: Expert Study Guide 2025",
      "description": "Complete guide to passing JLPT N1, the highest level. Master expert Japanese with 2,000 kanji and 10,000 vocabulary words.",
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
        "@id": "https://rocketjlpt.com/how-to-pass/n1"
      }
    };

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Pass JLPT N1",
      "description": "Expert guide to passing the highest level JLPT N1 exam",
      "totalTime": "P18M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "step": [
        {
          "@type": "HowToStep",
          "name": "Master 2,000 Kanji",
          "text": "Learn all joyo kanji including rare readings and literary usage"
        },
        {
          "@type": "HowToStep",
          "name": "Achieve 10,000 Vocabulary",
          "text": "Master advanced vocabulary including abstract concepts and specialized terms"
        },
        {
          "@type": "HowToStep",
          "name": "Study 400+ Grammar Patterns",
          "text": "Learn literary, formal, and nuanced expressions at native level"
        },
        {
          "@type": "HowToStep",
          "name": "Read Complex Literature",
          "text": "Practice with editorials, critiques, and literary works"
        },
        {
          "@type": "HowToStep",
          "name": "Master Native Speed Comprehension",
          "text": "Understand lectures, debates, and complex discussions at full native speed"
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
              <Link href="/how-to-pass/n1" className="text-gray-900">How to Pass N1</Link>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              How to Pass JLPT N1: Expert Guide
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Conquer the highest level of Japanese proficiency with our comprehensive N1 preparation guide for dedicated learners.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                22 min read
              </span>
              <span className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Expert Level
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
              {/* What is JLPT N1 */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">What is JLPT N1?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The <strong>JLPT N1</strong> is the highest and most challenging level of the Japanese Language Proficiency Test, representing near-native proficiency. It tests your ability to understand Japanese used in a wide variety of circumstances with no difficulty.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  At the N1 level, you should be able to read complex and abstract writings, comprehend logical structures in editorials and critiques, follow lectures and debates at natural speed, and understand nuanced expressions. N1 certification is highly valued for graduate school admission, professional careers, and demonstrates mastery of Japanese.
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg border border-pink-200 p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-pink-600" />
                  Key Takeaways
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Master <strong>~2,000 kanji</strong> (all joyo kanji) and <strong>~10,000 vocabulary words</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Study time: <strong>2,150-3,900 hours</strong> depending on background</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Passing score: <strong>100/180 points</strong> with sectional minimums</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Test duration: <strong>170 minutes</strong> total</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Minimum per section: <strong>19/60 points</strong> in each of 3 sections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Required for <strong>graduate school</strong> and <strong>high-level professional work</strong></span>
                  </li>
                </ul>
              </div>

              {/* Test Structure */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Test Structure</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Section 1: Language Knowledge (Vocabulary/Grammar) & Reading</h3>
                    <p className="text-gray-700 mb-3"><strong>Time:</strong> 110 minutes</p>
                    <p className="text-gray-700 mb-3"><strong>Combined Score:</strong> 120 points (19-point minimum for each subsection)</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Complex vocabulary with abstract meanings</li>
                      <li>Advanced grammar and literary expressions</li>
                      <li>Reading editorials, critiques, and academic texts</li>
                      <li>Understanding logical structures and arguments</li>
                      <li>Comprehending writer's intent and subtle nuances</li>
                      <li>Very long passages (1000+ characters)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Section 2: Listening</h3>
                    <p className="text-gray-700 mb-3"><strong>Time:</strong> 60 minutes</p>
                    <p className="text-gray-700 mb-3"><strong>Minimum Score:</strong> 19/60 points</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Lectures and presentations at natural speed</li>
                      <li>Complex discussions and debates</li>
                      <li>Understanding logical relationships</li>
                      <li>Comprehending abstract concepts aurally</li>
                      <li>Following rapid exchanges and interruptions</li>
                      <li>Understanding cultural and contextual nuances</li>
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
                      Kanji: ~2,000 Characters (All Joyo Kanji)
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Master <strong>all 2,136 joyo kanji</strong> plus common non-joyo:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>All standard readings (on'yomi and kun'yomi)</li>
                      <li>Rare and literary readings</li>
                      <li>Complex compound words (4+ kanji)</li>
                      <li>Understanding kanji etymology</li>
                      <li>Literary and classical usage</li>
                      <li>Specialized technical vocabulary</li>
                      <li>Ability to infer meaning from components</li>
                    </ul>
                    <div className="mt-4 p-4 bg-pink-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Pro Tip:</strong> At N1, you need deep understanding of kanji beyond memorization. Study etymology, historical usage, and how meanings shift in different contexts.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-orange-600" />
                      Vocabulary: ~10,000 Words
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Achieve <strong>10,000+ vocabulary words</strong> including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Highly abstract and philosophical concepts</li>
                      <li>Specialized academic and technical terms</li>
                      <li>Literary and classical expressions</li>
                      <li>Formal written language and set phrases</li>
                      <li>Subtle distinctions between near-synonyms</li>
                      <li>Cultural and historical vocabulary</li>
                      <li>Idiomatic expressions and proverbs</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Grammar: 400+ Expert Patterns</h3>
                    <p className="text-gray-700 mb-3">
                      Master expert-level grammar including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Literary and classical grammar forms</li>
                      <li>Advanced honorific and humble language</li>
                      <li>Complex sentence structures with multiple clauses</li>
                      <li>Formal written expressions</li>
                      <li>Nuanced modal expressions</li>
                      <li>Abstract and philosophical language</li>
                      <li>Understanding archaic and literary forms</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Study Strategy */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Expert Study Strategies</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Immersive Reading (2+ hours daily)</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Read Japanese newspapers daily (Asahi, Yomiuri)</li>
                      <li>Study editorials and opinion pieces</li>
                      <li>Read Japanese literature and novels</li>
                      <li>Study academic papers in your field</li>
                      <li>Analyze complex sentence structures</li>
                      <li>Build reading speed to 300+ characters/minute</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Advanced Vocabulary Mastery</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Learn 30-40 new words daily from authentic materials</li>
                      <li>Study words in multiple contexts</li>
                      <li>Master subtle nuances between synonyms</li>
                      <li>Learn collocations and natural phrasing</li>
                      <li>Study specialized vocabulary in your field</li>
                      <li>Create sentences using new vocabulary</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Expert Grammar Understanding</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Study grammar in literary contexts</li>
                      <li>Understand historical grammar evolution</li>
                      <li>Master formal and written expressions</li>
                      <li>Learn to recognize archaic forms</li>
                      <li>Practice writing complex sentences</li>
                      <li>Analyze sentence structures in native materials</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Native-Level Listening</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Watch university lectures and documentaries</li>
                      <li>Listen to political debates and discussions</li>
                      <li>Follow podcasts on complex topics</li>
                      <li>Watch news analysis programs</li>
                      <li>Practice with JLPT N1 listening materials</li>
                      <li>Focus on understanding implicit meanings</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Intensive Test Preparation</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Take 10+ full practice tests</li>
                      <li>Analyze every single mistake thoroughly</li>
                      <li>Master time management strategies</li>
                      <li>Practice under strict test conditions</li>
                      <li>Review all grammar patterns systematically</li>
                      <li>Build mental stamina for the long test</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Live in Japanese</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Consume all media in Japanese</li>
                      <li>Think in Japanese throughout the day</li>
                      <li>Join Japanese discussion groups</li>
                      <li>Write essays and articles in Japanese</li>
                      <li>Engage with native speakers regularly</li>
                      <li>Immerse yourself completely in the language</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Common N1 Mistakes</h2>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Underestimating the Difficulty</h4>
                      <p className="text-gray-700">N1 is exponentially harder than N2. It requires years of dedicated study and near-total immersion.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Relying Only on Textbooks</h4>
                      <p className="text-gray-700">You must read authentic materials extensively. Textbooks alone cannot prepare you for N1.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Weak Reading Speed</h4>
                      <p className="text-gray-700">You need to read quickly while maintaining comprehension. Practice speed reading daily.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Insufficient Listening Practice</h4>
                      <p className="text-gray-700">Many students fail listening. You need daily exposure to native-speed, complex content.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Not Understanding Context</h4>
                      <p className="text-gray-700">N1 tests your ability to understand implicit meanings and cultural context, not just vocabulary.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Final Section */}
              <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg border border-pink-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Achieve Japanese Mastery!</h2>
                <p className="text-gray-700 mb-6">
                  JLPT N1 represents the pinnacle of Japanese language achievement. It demonstrates near-native proficiency and opens doors to the highest levels of academic and professional opportunities in Japan. Passing N1 requires extraordinary dedication, but it's a life-changing accomplishment that proves your mastery of one of the world's most complex languages.
                </p>
                <p className="text-gray-700 font-semibold">
                  Begin your journey to Japanese mastery today. The path is long, but the reward is worth every hour of study!
                </p>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* CTA Box */}
              <div className="bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg p-6 text-white">
                <h3 className="text-2xl font-bold mb-3">Conquer N1 Today</h3>
                <p className="mb-6 text-pink-50">
                  Access 2,000 kanji, 10,000 vocabulary words, and expert-level grammar for N1 mastery.
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
                    href="/jlpt/n1/kanji"
                    className="flex items-center justify-between text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    <span>N1 Kanji List</span>
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
                    href="/how-to-pass/n2"
                    className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                  >
                    How to Pass N2
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
