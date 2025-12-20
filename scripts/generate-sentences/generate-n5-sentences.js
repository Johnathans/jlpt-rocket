const fs = require('fs');
const path = require('path');
const { generateSentences, generateCoverageReport } = require('./sentence-generator');
const n5Templates = require('./n5-templates');

async function main() {
  console.log('=== N5 Sentence Generation ===\n');
  
  // Load existing sentences
  const existingSentencesPath = path.join(__dirname, '../../public/data/sentences.json');
  let existingSentences = [];
  
  try {
    existingSentences = JSON.parse(fs.readFileSync(existingSentencesPath, 'utf8'));
    console.log(`Loaded ${existingSentences.length} existing sentences`);
    
    const n5Existing = existingSentences.filter(s => s.jlpt_level === 'N5');
    console.log(`  N5: ${n5Existing.length} sentences`);
    console.log(`  N4: ${existingSentences.filter(s => s.jlpt_level === 'N4').length} sentences`);
  } catch (error) {
    console.log('No existing sentences found, starting fresh');
  }
  
  // Calculate how many N5 sentences we need
  const n5Existing = existingSentences.filter(s => s.jlpt_level === 'N5').length;
  const n5Target = 500;
  const n5Needed = n5Target - n5Existing;
  
  console.log(`\nN5 Target: ${n5Target} sentences`);
  console.log(`N5 Existing: ${n5Existing} sentences`);
  console.log(`N5 Needed: ${n5Needed} sentences\n`);
  
  if (n5Needed <= 0) {
    console.log('✓ N5 target already reached!');
    return;
  }
  
  // Generate new N5 sentences
  const newSentences = generateSentences(n5Templates.templates, n5Needed, 'N5');
  
  // Combine with existing sentences
  const allSentences = [...existingSentences, ...newSentences];
  
  // Sort by level and difficulty
  allSentences.sort((a, b) => {
    const levelOrder = { 'N5': 1, 'N4': 2, 'N3': 3, 'N2': 4, 'N1': 5 };
    const levelDiff = levelOrder[a.jlpt_level] - levelOrder[b.jlpt_level];
    if (levelDiff !== 0) return levelDiff;
    return a.difficulty_level - b.difficulty_level;
  });
  
  // Save to file
  fs.writeFileSync(existingSentencesPath, JSON.stringify(allSentences, null, 2), 'utf8');
  console.log(`\n✓ Saved ${allSentences.length} total sentences to: ${existingSentencesPath}`);
  
  // Generate coverage report for N5 sentences only
  const n5Sentences = allSentences.filter(s => s.jlpt_level === 'N5');
  const coverage = generateCoverageReport(n5Sentences, 'N5');
  
  // Save coverage report
  const reportPath = path.join(__dirname, '../../analysis/n5-sentence-coverage-report.md');
  let report = '# N5 Sentence Coverage Report\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;
  report += `## Summary\n\n`;
  report += `- Total N5 Sentences: ${n5Sentences.length}\n`;
  report += `- Unique Vocabulary: ${Object.keys(coverage.vocabularyUsage).length}\n`;
  report += `- Unique Kanji: ${Object.keys(coverage.kanjiUsage).length}\n`;
  report += `- Grammar Patterns: ${Object.keys(coverage.grammarUsage).length}\n\n`;
  
  report += `## Grammar Pattern Usage\n\n`;
  const sortedGrammar = Object.entries(coverage.grammarUsage).sort((a, b) => b[1] - a[1]);
  sortedGrammar.forEach(([pattern, count]) => {
    report += `- **${pattern}**: ${count} sentences\n`;
  });
  
  report += `\n## Most Used Vocabulary (Top 20)\n\n`;
  const sortedVocab = Object.entries(coverage.vocabularyUsage).sort((a, b) => b[1] - a[1]).slice(0, 20);
  sortedVocab.forEach(([word, count]) => {
    report += `- **${word}**: ${count} times\n`;
  });
  
  report += `\n## Most Used Kanji (Top 20)\n\n`;
  const sortedKanji = Object.entries(coverage.kanjiUsage).sort((a, b) => b[1] - a[1]).slice(0, 20);
  sortedKanji.forEach(([kanji, count]) => {
    report += `- **${kanji}**: ${count} times\n`;
  });
  
  fs.writeFileSync(reportPath, report, 'utf8');
  console.log(`\n✓ Saved coverage report to: ${reportPath}`);
  
  console.log('\n=== N5 Sentence Generation Complete ===');
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
