async function analyzeJLPTMapping() {
  try {
    console.log('Analyzing JLPT mapping from kanji-data source...');
    
    const response = await fetch('https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json');
    const kanjiData = await response.json();
    
    // Test well-known kanji to understand the correct mapping
    const testKanji = {
      '一': 'Basic number - should be easiest level',
      '人': 'Person - should be beginner level', 
      '日': 'Day - should be beginner level',
      '本': 'Book - should be beginner level',
      '会': 'Meeting - should be intermediate',
      '学': 'Study - should be beginner/intermediate',
      '社': 'Company - should be intermediate-advanced',
      '政': 'Politics - should be advanced',
      '議': 'Deliberation - should be very advanced'
    };
    
    console.log('\n=== Test Kanji Analysis ===');
    for (const [char, description] of Object.entries(testKanji)) {
      const data = kanjiData[char];
      if (data) {
        console.log(`${char} (${description})`);
        console.log(`  jlpt_new: ${data.jlpt_new} | freq: ${data.freq} | meanings: ${data.meanings?.slice(0,2).join(', ')}`);
      }
    }
    
    // Count distribution by jlpt_new only
    console.log('\n=== JLPT NEW Level Distribution ===');
    const jlptNewCounts = {};
    
    for (const [character, data] of Object.entries(kanjiData)) {
      if (data.jlpt_new) {
        jlptNewCounts[data.jlpt_new] = (jlptNewCounts[data.jlpt_new] || 0) + 1;
      }
    }
    
    Object.entries(jlptNewCounts).sort((a, b) => a[0] - b[0]).forEach(([level, count]) => {
      console.log(`JLPT Level ${level}: ${count} kanji`);
    });
    
    // Sample kanji from each jlpt_new level to verify difficulty progression
    console.log('\n=== Sample Kanji by JLPT NEW Level ===');
    for (let level = 1; level <= 5; level++) {
      console.log(`\n--- JLPT NEW Level ${level} ---`);
      const samples = [];
      
      for (const [character, data] of Object.entries(kanjiData)) {
        if (data.jlpt_new === level && samples.length < 10) {
          samples.push({
            char: character,
            freq: data.freq || 9999,
            meanings: data.meanings?.slice(0,2).join(', ') || 'No meaning'
          });
        }
      }
      
      // Sort by frequency (lower = more common)
      samples.sort((a, b) => a.freq - b.freq);
      
      samples.forEach((sample, i) => {
        console.log(`${i+1}. ${sample.char} (${sample.meanings}) - freq: ${sample.freq}`);
      });
    }
    
  } catch (error) {
    console.error('Error analyzing JLPT mapping:', error);
  }
}

analyzeJLPTMapping();
