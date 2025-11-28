import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
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
  ];

  // JLPT Kanji level pages
  const jlptLevels = ['n5', 'n4', 'n3', 'n2', 'n1'];
  const kanjiPages = jlptLevels.map(level => ({
    url: `${baseUrl}/jlpt/${level}/kanji`,
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

  // Combine all pages
  return [...staticPages, ...kanjiPages, ...kanaPages];
}
