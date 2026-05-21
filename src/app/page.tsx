// src/app/page.tsx
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import BreakingTicker from '@/app/components/BreakingTicker';
import FeaturedGrid from '@/app/components/FeaturedGrid';
import CategoryStrips from '@/app/components/CategoryStrips';
import NewsletterSection from '@/app/components/NewsletterSection';
import { promises as fs } from 'fs';
import path from 'path';

async function getLocalArticles() {
  try {
    const dataFile = path.join(process.cwd(), 'src', 'data', 'articles.json');
    const data = await fs.readFile(dataFile, 'utf-8');
    const list = JSON.parse(data);
    
    // Map JSON articles to the dynamic Article schema
    const mapped = list.map((local: any) => ({
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
      slug: local.slug || `local-${local.id}`,
      createdAt: local.createdAt,
    }));

    // Sort newest articles first based on createdAt
    return mapped.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (e) {
    return [];
  }
}

async function readCategories() {
  try {
    const dataFile = path.join(process.cwd(), 'src', 'data', 'categories.json');
    const data = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export default async function HomePage() {
  const combinedArticles = await getLocalArticles();
  const categories = await readCategories();

  // Dynamically map dynamic categories to dynamic previews (matching slug/name)
  const dynamicPreviews = categories
    .map((cat: any) => {
      const catArticles = combinedArticles
        .filter(
          (a: any) =>
            a.category.toLowerCase() === cat.slug.toLowerCase() ||
            a.category.toLowerCase() === cat.name.toLowerCase()
        )
        .slice(0, 3);
        
      const mappedArticles = catArticles.map((art: any) => ({
        id: art.id,
        title: art.title,
        excerpt: art.excerpt,
        category: art.category,
        categoryColor: art.categoryColor,
        author: art.author,
        readTime: art.readTime,
        image: art.image || art.imageUrl || 'https://images.unsplash.com/photo-1505573064804-7c19cb8387f4',
        imageAlt: art.title,
        slug: art.slug,
      }));

      return {
        name: cat.name,
        slug: cat.slug,
        color: cat.color || 'text-primary',
        pillClass: cat.pillClass || 'category-politics',
        icon: cat.icon || '📁',
        articles: mappedArticles,
      };
    })
    .filter((preview: any) => preview.articles.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <BreakingTicker />
        <HeroSection />
        {combinedArticles.length > 0 ? (
          <FeaturedGrid articles={combinedArticles} />
        ) : (
          <div className="py-20 text-center text-muted-foreground bg-card border-b border-border">
            Belum ada artikel verifikasi fakta yang diterbitkan.
          </div>
        )}
        {dynamicPreviews.length > 0 && (
          <CategoryStrips categories={dynamicPreviews} />
        )}
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
