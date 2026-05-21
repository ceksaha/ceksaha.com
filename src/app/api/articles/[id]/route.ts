// src/app/api/articles/[id]/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Article } from '@/app/types/article';

const dataFile = path.join(process.cwd(), 'src', 'data', 'articles.json');

async function readArticles(): Promise<Article[]> {
  try {
    const data = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(data) as Article[];
  } catch {
    return [];
  }
}

async function writeArticles(articles: Article[]) {
  await fs.writeFile(dataFile, JSON.stringify(articles, null, 2), 'utf-8');
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const articles = await readArticles();
  const article = articles.find((a) => a.id === id);
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(article);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const articles = await readArticles();
  const index = articles.findIndex((a) => a.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  articles.splice(index, 1);
  await writeArticles(articles);
  return NextResponse.json({ success: true });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { title, content, imageUrl, category, categoryColor } = await request.json();
  const articles = await readArticles();
  const article = articles.find((a) => a.id === id);
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (title !== undefined) article.title = title;
  
  if (content !== undefined) {
    let formattedContent = content || '';
    if (!formattedContent.trim().toLowerCase().startsWith('ceksaha.com -')) {
      formattedContent = 'Ceksaha.com - ' + formattedContent;
    }
    article.content = formattedContent;
  }
  
  if (imageUrl !== undefined) article.imageUrl = imageUrl;
  if (category !== undefined) article.category = category;
  if (categoryColor !== undefined) article.categoryColor = categoryColor;
  article.updatedAt = new Date().toISOString();
  await writeArticles(articles);
  return NextResponse.json(article);
}
