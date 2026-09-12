/**
 * Gamification (§30, §31): XP rewards meaningful study only. No loot boxes,
 * no energy timers, no streak punishment. Streak uses a grace mechanic:
 * the streak survives a missed day if weekly consistency (≥4 of last 7 days)
 * holds — never a source of anxiety.
 */
import type { MasteryResult } from './types';

export type XpEvent =
  | 'lesson_complete' | 'checkpoint_correct' | 'question_correct_first'
  | 'question_correct' | 'question_attempt' | 'review_complete'
  | 'mistake_reviewed' | 'contrast_complete' | 'section_complete'
  | 'sim_complete' | 'quest_complete' | 'note_saved' | 'official_logged';

const XP_TABLE: Record<XpEvent, number> = {
  lesson_complete: 20,
  checkpoint_correct: 3,
  question_correct_first: 6,   // + difficulty bonus added by caller
  question_correct: 3,
  question_attempt: 1,         // small: effort counts, guessing doesn't pay
  review_complete: 5,
  mistake_reviewed: 8,
  contrast_complete: 6,
  section_complete: 60,
  sim_complete: 200,
  quest_complete: 15,
  note_saved: 2,
  official_logged: 10,
};

export function xpFor(event: XpEvent, difficultyBonus = 0): number {
  return XP_TABLE[event] + difficultyBonus;
}

export const LEVELS = [
  { level: 1, name: 'Novice Analyst', xp: 0 },
  { level: 2, name: 'Evidence Reader', xp: 150 },
  { level: 3, name: 'Argument Mapper', xp: 400 },
  { level: 4, name: 'Assumption Hunter', xp: 800 },
  { level: 5, name: 'Logic Analyst', xp: 1400 },
  { level: 6, name: 'Critical Evaluator', xp: 2200 },
  { level: 7, name: 'Advanced Reasoner', xp: 3200 },
  { level: 8, name: 'Test-Day Ready', xp: 4500 },
];

export function levelFor(xp: number): { level: number; name: string; nextXp: number | null } {
  let cur = LEVELS[0];
  for (const l of LEVELS) if (xp >= l.xp) cur = l;
  const idx = LEVELS.indexOf(cur);
  return {
    level: cur.level, name: cur.name,
    nextXp: idx < LEVELS.length - 1 ? LEVELS[idx + 1].xp : null,
  };
}

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  xp: number;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: 'first-steps', title: 'First Steps', description: 'Complete your first lesson.', xp: 10 },
  { id: 'contrapositive', title: 'Contrapositive', description: 'Answer 20 conditional-reasoning questions at 80%+ accuracy.', xp: 40 },
  { id: 'assumption-hunter', title: 'Assumption Hunter', description: 'Reach Developing on both assumption skills.', xp: 40 },
  { id: 'calibration', title: 'Well Calibrated', description: 'Answer 50 confidence-rated questions with calibration error under 15%.', xp: 50 },
  { id: 'recovery', title: 'Recovery', description: 'Bring a lapsed skill back to Stable.', xp: 40 },
  { id: 'review-scholar', title: 'Review Scholar', description: 'Complete 100 scheduled reviews.', xp: 60 },
  { id: 'section-finisher', title: 'Section Finisher', description: 'Complete your first full 35-minute section.', xp: 80 },
  { id: 'sim-finisher', title: 'Simulation Complete', description: 'Finish a full 4-section practice simulation.', xp: 150 },
  { id: 'error-scholar', title: 'Error Scholar', description: 'Deeply review 25 mistakes in the Error Lab.', xp: 50 },
  { id: 'contrast-master', title: 'Distinction Maker', description: 'Complete 25 contrast exercises at 80%+.', xp: 40 },
  { id: 'week-warrior', title: 'Consistent Week', description: 'Study on 5+ days in a single week.', xp: 40 },
  { id: 'marathon', title: 'Deep Focus', description: 'Complete a 45+ minute study session.', xp: 30 },
  { id: 'flaw-finder', title: 'Flaw Finder', description: 'Reach Stable on flaw questions.', xp: 40 },
  { id: 'rc-reader', title: 'Careful Reader', description: 'Complete 5 RC passages at 70%+ accuracy.', xp: 50 },
  { id: 'blind-reviewer', title: 'Second Look', description: 'Complete a Second-Pass Review after a timed section.', xp: 40 },
  { id: 'notebook', title: 'Notebook Keeper', description: 'Save 10 notes or rules to your notebook.', xp: 20 },
  { id: 'official-bridge', title: 'Official Bridge', description: 'Log your first official LawHub practice result.', xp: 30 },
  { id: 'transfer', title: 'Transfer', description: 'Score 80%+ on a mixed set of 10+ questions.', xp: 60 },
];

export interface AchievementStats {
  conditionalAttempts: number; conditionalCorrect: number;
  assumptionStates: Record<string, MasteryResult['state']>;
  calibrationN: number; calibrationError: number | null;
  recoveredLapsed: boolean;
  reviewsCompleted: number;
  sectionsCompleted: number; simsCompleted: number;
  mistakesReviewed: number;
  contrastAttempts: number; contrastCorrect: number;
  studyDaysLast7: number;
  longSessions: number;
  flawState: MasteryResult['state'] | null;
  rcPassagesAt70: number;
  secondPassCompleted: boolean;
  notesSaved: number;
  officialLogged: boolean;
  bestMixed10: number | null;
}

export function checkAchievements(
  stats: AchievementStats, earned: Set<string>,
): AchievementDef[] {
  const newly: AchievementDef[] = [];
  const grant = (id: string, ok: boolean) => {
    if (ok && !earned.has(id)) {
      const def = ACHIEVEMENTS.find(a => a.id === id);
      if (def) { newly.push(def); earned.add(id); }
    }
  };
  grant('contrapositive', stats.conditionalAttempts >= 20 &&
    stats.conditionalCorrect / Math.max(1, stats.conditionalAttempts) >= 0.8);
  grant('assumption-hunter',
    stateRank(stats.assumptionStates['lr-necessary-assumption']) >= 2 &&
    stateRank(stats.assumptionStates['lr-sufficient-assumption']) >= 2);
  grant('calibration', stats.calibrationN >= 50 && (stats.calibrationError ?? 1) < 0.15);
  grant('recovery', stats.recoveredLapsed);
  grant('review-scholar', stats.reviewsCompleted >= 100);
  grant('section-finisher', stats.sectionsCompleted >= 1);
  grant('sim-finisher', stats.simsCompleted >= 1);
  grant('error-scholar', stats.mistakesReviewed >= 25);
  grant('contrast-master', stats.contrastAttempts >= 25 &&
    stats.contrastCorrect / Math.max(1, stats.contrastAttempts) >= 0.8);
  grant('week-warrior', stats.studyDaysLast7 >= 5);
  grant('marathon', stats.longSessions >= 1);
  grant('flaw-finder', stateRank(stats.flawState ?? 'new') >= 3);
  grant('rc-reader', stats.rcPassagesAt70 >= 5);
  grant('blind-reviewer', stats.secondPassCompleted);
  grant('notebook', stats.notesSaved >= 10);
  grant('official-bridge', stats.officialLogged);
  grant('transfer', (stats.bestMixed10 ?? 0) >= 0.8);
  return newly;
}

function stateRank(s: MasteryResult['state']): number {
  return { new: 0, learning: 1, developing: 2, stable: 3, mastered: 4, lapsed: 1 }[s];
}

/** Streak with grace: missed days don't break it while weekly consistency holds. */
export function updateStreak(
  studyDays: string[], // sorted 'YYYY-MM-DD'
  today: string,
): { streak: number; weeklyActive: number } {
  const set = new Set(studyDays);
  const last7: string[] = [];
  const d = new Date(today + 'T12:00:00');
  for (let i = 0; i < 7; i++) {
    const key = d.toISOString().slice(0, 10);
    last7.push(key);
    d.setDate(d.getDate() - 1);
  }
  const weeklyActive = last7.filter(k => set.has(k)).length;
  // Streak: count back from today; allow one gap day if weeklyActive >= 4.
  let streak = 0, gaps = 0;
  const dd = new Date(today + 'T12:00:00');
  for (let i = 0; i < 60; i++) {
    const key = dd.toISOString().slice(0, 10);
    if (set.has(key)) streak++;
    else {
      if (i === 0) { /* today not yet studied — don't count as gap */ }
      else if (gaps === 0 && weeklyActive >= 4) gaps++;
      else break;
    }
    dd.setDate(dd.getDate() - 1);
  }
  return { streak, weeklyActive };
}
