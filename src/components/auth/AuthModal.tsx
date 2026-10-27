import React, { useState } from 'react';
import { X, CheckCircle, Shield, Sparkles, BookOpen, Mic, Award, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoogleSignIn: () => Promise<void>;
  lang: 'ar' | 'en';
  title?: string;
  subtitle?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onGoogleSignIn,
  lang,
  title,
  subtitle,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const isAr = lang === 'ar';

  if (!isOpen) return null;

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await onGoogleSignIn();
      onClose();
    } catch (err) {
      console.error('Sign-in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-900 transition-all duration-200 animate-in fade-in zoom-in-95"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with authentic logo and Dr. Mabrouk badge */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/assets/aistudio/Asset_2_4787d13f.png"
              alt="SmartTech Training & Testing Center"
              className="h-10 w-auto object-contain"
            />
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="relative">
              <img
                src="/assets/aistudio/3A46E16D-DC5E-49CB-85B3-B0F250169350_4ac16809.png"
                alt="Dr. Ahmed Mabrouk"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-red-500 shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 bg-red-600 text-white p-0.5 rounded-full" title="Academic Director">
                <Shield className="w-2.5 h-2.5" />
              </span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-50 text-red-700 border border-red-100 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            {isAr ? 'بوابة المعلمين المعتمدة' : 'Accredited Teacher Portal'}
          </span>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            {title || (isAr ? 'تسجيل دخول المعلمين' : 'Educator Sign-In')}
          </h3>
          <p className="text-sm text-slate-600 mt-1 max-w-sm">
            {subtitle || (isAr
              ? 'سجّل دخولك لحفظ تقدمك، تفعيل المنهج التفاعلي، وممارسة المحاكاة الصوتية'
              : 'Sign in to save your learning progress, access ELT curriculum, and practice voice dialogues')}
          </p>
        </div>

        {/* Benefits list */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6 space-y-2.5">
          <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-900">{isAr ? 'معاينة مجانية كاملة: ' : 'Free Preview: '}</strong>
              {isAr
                ? 'وصول مجاني للوحدة الأولى من منهج اللغة الإنجليزية للمعلمين (5 دروس متكاملة مع الصوت).'
                : 'Free access to Module 1 of Classroom English (5 complete lessons with browser voice playback).'}
            </span>
          </div>

          <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-900">{isAr ? 'تتبع التقدم السحابي: ' : 'Cloud Progress Tracking: '}</strong>
              {isAr
                ? 'حفظ إجابات التمارين ونقاط التقييم الذاتي ومستوى الإتقان في قاعدة البيانات الآمنة.'
                : 'Saves your exercise scores, self-evaluations, and CEFR mastery in secure Firestore.'}
            </span>
          </div>

          <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-900">{isAr ? 'إشراف أكاديمي معتمد: ' : 'Academic Mentorship: '}</strong>
              {isAr
                ? 'محتوى معتمد ومراجع أكاديمياً تحت إشراف د. أحمد مبروك، خبير تطوير المعلمين.'
                : 'Pedagogy and curriculum supervised directly by Dr. Ahmed Mabrouk.'}
            </span>
          </div>
        </div>

        {/* Google Single Sign-On Button */}
        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 cursor-pointer text-sm sm:text-base"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>
            {isLoading
              ? (isAr ? 'جاري الاتصال بحساب جوجل...' : 'Connecting with Google...')
              : (isAr ? 'المتابعة باستخدام حساب جوجل' : 'Continue with Google Account')}
          </span>
        </button>

        {/* Security and privacy reassurance */}
        <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-slate-400" />
          <span>
            {isAr
              ? 'تسجيل آمن ومشفر عبر Google Cloud Identity و Firebase Auth'
              : 'Secure zero-trust login powered by Google Cloud & Firebase Auth'}
          </span>
        </p>
      </div>
    </div>
  );
};
