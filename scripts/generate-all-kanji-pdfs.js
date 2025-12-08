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

// Import the template (using dynamic import for ES modules)
async function loadTemplate() {
  const templatePath = path.join(__dirname, '../lib/pdf-templates/kanji-practice-template.js');
  const templateCode = fs.readFileSync(templatePath, 'utf8');
  
  // Extract the function using eval (not ideal but works for this use case)
  const getKanjiVGCode = (character) => {
    return character.charCodeAt(0).toString(16).padStart(5, '0');
  };
  
  const generateKanjiPracticeHTML = eval(
    `(${templateCode.match(/export function generateKanjiPracticeHTML[\s\S]*$/)[0].replace('export function ', 'function ')}); generateKanjiPracticeHTML`
  );
  
  return { generateKanjiPracticeHTML };
}

async function generatePDFForLevel(level, template) {
  console.log(`\n📚 Generating ${level} Kanji Practice Sheet...`);
  
  try {
    // Fetch kanji for this level
    const { data: kanji, error } = await supabase
      .from('kanji')
      .select('*')
      .eq('jlpt_level', level)
      .order('frequency_rank', { ascending: true });

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    if (!kanji || kanji.length === 0) {
      console.log(`⚠️  No ${level} kanji found in database, skipping...`);
      return;
    }

    console.log(`✅ Fetched ${kanji.length} ${level} kanji`);

    // Generate HTML
    const html = template.generateKanjiPracticeHTML(kanji, level);

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set content and wait for fonts to load
    await page.setContent(html, {
      waitUntil: 'networkidle0'
    });

    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    });

    await browser.close();

    // Save PDF to public directory
    const outputPath = path.join(__dirname, `../public/worksheets/${level.toLowerCase()}-kanji-practice-sheet.pdf`);
    
    // Create worksheets directory if it doesn't exist
    const worksheetsDir = path.join(__dirname, '../public/worksheets');
    if (!fs.existsSync(worksheetsDir)) {
      fs.mkdirSync(worksheetsDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, pdf);

    console.log(`✅ Generated ${level} PDF: ${outputPath}`);
    console.log(`📄 File size: ${(pdf.length / 1024 / 1024).toFixed(2)} MB`);

  } catch (error) {
    console.error(`❌ Error generating ${level} PDF:`, error.message);
  }
}

async function generateAllPDFs() {
  console.log('🚀 Starting PDF generation for all JLPT levels...\n');
  
  const template = await loadTemplate();
  const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];

  for (const level of levels) {
    await generatePDFForLevel(level, template);
  }

  console.log('\n✅ All PDFs generated successfully!');
  console.log('📁 PDFs saved to: public/worksheets/');
}

generateAllPDFs().catch(console.error);
