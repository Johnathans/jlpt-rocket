const fs = require('fs');
const path = require('path');
const http = require('http');

const BASE_URL = 'http://localhost:3000';
const levels = ['n5', 'n4', 'n3', 'n2', 'n1'];

// Create worksheets directory if it doesn't exist
const worksheetsDir = path.join(__dirname, '../public/worksheets');
if (!fs.existsSync(worksheetsDir)) {
  fs.mkdirSync(worksheetsDir, { recursive: true });
}

async function downloadPDF(level) {
  return new Promise((resolve, reject) => {
    const url = `${BASE_URL}/api/generate-pdf/${level}-kanji`;
    const outputPath = path.join(worksheetsDir, `${level}-kanji-practice-sheet.pdf`);
    
    console.log(`📥 Downloading ${level.toUpperCase()} kanji PDF...`);
    
    http.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${level}: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(outputPath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        const stats = fs.statSync(outputPath);
        console.log(`✅ ${level.toUpperCase()} PDF saved: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
        resolve();
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function downloadAllPDFs() {
  console.log('🚀 Downloading all JLPT kanji practice sheets...\n');
  
  for (const level of levels) {
    try {
      await downloadPDF(level);
    } catch (error) {
      console.error(`❌ Error downloading ${level}:`, error.message);
    }
  }
  
  console.log('\n✅ All PDFs downloaded successfully!');
  console.log('📁 PDFs saved to: public/worksheets/');
}

downloadAllPDFs().catch(console.error);
