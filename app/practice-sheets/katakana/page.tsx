'use client';

import { useEffect } from 'react';

export default function KatakanaPracticeSheet() {
  useEffect(() => {
    document.title = 'Katakana Practice Sheet - Rocket JLPT';
  }, []);

  const basicKatakana = [
    ['ア', 'a'], ['イ', 'i'], ['ウ', 'u'], ['エ', 'e'], ['オ', 'o'],
    ['カ', 'ka'], ['キ', 'ki'], ['ク', 'ku'], ['ケ', 'ke'], ['コ', 'ko'],
    ['サ', 'sa'], ['シ', 'shi'], ['ス', 'su'], ['セ', 'se'], ['ソ', 'so'],
    ['タ', 'ta'], ['チ', 'chi'], ['ツ', 'tsu'], ['テ', 'te'], ['ト', 'to'],
    ['ナ', 'na'], ['ニ', 'ni'], ['ヌ', 'nu'], ['ネ', 'ne'], ['ノ', 'no'],
    ['ハ', 'ha'], ['ヒ', 'hi'], ['フ', 'fu'], ['ヘ', 'he'], ['ホ', 'ho'],
    ['マ', 'ma'], ['ミ', 'mi'], ['ム', 'mu'], ['メ', 'me'], ['モ', 'mo'],
    ['ヤ', 'ya'], ['ユ', 'yu'], ['ヨ', 'yo'],
    ['ラ', 'ra'], ['リ', 'ri'], ['ル', 'ru'], ['レ', 're'], ['ロ', 'ro'],
    ['ワ', 'wa'], ['ヲ', 'wo'], ['ン', 'n']
  ];

  const dakutenKatakana = [
    ['ガ', 'ga'], ['ギ', 'gi'], ['グ', 'gu'], ['ゲ', 'ge'], ['ゴ', 'go'],
    ['ザ', 'za'], ['ジ', 'ji'], ['ズ', 'zu'], ['ゼ', 'ze'], ['ゾ', 'zo'],
    ['ダ', 'da'], ['ヂ', 'ji'], ['ヅ', 'zu'], ['デ', 'de'], ['ド', 'do'],
    ['バ', 'ba'], ['ビ', 'bi'], ['ブ', 'bu'], ['ベ', 'be'], ['ボ', 'bo'],
    ['パ', 'pa'], ['ピ', 'pi'], ['プ', 'pu'], ['ペ', 'pe'], ['ポ', 'po']
  ];

  const combinationKatakana = [
    ['キャ', 'kya'], ['キュ', 'kyu'], ['キョ', 'kyo'],
    ['シャ', 'sha'], ['シュ', 'shu'], ['ショ', 'sho'],
    ['チャ', 'cha'], ['チュ', 'chu'], ['チョ', 'cho'],
    ['ニャ', 'nya'], ['ニュ', 'nyu'], ['ニョ', 'nyo'],
    ['ヒャ', 'hya'], ['ヒュ', 'hyu'], ['ヒョ', 'hyo'],
    ['ミャ', 'mya'], ['ミュ', 'myu'], ['ミョ', 'myo'],
    ['リャ', 'rya'], ['リュ', 'ryu'], ['リョ', 'ryo'],
    ['ギャ', 'gya'], ['ギュ', 'gyu'], ['ギョ', 'gyo'],
    ['ジャ', 'ja'], ['ジュ', 'ju'], ['ジョ', 'jo'],
    ['ビャ', 'bya'], ['ビュ', 'byu'], ['ビョ', 'byo'],
    ['ピャ', 'pya'], ['ピュ', 'pyu'], ['ピョ', 'pyo']
  ];

  return (
    <>
      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .no-print {
            display: none !important;
          }
          .page-break {
            page-break-after: always;
          }
        }
      `}</style>

      {/* Print Button - Hidden when printing */}
      <div className="no-print fixed top-4 right-4 z-50">
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg shadow-lg hover:from-pink-600 hover:to-orange-600 transition-all"
        >
          Print / Save as PDF
        </button>
      </div>

      {/* Page 1: Basic Katakana */}
      <div className="w-full min-h-screen bg-white p-8 page-break">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="font-light">Rocket</span>
                <span className="font-black ml-2">JLPT</span>
              </h1>
              <p className="text-lg">Katakana Practice Sheet</p>
            </div>
            <div className="text-right">
              <p className="text-sm">www.rocketjlpt.com</p>
            </div>
          </div>
        </div>

        {/* Basic Katakana Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-pink-500 pb-2">
            Basic Katakana (46 characters)
          </h2>
          <div className="grid grid-cols-10 gap-2">
            {basicKatakana.map(([char, romaji], index) => (
              <div key={index} className="border-2 border-gray-300 rounded aspect-square flex flex-col items-center justify-center p-2">
                <div className="text-4xl text-gray-300 font-bold mb-1">{char}</div>
                <div className="text-xs text-gray-500">{romaji}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Lines */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Practice Writing:</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((line) => (
              <div key={line} className="border-b-2 border-gray-300 h-16"></div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 Rocket JLPT - Master Japanese with confidence</p>
        </div>
      </div>

      {/* Page 2: Dakuten & Handakuten */}
      <div className="w-full min-h-screen bg-white p-8 page-break">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="font-light">Rocket</span>
                <span className="font-black ml-2">JLPT</span>
              </h1>
              <p className="text-lg">Katakana Practice Sheet</p>
            </div>
            <div className="text-right">
              <p className="text-sm">www.rocketjlpt.com</p>
            </div>
          </div>
        </div>

        {/* Dakuten Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-pink-500 pb-2">
            Dakuten & Handakuten (25 characters)
          </h2>
          <div className="grid grid-cols-10 gap-2">
            {dakutenKatakana.map(([char, romaji], index) => (
              <div key={index} className="border-2 border-gray-300 rounded aspect-square flex flex-col items-center justify-center p-2">
                <div className="text-4xl text-gray-300 font-bold mb-1">{char}</div>
                <div className="text-xs text-gray-500">{romaji}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Lines */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Practice Writing:</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((line) => (
              <div key={line} className="border-b-2 border-gray-300 h-16"></div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 Rocket JLPT - Master Japanese with confidence</p>
        </div>
      </div>

      {/* Page 3: Combination Characters */}
      <div className="w-full min-h-screen bg-white p-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="font-light">Rocket</span>
                <span className="font-black ml-2">JLPT</span>
              </h1>
              <p className="text-lg">Katakana Practice Sheet</p>
            </div>
            <div className="text-right">
              <p className="text-sm">www.rocketjlpt.com</p>
            </div>
          </div>
        </div>

        {/* Combination Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-pink-500 pb-2">
            Combination Characters (33 characters)
          </h2>
          <div className="grid grid-cols-10 gap-2">
            {combinationKatakana.map(([char, romaji], index) => (
              <div key={index} className="border-2 border-gray-300 rounded aspect-square flex flex-col items-center justify-center p-2">
                <div className="text-3xl text-gray-300 font-bold mb-1">{char}</div>
                <div className="text-xs text-gray-500">{romaji}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Lines */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Practice Writing:</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((line) => (
              <div key={line} className="border-b-2 border-gray-300 h-16"></div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 Rocket JLPT - Master Japanese with confidence</p>
        </div>
      </div>
    </>
  );
}
