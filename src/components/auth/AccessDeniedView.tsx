import React from 'react';
import { ShieldAlert, Lock, ArrowLeft, ArrowRight, UserCheck, HelpCircle } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

interface AccessDeniedViewProps {
  lang: 'ar' | 'en';
  user: FirebaseUser | null;
  onNavigateHome: () => void;
  onSwitchAccount: () => void;
}

export const AccessDeniedView: React.FC<AccessDeniedViewProps> = ({
  lang,
  user,
  onNavigateHome,
  onSwitchAccount,
}) => {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 bg-slate-50" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center">
        {/* Shield Alert Badge */}
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-5 border border-red-100 shadow-xs">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-800 mb-3">
          <Lock className="w-3.5 h-3.5" />
          <span>403 - {isAr ? 'منطقة محظورة' : 'Restricted Area'}</span>
        </div>

        <h2 className="text-2xl font-black text-slate-900 mb-2">
          {isAr ? 'صلاحية الوصول مقتصرة على الإدارة' : 'Academic Director Access Only'}
        </h2>

        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          {isAr
            ? 'لوحة إدارة الأكاديمية واستوديو السيو والذكاء الاصطناعي مخصصة حصرياً للمدير الأكاديمي (د. أحمد مبروك) والمشرفين المعتمدين.'
            : 'The Academy CMS and SEO Command Center are strictly restricted to the Academic Director (Dr. Ahmed Mabrouk) and verified system administrators.'}
        </p>

        {/* Current User Info */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-6 text-xs text-slate-700 text-right">
          <div className="flex items-center justify-between font-medium">
            <span>{isAr ? 'الحساب الحالي:' : 'Current Account:'}</span>
            <span className="font-mono text-slate-900 font-semibold">{user?.email || (isAr ? 'زائر غير مسجل' : 'Anonymous Guest')}</span>
          </div>
          <div className="flex items-center justify-between mt-1 text-slate-500">
            <span>{isAr ? 'الصلاحية المطلوبة:' : 'Required Role:'}</span>
            <span className="font-mono text-red-600 font-semibold">amabrouk971@gmail.com (super_admin)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onSwitchAccount}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer text-sm"
          >
            <UserCheck className="w-4 h-4" />
            <span>{isAr ? 'تسجيل الدخول بحساب الإدارة' : 'Sign in as Administrator'}</span>
          </button>

          <button
            onClick={onNavigateHome}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl transition-colors cursor-pointer text-sm"
          >
            <span>{isAr ? 'العودة للرئيسية والمنهج' : 'Return to Academy Home'}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Support hint */}
        <p className="text-[11px] text-slate-400 mt-6 flex items-center justify-center gap-1">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{isAr ? 'تحتاج مساعدة؟ تواصل مع الدعم الفني: support@smart-courses.org' : 'Need help? Contact support@smart-courses.org'}</span>
        </p>
      </div>
    </div>
  );
};
