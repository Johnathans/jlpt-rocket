-- Migration: Create user_streaks table for cross-device streak syncing
-- Run this in your Supabase SQL editor

-- Create user_streaks table
CREATE TABLE IF NOT EXISTS user_streaks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL UNIQUE,
  current_streak INTEGER DEFAULT 0,
  last_session_date DATE,
  total_sessions INTEGER DEFAULT 0,
  daily_streaks JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own streak" ON user_streaks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own streak" ON user_streaks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own streak" ON user_streaks
  FOR UPDATE USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_streaks_user_id ON user_streaks(user_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_streaks_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_streaks_updated_at
  BEFORE UPDATE ON user_streaks
  FOR EACH ROW
  EXECUTE FUNCTION update_user_streaks_updated_at();
