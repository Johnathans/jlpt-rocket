/**
 * Parse JLPT Grammar from Wikibooks
 * Extracts grammar patterns, meanings, and examples from Wikibooks JLPT grammar pages
 */

const https = require('https');
const fs = require('fs');

const LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];

const WIKIBOOKS_URLS = {
  N5: 'https://en.wikibooks.org/wiki/JLPT_Guide/JLPT_N5_Grammar',
  N4: 'https://en.wikibooks.org/wiki/JLPT_Guide/JLPT_N4_Grammar',
  N3: 'https://en.wikibooks.org/wiki/JLPT_Guide/JLPT_N3_Grammar',
  N2: 'https://en.wikibooks.org/wiki/JLPT_Guide/JLPT_N2_Grammar',
  N1: 'https://en.wikibooks.org/wiki/JLPT_Guide/JLPT_N1_Grammar'
};

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseGrammarFromHTML(html, level) {
  const grammarPoints = [];
  
  // Extract content between h3 tags (grammar patterns)
  const h3Regex = /<h3[^>]*><span[^>]*id="([^"]*)"[^>]*>([^<]*)<\/span>/g;
  const matches = [...html.matchAll(h3Regex)];
  
  for (let i = 0; i < matches.length; i++) {
    const pattern = matches[i][2].trim();
    
    // Skip navigation/meta headings
    if (pattern.includes('edit') || pattern === '') continue;
    
    // Find content between this h3 and the next one
    const startPos = matches[i].index;
    const endPos = i < matches.length - 1 ? matches[i + 1].index : html.length;
    const content = html.substring(startPos, endPos);
    
    // Extract meaning/explanation (first paragraph after h3)
    const meaningMatch = content.match(/<\/h3>\s*(?:<p>)?(.*?)(?:<\/p>)?(?:<ul|<h3|$)/s);
    let meaning = '';
    if (meaningMatch) {
      meaning = meaningMatch[1]
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/\[edit[^\]]*\]/g, '') // Remove edit links
        .replace(/\s+/g, ' ')
        .trim();
    }
    
    // Extract example sentences
    const examples = [];
    const exampleRegex = /<li>Example:\s*(.*?)<\/li>/g;
    let exampleMatch;
    
    while ((exampleMatch = exampleRegex.exec(content)) !== null) {
      const exampleText = exampleMatch[1]
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .trim();
      
      // Split Japanese and English (usually separated by period or two spaces)
      const parts = exampleText.split(/\.\s{2,}|\s{3,}/);
      if (parts.length >= 2) {
        examples.push({
          japanese: parts[0].trim(),
          english: parts[1].trim()
        });
      } else {
        // Try to split by common patterns
        const match = exampleText.match(/^(.*?[。！？])\s*(.*)$/);
        if (match) {
          examples.push({
            japanese: match[1].trim(),
            english: match[2].trim()
          });
        } else {
          examples.push({
            japanese: exampleText,
            english: ''
          });
        }
      }
    }
    
    if (pattern && meaning) {
      grammarPoints.push({
        pattern,
        meaning,
        jlpt_level: level,
        examples: examples.slice(0, 3) // Limit to 3 examples
      });
    }
  }
  
  return grammarPoints;
}

async function parseAllLevels() {
  const allGrammar = [];
  
  for (const level of LEVELS) {
    console.log(`\n📖 Fetching ${level} grammar from Wikibooks...`);
    
    try {
      const html = await fetchPage(WIKIBOOKS_URLS[level]);
      const grammarPoints = parseGrammarFromHTML(html, level);
      
      console.log(`✓ Found ${grammarPoints.length} grammar points for ${level}`);
      allGrammar.push(...grammarPoints);
      
      // Save individual level file
      const levelFile = `./grammar-data/wikibooks-${level.toLowerCase()}.json`;
      fs.mkdirSync('./grammar-data', { recursive: true });
      fs.writeFileSync(levelFile, JSON.stringify(grammarPoints, null, 2));
      console.log(`✓ Saved to ${levelFile}`);
      
      // Be nice to the server
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`✗ Error fetching ${level}:`, error.message);
    }
  }
  
  // Save combined file
  const combinedFile = './grammar-data/wikibooks-all-grammar.json';
  fs.writeFileSync(combinedFile, JSON.stringify(allGrammar, null, 2));
  console.log(`\n✓ Saved all ${allGrammar.length} grammar points to ${combinedFile}`);
  
  // Create CSV version
  const csvLines = ['pattern,meaning,jlpt_level,example_count'];
  allGrammar.forEach(g => {
    const pattern = g.pattern.replace(/,/g, '');
    const meaning = g.meaning.replace(/,/g, ';').substring(0, 100);
    csvLines.push(`"${pattern}","${meaning}",${g.jlpt_level},${g.examples.length}`);
  });
  
  const csvFile = './grammar-data/wikibooks-all-grammar.csv';
  fs.writeFileSync(csvFile, csvLines.join('\n'));
  console.log(`✓ Saved CSV to ${csvFile}`);
  
  // Print summary
  console.log('\n📊 Summary:');
  LEVELS.forEach(level => {
    const count = allGrammar.filter(g => g.jlpt_level === level).length;
    console.log(`   ${level}: ${count} grammar points`);
  });
  console.log(`   Total: ${allGrammar.length} grammar points`);
}

// Run the parser
parseAllLevels().catch(console.error);
