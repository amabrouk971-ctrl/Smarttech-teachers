import React from 'react';
import {
  Flame,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Video,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CreditCard,
} from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

interface TeacherDashboardViewProps {
  lang: 'ar' | 'en';
  user: FirebaseUser | null;
  onNavigate: (view: string) => void;
  membershipStatus: string;
}

export const TeacherDashboardView: React.FC<TeacherDashboardViewProps> = ({
  lang,
  user,
  onNavigate,
  membershipStatus,
}) => {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-red-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
                {isAr ? 'لوحة إنجاز المعلم المتميز' : 'Teacher Progress Dashboard'}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-bold uppercase">
                {membershipStatus === 'active' ? (isAr ? 'عضوية نشطة' : 'Active Member') : (isAr ? 'عضوية قياسية' : 'Standard')}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {isAr ? `مرحباً بك، ${user?.displayName || 'زميلنا المعلم'}` : `Welcome back, ${user?.displayName || 'Teacher'}`}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {isAr
                ? 'استمر في تطوير ممارستك الصفية عبر سيناريوهات المحاكاة واستوديو التوجيه الذكي.'
                : 'Continue advancing your classroom mastery through interactive practice and AI coaching.'}
            </p>
          </div>

          {/* Quick Streak & Stats Widget */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white">
                <Flame className="w-5 h-5 text-amber-300 animate-bounce" />
              </div>
              <div>
                <p className="text-xs text-slate-300">{isAr ? 'أيام الاستمرار' : 'Streak'}</p>
                <p className="text-lg font-black text-white">7 {isAr ? 'أيام' : 'Days'}</p>
              </div>
            </div>

            <div className="w-px h-8 bg-white/20" />

            <div>
              <p className="text-xs text-slate-300">{isAr ? 'سيناريوهات مكتملة' : 'Completed'}</p>
              <p className="text-lg font-black text-white">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Daily Challenge + Recommended + Live Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Daily Teaching Challenge Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-600" />
                <h2 className="text-base font-bold text-slate-900">
                  {isAr ? 'تحدي اليوم التربوي (Daily Teaching Challenge)' : 'Daily Teaching Challenge'}
                </h2>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                +50 {isAr ? 'نقطة تميز' : 'Mastery Pts'}
              </span>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {isAr
                ? 'كيف تتصرف عندما يرفض طالب متفوق المشاركة في نشاط جماعي مدعياً أنه يفضل العمل منفرداً لتجنب بطء زملائه؟'
                : 'How do you intervene when a gifted student refuses group work, claiming peers slow them down?'}
            </p>

            <button
              onClick={() => onNavigate('scenarios')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <span>{isAr ? 'خوض التحدي الآن' : 'Attempt Challenge'}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Recommended Next Activities */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-slate-900">
              {isAr ? 'الأنشطة الموصى بها لمسارك المهني' : 'Recommended Next Learning Activities'}
            </h2>

            <div className="space-y-3">
              <div
                onClick={() => onNavigate('roleplay')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-red-400 bg-slate-50/50 hover:bg-white transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold">
                      {isAr ? 'محاكاة صوتية' : 'Voice Roleplay'}
                    </span>
                    <span className="text-xs text-slate-500">10 mins</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {isAr ? 'التدرب مع طالب متردد يخشى القراءة الجهرية' : 'Coaching a Shy Student in Oral Reading'}
                  </h3>
                </div>
                <ArrowIcon className="w-4 h-4 text-slate-400" />
              </div>

              <div
                onClick={() => onNavigate('coaching')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-red-400 bg-slate-50/50 hover:bg-white transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-bold">
                      {isAr ? 'استوديو التوجيه' : 'Coaching Plan'}
                    </span>
                    <span className="text-xs text-slate-500">15 mins</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {isAr ? 'صياغة خطة دعم لطالب يواجه صعوبة في الفهم القرائي' : 'Build Support Plan for Reading Comprehension'}
                  </h3>
                </div>
                <ArrowIcon className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Col (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Membership Badge Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-red-600" />
                <span>{isAr ? 'حالة الاشتراك' : 'Subscription Status'}</span>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">
                {membershipStatus}
              </span>
            </div>

            <p className="text-xs text-slate-600">
              {isAr
                ? 'يتيح لك الاشتراك الوصول الكامل لجميع سيناريوهات المواد، المحاكاة الصوتية، وجلسات Google Meet المباشرة.'
                : 'Full access to all scenarios, voice simulations, and Google Meet live mentoring.'}
            </p>

            <button
              onClick={() => onNavigate('pricing')}
              className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              {isAr ? 'إدارة الاشتراك والترقية' : 'Manage Subscription'}
            </button>
          </div>

          {/* Upcoming Live Mentoring */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <Video className="w-4 h-4 text-red-600" />
                <span>{isAr ? 'جلساتك المباشرة القادمة' : 'Upcoming Live Meet'}</span>
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <p className="text-xs font-bold text-slate-900">
                {isAr ? 'جلسة إشراف مع د. أحمد مبروك' : 'Mentoring with Dr Ahmed Mabrouk'}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                <span>{isAr ? 'غداً ٧:٠٠ مساءً بتوقيت القاهرة' : 'Tomorrow 7:00 PM Cairo'}</span>
              </div>
              <button
                onClick={() => onNavigate('meet')}
                className="w-full mt-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                {isAr ? 'فتح رابط Google Meet' : 'Open Google Meet'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
