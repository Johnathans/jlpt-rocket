# JLPT YouTube Video Generator

Generate educational YouTube videos from your JLPT content using MoviePy.

## Setup

1. **Install Python dependencies:**
```bash
cd video_generator
pip install -r requirements.txt
```

2. **Install system fonts (optional but recommended):**
- macOS: Fonts are usually pre-installed
- For better Japanese support, install Noto Sans JP font

## Generate Sample Video

Run the sample generator to create a test video:

```bash
python sample_kanji_video.py
```

This will create `sample_kanji_video.mp4` with 3 sample kanji (学, 食, 水).

## Video Output

- **Resolution:** 1920x1080 (Full HD)
- **Duration:** 8 seconds per kanji
- **Format:** MP4 (H.264)
- **Style:** Clean, minimalist design matching your app

## Sample Video Features

- ✅ Large kanji character (center)
- ✅ English meaning (pink accent)
- ✅ On'yomi reading (red, top right)
- ✅ Kun'yomi reading (blue, bottom right)
- ✅ Example words (bottom)
- ✅ Smooth fade in/out animations
- ✅ Gradient background

## Next Steps

After reviewing the sample:
1. Adjust timing, colors, fonts
2. Add background music
3. Add Japanese audio (TTS)
4. Connect to Supabase for real data
5. Batch generate full series
