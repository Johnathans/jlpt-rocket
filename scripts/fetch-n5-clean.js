const https = require('https')
const { createClient } = require('@supabase/supabase-js')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
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

async function searchJisho(query) {
  return new Promise((resolve, reject) => {
    const url = `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(query)}`
    
    https.get(url, (res) => {
      let data = ''
      
      res.on('data', (chunk) => {
        data += chunk
      })
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    }).on('error', (error) => {
      reject(error)
    })
  })
}

async function searchJLPTN5Words() {
  const results = []
  const seenWords = new Set()
  
  console.log('🔍 Searching for JLPT N5 tagged words...')
  
  try {
    console.log('Searching: #jlpt-n5')
    const response = await searchJisho('#jlpt-n5')
    
    if (response.data && response.data.length > 0) {
      console.log(`Found ${response.data.length} results for #jlpt-n5`)
      
      for (const item of response.data) {
        const hasN5Tag = item.tags?.some(tag => 
          tag.toLowerCase().includes('jlpt n5') || 
          tag.toLowerCase().includes('jlpt-n5')
        )
        
        if (hasN5Tag || item.is_common) {
          const japanese = item.japanese?.[0]
          if (japanese) {
            const wordText = japanese.word || japanese.reading
            const reading = japanese.reading || wordText
            const wordKey = `${wordText}-${reading}`
            
            if (!seenWords.has(wordKey)) {
              const meanings = item.senses
                ?.flatMap(sense => sense.english_definitions || [])
                .slice(0, 3)
                .join('; ')
              
              if (wordText && reading && meanings) {
                const partsOfSpeech = item.senses
                  ?.flatMap(sense => sense.parts_of_speech || [])
                  .filter((pos, index, arr) => arr.indexOf(pos) === index)
                  .slice(0, 2)
                  .join(', ')
                
                const kanjiRegex = /[\u4e00-\u9faf]/g
                const kanjiUsed = wordText.match(kanjiRegex) || []
                
                results.push({
                  id: uuidv4(),
                  word: wordText,
                  reading: reading,
                  meaning: meanings,
                  part_of_speech: partsOfSpeech || 'noun',
                  jlpt_level: 'N5',
                  frequency_rank: results.length + 1,
                  kanji_used: kanjiUsed,
                  example_sentence: `${wordText}です。`,
                  example_translation: `It is ${meanings.split(';')[0]}.`,
                  has_n5_tag: hasN5Tag,
                  is_common: item.is_common || false,
                  tags: item.tags || []
                })
                
                seenWords.add(wordKey)
                console.log(`  ✓ Added: ${wordText} (${reading}) - ${meanings}`)
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error searching for #jlpt-n5:', error.message)
  }
  
  return results
}

async function searchSpecificN5Words() {
  const commonN5Words = [
    // Core vocabulary that should definitely be N5
    '私', 'あなた', 'これ', 'それ', 'あれ', 'ここ', 'そこ', 'あそこ', 'どこ', 'だれ', '何',
    '一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
    '今日', '昨日', '明日', '今', '朝', '昼', '夜', '時間',
    '家族', '父', '母', '兄', '姉', '弟', '妹', '子供',
    '友達', '先生', '学生', '人', '男', '女',
    '学校', '家', '部屋', '店', '駅', '病院',
    '車', '電車', 'バス', '飛行機',
    '水', 'お茶', 'コーヒー', 'ご飯', 'パン', '肉', '魚',
    '服', '靴', '時計', '本', 'ペン',
    '頭', '顔', '目', '鼻', '口', '手', '足',
    '赤', '青', '白', '黒', '大きい', '小さい', '高い', '安い', '新しい', '古い',
    '行く', '来る', '帰る', '食べる', '飲む', '見る', '聞く', '読む', '書く', '話す',
    '寝る', '起きる', '働く', '勉強する', 'ある', 'いる', 'する',
    '天気', '雨', '雪', '風', '暑い', '寒い',
    'はい', 'いいえ', 'ありがとう', 'すみません', 'こんにちは'
  ]
  
  const results = []
  const seenWords = new Set()
  
  console.log('\n🔍 Searching for specific common N5 words...')
  
  for (let i = 0; i < commonN5Words.length; i++) {
    const word = commonN5Words[i]
    
    try {
      console.log(`Searching: ${word} (${i + 1}/${commonN5Words.length})`)
      
      const response = await searchJisho(word)
      
      if (response.data && response.data.length > 0) {
        const item = response.data[0] // Take the first (most relevant) result
        const japanese = item.japanese?.[0]
        
        if (japanese) {
          const wordText = japanese.word || japanese.reading || word
          const reading = japanese.reading || word
          const wordKey = `${wordText}-${reading}`
          
          if (!seenWords.has(wordKey)) {
            const meanings = item.senses
              ?.flatMap(sense => sense.english_definitions || [])
              .slice(0, 3)
              .join('; ')
            
            if (meanings) {
              const partsOfSpeech = item.senses
                ?.flatMap(sense => sense.parts_of_speech || [])
                .filter((pos, index, arr) => arr.indexOf(pos) === index)
                .slice(0, 2)
                .join(', ')
              
              const kanjiRegex = /[\u4e00-\u9faf]/g
              const kanjiUsed = wordText.match(kanjiRegex) || []
              
              const hasN5Tag = item.tags?.some(tag => 
                tag.toLowerCase().includes('jlpt n5') || 
                tag.toLowerCase().includes('jlpt-n5')
              )
              
              results.push({
                id: uuidv4(),
                word: wordText,
                reading: reading,
                meaning: meanings,
                part_of_speech: partsOfSpeech || 'noun',
                jlpt_level: 'N5',
                frequency_rank: results.length + 1,
                kanji_used: kanjiUsed,
                example_sentence: `${wordText}です。`,
                example_translation: `It is ${meanings.split(';')[0]}.`,
                has_n5_tag: hasN5Tag,
                is_common: item.is_common || false,
                tags: item.tags || []
              })
              
              seenWords.add(wordKey)
              console.log(`  ✓ Added: ${wordText} (${reading}) - ${meanings}`)
            }
          } else {
            console.log(`  ⚠️  Duplicate: ${wordText}`)
          }
        }
      } else {
        console.log(`  ❌ No results for: ${word}`)
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 500))
      
    } catch (error) {
      console.error(`  ❌ Error searching for ${word}:`, error.message)
    }
  }
  
  return results
}

async function saveToFile(data, filename = 'n5-vocabulary-clean.json') {
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
  console.log('🚀 Starting N5 vocabulary collection using direct Jisho API...\n')
  
  // Method 1: Search for JLPT N5 tagged words
  const taggedWords = await searchJLPTN5Words()
  console.log(`\n📊 Phase 1 Results: ${taggedWords.length} words from JLPT searches`)
  
  // Method 2: Search for specific common N5 words
  const specificWords = await searchSpecificN5Words()
  console.log(`\n📊 Phase 2 Results: ${specificWords.length} words from specific searches`)
  
  // Combine and deduplicate
  console.log('\n🔄 Combining and deduplicating results...')
  const allWords = [...taggedWords, ...specificWords]
  const seenKeys = new Set()
  const finalWords = []
  
  for (const word of allWords) {
    const key = `${word.word}-${word.reading}`
    if (!seenKeys.has(key)) {
      seenKeys.add(key)
      word.frequency_rank = finalWords.length + 1
      finalWords.push(word)
    }
  }
  
  console.log(`\n📊 Final Collection Summary:`)
  console.log(`- Total vocabulary collected: ${finalWords.length}`)
  console.log(`- From JLPT searches: ${taggedWords.length}`)
  console.log(`- From specific searches: ${specificWords.length}`)
  console.log(`- After deduplication: ${finalWords.length}`)
  
  // Count quality metrics
  const withN5Tags = finalWords.filter(w => w.has_n5_tag).length
  const commonWords = finalWords.filter(w => w.is_common).length
  
  console.log(`- With JLPT N5 tags: ${withN5Tags}`)
  console.log(`- Marked as common: ${commonWords}`)
  
  // Save to JSON file
  await saveToFile(finalWords, 'n5-vocabulary-clean.json')
  
  // Try to save to Supabase
  const supabaseSuccess = await saveToSupabase(finalWords)
  
  console.log('\n✅ N5 vocabulary collection completed!')
  console.log(`📁 Data saved to: n5-vocabulary-clean.json`)
  if (supabaseSuccess) {
    console.log(`💾 Data also saved to Supabase database`)
  }
  
  console.log(`\n🎯 Collection target: ${finalWords.length >= 100 ? '✅' : '⚠️'} ${finalWords.length} words collected`)
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
