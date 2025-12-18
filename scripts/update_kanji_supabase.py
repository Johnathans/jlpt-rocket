#!/usr/bin/env python3
"""
Update Supabase kanji table with jisho.org data
Reads from jisho_n*.json files and updates the kanji table
"""

import json
import os
from supabase import create_client, Client

# Load environment variables from .env.local
from dotenv import load_dotenv
load_dotenv('.env.local')

SUPABASE_URL = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')  # Use service role for updates

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
    print("Make sure you have a .env file with these variables")
    print("Or set SUPABASE_SERVICE_ROLE_KEY (not the anon key) for write access")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def load_jisho_data():
    """Load all jisho kanji data from JSON files"""
    all_kanji = []
    
    for level in ['n5', 'n4', 'n3', 'n2', 'n1']:
        filename = f'jisho_{level}_kanji.json'
        if os.path.exists(filename):
            with open(filename, 'r', encoding='utf-8') as f:
                data = json.load(f)
                all_kanji.extend(data)
                print(f"Loaded {len(data)} kanji from {filename}")
        else:
            print(f"Warning: {filename} not found")
    
    return all_kanji


def update_kanji_record(kanji_data: dict):
    """Update a single kanji record in Supabase"""
    character = kanji_data.get('character')
    
    if not character:
        return False
    
    # Prepare update data
    update_data = {
        'primary_meaning': kanji_data.get('primary_meaning'),
        'primary_word': kanji_data.get('primary_word'),
        'primary_reading': kanji_data.get('primary_reading'),
        'kun_examples': kanji_data.get('kun_examples', []),
        'on_examples': kanji_data.get('on_examples', []),
    }
    
    # Also update stroke_count and grade if available
    if kanji_data.get('stroke_count'):
        update_data['stroke_count'] = kanji_data['stroke_count']
    
    if kanji_data.get('grade'):
        update_data['grade'] = kanji_data['grade']
    
    # Update the meaning field if we have meanings from jisho
    meanings = kanji_data.get('meaning', [])
    if meanings and isinstance(meanings, list) and len(meanings) > 0:
        # Join meanings into a single string for the existing meaning field
        update_data['meaning'] = ', '.join(meanings)
    
    # Update on_reading and kun_reading arrays
    on_readings = kanji_data.get('on_reading', [])
    kun_readings = kanji_data.get('kun_reading', [])
    
    if on_readings:
        update_data['on_reading'] = on_readings
    if kun_readings:
        update_data['kun_reading'] = kun_readings
    
    try:
        result = supabase.table('kanji').update(update_data).eq('character', character).execute()
        
        if result.data:
            return True
        else:
            # Record might not exist, try to check
            check = supabase.table('kanji').select('id').eq('character', character).execute()
            if not check.data:
                print(f"  Kanji {character} not found in database")
            return False
            
    except Exception as e:
        print(f"  Error updating {character}: {e}")
        return False


def main():
    print("Loading jisho kanji data...")
    all_kanji = load_jisho_data()
    
    print(f"\nTotal kanji to update: {len(all_kanji)}")
    print("\nUpdating Supabase kanji table...")
    
    success_count = 0
    fail_count = 0
    
    for i, kanji in enumerate(all_kanji):
        character = kanji.get('character', '?')
        print(f"[{i+1}/{len(all_kanji)}] Updating: {character}", end='')
        
        if update_kanji_record(kanji):
            success_count += 1
            print(" ✓")
        else:
            fail_count += 1
            print(" ✗")
    
    print(f"\n=== Update Complete ===")
    print(f"Success: {success_count}")
    print(f"Failed: {fail_count}")


if __name__ == "__main__":
    main()
