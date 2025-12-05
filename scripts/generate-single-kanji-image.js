const fs = require('fs');
const https = require('https');
const { createCanvas, loadImage } = require('canvas');

// Configuration
const KANJI = '水'; // Test kanji
const MEANING = 'water'; // Kanji meaning
const CODE_POINT = KANJI.codePointAt(0).toString(16).padStart(5, '0');
const SVG_URL = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${CODE_POINT}.svg`;
const OUTPUT_PATH = `./public/images/kanji/${CODE_POINT}.png`;
const PINK_COLOR = '#ec4899';
const STROKE_WIDTH = 4; // Bolder strokes (default is ~2)

async function generateKanjiImage() {
  console.log(`Generating image for kanji: ${KANJI} (${MEANING})`);
  console.log(`Code point: ${CODE_POINT}`);
  console.log(`Fetching SVG from: ${SVG_URL}`);

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

  // Modify SVG: make strokes bolder and numbers pink
  let modifiedSvg = svgData
    // Make strokes bolder
    .replace(/stroke-width="[^"]*"/g, `stroke-width="${STROKE_WIDTH}"`)
    // Make stroke numbers pink
    .replace(/(<text[^>]*>)/g, `$1<tspan fill="${PINK_COLOR}">`)
    .replace(/<\/text>/g, '</tspan></text>');

  // Create canvas (larger to fit logo and text)
  const canvas = createCanvas(400, 500);
  const ctx = canvas.getContext('2d');

  // White background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 400, 500);

  // Draw SVG (we'll use a workaround since canvas doesn't support SVG directly)
  // For now, let's create a placeholder and add text/logo
  
  // Draw kanji character large in center (placeholder for SVG)
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 200px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(KANJI, 200, 200);

  // Draw meaning at bottom
  ctx.fillStyle = '#6b7280';
  ctx.font = '24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(MEANING.toUpperCase(), 200, 450);

  // Try to load and draw logo
  try {
    const logo = await loadImage('./public/favicon.png');
    ctx.drawImage(logo, 10, 10, 40, 40);
    
    // Add "JLPT Rocket" text next to logo
    ctx.fillStyle = PINK_COLOR;
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('JLPT Rocket', 60, 30);
  } catch (err) {
    console.log('Could not load logo:', err.message);
  }

  // Save to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(OUTPUT_PATH, buffer);
  
  console.log(`✅ Image saved to: ${OUTPUT_PATH}`);
  console.log(`\nTo view: open ${OUTPUT_PATH}`);
}

generateKanjiImage().catch(console.error);
