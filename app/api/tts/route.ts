import { NextRequest, NextResponse } from 'next/server';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Initialize the TTS client with API key
const client = new TextToSpeechClient({
  apiKey: process.env.GOOGLE_CLOUD_API_KEY,
});

// Cache directory for audio files
const CACHE_DIR = path.join(process.cwd(), 'public', 'audio-cache');

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// Generate a unique hash for the text + voice combination
function generateCacheKey(text: string, voiceName: string): string {
  const hash = crypto.createHash('md5').update(`${text}-${voiceName}`).digest('hex');
  return `${hash}.mp3`;
}

export async function POST(request: NextRequest) {
  try {
    const { text, languageCode = 'ja-JP', voiceName = 'ja-JP-Chirp3-HD-Leda' } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Check if audio is already cached
    const cacheKey = generateCacheKey(text, voiceName);
    const cachePath = path.join(CACHE_DIR, cacheKey);
    const publicUrl = `/audio-cache/${cacheKey}`;

    if (fs.existsSync(cachePath)) {
      console.log('TTS Cache hit for:', text);
      return NextResponse.json({
        audioUrl: publicUrl,
        cached: true,
      });
    }

    // Use plain text for better Chirp 3 compatibility

    // Debug logging
    console.log('TTS Request Details:', {
      voiceName,
      languageCode,
      textLength: text.length,
      isChirp3: voiceName.includes('Chirp3')
    });

    // Construct the request for Chirp 3 (HD-Leda voice)
    const ttsRequest = {
      input: { text }, // Use plain text for better Chirp 3 compatibility
      voice: {
        languageCode,
        name: voiceName, // ja-JP-Chirp3-HD-Leda is Chirp 3
        ssmlGender: 'FEMALE' as const,
      },
      audioConfig: {
        audioEncoding: 'MP3' as const,
        speakingRate: 0.75, // Slower for language learning (was 0.9)
        pitch: 0.0,
        effectsProfileId: ['telephony-class-application'], // Enhanced quality
      },
    };

    // Perform the text-to-speech request
    console.log('Sending TTS request with voice:', voiceName);
    const [response] = await client.synthesizeSpeech(ttsRequest);
    console.log('TTS response received, audio content length:', response.audioContent?.length);

    if (!response.audioContent) {
      return NextResponse.json({ error: 'Failed to generate audio' }, { status: 500 });
    }

    // Save audio to cache
    const audioBuffer = Buffer.from(response.audioContent as Uint8Array);
    fs.writeFileSync(cachePath, audioBuffer as any);
    console.log('TTS Cache saved for:', text);

    return NextResponse.json({
      audioUrl: publicUrl,
      cached: false,
    });

  } catch (error) {
    console.error('TTS Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: 'Failed to generate speech', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
