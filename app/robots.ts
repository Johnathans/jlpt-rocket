import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://rocketjlpt.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/login',
          '/signup',
          '/about',
          '/help',
          '/contact',
          '/privacy',
          '/jlpt/',
        ],
        disallow: [
          '/kanji',
          '/vocabulary',
          '/sentences',
          '/stories',
          '/roadmap',
          '/progress',
          '/profile',
          '/settings',
          '/review',
          '/test',
          '/match',
          '/flashcard',
          '/input',
          '/cloze',
          '/training/',
          '/story/',
          '/change-jlpt-level',
          '/membership',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
