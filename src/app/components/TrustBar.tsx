import React from 'react';

const stats = [
  { value: '2.4M', label: 'Pembaca Bulanan' },
  { value: '180+', label: 'Berita Diverifikasi' },
  { value: '5', label: 'Kategori Utama' },
  { value: '48', label: 'Jurnalis Terlatih' },
  { value: '24/7', label: 'Pemantauan Fakta' },
];

export default function TrustBar() {
  return (
    <div className="bg-primary border-y border-navy-light/30">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-3 md:grid-cols-5 divide-x divide-white/10">
          {stats?.map((stat) => (
            <div
              key={stat?.label}
              className="flex flex-col items-center justify-center py-4 px-3 text-center"
            >
              <span className="text-xl md:text-2xl font-black text-white tracking-tight">
                {stat?.value}
              </span>
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mt-0.5 leading-tight">
                {stat?.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
