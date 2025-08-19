-- Kanji Table Migration Script
-- This script updates the existing kanji table to accommodate the enhanced kanji-data fields
-- while maintaining backward compatibility with the existing UI

-- First, let's add the new columns to the existing kanji table
ALTER TABLE kanji 
ADD COLUMN IF NOT EXISTS grade INTEGER,
ADD COLUMN IF NOT EXISTS jlpt_old INTEGER,
ADD COLUMN IF NOT EXISTS jlpt_new INTEGER,
ADD COLUMN IF NOT EXISTS meanings TEXT[],
ADD COLUMN IF NOT EXISTS wk_level INTEGER,
ADD COLUMN IF NOT EXISTS wk_meanings TEXT[],
ADD COLUMN IF NOT EXISTS wk_readings_on TEXT[],
ADD COLUMN IF NOT EXISTS wk_readings_kun TEXT[],
ADD COLUMN IF NOT EXISTS wk_radicals TEXT[];

-- Update the meaning column to be compatible with the new meanings array
-- We'll keep the existing meaning column as the primary meaning for UI compatibility
-- The meanings array will contain all available meanings

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_kanji_grade ON kanji(grade);
CREATE INDEX IF NOT EXISTS idx_kanji_jlpt_new ON kanji(jlpt_new);
CREATE INDEX IF NOT EXISTS idx_kanji_jlpt_old ON kanji(jlpt_old);
CREATE INDEX IF NOT EXISTS idx_kanji_wk_level ON kanji(wk_level);

-- Add comments to document the new fields
COMMENT ON COLUMN kanji.grade IS 'Japanese school grade level (1-6 for elementary, 8+ for secondary)';
COMMENT ON COLUMN kanji.jlpt_old IS 'Old JLPT level classification (1-4)';
COMMENT ON COLUMN kanji.jlpt_new IS 'New JLPT level classification (1-5, maps to N5-N1)';
COMMENT ON COLUMN kanji.meanings IS 'Array of all English meanings from kanji-data';
COMMENT ON COLUMN kanji.wk_level IS 'WaniKani level (1-60)';
COMMENT ON COLUMN kanji.wk_meanings IS 'WaniKani specific meanings';
COMMENT ON COLUMN kanji.wk_readings_on IS 'WaniKani on-yomi readings';
COMMENT ON COLUMN kanji.wk_readings_kun IS 'WaniKani kun-yomi readings';
COMMENT ON COLUMN kanji.wk_radicals IS 'WaniKani radical names for this kanji';

-- Create a view that maintains the existing interface for backward compatibility
CREATE OR REPLACE VIEW kanji_legacy AS
SELECT 
    id,
    character,
    meaning, -- Keep the primary meaning for UI compatibility
    on_reading,
    kun_reading,
    jlpt_level,
    frequency_rank,
    stroke_count,
    radical,
    created_at,
    updated_at
FROM kanji;

-- Create an enhanced view that exposes all the new data
CREATE OR REPLACE VIEW kanji_enhanced AS
SELECT 
    id,
    character,
    meaning as primary_meaning,
    meanings as all_meanings,
    on_reading,
    kun_reading,
    jlpt_level,
    jlpt_old,
    jlpt_new,
    frequency_rank,
    stroke_count,
    grade,
    radical,
    wk_level,
    wk_meanings,
    wk_readings_on,
    wk_readings_kun,
    wk_radicals,
    created_at,
    updated_at
FROM kanji;
