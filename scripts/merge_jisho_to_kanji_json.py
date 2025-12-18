#!/usr/bin/env python3
"""
Merge jisho data into public/data/kanji.json
Jisho data is the source of truth - overwrites existing fields
"""

import json


def load_jisho_data():
    """Load all jisho kanji data from JSON files into a dict by character"""
    jisho_by_char = {}
    
    for level in ['n5', 'n4', 'n3', 'n2', 'n1']:
        filename = f'jisho_{level}_kanji.json'
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                data = json.load(f)
                for kanji in data:
                    char = kanji.get('character')
                    if char:
                        jisho_by_char[char] = kanji
                print(f"Loaded {len(data)} kanji from {filename}")
        except FileNotFoundError:
            print(f"Warning: {filename} not found")
    
    return jisho_by_char


def merge_kanji_data():
    """Merge jisho data into kanji.json"""
    
    # Load existing kanji.json
    with open('public/data/kanji.json', 'r', encoding='utf-8') as f:
        existing_kanji = json.load(f)
    
    print(f"\nExisting kanji.json: {len(existing_kanji)} entries")
    
    # Load jisho data
    jisho_data = load_jisho_data()
    print(f"Total jisho kanji: {len(jisho_data)} entries")
    
    # Merge: jisho data is source of truth
    updated_count = 0
    for kanji in existing_kanji:
        char = kanji.get('character')
        if char and char in jisho_data:
            jisho = jisho_data[char]
            
            # Overwrite/add fields from jisho (source of truth)
            # Meaning - join array into string if needed
            if jisho.get('meaning'):
                meanings = jisho['meaning']
                if isinstance(meanings, list):
                    kanji['meaning'] = ', '.join(meanings)
                else:
                    kanji['meaning'] = meanings
            
            # Primary meaning
            if jisho.get('primary_meaning'):
                kanji['primary_meaning'] = jisho['primary_meaning']
            
            # Readings
            if jisho.get('on_reading'):
                kanji['on_reading'] = jisho['on_reading']
            if jisho.get('kun_reading'):
                kanji['kun_reading'] = jisho['kun_reading']
            
            # Primary word/reading
            if jisho.get('primary_word'):
                kanji['primary_word'] = jisho['primary_word']
            if jisho.get('primary_reading'):
                kanji['primary_reading'] = jisho['primary_reading']
            
            # Reading examples
            if jisho.get('kun_examples'):
                kanji['kun_examples'] = jisho['kun_examples']
            if jisho.get('on_examples'):
                kanji['on_examples'] = jisho['on_examples']
            
            # Other fields
            if jisho.get('stroke_count'):
                kanji['stroke_count'] = jisho['stroke_count']
            if jisho.get('grade'):
                kanji['grade'] = jisho['grade']
            if jisho.get('frequency'):
                kanji['frequency'] = jisho['frequency']
            
            updated_count += 1
    
    print(f"\nUpdated {updated_count} kanji entries with jisho data")
    
    # Save updated kanji.json
    with open('public/data/kanji.json', 'w', encoding='utf-8') as f:
        json.dump(existing_kanji, f, ensure_ascii=False, indent=2)
    
    print(f"✓ Saved updated kanji.json")
    
    # Show sample of updated data
    print("\n--- Sample updated entry ---")
    sample = next((k for k in existing_kanji if k.get('primary_word')), None)
    if sample:
        print(json.dumps(sample, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    merge_kanji_data()
