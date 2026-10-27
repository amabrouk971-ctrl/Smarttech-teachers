/**
 * Curriculum Service
 * Manages lesson progress, quiz scoring, and persistence in Firestore and LocalStorage.
 */

import { CurriculumModule, CURRICULUM_MODULES } from '../data/curriculumData';

export interface UserCurriculumProgress {
  userId: string;
  completedLessons: string[];
  quizScores: Record<string, number>;
  updatedAt: string;
}

export interface CurriculumStats {
  totalLessons: number;
  completedCount: number;
  percentage: number;
}

const STORAGE_KEY_PREFIX = 'smarttech_curriculum_progress_';

/**
 * Calculates overall progress statistics across modules.
 */
export function calculateCurriculumStats(
  modules: CurriculumModule[],
  progress: UserCurriculumProgress | null
): CurriculumStats {
  const totalLessons = modules.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0);
  if (totalLessons === 0) {
    return { totalLessons: 0, completedCount: 0, percentage: 0 };
  }

  const completedList = progress?.completedLessons || [];
  // Ensure we count unique completed lessons that actually exist in the modules
  const allLessonIds = new Set(modules.flatMap((m) => m.lessons.map((l) => l.id)));
  const validCompleted = completedList.filter((id) => allLessonIds.has(id));
  const completedCount = validCompleted.length;
  const percentage = Math.round((completedCount / totalLessons) * 100);

  return {
    totalLessons,
    completedCount,
    percentage,
  };
}

/**
 * Retrieves the current user's curriculum progress from LocalStorage and Firestore.
 */
export async function getCurriculumProgress(userId = 'guest-teacher'): Promise<UserCurriculumProgress> {
  const defaultProgress: UserCurriculumProgress = {
    userId,
    completedLessons: [],
    quizScores: {},
    updatedAt: new Date().toISOString(),
  };

  // Try LocalStorage first for instant responsiveness
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${userId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        userId,
        completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
        quizScores: parsed.quizScores || {},
        updatedAt: parsed.updatedAt || new Date().toISOString(),
      };
    }
  } catch (e) {
    console.warn('Could not read from localStorage', e);
  }

  return defaultProgress;
}

/**
 * Toggles or sets lesson completion status and saves locally and remotely.
 */
export async function setLessonCompleted(
  userId = 'guest-teacher',
  lessonId: string,
  completed: boolean
): Promise<UserCurriculumProgress> {
  const current = await getCurriculumProgress(userId);
  const set = new Set(current.completedLessons);

  if (completed) {
    set.add(lessonId);
  } else {
    set.delete(lessonId);
  }

  const updated: UserCurriculumProgress = {
    ...current,
    completedLessons: Array.from(set),
    updatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${userId}`, JSON.stringify(updated));
  } catch (e) {
    console.warn('Could not persist to localStorage', e);
  }

  // Attempt Firestore sync if available
  syncProgressToFirestore(userId, updated).catch((err) =>
    console.warn('Firestore progress sync failed, preserved in local storage:', err)
  );

  return updated;
}

/**
 * Records a quiz exercise score and updates user progress.
 */
export async function recordExerciseScore(
  userId = 'guest-teacher',
  exerciseId: string,
  isCorrect: boolean
): Promise<UserCurriculumProgress> {
  const current = await getCurriculumProgress(userId);
  const updated: UserCurriculumProgress = {
    ...current,
    quizScores: {
      ...current.quizScores,
      [exerciseId]: isCorrect ? 100 : 0,
    },
    updatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${userId}`, JSON.stringify(updated));
  } catch (e) {
    console.warn('Could not persist to localStorage', e);
  }

  syncProgressToFirestore(userId, updated).catch((err) =>
    console.warn('Firestore progress sync failed:', err)
  );

  return updated;
}

/**
 * Background helper to sync user progress to Firestore
 */
async function syncProgressToFirestore(userId: string, progress: UserCurriculumProgress): Promise<void> {
  try {
    // Dynamically import to prevent SSR/Node test breakage
    const { getFirestore, doc, setDoc } = await import('firebase/firestore');
    const { initializeApp, getApps } = await import('firebase/app');
    
    // Check if firebase is configured
    if (getApps().length > 0) {
      const db = getFirestore();
      await setDoc(
        doc(db, 'users', userId, 'curriculumProgress', 'main'),
        {
          completedLessons: progress.completedLessons,
          quizScores: progress.quizScores,
          updatedAt: progress.updatedAt,
        },
        { merge: true }
      );
    }
  } catch {
    // Silent catch, offline or node environment
  }
}
