/**
 * JLPT Kanji Practice Sheet HTML Template
 * Generates HTML for PDF conversion with Puppeteer
 * Works for all JLPT levels (N5-N1)
 */

// Helper function to get KanjiVG Unicode hex
function getKanjiVGCode(character) {
  const code = character.charCodeAt(0).toString(16).padStart(5, '0');
  return code;
}

export function generateKanjiPracticeHTML(kanjiData, level = 'N5') {
  const kanjiPerPage = 2; // Two kanji per page for better spacing
  const pages = [];
  
  for (let i = 0; i < kanjiData.length; i += kanjiPerPage) {
    pages.push(kanjiData.slice(i, i + kanjiPerPage));
  }
  
  const levelInfo = {
    'N5': { count: '~80', description: 'Basic' },
    'N4': { count: '~170', description: 'Elementary' },
    'N3': { count: '~370', description: 'Intermediate' },
    'N2': { count: '~370', description: 'Advanced' },
    'N1': { count: '~1,200', description: 'Expert' }
  };

  return `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${level} Kanji Practice Sheet - Rocket JLPT</title>
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
        
        .kanji-grid {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .kanji-row {
            border: 2px solid #000;
            border-radius: 8px;
            padding: 16px;
            background: white;
        }
        
        .kanji-header {
            display: flex;
            align-items: stretch;
            gap: 20px;
            margin-bottom: 16px;
            padding-bottom: 12px;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .kanji-character {
            font-size: 72px;
            font-weight: 900;
            line-height: 1;
            min-width: 90px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .kanji-info {
            flex: 1;
            font-size: 13px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .kanji-meaning {
            font-weight: 700;
            font-size: 16px;
            margin-bottom: 6px;
        }
        
        .kanji-readings {
            color: #666;
            line-height: 1.5;
        }
        
        .stroke-order {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-width: 120px;
            border-left: 1px solid #e5e7eb;
            padding-left: 15px;
        }
        
        .stroke-order-title {
            font-size: 10px;
            font-weight: 600;
            color: #666;
            text-transform: uppercase;
            margin-bottom: 8px;
        }
        
        .stroke-order-svg {
            width: 100px;
            height: 100px;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px;
        }
        
        .stroke-order-svg img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        
        .stroke-count-label {
            font-size: 11px;
            color: #666;
            margin-top: 6px;
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
${pages.map((pageKanji, pageIndex) => `
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
        
        <div class="title">${level} KANJI PRACTICE SHEET</div>
        <div class="subtitle">${levelInfo[level].count} ${levelInfo[level].description} Kanji for JLPT ${level}</div>
        
        ${pageIndex === 0 ? `
        <div class="instructions">
            <strong>INSTRUCTIONS:</strong>
            <ol>
                <li>Study each kanji character, its meaning, and readings (on'yomi in katakana, kun'yomi in hiragana).</li>
                <li>Trace the kanji in the light gray boxes, then practice writing freely in the empty boxes.</li>
                <li>Focus on stroke order and proper proportions for each character.</li>
            </ol>
        </div>
        ` : ''}
        
        <div class="kanji-grid">
            ${pageKanji.map(k => `
            <div class="kanji-row">
                <div class="kanji-header">
                    <div class="kanji-character">${k.character}</div>
                    <div class="kanji-info">
                        <div class="kanji-meaning">${k.meaning}</div>
                        <div class="kanji-readings">
                            ${k.on_reading && k.on_reading.length > 0 ? `<div>音: ${k.on_reading.join(', ')}</div>` : ''}
                            ${k.kun_reading && k.kun_reading.length > 0 ? `<div>訓: ${k.kun_reading.join(', ')}</div>` : ''}
                        </div>
                    </div>
                    <div class="stroke-order">
                        <div class="stroke-order-title">Stroke Order</div>
                        <div class="stroke-order-svg">
                            <img src="https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${getKanjiVGCode(k.character)}.svg" alt="Stroke order for ${k.character}" />
                        </div>
                        <div class="stroke-count-label">${k.stroke_count} stroke${k.stroke_count !== 1 ? 's' : ''}</div>
                    </div>
                </div>
                <div class="practice-section">
                    <div class="practice-label">Trace (なぞる)</div>
                    <div class="practice-boxes">
                        <div class="practice-box guide">${k.character}</div>
                        <div class="practice-box trace">${k.character}</div>
                        <div class="practice-box trace">${k.character}</div>
                        <div class="practice-box trace">${k.character}</div>
                        <div class="practice-box trace">${k.character}</div>
                        <div class="practice-box trace">${k.character}</div>
                        <div class="practice-box trace">${k.character}</div>
                        <div class="practice-box trace">${k.character}</div>
                        <div class="practice-box trace">${k.character}</div>
                        <div class="practice-box trace">${k.character}</div>
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
