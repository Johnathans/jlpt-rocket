import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    console.log('Setting up JLPT Rocket content tables...')

    // Insert kanji data directly using the client
    const { error: kanjiError } = await supabase
      .from('kanji')
      .upsert([
        {
          character: '学',
          meaning: 'study, learning',
          on_reading: ['ガク'],
          kun_reading: ['まな.ぶ'],
          jlpt_level: 'N5',
          frequency_rank: 1,
          stroke_count: 8,
          radical: '子'
        },
        {
          character: '校',
          meaning: 'school',
          on_reading: ['コウ'],
          kun_reading: [],
          jlpt_level: 'N5',
          frequency_rank: 2,
          stroke_count: 10,
          radical: '木'
        },
        {
          character: '天',
          meaning: 'heaven, sky',
          on_reading: ['テン'],
          kun_reading: ['あま', 'あめ'],
          jlpt_level: 'N5',
          frequency_rank: 3,
          stroke_count: 4,
          radical: '大'
        },
        {
          character: '気',
          meaning: 'spirit, mood',
          on_reading: ['キ', 'ケ'],
          kun_reading: [],
          jlpt_level: 'N5',
          frequency_rank: 4,
          stroke_count: 6,
          radical: '气'
        },
        {
          character: '映',
          meaning: 'reflect, projection',
          on_reading: ['エイ'],
          kun_reading: ['うつ.る', 'うつ.す', 'は.える'],
          jlpt_level: 'N4',
          frequency_rank: 5,
          stroke_count: 9,
          radical: '日'
        },
        {
          character: '画',
          meaning: 'picture, drawing',
          on_reading: ['ガ'],
          kun_reading: [],
          jlpt_level: 'N4',
          frequency_rank: 6,
          stroke_count: 8,
          radical: '田'
        }
      ], { onConflict: 'character' })

    // Insert vocabulary data
    const { error: vocabError } = await supabase
      .from('vocabulary')
      .upsert([
        {
          word: '学校',
          reading: 'がっこう',
          meaning: 'school',
          part_of_speech: 'noun',
          jlpt_level: 'N5',
          frequency_rank: 1,
          kanji_used: ['学', '校'],
          example_sentence: '私は毎日学校に行きます。',
          example_translation: 'I go to school every day.'
        },
        {
          word: '天気',
          reading: 'てんき',
          meaning: 'weather',
          part_of_speech: 'noun',
          jlpt_level: 'N5',
          frequency_rank: 2,
          kanji_used: ['天', '気'],
          example_sentence: '今日は天気がいいですね。',
          example_translation: 'The weather is nice today, isn\'t it?'
        },
        {
          word: '映画',
          reading: 'えいが',
          meaning: 'movie',
          part_of_speech: 'noun',
          jlpt_level: 'N5',
          frequency_rank: 3,
          kanji_used: ['映', '画'],
          example_sentence: '友達と映画を見ました。',
          example_translation: 'I watched a movie with my friend.'
        },
        {
          word: '新しい',
          reading: 'あたらしい',
          meaning: 'new',
          part_of_speech: 'i-adjective',
          jlpt_level: 'N5',
          frequency_rank: 4,
          kanji_used: ['新'],
          example_sentence: '新しい本を買いました。',
          example_translation: 'I bought a new book.'
        },
        {
          word: '電車',
          reading: 'でんしゃ',
          meaning: 'train',
          part_of_speech: 'noun',
          jlpt_level: 'N5',
          frequency_rank: 5,
          kanji_used: ['電', '車'],
          example_sentence: '電車で会社に行きます。',
          example_translation: 'I go to the company by train.'
        }
      ], { onConflict: 'word,reading' })

    // Insert sentences data
    const { error: sentencesError } = await supabase
      .from('sentences')
      .upsert([
        {
          japanese_text: '私は毎日学校に行きます。',
          english_translation: 'I go to school every day.',
          jlpt_level: 'N5',
          difficulty_level: 1,
          grammar_points: ['は particle', 'に particle', 'ます form'],
          vocabulary_used: ['私', '毎日', '学校', '行く'],
          kanji_used: ['私', '毎', '日', '学', '校', '行']
        },
        {
          japanese_text: '今日は天気がいいですね。',
          english_translation: 'The weather is nice today, isn\'t it?',
          jlpt_level: 'N5',
          difficulty_level: 1,
          grammar_points: ['は particle', 'が particle', 'ですね'],
          vocabulary_used: ['今日', '天気', 'いい'],
          kanji_used: ['今', '日', '天', '気']
        },
        {
          japanese_text: '友達と映画を見ました。',
          english_translation: 'I watched a movie with my friend.',
          jlpt_level: 'N5',
          difficulty_level: 2,
          grammar_points: ['と particle', 'を particle', 'ました form'],
          vocabulary_used: ['友達', '映画', '見る'],
          kanji_used: ['友', '達', '映', '画', '見']
        },
        {
          japanese_text: '新しい本を買いました。',
          english_translation: 'I bought a new book.',
          jlpt_level: 'N5',
          difficulty_level: 1,
          grammar_points: ['い-adjective', 'を particle', 'ました form'],
          vocabulary_used: ['新しい', '本', '買う'],
          kanji_used: ['新', '本', '買']
        },
        {
          japanese_text: '電車で会社に行きます。',
          english_translation: 'I go to the company by train.',
          jlpt_level: 'N5',
          difficulty_level: 2,
          grammar_points: ['で particle', 'に particle', 'ます form'],
          vocabulary_used: ['電車', '会社', '行く'],
          kanji_used: ['電', '車', '会', '社', '行']
        }
      ], { onConflict: 'japanese_text' })

    const results = {
      kanji: kanjiError ? { error: kanjiError.message } : { success: 'Kanji data inserted' },
      vocabulary: vocabError ? { error: vocabError.message } : { success: 'Vocabulary data inserted' },
      sentences: sentencesError ? { error: sentencesError.message } : { success: 'Sentences data inserted' }
    }

    return NextResponse.json({
      message: 'Content tables setup completed',
      results,
      note: 'If you see errors about tables not existing, you need to create the tables first using the SQL in docs/supabase-content-tables.sql'
    })

  } catch (error) {
    console.error('Setup failed:', error)
    return NextResponse.json(
      { error: 'Setup failed', details: error },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST to setup tables',
    instructions: 'Send a POST request to this endpoint to setup the content tables'
  })
}
