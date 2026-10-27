/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ScenariosView } from './components/ScenariosView';
import { AiRoleplayView } from './components/AiRoleplayView';
import { CoachingStudioView } from './components/CoachingStudioView';
import { ScienceLabView } from './components/ScienceLabView';
import { GoogleMeetView } from './components/GoogleMeetView';
import { ArticlesView } from './components/ArticlesView';
import { SeoCommandCenter } from './components/seo/SeoCommandCenter';
import { PricingView } from './components/PricingView';
import { TeacherDashboardView } from './components/TeacherDashboardView';
import { AdminView } from './components/AdminView';
import { CurriculumView } from './components/CurriculumView';
import { AuthModal } from './components/auth/AuthModal';
import { AccessDeniedView } from './components/auth/AccessDeniedView';
import {
  initAuth,
  googleSignIn,
  logout as firebaseLogout,
  testConnection,
  syncUserProfile,
} from './services/firebase';

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [currentView, setCurrentView] = useState<string>('home');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<string>('guest');
  const [membershipStatus, setMembershipStatus] = useState<string>('free_preview');

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalConfig, setAuthModalConfig] = useState<{ title?: string; subtitle?: string }>({});

  const handleRequireAuth = (title?: string, subtitle?: string) => {
    setAuthModalConfig({ title, subtitle });
    setIsAuthModalOpen(true);
  };

  // Verify Firebase connection on startup (Firebase Skill requirement)
  useEffect(() => {
    testConnection();
  }, []);

  // Listen to Auth State and synchronize user profile
  useEffect(() => {
    const unsubscribe = initAuth(
      async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          try {
            const profile = await syncUserProfile(currentUser);
            setRole(profile.role);
            setMembershipStatus(profile.membershipStatus);
          } catch (e) {
            console.warn('Sync profile fallback:', e);
            if (currentUser.email?.toLowerCase() === 'amabrouk971@gmail.com') {
              setRole('super_admin');
              setMembershipStatus('active');
            } else {
              setRole('teacher');
              setMembershipStatus('free_preview');
            }
          }
        }
      },
      () => {
        setUser(null);
        setRole('guest');
        setMembershipStatus('free_preview');
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Update HTML document direction and language attribute
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const handleLogin = async () => {
    try {
      const res = await googleSignIn();
      if (res?.user) {
        setUser(res.user);
        const profile = await syncUserProfile(res.user);
        setRole(profile.role);
        setMembershipStatus(profile.membershipStatus);
      }
    } catch (err) {
      console.error('Login action error', err);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseLogout();
      setUser(null);
      setRole('guest');
      setMembershipStatus('free_preview');
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  const isSuperAdmin = user?.email?.toLowerCase() === 'amabrouk971@gmail.com' || role === 'super_admin';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-red-600 selection:text-white">
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        lang={lang}
        setLang={setLang}
        user={user}
        onLogin={() => handleRequireAuth()}
        onLogout={handleLogout}
        role={role}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView lang={lang} onNavigate={setCurrentView} />
        )}

        {currentView === 'curriculum' && (
          <CurriculumView
            lang={lang}
            userId={user?.uid || 'guest-teacher'}
            user={user}
            role={role}
            membershipStatus={membershipStatus}
            onRequireAuth={() => handleRequireAuth(
              lang === 'ar' ? 'تسجيل الدخول لمنهاج المعلمين' : 'Sign In for Curriculum Access',
              lang === 'ar'
                ? 'سجّل دخولك بحساب جوجل لحفظ إنجازاتك في الوحدة الأولى وتتبع تقدمك السحابي مجاناً.'
                : 'Sign in with your Google account to save Module 1 lesson progress and track CEFR scores.'
            )}
            onNavigateToPricing={() => setCurrentView('pricing')}
          />
        )}

        {currentView === 'scenarios' && (
          <ScenariosView lang={lang} />
        )}

        {currentView === 'roleplay' && (
          <AiRoleplayView lang={lang} />
        )}

        {currentView === 'coaching' && (
          <CoachingStudioView lang={lang} />
        )}

        {currentView === 'science' && (
          <ScienceLabView lang={lang} />
        )}

        {currentView === 'meet' && (
          <GoogleMeetView
            lang={lang}
            isAuthenticated={!!user}
            onLogin={handleLogin}
          />
        )}

        {currentView === 'articles' && (
          <ArticlesView lang={lang} />
        )}

        {currentView === 'seo' && (
          isSuperAdmin ? (
            <SeoCommandCenter lang={lang} />
          ) : (
            <AccessDeniedView
              lang={lang}
              user={user}
              onNavigateHome={() => setCurrentView('home')}
              onSwitchAccount={handleLogin}
            />
          )
        )}

        {currentView === 'pricing' && (
          <PricingView
            lang={lang}
            isAuthenticated={!!user}
            onLogin={() => handleRequireAuth(
              lang === 'ar' ? 'تسجيل الدخول لتفعيل العضوية' : 'Sign In to Activate Membership',
              lang === 'ar'
                ? 'سجل دخولك بحساب جوجل لربط خطة الاشتراك وسداد الرسوم برقم حسابك.'
                : 'Sign in with Google to associate your subscription with your educator account.'
            )}
            userEmail={user?.email}
          />
        )}

        {currentView === 'dashboard' && (
          user ? (
            <TeacherDashboardView
              lang={lang}
              user={user}
              onNavigate={setCurrentView}
              membershipStatus={membershipStatus}
            />
          ) : (
            <AccessDeniedView
              lang={lang}
              user={user}
              onNavigateHome={() => setCurrentView('home')}
              onSwitchAccount={() => handleRequireAuth(
                lang === 'ar' ? 'لوحة تحكم المعلم' : 'Teacher Dashboard Access',
                lang === 'ar'
                  ? 'يرجى تسجيل الدخول لعرض لوحة تحكم المعلم وإحصائيات التعلم.'
                  : 'Please sign in to access your teacher dashboard and progress history.'
              )}
            />
          )
        )}

        {currentView === 'admin' && (
          isSuperAdmin ? (
            <AdminView lang={lang} />
          ) : (
            <AccessDeniedView
              lang={lang}
              user={user}
              onNavigateHome={() => setCurrentView('home')}
              onSwitchAccount={handleLogin}
            />
          )
        )}
      </main>

      {/* Footer */}
      <Footer lang={lang} onNavigate={setCurrentView} />

      {/* Branded Google Sign-In Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onGoogleSignIn={handleLogin}
        lang={lang}
        title={authModalConfig.title}
        subtitle={authModalConfig.subtitle}
      />
    </div>
  );
}
