const fs = require('fs');
const https = require('https');
const puppeteer = require('puppeteer');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const PINK_COLOR = '#ec4899';
const STROKE_WIDTH = 4;

// Fetch SVG from KanjiVG
async function fetchSVG(codePoint) {
  const svgUrl = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${codePoint}.svg`;
  
  return new Promise((resolve, reject) => {
    https.get(svgUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Generate a single kanji image
async function generateKanjiImage(browser, kanji, meaning, romaji, outputPath) {
  const codePoint = kanji.codePointAt(0).toString(16).padStart(5, '0');
  
  try {
    // Fetch SVG
    const svgData = await fetchSVG(codePoint);
    
    // Modify SVG: make strokes bolder and numbers pink
    let modifiedSvg = svgData
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<\?xml[^>]*\?>/g, '')
      .replace(/<!DOCTYPE[^>]*>/g, '')
      .replace(/]>/g, '')
      .replace(/<text[^>]*>(?![\d])[^<]*<\/text>/g, '')
      .replace(/stroke-width="[^"]*"/g, `stroke-width="${STROKE_WIDTH}"`)
      .replace(/<text/g, `<text fill="${PINK_COLOR}" font-weight="bold"`);

    // Create page
    const page = await browser.newPage();
    await page.setViewport({ width: 400, height: 500, deviceScaleFactor: 2 });

    // Create HTML
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
        <div class="meaning"><span class="meaning-text">${meaning}</span><span class="romaji">(${romaji})</span></div>
        <div class="footer">
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
    await page.screenshot({ 
      path: outputPath,
      type: 'png',
      omitBackground: false
    });

    await page.close();
    return true;
  } catch (error) {
    console.error(`  ❌ Error generating ${kanji}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('\n🎨 Starting N1 Kanji Image Generation\n');

  // Create output directory
  const outputDir = './public/images/kanji';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Fetch N1 kanji from Supabase (fetch all with pagination)
  console.log('📥 Fetching N1 kanji from database...');
  
  let kanjiList = [];
  let page = 0;
  let hasMore = true;
  const pageSize = 1000;
  
  while (hasMore) {
    const { data, error } = await supabase
      .from('kanji')
      .select('character, meaning, kun_reading, on_reading')
      .eq('jlpt_level', 'N1')
      .order('frequency_rank', { ascending: true })
      .range(page * pageSize, (page + 1) * pageSize - 1);
    
    if (error) {
      console.error('❌ Error fetching kanji:', error);
      process.exit(1);
    }
    
    if (data && data.length > 0) {
      kanjiList = [...kanjiList, ...data];
      hasMore = data.length === pageSize;
      page++;
    } else {
      hasMore = false;
    }
  }

  if (error) {
    console.error('❌ Error fetching kanji:', error);
    process.exit(1);
  }

  console.log(`✓ Found ${kanjiList.length} N1 kanji\n`);

  // Launch browser once for all images
  console.log('🚀 Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  console.log('✓ Browser ready\n');

  let successCount = 0;
  let failCount = 0;

  // Generate images
  for (let i = 0; i < kanjiList.length; i++) {
    const kanji = kanjiList[i];
    
    // Get romaji reading (prefer kun reading, fallback to on reading)
    let romaji = '';
    if (kanji.kun_reading && kanji.kun_reading.length > 0) {
      romaji = kanji.kun_reading[0].replace(/\./g, ''); // Remove dots from kun reading
    } else if (kanji.on_reading && kanji.on_reading.length > 0) {
      romaji = kanji.on_reading[0];
    }

    // Get first meaning and sanitize for filename
    const meaning = kanji.meaning.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-');
    
    // Create descriptive filename
    const descriptiveFilename = `kanji-${kanji.character}-${romaji}-${meaning}-stroke-order.png`;
    const outputPath = `${outputDir}/${descriptiveFilename}`;

    console.log(`[${i + 1}/${kanjiList.length}] Generating ${kanji.character} (${meaning})...`);

    const success = await generateKanjiImage(
      browser,
      kanji.character,
      meaning,
      romaji,
      outputPath
    );

    if (success) {
      successCount++;
      console.log(`  ✓ Saved to ${outputPath}`);
    } else {
      failCount++;
    }
  }

  await browser.close();

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Generation complete!`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Failed: ${failCount}`);
  console.log(`   Total: ${kanjiList.length}`);
  console.log('='.repeat(50) + '\n');
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
