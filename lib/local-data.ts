import { supabase } from './supabase'

export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1'

// In-memory cache for JSON data
let kanjiCache: any[] | null = null;
let vocabularyCache: any[] | null = null;
let sentencesCache: any[] | null = null;

// Load JSON data from public/data folder
async function loadKanjiData() {
  if (kanjiCache) return kanjiCache;
  
  try {
    const response = await fetch('/data/kanji.json');
    if (!response.ok) throw new Error('Failed to load kanji.json');
    kanjiCache = await response.json();
    console.log('✓ Loaded kanji from local JSON:', kanjiCache?.length || 0, 'entries');
    return kanjiCache;
  } catch (error) {
    console.error('Failed to load local kanji data:', error);
    return null;
  }
}

async function loadVocabularyData() {
  if (vocabularyCache) return vocabularyCache;
  
  try {
    const response = await fetch('/data/vocabulary.json');
    if (!response.ok) throw new Error('Failed to load vocabulary.json');
    vocabularyCache = await response.json();
    console.log('✓ Loaded vocabulary from local JSON:', vocabularyCache?.length || 0, 'entries');
    return vocabularyCache;
  } catch (error) {
    console.error('Failed to load local vocabulary data:', error);
    return null;
  }
}

async function loadSentencesData() {
  if (sentencesCache) return sentencesCache;
  
  try {
    const response = await fetch('/data/sentences.json');
    if (!response.ok) throw new Error('Failed to load sentences.json');
    sentencesCache = await response.json();
    console.log('✓ Loaded sentences from local JSON:', sentencesCache?.length || 0, 'entries');
    return sentencesCache;
  } catch (error) {
    console.error('Failed to load local sentences data:', error);
    return null;
  }
}

// Kanji data functions with local JSON + Supabase fallback
export async function getKanjiByLevel(level: JLPTLevel) {
  // Try local JSON first
  const localData = await loadKanjiData();
  if (localData) {
    return localData.filter((k: any) => k.jlpt_level === level);
  }
  
  // Fallback to Supabase
  console.log('Falling back to Supabase for kanji');
  const { data, error } = await supabase
    .from('kanji')
    .select('*')
    .eq('jlpt_level', level)
    .order('frequency_rank', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

export async function getAllKanji() {
  // Try local JSON first
  const localData = await loadKanjiData();
  if (localData) {
    return localData.sort((a: any, b: any) => a.frequency_rank - b.frequency_rank);
  }
  
  // Fallback to Supabase
  console.log('Falling back to Supabase for all kanji');
  const { data, error } = await supabase
    .from('kanji')
    .select('*')
    .order('frequency_rank', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

export async function getKanjiByCharacter(character: string) {
  // Try local JSON first
  const localData = await loadKanjiData();
  if (localData) {
    return localData.find((k: any) => k.character === character);
  }
  
  // Fallback to Supabase
  console.log('Falling back to Supabase for kanji character');
  const { data, error } = await supabase
    .from('kanji')
    .select('*')
    .eq('character', character)
    .single();
  
  if (error) throw error;
  return data;
}

// Vocabulary data functions with local JSON + Supabase fallback
export async function getVocabularyByLevel(level: JLPTLevel) {
  // Try local JSON first
  const localData = await loadVocabularyData();
  if (localData) {
    return localData.filter((v: any) => v.jlpt_level === level);
  }
  
  // Fallback to Supabase
  console.log('Falling back to Supabase for vocabulary');
  const { data, error } = await supabase
    .from('vocabulary')
    .select('*')
    .eq('jlpt_level', level)
    .order('frequency_rank', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

export async function getVocabularyCountByLevel(level: JLPTLevel): Promise<number> {
  // Try local JSON first
  const localData = await loadVocabularyData();
  if (localData) {
    return localData.filter((v: any) => v.jlpt_level === level).length;
  }
  
  // Fallback to Supabase
  console.log('Falling back to Supabase for vocabulary count');
  const { count, error } = await supabase
    .from('vocabulary')
    .select('*', { count: 'exact', head: true })
    .eq('jlpt_level', level);
  
  if (error) throw error;
  return count || 0;
}

export async function getVocabularyExamplesForKanji(kanjiCharacter: string, limit: number = 10) {
  // Try local JSON first
  const localData = await loadVocabularyData();
  if (localData) {
    return localData
      .filter((v: any) => v.kanji_used && v.kanji_used.includes(kanjiCharacter))
      .sort((a: any, b: any) => a.frequency_rank - b.frequency_rank)
      .slice(0, limit);
  }
  
  // Fallback to Supabase
  console.log('Falling back to Supabase for vocabulary examples');
  const { data, error } = await supabase
    .from('vocabulary')
    .select('*')
    .contains('kanji_used', [kanjiCharacter])
    .order('frequency_rank', { ascending: true })
    .limit(limit);
  
  if (error) throw error;
  return data || [];
}

export async function getVocabularyCountForKanji(kanjiCharacter: string): Promise<number> {
  // Try local JSON first
  const localData = await loadVocabularyData();
  if (localData) {
    return localData.filter((v: any) => v.kanji_used && v.kanji_used.includes(kanjiCharacter)).length;
  }
  
  // Fallback to Supabase
  console.log('Falling back to Supabase for vocabulary count');
  const { count, error } = await supabase
    .from('vocabulary')
    .select('*', { count: 'exact', head: true })
    .contains('kanji_used', [kanjiCharacter]);
  
  if (error) throw error;
  return count || 0;
}

// Sentences data functions with local JSON + Supabase fallback
export async function getSentencesByLevel(level: JLPTLevel) {
  // Try local JSON first
  const localData = await loadSentencesData();
  if (localData) {
    return localData
      .filter((s: any) => s.jlpt_level === level)
      .sort((a: any, b: any) => a.difficulty_level - b.difficulty_level);
  }
  
  // Fallback to Supabase
  console.log('Falling back to Supabase for sentences');
  const { data, error } = await supabase
    .from('sentences')
    .select('*')
    .eq('jlpt_level', level)
    .order('difficulty_level', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

export async function getAllSentences() {
  // Try local JSON first
  const localData = await loadSentencesData();
  if (localData) {
    return localData;
  }
  
  // Fallback to Supabase
  console.log('Falling back to Supabase for all sentences');
  const { data, error } = await supabase
    .from('sentences')
    .select('*')
    .order('jlpt_level', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

// Get content counts by level
export async function getContentCountsByLevel(level: JLPTLevel) {
  const kanjiData = await loadKanjiData();
  const vocabularyData = await loadVocabularyData();
  const sentencesData = await loadSentencesData();
  
  if (kanjiData && vocabularyData && sentencesData) {
    return {
      kanji: kanjiData.filter((k: any) => k.jlpt_level === level).length,
      vocabulary: vocabularyData.filter((v: any) => v.jlpt_level === level).length,
      sentences: sentencesData.filter((s: any) => s.jlpt_level === level).length,
    };
  }
  
  // Fallback to Supabase
  console.log('Falling back to Supabase for content counts');
  const [kanjiCounts, vocabCounts, sentenceCounts] = await Promise.all([
    supabase.from('kanji').select('*', { count: 'exact', head: true }).eq('jlpt_level', level),
    supabase.from('vocabulary').select('*', { count: 'exact', head: true }).eq('jlpt_level', level),
    supabase.from('sentences').select('*', { count: 'exact', head: true }).eq('jlpt_level', level)
  ]);

  return {
    kanji: kanjiCounts.count || 0,
    vocabulary: vocabCounts.count || 0,
    sentences: sentenceCounts.count || 0
  };
}
