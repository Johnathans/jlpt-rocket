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

// Function to search for ALL JLPT N5 vocabulary using comprehensive search strategies
async function fetchAllN5VocabularyFromJisho() {
  const results = []
  const seenWords = new Set()
  
  // Strategy 1: Direct JLPT N5 tag searches
  const jlptSearches = [
    '#jlpt-n5', 'jlpt n5', '#n5', 'jlpt5', 'beginner japanese',
    'basic japanese', 'elementary japanese', 'japanese level 5'
  ]
  
  console.log('🔍 Strategy 1: JLPT N5 tag searches...')
  for (const term of jlptSearches) {
    console.log(`Searching: ${term}`)
    await searchAndAddResults(term, results, seenWords)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  // Strategy 2: Common word searches
  const commonSearches = [
    'common japanese words', 'basic japanese vocabulary', 
    'japanese everyday words', 'simple japanese'
  ]
  
  console.log('\n🔍 Strategy 2: Common word searches...')
  for (const term of commonSearches) {
    console.log(`Searching: ${term}`)
    await searchAndAddResults(term, results, seenWords)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  // Strategy 3: Category-based searches for comprehensive coverage
  const categorySearches = [
    // Basic categories
    'japanese family words', 'japanese numbers', 'japanese colors',
    'japanese food basic', 'japanese time words', 'japanese days week',
    'japanese months', 'japanese seasons', 'japanese weather',
    
    // Verbs and adjectives
    'japanese basic verbs', 'japanese common verbs', 'japanese adjectives basic',
    'japanese i-adjectives', 'japanese na-adjectives',
    
    // Places and things
    'japanese places basic', 'japanese school words', 'japanese home words',
    'japanese transportation', 'japanese body parts', 'japanese clothes',
    
    // Abstract concepts
    'japanese pronouns', 'japanese question words', 'japanese greetings',
    'japanese polite expressions', 'japanese counters basic'
  ]
  
  console.log('\n🔍 Strategy 3: Category-based searches...')
  for (const term of categorySearches) {
    console.log(`Searching: ${term}`)
    await searchAndAddResults(term, results, seenWords)
    await new Promise(resolve => setTimeout(resolve, 800))
  }
  
  // Strategy 4: Hiragana/Katakana only words (often N5)
  const kanaSearches = [
    'hiragana only words', 'katakana words basic', 'japanese no kanji'
  ]
  
  console.log('\n🔍 Strategy 4: Kana-only word searches...')
  for (const term of kanaSearches) {
    console.log(`Searching: ${term}`)
    await searchAndAddResults(term, results, seenWords)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  return results
}

async function searchAndAddResults(searchTerm, results, seenWords) {
  try {
    const response = await fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(searchTerm)}`)
    const data = await response.json()
    
    if (data.data && data.data.length > 0) {
      for (const item of data.data) {
        // More comprehensive N5 detection
        const isLikelyN5 = (
          // Has JLPT N5 tags
          item.tags?.some(tag => 
            tag.toLowerCase().includes('jlpt n5') || 
            tag.toLowerCase().includes('jlpt-n5') ||
            tag.toLowerCase().includes('jlpt5')
          ) ||
          // Is marked as common
          item.is_common ||
          // Has simple structure (short words, basic kanji)
          (item.japanese?.[0]?.word && item.japanese[0].word.length <= 4) ||
          // Only hiragana/katakana
          (item.japanese?.[0]?.reading && !/[\u4e00-\u9faf]/.test(item.japanese[0].reading))
        )
        
        if (isLikelyN5 && item.japanese && item.japanese.length > 0) {
          const japanese = item.japanese[0]
          const wordText = japanese.word || japanese.reading
          const reading = japanese.reading || wordText
          
          // Create unique identifier
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
                tags: item.tags || [],
                is_common: item.is_common || false
              })
              
              seenWords.add(wordKey)
              console.log(`  ✓ Added: ${wordText} (${reading})`)
            }
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error searching for ${searchTerm}:`, error)
  }
}

// Function to search for specific N5 vocabulary lists
async function fetchSpecificN5Words() {
  const n5WordLists = [
    // Core N5 vocabulary - most common words
    ['私', 'あなた', 'これ', 'それ', 'あれ', 'ここ', 'そこ', 'あそこ', 'どこ', 'だれ'],
    ['何', 'いつ', 'どう', 'どの', 'どんな', 'いくつ', 'いくら', 'なぜ', 'どうして'],
    ['はい', 'いいえ', 'ちょっと', 'とても', 'あまり', 'ぜんぜん', 'もう', 'まだ'],
    ['今日', '昨日', '明日', '今', '朝', '昼', '夜', '時間', '分', '秒'],
    ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'],
    ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    ['春', '夏', '秋', '冬', '年', '月', '日', '週間'],
    ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万'],
    ['家族', '父', '母', '兄', '姉', '弟', '妹', '子供', '赤ちゃん', '祖父', '祖母'],
    ['友達', '先生', '学生', '医者', '会社員', '店員', '運転手'],
    ['学校', '大学', '病院', '銀行', '郵便局', '駅', '空港', '店', 'レストラン'],
    ['家', '部屋', '台所', '寝室', '風呂', 'トイレ', '庭', '玄関'],
    ['車', '電車', 'バス', 'タクシー', '飛行機', '自転車', '船', '地下鉄'],
    ['食べ物', '飲み物', '水', 'お茶', 'コーヒー', 'ビール', 'ジュース', '牛乳'],
    ['ご飯', 'パン', '肉', '魚', '野菜', '果物', '卵', 'チーズ', '砂糖', '塩'],
    ['朝ご飯', '昼ご飯', '晩ご飯', '夕食', '昼食', '朝食'],
    ['服', 'シャツ', 'ズボン', 'スカート', '靴', '帽子', '時計', '眼鏡'],
    ['頭', '顔', '目', '鼻', '口', '耳', '手', '足', '体', '髪'],
    ['赤', '青', '黄色', '緑', '白', '黒', '茶色', 'ピンク'],
    ['大きい', '小さい', '高い', '安い', '新しい', '古い', '良い', '悪い'],
    ['暑い', '寒い', '暖かい', '涼しい', '熱い', '冷たい'],
    ['面白い', 'つまらない', '難しい', '易しい', '忙しい', '暇'],
    ['行く', '来る', '帰る', '出る', '入る', '乗る', '降りる', '歩く', '走る', '泳ぐ'],
    ['食べる', '飲む', '作る', '買う', '売る', '読む', '書く', '聞く', '話す', '見る'],
    ['寝る', '起きる', '立つ', '座る', '休む', '働く', '勉強する', '遊ぶ'],
    ['ある', 'いる', 'する', 'なる', 'できる', 'わかる', '知る', '思う'],
    ['天気', '雨', '雪', '風', '雲', '太陽', '月', '星'],
    ['本', 'ペン', '鉛筆', '紙', '机', '椅子', 'かばん', '辞書'],
    ['お金', '円', 'ドル', '財布', 'カード', '切符', '地図'],
    ['音楽', '映画', 'テレビ', 'ラジオ', '新聞', '雑誌', '写真', 'ゲーム']
  ]

  const results = []
  let totalProcessed = 0

  for (const wordList of n5WordLists) {
    console.log(`\n📚 Processing word list (${wordList.length} words)...`)
    
    for (const word of wordList) {
      try {
        console.log(`Searching for: ${word}`)
        
        const response = await fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(word)}`)
        const data = await response.json()
        
        if (data.data && data.data.length > 0) {
          const item = data.data[0] // Take the first (most relevant) result
          const japanese = item.japanese?.[0]
          
          if (japanese) {
            const wordText = japanese.word || japanese.reading || word
            const reading = japanese.reading || word
            
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
              
              // Check for duplicates
              const isDuplicate = results.some(r => r.word === wordText && r.reading === reading)
              
              if (!isDuplicate) {
                results.push({
                  id: uuidv4(),
                  word: wordText,
                  reading: reading,
                  meaning: meanings,
                  part_of_speech: partsOfSpeech || 'noun',
                  jlpt_level: 'N5',
                  frequency_rank: totalProcessed + 1,
                  kanji_used: kanjiUsed,
                  example_sentence: `${wordText}です。`,
                  example_translation: `It is ${meanings.split(';')[0]}.`,
                  is_common: item.is_common || false
                })
                
                console.log(`✓ Added: ${wordText} (${reading}) - ${meanings}`)
                totalProcessed++
              } else {
                console.log(`⚠️  Skipped duplicate: ${wordText}`)
              }
            }
          }
        } else {
          console.log(`❌ No results for: ${word}`)
        }
        
        // Rate limiting - 500ms between requests
        await new Promise(resolve => setTimeout(resolve, 500))
        
      } catch (error) {
        console.error(`Error searching for ${word}:`, error)
      }
    }
  }

  return results
}

async function saveToFile(data, filename = 'n5-vocabulary.json') {
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
    
    // Insert in batches of 100 to avoid timeout
    const batchSize = 100
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
  console.log('🚀 Starting comprehensive N5 vocabulary collection...\n')
  
  // Method 1: Comprehensive Jisho API searches
  console.log('🔍 Phase 1: Comprehensive Jisho API searches...')
  const jishoWords = await fetchAllN5VocabularyFromJisho()
  
  console.log(`\n📊 Phase 1 Results: ${jishoWords.length} words from Jisho searches`)
  
  // Method 2: Specific word list searches
  console.log('\n📖 Phase 2: Fetching specific N5 vocabulary lists...')
  const specificWords = await fetchSpecificN5Words()
  
  console.log(`\n📊 Phase 2 Results: ${specificWords.length} words from specific lists`)
  
  // Combine and deduplicate
  console.log('\n🔄 Combining and deduplicating results...')
  const allWords = [...jishoWords, ...specificWords]
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
  console.log(`- From Jisho searches: ${jishoWords.length}`)
  console.log(`- From specific lists: ${specificWords.length}`)
  console.log(`- After deduplication: ${finalWords.length}`)
  console.log(`- Unique words: ${new Set(finalWords.map(w => w.word)).size}`)
  
  // Save to JSON file first
  await saveToFile(finalWords, 'n5-vocabulary-complete.json')
  
  // Try to save to Supabase if configured
  const supabaseSuccess = await saveToSupabase(finalWords)
  
  console.log('\n✅ N5 vocabulary collection completed!')
  console.log(`📁 Data saved to: n5-vocabulary-complete.json`)
  if (supabaseSuccess) {
    console.log(`💾 Data also saved to Supabase database`)
  }
  
  console.log(`\n🎯 Target achieved: ${finalWords.length >= 600 ? '✅' : '⚠️'} ${finalWords.length}/600+ words collected`)
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
