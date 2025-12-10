'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Home,
  BookOpen,
  FileText,
  MessageSquare,
  ClipboardCheck,
  BookMarked,
  BarChart3,
  Settings,
  CreditCard,
  Target,
  Rocket,
  Flame,
  LogOut,
  Menu,
  Moon,
  Sun
} from 'lucide-react';
import { ReviewSystem } from '@/lib/reviewSystem';
import StreakModal from './StreakModal';
import { useAuth } from '@/lib/auth';

export default function DashboardNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  // Close settings menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isSettingsMenuOpen && !target.closest('.settings-dropdown')) {
        setIsSettingsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSettingsMenuOpen]);

  const mainNavItems: Array<{ href: string; label: string; icon: any; badge?: number }> = [
    { href: '/kanji', label: 'Kanji', icon: FileText },
    { href: '/vocabulary', label: 'Vocabulary', icon: BookOpen },
    { href: '/sentences', label: 'Sentences', icon: MessageSquare },
  ];

  const secondaryNavItems: Array<{ href: string; label: string; icon: any; badge?: number }> = [
    { href: '/stories', label: 'Stories', icon: BookMarked },
    { href: '/test', label: 'Tests', icon: ClipboardCheck },
  ];

  return (
    <>
      {/* Primary Navigation Bar - Logo and Profile */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <Rocket className="h-6 w-6 text-pink-500 flex-shrink-0" />
                <span className="text-2xl text-gray-900">
                  <span className="font-light">Rocket</span>
                  <span className="font-black ml-1">JLPT</span>
                </span>
              </Link>
            </div>

            {/* Right Side - Home, Progress+Review, Night Mode, Settings */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Home Button - Icon Only */}
              <Link
                href="/roadmap"
                className={`flex items-center justify-center p-2 transition-all rounded-lg ${
                  pathname === '/roadmap'
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-gray-50'
                }`}
                title="Home"
              >
                <Home className="h-5 w-5" />
              </Link>

              {/* Combined Progress + Review Link - Icon with Badge */}
              <Link
                href="/progress"
                className={`flex items-center gap-2 px-3 py-2 transition-all rounded-lg ${
                  pathname === '/progress' || pathname === '/review'
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-gray-50'
                }`}
                title="Progress & Review"
              >
                <BarChart3 className="h-5 w-5" />
                {reviewCount > 0 && (
                  <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                    {reviewCount > 99 ? '99+' : reviewCount}
                  </span>
                )}
              </Link>

              {/* Night Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all"
                title="Toggle night mode"
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>

              {/* Settings Dropdown */}
              <div className="relative settings-dropdown">
                <button 
                  onClick={() => setIsSettingsMenuOpen(!isSettingsMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-gray-700 hover:bg-gray-50"
                >
                  <Settings className="h-4 w-4" />
                </button>

                {/* Settings Dropdown Menu */}
                {isSettingsMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {userName && (
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{userName}</p>
                        <p className="text-xs text-gray-500 mt-1">Account settings</p>
                      </div>
                    )}
                    <Link
                      href="/membership"
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-pink-600 transition-all rounded-lg mx-2"
                      onClick={() => setIsSettingsMenuOpen(false)}
                    >
                      <CreditCard className="h-4 w-4 text-pink-500" />
                      Membership
                    </Link>
                    <button
                      onClick={() => {
                        setIsSettingsMenuOpen(false);
                        // Open level switcher modal
                        const event = new CustomEvent('open-level-switcher');
                        window.dispatchEvent(event);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-pink-600 transition-all rounded-lg mx-2"
                    >
                      <Target className="h-4 w-4 text-pink-500" />
                      JLPT Level
                    </button>
                    <hr className="my-2 mx-2 border-gray-200" />
                    <button
                      onClick={() => {
                        setIsSettingsMenuOpen(false);
                        signOut();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-700 transition-all rounded-lg mx-2"
                    >
                      <LogOut className="h-4 w-4 text-gray-500" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium text-gray-900 hover:bg-gray-50"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>

        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {/* Main Navigation */}
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                        isActive
                          ? 'bg-pink-50 text-pink-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  );
                })}

                {/* Divider */}
                <div className="h-px bg-gray-200 my-2"></div>

                {/* Secondary Navigation */}
                {secondaryNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
                        isActive
                          ? 'bg-pink-50 text-pink-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </div>
                      {item.badge && item.badge > 0 && (
                        <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                          {item.badge > 99 ? '99+' : item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}

                {/* Streak Button */}
                <button
                  onClick={() => {
                    setIsStreakModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-orange-50"
                >
                  <Flame className="h-5 w-5 text-orange-500" />
                  View Streak
                </button>
              </div>
            </div>
          )}

      {/* Streak Modal */}
      <StreakModal 
        isOpen={isStreakModalOpen} 
        onClose={() => setIsStreakModalOpen(false)} 
      />
    </>
  );
}
