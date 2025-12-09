'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PublicNavbar from '@/components/PublicNavbar';
import { ArrowLeft, Download, Printer, Share2, BookOpen, Clock, BarChart } from 'lucide-react';
import Link from 'next/link';
import type { Worksheet } from '@/types/worksheet';

export default function WorksheetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const worksheetId = params.id as string;
  
  const [worksheet, setWorksheet] = useState<Worksheet | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedWorksheets, setRelatedWorksheets] = useState<Worksheet[]>([]);

  // SEO metadata
  useEffect(() => {
    if (worksheet) {
      document.title = `${worksheet.title} - Free PDF Download | Rocket JLPT`;
      
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

      updateMetaTag('description', worksheet.description);
      updateMetaTag('keywords', `${worksheet.tags.join(', ')}, Japanese practice, JLPT ${worksheet.jlpt_level}, free worksheet`);
      updateOGTag('og:title', `${worksheet.title} - Free PDF Download`);
      updateOGTag('og:description', worksheet.description);
      updateOGTag('og:url', `https://www.rocketjlpt.com/worksheets/${worksheet.id}`);
      updateOGTag('og:image', `https://www.rocketjlpt.com${worksheet.thumbnail_url}`);
      updateMetaTag('twitter:title', `${worksheet.title} - Free PDF Download`);
      updateMetaTag('twitter:description', worksheet.description);
      updateMetaTag('twitter:image', `https://www.rocketjlpt.com${worksheet.thumbnail_url}`);
    }
  }, [worksheet]);

  useEffect(() => {
    // Worksheet database
    const worksheets: Record<string, Worksheet> = {
      'n5-kanji': {
        id: 'n5-kanji',
        title: 'N5 Kanji Practice Sheet',
        description: 'Master all ~80 basic JLPT N5 kanji with comprehensive stroke order diagrams. This worksheet includes writing practice grids for each character, helping you learn proper stroke order and character formation.',
        thumbnail_url: '/worksheets/n5-kanji-preview.png',
        pdf_url: '/worksheets/n5-kanji-practice-sheet.pdf',
        jlpt_level: 'N5',
        category: 'Kanji',
        difficulty: 'Beginner',
        is_interactive: false,
        is_premium: false,
        download_count: 2450,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        tags: ['kanji', 'writing', 'stroke order', 'n5'],
      },
      'n4-kanji': {
        id: 'n4-kanji',
        title: 'N4 Kanji Practice Sheet',
        description: 'Master all ~170 elementary JLPT N4 kanji with comprehensive stroke order diagrams. Build on your N5 foundation with these essential characters for daily communication.',
        thumbnail_url: '/worksheets/n4-kanji-preview.png',
        pdf_url: '/worksheets/n4-kanji-practice-sheet.pdf',
        jlpt_level: 'N4',
        category: 'Kanji',
        difficulty: 'Beginner',
        is_interactive: false,
        is_premium: false,
        download_count: 1890,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        tags: ['kanji', 'writing', 'stroke order', 'n4'],
      },
      'n3-kanji': {
        id: 'n3-kanji',
        title: 'N3 Kanji Practice Sheet',
        description: 'Master all ~370 intermediate JLPT N3 kanji with comprehensive stroke order diagrams. These characters are essential for work and social situations in Japanese.',
        thumbnail_url: '/worksheets/n3-kanji-preview.png',
        pdf_url: '/worksheets/n3-kanji-practice-sheet.pdf',
        jlpt_level: 'N3',
        category: 'Kanji',
        difficulty: 'Intermediate',
        is_interactive: false,
        is_premium: false,
        download_count: 1560,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        tags: ['kanji', 'writing', 'stroke order', 'n3'],
      },
      'n2-kanji': {
        id: 'n2-kanji',
        title: 'N2 Kanji Practice Sheet',
        description: 'Master all ~370 advanced JLPT N2 kanji with comprehensive stroke order diagrams. These characters are crucial for professional use and advanced reading comprehension.',
        thumbnail_url: '/worksheets/n2-kanji-preview.png',
        pdf_url: '/worksheets/n2-kanji-practice-sheet.pdf',
        jlpt_level: 'N2',
        category: 'Kanji',
        difficulty: 'Advanced',
        is_interactive: false,
        is_premium: false,
        download_count: 1240,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        tags: ['kanji', 'writing', 'stroke order', 'n2'],
      },
      'n1-kanji': {
        id: 'n1-kanji',
        title: 'N1 Kanji Practice Sheet',
        description: 'Master all ~1,200 expert JLPT N1 kanji with comprehensive stroke order diagrams. Achieve near-native kanji proficiency with this comprehensive practice sheet.',
        thumbnail_url: '/worksheets/n1-kanji-preview.png',
        pdf_url: '/worksheets/n1-kanji-practice-sheet.pdf',
        jlpt_level: 'N1',
        category: 'Kanji',
        difficulty: 'Advanced',
        is_interactive: false,
        is_premium: false,
        download_count: 980,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        tags: ['kanji', 'writing', 'stroke order', 'n1'],
      },
      'hiragana': {
        id: 'hiragana',
        title: 'Hiragana Practice Sheet',
        description: 'Master all hiragana characters with comprehensive writing practice. This worksheet includes stroke order diagrams, practice grids, and example words for each character.',
        thumbnail_url: '/worksheets/hiragana-preview.png',
        pdf_url: '/worksheets/hiragana-practice-sheet.pdf',
        jlpt_level: 'N5',
        category: 'Writing',
        difficulty: 'Beginner',
        is_interactive: false,
        is_premium: false,
        download_count: 3250,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        tags: ['hiragana', 'writing', 'beginner'],
      },
      'katakana': {
        id: 'katakana',
        title: 'Katakana Practice Sheet',
        description: 'Master all katakana characters with comprehensive writing practice. This worksheet includes stroke order diagrams, practice grids, and example words for each character.',
        thumbnail_url: '/worksheets/katakana-preview.png',
        pdf_url: '/worksheets/katakana-practice-sheet.pdf',
        jlpt_level: 'N5',
        category: 'Writing',
        difficulty: 'Beginner',
        is_interactive: false,
        is_premium: false,
        download_count: 2890,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        tags: ['katakana', 'writing', 'beginner'],
      },
    };
    
    const foundWorksheet = worksheets[worksheetId];
    setWorksheet(foundWorksheet || null);
    setLoading(false);

    // Get related worksheets (same category or level)
    if (foundWorksheet) {
      const related = Object.values(worksheets)
        .filter(w => w.id !== worksheetId && (w.category === foundWorksheet.category || w.jlpt_level === foundWorksheet.jlpt_level))
        .slice(0, 4);
      setRelatedWorksheets(related);
    }
  }, [worksheetId]);

  const handleDownload = () => {
    if (worksheet?.pdf_url) {
      const a = document.createElement('a');
      a.href = worksheet.pdf_url;
      a.download = `${worksheet.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: worksheet?.title,
          text: worksheet?.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PublicNavbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </div>
      </div>
    );
  }

  if (!worksheet) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PublicNavbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Worksheet not found</h2>
            <Link href="/worksheets" className="text-pink-600 hover:text-pink-700 font-medium">
              ← Back to Worksheets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-pink-600">Home</Link>
          <span>/</span>
          <Link href="/worksheets" className="hover:text-pink-600">Worksheets</Link>
          <span>/</span>
          <Link href={`/worksheets?levels=${worksheet.jlpt_level}`} className="hover:text-pink-600">
            {worksheet.jlpt_level}
          </Link>
          <span>/</span>
          <Link href={`/worksheets?categories=${worksheet.category}`} className="hover:text-pink-600">
            {worksheet.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 truncate">{worksheet.title}</span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Worksheets</span>
        </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="aspect-[8.5/11] bg-gradient-to-br from-gray-50 to-gray-100 relative">
                {worksheet.thumbnail_url ? (
                  <img 
                    src={worksheet.thumbnail_url} 
                    alt={`${worksheet.title} preview`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <BookOpen className="h-24 w-24" />
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About This Worksheet</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{worksheet.description}</p>
              
              {worksheet.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {worksheet.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Related Worksheets */}
            {relatedWorksheets.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Related Worksheets</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedWorksheets.map(related => (
                    <Link
                      key={related.id}
                      href={`/worksheets/${related.id}`}
                      className="group border border-gray-200 rounded-xl p-4 hover:border-pink-300 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-2 py-1 rounded">
                          {related.jlpt_level}
                        </span>
                        <span className="text-xs text-gray-600">{related.category}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors mb-1">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {related.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{worksheet.title}</h1>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold">
                  {worksheet.jlpt_level}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                  {worksheet.category}
                </span>
                {worksheet.is_interactive && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    Interactive
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3 text-sm">
                  <BarChart className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Difficulty:</span>
                  <span className="font-medium text-gray-900">{worksheet.difficulty}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Download className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Downloads:</span>
                  <span className="font-medium text-gray-900">{worksheet.download_count.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Updated:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(worksheet.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <Download className="h-5 w-5" />
                  Download PDF
                </button>

                {worksheet.is_interactive && (
                  <Link
                    href={`/worksheets/${worksheet.id}/interactive`}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <BookOpen className="h-5 w-5" />
                    Open Interactive
                  </Link>
                )}

                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  <Printer className="h-5 w-5" />
                  Print
                </button>

                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  <Share2 className="h-5 w-5" />
                  Share
                </button>
              </div>

              {/* Premium CTA */}
              {worksheet.is_premium && (
                <div className="mt-6 p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border border-pink-200">
                  <p className="text-sm text-gray-700 mb-3">
                    Get unlimited access to all premium worksheets
                  </p>
                  <Link
                    href="/pricing"
                    className="block w-full text-center bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-200 text-sm shadow-sm"
                  >
                    Upgrade to Premium
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
