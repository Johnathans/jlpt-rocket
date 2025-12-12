#!/usr/bin/env python3
"""
Simple kanji flashcard video generator using MoviePy
"""

from moviepy import *
import numpy as np

# Video configuration
WIDTH = 1920
HEIGHT = 1080
FPS = 30
DURATION_PER_KANJI = 6  # seconds

# Sample kanji data
SAMPLE_KANJI = [
    {
        'character': '学',
        'meaning': 'study, learning',
        'onyomi': 'ガク',
        'kunyomi': 'まな(ぶ)',
    },
    {
        'character': '食',
        'meaning': 'eat, food',
        'onyomi': 'ショク',
        'kunyomi': 'た(べる)',
    },
    {
        'character': '水',
        'meaning': 'water',
        'onyomi': 'スイ',
        'kunyomi': 'みず',
    }
]

def create_gradient_background(duration):
    """Create a gradient background"""
    def make_frame(t):
        gradient = np.zeros((HEIGHT, WIDTH, 3), dtype=np.uint8)
        for i in range(HEIGHT):
            ratio = i / HEIGHT
            r = int(255)
            g = int(255 - ratio * 15)
            b = int(255 - ratio * 30)
            gradient[i, :] = [r, g, b]
        return gradient
    
    return VideoClip(make_frame=make_frame, duration=duration)

def create_kanji_clip(kanji_data, duration):
    """Create a video clip for a single kanji"""
    
    # Background
    background = create_gradient_background(duration)
    
    # Main kanji character (large, center)
    kanji_text = TextClip(
        text=kanji_data['character'],
        font_size=280,
        color='black',
        size=(WIDTH, HEIGHT)
    ).with_position('center').with_duration(duration).with_effects([vfx.CrossFadeIn(0.5)])
    
    # English meaning (below kanji)
    meaning_text = TextClip(
        text=kanji_data['meaning'],
        font_size=70,
        color='#ec4899',
        size=(WIDTH, None)
    ).with_position(('center', HEIGHT * 0.65)).with_duration(duration).with_effects([vfx.CrossFadeIn(1.0)])
    
    # On'yomi reading (top right)
    onyomi_text = TextClip(
        text=f"On: {kanji_data['onyomi']}",
        font_size=45,
        color='#dc2626',
        size=(WIDTH * 0.4, None)
    ).with_position((WIDTH * 0.55, HEIGHT * 0.15)).with_duration(duration).with_effects([vfx.CrossFadeIn(1.5)])
    
    # Kun'yomi reading (bottom right)
    kunyomi_text = TextClip(
        text=f"Kun: {kanji_data['kunyomi']}",
        font_size=45,
        color='#2563eb',
        size=(WIDTH * 0.4, None)
    ).with_position((WIDTH * 0.55, HEIGHT * 0.75)).with_duration(duration).with_effects([vfx.CrossFadeIn(2.0)])
    
    # Composite all elements
    video = CompositeVideoClip([
        background,
        kanji_text,
        meaning_text,
        onyomi_text,
        kunyomi_text
    ], size=(WIDTH, HEIGHT))
    
    # Add fade out at the end
    video = video.with_effects([vfx.CrossFadeOut(0.5)])
    
    return video

def generate_sample_video():
    """Generate a sample video with multiple kanji"""
    print("🎬 Starting video generation...")
    print(f"📊 Creating video with {len(SAMPLE_KANJI)} kanji")
    
    clips = []
    
    for i, kanji_data in enumerate(SAMPLE_KANJI):
        print(f"  ✓ Processing kanji {i+1}/{len(SAMPLE_KANJI)}: {kanji_data['character']}")
        clip = create_kanji_clip(kanji_data, DURATION_PER_KANJI)
        clips.append(clip)
    
    # Concatenate all clips
    print("🔗 Concatenating clips...")
    final_video = concatenate_videoclips(clips, method="compose")
    
    # Output file
    output_file = "sample_kanji_video.mp4"
    print(f"💾 Rendering video to {output_file}...")
    print("⏳ This may take a few minutes...")
    
    # Write video file
    final_video.write_videofile(
        output_file,
        fps=FPS,
        codec='libx264',
        audio=False,
        preset='medium',
        threads=4
    )
    
    print(f"✅ Video generated successfully: {output_file}")
    print(f"📹 Duration: {len(SAMPLE_KANJI) * DURATION_PER_KANJI} seconds")
    print(f"📐 Resolution: {WIDTH}x{HEIGHT}")

if __name__ == "__main__":
    generate_sample_video()
