'use client';

import { useState } from 'react';
import { Search, BookOpen, FileText, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const jlptLevels = [
    { level: 'N5', description: 'Beginner' },
    { level: 'N4', description: 'Elementary' },
    { level: 'N3', description: 'Intermediate' },
    { level: 'N2', description: 'Upper Intermediate' },
    { level: 'N1', description: 'Advanced' }
  ];

  const contentTypes = [
    { type: 'kanji', icon: FileText, label: 'Kanji', path: '/kanji' },
    { type: 'vocabulary', icon: BookOpen, label: 'Vocabulary', path: '/vocabulary' },
    { type: 'sentences', icon: MessageSquare, label: 'Sentences', path: '/sentences' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                Master Japanese with
                <span className="block text-pink-500 mt-2">Rocket JLPT</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Comprehensive JLPT preparation with adaptive practice, progress tracking, and mastery-based learning for all levels N5 to N1.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Link 
                  href="/signup"
                  className="px-8 py-3.5 bg-pink-500 text-white text-base font-semibold rounded-md transition-all duration-200 hover:bg-pink-600"
                >
                  Start Learning Free
                </Link>
                <Link 
                  href="/login"
                  className="px-8 py-3.5 bg-white border border-gray-300 text-gray-700 text-base font-semibold rounded-md hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                >
                  Sign In
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Free forever plan</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>All JLPT levels</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Mobile friendly</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Search & Quick Access */}
            <div className="space-y-5">
              {/* Search Bar */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <form onSubmit={handleSearch} className="relative">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search kanji, vocabulary, or sentences..."
                      className="w-full pl-12 pr-4 py-3 text-base border border-gray-300 rounded-md focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all duration-200"
                    />
                  </div>
                </form>
              </div>
              
              {/* Quick Access Cards */}
              <div className="grid grid-cols-3 gap-4">
                {contentTypes.map((content) => {
                  const IconComponent = content.icon;
                  return (
                    <Link
                      key={content.type}
                      href={content.path}
                      className="relative bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 group text-center overflow-hidden"
                    >
                      {/* Gradient bottom border */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:from-pink-100 group-hover:to-orange-100 transition-colors duration-200">
                          <IconComponent className="h-6 w-6 text-pink-500 group-hover:text-pink-600 transition-colors" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                          {content.label}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* JLPT Levels Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Choose Your JLPT Level</h2>
            <p className="text-lg text-gray-600">Start learning at your level and progress at your own pace</p>
          </div>
          
          {/* JLPT Level Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {jlptLevels.map((level) => (
              <div
                key={level.level}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-gray-300"
              >
                <div className="text-center mb-5">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-pink-50 mb-3">
                    <span className="text-xl font-bold text-pink-500">
                      {level.level}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{level.level}</h3>
                  <p className="text-sm text-gray-600">{level.description}</p>
                </div>
                
                {/* Content Type Options */}
                <div className="space-y-1.5">
                  {contentTypes.map((content) => {
                    const IconComponent = content.icon;
                    return (
                      <Link
                        key={content.type}
                        href={`${content.path}?level=${level.level}`}
                        className="flex items-center gap-2.5 p-2.5 rounded-md hover:bg-gray-50 transition-colors duration-200 group"
                      >
                        <IconComponent className="h-4 w-4 text-gray-400 group-hover:text-pink-500" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-pink-500">
                          {content.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Prepare for JLPT Success</h2>
            <p className="text-lg text-gray-600">Structured practice for all JLPT levels</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-pink-50 rounded-lg flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl font-bold text-pink-500">練</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Adaptive Practice</h3>
              <p className="text-gray-600 leading-relaxed">Smart algorithms adjust difficulty based on your performance, ensuring optimal learning pace</p>
            </div>
            
            <div className="text-center">
              <div className="w-14 h-14 bg-pink-50 rounded-lg flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl font-bold text-pink-500">進</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Progress Tracking</h3>
              <p className="text-gray-600 leading-relaxed">Detailed analytics show your strengths and areas for improvement across all JLPT skills</p>
            </div>
            
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 bg-pink-50 rounded-lg flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl font-bold text-pink-500">習</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mastery System</h3>
              <p className="text-gray-600 leading-relaxed">Spaced repetition ensures long-term retention of vocabulary, kanji, and grammar patterns</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600">Choose the plan that fits your learning journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
            {[
              { 
                name: 'Free Forever', 
                price: '$0', 
                period: '/month',
                description: 'Perfect for getting started',
                popular: false,
                features: ['Basic kanji & vocabulary', 'Limited daily practice', 'Progress tracking', 'Mobile access']
              },
              { 
                name: 'Pro', 
                price: '$9', 
                period: '/month',
                description: 'Unlock your full potential',
                popular: true,
                features: ['All JLPT levels (N5-N1)', 'Unlimited practice', 'Advanced analytics', 'Priority support', 'Offline mode']
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-lg border p-8 text-center transition-all duration-200 ${
                  plan.popular 
                    ? 'border-pink-400 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-xl text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center justify-center gap-2.5">
                      <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href="/signup"
                  className={`w-full inline-block px-6 py-3 text-base font-semibold rounded-md transition-all duration-200 ${
                    plan.popular
                      ? 'bg-pink-500 text-white hover:bg-pink-600'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {plan.price === '$0' ? 'Get Started Free' : 'Upgrade to Pro'}
                </a>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>7-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to Master Japanese?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Join thousands of students achieving their JLPT goals with our proven system
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/signup"
              className="inline-block px-8 py-3.5 bg-pink-500 text-white text-base font-semibold rounded-md transition-all duration-200 hover:bg-pink-600"
            >
              Start Learning Free
            </a>
            <a 
              href="/login"
              className="inline-block px-8 py-3.5 bg-white border border-gray-300 text-gray-700 text-base font-semibold rounded-md hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              Sign In
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}