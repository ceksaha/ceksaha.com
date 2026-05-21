'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import FactCheckMeter from '@/components/ui/FactCheckMeter';
import { Article } from './mockData';

interface FeaturedGridProps {
  articles: Article[];
}

export default function FeaturedGrid({ articles }: FeaturedGridProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>('.grid-reveal');
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
  }, []);

  // Spotlight effect
  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.spotlight-card');
    if (!cards) return;
    const onMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // BENTO GRID AUDIT:
  // Array has 6 cards: [Main(cs-2 rs-2), Card2(cs-1 rs-1), Card3(cs-1 rs-1), Card4(cs-1 rs-1), Card5(cs-1 rs-1), Wide(cs-2 rs-1)]
  // Row 1: [col-1+2: Main cs-2 rs-2] [col-3: Card2 cs-1 rs-1] [col-4: Card3 cs-1 rs-1]
  // Row 2: [col-1+2: Main cs-2 rs-2 cont.] [col-3: Card4 cs-1 rs-1] [col-4: Card5 cs-1 rs-1]
  // Row 3: [col-1+2: Wide cs-2 rs-1] [col-3+4: Wide2 cs-2 rs-1]
  // Placed 6/6 cards ✓

  const allArticles = articles ?? [];
  const main = allArticles[0];
  const rest = allArticles.slice(1);
  const gridCards = rest.slice(0, 4);
  const wideCards = rest.slice(4, 6);

  return (
    <section ref={sectionRef} className="py-10 md:py-14 bg-muted/40 border-b border-border">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="w-1 h-6 bg-accent rounded-full"></span>
            <h2 className="text-base md:text-lg font-black uppercase tracking-[0.15em] text-foreground">
              Top Stories
            </h2>
          </div>
          <Link
            href="/category"
            className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            View All
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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
          {/* Card 1: Main — col-span-2 row-span-2 */}
          <article className="grid-reveal scroll-reveal md:col-span-2 md:row-span-2 spotlight-card article-card bg-card rounded-sm border border-border overflow-hidden group">
            <Link href={`/article/${main.slug}`} className="flex flex-col h-full">
              <div className="relative overflow-hidden" style={{ height: '280px' }}>
                <AppImage
                  src={main.image}
                  alt={main.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className={`category-pill ${main.categoryColor}`}>{main.category}</span>
                  {main.factCheckRating && (
                    <FactCheckMeter rating={main.factCheckRating} type="badge" />
                  )}
                </div>
              </div>
              <div className="flex flex-col flex-1 p-5 md:p-6">
                <h3 className="text-display font-extrabold text-foreground leading-tight tracking-tight mb-3 group-hover:text-accent transition-colors">
                  {main.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {main.excerpt}
                </p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                  <span className="text-xs font-bold text-foreground">{main.author}</span>
                  <span className="text-muted-foreground/40 text-xs">·</span>
                  <span className="text-xs text-muted-foreground">{main.date}</span>
                  <span className="text-muted-foreground/40 text-xs">·</span>
                  <span className="text-xs text-muted-foreground">{main.readTime}</span>
                </div>
              </div>
            </Link>
          </article>

          {/* Cards 2–5: col-span-1 row-span-1 */}
          {gridCards.map((article, i) => (
            <article
              key={article.id}
              className={`grid-reveal scroll-reveal animate-stagger-${i + 1} spotlight-card article-card bg-card rounded-sm border border-border overflow-hidden group`}
            >
              <Link href={`/article/${article.slug}`} className="flex flex-col h-full">
                <div className="relative overflow-hidden h-[140px]">
                  <AppImage
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
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
                  <h3 className="text-sm font-bold text-foreground leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-3">
                    {article.title}
                  </h3>
                  <div className="mt-auto flex items-center gap-2 pt-2 border-t border-border">
                    <span className="text-[11px] font-semibold text-muted-foreground">
                      {article.author}
                    </span>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="text-[11px] text-muted-foreground">{article.readTime}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}

          {/* Cards 6–7: Wide bottom row, col-span-2 each */}
          {wideCards.map((article, i) => (
            <article
              key={article.id}
              className={`grid-reveal scroll-reveal animate-stagger-${i + 3} spotlight-card article-card bg-card rounded-sm border border-border overflow-hidden group md:col-span-2 lg:col-span-2`}
            >
              <Link href={`/article/${article.slug}`} className="flex flex-row h-full">
                <div className="relative overflow-hidden w-32 md:w-44 flex-shrink-0">
                  <AppImage
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(max-width: 768px) 128px, 176px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col flex-1 p-4 justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`category-pill ${article.categoryColor} inline-block`}>
                        {article.category}
                      </span>
                      {article.factCheckRating && (
                        <FactCheckMeter rating={article.factCheckRating} type="badge" />
                      )}
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-foreground leading-snug group-hover:text-accent transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2 hidden md:block">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
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
