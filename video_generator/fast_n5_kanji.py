#!/usr/bin/env python3
"""
FAST N5 Kanji Video Generator
Pre-generates images, then uses ffmpeg for assembly (10x faster!)
"""

from PIL import Image, ImageDraw, ImageFont
import os
import random
import subprocess
from gtts import gTTS
from supabase import create_client, Client
from dotenv import load_dotenv
import shutil

# Load environment variables
load_dotenv('../.env.local')

# Initialize Supabase
supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
supabase_key = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
supabase: Client = create_client(supabase_url, supabase_key)

# Video configuration
WIDTH = 1920
HEIGHT = 1080
FPS = 24  # Lower FPS for faster rendering

# Timing configuration (in seconds)
SHOW_KANJI_DURATION = 2.0
SHOW_OPTIONS_DURATION = 3.0
HIGHLIGHT_DURATION = 1.5

# Create temp directories
TEMP_DIR = "temp_frames"
AUDIO_DIR = "temp_audio"
os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs(AUDIO_DIR, exist_ok=True)

def fetch_n5_kanji():
    """Fetch all N5 kanji from Supabase"""
    print("📥 Fetching N5 kanji from Supabase...")
    response = supabase.table('kanji').select('*').eq('jlpt_level', 'N5').execute()
    kanji_list = response.data
    print(f"✓ Found {len(kanji_list)} N5 kanji")
    return kanji_list

def generate_wrong_answers(correct_meaning, all_meanings):
    """Generate 3 wrong answers"""
    wrong_pool = [m for m in all_meanings if m != correct_meaning]
    if len(wrong_pool) >= 3:
        return random.sample(wrong_pool, 3)
    else:
        generic_answers = ['water', 'fire', 'tree', 'person', 'big', 'small', 'mountain', 'river']
        wrong_answers = wrong_pool + [a for a in generic_answers if a not in wrong_pool]
        return random.sample(wrong_answers, 3)

def create_quiz_image(kanji_data, stage='kanji'):
    """Create a single image for a quiz stage"""
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
    
    return img

def generate_audio(text, filename):
    """Generate audio file using Google TTS"""
    tts = gTTS(text=text, lang='ja', slow=False)
    tts.save(filename)

def create_video_with_ffmpeg(kanji_list, output_file):
    """Create video using ffmpeg (much faster!)"""
    
    print("\n🎨 Generating images for all kanji...")
    
    # Prepare quiz data
    all_meanings = [k['meaning'] for k in kanji_list if k.get('meaning')]
    
    concat_list = []
    
    for i, kanji in enumerate(kanji_list):
        print(f"  [{i+1}/{len(kanji_list)}] {kanji['character']} ({kanji['meaning']})")
        
        # Get reading
        kun_reading = kanji.get('kun_reading')
        on_reading = kanji.get('on_reading')
        
        if kun_reading and len(kun_reading) > 0:
            reading = kun_reading[0]
        elif on_reading and len(on_reading) > 0:
            reading = on_reading[0]
        else:
            reading = kanji.get('character')
        
        quiz_data = {
            'character': kanji['character'],
            'correct': kanji['meaning'],
            'reading': reading,
            'wrong_answers': generate_wrong_answers(kanji['meaning'], all_meanings)
        }
        
        # Generate 3 images for this kanji
        img1 = create_quiz_image(quiz_data, stage='kanji')
        img2 = create_quiz_image(quiz_data, stage='options')
        img3 = create_quiz_image(quiz_data, stage='highlight')
        
        # Save images
        img1_path = f"{TEMP_DIR}/kanji_{i:03d}_1.png"
        img2_path = f"{TEMP_DIR}/kanji_{i:03d}_2.png"
        img3_path = f"{TEMP_DIR}/kanji_{i:03d}_3.png"
        
        img1.save(img1_path)
        img2.save(img2_path)
        img3.save(img3_path)
        
        # Generate audio
        audio_path = f"{AUDIO_DIR}/kanji_{i:03d}.mp3"
        generate_audio(reading, audio_path)
        
        # Add to concat list
        concat_list.append({
            'images': [img1_path, img2_path, img3_path],
            'durations': [SHOW_KANJI_DURATION, SHOW_OPTIONS_DURATION, HIGHLIGHT_DURATION],
            'audio': audio_path
        })
    
    print(f"\n✓ Generated {len(kanji_list) * 3} images")
    
    # Create ffmpeg concat file
    print("\n🎬 Creating video with ffmpeg...")
    
    concat_file = f"{TEMP_DIR}/concat.txt"
    with open(concat_file, 'w') as f:
        for item in concat_list:
            for img_path, duration in zip(item['images'], item['durations']):
                f.write(f"file '{os.path.abspath(img_path)}'\n")
                f.write(f"duration {duration}\n")
        # Add last image again (ffmpeg requirement)
        f.write(f"file '{os.path.abspath(concat_list[-1]['images'][-1])}'\n")
    
    # Create video without audio first
    video_no_audio = "temp_video_no_audio.mp4"
    cmd_video = [
        'ffmpeg', '-y',
        '-f', 'concat',
        '-safe', '0',
        '-i', concat_file,
        '-vf', f'fps={FPS},format=yuv420p',
        '-c:v', 'libx264',
        '-preset', 'veryfast',
        video_no_audio
    ]
    
    print("  📹 Encoding video frames...")
    subprocess.run(cmd_video, check=True, capture_output=True)
    
    # Combine all audio files
    print("  🔊 Merging audio tracks...")
    audio_concat_file = f"{AUDIO_DIR}/audio_concat.txt"
    with open(audio_concat_file, 'w') as f:
        current_time = 0
        for i, item in enumerate(concat_list):
            # Audio starts at the highlight stage
            audio_start = current_time + SHOW_KANJI_DURATION + SHOW_OPTIONS_DURATION
            f.write(f"file '{os.path.abspath(item['audio'])}'\n")
            
            # Calculate silence needed before next audio
            total_duration = sum(item['durations'])
            if i < len(concat_list) - 1:
                silence_duration = total_duration - HIGHLIGHT_DURATION
                # We'll handle timing with ffmpeg filter instead
            
            current_time += total_duration
    
    # Merge audio
    merged_audio = f"{AUDIO_DIR}/merged_audio.mp3"
    cmd_audio = [
        'ffmpeg', '-y',
        '-f', 'concat',
        '-safe', '0',
        '-i', audio_concat_file,
        '-c:a', 'libmp3lame',
        merged_audio
    ]
    subprocess.run(cmd_audio, check=True, capture_output=True)
    
    # Combine video and audio
    print("  🎵 Adding audio to video...")
    cmd_final = [
        'ffmpeg', '-y',
        '-i', video_no_audio,
        '-i', merged_audio,
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-shortest',
        output_file
    ]
    subprocess.run(cmd_final, check=True, capture_output=True)
    
    # Cleanup temp files
    os.remove(video_no_audio)
    
    print(f"\n✅ Video created: {output_file}")

def main():
    print("🎬 FAST N5 Kanji Quiz Video Generator")
    print("=" * 60)
    
    # Fetch kanji
    kanji_list = fetch_n5_kanji()
    
    if not kanji_list:
        print("❌ No N5 kanji found!")
        return
    
    # Generate video
    output_file = "n5_kanji_complete_fast.mp4"
    create_video_with_ffmpeg(kanji_list, output_file)
    
    # Calculate stats
    total_duration = len(kanji_list) * (SHOW_KANJI_DURATION + SHOW_OPTIONS_DURATION + HIGHLIGHT_DURATION)
    minutes = int(total_duration // 60)
    seconds = int(total_duration % 60)
    
    print("\n" + "=" * 60)
    print(f"✅ N5 Kanji Quiz Video Complete!")
    print(f"📹 File: {output_file}")
    print(f"📊 Total kanji: {len(kanji_list)}")
    print(f"⏱️  Duration: {minutes}m {seconds}s")
    print(f"📐 Resolution: {WIDTH}x{HEIGHT}")
    print(f"🎞️  Frame rate: {FPS} FPS")
    print("=" * 60)
    
    # Cleanup
    print("\n🧹 Cleaning up temporary files...")
    shutil.rmtree(TEMP_DIR)
    shutil.rmtree(AUDIO_DIR)
    print("✓ Cleanup complete")

if __name__ == "__main__":
    main()
