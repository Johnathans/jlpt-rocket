/**
 * Hiragana/Katakana Practice Sheet HTML Template
 * Generates HTML for PDF conversion with Puppeteer
 */

export function generateKanaPracticeHTML(type = 'hiragana') {
  const isHiragana = type === 'hiragana';
  const title = isHiragana ? 'HIRAGANA' : 'KATAKANA';
  const description = isHiragana ? 'Master all 46 basic hiragana characters' : 'Master all 46 basic katakana characters';
  
  // Basic kana (46 characters)
  const basicKana = isHiragana ? [
    ['あ', 'a'], ['い', 'i'], ['う', 'u'], ['え', 'e'], ['お', 'o'],
    ['か', 'ka'], ['き', 'ki'], ['く', 'ku'], ['け', 'ke'], ['こ', 'ko'],
    ['さ', 'sa'], ['し', 'shi'], ['す', 'su'], ['せ', 'se'], ['そ', 'so'],
    ['た', 'ta'], ['ち', 'chi'], ['つ', 'tsu'], ['て', 'te'], ['と', 'to'],
    ['な', 'na'], ['に', 'ni'], ['ぬ', 'nu'], ['ね', 'ne'], ['の', 'no'],
    ['は', 'ha'], ['ひ', 'hi'], ['ふ', 'fu'], ['へ', 'he'], ['ほ', 'ho'],
    ['ま', 'ma'], ['み', 'mi'], ['む', 'mu'], ['め', 'me'], ['も', 'mo'],
    ['や', 'ya'], ['ゆ', 'yu'], ['よ', 'yo'],
    ['ら', 'ra'], ['り', 'ri'], ['る', 'ru'], ['れ', 're'], ['ろ', 'ro'],
    ['わ', 'wa'], ['を', 'wo'], ['ん', 'n']
  ] : [
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

  // Dakuten/Handakuten (25 characters)
  const dakutenKana = isHiragana ? [
    ['が', 'ga'], ['ぎ', 'gi'], ['ぐ', 'gu'], ['げ', 'ge'], ['ご', 'go'],
    ['ざ', 'za'], ['じ', 'ji'], ['ず', 'zu'], ['ぜ', 'ze'], ['ぞ', 'zo'],
    ['だ', 'da'], ['ぢ', 'ji'], ['づ', 'zu'], ['で', 'de'], ['ど', 'do'],
    ['ば', 'ba'], ['び', 'bi'], ['ぶ', 'bu'], ['べ', 'be'], ['ぼ', 'bo'],
    ['ぱ', 'pa'], ['ぴ', 'pi'], ['ぷ', 'pu'], ['ぺ', 'pe'], ['ぽ', 'po']
  ] : [
    ['ガ', 'ga'], ['ギ', 'gi'], ['グ', 'gu'], ['ゲ', 'ge'], ['ゴ', 'go'],
    ['ザ', 'za'], ['ジ', 'ji'], ['ズ', 'zu'], ['ゼ', 'ze'], ['ゾ', 'zo'],
    ['ダ', 'da'], ['ヂ', 'ji'], ['ヅ', 'zu'], ['デ', 'de'], ['ド', 'do'],
    ['バ', 'ba'], ['ビ', 'bi'], ['ブ', 'bu'], ['ベ', 'be'], ['ボ', 'bo'],
    ['パ', 'pa'], ['ピ', 'pi'], ['プ', 'pu'], ['ペ', 'pe'], ['ポ', 'po']
  ];

  // Combination characters (33 characters)
  const combinationKana = isHiragana ? [
    ['きゃ', 'kya'], ['きゅ', 'kyu'], ['きょ', 'kyo'],
    ['しゃ', 'sha'], ['しゅ', 'shu'], ['しょ', 'sho'],
    ['ちゃ', 'cha'], ['ちゅ', 'chu'], ['ちょ', 'cho'],
    ['にゃ', 'nya'], ['にゅ', 'nyu'], ['にょ', 'nyo'],
    ['ひゃ', 'hya'], ['ひゅ', 'hyu'], ['ひょ', 'hyo'],
    ['みゃ', 'mya'], ['みゅ', 'myu'], ['みょ', 'myo'],
    ['りゃ', 'rya'], ['りゅ', 'ryu'], ['りょ', 'ryo'],
    ['ぎゃ', 'gya'], ['ぎゅ', 'gyu'], ['ぎょ', 'gyo'],
    ['じゃ', 'ja'], ['じゅ', 'ju'], ['じょ', 'jo'],
    ['びゃ', 'bya'], ['びゅ', 'byu'], ['びょ', 'byo'],
    ['ぴゃ', 'pya'], ['ぴゅ', 'pyu'], ['ぴょ', 'pyo']
  ] : [
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

  const allKana = [...basicKana, ...dakutenKana, ...combinationKana];
  const kanaPerPage = 2; // 2 characters per page, same as kanji
  const pages = [];
  
  for (let i = 0; i < allKana.length; i += kanaPerPage) {
    pages.push(allKana.slice(i, i + kanaPerPage));
  }

  return `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} Practice Sheet - Rocket JLPT</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Noto Sans JP', sans-serif;
            background: white;
            color: #000;
        }
        
        .page {
            width: 210mm;
            height: 297mm;
            padding: 15mm;
            page-break-after: always;
            position: relative;
        }
        
        .header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 15px;
        }
        
        .rocket-icon {
            width: 24px;
            height: 24px;
            color: #ec4899;
        }
        
        .logo-text {
            font-size: 22px;
            color: #111827;
        }
        
        .logo-light {
            font-weight: 300;
        }
        
        .logo-bold {
            font-weight: 900;
            margin-left: 4px;
        }
        
        .title {
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 5px;
        }
        
        .subtitle {
            font-size: 12px;
            color: #666;
            margin-bottom: 15px;
        }
        
        .instructions {
            font-size: 10px;
            margin-bottom: 15px;
            line-height: 1.4;
            background: #f9fafb;
            padding: 10px;
            border-radius: 5px;
        }
        
        .instructions ol {
            margin-left: 18px;
        }
        
        .kana-grid {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .kana-row {
            border: 2px solid #000;
            border-radius: 8px;
            padding: 16px;
            background: white;
        }
        
        .kana-header {
            display: flex;
            align-items: stretch;
            gap: 20px;
            margin-bottom: 16px;
            padding-bottom: 12px;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .kana-character {
            font-size: 72px;
            font-weight: 900;
            line-height: 1;
            min-width: 90px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .kana-info {
            flex: 1;
            font-size: 13px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .kana-romaji {
            font-weight: 700;
            font-size: 16px;
            margin-bottom: 6px;
        }
        
        .practice-section {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .practice-label {
            font-size: 11px;
            color: #666;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .practice-boxes {
            display: grid;
            grid-template-columns: repeat(10, 1fr);
            gap: 6px;
        }
        
        .practice-box {
            border: 2px solid #ddd;
            aspect-ratio: 1;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            font-weight: 400;
            color: #e0e0e0;
        }
        
        .practice-box.guide {
            color: #000;
            font-weight: 900;
            border-color: #000;
            border-width: 2.5px;
        }
        
        .practice-box.trace {
            color: #d1d5db;
            font-weight: 700;
        }
        
        .page-number {
            position: absolute;
            bottom: 10mm;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 10px;
            color: #666;
        }
        
        @media print {
            .page {
                margin: 0;
                page-break-after: always;
            }
        }
    </style>
</head>
<body>
${pages.map((pageKana, pageIndex) => `
    <div class="page">
        <div class="header">
            <svg class="rocket-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4.5 16.5c-1.5 1.25-2 5-2 5s3.75-.5 5-2c.625-.625 1-1.5 1-2.5a2.5 2.5 0 0 0-4-2z"/>
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
            </svg>
            <div class="logo-text">
                <span class="logo-light">Rocket</span><span class="logo-bold">JLPT</span>
            </div>
        </div>
        
        <div class="title">${title} PRACTICE SHEET</div>
        <div class="subtitle">${description}</div>
        
        ${pageIndex === 0 ? `
        <div class="instructions">
            <strong>INSTRUCTIONS:</strong>
            <ol>
                <li>Study each ${type} character and its romaji pronunciation.</li>
                <li>Trace the character in the light gray boxes, then practice writing freely in the empty boxes.</li>
                <li>Focus on proper stroke order and character proportions.</li>
            </ol>
        </div>
        ` : ''}
        
        <div class="kana-grid">
            ${pageKana.map(([char, romaji]) => `
            <div class="kana-row">
                <div class="kana-header">
                    <div class="kana-character">${char}</div>
                    <div class="kana-info">
                        <div class="kana-romaji">${romaji}</div>
                    </div>
                </div>
                <div class="practice-section">
                    <div class="practice-label">Trace (なぞる)</div>
                    <div class="practice-boxes">
                        <div class="practice-box guide">${char}</div>
                        <div class="practice-box trace">${char}</div>
                        <div class="practice-box trace">${char}</div>
                        <div class="practice-box trace">${char}</div>
                        <div class="practice-box trace">${char}</div>
                        <div class="practice-box trace">${char}</div>
                        <div class="practice-box trace">${char}</div>
                        <div class="practice-box trace">${char}</div>
                        <div class="practice-box trace">${char}</div>
                        <div class="practice-box trace">${char}</div>
                    </div>
                </div>
                <div class="practice-section">
                    <div class="practice-label">Practice (れんしゅう)</div>
                    <div class="practice-boxes">
                        <div class="practice-box"></div>
                        <div class="practice-box"></div>
                        <div class="practice-box"></div>
                        <div class="practice-box"></div>
                        <div class="practice-box"></div>
                        <div class="practice-box"></div>
                        <div class="practice-box"></div>
                        <div class="practice-box"></div>
                        <div class="practice-box"></div>
                        <div class="practice-box"></div>
                    </div>
                </div>
            </div>
            `).join('')}
        </div>
        
        <div class="page-number">Page ${pageIndex + 1} of ${pages.length} | RocketJLPT.com</div>
    </div>
`).join('')}
</body>
</html>
  `;
}
