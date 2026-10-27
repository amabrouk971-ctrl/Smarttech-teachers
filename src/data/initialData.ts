export interface SubjectItem {
  id: string;
  nameAr: string;
  nameEn: string;
  category: string;
  icon: string;
  scenarioCount: number;
}

export interface StageItem {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
}

export interface ScenarioItem {
  id: string;
  subjectId: string;
  stageId: string;
  type:
    | 'start_lesson'
    | 'explain_concept'
    | 'check_understanding'
    | 'misconception'
    | 'struggling_student'
    | 'advanced_student'
    | 'assessment_feedback';
  titleAr: string;
  titleEn: string;
  contextAr: string;
  contextEn: string;
  studentPersona: string;
  dialogueAr: string;
  dialogueEn: string;
  options: {
    id: string;
    textAr: string;
    textEn: string;
    score: number;
    isBest: boolean;
    pedagogicalRationaleAr: string;
    pedagogicalRationaleEn: string;
    studentReactionAr: string;
    studentReactionEn: string;
  }[];
  pedagogyAdviceAr: string;
  pedagogyAdviceEn: string;
}

export interface ArticleItem {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  contentAr: string;
  contentEn: string;
  author: string;
  category: string;
  seoTitle: string;
  metaDescription: string;
  targetKeyword: string;
  tags: string[];
  status: 'published' | 'draft' | 'review' | 'scheduled';
  publishedAt: string;
  featuredImage: string;
  imageAlt: string;
}

export const INITIAL_SUBJECTS: SubjectItem[] = [
  { id: 'math', nameAr: 'الرياضيات', nameEn: 'Mathematics', category: 'STEM', icon: 'Calculator', scenarioCount: 18 },
  { id: 'arabic', nameAr: 'اللغة العربية والتربية الإسلامية', nameEn: 'Arabic Language', category: 'Languages', icon: 'BookOpen', scenarioCount: 15 },
  { id: 'english', nameAr: 'اللغة الإنجليزية', nameEn: 'English Language', category: 'Languages', icon: 'Languages', scenarioCount: 14 },
  { id: 'biology', nameAr: 'الأحياء والعلوم الحيوية (Bioscience)', nameEn: 'Biology & Bioscience', category: 'Science', icon: 'Dna', scenarioCount: 16 },
  { id: 'physics', nameAr: 'الفيزياء', nameEn: 'Physics', category: 'Science', icon: 'Zap', scenarioCount: 12 },
  { id: 'chemistry', nameAr: 'الكيمياء', nameEn: 'Chemistry', category: 'Science', icon: 'FlaskConical', scenarioCount: 13 },
  { id: 'science', nameAr: 'العلوم العامة', nameEn: 'General Science', category: 'Science', icon: 'Atom', scenarioCount: 14 },
  { id: 'cs_ai', nameAr: 'الحاسب الآلي والذكاء الاصطناعي', nameEn: 'Computer Science & AI', category: 'Technology', icon: 'Cpu', scenarioCount: 11 },
  { id: 'social', nameAr: 'الدراسات الاجتماعية والتاريخ', nameEn: 'History & Social Studies', category: 'Humanities', icon: 'Globe', scenarioCount: 10 },
];

export const INITIAL_STAGES: StageItem[] = [
  {
    id: 'kg',
    nameAr: 'رياض الأطفال والطفولة المبكرة',
    nameEn: 'Kindergarten & Early Years',
    descriptionAr: 'التركيز على التعلم باللعب، والتحفيز الحسي، وتأسيس مهارات التواصل الأولي.',
    descriptionEn: 'Focus on play-based learning, sensory stimulation, and early communication skills.',
  },
  {
    id: 'primary',
    nameAr: 'المرحلة الابتدائية',
    nameEn: 'Primary Education',
    descriptionAr: 'بناء المفاهيم التأسيسية، واستخدام النماذج البصرية المحسوسة، وتعزيز حب الاستطلاع.',
    descriptionEn: 'Building foundational concepts, hands-on manipulatives, and fostering curiosity.',
  },
  {
    id: 'preparatory',
    nameAr: 'المرحلة الإعدادية / المتوسطة',
    nameEn: 'Preparatory / Middle School',
    descriptionAr: 'الانتقال إلى التفكير المجرد، والعمل الجماعي، وربط المفاهيم بالتطبيقات الحياتية.',
    descriptionEn: 'Transitioning to abstract reasoning, collaborative projects, and real-world relevance.',
  },
  {
    id: 'secondary',
    nameAr: 'المرحلة الثانوية',
    nameEn: 'Secondary / High School',
    descriptionAr: 'التحليل النقدي، وحل المشكلات المعقدة، والتحضير للدراسة الجامعية والمهنية.',
    descriptionEn: 'Critical analysis, rigorous problem solving, and university/career readiness.',
  },
  {
    id: 'higher',
    nameAr: 'التعليم الجامعي والعالي',
    nameEn: 'University & Higher Education',
    descriptionAr: 'البحث المستقل، والتفكير الأكاديمي المتقدم، والمناظرات العلمية المتخصصة.',
    descriptionEn: 'Autonomous research, advanced pedagogical scaffolding, and scholarly inquiry.',
  },
];

export const INITIAL_SCENARIOS: ScenarioItem[] = [
  {
    id: 'math-frac-1',
    subjectId: 'math',
    stageId: 'primary',
    type: 'struggling_student',
    titleAr: 'شرح مفهوم جمع الكسور لطالب يواجه صعوبة في فهم المقامات المختلفة',
    titleEn: 'Explaining Unlike Fractions to a Struggling Student',
    contextAr: 'في حصة الرياضيات للصف الخامس الابتدائي، الطالب "عمر" يجمع (1/2 + 1/4) فيكتب الناتج (2/6)، معتقداً أنه يجب جمع البسط مع البسط والمقام مع المقام.',
    contextEn: 'In a 5th-grade math class, Omar adds (1/2 + 1/4) and writes (2/6), believing he should add numerators and denominators directly.',
    studentPersona: 'طالب متردد، يخاف من ارتكاب الأخطاء، لكنه يحب الرسوم التوضيحية.',
    dialogueAr: 'يا أستاذ، 1 زائد 1 يساوي 2، و2 زائد 4 يساوي 6، لماذا الناتج ليس 2/6؟ أليست هذه هي الطريقة الصحيحة للجمع؟',
    dialogueEn: 'Teacher, 1+1=2 and 2+4=6, why isn\'t the answer 2/6? Isn\'t that regular addition?',
    options: [
      {
        id: 'opt1',
        textAr: 'أحسنت في محاولة التفكير يا عمر، دعنا نرسم دائرة بيتزا ونقسم نصفها، ثم ربعها، لنرى كم قطعة لدينا معاً قبل الأرقام.',
        textEn: 'Great effort thinking it through Omar! Let\'s draw a pizza circle: shade half, then a quarter. Let\'s see the total slice visually first.',
        score: 95,
        isBest: true,
        pedagogicalRationaleAr: 'استراتيجية التجسيد البصري والتمثيل المحسوس تزيل الغموض المفاهيمي وتدعم المتعلم المتعثر دون إحباطه.',
        pedagogicalRationaleEn: 'Visual scaffolding addresses the underlying conceptual misconception without inducing shame.',
        studentReactionAr: 'ينتبه عمر باهتمام: "آه! نصف البيتزا فيه ربعين، إذن لدي ثلاثة أرباع!"',
        studentReactionEn: 'Omar lights up: "Oh! Half a pizza is two quarters, so I have three quarters!"',
      },
      {
        id: 'opt2',
        textAr: 'لا يا عمر، هذه قاعدة خاطئة! في الكسور يجب عليك توحيد المقامات أولاً ثم جمع البسط فقط.',
        textEn: 'No Omar, that is wrong! In fractions you must find the common denominator first and only add numerators.',
        score: 45,
        isBest: false,
        pedagogicalRationaleAr: 'إملاء القواعد الرياضية الجافة دون فهم الأساس المنطقي يزيد من قلق الطالب ويعيق التفكير الرياضي المستقل.',
        pedagogicalRationaleEn: 'Dictating rote rules without conceptual anchoring increases math anxiety.',
        studentReactionAr: 'يبدو عمر محبطاً ويحفظ القاعدة دون فهم حقيقي لسبب اختلاف المقامات.',
        studentReactionEn: 'Omar looks deflated and tries to memorize the formula blindly.',
      },
      {
        id: 'opt3',
        textAr: 'انظر إلى زميلك أحمد كيف حل المسألة في كراسته، واكتب مثله.',
        textEn: 'Look at how Ahmed solved it in his notebook and copy his steps.',
        score: 20,
        isBest: false,
        pedagogicalRationaleAr: 'المقارنة مع الأقران تدمر الدافعية الذاتية وتكرس الشعور بالعجز المكتسب لدى الطالب المتعثر.',
        pedagogicalRationaleEn: 'Peer comparison damages self-efficacy and reinforces learned helplessness.',
        studentReactionAr: 'يشعر عمر بالإحراج وينطوي على نفسه خلال بقية الحصة.',
        studentReactionEn: 'Omar feels embarrassed and withdraws from participation.',
      },
    ],
    pedagogyAdviceAr: 'الكسور تمثل نسباً وأجزاءً من كل، وليست أعداداً مجردة. استخدام النماذج البصرية مثل أشرطة الكسور أو البيتزا يحول التفكير من الحفظ الآلي إلى الاستيعاب المفاهيمي العميق.',
    pedagogyAdviceEn: 'Fractions represent relational parts of a whole. Visual representations bridge concrete intuition into formal symbolic manipulation.',
  },
  {
    id: 'bio-dna-1',
    subjectId: 'biology',
    stageId: 'secondary',
    type: 'explain_concept',
    titleAr: 'تفسير الارتباط الهيدروجيني في تضاعف الحمض النووي (DNA)',
    titleEn: 'Explaining Hydrogen Bonds in DNA Replication Fork',
    contextAr: 'طلاب المرحلة الثانوية يتساءلون لماذا تتكون الروابط الهيدروجينية بين القواعد النيتروجينية بدلاً من الروابط التساهمية القوية.',
    contextEn: 'High school students question why weak hydrogen bonds link DNA base pairs instead of strong covalent bonds.',
    studentPersona: 'طالب متفوق يطرح أسئلة عميقة حول الثبات الجزيئي للطفرات.',
    dialogueAr: 'يا أستاذ، إذا كان الـ DNA هو أهم جزيء يحفظ الصفات الوراثية، فلماذا تمسكه روابط هيدروجينية ضعيفة يسهل كسرها؟ أليس من المنطقي أن تكون روابط تساهمية قوية؟',
    dialogueEn: 'Teacher, if DNA is the most vital hereditary molecule, why is it held by weak hydrogen bonds? Wouldn\'t strong covalent bonds protect our genes better?',
    options: [
      {
        id: 'opt_b1',
        textAr: 'سؤال في منتهى الذكاء والعمق! تخيل لو أن كتابك الدراسي تم لحام صفحاته بالغراء القوي؛ كيف ستفتحه لتقرأ منه؟ الروابط الهيدروجينية تسمح لإنزيم الهليكيز بفتح الشريطين للقراءة والتضاعف ثم إغلاقهما بسهولة.',
        textEn: 'Brilliant scientific insight! Imagine if your textbook pages were welded together with superglue; how could you read it? Hydrogen bonds allow Helicase to unzip the strands for replication and zip them back with minimal energy.',
        score: 98,
        isBest: true,
        pedagogicalRationaleAr: 'توظيف التشبيه البيولوجي الوظيفي يربط بين البنية والوظيفة (Structure-Function Relationship) ويغذي الفضول العلمي لدى الطلاب المتفوقين.',
        pedagogicalRationaleEn: 'Functional analogy illuminates the core biological principle: structure determines molecular accessibility and function.',
        studentReactionAr: 'ينبهر الطالب بالتشبيه: "الآن فهمت تماماً! القوة في العمود الفقري، والسهولة في القراءة والتضاعف!"',
        studentReactionEn: 'The student grasps the duality: strength along the sugar-phosphate backbone, dynamic accessibility at base pairs.',
      },
      {
        id: 'opt_b2',
        textAr: 'لأن الروابط التساهمية تتطلب طاقة عالية جداً لتكوينها في الخلية، وهذا ما خلقه الله لحكمته.',
        textEn: 'Because covalent bonds require too much energy to synthesize in cells.',
        score: 55,
        isBest: false,
        pedagogicalRationaleAr: 'إجابة مبتورة تغفل الجانب الديناميكي لعمليات التعبير الجيني وتضاعف المادة الوراثية.',
        pedagogicalRationaleEn: 'Partially true thermodynamically but misses the dynamic regulatory imperative of transcription/replication.',
        studentReactionAr: 'يظل الطالب متسائلاً عن كيفية حدوث النسخ في الخلية.',
        studentReactionEn: 'Student remains puzzled about the enzymatic mechanics.',
      },
    ],
    pedagogyAdviceAr: 'في تدريس العلوم الحيوية (Bioscience)، اربط دائماً بين التركيب الجزيئي والوظيفة الفسيولوجية، واستخدم تشبيهات وظيفية من الحياة اليومية.',
    pedagogyAdviceEn: 'In Bioscience pedagogy, consistently link molecular architecture to physiological dynamics using functional physical models.',
  },
  {
    id: 'arabic-start-1',
    subjectId: 'arabic',
    stageId: 'preparatory',
    type: 'start_lesson',
    titleAr: 'تهيئة درس التمييز وأسماء الأعداد بطريقة مشوقة تثير التفكير',
    titleEn: 'Engaging Lesson Hook for Arabic Number Grammar',
    contextAr: 'الدرس يتناول قواعد تمييز العدد، وهو موضوع يشتكي الطلاب عادة من صعوبة قواعده وجفافه.',
    contextEn: 'Teaching Arabic numeric grammar rules, typically regarded by students as rigid or dry.',
    studentPersona: 'فصل مختلط يعاني من فتور الحماس في بداية الحصة.',
    dialogueAr: 'الطلاب جالسون بترقب هادئ وغير متفاعلين في بداية الحصة.',
    dialogueEn: 'Students are quiet and passive at the opening bell.',
    options: [
      {
        id: 'opt_ar1',
        textAr: 'أدخل الفصل ومعي ورقة متجر تجاري تحتوي على خطأ لغوي شائع: "اشتريت ٣ أقلام بـ ٥ جنيهاً!" وأسأل: من يكتشف الخطأ الذي كلّف صاحب المتجر سخرية الزبائن؟',
        textEn: 'I walk in holding a mock receipt with a famous grammar mistake: "Bought 3 pens for 5 Egyptian Pounds!" and ask who can spot the linguistic blunder.',
        score: 95,
        isBest: true,
        pedagogicalRationaleAr: 'مدخل التهيئة القائم على حل المشكلات الواقعية (Problem-Based Hook) يخلق تنافساً إيجابياً ويوضح أهمية القواعد في الحياة المعاصرة.',
        pedagogicalRationaleEn: 'A real-world problem-based hook triggers curiosity and anchors grammatical precision in everyday credibility.',
        studentReactionAr: 'يرتفع النشاط فجأة وتتسابق الأيدي للبحث عن سبب الخطأ اللغوي في الإيصال.',
        studentReactionEn: 'Engagement peaks as students compete to diagnose the store receipt mistake.',
      },
      {
        id: 'opt_ar2',
        textAr: 'افتحوا الكتاب صفحة ٤٥ واكتبوا العنوان: تمييز الأعداد من ٣ إلى ١٠ يخالف المعدود.',
        textEn: 'Open textbooks to page 45 and write down the title: Numbers 3-10 grammar rules.',
        score: 40,
        isBest: false,
        pedagogicalRationaleAr: 'التهيئة التقليدية الجامدة تقتل الشغف وتجعل المعلم هو الملقن الوحيد.',
        pedagogicalRationaleEn: 'Passive mechanical opening lowers dopamine and reinforces passive reception.',
        studentReactionAr: 'تنهدات خافتة ويكتب الطلاب بصمت دون دافع حقيقي.',
        studentReactionEn: 'Students sigh and write mechanically.',
      },
    ],
    pedagogyAdviceAr: 'بداية الحصة (Hook) هي مفتاح جذب الانتباه؛ تحويل القاعدة الجافة إلى موقف حياتي واقعي يرسخ المعنى في ذاكرة الطالب طويلة المدى.',
    pedagogyAdviceEn: 'The initial hook establishes mental readiness; converting dry rules into relatable real situations cements long-term retrieval.',
  },
];

export const INITIAL_ARTICLES: ArticleItem[] = [
  {
    id: 'art-1',
    slug: 'how-to-teach-mathematics',
    titleAr: 'كيف تدرّس الرياضيات بالفهم المفاهيمي وليس بالحفظ الآلي؟',
    titleEn: 'How to Teach Mathematics with Conceptual Understanding, Not Rote Memorization',
    excerptAr: 'دليل عملي للمعلمين للانتقال بالطلاب من حفظ القواعد والمعادلات إلى الاستيعاب البصري والمنطقي العميق للمفاهيم الرياضية.',
    excerptEn: 'A practical roadmap for teachers to shift students from memorizing formulas to deep visual and conceptual mastery of math.',
    contentAr: `## مقدمة: أزمة حفظ الرياضيات في فصولنا الدراسية

كثيراً ما نشهد في المدارس ظاهرة حفظ القوانين الرياضية دون إدراك حقيقي لسبب وجودها. حين يسأل الطالب: *"لماذا نقلب الكسر الثاني عند القسمة؟"*، غالباً ما يتلقى إجابة تقليدية: *"هذه هي القاعدة، احفظها لتنجح!"*. هذا الأسلوب يؤدي حتماً إلى ما يُعرف بـ **قلق الرياضيات (Math Anxiety)** وفقدان الشغف بالتفكير العلمي.

### ١. التدرج من المحسوس إلى شبه المحسوس إلى المجرد (CPA Approach)

أثبتت الأبحاث التربوية الحديثة في سنغافورة واليابان أن المعلم المتميز يبدأ دائماً بـ:
1. **المرحلة المحسوسة (Concrete):** استخدام أدوات حقيقية (مكعبات، أوراق مقطوعة، نماذج بصرية).
2. **المرحلة التصويرية (Pictorial):** رسم النماذج الشريطية، المخططات، والمساحات الهندسية.
3. **المرحلة المجردة (Abstract):** كتابة الأرقام والمعادلات والرموز الرياضية.

### ٢. معالجة المفاهيم الخاطئة الشائعة (Addressing Misconceptions)

بدلاً من معاقبة الخطأ، اعتبره فرصة ذهبية للتعلم. عندما يكتب الطالب:
\`1/2 + 1/3 = 2/5\`
لا تقل: "خطأ!"، بل اسأله: *"نصف الرغيف وثلثه، هل المجموع أقل من النصف؟ لأن 2/5 أقل من النصف!"*. هذا التفكير المقارن يُجبر الدماغ على إعادة تقييم المنطق.

### ٣. توظيف الذكاء الاصطناعي في ابتكار أمثلة حية

تتيح منصة **SmartTech Teacher Academy** للمعلمين إنشاء سيناريوهات تدريسية تفاعلية تتكيف مع مستوى الطالب، مما يساعد على تفريد التعليم وتقديم تغذية راجعة فورية.`,
    contentEn: `## Introduction: The Rote Learning Trap in Mathematics

Too often, mathematics is taught as an arbitrary series of procedures. When students ask why a formula works, traditional classrooms reply: "Just memorize the rule to pass the exam."

### 1. Concrete - Pictorial - Abstract (CPA) Scaffolding
Master teachers ground every abstract algorithm in physical models and pictorial representations before introducing algebraic symbols.

### 2. Treating Misconceptions as Learning Opportunities
Do not penalize intuitive errors; interrogate their premises through inquiry questioning.

### 3. Leveraging AI for Differentiated Practice
SmartTech Teacher Academy provides simulated classroom environments where teachers refine real-time questioning strategies.`,
    author: 'د. أحمد مبروك | SmartTech Training & Testing Center',
    category: 'الرياضيات والعلوم',
    seoTitle: 'استراتيجيات تدريس الرياضيات بالفهم المفاهيمي | دليل المعلم المتميز',
    metaDescription: 'دليل شامل لمعلمي الرياضيات لتطبيق استراتيجيات الفهم المفاهيمي ونموذج CPA ومعالجة المفاهيم الخاطئة بكفاءة وفق أحدث المعايير التربوية.',
    targetKeyword: 'تدريس الرياضيات',
    tags: ['الرياضيات', 'استراتيجيات التدريس', 'الفهم المفاهيمي', 'تطوير المعلمين'],
    status: 'published',
    publishedAt: '2026-10-20',
    featuredImage: '/assets/aistudio/3A46E16D-DC5E-49CB-85B3-B0F250169350_4ac16809.png',
    imageAlt: 'د. أحمد مبروك خبير تطوير المعلمين - دليل المعلم المتميز',
  },
  {
    id: 'art-2',
    slug: 'differentiated-instruction-strategies',
    titleAr: 'التعليم المتمايز: كيف تدير فصلاً دراسياً متعدد المستويات بنجاح؟',
    titleEn: 'Differentiated Instruction: Managing a Mixed-Ability Classroom Successfully',
    excerptAr: 'استراتيجيات واقعية تُمكّن المعلم من تلبية احتياجات الطلاب المتعثرين والموهوبين في نفس الحصة دون إرهاق ذهني.',
    excerptEn: 'Realistic classroom strategies allowing educators to meet the needs of struggling and advanced students simultaneously.',
    contentAr: `## كيف نتغلب على تحدي الفروق الفردية؟

في كل فصل دراسي يوجد الطالب الذي ينهي المهمة في دقيقتين ويشعر بالملل، والطالب الذي لا يزال عاجزاً عن فهم السؤال الأول. التعليم المتمايز ليس إعداد خطط درس منفصلة لكل طالب، بل هو مرونة في:
- **المحتوى (Content):** تقديم مصادر متعددة الصعوبة للمفهوم الواحد.
- **العمليات (Process):** تنويع أساليب المعالجة الفكرية (فردي، ثنائي، مجموعات).
- **المنتج (Product):** السماح للطالب بالتعبير عن فهمه بطرق متنوعة (عرض تقديمي، رسم تخطيطي، تقرير مكتوب).`,
    contentEn: `## Tackling Individual Differences Without Burnout
Differentiated instruction is not writing 30 lesson plans; it is providing flexible entry points across Content, Process, and Product.`,
    author: 'د. أحمد مبروك | SmartTech Training & Testing Center',
    category: 'استراتيجيات التدريس',
    seoTitle: 'استراتيجيات التعليم المتمايز في الفصول متعددة المستويات',
    metaDescription: 'تعلم كيف تطبق التعليم المتمايز في فصولك الدراسية لدعم الطلاب المتعثرين وتحفيز المتفوقين بأقل جهد وأعلى كفاءة.',
    targetKeyword: 'التعليم المتمايز',
    tags: ['التعليم المتمايز', 'إدارة الفصل', 'الفروق الفردية'],
    status: 'published',
    publishedAt: '2026-10-22',
    featuredImage: '/assets/aistudio/3A46E16D-DC5E-49CB-85B3-B0F250169350_4ac16809.png',
    imageAlt: 'استراتيجيات التدريس الحديثة - SmartTech',
  },
  {
    id: 'art-3',
    slug: 'handling-classroom-misconceptions',
    titleAr: 'المفاهيم الخاطئة لدى الطلاب: كيف نكتشفها ونعالجها علمياً؟',
    titleEn: 'Student Misconceptions: Scientific Detection and Pedagogical Remediation',
    excerptAr: 'دراسة تطبيقية لكيفية تحويل المفاهيم العلمية واللغوية الخاطئة الراسخة في أذهان الطلاب إلى نقاط ارتكاز للفهم الصحيح.',
    excerptEn: 'An applied study on turning deeply ingrained scientific and linguistic misconceptions into stepping stones for genuine understanding.',
    contentAr: `## لماذا يصعب محو المفهوم الخاطئ؟

المفاهيم الخاطئة ليست فراغاً في المعرفة، بل هي معرفة بديهية بنى عليها الطالب منطقه لسنوات. إذا لم يختبر الطالب تناقض منطقه بنفسه، فسوف يستمر الخطأ حتى بعد حفظ التعريف الصحيح.`,
    contentEn: `## Why Misconceptions Persist
Misconceptions are not ignorance; they are faulty intuitive models. Teachers must orchestrate cognitive conflict to allow students to restructure understanding.`,
    author: 'د. أحمد مبروك | SmartTech Training & Testing Center',
    category: 'علم النفس التربوي',
    seoTitle: 'كيف تعالج المفاهيم الخاطئة لدى الطلاب في الفصول الدراسية؟',
    metaDescription: 'دليل تطبيقي لمعالجة المفاهيم الخاطئة والبديهيات المغلوطة في تدريس العلوم والرياضيات واللغات بأساليب تربوية حديثة.',
    targetKeyword: 'المفاهيم الخاطئة',
    tags: ['المفاهيم الخاطئة', 'التقويم التكويني', 'علم النفس التربوي'],
    status: 'published',
    publishedAt: '2026-10-24',
    featuredImage: '/assets/aistudio/Asset_2_4787d13f.png',
    imageAlt: 'شعار SmartTech Training & Testing Center',
  },
];
