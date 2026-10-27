import React from 'react';
import { Mail, Phone, MapPin, Globe, ShieldCheck } from 'lucide-react';

interface FooterProps {
  lang: 'ar' | 'en';
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const isAr = lang === 'ar';

  return (
    <footer className="bg-slate-100 text-slate-800 border-t border-slate-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <img
              src="/assets/aistudio/Asset_2_4787d13f.png"
              alt="SmartTech Training & Testing Center"
              className="h-12 w-auto object-contain bg-white p-1.5 rounded-lg border border-slate-200 shadow-xs"
            />
            <p className="text-xs text-slate-600 leading-relaxed">
              {isAr
                ? 'SmartTech Teacher Academy — المنصة الرائدة لتطوير المعلمين بالذكاء الاصطناعي بإشراف د. أحمد مبروك، تجمع بين الاستراتيجيات التربوية والممارسة الصفية الواقعية.'
                : 'SmartTech Teacher Academy — AI-powered teacher development platform founded by Dr Ahmed Mabrouk.'}
            </p>
            <p className="text-xs font-bold text-red-600 italic">
              "Smart Teachers Build Better Generations"
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {isAr ? 'أقسام المنصة' : 'Platform Navigation'}
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button onClick={() => onNavigate('curriculum')} className="hover:text-red-600 transition-colors cursor-pointer">
                  {isAr ? 'المناهج التدريبية (ELT)' : 'ELT Curriculum'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('scenarios')} className="hover:text-red-600 transition-colors cursor-pointer">
                  {isAr ? 'سيناريوهات التدريس الـ ٧' : '7 Core Teaching Scenarios'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('roleplay')} className="hover:text-red-600 transition-colors cursor-pointer">
                  {isAr ? 'المحاكاة الصوتية والتدريب' : 'Voice AI Roleplay'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('coaching')} className="hover:text-red-600 transition-colors cursor-pointer">
                  {isAr ? 'استوديو التوجيه الفردي' : 'Student Coaching Studio'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('science')} className="hover:text-red-600 transition-colors cursor-pointer">
                  {isAr ? 'مختبر العلوم والبيولوجيا' : 'Bioscience Lab'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('meet')} className="hover:text-red-600 transition-colors cursor-pointer">
                  {isAr ? 'جلسات Google Meet المباشرة' : 'Live Google Meet Coaching'}
                </button>
              </li>
            </ul>
          </div>

          {/* Articles & Legal */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {isAr ? 'المعرفة والاشتراك' : 'Knowledge & Plans'}
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button onClick={() => onNavigate('articles')} className="hover:text-red-600 transition-colors cursor-pointer">
                  {isAr ? 'مركز المقالات والأبحاث' : 'Articles & Research Hub'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('seo')} className="hover:text-red-600 transition-colors cursor-pointer">
                  {isAr ? 'استوديو السيو و GEO' : 'SEO & GEO Studio'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-red-600 transition-colors cursor-pointer">
                  {isAr ? 'خطط العضوية والأسعار' : 'Membership Plans'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-red-600 transition-colors cursor-pointer">
                  {isAr ? 'بوابة الإدارة ونشر cPanel' : 'Admin & cPanel Export'}
                </button>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-red-600 transition-colors">
                  {isAr ? 'خريطة الموقع (Sitemap XML)' : 'Sitemap XML'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {isAr ? 'بيانات التواصل والاعتماد' : 'Contact & Official Domain'}
            </h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-red-600 shrink-0" />
                <a href="https://teaches.smart-courses.org" target="_blank" rel="noreferrer" className="hover:underline font-medium text-slate-900">
                  teaches.smart-courses.org
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-600 shrink-0" />
                <span>info@smart-courses.org</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>SmartTech Training & Testing Center</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} SmartTech Training & Testing Center. Dr Ahmed Mabrouk. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>Production: teaches.smart-courses.org</span>
            <span>Cairo, Egypt</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
