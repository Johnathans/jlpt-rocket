# Data Directory

This directory previously contained JSON data files but they have been removed for security.

## Why Files Were Removed

The JSON files (kanji.json, vocabulary.json, sentences.json) were publicly accessible and could be scraped by anyone. To protect this valuable educational content, all data is now served exclusively through Supabase, which requires user authentication.

## Where Is The Data Now?

- **Production**: All data is stored in and served from Supabase database
- **Backup**: Local copies are in `/backup-data/` (gitignored, not web-accessible)
- **Application**: `lib/local-data.ts` loads from Supabase with in-memory caching

## Benefits of This Approach

✅ **Security**: Data requires authentication to access  
✅ **Performance**: In-memory caching keeps app fast  
✅ **Scalability**: Supabase handles all database operations  
✅ **Protection**: No direct file downloads possible  

## For Developers

If you need to work with the data locally:
1. Check `/backup-data/` for JSON files
2. Use Supabase dashboard to query data
3. Use import scripts in `/scripts/` to update database
