'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  BookOpen, 
  Target,
  Languages,
  Menu, 
  X, 
  Crown,
  Zap,
  RotateCcw,
  BarChart3,
  ChevronDown,
  User,
  Calendar,
  Trophy,
  Flame,
  Check
} from 'lucide-react';
import { StreakSystem } from '@/lib/streakSystem';

export default function TopNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isStreakDropdownOpen, setIsStreakDropdownOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('N5');
  const [streakData, setStreakData] = useState({ currentStreak: 0, weeklyProgress: [false, false, false, false, false, false, false], isLoaded: false });
  const pathname = usePathname();
  const streakDropdownRef = useRef<HTMLDivElement>(null);

  const toggleNavbar = () => setIsOpen(!isOpen);

  // Close streak dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (streakDropdownRef.current && !streakDropdownRef.current.contains(event.target as Node)) {
        setIsStreakDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Load streak data on client side
  useEffect(() => {
    const loadStreakData = () => {
      const data = StreakSystem.getDisplayData();
      setStreakData(data);
    };

    loadStreakData();
    
    // Listen for storage changes to update streak in real-time
    const handleStorageChange = () => {
      loadStreakData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  const menuItems = [
    { href: '/stories', label: 'Stories', icon: BookOpen },
    { href: '/vocabulary', label: 'Vocabulary', icon: Languages },
    { href: '/kanji', label: 'Kanji', icon: null },
    { href: '/sentences', label: 'Sentences', icon: Target },
  ];

  const jlptLevels = ['N5', 'N4', 'N3', 'N2', 'N1'];

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Navigation Links */}
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <img 
                  src="/6110736_rocket_spaceship_icon (2).png" 
                  alt="Rocket JLPT Logo" 
                  className="h-8 w-8"
                />
                <span className="text-xl text-gray-900">
                  <span className="font-black">Rocket</span>
                  <span className="font-medium ml-1">JLPT</span>
                </span>
              </Link>
              
              {/* Navigation Links - Desktop Only */}
              <div className="hidden lg:flex items-center space-x-6">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                        isActive
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {Icon ? (
                        <Icon className="h-4 w-4" />
                      ) : (
                        <span className="text-lg font-bold font-japanese">漢</span>
                      )}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* JLPT Dropdown and Upgrade Button */}
              <div className="flex items-center space-x-4">
                {/* Streak Dropdown */}
                <div 
                  className="relative"
                  ref={streakDropdownRef}
                  onMouseEnter={() => setIsStreakDropdownOpen(true)}
                  onMouseLeave={() => setIsStreakDropdownOpen(false)}
                >
                  <div className="p-2 text-gray-600 hover:text-yellow-500 cursor-pointer transition-colors">
                    <Zap className="h-5 w-5" />
                  </div>
                  
                  {isStreakDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-6">
                      {/* Streak Header with Flame Icon */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center">
                          <Zap className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            {streakData.isLoaded ? streakData.currentStreak : '...'}
                          </div>
                          <p className="text-sm text-gray-500">day streak</p>
                        </div>
                      </div>
                      
                      {/* Weekly Progress Circles */}
                      <div>
                        <div className="flex justify-between items-center mb-2 gap-3">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => {
                            const isCompleted = streakData.isLoaded && streakData.weeklyProgress[index];
                            return (
                              <div key={index} className="flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  isCompleted
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-gray-200 text-gray-400'
                                }`}>
                                  {isCompleted && <Zap className="h-4 w-4" />}
                                </div>
                                <span className="text-xs text-gray-400 font-medium">{day}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Bar Chart Icon */}
                <Link
                  href="/progress"
                  className="p-2 text-gray-600 hover:text-gray-800 cursor-pointer transition-colors"
                >
                  <BarChart3 className="h-5 w-5" />
                </Link>
                
                {/* JLPT Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 border-b-4 border-b-gray-400 hover:bg-gray-50 hover:border-gray-400 hover:border-b-gray-500 rounded-lg shadow-sm transition-all"
                  >
                    JLPT {selectedLevel}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[120px]">
                      {jlptLevels.map((level) => (
                        <Link
                          key={level}
                          href={`/?level=${level}`}
                          onClick={() => {
                            setSelectedLevel(level);
                            setIsDropdownOpen(false);
                          }}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                        >
                          JLPT {level}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Login/Signup Buttons */}
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={toggleNavbar}
                className="text-gray-700 hover:text-gray-900 transition-colors p-2 rounded-md hover:bg-gray-100"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-2 px-4 mb-6">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
                        isActive
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {Icon ? (
                        <Icon className="h-4 w-4" />
                      ) : (
                        <span className="text-lg font-bold font-japanese">漢</span>
                      )}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile JLPT Levels */}
              <div className="mb-6 px-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  JLPT Level
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {jlptLevels.map((level) => (
                    <Link
                      key={level}
                      href={`/?level=${level}`}
                      onClick={() => setIsOpen(false)}
                      className="text-center py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors"
                    >
                      {level}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Auth Buttons */}
              <div className="px-4 space-y-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-4 py-2 text-center text-gray-700 hover:text-gray-900 font-medium transition-colors rounded-md hover:bg-gray-100 border border-gray-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-4 py-2 text-center bg-green-500 text-white hover:bg-green-600 font-medium transition-colors rounded-md shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}