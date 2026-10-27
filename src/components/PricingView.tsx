import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Send,
  Loader2,
  AlertCircle,
  HelpCircle,
  Clock,
} from 'lucide-react';
import { MEMBERSHIP_PLANS, formatEgp } from '../utils/pricing';

interface PricingViewProps {
  lang: 'ar' | 'en';
  isAuthenticated: boolean;
  onLogin: () => void;
  userEmail?: string | null;
}

export const PricingView: React.FC<PricingViewProps> = ({
  lang,
  isAuthenticated,
  onLogin,
  userEmail,
}) => {
  const isAr = lang === 'ar';
  const monthly = MEMBERSHIP_PLANS.monthly;
  const annual = MEMBERSHIP_PLANS.annual;

  const [selectedPlanId, setSelectedPlanId] = useState<'monthly' | 'annual'>('annual');
  const [paymentMethod, setPaymentMethod] = useState('InstaPay');
  const [referenceCode, setReferenceCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceCode.trim()) return;

    if (!isAuthenticated) {
      onLogin();
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedStatus('pending');
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider">
          <CreditCard className="w-3.5 h-3.5" />
          <span>{isAr ? 'خطط العضوية والاشتراك الرسمي' : 'Official Membership Plans'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {isAr
            ? 'استثمر في تطورك المهني كمعلم متميز'
            : 'Invest in Your Professional Growth as a Master Educator'}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {isAr
            ? 'خطط مرنة في متناول جميع المعلمين لتمكينك من أدوات الذكاء الاصطناعي، والمحاكاة الصفية، وشهادات التطوير المهني المعتمدة من SmartTech.'
            : 'Flexible, teacher-friendly plans unlocking full AI simulations, classroom roleplays, and accredited certificates.'}
        </p>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
        {/* Monthly Plan */}
        <div
          className={`bg-white rounded-3xl border-2 p-8 flex flex-col justify-between transition-all cursor-pointer ${
            selectedPlanId === 'monthly'
              ? 'border-slate-900 shadow-xl ring-2 ring-slate-900'
              : 'border-slate-200 shadow-xs hover:border-slate-300'
          }`}
          onClick={() => setSelectedPlanId('monthly')}
        >
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {isAr ? 'المرونة الشهرية' : 'Monthly Flexibility'}
              </span>
              <h2 className="text-xl font-black text-slate-900">
                {isAr ? monthly.nameAr : monthly.nameEn}
              </h2>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-950">
                {formatEgp(monthly.priceEgp, lang)}
              </span>
              <span className="text-sm font-semibold text-slate-500">
                {isAr ? '/ شهرياً' : '/ month'}
              </span>
            </div>

            <ul className="space-y-3 border-t border-slate-100 pt-6 text-xs sm:text-sm text-slate-700">
              {(isAr ? monthly.featuresAr : monthly.featuresEn).map((f, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setSelectedPlanId('monthly')}
            className={`w-full mt-8 py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedPlanId === 'monthly'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isAr ? 'اختيار الخطة الشهرية' : 'Select Monthly Plan'}
          </button>
        </div>

        {/* Annual Plan (Promotional Featured Card) */}
        <div
          className={`bg-white rounded-3xl border-2 p-8 flex flex-col justify-between relative transition-all cursor-pointer ${
            selectedPlanId === 'annual'
              ? 'border-red-600 shadow-2xl ring-2 ring-red-600'
              : 'border-slate-200 shadow-xs hover:border-red-300'
          }`}
          onClick={() => setSelectedPlanId('annual')}
        >
          {/* Promo Badge */}
          <div className="absolute -top-3.5 right-6 bg-red-600 text-white px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'وفر 50% (خصم 250 ج.م)' : 'Save 50% (Promotional)'}</span>
          </div>

          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                {isAr ? 'الأكثر توفيراً وقيمة' : 'Most Popular & Best Value'}
              </span>
              <h2 className="text-xl font-black text-slate-900">
                {isAr ? annual.nameAr : annual.nameEn}
              </h2>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-red-600">
                  {formatEgp(annual.priceEgp, lang)}
                </span>
                <span className="text-sm font-semibold text-slate-500">
                  {isAr ? '/ سنوياً' : '/ year'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="line-through">{formatEgp(annual.originalPriceEgp || 500, lang)}</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  {isAr ? 'توفير 250 ج.م كاملة' : 'Save 250 EGP'}
                </span>
              </div>
            </div>

            <ul className="space-y-3 border-t border-slate-100 pt-6 text-xs sm:text-sm text-slate-700">
              {(isAr ? annual.featuresAr : annual.featuresEn).map((f, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setSelectedPlanId('annual')}
            className={`w-full mt-8 py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedPlanId === 'annual'
                ? 'bg-red-600 text-white shadow-lg hover:bg-red-700'
                : 'bg-red-50 text-red-700 hover:bg-red-100'
            }`}
          >
            {isAr ? 'اختيار العرض السنوي الموفر' : 'Select Annual Plan (Best Deal)'}
          </button>
        </div>
      </div>

      {/* Manual Payment Submission Form (Section 12 of spec) */}
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-red-600" />
            <span>
              {isAr
                ? 'تأكيد الاشتراك ومراجعة إيصال الدفع'
                : 'Confirm Subscription & Submit Payment Proof'}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isAr
              ? 'الخطة المختارة حالياً: ' + (selectedPlanId === 'annual' ? 'الاشتراك السنوي (250 ج.م)' : 'الاشتراك الشهري (50 ج.م)')
              : 'Selected: ' + (selectedPlanId === 'annual' ? 'Annual (250 EGP)' : 'Monthly (50 EGP)')}
          </p>
        </div>

        {submittedStatus === 'pending' ? (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 p-6 rounded-2xl space-y-3 text-center">
            <Clock className="w-10 h-10 text-amber-600 mx-auto animate-pulse" />
            <h3 className="text-base font-bold">
              {isAr ? 'تم استلام طلب الدفع بنجاح وهو قيد المراجعة' : 'Payment Submitted for Review'}
            </h3>
            <p className="text-xs leading-relaxed text-amber-800">
              {isAr
                ? `رقم العملية: ${referenceCode} - سيقوم مدير الاشتراكات (Membership Manager) بالتحقق من التحويل وتفعيل الحساب خلال ساعات قليلة.`
                : `Reference #${referenceCode} is pending verification by our Membership Manager.`}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitPayment} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'وسيلة الدفع والتحويل:' : 'Payment Method:'}
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-red-600"
                >
                  <option value="InstaPay">انستاباي (InstaPay Egypt)</option>
                  <option value="Vodafone Cash">فودافون كاش (Vodafone Cash)</option>
                  <option value="Fawry">فوري (Fawry Pay)</option>
                  <option value="Bank Transfer">تحويل بنكي (Bank Transfer)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'رقم الإيصال أو كود التحويل المرجعي *' : 'Transaction Reference / Receipt Code *'}
                </label>
                <input
                  type="text"
                  required
                  value={referenceCode}
                  onChange={(e) => setReferenceCode(e.target.value)}
                  placeholder={isAr ? 'مثال: IP-98234123 أو كود فودافون كاش' : 'e.g. IP-98234123 or receipt code'}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-900">
                {isAr ? 'تعليمات التحويل المالي المباشر:' : 'Direct Transfer Instructions:'}
              </p>
              <p>{isAr ? '• انستاباي / محفظة إلكترونية: smarttech@instapay أو 01000000000' : '• InstaPay Handle: smarttech@instapay'}</p>
              <p className="text-[11px] text-slate-500">
                {isAr
                  ? 'يتم فحص كل عملية تحويل يدوياً واعتمادها بواسطة فريق الاشتراكات لضمان حماية بياناتكم وأمان المعاملات.'
                  : 'All transactions undergo explicit manual verification by our Membership Team.'}
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !referenceCode.trim()}
              className="w-full py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isAr ? 'جاري تسجيل الطلب...' : 'Recording submission...'}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{isAr ? 'إرسال بيانات التحويل للمراجعة' : 'Submit Reference for Verification'}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
