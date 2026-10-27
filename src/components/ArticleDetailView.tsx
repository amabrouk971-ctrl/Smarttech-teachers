/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Public Article Reader Component — 100% Light Mode
 * Renders full, comprehensive educational articles with Table of Contents,
 * Schema.org Article/FAQ JSON-LD, Author Bio (Dr. Ahmed Mabrouk),
 * credible citations, and internal cross-links.
 */

import React, { useEffect, useState } from 'react';
import { FullArticle } from '../data/articlesData';
import { generateArticleJsonLd } from '../services/seoEngine';
import {
  Calendar,
  Clock,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Share2,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  Tag,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';

interface ArticleDetailViewProps {
  article: FullArticle;
  onBack: () => void;
  lang: 'ar' | 'en';
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({ article, onBack, lang }) => {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Inject Schema.org JSON-LD dynamically into document head
  useEffect(() => {
    const jsonLdScript = document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.id = 'article-structured-data';
    jsonLdScript.text = generateArticleJsonLd(article);
    document.head.appendChild(jsonLdScript);

    // Update document title & meta tags
    const originalTitle = document.title;
    document.title = `${article.seoTitle} | SmartTech Teacher Academy`;

    return () => {
      document.title = originalTitle;
      const existing = document.getElementById('article-structured-data');
      if (existing) existing.remove();
    };
  }, [article]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(article.canonicalUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <article className={`min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8 ${isAr ? 'rtl' : 'ltr'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-red-600 transition"
          >
            <ArrowIcon className="w-4 h-4 text-red-600" />
            <span>{isAr ? 'العودة إلى مكتبة المقالات' : 'Back to Article Library'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition"
            >
              <Share2 className="w-3.5 h-3.5 text-red-600" />
              <span>{copiedLink ? (isAr ? 'تم نسخ الرابط!' : 'Link Copied!') : isAr ? 'مشاركة' : 'Share'}</span>
            </button>
          </div>
        </nav>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
              {article.category}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {article.wordCount} {isAr ? 'كلمة موثقة' : 'words'}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {article.readingTimeMin} {isAr ? 'دقيقة قراءة' : 'min read'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {article.h1}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {article.excerpt}
          </p>

          {/* Author Card */}
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs mt-6">
            <div className="flex items-center gap-3">
              <img
                src={article.featuredImage}
                alt={article.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-red-600"
              />
              <div>
                <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <span>{article.author.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="text-xs text-slate-500">{article.author.role}</div>
              </div>
            </div>

            <div className="text-end text-xs text-slate-500">
              <div className="flex items-center gap-1 justify-end font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>{article.publishedAt}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {isAr ? 'مُحدث بتاريخ:' : 'Updated:'} {article.updatedAt}
              </div>
            </div>
          </div>
        </header>

        {/* Featured Banner / Image */}
        <div className="rounded-3xl overflow-hidden border border-slate-200 mb-10 shadow-md bg-white">
          <img
            src={article.featuredImage}
            alt={article.imageAlt}
            className="w-full max-h-[460px] object-cover"
          />
          <div className="p-3 bg-slate-50 text-xs text-slate-600 italic text-center border-t border-slate-200">
            {article.imageAlt}
          </div>
        </div>

        {/* Quick Highlights / GEO Direct Answer Callout */}
        <div className="p-5 sm:p-6 bg-red-50/70 border border-red-200 rounded-3xl mb-10 space-y-2">
          <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span>{isAr ? 'خلاصة البحث التوجيهي (Direct Answer)' : 'Core Research Synthesis'}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {isAr
              ? `يقدم هذا الدليل العملي للمعلمين نموذجاً قابلاً للتطبيق المباشر في الفصول الدراسية للارتقاء بلغة التدريس وإدارة الحصة وفق معايير كامبريدج CELTA/DELTA، مع استبعاد الترجمة العشوائية وترسيخ الاستيعاب التواصلي.`
              : `This field guide provides educators with actionable routines for classroom English, staging instructions, and positive behavioral engagement aligned with international Cambridge CELTA standards.`}
          </p>
        </div>

        {/* Article Body Content (Markdown rendered) */}
        <div className="max-w-none text-slate-800 leading-relaxed space-y-6 text-sm sm:text-base">
          {article.bodyMarkdown.split('\n\n').map((block, idx) => {
            if (block.startsWith('# ')) {
              return null; // Already rendered in header
            }
            if (block.startsWith('## ')) {
              return (
                <h2 key={idx} className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-10 mb-4 border-b border-slate-200 pb-2">
                  {block.replace('## ', '')}
                </h2>
              );
            }
            if (block.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl font-bold text-red-600 mt-6 mb-3">
                  {block.replace('### ', '')}
                </h3>
              );
            }
            if (block.startsWith('---')) {
              return <hr key={idx} className="border-slate-200 my-8" />;
            }
            if (block.startsWith('* ') || block.startsWith('- ')) {
              const items = block.split('\n').map((line) => line.replace(/^[*|-]\s+/, ''));
              return (
                <ul key={idx} className="space-y-2 list-disc list-inside text-slate-700 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  {items.map((item, i) => (
                    <li key={i} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            if (block.startsWith('|')) {
              // Markdown Table rendering
              const rows = block.split('\n').filter((r) => !r.includes(':---') && !r.includes('---'));
              if (rows.length > 0) {
                const headerCells = rows[0].split('|').map((c) => c.trim()).filter(Boolean);
                const bodyRows = rows.slice(1).map((r) => r.split('|').map((c) => c.trim()).filter(Boolean));
                return (
                  <div key={idx} className="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-2xs bg-white">
                    <table className="w-full text-xs sm:text-sm text-start">
                      <thead className="bg-slate-100 text-slate-900 border-b border-slate-200">
                        <tr>
                          {headerCells.map((h, hIdx) => (
                            <th key={hIdx} className="p-3 font-bold text-start">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {bodyRows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-3 text-slate-700 align-top">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
            }
            if (block.startsWith('> ')) {
              return (
                <blockquote key={idx} className="p-4 bg-slate-100/80 border-r-4 sm:border-r-4 border-red-600 rounded-xl text-slate-800 text-xs sm:text-sm italic my-4">
                  {block.replace(/^>\s*/, '')}
                </blockquote>
              );
            }
            return (
              <p key={idx} className="text-slate-700 leading-relaxed font-normal">
                {block}
              </p>
            );
          })}
        </div>

        {/* Frequently Asked Questions (FAQ Section + Schema) */}
        {article.faqs && article.faqs.length > 0 && (
          <section className="mt-14 pt-8 border-t border-slate-200 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-red-600" />
              <span>{isAr ? 'الأسئلة الشائعة حول موضوع المقال' : 'Frequently Asked Questions'}</span>
            </h3>

            <div className="space-y-3">
              {article.faqs.map((faq, fIdx) => {
                const isOpen = openFaqIndex === fIdx;
                return (
                  <div
                    key={fIdx}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs transition"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                      className="w-full text-start flex items-center justify-between gap-4 font-bold text-sm text-slate-900"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-red-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Credible Sources & Citations */}
        {article.sources && article.sources.length > 0 && (
          <section className="mt-10 p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-red-600" />
              <span>{isAr ? 'المراجع العلمية والتوثيق الأكاديمي' : 'Authoritative References & Research Sources'}</span>
            </h4>
            <div className="space-y-2.5 text-xs text-slate-700">
              {article.sources.map((src, sIdx) => (
                <div key={sIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-3">
                  <div>
                    <span className="font-bold text-slate-900">{src.title}</span> ({src.year}) — {src.publisher}
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      <strong>{isAr ? 'الادعاء المدعوم: ' : 'Claim supported: '}</strong>
                      {src.claimSupported}
                    </div>
                  </div>
                  {src.url && (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-red-600 hover:text-red-700 inline-flex items-center gap-1 font-bold flex-shrink-0"
                    >
                      <span>{isAr ? 'المصدر' : 'Source'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tags */}
        <div className="mt-8 flex flex-wrap items-center gap-2 pt-6 border-t border-slate-200 text-xs">
          <Tag className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500">{isAr ? 'الكلمات المفتاحية:' : 'Tags:'}</span>
          {article.tags.map((t, tIdx) => (
            <span key={tIdx} className="px-2.5 py-1 rounded-lg bg-white text-slate-700 border border-slate-200 shadow-2xs">
              #{t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};
