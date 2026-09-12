/**
 * Shared lesson-locking rule for the Learn feature.
 *
 * A lesson is locked when ANY of its prerequisite skill ids has a mastery
 * state that is NOT one of ('developing', 'stable', 'mastered') — i.e.
 * missing (new / never attempted), 'learning', or 'lapsed' all lock.
 */
import type { Lesson } from '../../content';

const UNLOCK_STATES = new Set(['developing', 'stable', 'mastered']);

export interface LessonLock {
  /** True when the lesson cannot be opened yet. */
  locked: boolean;
  /** First prerequisite skill id that blocks this lesson, or null. */
  lockingSkillId: string | null;
}

export function lockForLesson(
  lesson: Lesson,
  mastery: Record<string, { state: string }>,
): LessonLock {
  for (const skillId of lesson.prerequisites) {
    const state = mastery[skillId]?.state ?? 'new';
    if (!UNLOCK_STATES.has(state)) {
      return { locked: true, lockingSkillId: skillId };
    }
  }
  return { locked: false, lockingSkillId: null };
}
