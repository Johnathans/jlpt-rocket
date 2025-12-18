#!/usr/bin/env python3
"""
Regenerate audio files for kanji that were skipped (already existed)
These old files don't have the correct primary_reading pronunciation
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
    # The original 78 kanji that had pre-existing audio files (from before we added primary_reading)
    # These were the N5 kanji that existed in public/audio/kanji/ before the first script run
    ORIGINAL_78_CHAR_CODES = [
        19968, 19971, 19975, 19977, 19978, 19979, 20013, 20061, 20108, 20116,
        20154, 20170, 20241, 20309, 20808, 20837, 20843, 20845, 20870, 20986,
        21069, 21271, 21313, 21315, 21320, 21322, 21335, 21451, 21491, 21517,
        22235, 22269, 22303, 22806, 22823, 22825, 22899, 23376, 23398, 23567,
        23665, 24029, 24038, 24180, 24460, 26085, 26178, 26360, 26376, 26408,
        26412, 26469, 26481, 26657, 27597, 27598, 27671, 27700, 28779, 29238,
        29983, 30007, 30333, 30334, 32862, 34892, 35199, 35211, 35441, 35486,
        35501, 36554, 37329, 38263, 38291, 38632, 38651, 39135, 39640
    ]
    
    # Load kanji data
    with open('public/data/kanji.json', 'r', encoding='utf-8') as f:
        kanji_data = json.load(f)
    
    print(f"Loaded {len(kanji_data)} kanji entries")
    
    # Filter to only the original 78 kanji that need regeneration
    kanji_to_regenerate = []
    for k in kanji_data:
        if k.get('primary_reading'):
            char_code = ord(k['character'])
            if char_code in ORIGINAL_78_CHAR_CODES:
                kanji_to_regenerate.append(k)
    
    print(f"Kanji to regenerate (original 78 files): {len(kanji_to_regenerate)}")
    
    if len(kanji_to_regenerate) == 0:
        print("No files need regeneration!")
        return
    
    # Track progress
    success_count = 0
    fail_count = 0
    
    for i, kanji in enumerate(kanji_to_regenerate):
        char = kanji['character']
        reading = kanji['primary_reading']
        char_code = ord(char)
        output_path = f"{OUTPUT_DIR}/{char_code}.mp3"
        
        print(f"[{i+1}/{len(kanji_to_regenerate)}] {char} ({reading})", end=" ")
        
        if generate_audio(reading, output_path):
            success_count += 1
            print("✓")
        else:
            fail_count += 1
            print("✗")
        
        # Rate limiting
        time.sleep(0.1)
    
    print(f"\n=== Complete ===")
    print(f"Success: {success_count}")
    print(f"Failed: {fail_count}")


if __name__ == "__main__":
    main()
