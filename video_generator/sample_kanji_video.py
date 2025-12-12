#!/usr/bin/env python3
"""
Generate a sample kanji flashcard video using MoviePy
"""

try:
    from moviepy import VideoClip, TextClip, CompositeVideoClip, concatenate_videoclips
except ImportError:
    from moviepy.editor import VideoClip, TextClip, CompositeVideoClip, concatenate_videoclips
import numpy as np

# Video configuration
WIDTH = 1920
HEIGHT = 1080
FPS = 30
DURATION_PER_KANJI = 8  # seconds

# Colors (matching your app design)
BG_COLOR = (255, 255, 255)  # White
TEXT_COLOR = 'black'
PINK_COLOR = '#ec4899'
ORANGE_COLOR = '#f97316'

# Sample kanji data
SAMPLE_KANJI = [
    {
        'character': '学',
        'meaning': 'study, learning',
        'onyomi': 'ガク',
        'kunyomi': 'まな(ぶ)',
        'examples': ['学校 (がっこう) - school', '学生 (がくせい) - student']
    },
    {
        'character': '食',
        'meaning': 'eat, food',
        'onyomi': 'ショク',
        'kunyomi': 'た(べる)',
        'examples': ['食べる (たべる) - to eat', '食事 (しょくじ) - meal']
    },
    {
        'character': '水',
        'meaning': 'water',
        'onyomi': 'スイ',
        'kunyomi': 'みず',
        'examples': ['水 (みず) - water', '水曜日 (すいようび) - Wednesday']
    }
]

def create_gradient_background(duration):
    """Create a subtle gradient background"""
    def make_frame(t):
        # Create a gradient from white to light pink
        gradient = np.zeros((HEIGHT, WIDTH, 3), dtype=np.uint8)
        for i in range(HEIGHT):
            ratio = i / HEIGHT
            # Interpolate between white and very light pink
            r = int(255)
            g = int(255 - ratio * 10)
            b = int(255 - ratio * 20)
            gradient[i, :] = [r, g, b]
        return gradient
    
    return VideoClip(make_frame, duration=duration)

def create_kanji_clip(kanji_data, duration):
    """Create a video clip for a single kanji"""
    
    # Background
    background = create_gradient_background(duration)
    
    # Main kanji character (large, center)
    kanji_text = TextClip(
        kanji_data['character'],
        fontsize=280,
        color=TEXT_COLOR,
        font='Arial-Unicode-Bold',  # Will try to use system font
        method='caption',
        size=(WIDTH, None)
    ).set_position('center').set_duration(duration)
    
    # Apply fade in animation to kanji
    kanji_text = kanji_text.crossfadein(0.5)
    
    # English meaning (below kanji)
    meaning_text = TextClip(
        kanji_data['meaning'],
        fontsize=80,
        color=PINK_COLOR,
        font='Arial-Bold',
        method='caption',
        size=(WIDTH, None)
    ).set_position(('center', HEIGHT * 0.65)).set_duration(duration)
    meaning_text = meaning_text.crossfadein(1.0)
    
    # On'yomi reading (top right)
    onyomi_label = TextClip(
        'On: ' + kanji_data['onyomi'],
        fontsize=50,
        color='#dc2626',  # Red
        font='Arial-Unicode',
        method='caption',
        size=(WIDTH * 0.4, None)
    ).set_position((WIDTH * 0.55, HEIGHT * 0.15)).set_duration(duration)
    onyomi_label = onyomi_label.crossfadein(1.5)
    
    # Kun'yomi reading (bottom right)
    kunyomi_label = TextClip(
        'Kun: ' + kanji_data['kunyomi'],
        fontsize=50,
        color='#2563eb',  # Blue
        font='Arial-Unicode',
        method='caption',
        size=(WIDTH * 0.4, None)
    ).set_position((WIDTH * 0.55, HEIGHT * 0.75)).set_duration(duration)
    kunyomi_label = kunyomi_label.crossfadein(2.0)
    
    # Example words (bottom)
    examples_text = '\n'.join(kanji_data['examples'])
    examples_clip = TextClip(
        examples_text,
        fontsize=40,
        color='#4b5563',  # Gray
        font='Arial-Unicode',
        method='caption',
        size=(WIDTH * 0.8, None),
        align='center'
    ).set_position(('center', HEIGHT * 0.85)).set_duration(duration)
    examples_clip = examples_clip.crossfadein(2.5)
    
    # Composite all elements
    video = CompositeVideoClip([
        background,
        kanji_text,
        meaning_text,
        onyomi_label,
        kunyomi_label,
        examples_clip
    ], size=(WIDTH, HEIGHT))
    
    # Add fade out at the end
    video = video.fadeout(0.5)
    
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
