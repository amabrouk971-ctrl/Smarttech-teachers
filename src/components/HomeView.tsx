import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Brain,
  Video,
  Award,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  HelpCircle,
  CreditCard,
  Newspaper,
} from 'lucide-react';
import { Hero } from './Hero';
import { InteractiveSample } from './InteractiveSample';
import { INITIAL_SUBJECTS, INITIAL_STAGES } from '../data/initialData';
import { COMPLETE_ARTICLES } from '../data/articlesData';
import { MEMBERSHIP_PLANS, formatEgp } from '../utils/pricing';

interface HomeViewProps {
  lang: 'ar' | 'en';
  onNavigate: (view: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ lang, onNavigate }) => {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Section A: Hero */}
      <Hero
        lang={lang}
        onStartJourney={() => onNavigate('scenarios')}
        onExplore={() => {
          const el = document.getElementById('benefits');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Section B: Platform Benefits */}
      <section id="benefits" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            {isAr ? 'لماذا أكاديمية سمارت تك؟' : 'Why SmartTech Teacher Academy?'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isAr
              ? 'تطوير مهني متكامل يجمع بين علم التربية والتطبيق الذكي'
              : 'Complete Professional Development Combining Pedagogy & Practical AI'}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            {isAr
              ? 'صممت المنصة بإشراف نخبة من خبراء تطوير المعلمين لتزويدك باستراتيجيات قابلة للتطبيق الفوري في حصتك الدراسية.'
              : 'Engineered under the leadership of teacher development experts for immediate classroom impact.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: BookOpen,
              titleAr: 'تطوير تخصصي حسب المادة',
              titleEn: 'Subject-Specific Pedagogy',
              descAr: 'سيناريوهات مخصصة لكل مادة؛ الرياضيات ليست كاللغة العربية، والفيزياء ليست كالتاريخ.',
              descEn: 'Tailored pedagogical scenarios; math differs from Arabic, and physics from history.',
            },
            {
              icon: Brain,
              titleAr: 'المحاكاة الصفية بالذكاء الاصطناعي',
              titleEn: 'Interactive AI Simulation',
              descAr: 'تدرّب مع شخصيات طلاب افتراضية متنوعة (الخجول، المشتت، المتفوق، المتعثر) لتنمية سرعة البديهة.',
              descEn: 'Engage with virtual student personas to sharpen real-time diagnostic intuition.',
            },
            {
              icon: Layers,
              titleAr: 'الأنماط التدريسية السبعة',
              titleEn: 'The 7 Foundational Scenario Types',
              descAr: 'تغطية شاملة لكل مراحل الحصة: التهيئة، الشرح، فحص الفهم، معالجة المفاهيم الخاطئة، والتقويم.',
              descEn: 'Comprehensive coverage from hook and explanation to misconception handling and assessment.',
            },
            {
              icon: TrendingUp,
              titleAr: 'التعليم المتمايز وإدارة الفصل',
              titleEn: 'Differentiated Instruction',
              descAr: 'استراتيجيات عملية لدعم الطلاب المتعثرين وإشعال فضول الطلاب المتقدمين في الفصل الواحد.',
              descEn: 'Actionable techniques to support struggling learners while challenging gifted students.',
            },
            {
              icon: Video,
              titleAr: 'جلسات إشراف عبر Google Meet',
              titleEn: 'Live Google Meet Mentoring',
              descAr: 'تواصل مباشر عبر الفيديو مع د. أحمد مبروك وفريق التدريب لمراجعة خططك التدريسية.',
              descEn: 'Real-time 1-on-1 video coaching sessions with Dr Ahmed Mabrouk and expert mentors.',
            },
            {
              icon: ShieldCheck,
              titleAr: 'اعتماد رسمي وتطوير مستمر',
              titleEn: 'Accreditation & Ongoing Growth',
              descAr: 'شهادات تطوير مهني موثقة من مركز SmartTech Training & Testing Center تسجل إنجازاتك.',
              descEn: 'Verified certificates documenting your professional development competencies.',
            },
          ].map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-red-300 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  {isAr ? benefit.titleAr : benefit.titleEn}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAr ? benefit.descAr : benefit.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section C: Choose Your Subject (Dynamic from Database) */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                {isAr ? 'الكتالوج الدراسي المتكامل' : 'Curriculum Catalog'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {isAr ? 'اختر مادتك الدراسية للبدء' : 'Choose Your Teaching Subject'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {isAr
                  ? 'يتم تحديث المواد والسيناريوهات ديناميكياً من قاعدة البيانات بواسطة إدارة المركز.'
                  : 'Subjects and scenarios are dynamically served from the database.'}
              </p>
            </div>

            <button
              onClick={() => onNavigate('scenarios')}
              className="inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
            >
              <span>{isAr ? 'استعراض جميع المواد' : 'View all subjects'}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {INITIAL_SUBJECTS.map((s) => (
              <div
                key={s.id}
                onClick={() => onNavigate('scenarios')}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-red-500 hover:shadow-md transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {s.category}
                  </span>
                  <span className="text-[10px] text-red-600 font-bold">
                    {s.scenarioCount} {isAr ? 'سيناريو' : 'scenarios'}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-red-600 transition-colors">
                  {isAr ? s.nameAr : s.nameEn}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section D: Educational Stages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            {isAr ? 'التدرج النمائي والعمري' : 'Developmental Stages'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isAr ? 'محتوى يتكيف مع كل مرحلة تعليمية' : 'Content Adapted to Every Grade Level'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_STAGES.map((stage) => (
            <div
              key={stage.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  {isAr ? stage.nameAr : stage.nameEn}
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr ? stage.descriptionAr : stage.descriptionEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section E: How It Works */}
      <section className="bg-slate-100/70 text-slate-900 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              {isAr ? 'خطوات رحلتك المهنية' : 'How It Works'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isAr ? '٦ خطوات بسيطة للانتقال إلى المعلم المتميز' : '6 Steps to Master Teacher Excellence'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: '١', titleAr: 'أنشئ حسابك المهني', titleEn: 'Create Account', descAr: 'سجل دخولك عبر Google بنقرة واحدة لتفعيل ملفك الشخصي.', descEn: 'Sign in seamlessly with Google to unlock your verified teacher profile.' },
              { num: '٢', titleAr: 'حدد المواد والمراحل', titleEn: 'Select Subjects', descAr: 'اختر مجالات تخصصك والمراحل التعليمية المستهدفة.', descEn: 'Choose your subject disciplines and target instructional stages.' },
              { num: '٣', titleAr: 'حدد أهدافك التطويرية', titleEn: 'Set Goals', descAr: 'اختر مهارات التدريس التي ترغب في صقلها خلال خطتك.', descEn: 'Identify specific pedagogical competencies to master during your roadmap.' },
              { num: '٤', titleAr: 'مارس السيناريوهات والمحاكاة', titleEn: 'Practice Scenarios', descAr: 'تفاعل مع سيناريوهات واقعية بصوتك أو كتابياً.', descEn: 'Interact with realistic classroom simulation scenarios via voice or text.' },
              { num: '٥', titleAr: 'راجع التقييم الفوري', titleEn: 'Review Feedback', descAr: 'احصل على تحليل فوري للوضوح وإيقاع التدريس.', descEn: 'Receive instant analytical feedback on pacing, clarity, and tone.' },
              { num: '٦', titleAr: 'وثّق تقدمك وشهاداتك', titleEn: 'Track Progress', descAr: 'شاهد تطور مؤشراتك المهنية واستلم شهاداتك المعتمدة.', descEn: 'Monitor your performance indicators and earn verifiable certificates.' },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-xs hover:border-red-300 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-base shadow-xs">
                  {step.num}
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  {isAr ? step.titleAr : step.titleEn}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAr ? step.descAr : step.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section F: Learning Experience Preview (Functional Sample) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            {isAr ? 'عينة تفاعلية حية' : 'Live Interactive Sample'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isAr ? 'جرّب بنفسك طريقة التعلم في المنصة' : 'Experience Our Scenario Engine'}
          </h2>
        </div>

        <InteractiveSample lang={lang} />
      </section>

      {/* Section G: Membership Plans Preview */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              {isAr ? 'الاستثمار في تطورك' : 'Transparent Pricing'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isAr ? 'خطط اشتراك مرنة في متناول الجميع' : 'Affordable Membership Plans'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Monthly */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <h3 className="font-bold text-slate-900 text-lg">
                {isAr ? MEMBERSHIP_PLANS.monthly.nameAr : MEMBERSHIP_PLANS.monthly.nameEn}
              </h3>
              <p className="text-3xl font-black text-slate-900">
                {formatEgp(MEMBERSHIP_PLANS.monthly.priceEgp, lang)} <span className="text-xs font-normal text-slate-500">/ شهرياً</span>
              </p>
              <button
                onClick={() => onNavigate('pricing')}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold cursor-pointer transition-colors"
              >
                {isAr ? 'عرض التفاصيل' : 'View Details'}
              </button>
            </div>

            {/* Annual with Promo */}
            <div className="bg-white p-6 rounded-2xl border-2 border-red-600 shadow-md space-y-4 relative">
              <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold">
                {isAr ? 'وفر 50% (وفر 250 ج.م)' : 'Save 50%'}
              </span>
              <h3 className="font-bold text-slate-900 text-lg">
                {isAr ? MEMBERSHIP_PLANS.annual.nameAr : MEMBERSHIP_PLANS.annual.nameEn}
              </h3>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black text-red-600">
                  {formatEgp(MEMBERSHIP_PLANS.annual.priceEgp, lang)} <span className="text-xs font-normal text-slate-500">/ سنوياً</span>
                </p>
                <span className="text-xs line-through text-slate-400">500 ج.م</span>
              </div>
              <button
                onClick={() => onNavigate('pricing')}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer"
              >
                {isAr ? 'عرض العرض الخاص' : 'Select Offer'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section H: About SmartTech & Dr Ahmed Mabrouk */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex justify-center">
            <img
              src="/assets/aistudio/Asset_2_4787d13f.png"
              alt="SmartTech Training Center"
              className="max-h-36 object-contain"
            />
          </div>
          <div className="lg:col-span-8 space-y-4 text-start">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              {isAr ? 'عن المؤسس والمركز' : 'About SmartTech Center'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              SmartTech Training & Testing Center | Dr Ahmed Mabrouk
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isAr
                ? 'مركز سمارت تك للتدريب والاختبارات، بقيادة د. أحمد مبروك، يكرس جهوده لتطوير الكوادر التعليمية في مصر والعالم العربي وفق أحدث المناهج الدولية. تجمع منصة SmartTech Teacher Academy بين الخبرة التربوية المتراكمة وأحدث تطبيقات الذكاء الاصطناعي لتأهيل معلمين ملهمين يقودون المستقبل.'
                : 'SmartTech Training & Testing Center, founded by Dr Ahmed Mabrouk, empowers educators across the Middle East with cutting-edge pedagogical training and AI-powered simulation tools.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section I: Recent Published Articles Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              {isAr ? 'المقالات والمعرفة' : 'Knowledge Center'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isAr ? 'أحدث المقالات التربوية المعتمدة' : 'Recent Pedagogical Articles'}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('articles')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
          >
            <span>{isAr ? 'استعراض جميع المقالات' : 'View all articles'}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMPLETE_ARTICLES.slice(0, 3).map((art) => (
            <div
              key={art.id}
              onClick={() => onNavigate('articles')}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-red-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="h-44 overflow-hidden bg-slate-100 border-b border-slate-100">
                <img src={art.featuredImage} alt={art.imageAlt} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold text-red-600 uppercase">{art.category}</span>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">{art.h1}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{art.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
