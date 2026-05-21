import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const footerLinks = [
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Advertise', href: '#' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Sitemap', href: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-10">


        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + copyright */}
          <div className="flex items-center gap-3">
            <AppLogo size={28} />
            <span className="font-extrabold text-base tracking-tighter text-primary hidden sm:block">
              ceksaha<span className="text-accent">.com</span>
            </span>
            <span className="text-muted-foreground text-sm hidden md:block">
              © {new Date()?.getFullYear()} ceksaha.com. All rights reserved.
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerLinks?.map((link) => (
              <Link
                key={link?.label}
                href={link?.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link?.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[{ icon: 'GlobeAltIcon', label: 'Website' }]?.map(({ icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            ))}
            <a
              href="#"
              aria-label="RSS Feed"
              className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
              </svg>
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4 md:hidden">
          © {new Date()?.getFullYear()} ceksaha.com. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
