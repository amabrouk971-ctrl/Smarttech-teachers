import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Award,
} from 'lucide-react';
import { INITIAL_SCENARIOS } from '../data/initialData';
import { evaluateTeacherResponse } from '../utils/pedagogyScorer';

interface InteractiveSampleProps {
  lang: 'ar' | 'en';
}

export const InteractiveSample: React.FC<InteractiveSampleProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const scenario = INITIAL_SCENARIOS[0]; // The fractions sample
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);

  const selectedOption = scenario.options.find((o) => o.id === selectedOptId);
  const evaluation = selectedOption ? evaluateTeacherResponse(selectedOption as any) : null;

  const handleReset = () => {
    setSelectedOptId(null);
  };

  return (
    <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-xl overflow-hidden">
      {/* Sample Header Tag */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-red-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-red-400">
            {isAr ? 'تجربة حية تفاعلية مباشرة' : 'Functional Interactive Preview'}
          </span>
          <span className="text-slate-400 text-xs">|</span>
          <span className="text-xs text-slate-300">
            {isAr ? 'الرياضيات - المرحلة الابتدائية' : 'Mathematics - Primary'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-red-600/30 text-red-300 border border-red-500/40 font-semibold">
            {isAr ? 'نمط: دعم الطالب المتعثر' : 'Type: Supporting Struggling Students'}
          </span>
          {selectedOptId && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isAr ? 'إعادة التجربة' : 'Reset'}</span>
            </button>
          )}
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Scenario Description */}
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {isAr ? scenario.titleAr : scenario.titleEn}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            {isAr ? scenario.contextAr : scenario.contextEn}
          </p>
        </div>

        {/* Student Dialogue Bubble */}
        <div className="flex items-start gap-4 bg-red-50/60 border border-red-200/80 p-5 rounded-2xl">
          <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
            ط
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                {isAr ? 'الطالب عمر (الصف الخامس)' : 'Student Omar (Grade 5)'}
              </span>
              <span className="text-[10px] text-red-600 font-semibold bg-red-100 px-2 py-0.5 rounded-full">
                {isAr ? 'مفهوم خاطئ شائع' : 'Misconception'}
              </span>
            </div>
            <p className="text-sm sm:text-base font-medium text-slate-800 italic">
              "{isAr ? scenario.dialogueAr : scenario.dialogueEn}"
            </p>
          </div>
        </div>

        {/* Teacher Choices */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-900">
            {isAr ? 'اختر تدخلك التربوي الأنسب كمعلم متميز:' : 'Select Your Pedagogical Intervention:'}
          </label>

          <div className="space-y-2.5">
            {scenario.options.map((opt, idx) => {
              const isSelected = selectedOptId === opt.id;
              const isSubmitted = selectedOptId !== null;

              let borderClass = 'border-slate-200 hover:border-red-400 bg-white';
              if (isSelected) {
                borderClass = opt.isBest
                  ? 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-400'
                  : 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-400';
              } else if (isSubmitted && opt.isBest) {
                borderClass = 'border-emerald-300 bg-emerald-50/20';
              }

              return (
                <div
                  key={opt.id}
                  onClick={() => setSelectedOptId(opt.id)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${borderClass}`}
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

        {/* Immediate Feedback & Evaluation Card */}
        {selectedOption && evaluation && (
          <div className="mt-6 border-t-2 border-slate-100 pt-6 space-y-4 animate-in fade-in duration-300">
            {/* Student Reaction */}
            <div className="bg-slate-50 text-slate-900 border border-slate-200 p-4 rounded-xl flex items-start gap-3 shadow-2xs">
              <Award className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  {isAr ? 'رد فعل الطالب بعد تدخلك:' : 'Student Reaction to Your Response:'}
                </p>
                <p className="text-sm font-semibold text-slate-900 mt-1">
                  {isAr ? selectedOption.studentReactionAr : selectedOption.studentReactionEn}
                </p>
              </div>
            </div>

            {/* Pedagogical Rationale */}
            <div
              className={`p-5 rounded-xl border ${
                selectedOption.isBest
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {selectedOption.isBest ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  )}
                  <span className="font-bold text-sm">
                    {isAr ? evaluation.levelAr : evaluation.levelEn}
                  </span>
                </div>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-white/80 border shadow-2xs">
                  {isAr ? `التقييم: ${evaluation.score} / ١٠٠` : `Score: ${evaluation.score}/100`}
                </span>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed mt-2">
                <strong>{isAr ? 'التحليل التربوي: ' : 'Pedagogical Analysis: '}</strong>
                {isAr ? selectedOption.pedagogicalRationaleAr : selectedOption.pedagogicalRationaleEn}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
