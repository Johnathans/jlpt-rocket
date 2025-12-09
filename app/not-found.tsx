'use client';

import Link from 'next/link';
import { Home, BookOpen, FileText, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-black bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
            404
          </h1>
          <div className="mt-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600">
              Oops! The page you're looking for doesn't exist.
            </p>
          </div>
        </div>

        {/* Helpful Links */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Here are some helpful links:
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Home */}
            <Link
              href="/"
              className="group flex items-center gap-3 p-4 bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl border border-pink-200 hover:border-pink-400 hover:shadow-md transition-all duration-200"
            >
              <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                <Home className="h-5 w-5 text-pink-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                  Home
                </div>
                <div className="text-xs text-gray-600">
                  Back to homepage
                </div>
              </div>
            </Link>

            {/* Kanji */}
            <Link
              href="/kanji"
              className="group flex items-center gap-3 p-4 bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl border border-pink-200 hover:border-pink-400 hover:shadow-md transition-all duration-200"
            >
              <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-pink-600">日</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                  Kanji
                </div>
                <div className="text-xs text-gray-600">
                  Browse all kanji
                </div>
              </div>
            </Link>

            {/* Vocabulary */}
            <Link
              href="/vocabulary"
              className="group flex items-center gap-3 p-4 bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl border border-pink-200 hover:border-pink-400 hover:shadow-md transition-all duration-200"
            >
              <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                <BookOpen className="h-5 w-5 text-pink-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                  Vocabulary
                </div>
                <div className="text-xs text-gray-600">
                  Study vocabulary
                </div>
              </div>
            </Link>

            {/* Worksheets */}
            <Link
              href="/worksheets"
              className="group flex items-center gap-3 p-4 bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl border border-pink-200 hover:border-pink-400 hover:shadow-md transition-all duration-200"
            >
              <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                <FileText className="h-5 w-5 text-pink-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                  Worksheets
                </div>
                <div className="text-xs text-gray-600">
                  Practice sheets
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Go back to previous page
        </button>

        {/* Search Suggestion */}
        <div className="mt-8 p-4 bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl border border-pink-200">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
            <Search className="h-4 w-4 text-pink-600" />
            <span>
              Try searching for what you need using the navigation menu above
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
