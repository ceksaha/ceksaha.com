// src/app/api/articles/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Article } from '@/app/types/article';

const dataFile = path.join(process.cwd(), 'src', 'data', 'articles.json');

async function readArticles(): Promise<Article[]> {
  try {
    const data = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(data) as Article[];
  } catch (e) {
    return [];
  }
}

async function writeArticles(articles: Article[]) {
  await fs.writeFile(dataFile, JSON.stringify(articles, null, 2), 'utf-8');
}

export async function GET() {
  const articles = await readArticles();
  return NextResponse.json(articles);
}

export async function POST(req: Request) {
  const { title, content, imageUrl, category, categoryColor } = await req.json();
  const articles = await readArticles();
  
  let formattedContent = content || '';
  if (!formattedContent.trim().toLowerCase().startsWith('ceksaha.com -')) {
    formattedContent = 'Ceksaha.com - ' + formattedContent;
  }

  const newArticle: Article = {
    id: Date.now().toString(),
    title,
    content: formattedContent,
    imageUrl: imageUrl || '',
    category: category || 'Klarifikasi',
    categoryColor: categoryColor || 'category-politics bg-gradient-to-r from-red-500 to-accent',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  articles.push(newArticle);
  await writeArticles(articles);
  return NextResponse.json(newArticle, { status: 201 });
}
