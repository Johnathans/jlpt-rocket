import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Test fetching kanji data
    const { data: kanjiData, error: kanjiError } = await supabase
      .from('kanji')
      .select('*')
      .eq('jlpt_level', 'N5')
      .limit(5)

    // Test fetching vocabulary data
    const { data: vocabData, error: vocabError } = await supabase
      .from('vocabulary')
      .select('*')
      .eq('jlpt_level', 'N5')
      .limit(5)

    // Test fetching sentences data
    const { data: sentencesData, error: sentencesError } = await supabase
      .from('sentences')
      .select('*')
      .eq('jlpt_level', 'N5')
      .limit(5)

    return NextResponse.json({
      success: true,
      data: {
        kanji: {
          count: kanjiData?.length || 0,
          data: kanjiData,
          error: kanjiError?.message
        },
        vocabulary: {
          count: vocabData?.length || 0,
          data: vocabData,
          error: vocabError?.message
        },
        sentences: {
          count: sentencesData?.length || 0,
          data: sentencesData,
          error: sentencesError?.message
        }
      },
      message: 'Supabase connection test completed'
    })

  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to connect to Supabase',
        details: error 
      },
      { status: 500 }
    )
  }
}
