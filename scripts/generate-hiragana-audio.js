const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const path = require('path');

// All hiragana characters
const hiraganaCharacters = [
  // Vowels
  'あ', 'い', 'う', 'え', 'お',
  // K row
  'か', 'き', 'く', 'け', 'こ',
  // S row
  'さ', 'し', 'す', 'せ', 'そ',
  // T row
  'た', 'ち', 'つ', 'て', 'と',
  // N row
  'な', 'に', 'ぬ', 'ね', 'の',
  // H row
  'は', 'ひ', 'ふ', 'へ', 'ほ',
  // M row
  'ま', 'み', 'む', 'め', 'も',
  // Y row
  'や', 'ゆ', 'よ',
  // R row
  'ら', 'り', 'る', 'れ', 'ろ',
  // W row
  'わ', 'を',
  // N
  'ん',
  // Dakuten - G row
  'が', 'ぎ', 'ぐ', 'げ', 'ご',
  // Z row
  'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
  // D row
  'だ', 'ぢ', 'づ', 'で', 'ど',
  // B row
  'ば', 'び', 'ぶ', 'べ', 'ぼ',
  // P row
  'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ',
  // Small characters
  'っ', 'ゃ', 'ゅ', 'ょ'
];

// Initialize the TTS client
const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.GOOGLE_CLOUD_API_KEY,
});

// Create output directory
const outputDir = path.join(__dirname, '../public/audio/hiragana');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to generate audio for a single character
async function generateAudio(character) {
  try {
    // Convert character to URL-safe filename
    const filename = `${character.charCodeAt(0)}.mp3`;
    const outputPath = path.join(outputDir, filename);

    // Skip if file already exists
    if (fs.existsSync(outputPath)) {
      console.log(`✓ Skipping ${character} (already exists)`);
      return;
    }

    // Construct the TTS request
    const request = {
      input: { text: character },
      voice: {
        languageCode: 'ja-JP',
        name: 'ja-JP-Chirp3-HD-Leda',
        ssmlGender: 'FEMALE',
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: 0.75,
        pitch: 0.0,
        effectsProfileId: ['telephony-class-application'],
      },
    };

    // Generate audio
    const [response] = await client.synthesizeSpeech(request);

    if (!response.audioContent) {
      throw new Error('No audio content in response');
    }

    // Write to file - audioContent is a Uint8Array, convert to Buffer
    const audioBuffer = Buffer.from(response.audioContent);
    console.log(`Audio size for ${character}: ${audioBuffer.length} bytes`);
    
    fs.writeFileSync(outputPath, audioBuffer);
    console.log(`✓ Generated audio for ${character} -> ${filename}`);

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));

  } catch (error) {
    console.error(`✗ Failed to generate audio for ${character}:`, error.message);
  }
}

// Main function
async function main() {
  console.log('Starting hiragana audio generation...');
  console.log(`Total characters: ${hiraganaCharacters.length}`);
  console.log(`Output directory: ${outputDir}\n`);

  if (!process.env.GOOGLE_CLOUD_API_KEY) {
    console.error('Error: GOOGLE_CLOUD_API_KEY environment variable is not set');
    process.exit(1);
  }

  // Generate audio for all characters
  for (const character of hiraganaCharacters) {
    await generateAudio(character);
  }

  console.log('\n✓ Audio generation complete!');
  console.log(`Generated files in: ${outputDir}`);
}

main().catch(console.error);
