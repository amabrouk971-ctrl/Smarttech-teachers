import React, { useState } from 'react';
import {
  Dna,
  Search,
  ExternalLink,
  Sparkles,
  BookOpen,
  Layers,
  FlaskConical,
  Award,
  Loader2,
} from 'lucide-react';

interface ScienceLabViewProps {
  lang: 'ar' | 'en';
}

const PRESET_BIOLOGY_TOPICS = [
  {
    id: 'hemoglobin',
    titleAr: 'الهيموجلوبين ونقل الأكسجين التعاوني',
    titleEn: 'Hemoglobin & Cooperative O2 Binding',
    uniprotId: 'P69905',
    pdbId: '1A3N',
    organism: 'Homo sapiens',
    conceptSummaryAr:
      'شرح كيف يؤدي ارتباط أول جزيء أكسجين بأحد مجموعات الهيم إلى إحداث تغيير تركيبي رباعي (Allosteric Transition) يرفع ألفة باقي الوحدات للأكسجين في الرئتين.',
    conceptSummaryEn:
      'Illustrates allosteric quaternary shift from T-state to R-state upon initial ligand binding, scaffolding biological cooperativity.',
    pedagogicalTipAr:
      'استخدم تشبيه الباب الدوار أو العربة الجماعية: ركوب الشخص الأول يسهل ركوب الباقين.',
    pedagogicalTipEn:
      'Use the revolving door analogy to teach allosteric transition without dense thermodynamic jargon.',
  },
  {
    id: 'cas9',
    titleAr: 'إنزيم كريسبر كاس٩ (CRISPR-Cas9 endonuclease)',
    titleEn: 'CRISPR-Cas9 Endonuclease Mechanism',
    uniprotId: 'Q99ZW2',
    pdbId: '4OO8',
    organism: 'Streptococcus pyogenes',
    conceptSummaryAr:
      'المقص الجزيئي للجينوم: كيف يتعرف الـ guide RNA على التسلسل التكميلي للـ DNA مستهدفاً موقع PAM لقطع الشريط المزدوج بدقة متناهية.',
    conceptSummaryEn:
      'Precision genome editing endonuclease directed by sgRNA: scaffolds the distinction between sequence recognition and catalytic cleavage.',
    pedagogicalTipAr:
      'اربط بين المفتاح والقفل ونظام البحث والاستبدال في معالج الكلمات لتوضيح دقة القطع الجيني.',
    pedagogicalTipEn:
      'Analogy with "Find and Replace" in a text editor illuminates how RNA guides the molecular scissors.',
  },
  {
    id: 'insulin',
    titleAr: 'هرمون الإنسولين وتنظيم جلوكوز الدم',
    titleEn: 'Human Insulin & Receptor Signaling',
    uniprotId: 'P01308',
    pdbId: '4INS',
    organism: 'Homo sapiens',
    conceptSummaryAr:
      'بنية السلسلتين A و B المرتبطتين بروابط ثنائي الكبريتيد (Disulfide Bonds)، وكيف ينشط مستقبلات التيروزين كينيز في الخلايا لإدخال الجلوكوز.',
    conceptSummaryEn:
      'Two-chain peptide hormone connected via disulfide bridges; triggers GLUT4 translocation upon receptor activation.',
    pedagogicalTipAr:
      'شبه الإنسولين بمفتاح الخزينة الذي يفتح بوابات الجدار الخلوي لدخول الوقود إلى مصانع الطاقة (الميتوكوندريا).',
    pedagogicalTipEn:
      'Key-card hotel room analogy clarifies signal transduction vs actual nutrient transport.',
  },
];

export const ScienceLabView: React.FC<ScienceLabViewProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [selectedTopic, setSelectedTopic] = useState(PRESET_BIOLOGY_TOPICS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearchUniProt = async () => {
    if (!searchQuery.trim() || isSearching) return;
    setIsSearching(true);
    try {
      const res = await fetch(`/api/science/protein?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data.results) {
        setSearchResults(data.results);
      }
    } catch (e) {
      console.error('UniProt search error', e);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold mb-2">
            <Dna className="w-3.5 h-3.5" />
            <span>DeepMind Science Skills & AlphaFold DB Integration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {isAr ? 'مختبر العلوم والبيولوجيا الجزيئية (Bioscience Studio)' : 'Bioscience & Science Teaching Laboratory'}
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-3xl">
            {isAr
              ? 'أدوات ونماذج تدريسية متقدمة لمعلمي الأحياء والعلوم والكيمياء الحيوية، مدعومة بقواعد بيانات البروتينات العالمية (UniProt, AlphaFold, PDB) لتبسيط المفاهيم الجزيئية المعقدة في الفصل الدراسي.'
              : 'Interactive molecular teaching aids for biology, chemistry, and STEM educators powered by UniProt, AlphaFold DB, and RCSB PDB.'}
          </p>
        </div>
      </div>

      {/* AlphaFold pLDDT Pedagogical Confidence Scale Bar (Skill Directive) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-red-600" />
            <span>{isAr ? 'مقياس الثقة الجزيئي (AlphaFold pLDDT Confidence Scale)' : 'AlphaFold pLDDT Structural Confidence Scale'}</span>
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            {isAr ? 'معيار تدريسي معتمد عالمياً' : 'Curriculum Standard Reference'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#0053D6] shrink-0" />
            <div>
              <p className="font-bold text-slate-900">&gt; 90 (Very High)</p>
              <p className="text-[10px] text-slate-600">{isAr ? 'ثقة بنيوية فائقة' : 'Very High Confidence'}</p>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#65CBF3] shrink-0" />
            <div>
              <p className="font-bold text-slate-900">70 - 90 (Confident)</p>
              <p className="text-[10px] text-slate-600">{isAr ? 'بنية مؤكدة ومستقرة' : 'Confident Backbone'}</p>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#FFDB13] shrink-0" />
            <div>
              <p className="font-bold text-slate-900">50 - 70 (Low)</p>
              <p className="text-[10px] text-slate-600">{isAr ? 'مرونة في التركيب' : 'Flexible Loop'}</p>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-200 flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#FF7D45] shrink-0" />
            <div>
              <p className="font-bold text-slate-900">&lt; 50 (Very Low)</p>
              <p className="text-[10px] text-slate-600">{isAr ? 'غير منتظم حركياً' : 'Intrinsically Disordered'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Concepts vs Live Search */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Preset Topics List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-red-600" />
            <span>{isAr ? 'نماذج ومفاهيم تدريسية جاهزة' : 'Curated Teaching Prototypes'}</span>
          </h2>

          <div className="space-y-3">
            {PRESET_BIOLOGY_TOPICS.map((topic) => {
              const isSelected = selectedTopic.id === topic.id;
              return (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-red-600 bg-red-50/60 shadow-xs ring-1 ring-red-600'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-xs font-bold text-slate-900">
                      {isAr ? topic.titleAr : topic.titleEn}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                      UniProt: {topic.uniprotId}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {isAr ? topic.conceptSummaryAr : topic.conceptSummaryEn}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Search Live UniProt */}
          <div className="border-t border-slate-100 pt-4 space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              {isAr ? 'ابحث عن أي بروتين في UniProtKB العالمي:' : 'Search Live UniProtKB Database:'}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchUniProt()}
                placeholder={isAr ? 'مثال: p53, insulin, actin...' : 'e.g. p53, hemoglobin, actin...'}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-red-600"
              />
              <button
                onClick={handleSearchUniProt}
                disabled={isSearching}
                className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer"
              >
                {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Concept Deep Dive & Pedagogy Card (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase mb-1">
                {selectedTopic.organism}
              </span>
              <h2 className="text-lg font-black text-slate-900">
                {isAr ? selectedTopic.titleAr : selectedTopic.titleEn}
              </h2>
            </div>

            {/* Authoritative Outbound Links (Skill Mandate) */}
            <div className="flex items-center gap-2">
              <a
                href={`https://alphafold.ebi.ac.uk/entry/${selectedTopic.uniprotId}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 transition-colors"
              >
                <span>AlphaFold 3D</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={`https://www.rcsb.org/structure/${selectedTopic.pdbId}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                <span>PDB {selectedTopic.pdbId}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Epistemic Provenance Badges (Skill Requirement) */}
          <div className="flex flex-wrap items-center gap-2 text-[10px]">
            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold">
              [Experimentally determined: X-Ray Crystallography]
            </span>
            <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold">
              [Predicted by AlphaFold DB]
            </span>
            <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold">
              [UniProt Curated]
            </span>
          </div>

          {/* Biological Explanation */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {isAr ? 'الأساس البيولوجي والمفاهيم العلمية:' : 'Biological Foundations:'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {isAr ? selectedTopic.conceptSummaryAr : selectedTopic.conceptSummaryEn}
            </p>
          </div>

          {/* Pedagogical Analogies and Scaffolding Strategy */}
          <div className="bg-red-50/70 p-5 rounded-xl border border-red-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-600" />
              <h3 className="text-xs font-bold text-red-950 uppercase tracking-wider">
                {isAr ? 'استراتيجية المعلم المتميز في الشرح الصفي:' : 'Master Teacher Pedagogical Strategy:'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              {isAr ? selectedTopic.pedagogicalTipAr : selectedTopic.pedagogicalTipEn}
            </p>
          </div>

          {/* Live search results if active */}
          {searchResults.length > 0 && (
            <div className="border-t border-slate-200 pt-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-900">
                {isAr ? 'نتائج البحث المباشر في UniProt:' : 'Live UniProt Search Results:'}
              </h4>
              <div className="space-y-2">
                {searchResults.map((entry, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{entry.proteinName}</span>
                      <span className="font-mono text-slate-500">{entry.primaryAccession}</span>
                    </div>
                    <p className="text-slate-600 line-clamp-1">{entry.functionComment}</p>
                    <div className="flex gap-2 pt-1">
                      <a href={entry.alphaFoldUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 text-[11px]">
                        <span>AlphaFold</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
