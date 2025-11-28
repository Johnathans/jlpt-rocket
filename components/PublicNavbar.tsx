'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Rocket, ChevronDown, Menu, X } from 'lucide-react';

export default function PublicNavbar() {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              onMouseEnter={() => setIsResourcesOpen(true)}
              onMouseLeave={() => setIsResourcesOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-pink-600 font-medium transition-colors">
                Resources
                <ChevronDown className={`h-4 w-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Mega Menu Dropdown */}
              {isResourcesOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[600px] bg-white rounded-lg shadow-xl border border-gray-200 p-6 z-50">
                  <div className="grid grid-cols-2 gap-6">
                    {/* JLPT Levels Column */}
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

                    {/* Kana Column */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                        Japanese Alphabets
                      </h3>
                      <div className="space-y-2">
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
              onMouseEnter={() => setIsToolsOpen(true)}
              onMouseLeave={() => setIsToolsOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-pink-600 font-medium transition-colors">
                Tools
                <ChevronDown className={`h-4 w-4 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Mega Menu Dropdown */}
              {isToolsOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[600px] bg-white rounded-lg shadow-xl border border-gray-200 p-6 z-50">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Practice Tools Column */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                        Practice Tools
                      </h3>
                      <div className="space-y-2">
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
              <Link
                href="/jlpt/n5/kanji"
                className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                N5 Kanji
              </Link>
              <Link
                href="/jlpt/hiragana"
                className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Hiragana
              </Link>
              <Link
                href="/jlpt/katakana"
                className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Katakana
              </Link>
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
