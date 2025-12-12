#!/usr/bin/env python3
"""
Basic kanji flashcard video generator - simplified version
"""

from moviepy import *
from PIL import Image, ImageDraw, ImageFont
import numpy as np

# Video configuration
WIDTH = 1920
HEIGHT = 1080
FPS = 30
DURATION_PER_KANJI = 5  # seconds

# Sample kanji data
SAMPLE_KANJI = [
    {'character': '学', 'meaning': 'study, learning', 'onyomi': 'ガク', 'kunyomi': 'まな(ぶ)'},
    {'character': '食', 'meaning': 'eat, food', 'onyomi': 'ショク', 'kunyomi': 'た(べる)'},
    {'character': '水', 'meaning': 'water', 'onyomi': 'スイ', 'kunyomi': 'みず'},
]

def create_kanji_frame(kanji_data):
    """Create a single frame image for a kanji"""
    # Create image with gradient background
    img = Image.new('RGB', (WIDTH, HEIGHT), color='white')
    draw = ImageDraw.Draw(img)
    
    # Draw gradient background
    for y in range(HEIGHT):
        ratio = y / HEIGHT
        r = 255
        g = int(255 - ratio * 15)
        b = int(255 - ratio * 30)
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b))
    
    # Try to load fonts (fallback to default if not available)
    try:
        kanji_font = ImageFont.truetype("/System/Library/Fonts/Hiragino Sans GB.ttc", 250)
        meaning_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 70)
        reading_font = ImageFont.truetype("/System/Library/Fonts/Hiragino Sans GB.ttc", 45)
    except:
        # Fallback to default font
        kanji_font = ImageFont.load_default()
        meaning_font = ImageFont.load_default()
        reading_font = ImageFont.load_default()
    
    # Draw kanji character (center)
    kanji_bbox = draw.textbbox((0, 0), kanji_data['character'], font=kanji_font)
    kanji_width = kanji_bbox[2] - kanji_bbox[0]
    kanji_height = kanji_bbox[3] - kanji_bbox[1]
    kanji_x = (WIDTH - kanji_width) // 2
    kanji_y = (HEIGHT - kanji_height) // 2 - 100
    draw.text((kanji_x, kanji_y), kanji_data['character'], fill='black', font=kanji_font)
    
    # Draw meaning (below kanji)
    meaning_bbox = draw.textbbox((0, 0), kanji_data['meaning'], font=meaning_font)
    meaning_width = meaning_bbox[2] - meaning_bbox[0]
    meaning_x = (WIDTH - meaning_width) // 2
    meaning_y = kanji_y + kanji_height + 50
    draw.text((meaning_x, meaning_y), kanji_data['meaning'], fill='#ec4899', font=meaning_font)
    
    # Draw on'yomi (top right)
    onyomi_text = f"On: {kanji_data['onyomi']}"
    draw.text((WIDTH * 0.55, HEIGHT * 0.15), onyomi_text, fill='#dc2626', font=reading_font)
    
    # Draw kun'yomi (bottom right)
    kunyomi_text = f"Kun: {kanji_data['kunyomi']}"
    draw.text((WIDTH * 0.55, HEIGHT * 0.75), kunyomi_text, fill='#2563eb', font=reading_font)
    
    return np.array(img)

def create_kanji_clip(kanji_data, duration):
    """Create a video clip for a single kanji"""
    # Create the frame
    frame = create_kanji_frame(kanji_data)
    
    # Create clip from the frame
    clip = ImageClip(frame).with_duration(duration)
    
    # Add fade in and fade out
    clip = clip.with_effects([vfx.CrossFadeIn(0.5), vfx.CrossFadeOut(0.5)])
    
    return clip

def generate_sample_video():
    """Generate a sample video with multiple kanji"""
    print("🎬 Starting video generation...")
    print(f"📊 Creating video with {len(SAMPLE_KANJI)} kanji\n")
    
    clips = []
    
    for i, kanji_data in enumerate(SAMPLE_KANJI):
        print(f"  ✓ Processing kanji {i+1}/{len(SAMPLE_KANJI)}: {kanji_data['character']}")
        clip = create_kanji_clip(kanji_data, DURATION_PER_KANJI)
        clips.append(clip)
    
    # Concatenate all clips
    print("\n🔗 Concatenating clips...")
    final_video = concatenate_videoclips(clips, method="compose")
    
    # Output file
    output_file = "sample_kanji_video.mp4"
    print(f"💾 Rendering video to {output_file}...")
    print("⏳ This may take a minute or two...\n")
    
    # Write video file
    final_video.write_videofile(
        output_file,
        fps=FPS,
        codec='libx264',
        audio=False,
        preset='medium',
        threads=4,
        logger='bar'
    )
    
    print(f"\n✅ Video generated successfully!")
    print(f"📹 File: {output_file}")
    print(f"⏱️  Duration: {len(SAMPLE_KANJI) * DURATION_PER_KANJI} seconds")
    print(f"📐 Resolution: {WIDTH}x{HEIGHT}")
    print(f"\n🎥 Open the video to see the result!")

if __name__ == "__main__":
    generate_sample_video()
