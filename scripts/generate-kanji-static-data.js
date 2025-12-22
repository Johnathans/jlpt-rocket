const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function generateKanjiData() {
  const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
  const outputDir = path.join(__dirname, '..', 'public', 'data', 'kanji');

  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const level of levels) {
    console.log(`Fetching ${level} kanji...`);
    
    const { data, error } = await supabase
      .from('kanji')
      .select('id, character, meaning, stroke_count, on_reading, kun_reading')
      .eq('jlpt_level', level)
      .order('character');

    if (error) {
      console.error(`Error fetching ${level} kanji:`, error);
      continue;
    }

    // Only keep the fields we need for the layout
    const simplifiedData = data.map(kanji => ({
      id: kanji.id,
      character: kanji.character,
      meaning: kanji.meaning,
      stroke_count: kanji.stroke_count
    }));

    const filename = path.join(outputDir, `${level.toLowerCase()}.json`);
    fs.writeFileSync(filename, JSON.stringify(simplifiedData, null, 2));
    console.log(`✓ Generated ${filename} (${simplifiedData.length} kanji)`);
  }

  console.log('\n✓ All kanji data generated successfully!');
}

generateKanjiData().catch(console.error);
