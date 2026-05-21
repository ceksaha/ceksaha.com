import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleHero from '@/app/article-detail/components/ArticleHero';
import ArticleBody from '@/app/article-detail/components/ArticleBody';
import ArticleSidebar from '@/app/article-detail/components/ArticleSidebar';
import RelatedArticles from '@/app/article-detail/components/RelatedArticles';
import FactCheckMeter from '@/components/ui/FactCheckMeter';
import { featuredArticles, categoryPreviews, Article } from '@/app/components/mockData';
import { promises as fs } from 'fs';
import path from 'path';

// Generate static params for SEO & pre-rendering in Next.js
export async function generateStaticParams() {
  const allArticles = [...featuredArticles, ...categoryPreviews.flatMap((c) => c.articles)];
  try {
    const dataFile = path.join(process.cwd(), 'src', 'data', 'articles.json');
    const data = await fs.readFile(dataFile, 'utf-8');
    const list = JSON.parse(data);
    const localParams = list.map((local: any) => ({
      slug: `local-${local.id}`,
    }));
    return [...allArticles.map((article) => ({ slug: article.slug })), ...localParams];
  } catch {
    return allArticles.map((article) => ({ slug: article.slug }));
  }
}

async function getLocalArticle(slug: string): Promise<Article | null> {
  try {
    const dataFile = path.join(process.cwd(), 'src', 'data', 'articles.json');
    const data = await fs.readFile(dataFile, 'utf-8');
    const list = JSON.parse(data);
    const local = list.find((a: any) => a.slug === slug || slug === `local-${a.id}`);
    if (!local) return null;
    return {
      id: local.id,
      title: local.title,
      excerpt: local.content.substring(0, 150) + (local.content.length > 150 ? '...' : ''),
      category: local.category || 'Klarifikasi',
      categoryColor: local.categoryColor || 'category-politics bg-gradient-to-r from-red-500 to-accent',
      author: local.author || 'Tim Ceksaha',
      authorRole: local.authorRole || 'Fakta Checker',
      date: new Date(local.createdAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      readTime: local.readTime || '3 min read',
      image: local.imageUrl || 'https://images.unsplash.com/photo-1505573064804-7c19cb8387f4',
      imageAlt: local.title,
      tags: local.tags || ['Cek Fakta', 'Klarifikasi'],
      slug: slug,
      body: local.content.split('\n\n'), // Parse paragraphs dynamically
    };
  } catch {
    return null;
  }
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let article = await getLocalArticle(slug);

  const allArticles = [...featuredArticles, ...categoryPreviews.flatMap((c) => c.articles)];

  if (!article) {
    article = allArticles.find((a) => a.slug === slug) || null;
  }

  if (!article) {
    notFound();
  }

  // Find related articles (same category, excluding current article)
  const related = allArticles
    .filter((a) => a.category === article!.category && a.id !== article!.id)
    .slice(0, 3);

  // Fallback related if not enough in the same category
  const finalRelated =
    related.length >= 3
      ? related
      : [...related, ...featuredArticles.filter((a) => a.id !== article!.id)].slice(0, 3);

  // Generate JSON-LD Structured Data
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ceksaha.com';
  const articleUrl = `${baseUrl}/article/${article.slug}`;


  const newsArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    image: [article.image.startsWith('http') ? article.image : baseUrl + article.image],
    datePublished: new Date().toISOString(), // In real app, parse article.date
    author: [
      {
        '@type': 'Person',
        name: article.author,
        url: baseUrl,
      },
    ],
  };

  let claimReviewSchema = null;
  if (article.factCheckRating) {
    let ratingValue = 1;
    let alternateName = 'False';
    if (article.factCheckRating === 'benar') {
      ratingValue = 5;
      alternateName = 'True';
    } else if (article.factCheckRating === 'sebagian_benar') {
      ratingValue = 3;
      alternateName = 'Partially True';
    } else if (article.factCheckRating === 'menyesatkan') {
      ratingValue = 2;
      alternateName = 'Misleading';
    }

    claimReviewSchema = {
      '@context': 'https://schema.org',
      '@type': 'ClaimReview',
      url: articleUrl,
      claimReviewed: article.title,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: ratingValue,
        bestRating: '5',
        worstRating: '1',
        alternateName: alternateName,
      },
      itemReviewed: {
        '@type': 'Claim',
        author: {
          '@type': 'Organization',
          name: 'Internet / Media Sosial',
        },
      },
      author: {
        '@type': 'Organization',
        name: 'ceksaha.com',
        url: baseUrl,
      },
    };
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Inject SEO JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />
      {claimReviewSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(claimReviewSchema) }}
        />
      )}

      <Header />
      <main>
        <ArticleHero article={article} />
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Article body */}
            <div className="lg:col-span-8">
              {article.factCheckRating && (
                <FactCheckMeter
                  rating={article.factCheckRating}
                  summary={article.factCheckSummary}
                />
              )}
              <ArticleBody article={article} />
            </div>
            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <ArticleSidebar related={finalRelated} />
            </aside>
          </div>
        </div>
        <RelatedArticles articles={finalRelated} />
      </main>
      <Footer />
    </div>
  );
}
