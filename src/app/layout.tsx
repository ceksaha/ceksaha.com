import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '../styles/tailwind.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'ceksaha.com — Kata Siapa? Kami Verifikasi.',
  description:
    'ceksaha.com adalah platform verifikasi berita dan fakta. Kami mempertanyakan sumber, mengecek fakta, dan menyajikan berita yang sudah diverifikasi di bidang Politik, Bisnis, Teknologi, Gaya Hidup, dan Olahraga.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
  openGraph: {
    title: 'ceksaha.com — Kata Siapa? Kami Verifikasi.',
    description: 'Platform verifikasi berita terpercaya. Kami cek fakta, bukan sekadar berbagi.',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630 }],
  },
};

import { ThemeProvider } from '@/components/ThemeProvider';
import FloatingActions from '@/components/FloatingActions';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={plusJakartaSans.variable}>
      <body className={plusJakartaSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <FloatingActions />
        </ThemeProvider>
      </body>
    </html>
  );
}
