'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Menu, X, Rocket } from 'lucide-react';

export default function MarketingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Rocket className="h-6 w-6 text-pink-500" />
            <span className="text-2xl text-gray-900">
              <span className="font-light">Rocket</span>
              <span className="font-black ml-1">JLPT</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login"
              className="px-6 py-3 text-black hover:bg-gray-50 font-semibold transition-all duration-200 rounded-lg border-2 border-gray-200 hover:border-gray-300"
            >
              Login
            </Link>
            <Link 
              href="/signup"
              className="px-6 py-3 bg-pink-500 text-white font-semibold transition-all duration-200 rounded-lg hover:bg-pink-600 active:translate-y-0.5"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black hover:bg-gray-50 transition-colors p-2 rounded-md"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-6 space-y-4">
            <div className="px-4 space-y-3">
              <Link 
                href="/login"
                className="block w-full px-6 py-3 text-center text-black hover:bg-gray-50 font-semibold transition-all duration-200 rounded-lg border-2 border-gray-200 hover:border-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link 
                href="/signup"
                className="block w-full px-6 py-3 text-center bg-pink-500 text-white font-semibold transition-all duration-200 rounded-lg hover:bg-pink-600 active:translate-y-0.5"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
