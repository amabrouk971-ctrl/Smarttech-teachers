import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  CreditCard,
  BookOpen,
  Newspaper,
  CheckCircle2,
  XCircle,
  Plus,
  Download,
  Server,
  Layers,
  Sparkles,
  BarChart3,
  Calendar,
} from 'lucide-react';
import { INITIAL_SUBJECTS, INITIAL_STAGES, INITIAL_SCENARIOS, INITIAL_ARTICLES } from '../data/initialData';

interface AdminViewProps {
  lang: 'ar' | 'en';
}

interface PendingPayment {
  id: string;
  userName: string;
  userEmail: string;
  planId: 'monthly' | 'annual';
  amountEgp: number;
  paymentMethod: string;
  referenceNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export const AdminView: React.FC<AdminViewProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'subjects' | 'cpanel'>('overview');

  // Payments queue state
  const [payments, setPayments] = useState<PendingPayment[]>([
    {
      id: 'pay-1',
      userName: 'أ. محمود السعيد',
      userEmail: 'mahmoud.teacher@example.com',
      planId: 'annual',
      amountEgp: 250,
      paymentMethod: 'InstaPay Egypt',
      referenceNumber: 'IP-20261027-8912',
      status: 'pending',
      submittedAt: '2026-10-27 10:15',
    },
    {
      id: 'pay-2',
      userName: 'أ. سارة عبد الرحمن',
      userEmail: 'sara.math@example.com',
      planId: 'monthly',
      amountEgp: 50,
      paymentMethod: 'Vodafone Cash',
      referenceNumber: 'VF-4412998',
      status: 'pending',
      submittedAt: '2026-10-27 11:30',
    },
  ]);

  // Subjects state for dynamic addition
  const [subjectsList, setSubjectsList] = useState(INITIAL_SUBJECTS);
  const [newSubjAr, setNewSubjAr] = useState('');
  const [newSubjEn, setNewSubjEn] = useState('');
  const [newSubjCat, setNewSubjCat] = useState('STEM');

  const handleApprovePayment = (id: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'approved' } : p))
    );
  };

  const handleRejectPayment = (id: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'rejected' } : p))
    );
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjAr.trim() || !newSubjEn.trim()) return;

    const newSubj = {
      id: `subj-${Date.now()}`,
      nameAr: newSubjAr.trim(),
      nameEn: newSubjEn.trim(),
      category: newSubjCat,
      icon: 'BookOpen',
      scenarioCount: 0,
    };

    setSubjectsList([...subjectsList, newSubj]);
    setNewSubjAr('');
    setNewSubjEn('');
  };

  const pendingCount = payments.filter((p) => p.status === 'pending').length;
  const approvedTotalRevenue = payments
    .filter((p) => p.status === 'approved')
    .reduce((sum, p) => sum + p.amountEgp, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SmartTech Teacher Academy Admin & CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {isAr ? 'لوحة الإدارة والتحكم في المحتوى والاشتراكات' : 'Administration & CMS Portal'}
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            {isAr
              ? 'إدارة المعلمين، اعتماد مدفوعات الاشتراكات، إضافة المواد والمراحل التعليمية بدون تعديل الكود، واستخراج حزمة نشر cPanel.'
              : 'Role-aware administration, manual payment approval, dynamic curriculum management, and cPanel deployment export.'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px">
        {[
          { id: 'overview', labelAr: 'نظرة عامة ومؤشرات', labelEn: 'Overview Metrics', icon: BarChart3 },
          { id: 'payments', labelAr: `مراجعة المدفوعات (${pendingCount})`, labelEn: `Payment Review (${pendingCount})`, icon: CreditCard },
          { id: 'subjects', labelAr: 'إدارة المواد والمراحل', labelEn: 'Curriculum Manager', icon: Layers },
          { id: 'cpanel', labelAr: 'نشر cPanel و MySQL', labelEn: 'cPanel Deployment', icon: Server },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'border-red-600 text-red-600 bg-red-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{isAr ? tab.labelAr : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs text-slate-500 font-bold uppercase">{isAr ? 'المعلمين المسجلين' : 'Registered Teachers'}</span>
              <p className="text-3xl font-black text-slate-950">248</p>
              <p className="text-xs text-emerald-600 font-medium">+{isAr ? '١٨ هذا الأسبوع' : '18 this week'}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs text-slate-500 font-bold uppercase">{isAr ? 'الاشتراكات النشطة' : 'Active Subscriptions'}</span>
              <p className="text-3xl font-black text-red-600">182</p>
              <p className="text-xs text-slate-500">{isAr ? 'منها 130 اشتراك سنوي' : '130 Annual Members'}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs text-slate-500 font-bold uppercase">{isAr ? 'المدفوعات المعلقة' : 'Pending Payment Reviews'}</span>
              <p className="text-3xl font-black text-amber-600">{pendingCount}</p>
              <p className="text-xs text-slate-500">{isAr ? 'تتطلب مراجعة واعتماد' : 'Awaiting verification'}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs text-slate-500 font-bold uppercase">{isAr ? 'سيناريوهات التدريس' : 'Active Scenarios'}</span>
              <p className="text-3xl font-black text-slate-950">{INITIAL_SCENARIOS.length * 4}</p>
              <p className="text-xs text-slate-500">{isAr ? 'عبر ٧ أنماط تأسيسية' : 'Across 7 foundational types'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Payments Review */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-200">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {isAr ? 'طابور مراجعة مدفوعات الاشتراكات (Manual Verification Queue)' : 'Subscription Payment Review Queue'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? 'يتطلب النظام التحقق البشري من إيصالات التحويل قبل تفعيل الحساب رسمياً.'
                  : 'Explicit verification of transaction receipts before granting subscription access.'}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-4 text-start">{isAr ? 'المعلم' : 'Teacher'}</th>
                  <th className="p-4 text-start">{isAr ? 'الخطة' : 'Plan'}</th>
                  <th className="p-4 text-start">{isAr ? 'المبلغ' : 'Amount'}</th>
                  <th className="p-4 text-start">{isAr ? 'طريقة الدفع' : 'Method'}</th>
                  <th className="p-4 text-start">{isAr ? 'رقم الإيصال / المرجع' : 'Reference'}</th>
                  <th className="p-4 text-start">{isAr ? 'الحالة' : 'Status'}</th>
                  <th className="p-4 text-center">{isAr ? 'الإجراء' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {payments.map((p) => {
                  const isPending = p.status === 'pending';
                  const isApproved = p.status === 'approved';
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-slate-900">{p.userName}</p>
                        <p className="text-[11px] text-slate-500">{p.userEmail}</p>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold uppercase text-[10px]">
                          {p.planId}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-slate-900">{p.amountEgp} ج.م</td>
                      <td className="p-4">{p.paymentMethod}</td>
                      <td className="p-4 font-mono font-bold text-red-600">{p.referenceNumber}</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            isApproved
                              ? 'bg-emerald-100 text-emerald-800'
                              : isPending
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        {isPending ? (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleApprovePayment(p.id)}
                              className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{isAr ? 'اعتماد' : 'Approve'}</span>
                            </button>
                            <button
                              onClick={() => handleRejectPayment(p.id)}
                              className="flex items-center gap-1 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>{isAr ? 'رفض' : 'Reject'}</span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Dynamic Subjects Manager */}
      {activeTab === 'subjects' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-red-600" />
              <span>{isAr ? 'إضافة مادة دراسية جديدة (بدون تعديل الكود)' : 'Add New Subject'}</span>
            </h2>

            <form onSubmit={handleAddSubject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'اسم المادة بالعربية *' : 'Subject Name (Arabic) *'}
                </label>
                <input
                  type="text"
                  required
                  value={newSubjAr}
                  onChange={(e) => setNewSubjAr(e.target.value)}
                  placeholder={isAr ? 'مثال: الفلسفة والمنطق' : 'e.g. Philosophy & Logic'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'اسم المادة بالإنجليزية *' : 'Subject Name (English) *'}
                </label>
                <input
                  type="text"
                  required
                  value={newSubjEn}
                  onChange={(e) => setNewSubjEn(e.target.value)}
                  placeholder="e.g. Philosophy & Logic"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'التصنيف' : 'Category'}
                </label>
                <select
                  value={newSubjCat}
                  onChange={(e) => setNewSubjCat(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                >
                  <option value="STEM">STEM & Science</option>
                  <option value="Languages">Languages</option>
                  <option value="Humanities">Humanities & Social</option>
                  <option value="Technology">Technology & AI</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                {isAr ? 'حفظ وإدراج المادة في الكتالوج' : 'Save Subject to Database'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              {isAr ? `قائمة المواد النشطة (${subjectsList.length})` : `Active Subjects (${subjectsList.length})`}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {subjectsList.map((s) => (
                <div key={s.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{s.nameAr}</p>
                    <p className="text-[10px] text-slate-500">{s.nameEn} • {s.category}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    نشط
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: cPanel & Production Deployment */}
      {activeTab === 'cpanel' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold mb-2">
              <Server className="w-3.5 h-3.5" />
              <span>Production Target: https://teaches.smart-courses.org</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {isAr ? 'حزمة نشر cPanel وخادم PHP / MySQL' : 'cPanel PHP / MySQL Deployment Package'}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              {isAr
                ? 'وفقاً لمتطلبات المشروع (البنود 13 و 14)، تم إعداد مخطط قاعدة البيانات الكامل لمخدمات MySQL 8.0 / MariaDB، والتعليمات الصارمة لنقل التطبيق إلى استضافة cPanel الخاصة بـ SmartTech.'
                : 'Complete SQL schema and configuration guides ready for cPanel MySQL hosting.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {isAr ? 'مخطط قاعدة البيانات (MySQL Schema):' : 'MySQL Database Schema:'}
              </h3>
              <p className="text-xs text-slate-600">
                {isAr
                  ? 'تم إنشاء الملف /database/schema.sql شاملاً جداول المستخدمين، السيناريوهات الـ ٧، المقالات، المدفوعات، وجلسات التدريب.'
                  : 'Contains complete tables for users, scenarios, articles, payments, and coaching plans.'}
              </p>
              <a
                href="/database/schema.sql"
                download="smarttech_schema.sql"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isAr ? 'تحميل ملف schema.sql' : 'Download schema.sql'}</span>
              </a>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {isAr ? 'خطوات تثبيت cPanel السريعة:' : 'cPanel Quick Steps:'}
              </h3>
              <ol className="text-xs text-slate-700 space-y-1 list-decimal list-inside leading-relaxed">
                <li>{isAr ? 'إنشاء قاعدة بيانات MySQL في معالج cPanel' : 'Create MySQL Database in cPanel Wizard'}</li>
                <li>{isAr ? 'استيراد schema.sql عبر phpMyAdmin' : 'Import schema.sql via phpMyAdmin'}</li>
                <li>{isAr ? 'رفع التطبيق وتفعيل شهادة SSL من AutoSSL' : 'Upload build & enable AutoSSL'}</li>
                <li>{isAr ? 'ضبط Cron Job لوكيل المحتوى الذكي' : 'Configure Cron Job for Content Agent'}</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
