const fs = require('fs');
const path = require('path');

function fixTranslations() {
  console.log('=== Fixing Translation Inaccuracies ===\n');
  
  const sentencesPath = path.join(__dirname, '../public/data/sentences.json');
  const sentences = JSON.parse(fs.readFileSync(sentencesPath, 'utf8'));
  
  let fixedCount = 0;
  
  // Common translation fixes
  const fixes = [
    // 海 context fixes
    {
      japanese: /海に[行い]/,
      oldEn: /sea/i,
      newEn: 'beach',
      description: '海 in "go to 海" context should be "beach" not "sea"'
    },
    // Add more fixes as we find them
  ];
  
  sentences.forEach(s => {
    let originalTranslation = s.english_translation;
    
    // Fix: 海に行く = go to the beach (not sea)
    if (s.japanese_text.includes('海に行') || s.japanese_text.includes('海にい')) {
      if (s.english_translation.toLowerCase().includes('sea')) {
        s.english_translation = s.english_translation.replace(/\bsea\b/gi, 'beach');
        console.log(`Fixed: "${s.japanese_text}"`);
        console.log(`  Old: ${originalTranslation}`);
        console.log(`  New: ${s.english_translation}\n`);
        fixedCount++;
      }
    }
    
    // Fix: 海で遊ぶ = play at the beach
    if (s.japanese_text.includes('海で')) {
      if (s.english_translation.toLowerCase().includes('sea')) {
        s.english_translation = s.english_translation.replace(/\bsea\b/gi, 'beach');
        console.log(`Fixed: "${s.japanese_text}"`);
        console.log(`  Old: ${originalTranslation}`);
        console.log(`  New: ${s.english_translation}\n`);
        fixedCount++;
      }
    }
  });
  
  console.log(`\n✓ Fixed ${fixedCount} translations`);
  
  // Save updated sentences
  fs.writeFileSync(sentencesPath, JSON.stringify(sentences, null, 2), 'utf8');
  console.log(`✓ Saved to: ${sentencesPath}`);
}

fixTranslations();
