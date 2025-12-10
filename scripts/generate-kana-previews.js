const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Import template
const templatePath = path.join(__dirname, '../lib/pdf-templates/kana-practice-template.js');
const templateCode = fs.readFileSync(templatePath, 'utf8');

// Extract and evaluate the function
const functionMatch = templateCode.match(/export function generateKanaPracticeHTML\([\s\S]*?\n\}/);
if (!functionMatch) {
  console.error('Could not extract function from template');
  process.exit(1);
}

const generateKanaPracticeHTML = eval(`(${functionMatch[0].replace('export function ', 'function ')}); generateKanaPracticeHTML`);

const types = ['hiragana', 'katakana'];

async function generatePreview(type) {
  console.log(`\n📸 Generating preview for ${type}...`);
  
  try {
    // Generate HTML
    const html = generateKanaPracticeHTML(type);

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set viewport for preview (A4 aspect ratio)
    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 2,
    });

    // Set content and wait for images to load
    await page.setContent(html, {
      waitUntil: 'networkidle0'
    });

    // Take screenshot
    const outputPath = path.join(__dirname, `../public/worksheets/${type}-preview.png`);
    
    await page.screenshot({
      path: outputPath,
      type: 'png',
      fullPage: false,
    });

    await browser.close();

    const stats = fs.statSync(outputPath);
    console.log(`✅ ${type} preview saved: ${(stats.size / 1024).toFixed(2)} KB`);

  } catch (error) {
    console.error(`❌ Error generating ${type} preview:`, error.message);
  }
}

async function generateAllPreviews() {
  console.log('🚀 Generating preview images for kana practice sheets...');
  
  for (const type of types) {
    await generatePreview(type);
  }

  console.log('\n✅ All preview images generated!');
  console.log('📁 Images saved to: public/worksheets/');
}

generateAllPreviews().catch(console.error);
