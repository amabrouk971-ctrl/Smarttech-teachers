/**
 * Generator script for the complete 15-lesson SmartTech ELT curriculum
 * 3 modules x 5 lessons each = 15 lessons
 * Produces src/data/curriculumData.ts
 */

import fs from 'fs';
import path from 'path';

const content = `/**
 * Authoritative English Language Teaching (ELT) Curriculum
 * SmartTech English for Teachers — teaches.smart-courses.org
 * Based on CEFR (A1-B2), Cambridge CELTA/DELTA standards,
 * Jim Scrivener ("Learning Teaching"), and Jeremy Harmer ("The Practice of English Language Teaching").
 */

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2';

export interface VocabularyItem {
  wordEn: string;
  phonetic: string;
  meaningAr: string;
  exampleEn: string;
  exampleAr: string;
}

export interface GrammarNote {
  topicEn: string;
  topicAr: string;
  ruleEn: string;
  ruleAr: string;
  tip: string;
}

export interface CommonMistake {
  incorrect: string;
  correct: string;
  explanationEn: string;
  explanationAr: string;
}

export interface RubricDescriptor {
  three: string;
  two: string;
  one: string;
}

export interface AssignmentRubric {
  criteria: string;
  criteriaAr: string;
  maxPoints: number;
  descriptors: RubricDescriptor;
}

export interface LessonAssignment {
  titleEn: string;
  titleAr: string;
  instructionsEn: string;
  instructionsAr: string;
  rubrics: AssignmentRubric[];
}

export interface ExpressionItem {
  id: string;
  english: string;
  arabic: string;
  phoneticTip?: string;
  pedagogicalNoteEn: string;
  pedagogicalNoteAr: string;
  category: 'instruction' | 'questioning' | 'management' | 'feedback' | 'transition';
}

export interface DialogueLine {
  speaker: 'Teacher' | 'Student' | 'Class' | 'Student A' | 'Student B';
  speakerAr: string;
  en: string;
  ar: string;
  note?: string;
}

export interface QuizOption {
  id: string;
  textEn: string;
  textAr: string;
  isCorrect: boolean;
}

export interface ExerciseItem {
  id: string;
  promptEn: string;
  promptAr: string;
  contextEn: string;
  contextAr: string;
  options: QuizOption[];
  explanationEn: string;
  explanationAr: string;
  sourceReference: string;
}

export interface ResearchCitation {
  author: string;
  work: string;
  year: string;
  url?: string;
  keyTakeaway: string;
}

export interface LessonItem {
  id: string;
  number: string;
  slug: string;
  cefr: CEFRLevel;
  durationMin: number;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  objectivesEn: string[];
  objectivesAr: string[];
  pedagogicalOverviewEn: string;
  pedagogicalOverviewAr: string;
  vocabulary: VocabularyItem[];
  grammarNotes: GrammarNote[];
  expressions: ExpressionItem[];
  dialogue: DialogueLine[];
  exercises: ExerciseItem[];
  commonMistakes: CommonMistake[];
  assignment: LessonAssignment;
  researchCitations: ResearchCitation[];
}

export interface CurriculumModule {
  id: string;
  number: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  color: string;
  cefrRange: string;
  lessons: LessonItem[];
}

export const CURRICULUM_MODULES: CurriculumModule[] = [
  // ==========================================
  // MODULE 1: Classroom Routines & Instructions (A1–B1)
  // ==========================================
  {
    id: 'mod-1',
    number: 1,
    titleEn: 'Essential English for Classroom Instructions',
    titleAr: 'اللغة الإنجليزية الأساسية لإعطاء التعليمات الصفية',
    cefrRange: 'A1–B1',
    descriptionEn: 'Master crisp classroom routines, imperative staging, instruction-checking questions (ICQs), and smooth lesson transitions to maximize student talk time.',
    descriptionAr: 'إتقان الروتين الصفي وصياغة التعليمات المباشرة وأسئلة التحقق (ICQs) والانتقالات السلسة لتقليل وقت حديث المعلم ومضاعفة تحدث الطلاب.',
    color: '#E50914',
    lessons: [
      // 1.1 Greeting & Attendance
      {
        id: 'les-1-1',
        number: '1.1',
        slug: 'greeting-attendance',
        cefr: 'A1',
        durationMin: 15,
        titleEn: 'Greeting & Attendance',
        titleAr: 'التحية وتفقد الحضور والغياب',
        subtitleEn: 'Establishing positive rapport and efficient roll-call routines in English',
        subtitleAr: 'بناء الألفة الإيجابية وتطبيق روتين تفقد الحضور باللغة الإنجليزية',
        objectivesEn: [
          'Greet the classroom warmly using diverse time-appropriate expressions.',
          'Conduct attendance roll-call efficiently without losing class momentum.',
          'Establish English as the primary medium of communication from the very first minute.',
        ],
        objectivesAr: [
          'تحية الطلاب بحفاوة باستخدام عبارات متنوعة تناسب وقت الحصة.',
          'إجراء تفقد الحضور والغياب بسلاسة دون هدر وقت الحصة.',
          'ترسيخ اللغة الإنجليزية كلغة تواصل وحيدة منذ الدقيقة الأولى.',
        ],
        pedagogicalOverviewEn: 'Starting the lesson decisively in English sets the cognitive tone. Jeremy Harmer emphasizes that the first two minutes establish classroom authority and mutual rapport. Avoid greeting in Arabic; use welcoming body language and predictable greeting patterns.',
        pedagogicalOverviewAr: 'بداية الحصة بالحزم والود باللغة الإنجليزية يحدد المسار اللغوي للحصة بأكملها. يوضح جيريمي هارمر أن أول دقيقتين تبنيان الألفة والسلطة التربوية. تجنب التحدث بالعربية واستخدم لغة جسد مرحبة مع روتين تفقد حضور سريع.',
        vocabulary: [
          { wordEn: 'roll call', phonetic: '/ˈroʊl ˌkɔːl/', meaningAr: 'تفقد الحضور والغياب', exampleEn: "Let's quickly do the roll call.", exampleAr: 'دعونا نأخذ تفقد الحضور سريعاً.' },
          { wordEn: 'absent', phonetic: '/ˈæb.sənt/', meaningAr: 'غائب', exampleEn: 'Who is absent today?', exampleAr: 'من الغائب اليوم؟' },
          { wordEn: 'present', phonetic: '/ˈprez.ənt/', meaningAr: 'حاضر', exampleEn: 'Please say "present" when I call your name.', exampleAr: 'رجاءً قولوا "حاضر" عند مناداة أسمائكم.' },
          { wordEn: 'settle down', phonetic: '/ˈset.əl daʊn/', meaningAr: 'اهدأوا واستقروا في مقاعدكم', exampleEn: 'Settle down everyone, take your seats.', exampleAr: 'اهدأوا جميعاً واجلسوا في أماكنكم.' },
        ],
        grammarNotes: [
          {
            topicEn: 'Imperatives for Class Routines',
            topicAr: 'صيغة الأمر المباشر لروتين الفصل',
            ruleEn: 'Use bare infinitive without subject pronouns (e.g. "Take your seats" instead of "You should take your seats").',
            ruleAr: 'استخدم مصدر الفعل المجرد دون ضمائر الفاعل للحصول على تعليمات واضحة وسريعة.',
            tip: 'Keep intonation warm and falling to sound firm yet encouraging.',
          },
        ],
        expressions: [
          {
            id: 'exp-1-1-1',
            english: 'Good morning everyone! Please take your seats and get ready.',
            arabic: 'صباح الخير جميعاً! رجاءً اجلسوا في مقاعدكم واستعدوا.',
            phoneticTip: '/ɡʊd ˈmɔːr.nɪŋ ˈev.ri.wʌn/',
            pedagogicalNoteEn: 'Warm whole-class greeting establishing readiness.',
            pedagogicalNoteAr: 'تحية ترحيبية جامعة تنبه الطلاب لبدء الحصة.',
            category: 'instruction',
          },
          {
            id: 'exp-1-1-2',
            english: 'Who is absent today? Is anyone missing from this row?',
            arabic: 'من الغائب اليوم؟ هل ينقصنا أحد في هذا الصف؟',
            phoneticTip: '/huː ɪz ˈæb.sənt təˈdeɪ/',
            pedagogicalNoteEn: 'Peer-involved attendance check saving teacher time.',
            pedagogicalNoteAr: 'تفقد الحضور بمشاركة الزملاء لاختصار الوقت.',
            category: 'questioning',
          },
          {
            id: 'exp-1-1-3',
            english: 'Glad to see you all back. How was your weekend, Sarah?',
            arabic: 'سعيد برؤيتكم جميعاً من جديد. كيف كانت عطلة نهاية الأسبوع يا سارة؟',
            phoneticTip: '/ɡlæd tuː siː juː ɔːl bæk/',
            pedagogicalNoteEn: 'Micro-rapport builder before diving into formal content.',
            pedagogicalNoteAr: 'بناء جسر تواصل إنساني وسريع قبل بدء المحتوى الأكاديمي.',
            category: 'transition',
          },
        ],
        dialogue: [
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Good morning class! Settle down and take your seats, please.', ar: 'صباح الخير يا طلاب! اهدأوا واجلسوا في أماكنكم من فضلكم.' },
          { speaker: 'Class', speakerAr: 'الفصل', en: 'Good morning, Mr. Ahmed!', ar: 'صباح الخير يا أستاذ أحمد!' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Wonderful. Let us take attendance quickly. Ziad?', ar: 'رائع. دعونا نأخذ الحضور سريعاً. زياد؟' },
          { speaker: 'Student', speakerAr: 'طالب', en: 'Present, teacher!', ar: 'حاضر يا أستاذ!' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Laila? Has anyone seen Laila this morning?', ar: 'ليلى؟ هل رأى أحد ليلى هذا الصباح؟' },
          { speaker: 'Student', speakerAr: 'طالب', en: 'She is absent today, she has a cold.', ar: 'إنها غائبة اليوم، أصيبت بنزلة برد.' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'I hope she gets well soon. Now everyone, books closed, eyes on the board!', ar: 'أتمنى لها الشفاء العاجل. والآن جميعاً، الكتب مغلقة، وعيونكم على السبورة!' },
        ],
        exercises: [
          {
            id: 'ex-1-1-1',
            promptEn: 'Which phrase is the most natural and efficient way to begin attendance in an English classroom?',
            promptAr: 'أي العبارات التالية هي الأكثر طبيعية وكفاءة لبدء تفقد الحضور في الفصل باللغة الإنجليزية؟',
            contextEn: 'You enter the room and need to check who is present within 60 seconds.',
            contextAr: 'دخلت الفصل وتريد التحقق من الحضور في غضون دقيقة واحدة.',
            options: [
              { id: 'opt-1', textEn: 'Who is not coming today to school?', textAr: 'من لم يأت اليوم للمدرسة؟', isCorrect: false },
              { id: 'opt-2', textEn: 'Let’s quickly take the roll call. Please say "present" when you hear your name.', textAr: 'دعونا نأخذ تفقد الحضور سريعاً. رجاءً قولوا "حاضر" عند سماع أسمائكم.', isCorrect: true },
              { id: 'opt-3', textEn: 'Write your names on a paper and give it to me now.', textAr: 'اكتبوا أسمائكم في ورقة وسلموها لي الآن.', isCorrect: false },
              { id: 'opt-4', textEn: 'Are all of you present here today or not?', textAr: 'هل كلكم حاضرون هنا اليوم أم لا؟', isCorrect: false },
            ],
            explanationEn: 'Saying "Let’s quickly take the roll call. Please say present..." is standard pedagogical English and gives immediate operational clarity.',
            explanationAr: 'عبارة "Let’s quickly take the roll call..." هي الصيغة التربوية المعيارية وتحدد بوضوح الاستجابة المطلوبة من الطلاب.',
            sourceReference: 'Jim Scrivener, Classroom Management Techniques (Cambridge, 2012)',
          },
        ],
        commonMistakes: [
          {
            incorrect: 'Who is absent today from the boys?',
            correct: 'Who is absent today?',
            explanationEn: 'Avoid awkward redundant prepositions; keep the inquiry concise.',
            explanationAr: 'تجنب صياغة الأسئلة الطويلة أو المترجمة حرفياً من العامية.',
          },
        ],
        assignment: {
          titleEn: 'Morning Routine Audio Recording',
          titleAr: 'تسجيل صوتي لروتين افتتاح الحصة وتفقد الحضور',
          instructionsEn: 'Record a 60-second audio clip greeting an imaginary grade 7 class, settling them down, and checking attendance using at least 3 taught phrases.',
          instructionsAr: 'سجل مقطعاً صوتياً مدته 60 ثانية تحيي فيه فصلاً افتراضياً وتضبط هدوءهم وتتفقد الحضور باستخدام 3 عبارات على الأقل من الدرس.',
          rubrics: [
            {
              criteria: 'Pacing & Tone',
              criteriaAr: 'النبرة والسرعة والإيقاع',
              maxPoints: 3,
              descriptors: {
                three: 'Natural, warm, authoritative, well-paced with clear pauses.',
                two: 'Clear but slightly hesitant or overly fast.',
                one: 'Monotone, unclear, or rushed.',
              },
            },
            {
              criteria: 'Classroom Accuracy',
              criteriaAr: 'دقة العبارات التربوية الإنجليزية',
              maxPoints: 3,
              descriptors: {
                three: 'Flawless imperative structures and accurate vocabulary.',
                two: 'Minor grammatical slip that does not impede comprehension.',
                one: 'Frequent phrasing errors or reliance on literal translation.',
              },
            },
          ],
        },
        researchCitations: [
          {
            author: 'Jeremy Harmer',
            work: 'The Practice of English Language Teaching (5th Edition)',
            year: '2015',
            keyTakeaway: 'The beginning of the lesson creates the psychological climate for learning.',
          },
        ],
      },

      // 1.2 Giving Instructions
      {
        id: 'les-1-2',
        number: '1.2',
        slug: 'giving-instructions',
        cefr: 'A2',
        durationMin: 20,
        titleEn: 'Giving Instructions',
        titleAr: 'إعطاء التعليمات الصفية المباشرة والمرحلية',
        subtitleEn: 'Scrivener’s staged instruction model and minimizing Teacher Talking Time (TTT)',
        subtitleAr: 'نموذج سكريـفنـر للمراحل المتسلسلة وتقليل وقت حديث المعلم الزائد',
        objectivesEn: [
          'Deliver clear, step-by-step instructions before distributing any worksheets.',
          'Eliminate redundant discourse markers ("Now what I would like you to do is...").',
          'Use physical gesturing and visual anchoring alongside concise imperative verbs.',
        ],
        objectivesAr: [
          'تقديم تعليمات واضحة متدرجة خطوة بخطوة قبل توزيع أوراق العمل.',
          'التخلص من الحشو اللغوي غير الضروري في صياغة الأوامر الصفية.',
          'توظيف الإيماءات الجسدية والإشارات البصرية مع أفعال الأمر المباشرة.',
        ],
        pedagogicalOverviewEn: 'Research shows over 70% of classroom confusion stems from instructions delivered while students are distracted by papers. Always secure eye contact, state the instruction in 10 words or fewer, verify understanding, and only then hand out tasks.',
        pedagogicalOverviewAr: 'تشير الدراسات إلى أن أكثر من 70% من ارتباك الطلاب ينشأ عند إعطاء التعليمات أثناء تصفح الطلاب للأوراق. احرص دائماً على جذب النظرات، وقدم التعليمة في أقل من 10 كلمات، ثم وزع المهام.',
        vocabulary: [
          { wordEn: 'in pairs', phonetic: '/ɪn ˈpeərz/', meaningAr: 'في أزواج / كل اثنين معاً', exampleEn: 'Work in pairs with your shoulder partner.', exampleAr: 'اعملوا في أزواج مع زميلكم المجاور.' },
          { wordEn: 'hand out', phonetic: '/hænd aʊt/', meaningAr: 'يوزّع أوراقاً أو أدوات', exampleEn: 'Please help me hand out the worksheets.', exampleAr: 'من فضلك ساعدني في توزيع أوراق العمل.' },
          { wordEn: 'underline', phonetic: '/ˌʌn.dəˈlaɪn/', meaningAr: 'يضع خطاً تحت', exampleEn: 'Underline all action verbs in paragraph one.', exampleAr: 'ضعوا خطاً تحت جميع أفعال الحركة في الفقرة الأولى.' },
          { wordEn: 'time limit', phonetic: '/ˈtaɪm ˌlɪm.ɪt/', meaningAr: 'المهلة الزمنية المحددة', exampleEn: 'You have a three-minute time limit.', exampleAr: 'لديكم مهلة زمنية قدرها ثلاث دقائق.' },
        ],
        grammarNotes: [
          {
            topicEn: 'Sequencing Connectors for Instructions',
            topicAr: 'روابط التسلسل الزمني للتعليمات',
            ruleEn: 'Use First, Next, Then, Finally to break complex multi-step tasks into digestible chunks.',
            ruleAr: 'استخدم First, Next, Then, Finally لتقسيم المهام المعقدة إلى مراحل مفهومة للطلاب.',
            tip: 'Number each step on the board visually so visual learners stay anchored.',
          },
        ],
        expressions: [
          {
            id: 'exp-1-2-1',
            english: 'First, read silently. Next, compare with your partner. You have three minutes.',
            arabic: 'أولاً، اقرأوا بصمت. ثانياً، قارنوا مع زميلكم. لديكم ثلاث دقائق.',
            phoneticTip: '/fɜːrst riːd ˈsaɪ.lənt.li/',
            pedagogicalNoteEn: 'Sequenced 3-part instruction with explicit time parameter.',
            pedagogicalNoteAr: 'تعليمة ثلاثية مرحلية مع تحديد صارم ومطمئن للوقت.',
            category: 'instruction',
          },
          {
            id: 'exp-1-2-2',
            english: 'Do not write yet. Just listen to the recording.',
            arabic: 'لا تكتبوا بعد. استمعوا فقط إلى المقطع الصوتي.',
            phoneticTip: '/duː nɒt raɪt jɛt/',
            pedagogicalNoteEn: 'Negative constraint preventing premature task execution.',
            pedagogicalNoteAr: 'تنبيه استباقي يمنع انصراف الطلاب للكتابة قبل الاستماع.',
            category: 'instruction',
          },
          {
            id: 'exp-1-2-3',
            english: 'Turn to page 42, exercise 3. Pens down until I say go.',
            arabic: 'افتحوا صفحة 42، التمرين 3. ضعوا الأقلام جانباً حتى أعطي إشارة البدء.',
            phoneticTip: '/tɜːrn tuː peɪdʒ fɔːr.ti tuː/',
            pedagogicalNoteEn: 'Pre-task physical constraint maintaining collective attention.',
            pedagogicalNoteAr: 'توجيه جسدي (وضع الأقلام) يضمن استماع الجميع قبل التنفيذ.',
            category: 'management',
          },
        ],
        dialogue: [
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Eyes up front, pens on your desks, please.', ar: 'انظروا للأمام، وضعوا الأقلام على المكاتب من فضلكم.' },
          { speaker: 'Class', speakerAr: 'الفصل', en: '(Silence, students look at the teacher)', ar: '(صمت، وينظر الطلاب إلى المعلم)' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Open page 24. Exercise B. You will work in pairs. Underline the past verbs. Three minutes. Go!', ar: 'افتحوا صفحة 24. تمرين B. ستعملون في أزواج. ضعوا خطاً تحت أفعال الماضي. ثلاث دقائق. ابدأوا!' },
          { speaker: 'Student A', speakerAr: 'طالب أ', en: 'Teacher, do we write the meanings?', ar: 'أستاذ، هل نكتب المعاني؟' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'No, only underline the verbs. Start now!', ar: 'كلا، فقط ضعوا خطاً تحت الأفعال. ابدأوا الآن!' },
        ],
        exercises: [
          {
            id: 'ex-1-2-1',
            promptEn: 'Which instruction is the most effective in reducing confusion according to CELTA standards?',
            promptAr: 'أي التعليمات التالية هي الأكثر فاعلية في القضاء على الارتباك وفق معايير CELTA؟',
            contextEn: 'You want students to read a text and answer 3 questions in pairs.',
            contextAr: 'تريد من الطلاب قراءة نص والإجابة عن 3 أسئلة في أزواج.',
            options: [
              { id: 'opt-1', textEn: 'Now guys I think you should probably read page 20 and talk to your friend about question 1, 2, 3 if you have time.', textAr: 'صياغة مطولة ومترددة مليئة بالحشو اللغوي.', isCorrect: false },
              { id: 'opt-2', textEn: 'Step 1: Read page 20 alone. Step 2: Answer questions 1 to 3 with your partner. Four minutes. Start!', textAr: 'خطوة 1: اقرأوا بمفردكم. خطوة 2: أجيبوا مع زميلكم. أربع دقائق. ابدأوا!', isCorrect: true },
              { id: 'opt-3', textEn: 'Who wants to read page 20 and do some work together right now?', textAr: 'من يحب أن يقرأ صفحة 20 ويعمل سوياً؟', isCorrect: false },
              { id: 'opt-4', textEn: 'Look at the book and answer.', textAr: 'انظروا للكتاب وأجيبوا.', isCorrect: false },
            ],
            explanationEn: 'Numbered stages with explicit action verbs and a clear time limit remove cognitive overload.',
            explanationAr: 'ترقيم المراحل وتحديد مدة زمنية محددة يزيل التشتت الذهني ويوضح المطلوب بدقة متناهية.',
            sourceReference: 'Jim Scrivener, Learning Teaching (Macmillan, 2011)',
          },
        ],
        commonMistakes: [
          {
            incorrect: 'I would like you to open your books and try to read if you can.',
            correct: 'Open your books to page 15. Read paragraph 1.',
            explanationEn: 'Polite conditionals ("I would like you to...") weaken classroom control and confuse lower-level learners.',
            explanationAr: 'استخدام أسلوب التمني المطول يربك طلاب المستويات التأسيسية. استخدم صيغة الأمر المباشر والمحترم.',
          },
        ],
        assignment: {
          titleEn: 'Instruction Staging Blueprint',
          titleAr: 'مخطط صياغة التعليمات المرحلية',
          instructionsEn: 'Write the exact script of instructions you would deliver for a 5-minute reading comprehension activity in no more than 4 bullet points.',
          instructionsAr: 'اكتب النص الحرفي للتعليمات التي ستلقيها لنشاط قراءة مدته 5 دقائق في موعد أقصاه 4 نقاط مختصرة.',
          rubrics: [
            {
              criteria: 'Brevity and Precision',
              criteriaAr: 'الإيجاز والدقة',
              maxPoints: 3,
              descriptors: {
                three: 'Under 10 words per stage, zero redundant phrases.',
                two: 'Brief but contains one redundant phrase.',
                one: 'Overly conversational and rambles.',
              },
            },
          ],
        },
        researchCitations: [
          {
            author: 'Jim Scrivener',
            work: 'Learning Teaching (3rd Edition)',
            year: '2011',
            keyTakeaway: 'Effective instructions are planned as carefully as lesson language items.',
          },
        ],
      },

      // 1.3 Explaining Tasks
      {
        id: 'les-1-3',
        number: '1.3',
        slug: 'explaining-tasks',
        cefr: 'A2',
        durationMin: 15,
        titleEn: 'Explaining Tasks',
        titleAr: 'شرح المهام والأنشطة التفاعلية',
        subtitleEn: 'Modeling activities by demonstration rather than verbal monologue',
        subtitleAr: 'نمذجة الأنشطة بالتطبيق العملي الملموس بدلاً من الشرح النظري الطويل',
        objectivesEn: [
          'Model communicative tasks with an able student before initiating group work.',
          'Demonstrate expected output format on the board using clear worked examples.',
          'Prevent student panic when introducing novel exercise typologies.',
        ],
        objectivesAr: [
          'نمذجة النشاط التواصلي مع طالب متطوع أمام الفصل قبل بدء العمل الجماعي.',
          'عرض نموذج للمخرج المتوقع على السبورة كمثال محلول.',
          'تبديد خوف الطلاب عند تقديم أنماط تمارين جديدة لم يعتادوا عليها.',
        ],
        pedagogicalOverviewEn: 'Showing is ten times more effective than telling. A 30-second teacher-student demonstration prevents 10 minutes of student paralysis. Never just say "Do exercise 4"; run through item 1 together as an open class demonstration.',
        pedagogicalOverviewAr: 'التمثيل العملي أفضل بعشر مرات من الشرح النظري. عرض تجريبي مدته 30 ثانية مع أحد الطلاب يوفر 10 دقائق من الارتباك والأسئلة المتكررة. لا تقل فقط "حلوا التمرين"، بل حلوا النقطة الأولى سوياً كنموذج.',
        vocabulary: [
          { wordEn: 'demonstrate', phonetic: '/ˈdem.ən.streɪt/', meaningAr: 'يستعرض عملياً / ينمذج', exampleEn: 'Let me demonstrate with Omar first.', exampleAr: 'دعوني أستعرض التمرين مع عمر أولاً.' },
          { wordEn: 'model', phonetic: '/ˈmɒd.əl/', meaningAr: 'يعطي نموذجاً مثالياً', exampleEn: 'Look at the model sentence on the board.', exampleAr: 'انظروا إلى الجملة النموذجية على السبورة.' },
          { wordEn: 'take turns', phonetic: '/teɪk tɜːrnz/', meaningAr: 'يتبادل الأدوار', exampleEn: 'Take turns asking and answering.', exampleAr: 'تبادلوا الأدوار في طرح الأسئلة والإجابة.' },
          { wordEn: 'fill in the blanks', phonetic: '/fɪl ɪn ðə blæŋks/', meaningAr: 'املاً الفراغات', exampleEn: 'Fill in the blanks with the correct preposition.', exampleAr: 'املأوا الفراغات بحرف الجر الصحيح.' },
        ],
        grammarNotes: [
          {
            topicEn: 'Present Continuous for Active Demonstrations',
            topicAr: 'المضارع المستمر أثناء التمثيل العملي',
            ruleEn: 'Narrate what you are doing in real-time ("Notice I am asking, and he is replying").',
            ruleAr: 'صف الخطوات أثناء تنفيذ النموذج ("لاحظوا: أنا أسأل وهو يجيب").',
            tip: 'Use physical props (pen, card) to reinforce turn-taking rules.',
          },
        ],
        expressions: [
          {
            id: 'exp-1-3-1',
            english: 'Watch us first. Ahmed, ask me question one.',
            arabic: 'شاهدونا أولاً. يا أحمد، اسألني السؤال الأول.',
            phoneticTip: '/wɒtʃ ʌs fɜːrst/',
            pedagogicalNoteEn: 'Task modeling initiating peer demonstration.',
            pedagogicalNoteAr: 'بدء النمذجة الحية مع طالب لتوضيح سير النشاط.',
            category: 'instruction',
          },
          {
            id: 'exp-1-3-2',
            english: 'Student A is the interviewer; Student B is the job applicant. Switch after two minutes.',
            arabic: 'الطالب (أ) هو من يجري المقابلة، والطالب (ب) هو المتقدم للوظيفة. تبادلوا الأدوار بعد دقيقتين.',
            phoneticTip: '/ˈstjuː.dənt eɪ ɪz ðə ˈɪn.tə.vjuː.ər/',
            pedagogicalNoteEn: 'Role-allocation formula eliminating role ambiguity.',
            pedagogicalNoteAr: 'توزيع محكم للأدوار يمنع الحيرة داخل المجموعات.',
            category: 'instruction',
          },
          {
            id: 'exp-1-3-3',
            english: 'Let us do number 1 together as an example. Who knows the answer?',
            arabic: 'دعونا نحل النقطة رقم 1 سوياً كمثال. من يعرف الإجابة؟',
            phoneticTip: '/let ʌs duː ˈnʌm.bər wʌn təˈɡeð.ər/',
            pedagogicalNoteEn: 'Scaffolded whole-class item trial before autonomous practice.',
            pedagogicalNoteAr: 'حل عينة تمهيدية بشكل جماعي قبل الإطلاق الفردي.',
            category: 'instruction',
          },
        ],
        dialogue: [
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Class, look at exercise 4. We will do an information gap activity.', ar: 'يا طلاب، انظروا للتمرين 4. سنقوم بنشاط فجوة معلوماتية.' },
          { speaker: 'Student', speakerAr: 'طالب', en: 'Teacher, what do we have to say?', ar: 'أستاذ، ماذا علينا أن نقول؟' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Watch Mona and me. Mona, look at card A. Ask me about the train time.', ar: 'شاهدوا منى وشاهدوني. يا منى، انظري لبطاقة A، واسأليني عن موعد القطار.' },
          { speaker: 'Student', speakerAr: 'طالب', en: 'What time does the train leave for Alexandria?', ar: 'في أي وقت يغادر القطار إلى الإسكندرية؟' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'It leaves at 9:15 AM. You see? Now Student A asks, Student B answers. Switch afterwards. Go!', ar: 'يغادر في الساعة 9:15 صباحاً. رأيتم؟ الآن (أ) يسأل و (ب) يجيب، ثم تبادلوا. ابدأوا!' },
        ],
        exercises: [
          {
            id: 'ex-1-3-1',
            promptEn: 'Before starting an information-gap speaking task, what is the best CELTA-aligned action?',
            promptAr: 'قبل بدء نشاط محادثة ثنائي، ما هو الإجراء الأفضل الموصى به تربوياً؟',
            contextEn: 'Students are confused about who talks first and what questions to ask.',
            contextAr: 'الطلاب مترددون بشأن من يبدأ الحديث ونوع الأسئلة المطلوبة.',
            options: [
              { id: 'opt-1', textEn: 'Read the written instructions from the textbook three times loudly.', textAr: 'قراءة التعليمات المكتوبة بصوت عالٍ 3 مرات.', isCorrect: false },
              { id: 'opt-2', textEn: 'Demonstrate one full question-and-answer exchange with a student in front of the whole class.', textAr: 'نمذجة سؤال وجواب كاملين مع طالب متطوع أمام الفصل بأكمله.', isCorrect: true },
              { id: 'opt-3', textEn: 'Translate the whole dialogue into Arabic so they understand.', textAr: 'ترجمة المحادثة كاملة للعربية.', isCorrect: false },
              { id: 'opt-4', textEn: 'Let them figure it out by trial and error.', textAr: 'تركهم يكتشفون ذلك بالتجربة والخطأ دون توجيه.', isCorrect: false },
            ],
            explanationEn: 'Live teacher-student demonstration creates immediate cognitive clarity without unnecessary L1 translation.',
            explanationAr: 'النمذجة الحية بين المعلم والطالب تصنع فهماً فورياً ومباشراً دون الحاجة للجوء إلى الترجمة الحرفية.',
            sourceReference: 'Adrian Underhill, Sound Foundations & Training Guidelines (Macmillan, 2005)',
          },
        ],
        commonMistakes: [
          {
            incorrect: 'Do exercise 2 now everyone.',
            correct: 'Look at exercise 2. Let’s do the first one together: what goes in blank 1?',
            explanationEn: 'Never launch a task cold; always scaffold with the first question.',
            explanationAr: 'لا تطلب حل التمرين فجأة؛ حل النقطة الأولى دائماً كنموذج إرشادي.',
          },
        ],
        assignment: {
          titleEn: 'Task Demonstration Plan',
          titleAr: 'خطة نمذجة نشاط تفاعلي',
          instructionsEn: 'Design a script for modeling a role-play activity (doctor and patient) with a volunteer student in 3 short dialogue turns.',
          instructionsAr: 'صمم سيناريو لنمذجة نشاط تمثيل أدوار (طبيب ومريض) مع طالب متطوع في 3 تبادلات حوارية قصيرة.',
          rubrics: [
            {
              criteria: 'Clarity of Demonstration',
              criteriaAr: 'وضوح النموذج التوضيحي',
              maxPoints: 3,
              descriptors: {
                three: 'Completely unambiguous; clear role boundaries shown instantly.',
                two: 'Clear but requires one verbal clarification.',
                one: 'Confusing demonstration that obscures task rules.',
              },
            },
          ],
        },
        researchCitations: [
          {
            author: 'Penny Ur',
            work: 'A Course in English Language Teaching (Cambridge)',
            year: '2012',
            keyTakeaway: 'Demonstration is vastly superior to explanation for communicative task design.',
          },
        ],
      },

      // 1.4 Checking Understanding (ICQs)
      {
        id: 'les-1-4',
        number: '1.4',
        slug: 'checking-understanding',
        cefr: 'B1',
        durationMin: 15,
        titleEn: 'Checking Understanding',
        titleAr: 'التأكد من الفهم وصياغة أسئلة ICQs',
        subtitleEn: 'Banishing "Do you understand?" in favor of binary and factual ICQs',
        subtitleAr: 'التخلص النهائي من سؤال "هل فهمتم؟" واستبداله بأسئلة التحقق المحددة',
        objectivesEn: [
          'Formulate binary (yes/no or either/or) Instruction Checking Questions.',
          'Verify task parameters: time limits, grouping, and writing restrictions.',
          'Identify nodding students who actually do not comprehend the assignment.',
        ],
        objectivesAr: [
          'صياغة أسئلة تحقق ثنائية (نعم/لا أو خيارات محددة) لقياس استيعاب التوجيهات.',
          'التحقق من فهم معايير المهمة: الوقت المتاح، طبيعة العمل (فردي/ثنائي)، وشروط الكتابة.',
          'كشف إيماءات الموافقة الصامتة التي تخفي عدم فهم حقيقي للتكليف.',
        ],
        pedagogicalOverviewEn: 'Students almost always answer "Yes" to "Do you understand?" out of embarrassment or social compliance. ICQs test comprehension objectively by asking factual questions about what they must do next.',
        pedagogicalOverviewAr: 'الطلاب يجيبون دائماً بـ "نعم" لسؤال "هل فهمتم؟" بدافع الحرج الاجتماعي. أسئلة الـ ICQs تقيس الفهم الفعلي بطرح أسئلة محددة عن الخطوة الإجرائية التالية التي سيقومون بها.',
        vocabulary: [
          { wordEn: 'comprehend', phonetic: '/ˌkɒm.prɪˈhend/', meaningAr: 'يستوعب / يدرك', exampleEn: 'Make sure all students comprehend the task.', exampleAr: 'تأكد من أن جميع الطلاب يستوعبون المهمة.' },
          { wordEn: 'alone', phonetic: '/əˈloʊn/', meaningAr: 'بمفرده / فردياً', exampleEn: 'Are you working alone or in pairs?', exampleAr: 'هل تعملون بمفردكم أم في أزواج؟' },
          { wordEn: 'instruction', phonetic: '/ɪnˈstrʌk.ʃən/', meaningAr: 'تعليمة / إرشاد', exampleEn: 'Check the instructions before writing.', exampleAr: 'تحقق من التعليمات قبل الكتابة.' },
          { wordEn: 'timeframe', phonetic: '/ˈtaɪm.freɪm/', meaningAr: 'الإطار الزمني', exampleEn: 'What is our timeframe for this stage?', exampleAr: 'ما هو إطارنا الزمني لهذه المرحلة؟' },
        ],
        grammarNotes: [
          {
            topicEn: 'Alternative Questions (Either/Or)',
            topicAr: 'الأسئلة التخييرية (Either/Or) للتحقق السريع',
            ruleEn: 'Use choice questions: "Are you writing full sentences, or just one word?"',
            ruleAr: 'استخدم الأسئلة التخييرية لفرض التفكير الدقيق: "هل تكتبون جملاً كاملة أم كلمة واحدة؟"',
            tip: 'Nominate specific students by name instead of asking into the void.',
          },
        ],
        expressions: [
          {
            id: 'exp-1-4-1',
            english: 'Are you writing complete sentences, or just bullet points? Karim?',
            arabic: 'هل تكتبون جملاً كاملة أم مجرد نقاط موجزة؟ يا كريم؟',
            phoneticTip: '/ɑːr juː ˈraɪ.tɪŋ kəmˈpliːt ˈsen.tən.sɪz/',
            pedagogicalNoteEn: 'Targeted ICQ preventing wrong output format.',
            pedagogicalNoteAr: 'سؤال تحقق إجرائي موجه لطالب محدد بالاسم لضبط مخرج النشاط.',
            category: 'questioning',
          },
          {
            id: 'exp-1-4-2',
            english: 'How many minutes do you have? Sarah?',
            arabic: 'كم دقيقة لديكم لإنجاز هذا؟ يا سارة؟',
            phoneticTip: '/haʊ ˈmen.i ˈmɪn.ɪts duː juː hæv/',
            pedagogicalNoteEn: 'Timeframe ICQ securing urgency.',
            pedagogicalNoteAr: 'سؤال تحقق للتأكيد على الوعي بالوقت والجدية.',
            category: 'questioning',
          },
          {
            id: 'exp-1-4-3',
            english: 'Are you speaking in English, or Arabic? Exactly, English only!',
            arabic: 'هل تتحدثون بالإنجليزية أم بالعربية؟ بالضبط، الإنجليزية فقط!',
            phoneticTip: '/ˈɪŋ.ɡlɪʃ ɔːr ˈær.ə.bɪk/',
            pedagogicalNoteEn: 'Language policy ICQ reinforcing Target Language immersion.',
            pedagogicalNoteAr: 'سؤال تحقق تربوي يجدد التذكير بسياسة استخدام اللغة الإنجليزية.',
            category: 'management',
          },
        ],
        dialogue: [
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'In groups of three, brainstorm four causes of global warming. Three minutes.', ar: 'في مجموعات ثلاثية، اذكروا أربعة أسباب للاحتباس الحراري. لديكم ثلاث دقائق.' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Ali, are you working alone or in groups?', ar: 'يا علي، هل تعمل بمفردك أم في مجموعات؟' },
          { speaker: 'Student', speakerAr: 'طالب', en: 'In groups of three, sir.', ar: 'في مجموعات ثلاثية يا أستاذ.' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Mariam, are you writing full essays, or short points?', ar: 'يا مريم، هل تكتبون مقالات كاملة أم نقاطاً موجزة؟' },
          { speaker: 'Student', speakerAr: 'طالب', en: 'Short points only.', ar: 'نقاطاً موجزة فقط.' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Superb! How many minutes do you have, Tarek? Three minutes. Begin!', ar: 'ممتاز! كم دقيقة لديكم يا طارق؟ ثلاث دقائق. انطلقوا!' },
        ],
        exercises: [
          {
            id: 'ex-1-4-1',
            promptEn: 'Which of the following is a genuine ICQ (Instruction Checking Question)?',
            promptAr: 'أي من الأسئلة التالية يُعد سؤال تحقق حقيقي من فهم التعليمات (ICQ)؟',
            contextEn: 'You instructed students to interview 2 classmates for 5 minutes without writing.',
            contextAr: 'وجهت الطلاب لإجراء مقابلة مع زميلين لمدة 5 دقائق دون استخدام الكتابة.',
            options: [
              { id: 'opt-1', textEn: 'Do you understand what you need to do?', textAr: 'هل فهمتم ما يجب عليكم فعله؟', isCorrect: false },
              { id: 'opt-2', textEn: 'Is everything crystal clear to everyone?', textAr: 'هل كل شيء واضح تماماً للجميع؟', isCorrect: false },
              { id: 'opt-3', textEn: 'Are you writing down their answers, or just listening? Hany?', textAr: 'هل تكتبون إجاباتهم، أم تستمعون فقط؟ يا هاني؟', isCorrect: true },
              { id: 'opt-4', textEn: 'Who likes this exercise?', textAr: 'من يحب هذا التمرين؟', isCorrect: false },
            ],
            explanationEn: '"Are you writing or just listening?" checks the exact physical behavior expected, whereas "Do you understand?" yields empty yeses.',
            explanationAr: 'سؤال "هل تكتبون أم تستمعون فقط؟" يفحص السلوك المطلوب بدقة، بينما سؤال "هل فهمتم؟" يستدعي إجابات نعم شكلية.',
            sourceReference: 'Cambridge English Assessment, CELTA Trainer Guidelines',
          },
        ],
        commonMistakes: [
          {
            incorrect: 'Do you understand what to do? Yes? Good, go.',
            correct: 'Hana, how many people do you talk to? Two. Excellent, start!',
            explanationEn: 'Asking "Do you understand?" gives a false sense of security; verify with specific data.',
            explanationAr: 'سؤال "هل فهمتم؟" يعطي إحساساً خادعاً بالأمان. تحقق دائماً ببيانات محددة.',
          },
        ],
        assignment: {
          titleEn: 'Drafting 3 Targeted ICQs',
          titleAr: 'صياغة 3 أسئلة تحقق دقيقة (ICQs)',
          instructionsEn: 'Given this task: "Students work in pairs to reorder 5 sentences without looking at page 10." Write 3 snappy ICQs to check understanding.',
          instructionsAr: 'بناءً على هذا النشاط: "يعمل الطلاب في أزواج لإعادة ترتيب 5 جمل دون النظر لصفحة 10." اكتب 3 أسئلة ICQ دقيقة للتأكد من الفهم.',
          rubrics: [
            {
              criteria: 'ICQ Specificity',
              criteriaAr: 'دقة أسئلة التحقق',
              maxPoints: 3,
              descriptors: {
                three: 'Checks grouping, page constraint, and sentence count crisply.',
                two: 'Checks 2 out of 3 parameters accurately.',
                one: 'Includes vague or non-binary questions.',
              },
            },
          ],
        },
        researchCitations: [
          {
            author: 'Scott Thornbury',
            work: 'About Language (Cambridge University Press)',
            year: '1997',
            keyTakeaway: 'Formulating focused checking questions is the most diagnostic teaching skill.',
          },
        ],
      },

      // 1.5 Ending the Lesson & Homework
      {
        id: 'les-1-5',
        number: '1.5',
        slug: 'ending-lesson',
        cefr: 'A2',
        durationMin: 15,
        titleEn: 'Ending the Lesson & Homework',
        titleAr: 'إنهاء الحصة وتكليف الواجبات المنزلية',
        subtitleEn: 'Orderly lesson closure, clear homework deadlines, and positive farewells',
        subtitleAr: 'الختام المنظم للحصة، تحديد مواعيد الواجبات بدقة، والوداع المحفز للطلاب',
        objectivesEn: [
          'Bring communicative activities to a calm, staged conclusion before the bell rings.',
          'Assign homework with explicit instructions, format expectations, and due dates.',
          'Dismiss the class systematically without frantic stampedes to the door.',
        ],
        objectivesAr: [
          'إنهاء الأنشطة الصفية بهدوء ونظام قبل رنين جرس انتهاء الحصة.',
          'تكليف الواجب المنزلي مع توضيح الصيغة المطلوبة وموعد التسليم المحدد.',
          'صرف الطلاب بنظام ودون فوضى أو اندفاع نحو باب الفصل.',
        ],
        pedagogicalOverviewEn: 'Rushing homework instructions while students pack their bags is a primary cause of non-completion. Allocate the final 4 minutes to summarize key learning gains, write homework cleanly on the board, and dismiss row by row.',
        pedagogicalOverviewAr: 'الاستعجال في إملاء الواجب أثناء جمع الطلاب لأدواتهم هو السبب الأول لعدم حل الواجب. خصص آخر 4 دقائق لتلخيص مكاسب الحصة، وتدوين الواجب بوضوح على السبورة، وصرف الطلاب بهدوء.',
        vocabulary: [
          { wordEn: 'pack away', phonetic: '/pæk əˈweɪ/', meaningAr: 'يجمع أدواته وحقيبته', exampleEn: 'Please pack away your books quietly.', exampleAr: 'رجاءً اجمعوا كتبكم وأدواتكم بهدوء.' },
          { wordEn: 'assignment', phonetic: '/əˈsaɪn.mənt/', meaningAr: 'واجب / تكليف', exampleEn: 'Your written assignment is due on Sunday.', exampleAr: 'موعد تسليم واجبكم الكتابي هو يوم الأحد.' },
          { wordEn: 'due date', phonetic: '/ˈdjuː ˌdeɪt/', meaningAr: 'موعد التسليم النهائي', exampleEn: 'Remember, the due date is strictly tomorrow morning.', exampleAr: 'تذكروا، موعد التسليم النهائي صباح الغد تحديداً.' },
          { wordEn: 'dismissed', phonetic: '/dɪsˈmɪst/', meaningAr: 'مسموح لكم بالانصراف', exampleEn: 'Row 1, you are dismissed. Have a great day!', exampleAr: 'الصف الأول، يمكنكم الانصراف. أتمنى لكم يوماً رائعاً!' },
        ],
        grammarNotes: [
          {
            topicEn: 'Future Time Clauses for Dismissal',
            topicAr: 'الجمل الزمنية المستقبلية في تنظيم الانصراف',
            ruleEn: 'Use "Once / When + Present Simple" for conditional dismissal (e.g. "When your desk is clean, you may leave").',
            ruleAr: 'استخدم When / Once مع المضارع البسيط للانصراف المشروط بالنظام والنظافة.',
            tip: 'Never shout over the bell; hold the class until silence is restored.',
          },
        ],
        expressions: [
          {
            id: 'exp-1-5-1',
            english: 'Pens down, close your notebooks, and look at the board.',
            arabic: 'ضعوا الأقلام، أغلقوا دفاتركم، وانظروا إلى السبورة.',
            phoneticTip: '/penz daʊn, kloʊz jɔːr ˈnoʊt.bʊks/',
            pedagogicalNoteEn: 'Terminal cue transitioning from active work to closure.',
            pedagogicalNoteAr: 'إشارة ختامية تنقل الطلاب من العمل الفردي إلى مرحلة إغلاق الحصة.',
            category: 'management',
          },
          {
            id: 'exp-1-5-2',
            english: 'For homework: page 35, exercises 2 and 3. Due next Tuesday morning.',
            arabic: 'بالنسبة للواجب المنزلي: صفحة 35، التمرينان 2 و 3. التسليم صباح الثلاثاء القادم.',
            phoneticTip: '/fɔːr ˈhoʊm.wɜːrk peɪdʒ θɜːr.ti faɪv/',
            pedagogicalNoteEn: 'Explicit homework briefing with precise location and deadline.',
            pedagogicalNoteAr: 'تكليف محدد بالصفحة ورقم التمرين وتاريخ التسليم الدقيق.',
            category: 'instruction',
          },
          {
            id: 'exp-1-5-3',
            english: 'Row by row. When your area is tidy, you may leave. Have a wonderful weekend!',
            arabic: 'صفاً تلو الآخر. عندما يكون مكانكم نظيفاً ومرتباً، يمكنكم الانصراف. عطلة نهاية أسبوع رائعة!',
            phoneticTip: '/roʊ baɪ roʊ/',
            pedagogicalNoteEn: 'Structured orderly exit ritual.',
            pedagogicalNoteAr: 'بروتوكول انصراف منظم يحافظ على هيبة الفصل والنظام المدرسي.',
            category: 'management',
          },
        ],
        dialogue: [
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Time is up! Stop writing, please. Look up here.', ar: 'انتهى الوقت! توقفوا عن الكتابة من فضلكم. انظروا هنا.' },
          { speaker: 'Class', speakerAr: 'الفصل', en: '(The bell rings in the hallway)', ar: '(يدق الجرس في الممر)' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'The bell has rung, but the lesson ends when I dismiss you. Thank you. Homework is on the board: page 45, write 5 sentences. Write it in your agenda now.', ar: 'دق الجرس، لكن الحصة تنتهي حين أصرفكم أنا. شكراً لكم. الواجب مدون على السبورة: صفحة 45، اكتبوا 5 جمل. سجلوها في مفكرتكم الآن.' },
          { speaker: 'Student', speakerAr: 'طالب', en: 'Can we send it on Google Classroom, sir?', ar: 'هل يمكننا إرساله عبر جوجل كلاسروم يا أستاذ؟' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Yes, by 8 PM tomorrow. Window row may leave first. Good afternoon everyone!', ar: 'نعم، بحلول الثامنة مساء الغد. صف النافذة يمكنكم الانصراف أولاً. طاب يومكم جميعاً!' },
        ],
        exercises: [
          {
            id: 'ex-1-5-1',
            promptEn: 'What is the most professional procedure when the bell rings while you are concluding a lesson?',
            promptAr: 'ما هو الإجراء الأكثر مهنية عند رنين الجرس وأنت في مرحلة ختام الحصة؟',
            contextEn: 'Students start putting their bags on their shoulders and walking out.',
            contextAr: 'بدأ الطلاب في حمل حقائبهم والتوجه نحو الباب فور سماع الجرس.',
            options: [
              { id: 'opt-1', textEn: 'Shout homework details louder over their chatter.', textAr: 'الصراخ بتفاصيل الواجب بصوت أعلى فوق أصواتهم.', isCorrect: false },
              { id: 'opt-2', textEn: 'Calmly remind them that the bell informs the teacher, but the teacher dismisses the class, and deliver closure.', textAr: 'تذكيرهم بهدوء بأن الجرس ينبه المعلم، لكن المعلم هو من يصرف الفصل، وإتمام الختام بنظام.', isCorrect: true },
              { id: 'opt-3', textEn: 'Cancel homework completely.', textAr: 'إلغاء الواجب المنزلي نهائياً.', isCorrect: false },
              { id: 'opt-4', textEn: 'Lock the classroom door and punish everyone.', textAr: 'إغلاق الباب بالمفتاح ومعاقبة الجميع.', isCorrect: false },
            ],
            explanationEn: 'Maintaining authority and predictable routines ensures safety, respect, and clear homework comprehension.',
            explanationAr: 'الحفاظ على الروتين والهدوء يضمن احترام الحرم الصفي وفهم الطلاب الكامل لما هو مطلوب منهم في المنزل.',
            sourceReference: 'Jim Scrivener, Classroom Management Techniques (Cambridge, 2012)',
          },
        ],
        commonMistakes: [
          {
            incorrect: 'Go go bell ringed do homework page 50 bye!',
            correct: 'Wait a moment please. Write down your homework: page 50, exercises 1 and 2. Now you may go.',
            explanationEn: 'Frantic dismissals lead to lost assignments and classroom chaos.',
            explanationAr: 'الانصراف المتعجل يؤدي لضياع التكليفات وإشاعة الفوضى عند مغادرة الفصل.',
          },
        ],
        assignment: {
          titleEn: 'End-of-Lesson Closure Plan',
          titleAr: 'خطة إغلاق الحصة والصرف المنظم',
          instructionsEn: 'Write a step-by-step 3-minute closing protocol for your classroom, including homework announcement, board clearing, and dismissal order.',
          instructionsAr: 'اكتب بروتوكولاً لآخر 3 دقائق من حصتك يتضمن إعلان الواجب، وتنظيف السبورة، وآلية صرف الطلاب بنظام.',
          rubrics: [
            {
              criteria: 'Closure Structure',
              criteriaAr: 'هيكلية الإغلاق',
              maxPoints: 3,
              descriptors: {
                three: 'Clear 3-phase closure: recap, homework deadline, orderly dismissal.',
                two: 'Missing one minor component (e.g. deadline exactness).',
                one: 'Unstructured or hurried conclusion.',
              },
            },
          ],
        },
        researchCitations: [
          {
            author: 'Doug Lemov',
            work: 'Teach Like a Champion 3.0',
            year: '2021',
            keyTakeaway: 'The routine dismissal cements student habits of mind until the final second.',
          },
        ],
      },
    ],
  },

  // ==========================================
  // MODULE 2: Explaining & Understanding (B1–B2)
  // ==========================================
  {
    id: 'mod-2',
    number: 2,
    titleEn: 'Explaining Lessons & Checking Student Understanding',
    titleAr: 'شرح الدروس والتحقق من فهم واستيعاب الطلاب',
    cefrRange: 'B1–B2',
    descriptionEn: 'Develop crystal-clear concept explanation strategies, analogy building, Concept Checking Questions (CCQs), diagnostic re-explaining, and student-centered questioning techniques.',
    descriptionAr: 'تطوير استراتيجيات تقديم المفاهيم بوضوح تام، وبناء القياس والتشبيه، وصياغة أسئلة فحص المفاهيم (CCQs)، وإعادة الشرح التشخيصي، وتقنيات إثارة التفكير والمشاركة.',
    color: '#0284C7',
    lessons: [
      // 2.1 Introducing Concepts
      {
        id: 'les-2-1',
        number: '2.1',
        slug: 'introducing-concepts',
        cefr: 'B1',
        durationMin: 20,
        titleEn: 'Introducing New Concepts',
        titleAr: 'تقديم المفاهيم الجديدة وبناء السياق',
        subtitleEn: 'The inductive discovery method: elicitation and context building over lecture',
        subtitleAr: 'طريقة الاستقراء والاكتشاف: استدراج الأفكار وبناء السياق بدلاً من التلقين',
        objectivesEn: [
          'Elicit target concepts inductively from students using rich situational contexts.',
          'Connect new grammatical or lexical targets to real-life situations and prior knowledge.',
          'Avoid lengthy grammatical lectures by focusing on communicative meaning first.',
        ],
        objectivesAr: [
          'استدراج المفاهيم استقرائياً من الطلاب من خلال بناء سياقات واقعية غنية.',
          'ربط المفردات والقواعد الجديدة بخبرات الطلاب الحياتية ومعارفهم السابقة.',
          'تجنب المحاضرات النظرية الطويلة والتركيز على المعنى الوظيفي التواصلي أولاً.',
        ],
        pedagogicalOverviewEn: 'Inductive teaching (guided discovery) leads to vastly superior long-term retention compared to deductive lecturing. Rather than writing a grammar rule on the board, effective teachers present a story, elicit what is happening, and guide students to notice patterns.',
        pedagogicalOverviewAr: 'التدريس الاستقرائي (الاكتشاف الموجه) يحقق رسوخاً معرفياً يفوق بمراحل التلقين المباشر. بدلاً من سرد القواعد الجافة على السبورة، يقدم المعلم قصة أو موقفاً، ويستدرج استنتاج القاعدة من الطلاب أنفسهم.',
        vocabulary: [
          { wordEn: 'elicit', phonetic: '/iˈlɪs.ɪt/', meaningAr: 'يستدرج / يستخرج الإجابة من الطالب', exampleEn: 'Try to elicit the rule from the students first.', exampleAr: 'حاول استدراج القاعدة من الطلاب أولاً.' },
          { wordEn: 'context', phonetic: '/ˈkɒn.tekst/', meaningAr: 'السياق التواصلي أو الموقفي', exampleEn: 'Always present new vocabulary in a clear context.', exampleAr: 'قدّم دائماً المفردات الجديدة داخل سياق واضح.' },
          { wordEn: 'concept', phonetic: '/ˈkɒn.sept/', meaningAr: 'مفهوم لغوي أو معرفي', exampleEn: 'Today we explore the concept of ongoing past actions.', exampleAr: 'اليوم نستكشف مفهوم الأفعال المستمرة في الماضي.' },
          { wordEn: 'discovery', phonetic: '/dɪˈskʌv.ər.i/', meaningAr: 'اكتشاف موجه', exampleEn: 'Guided discovery makes learning memorable.', exampleAr: 'الاكتشاف الموجه يجعل التعلم غير قابل للنسيان.' },
        ],
        grammarNotes: [
          {
            topicEn: 'Presenting Meaning Before Form',
            topicAr: 'تقديم المعنى والدلالة قبل شكل القاعدة (MFP)',
            ruleEn: 'Follow the MFP framework: Meaning first, Form second, Pronunciation third.',
            ruleAr: 'اتبع نموذج MFP المعتمد دولياً: المعنى أولاً، ثم التركيب القواعدي، ثم النطق السليم.',
            tip: 'Never drill pronunciation before students understand the meaning of the word.',
          },
        ],
        expressions: [
          {
            id: 'exp-2-1-1',
            english: 'Look at this picture. What do you think happened to this man right before this?',
            arabic: 'انظروا إلى هذه الصورة. ماذا تعتقدون أنه حدث لهذا الرجل قبل هذه اللحظة مباشرة؟',
            phoneticTip: '/lʊk æt ðɪs ˈpɪk.tʃər/',
            pedagogicalNoteEn: 'Visual prompt eliciting target past perfect tense.',
            pedagogicalNoteAr: 'محفز بصري يستدرج استنتاج صيغة الماضي التام بشكل طبيعي.',
            category: 'questioning',
          },
          {
            id: 'exp-2-1-2',
            english: 'Notice the underlined words in these three sentences. What do they have in common?',
            arabic: 'لاحظوا الكلمات التي تحتها خط في هذه الجمل الثلاث. ما الشيء المشترك بينها؟',
            phoneticTip: '/ˈnoʊ.tɪs ðə ˌʌn.dərˈlaɪnd wɜːrdz/',
            pedagogicalNoteEn: 'Guided discovery prompt directing cognitive pattern-matching.',
            pedagogicalNoteAr: 'سؤال اكتشاف موجه يثير التفكير المقارن واستنتاج القواسم المشتركة.',
            category: 'instruction',
          },
          {
            id: 'exp-2-1-3',
            english: 'Imagine you have an important plane to catch tomorrow morning. What will you say?',
            arabic: 'تخيلوا أن لديكم رحلة طيران مهمة صباح الغد. ماذا ستقولون؟',
            phoneticTip: '/ɪˈmædʒ.ɪn juː hæv/',
            pedagogicalNoteEn: 'Real-world hypothetical scenario setting communicative need.',
            pedagogicalNoteAr: 'بناء سيناريو واقعي يشعر الطالب بالحاجة الحقيقية للتعبير اللغوي.',
            category: 'instruction',
          },
        ],
        dialogue: [
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Look at the photo on the projector. This is Dave. His shoes are muddy and he is exhausted. Why?', ar: 'انظروا للصورة على جهاز العرض. هذا ديف. حذاؤه ملطخ بالطين وهو منهك تماماً. لماذا؟' },
          { speaker: 'Student A', speakerAr: 'طالب أ', en: 'Because he was running in the rain!', ar: 'لأنه كان يركض تحت المطر!' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Brilliant! "Dave has been running in the rain." Is he running right now at this second?', ar: 'رائع! "كان ديف يركض تحت المطر". هل يركض الآن في هذه اللحظة؟' },
          { speaker: 'Class', speakerAr: 'الفصل', en: 'No! He stopped.', ar: 'كلا! لقد توقف.' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Exactly. But can we see the result now? Yes, his muddy shoes. This is the Present Perfect Continuous.', ar: 'بالضبط. لكن هل نرى النتيجة واضحة الآن؟ نعم، حذاؤه الملطخ. هذا هو المضارع التام المستمر.' },
        ],
        exercises: [
          {
            id: 'ex-2-1-1',
            promptEn: 'In communicative language teaching (CLT), what should a teacher establish FIRST when presenting a new grammatical structure?',
            promptAr: 'في التدريس التواصلي المعاصر (CLT)، ما الذي يجب على المعلم ترسيخه أولاً عند تقديم تركيب قواعدي جديد؟',
            contextEn: 'You want to introduce the conditional "If I were you, I would...".',
            contextAr: 'تريد تقديم قاعدة النصيحة التخيلية "لو كنت مكانك...".',
            options: [
              { id: 'opt-1', textEn: 'The phonetic spelling and IPA symbols of the words.', textAr: 'الرموز الصوتية للكلمات.', isCorrect: false },
              { id: 'opt-2', textEn: 'The communicative meaning and context in which native speakers use it.', textAr: 'المعنى التواصلي والسياق الواقعي الذي يستخدم فيه المتحدثون الأصليون هذه الصيغة.', isCorrect: true },
              { id: 'opt-3', textEn: 'The list of irregular grammatical exceptions.', textAr: 'قائمة الاستثناءات الشاذة للقاعدة.', isCorrect: false },
              { id: 'opt-4', textEn: 'The translation into Arabic grammar terminology.', textAr: 'المصطلحات النحوية باللغة العربية.', isCorrect: false },
            ],
            explanationEn: 'Meaning (M) must precede Form (F) and Pronunciation (P). Context gives purpose to grammar.',
            explanationAr: 'ترسيخ المعنى التواصلي والسياقي يسبق دائماً استعراض تفاصيل القواعد والشكل المجرد.',
            sourceReference: 'Jeremy Harmer, How to Teach English (Pearson Longman)',
          },
        ],
        commonMistakes: [
          {
            incorrect: 'Today we will study grammar rule page 60: Subject + Had + V3. Copy this.',
            correct: 'Look at this mystery: John was late because his car had broken down. Let’s explore what happened first.',
            explanationEn: 'Never start with naked formulas; anchor grammar in an engaging human narrative.',
            explanationAr: 'لا تبدأ الحصة أبداً بالمعادلات الجافة؛ ابنِ سياقاً قصصياً حياً يكتشف من خلاله الطلاب القاعدة.',
          },
        ],
        assignment: {
          titleEn: 'Context-Building Lesson Starter',
          titleAr: 'خطة تمهيد وبناء سياق لمفهوم لغوي',
          instructionsEn: 'Write a 100-word introduction establishing a context to elicit the past continuous ("was walking when...") without explicitly naming the tense initially.',
          instructionsAr: 'اكتب نص تمهيد من 100 كلمة يبني سياقاً لاستدراج الماضي المستمر دون ذكر اسم القاعدة في البداية.',
          rubrics: [
            {
              criteria: 'Inductive Quality',
              criteriaAr: 'جودة الاستدراج الاستقرائي',
              maxPoints: 3,
              descriptors: {
                three: 'Compelling situation that naturally generates the target structure.',
                two: 'Good situation but slightly leads the answer artificially.',
                one: 'Deductive rule-giving disguised as context.',
              },
            },
          ],
        },
        researchCitations: [
          {
            author: 'Scott Thornbury',
            work: 'How to Teach Grammar (Pearson Education)',
            year: '1999',
            keyTakeaway: 'The inductive approach actively engages learners in problem-solving and deep grammar processing.',
          },
        ],
      },

      // 2.2 Using Examples & Analogies
      {
        id: 'les-2-2',
        number: '2.2',
        slug: 'using-examples',
        cefr: 'B1',
        durationMin: 15,
        titleEn: 'Using Examples & Analogies',
        titleAr: 'استخدام الأمثلة الحسية والتشبيهات التوضيحية',
        subtitleEn: 'Crafting memorable contrasts, timelines, and realia to clarify abstract concepts',
        subtitleAr: 'صناعة المقارنات الذهنية والخطوط الزمنية واستخدام المجسمات لتجسيد المفاهيم المجردة',
        objectivesEn: [
          'Design visual timelines on the board to illustrate verb aspects and tense relationships.',
          'Formulate real-life analogies that demystify confusing modal verbs and prepositions.',
          'Use contrastive concept pairs (e.g. "since" vs "for") with concrete board markers.',
        ],
        objectivesAr: [
          'رسم خطوط زمنية بصرية على السبورة لتوضيح طبيعة الأزمنة اللغوية وامتدادها.',
          'صياغة تشبيهات ومقارنات حياتية تقرب الأفعال الناقصة وحروف الجر المعقدة.',
          'استخدام المقابلات الثنائية (مثل since مقابل for) بنماذج وعلامات سبورية واضحة.',
        ],
        pedagogicalOverviewEn: 'Abstract grammatical terminology fails when teaching teenagers and younger learners. Visual timelines, physical gestures, and relatable comparisons anchor difficult concepts into concrete mental imagery.',
        pedagogicalOverviewAr: 'المصطلحات النحوية المجردة تفشل مع الطلاب في سن المراهقة والشباب. الخطوط الزمنية والتشبيهات الحركية تحول المفاهيم الصعبة إلى صور ذهنية ملموسة لا تنسى.',
        vocabulary: [
          { wordEn: 'analogy', phonetic: '/əˈnæl.ə.dʒi/', meaningAr: 'قياس أو تشبيه توضيحي', exampleEn: 'Think of an analogy comparing memory to a computer folder.', exampleAr: 'فكر في تشبيه يقارن الذاكرة بمجلدات الحاسوب.' },
          { wordEn: 'timeline', phonetic: '/ˈtaɪm.laɪn/', meaningAr: 'خط زمني مرئي للأزمنة', exampleEn: 'Draw a timeline on the board to show past versus present.', exampleAr: 'ارسم خطاً زمنياً على السبورة لتوضيح الماضي مقارنة بالحاضر.' },
          { wordEn: 'contrast', phonetic: '/ˈkɒn.trɑːst/', meaningAr: 'مقارنة تباينية', exampleEn: 'Contrast "used to do" with "is used to doing".', exampleAr: 'قارن بشكل تبايني بين الصيغتين.' },
          { wordEn: 'concrete', phonetic: '/ˈkɒŋ.kriːt/', meaningAr: 'ملموس / حسي', exampleEn: 'Give concrete examples from daily school life.', exampleAr: 'قدم أمثلة ملموسة من واقع الحياة المدرسية اليومية.' },
        ],
        grammarNotes: [
          {
            topicEn: 'Drawing Timelines for Verb Aspects',
            topicAr: 'رسم الخطوط الزمنية للأوجه الفعلية',
            ruleEn: 'Use an X for instantaneous completed events, and a wavy line (~~~~~) for continuous duration.',
            ruleAr: 'استخدم علامة X للأحداث اللحظية المنتهية، وخطاً متموجاً للدلالة على الاستمرارية الزمنية.',
            tip: 'Always label the "NOW" point clearly in the center of the timeline.',
          },
        ],
        expressions: [
          {
            id: 'exp-2-2-1',
            english: 'Think of "must" like a traffic light turning red: you have no choice.',
            arabic: 'فكروا في كلمة "must" مثل إشارة المرور الحمراء: ليس لديكم خيار آخر.',
            phoneticTip: '/θɪŋk ɒv mʌst laɪk/',
            pedagogicalNoteEn: 'Concrete rule of life analogy simplifying modal obligation.',
            pedagogicalNoteAr: 'تشبيه ملموس من قوانين الحياة يرسخ مفهوم الإلزام الصارم.',
            category: 'instruction',
          },
          {
            id: 'exp-2-2-2',
            english: 'Look at the timeline. Here is NOW. The action started here, and touches right now.',
            arabic: 'انظروا للخط الزمني. هذه هي نقطة "الآن". بدأ الفعل هنا، ويصل أثره للحظة الحالية.',
            phoneticTip: '/lʊk æt ðə ˈtaɪm.laɪn/',
            pedagogicalNoteEn: 'Deictic anchoring of present perfect aspect.',
            pedagogicalNoteAr: 'تثبيت بصري على الخط الزمني يجسد العلاقة بين الماضي والحاضر.',
            category: 'instruction',
          },
          {
            id: 'exp-2-2-3',
            english: 'Compare these two sentences: "I stopped to smoke" versus "I stopped smoking". What is the difference?',
            arabic: 'قارنوا بين هاتين الجملتين: "I stopped to smoke" مقابل "I stopped smoking". ما الفرق؟',
            phoneticTip: '/kəmˈpeər ðiːz tuː ˈsen.tən.sɪz/',
            pedagogicalNoteEn: 'Minimal pair contrast revealing semantic shifts with gerunds/infinitives.',
            pedagogicalNoteAr: 'مقارنة لغوية تباينية دقيقة تكشف تغير المعنى بين المصدر واسم الفاعل.',
            category: 'questioning',
          },
        ],
        dialogue: [
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Class, look at the timeline on the board. Here is 2020, and here is 2026. What does "I have lived in Cairo for six years" mean?', ar: 'يا طلاب، انظروا للخط الزمني على السبورة. هنا عام 2020، وهنا 2026. ماذا تعني هذه الجملة؟' },
          { speaker: 'Student', speakerAr: 'طالب', en: 'It means you lived in Cairo before, but now you moved?', ar: 'تعني أنك عشت في القاهرة سابقاً، لكنك انتقلت الآن؟' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Watch my finger on the timeline! Does the line stop at 2026, or continue?', ar: 'راقبوا إصبعي على الخط الزمني! هل توقف الخط عند 2026 أم يمتد للمستقبل؟' },
          { speaker: 'Student', speakerAr: 'طالب', en: 'It continues! You still live in Cairo now!', ar: 'إنه يمتد! أنت ما زلت تعيش في القاهرة الآن!' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Spot on! That is the bridge of the Present Perfect.', ar: 'أصبت كبد الحقيقة! هذا هو الجسر الزمني للمضارع التام.' },
        ],
        exercises: [
          {
            id: 'ex-2-2-1',
            promptEn: 'Which visual representation best clarifies the distinction between Past Simple and Present Perfect?',
            promptAr: 'أي وسيلة توضيح بصرية هي الأفضل لبيان الفرق بين الماضي البسيط والمضارع التام؟',
            contextEn: 'Students keep using Past Simple for unfinished actions extending to the present.',
            contextAr: 'الطلاب يخلطون بين الأحداث المنتهية والأحداث التي لا يزال لها امتداد حاضر.',
            options: [
              { id: 'opt-1', textEn: 'A list of 50 irregular verbs in alphabetical order.', textAr: 'قائمة بخمسين فعلاً شاذاً مرتبة أبجدياً.', isCorrect: false },
              { id: 'opt-2', textEn: 'A timeline contrasting a closed past box (finished time) with an arrow reaching the NOW line (unfinished time).', textAr: 'خط زمني يقارن بين صندوق ماضٍ مغلق وسهم متصل يصل إلى خط "الآن".', isCorrect: true },
              { id: 'opt-3', textEn: 'A dictionary definition of the word "perfect".', textAr: 'التعريف المعجمي لكلمة تام.', isCorrect: false },
              { id: 'opt-4', textEn: 'Translating both sentences identically into Arabic.', textAr: 'ترجمة كلتا الجملتين بنفس الطريقة للعربية.', isCorrect: false },
            ],
            explanationEn: 'Timelines provide spatial representation of temporal concepts, overcoming L1 interference.',
            explanationAr: 'الخطوط الزمنية تعطي تمثيلاً مكانياً واضحاً للمفاهيم الزمنية، مما يمنع التداخل اللغوي السلبي.',
            sourceReference: 'Jim Scrivener, Teaching English Grammar (Macmillan)',
          },
        ],
        commonMistakes: [
          {
            incorrect: 'Just remember: "for" is with numbers and "since" is with words.',
            correct: 'Look at the timeline: "since" marks the exact starting point (2018), while "for" measures the duration of time (5 years).',
            explanationEn: 'Oversimplified rules fail learners when faced with "since yesterday" or "for ages".',
            explanationAr: 'القواعد السطحية المبتذلة تنهار أمام أول استثناء حقيقي؛ علمهم المفهوم الزمني الأصيل.',
          },
        ],
        assignment: {
          titleEn: 'Visual Board Timeline Design',
          titleAr: 'تصميم خط زمني تعليمي للسبورة',
          instructionsEn: 'Sketch or describe in writing a board diagram explaining the difference between "I was reading" and "I had read".',
          instructionsAr: 'ارسم أو صف كتابةً رسماً بيانياً للسبورة يوضح الفرق الدقيق بين الماضي المستمر والماضي التام.',
          rubrics: [
            {
              criteria: 'Visual Logic',
              criteriaAr: 'المنطق البصري التوضيحي',
              maxPoints: 3,
              descriptors: {
                three: 'Clear distinction between aspect, duration, and completion points.',
                two: 'Accurate but slightly cluttered.',
                one: 'Confusing visual elements.',
              },
            },
          ],
        },
        researchCitations: [
          {
            author: 'David Nunan',
            work: 'Practical English Language Teaching (McGraw-Hill)',
            year: '2003',
            keyTakeaway: 'Graphic organizers and timelines convert abstract grammar into spatial reasoning.',
          },
        ],
      },

      // 2.3 Student Questions
      {
        id: 'les-2-3',
        number: '2.3',
        slug: 'student-questions',
        cefr: 'B2',
        durationMin: 20,
        titleEn: 'Handling Student Questions',
        titleAr: 'إدارة وتوجيه أسئلة واستفسارات الطلاب',
        subtitleEn: 'Bouncing questions back, handling unexpected vocabulary, and pacing the lesson',
        subtitleAr: 'إعادة تدوير الأسئلة بين الأقران، التعامل مع الكلمات المباغتة، وحماية وقت الحصة',
        objectivesEn: [
          'Bounce questions back to the classroom to activate peer learning before answering.',
          'Gracefully handle advanced or unknown lexical questions without losing credibility.',
          'Prevent off-topic inquiries from derailing the planned pedagogical focus.',
        ],
        objectivesAr: [
          'إعادة طرح أسئلة الطلاب على زملائهم أولاً لتفعيل التعلم التشاركي قبل التدخل.',
          'التعامل برقي وثقة مع المفردات المباغتة أو النادرة دون ارتباك أو مساس بالمصداقية.',
          'منع الأسئلة الجانبية أو الخارجة عن المنهج من تعطيل الخطة الزمنية للحصة.',
        ],
        pedagogicalOverviewEn: 'When a teacher answers every student question immediately, the class becomes teacher-dependent. Expert practitioners use "bouncing": they redirect the question to peers, validate curiosity, and defer tangential topics to the "Parking Lot" on the board.',
        pedagogicalOverviewAr: 'حين يتولى المعلم الإجابة الفورية عن كل استفسار، يتحول الفصل إلى بيئة اتكالية. المعلم المحترف يعيد توجيه السؤال للزملاء، ويقدر الفضول المعرفي، ويدرج الأسئلة الجانبية في ركن الملاحظات المؤجلة (Parking Lot).',
        vocabulary: [
          { wordEn: 'bounce back', phonetic: '/baʊns bæk/', meaningAr: 'يعيد طرح السؤال على الفصل', exampleEn: 'Bounce the question back to see if anyone else knows.', exampleAr: 'أعد طرح السؤال على الزملاء لترى إن كان أحدهم يعرف الإجابة.' },
          { wordEn: 'parking lot', phonetic: '/ˈpɑːr.kɪŋ ˌlɒt/', meaningAr: 'ركن الأسئلة المؤجلة على السبورة', exampleEn: 'Let us put that question in our board parking lot.', exampleAr: 'دعونا نضع ذلك السؤال في ركن الأسئلة المؤجلة على السبورة.' },
          { wordEn: 'tangent', phonetic: '/ˈtæn.dʒənt/', meaningAr: 'مسار جانبي بعيد عن الهدف', exampleEn: 'Do not go off on a tangent during grammar practice.', exampleAr: 'لا تنجرف في مسار جانبي أثناء تدريب القواعد.' },
          { wordEn: 'credible', phonetic: '/ˈkred.ə.bəl/', meaningAr: 'موثوق وذو مصداقية', exampleEn: 'It is credible and honest to verify a rare idiom.', exampleAr: 'من تمام المصداقية والأمانة العلمية التحقق من التعبيرات النادرة.' },
        ],
        grammarNotes: [
          {
            topicEn: 'Indirect Questions for Polite Redirection',
            topicAr: 'الأسئلة غير المباشرة لإعادة التدوير بأدب',
            ruleEn: 'Use embedded frames: "Who can explain what Sarah just asked?"',
            ruleAr: 'استخدم الصياغات التضمينية: "من يستطيع شرح ما سألت عنه سارة للتو؟"',
            tip: 'Give 3 seconds of wait time after bouncing a question.',
          },
        ],
        expressions: [
          {
            id: 'exp-2-3-1',
            english: 'That is a fantastic question, Youssef! Who in the room can help Youssef with that?',
            arabic: 'هذا سؤال رائع يا يوسف! من في الفصل يستطيع مساعدة يوسف في هذه النقطة؟',
            phoneticTip: '/ðæt ɪz ə fænˈtæs.tɪk ˈkwes.tʃən/',
            pedagogicalNoteEn: 'Peer redirection building collaborative classroom culture.',
            pedagogicalNoteAr: 'إعادة توجيه ذكية تعزز روح البحث والتفكير الجماعي بين الطلاب.',
            category: 'questioning',
          },
          {
            id: 'exp-2-3-2',
            english: 'I love your curiosity, but let us park that on the corner of the board and discuss it at break.',
            arabic: 'أحيي فيك هذا الشغف، ولكن دعنا نضع هذا السؤال في جانب السبورة ونناقشه في الاستراحة.',
            phoneticTip: '/let ʌs pɑːrk ðæt ɒn ðə ˈkɔːr.nər/',
            pedagogicalNoteEn: 'Polite boundary-setting protecting lesson pacing.',
            pedagogicalNoteAr: 'حفظ مهذب لوقت الحصة يمنع التشتت دون كسر عزيمة الطالب.',
            category: 'management',
          },
          {
            id: 'exp-2-3-3',
            english: 'That is a rare nuance. Let me double-check the exact dictionary collocation and get back to you tomorrow.',
            arabic: 'هذا استخدام بلاغي دقيق ونادر. دعني أتحقق من التلازم اللفظي الدقيق في المعجم وأجيبك غداً.',
            phoneticTip: '/let miː ˈdʌb.əl tʃek/',
            pedagogicalNoteEn: 'Professional honesty modeling academic humility.',
            pedagogicalNoteAr: 'أمانة علمية ومهنية تعكس التواضع الأكاديمي وتعزز ثقة الطلاب في المعلم.',
            category: 'feedback',
          },
        ],
        dialogue: [
          { speaker: 'Student', speakerAr: 'طالب', en: 'Teacher, what is the difference between "affect" with an A and "effect" with an E?', ar: 'أستاذ، ما الفرق بين affect بحرف A و effect بحرف E؟' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Great question, Nour! Before I answer, who can tell us which one is usually the action verb?', ar: 'سؤال رائع يا نور! قبل أن أجيب، من يخبرنا أي منهما يأتي كفعل عادة؟' },
          { speaker: 'Student B', speakerAr: 'طالب ب', en: '"Affect" with an A is the verb!', ar: 'التي تبدأ بحرف A هي الفعل!' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Exactly! A for Action, A for Affect. Look at how well you worked that out together!', ar: 'بالضبط! حرف A يرمز للـ Action ويرمز لـ Affect. انظروا كم كان رائعاً استنتاجكم للأمر معاً!' },
        ],
        exercises: [
          {
            id: 'ex-2-3-1',
            promptEn: 'A student asks a complex, off-topic grammatical question during a timed reading warm-up. What is the best teacher response?',
            promptAr: 'سأل طالب سؤالاً نحوياً عميقاً لكنه خارج موضوع الحصة أثناء نشاط تهيئة قراءة محدد بوقت. ما هو التصرف الأمثل؟',
            contextEn: 'The class only has 35 minutes left to complete the core syllabus objectives.',
            contextAr: 'متبقي 35 دقيقة فقط في الحصة لإنهاء أهداف المنهج الأساسية.',
            options: [
              { id: 'opt-1', textEn: 'Ignore the student completely and pretend you did not hear.', textAr: 'تجاهل الطالب تماماً والادعاء بعدم سماع السؤال.', isCorrect: false },
              { id: 'opt-2', textEn: 'Acknowledge the quality of the question, place it on the board "Parking Lot", and promise to answer during the wrap-up or break.', textAr: 'الإشادة بعمق السؤال، وتدوينه في خانة الأسئلة المؤجلة على السبورة، والتعهد بمناقشته في ختام الحصة أو الاستراحة.', isCorrect: true },
              { id: 'opt-3', textEn: 'Spend 20 minutes explaining all related grammar rules right now.', textAr: 'قضاء 20 دقيقة في شرح كل القواعد المتعلقة الآن.', isCorrect: false },
              { id: 'opt-4', textEn: 'Reprimand the student for asking questions.', textAr: 'توبيخ الطالب على طرح الأسئلة.', isCorrect: false },
            ],
            explanationEn: 'The parking lot strategy honors curiosity while safeguarding instructional time and lesson objectives.',
            explanationAr: 'استراتيجية الأسئلة المؤجلة تقدر فضول الطالب وتحفظ في الوقت نفسه الخطة الزمنية للحصة.',
            sourceReference: 'Jeremy Harmer, The Practice of English Language Teaching',
          },
        ],
        commonMistakes: [
          {
            incorrect: 'I know everything, you do not need to ask hard questions.',
            correct: 'That is a very interesting point; let’s examine it together in our reflection slot.',
            explanationEn: 'Defensiveness breeds distance; openness builds intellectual partnership.',
            explanationAr: 'التحسس الدفاعي ينفر الطلاب؛ الترحيب الذكي بالأسئلة يصنع بيئة تعليمية ملهمة.',
          },
        ],
        assignment: {
          titleEn: 'Question Redirection Simulation',
          titleAr: 'محاكاة إعادة تدوير الأسئلة الطلابية',
          instructionsEn: 'Write down two natural expressions you will say when a student asks: "Teacher, why do we say interested IN but good AT?"',
          instructionsAr: 'اكتب عبارتين طبيعيتين لرد السؤال للفصل حين يسأل طالب: "لماذا نقول interested in بينما نقول good at؟"',
          rubrics: [
            {
              criteria: 'Peer Engagement',
              criteriaAr: 'إشراك الزملاء',
              maxPoints: 3,
              descriptors: {
                three: 'Effortlessly shifts intellectual agency back to the room.',
                two: 'Friendly but answers half the question prematurely.',
                one: 'Lectures immediately without involving students.',
              },
            },
          ],
        },
        researchCitations: [
          {
            author: 'Paul Black & Dylan Wiliam',
            work: 'Inside the Black Box: Raising Standards Through Classroom Assessment',
            year: '1998',
            keyTakeaway: 'Formative questioning and increasing wait-time transforms classroom achievement.',
          },
        ],
      },

      // 2.4 Re-explaining Clearly
      {
        id: 'les-2-4',
        number: '2.4',
        slug: 'reexplaining-lesson',
        cefr: 'B2',
        durationMin: 20,
        titleEn: 'Re-explaining Clearly',
        titleAr: 'إعادة الشرح بوضوح وتبسيط المفاهيم',
        subtitleEn: 'Diagnosing the breakdown, breaking syntax into micro-steps, and avoiding simply repeating louder',
        subtitleAr: 'تشخيص مكمن الخلل، تفكيك التراكيب لخطوات دقيقة، وتجنب تكرار نفس الشرح بصوت أعلى',
        objectivesEn: [
          'Pinpoint whether confusion is rooted in vocabulary, grammar form, or task logistics.',
          'Adopt alternative linguistic routes and visual scaffolds instead of repeating the identical sentence.',
          'Use Concept Checking Questions (CCQs) to verify mastery after re-explaining.',
        ],
        objectivesAr: [
          'تحديد بدقة ما إذا كان مكمن الحيرة نابعاً من المفردات، أو تركيب القاعدة، أو متطلبات النشاط.',
          'سلوك مسار لغوي بديل واستخدام دعائم بصرية بدلاً من تكرار نفس الكلام المربك بصوت أعلى.',
          'توظيف أسئلة التحقق المفاهيمي (CCQs) للتأكد التام من رسوخ الفهم بعد إعادة الشرح.',
        ],
        pedagogicalOverviewEn: 'When learners do not understand, repeating the original explanation louder only increases anxiety. Effective educators diagnose the breakdown: they strip away non-essential words, utilize a different analogy, or draw a contrasting diagram.',
        pedagogicalOverviewAr: 'حين يعجز الطلاب عن الاستيعاب، فإن تكرار نفس الشرح بصوت أعلى يضاعف من توترهم. المعلم القدير يشخص سبب التعثر: يتخلص من الحشو اللفظي، أو يستخدم تشبيهاً مختلفاً، أو يرسم رسماً بيانياً مقابلاً.',
        vocabulary: [
          { wordEn: 'breakdown', phonetic: '/ˈbreɪk.daʊn/', meaningAr: 'تعثر أو خلل في الفهم', exampleEn: 'Diagnose where the comprehension breakdown happened.', exampleAr: 'شخص أين حدث الخلل في الاستيعاب.' },
          { wordEn: 'rephrase', phonetic: '/riːˈfreɪz/', meaningAr: 'يعيد الصياغة بأسلوب مبسط', exampleEn: 'Let me rephrase that using a simpler example.', exampleAr: 'دعني أعيد صياغة ذلك باستخدام مثال أكثر بساطة.' },
          { wordEn: 'scaffold', phonetic: '/ˈskæf.əld/', meaningAr: 'يدعم تعليمياً بخطوات متدرجة', exampleEn: 'Scaffold the sentence with sentence frames on the board.', exampleAr: 'ادعم صياغة الجملة بنماذج هيكلية على السبورة.' },
          { wordEn: 'micro-step', phonetic: '/ˈmaɪ.krəʊ step/', meaningAr: 'خطوة تدريجية مصغرة', exampleEn: 'Break this complex passive rule into three micro-steps.', exampleAr: 'قسم قاعدة المبني للمجهول إلى ثلاث خطوات مصغرة.' },
        ],
        grammarNotes: [
          {
            topicEn: 'Formulating Concept Checking Questions (CCQs)',
            topicAr: 'صياغة أسئلة فحص المفاهيم (CCQs)',
            ruleEn: 'CCQs must NEVER use the target language item in the question itself.',
            ruleAr: 'أسئلة الـ CCQs لا يجب مطلقاً أن تستخدم الكلمة المستهدفة نفسها في نص السؤال.',
            tip: 'For "He managed to pass", ask: "Was it easy or difficult? (Difficult). Did he pass? (Yes)."',
          },
        ],
        expressions: [
          {
            id: 'exp-2-4-1',
            english: 'Let us take a step back and look at this from a fresh angle.',
            arabic: 'دعونا نتراجع خطوة للوراء وننظر للأمر من زاوية جديدة تماماً.',
            phoneticTip: '/let ʌs teɪk ə step bæk/',
            pedagogicalNoteEn: 'Anxiety-reducing transition signaling a fresh start.',
            pedagogicalNoteAr: 'عبارة تزيل الحرج والتوتر وتعلن عن انطلاقة تفسيرية جديدة.',
            category: 'transition',
          },
          {
            id: 'exp-2-4-2',
            english: 'Forget the grammar labels for a minute. Look at this real situation instead.',
            arabic: 'انسوا المسميات النحوية الجافة لدقيقة. انظروا لهذا الموقف الحقيقي بدلاً من ذلك.',
            phoneticTip: '/fərˈɡet ðə ˈɡræm.ər ˈleɪ.bəlz/',
            pedagogicalNoteEn: 'De-escalating cognitive overload caused by meta-language.',
            pedagogicalNoteAr: 'تخفيف العبء الذهني الناتج عن المصطلحات النحوية المعقدة.',
            category: 'instruction',
          },
          {
            id: 'exp-2-4-3',
            english: 'Omar, if you bought a car yesterday, is it in your garage now? Yes. That is completed past.',
            arabic: 'يا عمر، لو اشتريت سيارة أمس، هل هي في مرآبك الآن؟ نعم. هذا هو الماضي المكتمل المنتهي.',
            phoneticTip: '/ˈoʊ.mɑːr ɪf juː bɔːt ə kɑːr/',
            pedagogicalNoteEn: 'Socratic binary CCQ establishing tense finality.',
            pedagogicalNoteAr: 'سؤال سقراطي ثنائي ملموس يثبت اكتمال الحدث وانقطاعه عن الحاضر.',
            category: 'questioning',
          },
        ],
        dialogue: [
          { speaker: 'Student', speakerAr: 'طالب', en: 'Teacher, I still do not get why we say "If I had known, I would have gone". It is so long!', ar: 'أستاذ، ما زلت لا أفهم لماذا نقول "If I had known, I would have gone". الجملة طويلة ومعقدة جداً!' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'No worries at all, Kareem. Let us reset. Did you know about the party yesterday?', ar: 'لا تقلق أبداً يا كريم. دعنا نبدأ من جديد. هل كنت تعلم بوجود الحفلة أمس؟' },
          { speaker: 'Student', speakerAr: 'طالب', en: 'No, nobody told me.', ar: 'كلا، لم يخبرني أحد.' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Did you go to the party?', ar: 'وهل ذهبت إلى الحفلة؟' },
          { speaker: 'Student', speakerAr: 'طالب', en: 'No, I stayed home.', ar: 'كلا، بقيت في المنزل.' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Exactly! Both are in the past, and both are imaginary. We use this structure to express regret about past things that did not happen. Much clearer?', ar: 'بالضبط! كلا الأمرين حدثا في الماضي، وكلاهما تخيلي الآن. نستخدم هذا التركيب للتعبير عن الندم على شيء مضى. هل أصبحت أوضح الآن؟' },
        ],
        exercises: [
          {
            id: 'ex-2-4-1',
            promptEn: 'You want to check if students understand the sentence: "She used to play tennis." Which CCQ sequence is correct?',
            promptAr: 'تريد التأكد من استيعاب الطلاب لجملة: "She used to play tennis". أي تسلسل لأسئلة CCQs هو الصحيح؟',
            contextEn: 'Checking the communicative aspect of "used to + infinitive".',
            contextAr: 'التحقق من الدلالة الوظيفية لصيغة used to.',
            options: [
              { id: 'opt-1', textEn: 'Do you know how to use "used to"?', textAr: 'هل تعرفون كيف تستخدمون used to؟', isCorrect: false },
              { id: 'opt-2', textEn: '1. Did she play tennis in the past? (Yes) 2. Did she play once or many times? (Many times/habit) 3. Does she play tennis now? (No).', textAr: '1. هل لعبت التنس في الماضي؟ (نعم) 2. هل لعبت مرة واحدة أم مرات عديدة؟ (مرات عديدة) 3. هل تلعب التنس الآن؟ (كلا).', isCorrect: true },
              { id: 'opt-3', textEn: 'Can anyone conjugate tennis in the present?', textAr: 'هل يستطيع أحد تصريف كلمة تنس في المضارع؟', isCorrect: false },
              { id: 'opt-4', textEn: 'What is the grammatical part of speech of used?', textAr: 'ما هو الموقع الإعرابي لكلمة used؟', isCorrect: false },
            ],
            explanationEn: 'Effective CCQs dissect meaning into binary components (past habit vs. present cessation) without using the target phrase.',
            explanationAr: 'أسئلة CCQs الناجحة تفكك المعنى إلى عناصر ثنائية قطعية (عادة ماضية مقابل انقطاعها الآن) دون تكرار الكلمة نفسها.',
            sourceReference: 'Workman, Concept Questions and Time Lines (Chadburn Publishing)',
          },
        ],
        commonMistakes: [
          {
            incorrect: 'I already explained this! Listen to me carefully this time: [repeats identical sentence louder].',
            correct: 'Let’s look at this another way. Picture this story...',
            explanationEn: 'Volume never compensates for lack of conceptual clarity; change the pedagogical angle.',
            explanationAr: 'رفع الصوت لا يعوض غياب الوضوح؛ غير الزاوية واستخدم قصة أو رسماً مختلفاً.',
          },
        ],
        assignment: {
          titleEn: 'CCQ Formulation Matrix',
          titleAr: 'مصفوفة صياغة أسئلة فحص المفاهيم',
          instructionsEn: 'Write 3 short Concept Checking Questions (with expected student answers) to verify comprehension of: "Ali regrets having sold his car."',
          instructionsAr: 'اكتب 3 أسئلة تحقق مفاهيمي قصيرة مع الإجابات المتوقعة للتأكد من فهم جملة: "علي نادم على بيع سيارته".',
          rubrics: [
            {
              criteria: 'CCQ Integrity',
              criteriaAr: 'سلامة أسئلة فحص المفاهيم',
              maxPoints: 3,
              descriptors: {
                three: 'Zero usage of target words; unambiguous binary answers.',
                two: 'Good questions but contains one ambiguous term.',
                one: 'Uses target words or asks vague questions.',
              },
            },
          ],
        },
        researchCitations: [
          {
            author: 'Jim Scrivener',
            work: 'Learning Teaching: The Essential Guide to English Language Teaching',
            year: '2011',
            keyTakeaway: 'CCQs unpack the core presuppositions and semantic components of language.',
          },
        ],
      },

      // 2.5 Encouraging Participation
      {
        id: 'les-2-5',
        number: '2.5',
        slug: 'encouraging-participation',
        cefr: 'B1',
        durationMin: 15,
        titleEn: 'Encouraging Participation',
        titleAr: 'تشجيع التفاعل والمشاركة الطلابية',
        subtitleEn: 'Think-Pair-Share, strategic wait-time, and inviting shy or reticent learners',
        subtitleAr: 'استراتيجية (فكر-زاوج-شارك)، إطالة زمن الانتظار، وإشراك الطلاب الخجولين بلباقة',
        objectivesEn: [
          'Implement the Think-Pair-Share protocol to provide thinking safety before public speaking.',
          'Extend teacher wait-time from 1 second to at least 3-5 seconds after asking questions.',
          'Gently draw introverted and hesitant students into class discussions without causing anxiety.',
        ],
        objectivesAr: [
          'تطبيق استراتيجية (فكر-زاوج-شارك) لمنح الطلاب الأمان الذهني قبل التحدث أمام الجميع.',
          'زيادة مدة انتظار إجابة السؤال (Wait-Time) من ثانية واحدة إلى 3-5 ثوانٍ كاملة.',
          'دمج الطلاب الخجولين والمترددين في النقاشات الصفية بلباقة ودون إحراج.',
        ],
        pedagogicalOverviewEn: 'Mary Budd Rowe’s seminal research revealed teachers typically wait only 0.9 seconds before answering their own questions. Extending wait-time to 3–5 seconds increases student responses by over 300% and encourages reticent learners to participate.',
        pedagogicalOverviewAr: 'أظهرت دراسات الدكتورة ماري باد رو أن المعلمين ينتظرون في المتوسط 0.9 ثانية فقط قبل الإجابة عن أسئلتهم بأنفسهم! تمديد وقت الانتظار إلى 3-5 ثوانٍ يضاعف استجابات الطلاب بنسبة 300% ويشجع المترددين.',
        vocabulary: [
          { wordEn: 'wait-time', phonetic: '/ˈweɪt ˌtaɪm/', meaningAr: 'فترة الانتظار بعد طرح السؤال', exampleEn: 'Increase your wait-time so shy students can think.', exampleAr: 'زد فترة الانتظار ليتمكن الطلاب الخجولون من التفكير.' },
          { wordEn: 'reticent', phonetic: '/ˈret.ɪ.sənt/', meaningAr: 'متردد أو قليل الكلام', exampleEn: 'Encourage reticent students with low-stakes questions.', exampleAr: 'شجع الطلاب المترددين بأسئلة سهلة لا تنطوي على مخاطرة.' },
          { wordEn: 'rehearse', phonetic: '/rɪˈhɜːrs/', meaningAr: 'يتدرب ويهيئ الحديث مع زميله', exampleEn: 'Let students rehearse their answers in pairs first.', exampleAr: 'دع الطلاب يتدربون على إجاباتهم في أزواج أولاً.' },
          { wordEn: 'low-stakes', phonetic: '/ˌloʊ ˈsteɪks/', meaningAr: 'قليل المخاطرة ولا يسبب حرجاً', exampleEn: 'Start discussions with low-stakes opinion questions.', exampleAr: 'ابدأ النقاش بأسئلة رأي سهلة لا تحمل إجابة خاطئة.' },
        ],
        grammarNotes: [
          {
            topicEn: 'Open-ended Prompts for Elaboration',
            topicAr: 'الأسئلة مفتوحة النهاية لإثراء الإجابات',
            ruleEn: 'Replace closed "Did you like it?" with "What was the most surprising detail, and why?"',
            ruleAr: 'استبدل الأسئلة المغلقة بأسئلة مفتوحة تستدعي الشرح والتفصيل وإبداء الرأي.',
            tip: 'Use phrases like "Tell me more about that" to nudge students gently.',
          },
        ],
        expressions: [
          {
            id: 'exp-2-5-1',
            english: 'Take thirty seconds to think silently. Do not raise your hands yet.',
            arabic: 'خذوا ثلاثين ثانية للتفكير الصامت. لا ترفعوا أيديكم بعد.',
            phoneticTip: '/teɪk ˈθɜːr.ti ˈsek.əndz/',
            pedagogicalNoteEn: 'Protected wait-time preventing dominant students from monopolizing.',
            pedagogicalNoteAr: 'حماية زمن التفكير تمنع الطلاب المندفعين من احتكار الحصة وتتيح للجميع الفرصة.',
            category: 'management',
          },
          {
            id: 'exp-2-5-2',
            english: 'Turn to your neighbor. Share your thoughts for one minute before we open the floor.',
            arabic: 'التفتوا إلى زميلكم المجاور. شاركوا أفكاركم لمدة دقيقة قبل فتح باب النقاش العام.',
            phoneticTip: '/tɜːrn tuː jɔːr ˈneɪ.bər/',
            pedagogicalNoteEn: 'Pair rehearsal stage providing low-risk rehearsal.',
            pedagogicalNoteAr: 'مرحلة التدريب الثنائي التي تمنح الطالب ثقة قبل التحدث أمام الفصل بأكمله.',
            category: 'instruction',
          },
          {
            id: 'exp-2-5-3',
            english: 'I love how carefully you were listening, Salma. What did you and your partner discuss?',
            arabic: 'أعجبني إنصاتك وتركيزك يا سلمى. ما الذي ناقشتِه مع زميلتك؟',
            phoneticTip: '/aɪ lʌv haʊ ˈkeər.fəl.i/',
            pedagogicalNoteEn: 'Gentle indirect nomination reducing performance anxiety.',
            pedagogicalNoteAr: 'مناداة لطيفة غير مباغتة تسأل عن نقاش الزملاء لتقليل التوتر.',
            category: 'feedback',
          },
        ],
        dialogue: [
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Why do you think the author chose the forest as the setting? Think silently for 10 seconds. No hands.', ar: 'لماذا تعتقدون أن الكاتب اختار الغابة كمسرح للأحداث؟ فكروا بصمت لعشر ثوانٍ. بدون رفع الأيدي.' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Now, turn to your partner and test your theories.', ar: 'والآن، التفتوا لزملائكم وناقشوا توقعاتكم.' },
          { speaker: 'Class', speakerAr: 'الفصل', en: '(Lively paired discussions for 60 seconds)', ar: '(نقاشات حية بين الأزواج لمدة دقيقة)' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Eyes back on me. Tarek, what did your partner say about the mystery?', ar: 'انتباهكم إليّ من جديد. يا طارق، ما الذي قالته زميلتك عن الغموض في القصة؟' },
          { speaker: 'Student', speakerAr: 'طالب', en: 'She said the forest makes everything feel dangerous and unknown.', ar: 'قالت إن الغابة تجعل كل شيء يبدو محفوفاً بالخطر والغموض.' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'What a poetic insight! Wonderful teamwork, you two.', ar: 'يا له من استبصار بليغ ورائع! عمل جماعي ممتاز أنتما الاثنان.' },
        ],
        exercises: [
          {
            id: 'ex-2-5-1',
            promptEn: 'Why is the Think-Pair-Share technique particularly effective for lower-confidence second language learners?',
            promptAr: 'لماذا تُعد استراتيجية (فكر-زاوج-شارك) فعالة جداً لطلاب اللغات ذوي الثقة المحدودة؟',
            contextEn: 'In whole-class questioning, the same 3 extroverted students answer every time.',
            contextAr: 'في الأسئلة العامة، يستحوذ نفس الطلاب الثلاثة المنطلقين على كل الإجابات.',
            options: [
              { id: 'opt-1', textEn: 'Because it gives the teacher a 5-minute break to grade papers.', textAr: 'لأنها تمنح المعلم استراحة لتصحيح الدفاتر.', isCorrect: false },
              { id: 'opt-2', textEn: 'Because it offers individual processing time and a low-stakes rehearsal with one peer before whole-class scrutiny.', textAr: 'لأنها تتيح وقتاً للمعالجة الذهنية الفردية وتدريباً آمناً مع زميل واحد قبل مواجهة الفصل.', isCorrect: true },
              { id: 'opt-3', textEn: 'Because it eliminates the need to speak English.', textAr: 'لأنها تلغي الحاجة للتحدث بالإنجليزية.', isCorrect: false },
              { id: 'opt-4', textEn: 'Because it forces students to memorize the textbook answers.', textAr: 'لأنها تجبر الطلاب على حفظ إجابات الكتاب.', isCorrect: false },
            ],
            explanationEn: 'Pair rehearsal reduces affective filter and anxiety, boosting participation rates across all proficiency bands.',
            explanationAr: 'التدريب الثنائي يقلل حاجز القلق والتردد النفسي، مما يرفع معدلات المشاركة لدى جميع المستويات.',
            sourceReference: 'Kagan, Cooperative Learning (Kagan Publishing)',
          },
        ],
        commonMistakes: [
          {
            incorrect: 'Who knows the answer? Anyone? Nobody? Okay, the answer is London.',
            correct: 'Think about question 3 for twenty seconds... Now whisper your idea to your partner.',
            explanationEn: 'Rushing in to answer your own questions creates learned helplessness in students.',
            explanationAr: 'استعجال المعلم للإجابة عن سؤاله بنفسه يربي لدى الطلاب تواكلاً وسلبية تامة.',
          },
        ],
        assignment: {
          titleEn: 'Think-Pair-Share Lesson Plan',
          titleAr: 'خطة تطبيق استراتيجية فكر-زاوج-شارك',
          instructionsEn: 'Design an open-ended discussion question for a reading topic, specifying the exact time limits for the Think, Pair, and Share phases.',
          instructionsAr: 'صمم سؤال نقاش مفتوح لنص قراءة مع تحديد التوقيت الدقيق لمراحل: فكر، زاوج، شارك.',
          rubrics: [
            {
              criteria: 'Timing and Stage Clarity',
              criteriaAr: 'وضوح المراحل والزمن',
              maxPoints: 3,
              descriptors: {
                three: 'Realistic timings (30s think, 60s pair, 90s share); motivating prompt.',
                two: 'Good prompt but disproportionate timings.',
                one: 'Rushed or vague phases.',
              },
            },
          ],
        },
        researchCitations: [
          {
            author: 'Mary Budd Rowe',
            work: 'Wait-Time and Rewards as Instructional Variables (Journal of Research in Science Teaching)',
            year: '1974',
            keyTakeaway: 'Extending teacher wait-time past 3 seconds dramatically increases syntactic complexity and student participation.',
          },
        ],
      },
    ],
  },

  // ==========================================
  // MODULE 3: Classroom Management & Feedback (A2–B2)
  // ==========================================
  {
    id: 'mod-3',
    number: 3,
    titleEn: 'Classroom Management & Giving Feedback',
    titleAr: 'إدارة الفصل وتقديم التغذية الراجعة التربوية',
    cefrRange: 'A2–B2',
    descriptionEn: 'Master attention-getting routines, non-verbal de-escalation, gentle corrective feedback, growth-oriented praise, and student intrinsic motivation strategies.',
    descriptionAr: 'إتقان بروتوكولات لفت الانتباه، واحتواء التشويش بدون صراخ، والتصحيح اللغوي البناء، والثناء المحفز للنمو، وإشعال الدافعية الذاتية للتعلم.',
    color: '#16A34A',
    lessons: [
      // 3.1 Gaining Attention
      {
        id: 'les-3-1',
        number: '3.1',
        slug: 'gaining-attention',
        cefr: 'A2',
        durationMin: 15,
        titleEn: 'Gaining Attention & Quiet',
        titleAr: 'لفت الانتباه واستعادة الهدوء الصفي',
        subtitleEn: 'Auditory cues, countdowns, and non-verbal presence versus shouting over noise',
        subtitleAr: 'الإشارات الصوتية المتفق عليها، العد التنازلي، ولغة الجسد بدلاً من منافسة الضجيج بالصراخ',
        objectivesEn: [
          'Command instant whole-class silence without raising teacher vocal volume.',
          'Implement call-and-response and countdown routines reliably across lessons.',
          'Use physical stillness and assertive eye contact to anchor room control.',
        ],
        objectivesAr: [
          'استعادة الصمت التام في الفصل بلحظات دون الحاجة لرفع صوت المعلم أو الصراخ.',
          'تطبيق روتين النداﺀ والاستجابة (Call-and-Response) والعد التنازلي المنظم.',
          'توظيف الثبات الجسدي والتواصل البصري الحازم لضبط إيقاع الغرفة الصفية.',
        ],
        pedagogicalOverviewEn: 'Shouting "Quiet!" teaches students that the teacher will compete with their noise. Doug Lemov and Harry Wong demonstrate that quiet signals (countdowns, clapping rhythms, or chime bells) preserve teacher vocal health and train students in self-regulation.',
        pedagogicalOverviewAr: 'الصراخ بكلمة "اسكتوا!" يدرب الطلاب دون قصد على منافسة صوت المعلم. يوضح دوغ ليموف وهاري وونغ أن الإشارات الهادئة المتفق عليها (كالعد التنازلي أو إيقاعات التصفيق) تحمي حنجرة المعلم وتدرب الطلاب على الانضباط الذاتي.',
        vocabulary: [
          { wordEn: 'countdown', phonetic: '/ˈkaʊnt.daʊn/', meaningAr: 'العد التنازلي لاستعادة الهدوء', exampleEn: 'Use a five-second countdown to bring the room to silence.', exampleAr: 'استخدم عداً تنازلياً من خمس ثوانٍ ليعم الهدوء الفصل.' },
          { wordEn: 'call-and-response', phonetic: '/ˌkɔːl ən rɪˈspɒns/', meaningAr: 'أسلوب النداء والاستجابة الجماعية', exampleEn: 'A call-and-response chant focuses attention instantly.', exampleAr: 'هتاف النداء والاستجابة يركز الانتباه على الفور.' },
          { wordEn: 'non-verbal', phonetic: '/ˌnɒnˈvɜː.bəl/', meaningAr: 'غير لفظي / جسدي', exampleEn: 'Non-verbal cues are more powerful than shouting.', exampleAr: 'الإشارات غير اللفظية أكثر قوة وتأثيراً من الصراخ.' },
          { wordEn: 'stillness', phonetic: '/ˈstɪl.nəs/', meaningAr: 'السكون والثبات الوقور', exampleEn: 'Stand in stillness until every student looks at you.', exampleAr: 'قف في ثبات تام حتى ينظر إليك كل طالب في الفصل.' },
        ],
        grammarNotes: [
          {
            topicEn: 'Verbal Economy and Decisive Phrasing',
            topicAr: 'الاقتصاد اللفظي والعبارات الحاسمة',
            ruleEn: 'The fewer words you use to restore order, the more authority they carry.',
            ruleAr: 'كلما قل عدد الكلمات المستخدمة لاستعادة النظام، كلما كانت أكثر هيبة وتأثيراً.',
            tip: 'Lower your pitch and speak slightly softer when asking for silence.',
          },
        ],
        expressions: [
          {
            id: 'exp-3-1-1',
            english: 'Eyes on me in 3... 2... 1... and silence. Thank you.',
            arabic: 'انتباهكم إليّ خلال 3... 2... 1... وصمت تام. شكراً لكم.',
            phoneticTip: '/aɪz ɒn miː ɪn θriː/',
            pedagogicalNoteEn: 'Universal countdown formula training prompt transition.',
            pedagogicalNoteAr: 'صيغة عد تنازلي قياسية تعود الطلاب على الاستجابة الفورية.',
            category: 'management',
          },
          {
            id: 'exp-3-1-2',
            english: 'If you can hear my voice, clap once. If you can hear my voice, clap twice.',
            arabic: 'إذا كنتم تسمعون صوتي، صفقة واحدة. إذا كنتم تسمعون صوتي، صفقتين.',
            phoneticTip: '/ɪf juː kæn hɪər maɪ vɔɪs/',
            pedagogicalNoteEn: 'Sensory acoustic filter drawing chatter into unison action.',
            pedagogicalNoteAr: 'فلتر حركي صوتي يحول الضوضاء المتفرقة إلى استجابة موحدة.',
            category: 'management',
          },
          {
            id: 'exp-3-1-3',
            english: 'I am waiting for two desks in the back. Now we are ready.',
            arabic: 'أنا أنتظر طالبين في المقاعد الخلفية. الآن نحن جميعاً مستعدون.',
            phoneticTip: '/aɪ æm ˈweɪ.tɪŋ fɔːr/',
            pedagogicalNoteEn: 'Positive peer pressure directing non-confrontational spotlight.',
            pedagogicalNoteAr: 'توجيه هادئ يستثمر تأثير الأقران دون تجريح مباشر.',
            category: 'management',
          },
        ],
        dialogue: [
          { speaker: 'Class', speakerAr: 'الفصل', en: '(Loud talking after group work finishes)', ar: '(أصوات مرتفعة بعد انتهاء العمل الجماعي)' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: '(Raises right hand quietly) 5... 4... books closed... 3... 2... 1... and complete silence.', ar: '(يرفع يده اليمنى بهدوء) 5... 4... الكتب مغلقة... 3... 2... 1... وصمت تام.' },
          { speaker: 'Class', speakerAr: 'الفصل', en: '(Noise drops instantly; all eyes on teacher)', ar: '(ينخفض الصوت تماماً؛ وتتجه الأنظار للمعلم)' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Thank you group three, thank you group one. Excellent self-control.', ar: 'شكراً للمجموعة الثالثة، شكراً للمجموعة الأولى. انضباط ذاتي ممتاز.' },
        ],
        exercises: [
          {
            id: 'ex-3-1-1',
            promptEn: 'Why is raising your voice and shouting "BE QUIET!" pedagogically counterproductive?',
            promptAr: 'لماذا يُعد الصراخ ورفع الصوت طلباً للهدوء أمراً غير منتج ومضر تربوياً؟',
            contextEn: 'The classroom is noisy during an energetic speaking exercise.',
            contextAr: 'الفصل يشهد ضجيجاً أثناء نشاط محادثة حماسي.',
            options: [
              { id: 'opt-1', textEn: 'Because students will laugh at your accent.', textAr: 'لأن الطلاب سيضحكون من لكنتك.', isCorrect: false },
              { id: 'opt-2', textEn: 'Because it raises classroom decibel levels, increases teacher vocal strain, and normalizes yelling as the only standard of compliance.', textAr: 'لأنه يرفع مستوى الضوضاء العام، ويرهق حبال المعلم الصوتية، ويجعل الصراخ هو المعيار الوحيد للاستجابة.', isCorrect: true },
              { id: 'opt-3', textEn: 'Because you are not allowed to speak English loudly.', textAr: 'لأنه غير مسموح بالتحدث بالإنجليزية بصوت مرتفع.', isCorrect: false },
              { id: 'opt-4', textEn: 'Because it takes too much time.', textAr: 'لأنه يستغرق وقتاً طويلاً جداً.', isCorrect: false },
            ],
            explanationEn: 'Calm, non-verbal signals and rhythmic countdowns establish psychological containment without escalating room tension.',
            explanationAr: 'الإشارات الهادئة والعد التنازلي الرصين يصنعان احتواءً نفسياً دون تصعيد التوتر في الغرفة الصفية.',
            sourceReference: 'Harry Wong, The First Days of School',
          },
        ],
        commonMistakes: [
          {
            incorrect: 'SHUT UP EVERYONE! SHUT UP NOW!',
            correct: 'Waiting for 100% silence in 3... 2... 1... perfect.',
            explanationEn: 'Rude commands damage teacher-student rapport permanently; use systematic countdowns.',
            explanationAr: 'الألفاظ القاسية تهدم الاحترام المتبادل؛ استخدم العد التنازلي المنظم والمهيب.',
          },
        ],
        assignment: {
          titleEn: 'Attention-Signal Implementation Protocol',
          titleAr: 'بروتوكول تطبيق إشارة جذب الانتباه',
          instructionsEn: 'Write down a script of how you will teach your students a new attention signal (e.g. countdown or chime) on day one.',
          instructionsAr: 'اكتب نصاً يشرح كيف ستدرب طلابك على إشارة جذب انتباه جديدة (كالعد أو الجرس) في اليوم الأول.',
          rubrics: [
            {
              criteria: 'Clarity and Expectation',
              criteriaAr: 'وضوح التوقعات والتدريب',
              maxPoints: 3,
              descriptors: {
                three: 'Explicit physical expectations, positive reinforcement, practice trial.',
                two: 'Clear but misses the practice trial.',
                one: 'Vague instruction without clear steps.',
              },
            },
          ],
        },
        researchCitations: [
          {
            author: 'Doug Lemov',
            work: 'Teach Like a Champion (Technique: 100% and What to Do)',
            year: '2015',
            keyTakeaway: 'Compliance must be visible, universal, and requested with calm authority.',
          },
        ],
      },

      // 3.2 Handling Disruptions
      {
        id: 'les-3-2',
        number: '3.2',
        slug: 'handling-disruptions',
        cefr: 'B1',
        durationMin: 20,
        titleEn: 'Handling Disruptions Calmly',
        titleAr: 'التعامل مع التشويش والمقاطعات بهدوء واحتواء',
        subtitleEn: 'Proximity control, private whispers, and avoiding public power struggles',
        subtitleAr: 'التحكم بالاقتراب المكاني، والتوجيه الفردي الهامس، وتجنب صراع القوى العلني',
        objectivesEn: [
          'Use physical proximity to de-escalate minor side-talk without interrupting whole-class flow.',
          'Address recurring disruptions privately using low-key, dignified verbal interventions.',
          'Avoid power struggles and public embarrassment that trigger adolescent rebellion.',
        ],
        objectivesAr: [
          'توظيف الاقتراب المكاني الهادئ لوقف الأحاديث الجانبية دون قطع تسلسل شرح الحصة.',
          'معالجة السلوكيات المشتتة بشكل فردي هامس يحفظ كرامة الطالب وهيبة الفصل.',
          'تجنب الوقوع في صراع القوى العلني والإحراج الذي يولد العناد لدى المراهقين.',
        ],
        pedagogicalOverviewEn: 'Publicly reprimanding a teenager often invites a public fight to save face. Bill Rogers emphasizes "least intrusive intervention": proximity, non-verbal cues, and a quiet private word preserve dignity while maintaining firm boundaries.',
        pedagogicalOverviewAr: 'التوبيخ العلني للطالب المراهق يدفعه غالباً للمكابرة دفاعاً عن ماء وجهه أمام زملائه. يؤكد الدكتور بيل روجرز على مبدأ "التدخل الأقل إزعاجاً": الاقتراب الهادئ، والهمس الفردي، مع الحزم التربوي.',
        vocabulary: [
          { wordEn: 'proximity', phonetic: '/prɒkˈsɪm.ə.ti/', meaningAr: 'الاقتراب المكاني من الطالب', exampleEn: 'Use proximity control by standing near the chatting students.', exampleAr: 'استخدم الاقتراب المكاني بالوقوف بالقرب من الطلاب المتحدثين.' },
          { wordEn: 'power struggle', phonetic: '/ˈpaʊ.ər ˌstrʌɡ.əl/', meaningAr: 'صراع القوى والجدال العقيم', exampleEn: 'Never enter a public power struggle in front of peers.', exampleAr: 'لا تدخل أبداً في صراع قوى علني أمام الزملاء.' },
          { wordEn: 'de-escalate', phonetic: '/diːˈes.kə.leɪt/', meaningAr: 'يهدئ الموقف وينزع فتيل التوتر', exampleEn: 'A calm, low tone de-escalates tense moments.', exampleAr: 'النبرة الهادئة والمنخفضة تنزع فتيل المواقف المتوترة.' },
          { wordEn: 'dignity', phonetic: '/ˈdɪɡ.nə.ti/', meaningAr: 'الكرامة الإنسانية للتعلم', exampleEn: 'Correct behavioral issues while protecting the student’s dignity.', exampleAr: 'عالج المشكلات السلوكية مع حماية كرامة الطالب.' },
        ],
        grammarNotes: [
          {
            topicEn: 'Conditional Choices for Compliance',
            topicAr: 'صيغ التخيير المشروط لفرض الالتزام الإيجابي',
            ruleEn: 'Offer a dignified choice: "You can focus on your text here, or complete it at the front desk."',
            ruleAr: 'قدم خيارين كلاهما يحقق الهدف: "يمكنك التركيز في كتابك هنا، أو الانتقال للمقعد الأمامي."',
            tip: 'Walk away immediately after offering the choice to give the student space to comply.',
          },
        ],
        expressions: [
          {
            id: 'exp-3-2-1',
            english: 'Hossam, I need your notebook open on exercise 2. Thank you.',
            arabic: 'يا حسام، أحتاج منك فتح دفترك على التمرين 2. شكراً لك.',
            phoneticTip: '/aɪ niːd jɔːr ˈnoʊt.bʊk ˈoʊ.pən/',
            pedagogicalNoteEn: 'Presumptive positive compliance with polite closing gratitude.',
            pedagogicalNoteAr: 'افتراض مسبق للاستجابة الإيجابية يتبعه شكر فوري يغلق باب الجدال.',
            category: 'management',
          },
          {
            id: 'exp-3-2-2',
            english: '(Quiet whisper close to student) Is everything alright? Focus here with us.',
            arabic: '(همس فردي هادئ بجانب الطالب) هل كل شيء على ما يرام؟ ركز معنا هنا.',
            phoneticTip: '/ɪz ˈev.ri.θɪŋ ɔːlˈraɪt/',
            pedagogicalNoteEn: 'Discreet empathetic intervention preventing public defiance.',
            pedagogicalNoteAr: 'تدخل سري عطوف يقطع الشرود دون إشعار بقية الفصل بالمشكلة.',
            category: 'management',
          },
          {
            id: 'exp-3-2-3',
            english: 'You have a choice: join the discussion actively, or we talk after class. I trust you will choose well.',
            arabic: 'لديك خيار: إما المشاركة بفاعلية في النقاش، أو نتحدث سوياً بعد الحصة. وأنا أثق بحسن اختيارك.',
            phoneticTip: '/juː hæv ə tʃɔɪs/',
            pedagogicalNoteEn: 'Structured choice transferring accountability to the learner.',
            pedagogicalNoteAr: 'تخيير منظم يحمل الطالب مسؤولية قراره ويمنحه مخرجاً كريماً.',
            category: 'management',
          },
        ],
        dialogue: [
          { speaker: 'Teacher', speakerAr: 'المعلم', en: '(Notice two students whispering at the back while teaching; walks smoothly toward their desks while continuing to explain the reading)', ar: '(يلاحظ طالبين يتهامسان في الخلف؛ فيتحرك بانسيابية نحوهما مع مواصلة الشرح)' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: '...and so the explorer reached the summit in 1953. (Lightly taps the corner of their desk and makes eye contact with a warm smile)', ar: '...وهكذا وصل المستكشف للقمة عام 1953. (ينقر بخفة على زاوية مكتبهما ويتواصل بصرياً بابتسامة دافئة)' },
          { speaker: 'Student', speakerAr: 'طالب', en: '(Immediately opens his book and stops talking)', ar: '(يفتح كتابه على الفور ويتوقف عن الكلام)' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Thank you. Who can tell me what obstacle the team faced next?', ar: 'شكراً لكما. من يخبرنا ما هي العقبة التالية التي واجهت الفريق؟' },
        ],
        exercises: [
          {
            id: 'ex-3-2-1',
            promptEn: 'What is the "least intrusive intervention" principle in classroom behavior management?',
            promptAr: 'ما هو مبدأ "التدخل الأقل إزعاجاً" في إدارة السلوك الصفي وفق مدرسة بيل روجرز؟',
            contextEn: 'A student is tapping their pen and looking out the window while you explain a task.',
            contextAr: 'طالب ينقر بقلمه وينظر من النافذة أثناء شرحك للمهمة.',
            options: [
              { id: 'opt-1', textEn: 'Send the student to the principal’s office immediately.', textAr: 'طرد الطالب فوراً لمكتب المدير.', isCorrect: false },
              { id: 'opt-2', textEn: 'Address the behavior with the minimum intervention necessary (proximity or a gentle non-verbal signal) so learning flow is not broken.', textAr: 'معالجة السلوك بأقل قدر ممكن من الإزعاج (كالاقتراب المكاني أو إشارة لطيفة) لعدم قطع تدفق التعلم.', isCorrect: true },
              { id: 'opt-3', textEn: 'Stop the entire lesson and make the student apologize in front of everyone.', textAr: 'إيقاف الحصة بالكامل وإجبار الطالب على الاعتذار أمام الجميع.', isCorrect: false },
              { id: 'opt-4', textEn: 'Throw a piece of chalk at the desk.', textAr: 'إلقاء قطعة طباشير نحو المكتب.', isCorrect: false },
            ],
            explanationEn: 'Subtle, low-profile intervention handles minor disengagement without derailing the learning momentum of other students.',
            explanationAr: 'التدخل الهادئ يعالج التشتت دون التضحية بتركيز بقية طلاب الفصل أو تصعيد المشكلة.',
            sourceReference: 'Bill Rogers, Classroom Behaviour: A Practical Guide to Effective Teaching',
          },
        ],
        commonMistakes: [
          {
            incorrect: 'Why are you always talking? Do you think my class is a cafeteria?!',
            correct: 'Maged, books on page 14, please. Thanks.',
            explanationEn: 'Sarcastic rhetorical questions provoke hostility; simple directive statements invite compliance.',
            explanationAr: 'التهكم والأسئلة الاستنكارية تصنع العداء؛ التوجيه المباشر المحترم يحقق الاستجابة الفورية.',
          },
        ],
        assignment: {
          titleEn: 'De-escalation Case Study Script',
          titleAr: 'سيناريو احتواء ونزع فتيل التوتر',
          instructionsEn: 'Write a 4-line script handling a teenager who rolls their eyes and refuses to open their workbook.',
          instructionsAr: 'اكتب حواراً من 4 أسطر تعالج فيه بأسلوب تربوي موقف طالب مراهق يبدي تبرماً ويرفض فتح الكتاب.',
          rubrics: [
            {
              criteria: 'Calm Assertiveness',
              criteriaAr: 'الحزم الهادئ',
              maxPoints: 3,
              descriptors: {
                three: 'Completely de-escalating; offers dignified choice; no sarcasm.',
                two: 'Appropriate but contains mild frustration.',
                one: 'Aggressive or defensive confrontation.',
              },
            },
          ],
        },
        researchCitations: [
          {
            author: 'Bill Rogers',
            work: 'Classroom Behaviour: A Practical Guide to Effective Teaching, Behaviour Management and Colleague Support',
            year: '2015',
            keyTakeaway: 'Focus on primary behavior; tactical pausing and private redirection resolve 90% of infractions.',
          },
        ],
      },

      // 3.3 Positive Reinforcement
      {
        id: 'les-3-3',
        number: '3.3',
        slug: 'positive-reinforcement',
        cefr: 'A2',
        durationMin: 15,
        titleEn: 'Positive Reinforcement',
        titleAr: 'التعزيز الإيجابي والثناء التربوي المحفز',
        subtitleEn: 'Process praise over generic praise, and Carol Dweck’s growth mindset vocabulary',
        subtitleAr: 'الثناء على الجهد والعمليات بدلاً من المدح العشوائي، ومصطلحات عقلية النمو لكارول دويك',
        objectivesEn: [
          'Replace empty praise ("Good job!", "Smart boy!") with specific, effort-based feedback.',
          'Cultivate Carol Dweck’s Growth Mindset by celebrating perseverance through difficult errors.',
          'Reinforce positive learning behaviors by narrating desirable actions across the room.',
        ],
        objectivesAr: [
          'استبدال عبارات المدح الجوفاء ("شاطر!") بتغذية راجعة تركز على الجهد والخطوات المحددة.',
          'ترسيخ "عقلية النمو" للدكتورة كارول دويك من خلال الاحتفاء بالمثابرة وتجاوز الصعوبات.',
          'تعزيز السلوكيات الدراسية الإيجابية عبر إبراز النماذج المتميزة في الفصل في حينها.',
        ],
        pedagogicalOverviewEn: 'Praising innate intelligence ("You are so smart!") actually creates fear of failure. Dr. Carol Dweck’s research proves that praising strategy, persistence, and revision ("I love how you checked your spelling") inspires resilience and long-term achievement.',
        pedagogicalOverviewAr: 'مدح الذكاء الفطري ("أنت ذكي جداً!") يولد لدى الطالب خوفاً من ارتكاب الأخطاء وفقدان هذا اللقب. أثبتت أبحاث الدكتورة كارول دويك أن مدح الجهد والاستراتيجية ("أعجبني تدقيقك في كتابة الكلمات") ينمي المثابرة والتفوق المستدام.',
        vocabulary: [
          { wordEn: 'reinforcement', phonetic: '/ˌriː.ɪnˈfɔːrs.mənt/', meaningAr: 'التعزيز التربوي', exampleEn: 'Positive reinforcement builds lasting motivation.', exampleAr: 'التعزيز الإيجابي يصنع دافعية مستمرة.' },
          { wordEn: 'growth mindset', phonetic: '/ˌɡroʊθ ˈmaɪnd.set/', meaningAr: 'عقلية النمو والتطور', exampleEn: 'Praise effort to cultivate a growth mindset.', exampleAr: 'امدح الجهد لترسيخ عقلية النمو.' },
          { wordEn: 'perseverance', phonetic: '/ˌpɜː.sɪˈvɪə.rəns/', meaningAr: 'المثابرة والإصرار', exampleEn: 'Acknowledge their perseverance on hard questions.', exampleAr: 'أشِد بمثابرتهم في حل الأسئلة الصعبة.' },
          { wordEn: 'specific', phonetic: '/spəˈsɪf.ɪk/', meaningAr: 'محدد ودقيق', exampleEn: 'Give specific praise describing exactly what was well done.', exampleAr: 'قدم ثناءً محدداً يصف بالضبط ما تم إنجازه بإتقان.' },
        ],
        grammarNotes: [
          {
            topicEn: 'Praise Structures Targeting Effort (Gerund Clauses)',
            topicAr: 'صيغ الثناء المركزة على الجهد (باستخدام اسم الفعل Gerund)',
            ruleEn: 'Use frames like "I appreciate your doing X" or "Notice how she solved Y by using Z".',
            ruleAr: 'استخدم صياغات مثل: "أقدر فيك قيامك بـ كذا" أو "لاحظوا كيف حلت المسألة باستخدام كذا".',
            tip: 'Avoid praising speed; praise depth of thought and revision.',
          },
        ],
        expressions: [
          {
            id: 'exp-3-3-1',
            english: 'I love how you used three different descriptive adjectives in that sentence. That is rich writing!',
            arabic: 'أعجبني جداً استخدامك لثلاث صفات وصفية متنوعة في تلك الجملة. هذه كتابة ثرية حقاً!',
            phoneticTip: '/aɪ lʌv haʊ juː juːzd/',
            pedagogicalNoteEn: 'Specific process praise identifying exact academic merit.',
            pedagogicalNoteAr: 'ثناء نوعي محدد يبرز العنصر الإبداعي الأكاديمي الذي يستحق الإشادة.',
            category: 'feedback',
          },
          {
            id: 'exp-3-3-2',
            english: 'That was a tricky problem, but you did not give up. Look at your progress between draft 1 and draft 2!',
            arabic: 'كانت مسألة صعبة ومليئة بالتحدي، لكنك لم تستسلم. انظر للتطور الهائل بين مسودتك الأولى والثانية!',
            phoneticTip: '/ðæt wɒz ə ˈtrɪk.i ˈprɒb.ləm/',
            pedagogicalNoteEn: 'Growth mindset encouragement spotlighting iterative revision.',
            pedagogicalNoteAr: 'تحفيز يرسخ عقلية النمو ويوضح قيمة المحاولة والمراجعة المستمرة.',
            category: 'feedback',
          },
          {
            id: 'exp-3-3-3',
            english: 'Notice how table four started immediately without wasting a single second. Superb work ethic!',
            arabic: 'لاحظوا كيف بدأت المجموعة الرابعة العمل فوراً دون إضاعة ثانية واحدة. روح عمل واجتهاد رائعة!',
            phoneticTip: '/ˈnoʊ.tɪs haʊ ˈteɪ.bəl fɔːr/',
            pedagogicalNoteEn: 'Public behavioral narration encouraging peer imitation.',
            pedagogicalNoteAr: 'وصف إيجابي لسلوك مثالي يحفز بقية الفصل على الاقتداء به.',
            category: 'management',
          },
        ],
        dialogue: [
          { speaker: 'Student', speakerAr: 'طالب', en: 'Teacher, I wrote this paragraph, but I made four grammar mistakes in my first attempt.', ar: 'أستاذ، كتبت هذه الفقرة، لكنني ارتكبت أربعة أخطاء نحوية في محاولتي الأولى.' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Mistakes are proof that you are learning! Look at how you self-corrected three of them when you re-read. That shows true linguistic maturity.', ar: 'الأخطاء دليل قاطع على أنك تتعلم! انظر كيف قمت بتصحيح ثلاثة منها بنفسك عند إعادة القراءة. هذا يدل على نضج لغوي حقيقي.' },
          { speaker: 'Student', speakerAr: 'طالب', en: 'Really? I thought making mistakes meant I was bad at English.', ar: 'حقاً؟ كنت أظن أن الخطأ يعني أنني ضعيف في الإنجليزية.' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Never! Growth comes through fixing errors. Keep that curious mindset!', ar: 'أبداً! النمو الحقيقي يأتي من معالجة الأخطاء وتجاوزها. حافظ على هذه الروح!' },
        ],
        exercises: [
          {
            id: 'ex-3-3-1',
            promptEn: 'According to Carol Dweck’s research on praise and mindset, which phrase is most beneficial to long-term student development?',
            promptAr: 'وفق أبحاث الدكتورة كارول دويك حول الثناء وعقلية النمو، أي العبارات التالية هي الأكثر نفعاً لتطور الطالب؟',
            contextEn: 'A student successfully completes a challenging listening task after two failed attempts.',
            contextAr: 'أنجز طالب نشاط استماع صعباً بعد محاولتين غير موفقتين.',
            options: [
              { id: 'opt-1', textEn: 'You are a natural genius! Nobody else could do that.', textAr: 'أنت عبقري بالفطرة! لا أحد غيرك يستطيع حل ذلك.', isCorrect: false },
              { id: 'opt-2', textEn: 'I am so impressed by your determination; you listened for the keywords and adapted your strategy until it worked.', textAr: 'أنا فخور بإصرارك ومثابرتك؛ أنصتّ للكلمات المفتاحية وطوّرت خطتك حتى نجحت.', isCorrect: true },
              { id: 'opt-3', textEn: 'See? It was so easy, you should not have struggled.', textAr: 'رأيت؟ كان الأمر في غاية السهولة ولم يكن يستحق كل هذا العناء.', isCorrect: false },
              { id: 'opt-4', textEn: 'Good boy, sit down.', textAr: 'شاطر، اجلس مكانك.', isCorrect: false },
            ],
            explanationEn: 'Process praise targets effort, strategy, and perseverance, instilling resilience rather than fear of failure.',
            explanationAr: 'الثناء على خطوات العمل والمثابرة يبني الصلابة النفسية ويحفز الطالب على خوض التحديات المعرفية.',
            sourceReference: 'Carol Dweck, Mindset: The New Psychology of Success',
          },
        ],
        commonMistakes: [
          {
            incorrect: 'Good! Excellent! Clever boy! (repeated mechanically 50 times per class)',
            correct: 'Great transition in line 2, Ziad. It makes your argument much more persuasive.',
            explanationEn: 'Mechanical praise loses all meaning; specific feedback tells the student what worked.',
            explanationAr: 'المدح الآلي المكرر يفقد كل قيمة؛ الثناء النوعي يوضح للطالب سر تميز إجابته.',
          },
        ],
        assignment: {
          titleEn: 'Effort-Focused Feedback Conversion',
          titleAr: 'تحويل الثناء التقليدي لثناء قائم على الجهد',
          instructionsEn: 'Rewrite the following generic praises into process praise: 1. "You are very smart." 2. "Good presentation." 3. "Nice drawing."',
          instructionsAr: 'أعد صياغة العبارات التقليدية الثلاث التالية إلى عبارات ثناء نوعية تركز على الجهد والخطوات.',
          rubrics: [
            {
              criteria: 'Growth Mindset Alignment',
              criteriaAr: 'التوافق مع عقلية النمو',
              maxPoints: 3,
              descriptors: {
                three: 'All three rewritten with explicit strategy/effort targets.',
                two: 'Two out of three accurately transformed.',
                one: 'Remains superficial or generic.',
              },
            },
          ],
        },
        researchCitations: [
          {
            author: 'Carol Dweck',
            work: 'Mindset: The New Psychology of Success (Random House)',
            year: '2006',
            keyTakeaway: 'Praising the process of learning yields children who are hardy and resilient in the face of setbacks.',
          },
        ],
      },

      // 3.4 Correcting Errors Kindly
      {
        id: 'les-3-4',
        number: '3.4',
        slug: 'correcting-errors',
        cefr: 'B2',
        durationMin: 20,
        titleEn: 'Correcting Errors Kindly & Constructively',
        titleAr: 'تصحيح الأخطاء بلباقة وأسلوب تربوي بناء',
        subtitleEn: 'Balancing fluency vs accuracy: finger correction, delayed feedback, and peer editing',
        subtitleAr: 'الموازنة بين الطلاقة والدقة: التصحيح بالأصابع، التغذية الراجعة المؤجلة، وتصويب الأقران',
        objectivesEn: [
          'Distinguish between fluency activities (delayed feedback) and accuracy drills (on-the-spot correction).',
          'Use subtle non-verbal cues (finger-correction, questioning intonation) before supplying the answer.',
          'Conduct delayed feedback sessions on the board anonymously without stigmatizing students.',
        ],
        objectivesAr: [
          'التمييز بين أنشطة الطلاقة (تغذية راجعة مؤجلة) وأنشطة الدقة (تصحيح فوري سريع).',
          'استخدام الإشارات غير اللفظية (التصحيح بالأصابع، نبرة التساؤل) لتحفيز التصحيح الذاتي.',
          'إدارة جلسات التغذية الراجعة المؤجلة على السبورة بدون ذكر أسماء لعدم إحراج أحد.',
        ],
        pedagogicalOverviewEn: 'Interrupting a student mid-sentence during a fluency activity destroys communication and confidence. Adrian Underhill and Jeremy Harmer advocate for "delayed feedback": the teacher notes down errors silently, writes them anonymously on the board afterwards, and has the class edit them collectively.',
        pedagogicalOverviewAr: 'مقاطعة الطالب في منتصف حديثه أثناء نشاط طلاقة يهدم ثقته ورغبته في التعبير. يوصي الخبراء بـ "التغذية الراجعة المؤجلة": يدون المعلم الأخطاء في مفكرته بصمت، ثم يكتبها على السبورة دون أسماء ليصححها الجميع معاً.',
        vocabulary: [
          { wordEn: 'fluency', phonetic: '/ˈfluː.ən.si/', meaningAr: 'الطلاقة والانسيابية في الحديث', exampleEn: 'Focus on fluency during free speaking practice.', exampleAr: 'ركز على الطلاقة أثناء محادثات التحدث الحر.' },
          { wordEn: 'accuracy', phonetic: '/ˈæk.jʊ.rə.si/', meaningAr: 'الدقة اللغوية وصحة التراكيب', exampleEn: 'Check for accuracy during the grammar exercise.', exampleAr: 'تحقق من الدقة أثناء تمرين القواعد.' },
          { wordEn: 'delayed feedback', phonetic: '/dɪˈleɪd ˈfiːd.bæk/', meaningAr: 'التغذية الراجعة المؤجلة', exampleEn: 'Delayed feedback keeps fluency discussions flowing.', exampleAr: 'التغذية الراجعة المؤجلة تحافظ على انسيابية النقاشات.' },
          { wordEn: 'finger correction', phonetic: '/ˈfɪŋ.ɡər kəˈrek.ʃən/', meaningAr: 'التصحيح باستخدام الأصابع للإشارة للكلمة الناقصة', exampleEn: 'Use finger correction to indicate a missing auxiliary verb.', exampleAr: 'استخدم الأصابع للإشارة إلى موضع الفعل المساعد الناقص.' },
        ],
        grammarNotes: [
          {
            topicEn: 'Delayed Feedback Board Anonymous Formatting',
            topicAr: 'تنسيق أخطاء التغذية الراجعة المؤجلة على السبورة',
            ruleEn: 'Write 4 genuine sentences heard during pair work. Label the column: "Spot the Upgrade".',
            ruleAr: 'اكتب 4 جمل سمعتها أثناء عمل المجموعات تحت عنوان محفز مثل: "اكتشف التحسين المطلوب".',
            tip: 'Include one sentence that was completely correct to celebrate authentic usage.',
          },
        ],
        expressions: [
          {
            id: 'exp-3-4-1',
            english: 'Almost! Listen to your verb ending: "Yesterday he GO...?" Try again, Nour.',
            arabic: 'أوشكتِ على الصواب! أنصتي لنهاية الفعل: "Yesterday he GO...؟" حاولي ثانية يا نور.',
            phoneticTip: '/ˈɔːl.moʊst ˈlɪs.ən tuː/',
            pedagogicalNoteEn: 'Echo prompt with rising intonation cueing self-correction.',
            pedagogicalNoteAr: 'ترديد الكلمة بنبرة تساؤل تصاعدية تحفز الطالب على تصحيح نفسه ذاتياً.',
            category: 'feedback',
          },
          {
            id: 'exp-3-4-2',
            english: 'Look at my five fingers. Each finger is a word: "She... is... not... ready." Where did the word slip?',
            arabic: 'انظروا إلى أصابعي الخمسة. كل إصبع يمثل كلمة: "She... is... not... ready." أين سقطت الكلمة؟',
            phoneticTip: '/lʊk æt maɪ faɪv ˈfɪŋ.ɡərz/',
            pedagogicalNoteEn: 'Tactile finger correction providing spatial grammar scaffolding.',
            pedagogicalNoteAr: 'تصحيح حركي ملموس بالأصابع يحدد موقع الخلل القواعدي دون كلام محرج.',
            category: 'instruction',
          },
          {
            id: 'exp-3-4-3',
            english: 'Here are three lovely phrases I overheard. Let us polish them together on the board.',
            arabic: 'هذه ثلاث عبارات جميلة التقطتها من نقاشاتكم الرائعة. دعونا نصقلها ونطورها معاً على السبورة.',
            phoneticTip: '/hɪər ɑːr θriː ˈlʌv.li ˈfreɪ.zɪz/',
            pedagogicalNoteEn: 'Non-threatening framing introducing delayed error correction.',
            pedagogicalNoteAr: 'مدخل دافئ وودي لتقديم تصحيح الأخطاء المؤجل بروح التعاون.',
            category: 'feedback',
          },
        ],
        dialogue: [
          { speaker: 'Student', speakerAr: 'طالب', en: 'In my opinion, people which lives in cities are more stressed.', ar: 'في رأيي، الناس الذي يعيشون في المدن أكثر توتراً.' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: '(Nods warmly to encourage flow) Interesting point! (After student finishes speaking) You said: "People WHICH lives". If we speak about humans, do we use which, or who?', ar: '(يومئ بلطف لتشجيعه على الإكمال) نقطة مثيرة! (بعد انتهاء الطالب) قلت: "الناس التي يعيشون". حين نتحدث عن البشر، هل نستخدم which أم who؟' },
          { speaker: 'Student', speakerAr: 'طالب', en: 'Ah! People WHO live!', ar: 'آه! الناس الذين يعيشون!' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Spot on! Beautiful recovery. Continue your thoughts.', ar: 'أحسنت تماماً! تصويب ذاتي رائع. أكمل فكرتك القيمة.' },
        ],
        exercises: [
          {
            id: 'ex-3-4-1',
            promptEn: 'During a 10-minute student debate (fluency focus), a student says "He don’t know nothing." What should the teacher do?',
            promptAr: 'أثناء مناظرة طلابية مدتها 10 دقائق (تركز على الطلاقة)، قال طالب "He don’t know nothing". ماذا يجب على المعلم فعله؟',
            contextEn: 'The class is deeply engaged in expressing opinions on environmental conservation.',
            contextAr: 'الطلاب مندمجون تماماً في التعبير عن آرائهم حول حماية البيئة.',
            options: [
              { id: 'opt-1', textEn: 'Stop the debate immediately, make the student repeat the rule five times, and deduct points.', textAr: 'إيقاف المناظرة فوراً، وإجبار الطالب على تكرار القاعدة خمس مرات، وخصم درجات.', isCorrect: false },
              { id: 'opt-2', textEn: 'Jot down the sentence in a teaching notebook without interrupting the speaker, and analyze it with the whole class during delayed feedback.', textAr: 'تدوين الجملة في مفكرة المعلم دون مقاطعة المتحدث، ومناقشتها مع الفصل لاحقاً خلال جلسة التصحيح المؤجل.', isCorrect: true },
              { id: 'opt-3', textEn: 'Laugh loudly so other students notice the double negative.', textAr: 'الضحك بصوت عالٍ لينتبه الطلاب لوجود نفي مكرر.', isCorrect: false },
              { id: 'opt-4', textEn: 'Never correct grammar errors under any circumstances.', textAr: 'عدم تصحيح الأخطاء النحوية مطلقاً.', isCorrect: false },
            ],
            explanationEn: 'In fluency stages, uninterrupted communication comes first. Delayed feedback corrects language without shattering speaker flow.',
            explanationAr: 'في مراحل تدريب الطلاقة، تدفق الأفكار هو الأولوية الأولى. التغذية الراجعة المؤجلة تعالج الخطأ دون تحطيم ثقة المتحدث.',
            sourceReference: 'Harmer, The Practice of English Language Teaching & CELTA Guidelines',
          },
        ],
        commonMistakes: [
          {
            incorrect: 'NO! WRONG! Why did you say "goed"?! Go is irregular!',
            correct: 'Listen: "Yesterday I goed..." - how do we say go in the past? Went! Excellent.',
            explanationEn: 'Harsh vocal reprimands induce affective barriers; gentle prompts trigger self-correction.',
            explanationAr: 'الصدمات اللفظية القاسية تصنع حاجز خوف؛ التوجيه الهادئ يستدعي التصويب الذاتي.',
          },
        ],
        assignment: {
          titleEn: 'Delayed Feedback Board Layout',
          titleAr: 'تخطيط سبورة التغذية الراجعة المؤجلة',
          instructionsEn: 'Write out 4 ungrammatical sentences heard in an A2 classroom and design how you will present them on the board for a collaborative correction clinic.',
          instructionsAr: 'اكتب 4 جمل تحتوي أخطاء شائعة في مستوى A2 وصمم طريقة عرضها على السبورة في ورشة تدريبية مشتركة لتصويب الأخطاء.',
          rubrics: [
            {
              criteria: 'Diagnostic Constructiveness',
              criteriaAr: 'البناء التشخيصي الهادف',
              maxPoints: 3,
              descriptors: {
                three: 'Presents clear focus areas; zero student shaming; encourages peer inquiry.',
                two: 'Good sentences but lacks clear board organization.',
                one: 'Confusing or punitive presentation.',
              },
            },
          ],
        },
        researchCitations: [
          {
            author: 'Adrian Underhill',
            work: 'Sound Foundations: Learning and Teaching Pronunciation (Macmillan)',
            year: '2005',
            keyTakeaway: 'Facilitating internal self-correction develops learner autonomy and acoustic monitoring.',
          },
        ],
      },

      // 3.5 Motivating Students
      {
        id: 'les-3-5',
        number: '3.5',
        slug: 'motivating-students',
        cefr: 'B1',
        durationMin: 20,
        titleEn: 'Motivating Students & Building Confidence',
        titleAr: 'تحفيز الطلاب وبناء الثقة اللغوية المستدامة',
        subtitleEn: 'Intrinsic drivers, gamification principles, relevance, and creating a safe speaking sanctuary',
        subtitleAr: 'الدوافع الذاتية، مبادئ التعلم باللعب، ربط المحتوى بالواقع، وجعل الفصل ملاذاً آمناً للممارسة',
        objectivesEn: [
          'Cultivate intrinsic motivation by connecting lesson themes to students’ passions and career horizons.',
          'Incorporate cooperative gamification mechanics that reward team effort rather than individual speed.',
          'Establish the English classroom as a psychological sanctuary where taking linguistic risks is celebrated.',
        ],
        objectivesAr: [
          'إشعال الدافعية الذاتية بربط موضوعات الدروس باهتمامات الطلاب وتطلعاتهم وطموحاتهم المستقبلية.',
          'توظيف آليات التلعيب (Gamification) التشاركية التي تكافئ جهد الفريق بدلاً من سرعة الأفراد الفردية.',
          'ترسيخ الفصل كملاذ نفسي آمن يشجع على خوض المخاطرة اللغوية وتجربة التعبير دون وجل.',
        ],
        pedagogicalOverviewEn: 'Extrinsic rewards (candies, grades) lose power rapidly and can even undermine intrinsic curiosity. Zoltan Dornyei’s motivational framework underscores relevance, self-efficacy, and autonomy: when students see English as their personal voice in the world, motivation becomes limitless.',
        pedagogicalOverviewAr: 'المكافآت الخارجية المادية (كالحلوى والدرجات) تفقد بريقها سريعاً وتضعف الشغف الأصيل. يوضح البروفيسور زولتان دورنيي أن محركات الدافعية الحقيقية تكمن في الجدوى، والاستقلالية، وثقة الفرد بقدرته؛ حين يرى الطالب الإنجليزية صوته الشخصي للعالم، تشتعل دوافعه تلقائياً.',
        vocabulary: [
          { wordEn: 'intrinsic', phonetic: '/ɪnˈtrɪn.zɪk/', meaningAr: 'دافعي ذاتي نابع من الداخل', exampleEn: 'Intrinsic motivation lasts far longer than extrinsic rewards.', exampleAr: 'الدافعية الذاتية تدوم أطول بكثير من المكافآت الخارجية.' },
          { wordEn: 'relevance', phonetic: '/ˈrel.ə.vəns/', meaningAr: 'الجدوى والصلة بالواقع المعاش', exampleEn: 'Show the direct relevance of this grammar to real social media.', exampleAr: 'بين الصلة المباشرة بين هذه القواعد واستخدامات وسائل التواصل الواقعية.' },
          { wordEn: 'sanctuary', phonetic: '/ˈsæŋk.tʃʊə.ri/', meaningAr: 'ملاذ آمن مطمئن', exampleEn: 'Make the classroom a psychological sanctuary for free expression.', exampleAr: 'اجعل الفصل ملاذاً نفسياً آمناً للتعبير الحر.' },
          { wordEn: 'gamification', phonetic: '/ˌɡeɪ.mɪ.fɪˈkeɪ.ʃən/', meaningAr: 'التلعيب وتطبيق آليات الألعاب في التعليم', exampleEn: 'Cooperative gamification unites students toward common goals.', exampleAr: 'التلعيب التعاوني يوحد الطلاب نحو تحقيق أهداف مشتركة.' },
        ],
        grammarNotes: [
          {
            topicEn: 'Future Aspiration Structures for Goal Setting',
            topicAr: 'صيغ التعبير عن الطموحات والأهداف المستقبلية',
            ruleEn: 'Practice "I look forward to being able to..." and "One day I hope to...".',
            ruleAr: 'درب الطلاب على صياغات التطلع المستقبلي لربط تعلم اللغة بأحلامهم الحياتية.',
            tip: 'Have students write personal language goals on index cards and review them monthly.',
          },
        ],
        expressions: [
          {
            id: 'exp-3-5-1',
            english: 'In this classroom, mistakes are not embarrassing; they are our stepping stones to greatness.',
            arabic: 'في هذا الفصل، الأخطاء ليست مدعاة للحرج؛ بل هي جسورنا الحقيقية نحو التميز والإتقان.',
            phoneticTip: '/ɪn ðɪs ˈklɑːs.ruːm mɪsˈteɪks/',
            pedagogicalNoteEn: 'Psychological safety declaration transforming classroom climate.',
            pedagogicalNoteAr: 'إعلان تربوي يصنع الأمان النفسي ويحرر الطلاب من عقدة الخوف من الخطأ.',
            category: 'management',
          },
          {
            id: 'exp-3-5-2',
            english: 'You are not just learning grammar rules; you are discovering your international voice.',
            arabic: 'أنتم لا تدرسون مجرد قواعد نظرية؛ أنتم تكتشفون صوتكم الشخصي الذي يخاطب العالم.',
            phoneticTip: '/juː ɑːr nɒt dʒʌst ˈlɜːr.nɪŋ/',
            pedagogicalNoteEn: 'Inspirational empowerment reframing language acquisition.',
            pedagogicalNoteAr: 'خطاب تحفيزي يعيد تعريف تعلم اللغة كقوة تمكين شخصية وحضارية.',
            category: 'transition',
          },
          {
            id: 'exp-3-5-3',
            english: 'Look back at where you were in September. You can now hold a full 5-minute conversation! Be proud of that.',
            arabic: 'تذكروا أين كنتم في بداية العام الدراسي. أنتم الآن قادرون على إدارة محادثة كاملة لـ 5 دقائق! يحق لكم أن تفخروا بذلك.',
            phoneticTip: '/lʊk bæk æt weər juː wɜːr/',
            pedagogicalNoteEn: 'Longitudinal self-comparison building deep self-efficacy.',
            pedagogicalNoteAr: 'مقارنة إيجابية مع الذات في الماضي ترسخ الشعور بالإنجاز والقدرة.',
            category: 'feedback',
          },
        ],
        dialogue: [
          { speaker: 'Student', speakerAr: 'طالب', en: 'Teacher, English is so difficult. I am scared I will never speak like native speakers.', ar: 'أستاذ، اللغة الإنجليزية صعبة جداً. أخشى أنني لن أتحدث أبداً بطلاقة كالمتحدثين الأصليين.' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'Your goal is not to sound like someone else; your goal is to express YOUR brilliant ideas clearly in international English.', ar: 'هدفك ليس أن تقلد شخصاً آخر؛ هدفك هو التعبير عن أفكارك النيرة بوضوح بلغة إنجليزية عالمية.' },
          { speaker: 'Student', speakerAr: 'طالب', en: 'So having an accent does not mean I am failing?', ar: 'إذن وجود لكنة لا يعني أنني فاشل؟' },
          { speaker: 'Teacher', speakerAr: 'المعلم', en: 'An accent is proof of your courage and culture! Be proud of it, speak clearly, and never stay silent.', ar: 'اللكنة دليل شجاعتك وتنوعك الثقافي! اعتز بها، وتحدث بوضوح، ولا تدع الخوف يسكِتك أبداً.' },
        ],
        exercises: [
          {
            id: 'ex-3-5-1',
            promptEn: 'According to Zoltan Dornyei’s Motivational Strategies in the Language Classroom, which approach best builds long-term student engagement?',
            promptAr: 'وفق استراتيجيات البروفيسور زولتان دورنيي لتحفيز دارسي اللغات، أي المداخل التالية هو الأفضل لبناء اندماج مستدام؟',
            contextEn: 'High school students view English as a chore for examinations only.',
            contextAr: 'طلاب المرحلة الثانوية يرون الإنجليزية مجرد عبء للامتحانات المدرسية فقط.',
            options: [
              { id: 'opt-1', textEn: 'Threatening to fail anyone who scores below 70%.', textAr: 'التهديد برسوب أي طالب يحصل على أقل من 70%.', isCorrect: false },
              { id: 'opt-2', textEn: 'Connecting classroom topics to their personal identities, career aspirations, and genuine communicative purposes.', textAr: 'ربط موضوعات الحصص بهوياتهم الشخصية، وطموحاتهم المهنية، والأهداف التواصلية الحقيقية.', isCorrect: true },
              { id: 'opt-3', textEn: 'Promising chocolate for every correct grammar answer.', textAr: 'الوعد بقطع شوكولاتة لكل إجابة قواعد صحيحة.', isCorrect: false },
              { id: 'opt-4', textEn: 'Doubling homework assignments every week.', textAr: 'مضاعفة الواجبات المنزلية كل أسبوع.', isCorrect: false },
            ],
            explanationEn: 'Personal relevance and future self-guides cultivate authentic intrinsic motivation that outlasts test deadlines.',
            explanationAr: 'الجدوى الشخصية وبناء صورة الذات المستقبلية يصنعان دافعية ذاتية أصيلة تتجاوز حدود الامتحانات.',
            sourceReference: 'Zoltan Dornyei, Motivational Strategies in the Language Classroom (Cambridge University Press)',
          },
        ],
        commonMistakes: [
          {
            incorrect: 'If you don’t study, you will fail the government exam and ruin your life.',
            correct: 'Mastering these communication skills opens doors to universities, international careers, and lifelong friendships.',
            explanationEn: 'Fear-based motivation leads to burnout and avoidance; aspirational vision builds enduring commitment.',
            explanationAr: 'التحفيز بالترهيب يولد الاحتراق والنفور؛ الرؤية الإيجابية الملهمة تصنع الالتزام الصادق.',
          },
        ],
        assignment: {
          titleEn: 'Personalized English Vision Project',
          titleAr: 'مشروع رؤية الطالب اللغوية المستقبلية',
          instructionsEn: 'Design a 5-minute warm-up activity where students write and share 3 ways English will empower their dream future profession.',
          instructionsAr: 'صمم نشاط تهيئة من 5 دقائق يكتب فيه الطلاب ويشاركون 3 طرق ستدعم بها الإنجليزية مهنتهم المستقبلية المنشودة.',
          rubrics: [
            {
              criteria: 'Inspirational Value',
              criteriaAr: 'القيمة الإلهامية والربط العملي',
              maxPoints: 3,
              descriptors: {
                three: 'Deeply connecting language utility to personal identity and goals.',
                two: 'Inspiring but slightly academic.',
                one: 'Disconnected from real learner aspirations.',
              },
            },
          ],
        },
        researchCitations: [
          {
            author: 'Zoltan Dornyei',
            work: 'Motivational Strategies in the Language Classroom (Cambridge University Press)',
            year: '2001',
            keyTakeaway: 'The Ideal L2 Self and perceived task relevance are the greatest predictors of sustained communicative effort.',
          },
        ],
      },
    ],
  },
];
`;

const targetFile = path.resolve(process.cwd(), 'src/data/curriculumData.ts');
fs.writeFileSync(targetFile, content, 'utf8');
console.log('Successfully generated full 15-lesson curriculum in src/data/curriculumData.ts');
