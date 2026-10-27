import React, { useState } from 'react';
import {
  BrainCircuit,
  Sparkles,
  Loader2,
  FileCheck2,
  Printer,
  Copy,
  Check,
  ShieldAlert,
  Save,
} from 'lucide-react';
import { INITIAL_SUBJECTS, INITIAL_STAGES } from '../data/initialData';

interface CoachingStudioViewProps {
  lang: 'ar' | 'en';
}

export const CoachingStudioView: React.FC<CoachingStudioViewProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [selectedSubject, setSelectedSubject] = useState(INITIAL_SUBJECTS[0].nameAr);
  const [selectedStage, setSelectedStage] = useState(INITIAL_STAGES[1].nameAr);
  const [studentProfile, setStudentProfile] = useState('');
  const [observedDifficulty, setObservedDifficulty] = useState('');
  const [learningGoal, setLearningGoal] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Quick preset loader for teachers
  const handleLoadSample = () => {
    setSelectedSubject('الرياضيات');
    setSelectedStage('المرحلة الابتدائية');
    setStudentProfile('طالبة بالصف الرابع، تشارك بفاعلية في الأنشطة الشفهية، لكنها تتجمد عند حل المسائل اللفظية المكتوبة بمفردها.');
    setObservedDifficulty('صعوبة في ترجمة الكلمات المفتاحية في المسألة اللفظية إلى عمليات حسابية (جمع أو طرح)، مع ميل للجمع العشوائي للأرقام دون فهم.');
    setLearningGoal('أن تتمكن الطالبة من تحديد المعطيات والمطلوب واستنتاج العملية المناسبة ذاتياً باستخدام النمذجة الشريطية.');
  };

  const handleGeneratePlan = async () => {
    if (!observedDifficulty.trim() || isLoading) return;

    setIsLoading(true);
    setGeneratedPlan(null);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/ai/coaching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: selectedSubject,
          stage: selectedStage,
          studentProfile,
          observedDifficulty,
          learningGoal,
          language: lang,
        }),
      });

      const data = await res.json();
      if (data.supportPlan) {
        setGeneratedPlan(data.supportPlan);
      }
    } catch (err) {
      console.error('Coaching plan error', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (generatedPlan) {
      navigator.clipboard.writeText(generatedPlan);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveLocally = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold mb-2">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>High Thinking Mode: gemini-4-argon (ThinkingLevel.HIGH)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {isAr ? 'استوديو التوجيه الفردي وخطط الدعم التربوي' : 'Student Coaching Studio'}
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-3xl">
            {isAr
              ? 'أدخل الملاحظات التعليمية لتوليد خطة دعم متمايزة مصممة خصيصاً لحالة الطالب الصفية، دون أي تشخيصات طبية أو تصنيفات جاهزة، بالاعتماد على التفكير العميق لمعالجة جذور الصعوبة.'
              : 'Formulate bespoke pedagogical support plans for individual student hurdles using high-level AI reasoning without diagnostic labeling.'}
          </p>
        </div>

        <button
          onClick={handleLoadSample}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-red-600" />
          <span>{isAr ? 'تحميل مثال تدريبي جاهز' : 'Load Sample Case'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>{isAr ? 'بيانات الموقف التعليمي' : 'Classroom Case Profile'}</span>
          </h2>

          {/* Subject & Stage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isAr ? 'المادة الدراسية' : 'Subject'}
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-red-600"
              >
                {INITIAL_SUBJECTS.map((s) => (
                  <option key={s.id} value={s.nameAr}>
                    {isAr ? s.nameAr : s.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isAr ? 'المرحلة التعليمية' : 'Stage'}
              </label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-red-600"
              >
                {INITIAL_STAGES.map((st) => (
                  <option key={st.id} value={st.nameAr}>
                    {isAr ? st.nameAr : st.nameEn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Student Context */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {isAr ? 'الملف التعليمي وسياق الطالب (بدون بيانات شخصية)' : 'Student Context (Anonymized)'}
            </label>
            <textarea
              rows={2}
              value={studentProfile}
              onChange={(e) => setStudentProfile(e.target.value)}
              placeholder={isAr ? 'مثال: طالب متفاعل شفهياً، لكنه يتردد في الكتابة المستقلة...' : 'e.g. Participates orally but hesitates during independent written tasks...'}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Observed Difficulty */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {isAr ? 'الصعوبة أو المفهوم الخاطئ الملاحظ *' : 'Observed Difficulty / Misconception *'}
            </label>
            <textarea
              rows={3}
              value={observedDifficulty}
              onChange={(e) => setObservedDifficulty(e.target.value)}
              placeholder={isAr ? 'صف الموقف التعليمي أو العائق المفاهيمي الذي لاحظته لدى الطالب...' : 'Describe the exact learning hurdle or misconception observed...'}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Target Goal */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {isAr ? 'الهدف التعليمي المنشود' : 'Target Learning Goal'}
            </label>
            <input
              type="text"
              value={learningGoal}
              onChange={(e) => setLearningGoal(e.target.value)}
              placeholder={isAr ? 'مثال: أن يتمكن من التمييز بين المعطيات والمطلوب بدقة...' : 'e.g. Master distinguishing given data from required outcome...'}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Privacy & Professional Directive Notice */}
          <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600">
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <p>
              {isAr
                ? 'تلتزم المنصة بأخلاقيات الخصوصية: لا تدخل أسماء كاملة للطلاب. يركز الاستوديو على التدخلات التربوية فقط دون تشخيصات طبية.'
                : 'Privacy guaranteed: Do not enter student full names. Focus strictly on pedagogical scaffolding without clinical diagnoses.'}
            </p>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleGeneratePlan}
            disabled={!observedDifficulty.trim() || isLoading}
            className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isAr ? 'جاري التحليل والتفكير العميق...' : 'Analyzing with High Thinking...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{isAr ? 'توليد خطة الدعم التربوي' : 'Generate Structured Plan'}</span>
              </>
            )}
          </button>
        </div>

        {/* Output Area (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-red-600" />
              <h2 className="text-base font-bold text-slate-900">
                {isAr ? 'خطة الدعم والتدخل التربوي المتمايز' : 'Pedagogical Support Plan'}
              </h2>
            </div>

            {generatedPlan && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                  title="نسخ الخطة"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleSaveLocally}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{savedSuccess ? (isAr ? 'تم الحفظ!' : 'Saved!') : (isAr ? 'حفظ الخطة' : 'Save')}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                  title="طباعة"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {generatedPlan ? (
            <div className="prose prose-sm max-w-none text-slate-800 leading-relaxed space-y-4 animate-in fade-in duration-300">
              <div className="whitespace-pre-line text-xs sm:text-sm">{generatedPlan}</div>
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 space-y-3">
              <BrainCircuit className="w-12 h-12 mx-auto text-slate-300" />
              <p className="text-sm font-medium">
                {isAr
                  ? 'لم يتم إنشاء خطة بعد. أدخل تفاصيل الصعوبة الملاحظة واضغط "توليد خطة الدعم التربوي".'
                  : 'No plan generated yet. Fill the case details on the left and click "Generate Structured Plan".'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
