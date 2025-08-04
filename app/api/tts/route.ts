import { NextRequest, NextResponse } from 'next/server';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

// Initialize the TTS client with API key
const client = new TextToSpeechClient({
  apiKey: process.env.GOOGLE_CLOUD_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { text, languageCode = 'ja-JP', voiceName = 'ja-JP-Neural2-B' } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Construct the request
    const ttsRequest = {
      input: { text },
      voice: {
        languageCode,
        name: voiceName,
        ssmlGender: 'FEMALE' as const,
      },
      audioConfig: {
        audioEncoding: 'MP3' as const,
        speakingRate: 0.9, // Slightly slower for language learning
        pitch: 0.0,
      },
    };

    // Perform the text-to-speech request
    const [response] = await client.synthesizeSpeech(ttsRequest);

    if (!response.audioContent) {
      return NextResponse.json({ error: 'Failed to generate audio' }, { status: 500 });
    }

    // Convert the audio content to base64
    const audioBase64 = Buffer.from(response.audioContent as Uint8Array).toString('base64');

    return NextResponse.json({
      audio: audioBase64,
      contentType: 'audio/mpeg',
    });

  } catch (error) {
    console.error('TTS Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      voiceName: voiceName,
      languageCode: languageCode,
      text: text.substring(0, 50) + (text.length > 50 ? '...' : '')
    });
    return NextResponse.json(
      { error: 'Failed to generate speech', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
