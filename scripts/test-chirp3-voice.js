const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const TTS_API_URL = 'https://texttospeech.googleapis.com/v1/text:synthesize';

async function testVoice(voiceName) {
  const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
  
  const ttsRequest = {
    input: { text: 'こんにちは、今日はいい天気ですね。' },
    voice: {
      languageCode: 'ja-JP',
      name: voiceName,
    },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate: 0.85,
      pitch: 0.0,
    },
  };

  try {
    const response = await fetch(`${TTS_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ttsRequest),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log(`✓ ${voiceName} - SUCCESS`);
      return true;
    } else {
      console.log(`✗ ${voiceName} - FAILED: ${data.error?.message || 'Unknown error'}`);
      return false;
    }
  } catch (error) {
    console.log(`✗ ${voiceName} - ERROR: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('Testing Chirp 3 HD Japanese voices...\n');
  
  const voices = [
    'ja-JP-Chirp3-HD-Enceladus',
    'ja-JP-Chirp3-HD-Aoede',
    'ja-JP-Chirp-HD-F',
    'ja-JP-Chirp-HD-D',
  ];
  
  for (const voice of voices) {
    await testVoice(voice);
  }
}

main();
