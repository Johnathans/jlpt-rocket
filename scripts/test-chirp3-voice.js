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
  console.log('Testing Chirp 3 HD Japanese voices and saving samples...\n');
  
  const fs = require('fs');
  const voices = [
    { name: 'ja-JP-Chirp3-HD-Enceladus', label: 'Enceladus' },
    { name: 'ja-JP-Chirp3-HD-Aoede', label: 'Aoede' },
  ];
  
  for (const voice of voices) {
    const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
    const ttsRequest = {
      input: { text: 'こんにちは、今日はいい天気ですね。今から買い物に行きます。' },
      voice: {
        languageCode: 'ja-JP',
        name: voice.name,
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
        const audioBuffer = Buffer.from(data.audioContent, 'base64');
        const filename = `test-${voice.label}.mp3`;
        fs.writeFileSync(filename, audioBuffer);
        console.log(`✓ ${voice.name} - SUCCESS - Saved as ${filename}`);
      } else {
        console.log(`✗ ${voice.name} - FAILED: ${data.error?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.log(`✗ ${voice.name} - ERROR: ${error.message}`);
    }
  }
  
  console.log('\nListen to the test files to determine which is male/female:');
  console.log('- test-Enceladus.mp3');
  console.log('- test-Aoede.mp3');
}

main();
