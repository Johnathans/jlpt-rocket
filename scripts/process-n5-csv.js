const fs = require('fs')
const { createClient } = require('@supabase/supabase-js')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config({ path: '.env.local' })

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

function parseCSV(csvText) {
  const lines = csvText.split('\n')
  const headers = lines[0].split(',')
  const data = []
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    
    // Handle CSV parsing with quoted fields
    const values = []
    let current = ''
    let inQuotes = false
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j]
      
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    values.push(current.trim())
    
    if (values.length >= 4) {
      const entry = {
        expression: values[0],
        reading: values[1], 
        meaning: values[2],
        tags: values[3]
      }
      data.push(entry)
    }
  }
  
  return data
}

function processVocabularyData(csvData) {
  console.log(`📝 Processing ${csvData.length} vocabulary entries...`)
  
  const vocabularyEntries = []
  
  for (let i = 0; i < csvData.length; i++) {
    const item = csvData[i]
    
    try {
      const wordText = item.expression
      const reading = item.reading
      const meanings = item.meaning
      const tags = item.tags || ''
      
      if (wordText && reading && meanings) {
        // Extract kanji characters
        const kanjiRegex = /[\u4e00-\u9faf]/g
        const kanjiUsed = wordText.match(kanjiRegex) || []
        
        // Determine part of speech from meaning context
        let partOfSpeech = 'noun'
        const meaningLower = meanings.toLowerCase()
        if (meaningLower.includes('to ') || meaningLower.includes('verb')) {
          partOfSpeech = 'verb'
        } else if (meaningLower.includes('adjective') || wordText.endsWith('い')) {
          partOfSpeech = 'adjective'
        } else if (meaningLower.includes('adverb')) {
          partOfSpeech = 'adverb'
        }
        
        // Create example sentence
        const exampleSentence = `${wordText}です。`
        const exampleTranslation = `It is ${meanings.split(',')[0].split(';')[0]}.`
        
        const entry = {
          id: uuidv4(),
          word: wordText,
          reading: reading,
          meaning: meanings,
          part_of_speech: partOfSpeech,
          jlpt_level: 'N5',
          frequency_rank: i + 1,
          kanji_used: kanjiUsed,
          example_sentence: exampleSentence,
          example_translation: exampleTranslation
        }
        
        vocabularyEntries.push(entry)
        
        if (i % 50 === 0) {
          console.log(`✓ Processed ${i + 1}/${csvData.length}: ${wordText} (${reading}) - ${meanings}`)
        }
      } else {
        console.log(`⚠️  Skipped incomplete entry ${i + 1}: ${JSON.stringify(item)}`)
      }
      
    } catch (error) {
      console.error(`Error processing item ${i + 1}:`, error)
    }
  }
  
  return vocabularyEntries
}

async function saveToFile(data, filename = 'n5-vocabulary-processed.json') {
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
    console.log('🔄 Inserting into Supabase...')
    
    // Clear existing N5 vocabulary
    const { error: deleteError } = await supabase
      .from('vocabulary')
      .delete()
      .eq('jlpt_level', 'N5')
    
    if (deleteError) {
      console.log('⚠️  Could not clear existing data:', deleteError.message)
    } else {
      console.log('✓ Cleared existing N5 vocabulary')
    }
    
    const batchSize = 50
    let totalInserted = 0
    
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize)
      
      const { data: insertedData, error } = await supabase
        .from('vocabulary')
        .insert(batch)
        .select()

      if (error) {
        console.error(`Error inserting batch ${Math.floor(i/batchSize) + 1}:`, error)
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
  console.log('🚀 Processing N5 vocabulary from CSV file...\n')
  
  try {
    // Read the CSV file
    const csvText = fs.readFileSync('n5-vocabulary.csv', 'utf8')
    console.log('✓ CSV file loaded')
    
    // Parse CSV data
    const csvData = parseCSV(csvText)
    console.log(`✓ Parsed ${csvData.length} entries from CSV`)
    
    // Process vocabulary data
    const vocabularyEntries = processVocabularyData(csvData)
    console.log(`✓ Processed ${vocabularyEntries.length} vocabulary entries`)
    
    // Show sample entries
    console.log('\n📋 Sample entries:')
    vocabularyEntries.slice(0, 5).forEach((entry, index) => {
      console.log(`${index + 1}. ${entry.word} (${entry.reading}) - ${entry.meaning}`)
    })
    
    console.log(`\n📊 Final Collection Summary:`)
    console.log(`- Total vocabulary entries: ${vocabularyEntries.length}`)
    console.log(`- With kanji: ${vocabularyEntries.filter(e => e.kanji_used.length > 0).length}`)
    console.log(`- Verbs: ${vocabularyEntries.filter(e => e.part_of_speech === 'verb').length}`)
    console.log(`- Adjectives: ${vocabularyEntries.filter(e => e.part_of_speech === 'adjective').length}`)
    console.log(`- Nouns: ${vocabularyEntries.filter(e => e.part_of_speech === 'noun').length}`)
    
    // Save to JSON file
    await saveToFile(vocabularyEntries, 'n5-vocabulary-processed.json')
    
    // Try to save to Supabase
    const supabaseSuccess = await saveToSupabase(vocabularyEntries)
    
    console.log('\n✅ N5 vocabulary processing completed!')
    console.log(`📁 Data saved to: n5-vocabulary-processed.json`)
    if (supabaseSuccess) {
      console.log(`💾 Data also saved to Supabase database`)
    }
    
    console.log(`\n🎯 Success: ${vocabularyEntries.length} N5 vocabulary words processed!`)
    
  } catch (error) {
    console.error('❌ Error reading CSV file:', error)
    process.exit(1)
  }
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
