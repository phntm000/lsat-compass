import { useMemo, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Screen from '../../components/Screen';
import {
  Button,
  EmptyState,
  LoadingSkeleton,
  MasteryBadge,
  ProgressBar,
  Sheet,
  SkillDot,
} from '../../components';
import type { MasteryState } from '../../components';
import { curriculumStages, allSkills, LESSONS } from '../../content';
import type { CurriculumStage, Lesson, Skill } from '../../content';
import { useStudy } from '../../state/study';
import LessonScreen from './LessonReader';
import { lockForLesson } from './lessonLock';
import './learn.css';

const skillById = new Map<string, Skill>(allSkills.map((s) => [s.id, s]));

/** ------------------------------------------------------------------ */
/** Skill detail sheet                                                 */
/** ------------------------------------------------------------------ */

function DimensionBars({
  dimensions,
  dimensionN,
}: {
  dimensions: { acquisition: number | null; retention: number | null; discrimination: number | null; transfer: number | null; timedExecution: number | null };
  dimensionN: Record<string, number>;
}) {
  const rows: { label: string; hint: string; value: number | null; n: number }[] = [
    { label: 'Acquisition', hint: 'guided + blocked practice', value: dimensions.acquisition, n: dimensionN.acquisition },
    { label: 'Retention', hint: 'delayed retrieval (3+ days)', value: dimensions.retention, n: dimensionN.retention },
    { label: 'Discrimination', hint: 'unlabeled mixed practice', value: dimensions.discrimination, n: dimensionN.discrimination },
    { label: 'Transfer', hint: 'novel items, new surface forms', value: dimensions.transfer, n: dimensionN.transfer },
    { label: 'Timed', hint: 'timed + exam simulation', value: dimensions.timedExecution, n: dimensionN.timedExecution },
  ];
  return (
    <div className="learn-components">
      {rows.map((r) => (
        <div key={r.label} className="learn-component">
          <span className="learn-component-label" title={r.hint}>
            {r.label}
            <span className="learn-component-n">{r.n > 0 ? ` · ${r.n}` : ' · —'}</span>
          </span>
          <ProgressBar
            value={r.value == null ? 0 : r.value / 100}
            ariaLabel={`${r.label} ${r.hint}: ${r.value == null ? 'no data yet' : `${Math.round(r.value)} percent over ${r.n} attempts`}`}
          />
        </div>
      ))}
      <p className="learn-dimensions-note">
        Mastery is not one number. A skill counts as mastered only with
        discrimination evidence plus transfer or timed proof.
      </p>
    </div>
  );
}

function SkillDetailSheet({ skillId, onClose }: { skillId: string | null; onClose: () => void }) {
  const { mastery } = useStudy();
  const navigate = useNavigate();
  const skill = skillId ? skillById.get(skillId) : undefined;

  const teachingLessons = useMemo(
    () => (skill ? LESSONS.filter((l) => l.skills.includes(skill.id)) : []),
    [skill],
  );

  return (
    <Sheet open={skillId !== null} onClose={onClose} title={skill ? skill.plainTitle : 'Skill'}>
      {skill ? (
        <div className="learn-skill-detail">
          <p className="learn-skill-desc">{skill.description}</p>
          {(() => {
            const m = mastery[skill.id];
            if (!m) {
              return (
                <p className="learn-skill-empty">
                  Not attempted yet — start the first lesson.
                </p>
              );
            }
            return (
              <div className="learn-skill-mastery">
                <div className="learn-skill-mastery-head">
                  <MasteryBadge state={m.state} />
                  <span className="learn-skill-pct">{Math.round(m.score)}%</span>
                </div>
                <ProgressBar value={m.score / 100} ariaLabel={`${skill.plainTitle} mastery ${Math.round(m.score)} percent`} />
                <DimensionBars dimensions={m.dimensions} dimensionN={m.dimensionN} />
              </div>
            );
          })()}
          {skill.prerequisites.length > 0 && (
            <div className="learn-detail-group">
              <h3>Builds on</h3>
              <ul className="learn-plain-list">
                {skill.prerequisites.map((pid) => (
                  <li key={pid}>{skillById.get(pid)?.plainTitle ?? pid}</li>
                ))}
              </ul>
            </div>
          )}
          {teachingLessons.length > 0 && (
            <div className="learn-detail-group">
              <h3>Lessons teaching this skill</h3>
              <ul className="learn-plain-list">
                {teachingLessons.map((l) => (
                  <li key={l.id}>
                    <button
                      type="button"
                      className="learn-link"
                      onClick={() => {
                        onClose();
                        navigate(`/learn/lesson/${l.id}`);
                      }}
                    >
                      {l.id} — {l.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Button
            fullWidth
            onClick={() => {
              onClose();
              navigate(`/practice/session?mode=drill&skills=${skill.id}&minutes=10`);
            }}
          >
            Drill this skill
          </Button>
        </div>
      ) : null}
    </Sheet>
  );
}

/** ------------------------------------------------------------------ */
/** Lesson row                                                         */
/** ------------------------------------------------------------------ */

function LessonRow({
  lesson,
  index,
  onOpen,
}: {
  lesson: Lesson;
  index: number;
  onOpen: (lesson: Lesson) => void;
}) {
  const { mastery, lessonProgress } = useStudy();
  const progress = lessonProgress[lesson.id];
  const lock = lockForLesson(lesson, mastery);
  const lockingSkill = lock.lockingSkillId ? skillById.get(lock.lockingSkillId) : undefined;

  if (lock.locked) {
    return (
      <div className="learn-lesson learn-lesson--locked" aria-disabled="true">
        <span className="learn-lesson-status" aria-hidden="true">
          🔒
        </span>
        <div className="learn-lesson-main">
          <div className="learn-lesson-title">
            {index + 1}. {lesson.title}
          </div>
          <div className="learn-lesson-sub">
            Develop {lockingSkill ? lockingSkill.plainTitle : lock.lockingSkillId} first
          </div>
        </div>
        <span className="learn-lesson-min">{lesson.estimatedMinutes} min</span>
      </div>
    );
  }

  const statusIcon = progress === 'done' ? '✓' : progress === 'started' ? '◐' : '○';
  const statusLabel = progress === 'done' ? 'Completed' : progress === 'started' ? 'Started' : 'Not started';

  return (
    <button type="button" className="learn-lesson" onClick={() => onOpen(lesson)}>
      <span className="learn-lesson-status" aria-hidden="true">
        {statusIcon}
      </span>
      <span className="learn-lesson-main">
        <span className="learn-lesson-title">
          {index + 1}. {lesson.title}
        </span>
        <span className="learn-lesson-sub">{statusLabel}</span>
      </span>
      <span className="learn-lesson-min">{lesson.estimatedMinutes} min</span>
    </button>
  );
}

/** ------------------------------------------------------------------ */
/** Stage section                                                      */
/** ------------------------------------------------------------------ */

function StageSection({
  stage,
  open,
  onToggle,
  onOpenLesson,
  onOpenSkill,
}: {
  stage: CurriculumStage;
  open: boolean;
  onToggle: () => void;
  onOpenLesson: (lesson: Lesson) => void;
  onOpenSkill: (skillId: string) => void;
}) {
  const { mastery, lessonProgress, reviewPlan } = useStudy();
  const doneCount = stage.lessons.filter((l) => lessonProgress[l.id] === 'done').length;
  const stageSkills = useMemo(
    () => allSkills.filter((s) => s.stage === stage.stage),
    [stage.stage],
  );
  const dueIds = useMemo(
    () => new Set((reviewPlan?.items ?? []).map((i) => i.skillId)),
    [reviewPlan],
  );

  return (
    <section className="learn-stage" aria-label={stage.title}>
      <button
        type="button"
        className="learn-stage-head"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className="learn-stage-head-text">
          <span className="learn-stage-title">{stage.title}</span>
          <span className="learn-stage-count">
            {doneCount}/{stage.lessons.length} lessons
          </span>
        </span>
        <span className="learn-stage-chevron" aria-hidden="true">
          {open ? '▾' : '▸'}
        </span>
      </button>
      {open && (
        <div className="learn-stage-body">
          {stage.lessons.length === 0 ? (
            <p className="learn-stage-empty">No lessons in this stage yet.</p>
          ) : (
            <div className="learn-lessons">
              {stage.lessons.map((l, i) => (
                <LessonRow key={l.id} lesson={l} index={i} onOpen={onOpenLesson} />
              ))}
            </div>
          )}
          {stageSkills.length > 0 && (
            <>
              <h3 className="learn-skills-title">Skills in this stage</h3>
              <ul className="learn-skills">
                {stageSkills.map((s) => {
                  const m = mastery[s.id];
                  const state: MasteryState = m?.state ?? 'new';
                  const score = m ? m.score : 0;
                  const due = dueIds.has(s.id);
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        className="learn-skill"
                        onClick={() => onOpenSkill(s.id)}
                      >
                        <SkillDot state={state} size={12} />
                        <span className="learn-skill-main">
                          <span className="learn-skill-title">{s.plainTitle}</span>
                          {due && <span className="learn-skill-due">Review due</span>}
                        </span>
                        <span className="learn-skill-side">
                          <MasteryBadge state={state} />
                          <ProgressBar
                            value={score / 100}
                            ariaLabel={`${s.plainTitle} mastery ${Math.round(score)} percent`}
                          />
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      )}
    </section>
  );
}

/** ------------------------------------------------------------------ */
/** Learn list screen                                                  */
/** ------------------------------------------------------------------ */

function LearnListScreen() {
  const { ready, lessonProgress } = useStudy();
  const navigate = useNavigate();
  const [openStages, setOpenStages] = useState<Record<number, boolean>>({ 0: true });
  const [skillId, setSkillId] = useState<string | null>(null);

  if (!ready) {
    return (
      <Screen title="Learn">
        <LoadingSkeleton lines={8} />
      </Screen>
    );
  }

  const totalLessons = curriculumStages.reduce((n, s) => n + s.lessons.length, 0);
  const doneLessons = Object.values(lessonProgress).filter((p) => p === 'done').length;

  return (
    <Screen title="Learn">
      <div className="learn-head">
        <ProgressBar
          value={totalLessons === 0 ? 0 : doneLessons / totalLessons}
          label={`${doneLessons} of ${totalLessons} lessons complete`}
        />
      </div>
      {curriculumStages.map((stage) => (
        <StageSection
          key={stage.stage}
          stage={stage}
          open={!!openStages[stage.stage]}
          onToggle={() =>
            setOpenStages((prev) => ({ ...prev, [stage.stage]: !prev[stage.stage] }))
          }
          onOpenLesson={(lesson) => navigate(`/learn/lesson/${lesson.id}`)}
          onOpenSkill={setSkillId}
        />
      ))}
      <SkillDetailSheet skillId={skillId} onClose={() => setSkillId(null)} />
    </Screen>
  );
}

/** ------------------------------------------------------------------ */
/** Router (default export; mounted at /learn/*)                        */
/** ------------------------------------------------------------------ */

export default function LearnScreen() {
  return (
    <Routes>
      <Route index element={<LearnListScreen />} />
      <Route path="lesson/:lessonId" element={<LessonScreen />} />
      <Route
        path="*"
        element={
          <Screen title="Learn">
            <EmptyState
              title="Lesson not found"
              body="That lesson doesn't exist. Head back to the curriculum and pick another."
            />
          </Screen>
        }
      />
    </Routes>
  );
}
