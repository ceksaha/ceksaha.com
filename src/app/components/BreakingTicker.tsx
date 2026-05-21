'use client';

import React from 'react';

const headlines = [
  'TERVERIFIKASI ✓ Senat AS sahkan RUU Tata Kelola AI dengan suara 72-28',
  'CEK FAKTA: Klaim inflasi turun — data BPS konfirmasi tren penurunan',
  'TERVERIFIKASI ✓ NVIDIA umumkan arsitektur Blackwell Ultra, kecepatan inferensi 10x lebih cepat',
  'CEK FAKTA: Celtics raih gelar NBA ketiga berturut-turut — statistik resmi dikonfirmasi',
  'TERVERIFIKASI ✓ Terobosan superkonduktivitas suhu ruang dipublikasikan di jurnal Nature',
  'CEK FAKTA: Pemimpin G7 sepakati kerangka bersama lawan disinformasi AI',
  'TERVERIFIKASI ✓ Diet Mediterania terbukti kurangi risiko kardiovaskular 23%',
  'CEK FAKTA: Apple catat rekor pendapatan Q2 sebesar $124 miliar — laporan keuangan resmi',
];

export default function BreakingTicker() {
  return (
    <div className="sticky top-16 z-40 bg-primary text-primary-foreground py-2.5 overflow-hidden border-b border-white/10 shadow-md">
      <div className="flex items-center">
        {/* Label */}
        <div className="flex-shrink-0 flex items-center gap-2 bg-accent px-4 py-0.5 mr-4 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-white breaking-dot"></span>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-white whitespace-nowrap">
            Cek Fakta
          </span>
        </div>

        {/* Ticker */}
        <div className="overflow-hidden flex-1">
          <div className="ticker-track">
            {[...headlines, ...headlines]?.map((headline, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-4 px-6 text-xs font-semibold tracking-wide text-white/80 whitespace-nowrap"
              >
                <span className="w-1 h-1 rounded-full bg-accent/60 flex-shrink-0"></span>
                {headline}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
