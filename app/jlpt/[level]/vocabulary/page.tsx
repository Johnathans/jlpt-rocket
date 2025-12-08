'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { BookOpen, Search, Volume2, GraduationCap } from 'lucide-react';
import { getVocabularyByLevel } from '@/lib/supabase-data';
import PublicNavbar from '@/components/PublicNavbar';

interface VocabularyItem {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  part_of_speech: string;
  jlpt_level: string;
  frequency_rank: number;
  kanji_used: string[];
  example_sentence: string;
  example_translation: string;
  created_at: string;
  updated_at: string;
}

const levelInfo = {
  n5: { name: 'N5', count: 684, description: 'basic', difficulty: 'Beginner' },
  n4: { name: 'N4', count: 640, description: 'elementary', difficulty: 'Elementary' },
  n3: { name: 'N3', count: 1717, description: 'intermediate', difficulty: 'Intermediate' },
  n2: { name: 'N2', count: 1777, description: 'advanced', difficulty: 'Advanced' },
  n1: { name: 'N1', count: 3427, description: 'expert', difficulty: 'Expert' },
};

export default function VocabularyLevelPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const level = (params.level as string).toLowerCase();
  const levelData = levelInfo[level as keyof typeof levelInfo];
  
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  // Update page metadata for SEO
  useEffect(() => {
    if (!levelData) return;

    const pageTitle = `JLPT ${levelData.name} Vocabulary - ${levelData.count}+ Essential Japanese Words | Rocket JLPT`;
    const pageDescription = `Master all ${levelData.count}+ JLPT ${levelData.name} vocabulary words with readings, meanings, and example sentences. ${levelData.difficulty} level Japanese vocabulary for exam success.`;
    const pageUrl = `https://www.rocketjlpt.com/jlpt/${level}/vocabulary`;

    document.title = pageTitle;

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
    updateMetaTag('keywords', `JLPT ${levelData.name} vocabulary, ${levelData.name} words, Japanese vocabulary list, JLPT ${levelData.name} study, ${levelData.difficulty} Japanese`);

    updateOGTag('og:title', pageTitle);
    updateOGTag('og:description', pageDescription);
    updateOGTag('og:url', pageUrl);
    updateOGTag('og:type', 'website');
    updateOGTag('og:site_name', 'Rocket JLPT');

    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', pageTitle);
    updateMetaTag('twitter:description', pageDescription);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = pageUrl;
  }, [level, levelData]);

  // Sync currentPage with URL on mount
  useEffect(() => {
    const page = searchParams.get('page');
    if (page) {
      setCurrentPage(parseInt(page, 10));
    }
  }, [searchParams]);

  useEffect(() => {
    if (!levelData) return;

    // Set page title and meta tags (optimized for SEO - under 60 chars)
    document.title = `${levelData.name} Vocabulary - ${levelData.count} Words | Rocket JLPT`;
    
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', `Complete JLPT ${levelData.name} vocabulary list: ${levelData.count} ${levelData.description} Japanese words with readings, meanings, and audio. Master ${levelData.difficulty.toLowerCase()} vocabulary for the JLPT exam.`);
    updateMetaTag('keywords', `jlpt ${level} vocabulary, ${level} words, japanese vocabulary ${levelData.description}, jlpt ${level} word list, ${level} vocab`);

    // Add structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
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
              "name": `JLPT ${levelData.name}`,
              "item": `https://www.rocketjlpt.com/jlpt/${level}`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": `${levelData.name} Vocabulary`,
              "item": `https://www.rocketjlpt.com/jlpt/${level}/vocabulary`
            }
          ]
        },
        {
          "@type": "ItemList",
          "name": `JLPT ${levelData.name} Vocabulary List`,
          "description": `Complete list of ${levelData.count} ${levelData.description} Japanese vocabulary words for JLPT ${levelData.name}`,
          "numberOfItems": levelData.count,
          "itemListElement": {
            "@type": "ListItem",
            "name": `${levelData.name} Vocabulary Words`
          }
        }
      ]
    });
    document.head.appendChild(script);

    async function loadVocabulary() {
      try {
        // Try to get from localStorage first (client-side cache)
        const cacheKey = `vocabulary_${levelData.name}_cache`;
        const cachedData = localStorage.getItem(cacheKey);
        const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
        
        // Cache for 1 hour
        const CACHE_DURATION = 1000 * 60 * 60;
        const isCacheValid = cacheTimestamp && (Date.now() - parseInt(cacheTimestamp)) < CACHE_DURATION;
        
        if (cachedData && isCacheValid) {
          console.log(`Using cached vocabulary for level ${levelData.name}`);
          setVocabulary(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
        
        // Fetch from server
        const data = await getVocabularyByLevel(levelData.name.toUpperCase() as any);
        console.log(`Fetched ${data.length} vocabulary words for level ${levelData.name}`);
        setVocabulary(data);
        
        // Store in localStorage
        try {
          localStorage.setItem(cacheKey, JSON.stringify(data));
          localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
        } catch (e) {
          console.warn('Failed to cache data in localStorage:', e);
        }
      } catch (error) {
        console.error('Error loading vocabulary:', error);
      } finally {
        setLoading(false);
      }
    }
    loadVocabulary();

    return () => {
      document.head.removeChild(script);
    };
  }, [level, levelData]);

  // Filter vocabulary based on search
  const filteredVocabulary = vocabulary.filter(item =>
    item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.reading.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.meaning.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredVocabulary.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVocabulary = filteredVocabulary.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!levelData) {
    return <div>Invalid level</div>;
  }

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
                <Link href={`/jlpt/${level}/kanji`} className="hover:text-pink-600 transition-colors">JLPT {levelData.name}</Link>
                <span>/</span>
                <span className="text-gray-900">Vocabulary</span>
              </div>
              
              {/* Title with gradient accent */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl font-bold text-gray-900">
                    {levelData.name} Vocabulary
                  </h1>
                  <span className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full">
                    {vocabulary.length} words
                  </span>
                </div>
                <p className="text-lg text-gray-600">
                  Complete list of essential {levelData.description} vocabulary for JLPT {levelData.name}
                </p>
              </div>

              {/* Search Bar and Practice Button */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-lg">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by word, reading, or meaning..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-shadow"
                  />
                </div>
                <Link
                  href="/signup"
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-pink-500 hover:text-pink-600 hover:bg-pink-50 transition-all whitespace-nowrap"
                >
                  <GraduationCap className="h-5 w-5" />
                  Practice {level} Vocab
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

        {/* Stats Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{startIndex + 1}-{Math.min(endIndex, filteredVocabulary.length)}</span> of{' '}
              <span className="font-semibold text-gray-900">{filteredVocabulary.length}</span> words
            </div>
            <div className="text-gray-600">
              Page <span className="font-semibold text-gray-900">{currentPage}</span> of{' '}
              <span className="font-semibold text-gray-900">{totalPages}</span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
            <p className="text-gray-600 mt-4">Loading vocabulary...</p>
          </div>
        )}

        {/* Vocabulary List */}
        {!loading && currentVocabulary.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-5 text-left text-base md:text-lg font-bold text-gray-800 uppercase tracking-wider">
                      Word
                    </th>
                    <th scope="col" className="px-6 py-5 text-left text-base md:text-lg font-bold text-gray-800 uppercase tracking-wider">
                      Reading
                    </th>
                    <th scope="col" className="px-6 py-5 text-left text-base md:text-lg font-bold text-gray-800 uppercase tracking-wider">
                      Meaning
                    </th>
                    <th scope="col" className="px-6 py-5 text-left text-base md:text-lg font-bold text-gray-800 uppercase tracking-wider">
                      Audio
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentVocabulary.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gradient-to-r hover:from-pink-50/50 hover:to-orange-50/50 transition-all">
                      <td className="px-6 py-5">
                        <div className="text-xl md:text-3xl font-bold text-gray-900 font-japanese">
                          {item.word}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-lg md:text-xl text-gray-700 font-japanese">
                          {item.reading}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-base md:text-lg text-gray-900">
                          {item.meaning}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <button
                          onClick={() => playAudio(item.word)}
                          className="p-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-110"
                          aria-label={`Play audio for ${item.word}`}
                        >
                          <Volume2 className="h-5 w-5 md:h-6 md:w-6" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && currentVocabulary.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No vocabulary found</h3>
            <p className="text-gray-600">
              {searchQuery ? 'Try adjusting your search terms' : 'No vocabulary available'}
            </p>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => {
                const newPage = Math.max(1, currentPage - 1);
                setCurrentPage(newPage);
                router.push(`?page=${newPage}`);
              }}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 7) {
                  pageNum = i + 1;
                } else if (currentPage <= 4) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 3) {
                  pageNum = totalPages - 6 + i;
                } else {
                  pageNum = currentPage - 3 + i;
                }

                return (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      router.push(`?page=${pageNum}`);
                    }}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-pink-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                const newPage = Math.min(totalPages, currentPage + 1);
                setCurrentPage(newPage);
                router.push(`?page=${newPage}`);
              }}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to Master {levelData.name} Vocabulary?</h2>
          <p className="text-pink-50 mb-6 max-w-2xl mx-auto">
            Sign up for free to access interactive flashcards, practice tests, and track your progress through all {vocabulary.length} words.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-6 py-3 bg-white text-pink-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Start Learning Free
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition-colors border border-white/20"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Other Levels */}
        <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Other JLPT Levels</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(levelInfo).filter(([key]) => key !== level).map(([key, info]) => (
              <Link
                key={key}
                href={`/jlpt/${key}/vocabulary`}
                className="px-4 py-3 text-center border border-gray-200 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition-colors"
              >
                <div className="font-semibold text-gray-900">{info.name}</div>
                <div className="text-xs text-gray-600">{info.difficulty}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
