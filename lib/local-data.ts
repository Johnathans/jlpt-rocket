import { supabase } from './supabase'

export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1'

// In-memory cache for Supabase data
let kanjiCache: any[] | null = null;
let vocabularyCache: any[] | null = null;
let sentencesCache: any[] | null = null;

// Load data from Supabase (protected by authentication)
async function loadKanjiData() {
  if (kanjiCache) return kanjiCache;
  
  try {
    const { data, error } = await supabase
      .from('kanji')
      .select('*')
      .order('frequency_rank', { ascending: true });
    
    if (error) throw error;
    kanjiCache = data || [];
    console.log('✓ Loaded kanji from Supabase:', kanjiCache?.length || 0, 'entries');
    return kanjiCache;
  } catch (error) {
    console.error('Failed to load kanji data:', error);
    return null;
  }
}

async function loadVocabularyData() {
  if (vocabularyCache) return vocabularyCache;
  
  try {
    const { data, error } = await supabase
      .from('vocabulary')
      .select('*')
      .order('frequency_rank', { ascending: true });
    
    if (error) throw error;
    vocabularyCache = data || [];
    console.log('✓ Loaded vocabulary from Supabase:', vocabularyCache?.length || 0, 'entries');
    return vocabularyCache;
  } catch (error) {
    console.error('Failed to load vocabulary data:', error);
    return null;
  }
}

async function loadSentencesData() {
  if (sentencesCache) return sentencesCache;
  
  try {
    const { data, error } = await supabase
      .from('sentences')
      .select('*')
      .order('jlpt_level', { ascending: false });
    
    if (error) throw error;
    sentencesCache = data || [];
    console.log('✓ Loaded sentences from Supabase:', sentencesCache?.length || 0, 'entries');
    return sentencesCache;
  } catch (error) {
    console.error('Failed to load sentences data:', error);
    return null;
  }
}

// Kanji data functions using Supabase
export async function getKanjiByLevel(level: JLPTLevel) {
  const data = await loadKanjiData();
  if (data) {
    return data.filter((k: any) => k.jlpt_level === level);
  }
  return [];
}

export async function getAllKanji() {
  const data = await loadKanjiData();
  if (data) {
    return data.sort((a: any, b: any) => a.frequency_rank - b.frequency_rank);
  }
  return [];
}

export async function getKanjiByCharacter(character: string) {
  const data = await loadKanjiData();
  if (data) {
    return data.find((k: any) => k.character === character);
  }
  return null;
}

// Vocabulary data functions using Supabase
export async function getVocabularyByLevel(level: JLPTLevel) {
  const data = await loadVocabularyData();
  if (data) {
    return data.filter((v: any) => v.jlpt_level === level);
  }
  return [];
}

export async function getVocabularyCountByLevel(level: JLPTLevel): Promise<number> {
  const data = await loadVocabularyData();
  if (data) {
    return data.filter((v: any) => v.jlpt_level === level).length;
  }
  return 0;
}

export async function getVocabularyExamplesForKanji(kanjiCharacter: string, limit: number = 10) {
  const data = await loadVocabularyData();
  if (data) {
    return data
      .filter((v: any) => v.kanji_used && v.kanji_used.includes(kanjiCharacter))
      .sort((a: any, b: any) => a.frequency_rank - b.frequency_rank)
      .slice(0, limit);
  }
  return [];
}

export async function getVocabularyCountForKanji(kanjiCharacter: string): Promise<number> {
  const data = await loadVocabularyData();
  if (data) {
    return data.filter((v: any) => v.kanji_used && v.kanji_used.includes(kanjiCharacter)).length;
  }
  return 0;
}

// Sentences data functions using Supabase
export async function getSentencesByLevel(level: JLPTLevel) {
  const data = await loadSentencesData();
  if (data) {
    return data
      .filter((s: any) => s.jlpt_level === level)
      .sort((a: any, b: any) => a.difficulty_level - b.difficulty_level);
  }
  return [];
}

export async function getAllSentences() {
  const data = await loadSentencesData();
  return data || [];
}

// Get content counts by level
export async function getContentCountsByLevel(level: JLPTLevel) {
  const kanjiData = await loadKanjiData();
  const vocabularyData = await loadVocabularyData();
  const sentencesData = await loadSentencesData();
  
  return {
    kanji: kanjiData?.filter((k: any) => k.jlpt_level === level).length || 0,
    vocabulary: vocabularyData?.filter((v: any) => v.jlpt_level === level).length || 0,
    sentences: sentencesData?.filter((s: any) => s.jlpt_level === level).length || 0,
  };
}
