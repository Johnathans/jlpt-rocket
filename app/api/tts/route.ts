import { NextRequest, NextResponse } from 'next/server';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

// Initialize the TTS client with API key
const client = new TextToSpeechClient({
  apiKey: process.env.GOOGLE_CLOUD_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { text, languageCode = 'ja-JP', voiceName = 'ja-JP-Chirp3-HD-Leda' } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    if (!process.env.GOOGLE_CLOUD_API_KEY) {
      console.error('GOOGLE_CLOUD_API_KEY is not set');
      return NextResponse.json({ error: 'TTS service not configured' }, { status: 500 });
    }

    // Construct the request for Chirp 3 (HD-Leda voice)
    const ttsRequest = {
      input: { text },
      voice: {
        languageCode,
        name: voiceName,
        ssmlGender: 'FEMALE' as const,
      },
      audioConfig: {
        audioEncoding: 'MP3' as const,
        speakingRate: 0.75,
        pitch: 0.0,
        effectsProfileId: ['telephony-class-application'],
      },
    };

    // Perform the text-to-speech request
    const [response] = await client.synthesizeSpeech(ttsRequest);

    if (!response.audioContent) {
      console.error('No audio content in response');
      return NextResponse.json({ error: 'Failed to generate audio' }, { status: 500 });
    }

    // Convert to base64 and return as data URL
    const audioBuffer = Buffer.from(response.audioContent as Uint8Array);
    const base64Audio = audioBuffer.toString('base64');
    const dataUrl = `data:audio/mpeg;base64,${base64Audio}`;

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
