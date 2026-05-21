import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleHero from '@/app/article-detail/components/ArticleHero';
import ArticleBody from '@/app/article-detail/components/ArticleBody';
import ArticleSidebar from '@/app/article-detail/components/ArticleSidebar';
import RelatedArticles from '@/app/article-detail/components/RelatedArticles';
import { sampleArticle, featuredArticles } from '@/app/components/mockData';

export default function ArticleDetailPage() {
  const related = featuredArticles?.slice(1, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ArticleHero article={sampleArticle} />
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Article body */}
            <div className="lg:col-span-8">
              <ArticleBody article={sampleArticle} />
            </div>
            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <ArticleSidebar related={related} />
            </aside>
          </div>
        </div>
        <RelatedArticles articles={related} />
      </main>
      <Footer />
    </div>
  );
}
