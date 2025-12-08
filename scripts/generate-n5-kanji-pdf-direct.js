require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function generateN5KanjiPDF() {
  console.log('📚 Fetching N5 kanji from database...');
  
  // Fetch all N5 kanji
  const { data: kanji, error } = await supabase
    .from('kanji')
    .select('*')
    .eq('jlpt_level', 'N5')
    .order('frequency_rank', { ascending: true });

  if (error) {
    console.error('❌ Error fetching kanji:', error);
    process.exit(1);
  }

  console.log(`✅ Fetched ${kanji.length} N5 kanji`);

  // Create PDF
  const outputPath = path.join(__dirname, '../public/n5-kanji-practice-sheet.pdf');
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 40, bottom: 40, left: 40, right: 40 }
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Group kanji into pages (9 per page for good spacing)
  const kanjiPerPage = 9;
  const totalPages = Math.ceil(kanji.length / kanjiPerPage);

  for (let pageNum = 0; pageNum < totalPages; pageNum++) {
    const startIdx = pageNum * kanjiPerPage;
    const pageKanji = kanji.slice(startIdx, startIdx + kanjiPerPage);

    if (pageNum > 0) {
      doc.addPage();
    }

    // Header with logo
    doc.fontSize(20).fillColor('#ec4899').text('🚀', 40, 40, { continued: true });
    doc.fontSize(18).fillColor('#000000').font('Helvetica').text(' Rocket', { continued: true });
    doc.font('Helvetica-Bold').text('JLPT');

    // Title
    doc.moveDown(0.5);
    doc.fontSize(18).font('Helvetica-Bold').fillColor('#000000').text('N5 KANJI PRACTICE SHEET');
    doc.fontSize(10).font('Helvetica').fillColor('#666666').text('79 Essential Kanji for JLPT N5');

    // Instructions (only on first page)
    if (pageNum === 0) {
      doc.moveDown(0.5);
      doc.fontSize(9).fillColor('#000000');
      doc.text('INSTRUCTIONS:', { continued: false });
      doc.fontSize(8).fillColor('#333333');
      doc.text('1. Study each kanji character, its meaning, and readings.', { indent: 10 });
      doc.text('2. Practice writing each kanji in the boxes provided.', { indent: 10 });
      doc.text('3. Focus on stroke order and proper proportions.', { indent: 10 });
    }

    doc.moveDown(1);

    // Draw kanji grid (3 columns)
    const startY = doc.y;
    const colWidth = 170;
    const rowHeight = 140;
    const cols = 3;
    const rows = Math.ceil(pageKanji.length / cols);

    pageKanji.forEach((k, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const x = 40 + (col * colWidth);
      const y = startY + (row * rowHeight);

      // Card border
      doc.rect(x, y, 160, 130).stroke('#000000');

      // Kanji character (large)
      doc.fontSize(48).font('Helvetica-Bold').fillColor('#000000').text(k.character, x + 10, y + 10, {
        width: 60,
        align: 'center'
      });

      // Meaning and readings
      doc.fontSize(10).font('Helvetica-Bold').fillColor('#000000').text(k.meaning, x + 80, y + 15, {
        width: 70
      });

      doc.fontSize(8).font('Helvetica').fillColor('#666666');
      let infoY = y + 30;
      
      if (k.on_reading && k.on_reading.length > 0) {
        doc.text(`音: ${k.on_reading.join(', ')}`, x + 80, infoY, { width: 70 });
        infoY += 12;
      }
      
      if (k.kun_reading && k.kun_reading.length > 0) {
        doc.text(`訓: ${k.kun_reading.join(', ')}`, x + 80, infoY, { width: 70 });
        infoY += 12;
      }
      
      doc.text(`画数: ${k.stroke_count}`, x + 80, infoY, { width: 70 });

      // Practice boxes (5 boxes)
      const boxSize = 28;
      const boxY = y + 90;
      for (let i = 0; i < 5; i++) {
        const boxX = x + 10 + (i * 30);
        doc.rect(boxX, boxY, boxSize, boxSize).stroke(i === 0 ? '#000000' : '#cccccc');
        
        // First box shows the character lightly
        if (i === 0) {
          doc.fontSize(20).fillColor('#000000').text(k.character, boxX, boxY + 4, {
            width: boxSize,
            align: 'center'
          });
        }
      }
    });

    // Page number at bottom
    doc.fontSize(8).fillColor('#666666').text(
      `Page ${pageNum + 1} of ${totalPages} | RocketJLPT.com`,
      40,
      doc.page.height - 50,
      { align: 'center', width: doc.page.width - 80 }
    );
  }

  doc.end();

  await new Promise((resolve) => stream.on('finish', resolve));

  console.log(`✅ Generated PDF at: ${outputPath}`);
  console.log('📄 You can now download and print the PDF file!');
}

generateN5KanjiPDF().catch(console.error);
