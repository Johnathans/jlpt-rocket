import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rocketjlpt.com';
  
  // Static public pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/schools`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // JLPT Kanji level pages
  const jlptLevels = ['n5', 'n4', 'n3', 'n2', 'n1'];
  const kanjiPages = jlptLevels.map(level => ({
    url: `${baseUrl}/jlpt/${level}/kanji`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // JLPT Vocabulary level pages
  const vocabularyPages = jlptLevels.map(level => ({
    url: `${baseUrl}/jlpt/${level}/vocabulary`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // JLPT Grammar level pages
  const grammarPages = jlptLevels.map(level => ({
    url: `${baseUrl}/jlpt/${level}/grammar`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Kana pages
  const kanaPages = [
    {
      url: `${baseUrl}/jlpt/hiragana`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jlpt/katakana`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // How to Pass pages
  const howToPassPages = jlptLevels.map(level => ({
    url: `${baseUrl}/how-to-pass/${level}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Individual Kanji pages (dynamic from database)
  let individualKanjiPages: MetadataRoute.Sitemap = [];
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: kanjiData } = await supabase
      .from('kanji')
      .select('character, jlpt_level')
      .order('frequency_rank', { ascending: true })
      .range(0, 2999); // Fetch all 2,211 kanji (up to 3000 rows)
    
    if (kanjiData) {
      individualKanjiPages = kanjiData.map(kanji => ({
        url: `${baseUrl}/jlpt/${kanji.jlpt_level.toLowerCase()}/kanji/${kanji.character}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7, // Individual kanji pages get good priority
      }));
    }
  } catch (error) {
    console.error('Error fetching kanji for sitemap:', error);
  }

  // Combine all pages
  return [
    ...staticPages, 
    ...kanjiPages, 
    ...vocabularyPages,
    ...grammarPages, 
    ...kanaPages, 
    ...howToPassPages,
    ...individualKanjiPages // Add all 2,211 individual kanji pages
  ];
}
