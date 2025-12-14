'use client';

import { useEffect } from 'react';
import { BookOpen, FileText, MessageSquare, Star } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  useEffect(() => {
    document.title = 'Rocket JLPT - Master Japanese Language Proficiency Test | N5 to N1';
    
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

    updateMetaTag('description', 'Master Japanese with Rocket JLPT. Comprehensive JLPT preparation with adaptive practice, progress tracking, and mastery-based learning for all levels N5 to N1.');
    updateMetaTag('keywords', 'JLPT, Japanese Language Proficiency Test, learn Japanese, JLPT N5, JLPT N4, JLPT N3, JLPT N2, JLPT N1, Japanese study, kanji, vocabulary');
    updateOGTag('og:title', 'Rocket JLPT - Master Japanese Language Proficiency Test');
    updateOGTag('og:description', 'Comprehensive JLPT preparation with adaptive practice, progress tracking, and mastery-based learning for all levels N5 to N1.');
    updateOGTag('og:url', 'https://www.rocketjlpt.com');
    updateMetaTag('twitter:title', 'Rocket JLPT - Master Japanese Language Proficiency Test');
    updateMetaTag('twitter:description', 'Comprehensive JLPT preparation with adaptive practice, progress tracking, and mastery-based learning for all levels N5 to N1.');
  }, []);
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

  const successStories = [
    {
      name: 'Sarah Chen',
      level: 'N2',
      score: '165/180',
      image: 'https://i.pravatar.cc/150?img=1',
      quote: 'Passed N2 on my first try! The adaptive practice really helped.'
    },
    {
      name: 'Michael Torres',
      level: 'N1',
      score: '152/180',
      image: 'https://i.pravatar.cc/150?img=13',
      quote: 'Finally conquered N1 after 6 months of consistent practice.'
    },
    {
      name: 'Yuki Tanaka',
      level: 'N3',
      score: '171/180',
      image: 'https://i.pravatar.cc/150?img=5',
      quote: 'The progress tracking kept me motivated throughout my journey.'
    }
  ];

  const levelImages = {
    'N5': 'https://i.pravatar.cc/150?img=12',
    'N4': 'https://i.pravatar.cc/150?img=27',
    'N3': 'https://i.pravatar.cc/150?img=31',
    'N2': 'https://i.pravatar.cc/150?img=44',
    'N1': 'https://i.pravatar.cc/150?img=68'
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
                  Start Learning Today
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
                  <span>Save 20% annually</span>
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
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Japan Experience Collage */}
            <div className="relative h-full min-h-[500px]">
              {/* Main large image - Tokyo/Japan scene */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg h-[280px] mb-3">
                <img
                  src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&auto=format&fit=crop&q=80"
                  alt="Tokyo cityscape"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-2xl font-bold mb-2">Live & Work in Japan</h3>
                  <p className="text-white/90 text-sm">Unlock opportunities in the world's 3rd largest economy</p>
                </div>
              </div>

              {/* Bottom row - 3 smaller cards */}
              <div className="grid grid-cols-3 gap-3">
                {/* Mt. Fuji */}
                <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 h-[140px]">
                  <img
                    src="https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=300&auto=format&fit=crop&q=80"
                    alt="Mount Fuji"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-semibold">Travel</p>
                  </div>
                </div>

                {/* Salary boost card */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-pink-500 to-orange-500 shadow-md hover:shadow-lg transition-all duration-200 h-[140px] p-4 flex flex-col justify-center items-center text-center">
                  <div className="text-white">
                    <div className="text-3xl font-bold mb-1">+30%</div>
                    <p className="text-xs font-medium opacity-90">Higher Salary</p>
                  </div>
                </div>

                {/* Traditional culture */}
                <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 h-[140px]">
                  <img
                    src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=300&auto=format&fit=crop&q=80"
                    alt="Japanese temple"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-semibold">Culture</p>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 shadow-lg">
                <p className="text-xs font-semibold text-gray-900">🇯🇵 Learn Japanese</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* JLPT Levels Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Student Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                {/* Large Student Photo */}
                <div className="relative rounded-2xl overflow-hidden mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
                    alt="Student studying Japanese"
                    className="w-full h-[400px] object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Text overlay on image */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white text-xl font-bold mb-2">Start Your JLPT Journey Today</p>
                    <p className="text-white/90 text-sm">Comprehensive study materials for all levels</p>
                  </div>
                </div>
                
                {/* Feature Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center border border-gray-200 shadow-sm">
                    <div className="text-2xl font-bold text-pink-500">8K+</div>
                    <div className="text-xs text-gray-600 mt-1">Vocabulary</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center border border-gray-200 shadow-sm">
                    <div className="text-2xl font-bold text-pink-500">2K+</div>
                    <div className="text-xs text-gray-600 mt-1">Kanji</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center border border-gray-200 shadow-sm">
                    <div className="text-2xl font-bold text-pink-500">N5-N1</div>
                    <div className="text-xs text-gray-600 mt-1">All Levels</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Level Selection */}
            <div className="order-1 lg:order-2">
              <div className="text-center lg:text-left mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Choose Your Level</h2>
                <p className="text-lg text-gray-600">Start learning at your level and progress at your own pace</p>
              </div>
              
              {/* Level Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {jlptLevels.map((level) => (
                  <Link
                    key={level.level}
                    href={`/jlpt/${level.level.toLowerCase()}`}
                    className="group bg-white rounded-lg p-6 border border-gray-200 border-b-4 border-b-pink-500 hover:border-b-pink-600 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="text-2xl font-bold text-white">{level.level}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-pink-500 transition-colors">
                        {level.description}
                      </h3>
                      <p className="text-xs text-gray-500">JLPT {level.level}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
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
            <p className="text-lg text-gray-600">Save 20% with annual billing</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
            {[
              { 
                name: 'Monthly', 
                price: '$9.99', 
                period: '/month',
                description: 'Billed monthly',
                popular: false,
                savings: null,
                features: ['All JLPT levels (N5-N1)', 'Unlimited practice', 'Advanced analytics', 'Priority support', 'Offline mode']
              },
              { 
                name: 'Annual', 
                price: '$7.99', 
                period: '/month',
                description: 'Billed $95.88 annually',
                popular: true,
                savings: 'Save 20%',
                features: ['All JLPT levels (N5-N1)', 'Unlimited practice', 'Advanced analytics', 'Priority support', 'Offline mode', '2 months FREE']
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
                      {plan.savings} - Best Value
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
                  {plan.popular ? 'Get Annual Plan' : 'Get Monthly Plan'}
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
              Start Learning Today
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