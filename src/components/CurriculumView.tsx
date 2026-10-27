/**
 * SmartTech Teacher Academy - ELT Curriculum Portal
 * Interactive bilingual curriculum with actual browser voice playback,
 * dialogue simulation, vocabulary drill, microphone speech recognition,
 * placement diagnostic quiz, assignment rubrics, and printable book export.
 * 
 * Strict 100% Light Mode • Role & Subscription Gated (Free preview Mod 1, Paywall Mod 2 & 3).
 */

import React, { useState, useEffect, useRef } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import {
  CURRICULUM_MODULES,
  CurriculumModule,
  LessonItem,
  ExerciseItem,
  CEFRLevel,
} from '../data/curriculumData';
import {
  getCurriculumProgress,
  setLessonCompleted,
  recordExerciseScore,
  calculateCurriculumStats,
  UserCurriculumProgress,
} from '../services/curriculumService';
import {
  playBrowserSpeech,
  stopSpeech,
  startSpeechRecognition,
  calculateSimilarity,
  isSpeechRecognitionSupported,
} from '../utils/speech';
import {
  BookOpen,
  Volume2,
  VolumeX,
  CheckCircle2,
  HelpCircle,
  Award,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ExternalLink,
  BookCheck,
  GraduationCap,
  MessageSquare,
  Flame,
  Mic,
  MicOff,
  Printer,
  Download,
  AlertCircle,
  Check,
  X,
  FileText,
  Lock,
  Unlock,
  ShieldCheck,
  CreditCard,
  UserCheck,
} from 'lucide-react';

interface CurriculumViewProps {
  lang: 'ar' | 'en';
  userId?: string;
  user?: FirebaseUser | null;
  role?: string;
  membershipStatus?: string;
  onRequireAuth?: () => void;
  onNavigateToPricing?: () => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  lang,
  userId = 'teacher-101',
  user,
  role = 'teacher',
  membershipStatus = 'free_preview',
  onRequireAuth,
  onNavigateToPricing,
}) => {
  const isAr = lang === 'ar';
  const isFounder = user?.email?.toLowerCase() === 'amabrouk971@gmail.com';
  const isSubscribed = isFounder || membershipStatus === 'active';

  // State
  const [selectedModuleId, setSelectedModuleId] = useState<string>(CURRICULUM_MODULES[0].id);
  const [selectedLessonId, setSelectedLessonId] = useState<string>(CURRICULUM_MODULES[0].lessons[0].id);
  const [progress, setProgress] = useState<UserCurriculumProgress | null>(null);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [selectedCefrFilter, setSelectedCefrFilter] = useState<string>('ALL');

  // Interactive Speech Recognition state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [practiceTargetText, setPracticeTargetText] = useState<string>('');
  const [spokenTranscript, setSpokenTranscript] = useState<string>('');
  const [speechScore, setSpeechScore] = useState<number | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const activeRecognitionRef = useRef<{ stop: () => void } | null>(null);

  // Modals
  const [showPlacementModal, setShowPlacementModal] = useState<boolean>(false);
  const [placementAnswers, setPlacementAnswers] = useState<Record<number, number>>({});
  const [placementResult, setPlacementResult] = useState<CEFRLevel | null>(null);
  const [showBookModal, setShowBookModal] = useState<boolean>(false);

  // Load progress
  useEffect(() => {
    getCurriculumProgress(user?.uid || userId).then(setProgress);
  }, [user?.uid, userId]);

  const activeModule: CurriculumModule =
    CURRICULUM_MODULES.find((m) => m.id === selectedModuleId) || CURRICULUM_MODULES[0];

  const activeLesson: LessonItem =
    activeModule.lessons.find((l) => l.id === selectedLessonId) || activeModule.lessons[0];

  // Set initial practice target text when lesson changes
  useEffect(() => {
    if (activeLesson?.expressions?.length > 0) {
      setPracticeTargetText(activeLesson.expressions[0].english);
      setSpokenTranscript('');
      setSpeechScore(null);
      setSpeechError(null);
    }
  }, [activeLesson?.id]);

  const stats = calculateCurriculumStats(CURRICULUM_MODULES, progress);

  const isLessonCompleted = (lessonId: string) =>
    progress?.completedLessons?.includes(lessonId) ?? false;

  const handleToggleCompletion = async (lessonId: string) => {
    if (!user && onRequireAuth) {
      onRequireAuth();
      return;
    }
    const currentState = isLessonCompleted(lessonId);
    const updated = await setLessonCompleted(user?.uid || userId, lessonId, !currentState);
    setProgress(updated);
  };

  const handlePlaySpeech = async (audioKey: string, text: string, speechLang: 'en' | 'ar') => {
    if (activeAudioId === audioKey) {
      stopSpeech();
      setActiveAudioId(null);
      return;
    }

    stopSpeech();
    setActiveAudioId(audioKey);
    await playBrowserSpeech(text, {
      lang: speechLang,
      onEnd: () => setActiveAudioId(null),
      onError: () => setActiveAudioId(null),
    });
  };

  const handleSelectAnswer = async (exercise: ExerciseItem, optionId: string) => {
    if (!user && onRequireAuth) {
      onRequireAuth();
      return;
    }
    const selectedOption = exercise.options.find((o) => o.id === optionId);
    const isCorrect = selectedOption?.isCorrect ?? false;

    setSelectedAnswers((prev) => ({ ...prev, [exercise.id]: optionId }));

    const updated = await recordExerciseScore(user?.uid || userId, exercise.id, isCorrect);
    setProgress(updated);
  };

  // Microphone Speech Practice
  const handleStartSpeakingPractice = () => {
    if (!user && onRequireAuth) {
      onRequireAuth();
      return;
    }

    if (isRecording) {
      activeRecognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    setSpokenTranscript('');
    setSpeechScore(null);
    setSpeechError(null);
    setIsRecording(true);

    try {
      const rec = startSpeechRecognition({
        lang: 'en-US',
        onResult: (transcript: string) => {
          setSpokenTranscript(transcript);
          const score = calculateSimilarity(practiceTargetText, transcript);
          setSpeechScore(score);
          setIsRecording(false);
        },
        onError: (err) => {
          setSpeechError(isAr ? 'تعذر التعرف على الصوت. تحقق من إذن الميكروفون.' : 'Speech error: ' + err);
          setIsRecording(false);
        },
        onEnd: () => {
          setIsRecording(false);
        },
      });

      activeRecognitionRef.current = rec;
    } catch {
      setSpeechError(
        isAr
          ? 'المتصفح الحالي لا يدعم التعرف على الصوت. نوصي باستخدام Chrome أو Edge.'
          : 'Speech recognition is not supported in this browser. Please use Chrome or Edge.'
      );
      setIsRecording(false);
    }
  };

  // CEFR Diagnostic questions
  const placementQuestions = [
    {
      q: 'When giving instructions for pair work, which sequence is most effective?',
      qAr: 'عند إعطاء تعليمات للعمل الثنائي، أي تسلسل هو الأكثر فاعلية؟',
      opts: [
        'Distribute handouts -> Explain task -> Group students',
        'Group students -> Explain task -> Distribute handouts',
        'Explain task -> Distribute handouts -> Group students',
      ],
      correct: 1,
      targetLevel: 'B1',
    },
    {
      q: 'Which of the following is an authentic Instruction-Checking Question (ICQ)?',
      qAr: 'أي من الأسئلة التالية يُعد سؤال تحقق من التعليمات (ICQ) احترافي؟',
      opts: [
        '"Do you understand?"',
        '"Are you going to write or speak in this exercise?"',
        '"Is this clear?"',
      ],
      correct: 1,
      targetLevel: 'A2',
    },
    {
      q: 'What is the primary role of a Concept-Checking Question (CCQ)?',
      qAr: 'ما هو الدور الأساسي لسؤال التحقق من المفهوم (CCQ)؟',
      opts: [
        'To ask the student to translate the word into Arabic.',
        'To test if the student grasps the underlying meaning without asking "Do you know?".',
        'To correct student pronunciation immediately.',
      ],
      correct: 1,
      targetLevel: 'B2',
    },
    {
      q: 'To maximize Student Talk Time (STT), the teacher should:',
      qAr: 'لمضاعفة وقت تحدث الطلاب (STT)، يجب على المعلم:',
      opts: [
        'Repeat every student answer to ensure everyone heard.',
        'Use peer-checking before calling for open-class feedback.',
        'Deliver a 30-minute uninterrupted grammar lecture.',
      ],
      correct: 1,
      targetLevel: 'B1',
    },
    {
      q: 'During a fluency activity, when should error correction ideally take place?',
      qAr: 'أثناء نشاط الطلاقة، متى يفضل تقديم التغذية الراجعة وتصحيح الأخطاء؟',
      opts: [
        'Interrupt immediately and correct the error on the spot.',
        'Note the error silently and address it during delayed feedback.',
        'Ignore all grammar errors forever.',
      ],
      correct: 1,
      targetLevel: 'B2',
    },
  ];

  const handleEvaluatePlacement = () => {
    let score = 0;
    placementQuestions.forEach((q, idx) => {
      if (placementAnswers[idx] === q.correct) {
        score++;
      }
    });

    let diagnosed: CEFRLevel = 'A1';
    if (score >= 5) diagnosed = 'B2';
    else if (score >= 3) diagnosed = 'B1';
    else if (score >= 2) diagnosed = 'A2';
    else diagnosed = 'A1';

    setPlacementResult(diagnosed);

    // Auto-select recommended module
    if (diagnosed === 'A1' || diagnosed === 'A2') {
      setSelectedModuleId('mod-1');
    } else {
      setSelectedModuleId('mod-2');
    }
  };

  // Filter lessons in sidebar
  const filteredLessons = activeModule.lessons.filter((l) => {
    if (selectedCefrFilter === 'ALL') return true;
    return l.cefr === selectedCefrFilter;
  });

  // Access check for active module
  const isModuleLocked = activeModule.id !== 'mod-1' && !isSubscribed;

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 ${isAr ? 'rtl' : 'ltr'}`}>
      {/* Top Banner */}
      <section className="border-b border-slate-200 bg-white py-8 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                <GraduationCap className="w-3.5 h-3.5" />
                {isAr ? 'المنهج التخصصي المعتمد' : 'Accredited ELT Curriculum'}
              </span>
              <span className="text-xs font-medium text-slate-600">
                {isAr ? '15 درساً معتمداً (A1–B2) • معايير كامبريدج CELTA' : '15 Complete Lessons (A1–B2) • CELTA/DELTA Standards'}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {isAr ? 'معاينة مجانية للوحدة 1 • اشتراك ميسر للوصول الشامل' : 'Free Preview Mod 1 • Affordable Full Membership'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {isAr ? 'منهاج اللغة الإنجليزية وإدارة الصف للمعلمين' : 'SmartTech English for Teachers'}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              {isAr
                ? 'ثلاث وحدات تدريبية متكاملة (15 درساً كاملاً) مع النطق الصوتي الفعلي، التمارين التفاعلية، التدريب الصوتي بالميكروفون، وقوالب التقييم للدكتور أحمد مبروك.'
                : 'Complete 3 modules × 5 lessons = 15 comprehensive lessons with browser voice playback, microphone speech scoring, dialogues, vocabulary tables, and rubrics.'}
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setShowPlacementModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-amber-500" />
                <span>{isAr ? 'اختبار تحديد المستوى (CEFR Placement)' : 'CEFR Diagnostic Quiz'}</span>
              </button>

              <button
                onClick={() => setShowBookModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition cursor-pointer"
              >
                <Printer className="w-4 h-4 text-red-600" />
                <span>{isAr ? 'تصدير المنهاج ككتاب كامل (Print/PDF)' : 'Export Course Book (HTML/PDF)'}</span>
              </button>

              <a
                href="/database/schema.sql"
                download="smarttech_curriculum_schema.sql"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition"
                title={isAr ? 'تحميل ملف قاعدة بيانات MySQL لاستضافة cPanel' : 'Download MySQL DDL and Seed for cPanel'}
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>{isAr ? 'قاعدة بيانات MySQL (cPanel)' : 'cPanel MySQL Seed'}</span>
              </a>

              {/* Membership Status Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 border border-slate-200 text-slate-700">
                {isSubscribed ? (
                  <>
                    <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">{isAr ? 'عضوية نشطة (وصول كامل)' : 'Active Membership (Full Access)'}</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-amber-700">{isAr ? 'معاينة الوحدة 1 مجاناً' : 'Free Preview Mode'}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Progress Widget */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 min-w-[280px] shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
                {isAr ? 'إجمالي تقدم الدورة' : 'Overall Course Progress'}
              </span>
              <span className="text-xs font-bold text-red-600 font-mono">
                {stats.percentage}%
              </span>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
              <div
                className="bg-red-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${stats.percentage}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs text-slate-600 pt-1 border-t border-slate-100 font-medium">
              <span className="flex items-center gap-1">
                <BookCheck className="w-3.5 h-3.5 text-emerald-600" />
                {stats.completedCount} / {stats.totalLessons} {isAr ? 'دروس مكتملة' : 'Lessons Completed'}
              </span>
              <span className="flex items-center gap-1 text-amber-600 font-bold">
                <Flame className="w-3.5 h-3.5" />
                {isAr ? 'شهادة إنجاز' : 'Certificate'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Module Switcher Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {CURRICULUM_MODULES.map((mod) => {
            const isSelected = mod.id === selectedModuleId;
            const completedInModule = mod.lessons.filter((l) => isLessonCompleted(l.id)).length;
            const modPercentage = Math.round((completedInModule / mod.lessons.length) * 100);
            const isFree = mod.id === 'mod-1';
            const isLocked = !isFree && !isSubscribed;

            return (
              <button
                key={mod.id}
                onClick={() => {
                  setSelectedModuleId(mod.id);
                  setSelectedLessonId(mod.lessons[0].id);
                }}
                className={`text-start p-5 rounded-2xl border transition-all duration-200 relative overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'bg-white border-red-500 shadow-md ring-2 ring-red-500/20'
                    : 'bg-white border-slate-200 hover:border-red-300 hover:bg-slate-50/80 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        isSelected ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {isAr ? `الوحدة ${mod.number}` : `Module ${mod.number}`}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                      {mod.cefrRange}
                    </span>
                  </div>

                  {/* Lock/Unlock Badge */}
                  {isFree ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <Unlock className="w-3 h-3 text-emerald-600" />
                      {isAr ? 'معاينة مجانية' : 'Free Preview'}
                    </span>
                  ) : isLocked ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      <Lock className="w-3 h-3 text-amber-600" />
                      {isAr ? 'اشتراك مطلوب' : 'Members Only'}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      {isAr ? 'متاح بالاشتراك' : 'Unlocked'}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-1">
                  {isAr ? mod.titleAr : mod.titleEn}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {isAr ? mod.descriptionAr : mod.descriptionEn}
                </p>

                {/* Micro Progress Bar */}
                <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-red-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${modPercentage}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Workspace: Sidebar Lessons + Main Lesson Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Lesson Picker */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3 px-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {isAr ? `دروس الوحدة (${filteredLessons.length})` : `Module Lessons (${filteredLessons.length})`}
                </h4>

                {/* CEFR Level Filter Pills */}
                <div className="flex items-center gap-1 text-[11px]">
                  {['ALL', 'A1', 'A2', 'B1', 'B2'].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedCefrFilter(lvl)}
                      className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                        selectedCefrFilter === lvl
                          ? 'bg-red-600 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <nav className="space-y-2">
                {filteredLessons.map((lesson) => {
                  const isCurrent = lesson.id === activeLesson.id;
                  const completed = isLessonCompleted(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setSelectedLessonId(lesson.id)}
                      className={`w-full text-start flex items-center justify-between p-3.5 rounded-xl transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-red-50 border border-red-300 text-red-900 font-bold shadow-2xs'
                          : 'bg-slate-50 border border-slate-100 hover:border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleCompletion(lesson.id);
                          }}
                          className="text-slate-400 hover:text-emerald-600 transition p-0.5 cursor-pointer"
                          title={isAr ? 'تحديد كمكتمل' : 'Toggle Completed'}
                        >
                          {completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-slate-300 hover:border-red-500" />
                          )}
                        </span>
                        <div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-red-600 font-mono font-bold">
                              {isAr ? `الدرس ${lesson.number}` : `Lesson ${lesson.number}`}
                            </span>
                            <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 text-[10px] font-bold">
                              {lesson.cefr}
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium">{lesson.durationMin}m</span>
                          </div>
                          <div className="text-sm font-semibold text-slate-900 line-clamp-1">
                            {isAr ? lesson.titleAr : lesson.titleEn}
                          </div>
                        </div>
                      </div>
                      {isAr ? (
                        <ChevronLeft className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Speaking Practice Mic Recorder Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
                  <Mic className="w-4 h-4" />
                  <span>{isAr ? 'التدريب الشفهي بالميكروفون' : 'Oral Speech Practice'}</span>
                </div>
                {isSpeechRecognitionSupported() && (
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                    WebSpeech API
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                {isAr
                  ? 'انطق العبارة التدريبية بصوتك ليقوم الذكاء الاصطناعي بتحليل النطق ومقارنته بالصيغة المعتمدة:'
                  : 'Speak this target teacher phrase to evaluate your pronunciation accuracy:'}
              </p>

              {/* Target Phrase Box */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 mb-3">
                "{practiceTargetText}"
              </div>

              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={handleStartSpeakingPractice}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-xs cursor-pointer ${
                    isRecording
                      ? 'bg-amber-600 text-white animate-pulse'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-4 h-4" />
                      <span>{isAr ? 'جاري الاستماع... انقر للإيقاف' : 'Listening... Click to stop'}</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4" />
                      <span>{isAr ? 'ابدأ التسجيل الصوتي' : 'Start Voice Test'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Speech Result / Similarity */}
              {spokenTranscript && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                  <div className="text-slate-600">
                    {isAr ? 'ما التقطه المتصفح:' : 'Heard transcript:'}{' '}
                    <span className="text-slate-900 font-semibold">"{spokenTranscript}"</span>
                  </div>
                  {speechScore !== null && (
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                      <span className="text-slate-600">{isAr ? 'نسبة التطابق:' : 'Accuracy match:'}</span>
                      <span
                        className={`font-bold px-2 py-0.5 rounded ${
                          speechScore >= 75
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {speechScore}%{' '}
                        {speechScore >= 75
                          ? isAr
                            ? 'ممتاز!'
                            : 'Great!'
                          : isAr
                          ? 'حاول ثانية'
                          : 'Try again'}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {speechError && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg text-[11px] text-red-700">
                  {speechError}
                </div>
              )}
            </div>

            {/* Audio Tip Card */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5">
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm mb-2">
                <Sparkles className="w-4 h-4" />
                {isAr ? 'إرشادات النطق والتدريب' : 'Speech & Audio Practice'}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr
                  ? 'انقر على أيقونة الصوت لسماع نطق العبارة بالإنجليزية الأصلية أو بالترجمة العربية الاحترافية عبر أصوات المتصفح التوليدية.'
                  : 'Click any audio button to play real browser speech synthesis for both natural English phrasing and authentic Arabic pedagogical translations.'}
              </p>
            </div>
          </aside>

          {/* Main Lesson Content OR Paywall Card */}
          <div className="lg:col-span-8 space-y-8">
            {isModuleLocked ? (
              /* Paywall Gating Card for Modules 2 & 3 */
              <div className="bg-white border-2 border-red-200 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-2xl">
                  {isAr ? 'محتوى حصري للمشتركين' : 'Members Only'}
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center shadow-xs">
                    <Lock className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                      {isAr ? 'الوحدة التدريبية مخصصة للأعضاء المشتركين' : 'Exclusive Module for Academy Members'}
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      {isAr ? activeModule.titleAr : activeModule.titleEn} • {activeModule.cefrRange}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed mb-6">
                  {isAr
                    ? 'لقد وصلت إلى محتوى متقدم من منهاج سمارت تك. تتضمن هذه الوحدة 5 دروس تطبيقية شاملة لشرح الدروس المعقدة، أسئلة التحقق من المفهوم (CCQs)، وإدارة السلوكيات الصفية بدقة تربوية عالية.'
                    : 'You have reached an advanced module in the SmartTech ELT Curriculum. This module contains 5 in-depth classroom lessons, concept-checking routines, and evidence-based behavior management.'}
                </p>

                {/* Features Unlocked */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    {isAr ? 'ما الذي ستحصل عليه مع الاشتراك الكامل:' : 'Included in Full Academy Membership:'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{isAr ? '10 دروس متقدمة (الوحدتان 2 و 3)' : '10 Advanced Lessons (Modules 2 & 3)'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{isAr ? 'محاكاة صوتية غير محدودة للذكاء الاصطناعي' : 'Unlimited AI Voice Classroom Simulator'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{isAr ? 'شهادة إتمام معتمدة من سمارت تك' : 'Accredited SmartTech Teacher Certificate'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{isAr ? 'جلسة إرشادية شهرية عبر Google Meet' : 'Monthly Live Mentoring on Google Meet'}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-300 transition shadow-xs text-center">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      {isAr ? 'الاشتراك الشهري' : 'Monthly Pass'}
                    </div>
                    <div className="text-3xl font-black text-slate-900 mb-1">
                      50 <span className="text-sm font-semibold text-slate-500">{isAr ? 'ج.م / شهر' : 'EGP / mo'}</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">{isAr ? 'تجديد شهري مرن مع إمكانية الإلغاء في أي وقت' : 'Flexible monthly access, cancel anytime'}</p>
                    <button
                      onClick={onNavigateToPricing}
                      className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition cursor-pointer"
                    >
                      {isAr ? 'اختيار الخطة الشهرية' : 'Select Monthly'}
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl border-2 border-red-500 bg-red-50/50 transition shadow-xs text-center relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-bold uppercase px-3 py-0.5 rounded-full shadow-2xs">
                      {isAr ? 'خصم 50% • موصى به' : '50% OFF • RECOMMENDED'}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-red-700 mb-1 mt-1">
                      {isAr ? 'الاشتراك السنوي الشامل' : 'Annual VIP'}
                    </div>
                    <div className="text-3xl font-black text-slate-900 mb-1">
                      250 <span className="text-sm font-semibold text-slate-500">{isAr ? 'ج.م / سنة' : 'EGP / yr'}</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">{isAr ? 'وفر 50% + جلسة Google Meet فردية مجاناً' : 'Save 50% + 1:1 Google Meet Session with Dr. Ahmed'}</p>
                    <button
                      onClick={onNavigateToPricing}
                      className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition cursor-pointer shadow-xs"
                    >
                      {isAr ? 'اشترك سنوياً الآن' : 'Get Annual Access'}
                    </button>
                  </div>
                </div>

                {/* Call to action for unauthenticated users */}
                {!user && (
                  <div className="pt-4 border-t border-slate-200 text-center">
                    <p className="text-xs text-slate-600 mb-3">
                      {isAr ? 'هل تمتلك حساباً بالفعل أو تريد تجربة الوحدة الأولى مجاناً؟' : 'Already have an account or want to preview Module 1 for free?'}
                    </p>
                    <button
                      onClick={onRequireAuth}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4 text-slate-700" />
                      <span>{isAr ? 'تسجيل الدخول باستخدام جوجل' : 'Sign In with Google'}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Active Lesson Body (Free for Mod 1 or Unlocked for Subscribers) */
              <>
                {/* Lesson Header Card */}
                <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-8 relative overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                        {isAr ? `الدرس ${activeLesson.number}` : `Lesson ${activeLesson.number}`}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-100 text-slate-700">
                        CEFR {activeLesson.cefr}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{activeLesson.durationMin} mins</span>
                    </div>

                    <button
                      onClick={() => handleToggleCompletion(activeLesson.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isLessonCompleted(activeLesson.id)
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {isLessonCompleted(activeLesson.id)
                        ? isAr
                          ? 'مكتمل (انقر للإلغاء)'
                          : 'Completed (Click to undo)'
                        : isAr
                        ? 'تحديد الدرس كمكتمل'
                        : 'Mark as Completed'}
                    </button>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                    {isAr ? activeLesson.titleAr : activeLesson.titleEn}
                  </h2>
                  <p className="text-sm font-semibold text-red-600 mb-6">
                    {isAr ? activeLesson.subtitleAr : activeLesson.subtitleEn}
                  </p>

                  {/* Objectives */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4 text-red-600" />
                      {isAr ? 'الأهداف التعليمية للدرس' : 'Learning Objectives'}
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                      {(isAr ? activeLesson.objectivesAr : activeLesson.objectivesEn).map(
                        (obj, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-red-600 font-bold">•</span>
                            <span>{obj}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Pedagogical Overview */}
                  <div className="text-slate-700 text-sm leading-relaxed border-t border-slate-200 pt-5 font-normal">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      {isAr ? 'الأساس المنهجي والتربوي' : 'Pedagogical Framework'}
                    </h4>
                    <p>{isAr ? activeLesson.pedagogicalOverviewAr : activeLesson.pedagogicalOverviewEn}</p>
                  </div>
                </div>

                {/* Section: Key Vocabulary Table */}
                {activeLesson.vocabulary && activeLesson.vocabulary.length > 0 && (
                  <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-red-600" />
                          {isAr ? 'جدول المفردات والمصطلحات التربوية' : 'Key Vocabulary & Phonetics'}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          {isAr
                            ? 'المصطلحات التدريسية الدقيقة مع النطق الصوتي والسياق التطبيقي'
                            : 'Essential pedagogical terms with phonetic transcription and authentic classroom usage'}
                        </p>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-start text-xs sm:text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider">
                            <th className="pb-3 text-start font-bold">{isAr ? 'الكلمة / النطق' : 'Term / Phonetic'}</th>
                            <th className="pb-3 text-start font-bold">{isAr ? 'المعنى العربي' : 'Arabic Meaning'}</th>
                            <th className="pb-3 text-start font-bold">{isAr ? 'مثال تطبيقي' : 'Classroom Example'}</th>
                            <th className="pb-3 text-end font-bold">{isAr ? 'صوت' : 'Audio'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {activeLesson.vocabulary.map((voc, vIdx) => {
                            const audioKey = `voc-${activeLesson.id}-${vIdx}`;
                            const isPlaying = activeAudioId === audioKey;

                            return (
                              <tr key={vIdx} className="hover:bg-slate-50 transition">
                                <td className="py-3.5 pr-3">
                                  <div className="font-bold text-slate-900 text-sm">{voc.wordEn}</div>
                                  <div className="text-xs font-mono text-red-600">{voc.phonetic}</div>
                                </td>
                                <td className="py-3.5 px-3 font-semibold text-emerald-700">
                                  {voc.meaningAr}
                                </td>
                                <td className="py-3.5 px-3 text-slate-700 text-xs">
                                  <div className="font-medium">{voc.exampleEn}</div>
                                  <div className="text-slate-500 text-[11px] mt-0.5">{voc.exampleAr}</div>
                                </td>
                                <td className="py-3.5 pl-3 text-end">
                                  <button
                                    onClick={() => handlePlaySpeech(audioKey, voc.wordEn, 'en')}
                                    className={`p-2 rounded-xl text-xs font-bold inline-flex items-center gap-1 transition cursor-pointer ${
                                      isPlaying
                                        ? 'bg-red-600 text-white animate-pulse'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                                    title={isAr ? 'استماع لنطق المصطلح' : 'Play pronunciation'}
                                  >
                                    {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-red-600" />}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Section 1: Natural English Expressions with Audio */}
                <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Volume2 className="w-5 h-5 text-red-600" />
                        {isAr ? 'العبارات الصفية الطبيعية ونطقها المعتمد' : 'Natural Classroom Expressions'}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {isAr
                          ? 'استمع إلى النطق الإنجليزي الصحيح والترجمة التخصصية الدقيقة'
                          : 'Listen to native-like classroom phrasing with phonetic pronunciation guidance'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {activeLesson.expressions.map((exp) => {
                      const isPlayingEn = activeAudioId === `en-${exp.id}`;
                      const isPlayingAr = activeAudioId === `ar-${exp.id}`;

                      return (
                        <div
                          key={exp.id}
                          className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-4 sm:p-5 transition shadow-2xs"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-3">
                                <span className="text-base sm:text-lg font-bold text-slate-900">
                                  {exp.english}
                                </span>
                                {/* EN Audio button */}
                                <button
                                  onClick={() => handlePlaySpeech(`en-${exp.id}`, exp.english, 'en')}
                                  className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                                    isPlayingEn
                                      ? 'bg-red-600 text-white animate-pulse'
                                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                  }`}
                                  title={isAr ? 'تشغيل نطق الإنجليزية' : 'Play English Pronunciation'}
                                >
                                  {isPlayingEn ? (
                                    <VolumeX className="w-4 h-4" />
                                  ) : (
                                    <Volume2 className="w-4 h-4 text-red-600" />
                                  )}
                                  <span>EN</span>
                                </button>

                                {/* Select as Practice Target */}
                                <button
                                  onClick={() => {
                                    setPracticeTargetText(exp.english);
                                    setSpokenTranscript('');
                                    setSpeechScore(null);
                                  }}
                                  className="p-1.5 px-2 rounded-lg text-[11px] font-semibold bg-slate-100 border border-slate-200 text-slate-700 hover:text-red-700 transition cursor-pointer"
                                  title={isAr ? 'اختر للتدريب بالميكروفون' : 'Set as speech practice target'}
                                >
                                  <Mic className="w-3.5 h-3.5 inline mr-1" />
                                  {isAr ? 'تدرب' : 'Practice'}
                                </button>
                              </div>

                              {exp.phoneticTip && (
                                <div className="text-xs font-mono text-slate-500">
                                  {exp.phoneticTip}
                                </div>
                              )}

                              <div className="flex items-center gap-3 pt-1">
                                <span className="text-sm font-semibold text-red-700">
                                  {exp.arabic}
                                </span>
                                {/* AR Audio button */}
                                <button
                                  onClick={() => handlePlaySpeech(`ar-${exp.id}`, exp.arabic, 'ar')}
                                  className={`p-1.5 px-2.5 rounded-lg text-xs font-medium flex items-center gap-1 transition cursor-pointer ${
                                    isPlayingAr
                                      ? 'bg-emerald-600 text-white animate-pulse'
                                      : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                                  }`}
                                  title={isAr ? 'تشغيل الترجمة الصوتية' : 'Play Arabic Translation'}
                                >
                                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>AR</span>
                                </button>
                              </div>
                            </div>

                            <span className="self-start sm:self-center px-2.5 py-1 rounded-md text-[11px] font-mono uppercase bg-slate-100 border border-slate-200 text-slate-700 font-bold">
                              {exp.category}
                            </span>
                          </div>

                          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                            <span className="text-slate-800 font-bold">
                              {isAr ? 'التوجيه التربوي: ' : 'Pedagogical context: '}
                            </span>
                            {isAr ? exp.pedagogicalNoteAr : exp.pedagogicalNoteEn}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 2: Realistic Classroom Dialogue */}
                <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-red-600" />
                        {isAr ? 'حوار صفي واقعي ونموذج تطبيقي' : 'Realistic Classroom Dialogue'}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {isAr
                          ? 'محاكاة كاملة للتفاعل اللغوي الحقيقي داخل الحصة الدراسية'
                          : 'Authentic interaction model demonstrating the techniques in live context'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {activeLesson.dialogue.map((line, idx) => {
                      const audioKey = `dial-${activeLesson.id}-${idx}`;
                      const isPlaying = activeAudioId === audioKey;
                      const isTeacher = line.speaker === 'Teacher';

                      return (
                        <div
                          key={idx}
                          className={`p-4 rounded-2xl border transition ${
                            isTeacher
                              ? 'bg-red-50/60 border-red-200'
                              : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                                isTeacher
                                  ? 'bg-red-600 text-white'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {isAr ? line.speakerAr : line.speaker}
                            </span>
                            <button
                              onClick={() => handlePlaySpeech(audioKey, line.en, 'en')}
                              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${
                                isPlaying
                                  ? 'bg-red-600 text-white animate-pulse'
                                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>{isAr ? 'استماع' : 'Listen'}</span>
                            </button>
                          </div>

                          <p className="text-sm font-bold text-slate-900 mb-1">{line.en}</p>
                          <p className="text-xs text-slate-600 font-medium">{line.ar}</p>

                          {line.note && (
                            <div className="mt-2 text-[11px] text-red-600 italic">
                              ℹ️ {line.note}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section: Grammar & Teaching Notes */}
                {activeLesson.grammarNotes && activeLesson.grammarNotes.length > 0 && (
                  <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-red-600" />
                      {isAr ? 'إضاءات نحوية وتربوية للمعلم' : 'Grammar & Teacher Notes'}
                    </h3>
                    <div className="space-y-4">
                      {activeLesson.grammarNotes.map((g, gIdx) => (
                        <div key={gIdx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                          <div className="font-bold text-base text-red-700 mb-1">
                            {isAr ? g.topicAr : g.topicEn}
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 mb-2 leading-relaxed">
                            {isAr ? g.ruleAr : g.ruleEn}
                          </p>
                          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800">
                            <strong>💡 {isAr ? 'نصيحة المدرس: ' : 'CELTA Tip: '}</strong>
                            {g.tip}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section: Common Mistakes & Corrections */}
                {activeLesson.commonMistakes && activeLesson.commonMistakes.length > 0 && (
                  <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      {isAr ? 'أخطاء شائعة وبدائلها الاحترافية' : 'Common Mistakes & Best Practice Fixes'}
                    </h3>
                    <div className="space-y-3">
                      {activeLesson.commonMistakes.map((m, mIdx) => (
                        <div key={mIdx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                          <div className="flex items-start gap-2 text-xs sm:text-sm text-red-600">
                            <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold">{isAr ? 'صيغة خاطئة / غير مستحبة: ' : 'Avoid: '}</span>
                              <span className="line-through">{m.incorrect}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 text-xs sm:text-sm text-emerald-700">
                            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold">{isAr ? 'الصيغة التربوية الموصى بها: ' : 'Recommended: '}</span>
                              <span>{m.correct}</span>
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 pl-6 border-t border-slate-200 pt-2 font-medium">
                            {isAr ? m.explanationAr : m.explanationEn}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 3: Interactive Exercises with Explanations */}
                <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-red-600" />
                        {isAr ? 'التمارين التفاعلية والتقييم التربوي' : 'Interactive Pedagogical Exercises'}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {isAr
                          ? 'اختر الإجابة الأدق منهجياً للاطلاع الفوري على التفسير التربوي والمراجع الدولية'
                          : 'Choose the pedagogically sound response to reveal detailed rationale and citations'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {activeLesson.exercises.map((ex, exIndex) => {
                      const selectedOptionId = selectedAnswers[ex.id];
                      const isAnswered = !!selectedOptionId;
                      const selectedOption = ex.options.find((o) => o.id === selectedOptionId);
                      const isCorrect = selectedOption?.isCorrect ?? false;

                      return (
                        <div
                          key={ex.id}
                          className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6"
                        >
                          <div className="text-xs text-red-600 font-bold mb-2">
                            {isAr ? `تمرين ${exIndex + 1}` : `Exercise ${exIndex + 1}`}
                          </div>
                          <h4 className="text-base font-bold text-slate-900 mb-2">
                            {isAr ? ex.promptAr : ex.promptEn}
                          </h4>
                          <div className="p-3 bg-white rounded-xl text-xs text-slate-700 mb-4 border border-slate-200">
                            <span className="text-slate-500 font-semibold">
                              {isAr ? 'السياق الصفي: ' : 'Classroom Context: '}
                            </span>
                            {isAr ? ex.contextAr : ex.contextEn}
                          </div>

                          {/* Options */}
                          <div className="space-y-2.5">
                            {ex.options.map((option) => {
                              const isThisSelected = selectedOptionId === option.id;
                              let btnStyle =
                                'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-100';

                              if (isAnswered) {
                                if (option.isCorrect) {
                                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                                } else if (isThisSelected && !option.isCorrect) {
                                  btnStyle = 'bg-red-50 border-red-500 text-red-900 font-bold';
                                } else {
                                  btnStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
                                }
                              }

                              return (
                                <button
                                  key={option.id}
                                  disabled={isAnswered}
                                  onClick={() => handleSelectAnswer(ex, option.id)}
                                  className={`w-full text-start p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-start gap-3 cursor-pointer ${btnStyle}`}
                                >
                                  <span className="font-mono text-slate-500 mt-0.5 font-bold">
                                    {option.id.toUpperCase()}
                                  </span>
                                  <span className="flex-1">
                                    {isAr ? option.textAr : option.textEn}
                                  </span>
                                  {isAnswered && option.isCorrect && (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Pedagogical Explanation Card */}
                          {isAnswered && (
                            <div
                              className={`mt-4 p-4 rounded-xl border text-xs leading-relaxed ${
                                isCorrect
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                                  : 'bg-red-50 border-red-300 text-red-900'
                              }`}
                            >
                              <div className="font-bold mb-1.5 flex items-center gap-1.5">
                                {isCorrect ? '✅ إجابة دقيقة تربوياً' : '⚠️ تصحيح تربوي وتوجيه منهجي'}
                              </div>
                              <p>{isAr ? ex.explanationAr : ex.explanationEn}</p>
                              <div className="mt-2 pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                                <strong>{isAr ? 'المرجع التخصصي: ' : 'Academic Reference: '}</strong>
                                {ex.sourceReference}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section: Practical Classroom Assignment & Rubric */}
                {activeLesson.assignment && (
                  <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-red-600" />
                      {isAr ? 'التكليف الصفي العملي ومصفوفة التقييم' : 'Classroom Assignment & 3-Tier Rubric'}
                    </h3>
                    <p className="text-xs text-slate-500 mb-5">
                      {isAr
                        ? 'طبق المهارة في حصتك الدراسية وقيم أداءك الذاتي وفق سلم التقدير اللفظي المعتمد (3 درجات، درجتان، درجة واحدة):'
                        : 'Implement this practical task in your classroom and assess yourself against the 3-point rubric:'}
                    </p>

                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6">
                      <div className="font-bold text-slate-900 text-base mb-1">
                        {isAr ? activeLesson.assignment.titleAr : activeLesson.assignment.titleEn}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {isAr ? activeLesson.assignment.instructionsAr : activeLesson.assignment.instructionsEn}
                      </p>
                    </div>

                    {/* Rubric Cards */}
                    <div className="space-y-4">
                      {activeLesson.assignment.rubrics.map((r, rIdx) => (
                        <div key={rIdx} className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-bold text-sm text-slate-900">
                              {isAr ? r.criteriaAr : r.criteria}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-bold border border-red-200">
                              {r.maxPoints} {isAr ? 'نقاط قصوى' : 'pts max'}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                              <div className="font-bold text-emerald-800 mb-1">
                                ⭐⭐⭐ 3 {isAr ? 'نقاط (إتقان تام)' : 'Points (Proficient)'}
                              </div>
                              <p className="text-slate-700">{r.descriptors.three}</p>
                            </div>

                            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                              <div className="font-bold text-amber-800 mb-1">
                                ⭐⭐ 2 {isAr ? 'نقطتان (متوسط)' : 'Points (Developing)'}
                              </div>
                              <p className="text-slate-700">{r.descriptors.two}</p>
                            </div>

                            <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                              <div className="font-bold text-red-800 mb-1">
                                ⭐ 1 {isAr ? 'نقطة (يحتاج تدريب)' : 'Point (Needs Drill)'}
                              </div>
                              <p className="text-slate-700">{r.descriptors.one}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 4: Authoritative Academic Citations */}
                <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-red-600" />
                    {isAr ? 'المراجع العلمية والتوثيق الأكاديمي' : 'Research & Academic References'}
                  </h3>
                  <div className="space-y-3">
                    {activeLesson.researchCitations.map((cite, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-bold text-slate-900">
                            {cite.author} ({cite.year}). <em>{cite.work}</em>
                          </div>
                          <p className="text-slate-600 mt-1">{cite.keyTakeaway}</p>
                        </div>
                        {cite.url && (
                          <a
                            href={cite.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-semibold self-start sm:self-auto"
                          >
                            <span>{isAr ? 'الناشر' : 'Publisher'}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Lesson Navigation */}
                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => handleToggleCompletion(activeLesson.id)}
                    className="px-6 py-3 rounded-xl text-sm font-bold bg-red-600 hover:bg-red-700 text-white transition flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {isLessonCompleted(activeLesson.id)
                      ? isAr
                        ? 'الدرس مكتمل'
                        : 'Lesson Completed'
                      : isAr
                      ? 'إكمال الدرس والمتابعة'
                      : 'Complete & Continue'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* MODAL 1: CEFR Placement Diagnostic Quiz */}
      {showPlacementModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  {isAr ? 'اختبار تحديد المستوى التربوي (CEFR Diagnostic)' : 'CEFR Diagnostic Placement Quiz'}
                </h3>
              </div>
              <button
                onClick={() => setShowPlacementModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {placementResult ? (
              <div className="text-center py-6 space-y-4">
                <div className="inline-flex p-4 rounded-full bg-red-50 text-red-700 border border-red-200">
                  <GraduationCap className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">
                  {isAr ? 'مستواك المقترح وفق الإطار الأوروبي:' : 'Your Diagnosed CEFR Level:'}
                </h4>
                <div className="text-4xl font-extrabold text-red-600 font-mono">
                  {placementResult}
                </div>
                <p className="text-sm text-slate-700 max-w-md mx-auto">
                  {isAr
                    ? `بناءً على إجاباتك، نوصي بالبدء بالوحدة التدريبية المناسبة لمستواك في إدارة الفصل والشرح التفاعلي.`
                    : `Based on your diagnostic answers, we recommend beginning with Module ${
                        placementResult === 'A1' || placementResult === 'A2' ? '1' : '2'
                      }.`}
                </p>
                <button
                  onClick={() => setShowPlacementModal(false)}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition cursor-pointer"
                >
                  {isAr ? 'الانتقال للدروس المقترحة' : 'Go to Recommended Lessons'}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-xs text-slate-700 leading-relaxed">
                  {isAr
                    ? 'أجب عن الأسئلة الخمسة التالية لتحديد مستواك المعرفي وتوجيهك لأفضل وحدة تدريبية تبدأ بها:'
                    : 'Answer these 5 diagnostic questions to determine your starting CEFR band and recommended training track:'}
                </p>

                {placementQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <div className="font-bold text-sm text-slate-900">
                      {qIdx + 1}. {isAr ? q.qAr : q.q}
                    </div>
                    <div className="space-y-1.5 pt-1">
                      {q.opts.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() =>
                            setPlacementAnswers((prev) => ({ ...prev, [qIdx]: oIdx }))
                          }
                          className={`w-full text-start p-2.5 rounded-xl text-xs border transition cursor-pointer ${
                            placementAnswers[qIdx] === oIdx
                              ? 'bg-red-50 border-red-500 text-red-900 font-bold'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleEvaluatePlacement}
                  disabled={Object.keys(placementAnswers).length < placementQuestions.length}
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-sm transition cursor-pointer"
                >
                  {isAr ? 'تحليل النتيجة وتحديد المستوى' : 'Evaluate CEFR Level'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: Printable Course Book Modal (Print/PDF) */}
      {showBookModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  {isAr
                    ? 'كتاب منهاج اللغة الإنجليزية للمعلمين (نسخة الطباعة والحفظ)'
                    : 'SmartTech English for Teachers — Complete Course Book'}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>{isAr ? 'طباعة / حفظ PDF' : 'Print / Save PDF'}</span>
                </button>
                <button
                  onClick={() => setShowBookModal(false)}
                  className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Printable Book Body */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-12 bg-white text-slate-900 print:bg-white print:text-black">
              {/* Cover Page */}
              <div className="text-center py-10 border-b border-slate-200 space-y-4">
                <div className="text-xs uppercase tracking-widest text-red-600 font-bold">
                  SmartTech Training & Testing Center • teaches.smart-courses.org
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {isAr
                    ? 'دليل المعلم المتميز: استراتيجيات حديثة لتطوير مهارات التدريس'
                    : 'SmartTech English for Teachers: Classroom Methodology & Communication'}
                </h1>
                <div className="text-base text-slate-700 font-bold">
                  {isAr ? 'المشرف العام: د. أحمد مبروك' : 'Academic Director: Dr. Ahmed Mabrouk'}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {isAr ? '15 درساً كاملاً • معايير كامبريدج CELTA/DELTA • مستويات CEFR (A1–B2)' : '15 Complete Lessons • Cambridge CELTA Framework • CEFR A1-B2'}
                </div>
              </div>

              {/* Table of Contents */}
              <div className="space-y-4 border-b border-slate-200 pb-8">
                <h2 className="text-xl font-bold text-red-600">
                  {isAr ? 'فهرس المنهاج (Table of Contents)' : 'Table of Contents'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                  {CURRICULUM_MODULES.map((m) => (
                    <div key={m.id} className="space-y-2">
                      <div className="font-bold text-slate-900 text-sm">
                        {isAr ? `الوحدة ${m.number}: ${m.titleAr}` : `Module ${m.number}: ${m.titleEn}`}
                      </div>
                      <ul className="space-y-1 text-slate-600">
                        {m.lessons.map((l) => (
                          <li key={l.id} className="flex justify-between">
                            <span>{l.number} {isAr ? l.titleAr : l.titleEn}</span>
                            <span className="font-mono text-slate-500 font-bold">{l.cefr}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* All 15 Lessons Rendered */}
              {CURRICULUM_MODULES.map((mod) => (
                <div key={mod.id} className="space-y-8">
                  <div className="border-b border-red-200 pb-3">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                      Module {mod.number}
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {isAr ? mod.titleAr : mod.titleEn}
                    </h2>
                  </div>

                  {mod.lessons.map((les) => (
                    <article key={les.id} className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-2xs">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h3 className="font-bold text-lg text-slate-900">
                          {les.number} {isAr ? les.titleAr : les.titleEn}
                        </h3>
                        <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 text-xs font-mono font-bold">
                          {les.cefr} • {les.durationMin}m
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 italic">
                        {isAr ? les.subtitleAr : les.subtitleEn}
                      </p>

                      {/* Expressions */}
                      <div className="space-y-2 text-xs">
                        <div className="font-bold text-red-600">{isAr ? 'العبارات المفتاحية:' : 'Key Expressions:'}</div>
                        {les.expressions.map((e) => (
                          <div key={e.id} className="p-2.5 rounded bg-slate-50 border border-slate-200">
                            <div className="font-bold text-slate-900">{e.english}</div>
                            <div className="text-red-700 mt-0.5">{e.arabic}</div>
                          </div>
                        ))}
                      </div>

                      {/* Vocabulary */}
                      <div className="space-y-1 text-xs">
                        <div className="font-bold text-slate-700">{isAr ? 'المفردات:' : 'Vocabulary:'}</div>
                        <div className="grid grid-cols-2 gap-2">
                          {les.vocabulary.map((v, idx) => (
                            <div key={idx} className="p-2 rounded bg-slate-50 text-[11px] border border-slate-100">
                              <span className="font-bold text-slate-900">{v.wordEn}</span>{' '}
                              <span className="text-slate-500">({v.phonetic})</span>: {v.meaningAr}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Assignment */}
                      {les.assignment && (
                        <div className="p-3 rounded bg-red-50 border border-red-200 text-xs">
                          <div className="font-bold text-red-800">
                            {isAr ? 'التكليف الصفي: ' : 'Classroom Assignment: '}
                            {isAr ? les.assignment.titleAr : les.assignment.titleEn}
                          </div>
                          <p className="text-slate-700 mt-1">
                            {isAr ? les.assignment.instructionsAr : les.assignment.instructionsEn}
                          </p>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
