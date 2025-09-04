'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Target,
  Languages,
  RotateCcw,
  BarChart3,
  User,
  ChevronDown,
  ChevronUp,
  Settings,
  CreditCard,
  FileText,
  GraduationCap,
  Rocket,
  Zap,
  X,
  LogOut,
  Menu
} from 'lucide-react';
import { ReviewSystem } from '@/lib/reviewSystem';
import StreakModal from './StreakModal';
import { useAuth } from '@/lib/auth';

export default function DashboardNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  // Get user avatar from Google OAuth
  const userAvatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0];

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
    { href: '/roadmap', label: 'Roadmap', icon: Rocket },
    { href: '/stories', label: 'Stories', icon: null },
    { href: '/vocabulary', label: 'Vocabulary', icon: Languages },
    { href: '/kanji', label: 'Kanji', icon: null },
    { href: '/sentences', label: 'Sentences', icon: Target },
    { href: '/test', label: 'Test', icon: FileText },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <Rocket className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-2xl text-gray-900">
                  <span className="font-light">Rocket</span>
                  <span className="font-black ml-1">JLPT</span>
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
                      className={`py-4 px-4 text-base font-medium transition-all duration-200 rounded-lg ${
                        isActive
                          ? 'text-black bg-green-100'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
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
              {/* Lightning Bolt Icon */}
              <button
                onClick={() => setIsStreakModalOpen(true)}
                className="flex items-center justify-center w-12 h-12 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                <Zap className="h-6 w-6 flex-shrink-0 text-yellow-500" />
              </button>
              
              {/* Progress Icon */}
              <Link
                href="/progress"
                className={`p-3 rounded-lg transition-all duration-200 ${
                  pathname === '/progress'
                    ? 'bg-green-100 text-black'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Image 
                  src="/chart-bars.png" 
                  alt="Progress" 
                  width={24} 
                  height={24} 
                  className="h-6 w-6" 
                />
              </Link>

              {/* Review Icon with Badge */}
              <Link
                href="/review"
                className={`relative p-3 rounded-lg transition-all duration-200 ${
                  pathname === '/review'
                    ? 'bg-green-100 text-black'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Image 
                  src="/rewind.png" 
                  alt="Review" 
                  width={24} 
                  height={24} 
                  className="h-6 w-6" 
                />
                {reviewCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold" style={{ backgroundColor: '#FB4141' }}>
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
                  {userAvatar ? (
                    <img 
                      src={userAvatar} 
                      alt="Profile" 
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <Image 
                      src="/user.png" 
                      alt="Profile" 
                      width={24} 
                      height={24} 
                      className="h-6 w-6" 
                    />
                  )}
                  {isProfileMenuOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                
                {/* Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-6 py-3 text-lg font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 rounded-lg mx-2"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User className="h-5 w-5 text-green-500" />
                      Profile
                    </Link>
                    <Link
                      href="/change-jlpt-level"
                      className="flex items-center gap-3 px-6 py-3 text-lg font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 rounded-lg mx-2"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <GraduationCap className="h-5 w-5 text-green-500" />
                      Change JLPT Level
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-6 py-3 text-lg font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 rounded-lg mx-2"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Settings className="h-5 w-5 text-green-500" />
                      Settings
                    </Link>
                    <Link
                      href="/membership"
                      className="flex items-center gap-3 px-6 py-3 text-lg font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 rounded-lg mx-2"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <CreditCard className="h-5 w-5 text-green-500" />
                      Membership
                    </Link>
                    <hr className="my-2 mx-2 border-gray-200" />
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        signOut();
                      }}
                      className="w-full flex items-center gap-3 px-6 py-3 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-700 transition-all duration-200 rounded-lg mx-2"
                    >
                      <LogOut className="h-5 w-5 text-gray-500" />
                      Log Out
                    </button>
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
                  <Image 
                    src="/chart-bars.png" 
                    alt="Progress" 
                    width={20} 
                    height={20} 
                    className="h-5 w-5 flex-shrink-0" 
                  />
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
                  <Image 
                    src="/rewind.png" 
                    alt="Review" 
                    width={20} 
                    height={20} 
                    className="h-5 w-5 flex-shrink-0" 
                  />
                  <span>Review</span>
                  {reviewCount > 0 && (
                    <span className="text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold ml-1" style={{ backgroundColor: '#FB4141' }}>
                      {reviewCount > 99 ? '99+' : reviewCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Streak Modal */}
      <StreakModal 
        isOpen={isStreakModalOpen} 
        onClose={() => setIsStreakModalOpen(false)} 
      />
    </>
  );
}
