#!/usr/bin/env python3
"""
Generate audio files for kanji primary_reading using Google TTS API (Chirp3 voice)
Saves MP3 files to public/audio/kanji/ using kanji character code as filename
"""

import json
import os
import base64
import time
import requests
from dotenv import load_dotenv

load_dotenv('.env.local')

GOOGLE_API_KEY = os.getenv('GOOGLE_CLOUD_API_KEY')
TTS_API_URL = 'https://texttospeech.googleapis.com/v1/text:synthesize'
OUTPUT_DIR = 'public/audio/kanji'

if not GOOGLE_API_KEY:
    print("Error: GOOGLE_CLOUD_API_KEY not found in .env.local")
    exit(1)


def generate_audio(text: str, output_path: str) -> bool:
    """Generate audio for text using Google TTS Chirp3 voice"""
    
    tts_request = {
        "input": {"text": text},
        "voice": {
            "languageCode": "ja-JP",
            "name": "ja-JP-Chirp3-HD-Leda",  # High quality Chirp3 voice (free tier)
        },
        "audioConfig": {
            "audioEncoding": "MP3",
            "speakingRate": 0.85,
            "pitch": 0.0,
        }
    }
    
    try:
        response = requests.post(
            f"{TTS_API_URL}?key={GOOGLE_API_KEY}",
            headers={"Content-Type": "application/json"},
            json=tts_request
        )
        
        if response.status_code != 200:
            print(f"  API Error: {response.status_code} - {response.text[:100]}")
            return False
        
        data = response.json()
        if "audioContent" not in data:
            print(f"  No audio content in response")
            return False
        
        # Decode base64 and save to file
        audio_bytes = base64.b64decode(data["audioContent"])
        with open(output_path, "wb") as f:
            f.write(audio_bytes)
        
        return True
        
    except Exception as e:
        print(f"  Error: {e}")
        return False


def main():
    # Load kanji data
    with open('public/data/kanji.json', 'r', encoding='utf-8') as f:
        kanji_data = json.load(f)
    
    print(f"Loaded {len(kanji_data)} kanji entries")
    
    # Filter kanji with primary_reading
    kanji_with_reading = [k for k in kanji_data if k.get('primary_reading')]
    print(f"Kanji with primary_reading: {len(kanji_with_reading)}")
    
    # Ensure output directory exists
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Track progress
    success_count = 0
    skip_count = 0
    fail_count = 0
    
    for i, kanji in enumerate(kanji_with_reading):
        char = kanji['character']
        reading = kanji['primary_reading']
        char_code = ord(char)
        output_path = f"{OUTPUT_DIR}/{char_code}.mp3"
        
        # Skip if file already exists
        if os.path.exists(output_path):
            skip_count += 1
            print(f"[{i+1}/{len(kanji_with_reading)}] {char} ({reading}) - SKIP (exists)")
            continue
        
        print(f"[{i+1}/{len(kanji_with_reading)}] {char} ({reading})", end=" ")
        
        if generate_audio(reading, output_path):
            success_count += 1
            print("✓")
        else:
            fail_count += 1
            print("✗")
        
        # Rate limiting - be respectful to the API
        time.sleep(0.1)
    
    print(f"\n=== Complete ===")
    print(f"Success: {success_count}")
    print(f"Skipped: {skip_count}")
    print(f"Failed: {fail_count}")


if __name__ == "__main__":
    main()
