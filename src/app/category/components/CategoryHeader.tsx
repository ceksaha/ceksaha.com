'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const STATIC_CATEGORIES = [
  {
    label: 'All',
    slug: 'all',
    href: '/category',
    color: 'text-foreground',
    activeClass: 'bg-primary text-white',
  },
  {
    label: 'Politics',
    slug: 'politics',
    href: '/category/politics',
    color: 'text-primary',
    activeClass: 'bg-primary text-white',
  },
  {
    label: 'Business',
    slug: 'business',
    href: '/category/business',
    color: 'text-green-700',
    activeClass: 'bg-green-700 text-white',
  },
  {
    label: 'Technology',
    slug: 'technology',
    href: '/category/technology',
    color: 'text-blue-700',
    activeClass: 'bg-blue-700 text-white',
  },
  {
    label: 'Lifestyle',
    slug: 'lifestyle',
    href: '/category/lifestyle',
    color: 'text-purple-700',
    activeClass: 'bg-purple-700 text-white',
  },
  {
    label: 'Sports',
    slug: 'sports',
    href: '/category/sports',
    color: 'text-accent',
    activeClass: 'bg-accent text-white',
  },
];


interface CategoryHeaderProps {
  selectedSlug?: string;
}

export default function CategoryHeader({ selectedSlug = 'all' }: CategoryHeaderProps) {
  const [categoriesList, setCategoriesList] = useState(STATIC_CATEGORIES);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((c: any) => ({
            label: c.name.split(' ')[0], // Keep it short and elegant
            slug: c.slug,
            href: `/category/${c.slug}`,
            color: c.color || 'text-primary',
            activeClass: `${c.gradient || 'bg-primary'} text-white`,
          }));
          setCategoriesList([
            {
              label: 'All',
              slug: 'all',
              href: '/category',
              color: 'text-foreground',
              activeClass: 'bg-primary text-white',
            },
            ...mapped,
          ]);
        }
      })
      .catch((err) => console.error('Error fetching categories in CategoryHeader:', err));
  }, []);

  return (
    <div className="bg-background/80 backdrop-blur-lg border border-border rounded-lg shadow-md border-b">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-8 pb-0">
        {/* Page title */}
        <div className="mb-6">
          <nav
            className="flex items-center gap-2 text-xs text-muted-foreground mb-3"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-foreground transition-colors font-medium">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Categories</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            Jelajahi Kategori
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Temukan berita terverifikasi di kategori liputan utama kami
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-0 no-scrollbar">
          {categoriesList?.map((cat) => (
            <Link
              key={cat?.slug}
              href={cat?.href}
              className={`flex-shrink-0 px-4 py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-200 border ${
                selectedSlug === cat?.slug
                  ? `${cat?.activeClass} border-transparent bg-gradient-to-r from-primary to-accent text-white animate-pulse dark:from-primary/80 dark:to-accent/80`
                  : `border-border ${cat?.color} hover:bg-muted hover:scale-105 dark:hover:bg-white/10`
              }`}
            >
              {cat?.label}
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
