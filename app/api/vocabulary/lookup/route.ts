import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { words } = await request.json();

    if (!words || !Array.isArray(words)) {
      return NextResponse.json({ error: 'Words array is required' }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    // Fetch vocabulary data for all words
    const { data, error } = await supabase
      .from('vocabulary')
      .select('word, reading, meaning, jlpt_level')
      .in('word', words);

    if (error) {
      console.error('Error fetching vocabulary:', error);
      return NextResponse.json({ error: 'Failed to fetch vocabulary data' }, { status: 500 });
    }

    // Log for debugging
    console.log('Vocabulary lookup request:', { words, foundCount: data?.length || 0 });
    if (data && data.length < words.length) {
      const foundWords = data.map((v: any) => v.word);
      const missingWords = words.filter((w: string) => !foundWords.includes(w));
      console.log('Missing vocabulary entries:', missingWords);
    }

    // Convert array to object keyed by word
    const vocabMap = (data || []).reduce((acc: Record<string, any>, vocab: any) => {
      acc[vocab.word] = vocab;
      return acc;
    }, {} as Record<string, any>);

    return NextResponse.json(vocabMap);
  } catch (error) {
    console.error('Error in vocabulary lookup:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
