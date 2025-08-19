const { createClient } = require('@supabase/supabase-js');
const https = require('https');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// CSV URLs for each JLPT level
const csvUrls = {
  'N5': 'https://raw.githubusercontent.com/stephenmk/yomitan-jlpt-vocab/main/original_data/n5.csv',
  'N4': 'https://raw.githubusercontent.com/stephenmk/yomitan-jlpt-vocab/main/original_data/n4.csv',
  'N3': 'https://raw.githubusercontent.com/stephenmk/yomitan-jlpt-vocab/main/original_data/n3.csv',
  'N2': 'https://raw.githubusercontent.com/stephenmk/yomitan-jlpt-vocab/main/original_data/n2.csv',
  'N1': 'https://raw.githubusercontent.com/stephenmk/yomitan-jlpt-vocab/main/original_data/n1.csv'
};

function downloadCSV(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        resolve(data);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

function parseCSV(csvData) {
  const lines = csvData.trim().split('\n');
  const header = lines[0];
  const rows = lines.slice(1);
  
  return rows.map(row => {
    // Handle CSV parsing with potential commas in quoted fields
    const parts = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        parts.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    parts.push(current);
    
    return {
      jmdict_seq: parts[0],
      kana: parts[1],
      kanji: parts[2],
      definition: parts[3]?.replace(/"/g, '') // Remove quotes from definition
    };
  });
}

function extractKanjiUsed(word) {
  // Extract kanji characters from the word
  const kanjiRegex = /[\u4e00-\u9faf]/g;
  const matches = word.match(kanjiRegex);
  return matches ? [...new Set(matches)] : [];
}

async function uploadVocabularyBatch(vocabularyData, batchSize = 50) {
  const batches = [];
  for (let i = 0; i < vocabularyData.length; i += batchSize) {
    batches.push(vocabularyData.slice(i, i + batchSize));
  }

  let totalUploaded = 0;
  for (const [index, batch] of batches.entries()) {
    console.log(`Uploading batch ${index + 1}/${batches.length} (${batch.length} items)...`);
    
    const { data, error } = await supabase
      .from('vocabulary')
      .insert(batch);

    if (error) {
      console.error(`Error uploading batch ${index + 1}:`, error);
      throw error;
    }

    totalUploaded += batch.length;
    console.log(`✅ Batch ${index + 1} uploaded successfully. Total: ${totalUploaded}`);
  }

  return totalUploaded;
}

async function importVocabularyLevel(level) {
  try {
    console.log(`\n📥 Downloading ${level} vocabulary data...`);
    const csvData = await downloadCSV(csvUrls[level]);
    
    console.log(`📊 Parsing ${level} CSV data...`);
    const parsedData = parseCSV(csvData);
    
    console.log(`🔄 Processing ${parsedData.length} ${level} vocabulary entries...`);
    
    const vocabularyData = parsedData.map((item, index) => ({
      word: item.kanji || item.kana, // Use kanji form if available, otherwise kana
      reading: item.kana,
      meaning: item.definition,
      jlpt_level: level,
      frequency_rank: index + 1, // Use position in list as frequency rank
      kanji_used: extractKanjiUsed(item.kanji || item.kana)
    }));

    // Filter out entries with missing data
    const validData = vocabularyData.filter(item => 
      item.word && item.reading && item.meaning
    );

    console.log(`✅ Processed ${validData.length} valid entries for ${level}`);
    console.log(`Sample entries:`);
    validData.slice(0, 3).forEach(item => {
      console.log(`  - ${item.word} (${item.reading}) = ${item.meaning}`);
    });

    if (validData.length > 0) {
      const uploaded = await uploadVocabularyBatch(validData);
      console.log(`🎉 Successfully imported ${uploaded} ${level} vocabulary entries`);
      return uploaded;
    } else {
      console.log(`⚠️ No valid entries found for ${level}`);
      return 0;
    }

  } catch (error) {
    console.error(`❌ Error importing ${level} vocabulary:`, error);
    throw error;
  }
}

async function importAllVocabulary() {
  try {
    console.log('🚀 Starting vocabulary import from yomitan-jlpt-vocab...');
    
    const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
    const results = {};
    
    for (const level of levels) {
      results[level] = await importVocabularyLevel(level);
    }
    
    console.log('\n📊 Import Summary:');
    let total = 0;
    for (const [level, count] of Object.entries(results)) {
      console.log(`  ${level}: ${count} entries`);
      total += count;
    }
    console.log(`  Total: ${total} vocabulary entries`);
    
    // Verify final count
    const { count, error } = await supabase
      .from('vocabulary')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('Error verifying count:', error);
    } else {
      console.log(`\n✅ Database verification: ${count} total vocabulary entries`);
    }
    
  } catch (error) {
    console.error('❌ Import failed:', error);
  }
}

// Allow importing specific level if provided as argument
const targetLevel = process.argv[2];
if (targetLevel && csvUrls[targetLevel.toUpperCase()]) {
  importVocabularyLevel(targetLevel.toUpperCase());
} else {
  importAllVocabulary();
}
