const fs = require('fs');
const path = require('path');

// Using free google translate API
// Install with: npm install @vitalets/google-translate-api
const { translate } = require('@vitalets/google-translate-api');

async function translateSentences() {
  console.log('=== Translating N5 Sentences ===\n');
  
  // Load sentences
  const sentencesPath = path.join(__dirname, '../public/data/sentences.json');
  const sentences = JSON.parse(fs.readFileSync(sentencesPath, 'utf8'));
  
  console.log(`Loaded ${sentences.length} total sentences`);
  
  // Filter N5 sentences that need translation
  const n5Sentences = sentences.filter(s => s.jlpt_level === 'N5');
  console.log(`Found ${n5Sentences.length} N5 sentences\n`);
  
  // Track which sentences need translation (have Japanese in English field)
  const needsTranslation = n5Sentences.filter(s => {
    const hasJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(s.english_translation);
    const hasPlaceholder = /\{[^}]+\}/.test(s.english_translation);
    return hasJapanese || hasPlaceholder;
  });
  
  console.log(`${needsTranslation.length} sentences need translation\n`);
  
  if (needsTranslation.length === 0) {
    console.log('✓ All sentences already have proper English translations!');
    return;
  }
  
  // Translate one at a time with 5 second delays to avoid rate limiting
  let translated = 0;
  let failed = 0;
  
  for (let i = 0; i < needsTranslation.length; i++) {
    const sentence = needsTranslation[i];
    
    try {
      // Translate Japanese to English
      const result = await translate(sentence.japanese_text, { from: 'ja', to: 'en' });
      
      // Update the sentence in the main array
      const index = sentences.findIndex(s => s.id === sentence.id);
      if (index !== -1) {
        sentences[index].english_translation = result.text;
        translated++;
      }
      
      // Progress update every 10 sentences
      if ((i + 1) % 10 === 0) {
        console.log(`  Progress: ${i + 1}/${needsTranslation.length} sentences translated`);
        
        // Save progress periodically
        fs.writeFileSync(sentencesPath, JSON.stringify(sentences, null, 2), 'utf8');
      }
      
      // 5 second delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 5000));
      
    } catch (error) {
      if (error.message.includes('Too Many Requests')) {
        console.log(`  Rate limited at ${i + 1}/${needsTranslation.length}. Waiting 60 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 60000));
        i--; // Retry this sentence
      } else {
        console.error(`Error translating "${sentence.japanese_text}":`, error.message);
        failed++;
      }
    }
  }
  
  console.log(`\n✓ Translated ${translated} sentences`);
  
  // Save updated sentences
  fs.writeFileSync(sentencesPath, JSON.stringify(sentences, null, 2), 'utf8');
  console.log(`✓ Saved updated sentences to: ${sentencesPath}`);
  
  // Generate sample report
  console.log('\n=== Sample Translations ===\n');
  const samples = needsTranslation.slice(0, 5);
  samples.forEach(s => {
    const updated = sentences.find(sent => sent.id === s.id);
    console.log(`Japanese: ${s.japanese_text}`);
    console.log(`English:  ${updated.english_translation}`);
    console.log('');
  });
}

// Run translation
translateSentences().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
