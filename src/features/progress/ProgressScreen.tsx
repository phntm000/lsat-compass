import { useEffect, useMemo, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Screen from '../../components/Screen';
import {
  Button,
  EmptyState,
  LoadingSkeleton,
  ProgressBar,
  StatCard,
} from '../../components';
import { useStudy } from '../../state/study';
import { db } from '../../db/db';
import { allSkills, curriculumStages } from '../../content';
import type { QuestionAttemptRecord, DailyActivityRecord, OfficialPracticeLog } from '../../engine/db-schema';
import type { MasteryResult } from '../../engine/types';
import { computeCalibration, officialEvidenceStatus } from '../../engine/calibration';
import ErrorLabScreen from './ErrorLabScreen';
import './progress.css';

const DAY_MS = 86_400_000;

function dayKey(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

function fmtDur(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function accuracyOf(arr: QuestionAttemptRecord[]): number | null {
  if (!arr.length) return null;
  return arr.filter((a) => a.correct).length / arr.length;
}

const SEV_META: Record<string, { icon: string; text: string }> = {
  info: { icon: 'ℹ️', text: 'Insight' },
  watch: { icon: '⚠️', text: 'Watch' },
  act: { icon: '🎯', text: 'Act now' },
};

const CAL_EXPECTED = [20, 40, 60, 80, 95]; // expected % for confidence 1..5

function StatCards({
  attempts,
  activity,
  streak,
  xp,
  levelName,
}: {
  attempts: QuestionAttemptRecord[];
  activity: DailyActivityRecord[];
  streak: number;
  xp: number;
  levelName: string;
}) {
  const total = attempts.length;
  const correct = attempts.filter((a) => a.correct).length;
  const minutes = activity.reduce((s, r) => s + r.minutes, 0);
  return (
    <div className="pg-stats">
      <StatCard label="Questions answered" value={String(total)} />
      {total > 0 && (
        <StatCard
          label="Accuracy"
          value={`${Math.round((correct / total) * 100)}%`}
          sub={`${correct} of ${total} correct`}
        />
      )}
      <StatCard label="Study time" value={fmtDur(minutes)} />
      <StatCard
        label="Streak"
        value={`${streak} day${streak === 1 ? '' : 's'}`}
      />
      <StatCard label="Level" value={levelName} sub={`${xp} XP`} />
    </div>
  );
}

function StageMastery({ mastery }: { mastery: Record<string, { score: number }> }) {
  const rows = curriculumStages.map((cs) => {
    const skills = allSkills.filter((s) => s.stage === cs.stage);
    const scores = skills
      .map((s) => mastery[s.id]?.score)
      .filter((v): v is number => v !== undefined);
    const avg =
      scores.length > 0
        ? scores.reduce((a, b) => a + b, 0) / scores.length
        : null;
    return { title: cs.title, avg };
  });
  return (
    <section className="card pg-section" aria-label="Mastery by stage">
      <h2>Mastery by stage</h2>
      {rows.map((r) => (
        <div className="pg-stage-row" key={r.title}>
          <span className="pg-stage-name">{r.title}</span>
          {r.avg === null ? (
            <span className="pg-stage-empty">Not started</span>
          ) : (
            <div className="pg-stage-bar">
              <ProgressBar
                value={r.avg / 100}
                ariaLabel={`${r.title}: ${Math.round(r.avg)} percent mastery`}
              />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

function InsightsList({
  insights,
}: {
  insights: { id: string; title: string; body: string; severity: string }[];
}) {
  return (
    <section className="card pg-section" aria-label="Insights">
      <h2>Insights</h2>
      {insights.length === 0 ? (
        <EmptyState
          title="No patterns yet"
          body="Answer 15+ questions and we'll start identifying patterns."
        />
      ) : (
        insights.map((ins) => {
          const meta = SEV_META[ins.severity] ?? SEV_META.info;
          return (
            <article className="card pg-insight pg-section" key={ins.id}>
              <div className="pg-insight-head">
                <span
                  className={`pg-sev pg-sev--${ins.severity}`}
                  role="img"
                  aria-label={meta.text}
                >
                  {meta.icon} {meta.text}
                </span>
                <h3>{ins.title}</h3>
              </div>
              <p>{ins.body}</p>
            </article>
          );
        })
      )}
    </section>
  );
}

function ReadinessPanel({
  readiness,
  officialLogs,
}: {
  readiness: {
    overall: number;
    components: { label: string; value: number | null; note: string }[];
  } | null;
  officialLogs: OfficialPracticeLog[];
}) {
  const { status } = officialEvidenceStatus(officialLogs);
  return (
    <section className="card pg-section" aria-label="Readiness">
      <h2>Readiness (internal)</h2>
      {readiness === null ? (
        <EmptyState
          title="Readiness not available yet"
          body="Complete more timed practice and lessons to unlock your internal readiness estimate."
        />
      ) : (
        <>
          <div className="pg-readiness-overall">
            <div className="pg-overall-num">{readiness.overall}</div>
            <ProgressBar
              value={readiness.overall / 100}
              ariaLabel={`Internal readiness: ${readiness.overall} out of 100`}
            />
          </div>
          {readiness.components.map((c) => (
            <div className="pg-component" key={c.label}>
              <div className="pg-component-head">
                <span className="pg-component-label">{c.label}</span>
                <span className="pg-component-note">{c.note}</span>
              </div>
              {c.value === null ? (
                <span className="pg-component-empty">Not started</span>
              ) : (
                <ProgressBar
                  value={c.value / 100}
                  ariaLabel={`${c.label}: ${c.value} out of 100`}
                />
              )}
            </div>
          ))}
          <p className="pg-disclaimer">
            An internal study metric — not an LSAT score prediction.
            Official evidence: <strong>{status}</strong>
            {status === 'INSUFFICIENT' &&
              ' — no readiness verdict is possible until you log official PrepTest scores.'}
          </p>
        </>
      )}
    </section>
  );
}

function WeeklyReview({
  attempts,
  activity,
}: {
  attempts: QuestionAttemptRecord[];
  activity: DailyActivityRecord[];
}) {
  const now = Date.now();
  const thisWeek = useMemo(
    () => attempts.filter((a) => a.timestamp >= now - 7 * DAY_MS),
    [attempts, now],
  );
  const prevWeek = useMemo(
    () =>
      attempts.filter(
        (a) => a.timestamp >= now - 14 * DAY_MS && a.timestamp < now - 7 * DAY_MS,
      ),
    [attempts, now],
  );
  const minutes = useMemo(() => {
    const cutoff = dayKey(new Date(now - 7 * DAY_MS));
    return activity
      .filter((r) => r.date >= cutoff)
      .reduce((s, r) => s + r.minutes, 0);
  }, [activity, now]);

  const accNow = accuracyOf(thisWeek);
  const accPrev = accuracyOf(prevWeek);
  const delta =
    accNow !== null && accPrev !== null
      ? Math.round((accNow - accPrev) * 100)
      : null;

  return (
    <section className="card pg-section" aria-label="Weekly review">
      <h2>Weekly review</h2>
      {thisWeek.length === 0 ? (
        <EmptyState
          title="Quiet week"
          body="No questions answered in the last 7 days. Your weekly summary will appear here once you practice."
        />
      ) : (
        <>
          <div className="pg-week-grid">
            <div>
              <div className="pg-week-num">{thisWeek.length}</div>
              <div className="pg-week-label">Questions</div>
            </div>
            <div>
              <div className="pg-week-num">
                {accNow === null ? '—' : `${Math.round(accNow * 100)}%`}
              </div>
              <div className="pg-week-label">Accuracy</div>
            </div>
            <div>
              <div className="pg-week-num">{fmtDur(minutes)}</div>
              <div className="pg-week-label">Study time</div>
            </div>
          </div>
          <p className="pg-week-delta">
            {delta === null
              ? '—'
              : `${delta >= 0 ? '+' : ''}${delta}% vs prior week`}
          </p>
        </>
      )}
    </section>
  );
}

function Trends({ attempts }: { attempts: QuestionAttemptRecord[] }) {
  const days = useMemo(() => {
    const now = Date.now();
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date(now - (13 - i) * DAY_MS);
      const key = dayKey(d);
      const dayAttempts = attempts.filter(
        (a) => dayKey(new Date(a.timestamp)) === key,
      );
      return {
        key,
        label: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        count: dayAttempts.length,
        accuracy: accuracyOf(dayAttempts),
      };
    });
  }, [attempts]);

  const hasData = days.some((d) => d.count > 0);
  const maxCount = Math.max(1, ...days.map((d) => d.count));
  const W = 320;
  const SLOT = W / days.length;
  const BAR_W = 12;
  const PLOT_H = 96;
  const BASE_Y = 112;

  if (!hasData) {
    return (
      <section className="card pg-section" aria-label="Accuracy trends">
        <h2>Trends</h2>
        <EmptyState
          title="No trend data yet"
          body="Answer questions over the next two weeks and your accuracy trend will appear here."
        />
      </section>
    );
  }

  return (
    <section className="card pg-section" aria-label="Accuracy trends">
      <h2>Trends</h2>
      <p className="pg-cal-note">Questions answered per day, last 14 days.</p>
      <svg
        className="pg-chart"
        viewBox={`0 0 ${W} 130`}
        role="img"
        aria-label="Bar chart of questions answered per day for the last 14 days"
      >
        <line x1="0" y1={BASE_Y} x2={W} y2={BASE_Y} className="pg-chart-baseline" />
        {days.map((d, i) => {
          const h = (d.count / maxCount) * PLOT_H;
          const x = i * SLOT + (SLOT - BAR_W) / 2;
          const accText =
            d.accuracy === null
              ? 'no questions'
              : `${Math.round(d.accuracy * 100)}% accuracy`;
          return (
            <g key={d.key}>
              <title>{`${d.label}: ${d.count} questions, ${accText}`}</title>
              <rect
                x={x}
                y={BASE_Y - h}
                width={BAR_W}
                height={Math.max(h, d.count > 0 ? 2 : 0)}
                rx={2}
                className={d.count > 0 ? 'pg-bar' : 'pg-bar--zero'}
              />
              {(i === 0 || i === days.length - 1) && (
                <text
                  x={i * SLOT + SLOT / 2}
                  y={126}
                  textAnchor="middle"
                  className="pg-chart-day"
                >
                  {d.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <ul className="sr-only">
        {days.map((d) => (
          <li key={d.key}>
            {d.label}: {d.count} questions
            {d.accuracy !== null ? `, ${Math.round(d.accuracy * 100)}% accuracy` : ''}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Calibration({ attempts }: { attempts: QuestionAttemptRecord[] }) {
  const rows = [1, 2, 3, 4, 5].map((c) => {
    const bucket = attempts.filter((a) => a.confidence === c);
    const n = bucket.length;
    const acc = accuracyOf(bucket);
    return {
      c,
      n,
      acc: acc === null ? null : Math.round(acc * 100),
      expected: CAL_EXPECTED[c - 1],
    };
  });
  const hasData = rows.some((r) => r.n > 0);

  return (
    <section className="card pg-section" aria-label="Calibration">
      <h2>Calibration</h2>
      {!hasData ? (
        <p className="pg-cal-note">
          Answer with confidence ratings to see calibration.
        </p>
      ) : (
        <>
          <p className="pg-cal-note">
            How your accuracy compares to what your confidence ratings imply.
          </p>
          <table className="pg-cal-table">
            <thead>
              <tr>
                <th scope="col">Confidence</th>
                <th scope="col">Your accuracy</th>
                <th scope="col">Expected</th>
                <th scope="col">n</th>
                <th scope="col">Δ</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const diff = r.acc === null ? null : r.acc - r.expected;
                const diffClass =
                  diff === null
                    ? ''
                    : diff > 10
                      ? 'pg-cal-diff pg-cal-diff--over'
                      : diff < -10
                        ? 'pg-cal-diff pg-cal-diff--under'
                        : 'pg-cal-diff';
                return (
                  <tr key={r.c}>
                    <td>{r.c} / 5</td>
                    <td>{r.acc === null ? '—' : `${r.acc}%`}</td>
                    <td>{r.expected}%</td>
                    <td>{r.n}</td>
                    <td className={diffClass}>
                      {diff === null ? '' : `${diff >= 0 ? '+' : ''}${diff}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}

/**
 * Official calibration (Part XXXIII): compares the internal lane
 * (timed/exam attempts on in-app items) against the official lane
 * (LawHub PrepTest logs). The lanes are never merged — only compared.
 */
function OfficialCalibration({
  attempts,
  logs,
  mastery,
}: {
  attempts: QuestionAttemptRecord[];
  logs: OfficialPracticeLog[];
  mastery: Record<string, MasteryResult>;
}) {
  const insights = useMemo(() => {
    const masteredSkillIds = Object.entries(mastery)
      .filter(([, m]) => m.state === 'mastered')
      .map(([id]) => id);
    const skillLabels: Record<string, string> = {};
    for (const s of allSkills) skillLabels[s.id] = s.title;
    return computeCalibration({ attempts, logs, masteredSkillIds, skillLabels });
  }, [attempts, logs, mastery]);
  const { status } = officialEvidenceStatus(logs);

  return (
    <section className="card pg-section" aria-label="Official calibration">
      <h2>Official calibration</h2>
      <p className="pg-cal-note">
        In-app practice vs. your logged LawHub PrepTests — compared, never
        mixed. Official evidence: <strong>{status}</strong>.
      </p>
      {insights.map((ins) => {
        const meta = SEV_META[ins.severity] ?? SEV_META.info;
        return (
          <article className="card pg-insight pg-section" key={ins.id}>
            <div className="pg-insight-head">
              <span
                className={`pg-sev pg-sev--${ins.severity}`}
                role="img"
                aria-label={meta.text}
              >
                {meta.icon} {meta.text}
              </span>
              <h3>{ins.title}</h3>
            </div>
            <p>{ins.body}</p>
          </article>
        );
      })}
      {logs.length === 0 && (
        <p className="pg-cal-note">
          Log official scores under More → Official practice log.
        </p>
      )}
    </section>
  );
}

function ProgressHome() {
  const { ready, xp, levelName, streak, mastery, insights, readiness } = useStudy();
  const [attempts, setAttempts] = useState<QuestionAttemptRecord[] | null>(null);
  const [activity, setActivity] = useState<DailyActivityRecord[] | null>(null);
  const [officialLogs, setOfficialLogs] = useState<OfficialPracticeLog[] | null>(null);

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    (async () => {
      const [a, d, o] = await Promise.all([
        db.attempts.toArray(),
        db.dailyActivity.toArray(),
        db.officialLogs.toArray(),
      ]);
      if (!cancelled) {
        setAttempts(a);
        setActivity(d);
        setOfficialLogs(o);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [ready]);

  if (!ready || attempts === null || activity === null || officialLogs === null) {
    return (
      <Screen title="Progress">
        <LoadingSkeleton lines={6} />
      </Screen>
    );
  }

  return (
    <Screen title="Progress">
      <StatCards
        attempts={attempts}
        activity={activity}
        streak={streak}
        xp={xp}
        levelName={levelName}
      />
      <StageMastery mastery={mastery} />
      <InsightsList insights={insights} />
      <ReadinessPanel readiness={readiness} officialLogs={officialLogs} />
      <WeeklyReview attempts={attempts} activity={activity} />
      <Trends attempts={attempts} />
      <Calibration attempts={attempts} />
      <OfficialCalibration attempts={attempts} logs={officialLogs} mastery={mastery} />
      <Link
        to="/progress/errors"
        className="card pg-section pg-link-card"
        aria-label="Open Error Lab"
      >
        <div>
          <h3>Error Lab</h3>
          <p>Review your misses, fix second-guesses, and repair weak skills.</p>
        </div>
        <span className="pg-link-arrow" aria-hidden="true">
          →
        </span>
      </Link>
      {attempts.length === 0 && (
        <Button
          variant="primary"
          fullWidth
          onClick={() => {
            window.location.hash = '#/practice';
          }}
        >
          Start practicing
        </Button>
      )}
    </Screen>
  );
}

export default function ProgressScreen() {
  return (
    <Routes>
      <Route index element={<ProgressHome />} />
      <Route path="errors" element={<ErrorLabScreen />} />
    </Routes>
  );
}
