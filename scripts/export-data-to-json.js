const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to fetch all data with pagination
async function fetchAllData(tableName) {
  const pageSize = 1000;
  let allData = [];
  let page = 0;
  let hasMore = true;

  console.log(`Fetching ${tableName}...`);

  while (hasMore) {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (error) {
      console.error(`Error fetching ${tableName}:`, error);
      throw error;
    }

    if (data && data.length > 0) {
      allData = [...allData, ...data];
      hasMore = data.length === pageSize;
      page++;
      console.log(`  Fetched ${allData.length} ${tableName}...`);
    } else {
      hasMore = false;
    }
  }

  console.log(`✓ Total ${tableName}: ${allData.length}`);
  return allData;
}

async function exportData() {
  try {
    console.log('Starting data export from Supabase...\n');

    // Create public/data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'public', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Export kanji data
    const kanjiData = await fetchAllData('kanji');
    fs.writeFileSync(
      path.join(dataDir, 'kanji.json'),
      JSON.stringify(kanjiData, null, 2)
    );
    console.log(`✓ Exported kanji.json (${(fs.statSync(path.join(dataDir, 'kanji.json')).size / 1024).toFixed(2)} KB)\n`);

    // Export vocabulary data
    const vocabularyData = await fetchAllData('vocabulary');
    fs.writeFileSync(
      path.join(dataDir, 'vocabulary.json'),
      JSON.stringify(vocabularyData, null, 2)
    );
    console.log(`✓ Exported vocabulary.json (${(fs.statSync(path.join(dataDir, 'vocabulary.json')).size / 1024).toFixed(2)} KB)\n`);

    // Export sentences data
    const sentencesData = await fetchAllData('sentences');
    fs.writeFileSync(
      path.join(dataDir, 'sentences.json'),
      JSON.stringify(sentencesData, null, 2)
    );
    console.log(`✓ Exported sentences.json (${(fs.statSync(path.join(dataDir, 'sentences.json')).size / 1024).toFixed(2)} KB)\n`);

    console.log('✅ Data export complete!');
    console.log(`\nFiles saved to: ${dataDir}`);
    console.log('\nSummary:');
    console.log(`  - Kanji: ${kanjiData.length} entries`);
    console.log(`  - Vocabulary: ${vocabularyData.length} entries`);
    console.log(`  - Sentences: ${sentencesData.length} entries`);

  } catch (error) {
    console.error('Export failed:', error);
    process.exit(1);
  }
}

exportData();
