import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { Article } from '@/app/components/mockData';

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <section className="bg-muted/40 border-t border-border py-10 md:py-14">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1 h-6 bg-accent rounded-full"></span>
          <h2 className="text-base font-black uppercase tracking-[0.15em] text-foreground">
            More Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group article-card bg-card rounded-sm border border-border overflow-hidden"
            >
              <Link href={`/article/${article.slug}`} className="flex flex-col h-full">
                <div className="relative h-44 overflow-hidden">
                  <AppImage
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <span className={`category-pill ${article.categoryColor}`}>
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-4">
                  <h3 className="text-sm font-bold text-foreground leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                    <span className="text-[11px] font-bold text-foreground">{article.author}</span>
                    <span className="text-muted-foreground/40">·</span>
                    <span className="text-[11px] text-muted-foreground">{article.date}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
