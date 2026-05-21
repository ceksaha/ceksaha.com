import React from 'react';
import Link from 'next/link';
import { Article } from '@/app/components/mockData';

interface ArticleBodyProps {
  article: Article;
}

function InArticleAd() {
  return (
    <div className="ad-banner-zone flex items-center justify-center py-6 my-8 rounded-sm">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
          Advertisement
        </p>
        <p className="text-xs text-muted-foreground/60 mt-0.5">300×250 In-Article Ad Unit</p>
      </div>
    </div>
  );
}

export default function ArticleBody({ article }: ArticleBodyProps) {
  const paragraphs =
    article.body && article.body.length > 0
      ? article.body
      : [
          article.excerpt,
          `Klaim dan kabar terbaru ini sedang ramai diperbincangkan di media sosial dan konsumsi publik. Tim redaksi ceksaha.com sedang melakukan penelusuran lebih mendalam mengenai keabsahan bukti-bukti pendukung yang menyertai klaim ini. Hingga saat ini, informasi yang terkumpul menunjukkan adanya perbedaan sudut pandang antara fakta lapangan dengan narasi yang beredar luas di masyarakat.`,
          `Kami terus mengumpulkan keterangan dari pihak-pihak berwenang serta saksi ahli di bidang terkait untuk menyajikan laporan yang objektif dan terverifikasi sepenuhnya. Selalu pastikan untuk memeriksa kebenaran setiap informasi sebelum membagikannya kembali ke jejaring sosial Anda.`,
        ];

  return (
    <div>
      <article className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-p:leading-relaxed">
        {paragraphs.map((para, i) => (
          <React.Fragment key={i}>
            <p
              className="text-base md:text-lg text-foreground leading-relaxed mb-5 font-[400]"
              style={{ fontWeight: i === 0 ? 500 : 400 }}
            >
              {para}
            </p>
            {/* In-article ad after paragraph 3 */}
            {i === 2 && <InArticleAd />}
            {/* In-article ad after paragraph 5 */}
            {i === 5 && <InArticleAd />}
          </React.Fragment>
        ))}
      </article>

      {/* Tags */}
      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Filed Under
        </p>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Link
              key={tag}
              href={`/category?tag=${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-3 py-1.5 bg-muted border border-border rounded-sm text-xs font-semibold text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Author box */}
      <div className="mt-8 p-6 bg-muted rounded-sm border border-border">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-sm font-black flex-shrink-0">
            {article.author
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div className="flex-1">
            <p className="font-black text-foreground">{article.author}</p>
            <p className="text-xs text-accent font-bold uppercase tracking-widest mb-2">
              {article.authorRole}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {article.author.split(' ')[0]} covers political developments and policy for NewsHub,
              with over 12 years of experience reporting from Washington. Their work has been
              recognized by the National Press Foundation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
