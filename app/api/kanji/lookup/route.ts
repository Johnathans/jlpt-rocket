import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const { characters } = await request.json();

    if (!characters || !Array.isArray(characters)) {
      return NextResponse.json({ error: 'Characters array is required' }, { status: 400 });
    }

    const supabase = createClient();
    
    // Fetch kanji data for all characters
    const { data, error } = await supabase
      .from('kanji')
      .select('character, meaning, on_reading, kun_reading, jlpt_level')
      .in('character', characters);

    if (error) {
      console.error('Error fetching kanji:', error);
      return NextResponse.json({ error: 'Failed to fetch kanji data' }, { status: 500 });
    }

    // Convert array to object keyed by character
    const kanjiMap = data.reduce((acc, kanji) => {
      acc[kanji.character] = kanji;
      return acc;
    }, {} as Record<string, any>);

    return NextResponse.json(kanjiMap);
  } catch (error) {
    console.error('Error in kanji lookup:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
