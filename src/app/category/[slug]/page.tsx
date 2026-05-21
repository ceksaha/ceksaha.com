// src/app/category/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryHeader from '@/app/category/components/CategoryHeader';
import CategoryGrid from '@/app/category/components/CategoryGrid';
import CategorySidebar from '@/app/category/components/CategorySidebar';
import { promises as fs } from 'fs';
import path from 'path';

async function readCategories() {
  try {
    const dataFile = path.join(process.cwd(), 'src', 'data', 'categories.json');
    const data = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

// Generate static paths for pre-rendering
export async function generateStaticParams() {
  const categories = await readCategories();
  return categories.map((cat: any) => ({
    slug: cat.slug,
  }));
}

async function getCategoryArticles(categorySlug: string, categoryName: string) {
  try {
    const dataFile = path.join(process.cwd(), 'src', 'data', 'articles.json');
    const data = await fs.readFile(dataFile, 'utf-8');
    const list = JSON.parse(data);

    // Map list to dynamic Article schema
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

    // Filter by category slug or name
    const filtered = mapped.filter((a: any) => 
      a.category.toLowerCase() === categorySlug.toLowerCase() || 
      a.category.toLowerCase() === categoryName.toLowerCase()
    );

    // Sort by newest
    return filtered.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (e) {
    return [];
  }
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categories = await readCategories();
  
  const currentCategory = categories.find(
    (cat: any) => cat.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!currentCategory) {
    notFound();
  }

  // Get articles dynamically for this category
  const displayArticles = await getCategoryArticles(currentCategory.slug, currentCategory.name);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            <div className="lg:col-span-8">
              {displayArticles.length > 0 ? (
                <CategoryGrid articles={displayArticles} />
              ) : (
                <div className="py-20 text-center text-muted-foreground bg-card border border-border border-dashed rounded-sm">
                  Belum ada artikel untuk kategori ini.
                </div>
              )}
            </div>
            <aside className="lg:col-span-4">
              <CategorySidebar />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
