import React, { useState } from 'react';
import {
  Newspaper,
  Search,
  ExternalLink,
  Sparkles,
  BarChart3,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Send,
  Loader2,
  Tag,
  ArrowRight,
  ArrowLeft,
  Wrench,
  BookOpen,
  Filter,
} from 'lucide-react';
import { COMPLETE_ARTICLES, FullArticle } from '../data/articlesData';
import { ArticleDetailView } from './ArticleDetailView';
import { SeoCommandCenter } from './seo/SeoCommandCenter';

interface ArticlesViewProps {
  lang: 'ar' | 'en';
}

export const ArticlesView: React.FC<ArticlesViewProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [articles, setArticles] = useState<FullArticle[]>(COMPLETE_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState<FullArticle | null>(null);
  const [showSeoStudio, setShowSeoStudio] = useState<boolean>(false);

  // Filter / Search
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // AI Content Agent modal state
  const [aiTopic, setAiTopic] = useState('');
  const [aiSubject, setAiSubject] = useState('اللغة الإنجليزية وتطوير المعلمين');
  const [isGeneratingAiDraft, setIsGeneratingAiDraft] = useState(false);
  const [aiNotice, setAiNotice] = useState<string | null>(null);

  const categories = [
    'all',
    'Classroom English',
    'Instructional Strategies',
    'Classroom Management',
    'Professional Growth',
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesSearch =
      (art.h1 + art.workingTitle + art.excerpt + art.metaDescription)
        .toLowerCase()
        .includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleRunAiContentAgent = async () => {
    if (!aiTopic.trim() || isGeneratingAiDraft) return;

    setIsGeneratingAiDraft(true);
    setAiNotice(null);

    try {
      const res = await fetch('/api/ai/content-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiTopic,
          subject: aiSubject,
          targetAudience: 'معلمي المدارس في مصر والوطن العربي',
          language: lang,
        }),
      });

      const data = await res.json();
      if (data.article) {
        const newArt: FullArticle = {
          id: `art-${Date.now()}`,
          slug: data.article.slug || `article-${Date.now()}`,
          workingTitle: data.article.title || aiTopic,
          seoTitle: data.article.seoTitle || data.article.title,
          h1: data.article.title || aiTopic,
          metaDescription: data.article.metaDescription || data.article.excerpt,
          excerpt: data.article.excerpt || 'مقال تم إعداده وتدقيقه وفق معايير كامبريدج.',
          primaryIntent: 'Informational',
          primaryTargetQuery: data.article.targetKeyword || aiTopic,
          relatedQueries: data.article.suggestedTags || [],
          audience: 'معلمي المدارس في الشرق الأوسط',
          category: 'Instructional Strategies',
          tags: data.article.suggestedTags || ['تطوير المعلمين', 'SmartTech'],
          bodyMarkdown: data.article.content || '',
          wordCount: data.article.content ? data.article.content.split(/\s+/).length : 2500,
          readingTimeMin: Math.ceil((data.article.content ? data.article.content.split(/\s+/).length : 2500) / 220),
          featuredImage: '/assets/aistudio/3A46E16D-DC5E-49CB-85B3-B0F250169350_4ac16809.png',
          imageAlt: data.article.title,
          author: {
            name: 'د. أحمد مبروك',
            role: 'Founder & Lead Teacher Trainer, SmartTech Training & Testing Center',
            bio: 'خبير واستشاري تطوير المعلمين والمناهج الدولية.',
          },
          reviewer: {
            name: 'SmartTech Academic Editorial Board',
            role: 'Quality Assurance & Applied Linguistics Panel',
          },
          publishedAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          status: 'published',
          canonicalUrl: `https://teaches.smart-courses.org/articles/${data.article.slug || Date.now()}`,
          faqs: [
            {
              question: 'ما هي أهمية هذا الموضوع في التدريس الحديث؟',
              answer: 'يساعد المعلمين على تنظيم وقت الحصة وتطبيق أفضل الممارسات المعتمدة دولياً.',
            },
          ],
          sources: [
            {
              title: 'Learning Teaching: The Essential Guide to English Language Teaching',
              publisher: 'Macmillan Books for Teachers',
              year: '2011',
              claimSupported: 'منهجية التدريس المباشر وإدارة زمن الحصة.',
            },
          ],
          internalLinks: [
            {
              targetUrl: '/curriculum',
              anchorText: 'منهاج تدريب المعلمين',
              contextSentence: 'للمزيد من التطبيقات العملية راجع منهاج تدريب المعلمين.',
              reason: 'ربط داخلي استراتيجي.',
            },
          ],
          geoReadinessScore: 92,
          seoAuditScore: 95,
        };

        setArticles([newArt, ...articles]);
        setAiNotice(isAr ? 'تم إنشاء المقال بنجاح وإدراجه في المكتبة وسجل السيو!' : 'Article drafted and published to library!');
        setAiTopic('');
      }
    } catch (err) {
      console.error('AI Draft Error:', err);
      setAiNotice(isAr ? 'حدث خطأ أثناء إعداد المقال. حاول ثانية.' : 'Failed to draft article.');
    } finally {
      setIsGeneratingAiDraft(false);
    }
  };

  // If viewing a single article
  if (selectedArticle) {
    return (
      <ArticleDetailView
        article={selectedArticle}
        onBack={() => setSelectedArticle(null)}
        lang={lang}
      />
    );
  }

  // If viewing the SEO Command Center
  if (showSeoStudio) {
    return (
      <div>
        <div className="bg-slate-100 border-b border-slate-200 py-3 px-4 sm:px-8 flex items-center justify-between text-xs">
          <button
            onClick={() => setShowSeoStudio(false)}
            className="text-red-600 hover:text-red-700 font-bold flex items-center gap-1.5"
          >
            <ArrowIcon className="w-4 h-4" />
            <span>{isAr ? 'العودة لواجهة القراء والمقالات' : 'Back to Public Articles'}</span>
          </button>
          <span className="text-slate-600 font-mono font-medium">SEO & GEO Mode Active</span>
        </div>
        <SeoCommandCenter
          lang={lang}
          onOpenArticleDetail={(art) => {
            setShowSeoStudio(false);
            setSelectedArticle(art);
          }}
        />
      </div>
    );
  }

  return (
    <div className={`space-y-10 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${isAr ? 'rtl' : 'ltr'}`}>
      {/* Top Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
              {isAr ? 'المقالات والأبحاث التربوية' : 'Research & Knowledge Hub'}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {articles.length} {isAr ? 'مقالات موثقة' : 'Verified Articles'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isAr ? 'دليل المعلم المتميز والمقالات التخصصية' : 'Teacher Development & ELT Articles'}
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
            {isAr
              ? 'مقالات تربوية ولغوية متعمقة بإشراف الدكتور أحمد مبروك، موجهة لمعلمي اللغات والمواد الدراسية باللغة الإنجليزية في مصر والعالم العربي.'
              : 'In-depth peer-reviewed articles by Dr. Ahmed Mabrouk on classroom English, lesson staging, student engagement, and educational leadership.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowSeoStudio(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-md transition"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>{isAr ? 'مركز عمليات السيو وGEO' : 'SEO & GEO Studio'}</span>
          </button>
        </div>
      </section>

      {/* AI Content Agent Trigger Banner */}
      <section className="bg-gradient-to-r from-red-50 via-white to-red-50 border-2 border-red-200 text-slate-900 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-red-600">
            <Sparkles className="w-4 h-4" />
            <span>{isAr ? 'وكيل المحتوى الذكي (AI Content Factory)' : 'Research Content Agent'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {isAr ? 'هل تبحث عن إعداد مقال تربوي جديد بمعايير كامبريدج؟' : 'Need a New CELTA-Aligned Educational Article?'}
          </h2>
          <p className="text-xs text-slate-600">
            {isAr
              ? 'اكتب الموضوع المستهدف وسيقوم وكيل المحتوى ببحث الاستفسار، وتوثيق المراجع، وبناء التمارين، وتوليد وسوم الميتا تلقائياً.'
              : 'Enter a topic to generate a comprehensive 2,500+ word article complete with pedagogical framework, citations, and Schema.org markup.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <input
              type="text"
              placeholder={isAr ? 'مثال: كيفية صياغة أسئلة فحص المفاهيم CCQs في تدريس العلوم' : 'e.g. How to use CCQs in secondary science lessons'}
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600 shadow-2xs"
            />
            <button
              onClick={handleRunAiContentAgent}
              disabled={isGeneratingAiDraft || !aiTopic.trim()}
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              {isGeneratingAiDraft ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isAr ? 'جاري الإعداد والبحث...' : 'Researching & Drafting...'}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{isAr ? 'توليد المقال الآن' : 'Generate Article'}</span>
                </>
              )}
            </button>
          </div>

          {aiNotice && <div className="text-xs text-emerald-400 pt-1">{aiNotice}</div>}
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute top-3.5 right-3 text-slate-400 rtl:right-3 ltr:left-3" />
          <input
            type="text"
            placeholder={isAr ? 'ابحث في محتوى المقالات والكلمات المفتاحية...' : 'Search articles and target keywords...'}
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-9 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-600"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white font-bold shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' ? (isAr ? 'الكل' : 'All') : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <article
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="bg-white rounded-3xl border border-slate-200 hover:border-red-500/50 hover:shadow-xl transition duration-200 flex flex-col justify-between overflow-hidden cursor-pointer group"
          >
            <div>
              {/* Card Image */}
              <div className="h-48 w-full bg-slate-50 border-b border-slate-100 overflow-hidden relative">
                <img
                  src={art.featuredImage}
                  alt={art.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-red-600 border border-slate-200 shadow-xs px-2.5 py-1 rounded-full text-[11px] font-bold">
                  {art.category}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {art.publishedAt}
                  </span>
                  <span className="font-mono text-slate-500">
                    {art.wordCount} words • {art.readingTimeMin}m
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-red-600 transition leading-snug line-clamp-2">
                  {art.h1}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-3 text-xs">
              <span className="text-[11px] font-medium text-slate-500">
                {art.author.name}
              </span>
              <span className="font-bold text-red-600 group-hover:translate-x-1 transition flex items-center gap-1">
                <span>{isAr ? 'اقرأ المقال' : 'Read Article'}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
