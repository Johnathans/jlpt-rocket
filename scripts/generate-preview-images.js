require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Import template function
function getKanjiVGCode(character) {
  return character.charCodeAt(0).toString(16).padStart(5, '0');
}

function generateKanjiPracticeHTML(kanjiData, level) {
  const kanjiPerPage = 2;
  const pages = [];
  
  for (let i = 0; i < kanjiData.length; i += kanjiPerPage) {
    pages.push(kanjiData.slice(i, i + kanjiPerPage));
  }
  
  const levelInfo = {
    'N5': { count: '~80', description: 'Basic' },
    'N4': { count: '~170', description: 'Elementary' },
    'N3': { count: '~370', description: 'Intermediate' },
    'N2': { count: '~370', description: 'Advanced' },
    'N1': { count: '~1,200', description: 'Expert' }
  };

  // Read the template file
  const templatePath = path.join(__dirname, '../lib/pdf-templates/kanji-practice-template.js');
  const templateContent = fs.readFileSync(templatePath, 'utf8');
  
  // Extract just the HTML generation part
  const htmlMatch = templateContent.match(/return `([\s\S]*)`;\s*}/);
  if (!htmlMatch) {
    throw new Error('Could not extract HTML from template');
  }
  
  // Use eval to generate HTML (not ideal but works for this script)
  const html = eval('`' + htmlMatch[1] + '`');
  return html;
}

async function generatePreviewForLevel(level) {
  console.log(`\n📸 Generating preview for ${level}...`);
  
  try {
    // Fetch first 2 kanji for this level
    const { data: kanji, error } = await supabase
      .from('kanji')
      .select('*')
      .eq('jlpt_level', level)
      .order('frequency_rank', { ascending: true })
      .limit(2);

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    if (!kanji || kanji.length === 0) {
      console.log(`⚠️  No ${level} kanji found, skipping...`);
      return;
    }

    console.log(`✅ Fetched ${kanji.length} ${level} kanji for preview`);

    // Generate HTML
    const html = generateKanjiPracticeHTML(kanji, level);

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set viewport for preview (A4 aspect ratio)
    await page.setViewport({
      width: 794, // A4 width in pixels at 96 DPI
      height: 1123, // A4 height in pixels at 96 DPI
      deviceScaleFactor: 2, // High DPI for crisp image
    });

    // Set content and wait for images to load
    await page.setContent(html, {
      waitUntil: 'networkidle0'
    });

    // Take screenshot
    const outputPath = path.join(__dirname, `../public/worksheets/${level.toLowerCase()}-kanji-preview.png`);
    
    await page.screenshot({
      path: outputPath,
      type: 'png',
      fullPage: false, // Just the viewport (first page)
    });

    await browser.close();

    const stats = fs.statSync(outputPath);
    console.log(`✅ ${level} preview saved: ${(stats.size / 1024).toFixed(2)} KB`);

  } catch (error) {
    console.error(`❌ Error generating ${level} preview:`, error.message);
  }
}

async function generateKanaPreview(type) {
  console.log(`\n📸 Generating preview for ${type}...`);
  
  try {
    // Read the kana template
    const kanaTemplatePath = path.join(__dirname, '../lib/pdf-templates/kana-practice-template.js');
    const kanaTemplateContent = fs.readFileSync(kanaTemplatePath, 'utf8');
    
    // Extract the HTML generation part
    const htmlMatch = kanaTemplateContent.match(/return `([\s\S]*)`;\s*}/);
    if (!htmlMatch) {
      throw new Error('Could not extract HTML from kana template');
    }
    
    // Generate HTML by evaluating the template
    const isHiragana = type === 'hiragana';
    const title = isHiragana ? 'HIRAGANA' : 'KATAKANA';
    const description = isHiragana ? 'Master all 46 basic hiragana characters' : 'Master all 46 basic katakana characters';
    
    // Basic kana data (simplified for preview - just first 15)
    const basicKana = isHiragana ? [
      ['あ', 'a'], ['い', 'i'], ['う', 'u'], ['え', 'e'], ['お', 'o'],
      ['か', 'ka'], ['き', 'ki'], ['く', 'ku'], ['け', 'ke'], ['こ', 'ko'],
      ['さ', 'sa'], ['し', 'shi'], ['す', 'su'], ['せ', 'se'], ['そ', 'so']
    ] : [
      ['ア', 'a'], ['イ', 'i'], ['ウ', 'u'], ['エ', 'e'], ['オ', 'o'],
      ['カ', 'ka'], ['キ', 'ki'], ['ク', 'ku'], ['ケ', 'ke'], ['コ', 'ko'],
      ['サ', 'sa'], ['シ', 'shi'], ['ス', 'su'], ['セ', 'se'], ['ソ', 'so']
    ];
    
    const pageKana = basicKana;
    const pageIndex = 0;
    const pages = [basicKana]; // Array with one page for preview
    
    // Generate HTML using eval
    const html = eval('`' + htmlMatch[1] + '`');

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set viewport for preview (A4 aspect ratio)
    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 2,
    });

    // Set content and wait for images to load
    await page.setContent(html, {
      waitUntil: 'networkidle0'
    });

    // Take screenshot
    const outputPath = path.join(__dirname, `../public/worksheets/${type}-preview.png`);
    
    await page.screenshot({
      path: outputPath,
      type: 'png',
      fullPage: false,
    });

    await browser.close();

    const stats = fs.statSync(outputPath);
    console.log(`✅ ${type} preview saved: ${(stats.size / 1024).toFixed(2)} KB`);

  } catch (error) {
    console.error(`❌ Error generating ${type} preview:`, error.message);
  }
}

async function generateAllPreviews() {
  console.log('🚀 Generating preview images for all practice sheets...');
  
  // Generate kanji previews
  const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
  for (const level of levels) {
    await generatePreviewForLevel(level);
  }
  
  // Generate kana previews
  await generateKanaPreview('hiragana');
  await generateKanaPreview('katakana');

  console.log('\n✅ All preview images generated!');
  console.log('📁 Images saved to: public/worksheets/');
}

generateAllPreviews().catch(console.error);
