'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { featuredArticles } from '@/app/components/mockData';

const trendingTags = [
  { label: 'Artificial Intelligence', count: 48 },
  { label: 'Federal Reserve', count: 32 },
  { label: 'NBA Playoffs', count: 27 },
  { label: 'Climate Policy', count: 24 },
  { label: 'Tech Layoffs', count: 19 },
  { label: 'SpaceX', count: 16 },
  { label: 'G7 Summit', count: 14 },
  { label: 'Nutrition Science', count: 11 },
];
export default function CategorySidebar() {
  const [email, setEmail] = useState('');
  const [subDone, setSubDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const trending = featuredArticles.slice(0, 4);

  const handleSub = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubDone(true);
      } else {
        setErrorMsg(data.error || 'Terjadi kesalahan.');
      }
    } catch (err) {
      setErrorMsg('Koneksi gagal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 lg:sticky lg:top-24 bg-background/10 backdrop-blur-lg rounded-lg border border-border p-4">
      {/* Sidebar Ad */}
      <div className="ad-banner-zone flex items-center justify-center py-14 rounded-sm">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Advertisement
          </p>
          <p className="text-xs text-muted-foreground/60 mt-0.5">300×600 Sidebar Ad Unit</p>
        </div>
      </div>

      {/* Trending now */}
      <div className="bg-card border border-border rounded-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border bg-muted/40 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent breaking-dot"></span>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">
            Trending Now
          </h3>
        </div>
        <div className="divide-y divide-border">
          {trending.map((article, i) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="flex gap-3 p-4 hover:bg-muted/40 transition-colors group"
            >
              <span className="text-2xl font-black text-muted-foreground/20 w-6 flex-shrink-0 leading-none mt-1">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <span className={`category-pill ${article.categoryColor} mb-1 inline-block`}>
                  {article.category}
                </span>
                <h4 className="text-xs font-bold text-foreground leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                  {article.title}
                </h4>
                <p className="text-[11px] text-muted-foreground mt-1">{article.readTime}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular tags */}
      <div className="bg-card border border-border rounded-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border bg-muted/40 flex items-center gap-2">
          <span className="w-1 h-4 bg-primary rounded-full"></span>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">
            Popular Topics
          </h3>
        </div>
        <div className="p-4 flex flex-wrap gap-2">
          {trendingTags.map((tag) => (
            <Link
              key={tag.label}
              href={`/category?tag=${tag.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-muted border border-border rounded-sm text-xs font-semibold text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all"
            >
              {tag.label}
              <span className="text-[10px] text-muted-foreground font-normal">{tag.count}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter widget */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-sm p-5 shadow-lg">
        <h3 className="text-sm font-black text-white mb-1">Morning Briefing</h3>
        <p className="text-xs text-white/80 mb-4 leading-relaxed">
          Top stories delivered to your inbox daily at 7am EST.
        </p>
        {!subDone ? (
          <>
            <form onSubmit={handleSub} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-sm text-white placeholder:text-white/30 text-xs outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-white text-primary rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-colors disabled:opacity-60"
              >
                {loading ? 'Subscribing...' : 'Subscribe Free'}
              </button>
            </form>
            {errorMsg && (
              <p className="text-red-300 text-[11px] mt-2 font-semibold text-center">{errorMsg}</p>
            )}
          </>
        ) : (
          <p className="text-green-400 text-xs font-bold text-center py-2">
            ✓ You&#39;re subscribed!
          </p>
        )}
      </div>

      {/* Second sidebar ad */}
      <div className="ad-banner-zone flex items-center justify-center py-10 rounded-sm">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Advertisement
          </p>
          <p className="text-xs text-muted-foreground/60 mt-0.5">300×250 Sidebar Ad Unit</p>
        </div>
      </div>
    </div>
  );
}
