-- Kanji Table Migration Script for Jisho Data
-- This script adds new columns for the jisho.org reading examples data

-- Add new columns for jisho reading examples
ALTER TABLE kanji 
ADD COLUMN IF NOT EXISTS primary_meaning TEXT,
ADD COLUMN IF NOT EXISTS primary_word TEXT,
ADD COLUMN IF NOT EXISTS primary_reading TEXT,
ADD COLUMN IF NOT EXISTS kun_examples JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS on_examples JSONB DEFAULT '[]'::jsonb;

-- Add comments to document the new fields
COMMENT ON COLUMN kanji.primary_meaning IS 'Primary/most common English meaning from jisho.org';
COMMENT ON COLUMN kanji.primary_word IS 'Primary example word using this kanji (usually kun reading)';
COMMENT ON COLUMN kanji.primary_reading IS 'Reading of the primary example word';
COMMENT ON COLUMN kanji.kun_examples IS 'Array of kun reading example words [{word, reading, meaning}]';
COMMENT ON COLUMN kanji.on_examples IS 'Array of on reading example words [{word, reading, meaning}]';

-- Create index for primary_meaning searches
CREATE INDEX IF NOT EXISTS idx_kanji_primary_meaning ON kanji(primary_meaning);
