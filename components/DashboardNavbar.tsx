'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Target,
  Languages,
  Menu,
  RotateCcw,
  BarChart3,
  User,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ReviewSystem } from '@/lib/reviewSystem';

export default function DashboardNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Load review count on client side
  useEffect(() => {
    const updateReviewCount = () => {
      const dueItems = ReviewSystem.getItemsDueForReview();
      setReviewCount(dueItems.length);
    };

    updateReviewCount();
    
    // Listen for storage changes to update review count in real-time
    const handleStorageChange = () => {
      updateReviewCount();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isProfileMenuOpen && !target.closest('.profile-dropdown')) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen]);

  const menuItems = [
    { href: '/roadmap', label: 'Roadmap', icon: null },
    { href: '/vocabulary', label: 'Vocabulary', icon: Languages },
    { href: '/kanji', label: 'Kanji', icon: null },
    { href: '/sentences', label: 'Sentences', icon: Target },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <img 
                  src="/6110736_rocket_spaceship_icon (2).png" 
                  alt="Rocket JLPT Logo" 
                  className="h-12 w-12 flex-shrink-0"
                />
                <span className="text-2xl text-gray-900">
                  <span className="font-black">Rocket</span>
                  <span className="font-medium ml-1">JLPT</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex flex-1 justify-start">
              <div className="ml-10 flex items-center space-x-8">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`py-4 text-base font-medium transition-all duration-200 border-b-2 ${
                        isActive
                          ? 'text-blue-600 border-b-blue-600'
                          : 'text-gray-700 hover:text-gray-900 border-b-transparent hover:border-b-gray-300'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}

              </div>
            </div>

            {/* Right Side Icon Menu */}
            <div className="hidden md:flex items-center gap-2">
              {/* Progress Icon */}
              <Link
                href="/progress"
                className={`p-3 rounded-lg transition-all duration-200 ${
                  pathname === '/progress'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <BarChart3 className="h-6 w-6" />
              </Link>

              {/* Review Icon with Badge */}
              <Link
                href="/review"
                className={`relative p-3 rounded-lg transition-all duration-200 ${
                  pathname === '/review'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <RotateCcw className="h-6 w-6" />
                {reviewCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {reviewCount > 99 ? '99+' : reviewCount}
                  </span>
                )}
              </Link>

              {/* Profile Dropdown */}
              <div className="relative profile-dropdown">
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-1 p-3 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                >
                  <User className="h-6 w-6" />
                  {isProfileMenuOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                
                {/* Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <Link
                      href="/membership"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Membership
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >

                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {/* Progress Link */}
                <Link
                  href="/progress"
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/progress'
                      ? 'bg-gray-600 text-white'
                      : 'text-gray-300 hover:bg-gray-600 hover:text-white'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BarChart3 className="h-5 w-5 flex-shrink-0" />
                  <span>Progress</span>
                </Link>

                {/* Review Link with Badge */}
                <Link
                  href="/review"
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/review'
                      ? 'bg-gray-600 text-white'
                      : 'text-gray-300 hover:bg-gray-600 hover:text-white'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <RotateCcw className="h-5 w-5 flex-shrink-0" />
                  <span>Review</span>
                  {reviewCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold ml-1">
                      {reviewCount > 99 ? '99+' : reviewCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
