#!/usr/bin/env python3
"""
Generates 10 high-resolution, light-mode bilingual 16:9 article cover images.
Includes SmartTech Training & Testing Center logo, Dr. Ahmed Mabrouk photo,
Arabic & English titles, CEFR badges, and clean light-mode educational graphics.
"""

import os
import html

articles_meta = [
    {
        "id": "art-01",
        "slug": "practical-english-teachers-essential-classroom-phrases",
        "ar_title": "العبارات والتعليمات الأساسية داخل الفصل الدراسي",
        "en_title": "Essential Classroom Phrases & Instructions",
        "category_ar": "لغة الفصل الدراسي",
        "category_en": "Classroom English",
        "cefr": "CEFR A2 – B2",
        "badge": "دليل عملي شامل • Practical Guide",
        "icon_theme": "phrases"
    },
    {
        "id": "art-02",
        "slug": "how-teachers-improve-classroom-english-step-by-step",
        "ar_title": "تطوير لغة التدريس الإنجليزية للمعلم خطوة بخطوة",
        "en_title": "How Teachers Improve Classroom English Step-by-Step",
        "category_ar": "التطوير المهني والطلاقة",
        "category_en": "Teacher Fluency Development",
        "cefr": "CEFR B1 – C1",
        "badge": "خارطة طريق مهنية • Strategic Roadmap",
        "icon_theme": "growth"
    },
    {
        "id": "art-03",
        "slug": "english-classroom-management-instructions-engagement",
        "ar_title": "إدارة الفصل بالإنجليزية وضبط السلوك والتفاعل",
        "en_title": "Classroom Management, Clear Instructions & Engagement",
        "category_ar": "إدارة وضبط الفصل",
        "category_en": "Classroom Management",
        "cefr": "CEFR A2 – B2",
        "badge": "استراتيجيات تفاعلية • Engagement Techniques",
        "icon_theme": "management"
    },
    {
        "id": "art-04",
        "slug": "how-to-explain-lessons-in-english-examples-questions",
        "ar_title": "استراتيجيات شرح الدروس المعقدة والأسئلة التحفيزية",
        "en_title": "How to Explain Lessons with Analogy & High-Impact Questions",
        "category_ar": "استراتيجيات التدريس",
        "category_en": "Instructional Strategies",
        "cefr": "CEFR B1 – B2+",
        "badge": "تبسيط المفاهيم • Concept Simplification",
        "icon_theme": "explanation"
    },
    {
        "id": "art-05",
        "slug": "english-phrases-checking-understanding-giving-feedback",
        "ar_title": "التحقق من الفهم وأسئلة ICQs و CCQs والتغذية الراجعة",
        "en_title": "Checking Understanding (ICQs & CCQs) & Constructive Feedback",
        "category_ar": "التقييم التكويني",
        "category_en": "Formative Assessment",
        "cefr": "CEFR B1 – C1",
        "badge": "معايير كامبريدج • Cambridge Standards",
        "icon_theme": "verification"
    },
    {
        "id": "art-06",
        "slug": "english-parent-teacher-communication-meetings-reports",
        "ar_title": "التواصل المهني مع أولياء الأمور وكتابة التقارير",
        "en_title": "Parent-Teacher Conferences, Progress Reports & Diplomacy",
        "category_ar": "التواصل المؤسسي",
        "category_en": "Family Communication",
        "cefr": "CEFR B2 – C1",
        "badge": "دبلوماسية تعليمية • School Diplomacy",
        "icon_theme": "diplomacy"
    },
    {
        "id": "art-07",
        "slug": "english-online-teaching-virtual-classroom-language",
        "ar_title": "إتقان التدريس الرقمي وإدارة الفصول الافتراضية",
        "en_title": "Online Teaching Mastery, Screen Sharing & Digital Staging",
        "category_ar": "التعليم الرقمي",
        "category_en": "Virtual Pedagogy",
        "cefr": "CEFR B1 – B2",
        "badge": "Google Meet & Zoom • EdTech Mastery",
        "icon_theme": "virtual"
    },
    {
        "id": "art-08",
        "slug": "pronunciation-listening-practice-teachers-clear-speech",
        "ar_title": "مخارج الحروف والنطق الواضح ونبرة الصوت للمعلم",
        "en_title": "Teacher Pronunciation, Word Stress & Acoustic Clarity",
        "category_ar": "الصوتيات واللفظ",
        "category_en": "Phonology & Speech",
        "cefr": "CEFR B1 – C2",
        "badge": "وضوح صوتي • Acoustic Precision",
        "icon_theme": "speech"
    },
    {
        "id": "art-09",
        "slug": "professional-english-teachers-meetings-emails-collaboration",
        "ar_title": "الإنجليزية المهنية: اجتماعات الأقسام والمراسلات الرسمية",
        "en_title": "Professional English: Department Meetings & Administrative Emails",
        "category_ar": "القيادة الأكاديمية",
        "category_en": "Academic Leadership",
        "cefr": "CEFR B2 – C1",
        "badge": "إدارة مدرسية • Academic Correspondence",
        "icon_theme": "leadership"
    },
    {
        "id": "art-10",
        "slug": "practical-english-learning-plan-teachers-egypt",
        "ar_title": "خطة الـ 12 أسبوعاً للطلاقة لمعلمي مصر والوطن العربي",
        "en_title": "12-Week Strategic English Fluency Plan for Arab Educators",
        "category_ar": "خطة إتقان شاملة",
        "category_en": "Strategic Fluency Roadmap",
        "cefr": "CEFR B1 → C1",
        "badge": "شهادة اعتماد • Accredited Path",
        "icon_theme": "mastery"
    }
]

output_dir = "/app/applet/public/assets/articles"
os.makedirs(output_dir, exist_ok=True)

for item in articles_meta:
    filename = f"{item['id']}.svg"
    filepath = os.path.join(output_dir, filename)

    ar_title_esc = html.escape(item['ar_title'])
    en_title_esc = html.escape(item['en_title'])
    cat_ar_esc = html.escape(item['category_ar'])
    cat_en_esc = html.escape(item['category_en'])
    cefr_esc = html.escape(item['cefr'])
    badge_esc = html.escape(item['badge'])

    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <!-- Light Mode Gradient Backgrounds -->
    <linearGradient id="bgLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>
    <linearGradient id="redAccent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#dc2626"/>
      <stop offset="100%" stop-color="#b91c1c"/>
    </linearGradient>
    <linearGradient id="softCard" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#fef2f2"/>
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#0f172a" flood-opacity="0.08"/>
    </filter>
    <filter id="photoShadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#dc2626" flood-opacity="0.15"/>
    </filter>
    <clipPath id="circleClip">
      <circle cx="1060" cy="350" r="170"/>
    </clipPath>
    <clipPath id="logoClip">
      <rect x="60" y="45" width="220" height="70" rx="8"/>
    </clipPath>
  </defs>

  <!-- 1. Pure Light Canvas Background -->
  <rect width="1280" height="720" fill="url(#bgLight)"/>

  <!-- Subtle Light Architectural Patterns (No Dark Mode) -->
  <g opacity="0.4">
    <circle cx="1150" cy="100" r="280" fill="#fee2e2" filter="blur(60px)"/>
    <circle cx="100" cy="650" r="240" fill="#fef2f2" filter="blur(50px)"/>
    <path d="M 0,200 L 1280,320" stroke="#fecaca" stroke-width="1.5" stroke-dasharray="8 8" opacity="0.6"/>
    <path d="M 0,550 L 1280,670" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="10 10"/>
  </g>

  <!-- Left SmartTech Red Edge Accent Strip -->
  <rect x="0" y="0" width="16" height="720" fill="url(#redAccent)"/>

  <!-- 2. Header Bar: SmartTech Training & Testing Center -->
  <rect x="50" y="35" width="1180" height="85" rx="16" fill="#ffffff" filter="url(#cardShadow)" stroke="#f1f5f9" stroke-width="2"/>
  
  <!-- SmartTech Brand Logo Image -->
  <image href="/assets/aistudio/Asset_2_4787d13f.png" x="70" y="47" width="200" height="60" preserveAspectRatio="xMidYMid meet"/>
  
  <!-- Brand Text in Header -->
  <text x="290" y="70" font-family="'Inter', system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#dc2626" letter-spacing="1.5">SMARTTECH TRAINING &amp; TESTING CENTER</text>
  <text x="290" y="94" font-family="'Cairo', system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#1e293b">أكاديمية سمارت تك لتطوير المعلمين المتميزين</text>

  <!-- Top Right Badges -->
  <rect x="990" y="55" width="220" height="44" rx="22" fill="#fee2e2" stroke="#fca5a5" stroke-width="1.5"/>
  <circle cx="1012" cy="77" r="6" fill="#dc2626"/>
  <text x="1028" y="82" font-family="'Cairo', 'Inter', sans-serif" font-size="13" font-weight="700" fill="#b91c1c">{badge_esc}</text>

  <!-- 3. Central Main Content Card (Light Mode Elevation) -->
  <rect x="50" y="145" width="780" height="490" rx="24" fill="#ffffff" filter="url(#cardShadow)" stroke="#e2e8f0" stroke-width="1.5"/>

  <!-- Category & Level Chips -->
  <rect x="85" y="180" width="190" height="34" rx="17" fill="#dc2626"/>
  <text x="180" y="202" font-family="'Cairo', 'Inter', sans-serif" font-size="13" font-weight="800" fill="#ffffff" text-anchor="middle">{cat_ar_esc} • {cat_en_esc}</text>

  <rect x="290" y="180" width="130" height="34" rx="17" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="355" y="202" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#334155" text-anchor="middle">{cefr_esc}</text>

  <!-- Arabic Main Headline (Large & Prominent) -->
  <text x="85" y="275" font-family="'Cairo', system-ui, -apple-system, sans-serif" font-size="34" font-weight="900" fill="#0f172a" text-anchor="start">
    {ar_title_esc}
  </text>

  <!-- English Subtitle (Clear Academic Typography) -->
  <text x="85" y="325" font-family="'Inter', system-ui, -apple-system, sans-serif" font-size="21" font-weight="700" fill="#dc2626" text-anchor="start">
    {en_title_esc}
  </text>

  <!-- Divider Line -->
  <line x1="85" y1="360" x2="780" y2="360" stroke="#f1f5f9" stroke-width="2"/>

  <!-- 3 Highlights Bullets in Bilingual Light Mode -->
  <g transform="translate(85, 390)">
    <!-- Bullet 1 -->
    <circle cx="16" cy="18" r="14" fill="#fee2e2"/>
    <text x="16" y="23" font-family="'Inter', sans-serif" font-size="14" font-weight="900" fill="#dc2626" text-anchor="middle">✓</text>
    <text x="42" y="16" font-family="'Cairo', sans-serif" font-size="15" font-weight="700" fill="#1e293b">صيغ وتراكيب لغوية نموذجية معتمدة دولياً</text>
    <text x="42" y="32" font-family="'Inter', sans-serif" font-size="12" font-weight="500" fill="#64748b">Internationally validated classroom discourse models</text>

    <!-- Bullet 2 -->
    <g transform="translate(0, 60)">
      <circle cx="16" cy="18" r="14" fill="#fee2e2"/>
      <text x="16" y="23" font-family="'Inter', sans-serif" font-size="14" font-weight="900" fill="#dc2626" text-anchor="middle">✓</text>
      <text x="42" y="16" font-family="'Cairo', sans-serif" font-size="15" font-weight="700" fill="#1e293b">معالجة تداخل اللهجة الأم وحل مشكلات النطق والطلاقة</text>
      <text x="42" y="32" font-family="'Inter', sans-serif" font-size="12" font-weight="500" fill="#64748b">Targeted remediation for mother-tongue phonetic interference</text>
    </g>

    <!-- Bullet 3 -->
    <g transform="translate(0, 120)">
      <circle cx="16" cy="18" r="14" fill="#fee2e2"/>
      <text x="16" y="23" font-family="'Inter', sans-serif" font-size="14" font-weight="900" fill="#dc2626" text-anchor="middle">✓</text>
      <text x="42" y="16" font-family="'Cairo', sans-serif" font-size="15" font-weight="700" fill="#1e293b">حوارات واقعية وتدريبات تفاعلية صوتية مباشرة</text>
      <text x="42" y="32" font-family="'Inter', sans-serif" font-size="12" font-weight="500" fill="#64748b">Real classroom transcripts with dual-language audio practice</text>
    </g>
  </g>

  <!-- 4. Right Side: Author Identity Card with Dr. Ahmed Mabrouk -->
  <g transform="translate(860, 145)">
    <!-- Card Frame -->
    <rect width="370" height="490" rx="24" fill="url(#softCard)" stroke="#fecaca" stroke-width="2" filter="url(#photoShadow)"/>
    
    <!-- Outer Decorative Rings -->
    <circle cx="185" cy="190" r="150" fill="none" stroke="#fca5a5" stroke-width="2" stroke-dasharray="6 6"/>
    <circle cx="185" cy="190" r="138" fill="#ffffff" stroke="#dc2626" stroke-width="4"/>
    
    <!-- Official Portrait Image Embedded -->
    <clipPath id="authorClip_{item['id']}">
      <circle cx="185" cy="190" r="134"/>
    </clipPath>
    <image href="/assets/aistudio/3A46E16D-DC5E-49CB-85B3-B0F250169350_4ac16809.png" 
           x="40" y="45" width="290" height="290" 
           preserveAspectRatio="xMidYMid slice" 
           clip-path="url(#authorClip_{item['id']})"/>

    <!-- Verification Floating Badge -->
    <rect x="75" y="310" width="220" height="36" rx="18" fill="#ffffff" stroke="#dc2626" stroke-width="2" filter="url(#cardShadow)"/>
    <circle cx="95" cy="328" r="8" fill="#dc2626"/>
    <text x="100" y="333" font-family="'Cairo', 'Inter', sans-serif" font-size="12" font-weight="800" fill="#0f172a">د. أحمد مبروك • خبير معتمد</text>

    <!-- Author Bio & Credentials -->
    <text x="185" y="375" font-family="'Cairo', system-ui, sans-serif" font-size="20" font-weight="900" fill="#0f172a" text-anchor="middle">د. أحمد مبروك</text>
    <text x="185" y="398" font-family="'Inter', sans-serif" font-size="13" font-weight="700" fill="#dc2626" text-anchor="middle">Dr. Ahmed Mabrouk</text>
    <text x="185" y="420" font-family="'Cairo', sans-serif" font-size="13" font-weight="600" fill="#475569" text-anchor="middle">المشرف الأكاديمي والمؤسس العام</text>
    <text x="185" y="440" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#64748b" text-anchor="middle">SmartTech Training &amp; Testing Center</text>

    <!-- Accreditation Stamp Badge -->
    <rect x="85" y="452" width="200" height="24" rx="12" fill="#dc2626"/>
    <text x="185" y="468" font-family="'Cairo', 'Inter', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">منصة تدريب معتمدة • Verified Masterclass</text>
  </g>

  <!-- 5. Bottom Status Strip -->
  <rect x="50" y="650" width="1180" height="50" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="80" y="681" font-family="'Inter', sans-serif" font-size="13" font-weight="700" fill="#dc2626">🌐 teaches.smart-courses.org</text>
  <text x="640" y="681" font-family="'Cairo', sans-serif" font-size="13" font-weight="700" fill="#334155" text-anchor="middle">أكاديمية تدريب المعلمين — بيئة تعليمية ذكية متكاملة باللغتين العربية والإنجليزية</text>
  <text x="1200" y="681" font-family="'Inter', sans-serif" font-size="12" font-weight="800" fill="#0f172a" text-anchor="end">LIGHT MODE 100%</text>
</svg>
"""

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(svg_content)

print(f"Successfully generated all {len(articles_meta)} light-mode bilingual cover images in {output_dir}!")
