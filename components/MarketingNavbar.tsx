'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Menu, X, Rocket } from 'lucide-react';

export default function MarketingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 shadow-sm" style={{ backgroundColor: '#2a0d81' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Rocket className="h-6 w-6 text-white" />
            <span className="text-2xl text-white">
              <span className="font-light">Rocket</span>
              <span className="font-black ml-1">JLPT</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login"
              className="px-6 py-3 text-white hover:opacity-80 font-semibold transition-all duration-200 rounded-lg border-2 border-white/20 border-b-4 border-b-white/30 hover:border-white/30 hover:border-b-white/40 hover:bg-white/10 active:translate-y-0.5"
            >
              Login
            </Link>
            <Link 
              href="/signup"
              className="px-6 py-3 bg-white text-white font-semibold transition-all duration-200 rounded-lg border-b-4 border-b-gray-200 hover:bg-gray-100 active:translate-y-0.5" style={{ color: '#2a0d81' }}
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:opacity-80 transition-colors p-2 rounded-md hover:bg-white/10"
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
                className="block w-full px-6 py-3 text-center text-white hover:opacity-80 font-semibold transition-all duration-200 rounded-lg border-2 border-white/20 border-b-4 border-b-white/30 hover:border-white/30 hover:border-b-white/40 hover:bg-white/10 active:translate-y-0.5"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link 
                href="/signup"
                className="block w-full px-6 py-3 text-center bg-white font-semibold transition-all duration-200 rounded-lg border-b-4 border-b-gray-200 hover:bg-gray-100 active:translate-y-0.5" style={{ color: '#2a0d81' }}
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
