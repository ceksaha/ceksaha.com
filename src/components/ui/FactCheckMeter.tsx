'use client';

import React from 'react';
import Icon from './AppIcon';

interface FactCheckMeterProps {
  rating?: 'benar' | 'sebagian_benar' | 'menyesatkan' | 'hoaks';
  summary?: string;
  type?: 'badge' | 'panel';
}

const config = {
  benar: {
    label: 'BENAR / FAKTA',
    colorClass:
      'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30',
    icon: 'ShieldCheckIcon',
    bgGradient: 'from-emerald-50 to-teal-50/30 dark:from-emerald-950/10 dark:to-teal-950/5',
    meterWidth: 'w-full bg-emerald-600',
    meterBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    accentColor: 'bg-emerald-600',
    description:
      'Klaim atau informasi yang disajikan didukung oleh fakta-fakta lapangan yang kuat dan bukti kredibel.',
  },
  sebagian_benar: {
    label: 'SEBAGIAN BENAR',
    colorClass:
      'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30',
    icon: 'InformationCircleIcon',
    bgGradient: 'from-amber-50 to-yellow-50/30 dark:from-amber-950/10 dark:to-yellow-950/5',
    meterWidth: 'w-2/3 bg-amber-500',
    meterBg: 'bg-amber-100 dark:bg-amber-900/30',
    accentColor: 'bg-amber-500',
    description:
      'Informasi ini mengandung kebenaran namun ada beberapa data atau konteks penting yang hilang atau belum lengkap.',
  },
  menyesatkan: {
    label: 'MENYESATKAN',
    colorClass:
      'text-orange-700 bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/30',
    icon: 'ExclamationTriangleIcon',
    bgGradient: 'from-orange-50 to-amber-50/30 dark:from-orange-950/10 dark:to-amber-950/5',
    meterWidth: 'w-1/3 bg-orange-500',
    meterBg: 'bg-orange-100 dark:bg-orange-900/30',
    accentColor: 'bg-orange-500',
    description:
      'Menggunakan fakta riil yang diputarbalikkan, dicabut dari konteks aslinya, atau dicampur dengan opini spekulatif untuk mengelabui pembaca.',
  },
  hoaks: {
    label: 'HOAKS / SALAH',
    colorClass:
      'text-red-700 bg-red-50 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30',
    icon: 'ShieldExclamationIcon',
    bgGradient: 'from-red-50 to-rose-50/30 dark:from-red-950/10 dark:to-rose-950/5',
    meterWidth: 'w-1/12 bg-red-600',
    meterBg: 'bg-red-100 dark:bg-red-900/30',
    accentColor: 'bg-red-600',
    description:
      'Klaim atau informasi ini sepenuhnya salah, dibuat-buat, atau tidak memiliki landasan bukti faktual sama sekali.',
  },
};

export default function FactCheckMeter({ rating, summary, type = 'panel' }: FactCheckMeterProps) {
  if (!rating) return null;

  const current = config[rating];

  if (type === 'badge') {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-sm border ${current.colorClass} shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105`}
      >
        <Icon name={current.icon} size={12} className="flex-shrink-0" />
        <span>{current.label}</span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-sm border ${current.colorClass} bg-gradient-to-br ${current.bgGradient} p-5 md:p-6 shadow-[0_4px_30px_rgba(0,0,0,0.02)] backdrop-blur-md mb-8`}
    >
      {/* Absolute Decorative Glow */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 rounded-full filter blur-[50px] opacity-20 -mr-10 -mt-10 ${current.accentColor}`}
      ></div>

      <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-5 relative z-10">
        {/* Large Status Badge / Icon */}
        <div
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 border-current shadow-md flex-shrink-0 animate-pulse`}
        >
          <Icon name={current.icon} size={28} className="md:size-8" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2.5 mb-1.5">
            <span className="text-[10px] font-black tracking-[0.25em] text-muted-foreground uppercase opacity-75">
              Kredibilitas Berita
            </span>
            <span className="text-muted-foreground/30">|</span>
            <span className="text-xs font-black uppercase tracking-widest">HASIL CEK FAKTA</span>
          </div>

          <h3 className="text-lg md:text-xl font-extrabold tracking-tight mb-2 uppercase">
            Status:{' '}
            <span className="underline decoration-2 underline-offset-4">{current.label}</span>
          </h3>

          <p className="text-xs md:text-sm text-foreground/80 leading-relaxed mb-4 font-[500]">
            {current.description}
          </p>

          {/* Fact Meter Scale Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
              <span>Sangat Meragukan</span>
              <span>Sangat Kredibel</span>
            </div>
            <div className={`h-2.5 rounded-full ${current.meterBg} p-0.5 overflow-hidden`}>
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${current.meterWidth}`}
              ></div>
            </div>
          </div>

          {/* Fact-Check Summary Box */}
          {summary && (
            <div className="mt-4 p-4 rounded-sm bg-white/60 border border-current/20 dark:bg-black/20">
              <p className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5">
                <Icon name="DocumentTextIcon" size={14} /> Ringkasan Verifikasi
              </p>
              <p className="text-xs md:text-sm text-foreground/95 leading-relaxed font-semibold italic">
                &ldquo;{summary}&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
