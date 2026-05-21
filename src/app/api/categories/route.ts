// src/app/api/categories/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Category } from '@/app/types/category';

const dataFile = path.join(process.cwd(), 'src', 'data', 'categories.json');

async function readCategories(): Promise<Category[]> {
  try {
    const data = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(data) as Category[];
  } catch (e) {
    return [];
  }
}

async function writeCategories(categories: Category[]) {
  await fs.writeFile(dataFile, JSON.stringify(categories, null, 2), 'utf-8');
}

export async function GET() {
  const categories = await readCategories();
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  try {
    const { name, slug, color, pillClass, gradient, icon } = await req.json();
    const categories = await readCategories();

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Generate slug if not provided
    const sanitizedSlug = (slug || name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    // Check if slug is unique
    if (categories.some((cat) => cat.slug === sanitizedSlug)) {
      return NextResponse.json({ error: 'Category slug already exists' }, { status: 400 });
    }

    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      slug: sanitizedSlug,
      color: color || 'text-primary',
      pillClass: pillClass || 'category-politics',
      gradient: gradient || 'bg-gradient-to-r from-red-500 to-accent',
      icon: icon || '📁',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    categories.push(newCategory);
    await writeCategories(categories);

    return NextResponse.json(newCategory, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
