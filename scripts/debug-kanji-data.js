const fs = require('fs');

async function debugKanjiData() {
  try {
    console.log('Downloading kanji data to analyze JLPT levels...');
    const response = await fetch('https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json');
    const kanjiData = await response.json();
    
    console.log(`Total kanji entries: ${Object.keys(kanjiData).length}`);
    
    // Analyze JLPT level distribution
    const jlptOldCounts = {};
    const jlptNewCounts = {};
    const sampleData = {};
    
    let sampleCount = 0;
    
    for (const [character, data] of Object.entries(kanjiData)) {
      // Count old JLPT levels
      if (data.jlpt_old) {
        jlptOldCounts[data.jlpt_old] = (jlptOldCounts[data.jlpt_old] || 0) + 1;
      }
      
      // Count new JLPT levels
      if (data.jlpt_new) {
        jlptNewCounts[data.jlpt_new] = (jlptNewCounts[data.jlpt_new] || 0) + 1;
      }
      
      // Collect sample data for first 10 entries with JLPT data
      if (sampleCount < 10 && (data.jlpt_old || data.jlpt_new)) {
        sampleData[character] = {
          jlpt_old: data.jlpt_old,
          jlpt_new: data.jlpt_new,
          meanings: data.meanings
        };
        sampleCount++;
      }
    }
    
    console.log('\n=== JLPT OLD Level Distribution ===');
    Object.entries(jlptOldCounts).sort((a, b) => a[0] - b[0]).forEach(([level, count]) => {
      console.log(`Level ${level}: ${count} kanji`);
    });
    
    console.log('\n=== JLPT NEW Level Distribution ===');
    Object.entries(jlptNewCounts).sort((a, b) => a[0] - b[0]).forEach(([level, count]) => {
      console.log(`Level ${level}: ${count} kanji`);
    });
    
    console.log('\n=== Sample Data ===');
    Object.entries(sampleData).forEach(([char, data]) => {
      console.log(`${char}: old=${data.jlpt_old}, new=${data.jlpt_new}, meanings=${data.meanings?.slice(0,2).join(', ')}`);
    });
    
    // Check what the expected JLPT counts should be
    console.log('\n=== Expected JLPT Counts (approximate) ===');
    console.log('N5: ~100 kanji');
    console.log('N4: ~300 kanji'); 
    console.log('N3: ~650 kanji');
    console.log('N2: ~1000 kanji');
    console.log('N1: ~2000+ kanji');
    
  } catch (error) {
    console.error('Error analyzing kanji data:', error);
  }
}

debugKanjiData();
