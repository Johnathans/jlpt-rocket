const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const types = ['hiragana', 'katakana'];

async function generatePreview(type) {
  console.log(`\n📸 Generating preview for ${type}...`);
  
  try {
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

    // Navigate to the API endpoint to get the HTML
    await page.goto(`http://localhost:3000/api/generate-pdf/${type}`, {
      waitUntil: 'networkidle0'
    });

    // Wait a bit for rendering
    await page.waitForTimeout(1000);

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
