import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';

let kuroshiro: Kuroshiro | null = null;
let isInitialized = false;
let initPromise: Promise<void> | null = null;

export async function initializeKuroshiro(): Promise<void> {
  if (isInitialized) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      kuroshiro = new Kuroshiro();
      await kuroshiro.init(new KuromojiAnalyzer({
        dictPath: '/dict/'
      }));
      isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Kuroshiro:', error);
      throw error;
    }
  })();

  return initPromise;
}

export async function addFurigana(text: string): Promise<string> {
  if (!kuroshiro || !isInitialized) {
    await initializeKuroshiro();
  }

  if (!kuroshiro) {
    throw new Error('Kuroshiro failed to initialize');
  }

  try {
    const result = await kuroshiro.convert(text, {
      to: 'hiragana',
      mode: 'furigana',
      romajiSystem: 'passport'
    });
    
    return result;
  } catch (error) {
    console.error('Error converting text to furigana:', error);
    return text; // Return original text if conversion fails
  }
}

export function isKuroshiroReady(): boolean {
  return isInitialized && kuroshiro !== null;
}

export async function extractCompounds(text: string): Promise<string[]> {
  if (!kuroshiro || !isInitialized) {
    await initializeKuroshiro();
  }

  if (!kuroshiro) {
    throw new Error('Kuroshiro failed to initialize');
  }

  try {
    // Get the analyzer to tokenize the text
    const analyzer = (kuroshiro as any)._analyzer;
    if (!analyzer || !analyzer.parse) {
      console.error('Analyzer not available');
      return [];
    }

    const tokens = await analyzer.parse(text);
    const compounds: string[] = [];
    const seen = new Set<string>();

    // Extract words that contain 2+ kanji characters
    for (const token of tokens) {
      const surface = token.surface_form || token.word || '';
      
      // Check if word contains at least 2 kanji
      const kanjiMatches = surface.match(/[\u4e00-\u9faf]/g);
      if (kanjiMatches && kanjiMatches.length >= 2) {
        if (!seen.has(surface)) {
          seen.add(surface);
          compounds.push(surface);
        }
      }
    }

    return compounds;
  } catch (error) {
    console.error('Error extracting compounds:', error);
    return [];
  }
}