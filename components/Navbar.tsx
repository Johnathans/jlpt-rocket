'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Rocket } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-green-500 rounded-lg">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl text-gray-900">
              <span className="font-black">Rocket</span>
              <span className="font-medium ml-1">JLPT</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/stories" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
            >
              Stories
            </Link>
            <Link 
              href="/sentences" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
            >
              Sentences
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
            >
              About
            </Link>
            <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors rounded-md hover:bg-gray-100">
              Login
            </button>
            <button className="px-6 py-2 bg-green-500 text-white hover:bg-green-600 font-medium transition-colors rounded-md shadow-sm">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900 transition-colors p-2 rounded-md hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link 
              href="/stories" 
              className="block px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-gray-50 font-medium transition-colors rounded-md mx-2"
              onClick={() => setIsOpen(false)}
            >
              Stories
            </Link>
            <Link 
              href="/sentences" 
              className="block px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-gray-50 font-medium transition-colors rounded-md mx-2"
              onClick={() => setIsOpen(false)}
            >
              Sentences
            </Link>
            <Link 
              href="/about" 
              className="block px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-gray-50 font-medium transition-colors rounded-md mx-2"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <div className="px-6 pt-4 space-y-3">
              <button className="w-full px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors rounded-md hover:bg-gray-100 border border-gray-200">
                Login
              </button>
              <button className="w-full px-4 py-2 bg-green-500 text-white hover:bg-green-600 font-medium transition-colors rounded-md shadow-sm">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}