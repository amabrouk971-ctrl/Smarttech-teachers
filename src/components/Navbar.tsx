import React from 'react';
import {
  BookOpen,
  GraduationCap,
  Mic,
  BrainCircuit,
  Dna,
  Video,
  Newspaper,
  CreditCard,
  ShieldCheck,
  Globe,
  UserCheck,
  LogOut,
  Menu,
  X,
  BarChart3,
} from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
  user: FirebaseUser | null;
  onLogin: () => void;
  onLogout: () => void;
  role: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  lang,
  setLang,
  user,
  onLogin,
  onLogout,
  role,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', labelAr: 'الرئيسية', labelEn: 'Home', icon: GraduationCap },
    { id: 'curriculum', labelAr: 'المناهج التدريبية (ELT)', labelEn: 'ELT Curriculum', icon: BookOpen },
    { id: 'scenarios', labelAr: 'سيناريوهات التدريس', labelEn: 'Scenarios', icon: BookOpen },
    { id: 'roleplay', labelAr: 'المحاكاة الصوتية', labelEn: 'Voice AI Roleplay', icon: Mic },
    { id: 'coaching', labelAr: 'استوديو التوجيه (High AI)', labelEn: 'Coaching Studio', icon: BrainCircuit },
    { id: 'science', labelAr: 'مختبر العلوم والبيولوجيا', labelEn: 'Bioscience Lab', icon: Dna },
    { id: 'meet', labelAr: 'جلسات Google Meet', labelEn: 'Live Mentoring', icon: Video },
    { id: 'articles', labelAr: 'المقالات والأبحاث', labelEn: 'Articles Hub', icon: Newspaper },
    { id: 'seo', labelAr: 'استوديو السيو و GEO', labelEn: 'SEO & GEO Studio', icon: BarChart3 },
    { id: 'pricing', labelAr: 'الاشتراكات', labelEn: 'Membership', icon: CreditCard },
    { id: 'admin', labelAr: 'لوحة الإدارة', labelEn: 'Admin CMS', icon: ShieldCheck },
  ];

  const handleNav = (id: string) => {
    setCurrentView(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav('home')}>
            <img
              src="/assets/aistudio/Asset_2_4787d13f.png"
              alt="SmartTech Training & Testing Center Logo"
              className="h-12 w-auto object-contain hover:opacity-95 transition-opacity"
            />
            <div className="hidden sm:block border-r border-slate-200 pr-3 mr-1">
              <span className="block text-xs font-semibold tracking-wider text-red-600 uppercase">
                SmartTech Teacher Academy
              </span>
              <span className="block text-sm font-bold text-slate-900 leading-tight">
                {lang === 'ar' ? 'أكاديمية سمارت تك لتطوير المعلمين' : 'AI-Powered Teacher Development'}
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              const isAdminOnly = item.id === 'admin' || item.id === 'seo';
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-red-50 text-red-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-red-600' : 'text-slate-400'}`} />
                  <span>{lang === 'ar' ? item.labelAr : item.labelEn}</span>
                  {isAdminOnly && (
                    <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-red-100 text-red-700">
                      {lang === 'ar' ? 'إدارة' : 'Admin'}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Controls: Language & Auth */}
          <div className="flex items-center gap-3">
            {/* Language Switch */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
              title="تغيير اللغة / Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Auth Button */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('dashboard')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-medium text-slate-800 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs uppercase">
                    {user.displayName ? user.displayName.charAt(0) : 'T'}
                  </div>
                  <span className="max-w-[100px] truncate hidden md:inline">
                    {user.displayName || user.email}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 font-bold uppercase">
                    {role}
                  </span>
                </button>
                <button
                  onClick={onLogout}
                  className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                  title="تسجيل الخروج / Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all"
              >
                <UserCheck className="w-4 h-4" />
                <span>{lang === 'ar' ? 'تسجيل الدخول عبر Google' : 'Sign In with Google'}</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-red-50 text-red-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-red-600' : 'text-slate-400'}`} />
                <span>{lang === 'ar' ? item.labelAr : item.labelEn}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
