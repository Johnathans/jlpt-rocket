'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { BookOpen, Search, Volume2 } from 'lucide-react';
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

  // Sync currentPage with URL on mount
  useEffect(() => {
    const page = searchParams.get('page');
    if (page) {
      setCurrentPage(parseInt(page, 10));
    }
  }, [searchParams]);

  useEffect(() => {
    if (!levelData) return;

    // Set page title and meta tags
    document.title = `JLPT ${levelData.name} Vocabulary List - ${levelData.count} ${levelData.difficulty} Japanese Words | Rocket JLPT`;
    
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', `Complete JLPT ${levelData.name} vocabulary list with ${levelData.count} ${levelData.description} Japanese words. Includes kanji, hiragana readings, English meanings, and audio pronunciation.`);
    updateMetaTag('keywords', `jlpt ${level} vocabulary, ${level} words, japanese vocabulary ${levelData.description}, jlpt ${level} word list`);

    // Add structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `JLPT ${levelData.name} Vocabulary List`,
      "description": `Complete list of ${levelData.count} ${levelData.description} Japanese vocabulary words for JLPT ${levelData.name}`,
      "numberOfItems": levelData.count,
      "itemListElement": {
        "@type": "ListItem",
        "name": `${levelData.name} Vocabulary Words`
      }
    });
    document.head.appendChild(script);

    async function loadVocabulary() {
      try {
        const data = await getVocabularyByLevel(levelData.name.toUpperCase() as any);
        setVocabulary(data);
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-pink-600">Home</Link>
            <span>/</span>
            <Link href={`/jlpt/${level}/kanji`} className="hover:text-pink-600">JLPT {levelData.name}</Link>
            <span>/</span>
            <span className="text-gray-900">Vocabulary</span>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">JLPT {levelData.name} Vocabulary</h1>
              <p className="text-gray-600 mt-1">
                Complete list of {vocabulary.length} essential {levelData.description} words
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg border border-pink-200 p-6 mb-6">
            <p className="text-gray-700 leading-relaxed">
              Master the {levelData.description} vocabulary needed for JLPT {levelData.name}. This comprehensive list includes all {vocabulary.length} words you need to know, 
              complete with readings and English meanings. Perfect for {levelData.difficulty.toLowerCase()} learners.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vocabulary by word, reading, or meaning..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>

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
                let pageNum;
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
