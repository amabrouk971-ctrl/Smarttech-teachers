export interface MembershipPlan {
  id: 'monthly' | 'annual';
  nameAr: string;
  nameEn: string;
  priceEgp: number;
  originalPriceEgp?: number;
  discountPercentage?: number;
  durationMonths: number;
  featuresAr: string[];
  featuresEn: string[];
}

export const MEMBERSHIP_PLANS: Record<'monthly' | 'annual', MembershipPlan> = {
  monthly: {
    id: 'monthly',
    nameAr: 'الاشتراك الشهري',
    nameEn: 'Monthly Membership',
    priceEgp: 50,
    durationMonths: 1,
    featuresAr: [
      'الوصول الكامل إلى سيناريوهات جميع المواد',
      'جلسات محاكاة تفاعلية غير محدودة مع الطلاب الافتراضيين',
      'استوديو توجيه وتخطيط الدعم الفردي للطلاب',
      'تحليل وملاحظات فورية للأداء التربوي',
      'جلسات دعم وإرشاد وتطوير مهني'
    ],
    featuresEn: [
      'Full access to all subject scenarios',
      'Unlimited interactive simulations with virtual personas',
      'Student individual coaching plan generator',
      'Instant pedagogical analysis & feedback',
      'Teacher mentoring & professional support'
    ]
  },
  annual: {
    id: 'annual',
    nameAr: 'الاشتراك السنوي المتميز (عرض خاص)',
    nameEn: 'Annual Membership (Special Offer)',
    priceEgp: 250,
    originalPriceEgp: 500,
    discountPercentage: 50,
    durationMonths: 12,
    featuresAr: [
      'خصم 50% مقارنة بالسعر الأصلي (وفر 250 ج.م)',
      'الوصول الكامل لجميع المواد والمراحل التعليمية لمدة عام',
      'ممارسة تدريس صوتية متقدمة مع تحويل الصوت إلى نص',
      'جلسات تدريب وتوجيه مباشر عبر Google Meet',
      'مختبر العلوم والبيولوجيا الجزيئية لمعلمي STEM',
      'شهادة تطوير مهني معتمدة من SmartTech'
    ],
    featuresEn: [
      '50% discount compared to list price (Save 250 EGP)',
      'Full 1-year access across all subjects and grade levels',
      'Advanced voice practice with speech-to-text',
      'Live 1-on-1 coaching sessions via Google Meet',
      'STEM & Bioscience pedagogy laboratory',
      'Verified SmartTech professional certificate'
    ]
  }
};

export function calculateSubscriptionExpiry(planId: 'monthly' | 'annual', startDate: Date = new Date()): Date {
  const expiry = new Date(startDate);
  const plan = MEMBERSHIP_PLANS[planId];
  expiry.setMonth(expiry.getMonth() + plan.durationMonths);
  return expiry;
}

export function isSubscriptionActive(status: string, expiresAt?: string | null): boolean {
  if (status !== 'active') return false;
  if (!expiresAt) return false;
  const expiryDate = new Date(expiresAt);
  return expiryDate.getTime() > Date.now();
}

export function formatEgp(amount: number, locale: 'ar' | 'en' = 'ar'): string {
  if (locale === 'ar') {
    return `${amount} ج.م`;
  }
  return `${amount} EGP`;
}
