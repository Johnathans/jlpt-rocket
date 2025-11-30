'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Volume2, BookOpen, Layers, TrendingUp, Rocket, Pen, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface KanjiDetail {
  character: string;
  meaning: string;
  on_reading: string[];
  kun_reading: string[];
  stroke_count: number;
  jlpt_level: string;
  radical?: string;
}

export default function KanjiDetailPage() {
  const params = useParams();
  const kanjiChar = decodeURIComponent(params.kanji as string);
  const level = (params.level as string).toUpperCase();
  
  const [kanji, setKanji] = useState<KanjiDetail | null>(null);
  const [examples, setExamples] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [allKanji, setAllKanji] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  // SEO: Update meta tags dynamically
  useEffect(() => {
    if (kanji) {
      const pageTitle = `${kanji.character} (${kanji.meaning}) - JLPT ${kanji.jlpt_level} Kanji | Rocket JLPT`;
      const pageDescription = `Learn ${kanji.character} (${kanji.meaning}): JLPT ${kanji.jlpt_level} kanji with ${kanji.stroke_count} strokes. On'yomi: ${kanji.on_reading?.join(', ') || 'N/A'}, Kun'yomi: ${kanji.kun_reading?.join(', ') || 'N/A'}. Includes stroke order, readings, and vocabulary examples.`;
      const pageUrl = `https://www.rocketjlpt.com/jlpt/${level.toLowerCase()}/kanji/${encodeURIComponent(kanjiChar)}`;
      
      // Update title
      document.title = pageTitle;
      
      // Update meta tags
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
      
      // Standard meta tags
      updateMetaTag('description', pageDescription);
      updateMetaTag('keywords', `${kanji.character}, kanji, JLPT ${kanji.jlpt_level}, ${kanji.meaning}, Japanese kanji, stroke order, kanji readings, on'yomi, kun'yomi`);
      
      // Open Graph tags
      updateOGTag('og:title', pageTitle);
      updateOGTag('og:description', pageDescription);
      updateOGTag('og:url', pageUrl);
      updateOGTag('og:type', 'article');
      updateOGTag('og:site_name', 'Rocket JLPT');
      
      // Twitter Card tags
      updateMetaTag('twitter:card', 'summary_large_image');
      updateMetaTag('twitter:title', pageTitle);
      updateMetaTag('twitter:description', pageDescription);
      
      // Canonical URL
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = pageUrl;
      
      // JSON-LD Structured Data
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "EducationalOccupationalCredential",
        "name": `JLPT ${kanji.jlpt_level} Kanji: ${kanji.character}`,
        "description": pageDescription,
        "educationalLevel": `JLPT ${kanji.jlpt_level}`,
        "competencyRequired": `Japanese Language Proficiency Test ${kanji.jlpt_level}`,
        "about": {
          "@type": "Thing",
          "name": kanji.character,
          "description": kanji.meaning,
          "inLanguage": "ja"
        },
        "teaches": [
          {
            "@type": "DefinedTerm",
            "name": "On'yomi Reading",
            "description": kanji.on_reading?.join(', ') || 'None'
          },
          {
            "@type": "DefinedTerm",
            "name": "Kun'yomi Reading",
            "description": kanji.kun_reading?.join(', ') || 'None'
          },
          {
            "@type": "DefinedTerm",
            "name": "Stroke Count",
            "description": `${kanji.stroke_count} strokes`
          }
        ],
        "provider": {
          "@type": "Organization",
          "name": "Rocket JLPT",
          "url": "https://www.rocketjlpt.com"
        },
        "url": pageUrl
      };
      
      script.textContent = JSON.stringify(structuredData);
    }
  }, [kanji, kanjiChar, level]);

  useEffect(() => {
    const fetchKanjiDetail = async () => {
      try {
        setLoading(true);
        
        // Fetch all kanji for this level to enable prev/next navigation
        const { data: allKanjiData } = await supabase
          .from('kanji')
          .select('character')
          .eq('jlpt_level', level)
          .order('frequency_rank', { ascending: true });
        
        if (allKanjiData) {
          const kanjiChars = allKanjiData.map(k => k.character);
          setAllKanji(kanjiChars);
          setCurrentIndex(kanjiChars.indexOf(kanjiChar));
        }
        
        // Fetch kanji details
        const { data: kanjiData, error: kanjiError } = await supabase
          .from('kanji')
          .select('character, meaning, on_reading, kun_reading, stroke_count, jlpt_level, radical')
          .eq('character', kanjiChar)
          .single();

        if (kanjiError) throw kanjiError;

        setKanji(kanjiData);

        // Fetch vocabulary examples that contain this kanji
        const { data: vocabData, error: vocabError } = await supabase
          .from('vocabulary')
          .select('word, reading, meaning, jlpt_level')
          .contains('kanji_used', [kanjiChar])
          .limit(10);

        if (!vocabError && vocabData) {
          setExamples(vocabData);
        }
      } catch (error) {
        console.error('Error fetching kanji:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKanjiDetail();
  }, [kanjiChar, level]);

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading kanji...</p>
        </div>
      </div>
    );
  }

  if (!kanji) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2">
                <Rocket className="h-6 w-6 text-pink-500" />
                <span className="text-2xl text-gray-900">
                  <span className="font-light">Rocket</span>
                  <span className="font-black ml-1">JLPT</span>
                </span>
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-gray-700 hover:text-pink-600 font-medium">
                  Sign In
                </Link>
                <Link href="/signup" className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 font-medium">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Kanji not found</h2>
            <Link href={`/jlpt/${level.toLowerCase()}/kanji`} className="text-pink-600 hover:text-pink-700">
              Back to {level} Kanji
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Rocket className="h-6 w-6 text-pink-500" />
              <span className="text-2xl text-gray-900">
                <span className="font-light">Rocket</span>
                <span className="font-black ml-1">JLPT</span>
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-700 hover:text-pink-600 font-medium">
                Sign In
              </Link>
              <Link href="/signup" className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 font-medium">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href={`/jlpt/${level.toLowerCase()}/kanji`}
              className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {level} Kanji
            </Link>
            
            {/* Previous/Next Navigation */}
            <div className="flex items-center gap-3">
              {currentIndex > 0 ? (
                <Link
                  href={`/jlpt/${level.toLowerCase()}/kanji/${encodeURIComponent(allKanji[currentIndex - 1])}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Link>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed font-medium">
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </div>
              )}
              
              <span className="text-sm text-gray-600 font-medium">
                {currentIndex + 1} / {allKanji.length}
              </span>
              
              {currentIndex < allKanji.length - 1 ? (
                <Link
                  href={`/jlpt/${level.toLowerCase()}/kanji/${encodeURIComponent(allKanji[currentIndex + 1])}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed font-medium">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* SEO-friendly heading with kanji character */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900">
            {kanji.character} - {kanji.meaning}
          </h1>
        </div>

        {/* Main Kanji Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Large Kanji Display */}
            <div className="text-center flex flex-col items-center justify-center gap-4">
              <div className="text-9xl font-bold text-gray-900 font-japanese">
                {kanji.character}
              </div>
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg text-sm font-semibold">
                JLPT {kanji.jlpt_level}
              </span>
              <button
                onClick={() => playAudio(kanji.character)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
              >
                <Volume2 className="h-5 w-5" />
                Play Pronunciation
              </button>
            </div>

            {/* Middle & Right: Readings in 2 columns */}
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              {/* On'yomi Reading */}
              <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg p-6 border border-pink-200">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-pink-600" />
                  <h2 className="text-xl font-bold text-gray-900">On'yomi (音読み)</h2>
                </div>
                <p className="text-3xl font-japanese text-gray-900 mb-2">
                  {kanji.on_reading && kanji.on_reading.length > 0 ? kanji.on_reading.join('、 ') : 'None'}
                </p>
                <p className="text-sm text-gray-600">
                  Chinese-derived pronunciation
                </p>
              </div>

              {/* Kun'yomi Reading */}
              <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg p-6 border border-pink-200">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-pink-600" />
                  <h2 className="text-xl font-bold text-gray-900">Kun'yomi (訓読み)</h2>
                </div>
                <p className="text-3xl font-japanese text-gray-900 mb-2">
                  {kanji.kun_reading && kanji.kun_reading.length > 0 ? kanji.kun_reading.join('、 ') : 'None'}
                </p>
                <p className="text-sm text-gray-600">
                  Native Japanese pronunciation
                </p>
              </div>

              {/* Stroke Count */}
              <div className="md:col-span-2 bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="h-5 w-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Stroke Count</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {kanji.stroke_count} strokes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stroke Order Diagram */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Pen className="h-6 w-6 text-pink-600" />
              <h2 className="text-2xl font-bold text-gray-900">How to Write {kanji.character} - Stroke Order Diagram</h2>
            </div>
            <p className="text-gray-700">
              Learn the correct stroke order for writing the kanji {kanji.character} ({kanji.meaning}). 
              Follow the numbered sequence to write this {kanji.stroke_count}-stroke character correctly.
            </p>
          </div>
          
          <div className="flex justify-center items-center bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg p-8 border border-pink-200">
            <div className="relative w-full max-w-lg aspect-square bg-white rounded-lg p-6 shadow-sm">
              {/* KanjiVG SVG - fully customizable */}
              {(() => {
                const codePoint = kanji.character.codePointAt(0)?.toString(16).padStart(5, '0');
                const svgUrl = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${codePoint}.svg`;
                console.log('Kanji:', kanji.character, 'Code point:', codePoint, 'URL:', svgUrl);
                
                return (
                  <img
                    src={svgUrl}
                    alt={`Stroke order for ${kanji.character}`}
                    className="w-full h-full"
                    style={{
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                    }}
                    onError={(e) => {
                      console.error('Failed to load stroke order:', svgUrl);
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = '<p class="text-gray-500 text-center">Stroke order diagram not available</p>';
                      }
                    }}
                    onLoad={() => {
                      console.log('Stroke order loaded successfully:', svgUrl);
                    }}
                  />
                );
              })()}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 text-center mt-4">
            Follow the numbered strokes to learn the correct writing order
          </p>
        </div>

        {/* Vocabulary Examples */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-6 w-6 text-pink-600" />
              <h2 className="text-2xl font-bold text-gray-900">Words Using {kanji.character} - Vocabulary Examples</h2>
            </div>
            <p className="text-gray-700">
              Common Japanese words and vocabulary that use the kanji {kanji.character}. 
              Each example includes the reading (pronunciation) and English meaning.
            </p>
          </div>

          {examples.length > 0 ? (
            <div className="grid gap-4">
              {examples.map((example, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-2xl font-bold text-gray-900 font-japanese">
                        {example.word}
                      </span>
                      <span className="text-lg text-gray-600 font-japanese">
                        {example.reading}
                      </span>
                      <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-semibold">
                        {example.jlpt_level}
                      </span>
                    </div>
                    <p className="text-gray-700">{example.meaning}</p>
                  </div>
                  <button
                    onClick={() => playAudio(example.word)}
                    className="p-2 text-gray-500 hover:text-pink-600 hover:bg-white rounded-lg transition-colors flex-shrink-0"
                  >
                    <Volume2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No vocabulary examples available
            </div>
          )}
        </div>

        {/* Study This Kanji CTA */}
        <div className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl shadow-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Master {kanji.character} and {kanji.jlpt_level === 'N5' ? '79' : kanji.jlpt_level === 'N4' ? '166' : '1000+'} More Kanji
          </h2>
          <p className="text-xl mb-6 text-white/90">
            Track your progress, practice with flashcards, and ace your JLPT exam
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-white text-pink-600 font-semibold text-lg rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            Start Learning Free
          </Link>
        </div>
      </div>
    </div>
  );
}
