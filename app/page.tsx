'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [autoFlipping, setAutoFlipping] = useState(true);

  const kanjiData = [
    { kanji: '日', reading: 'にち', meaning: 'day, sun' },
    { kanji: '月', reading: 'げつ', meaning: 'month, moon' },
    { kanji: '火', reading: 'か', meaning: 'fire, Tuesday' },
    { kanji: '水', reading: 'すい', meaning: 'water' },
    { kanji: '木', reading: 'もく', meaning: 'tree, wood' },
    { kanji: '金', reading: 'きん', meaning: 'gold, money' },
    { kanji: '土', reading: 'ど', meaning: 'earth, soil' },
    { kanji: '人', reading: 'じん', meaning: 'person' },
    { kanji: '子', reading: 'こ', meaning: 'child' },
    { kanji: '学', reading: 'がく', meaning: 'study, learn' },
    { kanji: '生', reading: 'せい', meaning: 'life, birth' },
    { kanji: '先', reading: 'せん', meaning: 'previous, ahead' }
  ];

  // Auto-flip cards randomly
  useEffect(() => {
    if (!autoFlipping) return;

    const flipRandomCard = () => {
      const randomIndex = Math.floor(Math.random() * kanjiData.length);
      setFlippedCard(randomIndex);
      
      // Flip back after 2 seconds
      setTimeout(() => {
        setFlippedCard(null);
      }, 2000);
    };

    // Start flipping after 1 second, then every 4 seconds
    const initialTimeout = setTimeout(flipRandomCard, 1000);
    const interval = setInterval(flipRandomCard, 4000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [autoFlipping, kanjiData.length]);

  const handleCardClick = (index: number) => {
    // Stop auto-flipping when user interacts
    setAutoFlipping(false);
    
    if (flippedCard === index) {
      setFlippedCard(null);
    } else {
      setFlippedCard(index);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50">
      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Master Japanese.
                <span className="block">Pass Your JLPT.</span>
                <span className="block" style={{ color: '#2a0d81' }}>Rocket to Success</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Accelerate your Japanese learning with adaptive practice, spaced repetition, and real-time progress tracking.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                <a 
                  href="/signup"
                  className="px-8 py-4 text-white text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-center hover:opacity-90" style={{ backgroundColor: '#2a0d81' }}
                >
                  Start Learning Free
                </a>
                <a 
                  href="/login"
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 text-lg font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-100 transition-all duration-200 text-center"
                >
                  Sign In
                </a>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#2a0d81' }}></div>
                  <span>Free forever plan</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#2a0d81' }}></div>
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Interactive Kanji Grid */}
            <div className="relative order-first lg:order-last">
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-purple-200 shadow-lg">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                  {kanjiData.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleCardClick(index)}
                      className="aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 border-purple-200 hover:border-purple-400 hover:shadow-md bg-purple-50 perspective-1000"
                    >
                      <div className={`w-full h-full flex items-center justify-center transition-transform duration-700 transform-style-preserve-3d ${
                        flippedCard === index ? 'rotate-y-180' : ''
                      }`}>
                        {/* Front side - Kanji */}
                        <div className="absolute w-full h-full flex items-center justify-center backface-hidden">
                          <div className="text-3xl sm:text-4xl text-black" style={{ fontWeight: 900, textShadow: '0.5px 0.5px 0px #000, -0.5px -0.5px 0px #000, 0.5px -0.5px 0px #000, -0.5px 0.5px 0px #000' }}>
                            {item.kanji}
                          </div>
                        </div>
                        
                        {/* Back side - Reading and Meaning */}
                        <div className="absolute w-full h-full flex flex-col items-center justify-center backface-hidden rotate-y-180 p-1">
                          <div className="text-xs sm:text-sm font-medium text-purple-700 mb-1">
                            {item.reading}
                          </div>
                          <div className="text-xs text-gray-700 leading-tight text-center">
                            {item.meaning}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-4">
                  <p className="text-xs text-gray-500">Master 2,000+ kanji with spaced repetition</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Everything You Need to Pass the JLPT</h2>
            <p className="text-lg sm:text-xl text-gray-600">Comprehensive tools designed for effective Japanese learning</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-purple-600">練</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Adaptive Practice</h3>
              <p className="text-gray-600 leading-relaxed">Smart algorithms adjust difficulty based on your performance, ensuring optimal learning pace</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-purple-600">進</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Progress Tracking</h3>
              <p className="text-gray-600 leading-relaxed">Detailed analytics show your strengths and areas for improvement across all JLPT skills</p>
            </div>
            
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-purple-600">習</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Mastery System</h3>
              <p className="text-gray-600 leading-relaxed">Spaced repetition ensures long-term retention of vocabulary, kanji, and grammar patterns</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-purple-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg sm:text-xl text-gray-600">Choose the plan that fits your learning journey</p>
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
                className={`relative bg-white rounded-2xl border-2 p-6 sm:p-8 text-center transition-all duration-200 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-purple-300 shadow-lg transform scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="text-white px-6 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#2a0d81' }}>
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl sm:text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-lg sm:text-xl text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center justify-center gap-3">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#2a0d81' }}></div>
                      <span className="text-gray-600 text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href="/signup"
                  className={`w-full inline-block px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg transition-all duration-200 ${
                    plan.popular
                      ? 'text-white shadow-lg hover:shadow-xl hover:opacity-90'
                      : 'bg-gray-900 text-white hover:bg-black'
                  }`}
                  style={plan.popular ? { backgroundColor: '#2a0d81' } : {}}
                >
                  {plan.price === '$0' ? 'Get Started Free' : 'Upgrade to Pro'}
                </a>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>7-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Master Japanese?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Join thousands of students achieving their JLPT goals with our proven system
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/signup"
              className="inline-block px-8 py-4 text-white text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:opacity-90" style={{ backgroundColor: '#2a0d81' }}
            >
              Start Learning Free
            </a>
            <a 
              href="/login"
              className="inline-block px-8 py-4 border-2 border-gray-600 text-gray-300 text-lg font-semibold rounded-lg hover:border-gray-500 hover:bg-gray-800 transition-all duration-200"
            >
              Sign In
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}