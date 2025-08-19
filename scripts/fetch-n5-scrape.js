const JishoAPI = require('unofficial-jisho-api')
const { createClient } = require('@supabase/supabase-js')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
require('dotenv').config({ path: '.env.local' })

// Initialize APIs
const jisho = new JishoAPI()

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabase = null
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey)
  console.log('✓ Supabase client initialized')
} else {
  console.log('⚠️  Supabase not configured - will save to JSON file instead')
}

async function scrapeN5Vocabulary() {
  console.log('🔍 Using scrapeForPhrase to get JLPT N5 vocabulary with full data...')
  
  try {
    const result = await jisho.scrapeForPhrase('#jlpt-n5')
    
    console.log('Scrape result:', JSON.stringify(result, null, 2))
    
    if (result.found && result.data) {
      console.log(`Found ${result.data.length} results`)
      return result.data
    } else {
      console.log('No data found in scrape result')
      return []
    }
    
  } catch (error) {
    console.error('Error scraping N5 vocabulary:', error)
    return []
  }
}

async function searchN5WithAPI() {
  console.log('🔍 Using searchForPhrase API to get JLPT N5 vocabulary...')
  
  try {
    const result = await jisho.searchForPhrase('#jlpt-n5')
    
    console.log('API search result structure:', {
      found: result.found,
      dataLength: result.data?.length || 0,
      meta: result.meta
    })
    
    if (result.data && result.data.length > 0) {
      console.log('First few results:')
      result.data.slice(0, 3).forEach((item, index) => {
        console.log(`${index + 1}. ${item.japanese?.[0]?.word || item.japanese?.[0]?.reading} - ${item.senses?.[0]?.english_definitions?.join(', ')}`)
      })
      
      return result.data
    } else {
      console.log('No data found in API result')
      return []
    }
    
  } catch (error) {
    console.error('Error with API search:', error)
    return []
  }
}

async function processVocabularyData(data, source) {
  console.log(`\n📝 Processing ${data.length} vocabulary entries from ${source}...`)
  
  const vocabularyEntries = []
  
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    
    try {
      // Handle different data structures from API vs scraping
      let wordText, reading, meanings, partsOfSpeech, hasN5Tag
      
      if (source === 'scrape') {
        // Handle scraped data structure
        wordText = item.word || item.query
        reading = item.reading || item.kana
        meanings = item.meanings?.map(m => m.definition).join('; ') || ''
        partsOfSpeech = item.meanings?.flatMap(m => m.tags || []).join(', ') || ''
        hasN5Tag = item.tags?.some(tag => tag.toLowerCase().includes('jlpt n5'))
      } else {
        // Handle API data structure
        const japanese = item.japanese?.[0]
        wordText = japanese?.word || japanese?.reading
        reading = japanese?.reading || wordText
        meanings = item.senses?.flatMap(sense => sense.english_definitions || []).slice(0, 3).join('; ') || ''
        partsOfSpeech = item.senses?.flatMap(sense => sense.parts_of_speech || []).filter((pos, index, arr) => arr.indexOf(pos) === index).slice(0, 2).join(', ') || ''
        hasN5Tag = item.tags?.some(tag => tag.toLowerCase().includes('jlpt n5') || tag.toLowerCase().includes('jlpt-n5'))
      }
      
      if (wordText && reading && meanings) {
        // Extract kanji characters
        const kanjiRegex = /[\u4e00-\u9faf]/g
        const kanjiUsed = wordText.match(kanjiRegex) || []
        
        const entry = {
          id: uuidv4(),
          word: wordText,
          reading: reading,
          meaning: meanings,
          part_of_speech: partsOfSpeech || 'noun',
          jlpt_level: 'N5',
          frequency_rank: i + 1,
          kanji_used: kanjiUsed,
          example_sentence: `${wordText}です。`,
          example_translation: `It is ${meanings.split(';')[0]}.`,
          has_n5_tag: hasN5Tag,
          is_common: item.is_common || false,
          source: source
        }
        
        vocabularyEntries.push(entry)
        console.log(`✓ ${i + 1}. ${wordText} (${reading}) - ${meanings}`)
      } else {
        console.log(`⚠️  ${i + 1}. Skipped incomplete entry: ${JSON.stringify(item).substring(0, 100)}...`)
      }
      
    } catch (error) {
      console.error(`Error processing item ${i + 1}:`, error)
    }
  }
  
  return vocabularyEntries
}

async function saveToFile(data, filename = 'n5-vocabulary-scraped.json') {
  try {
    const jsonData = JSON.stringify(data, null, 2)
    fs.writeFileSync(filename, jsonData, 'utf8')
    console.log(`✅ Saved ${data.length} vocabulary entries to ${filename}`)
  } catch (error) {
    console.error('Error saving to file:', error)
  }
}

async function saveToSupabase(data) {
  if (!supabase) {
    console.log('⚠️  Supabase not configured, skipping database insert')
    return false
  }

  try {
    console.log('Inserting into Supabase...')
    
    const batchSize = 50
    let totalInserted = 0
    
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize)
      
      const { data: insertedData, error } = await supabase
        .from('vocabulary')
        .insert(batch)
        .select()

      if (error) {
        console.error('Error inserting batch:', error)
        return false
      }

      totalInserted += insertedData?.length || 0
      console.log(`✓ Inserted batch ${Math.floor(i/batchSize) + 1}: ${insertedData?.length || 0} entries`)
    }
    
    console.log(`✅ Successfully inserted ${totalInserted} vocabulary entries into Supabase`)
    return true
    
  } catch (error) {
    console.error('Error inserting into Supabase:', error)
    return false
  }
}

async function main() {
  console.log('🚀 Starting N5 vocabulary collection using scraping method...\n')
  
  // Try scraping method first (should get JLPT level data)
  console.log('📖 Method 1: Scraping for comprehensive data...')
  const scrapedData = await scrapeN5Vocabulary()
  
  // Also try API method for comparison
  console.log('\n📖 Method 2: API search for additional data...')
  const apiData = await searchN5WithAPI()
  
  // Process both datasets
  const scrapedEntries = scrapedData.length > 0 ? await processVocabularyData(scrapedData, 'scrape') : []
  const apiEntries = apiData.length > 0 ? await processVocabularyData(apiData, 'api') : []
  
  // Combine and deduplicate
  console.log('\n🔄 Combining results...')
  const allEntries = [...scrapedEntries, ...apiEntries]
  const seenKeys = new Set()
  const finalEntries = []
  
  for (const entry of allEntries) {
    const key = `${entry.word}-${entry.reading}`
    if (!seenKeys.has(key)) {
      seenKeys.add(key)
      entry.frequency_rank = finalEntries.length + 1
      finalEntries.push(entry)
    }
  }
  
  console.log(`\n📊 Final Results:`)
  console.log(`- Scraped entries: ${scrapedEntries.length}`)
  console.log(`- API entries: ${apiEntries.length}`)
  console.log(`- Total after deduplication: ${finalEntries.length}`)
  console.log(`- With JLPT N5 tags: ${finalEntries.filter(e => e.has_n5_tag).length}`)
  console.log(`- Common words: ${finalEntries.filter(e => e.is_common).length}`)
  
  // Save to JSON file
  await saveToFile(finalEntries, 'n5-vocabulary-scraped.json')
  
  // Try to save to Supabase
  const supabaseSuccess = await saveToSupabase(finalEntries)
  
  console.log('\n✅ N5 vocabulary collection completed!')
  console.log(`📁 Data saved to: n5-vocabulary-scraped.json`)
  if (supabaseSuccess) {
    console.log(`💾 Data also saved to Supabase database`)
  }
  
  console.log(`\n🎯 Collection result: ${finalEntries.length >= 100 ? '✅' : '⚠️'} ${finalEntries.length} words collected`)
}

// Run the script
main()
  .then(() => {
    console.log('🎉 All done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Error:', error)
    process.exit(1)
  })
