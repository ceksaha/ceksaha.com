import { MetadataRoute } from 'next';
import { featuredArticles, categoryPreviews } from '@/app/components/mockData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const allArticles = [...featuredArticles, ...categoryPreviews.flatMap((c) => c.articles)];

  const articleUrls = allArticles.map((article) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  const categoryUrls = categoryPreviews.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'hourly', priority: 1.0 },
    {
      url: `${baseUrl}/category`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...articleUrls,
    ...categoryUrls,
  ];
}
