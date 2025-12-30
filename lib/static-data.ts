// Static data loader for kanji, vocabulary, and sentences
// Uses JSON files instead of database queries for instant loading

export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export interface KanjiData {
  id: string;
  character: string;
  meaning: string;
  on_reading: string[];
  kun_reading: string[];
  jlpt_level: JLPTLevel;
  frequency_rank: number;
  stroke_count: number;
  radical: string;
  examples?: Array<{
    word: string;
    reading: string;
    meaning: string;
    level: string;
  }>;
  created_at: string;
  updated_at: string;
}

export interface VocabularyData {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  jlpt_level: JLPTLevel;
  created_at: string;
  updated_at: string;
}

export interface SentenceData {
  id: string;
  japanese_text: string;
  english_translation: string;
  jlpt_level: JLPTLevel;
  difficulty_level?: number;
  grammar_points?: string[];
  vocabulary_used?: string[];
  kanji_used?: string[];
  audio_url?: string | null;
  created_at: string;
  updated_at: string;
}

// In-memory cache to avoid re-fetching
const cache = {
  kanji: null as KanjiData[] | null,
  vocabulary: null as VocabularyData[] | null,
  sentences: null as SentenceData[] | null,
};

// Load all kanji data (cached)
export async function getAllKanji(): Promise<KanjiData[]> {
  if (cache.kanji) {
    return cache.kanji;
  }

  try {
    const response = await fetch('/data/kanji.json');
    if (!response.ok) throw new Error('Failed to load kanji data');
    const data = await response.json();
    cache.kanji = data;
    return data;
  } catch (error) {
    console.error('Error loading kanji data:', error);
    return [];
  }
}

// Load all vocabulary data (cached)
export async function getAllVocabulary(): Promise<VocabularyData[]> {
  if (cache.vocabulary) {
    return cache.vocabulary;
  }

  try {
    const response = await fetch('/data/vocabulary.json');
    if (!response.ok) throw new Error('Failed to load vocabulary data');
    const data = await response.json();
    cache.vocabulary = data;
    return data;
  } catch (error) {
    console.error('Error loading vocabulary data:', error);
    return [];
  }
}

// Load all sentences data (cached)
export async function getAllSentences(): Promise<SentenceData[]> {
  if (cache.sentences) {
    return cache.sentences;
  }

  try {
    const response = await fetch('/data/sentences.json');
    if (!response.ok) throw new Error('Failed to load sentences data');
    const data = await response.json();
    cache.sentences = data;
    return data;
  } catch (error) {
    console.error('Error loading sentences data:', error);
    return [];
  }
}

// Get kanji by JLPT level
export async function getKanjiByLevel(level: JLPTLevel): Promise<KanjiData[]> {
  const allKanji = await getAllKanji();
  return allKanji.filter(k => k.jlpt_level === level);
}

// Get vocabulary by JLPT level
export async function getVocabularyByLevel(level: JLPTLevel): Promise<VocabularyData[]> {
  const allVocabulary = await getAllVocabulary();
  return allVocabulary.filter(v => v.jlpt_level === level);
}

// Get sentences by JLPT level
export async function getSentencesByLevel(level: JLPTLevel): Promise<SentenceData[]> {
  const allSentences = await getAllSentences();
  return allSentences.filter(s => s.jlpt_level === level);
}

// Get content counts by level
export async function getContentCountsByLevel(level: JLPTLevel): Promise<{
  kanji: number;
  vocabulary: number;
  sentences: number;
}> {
  const [kanji, vocabulary, sentences] = await Promise.all([
    getKanjiByLevel(level),
    getVocabularyByLevel(level),
    getSentencesByLevel(level),
  ]);

  return {
    kanji: kanji.length,
    vocabulary: vocabulary.length,
    sentences: sentences.length,
  };
}

// Get total counts across all levels
export async function getTotalCounts(): Promise<{
  kanji: number;
  vocabulary: number;
  sentences: number;
}> {
  const [kanji, vocabulary, sentences] = await Promise.all([
    getAllKanji(),
    getAllVocabulary(),
    getAllSentences(),
  ]);

  return {
    kanji: kanji.length,
    vocabulary: vocabulary.length,
    sentences: sentences.length,
  };
}

// Clear cache (useful for development/testing)
export function clearCache(): void {
  cache.kanji = null;
  cache.vocabulary = null;
  cache.sentences = null;
}

// Utility function to parse cloze sentences with asterisks
export function parseClozeText(text: string) {
  const clozePattern = /\*([^*]+)\*/g;
  const clozeWords: string[] = [];
  let match;
  
  // Extract all cloze words
  while ((match = clozePattern.exec(text)) !== null) {
    clozeWords.push(match[1]);
  }
  
  // Create sentence with blanks
  const sentenceWithBlanks = text.replace(clozePattern, '___');
  
  // Create sentence without asterisks (clean display)
  const cleanSentence = text.replace(clozePattern, '$1');
  
  return {
    originalText: text,
    cleanSentence,
    sentenceWithBlanks,
    clozeWords,
    hasCloze: clozeWords.length > 0
  };
}

// Get random vocabulary for a given level
export async function getRandomVocabulary(level: JLPTLevel, count: number = 10): Promise<VocabularyData[]> {
  const allVocab = await getVocabularyByLevel(level);
  const shuffled = [...allVocab].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
