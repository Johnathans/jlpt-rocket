'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Rocket, ChevronDown, Menu, X } from 'lucide-react';

export default function PublicNavbar() {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const resourcesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const toolsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleResourcesEnter = () => {
    // Clear both timeouts to prevent overlap
    if (resourcesTimeoutRef.current) {
      clearTimeout(resourcesTimeoutRef.current);
    }
    if (toolsTimeoutRef.current) {
      clearTimeout(toolsTimeoutRef.current);
    }
    // Close tools immediately and open resources
    setIsToolsOpen(false);
    setIsResourcesOpen(true);
  };

  const handleResourcesLeave = () => {
    resourcesTimeoutRef.current = setTimeout(() => {
      setIsResourcesOpen(false);
    }, 200);
  };

  const handleToolsEnter = () => {
    // Clear both timeouts to prevent overlap
    if (toolsTimeoutRef.current) {
      clearTimeout(toolsTimeoutRef.current);
    }
    if (resourcesTimeoutRef.current) {
      clearTimeout(resourcesTimeoutRef.current);
    }
    // Close resources immediately and open tools
    setIsResourcesOpen(false);
    setIsToolsOpen(true);
  };

  const handleToolsLeave = () => {
    toolsTimeoutRef.current = setTimeout(() => {
      setIsToolsOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (resourcesTimeoutRef.current) clearTimeout(resourcesTimeoutRef.current);
      if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
    };
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Rocket className="h-6 w-6 text-pink-500" />
            <span className="text-2xl text-gray-900">
              <span className="font-light">Rocket</span>
              <span className="font-black ml-1">JLPT</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            {/* Resources Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={handleResourcesEnter}
              onMouseLeave={handleResourcesLeave}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-pink-600 font-medium transition-colors">
                Resources
                <ChevronDown className={`h-4 w-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Mega Menu Dropdown */}
              {isResourcesOpen && (
                <div className="absolute top-full right-0 mt-2 w-[1000px] max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-xl border border-gray-200 p-6 z-50">
                  <div className="grid grid-cols-4 gap-6">
                    {/* JLPT Kanji Column */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                        JLPT Kanji
                      </h3>
                      <div className="space-y-2">
                        <Link
                          href="/jlpt/n5/kanji"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">N5 Kanji</div>
                          <div className="text-xs text-gray-500">~80 basic characters</div>
                        </Link>
                        <Link
                          href="/jlpt/n4/kanji"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">N4 Kanji</div>
                          <div className="text-xs text-gray-500">~170 elementary characters</div>
                        </Link>
                        <Link
                          href="/jlpt/n3/kanji"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">N3 Kanji</div>
                          <div className="text-xs text-gray-500">~370 intermediate characters</div>
                        </Link>
                        <Link
                          href="/jlpt/n2/kanji"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">N2 Kanji</div>
                          <div className="text-xs text-gray-500">~370 advanced characters</div>
                        </Link>
                        <Link
                          href="/jlpt/n1/kanji"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">N1 Kanji</div>
                          <div className="text-xs text-gray-500">~1,200 expert characters</div>
                        </Link>
                      </div>
                    </div>

                    {/* JLPT Vocabulary Column */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                        JLPT Vocabulary
                      </h3>
                      <div className="space-y-2">
                        <Link
                          href="/jlpt/n5/vocabulary"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">N5 Vocabulary</div>
                          <div className="text-xs text-gray-500">~680 basic words</div>
                        </Link>
                        <Link
                          href="/jlpt/n4/vocabulary"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">N4 Vocabulary</div>
                          <div className="text-xs text-gray-500">~640 elementary words</div>
                        </Link>
                        <Link
                          href="/jlpt/n3/vocabulary"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">N3 Vocabulary</div>
                          <div className="text-xs text-gray-500">~1,700 intermediate words</div>
                        </Link>
                        <Link
                          href="/jlpt/n2/vocabulary"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">N2 Vocabulary</div>
                          <div className="text-xs text-gray-500">~1,800 advanced words</div>
                        </Link>
                        <Link
                          href="/jlpt/n1/vocabulary"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">N1 Vocabulary</div>
                          <div className="text-xs text-gray-500">~3,400 expert words</div>
                        </Link>
                      </div>
                    </div>

                    {/* JLPT Grammar Column */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                        JLPT Grammar
                      </h3>
                      <div className="space-y-2">
                        <Link
                          href="/jlpt/n5/grammar"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">N5 Grammar</div>
                          <div className="text-xs text-gray-500">40 basic patterns</div>
                        </Link>
                        <Link
                          href="/jlpt/n4/grammar"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">N4 Grammar</div>
                          <div className="text-xs text-gray-500">50 elementary patterns</div>
                        </Link>
                        <Link
                          href="/jlpt/n3/grammar"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">N3 Grammar</div>
                          <div className="text-xs text-gray-500">63 intermediate patterns</div>
                        </Link>
                        <Link
                          href="/jlpt/n2/grammar"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">N2 Grammar</div>
                          <div className="text-xs text-gray-500">63 advanced patterns</div>
                        </Link>
                        <Link
                          href="/jlpt/n1/grammar"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">N1 Grammar</div>
                          <div className="text-xs text-gray-500">70 expert patterns</div>
                        </Link>
                      </div>
                    </div>

                    {/* Kana & Schools Column */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                        Japanese Alphabets
                      </h3>
                      <div className="space-y-2 mb-6">
                        <Link
                          href="/jlpt/hiragana"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">Hiragana</div>
                          <div className="text-xs text-gray-500">104 characters with audio</div>
                        </Link>
                        <Link
                          href="/jlpt/katakana"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">Katakana</div>
                          <div className="text-xs text-gray-500">104 characters with audio</div>
                        </Link>
                      </div>

                      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                        Study in Japan
                      </h3>
                      <div className="space-y-2">
                        <Link
                          href="/schools"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">Language Schools</div>
                          <div className="text-xs text-gray-500">Find JLPT schools in Japan</div>
                        </Link>
                      </div>

                      {/* CTA Box */}
                      <div className="mt-6 p-4 bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg border border-pink-100">
                        <p className="text-sm text-gray-700 mb-3">
                          Ready to start learning?
                        </p>
                        <Link
                          href="/signup"
                          className="block text-center px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-sm font-semibold rounded-md hover:from-pink-600 hover:to-orange-600 transition-all"
                        >
                          Get Started Free
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tools Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={handleToolsEnter}
              onMouseLeave={handleToolsLeave}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-pink-600 font-medium transition-colors">
                Tools
                <ChevronDown className={`h-4 w-4 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Mega Menu Dropdown */}
              {isToolsOpen && (
                <div className="absolute top-full right-0 mt-2 w-[800px] max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-xl border border-gray-200 p-6 z-50">
                  <div className="grid grid-cols-3 gap-6">
                    {/* Practice Tools Column */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                        Practice Tools
                      </h3>
                      <div className="space-y-2">
                        <Link
                          href="/tools/counters"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">Counter Practice</div>
                          <div className="text-xs text-gray-500">Master Japanese counters</div>
                        </Link>
                        <Link
                          href="/tools/time"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">Time Practice</div>
                          <div className="text-xs text-gray-500">Learn to tell time in Japanese</div>
                        </Link>
                        <Link
                          href="/tools/location"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">Location & Direction</div>
                          <div className="text-xs text-gray-500">Master こそあど and position words</div>
                        </Link>
                        <Link
                          href="/signup"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">Flashcards</div>
                          <div className="text-xs text-gray-500">Study with spaced repetition</div>
                        </Link>
                        <Link
                          href="/signup"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">Multiple Choice</div>
                          <div className="text-xs text-gray-500">Test your knowledge</div>
                        </Link>
                        <Link
                          href="/signup"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">Writing Practice</div>
                          <div className="text-xs text-gray-500">Practice kanji writing</div>
                        </Link>
                        <Link
                          href="/signup"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">Reading Stories</div>
                          <div className="text-xs text-gray-500">Graded reading practice</div>
                        </Link>
                      </div>
                    </div>

                    {/* How to Pass JLPT Column */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                        How to Pass JLPT
                      </h3>
                      <div className="space-y-2">
                        <Link
                          href="/how-to-pass/n5"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">Pass N5</div>
                          <div className="text-xs text-gray-500">Beginner guide</div>
                        </Link>
                        <Link
                          href="/how-to-pass/n4"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">Pass N4</div>
                          <div className="text-xs text-gray-500">Elementary guide</div>
                        </Link>
                        <Link
                          href="/how-to-pass/n3"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">Pass N3</div>
                          <div className="text-xs text-gray-500">Intermediate guide</div>
                        </Link>
                        <Link
                          href="/how-to-pass/n2"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">Pass N2</div>
                          <div className="text-xs text-gray-500">Advanced guide</div>
                        </Link>
                        <Link
                          href="/how-to-pass/n1"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">Pass N1</div>
                          <div className="text-xs text-gray-500">Expert guide</div>
                        </Link>
                      </div>
                    </div>

                    {/* Study Features Column */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                        Study Features
                      </h3>
                      <div className="space-y-2">
                        <Link
                          href="/signup"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">Progress Tracking</div>
                          <div className="text-xs text-gray-500">Monitor your learning</div>
                        </Link>
                        <Link
                          href="/signup"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">Study Roadmap</div>
                          <div className="text-xs text-gray-500">Personalized study plan</div>
                        </Link>
                        <Link
                          href="/signup"
                          className="block px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                        >
                          <div className="font-medium">Practice Tests</div>
                          <div className="text-xs text-gray-500">Full JLPT simulations</div>
                        </Link>
                      </div>

                      {/* CTA Box */}
                      <div className="mt-6 p-4 bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg border border-pink-100">
                        <p className="text-sm text-gray-700 mb-3">
                          Access all study tools
                        </p>
                        <Link
                          href="/signup"
                          className="block text-center px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-sm font-semibold rounded-md hover:from-pink-600 hover:to-orange-600 transition-all"
                        >
                          Sign Up Free
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/login" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
              Sign In
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 font-medium transition-colors">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-pink-600 p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {/* Resources Section */}
              <button
                onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-medium"
              >
                Resources
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileResourcesOpen && (
                <div className="bg-gray-50 py-3 px-4">
                  {/* JLPT Kanji - Grid Layout */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">JLPT Kanji</div>
                    <div className="grid grid-cols-5 gap-2">
                      <Link href="/jlpt/n5/kanji" className="text-center py-2 px-1 bg-white rounded text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600" onClick={() => setIsMobileMenuOpen(false)}>N5</Link>
                      <Link href="/jlpt/n4/kanji" className="text-center py-2 px-1 bg-white rounded text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600" onClick={() => setIsMobileMenuOpen(false)}>N4</Link>
                      <Link href="/jlpt/n3/kanji" className="text-center py-2 px-1 bg-white rounded text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600" onClick={() => setIsMobileMenuOpen(false)}>N3</Link>
                      <Link href="/jlpt/n2/kanji" className="text-center py-2 px-1 bg-white rounded text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600" onClick={() => setIsMobileMenuOpen(false)}>N2</Link>
                      <Link href="/jlpt/n1/kanji" className="text-center py-2 px-1 bg-white rounded text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600" onClick={() => setIsMobileMenuOpen(false)}>N1</Link>
                    </div>
                  </div>
                  
                  {/* JLPT Vocabulary - Grid Layout */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">JLPT Vocabulary</div>
                    <div className="grid grid-cols-5 gap-2">
                      <Link href="/jlpt/n5/vocabulary" className="text-center py-2 px-1 bg-white rounded text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600" onClick={() => setIsMobileMenuOpen(false)}>N5</Link>
                      <Link href="/jlpt/n4/vocabulary" className="text-center py-2 px-1 bg-white rounded text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600" onClick={() => setIsMobileMenuOpen(false)}>N4</Link>
                      <Link href="/jlpt/n3/vocabulary" className="text-center py-2 px-1 bg-white rounded text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600" onClick={() => setIsMobileMenuOpen(false)}>N3</Link>
                      <Link href="/jlpt/n2/vocabulary" className="text-center py-2 px-1 bg-white rounded text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600" onClick={() => setIsMobileMenuOpen(false)}>N2</Link>
                      <Link href="/jlpt/n1/vocabulary" className="text-center py-2 px-1 bg-white rounded text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600" onClick={() => setIsMobileMenuOpen(false)}>N1</Link>
                    </div>
                  </div>
                  
                  {/* JLPT Grammar - Grid Layout */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">JLPT Grammar</div>
                    <div className="grid grid-cols-5 gap-2">
                      <Link href="/jlpt/n5/grammar" className="text-center py-2 px-1 bg-white rounded text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600" onClick={() => setIsMobileMenuOpen(false)}>N5</Link>
                      <Link href="/jlpt/n4/grammar" className="text-center py-2 px-1 bg-white rounded text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600" onClick={() => setIsMobileMenuOpen(false)}>N4</Link>
                      <Link href="/jlpt/n3/grammar" className="text-center py-2 px-1 bg-white rounded text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600" onClick={() => setIsMobileMenuOpen(false)}>N3</Link>
                      <Link href="/jlpt/n2/grammar" className="text-center py-2 px-1 bg-white rounded text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600" onClick={() => setIsMobileMenuOpen(false)}>N2</Link>
                      <Link href="/jlpt/n1/grammar" className="text-center py-2 px-1 bg-white rounded text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600" onClick={() => setIsMobileMenuOpen(false)}>N1</Link>
                    </div>
                  </div>
                  
                  {/* Other Resources - 2 Column Grid */}
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">More Resources</div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link href="/jlpt/hiragana" className="py-2 px-3 bg-white rounded text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600" onClick={() => setIsMobileMenuOpen(false)}>Hiragana</Link>
                      <Link href="/jlpt/katakana" className="py-2 px-3 bg-white rounded text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600" onClick={() => setIsMobileMenuOpen(false)}>Katakana</Link>
                      <Link href="/schools" className="py-2 px-3 bg-white rounded text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 col-span-2" onClick={() => setIsMobileMenuOpen(false)}>Language Schools</Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Tools Section */}
              <button
                onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-medium"
              >
                Tools
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileToolsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileToolsOpen && (
                <div className="bg-gray-50 py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Practice Tools</div>
                  <Link href="/tools/counters" className="block px-6 py-2 text-sm text-gray-700 hover:bg-pink-50" onClick={() => setIsMobileMenuOpen(false)}>Counter Practice</Link>
                  <Link href="/tools/time" className="block px-6 py-2 text-sm text-gray-700 hover:bg-pink-50" onClick={() => setIsMobileMenuOpen(false)}>Time Practice</Link>
                  <Link href="/tools/location" className="block px-6 py-2 text-sm text-gray-700 hover:bg-pink-50" onClick={() => setIsMobileMenuOpen(false)}>Location & Direction</Link>
                  <Link href="/signup" className="block px-6 py-2 text-sm text-gray-700 hover:bg-pink-50" onClick={() => setIsMobileMenuOpen(false)}>Flashcards</Link>
                  <Link href="/signup" className="block px-6 py-2 text-sm text-gray-700 hover:bg-pink-50" onClick={() => setIsMobileMenuOpen(false)}>Multiple Choice</Link>
                  <Link href="/signup" className="block px-6 py-2 text-sm text-gray-700 hover:bg-pink-50" onClick={() => setIsMobileMenuOpen(false)}>Writing Practice</Link>
                  <Link href="/signup" className="block px-6 py-2 text-sm text-gray-700 hover:bg-pink-50" onClick={() => setIsMobileMenuOpen(false)}>Reading Stories</Link>
                  
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase mt-3">How to Pass JLPT</div>
                  <Link href="/how-to-pass/n5" className="block px-6 py-2 text-sm text-gray-700 hover:bg-pink-50" onClick={() => setIsMobileMenuOpen(false)}>Pass N5</Link>
                  <Link href="/how-to-pass/n4" className="block px-6 py-2 text-sm text-gray-700 hover:bg-pink-50" onClick={() => setIsMobileMenuOpen(false)}>Pass N4</Link>
                  <Link href="/how-to-pass/n3" className="block px-6 py-2 text-sm text-gray-700 hover:bg-pink-50" onClick={() => setIsMobileMenuOpen(false)}>Pass N3</Link>
                  <Link href="/how-to-pass/n2" className="block px-6 py-2 text-sm text-gray-700 hover:bg-pink-50" onClick={() => setIsMobileMenuOpen(false)}>Pass N2</Link>
                  <Link href="/how-to-pass/n1" className="block px-6 py-2 text-sm text-gray-700 hover:bg-pink-50" onClick={() => setIsMobileMenuOpen(false)}>Pass N1</Link>
                  
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase mt-3">Study Features</div>
                  <Link href="/signup" className="block px-6 py-2 text-sm text-gray-700 hover:bg-pink-50" onClick={() => setIsMobileMenuOpen(false)}>Progress Tracking</Link>
                  <Link href="/signup" className="block px-6 py-2 text-sm text-gray-700 hover:bg-pink-50" onClick={() => setIsMobileMenuOpen(false)}>Study Roadmap</Link>
                  <Link href="/signup" className="block px-6 py-2 text-sm text-gray-700 hover:bg-pink-50" onClick={() => setIsMobileMenuOpen(false)}>Practice Tests</Link>
                </div>
              )}

              <div className="border-t border-gray-200 my-2"></div>
              <Link
                href="/login"
                className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="block mx-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
