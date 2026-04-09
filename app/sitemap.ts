import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pillow-diagnosis.vercel.app';

  const blogArticles = [
    'makura-erabi-guide',
    'katakori-makura-kankei',
    'suimin-no-shitsu-ageru',
    'makura-sozai-hikaku',
    'ibiki-makura-kankei',
    'makura-takasa-chosei',
    'makura-sentaku-houhou',
    'yokomuki-ne-makura',
    'makura-nedan-kouseihi',
    'makura-kaigai-ninki',
  ];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/diagnosis`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = blogArticles.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages];
}
