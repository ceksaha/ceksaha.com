'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import FactCheckMeter from '@/components/ui/FactCheckMeter';
import { Article } from '@/app/components/mockData';

interface CategoryGridProps {
  articles: Article[];
}

const ARTICLES_PER_PAGE = 9;

export default function CategoryGrid({ articles }: CategoryGridProps) {
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const displayed = articles.slice(0, page * ARTICLES_PER_PAGE);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>('.cat-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [displayed.length]);

  const lead = displayed[0];
  const rest = displayed.slice(1);

  return (
    <div ref={gridRef}>
      {/* Lead story */}
      {lead && (
        <article className="cat-reveal scroll-reveal group article-card bg-card rounded-sm border border-border overflow-hidden mb-5">
          <Link href={`/article/${lead.slug}`} className="flex flex-col md:flex-row h-full">
            <div
              className="relative overflow-hidden md:w-[45%] flex-shrink-0"
              style={{ minHeight: '220px' }}
            >
              <AppImage
                src={lead.image}
                alt={lead.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
            </div>
            <div className="flex flex-col flex-1 p-5 md:p-6 justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`category-pill ${lead.categoryColor}`}>{lead.category}</span>
                  {lead.factCheckRating && (
                    <FactCheckMeter rating={lead.factCheckRating} type="badge" />
                  )}
                  <span className="text-xs text-muted-foreground">{lead.date}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-foreground leading-tight tracking-tight mb-3 group-hover:text-accent transition-colors">
                  {lead.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {lead.excerpt}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                <span className="text-xs font-bold text-foreground">{lead.author}</span>
                <span className="text-muted-foreground/40">·</span>
                <span className="text-xs text-muted-foreground">{lead.readTime}</span>
              </div>
            </div>
          </Link>
        </article>
      )}

      {/* Article grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {rest.map((article, i) => (
          <article
            key={`${article.id}-${i}`}
            className={`cat-reveal scroll-reveal animate-stagger-${(i % 5) + 1} group article-card bg-card rounded-sm border border-border overflow-hidden`}
          >
            <Link href={`/article/${article.slug}`} className="flex flex-col h-full">
              <div className="relative overflow-hidden h-[160px]">
                <AppImage
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
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
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border">
                  <span className="text-[11px] font-bold text-foreground">{article.author}</span>
                  <span className="text-muted-foreground/40">·</span>
                  <span className="text-[11px] text-muted-foreground">{article.date}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Load more / Pagination */}
      {page < totalPages && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-8 py-3 bg-primary text-white rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-navy-light transition-colors"
          >
            Load More Stories
          </button>
        </div>
      )}

      {page >= totalPages && displayed.length > 0 && (
        <p className="text-center text-xs text-muted-foreground py-4 font-medium">
          You&apos;ve reached the end — {displayed.length} stories shown
        </p>
      )}
    </div>
  );
}
