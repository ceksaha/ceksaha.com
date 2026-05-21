// src/app/api/categories/[id]/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Category } from '@/app/types/category';

const dataFile = path.join(process.cwd(), 'src', 'data', 'categories.json');

async function readCategories(): Promise<Category[]> {
  try {
    const data = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(data) as Category[];
  } catch {
    return [];
  }
}

async function writeCategories(categories: Category[]) {
  await fs.writeFile(dataFile, JSON.stringify(categories, null, 2), 'utf-8');
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const categories = await readCategories();
  const category = categories.find((c) => c.id === id);
  if (!category) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }
  return NextResponse.json(category);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const categories = await readCategories();
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }
  categories.splice(index, 1);
  await writeCategories(categories);
  return NextResponse.json({ success: true });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { name, slug, color, pillClass, gradient, icon } = await request.json();
    const categories = await readCategories();
    const category = categories.find((c) => c.id === id);
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    if (name !== undefined) category.name = name;
    if (slug !== undefined) {
      const sanitizedSlug = slug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      
      // Verify uniqueness of new slug
      if (sanitizedSlug !== category.slug && categories.some((c) => c.slug === sanitizedSlug)) {
        return NextResponse.json({ error: 'Category slug already exists' }, { status: 400 });
      }
      category.slug = sanitizedSlug;
    }
    if (color !== undefined) category.color = color;
    if (pillClass !== undefined) category.pillClass = pillClass;
    if (gradient !== undefined) category.gradient = gradient;
    if (icon !== undefined) category.icon = icon;
    
    category.updatedAt = new Date().toISOString();
    await writeCategories(categories);
    
    return NextResponse.json(category);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
