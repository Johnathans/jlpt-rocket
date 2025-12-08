import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { createClient } from '@supabase/supabase-js';
import { generateKanjiPracticeHTML } from '@/lib/pdf-templates/kanji-practice-template';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET() {
  try {
    // Fetch N4 kanji from database
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { data: kanji, error } = await supabase
      .from('kanji')
      .select('*')
      .eq('jlpt_level', 'N4')
      .order('frequency_rank', { ascending: true });

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    if (!kanji || kanji.length === 0) {
      throw new Error('No N4 kanji found in database');
    }

    // Generate HTML from template
    const html = generateKanjiPracticeHTML(kanji, 'N4');

    // Launch Puppeteer and generate PDF
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

    // Return PDF as downloadable file
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="n5-kanji-practice-sheet.pdf"',
      },
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error.message },
      { status: 500 }
    );
  }
}
