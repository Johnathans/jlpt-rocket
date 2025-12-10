const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const levels = ['n5', 'n4', 'n3', 'n2', 'n1'];

async function generatePreview(level) {
  console.log(`📸 Generating preview for ${level.toUpperCase()}...`);
  
  const pdfPath = path.join(__dirname, `../public/worksheets/${level}-kanji-practice-sheet.pdf`);
  const outputPath = path.join(__dirname, `../public/worksheets/${level}-kanji-preview.png`);
  
  if (!fs.existsSync(pdfPath)) {
    console.log(`⚠️  PDF not found: ${pdfPath}`);
    return;
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Set viewport for consistent preview size
  await page.setViewport({
    width: 800,
    height: 1132, // A4 aspect ratio at 800px width
    deviceScaleFactor: 2, // High DPI for crisp image
  });

  // Navigate to the PDF
  await page.goto(`file://${pdfPath}`, {
    waitUntil: 'networkidle0'
  });

  // Wait a bit for PDF to fully render
  await page.waitForTimeout(1000);

  // Take screenshot of the first page
  await page.screenshot({
    path: outputPath,
    type: 'png',
    clip: {
      x: 0,
      y: 0,
      width: 800,
      height: 1132
    }
  });

  await browser.close();

  const stats = fs.statSync(outputPath);
  console.log(`✅ ${level.toUpperCase()} preview saved: ${(stats.size / 1024).toFixed(2)} KB`);
}

async function generateAllPreviews() {
  console.log('🚀 Generating preview images for all kanji practice sheets...\n');
  
  for (const level of levels) {
    try {
      await generatePreview(level);
    } catch (error) {
      console.error(`❌ Error generating ${level} preview:`, error.message);
    }
  }
  
  console.log('\n✅ All preview images generated!');
  console.log('📁 Images saved to: public/worksheets/');
}

generateAllPreviews().catch(console.error);
