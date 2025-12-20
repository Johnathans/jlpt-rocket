const fs = require('fs');
const path = require('path');

const sentencesPath = path.join(__dirname, '../public/data/sentences.json');
const sentences = JSON.parse(fs.readFileSync(sentencesPath, 'utf8'));

console.log(`Total sentences before: ${sentences.length}`);

// Remove sentences created during the bad generation run (2025-12-19T03:4x)
const cleaned = sentences.filter(s => {
  return !s.created_at.startsWith('2025-12-19T03:4');
});

console.log(`Total sentences after: ${cleaned.length}`);
console.log(`Removed: ${sentences.length - cleaned.length} bad sentences`);

fs.writeFileSync(sentencesPath, JSON.stringify(cleaned, null, 2), 'utf8');
console.log(`✓ Saved cleaned sentences`);
