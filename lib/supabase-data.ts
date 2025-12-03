import { supabase } from './supabase'

export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1'

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

function getCached<T>(key: string): T | null {
  const cached = cache.get(key);
  if (!cached) return null;
  
  const isExpired = Date.now() - cached.timestamp > CACHE_TTL;
  if (isExpired) {
    cache.delete(key);
    return null;
  }
  
  return cached.data as T;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

// Helper function to fetch all data with pagination
async function fetchAllWithPagination<T>(
  tableName: string,
  filters: { column: string; value: any }[] = [],
  orderBy?: { column: string; ascending: boolean }
): Promise<T[]> {
  const pageSize = 1000;
  let allData: T[] = [];
  let page = 0;
  let hasMore = true;

  while (hasMore) {
    let query = supabase
      .from(tableName)
      .select('*')
      .range(page * pageSize, (page + 1) * pageSize - 1);

    // Apply filters
    filters.forEach(filter => {
      query = query.eq(filter.column, filter.value);
    });

    // Apply ordering
    if (orderBy) {
      query = query.order(orderBy.column, { ascending: orderBy.ascending });
    }

    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching ${tableName}:`, error);
      throw error;
    }

    if (data && data.length > 0) {
      allData = [...allData, ...data];
      hasMore = data.length === pageSize; // Continue if we got a full page
      page++;
    } else {
      hasMore = false;
    }
  }

  return allData as T[];
}

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
  examples?: Array<{
    word: string
    reading: string
    meaning: string
    level: string
  }>
  created_at: string
  updated_at: string
}

export interface VocabularyData {
  id: string
  word: string
  reading: string
  meaning: string
  part_of_speech: string
  jlpt_level: JLPTLevel
  frequency_rank: number
  kanji_used: string[]
  example_sentence: string
  example_translation: string
  created_at: string
  updated_at: string
}

export interface SentenceData {
  id: string
  japanese_text: string
  english_translation: string
  jlpt_level: JLPTLevel
  difficulty_level: number
  grammar_points: string[]
  vocabulary_used: string[]
  kanji_used: string[]
  audio_url?: string
  created_at: string
  updated_at: string
}

// Kanji data functions
export async function getKanjiByLevel(level: JLPTLevel): Promise<KanjiData[]> {
  const cacheKey = `kanji_${level}`;
  const cached = getCached<KanjiData[]>(cacheKey);
  if (cached) return cached;
  
  const data = await fetchAllWithPagination<KanjiData>(
    'kanji',
    [{ column: 'jlpt_level', value: level }],
    { column: 'frequency_rank', ascending: true }
  );
  
  setCache(cacheKey, data);
  return data;
}

export async function getAllKanji(): Promise<KanjiData[]> {
  return fetchAllWithPagination<KanjiData>(
    'kanji',
    [],
    { column: 'frequency_rank', ascending: true }
  );
}

export async function getRandomKanji(level: JLPTLevel, count: number = 10): Promise<KanjiData[]> {
  const { data, error } = await supabase
    .from('kanji')
    .select('*')
    .eq('jlpt_level', level)
    .limit(count)

  if (error) {
    console.error('Error fetching random kanji:', error)
    throw error
  }

  // Shuffle the results client-side since Supabase doesn't have RANDOM() in all plans
  const shuffled = data ? [...data].sort(() => Math.random() - 0.5) : []
  return shuffled.slice(0, count)
}

// Vocabulary data functions
export async function getVocabularyByLevel(level: JLPTLevel): Promise<VocabularyData[]> {
  const cacheKey = `vocabulary_${level}`;
  const cached = getCached<VocabularyData[]>(cacheKey);
  if (cached) return cached;
  
  const data = await fetchAllWithPagination<VocabularyData>(
    'vocabulary',
    [{ column: 'jlpt_level', value: level }],
    { column: 'frequency_rank', ascending: true }
  );
  
  setCache(cacheKey, data);
  return data;
}

export async function getAllVocabulary(): Promise<VocabularyData[]> {
  return fetchAllWithPagination<VocabularyData>(
    'vocabulary',
    [],
    { column: 'frequency_rank', ascending: true }
  );
}

export async function getVocabularyCountByLevel(level: JLPTLevel): Promise<number> {
  const { count, error } = await supabase
    .from('vocabulary')
    .select('*', { count: 'exact', head: true })
    .eq('jlpt_level', level)

  if (error) {
    console.error('Error fetching vocabulary count:', error)
    throw error
  }

  return count || 0
}

export async function getVocabularyExamplesForKanji(kanjiCharacter: string, limit: number = 2): Promise<VocabularyData[]> {
  const { data, error } = await supabase
    .from('vocabulary')
    .select('*')
    .contains('kanji_used', [kanjiCharacter])
    .order('frequency_rank', { ascending: true })
    .limit(limit)

  if (error) {
    console.error('Error fetching vocabulary examples for kanji:', error)
    throw error
  }

  return data || []
}

export async function getRandomVocabulary(level: JLPTLevel, count: number = 10): Promise<VocabularyData[]> {
  const { data, error } = await supabase
    .from('vocabulary')
    .select('*')
    .eq('jlpt_level', level)
    .limit(count)

  if (error) {
    console.error('Error fetching random vocabulary:', error)
    throw error
  }

  // Shuffle the results client-side
  const shuffled = data ? [...data].sort(() => Math.random() - 0.5) : []
  return shuffled.slice(0, count)
}

// Sentences data functions
export async function getSentencesByLevel(level: JLPTLevel): Promise<SentenceData[]> {
  const { data, error } = await supabase
    .from('sentences')
    .select('*')
    .eq('jlpt_level', level)
    .order('difficulty_level', { ascending: true })

  if (error) {
    console.error('Error fetching sentences:', error)
    throw error
  }

  return data || []
}

export async function getAllSentences(): Promise<SentenceData[]> {
  const { data, error } = await supabase
    .from('sentences')
    .select('*')
    .order('jlpt_level', { ascending: false }) // N5 first, then N4, etc.

  if (error) {
    console.error('Error fetching all sentences:', error)
    throw error
  }

  return data || []
}

export async function getRandomSentences(level: JLPTLevel, count: number = 5): Promise<SentenceData[]> {
  const { data, error } = await supabase
    .from('sentences')
    .select('*')
    .eq('jlpt_level', level)
    .limit(count)

  if (error) {
    console.error('Error fetching random sentences:', error)
    throw error
  }

  // Shuffle the results client-side
  const shuffled = data ? [...data].sort(() => Math.random() - 0.5) : []
  return shuffled.slice(0, count)
}

// Test question generation functions
export async function generateKanjiReadingQuestions(level: JLPTLevel, count: number = 5) {
  const vocabulary = await getVocabularyByLevel(level)
  
  if (vocabulary.length === 0) {
    throw new Error(`No vocabulary found for JLPT level ${level}`)
  }

  // Filter vocabulary that has kanji and example sentences
  const validVocab = vocabulary.filter(v => 
    v.kanji_used && v.kanji_used.length > 0 && 
    v.example_sentence && v.example_sentence.length > 0
  )

  if (validVocab.length === 0) {
    throw new Error(`No valid vocabulary with kanji found for JLPT level ${level}`)
  }

  // Shuffle and take the requested count
  const shuffled = [...validVocab].sort(() => Math.random() - 0.5)
  const selectedVocab = shuffled.slice(0, count)

  // Generate test questions
  const questions = selectedVocab.map((vocab, index) => {
    // Find the position of the word in the sentence
    const kanjiPosition = vocab.example_sentence.indexOf(vocab.word)
    
    // Generate wrong answers by getting other vocabulary readings
    const wrongAnswers = validVocab
      .filter(v => v.id !== vocab.id && v.reading !== vocab.reading)
      .map(v => v.reading)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    // Create options array with correct answer and wrong answers
    const options = [vocab.reading, ...wrongAnswers].sort(() => Math.random() - 0.5)
    const correctAnswer = options.indexOf(vocab.reading)

    return {
      id: index + 1,
      sentence: vocab.example_sentence,
      underlinedKanji: vocab.word,
      kanjiPosition: kanjiPosition >= 0 ? kanjiPosition : 0,
      options,
      correctAnswer,
      type: 'multiple-choice' as const
    }
  })

  return questions
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

// Get content counts by level
export async function getContentCounts() {
  const [kanjiCounts, vocabCounts, sentenceCounts] = await Promise.all([
    supabase.from('kanji').select('jlpt_level', { count: 'exact' }),
    supabase.from('vocabulary').select('jlpt_level', { count: 'exact' }),
    supabase.from('sentences').select('jlpt_level', { count: 'exact' })
  ])

  return {
    kanji: kanjiCounts.count || 0,
    vocabulary: vocabCounts.count || 0,
    sentences: sentenceCounts.count || 0
  }
}

// Get content counts for a specific JLPT level
export async function getContentCountsByLevel(level: JLPTLevel) {
  const [kanjiCounts, vocabCounts, sentenceCounts] = await Promise.all([
    supabase.from('kanji').select('*', { count: 'exact', head: true }).eq('jlpt_level', level),
    supabase.from('vocabulary').select('*', { count: 'exact', head: true }).eq('jlpt_level', level),
    supabase.from('sentences').select('*', { count: 'exact', head: true }).eq('jlpt_level', level)
  ])

  return {
    kanji: kanjiCounts.count || 0,
    vocabulary: vocabCounts.count || 0,
    sentences: sentenceCounts.count || 0
  }
}
