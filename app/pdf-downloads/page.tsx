'use client';

import { useState, useEffect } from 'react';
import { Download, FileText, Loader2 } from 'lucide-react';

export default function PDFDownloadsPage() {
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'JLPT PDF Downloads - Kanji & Vocabulary Lists | Rocket JLPT';
    
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

    updateMetaTag('description', 'Download comprehensive JLPT study materials as PDFs. Complete kanji lists, vocabulary lists, and practice sheets for all levels N5 to N1.');
    updateMetaTag('keywords', 'JLPT PDF, kanji list PDF, vocabulary list PDF, JLPT study materials, Japanese learning PDFs, JLPT downloads');
    updateOGTag('og:title', 'JLPT PDF Downloads - Kanji & Vocabulary Lists');
    updateOGTag('og:description', 'Download comprehensive JLPT study materials as PDFs. Complete kanji lists, vocabulary lists, and practice sheets for all levels N5 to N1.');
    updateOGTag('og:url', 'https://www.rocketjlpt.com/pdf-downloads');
    updateMetaTag('twitter:title', 'JLPT PDF Downloads - Kanji & Vocabulary Lists');
    updateMetaTag('twitter:description', 'Download comprehensive JLPT study materials as PDFs. Complete kanji lists, vocabulary lists, and practice sheets for all levels.');
  }, []);

  const handleDownload = async (pdfType: string, filename: string, staticPath?: string) => {
    try {
      setLoading(pdfType);
      
      // If static path exists, download directly
      if (staticPath) {
        const a = document.createElement('a');
        a.href = staticPath;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        // Otherwise generate on-demand
        const response = await fetch(`/api/generate-pdf/${pdfType}`);
        
        if (!response.ok) {
          throw new Error('Failed to generate PDF');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
      
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const pdfOptions = [
    {
      id: 'n5-kanji',
      title: 'N5 Kanji Practice Sheet',
      description: '~80 basic kanji with stroke order diagrams',
      filename: 'n5-kanji-practice-sheet.pdf',
      staticPath: '/worksheets/n5-kanji-practice-sheet.pdf',
      icon: '日',
    },
    {
      id: 'n4-kanji',
      title: 'N4 Kanji Practice Sheet',
      description: '~170 elementary kanji with stroke order diagrams',
      filename: 'n4-kanji-practice-sheet.pdf',
      staticPath: '/worksheets/n4-kanji-practice-sheet.pdf',
      icon: '会',
    },
    {
      id: 'n3-kanji',
      title: 'N3 Kanji Practice Sheet',
      description: '~370 intermediate kanji with stroke order diagrams',
      filename: 'n3-kanji-practice-sheet.pdf',
      staticPath: '/worksheets/n3-kanji-practice-sheet.pdf',
      icon: '政',
    },
    {
      id: 'n2-kanji',
      title: 'N2 Kanji Practice Sheet',
      description: '~370 advanced kanji with stroke order diagrams',
      filename: 'n2-kanji-practice-sheet.pdf',
      staticPath: '/worksheets/n2-kanji-practice-sheet.pdf',
      icon: '党',
    },
    {
      id: 'n1-kanji',
      title: 'N1 Kanji Practice Sheet',
      description: '~1,200 expert kanji with stroke order diagrams',
      filename: 'n1-kanji-practice-sheet.pdf',
      staticPath: '/worksheets/n1-kanji-practice-sheet.pdf',
      icon: '氏',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            <span className="font-light">Rocket</span>
            <span className="font-black ml-2">JLPT</span>
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700">Practice Sheet Downloads</h2>
          <p className="text-gray-600 mt-2">
            Download printable PDF practice sheets for your JLPT study
          </p>
        </div>

        {/* PDF Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pdfOptions.map((option) => (
            <div
              key={option.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl">{option.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {option.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDownload(option.id, option.filename, option.staticPath)}
                disabled={loading === option.id}
                className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading === option.id ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Download PDF
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg border border-pink-200 p-6">
          <div className="flex items-start gap-3">
            <FileText className="h-6 w-6 text-pink-600 mt-1" />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">About These PDFs</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• High-quality printable practice sheets</li>
                <li>• Optimized for A4 paper size</li>
                <li>• Perfect for offline study and practice</li>
                <li>• Generated fresh from our database</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
