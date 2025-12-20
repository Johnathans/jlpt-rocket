const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const TTS_API_URL = 'https://texttospeech.googleapis.com/v1/text:synthesize';
const JLPT_LEVEL = 'N4';

// Load sentences data
function loadSentences() {
  const sentencesPath = path.join(__dirname, '../public/data/sentences.json');
  return JSON.parse(fs.readFileSync(sentencesPath, 'utf8'));
}

// Generate audio using Google TTS Chirp 3
async function generateAudio(text, outputPath) {
  const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
  
  if (!apiKey) {
    throw new Error('GOOGLE_CLOUD_API_KEY is not set in .env.local');
  }

  const ttsRequest = {
    input: { text },
    voice: {
      languageCode: 'ja-JP',
      name: 'ja-JP-Chirp3-HD-Enceladus', // Chirp 3 HD voice (latest generation, female)
    },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate: 0.85,
      pitch: 0.0,
    },
  };

  const response = await fetch(`${TTS_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ttsRequest),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`TTS API Error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();

  if (!data.audioContent) {
    throw new Error('No audio content in response');
  }

  // Write audio file
  const audioBuffer = Buffer.from(data.audioContent, 'base64');
  fs.writeFileSync(outputPath, audioBuffer);
  
  return outputPath;
}

// Create audio cache directory structure
function ensureAudioDirectory(level) {
  const audioDir = path.join(__dirname, '../public/audio/sentences', level);
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }
  return audioDir;
}

// Generate a safe filename from sentence ID
function getSafeFilename(sentenceId) {
  return `${sentenceId}.mp3`;
}

// Main function
async function main() {
  console.log('=== Sentence Audio Generator (Google TTS Chirp 3) ===\n');

  const sentences = loadSentences();
  const n5Sentences = sentences.filter(s => s.jlpt_level === 'N5');

  console.log(`Found ${n5Sentences.length} N5 sentences\n`);

  const audioDir = ensureAudioDirectory('N5');
  console.log(`Audio directory: ${audioDir}\n`);

  let generated = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < n5Sentences.length; i++) {
    const sentence = n5Sentences[i];
    const filename = getSafeFilename(sentence.japanese_text);
    const outputPath = path.join(audioDir, filename);

    // Skip if already exists
    if (fs.existsSync(outputPath)) {
      skipped++;
      if (skipped % 10 === 0) {
        console.log(`  ⏭️  Skipped ${skipped} existing files...`);
      }
      continue;
    }

    try {
      console.log(`[${i + 1}/${n5Sentences.length}] Generating: ${sentence.japanese_text}`);
      await generateAudio(sentence.japanese_text, outputPath);
      generated++;
      
      // Rate limiting: wait 100ms between requests to avoid hitting API limits
      await new Promise(resolve => setTimeout(resolve, 100));

      if (generated % 10 === 0) {
        console.log(`  ✓ Generated ${generated} files so far...\n`);
      }
    } catch (error) {
      console.error(`  ✗ Error generating audio for "${sentence.japanese_text}":`, error.message);
      errors++;
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Generated: ${generated} new audio files`);
  console.log(`Skipped: ${skipped} existing files`);
  console.log(`Errors: ${errors}`);
  console.log(`Total N5 sentences: ${n5Sentences.length}`);
  console.log(`\nAudio files saved to: ${audioDir}`);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
