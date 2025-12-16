const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// All 79 N5 kanji from database
const kanjiList = [
  '一', '二', '九', '七', '人', '入', '八', '十', '三', '上',
  '下', '大', '女', '山', '川', '土', '千', '子', '小', '中',
  '五', '六', '円', '天', '日', '月', '木', '水', '火', '出',
  '右', '四', '左', '本', '白', '万', '今', '午', '友', '父',
  '北', '半', '外', '母', '休', '先', '名', '年', '気', '百',
  '男', '見', '車', '毎', '行', '西', '何', '来', '学', '金',
  '雨', '国', '東', '長', '前', '南', '後', '食', '校', '時',
  '高', '間', '話', '電', '聞', '語', '読', '生', '書'
].map(char => ({ character: char }));

const TTS_API_URL = 'https://texttospeech.googleapis.com/v1/text:synthesize';

// Create output directory
const outputDir = path.join(__dirname, '../public/audio/kanji');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to generate audio for a single kanji
async function generateAudio(kanji) {
  try {
    const { character } = kanji;
    // Use character code as filename
    const filename = `${character.charCodeAt(0)}.mp3`;
    const outputPath = path.join(outputDir, filename);

    // Skip if file already exists
    if (fs.existsSync(outputPath)) {
      console.log(`✓ Skipping ${character} (already exists)`);
      return;
    }

    const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_CLOUD_API_KEY not set');
    }

    // Construct the TTS request - use the kanji character for natural pronunciation
    const ttsRequest = {
      input: { text: character },
      voice: {
        languageCode: 'ja-JP',
        name: 'ja-JP-Wavenet-A',
        ssmlGender: 'FEMALE',
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: 0.85,
        pitch: 0.0,
      },
    };

    // Call Google TTS REST API
    const response = await fetch(`${TTS_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ttsRequest),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API error ${response.status}: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();

    if (!data.audioContent) {
      throw new Error('No audio content in response');
    }

    // Write base64 audio to file
    const audioBuffer = Buffer.from(data.audioContent, 'base64');
    console.log(`Audio size for ${character}: ${audioBuffer.length} bytes`);
    
    fs.writeFileSync(outputPath, audioBuffer);
    console.log(`✓ Generated audio for ${character} -> ${filename}`);

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));

  } catch (error) {
    console.error(`✗ Failed to generate audio for ${kanji.character}:`, error.message);
  }
}

// Main function
async function main() {
  console.log('Starting kanji audio generation...');
  console.log(`Total kanji: ${kanjiList.length}`);
  console.log(`Output directory: ${outputDir}\n`);

  if (!process.env.GOOGLE_CLOUD_API_KEY) {
    console.error('Error: GOOGLE_CLOUD_API_KEY environment variable is not set');
    console.error('Make sure .env.local has GOOGLE_CLOUD_API_KEY=your-key');
    process.exit(1);
  }

  console.log('API Key found:', process.env.GOOGLE_CLOUD_API_KEY.substring(0, 10) + '...\n');

  // Generate audio for all kanji
  for (const kanji of kanjiList) {
    await generateAudio(kanji);
  }

  console.log('\n✓ Audio generation complete!');
  console.log(`Generated files in: ${outputDir}`);
}

main().catch(console.error);
