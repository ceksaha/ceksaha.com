// src/app/admin/articles/page.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import type { Article } from '@/app/types/article';
import type { Category } from '@/app/types/category';

export default function AdminArticles() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'articles' | 'categories'>('articles');

  // Articles & Categories Lists
  const [articles, setArticles] = useState<Article[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);

  // Article form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('Klarifikasi');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Category form states
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catColor, setCatColor] = useState('text-primary');
  const [catPillClass, setCatPillClass] = useState('category-politics');
  const [catGradient, setCatGradient] = useState('bg-gradient-to-r from-primary to-accent');
  const [catIcon, setCatIcon] = useState('📁');

  // Editing states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/articles');
      const data = await res.json();
      setArticles(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategoriesList(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const session = sessionStorage.getItem('admin_session');
    if (session === 'authorized') {
      setIsAuthenticated(true);
      fetchArticles();
      fetchCategories();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'ceksaha123';
    if (passwordInput === adminPassword) {
      sessionStorage.setItem('admin_session', 'authorized');
      setIsAuthenticated(true);
      setAuthError('');
      fetchArticles();
      fetchCategories();
    } else {
      setAuthError('Password salah. Silakan coba lagi.');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setImageUrl(data.url);
      setSuccess('Image uploaded successfully!');
    } catch (err: any) {
      setError(err.message || 'Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  // Article Save
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Determine categoryColor dynamically from category details
    const matchingCat = categoriesList.find((c) => c.name === category);
    const categoryColor = matchingCat
      ? `${matchingCat.pillClass} ${matchingCat.gradient}`
      : 'category-politics bg-gradient-to-r from-red-500 to-accent';

    try {
      if (editingId) {
        // Edit mode
        const res = await fetch(`/api/articles/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content, imageUrl, category, categoryColor }),
        });
        if (!res.ok) throw new Error('Failed to update article');
        const updated = await res.json();
        setArticles((prev) => prev.map((a) => (a.id === editingId ? updated : a)));
        setSuccess('Artikel berhasil diperbarui!');
        cancelEdit();
      } else {
        // Create mode
        const res = await fetch('/api/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content, imageUrl, category, categoryColor }),
        });
        if (!res.ok) throw new Error('Failed to create article');
        const newArticle = await res.json();
        setArticles((prev) => [...prev, newArticle]);
        setSuccess('Artikel berhasil diterbitkan!');
        resetForm();
      }
    } catch (e: any) {
      setError(e.message || 'Error saving article');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (article: Article) => {
    setEditingId(article.id);
    setTitle(article.title);
    setContent(article.content);
    setImageUrl(article.imageUrl || '');
    setCategory(article.category || 'Klarifikasi');
    setError('');
    setSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setImageUrl('');
    if (categoriesList.length > 0) {
      setCategory(categoriesList[0].name);
    } else {
      setCategory('Klarifikasi');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;
    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setArticles((prev) => prev.filter((a) => a.id !== id));
      setSuccess('Artikel berhasil dihapus!');
      if (editingId === id) {
        cancelEdit();
      }
    } catch (e) {
      console.error(e);
      alert('Gagal menghapus artikel');
    }
  };

  // Category Save
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (editingCatId) {
        // Edit mode
        const res = await fetch(`/api/categories/${editingCatId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: catName,
            slug: catSlug,
            color: catColor,
            pillClass: catPillClass,
            gradient: catGradient,
            icon: catIcon,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update category');
        setCategoriesList((prev) => prev.map((c) => (c.id === editingCatId ? data : c)));
        fetchCategories();
        setSuccess('Kategori berhasil diperbarui!');
        cancelEditCategory();
      } else {
        // Create mode
        const res = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: catName,
            slug: catSlug,
            color: catColor,
            pillClass: catPillClass,
            gradient: catGradient,
            icon: catIcon,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to create category');
        setCategoriesList((prev) => [...prev, data]);
        fetchCategories();
        setSuccess('Kategori baru berhasil ditambahkan!');
        resetCategoryForm();
      }
    } catch (err: any) {
      setError(err.message || 'Error saving category');
    } finally {
      setLoading(false);
    }
  };

  const startEditCategory = (cat: Category) => {
    setEditingCatId(cat.id);
    setCatName(cat.name);
    setCatSlug(cat.slug);
    setCatColor(cat.color || 'text-primary');
    setCatPillClass(cat.pillClass || 'category-politics');
    setCatGradient(cat.gradient || 'bg-gradient-to-r from-primary to-accent');
    setCatIcon(cat.icon || '📁');
    setError('');
    setSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditCategory = () => {
    setEditingCatId(null);
    resetCategoryForm();
  };

  const resetCategoryForm = () => {
    setCatName('');
    setCatSlug('');
    setCatColor('text-primary');
    setCatPillClass('category-politics');
    setCatGradient('bg-gradient-to-r from-primary to-accent');
    setCatIcon('📁');
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus kategori ini? Artikel di kategori ini akan ditata secara otomatis.')) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setCategoriesList((prev) => prev.filter((c) => c.id !== id));
      setSuccess('Kategori berhasil dihapus!');
      if (editingCatId === id) {
        cancelEditCategory();
      }
    } catch (e) {
      console.error(e);
      alert('Gagal menghapus kategori');
    }
  };

  // Live SEO Calculations
  const seoTitleLength = title.length;
  const isTitleLengthGood = seoTitleLength >= 35 && seoTitleLength <= 75;
  const hasGoldenKeyword = /(apakah benar|benarkah|hoax|cek fakta|fakta|klarifikasi|penipuan|palsu|bukti)/i.test(title);
  const isContentLongEnough = content.length >= 100;
  const hasImage = !!imageUrl;
  const hasSpecificCategory = category !== 'Klarifikasi';

  let seoScore = 0;
  if (seoTitleLength > 0) {
    if (isTitleLengthGood) seoScore += 25;
    else seoScore += 10;
  }
  if (hasGoldenKeyword) seoScore += 30;
  if (isContentLongEnough) seoScore += 20;
  if (hasImage) seoScore += 15;
  if (hasSpecificCategory) seoScore += 10;

  const getScoreColor = (score: number) => {
    if (score < 40) return 'text-red-500 bg-red-500/10 border-red-500/30';
    if (score < 60) return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
    return 'text-green-500 bg-green-500/10 border-green-500/30';
  };

  const getScoreBarColor = (score: number) => {
    if (score < 40) return 'bg-red-500';
    if (score < 60) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getGoldenKeywords = (cat: string) => {
    switch (cat) {
      case 'Politics & Government':
      case 'Politics': return ['Apakah Benar', 'Benarkah', 'Klarifikasi Isu', 'Hoax Politik'];
      case 'Business & Economy':
      case 'Business': return ['Penipuan Bansos', 'Dana Bantuan', 'Investasi Palsu', 'Cek Fakta Uang'];
      case 'Technology & Science':
      case 'Technology': return ['Situs Palsu', 'Akun Kloning', 'Data Bocor', 'AI Rekayasa'];
      case 'Lifestyle & Culture':
      case 'Lifestyle': return ['Hoax Kesehatan', 'Obat Palsu', 'Fakta Medis', 'Tips Hoax'];
      case 'Sports': return ['Klarifikasi Juara', 'Skandal Atlet', 'Fakta Laga'];
      default: return ['Cek Fakta', 'Hoaks atau Asli', 'Klarifikasi Berita', 'Informasi Palsu'];
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-card border border-border rounded-lg p-8 shadow-xl relative z-10 animate-fade-in">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/15 text-primary rounded-full text-[10px] font-black uppercase tracking-wider mb-4 border border-primary/20">
              <Icon name="LockClosedIcon" size={12} />
              Area Keamanan Terbatas
            </span>
            <h1 className="text-2xl font-black uppercase tracking-wider text-foreground">
              Admin Login
            </h1>
            <p className="text-xs text-muted-foreground mt-2">
              Masukkan kata sandi administrator ceksaha.com untuk melanjutkan.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Kata Sandi</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm focus:border-primary outline-none transition-colors"
              />
            </div>

            {authError && (
              <p className="text-red-500 text-xs font-semibold">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-sm hover:bg-primary/95 text-xs font-black uppercase tracking-widest transition-colors shadow-md hover:shadow-lg"
            >
              Masuk Sekarang
            </button>

            <Link
              href="/"
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-muted hover:bg-secondary text-foreground rounded-sm text-xs font-bold uppercase tracking-widest transition-colors border border-border mt-2"
            >
              <Icon name="ArrowLeftIcon" size={14} /> Kembali ke Beranda
            </Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto p-4 md:p-8 animate-fade-in">
      {/* Header Panel */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-foreground">
            Portal Admin CekSaha
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola verifikasi berita, kategori dinamis, dan unggahan konten multimedia secara real-time
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-secondary text-foreground text-xs font-bold uppercase tracking-widest rounded-sm border border-border transition-all"
        >
          <Icon name="ArrowLeftIcon" size={14} /> Lihat Situs
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        <button
          onClick={() => {
            setActiveTab('articles');
            setError('');
            setSuccess('');
          }}
          className={`flex items-center gap-2 px-6 py-3.5 font-black uppercase tracking-widest text-xs border-b-2 transition-all ${
            activeTab === 'articles'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="DocumentTextIcon" size={16} />
          Kelola Artikel
        </button>
        <button
          onClick={() => {
            setActiveTab('categories');
            setError('');
            setSuccess('');
          }}
          className={`flex items-center gap-2 px-6 py-3.5 font-black uppercase tracking-widest text-xs border-b-2 transition-all ${
            activeTab === 'categories'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="FolderIcon" size={16} />
          Kelola Kategori
        </button>
      </div>

      {/* TAB CONTENT: ARTICLES */}
      {activeTab === 'articles' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Form Column */}
          <div className="lg:col-span-4">
            <form onSubmit={handleSave} className="space-y-4 bg-card rounded-lg p-6 border border-border shadow-md">
              <h2 className="text-lg font-black uppercase tracking-wider text-foreground mb-4">
                {editingId ? 'Edit Artikel' : 'Tambah Artikel Baru'}
              </h2>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Judul Artikel</label>
                <input
                  type="text"
                  placeholder="Masukkan judul artikel..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-sm text-sm focus:border-primary outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-sm text-sm focus:border-primary outline-none transition-colors text-foreground"
                >
                  {categoriesList.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                  <option value="Klarifikasi">Klarifikasi / Cek Fakta (Default)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Isi Artikel</label>
                <textarea
                  placeholder="Tulis narasi, analisis fakta, atau verifikasi di sini..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-sm text-sm focus:border-primary outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  Unggah Gambar Pendukung
                </label>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="URL Gambar / Path Unggahan"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-sm text-xs focus:border-primary outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 bg-muted hover:bg-secondary text-foreground text-xs font-bold uppercase tracking-wider rounded-sm border border-border transition-all flex items-center gap-1.5 whitespace-nowrap"
                    disabled={uploading}
                  >
                    <Icon name="ArrowUpTrayIcon" size={14} />
                    {uploading ? 'Proses...' : 'Pilih File'}
                  </button>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                
                {imageUrl && (
                  <div className="relative mt-2 rounded-sm overflow-hidden border border-border h-32 bg-muted flex items-center justify-center">
                    <img src={imageUrl} alt="Preview" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImageUrl('')}
                      className="absolute top-2 right-2 bg-black/60 hover:bg-black text-white p-1 rounded-full transition-colors"
                    >
                      <Icon name="XMarkIcon" size={16} />
                    </button>
                  </div>
                )}
              </div>

              {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}
              {success && <p className="text-green-500 text-xs font-semibold">{success}</p>}

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading || uploading}
                  className="flex-1 py-2.5 bg-primary text-white rounded-sm hover:bg-primary/95 text-xs font-black uppercase tracking-widest transition-colors disabled:opacity-60"
                >
                  {loading ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Terbitkan Artikel'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-4 py-2.5 bg-muted hover:bg-secondary text-foreground rounded-sm text-xs font-black uppercase tracking-widest transition-colors border border-border"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* SEO Assistant Column */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg p-5 border border-border shadow-md space-y-4">
              <h2 className="text-xs font-black uppercase tracking-wider text-foreground flex items-center gap-1.5 border-b border-border pb-3">
                <Icon name="SparklesIcon" size={14} className="text-amber-500" />
                SEO & Golden Keywords
              </h2>

              <div className={`p-4 rounded-md border text-center ${getScoreColor(seoScore)}`}>
                <div className="text-2xl font-black">{seoScore}%</div>
                <div className="text-[10px] font-bold uppercase tracking-wider mt-1">SEO Health Score</div>
                <div className="w-full bg-muted/45 h-2 rounded-full mt-3 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${getScoreBarColor(seoScore)}`}
                    style={{ width: `${seoScore}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="font-bold text-muted-foreground uppercase tracking-widest text-[9px] mb-1">SEO Checklist</div>
                <div className="flex items-center gap-2">
                  <span className={isTitleLengthGood ? 'text-green-500' : 'text-muted-foreground/60'}>
                    <Icon name={isTitleLengthGood ? 'CheckCircleIcon' : 'MinusIcon'} size={14} />
                  </span>
                  <span className={isTitleLengthGood ? 'text-foreground font-semibold' : 'text-muted-foreground/60'}>
                    Judul ideal (35-75 kar)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={hasGoldenKeyword ? 'text-green-500' : 'text-muted-foreground/60'}>
                    <Icon name={hasGoldenKeyword ? 'CheckCircleIcon' : 'MinusIcon'} size={14} />
                  </span>
                  <span className={hasGoldenKeyword ? 'text-foreground font-semibold' : 'text-muted-foreground/60'}>
                    Ada Kata Kunci Emas
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={isContentLongEnough ? 'text-green-500' : 'text-muted-foreground/60'}>
                    <Icon name={isContentLongEnough ? 'CheckCircleIcon' : 'MinusIcon'} size={14} />
                  </span>
                  <span className={isContentLongEnough ? 'text-foreground font-semibold' : 'text-muted-foreground/60'}>
                    Narasi ideal (&gt;=100 kar)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={hasImage ? 'text-green-500' : 'text-muted-foreground/60'}>
                    <Icon name={hasImage ? 'CheckCircleIcon' : 'MinusIcon'} size={14} />
                  </span>
                  <span className={hasImage ? 'text-foreground font-semibold' : 'text-muted-foreground/60'}>
                    Ada gambar pendukung
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <div className="font-bold text-muted-foreground uppercase tracking-widest text-[9px] mb-2">Kata Kunci Emas Pilihan</div>
                <div className="flex flex-wrap gap-1.5">
                  {getGoldenKeywords(category).map((kw, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        if (!title.toLowerCase().includes(kw.toLowerCase())) {
                          setTitle(prev => prev ? `${kw}: ${prev}` : kw);
                        }
                      }}
                      className="text-[10px] font-bold px-2 py-1 bg-muted hover:bg-secondary hover:text-primary text-foreground rounded-sm border border-border transition-all text-left flex items-center gap-1"
                    >
                      <span className="text-primary font-bold">+</span> {kw}
                    </button>
                  ))}
                </div>
                <p className="text-[9px] text-muted-foreground mt-3 leading-relaxed">
                  *Klik kata kunci emas di atas untuk menempelkannya langsung ke awal judul artikel Anda secara otomatis!
                </p>
              </div>
            </div>
          </div>

          {/* List Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black uppercase tracking-wider text-foreground">
                Daftar Artikel ({articles.length})
              </h2>
              <button
                onClick={fetchArticles}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Refresh"
              >
                <Icon name="ArrowPathIcon" size={16} />
              </button>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="flex gap-4 p-4 bg-card border border-border rounded-sm hover:border-primary/45 transition-colors group"
                >
                  {article.imageUrl && (
                    <div className="relative w-20 h-20 rounded-sm overflow-hidden flex-shrink-0 border border-border bg-muted">
                      <img src={article.imageUrl} alt={article.title} className="object-cover w-full h-full" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-sm tracking-wider ${article.categoryColor || 'bg-primary text-white'}`}>
                        {article.category || 'Klarifikasi'}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                      {article.content}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground font-semibold">
                      <span>
                        {new Date(article.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <span>•</span>
                      <button
                        onClick={() => startEdit(article)}
                        className="text-primary hover:underline flex items-center gap-0.5"
                      >
                        <Icon name="PencilIcon" size={10} /> Edit
                      </button>
                      <span>•</span>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="text-red-500 hover:underline flex items-center gap-0.5"
                      >
                        <Icon name="TrashIcon" size={10} /> Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {articles.length === 0 && (
                <div className="text-center py-12 bg-card border border-border border-dashed rounded-sm">
                  <Icon name="DocumentPlusIcon" size={32} className="mx-auto text-muted-foreground/60 mb-2" />
                  <p className="text-xs text-muted-foreground">Belum ada artikel hasil verifikasi yang ditambahkan.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Category CRUD Form Column */}
          <div className="lg:col-span-4">
            <form onSubmit={handleSaveCategory} className="space-y-4 bg-card rounded-lg p-6 border border-border shadow-md">
              <h2 className="text-lg font-black uppercase tracking-wider text-foreground mb-4">
                {editingCatId ? 'Edit Kategori' : 'Tambah Kategori Baru'}
              </h2>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nama Kategori</label>
                <input
                  type="text"
                  placeholder="e.g., Edukasi, Finansial..."
                  value={catName}
                  onChange={(e) => {
                    setCatName(e.target.value);
                    if (!editingCatId) {
                      setCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    }
                  }}
                  required
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-sm text-sm focus:border-primary outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Slug (URL)</label>
                <input
                  type="text"
                  placeholder="e.g., edukasi, finansial"
                  value={catSlug}
                  onChange={(e) => setCatSlug(e.target.value.toLowerCase())}
                  required
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-sm text-sm focus:border-primary outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Emoji Icon</label>
                <input
                  type="text"
                  placeholder="e.g., 🎓, 💸, 🏛️"
                  value={catIcon}
                  onChange={(e) => setCatIcon(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-sm text-sm focus:border-primary outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Warna Teks Link (Tailwind)</label>
                <select
                  value={catColor}
                  onChange={(e) => setCatColor(e.target.value)}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-sm text-sm focus:border-primary outline-none transition-colors text-foreground"
                >
                  <option value="text-primary">Navy Blue (text-primary)</option>
                  <option value="text-accent">Orange Red (text-accent)</option>
                  <option value="text-green-700">Green (text-green-700)</option>
                  <option value="text-blue-700">Blue (text-blue-700)</option>
                  <option value="text-purple-700">Purple (text-purple-700)</option>
                  <option value="text-pink-600">Pink (text-pink-600)</option>
                  <option value="text-amber-600">Amber (text-amber-600)</option>
                  <option value="text-teal-600">Teal (text-teal-600)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">CSS Class Pill (Badge)</label>
                <select
                  value={catPillClass}
                  onChange={(e) => setCatPillClass(e.target.value)}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-sm text-sm focus:border-primary outline-none transition-colors text-foreground"
                >
                  <option value="category-politics">Navy Light (category-politics)</option>
                  <option value="category-business">Green Light (category-business)</option>
                  <option value="category-technology">Blue Light (category-technology)</option>
                  <option value="category-lifestyle">Purple Light (category-lifestyle)</option>
                  <option value="category-sports">Red Light (category-sports)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">CSS Gradient Pill (Badge)</label>
                <select
                  value={catGradient}
                  onChange={(e) => setCatGradient(e.target.value)}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-sm text-sm focus:border-primary outline-none transition-colors text-foreground"
                >
                  <option value="bg-gradient-to-r from-primary to-accent">Navy to Orange (Standard)</option>
                  <option value="bg-green-700 text-white">Solid Green (Business)</option>
                  <option value="bg-blue-700 text-white">Solid Blue (Technology)</option>
                  <option value="bg-purple-700 text-white">Solid Purple (Lifestyle)</option>
                  <option value="bg-accent text-white">Solid Orange (Sports)</option>
                  <option value="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">Teal to Emerald</option>
                  <option value="bg-gradient-to-r from-pink-500 to-rose-500 text-white">Pink to Rose</option>
                  <option value="bg-gradient-to-r from-purple-600 to-blue-600 text-white">Purple to Blue</option>
                </select>
              </div>

              {/* Dynamic Tag Preview Box - WOW Premium Aesthetic factor */}
              <div className="p-4 bg-muted/60 border border-border rounded-sm space-y-2">
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Aesthetic Live Preview</div>
                <div className="flex flex-col gap-2.5 justify-center py-2.5 items-center bg-background rounded-sm border border-border/80">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs">{catIcon}</span>
                    <span className={`text-xs font-bold ${catColor}`}>{catName || 'Kategori Baru'}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className={`category-pill ${catPillClass}`}>
                      {catName || 'Kategori Baru'}
                    </span>
                    <span className={`category-pill ${catPillClass} ${catGradient} text-white`}>
                      {catName || 'Kategori Baru'}
                    </span>
                  </div>
                </div>
              </div>

              {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}
              {success && <p className="text-green-500 text-xs font-semibold">{success}</p>}

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 bg-primary text-white rounded-sm hover:bg-primary/95 text-xs font-black uppercase tracking-widest transition-colors disabled:opacity-60"
                >
                  {loading ? 'Menyimpan...' : editingCatId ? 'Simpan Perubahan' : 'Tambah Kategori'}
                </button>
                {editingCatId && (
                  <button
                    type="button"
                    onClick={cancelEditCategory}
                    className="px-4 py-2.5 bg-muted hover:bg-secondary text-foreground rounded-sm text-xs font-black uppercase tracking-widest transition-colors border border-border"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List Dynamic Categories Column */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black uppercase tracking-wider text-foreground">
                Daftar Kategori Terdaftar ({categoriesList.length})
              </h2>
              <button
                onClick={fetchCategories}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Refresh Categories"
              >
                <Icon name="ArrowPathIcon" size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
              {categoriesList.map((cat) => (
                <div
                  key={cat.id}
                  className="p-4 bg-card border border-border rounded-sm hover:border-primary/45 transition-colors flex flex-col justify-between group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-1.5 bg-muted rounded-sm">{cat.icon}</span>
                      <div>
                        <h3 className="font-extrabold text-sm text-foreground flex items-center gap-1.5">
                          {cat.name}
                          <span className={`text-[10px] font-bold ${cat.color}`}>
                            ({cat.slug})
                          </span>
                        </h3>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          ID: {cat.id} • Dibuat: {new Date(cat.createdAt).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Aesthetic Layout Previews */}
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <span className={`category-pill ${cat.pillClass}`}>
                        Normal
                      </span>
                      <span className={`category-pill ${cat.pillClass} ${cat.gradient} text-white`}>
                        Gradient
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2.5 text-xs font-semibold">
                      <button
                        onClick={() => startEditCategory(cat)}
                        className="text-primary hover:underline flex items-center gap-0.5"
                      >
                        <Icon name="PencilIcon" size={10} /> Edit
                      </button>
                      <span className="text-muted-foreground/35">|</span>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="text-red-500 hover:underline flex items-center gap-0.5"
                      >
                        <Icon name="TrashIcon" size={10} /> Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {categoriesList.length === 0 && (
                <div className="col-span-2 text-center py-12 bg-card border border-border border-dashed rounded-sm">
                  <Icon name="FolderPlusIcon" size={32} className="mx-auto text-muted-foreground/60 mb-2" />
                  <p className="text-xs text-muted-foreground">Belum ada kategori dinamis yang didaftarkan.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
