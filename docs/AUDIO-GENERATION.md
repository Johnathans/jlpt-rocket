# Sentence Audio Generation

This document explains how to generate cached audio files for sentences using Google TTS Chirp 3.

## Overview

Pre-generated audio files significantly improve performance by:
- Eliminating API calls during sentence practice
- Providing instant audio playback
- Reducing costs (TTS API calls)
- Ensuring consistent voice quality

## Audio Cache Structure

```
public/audio/sentences/
├── N5/
│   ├── {hash}.mp3
│   ├── {hash}.mp3
│   └── ...
├── N4/
│   └── ...
├── N3/
│   └── ...
├── N2/
│   └── ...
└── N1/
    └── ...
```

Files are named using MD5 hash of the Japanese text to ensure uniqueness and match the TTS API lookup logic.

## Generating Audio Files

### Prerequisites

1. Google Cloud API key with Text-to-Speech API enabled
2. API key set in `.env.local`:
   ```
   GOOGLE_CLOUD_API_KEY=your_api_key_here
   ```

### Generate N5 Sentences (Start Here)

```bash
cd scripts
node generate-sentence-audio.js
```

This will:
- Load all sentences from `public/data/sentences.json`
- Filter for N5 level sentences
- Generate audio files using Google TTS Chirp 3 (ja-JP-Journey-F voice)
- Save to `public/audio/sentences/N5/`
- Skip existing files automatically
- Rate limit to 100ms between requests

### Generate Other Levels

To generate audio for other levels, modify the script:

```javascript
// Change this line:
const n5Sentences = sentences.filter(s => s.jlpt_level === 'N5');
const audioDir = ensureAudioDirectory('N5');

// To:
const n4Sentences = sentences.filter(s => s.jlpt_level === 'N4');
const audioDir = ensureAudioDirectory('N4');
```

## How It Works

### 1. Audio Generation Script
- Reads sentences from JSON
- Generates MD5 hash from Japanese text
- Calls Google TTS API with Chirp 3 voice
- Saves MP3 files with hash-based filenames

### 2. TTS API Route (`/api/tts`)
- Receives text from client
- Generates MD5 hash
- Checks if cached file exists in any level folder
- Returns cached file path if found
- Falls back to live TTS generation if not cached

### 3. Client Usage
- Sentence practice mode calls TTS API
- API automatically serves cached files when available
- Seamless fallback to live generation for uncached sentences

## Voice Settings

**Google TTS Chirp 3 (Journey-F)**
- Voice: `ja-JP-Journey-F`
- Language: `ja-JP`
- Speaking Rate: `0.85` (slightly slower for learning)
- Pitch: `0.0` (neutral)
- Audio Format: MP3

## Cost Optimization

- **Cached**: Free (served from static files)
- **Uncached**: ~$4 per 1 million characters
- **N5 Sentences**: ~1,000 sentences × ~20 chars = ~20,000 chars = $0.08

Pre-generating all N5 audio costs less than $0.10 and eliminates ongoing API costs.

## Git Ignore

Audio files are excluded from git due to size:
- `.gitignore` includes `/public/audio/sentences/**/*.mp3`
- Only `.gitkeep` files are tracked
- Audio files should be generated on deployment or stored in CDN

## Deployment

### Option 1: Generate During Build
Add to build script:
```json
"scripts": {
  "build": "node scripts/generate-sentence-audio.js && next build"
}
```

### Option 2: Pre-generate and Upload to CDN
1. Generate locally
2. Upload to Vercel/Netlify static assets
3. Update paths in TTS API

### Option 3: On-Demand Generation
Current setup: generates on first request, caches for future requests.

## Monitoring

Check audio cache status:
```bash
# Count cached N5 files
ls -1 public/audio/sentences/N5/*.mp3 | wc -l

# Total size
du -sh public/audio/sentences/
```

## Troubleshooting

**No audio files generated:**
- Check `GOOGLE_CLOUD_API_KEY` in `.env.local`
- Verify API is enabled in Google Cloud Console
- Check script output for errors

**Audio not playing:**
- Verify file exists in `public/audio/sentences/{level}/`
- Check browser console for 404 errors
- Ensure hash generation matches between script and API

**Rate limiting:**
- Script includes 100ms delay between requests
- Increase delay if hitting limits: `setTimeout(resolve, 200)`
