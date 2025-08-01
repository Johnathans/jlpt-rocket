export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Master Japanese
                <span className="block text-green-600">Through Stories</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Learn Japanese naturally with graded reading stories. From beginner to advanced, 
                build your skills with interactive furigana and vocabulary tracking.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a 
                  href="/stories"
                  className="px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  Start Reading
                </a>
                <a 
                  href="/signup"
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 text-lg font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors text-center"
                >
                  Sign Up Free
                </a>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Free forever plan</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Visual */}
            <div className="relative">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Sample Story</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">N5</span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 font-japanese mb-2">はじめての友達</h4>
                  <p className="text-gray-600 mb-4">First Friend</p>
                </div>
                
                <div className="space-y-3 text-gray-700 font-japanese leading-relaxed">
                  <p>私の名前は田中です。</p>
                  <p>今日、学校で新しい友達に会いました。</p>
                  <p>彼女の名前は山田さんです。</p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Progress: 3/8 vocabulary known</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div className="w-1/3 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* JLPT Levels Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your JLPT Level</h2>
            <p className="text-lg text-gray-600">Start with stories matched to your current Japanese proficiency</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { level: 'N5', label: 'Beginner', color: 'green' },
              { level: 'N4', label: 'Elementary', color: 'blue' },
              { level: 'N3', label: 'Intermediate', color: 'yellow' },
              { level: 'N2', label: 'Upper-Int.', color: 'orange' },
              { level: 'N1', label: 'Advanced', color: 'red' }
            ].map((item) => (
              <a
                key={item.level}
                href={`/stories?level=${item.level}`}
                className="group p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all text-center"
              >
                <div className={`text-3xl font-bold mb-2 text-${item.color}-600 group-hover:text-${item.color}-700`}>
                  {item.level}
                </div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold font-japanese text-green-600">読</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Reading</h3>
              <p className="text-gray-600">Click any word to see furigana pronunciation guides and meanings</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold font-japanese text-blue-600">語</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Vocabulary Tracking</h3>
              <p className="text-gray-600">Track your progress and review words you've learned</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold font-japanese text-purple-600">習</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Graded Content</h3>
              <p className="text-gray-600">Stories designed specifically for each JLPT level</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Japanese Journey?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of learners improving their Japanese through stories
          </p>
          <a 
            href="/signup"
            className="inline-block px-8 py-4 bg-white text-green-600 text-lg font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Get Started Free
          </a>
        </div>
      </section>
    </div>
  );
}