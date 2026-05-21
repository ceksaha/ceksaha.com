'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
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
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Terjadi kesalahan. Silakan coba lagi.');
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung ke server. Silakan periksa koneksi internet Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="newsletter" className="bg-primary py-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 blob-red opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 blob-navy opacity-20 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-3">
            <Icon name="EnvelopeIcon" size={14} className="text-accent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
              Daily Briefing
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
            Jangan Percaya Begitu Saja.
            <br />
            <span className="text-accent">Cek Dulu Bersama Kami.</span>
          </h2>

          <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
            Bergabung dengan 2,4 juta pembaca yang memulai hari dengan briefing pagi ceksaha.com — 5
            berita terverifikasi, cukup 3 menit untuk dibaca.
          </p>

          {!submitted ? (
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-sm text-white placeholder:text-white/30 text-sm font-medium outline-none focus:border-accent focus:bg-white/15 transition-all"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-accent text-white rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                      </svg>
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe Free'
                  )}
                </button>
              </form>
              {errorMsg && (
                <p className="text-red-400 text-xs mt-2 font-semibold text-center">{errorMsg}</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                <Icon name="CheckIcon" size={22} className="text-green-400" />
              </div>
              <p className="text-white font-bold text-lg">Kamu sudah terdaftar!</p>
              <p className="text-white/60 text-sm">Briefing pertama tiba besok pagi.</p>
            </div>
          )}

          <p className="text-white/30 text-xs mt-4">
            Tanpa spam. Bisa berhenti berlangganan kapan saja.
          </p>


        </div>
      </div>
    </section>
  );
}
