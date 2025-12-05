const fs = require('fs');
const https = require('https');
const sharp = require('sharp');
const svg2img = require('svg2img');

// Configuration
const KANJI = '水'; // Test kanji
const MEANING = 'water'; // Kanji meaning
const CODE_POINT = KANJI.codePointAt(0).toString(16).padStart(5, '0');
const SVG_URL = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${CODE_POINT}.svg`;
const OUTPUT_PATH = `./public/images/kanji/${CODE_POINT}-styled.png`;
const PINK_COLOR = '#ec4899';
const STROKE_WIDTH = 3; // Bolder strokes

async function generateStyledKanjiImage() {
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
    // Make all strokes bolder
    .replace(/stroke-width="[^"]*"/g, `stroke-width="${STROKE_WIDTH}"`)
    // Make stroke order numbers pink (they're in <text> tags)
    .replace(/<text([^>]*)>/g, `<text$1 fill="${PINK_COLOR}" font-weight="bold">`)
    // Update existing width/height or add if missing
    .replace(/width="[^"]*"/, 'width="300"')
    .replace(/height="[^"]*"/, 'height="300"');

  console.log('✓ SVG styled (bolder strokes + pink numbers)');

  // Convert SVG to PNG
  const svgBuffer = await new Promise((resolve, reject) => {
    svg2img(modifiedSvg, { width: 300, height: 300 }, (error, buffer) => {
      if (error) reject(error);
      else resolve(buffer);
    });
  });

  console.log('✓ SVG converted to PNG');

  // Load logo
  const logoBuffer = fs.readFileSync('./public/favicon.png');

  // Create composite image with logo and meaning text
  const finalImage = await sharp(svgBuffer)
    .resize(300, 300, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .extend({
      top: 60,
      bottom: 80,
      left: 20,
      right: 20,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .composite([
      {
        input: await sharp(logoBuffer).resize(40, 40).toBuffer(),
        top: 10,
        left: 20
      }
    ])
    .toBuffer();

  console.log('✓ Logo added');

  // Add text using SVG overlay (for "JLPT Rocket" and meaning)
  const textSvg = `
    <svg width="340" height="440">
      <text x="70" y="35" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="${PINK_COLOR}">JLPT Rocket</text>
      <text x="170" y="420" font-family="Arial, sans-serif" font-size="24" fill="#6b7280" text-anchor="middle">${MEANING.toUpperCase()}</text>
    </svg>
  `;

  const finalWithText = await sharp(finalImage)
    .composite([
      {
        input: Buffer.from(textSvg),
        top: 0,
        left: 0
      }
    ])
    .png()
    .toFile(OUTPUT_PATH);

  console.log(`\n✅ Styled image saved to: ${OUTPUT_PATH}`);
  console.log(`📏 Dimensions: ${finalWithText.width}x${finalWithText.height}px`);
  console.log(`\n👀 To view: open ${OUTPUT_PATH}\n`);
}

generateStyledKanjiImage().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
