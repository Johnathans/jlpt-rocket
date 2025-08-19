import { supabase } from './supabase'

export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1'

// Enhanced KanjiData interface with new fields from kanji-data repo
export interface EnhancedKanjiData {
  id: string
  character: string
  meaning: string // Primary meaning for UI compatibility
  meanings: string[] // All available meanings
  on_reading: string[]
  kun_reading: string[]
  jlpt_level: JLPTLevel
  jlpt_old: number | null // Old JLPT level (1-4)
  jlpt_new: number | null // New JLPT level (1-5)
  frequency_rank: number
  stroke_count: number
  grade: number | null // Japanese school grade level
  radical: string
  wk_level: number | null // WaniKani level
  wk_meanings: string[] | null // WaniKani meanings
  wk_readings_on: string[] | null // WaniKani on-yomi
  wk_readings_kun: string[] | null // WaniKani kun-yomi
  wk_radicals: string[] | null // WaniKani radicals
  created_at: string
  updated_at: string
}

// Keep the original interface for backward compatibility
export interface KanjiData {
  id: string
  character: string
  meaning: string
  on_reading: string[]
  kun_reading: string[]
  jlpt_level: JLPTLevel
  frequency_rank: number
  stroke_count: number
  radical: string
  created_at: string
  updated_at: string
}

// Function to get enhanced kanji data (for future use)
export async function getEnhancedKanjiByLevel(level: JLPTLevel): Promise<EnhancedKanjiData[]> {
  const { data, error } = await supabase
    .from('kanji')
    .select('*')
    .eq('jlpt_level', level)
    .order('frequency_rank', { ascending: true })
    .limit(5000)

  if (error) {
    console.error('Error fetching enhanced kanji:', error)
    throw error
  }

  return data || []
}

// Function to get kanji with WaniKani data
export async function getKanjiWithWaniKaniData(level: JLPTLevel): Promise<EnhancedKanjiData[]> {
  const { data, error } = await supabase
    .from('kanji')
    .select('*')
    .eq('jlpt_level', level)
    .not('wk_level', 'is', null) // Only kanji that exist in WaniKani
    .order('wk_level', { ascending: true })
    .limit(5000)

  if (error) {
    console.error('Error fetching WaniKani kanji:', error)
    throw error
  }

  return data || []
}

// Function to get kanji by grade level
export async function getKanjiByGrade(grade: number): Promise<EnhancedKanjiData[]> {
  const { data, error } = await supabase
    .from('kanji')
    .select('*')
    .eq('grade', grade)
    .order('frequency_rank', { ascending: true })
    .limit(5000)

  if (error) {
    console.error('Error fetching kanji by grade:', error)
    throw error
  }

  return data || []
}
