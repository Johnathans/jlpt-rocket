#!/usr/bin/env python3
"""
Fetch N2 Kanji details from jisho.org using jisho-api
Uses our existing kanji.json to get the N2 kanji list
"""

import json
import time
from jisho_api.kanji import Kanji


def get_n2_kanji_from_our_data():
    """Load N2 kanji characters from our existing kanji.json"""
    with open('public/data/kanji.json', 'r', encoding='utf-8') as f:
        kanji_data = json.load(f)
    
    n2_kanji = [k['character'] for k in kanji_data if k.get('jlpt_level') == 'N2']
    return n2_kanji


def fetch_kanji_details(kanji_char):
    """Fetch detailed information for a single kanji from jisho.org"""
    try:
        result = Kanji.request(kanji_char)
        if result and result.data:
            data = result.data
            
            # Get reading examples
            kun_examples = []
            on_examples = []
            primary_word = None
            primary_reading = None
            
            if hasattr(data, 'reading_examples') and data.reading_examples:
                # Get kun reading examples
                if data.reading_examples.kun:
                    for ex in data.reading_examples.kun[:3]:
                        kun_examples.append({
                            "word": ex.kanji,
                            "reading": ex.reading,
                            "meaning": ex.meanings[0] if ex.meanings else ""
                        })
                    # Primary word is usually the first kun example (standalone usage)
                    first_kun = data.reading_examples.kun[0]
                    primary_word = first_kun.kanji
                    primary_reading = first_kun.reading
                
                # Get on reading examples
                if data.reading_examples.on:
                    for ex in data.reading_examples.on[:3]:
                        on_examples.append({
                            "word": ex.kanji,
                            "reading": ex.reading,
                            "meaning": ex.meanings[0] if ex.meanings else ""
                        })
                    # If no kun example, use on example as primary
                    if not primary_word and data.reading_examples.on:
                        first_on = data.reading_examples.on[0]
                        primary_word = first_on.kanji
                        primary_reading = first_on.reading
            
            return {
                "character": kanji_char,
                "meaning": data.main_meanings if hasattr(data, 'main_meanings') else [],
                "primary_meaning": data.main_meanings[0] if hasattr(data, 'main_meanings') and data.main_meanings else None,
                "on_reading": data.main_readings.on if hasattr(data, 'main_readings') and data.main_readings else [],
                "kun_reading": data.main_readings.kun if hasattr(data, 'main_readings') and data.main_readings else [],
                "primary_word": primary_word,
                "primary_reading": primary_reading,
                "kun_examples": kun_examples,
                "on_examples": on_examples,
                "stroke_count": data.strokes if hasattr(data, 'strokes') else None,
                "jlpt_level": "N2",
                "grade": data.taught_in if hasattr(data, 'taught_in') else None,
                "frequency": data.newspaper_frequency_rank if hasattr(data, 'newspaper_frequency_rank') else None,
            }
    except Exception as e:
        print(f"Error fetching {kanji_char}: {e}")
    return None

def main():
    # Get N2 kanji from our existing data
    N2_KANJI = get_n2_kanji_from_our_data()
    
    print(f"Fetching {len(N2_KANJI)} N2 kanji from jisho.org...")
    
    kanji_list = []
    
    for i, kanji in enumerate(N2_KANJI):
        print(f"[{i+1}/{len(N2_KANJI)}] Fetching: {kanji}")
        
        details = fetch_kanji_details(kanji)
        if details:
            kanji_list.append(details)
            print(f"  ✓ {kanji}: {details.get('meaning', [])}")
        else:
            # Add basic entry even if fetch fails
            kanji_list.append({
                "character": kanji,
                "meaning": [],
                "primary_meaning": None,
                "on_reading": [],
                "kun_reading": [],
                "primary_word": None,
                "primary_reading": None,
                "kun_examples": [],
                "on_examples": [],
                "stroke_count": None,
                "jlpt_level": "N2",
                "grade": None,
                "frequency": None,
            })
            print(f"  ✗ {kanji}: Failed to fetch, added basic entry")
        
        # Be respectful to jisho.org - add delay between requests
        time.sleep(0.5)
    
    # Save to JSON file
    output_file = "jisho_n2_kanji.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(kanji_list, f, ensure_ascii=False, indent=2)
    
    print(f"\n✓ Saved {len(kanji_list)} kanji to {output_file}")

if __name__ == "__main__":
    main()
