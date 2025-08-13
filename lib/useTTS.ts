import { useState, useCallback, useRef } from 'react';

interface TTSOptions {
  languageCode?: string;
  voiceName?: string;
  autoPlay?: boolean;
}

interface TTSState {
  isLoading: boolean;
  isPlaying: boolean;
  error: string | null;
}

export function useTTS() {
  const [state, setState] = useState<TTSState>({
    isLoading: false,
    isPlaying: false,
    error: null,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCache = useRef<Map<string, string>>(new Map());

  const speak = useCallback(async (
    text: string, 
    options: TTSOptions = {}
  ) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      // Create cache key
      const cacheKey = `${text}-${options.languageCode || 'ja-JP'}-${options.voiceName || 'ja-JP-Journey-F'}`;
      
      let audioUrl: string;

      // Check cache first
      if (audioCache.current.has(cacheKey)) {
        audioUrl = audioCache.current.get(cacheKey)!;
      } else {
        // Call our TTS API
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text,
            languageCode: options.languageCode || 'ja-JP',
            voiceName: options.voiceName || 'ja-JP-Journey-F',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate speech');
        }

        const data = await response.json();
        
        // Convert base64 to blob URL
        const audioBlob = new Blob(
          [Uint8Array.from(atob(data.audio), c => c.charCodeAt(0))],
          { type: data.contentType }
        );
        audioUrl = URL.createObjectURL(audioBlob);
        
        // Cache the audio URL
        audioCache.current.set(cacheKey, audioUrl);
      }

      setState(prev => ({ ...prev, isLoading: false }));

      // Play audio if autoPlay is enabled (default: true)
      if (options.autoPlay !== false) {
        await playAudio(audioUrl);
      }

      return audioUrl;

    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
      throw error;
    }
  }, []);

  const playAudio = useCallback(async (audioUrl: string) => {
    try {
      setState(prev => ({ ...prev, isPlaying: true, error: null }));

      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Create new audio element
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      // Set up event listeners
      audio.addEventListener('ended', () => {
        setState(prev => ({ ...prev, isPlaying: false }));
      });

      audio.addEventListener('error', () => {
        setState(prev => ({ 
          ...prev, 
          isPlaying: false, 
          error: 'Failed to play audio' 
        }));
      });

      // Play the audio
      await audio.play();

    } catch (error) {
      setState(prev => ({
        ...prev,
        isPlaying: false,
        error: error instanceof Error ? error.message : 'Playback failed',
      }));
      throw error;
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const clearCache = useCallback(() => {
    // Revoke all cached blob URLs to free memory
    audioCache.current.forEach(url => URL.revokeObjectURL(url));
    audioCache.current.clear();
  }, []);

  return {
    speak,
    playAudio,
    stop,
    clearCache,
    ...state,
  };
}

// Utility function for quick TTS without hook
export async function speakText(
  text: string, 
  options: TTSOptions = {}
): Promise<string> {
  const response = await fetch('/api/tts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      languageCode: options.languageCode || 'ja-JP',
      voiceName: options.voiceName || 'ja-JP-Neural2-B',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate speech');
  }

  const data = await response.json();
  
  // Convert base64 to blob URL
  const audioBlob = new Blob(
    [Uint8Array.from(atob(data.audio), c => c.charCodeAt(0))],
    { type: data.contentType }
  );
  const audioUrl = URL.createObjectURL(audioBlob);

  // Auto-play if specified
  if (options.autoPlay !== false) {
    const audio = new Audio(audioUrl);
    await audio.play();
  }

  return audioUrl;
}
