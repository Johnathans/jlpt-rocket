'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Rocket, Target, Users, Zap } from 'lucide-react';

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Us - Rocket JLPT | Japanese Learning Platform';
    
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', 'Learn about Rocket JLPT\'s mission to make Japanese language learning accessible and effective for JLPT exam preparation. Built by learners for learners.');
    updateMetaTag('keywords', 'about rocket jlpt, japanese learning platform, jlpt preparation, language learning mission');
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About Rocket JLPT</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We're on a mission to make Japanese language learning accessible, effective, and enjoyable for everyone preparing for the JLPT exam.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg text-gray-600 space-y-4">
            <p>
              Rocket JLPT was born from a simple observation: traditional JLPT study methods often feel overwhelming and disconnected from real progress. We believed there had to be a better way.
            </p>
            <p>
              Our platform combines proven language learning techniques with modern technology to create an adaptive, personalized learning experience. Whether you're starting with N5 or pushing for N1, we provide the tools and structure you need to succeed.
            </p>
            <p>
              Built by language learners for language learners, Rocket JLPT focuses on what matters most: consistent practice, measurable progress, and mastery-based learning that actually sticks.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What Drives Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Focused Learning</h3>
              <p className="text-gray-600">
                Every feature is designed to help you master JLPT content efficiently, without distractions or unnecessary complexity.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Adaptive Practice</h3>
              <p className="text-gray-600">
                Our system adapts to your progress, focusing on areas where you need the most practice while reinforcing what you've mastered.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community First</h3>
              <p className="text-gray-600">
                We listen to our learners and continuously improve based on real feedback from people preparing for the JLPT.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Rocket className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Results Driven</h3>
              <p className="text-gray-600">
                We measure success by your progress and JLPT results, not by time spent or features used.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg border border-pink-100 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of learners who are mastering Japanese with Rocket JLPT.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all shadow-sm"
          >
            Get Started Free
          </Link>
        </section>
      </div>
    </div>
  );
}
