import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { Article } from '@/app/components/mockData';

interface ArticleHeroProps {
  article: Article;
}

export default function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <div className="bg-background border-b border-border">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-8 pb-0">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-xs text-muted-foreground mb-6"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-foreground transition-colors font-medium">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/category/${article.category.toLowerCase()}`}
            className="hover:text-foreground transition-colors font-medium"
          >
            {article.category}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium line-clamp-1 max-w-[200px]">
            {article.title}
          </span>
        </nav>

        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <span className={`category-pill ${article.categoryColor}`}>{article.category}</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent breaking-dot"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                Breaking
              </span>
            </div>
          </div>

          <h1 className="text-hero-md font-extrabold text-foreground leading-tight tracking-tight mb-4">
            {article.title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 max-w-3xl">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pb-6 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {article.author
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{article.author}</p>
                <p className="text-xs text-muted-foreground">{article.authorRole}</p>
              </div>
            </div>
            <span className="text-muted-foreground/40 hidden md:block">|</span>
            <span className="text-sm text-muted-foreground">{article.date}</span>
            <span className="text-muted-foreground/40 hidden md:block">|</span>
            <span className="text-sm text-muted-foreground font-medium">{article.readTime}</span>

            {/* Share */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Share:
              </span>
              {['Twitter', 'LinkedIn', 'Copy Link'].map((platform) => (
                <button
                  key={platform}
                  className="px-3 py-1.5 text-xs font-semibold bg-muted hover:bg-secondary text-foreground rounded-sm transition-colors border border-border"
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-6">
        <div
          className="relative rounded-sm overflow-hidden"
          style={{ height: 'clamp(280px, 45vw, 520px)' }}
        >
          <AppImage
            src={article.image}
            alt={article.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 85vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-sm">
            <p className="text-white/60 text-xs">Photo: Unsplash</p>
          </div>
        </div>
      </div>
    </div>
  );
}
