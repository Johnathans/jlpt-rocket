const fs = require('fs');
const path = require('path');
const { translate } = require('@vitalets/google-translate-api');

async function verifyAllTranslations() {
  console.log('=== Verifying All N5 Translations ===\n');
  
  const sentencesPath = path.join(__dirname, '../public/data/sentences.json');
  const sentences = JSON.parse(fs.readFileSync(sentencesPath, 'utf8'));
  
  // Get all N5 sentences
  const n5Sentences = sentences.filter(s => s.jlpt_level === 'N5');
  console.log(`Found ${n5Sentences.length} N5 sentences to verify\n`);
  
  let verified = 0;
  let updated = 0;
  
  for (let i = 0; i < n5Sentences.length; i++) {
    const sentence = n5Sentences[i];
    
    try {
      // Get Google's translation
      const result = await translate(sentence.japanese_text, { from: 'ja', to: 'en' });
      const googleTranslation = result.text;
      
      // Compare with current translation
      const currentTranslation = sentence.english_translation;
      
      // Update if different
      if (googleTranslation.toLowerCase() !== currentTranslation.toLowerCase()) {
        console.log(`\nDifference found:`);
        console.log(`  Japanese: ${sentence.japanese_text}`);
        console.log(`  Current:  ${currentTranslation}`);
        console.log(`  Google:   ${googleTranslation}`);
        
        // Update the sentence in the main array
        const index = sentences.findIndex(s => s.id === sentence.id);
        if (index !== -1) {
          sentences[index].english_translation = googleTranslation;
          updated++;
        }
      }
      
      verified++;
      
      // Progress update every 10 sentences
      if ((i + 1) % 10 === 0) {
        console.log(`\n  Progress: ${i + 1}/${n5Sentences.length} sentences verified (${updated} updated)`);
        
        // Save progress periodically
        fs.writeFileSync(sentencesPath, JSON.stringify(sentences, null, 2), 'utf8');
      }
      
      // 5 second delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 5000));
      
    } catch (error) {
      if (error.message.includes('Too Many Requests')) {
        console.log(`\n  Rate limited at ${i + 1}/${n5Sentences.length}. Waiting 60 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 60000));
        i--; // Retry this sentence
      } else {
        console.error(`\nError verifying "${sentence.japanese_text}":`, error.message);
      }
    }
  }
  
  console.log(`\n\n=== SUMMARY ===`);
  console.log(`Verified: ${verified} sentences`);
  console.log(`Updated: ${updated} sentences`);
  
  // Save final results
  fs.writeFileSync(sentencesPath, JSON.stringify(sentences, null, 2), 'utf8');
  console.log(`\n✓ Saved to: ${sentencesPath}`);
}

verifyAllTranslations().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
