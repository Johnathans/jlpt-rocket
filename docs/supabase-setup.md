# Supabase Setup Guide for JLPT Rocket

This guide will help you set up Supabase for authentication and database functionality in the JLPT Rocket application.

## Prerequisites

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project in your Supabase dashboard

## Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in your Supabase credentials from your project dashboard:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Database Schema

Run the following SQL commands in your Supabase SQL editor to set up the required tables:

### 1. Enable Row Level Security and Create Profiles Table

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  jlpt_level TEXT DEFAULT 'N5',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### 2. Create User Progress Table

```sql
-- Create user_progress table
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  item_id TEXT NOT NULL,  -- Changed from INTEGER to TEXT to support UUIDs
  item_type TEXT NOT NULL CHECK (item_type IN ('vocabulary', 'kanji', 'sentences')),
  mastery_level INTEGER DEFAULT 0 CHECK (mastery_level >= 0 AND mastery_level <= 100),
  correct_count INTEGER DEFAULT 0,
  incorrect_count INTEGER DEFAULT 0,
  last_reviewed TIMESTAMP WITH TIME ZONE,
  next_review_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_id, item_type)
);

-- Enable RLS
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own progress" ON user_progress
  FOR DELETE USING (auth.uid() = user_id);
```

### 3. Create Profile Trigger Function

```sql
-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 4. Create Updated At Trigger

```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```

## Authentication Configuration

1. In your Supabase dashboard, go to Authentication > Settings
2. Configure your site URL (e.g., `http://localhost:3000` for development)
3. Add redirect URLs for production deployment
4. Enable email confirmation if desired

## Testing the Setup

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Navigate to `/signup` to test user registration
4. Navigate to `/login` to test user authentication

## Features Implemented

- ✅ User registration with email/password
- ✅ User login with email/password
- ✅ User profile management
- ✅ Progress tracking per user
- ✅ Row Level Security (RLS) policies
- ✅ Automatic profile creation on signup
- ✅ JLPT level selection and storage

## Next Steps

1. Integrate user progress with the existing ReviewSystem
2. Add user-specific data filtering throughout the app
3. Implement user dashboard with personalized content
4. Add password reset functionality
5. Consider adding OAuth providers (Google, etc.)

## Troubleshooting

- Make sure environment variables are properly set
- Check Supabase logs for any database errors
- Verify RLS policies are correctly configured
- Ensure all required tables and functions are created
