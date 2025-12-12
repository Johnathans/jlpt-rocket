#!/usr/bin/env python3
"""
Interactive quiz-style kanji video with Google TTS
Shows kanji → 4 multiple choice options → highlight correct answer → speak Japanese word
"""

from moviepy import *
from PIL import Image, ImageDraw, ImageFont
import numpy as np
from gtts import gTTS
import os
import tempfile

# Video configuration
WIDTH = 1920
HEIGHT = 1080
FPS = 30

# Timing configuration
SHOW_KANJI_DURATION = 2.0      # Show kanji alone
SHOW_OPTIONS_DURATION = 3.0     # Show all 4 options
HIGHLIGHT_DURATION = 1.5        # Highlight correct answer
AUDIO_BUFFER = 0.5              # Extra time for audio

# Sample kanji data with wrong answers
SAMPLE_KANJI = [
    {
        'character': '学',
        'correct': 'study, learning',
        'reading': 'がく',
        'wrong_answers': ['water', 'eat', 'book']
    },
    {
        'character': '食',
        'correct': 'eat, food',
        'reading': 'しょく',
        'wrong_answers': ['study', 'water', 'fire']
    },
    {
        'character': '水',
        'correct': 'water',
        'reading': 'みず',
        'wrong_answers': ['fire', 'eat', 'study']
    },
]

def create_audio_file(text, lang='ja'):
    """Generate audio file using Google TTS"""
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.mp3')
    tts = gTTS(text=text, lang=lang, slow=False)
    tts.save(temp_file.name)
    return temp_file.name

def create_quiz_frame(kanji_data, stage='kanji', highlight_index=None):
    """
    Create a frame for the quiz
    stage: 'kanji' (just kanji), 'options' (show all 4), 'highlight' (highlight correct)
    """
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
    
    # Try to load fonts
    try:
        kanji_font = ImageFont.truetype("/System/Library/Fonts/Hiragino Sans GB.ttc", 280)
        option_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 60)
    except:
        kanji_font = ImageFont.load_default()
        option_font = ImageFont.load_default()
    
    # Draw kanji character (center top)
    kanji_bbox = draw.textbbox((0, 0), kanji_data['character'], font=kanji_font)
    kanji_width = kanji_bbox[2] - kanji_bbox[0]
    kanji_height = kanji_bbox[3] - kanji_bbox[1]
    kanji_x = (WIDTH - kanji_width) // 2
    kanji_y = 150
    draw.text((kanji_x, kanji_y), kanji_data['character'], fill='black', font=kanji_font)
    
    # If showing options or highlight
    if stage in ['options', 'highlight']:
        # Prepare all 4 options (correct + 3 wrong)
        all_options = [kanji_data['correct']] + kanji_data['wrong_answers']
        
        # Calculate button dimensions
        button_width = 400
        button_height = 120
        button_spacing = 60
        total_width = (button_width * 2) + button_spacing
        start_x = (WIDTH - total_width) // 2
        start_y = HEIGHT - 400
        
        # Draw 4 buttons (2x2 grid)
        for i, option in enumerate(all_options):
            row = i // 2
            col = i % 2
            
            x = start_x + (col * (button_width + button_spacing))
            y = start_y + (row * (button_height + button_spacing))
            
            # Determine button color
            is_correct = (i == 0)  # First option is always correct
            
            if stage == 'highlight' and is_correct:
                # Highlight correct answer with pink/orange gradient
                bg_color = '#ec4899'  # Pink
                border_color = '#f97316'  # Orange
                text_color = 'white'
                border_width = 8
            else:
                # Normal button
                bg_color = 'white'
                border_color = '#d1d5db'  # Gray
                text_color = 'black'
                border_width = 4
            
            # Draw button background
            draw.rectangle(
                [x, y, x + button_width, y + button_height],
                fill=bg_color,
                outline=border_color,
                width=border_width
            )
            
            # Draw thick bottom border
            bottom_border_height = 12
            draw.rectangle(
                [x, y + button_height - bottom_border_height, x + button_width, y + button_height],
                fill=border_color
            )
            
            # Draw option text (centered in button)
            text_bbox = draw.textbbox((0, 0), option, font=option_font)
            text_width = text_bbox[2] - text_bbox[0]
            text_height = text_bbox[3] - text_bbox[1]
            text_x = x + (button_width - text_width) // 2
            text_y = y + (button_height - text_height) // 2 - 10
            
            draw.text((text_x, text_y), option, fill=text_color, font=option_font)
    
    return np.array(img)

def create_kanji_quiz_clip(kanji_data):
    """Create a complete quiz sequence for one kanji"""
    
    clips = []
    
    # Stage 1: Show kanji alone
    kanji_frame = create_quiz_frame(kanji_data, stage='kanji')
    kanji_clip = ImageClip(kanji_frame).with_duration(SHOW_KANJI_DURATION)
    kanji_clip = kanji_clip.with_effects([vfx.CrossFadeIn(0.3)])
    clips.append(kanji_clip)
    
    # Stage 2: Show all 4 options
    options_frame = create_quiz_frame(kanji_data, stage='options')
    options_clip = ImageClip(options_frame).with_duration(SHOW_OPTIONS_DURATION)
    clips.append(options_clip)
    
    # Stage 3: Highlight correct answer
    highlight_frame = create_quiz_frame(kanji_data, stage='highlight', highlight_index=0)
    highlight_clip = ImageClip(highlight_frame).with_duration(HIGHLIGHT_DURATION)
    clips.append(highlight_clip)
    
    # Concatenate all stages
    video_clip = concatenate_videoclips(clips, method="compose")
    
    # Generate audio for the Japanese reading
    print(f"    🔊 Generating audio for: {kanji_data['reading']}")
    audio_file = create_audio_file(kanji_data['reading'], lang='ja')
    audio_clip = AudioFileClip(audio_file)
    
    # Add audio starting at the highlight stage
    audio_start_time = SHOW_KANJI_DURATION + SHOW_OPTIONS_DURATION
    audio_clip = audio_clip.with_start(audio_start_time)
    
    # Extend video duration if audio is longer
    total_duration = audio_start_time + audio_clip.duration + AUDIO_BUFFER
    if total_duration > video_clip.duration:
        # Extend the last frame
        last_frame_extension = total_duration - video_clip.duration
        extended_highlight = ImageClip(highlight_frame).with_duration(HIGHLIGHT_DURATION + last_frame_extension)
        video_clip = concatenate_videoclips(clips[:-1] + [extended_highlight], method="compose")
    
    # Combine video and audio
    final_clip = video_clip.with_audio(audio_clip)
    
    # Clean up temp audio file
    os.unlink(audio_file)
    
    return final_clip

def generate_quiz_video():
    """Generate the complete quiz video"""
    print("🎬 Starting quiz video generation...")
    print(f"📊 Creating video with {len(SAMPLE_KANJI)} kanji\n")
    
    clips = []
    
    for i, kanji_data in enumerate(SAMPLE_KANJI):
        print(f"  ✓ Processing kanji {i+1}/{len(SAMPLE_KANJI)}: {kanji_data['character']}")
        clip = create_kanji_quiz_clip(kanji_data)
        clips.append(clip)
        print(f"    ⏱️  Clip duration: {clip.duration:.1f}s\n")
    
    # Concatenate all clips
    print("🔗 Concatenating all clips...")
    final_video = concatenate_videoclips(clips, method="compose")
    
    # Output file
    output_file = "quiz_kanji_video.mp4"
    print(f"💾 Rendering video to {output_file}...")
    print("⏳ This may take a few minutes...\n")
    
    # Write video file
    final_video.write_videofile(
        output_file,
        fps=FPS,
        codec='libx264',
        audio_codec='aac',
        preset='medium',
        threads=4,
        logger='bar'
    )
    
    total_duration = sum(clip.duration for clip in clips)
    
    print(f"\n✅ Quiz video generated successfully!")
    print(f"📹 File: {output_file}")
    print(f"⏱️  Total duration: {total_duration:.1f} seconds")
    print(f"📐 Resolution: {WIDTH}x{HEIGHT}")
    print(f"🔊 Audio: Japanese pronunciation with Google TTS")
    print(f"\n🎥 Open the video to see the interactive quiz!")

if __name__ == "__main__":
    generate_quiz_video()
