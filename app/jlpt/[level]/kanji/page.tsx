'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BookOpen, Search } from 'lucide-react';
import { getKanjiByLevel } from '@/lib/supabase-data';
import PublicNavbar from '@/components/PublicNavbar';

interface KanjiItem {
  id: string;
  character: string;
  meaning: string;
  onyomi: string;
  kunyomi: string;
  strokes: number;
  level: string;
}

export default function KanjiLevelPage() {
  const params = useParams();
  const level = (params.level as string).toUpperCase();
  const [kanjiList, setKanjiList] = useState<KanjiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchKanji = async () => {
      try {
        setLoading(true);
        const data = await getKanjiByLevel(level as any);
        setKanjiList(data as any);
      } catch (error) {
        console.error('Error fetching kanji:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKanji();
  }, [level]);

  const filteredKanji = kanjiList.filter(k => 
    k.character.includes(searchTerm) ||
    k.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const levelInfo = {
    N5: { title: 'JLPT N5 Kanji', description: 'Basic kanji for everyday situations', count: '~80 kanji' },
    N4: { title: 'JLPT N4 Kanji', description: 'Elementary kanji for daily communication', count: '~170 kanji' },
    N3: { title: 'JLPT N3 Kanji', description: 'Intermediate kanji for work and social situations', count: '~370 kanji' },
    N2: { title: 'JLPT N2 Kanji', description: 'Advanced kanji for professional use', count: '~370 kanji' },
    N1: { title: 'JLPT N1 Kanji', description: 'Near-native kanji proficiency', count: '~1,200 kanji' },
  };

  const info = levelInfo[level as keyof typeof levelInfo];

  // SEO metadata
  const pageTitle = `JLPT ${level} Kanji List - Complete Reference | Rocket JLPT`;
  const pageDescription = `Complete list of ${filteredKanji.length || info?.count} kanji characters for JLPT ${level}. Learn Japanese kanji with meanings, readings, and stroke counts.`;
  const pageUrl = `https://rocketjlpt.com/jlpt/${level.toLowerCase()}/kanji`;

  // Structured data for SEO
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "EducationalOccupationalProgram",
      "name": `JLPT ${level} Kanji Reference`,
      "description": pageDescription,
      "provider": {
        "@type": "Organization",
        "name": "Rocket JLPT",
        "url": "https://rocketjlpt.com"
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
      "description": `Complete collection of ${filteredKanji.length || info?.count} kanji for JLPT ${level}`,
      "numberOfItems": filteredKanji.length,
      "itemListElement": filteredKanji.slice(0, 10).map((kanji, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Thing",
          "name": kanji.character,
          "description": kanji.meaning,
          "url": `https://rocketjlpt.com/jlpt/${level.toLowerCase()}/kanji/${encodeURIComponent(kanji.character)}`
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
          "item": "https://rocketjlpt.com"
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

  useEffect(() => {
    // Set document title and meta tags
    document.title = pageTitle;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updateOGTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', pageDescription);
    updateMetaTag('keywords', `JLPT ${level}, Japanese kanji, ${level} kanji list, kanji meanings, kanji readings, Japanese learning, JLPT study`);
    updateOGTag('og:title', pageTitle);
    updateOGTag('og:description', pageDescription);
    updateOGTag('og:url', pageUrl);
    updateOGTag('og:type', 'website');
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', pageTitle);
    updateMetaTag('twitter:description', pageDescription);

    // Add canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = pageUrl;

    // Add structured data (remove old one first)
    const oldScripts = document.querySelectorAll('script[type="application/ld+json"]');
    oldScripts.forEach(s => s.remove());
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, [level, filteredKanji.length]);

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
                    {filteredKanji.length} characters
                  </span>
                </div>
                <p className="text-lg text-gray-600">
                  Complete reference for JLPT {level} kanji characters with meanings and readings
                </p>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-lg">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by character or meaning..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-shadow"
                  />
                </div>
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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading kanji...</p>
          </div>
        )}

        {/* Kanji Grid */}
        {!loading && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
            {filteredKanji.map((kanji) => (
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
                    {kanji.strokes}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredKanji.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No kanji found</p>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Start learning today
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Track your progress and master all {filteredKanji.length} {level} kanji with interactive practice tools.
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
