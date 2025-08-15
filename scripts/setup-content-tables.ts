import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function setupContentTables() {
  console.log('Setting up JLPT Rocket content tables...')

  try {
    // Create JLPT levels enum
    console.log('Creating JLPT level enum...')
    const { error: enumError } = await supabase.rpc('exec_sql', {
      sql: "CREATE TYPE jlpt_level AS ENUM ('N5', 'N4', 'N3', 'N2', 'N1');"
    })
    if (enumError && !enumError.message.includes('already exists')) {
      console.error('Error creating enum:', enumError)
    } else {
      console.log('✓ JLPT level enum created')
    }

    // Create kanji table
    console.log('Creating kanji table...')
    const { error: kanjiError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE kanji (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          character VARCHAR(10) NOT NULL UNIQUE,
          meaning TEXT NOT NULL,
          on_reading TEXT[],
          kun_reading TEXT[],
          jlpt_level jlpt_level NOT NULL,
          frequency_rank INTEGER,
          stroke_count INTEGER,
          radical VARCHAR(10),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })
    if (kanjiError && !kanjiError.message.includes('already exists')) {
      console.error('Error creating kanji table:', kanjiError)
    } else {
      console.log('✓ Kanji table created')
    }

    // Create vocabulary table
    console.log('Creating vocabulary table...')
    const { error: vocabError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE vocabulary (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          word VARCHAR(100) NOT NULL,
          reading VARCHAR(100) NOT NULL,
          meaning TEXT NOT NULL,
          part_of_speech VARCHAR(50),
          jlpt_level jlpt_level NOT NULL,
          frequency_rank INTEGER,
          kanji_used TEXT[],
          example_sentence TEXT,
          example_translation TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(word, reading)
        );
      `
    })
    if (vocabError && !vocabError.message.includes('already exists')) {
      console.error('Error creating vocabulary table:', vocabError)
    } else {
      console.log('✓ Vocabulary table created')
    }

    // Create sentences table
    console.log('Creating sentences table...')
    const { error: sentencesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE sentences (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          japanese_text TEXT NOT NULL,
          english_translation TEXT NOT NULL,
          jlpt_level jlpt_level NOT NULL,
          difficulty_level INTEGER CHECK (difficulty_level >= 1 AND difficulty_level <= 5),
          grammar_points TEXT[],
          vocabulary_used TEXT[],
          kanji_used TEXT[],
          audio_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })
    if (sentencesError && !sentencesError.message.includes('already exists')) {
      console.error('Error creating sentences table:', sentencesError)
    } else {
      console.log('✓ Sentences table created')
    }

    // Create indexes
    console.log('Creating indexes...')
    const indexes = [
      'CREATE INDEX IF NOT EXISTS idx_kanji_jlpt_level ON kanji(jlpt_level);',
      'CREATE INDEX IF NOT EXISTS idx_kanji_frequency ON kanji(frequency_rank);',
      'CREATE INDEX IF NOT EXISTS idx_vocabulary_jlpt_level ON vocabulary(jlpt_level);',
      'CREATE INDEX IF NOT EXISTS idx_vocabulary_frequency ON vocabulary(frequency_rank);',
      'CREATE INDEX IF NOT EXISTS idx_sentences_jlpt_level ON sentences(jlpt_level);',
      'CREATE INDEX IF NOT EXISTS idx_sentences_difficulty ON sentences(difficulty_level);'
    ]

    for (const indexSql of indexes) {
      const { error } = await supabase.rpc('exec_sql', { sql: indexSql })
      if (error) {
        console.error('Error creating index:', error)
      }
    }
    console.log('✓ Indexes created')

    // Insert sample data
    console.log('Inserting sample data...')
    
    // Insert kanji
    const { error: kanjiInsertError } = await supabase
      .from('kanji')
      .insert([
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
      ])

    if (kanjiInsertError && !kanjiInsertError.message.includes('duplicate key')) {
      console.error('Error inserting kanji:', kanjiInsertError)
    } else {
      console.log('✓ Kanji sample data inserted')
    }

    // Insert vocabulary
    const { error: vocabInsertError } = await supabase
      .from('vocabulary')
      .insert([
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
      ])

    if (vocabInsertError && !vocabInsertError.message.includes('duplicate key')) {
      console.error('Error inserting vocabulary:', vocabInsertError)
    } else {
      console.log('✓ Vocabulary sample data inserted')
    }

    // Insert sentences
    const { error: sentencesInsertError } = await supabase
      .from('sentences')
      .insert([
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
      ])

    if (sentencesInsertError && !sentencesInsertError.message.includes('duplicate key')) {
      console.error('Error inserting sentences:', sentencesInsertError)
    } else {
      console.log('✓ Sentences sample data inserted')
    }

    console.log('\n🎉 Content tables setup completed successfully!')
    console.log('You can now query your content by JLPT level:')
    console.log('- SELECT * FROM kanji WHERE jlpt_level = \'N5\'')
    console.log('- SELECT * FROM vocabulary WHERE jlpt_level = \'N5\'')
    console.log('- SELECT * FROM sentences WHERE jlpt_level = \'N5\'')

  } catch (error) {
    console.error('Setup failed:', error)
    process.exit(1)
  }
}

setupContentTables()
