const fs = require('fs');
const https = require('https');
const puppeteer = require('puppeteer');

// Configuration
const KANJI = '水'; // Test kanji
const MEANING = 'water'; // Kanji meaning
const ROMAJI = 'mizu'; // Romaji pronunciation
const CODE_POINT = KANJI.codePointAt(0).toString(16).padStart(5, '0');
const SVG_URL = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${CODE_POINT}.svg`;
const OUTPUT_PATH = `./public/images/kanji/${CODE_POINT}-final.png`;
const PINK_COLOR = '#ec4899';
const STROKE_WIDTH = 4; // Thicker strokes

async function generateKanjiWithPuppeteer() {
  console.log(`\n🎨 Generating styled image for kanji: ${KANJI} (${MEANING})`);
  console.log(`Code point: ${CODE_POINT}`);
  console.log(`Fetching SVG from: ${SVG_URL}\n`);

  // Create output directory
  const dir = './public/images/kanji';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Fetch SVG from KanjiVG
  const svgData = await new Promise((resolve, reject) => {
    https.get(SVG_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });

  console.log('✓ SVG fetched successfully');

  // Modify SVG: make strokes bolder and numbers pink
  let modifiedSvg = svgData
    // Remove XML comments, DOCTYPE, and any stray characters
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\?xml[^>]*\?>/g, '')
    .replace(/<!DOCTYPE[^>]*>/g, '')
    .replace(/]>/g, '') // Remove stray "]>" characters
    // Remove any text elements that aren't stroke numbers (like the "]>" symbol)
    .replace(/<text[^>]*>(?![\d])[^<]*<\/text>/g, '')
    // Make all strokes bolder
    .replace(/stroke-width="[^"]*"/g, `stroke-width="${STROKE_WIDTH}"`)
    // Make stroke order numbers pink
    .replace(/<text/g, `<text fill="${PINK_COLOR}" font-weight="bold"`);

  console.log('✓ SVG styled (bolder strokes + pink numbers)');

  // Launch browser
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Set viewport
  await page.setViewport({ width: 400, height: 500, deviceScaleFactor: 2 });

  // We'll use Lucide Rocket icon inline (same as navbar)

  // Create HTML with styled SVG, logo, and meaning
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          margin: 0;
          padding: 0;
          width: 400px;
          height: 500px;
          background: white;
          font-family: Arial, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .svg-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding-top: 30px;
        }
        .svg-container svg {
          width: 300px;
          height: 300px;
        }
        .meaning {
          font-size: 28px;
          color: #000000;
          font-weight: 900;
          padding: 15px 20px;
          text-transform: capitalize;
          letter-spacing: 0.5px;
        }
        .meaning-text {
          font-weight: 900;
        }
        .romaji {
          font-weight: 400;
          color: #6b7280;
          margin-left: 8px;
        }
        .footer {
          width: 100%;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .logo {
          width: 20px;
          height: 20px;
          color: ${PINK_COLOR};
        }
        .brand {
          font-size: 16px;
          color: #111827;
        }
        .brand-light {
          font-weight: 300;
        }
        .brand-bold {
          font-weight: 900;
          margin-left: 4px;
        }
      </style>
    </head>
    <body>
      <div class="svg-container">
        ${modifiedSvg}
      </div>
      <div class="meaning"><span class="meaning-text">${MEANING}</span><span class="romaji">(${ROMAJI})</span></div>
      <div class="footer">
        <!-- Lucide Rocket icon (same as navbar) -->
        <svg class="logo" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
        </svg>
        <div class="brand">
          <span class="brand-light">Rocket</span><span class="brand-bold">JLPT</span>
        </div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(html);
  console.log('✓ HTML rendered in browser');

  // Take screenshot
  await page.screenshot({ 
    path: OUTPUT_PATH,
    type: 'png',
    omitBackground: false
  });

  await browser.close();

  console.log(`\n✅ Styled image saved to: ${OUTPUT_PATH}`);
  console.log(`\n👀 To view: open ${OUTPUT_PATH}\n`);
}

generateKanjiWithPuppeteer().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
