const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Generate MD5 hash for text
function generateHash(text) {
  return crypto.createHash('md5').update(text).digest('hex');
}

// Rename audio files from Japanese text to MD5 hash
function renameAudioFiles(level) {
  const audioDir = path.join(__dirname, '../public/audio/sentences', level);
  
  if (!fs.existsSync(audioDir)) {
    console.log(`Directory not found: ${audioDir}`);
    return;
  }

  const files = fs.readdirSync(audioDir);
  let renamed = 0;
  let skipped = 0;

  for (const file of files) {
    if (!file.endsWith('.mp3')) continue;
    
    // Extract Japanese text from filename (remove .mp3)
    const japaneseText = file.replace('.mp3', '');
    
    // Generate MD5 hash
    const hash = generateHash(japaneseText);
    const newFilename = `${hash}.mp3`;
    
    const oldPath = path.join(audioDir, file);
    const newPath = path.join(audioDir, newFilename);
    
    // Skip if already renamed
    if (file === newFilename) {
      skipped++;
      continue;
    }
    
    // Rename file
    fs.renameSync(oldPath, newPath);
    renamed++;
    
    if (renamed % 50 === 0) {
      console.log(`  Renamed ${renamed} files...`);
    }
  }

  console.log(`\n=== ${level} Summary ===`);
  console.log(`Renamed: ${renamed} files`);
  console.log(`Skipped: ${skipped} files`);
  console.log(`Total: ${files.length} files`);
}

// Main
console.log('=== Renaming Audio Files to MD5 Hashes ===\n');

const level = process.argv[2] || 'N5';
console.log(`Processing level: ${level}\n`);

renameAudioFiles(level);

console.log('\n✓ Done!');
