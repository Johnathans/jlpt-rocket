const fs = require('fs');
const path = require('path');

function checkDuplicates() {
  console.log('=== Checking for Duplicate Sentences ===\n');
  
  const sentencesPath = path.join(__dirname, '../public/data/sentences.json');
  const sentences = JSON.parse(fs.readFileSync(sentencesPath, 'utf8'));
  
  console.log(`Total sentences: ${sentences.length}\n`);
  
  // Check for duplicate Japanese text
  const japaneseTextMap = new Map();
  const duplicates = [];
  
  sentences.forEach((sentence, index) => {
    const japanese = sentence.japanese_text;
    
    if (japaneseTextMap.has(japanese)) {
      duplicates.push({
        japanese: japanese,
        english: sentence.english_translation,
        firstIndex: japaneseTextMap.get(japanese),
        duplicateIndex: index,
        firstId: sentences[japaneseTextMap.get(japanese)].id,
        duplicateId: sentence.id
      });
    } else {
      japaneseTextMap.set(japanese, index);
    }
  });
  
  if (duplicates.length === 0) {
    console.log('✓ No duplicates found!');
    return;
  }
  
  console.log(`⚠️  Found ${duplicates.length} duplicate sentences:\n`);
  
  duplicates.forEach((dup, i) => {
    console.log(`${i + 1}. "${dup.japanese}"`);
    console.log(`   English: ${dup.english}`);
    console.log(`   First occurrence: index ${dup.firstIndex} (ID: ${dup.firstId})`);
    console.log(`   Duplicate: index ${dup.duplicateIndex} (ID: ${dup.duplicateId})\n`);
  });
  
  // Remove duplicates (keep first occurrence)
  console.log('Removing duplicates...');
  const uniqueSentences = [];
  const seenJapanese = new Set();
  
  sentences.forEach(sentence => {
    if (!seenJapanese.has(sentence.japanese_text)) {
      uniqueSentences.push(sentence);
      seenJapanese.add(sentence.japanese_text);
    }
  });
  
  console.log(`\nBefore: ${sentences.length} sentences`);
  console.log(`After: ${uniqueSentences.length} sentences`);
  console.log(`Removed: ${sentences.length - uniqueSentences.length} duplicates`);
  
  // Save cleaned data
  fs.writeFileSync(sentencesPath, JSON.stringify(uniqueSentences, null, 2), 'utf8');
  console.log(`\n✓ Saved cleaned sentences to: ${sentencesPath}`);
  
  // Show breakdown by level
  const n5Count = uniqueSentences.filter(s => s.jlpt_level === 'N5').length;
  const n4Count = uniqueSentences.filter(s => s.jlpt_level === 'N4').length;
  
  console.log('\n=== Final Counts ===');
  console.log(`N5: ${n5Count} sentences`);
  console.log(`N4: ${n4Count} sentences`);
  console.log(`Total: ${uniqueSentences.length} sentences`);
}

checkDuplicates();
