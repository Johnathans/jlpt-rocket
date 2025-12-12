#!/usr/bin/env python3
"""
Generate quiz video for ALL N5 kanji from Supabase
"""

from moviepy import *
from PIL import Image, ImageDraw, ImageFont
import numpy as np
from gtts import gTTS
import os
import tempfile
import random
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv('../.env.local')

# Initialize Supabase
supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
supabase_key = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
supabase: Client = create_client(supabase_url, supabase_key)

# Video configuration
WIDTH = 1920
HEIGHT = 1080
FPS = 30

# Timing configuration
SHOW_KANJI_DURATION = 2.0
SHOW_OPTIONS_DURATION = 3.0
HIGHLIGHT_DURATION = 1.5
AUDIO_BUFFER = 0.5

def fetch_n5_kanji():
    """Fetch all N5 kanji from Supabase"""
    print("📥 Fetching N5 kanji from Supabase...")
    
    response = supabase.table('kanji').select('*').eq('jlpt_level', 'N5').execute()
    kanji_list = response.data
    
    print(f"✓ Found {len(kanji_list)} N5 kanji")
    return kanji_list

def generate_wrong_answers(correct_meaning, all_meanings):
    """Generate 3 wrong answers from other kanji meanings"""
    # Remove the correct answer from the pool
    wrong_pool = [m for m in all_meanings if m != correct_meaning]
    
    # Randomly select 3 wrong answers
    if len(wrong_pool) >= 3:
        return random.sample(wrong_pool, 3)
    else:
        # If not enough, pad with generic answers
        generic_answers = ['water', 'fire', 'tree', 'person', 'big', 'small', 'mountain', 'river']
        wrong_answers = wrong_pool + [a for a in generic_answers if a not in wrong_pool]
        return random.sample(wrong_answers, 3)

def create_audio_file(text, lang='ja'):
    """Generate audio file using Google TTS"""
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.mp3')
    tts = gTTS(text=text, lang=lang, slow=False)
    tts.save(temp_file.name)
    return temp_file.name

def create_quiz_frame(kanji_data, stage='kanji', highlight_index=None):
    """Create a frame for the quiz"""
    img = Image.new('RGB', (WIDTH, HEIGHT), color='white')
    draw = ImageDraw.Draw(img)
    
    # Draw gradient background
    for y in range(HEIGHT):
        ratio = y / HEIGHT
        r = 255
        g = int(255 - ratio * 15)
        b = int(255 - ratio * 30)
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b))
    
    # Load fonts
    try:
        kanji_font = ImageFont.truetype("/System/Library/Fonts/Hiragino Sans GB.ttc", 280)
        option_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 60)
    except:
        kanji_font = ImageFont.load_default()
        option_font = ImageFont.load_default()
    
    # Draw kanji character
    kanji_bbox = draw.textbbox((0, 0), kanji_data['character'], font=kanji_font)
    kanji_width = kanji_bbox[2] - kanji_bbox[0]
    kanji_x = (WIDTH - kanji_width) // 2
    kanji_y = 150
    draw.text((kanji_x, kanji_y), kanji_data['character'], fill='black', font=kanji_font)
    
    # Draw options if needed
    if stage in ['options', 'highlight']:
        all_options = [kanji_data['correct']] + kanji_data['wrong_answers']
        
        button_width = 400
        button_height = 120
        button_spacing = 60
        total_width = (button_width * 2) + button_spacing
        start_x = (WIDTH - total_width) // 2
        start_y = HEIGHT - 400
        
        for i, option in enumerate(all_options):
            row = i // 2
            col = i % 2
            
            x = start_x + (col * (button_width + button_spacing))
            y = start_y + (row * (button_height + button_spacing))
            
            is_correct = (i == 0)
            
            if stage == 'highlight' and is_correct:
                bg_color = '#ec4899'
                border_color = '#f97316'
                text_color = 'white'
                border_width = 8
            else:
                bg_color = 'white'
                border_color = '#d1d5db'
                text_color = 'black'
                border_width = 4
            
            # Draw button
            draw.rectangle(
                [x, y, x + button_width, y + button_height],
                fill=bg_color,
                outline=border_color,
                width=border_width
            )
            
            # Thick bottom border
            bottom_border_height = 12
            draw.rectangle(
                [x, y + button_height - bottom_border_height, x + button_width, y + button_height],
                fill=border_color
            )
            
            # Draw text
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
    
    # Concatenate stages
    video_clip = concatenate_videoclips(clips, method="compose")
    
    # Generate audio
    audio_file = create_audio_file(kanji_data['reading'], lang='ja')
    audio_clip = AudioFileClip(audio_file)
    
    audio_start_time = SHOW_KANJI_DURATION + SHOW_OPTIONS_DURATION
    audio_clip = audio_clip.with_start(audio_start_time)
    
    # Extend video if needed
    total_duration = audio_start_time + audio_clip.duration + AUDIO_BUFFER
    if total_duration > video_clip.duration:
        last_frame_extension = total_duration - video_clip.duration
        extended_highlight = ImageClip(highlight_frame).with_duration(HIGHLIGHT_DURATION + last_frame_extension)
        video_clip = concatenate_videoclips(clips[:-1] + [extended_highlight], method="compose")
    
    final_clip = video_clip.with_audio(audio_clip)
    os.unlink(audio_file)
    
    return final_clip

def generate_all_n5_video():
    """Generate video for all N5 kanji"""
    print("🎬 Starting N5 Kanji Quiz Video Generation")
    print("=" * 60)
    
    # Fetch all N5 kanji
    kanji_list = fetch_n5_kanji()
    
    if not kanji_list:
        print("❌ No N5 kanji found!")
        return
    
    # Prepare all meanings for wrong answer generation
    all_meanings = [k['meaning'] for k in kanji_list if k.get('meaning')]
    
    print(f"\n📝 Preparing quiz data for {len(kanji_list)} kanji...")
    
    # Prepare quiz data
    quiz_data = []
    for kanji in kanji_list:
        # Get primary reading (prefer kun'yomi, fallback to on'yomi)
        kun_reading = kanji.get('kun_reading')
        on_reading = kanji.get('on_reading')
        
        # Extract first reading from array
        if kun_reading and len(kun_reading) > 0:
            reading = kun_reading[0]
        elif on_reading and len(on_reading) > 0:
            reading = on_reading[0]
        else:
            reading = kanji.get('character')
        
        quiz_item = {
            'character': kanji['character'],
            'correct': kanji['meaning'],
            'reading': reading,
            'wrong_answers': generate_wrong_answers(kanji['meaning'], all_meanings)
        }
        quiz_data.append(quiz_item)
    
    print(f"✓ Quiz data prepared for {len(quiz_data)} kanji\n")
    
    # Generate clips
    print("🎥 Generating video clips...")
    clips = []
    
    for i, kanji_data in enumerate(quiz_data):
        print(f"  [{i+1}/{len(quiz_data)}] Processing: {kanji_data['character']} ({kanji_data['correct']})")
        clip = create_kanji_quiz_clip(kanji_data)
        clips.append(clip)
    
    # Concatenate all clips
    print(f"\n🔗 Concatenating {len(clips)} clips...")
    final_video = concatenate_videoclips(clips, method="compose")
    
    # Calculate stats
    total_duration = sum(clip.duration for clip in clips)
    minutes = int(total_duration // 60)
    seconds = int(total_duration % 60)
    
    # Output file
    output_file = "n5_kanji_complete.mp4"
    print(f"\n💾 Rendering final video to {output_file}...")
    print(f"⏱️  Estimated duration: {minutes}m {seconds}s")
    print("⏳ This will take several minutes...\n")
    
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
    
    print(f"\n" + "=" * 60)
    print(f"✅ N5 Kanji Quiz Video Complete!")
    print(f"📹 File: {output_file}")
    print(f"📊 Total kanji: {len(quiz_data)}")
    print(f"⏱️  Duration: {minutes}m {seconds}s")
    print(f"📐 Resolution: {WIDTH}x{HEIGHT}")
    print(f"🔊 Audio: Japanese pronunciation (Google TTS)")
    print(f"=" * 60)

if __name__ == "__main__":
    generate_all_n5_video()
