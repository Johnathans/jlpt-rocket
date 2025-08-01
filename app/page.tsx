export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Study Smarter.
                <span className="block">Pass Faster.</span>
                <span className="block text-blue-600">Your JLPT Journey</span>
                <span className="block text-blue-600">Starts Here</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Master Japanese faster with personalized learning paths, real-time feedback, and adaptive practice sessions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a 
                  href="/signup"
                  className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg border-b-4 border-b-blue-700 hover:bg-blue-700 hover:border-b-blue-800 transition-all duration-200 active:translate-y-0.5 text-center"
                >
                  Start Learning Free
                </a>
                <a 
                  href="/login"
                  className="px-8 py-4 border-2 border-gray-300 border-b-4 border-b-gray-400 text-gray-700 text-lg font-semibold rounded-lg hover:border-gray-400 hover:border-b-gray-500 hover:bg-gray-50 transition-all duration-200 active:translate-y-0.5 text-center"
                >
                  Sign In
                </a>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>7-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Kanji Grid */}
            <div className="relative">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { kanji: '日', reading: 'にち' },
                    { kanji: '月', reading: 'げつ' },
                    { kanji: '火', reading: 'か' },
                    { kanji: '水', reading: 'すい' },
                    { kanji: '木', reading: 'もく', highlight: true },
                    { kanji: '金', reading: 'きん' },
                    { kanji: '土', reading: 'ど' },
                    { kanji: '人', reading: 'じん' },
                    { kanji: '子', reading: 'こ' },
                    { kanji: '学', reading: 'がく' },
                    { kanji: '生', reading: 'せい' },
                    { kanji: '先', reading: 'せん' },
                    { kanji: '大', reading: 'だい' },
                    { kanji: '小', reading: 'しょう' },
                    { kanji: '上', reading: 'じょう' },
                    { kanji: '下', reading: 'か' }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-center transition-all duration-200 hover:scale-105 ${
                        item.highlight 
                          ? 'bg-blue-100 border-blue-300 shadow-md' 
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`text-2xl font-bold mb-1 ${
                        item.highlight ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {item.kanji}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.reading}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Accelerate your JLPT preparation with our proven learning system</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { 
                duration: '4 Months', 
                price: '$29', 
                period: '/month',
                total: '$116 total',
                popular: false,
                features: ['All JLPT levels', 'Progress tracking', 'Mobile access', 'Email support']
              },
              { 
                duration: '1 Year', 
                price: '$19', 
                period: '/month',
                total: '$228 total',
                popular: true,
                features: ['All JLPT levels', 'Progress tracking', 'Mobile access', 'Priority support', 'Study analytics']
              },
              { 
                duration: '3 Years', 
                price: '$12', 
                period: '/month',
                total: '$432 total',
                popular: false,
                features: ['All JLPT levels', 'Progress tracking', 'Mobile access', 'Priority support', 'Study analytics', 'Lifetime updates']
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl border-2 p-8 text-center transition-all duration-200 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-blue-300 shadow-lg scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.duration}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-xl text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-500">{plan.total}</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center justify-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href="/signup"
                  className={`w-full inline-block px-8 py-4 text-lg font-semibold rounded-lg border-b-4 transition-all duration-200 active:translate-y-0.5 ${
                    plan.popular
                      ? 'bg-blue-600 text-white border-b-blue-700 hover:bg-blue-700 hover:border-b-blue-800'
                      : 'bg-white text-gray-700 border-2 border-gray-300 border-b-gray-400 hover:border-gray-400 hover:border-b-gray-500 hover:bg-gray-50'
                  }`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">All plans include a 7-day free trial</p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Pass the JLPT</h2>
            <p className="text-xl text-gray-600">Comprehensive tools designed for effective Japanese learning</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">練</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Adaptive Practice</h3>
              <p className="text-gray-600 leading-relaxed">Smart algorithms adjust difficulty based on your performance, ensuring optimal learning pace</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">進</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Progress Tracking</h3>
              <p className="text-gray-600 leading-relaxed">Detailed analytics show your strengths and areas for improvement across all JLPT skills</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">習</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Mastery System</h3>
              <p className="text-gray-600 leading-relaxed">Spaced repetition ensures long-term retention of vocabulary, kanji, and grammar patterns</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Ace Your JLPT?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who've passed their JLPT with our proven system
          </p>
          <a 
            href="/signup"
            className="inline-block px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg border-b-4 border-b-gray-300 hover:bg-gray-50 hover:border-b-gray-400 transition-all duration-200 active:translate-y-0.5"
          >
            Start Your Free Trial
          </a>
        </div>
      </section>
    </div>
  );
}