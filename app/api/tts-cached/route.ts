import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const TTS_API_URL = 'https://texttospeech.googleapis.com/v1/text:synthesize';

// Generate a hash for the sentence to use as filename
function generateSentenceHash(text: string): string {
  return crypto.createHash('md5').update(text).digest('hex');
}

// Check if cached audio file exists
function getCachedAudioPath(text: string, level?: string): string | null {
  const hash = generateSentenceHash(text);
  
  // Try level-specific cache first if level is provided
  if (level) {
    const levelPath = path.join(process.cwd(), 'public', 'audio', 'sentences', level, `${hash}.mp3`);
    if (fs.existsSync(levelPath)) {
      return `/audio/sentences/${level}/${hash}.mp3`;
    }
  }
  
  // Try all levels
  const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
  for (const lvl of levels) {
    const levelPath = path.join(process.cwd(), 'public', 'audio', 'sentences', lvl, `${hash}.mp3`);
    if (fs.existsSync(levelPath)) {
      return `/audio/sentences/${lvl}/${hash}.mp3`;
    }
  }
  
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const { text, languageCode = 'ja-JP', voiceName = 'ja-JP-Journey-F', level } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Check for cached audio file first
    const cachedPath = getCachedAudioPath(text, level);
    if (cachedPath) {
      return NextResponse.json({
        audioUrl: cachedPath,
        cached: true,
      });
    }

    // If not cached, generate using TTS API
    const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
    if (!apiKey) {
      console.error('GOOGLE_CLOUD_API_KEY is not set');
      return NextResponse.json({ error: 'TTS service not configured' }, { status: 500 });
    }

    const ttsRequest = {
      input: { text },
      voice: {
        languageCode,
        name: voiceName,
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
      console.error('TTS API Error:', response.status, errorData);
      return NextResponse.json(
        { error: 'TTS API request failed', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.audioContent) {
      console.error('No audio content in response');
      return NextResponse.json({ error: 'Failed to generate audio' }, { status: 500 });
    }

    // Return base64 audio as data URL
    const dataUrl = `data:audio/mpeg;base64,${data.audioContent}`;

    return NextResponse.json({
      audioUrl: dataUrl,
      cached: false,
    });

  } catch (error) {
    console.error('TTS Error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to generate speech', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
