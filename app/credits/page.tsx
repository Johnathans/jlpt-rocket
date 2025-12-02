'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, Heart } from 'lucide-react';

export default function CreditsPage() {
  useEffect(() => {
    document.title = 'Credits & Attributions - Rocket JLPT';
    
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

    updateMetaTag('description', 'Credits and attributions for the data sources used in Rocket JLPT, including Jonathan Waller\'s JLPT Resources, KanjiVG, and Yomitan JLPT Vocabulary.');
    updateMetaTag('keywords', 'jlpt credits, data sources, jonathan waller jlpt, kanjivg, attributions, jlpt resources');
    updateOGTag('og:title', 'Credits & Attributions - Rocket JLPT');
    updateOGTag('og:description', 'Credits and attributions for the data sources used in Rocket JLPT, including Jonathan Waller\'s JLPT Resources, KanjiVG, and Yomitan JLPT Vocabulary.');
    updateOGTag('og:url', 'https://rocketjlpt.com/credits');
    updateOGTag('og:type', 'website');
    updateMetaTag('twitter:card', 'summary');
    updateMetaTag('twitter:title', 'Credits & Attributions - Rocket JLPT');
    updateMetaTag('twitter:description', 'Credits and attributions for the data sources used in Rocket JLPT.');

    // Add canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://rocketjlpt.com/credits';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Credits & Attributions</h1>
          <p className="text-lg text-gray-600">
            Rocket JLPT is built using high-quality JLPT data from the following sources.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Jonathan Waller */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Jonathan Waller's JLPT Resources</h2>
            <p className="text-gray-600 mb-4">
              The foundation of our JLPT vocabulary, kanji, and grammar data comes from Jonathan Waller's comprehensive 
              JLPT study resources. This data is widely recognized as one of the most accurate and complete JLPT reference 
              materials available, and is used by Jisho.org and many other Japanese learning platforms.
            </p>
            <a
              href="https://www.tanos.co.uk/jlpt/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
            >
              Visit JLPT Resources
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* KanjiVG */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">KanjiVG (Kanji Vector Graphics)</h2>
            <p className="text-gray-600 mb-4">
              Our kanji stroke order diagrams and SVG files are provided by the KanjiVG project. KanjiVG is a comprehensive 
              collection of SVG kanji stroke order diagrams released under a Creative Commons Attribution-ShareAlike 3.0 license.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://kanjivg.tagaini.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
              >
                Visit KanjiVG Project
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://creativecommons.org/licenses/by-sa/3.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-700 font-medium"
              >
                View CC BY-SA 3.0 License
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Yomitan JLPT Vocabulary */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Yomitan JLPT Vocabulary</h2>
            <p className="text-gray-600 mb-4">
              Our vocabulary database is enhanced using data from the yomitan-jlpt-vocab repository by stephenmk. 
              This project combines Jonathan Waller's JLPT vocabulary lists with JMDict data to provide accurate 
              readings and definitions.
            </p>
            <a
              href="https://github.com/stephenmk/yomitan-jlpt-vocab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
            >
              View on GitHub
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Thank You Section */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-gray-600 bg-white rounded-lg border border-gray-200 px-6 py-4">
            <Heart className="h-5 w-5 text-pink-500" />
            <span className="text-lg">
              Thank you to all the contributors who make these resources freely available to Japanese learners worldwide.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
