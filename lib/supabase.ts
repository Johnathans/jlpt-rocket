import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

// Single Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

// Use the same client instance
export const createSupabaseClient = () => supabase

// Database types (will be generated from Supabase)
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          jlpt_level: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          jlpt_level?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          jlpt_level?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          item_id: string
          item_type: 'vocabulary' | 'kanji' | 'sentences'
          mastery_level: number
          correct_count: number
          incorrect_count: number
          last_reviewed: string | null
          next_review_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          item_id: string
          item_type: 'vocabulary' | 'kanji' | 'sentences'
          mastery_level?: number
          correct_count?: number
          incorrect_count?: number
          last_reviewed?: string | null
          next_review_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          item_id?: string
          item_type?: 'vocabulary' | 'kanji' | 'sentences'
          mastery_level?: number
          correct_count?: number
          incorrect_count?: number
          last_reviewed?: string | null
          next_review_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
