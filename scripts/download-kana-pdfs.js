const fs = require('fs');
const path = require('path');
const http = require('http');

const BASE_URL = 'http://localhost:3000';
const types = ['hiragana', 'katakana'];

// Create worksheets directory if it doesn't exist
const worksheetsDir = path.join(__dirname, '../public/worksheets');
if (!fs.existsSync(worksheetsDir)) {
  fs.mkdirSync(worksheetsDir, { recursive: true });
}

async function downloadPDF(type) {
  return new Promise((resolve, reject) => {
    const url = `${BASE_URL}/api/generate-pdf/${type}`;
    const outputPath = path.join(worksheetsDir, `${type}-practice-sheet.pdf`);
    
    console.log(`📥 Downloading ${type} PDF...`);
    
    http.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${type}: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(outputPath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        const stats = fs.statSync(outputPath);
        console.log(`✅ ${type.toUpperCase()} PDF saved: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
        resolve();
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function downloadAllPDFs() {
  console.log('🚀 Downloading hiragana and katakana practice sheets...\n');
  
  for (const type of types) {
    try {
      await downloadPDF(type);
    } catch (error) {
      console.error(`❌ Error downloading ${type}:`, error.message);
    }
  }
  
  console.log('\n✅ All kana PDFs downloaded successfully!');
  console.log('📁 PDFs saved to: public/worksheets/');
}

downloadAllPDFs().catch(console.error);
