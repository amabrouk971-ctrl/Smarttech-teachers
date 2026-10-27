import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateSubscriptionExpiry, isSubscriptionActive, MEMBERSHIP_PLANS } from './pricing';
import { auditArticleSeo } from './seoAuditor';
import { evaluateTeacherResponse, ScenarioOption } from './pedagogyScorer';

test('Membership plans pricing matches exact specification', () => {
  assert.equal(MEMBERSHIP_PLANS.monthly.priceEgp, 50);
  assert.equal(MEMBERSHIP_PLANS.annual.priceEgp, 250);
  assert.equal(MEMBERSHIP_PLANS.annual.originalPriceEgp, 500);
  assert.equal(MEMBERSHIP_PLANS.annual.discountPercentage, 50);
});

test('Subscription expiry adds 1 month for monthly and 12 for annual', () => {
  const start = new Date('2026-01-01T00:00:00Z');
  const monthlyExpiry = calculateSubscriptionExpiry('monthly', start);
  const annualExpiry = calculateSubscriptionExpiry('annual', start);

  assert.equal(monthlyExpiry.getUTCMonth(), 1); // February
  assert.equal(annualExpiry.getUTCFullYear(), 2027); // Next year
});

test('Subscription active checks respect date boundary', () => {
  const future = new Date(Date.now() + 86400000).toISOString();
  const past = new Date(Date.now() - 86400000).toISOString();

  assert.equal(isSubscriptionActive('active', future), true);
  assert.equal(isSubscriptionActive('active', past), false);
  assert.equal(isSubscriptionActive('pending', future), false);
  assert.equal(isSubscriptionActive('expired', future), false);
});

test('SEO auditor detects missing title as critical', () => {
  const report = auditArticleSeo({
    title: '',
    content: 'Long enough content to test SEO auditing properly with enough words to avoid failure.'.repeat(10),
  });
  const critical = report.issues.filter(i => i.level === 'critical');
  assert.ok(critical.length > 0);
  assert.ok(report.score < 80);
});

test('SEO auditor awards high score for well-optimized article', () => {
  const report = auditArticleSeo({
    title: 'استراتيجيات تدريس الرياضيات الحديثة للمرحلة الابتدائية',
    metaDescription: 'دليل عملي شامل لمعلمي الرياضيات في المرحلة الابتدائية لتطبيق استراتيجيات الفهم المفاهيمي ومعالجة المفاهيم الخاطئة بنجاح.',
    content: 'مقال تربوي متكامل يناقش أحدث استراتيجيات تدريس الرياضيات '.repeat(30),
    slug: 'how-to-teach-mathematics',
    targetKeyword: 'تدريس الرياضيات',
    featuredImage: '/assets/sample.png',
    imageAlt: 'معلم يشرح مفهوم الكسور لطلاب المرحلة الابتدائية'
  });
  assert.ok(report.score >= 85);
  assert.ok(report.passedChecks >= 4);
});

test('Pedagogy scorer accurately categorizes master teacher responses', () => {
  const bestOption: ScenarioOption = {
    id: 'opt1',
    textAr: 'استخدم النماذج البصرية المجسمة واستمع لافتراضات الطالب أولاً',
    textEn: 'Use visual manipulatives and listen to student reasoning first',
    isBest: true,
    score: 95,
    pedagogicalRationaleAr: 'تعزيز الفهم المفاهيمي من خلال التدرج والتمثيل البصري',
    pedagogicalRationaleEn: 'Promotes conceptual understanding via scaffolding',
    studentReactionAr: 'يشعر بالثقة ويبدأ بالربط بين الأجزاء والكل',
    studentReactionEn: 'Feels supported and begins grasping the concept',
    category: 'scaffolding'
  };

  const result = evaluateTeacherResponse(bestOption);
  assert.equal(result.score, 95);
  assert.equal(result.levelEn, 'Master Teacher');
});
