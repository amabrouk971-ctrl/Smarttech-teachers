import React, { useState, useRef } from 'react';
import {
  Mic,
  Square,
  Volume2,
  Send,
  Loader2,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  RotateCcw,
} from 'lucide-react';

interface AiRoleplayViewProps {
  lang: 'ar' | 'en';
}

const PERSONAS = [
  { id: 'shy', nameAr: 'طالب خجول ومتردد', nameEn: 'Shy / Hesitant Student', icon: '🤫' },
  { id: 'distracted', nameAr: 'طالب مشتت الانتباه', nameEn: 'Distracted Student', icon: '⚡' },
  { id: 'struggling', nameAr: 'طالب متعثر في الفهم', nameEn: 'Struggling with Concept', icon: '🧩' },
  { id: 'advanced', nameAr: 'طالب متفوق وسريع الملل', nameEn: 'Gifted / Fast-Paced Student', icon: '🚀' },
  { id: 'resistant', nameAr: 'طالب يقاوم التوجيه والمساعدة', nameEn: 'Help-Resistant Student', icon: '🛡️' },
  { id: 'mixed', nameAr: 'فصل مختلط المستويات', nameEn: 'Mixed-Ability Group', icon: '👥' },
];

export const AiRoleplayView: React.FC<AiRoleplayViewProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [selectedPersona, setSelectedPersona] = useState(PERSONAS[2]);
  const [subject, setSubject] = useState('الرياضيات');
  const [stage, setStage] = useState('المرحلة الابتدائية');
  const [scenarioContext, setScenarioContext] = useState(
    'يشرح المعلم مفهوم النسبة المئوية، والطالب يربك بين النسبة المئوية والكسور العشرية.'
  );

  const [messages, setMessages] = useState<
    { role: 'teacher' | 'student'; text: string; audioBase64?: string }[]
  >([
    {
      role: 'student',
      text: isAr
        ? 'يا أستاذ، 50% يعني نصف، فلماذا 25% لا تعني ربعين؟ أنا لا أفهم الأرقام الكبيرة!'
        : 'Teacher, 50% is a half, so why isn\'t 25% two quarters? Big percentages confuse me!',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastEvaluation, setLastEvaluation] = useState<any | null>(null);

  // Audio recording state for gemini-3.5-transcribe
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // TTS audio playback
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const playAudio = (base64Audio: string) => {
    try {
      const audio = new Audio(`data:audio/wav;base64,${base64Audio}`);
      setIsPlayingAudio(true);
      audio.onended = () => setIsPlayingAudio(false);
      audio.onerror = () => setIsPlayingAudio(false);
      audio.play();
    } catch (e) {
      console.error('Audio playback error', e);
      setIsPlayingAudio(false);
    }
  };

  const synthesizeTts = async (textToSpeak: string) => {
    try {
      const res = await fetch('/api/ai/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToSpeak, speaker: 'Kore' }),
      });
      const data = await res.json();
      if (data.audioBase64) {
        playAudio(data.audioBase64);
        return data.audioBase64;
      }
    } catch (err) {
      console.warn('TTS request error', err);
    }
    return undefined;
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Data = (reader.result as string).split(',')[1];
          // Call gemini-3.5-transcribe
          setIsLoading(true);
          try {
            const res = await fetch('/api/ai/transcribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ audioBase64: base64Data, mimeType: 'audio/webm' }),
            });
            const data = await res.json();
            if (data.transcription) {
              setInputMessage(data.transcription);
            }
          } catch (e) {
            console.error('Transcription error', e);
          } finally {
            setIsLoading(false);
          }
        };
        // Stop media tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Microphone error', err);
      alert(isAr ? 'تعذر الوصول إلى الميكروفون' : 'Microphone access denied');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSendMessage = async () => {
    const textToSend = inputMessage.trim();
    if (!textToSend || isLoading) return;

    const newMessages = [...messages, { role: 'teacher' as const, text: textToSend }];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/roleplay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          persona: selectedPersona.nameAr,
          subject,
          stage,
          scenarioContext,
          conversationHistory: newMessages,
          teacherMessage: textToSend,
          language: lang,
        }),
      });

      const data = await res.json();
      if (data.studentReply) {
        // Trigger TTS
        const audioBase64 = await synthesizeTts(data.studentReply);

        setMessages((prev) => [
          ...prev,
          { role: 'student', text: data.studentReply, audioBase64 },
        ]);

        if (data.pedagogicalEvaluation) {
          setLastEvaluation(data.pedagogicalEvaluation);
        }
      }
    } catch (e) {
      console.error('Roleplay error', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold mb-2">
            <Mic className="w-3.5 h-3.5" />
            <span>gemini-3.8-flash-tts & gemini-3.5-transcribe</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {isAr ? 'المحاكاة الصوتية وتدريب التحدث الصفي' : 'Interactive Voice AI Roleplay Studio'}
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            {isAr
              ? 'تدرّب مع شخصيات طلاب افتراضية بصوتك، واحصل على تقييم فوري للوضوح والتعاطف وإدارة الموقف.'
              : 'Practice speaking with virtual student personas and receive instant pedagogical evaluations.'}
          </p>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                role: 'student',
                text: isAr ? 'يا أستاذ، لم أفهم لماذا الحل هكذا؟' : 'Teacher, why is the solution this way?',
              },
            ]);
            setLastEvaluation(null);
          }}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{isAr ? 'جلسة جديدة' : 'New Session'}</span>
        </button>
      </div>

      {/* Persona Selection Chips */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          {isAr ? 'اختر شخصية الطالب للمحاكاة:' : 'Select Student Persona:'}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {PERSONAS.map((p) => {
            const isSelected = selectedPersona.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPersona(p)}
                className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                  isSelected
                    ? 'border-red-600 bg-red-50/80 shadow-sm ring-1 ring-red-600'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="text-xl mb-1">{p.icon}</div>
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {isAr ? p.nameAr : p.nameEn}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Chat / Simulation Area (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[580px]">
          {/* Conversation Header */}
          <div className="bg-slate-100 text-slate-900 border-b border-slate-200 p-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-slate-900">{isAr ? selectedPersona.nameAr : selectedPersona.nameEn}</span>
              <span className="text-slate-500">({subject} - {stage})</span>
            </div>
            {isPlayingAudio && (
              <div className="flex items-center gap-1.5 text-red-600 font-semibold animate-pulse">
                <Volume2 className="w-4 h-4" />
                <span>{isAr ? 'تشغيل الصوت...' : 'Speaking...'}</span>
              </div>
            )}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, idx) => {
              const isTeacher = m.role === 'teacher';
              return (
                <div
                  key={idx}
                  className={`flex flex-col ${isTeacher ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mb-1 px-1">
                    <span>{isTeacher ? (isAr ? 'أنت (المعلم)' : 'You (Teacher)') : (isAr ? 'الطالب' : 'Student')}</span>
                  </div>
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                      isTeacher
                        ? 'bg-red-600 text-white rounded-tr-xs shadow-xs'
                        : 'bg-white text-slate-900 rounded-tl-xs border border-slate-200 shadow-xs'
                    }`}
                  >
                    <p>{m.text}</p>
                    {!isTeacher && (
                      <button
                        onClick={() => synthesizeTts(m.text)}
                        className="mt-2 flex items-center gap-1 text-[11px] text-slate-500 hover:text-red-600 font-medium cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isAr ? 'استمع للصوت (TTS)' : 'Listen (TTS)'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 p-2">
                <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                <span>{isAr ? 'الطالب يفكر في الرد...' : 'Student is reacting...'}</span>
              </div>
            )}
          </div>

          {/* Voice & Text Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={
                  isAr
                    ? 'تحدث أو اكتب ردك التربوي هنا...'
                    : 'Speak or type your teacher response here...'
                }
                className="flex-1 px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              />

              {/* Mic Record Button (gemini-3.5-transcribe) */}
              {isRecording ? (
                <button
                  onClick={handleStopRecording}
                  className="p-3 rounded-xl bg-red-600 text-white hover:bg-red-700 animate-pulse cursor-pointer"
                  title="إيقاف التسجيل وتحويل الصوت إلى نص"
                >
                  <Square className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleStartRecording}
                  className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  title="اضغط للتحدث بصوتك (gemini-3.5-transcribe)"
                >
                  <Mic className="w-4 h-4" />
                </button>
              )}

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="p-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
              <span>{isAr ? '🎙️ التسجيل الصوتي مدعوم بنموذج gemini-3.5-transcribe' : '🎙️ Audio powered by gemini-3.5-transcribe'}</span>
              <span>{isAr ? '🔊 النطق الصوتي مدعوم بنموذج gemini-3.8-flash-tts' : '🔊 TTS powered by gemini-3.8-flash-tts'}</span>
            </div>
          </div>
        </div>

        {/* Pedagogical Analysis & Rubric Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  {isAr ? 'التقييم التربوي اللحظي' : 'Real-Time Pedagogical Review'}
                </h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                AI Mentor
              </span>
            </div>

            {lastEvaluation ? (
              <div className="space-y-5 animate-in fade-in duration-300">
                {/* Metric Gauges */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <p className="text-[11px] text-slate-500 font-medium">
                      {isAr ? 'الوضوح المعرفي' : 'Clarity'}
                    </p>
                    <p className="text-lg font-black text-slate-900 mt-1">
                      {lastEvaluation.clarityScore}%
                    </p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <p className="text-[11px] text-slate-500 font-medium">
                      {isAr ? 'التعاطف والدعم' : 'Empathy'}
                    </p>
                    <p className="text-lg font-black text-red-600 mt-1">
                      {lastEvaluation.empathyScore}%
                    </p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <p className="text-[11px] text-slate-500 font-medium">
                      {isAr ? 'إيقاع التدخل' : 'Pacing'}
                    </p>
                    <p className="text-lg font-black text-slate-900 mt-1">
                      {lastEvaluation.pacingScore}%
                    </p>
                  </div>
                </div>

                {/* Strengths */}
                {lastEvaluation.strengths && (
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isAr ? 'نقاط القوة في ردك:' : 'Strengths observed:'}</span>
                    </p>
                    <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                      {lastEvaluation.strengths.map((s: string, i: number) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Growth Tip */}
                {lastEvaluation.growthTip && (
                  <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 space-y-1">
                    <p className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
                      <span>{isAr ? 'توصية للتطوير:' : 'Growth Recommendation:'}</span>
                    </p>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      {lastEvaluation.growthTip}
                    </p>
                  </div>
                )}

                {/* Suggested Alternative */}
                {lastEvaluation.suggestedAlternative && (
                  <div className="bg-red-50 text-slate-900 border border-red-200 p-4 rounded-xl space-y-1 shadow-2xs">
                    <p className="text-xs font-bold text-red-700">
                      {isAr ? 'صيغة بديلة مقترحة من خبير التطوير:' : 'Suggested Expert Phrasing:'}
                    </p>
                    <p className="text-xs text-slate-800 italic leading-relaxed font-medium">
                      "{lastEvaluation.suggestedAlternative}"
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <HelpCircle className="w-10 h-10 mx-auto text-slate-300" />
                <p className="text-xs">
                  {isAr
                    ? 'ابدأ التحدث أو الكتابة مع الطالب لتوليد تقييم تربوي فوري لتفاعلك.'
                    : 'Start speaking or typing to generate live pedagogical scoring.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
