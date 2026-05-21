'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { featuredArticles } from './mockData';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>('.hero-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const main = featuredArticles[0];
  const secondary = featuredArticles.slice(1, 3);

  return (
    <section ref={heroRef} className="relative bg-background pt-2 pb-0 overflow-hidden">
      {/* Ad Banner Zone */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-4 pb-2">
        <div className="ad-banner-zone flex items-center justify-center h-[90px] md:h-[100px] rounded-sm">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
              Advertisement
            </p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">728×90 Leaderboard Ad Unit</p>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main featured story — col-span-8 */}
          <div className="lg:col-span-8 hero-reveal scroll-reveal">
            <Link href={`/article/${main.slug}`} className="group block">
              <div className="relative rounded-sm overflow-hidden aspect-[16/9] lg:aspect-[16/10]">
                <AppImage
                  src={main.image}
                  alt={main.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"></div>

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`category-pill bg-accent text-white`}>{main.category}</span>
                    <span className="text-white/60 text-xs font-medium">{main.date}</span>
                  </div>
                  <h1 className="text-hero-md font-extrabold text-white leading-tight tracking-tight mb-3 group-hover:text-white/90 transition-colors">
                    {main.title}
                  </h1>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl hidden md:block">
                    {main.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-white/50 text-xs font-semibold">{main.author}</span>
                    <span className="text-white/30">·</span>
                    <span className="text-white/50 text-xs">{main.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Secondary stories — col-span-4 */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {secondary.map((article, i) => (
              <div
                key={article.id}
                className={`hero-reveal scroll-reveal animate-stagger-${i + 1} flex-1`}
              >
                <Link href={`/article/${article.slug}`} className="group flex flex-col h-full">
                  <div className="relative rounded-sm overflow-hidden aspect-[16/9]">
                    <AppImage
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className={`category-pill ${article.categoryColor} mb-2 inline-block`}>
                        {article.category}
                      </span>
                      <h2 className="text-sm md:text-base font-bold text-white leading-snug group-hover:text-white/90 transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 px-1">
                    <span className="text-muted-foreground text-xs font-semibold">
                      {article.author}
                    </span>
                    <span className="text-muted-foreground/40 text-xs">·</span>
                    <span className="text-muted-foreground text-xs">{article.date}</span>
                  </div>
                </Link>
              </div>
            ))}

            {/* Live indicator */}
            <div className="hero-reveal scroll-reveal animate-stagger-3 flex items-center gap-3 p-4 bg-muted rounded-sm border border-border">
              <span className="w-2 h-2 rounded-full bg-accent breaking-dot flex-shrink-0"></span>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-accent">
                  Liputan Langsung
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Pemungutan suara RUU AI Senat AS — fakta diperbarui
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
