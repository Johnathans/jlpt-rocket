#!/usr/bin/env python3
"""
Fetch N5 Kanji list from jisho.org using jisho-api
"""

import json
import time
from jisho_api.kanji import Kanji
from jisho_api.word import Word

# N5 Kanji list - these are the standard JLPT N5 kanji
# We'll search jisho.org for each one to get full details
N5_KANJI_CHARS = [
    "一", "二", "三", "四", "五", "六", "七", "八", "九", "十",
    "百", "千", "万", "円", "年", "月", "日", "時", "分", "半",
    "週", "毎", "今", "先", "来", "前", "後", "午", "上", "下",
    "中", "外", "右", "左", "北", "南", "東", "西", "口", "出",
    "入", "休", "見", "聞", "読", "書", "話", "買", "食", "飲",
    "行", "来", "帰", "会", "立", "待", "持", "使", "作", "思",
    "言", "知", "住", "生", "死", "起", "寝", "開", "閉", "始",
    "終", "教", "習", "勉", "強", "大", "小", "高", "安", "新",
    "古", "長", "短", "多", "少", "早", "遅", "近", "遠", "明",
    "暗", "白", "黒", "赤", "青", "人", "男", "女", "子", "父",
    "母", "友", "私", "何", "誰", "名", "本", "電", "車", "駅",
    "道", "店", "国", "山", "川", "海", "空", "天", "気", "雨",
    "雪", "花", "木", "水", "火", "土", "金", "学", "校", "語",
]

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
                "jlpt_level": data.jlpt if hasattr(data, 'jlpt') else "N5",
                "grade": data.taught_in if hasattr(data, 'taught_in') else None,
                "frequency": data.newspaper_frequency_rank if hasattr(data, 'newspaper_frequency_rank') else None,
            }
    except Exception as e:
        print(f"Error fetching {kanji_char}: {e}")
    return None

def main():
    print(f"Fetching {len(N5_KANJI_CHARS)} N5 kanji from jisho.org...")
    
    kanji_list = []
    
    for i, kanji in enumerate(N5_KANJI_CHARS):
        print(f"[{i+1}/{len(N5_KANJI_CHARS)}] Fetching: {kanji}")
        
        details = fetch_kanji_details(kanji)
        if details:
            kanji_list.append(details)
            print(f"  ✓ {kanji}: {details.get('meaning', [])}")
        else:
            # Add basic entry even if fetch fails
            kanji_list.append({
                "character": kanji,
                "meaning": [],
                "on_reading": [],
                "kun_reading": [],
                "stroke_count": None,
                "jlpt_level": "N5",
                "grade": None,
                "frequency": None,
            })
            print(f"  ✗ {kanji}: Failed to fetch, added basic entry")
        
        # Be respectful to jisho.org - add delay between requests
        time.sleep(0.5)
    
    # Save to JSON file
    output_file = "jisho_n5_kanji.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(kanji_list, f, ensure_ascii=False, indent=2)
    
    print(f"\n✓ Saved {len(kanji_list)} kanji to {output_file}")

if __name__ == "__main__":
    main()
