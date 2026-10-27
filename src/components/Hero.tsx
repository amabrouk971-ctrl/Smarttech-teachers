import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Brain,
  Award,
  BookMarked,
  Layers,
} from 'lucide-react';

interface HeroProps {
  lang: 'ar' | 'en';
  onStartJourney: () => void;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onStartJourney, onExplore }) => {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 py-12 md:py-20 lg:py-24 border-b border-slate-200">
      {/* Subtle background atmospheric ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-slate-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Column (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-6 text-start">
            {/* Brand Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              <span>SMARTTECH TEACHER ACADEMY</span>
            </div>

            {/* Primary Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.18]">
              {isAr ? (
                <>
                  طوّر مهاراتك كمعلم،{' '}
                  <span className="text-red-600 underline decoration-red-300 decoration-wavy decoration-2">
                    واصنع فرقًا حقيقيًا
                  </span>{' '}
                  في تعليم طلابك.
                </>
              ) : (
                <>
                  Empowering Teachers.{' '}
                  <span className="text-red-600 underline decoration-red-300 decoration-wavy decoration-2">
                    Transforming Education.
                  </span>
                </>
              )}
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
              {isAr
                ? 'منصة ذكية لتطوير المعلمين في جميع المواد والمراحل التعليمية، تجمع بين المهارات التربوية والتطبيق العملي والذكاء الاصطناعي.'
                : 'An AI-powered professional development platform designed for teachers across all subjects, educational stages, and teaching environments.'}
            </p>

            {/* Founder Line */}
            <div className="flex items-center gap-3 pt-1 border-t border-slate-200/80">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              <p className="text-xs sm:text-sm font-semibold text-slate-700">
                Dr Ahmed Mabrouk | SmartTech Training & Testing Center
              </p>
            </div>

            {/* Key Benefits Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-medium text-slate-700">
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isAr ? '٧ أنماط تدريسية تأسيسية' : '7 Core Scenario Types'}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <Brain className="w-4 h-4 text-red-600 shrink-0" />
                <span>{isAr ? 'محاكاة صوتية وتوجيه ذكي' : 'Voice AI Roleplay'}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <Award className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{isAr ? 'جميع المواد والمراحل' : 'All Subjects & Stages'}</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onStartJourney}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-base rounded-xl shadow-lg hover:shadow-red-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{isAr ? 'ابدأ رحلتك التعليمية' : 'Start Your Journey'}</span>
                <ArrowIcon className="w-5 h-5" />
              </button>

              <button
                onClick={onExplore}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-base rounded-xl border border-slate-300 shadow-2xs hover:shadow transition-all cursor-pointer"
              >
                <BookMarked className="w-5 h-5 text-slate-500" />
                <span>{isAr ? 'اكتشف المنصة' : 'Explore Platform'}</span>
              </button>
            </div>
          </div>

          {/* Portrait & 3D Layered Composition (5 cols on desktop) */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* 3D Depth Backdrop Card */}
            <div className="relative group w-full max-w-[420px]">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-2 bg-gradient-to-r from-red-600/30 via-slate-900/10 to-red-600/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />

              {/* Main Portrait Frame with authentic photo preservation */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl bg-white transition-all duration-300 hover:shadow-red-500/10">
                <img
                  src="/assets/aistudio/3A46E16D-DC5E-49CB-85B3-B0F250169350_4ac16809.png"
                  alt="Dr Ahmed Mabrouk - Teacher Development Expert | SmartTech Training & Testing Center"
                  className="w-full h-auto object-cover transform transition-transform duration-700 ease-out hover:scale-[1.02]"
                  loading="eager"
                />

                {/* Subtle Cinematic Vignette Overlay to accentuate depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Badge 1: Top Right */}
              <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md border border-slate-200 px-3 py-2 rounded-xl shadow-lg flex items-center gap-2 transform -rotate-1 hover:rotate-0 transition-transform">
                <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-black text-xs">
                  AI
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-900">
                    {isAr ? 'محاكاة صفية بالذكاء الاصطناعي' : 'AI Classroom Simulation'}
                  </p>
                  <p className="text-[9px] text-slate-500">
                    {isAr ? 'تغذية راجعة تربوية فورية' : 'Instant Pedagogical Feedback'}
                  </p>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Left */}
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md border border-slate-200 px-3.5 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 transform rotate-1 hover:rotate-0 transition-transform">
                <Layers className="w-5 h-5 text-red-600" />
                <div className="text-start">
                  <p className="text-[11px] font-bold text-slate-900">
                    {isAr ? 'دليل المعلم المتميز' : 'Master Teacher Guide'}
                  </p>
                  <p className="text-[9px] text-slate-500">teaches.smart-courses.org</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
