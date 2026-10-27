export interface SeoAuditReport {
  score: number;
  totalChecks: number;
  passedChecks: number;
  issues: {
    category: string;
    level: 'critical' | 'warning' | 'good';
    message: string;
    recommendation: string;
  }[];
}

export function auditArticleSeo(article: {
  title: string;
  seoTitle?: string;
  metaDescription?: string;
  content: string;
  slug?: string;
  canonicalUrl?: string;
  featuredImage?: string;
  imageAlt?: string;
  targetKeyword?: string;
}): SeoAuditReport {
  const issues: SeoAuditReport['issues'] = [];
  let score = 100;

  const targetTitle = (article.seoTitle || article.title || '').trim();
  const targetDesc = (article.metaDescription || '').trim();
  const content = article.content || '';
  const keyword = (article.targetKeyword || '').trim().toLowerCase();

  // 1. Title Length Check
  if (!targetTitle) {
    issues.push({
      category: 'Title',
      level: 'critical',
      message: 'العنوان مفقود تماماً (Missing Title)',
      recommendation: 'أضف عنواناً جذاباً ومناسباً لمحركات البحث يتراوح بين 40 و 65 حرفاً.',
    });
    score -= 25;
  } else if (targetTitle.length < 30) {
    issues.push({
      category: 'Title',
      level: 'warning',
      message: `العنوان قصير جداً (${targetTitle.length} حرفاً)`,
      recommendation: 'اجعل العنوان أكثر وضوحاً وتفصيلاً (المثالي 40-65 حرفاً).',
    });
    score -= 10;
  } else if (targetTitle.length > 70) {
    issues.push({
      category: 'Title',
      level: 'warning',
      message: `العنوان طويل وقد يُقتطع في نتائج البحث (${targetTitle.length} حرفاً)`,
      recommendation: 'اختصر العنوان ليكون أقل من 65 حرفاً لتجنب الاقتطاع في Google.',
    });
    score -= 5;
  } else {
    issues.push({
      category: 'Title',
      level: 'good',
      message: `طول العنوان ممتاز (${targetTitle.length} حرفاً)`,
      recommendation: 'العنوان ضمن النطاق الأمثل لمحركات البحث.',
    });
  }

  // 2. Meta Description Check
  if (!targetDesc) {
    issues.push({
      category: 'Meta Description',
      level: 'critical',
      message: 'الوصف التعريفي (Meta Description) غير محدد',
      recommendation: 'أضف وصفاً تسويقياً وتربوياً مختصراً يتراوح بين 120 و 160 حرفاً.',
    });
    score -= 20;
  } else if (targetDesc.length < 80) {
    issues.push({
      category: 'Meta Description',
      level: 'warning',
      message: `الوصف التعريفي قصير (${targetDesc.length} حرفاً)`,
      recommendation: 'زد طول الوصف لتوضيح القيمة التربوية للمقال بشكل أفضل (120-160 حرفاً).',
    });
    score -= 8;
  } else if (targetDesc.length > 165) {
    issues.push({
      category: 'Meta Description',
      level: 'warning',
      message: `الوصف التعريفي طويل (${targetDesc.length} حرفاً)`,
      recommendation: 'قلص الوصف لتفادي اقتطاعه في صفحة نتائج البحث.',
    });
    score -= 5;
  } else {
    issues.push({
      category: 'Meta Description',
      level: 'good',
      message: `الوصف التعريفي متوازن (${targetDesc.length} حرفاً)`,
      recommendation: 'طول الوصف متوافق مع معايير محركات البحث الحديثة.',
    });
  }

  // 3. Content Length Check
  const wordCount = content.replace(/<[^>]*>?/gm, '').trim().split(/\s+/).filter(Boolean).length;
  if (wordCount < 150) {
    issues.push({
      category: 'Content',
      level: 'critical',
      message: `المحتوى التربوي قصير جداً (${wordCount} كلمة)`,
      recommendation: 'المقالات التعليمية المتخصصة يجب ألا تقل عن 350-500 كلمة لتوفير قيمة علمية حقيقية.',
    });
    score -= 20;
  } else if (wordCount < 300) {
    issues.push({
      category: 'Content',
      level: 'warning',
      message: `المحتوى موجز نسبياً (${wordCount} كلمة)`,
      recommendation: 'عزز المقال بأمثلة تدريسية واستراتيجيات عملية ليصل إلى 400+ كلمة.',
    });
    score -= 10;
  } else {
    issues.push({
      category: 'Content',
      level: 'good',
      message: `عمق المحتوى ممتاز (${wordCount} كلمة)`,
      recommendation: 'المقال يقدم تفصيلاً تربوياً كافياً لإفادة المعلمين.',
    });
  }

  // 4. Keyword presence (if targetKeyword is supplied)
  if (keyword) {
    const titleHasKw = targetTitle.toLowerCase().includes(keyword);
    const contentHasKw = content.toLowerCase().includes(keyword);

    if (!titleHasKw) {
      issues.push({
        category: 'Keyword',
        level: 'warning',
        message: `الكلمة المفتاحية "${keyword}" غير موجودة في العنوان`,
        recommendation: 'قم بتضمين الكلمة المفتاحية في بداية أو منتصف العنوان.',
      });
      score -= 10;
    } else {
      issues.push({
        category: 'Keyword',
        level: 'good',
        message: 'الكلمة المفتاحية مستهدفة بنجاح في العنوان',
        recommendation: 'ممتاز للظهور في استعلامات المعلمين المستهدفة.',
      });
    }

    if (!contentHasKw) {
      issues.push({
        category: 'Keyword',
        level: 'warning',
        message: `الكلمة المفتاحية "${keyword}" نادرة أو مفقودة في متن المقال`,
        recommendation: 'استخدم الكلمة المفتاحية ومرادفاتها بشكل طبيعي في سياق الشرح.',
      });
      score -= 5;
    }
  }

  // 5. Slug and Canonical URL check
  if (!article.slug) {
    issues.push({
      category: 'URL',
      level: 'warning',
      message: 'الرابط الدائم (Slug) غير محدد',
      recommendation: 'حدد اسماً للرابط اللطيف لسهولة الوصول والفهرسة.',
    });
    score -= 5;
  } else {
    issues.push({
      category: 'URL',
      level: 'good',
      message: `الرابط الدائم مهيأ: /articles/${article.slug}`,
      recommendation: 'الرابط نظيف وقابل للقراءة والفهرسة.',
    });
  }

  // 6. Image & Alt attribute
  if (article.featuredImage) {
    if (!article.imageAlt || article.imageAlt.trim().length === 0) {
      issues.push({
        category: 'Images',
        level: 'warning',
        message: 'الصورة البارزة تفتقر إلى النص البديل (Alt Text)',
        recommendation: 'أضف نصاً بديلاً دقيقاً لوصف الصورة لمحركات البحث وقارئات الشاشة.',
      });
      score -= 5;
    } else {
      issues.push({
        category: 'Images',
        level: 'good',
        message: 'الصورة البارزة مزودة بنص بديل مناسب',
        recommendation: 'يدعم إمكانية الوصول والتوافق مع متطلبات السيو.',
      });
    }
  }

  const normalizedScore = Math.max(0, Math.min(100, score));
  const passedChecks = issues.filter(i => i.level === 'good').length;

  return {
    score: normalizedScore,
    totalChecks: issues.length,
    passedChecks,
    issues,
  };
}
