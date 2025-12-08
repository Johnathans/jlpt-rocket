'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Volume2, BookOpen, Layers, TrendingUp, Pen, ChevronLeft, ChevronRight, Copy, Zap, Download } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getKanjiByLevel, getKanjiByCharacter, getVocabularyExamplesForKanji, getVocabularyCountForKanji } from '@/lib/local-data';
import PublicNavbar from '@/components/PublicNavbar';

interface KanjiDetail {
  character: string;
  meaning: string;
  on_reading: string[];
  kun_reading: string[];
  stroke_count: number;
  jlpt_level: string;
  radical?: string;
  frequency_rank?: number;
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
  const [vocabCount, setVocabCount] = useState<number>(0);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // Load voices for speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          setVoicesLoaded(true);
        }
      };
      
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

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
      
      // Kanji image URL with descriptive filename
      const romaji = kanji.kun_reading?.[0]?.replace(/\./g, '') || kanji.on_reading?.[0] || '';
      const meaning = kanji.meaning.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-');
      const descriptiveFilename = `kanji-${kanji.character}-${romaji}-${meaning}-stroke-order.png`;
      const imageUrl = `https://www.rocketjlpt.com/images/kanji/${descriptiveFilename}`;
      
      // Open Graph tags
      updateOGTag('og:title', pageTitle);
      updateOGTag('og:description', pageDescription);
      updateOGTag('og:url', pageUrl);
      updateOGTag('og:type', 'article');
      updateOGTag('og:site_name', 'Rocket JLPT');
      updateOGTag('og:image', imageUrl);
      updateOGTag('og:image:width', '400');
      updateOGTag('og:image:height', '500');
      updateOGTag('og:image:alt', `Kanji ${kanji.character} stroke order diagram`);
      
      // Twitter Card tags
      updateMetaTag('twitter:card', 'summary_large_image');
      updateMetaTag('twitter:title', pageTitle);
      updateMetaTag('twitter:description', pageDescription);
      updateMetaTag('twitter:image', imageUrl);
      updateMetaTag('twitter:image:alt', `Kanji ${kanji.character} stroke order diagram`);
      
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
                "name": `JLPT ${kanji.jlpt_level}`,
                "item": `https://www.rocketjlpt.com/jlpt/${level.toLowerCase()}`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": `${kanji.jlpt_level} Kanji`,
                "item": `https://www.rocketjlpt.com/jlpt/${level.toLowerCase()}/kanji`
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": kanji.character,
                "item": pageUrl
              }
            ]
          },
          {
            "@type": "EducationalOccupationalCredential",
            "name": `JLPT ${kanji.jlpt_level} Kanji: ${kanji.character}`,
            "description": pageDescription,
            "image": {
              "@type": "ImageObject",
              "url": imageUrl,
              "width": 400,
              "height": 500,
              "caption": `Kanji ${kanji.character} stroke order diagram`
            },
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
          }
        ]
      };
      
      script.textContent = JSON.stringify(structuredData);
    }
  }, [kanji, kanjiChar, level]);

  useEffect(() => {
    const fetchKanjiDetail = async () => {
      try {
        setLoading(true);
        
        // Fetch all kanji for this level to enable prev/next navigation (from local JSON)
        const allKanjiData = await getKanjiByLevel(level as any);
        
        if (allKanjiData) {
          const kanjiChars = allKanjiData.map((k: any) => k.character);
          setAllKanji(kanjiChars);
          setCurrentIndex(kanjiChars.indexOf(kanjiChar));
        }
        
        // Fetch kanji details (from local JSON)
        const kanjiData = await getKanjiByCharacter(kanjiChar);

        if (!kanjiData) {
          console.error('Kanji not found');
          setLoading(false);
          return;
        }

        setKanji(kanjiData);

        // Fetch vocabulary examples that contain this kanji (from local JSON)
        const vocabData = await getVocabularyExamplesForKanji(kanjiChar, 10);
        setExamples(vocabData);
        
        // Fetch total count of vocabulary words using this kanji for usefulness metric (from local JSON)
        const count = await getVocabularyCountForKanji(kanjiChar);
        setVocabCount(count);
      } catch (error) {
        console.error('Error fetching kanji:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKanjiDetail();
  }, [kanjiChar, level]);

  const playAudio = async (text: string) => {
    try {
      // Call our TTS API with caching
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voiceName: 'ja-JP-Chirp3-HD-Leda', // High-quality Google Chirp 3 voice
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate audio');
      }

      const data = await response.json();
      
      // Play the cached audio file
      const audio = new Audio(data.audioUrl);
      audio.play();
      
      console.log(data.cached ? 'Playing cached audio' : 'Playing newly generated audio');
    } catch (error) {
      console.error('Error playing audio:', error);
      // Fallback to browser speech synthesis if API fails
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
      }
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
        <PublicNavbar />
        
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
      <PublicNavbar />

      {/* Navigation - in gray area matching navbar width */}
      <div className="bg-gray-50 pt-6 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link 
              href={`/jlpt/${level.toLowerCase()}/kanji`}
              className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {level} Kanji List
            </Link>
            
            {/* Previous/Next Navigation */}
            <div className="flex items-center gap-2 sm:gap-4">
              {currentIndex > 0 ? (
                <Link
                  href={`/jlpt/${level.toLowerCase()}/kanji/${encodeURIComponent(allKanji[currentIndex - 1])}`}
                  className="inline-flex items-center gap-1 sm:gap-2 text-pink-600 hover:text-pink-700 font-medium transition-colors text-sm sm:text-base"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1 sm:gap-2 text-gray-400 font-medium cursor-not-allowed text-sm sm:text-base">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </span>
              )}
              
              <span className="text-xs sm:text-sm text-gray-600 font-medium px-2">
                {currentIndex + 1} / {allKanji.length}
              </span>
              
              {currentIndex < allKanji.length - 1 ? (
                <Link
                  href={`/jlpt/${level.toLowerCase()}/kanji/${encodeURIComponent(allKanji[currentIndex + 1])}`}
                  className="inline-flex items-center gap-1 sm:gap-2 text-pink-600 hover:text-pink-700 font-medium transition-colors text-sm sm:text-base"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1 sm:gap-2 text-gray-400 font-medium cursor-not-allowed text-sm sm:text-base">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        {/* Main Kanji Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left: Large Kanji Display */}
            <div className="text-center flex flex-col items-center justify-between gap-4">
              <div className="text-[8rem] sm:text-[10rem] lg:text-[12rem] font-bold text-gray-900 font-japanese leading-none">
                {kanji.character}
              </div>
              <div className="flex flex-col items-center gap-3 w-full">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg text-sm font-semibold">
                  JLPT {kanji.jlpt_level}
                </span>
                <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                  <button
                    onClick={() => playAudio(kanji.character)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm w-full sm:w-auto"
                  >
                    <Volume2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Play Pronunciation</span>
                    <span className="sm:hidden">Play</span>
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(kanji.character);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm w-full sm:w-auto"
                    title="Copy kanji"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </button>
                </div>
              </div>
            </div>

            {/* Middle & Right: Readings in 2 columns */}
            <div className="lg:col-span-2">
              {/* SEO-friendly heading with kanji character */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                {kanji.character} - {kanji.meaning}
              </h1>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {/* On'yomi Reading */}
              <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg p-4 sm:p-6 border border-pink-200">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-pink-600" />
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">On'yomi (音読み)</h2>
                </div>
                <p className="text-2xl sm:text-3xl font-japanese text-gray-900 mb-2 break-words">
                  {kanji.on_reading && kanji.on_reading.length > 0 ? kanji.on_reading.join('、 ') : 'None'}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Chinese-derived pronunciation
                </p>
              </div>

              {/* Kun'yomi Reading */}
              <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg p-4 sm:p-6 border border-pink-200">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-pink-600" />
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">Kun'yomi (訓読み)</h2>
                </div>
                <p className="text-2xl sm:text-3xl font-japanese text-gray-900 mb-2 break-words">
                  {kanji.kun_reading && kanji.kun_reading.length > 0 ? kanji.kun_reading.join('、 ') : 'None'}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Native Japanese pronunciation
                </p>
              </div>

              {/* Stroke Count & Usefulness */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Stroke Count */}
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Stroke Count</h3>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {kanji.stroke_count} strokes
                  </p>
                </div>
                
                {/* Usefulness Meter */}
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Usefulness</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500 w-6 sm:w-8">Low</span>
                      <div className="flex-1 flex gap-0.5 sm:gap-1">
                        {[...Array(10)].map((_, i) => {
                          const threshold = (i + 1) * 5; // Each box represents 5 words
                          const isActive = vocabCount >= threshold;
                          return (
                            <div
                              key={i}
                              className={`flex-1 h-6 sm:h-8 rounded transition-all duration-300 ${
                                isActive 
                                  ? 'bg-gradient-to-r from-pink-500 to-orange-500' 
                                  : 'bg-gray-200'
                              }`}
                            />
                          );
                        })}
                      </div>
                      <span className="text-xs text-gray-500 w-6 sm:w-8 text-right">High</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 text-center">
                      Used in {vocabCount} word{vocabCount !== 1 ? 's' : ''} across JLPT N5-N1
                    </p>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stroke Order Diagram */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-start gap-2">
                <Pen className="h-5 w-5 sm:h-6 sm:w-6 text-pink-600 flex-shrink-0 mt-1" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">How to Write {kanji.character} - Stroke Order Diagram</h2>
              </div>
              <button
                onClick={() => {
                  // Create descriptive filename matching generation script
                  const romaji = kanji.kun_reading?.[0]?.replace(/\./g, '') || kanji.on_reading?.[0] || '';
                  const meaning = kanji.meaning.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-');
                  const descriptiveFilename = `kanji-${kanji.character}-${romaji}-${meaning}-stroke-order.png`;
                  const imageUrl = `/images/kanji/${descriptiveFilename}`;
                  const link = document.createElement('a');
                  link.href = imageUrl;
                  link.download = descriptiveFilename;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="inline-flex items-center justify-center p-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                title="Download stroke order image"
              >
                <Download className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-700">
              Learn the correct stroke order for writing the kanji {kanji.character} ({kanji.meaning}). 
              Follow the numbered sequence to write this {kanji.stroke_count}-stroke character correctly.
            </p>
          </div>
          
          <div className="flex justify-center items-center bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg p-4 sm:p-6 lg:p-8 border border-pink-200">
            <div className="relative w-full max-w-md bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Styled Kanji Stroke Order Image */}
              {(() => {
                // Create descriptive filename matching generation script
                const romaji = kanji.kun_reading?.[0]?.replace(/\./g, '') || kanji.on_reading?.[0] || '';
                const meaning = kanji.meaning.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-');
                const descriptiveFilename = `kanji-${kanji.character}-${romaji}-${meaning}-stroke-order.png`;
                const imageUrl = `/images/kanji/${descriptiveFilename}`;
                console.log('Kanji:', kanji.character, 'Image:', imageUrl);
                
                return (
                  <img
                    src={imageUrl}
                    alt={`Kanji ${kanji.character} stroke order`}
                    className="w-full h-auto"
                    style={{
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                    }}
                    onError={(e) => {
                      console.error('Failed to load stroke order image:', imageUrl);
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = '<p class="text-gray-500 text-center p-8">Stroke order diagram not available</p>';
                      }
                    }}
                    onLoad={() => {
                      console.log('Stroke order image loaded successfully:', imageUrl);
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-6">
            <div className="flex items-start gap-2 mb-3">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-pink-600 flex-shrink-0 mt-1" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Words Using {kanji.character} - Vocabulary Examples</h2>
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
                  className="flex items-start gap-2 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                      <span className="text-xl sm:text-2xl font-bold text-gray-900 font-japanese break-words">
                        {example.word}
                      </span>
                      <span className="text-base sm:text-lg text-gray-600 font-japanese break-words">
                        {example.reading}
                      </span>
                      <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-semibold">
                        {example.jlpt_level}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700">{example.meaning}</p>
                  </div>
                  <button
                    onClick={() => playAudio(example.word)}
                    className="p-2 text-gray-500 hover:text-pink-600 hover:bg-white rounded-lg transition-colors flex-shrink-0"
                  >
                    <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
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

        {/* Explore Other Kanji from Same Level */}
        {allKanji.length > 1 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 overflow-visible">
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Explore Other {kanji.jlpt_level} Kanji
                </h2>
                <Link
                  href={`/jlpt/${level.toLowerCase()}/kanji`}
                  className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                >
                  View All →
                </Link>
              </div>
              <p className="text-gray-700 text-sm">
                Discover more {kanji.jlpt_level} kanji characters to expand your Japanese vocabulary
              </p>
            </div>

            {/* Kanji row - 4 large responsive boxes */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {(() => {
                // Strategic selection to ensure each kanji gets 2-4 internal links within same level
                const otherKanjiList = allKanji.filter(k => k !== kanjiChar);
                const totalKanji = otherKanjiList.length;
                
                if (totalKanji === 0) return [];
                
                // Use current kanji index to create varied but consistent selections
                // This ensures each kanji appears in multiple other kanji's explore sections
                const selectedIndices = [
                  (currentIndex + 1) % totalKanji,  // Next kanji
                  (currentIndex + Math.floor(totalKanji / 4)) % totalKanji,  // Quarter through
                  (currentIndex + Math.floor(totalKanji / 2)) % totalKanji,  // Halfway through
                  (currentIndex + Math.floor(totalKanji * 3 / 4)) % totalKanji  // Three quarters through
                ];
                
                // Remove duplicates and get unique kanji
                const uniqueIndices = Array.from(new Set(selectedIndices));
                const selectedKanji = uniqueIndices
                  .map(idx => otherKanjiList[idx])
                  .filter(Boolean)
                  .slice(0, 4);
                
                return selectedKanji.map((otherKanji) => (
                  <Link
                    key={otherKanji}
                    href={`/jlpt/${level.toLowerCase()}/kanji/${encodeURIComponent(otherKanji)}`}
                    className="border-t-4 border-l-4 border-r-4 border-b-8 border-gray-200 hover:border-pink-200 hover:border-b-pink-500 transition-all duration-200 hover:shadow-lg rounded-xl sm:rounded-2xl p-6 pb-10 sm:p-8 bg-white hover:bg-pink-50 group"
                  >
                    <div className="text-center">
                      <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 font-japanese mb-3 group-hover:text-pink-600 transition-colors">
                        {otherKanji}
                      </div>
                      <div className="text-sm text-gray-500 group-hover:text-pink-600 transition-colors">
                        View Details
                      </div>
                    </div>
                  </Link>
                ));
              })()}
            </div>
          </div>
        )}

        {/* Study This Kanji CTA */}
        <div className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl shadow-lg p-6 sm:p-8 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            Master {kanji.character} and {kanji.jlpt_level === 'N5' ? '79' : kanji.jlpt_level === 'N4' ? '166' : '1000+'} More Kanji
          </h2>
          <p className="text-base sm:text-xl mb-4 sm:mb-6 text-white/90">
            Track your progress, practice with flashcards, and ace your JLPT exam
          </p>
          <Link
            href="/signup"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-pink-600 font-semibold text-base sm:text-lg rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            Start Learning Free
          </Link>
        </div>
      </div>
    </div>
  );
}
