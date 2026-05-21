'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import FactCheckMeter from '@/components/ui/FactCheckMeter';
import { CategoryPreview } from './mockData';

interface CategoryStripsProps {
  categories: CategoryPreview[];
}

function CategoryStrip({ category }: { category: CategoryPreview }) {
  return (
    <div className="py-8 md:py-10 border-b border-border last:border-b-0">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="text-xl">{category.icon}</span>
            <div>
              <h2
                className={`text-sm md:text-base font-black uppercase tracking-[0.15em] ${category.color}`}
              >
                {category.name}
              </h2>
            </div>
          </div>
          <Link
            href={`/category/${category.slug}`}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-0.5"
          >
            All {category.name.split(' ')[0]}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {category.articles.map((article, i) => (
            <article
              key={article.id}
              className={`group flex flex-col article-card bg-card rounded-sm border border-border overflow-hidden ${i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <Link href={`/article/${article.slug}`} className="flex flex-col h-full">
                <div
                  className={`relative overflow-hidden ${i === 0 ? 'h-[180px] sm:h-[200px]' : 'h-[160px]'}`}
                >
                  <AppImage
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
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
                  {i === 0 && (
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2">
                      {article.excerpt}
                    </p>
                  )}
                  <div className="mt-auto flex items-center gap-2 pt-2 border-t border-border">
                    <span className="text-[11px] font-semibold text-foreground">
                      {article.author}
                    </span>
                    <span className="text-muted-foreground/40">·</span>
                    <span className="text-[11px] text-muted-foreground">{article.readTime}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CategoryStrips({ categories }: CategoryStripsProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>('.scroll-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-background">
      {categories.map((cat) => (
        <CategoryStrip key={cat.slug} category={cat} />
      ))}
    </section>
  );
}
