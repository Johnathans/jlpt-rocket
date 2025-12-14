import { NextRequest } from 'next/server';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

// Initialize the TTS client with API key
const client = new TextToSpeechClient({
  apiKey: process.env.GOOGLE_CLOUD_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { text, languageCode = 'ja-JP', voiceName = 'ja-JP-Chirp3-HD-Leda' } = await request.json();

    if (!text) {
      return new Response(JSON.stringify({ error: 'Text is required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!process.env.GOOGLE_CLOUD_API_KEY) {
      console.error('GOOGLE_CLOUD_API_KEY is not set');
      return new Response(JSON.stringify({ error: 'TTS service not configured' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
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
      return new Response(JSON.stringify({ error: 'Failed to generate audio' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Return audio as binary MP3 with proper headers
    const audioBuffer = Buffer.from(response.audioContent as Uint8Array);
    
    return new Response(audioBuffer as any, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });

  } catch (error) {
    console.error('TTS Error:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(JSON.stringify({ 
      error: 'Failed to generate speech', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
