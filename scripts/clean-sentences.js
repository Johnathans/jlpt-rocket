const fs = require('fs');
const path = require('path');

function cleanSentences() {
  console.log('=== Cleaning Sentence Data ===\n');
  
  const sentencesPath = path.join(__dirname, '../public/data/sentences.json');
  const sentences = JSON.parse(fs.readFileSync(sentencesPath, 'utf8'));
  
  console.log(`Total sentences before cleaning: ${sentences.length}`);
  
  // Remove malformed entries
  const validSentences = sentences.filter(s => {
    // Remove entries with "Word Verification:" or other malformed data
    if (s.japanese_text === 'Word Verification:') return false;
    if (s.japanese_text === 'N4') return false;
    if (s.japanese_text === 'N5') return false;
    if (s.japanese_text.includes('CSV verification')) return false;
    if (s.japanese_text.length < 3) return false; // Too short to be valid
    
    return true;
  });
  
  const removed = sentences.length - validSentences.length;
  console.log(`Removed ${removed} malformed entries`);
  console.log(`Valid sentences remaining: ${validSentences.length}`);
  
  const n5Count = validSentences.filter(s => s.jlpt_level === 'N5').length;
  const n4Count = validSentences.filter(s => s.jlpt_level === 'N4').length;
  
  console.log(`  N5: ${n5Count} sentences`);
  console.log(`  N4: ${n4Count} sentences`);
  
  // Save cleaned data
  fs.writeFileSync(sentencesPath, JSON.stringify(validSentences, null, 2), 'utf8');
  console.log(`\n✓ Saved cleaned sentences to: ${sentencesPath}`);
}

cleanSentences();
