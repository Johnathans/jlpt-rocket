-- Migration: Fix item_id type mismatch in user_progress table
-- Issue: Content tables (kanji, vocabulary, sentences) use UUID, but user_progress expects INTEGER
-- Solution: Change user_progress.item_id from INTEGER to TEXT to support UUIDs

-- Step 1: Change item_id column type from INTEGER to TEXT
ALTER TABLE user_progress ALTER COLUMN item_id TYPE TEXT;

-- Step 2: Verify the change
-- You can run this to check the column type:
-- SELECT column_name, data_type FROM information_schema.columns 
-- WHERE table_name = 'user_progress' AND column_name = 'item_id';

-- Note: This migration is safe because:
-- 1. TEXT can store both UUIDs and numeric strings
-- 2. The UNIQUE constraint on (user_id, item_id, item_type) will still work
-- 3. Existing data (if any) will be automatically cast to TEXT
