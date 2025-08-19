const { createClient } = require('@supabase/supabase-js')
const { v4: uuidv4 } = require('uuid')

// Use direct API calls and CommonJS for Node.js compatibility

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

type VocabularyEntry = {
  id: string
  word: string
  reading: string
  meaning: string
  part_of_speech: string
  jlpt_level: 'N5'
  frequency_rank: number
  kanji_used: string[]
  example_sentence: string
  example_translation: string
}

// Common N5 vocabulary words to search for
const N5_VOCABULARY = [
  // Basic words
  'こんにちは', 'ありがとう', 'すみません', 'はい', 'いいえ',
  // Numbers
  'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう', 'じゅう',
  // Family
  'かぞく', 'ちち', 'はは', 'あに', 'あね', 'おとうと', 'いもうと',
  // Time
  'じかん', 'いま', 'きょう', 'あした', 'きのう', 'あさ', 'ひる', 'ばん',
  // Days of week
  'げつようび', 'かようび', 'すいようび', 'もくようび', 'きんようび', 'どようび', 'にちようび',
  // Colors
  'あか', 'あお', 'きいろ', 'みどり', 'しろ', 'くろ', 'ちゃいろ',
  // Food
  'たべもの', 'みず', 'おちゃ', 'コーヒー', 'ごはん', 'パン', 'にく', 'さかな',
  // Places
  'いえ', 'がっこう', 'びょういん', 'ぎんこう', 'ゆうびんきょく', 'えき', 'くうこう',
  // Transportation
  'でんしゃ', 'バス', 'タクシー', 'ひこうき', 'じてんしゃ', 'あるく',
  // Verbs
  'いく', 'くる', 'かえる', 'たべる', 'のむ', 'みる', 'きく', 'よむ', 'かく', 'はなす',
  'ねる', 'おきる', 'はたらく', 'べんきょう', 'あそぶ', 'かう', 'うる',
  // Adjectives
  'おおきい', 'ちいさい', 'たかい', 'やすい', 'あたらしい', 'ふるい', 'いい', 'わるい',
  'あつい', 'さむい', 'あたたかい', 'すずしい', 'おもしろい', 'つまらない',
  // Body parts
  'あたま', 'かお', 'め', 'はな', 'くち', 'て', 'あし', 'からだ',
  // Clothing
  'ふく', 'シャツ', 'ズボン', 'スカート', 'くつ', 'ぼうし',
  // School
  'せんせい', 'がくせい', 'きょうしつ', 'ほん', 'ペン', 'えんぴつ', 'かみ',
  // Weather
  'てんき', 'あめ', 'ゆき', 'かぜ', 'くも', 'たいよう'
]

async function searchVocabulary(word: string): Promise<VocabularyEntry | null> {
  try {
    console.log(`Searching for: ${word}`)
    
    // Use Jisho.org API directly
    const response = await fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(word)}`)
    const result = await response.json()
    
    if (!result.data || result.data.length === 0) {
      console.log(`No results found for: ${word}`)
      return null
    }

    const firstResult = result.data[0]
    
    // Check if it has JLPT N5 tag
    const hasN5Tag = firstResult.tags?.some((tag: string) => 
      tag.toLowerCase().includes('jlpt n5') || tag.toLowerCase().includes('jlpt-n5')
    )

    // Extract Japanese word and reading
    const japanese = firstResult.japanese?.[0]
    if (!japanese) {
      console.log(`No Japanese data found for: ${word}`)
      return null
    }

    const wordText = japanese.word || japanese.reading || word
    const reading = japanese.reading || word
    
    // Extract English meanings
    const senses = firstResult.senses || []
    const meanings = senses
      .flatMap((sense: any) => sense.english_definitions || [])
      .slice(0, 3) // Take first 3 meanings
      .join('; ')

    if (!meanings) {
      console.log(`No meanings found for: ${word}`)
      return null
    }

    // Extract parts of speech
    const partsOfSpeech = senses
      .flatMap((sense: any) => sense.parts_of_speech || [])
      .filter((pos: string, index: number, arr: string[]) => arr.indexOf(pos) === index) // Remove duplicates
      .slice(0, 2) // Take first 2
      .join(', ')

    // Extract kanji characters from the word
    const kanjiRegex = /[\u4e00-\u9faf]/g
    const kanjiUsed = wordText.match(kanjiRegex) || []

    // Generate a simple example sentence (we'll improve this later)
    const exampleSentence = `${wordText}です。`
    const exampleTranslation = `It is ${meanings.split(';')[0]}.`

    return {
      id: uuidv4(),
      word: wordText,
      reading: reading,
      meaning: meanings,
      part_of_speech: partsOfSpeech || 'noun',
      jlpt_level: 'N5',
      frequency_rank: 0, // We'll set this based on our list order
      kanji_used: kanjiUsed,
      example_sentence: exampleSentence,
      example_translation: exampleTranslation
    }

  } catch (error) {
    console.error(`Error searching for ${word}:`, error)
    return null
  }
}

async function populateN5Vocabulary() {
  console.log('Starting N5 vocabulary population...')
  
  const vocabularyEntries: VocabularyEntry[] = []
  
  // Process each word with a delay to avoid rate limiting
  for (let i = 0; i < N5_VOCABULARY.length; i++) {
    const word = N5_VOCABULARY[i]
    
    const entry = await searchVocabulary(word)
    if (entry) {
      entry.frequency_rank = i + 1 // Set frequency based on our list order
      vocabularyEntries.push(entry)
      console.log(`✓ Added: ${entry.word} (${entry.reading}) - ${entry.meaning}`)
    }
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  console.log(`\nFound ${vocabularyEntries.length} vocabulary entries`)
  
  if (vocabularyEntries.length === 0) {
    console.log('No vocabulary entries to insert')
    return
  }

  // Insert into Supabase
  console.log('Inserting into Supabase...')
  
  const { data, error } = await supabase
    .from('vocabulary')
    .insert(vocabularyEntries)
    .select()

  if (error) {
    console.error('Error inserting vocabulary:', error)
    throw error
  }

  console.log(`✅ Successfully inserted ${data?.length || 0} vocabulary entries into Supabase`)
  
  // Show summary
  console.log('\n📊 Summary:')
  console.log(`- Total words processed: ${N5_VOCABULARY.length}`)
  console.log(`- Successfully found: ${vocabularyEntries.length}`)
  console.log(`- Inserted into database: ${data?.length || 0}`)
}

// Run the script
if (require.main === module) {
  populateN5Vocabulary()
    .then(() => {
      console.log('✅ N5 vocabulary population completed!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Error:', error)
      process.exit(1)
    })
}

export { populateN5Vocabulary }
