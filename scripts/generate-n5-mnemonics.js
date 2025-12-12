// scripts/generate-n5-mnemonics.js
// Generates memorable mnemonics for all N5 kanji using Claude API

const fs = require('fs');
const path = require('path');

// Read the kanji data
const kanjiDataPath = path.join(__dirname, '../public/data/kanji.json');
const kanjiData = JSON.parse(fs.readFileSync(kanjiDataPath, 'utf8'));

// Filter N5 kanji
const n5Kanji = kanjiData.filter(k => k.jlpt_level === 'N5');

console.log(`Found ${n5Kanji.length} N5 kanji to generate mnemonics for`);

// Manually created mnemonics (you'll need to add your API key to use Claude)
const mnemonics = {};

// Sample mnemonics to get started
const sampleMnemonics = {
  '日': 'Picture a window with the sun shining through it. The horizontal line is the windowsill, and the bright rectangle is sunlight streaming in - that\'s your day beginning!',
  '月': 'Two horizontal strokes are clouds in the night sky, and the two vertical strokes form a crescent moon peeking through. The moon\'s cycle gives us months!',
  '水': 'The center vertical line is a stream of water flowing down, and the splashes on either side show water droplets bouncing off rocks. You can almost see it flowing!',
  '火': 'A person (人) dancing wildly with flames shooting up on both sides. Fire makes people jump and dance to avoid getting burned!',
  '木': 'The horizontal line is the ground, the vertical line is the trunk, and the branches spread out on both sides. It\'s literally a simple tree drawing!',
  '森': 'Three trees (木木木) together make a forest. One tree is lonely, two is company, but three trees? That\'s a forest party!',
  '春': 'Three (三) people (人) come outside to enjoy the sun (日) - that\'s when you know spring has finally arrived after a long winter!',
  '雨': 'The top line is the sky, and the four dots below are raindrops falling down. It\'s literally a picture of rain falling from the clouds!',
  '電': 'Rain (雨) plus a rice field (田) equals electricity - because lightning strikes during rainstorms over fields, creating nature\'s electricity!',
  '食': 'A person (人) with a good (良) roof over their head - that\'s the top part. Below is a spoon bringing food to their mouth. Eating requires shelter and utensils!'
};

// Function to generate mnemonic using Claude API (requires API key)
async function generateMnemonicWithClaude(kanji) {
  // You'll need to add your Anthropic API key here
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  
  if (!ANTHROPIC_API_KEY) {
    console.log('⚠️  No ANTHROPIC_API_KEY found. Using sample mnemonics only.');
    return null;
  }

  const prompt = `Create a memorable, vivid mnemonic for the Japanese kanji "${kanji.character}" which means "${kanji.meaning}".

Kanji details:
- Character: ${kanji.character}
- Meaning: ${kanji.meaning}
- Stroke count: ${kanji.stroke_count}
- On'yomi: ${kanji.on_reading?.join(', ') || 'N/A'}
- Kun'yomi: ${kanji.kun_reading?.join(', ') || 'N/A'}

Requirements:
1. Make it visual and memorable
2. Connect to the kanji's actual shape when possible
3. Use radical composition if helpful
4. Keep it under 150 characters
5. Make it engaging and easy to remember

Return ONLY the mnemonic text, no explanation.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 200,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    const data = await response.json();
    return data.content[0].text.trim();
  } catch (error) {
    console.error(`Error generating mnemonic for ${kanji.character}:`, error.message);
    return null;
  }
}

// Main function
async function generateAllMnemonics() {
  const results = [];
  
  for (let i = 0; i < n5Kanji.length; i++) {
    const kanji = n5Kanji[i];
    console.log(`Processing ${i + 1}/${n5Kanji.length}: ${kanji.character} (${kanji.meaning})`);
    
    // Check if we have a sample mnemonic first
    let mnemonic = sampleMnemonics[kanji.character];
    
    // If not, try to generate with API (if key is available)
    if (!mnemonic && process.env.ANTHROPIC_API_KEY) {
      mnemonic = await generateMnemonicWithClaude(kanji);
      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    results.push({
      character: kanji.character,
      meaning: kanji.meaning,
      stroke_count: kanji.stroke_count,
      jlpt_level: kanji.jlpt_level,
      mnemonic: mnemonic || 'Mnemonic pending - add manually or use API'
    });
  }
  
  // Save to JSON file
  const outputPath = path.join(__dirname, '../public/data/n5-kanji-mnemonics.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');
  
  console.log(`\n✅ Generated mnemonics for ${results.length} N5 kanji`);
  console.log(`📁 Saved to: ${outputPath}`);
  
  // Show stats
  const withMnemonics = results.filter(r => r.mnemonic && !r.mnemonic.includes('pending')).length;
  const pending = results.length - withMnemonics;
  
  console.log(`\n📊 Stats:`);
  console.log(`   ✓ Complete: ${withMnemonics}`);
  console.log(`   ⏳ Pending: ${pending}`);
  
  if (pending > 0) {
    console.log(`\n💡 To generate remaining mnemonics:`);
    console.log(`   1. Set ANTHROPIC_API_KEY environment variable`);
    console.log(`   2. Run: ANTHROPIC_API_KEY=your_key node scripts/generate-n5-mnemonics.js`);
  }
}

// Run the script
generateAllMnemonics().catch(console.error);
