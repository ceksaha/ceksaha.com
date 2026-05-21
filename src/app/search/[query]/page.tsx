import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppImage from '@/components/ui/AppImage';
import FactCheckMeter from '@/components/ui/FactCheckMeter';
import { featuredArticles, categoryPreviews } from '@/app/components/mockData';

// Gather all articles from mock data
const allArticles = [...featuredArticles, ...categoryPreviews.flatMap((c) => c.articles)];

export async function generateStaticParams() {
  // No static params – the page is rendered on-demand for any query.
  return [];
}

export default async function SearchResultsPage({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const { query: queryParam } = await params;
  const decoded = decodeURIComponent(queryParam);
  const query = decoded.toLowerCase();

  // Filter articles by title, excerpt, or tags
  const results = allArticles.filter((article) => {
    const inTitle = article.title.toLowerCase().includes(query);
    const inExcerpt = article.excerpt.toLowerCase().includes(query);
    const inTags = article.tags?.some((tag) => tag.toLowerCase().includes(query));
    return inTitle || inExcerpt || inTags;
  });

  if (!results.length) {
    // Show a friendly no‑results message
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="min-h-[50vh] flex flex-col justify-center">
          <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 text-center">
            <h1 className="text-2xl font-bold mb-4">
              Tidak ada hasil untuk &ldquo;{decoded}&rdquo;
            </h1>
            <p className="text-muted-foreground">Coba kata kunci lain atau periksa ejaan.</p>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
          <h1 className="text-2xl font-bold mb-6">Hasil pencarian untuk &ldquo;{decoded}&rdquo;</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((article) => (
              <article
                key={article.id}
                className="group article-card bg-card rounded-sm border border-border overflow-hidden"
              >
                <Link href={`/article/${article.slug}`} className="flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden">
                    <AppImage
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <span className={`category-pill ${article.categoryColor}`}>
                        {article.category}
                      </span>
                      {article.factCheckRating && (
                        <FactCheckMeter rating={article.factCheckRating} type="badge" />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-4">
                    <h3 className="text-sm font-bold text-foreground leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border text-xs text-muted-foreground">
                      <span>{article.author}</span>
                      <span>·</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
