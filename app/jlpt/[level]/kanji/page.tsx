import Link from 'next/link';
import { BookOpen, Search, GraduationCap } from 'lucide-react';
import { getKanjiByLevel } from '@/lib/supabase-data';
import PublicNavbar from '@/components/PublicNavbar';
import type { Metadata } from 'next';
import KanjiSearchClient from './KanjiSearchClient';

// Generate static params for all JLPT levels
export async function generateStaticParams() {
  return [
    { level: 'n5' },
    { level: 'n4' },
    { level: 'n3' },
    { level: 'n2' },
    { level: 'n1' },
  ];
}

// Generate metadata for each level
export async function generateMetadata({ params }: { params: { level: string } }): Promise<Metadata> {
  const level = params.level.toUpperCase();
  
  const levelCounts: Record<string, number> = {
    'N5': 80,
    'N4': 167,
    'N3': 370,
    'N2': 415,
    'N1': 1179
  };

  const count = levelCounts[level] || 0;
  const pageTitle = `JLPT ${level} Kanji - Complete List of ${count} Characters | Rocket JLPT`;
  const pageDescription = `Browse all ${count} JLPT ${level} kanji characters. Click any kanji to see detailed stroke order, readings, meanings, and vocabulary examples. Perfect for ${level} exam preparation.`;
  const pageUrl = `https://www.rocketjlpt.com/jlpt/${level.toLowerCase()}/kanji`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: `JLPT ${level} kanji, ${level} kanji list, Japanese ${level} characters, JLPT kanji study, ${level} exam preparation`,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      type: 'website',
      siteName: 'Rocket JLPT',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function KanjiLevelPage({ params }: { params: { level: string } }) {
  const level = params.level.toUpperCase();
  
  // Fetch kanji data at build time
  const kanjiList = await getKanjiByLevel(level as any);

  // Data is already fetched at build time above

  const pageUrl = `https://www.rocketjlpt.com/jlpt/${level.toLowerCase()}/kanji`;

  // Structured data for SEO
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "EducationalOccupationalProgram",
      "name": `JLPT ${level} Kanji Reference`,
      "description": `Complete list of ${kanjiList.length} kanji characters for JLPT ${level}`,
      "provider": {
        "@type": "Organization",
        "name": "Rocket JLPT",
        "url": "https://www.rocketjlpt.com"
      },
      "educationalLevel": `JLPT ${level}`,
      "inLanguage": "ja",
      "about": {
        "@type": "Thing",
        "name": "Japanese Kanji"
      },
      "url": pageUrl
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `JLPT ${level} Kanji List`,
      "description": `Complete collection of ${kanjiList.length} kanji for JLPT ${level}`,
      "numberOfItems": kanjiList.length,
      "itemListElement": kanjiList.slice(0, 10).map((kanji, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Thing",
          "name": kanji.character,
          "description": kanji.meaning,
          "url": `https://www.rocketjlpt.com/jlpt/${level.toLowerCase()}/kanji/${encodeURIComponent(kanji.character)}`
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.rocketjlpt.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": `JLPT ${level} Kanji`,
          "item": pageUrl
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:text-pink-600 transition-colors">Home</Link>
                <span>/</span>
                <span className="text-gray-900">JLPT {level} Kanji</span>
              </div>
              
              {/* Title with gradient accent */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl font-bold text-gray-900">
                    {level} Kanji
                  </h1>
                  <span className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full">
                    {kanjiList.length} characters
                  </span>
                </div>
                <p className="text-lg text-gray-600">
                  Complete reference for JLPT {level} kanji characters with meanings and readings
                </p>
              </div>

              {/* Search Bar and Practice Button - Client Component */}
              <KanjiSearchClient level={level} />
              <div className="flex items-center gap-4">
                <div className="flex-1"></div>
                <Link
                  href="/signup"
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-pink-500 hover:text-pink-600 hover:bg-pink-50 transition-all whitespace-nowrap"
                >
                  <GraduationCap className="h-5 w-5" />
                  Practice {level} Kanji
                </Link>
              </div>
            </div>

            {/* Progress Meter - Desktop Only */}
            <div className="hidden xl:flex flex-col items-center gap-4">
              <div className="relative w-44 h-44">
                {/* Background circles */}
                <svg className="w-44 h-44 transform -rotate-90">
                  {/* Background segments */}
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <circle
                      key={`bg-${i}`}
                      cx="88"
                      cy="88"
                      r="76"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="16"
                      strokeDasharray="59.69 417.83"
                      strokeDashoffset={-i * 59.69}
                      strokeLinecap="round"
                    />
                  ))}
                  {/* Progress segments - showing 30% (2.4 segments out of 8) */}
                  {[0, 1, 2].map((i) => (
                    <circle
                      key={`progress-${i}`}
                      cx="88"
                      cy="88"
                      r="76"
                      fill="none"
                      stroke={i < 2 ? "#ec4899" : "#f97316"}
                      strokeWidth="16"
                      strokeDasharray="59.69 417.83"
                      strokeDashoffset={-i * 59.69}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                  ))}
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">0%</span>
                </div>
              </div>
              <Link 
                href="/login"
                className="text-sm text-gray-600 hover:text-pink-600 transition-colors font-medium"
              >
                Login to track progress
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Kanji Grid - Static at build time */}
        <div id="kanji-grid" className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
          {kanjiList.map((kanji) => (
              <Link
                key={kanji.id}
                href={`/jlpt/${level.toLowerCase()}/kanji/${encodeURIComponent(kanji.character)}`}
                className="relative bg-white rounded-lg border border-gray-200 border-b-4 border-b-gray-300 hover:border-pink-200 hover:border-b-pink-400 hover:shadow-md transition-all duration-200 p-3 text-center group overflow-hidden"
              >
                {/* Subtle gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
                
                <div className="relative">
                  <div className="text-4xl font-bold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors font-japanese">
                    {kanji.character}
                  </div>
                  <div className="text-xs text-gray-500 mb-0.5 line-clamp-1">
                    {kanji.meaning}
                  </div>
                  <div className="text-xs text-gray-400">
                    {kanji.stroke_count}
                  </div>
                </div>
              </Link>
            ))}
        </div>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </div>

      {/* Footer CTA */}
      <div className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Start learning today
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Track your progress and master all {kanjiList.length} {level} kanji with interactive practice tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all shadow-sm"
              >
                Get Started Free
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-8 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
