require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function generateN5KanjiPDF() {
  console.log('📚 Fetching N5 kanji from database...');
  
  // Fetch all N5 kanji
  const { data: kanji, error } = await supabase
    .from('kanji')
    .select('*')
    .eq('jlpt_level', 'N5')
    .order('frequency_rank', { ascending: true });

  if (error) {
    console.error('❌ Error fetching kanji:', error);
    process.exit(1);
  }

  console.log(`✅ Fetched ${kanji.length} N5 kanji`);

  // Generate HTML
  const html = generateHTML(kanji);

  // Write to public directory
  const outputPath = path.join(__dirname, '../public/n5-kanji-practice-sheet.html');
  fs.writeFileSync(outputPath, html, 'utf8');

  console.log(`✅ Generated PDF at: ${outputPath}`);
  console.log('📄 Open the file in a browser and print to PDF (Cmd+P)');
}

function generateHTML(kanjiList) {
  // Group kanji into pages (12 per page for good spacing)
  const kanjiPerPage = 12;
  const pages = [];
  
  for (let i = 0; i < kanjiList.length; i += kanjiPerPage) {
    pages.push(kanjiList.slice(i, i + kanjiPerPage));
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>N5 Kanji Practice Sheet - Rocket JLPT</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Noto Sans JP', sans-serif;
            background: white;
            color: #000;
            padding: 20px;
        }
        
        .page {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto 20px;
            background: white;
            padding: 15mm;
            page-break-after: always;
        }
        
        .header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .rocket-icon {
            width: 30px;
            height: 30px;
            fill: #ec4899;
        }
        
        .logo-text {
            font-size: 22px;
            font-weight: 300;
            color: #000;
        }
        
        .logo-text strong {
            font-weight: 900;
            margin-left: 2px;
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
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            margin-bottom: 10px;
        }
        
        .kanji-card {
            border: 2px solid #000;
            border-radius: 8px;
            padding: 8px;
            background: white;
        }
        
        .kanji-main {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 8px;
        }
        
        .kanji-character {
            font-size: 48px;
            font-weight: 900;
            line-height: 1;
            min-width: 60px;
            text-align: center;
        }
        
        .kanji-info {
            flex: 1;
            font-size: 10px;
        }
        
        .kanji-meaning {
            font-weight: 700;
            font-size: 11px;
            margin-bottom: 3px;
        }
        
        .kanji-readings {
            color: #666;
            line-height: 1.3;
        }
        
        .practice-boxes {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 4px;
        }
        
        .practice-box {
            border: 1.5px solid #ddd;
            aspect-ratio: 1;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: 400;
            color: #e0e0e0;
        }
        
        .practice-box:first-child {
            color: #000;
            font-weight: 700;
            border-color: #000;
        }
        
        .page-number {
            text-align: center;
            font-size: 10px;
            color: #666;
            margin-top: 10px;
        }
        
        @media print {
            body {
                padding: 0;
            }
            
            .page {
                margin: 0;
                page-break-after: always;
            }
            
            @page {
                size: A4;
                margin: 0;
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
            <div class="logo-text">Rocket<strong>JLPT</strong></div>
        </div>
        
        <div class="title">N5 KANJI PRACTICE SHEET</div>
        <div class="subtitle">79 Essential Kanji for JLPT N5</div>
        
        ${pageIndex === 0 ? `
        <div class="instructions">
            <strong>INSTRUCTIONS:</strong>
            <ol>
                <li>Study each kanji character, its meaning, and readings (on'yomi in katakana, kun'yomi in hiragana).</li>
                <li>Practice writing each kanji in the boxes provided. The first box shows the character as a guide.</li>
                <li>Focus on stroke order and proper proportions for each character.</li>
            </ol>
        </div>
        ` : ''}
        
        <div class="kanji-grid">
            ${pageKanji.map(k => `
            <div class="kanji-card">
                <div class="kanji-main">
                    <div class="kanji-character">${k.character}</div>
                    <div class="kanji-info">
                        <div class="kanji-meaning">${k.meaning}</div>
                        <div class="kanji-readings">
                            ${k.on_reading && k.on_reading.length > 0 ? `<div>音: ${k.on_reading.join(', ')}</div>` : ''}
                            ${k.kun_reading && k.kun_reading.length > 0 ? `<div>訓: ${k.kun_reading.join(', ')}</div>` : ''}
                            <div>画数: ${k.stroke_count}</div>
                        </div>
                    </div>
                </div>
                <div class="practice-boxes">
                    <div class="practice-box">${k.character}</div>
                    <div class="practice-box">${k.character}</div>
                    <div class="practice-box"></div>
                    <div class="practice-box"></div>
                    <div class="practice-box"></div>
                </div>
            </div>
            `).join('')}
        </div>
        
        <div class="page-number">Page ${pageIndex + 1} of ${pages.length} | RocketJLPT.com</div>
    </div>
`).join('')}
</body>
</html>`;
}

generateN5KanjiPDF().catch(console.error);
