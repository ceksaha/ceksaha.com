'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { Article } from '@/app/components/mockData';

interface ArticleSidebarProps {
  related: Article[];
}

export default function ArticleSidebar({ related }: ArticleSidebarProps) {
  const [email, setEmail] = useState('');
  const [subDone, setSubDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
    <div className="space-y-6 lg:sticky lg:top-24">
      {/* Sidebar Ad */}
      <div className="ad-banner-zone flex items-center justify-center py-12 rounded-sm">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Advertisement
          </p>
          <p className="text-xs text-muted-foreground/60 mt-0.5">300×600 Sidebar Ad Unit</p>
        </div>
      </div>

      {/* Related articles */}
      <div className="bg-card border border-border rounded-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border bg-muted/40 flex items-center gap-2">
          <span className="w-1 h-4 bg-accent rounded-full"></span>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">
            Related Stories
          </h3>
        </div>
        <div className="divide-y divide-border">
          {related.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="flex gap-3 p-4 hover:bg-muted/40 transition-colors group"
            >
              <div className="relative w-16 h-16 rounded-sm overflow-hidden flex-shrink-0">
                <AppImage
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  sizes="64px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
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

      {/* Mini newsletter */}
      <div className="bg-primary rounded-sm p-5">
        <h3 className="text-sm font-black text-white mb-1">Daily Briefing</h3>
        <p className="text-xs text-white/60 mb-4 leading-relaxed">
          Top 5 stories in your inbox every morning.
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
                className="w-full py-2.5 bg-accent text-white rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors disabled:opacity-60"
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
            ✓ You&apos;re subscribed!
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
