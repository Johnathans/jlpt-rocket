# Backup Data Files

This directory contains backup copies of the JSON data files for development and editing purposes.

## Files

- `kanji.json` - All JLPT kanji data (N5-N1)
- `vocabulary.json` - All JLPT vocabulary data (N5-N1)
- `sentences.json` - All JLPT sentence examples (N5-N3)

## Important Notes

⚠️ **These files are NOT served to users**

The application loads all data from Supabase, which requires authentication. These backup files are kept here for:

1. **Development reference** - Easy to view and edit locally
2. **Data backup** - Safe copy in case of database issues
3. **Bulk updates** - Can edit and re-import to Supabase
4. **Version control** - Track changes over time (gitignored)

## Data Protection

✅ **Files are protected from scraping:**
- Not in `/public/` directory (not web-accessible)
- Listed in `.gitignore` (not committed to Git)
- Application uses Supabase only (requires authentication)

## Updating Data

If you need to update the data:

1. Edit the JSON files in this directory
2. Use the import scripts in `/scripts/` to upload to Supabase:
   - `import-kanji-to-supabase.js`
   - `import-vocabulary-from-yomitan.js`
   - (Create sentence import script if needed)

## File Sizes

- kanji.json: ~500KB (367 N3 + 1,034 other levels)
- vocabulary.json: ~2.5MB (8,245 entries)
- sentences.json: ~5MB (2,722 sentences)

**Total: ~8MB of educational content**
