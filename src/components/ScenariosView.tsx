import React, { useState } from 'react';
import {
  BookOpen,
  Filter,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
} from 'lucide-react';
import {
  INITIAL_SUBJECTS,
  INITIAL_STAGES,
  INITIAL_SCENARIOS,
  ScenarioItem,
} from '../data/initialData';
import { evaluateTeacherResponse } from '../utils/pedagogyScorer';

interface ScenariosViewProps {
  lang: 'ar' | 'en';
}

const SCENARIO_TYPES = [
  { id: 'all', nameAr: 'جميع الأنماط (الـ ٧ التأسيسية)', nameEn: 'All 7 Types' },
  { id: 'start_lesson', nameAr: '١. بداية الحصة والتهيئة الحافزة', nameEn: '1. Starting the Lesson' },
  { id: 'explain_concept', nameAr: '٢. شرح المفهوم والتجسيد البصري', nameEn: '2. Explaining the Concept' },
  { id: 'check_understanding', nameAr: '٣. فحص الاستيعاب والتقويم التكويني', nameEn: '3. Checking Understanding' },
  { id: 'misconception', nameAr: '٤. معالجة المفاهيم الخاطئة', nameEn: '4. Handling Misconceptions' },
  { id: 'struggling_student', nameAr: '٥. دعم الطالب المتعثر وتفريد التعليم', nameEn: '5. Supporting Struggling Students' },
  { id: 'advanced_student', nameAr: '٦. تحدي وتنمية الطلاب المتفوقين', nameEn: '6. Challenging Advanced Students' },
  { id: 'assessment_feedback', nameAr: '٧. التقويم التكويني والتغذية الراجعة', nameEn: '7. Assessment & Feedback' },
];

export const ScenariosView: React.FC<ScenariosViewProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [selectedStageId, setSelectedStageId] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const [activeScenario, setActiveScenario] = useState<ScenarioItem | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const filteredScenarios = INITIAL_SCENARIOS.filter((sc) => {
    const matchSubj = selectedSubjectId === 'all' || sc.subjectId === selectedSubjectId;
    const matchStage = selectedStageId === 'all' || sc.stageId === selectedStageId;
    const matchType = selectedType === 'all' || sc.type === selectedType;
    return matchSubj && matchStage && matchType;
  });

  const handleSelectScenario = (sc: ScenarioItem) => {
    setActiveScenario(sc);
    setSelectedOptionId(null);
  };

  const selectedOpt = activeScenario?.options.find((o) => o.id === selectedOptionId);
  const evaluation = selectedOpt ? evaluateTeacherResponse(selectedOpt as any) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>The 7 Foundational Scenario Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {isAr ? 'محرك سيناريوهات التدريس التفاعلية' : 'Classroom Teaching Practice Scenarios'}
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-3xl">
            {isAr
              ? 'مواقف صفية واقعية مخصصة لكل مادة ومرحلة، مصممة لاختبار قراراتك التدريسية وصقل مهاراتك في إدارة الفصل وتفريد التعليم.'
              : 'Subject-tailored pedagogical situations across all 7 core teaching scenario types.'}
          </p>
        </div>

        {activeScenario && (
          <button
            onClick={() => setActiveScenario(null)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowIcon className="w-4 h-4" />
            <span>{isAr ? 'العودة لكتالوج السيناريوهات' : 'Back to Catalog'}</span>
          </button>
        )}
      </div>

      {activeScenario ? (
        /* Scenario Player */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-10 space-y-8 max-w-4xl mx-auto">
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold uppercase">
                {INITIAL_SUBJECTS.find((s) => s.id === activeScenario.subjectId)?.nameAr || activeScenario.subjectId}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600 font-medium">
                {INITIAL_STAGES.find((st) => st.id === activeScenario.stageId)?.nameAr}
              </span>
            </div>
            <span className="text-slate-500 font-mono text-[11px]">
              ID: {activeScenario.id}
            </span>
          </div>

          {/* Title & Classroom Context */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {isAr ? activeScenario.titleAr : activeScenario.titleEn}
            </h2>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong className="block text-slate-900 font-bold mb-1">
                {isAr ? 'السياق الصفي للموقف:' : 'Classroom Context:'}
              </strong>
              {isAr ? activeScenario.contextAr : activeScenario.contextEn}
            </div>
          </div>

          {/* Student Persona Dialogue */}
          <div className="flex items-start gap-4 bg-red-50/70 border border-red-200/80 p-5 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              ط
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-900">
                {activeScenario.studentPersona}
              </span>
              <p className="text-sm sm:text-base font-semibold text-slate-900 italic">
                "{isAr ? activeScenario.dialogueAr : activeScenario.dialogueEn}"
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              {isAr ? 'كيف تتدخل كمعلم متميز في هذه اللحظة؟' : 'What is your pedagogical intervention?'}
            </label>
            <div className="space-y-3">
              {activeScenario.options.map((opt, idx) => {
                const isSelected = selectedOptionId === opt.id;
                let borderClass = 'border-slate-200 bg-white hover:border-red-400';
                if (isSelected) {
                  borderClass = opt.isBest
                    ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-400'
                    : 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-400';
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedOptionId(opt.id)}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer ${borderClass}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm font-medium text-slate-800 leading-snug">
                        {isAr ? opt.textAr : opt.textEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pedagogical Score and Feedback */}
          {selectedOpt && evaluation && (
            <div className="border-t border-slate-200 pt-6 space-y-4 animate-in fade-in duration-300">
              <div className="bg-slate-50 text-slate-900 border border-slate-200 p-4 rounded-xl flex items-start gap-3 shadow-2xs">
                <Award className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    {isAr ? 'رد فعل الطالب الناتج عن تدخلك:' : 'Resulting Student Reaction:'}
                  </p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">
                    {isAr ? selectedOpt.studentReactionAr : selectedOpt.studentReactionEn}
                  </p>
                </div>
              </div>

              <div
                className={`p-5 rounded-2xl border ${
                  selectedOpt.isBest
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {selectedOpt.isBest ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                    )}
                    <span className="font-bold text-sm">
                      {isAr ? evaluation.levelAr : evaluation.levelEn}
                    </span>
                  </div>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-white border">
                    {evaluation.score} / 100
                  </span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed mt-2">
                  <strong>{isAr ? 'التحليل والتعليل التربوي: ' : 'Pedagogical Rationale: '}</strong>
                  {isAr ? selectedOpt.pedagogicalRationaleAr : selectedOpt.pedagogicalRationaleEn}
                </p>
              </div>

              {/* Master Advice */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-1">
                  💡 {isAr ? 'إضاءة تربوية من د. أحمد مبروك:' : 'Expert Teaching Insight:'}
                </span>
                {isAr ? activeScenario.pedagogyAdviceAr : activeScenario.pedagogyAdviceEn}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Scenarios Catalog */
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
              <Filter className="w-4 h-4 text-red-600" />
              <span>{isAr ? 'تصفية السيناريوهات حسب المادة والمرحلة والنمط' : 'Filter Scenarios'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Subject */}
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-red-600"
              >
                <option value="all">{isAr ? 'جميع المواد الدراسية' : 'All Subjects'}</option>
                {INITIAL_SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {isAr ? s.nameAr : s.nameEn}
                  </option>
                ))}
              </select>

              {/* Stage */}
              <select
                value={selectedStageId}
                onChange={(e) => setSelectedStageId(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-red-600"
              >
                <option value="all">{isAr ? 'جميع المراحل التعليمية' : 'All Stages'}</option>
                {INITIAL_STAGES.map((st) => (
                  <option key={st.id} value={st.id}>
                    {isAr ? st.nameAr : st.nameEn}
                  </option>
                ))}
              </select>

              {/* Scenario Type */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-red-600"
              >
                {SCENARIO_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {isAr ? t.nameAr : t.nameEn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScenarios.map((sc) => (
              <div
                key={sc.id}
                onClick={() => handleSelectScenario(sc)}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-red-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-bold uppercase">
                      {INITIAL_SUBJECTS.find((s) => s.id === sc.subjectId)?.nameAr || sc.subjectId}
                    </span>
                    <span className="text-slate-500 font-medium">
                      {INITIAL_STAGES.find((st) => st.id === sc.stageId)?.nameAr}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-red-600 transition-colors">
                    {isAr ? sc.titleAr : sc.titleEn}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {isAr ? sc.contextAr : sc.contextEn}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-semibold text-red-600">
                  <span>{isAr ? 'بدء ممارسة السيناريو' : 'Practice Scenario'}</span>
                  <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
