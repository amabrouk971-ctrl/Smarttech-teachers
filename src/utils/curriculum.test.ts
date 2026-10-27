import test from 'node:test';
import assert from 'node:assert/strict';
import { CURRICULUM_MODULES } from '../data/curriculumData';
import { calculateCurriculumStats } from '../services/curriculumService';

test('Curriculum has exactly the three required modules with 5 lessons each (15 total)', () => {
  assert.equal(CURRICULUM_MODULES.length, 3);
  assert.equal(CURRICULUM_MODULES[0].titleEn, 'Essential English for Classroom Instructions');
  assert.equal(CURRICULUM_MODULES[1].titleEn, 'Explaining Lessons & Checking Student Understanding');
  assert.equal(CURRICULUM_MODULES[2].titleEn, 'Classroom Management & Giving Feedback');

  let totalLessons = 0;
  for (const module of CURRICULUM_MODULES) {
    assert.equal(module.lessons.length, 5, `Module ${module.number} must contain exactly 5 lessons`);
    totalLessons += module.lessons.length;
  }
  assert.equal(totalLessons, 15, 'Curriculum must contain exactly 15 comprehensive lessons');
});

test('Each of the 15 lessons contains vocabulary, dialogues, expressions, exercises, and rubrics', () => {
  for (const module of CURRICULUM_MODULES) {
    for (const lesson of module.lessons) {
      assert.ok(lesson.slug.length > 2, `Lesson ${lesson.id} missing slug`);
      assert.ok(['A1', 'A2', 'B1', 'B2'].includes(lesson.cefr), `Lesson ${lesson.id} invalid CEFR`);
      assert.ok(lesson.durationMin >= 15, `Lesson ${lesson.id} duration too short`);
      assert.ok(lesson.titleAr.length > 3, `Lesson ${lesson.id} Arabic title missing`);
      assert.ok(lesson.titleEn.length > 3, `Lesson ${lesson.id} English title missing`);
      assert.ok(lesson.vocabulary.length >= 3, `Lesson ${lesson.id} must contain at least 3 vocabulary terms`);
      assert.ok(lesson.expressions.length >= 2, `Lesson ${lesson.id} must contain at least 2 expressions`);
      assert.ok(lesson.dialogue.length >= 2, `Lesson ${lesson.id} must contain realistic dialogue lines`);
      assert.ok(lesson.exercises.length >= 1, `Lesson ${lesson.id} must contain exercises`);
      assert.ok(lesson.assignment.rubrics.length >= 1, `Lesson ${lesson.id} must contain assignment rubrics`);
      assert.ok(lesson.researchCitations.length >= 1, `Lesson ${lesson.id} must cite research`);

      for (const ex of lesson.exercises) {
        assert.ok(ex.promptAr.length > 5);
        assert.ok(ex.options.length >= 2);
        const correctCount = ex.options.filter((o) => o.isCorrect).length;
        assert.equal(correctCount, 1, 'Exactly one option must be correct');
        assert.ok(ex.explanationAr.length > 10);
      }
    }
  }
});

test('Progress calculator returns accurate percentage across 15 lessons', () => {
  const sampleProgress = {
    userId: 'test-user',
    completedLessons: ['les-1-1', 'les-1-2', 'les-2-1'],
    quizScores: { 'ex-1-1-1': 100 },
    updatedAt: new Date().toISOString(),
  };

  const stats = calculateCurriculumStats(CURRICULUM_MODULES, sampleProgress);
  assert.equal(stats.totalLessons, 15);
  assert.equal(stats.completedCount, 3);
  assert.equal(stats.percentage, 20); // 3 / 15 = 20%
});
