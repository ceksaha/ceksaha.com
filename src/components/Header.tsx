'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { featuredArticles } from '@/app/components/mockData';

const STATIC_CATEGORIES = [
  { label: 'Politics', href: '/category/politics', color: 'text-primary' },
  { label: 'Business', href: '/category/business', color: 'text-green-600' },
  { label: 'Technology', href: '/category/technology', color: 'text-blue-600' },
  { label: 'Lifestyle', href: '/category/lifestyle', color: 'text-purple-600' },
  { label: 'Sports', href: '/category/sports', color: 'text-accent' },
];

export default function Header() {
  const [categoriesList, setCategoriesList] = useState(STATIC_CATEGORIES);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [previews, setPreviews] = useState<any[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((c: any) => ({
            label: c.name,
            href: `/category/${c.slug}`,
            color: c.color || 'text-primary',
          }));
          setCategoriesList(mapped);
        }
      })
      .catch((err) => console.error('Error loading dynamic categories in Header:', err));
  }, []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setPreviews([]);
      return;
    }
    const timer = setTimeout(() => {
      const filtered = featuredArticles
        .filter(
          (art) =>
            art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            art.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5);
      setPreviews(filtered);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const router = useRouter();
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to the search results page for the entered query
      const encoded = encodeURIComponent(searchQuery.trim());
      router.push(`/search/${encoded}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(15,32,68,0.08)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.3)] border-b border-border'
            : 'bg-background border-b border-border'
        }`}
      >
        {/* Main nav */}
        <nav className="max-w-[1400px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <AppLogo size={36} />
            <span className="font-extrabold text-xl tracking-tighter text-primary hidden sm:block">
              ceksaha<span className="text-accent">.com</span>
            </span>
          </Link>

          {/* Desktop category nav */}
          <div className="hidden lg:flex items-center gap-1">
            {categoriesList.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className={`nav-link-underline px-3 py-1.5 text-sm font-semibold tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200 ${cat.color} hover:opacity-80`}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Open search"
            >
              <Icon name="MagnifyingGlassIcon" size={20} />
            </button>

            {/* Dark Mode Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-muted transition-all text-muted-foreground hover:text-foreground"
                aria-label="Toggle dark mode"
              >
                {resolvedTheme === 'dark' ? (
                  <Icon name="SunIcon" size={20} />
                ) : (
                  <Icon name="MoonIcon" size={20} />
                )}
              </button>
            )}



            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-full hover:bg-muted transition-colors text-foreground"
              aria-label="Open menu"
            >
              <Icon name="Bars3Icon" size={22} />
            </button>
          </div>
        </nav>

        {/* Category strip - tablet */}
        <div className="hidden md:flex lg:hidden items-center gap-4 px-8 py-2 border-t border-border overflow-x-auto no-scrollbar">
          {categoriesList.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap ${cat.color} hover:opacity-70 transition-opacity`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[200] bg-primary/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSearchOpen(false);
          }}
        >
          <div className="w-full max-w-2xl bg-background rounded-lg shadow-2xl overflow-hidden dark:border dark:border-border">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-3 px-5 py-4 border-b border-border"
            >
              <Icon
                name="MagnifyingGlassIcon"
                size={20}
                className="text-muted-foreground flex-shrink-0"
              />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics, categories..."
                className="flex-1 text-base font-medium text-foreground placeholder:text-muted-foreground outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="XMarkIcon" size={20} />
              </button>
            </form>
            {previews.length > 0 && (
              <div className="px-5 py-4 border-b border-border bg-muted/40 max-h-72 overflow-y-auto no-scrollbar">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Instant Previews
                </p>
                <div className="flex flex-col gap-2">
                  {previews.map((art) => (
                    <Link
                      key={art.id}
                      href={`/article/${art.slug}`}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center justify-between p-2.5 bg-background border border-border rounded-sm hover:border-accent hover:shadow-sm transition-all group"
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <span className={`category-pill ${art.categoryColor} mb-1 inline-block`}>
                          {art.category}
                        </span>
                        <h4 className="text-xs font-bold text-foreground leading-snug group-hover:text-accent transition-colors line-clamp-1">
                          {art.title}
                        </h4>
                      </div>
                      <Icon
                        name="ChevronRightIcon"
                        size={16}
                        className="text-muted-foreground/60 group-hover:text-accent transition-colors flex-shrink-0"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="px-5 py-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Trending Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Federal Reserve',
                  'AI Regulation',
                  'NBA Playoffs',
                  'Climate Summit',
                  'Tech Layoffs',
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1.5 bg-muted rounded-sm text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] bg-primary/95 backdrop-blur-md flex flex-col lg:hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <AppLogo size={32} />
              <span className="font-extrabold text-lg tracking-tighter text-white">
                ceksaha<span className="text-accent">.com</span>
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close menu"
            >
              <Icon name="XMarkIcon" size={22} />
            </button>
          </div>

          <nav className="flex-1 px-6 py-8 overflow-y-auto">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-6">
              Categories
            </p>
            <div className="flex flex-col gap-1">
              {categoriesList.map((cat) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-3.5 border-b border-white/10 text-white hover:text-accent transition-colors group"
                >
                  <span className="text-lg font-bold">{cat.label}</span>
                  <Icon
                    name="ChevronRightIcon"
                    size={18}
                    className="text-white/30 group-hover:text-accent transition-colors"
                  />
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 space-y-3">
              <Link
                href="/laporkan"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 border border-red-500 text-red-500 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-red-500 hover:text-white transition-colors"
              >
                <Icon name="ExclamationTriangleIcon" size={18} />
                Laporkan Hoaks
              </Link>

              <Link
                href="/#newsletter"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-accent text-white rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-red-700 transition-colors"
              >
                <Icon name="EnvelopeIcon" size={18} />
                Subscribe to Newsletter
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
