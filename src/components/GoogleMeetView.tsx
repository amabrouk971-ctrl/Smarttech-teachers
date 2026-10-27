import React, { useState } from 'react';
import {
  Video,
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
  Plus,
  Loader2,
  CheckCircle2,
  UserCheck,
} from 'lucide-react';
import { getAccessToken } from '../services/firebase';

interface GoogleMeetViewProps {
  lang: 'ar' | 'en';
  onLogin: () => void;
  isAuthenticated: boolean;
}

interface MeetSession {
  id: string;
  titleAr: string;
  titleEn: string;
  mentor: string;
  timeAr: string;
  timeEn: string;
  meetUri: string;
  status: 'upcoming' | 'completed';
}

export const GoogleMeetView: React.FC<GoogleMeetViewProps> = ({
  lang,
  onLogin,
  isAuthenticated,
}) => {
  const isAr = lang === 'ar';

  const [sessions, setSessions] = useState<MeetSession[]>([
    {
      id: 'session-1',
      titleAr: 'جلسة تدريب فردي: استراتيجيات إدارة الفصل والتفاعل الصفي',
      titleEn: '1-on-1 Coaching: Classroom Management & Engagement Strategies',
      mentor: 'د. أحمد مبروك (Dr Ahmed Mabrouk)',
      timeAr: 'غداً، الساعة ٧:٠٠ مساءً بتوقيت القاهرة',
      timeEn: 'Tomorrow, 7:00 PM Cairo Time',
      meetUri: 'https://meet.google.com/new',
      status: 'upcoming',
    },
    {
      id: 'session-2',
      titleAr: 'ورشة إشراف وتوجيه لمدرسي العلوم والرياضيات',
      titleEn: 'STEM & Math Teacher Mentoring Workshop',
      mentor: 'فريق خبراء SmartTech',
      timeAr: 'الخميس القادم، الساعة ٦:٠٠ مساءً بتوقيت القاهرة',
      timeEn: 'Next Thursday, 6:00 PM Cairo Time',
      meetUri: 'https://meet.google.com/new',
      status: 'upcoming',
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleCreateMeetSpace = async () => {
    if (!isAuthenticated) {
      onLogin();
      return;
    }

    setIsCreating(true);
    try {
      const token = await getAccessToken();
      let meetUrl = 'https://meet.google.com/new';

      if (token) {
        const res = await fetch('/api/meet/create-space', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (data.meetingUri) {
          meetUrl = data.meetingUri;
        }
      }

      const newSession: MeetSession = {
        id: `meet-${Date.now()}`,
        titleAr: newTitle.trim() || 'جلسة إرشاد ومناقشة تربوية مباشرة',
        titleEn: newTitle.trim() || 'Direct Pedagogical Mentoring Session',
        mentor: 'د. أحمد مبروك / SmartTech Center',
        timeAr: 'الآن (جلسة نشطة)',
        timeEn: 'Now (Active Session)',
        meetUri: meetUrl,
        status: 'upcoming',
      };

      setSessions([newSession, ...sessions]);
      setNewTitle('');
    } catch (err) {
      console.error('Meet creation failed', err);
      // Fallback
      window.open('https://meet.google.com/new', '_blank');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold mb-2">
            <Video className="w-3.5 h-3.5 text-red-600" />
            <span>Google Workspace Google Meet Integration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {isAr ? 'جلسات التوجيه المباشر عبر Google Meet' : 'Live Mentoring via Google Meet'}
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-3xl">
            {isAr
              ? 'احجز وشارك في جلسات إرشاد وتوجيه تربوي فردي أو جماعي مع د. أحمد مبروك ونخبة من الخبراء، لتعزيز مهاراتك ومناقشة تحديات فصولك الدراسية مباشرة بالفيديو.'
              : 'Schedule and launch real-time video coaching sessions with Dr Ahmed Mabrouk and expert educators via Google Meet.'}
          </p>
        </div>

        {!isAuthenticated && (
          <button
            onClick={onLogin}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
          >
            <UserCheck className="w-4 h-4" />
            <span>{isAr ? 'سجل دخولك لتفعيل Google Meet' : 'Sign In to Enable Meet'}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Scheduler Form (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Plus className="w-4 h-4 text-red-600" />
            <span>{isAr ? 'إنشاء رابط جلسة Google Meet فورية' : 'Create Google Meet Session'}</span>
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {isAr ? 'عنوان الجلسة أو الموضوع التربوي' : 'Session Title or Topic'}
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder={isAr ? 'مثال: مناقشة خطة التدريس المتمايز للرياضيات' : 'e.g. Discussing Differentiated Math Plan'}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isAr ? 'مزايا الجلسات المباشرة' : 'Live Session Features'}</span>
            </div>
            <ul className="space-y-1 list-disc list-inside text-[11px]">
              <li>{isAr ? 'مراجعة مباشرة لخطط الدروس وسيناريوهات التدريس' : 'Direct review of lesson plans and scenarios'}</li>
              <li>{isAr ? 'محاكاة صفية حية مع توجيه فوري من المدرب' : 'Live roleplay simulation with mentor coaching'}</li>
              <li>{isAr ? 'تسجيل للملاحظات ونقاط القوة لملف إنجازك' : 'Notes recorded for your professional portfolio'}</li>
            </ul>
          </div>

          <button
            onClick={handleCreateMeetSpace}
            disabled={isCreating}
            className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isCreating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isAr ? 'جاري إنشاء فضاء Google Meet...' : 'Creating Meet Space...'}</span>
              </>
            ) : (
              <>
                <Video className="w-4 h-4" />
                <span>{isAr ? 'إنشاء غرفة لقاء Google Meet الآن' : 'Launch Google Meet Space'}</span>
              </>
            )}
          </button>
        </div>

        {/* Sessions List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            {isAr ? 'الجلسات المجدولة والمتاحة' : 'Scheduled & Active Coaching Sessions'}
          </h2>

          <div className="space-y-3">
            {sessions.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-bold text-red-600 uppercase">
                      {s.mentor}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {isAr ? s.titleAr : s.titleEn}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{isAr ? s.timeAr : s.timeEn}</span>
                  </div>
                </div>

                <a
                  href={s.meetUri}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all shrink-0 cursor-pointer"
                >
                  <Video className="w-4 h-4 text-white" />
                  <span>{isAr ? 'الانضمام للقاء' : 'Join Google Meet'}</span>
                  <ExternalLink className="w-3 h-3 text-red-200" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
