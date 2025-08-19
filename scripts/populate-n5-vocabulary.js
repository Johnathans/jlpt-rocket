const { createClient } = require('@supabase/supabase-js')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config({ path: '.env.local' })

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  console.error('URL:', supabaseUrl)
  console.error('Key length:', supabaseKey ? supabaseKey.length : 'undefined')
  process.exit(1)
}

console.log('Supabase URL:', supabaseUrl)
console.log('Using key type:', supabaseKey === process.env.SUPABASE_SERVICE_ROLE_KEY ? 'service_role' : 'anon')

const supabase = createClient(supabaseUrl, supabaseKey)

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

async function searchVocabulary(word) {
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
      .flatMap(sense => sense.english_definitions || [])
      .slice(0, 3) // Take first 3 meanings
      .join('; ')

    if (!meanings) {
      console.log(`No meanings found for: ${word}`)
      return null
    }

    // Extract parts of speech
    const partsOfSpeech = senses
      .flatMap(sense => sense.parts_of_speech || [])
      .filter((pos, index, arr) => arr.indexOf(pos) === index) // Remove duplicates
      .slice(0, 2) // Take first 2
      .join(', ')

    // Extract kanji characters from the word
    const kanjiRegex = /[\u4e00-\u9faf]/g
    const kanjiUsed = wordText.match(kanjiRegex) || []

    // Generate a simple example sentence
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
  
  const vocabularyEntries = []
  
  // Process first 20 words to test
  const testWords = N5_VOCABULARY.slice(0, 20)
  
  for (let i = 0; i < testWords.length; i++) {
    const word = testWords[i]
    
    const entry = await searchVocabulary(word)
    if (entry) {
      entry.frequency_rank = i + 1 // Set frequency based on our list order
      vocabularyEntries.push(entry)
      console.log(`✓ Added: ${entry.word} (${entry.reading}) - ${entry.meaning}`)
    }
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000))
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
  console.log(`- Total words processed: ${testWords.length}`)
  console.log(`- Successfully found: ${vocabularyEntries.length}`)
  console.log(`- Inserted into database: ${data?.length || 0}`)
}

// Run the script
populateN5Vocabulary()
  .then(() => {
    console.log('✅ N5 vocabulary population completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Error:', error)
    process.exit(1)
  })
