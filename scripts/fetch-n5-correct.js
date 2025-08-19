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

// Comprehensive list of N5 vocabulary to search for
const N5_VOCABULARY_LIST = [
  // Pronouns and basic words
  '私', 'あなた', 'これ', 'それ', 'あれ', 'ここ', 'そこ', 'あそこ', 'どこ', 'だれ', '何', 'いつ', 'どう', 'どの', 'どんな',
  
  // Numbers
  '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万',
  'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう', 'じゅう',
  
  // Time expressions
  '今日', '昨日', '明日', '今', '朝', '昼', '夜', '時間', '分', '秒', '年', '月', '日', '週間',
  '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日',
  '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月',
  '春', '夏', '秋', '冬',
  
  // Family
  '家族', '父', '母', '兄', '姉', '弟', '妹', '子供', '赤ちゃん', '祖父', '祖母', '両親',
  'お父さん', 'お母さん', 'お兄さん', 'お姉さん', '弟さん', '妹さん',
  
  // People and occupations
  '友達', '先生', '学生', '医者', '会社員', '店員', '運転手', '人', '男', '女', '大人',
  
  // Places
  '学校', '大学', '病院', '銀行', '郵便局', '駅', '空港', '店', 'レストラン', 'ホテル',
  '家', '部屋', '台所', '寝室', '風呂', 'トイレ', '庭', '玄関', '窓', 'ドア',
  '国', '町', '市', '村', '道', '橋', '公園', '図書館', '映画館',
  
  // Transportation
  '車', '電車', 'バス', 'タクシー', '飛行機', '自転車', '船', '地下鉄', '切符',
  
  // Food and drink
  '食べ物', '飲み物', '水', 'お茶', 'コーヒー', 'ビール', 'ジュース', '牛乳', 'ワイン',
  'ご飯', 'パン', '肉', '魚', '野菜', '果物', '卵', 'チーズ', '砂糖', '塩',
  '朝ご飯', '昼ご飯', '晩ご飯', '夕食', '昼食', '朝食', 'レストラン',
  
  // Clothing
  '服', 'シャツ', 'ズボン', 'スカート', '靴', '帽子', '時計', '眼鏡', 'かばん',
  
  // Body parts
  '頭', '顔', '目', '鼻', '口', '耳', '手', '足', '体', '髪', '歯',
  
  // Colors
  '赤', '青', '黄色', '緑', '白', '黒', '茶色', 'ピンク',
  
  // Adjectives
  '大きい', '小さい', '高い', '安い', '新しい', '古い', '良い', '悪い', '長い', '短い',
  '暑い', '寒い', '暖かい', '涼しい', '熱い', '冷たい', '重い', '軽い',
  '面白い', 'つまらない', '難しい', '易しい', '忙しい', '暇', '元気', '病気',
  '美しい', 'きれい', '汚い', '静か', 'にぎやか', '有名', '便利', '不便',
  
  // Verbs (dictionary form)
  '行く', '来る', '帰る', '出る', '入る', '乗る', '降りる', '歩く', '走る', '泳ぐ', '飛ぶ',
  '食べる', '飲む', '作る', '買う', '売る', '読む', '書く', '聞く', '話す', '見る', '会う',
  '寝る', '起きる', '立つ', '座る', '休む', '働く', '勉強する', '遊ぶ', '洗う', '着る',
  'ある', 'いる', 'する', 'なる', 'できる', 'わかる', '知る', '思う', '言う', '開く', '閉める',
  '始まる', '終わる', '止まる', '曲がる', '渡る', '持つ', '取る', '置く', '貸す', '借りる',
  
  // Weather
  '天気', '雨', '雪', '風', '雲', '太陽', '月', '星', '空',
  
  // School and study
  '本', 'ペン', '鉛筆', '紙', '机', '椅子', 'かばん', '辞書', '宿題', '試験', '授業',
  
  // Money and shopping
  'お金', '円', 'ドル', '財布', 'カード', '値段', '安い', '高い',
  
  // Entertainment
  '音楽', '映画', 'テレビ', 'ラジオ', '新聞', '雑誌', '写真', 'ゲーム', 'スポーツ',
  
  // Common expressions
  'はい', 'いいえ', 'ちょっと', 'とても', 'あまり', 'ぜんぜん', 'もう', 'まだ',
  'こんにちは', 'おはよう', 'こんばんは', 'さようなら', 'ありがとう', 'すみません',
  'どうぞ', 'どうも', 'そうです', 'そうですね', 'いいです', 'だめ',
  
  // Additional common words
  '問題', '答え', '質問', '意味', '名前', '住所', '電話', '番号', '年齢',
  '仕事', '会社', '休み', '旅行', '買い物', '料理', '掃除', '洗濯',
  '犬', '猫', '鳥', '花', '木', '山', '海', '川', '湖'
]

async function searchVocabularyWord(word) {
  try {
    console.log(`Searching: ${word}`)
    
    const result = await jisho.searchForPhrase(word)
    
    if (!result.data || result.data.length === 0) {
      console.log(`  ❌ No results for: ${word}`)
      return null
    }

    const firstResult = result.data[0]
    
    // Check if it has JLPT N5 tag or is common
    const hasN5Tag = firstResult.tags?.some(tag => 
      tag.toLowerCase().includes('jlpt n5') || 
      tag.toLowerCase().includes('jlpt-n5')
    )
    
    const isCommon = firstResult.is_common
    
    // Extract Japanese word and reading
    const japanese = firstResult.japanese?.[0]
    if (!japanese) {
      console.log(`  ❌ No Japanese data for: ${word}`)
      return null
    }

    const wordText = japanese.word || japanese.reading || word
    const reading = japanese.reading || word
    
    // Extract English meanings
    const meanings = firstResult.senses
      ?.flatMap(sense => sense.english_definitions || [])
      .slice(0, 3)
      .join('; ')

    if (!meanings) {
      console.log(`  ❌ No meanings for: ${word}`)
      return null
    }

    // Extract parts of speech
    const partsOfSpeech = firstResult.senses
      ?.flatMap(sense => sense.parts_of_speech || [])
      .filter((pos, index, arr) => arr.indexOf(pos) === index)
      .slice(0, 2)
      .join(', ')

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
      frequency_rank: 0,
      kanji_used: kanjiUsed,
      example_sentence: `${wordText}です。`,
      example_translation: `It is ${meanings.split(';')[0]}.`,
      has_n5_tag: hasN5Tag,
      is_common: isCommon
    }

    console.log(`  ✓ Added: ${wordText} (${reading}) - ${meanings}`)
    return entry

  } catch (error) {
    console.error(`  ❌ Error searching for ${word}:`, error.message)
    return null
  }
}

async function saveToFile(data, filename = 'n5-vocabulary-proper.json') {
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
    
    // Insert in batches of 50
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
  console.log('🚀 Starting proper N5 vocabulary collection using Jisho API...\n')
  console.log(`📝 Processing ${N5_VOCABULARY_LIST.length} N5 vocabulary words...\n`)
  
  const vocabularyEntries = []
  
  for (let i = 0; i < N5_VOCABULARY_LIST.length; i++) {
    const word = N5_VOCABULARY_LIST[i]
    
    const entry = await searchVocabularyWord(word)
    if (entry) {
      entry.frequency_rank = vocabularyEntries.length + 1
      vocabularyEntries.push(entry)
    }
    
    // Rate limiting - 500ms between requests
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Progress update every 50 words
    if ((i + 1) % 50 === 0) {
      console.log(`\n📊 Progress: ${i + 1}/${N5_VOCABULARY_LIST.length} words processed, ${vocabularyEntries.length} entries collected\n`)
    }
  }

  console.log(`\n📊 Final Results:`)
  console.log(`- Words processed: ${N5_VOCABULARY_LIST.length}`)
  console.log(`- Vocabulary entries collected: ${vocabularyEntries.length}`)
  console.log(`- Success rate: ${((vocabularyEntries.length / N5_VOCABULARY_LIST.length) * 100).toFixed(1)}%`)
  
  // Count entries with N5 tags vs common words
  const withN5Tags = vocabularyEntries.filter(e => e.has_n5_tag).length
  const commonWords = vocabularyEntries.filter(e => e.is_common).length
  
  console.log(`- With JLPT N5 tags: ${withN5Tags}`)
  console.log(`- Marked as common: ${commonWords}`)
  
  // Save to JSON file
  await saveToFile(vocabularyEntries, 'n5-vocabulary-proper.json')
  
  // Try to save to Supabase
  const supabaseSuccess = await saveToSupabase(vocabularyEntries)
  
  console.log('\n✅ N5 vocabulary collection completed!')
  console.log(`📁 Data saved to: n5-vocabulary-proper.json`)
  if (supabaseSuccess) {
    console.log(`💾 Data also saved to Supabase database`)
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
