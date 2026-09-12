import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStudy } from '../../state/study';
import { getQuestion } from '../../content';
import { Button, EmptyState, LoadingSkeleton, Screen, StatCard } from '../../components';
import { formatAvgMs, loadRun, loadSectionAnswers } from './examStore';
import type { ExamAnswerRecord, ExamRunState, ExamSectionDef } from './examStore';
import './exam.css';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

interface SectionReport {
  section: ExamSectionDef;
  answers: Record<string, ExamAnswerRecord>;
  total: number;
  answered: number;
  correct: number;
  flagged: number;
  avgMs: number;
  byDifficulty: { level: number; correct: number; total: number }[];
}

function buildReport(section: ExamSectionDef, answers: Record<string, ExamAnswerRecord>): SectionReport {
  const total = section.questionIds.length;
  let correct = 0;
  let answered = 0;
  let flagged = 0;
  let timeSum = 0;
  const diff = new Map<number, { correct: number; total: number }>();
  for (const qid of section.questionIds) {
    const rec = answers[qid];
    const q = getQuestion(qid);
    const level = q?.editorialDifficulty ?? 0;
    if (!diff.has(level)) diff.set(level, { correct: 0, total: 0 });
    const bucket = diff.get(level)!;
    bucket.total += 1;
    if (rec?.answered) {
      answered += 1;
      timeSum += rec.responseTimeMs;
      if (rec.correct) {
        correct += 1;
        bucket.correct += 1;
      }
      if (rec.flagged) flagged += 1;
    }
  }
  const byDifficulty = [...diff.entries()]
    .filter(([level]) => level >= 1 && level <= 5)
    .sort(([a], [b]) => a - b)
    .map(([level, v]) => ({ level, ...v }));
  return {
    section,
    answers,
    total,
    answered,
    correct,
    flagged,
    avgMs: answered > 0 ? timeSum / answered : 0,
    byDifficulty,
  };
}

function pct(correct: number, total: number): string {
  if (total === 0) return '—';
  return `${Math.round((correct / total) * 100)}%`;
}

export default function ExamResultsScreen() {
  const { runId } = useParams<{ runId: string }>();
  const navigate = useNavigate();
  const { ready } = useStudy();
  const [run, setRun] = useState<ExamRunState | null>(null);
  const [reports, setReports] = useState<SectionReport[] | null>(null);

  useEffect(() => {
    if (!ready || !runId) return;
    const loaded = loadRun(runId);
    setRun(loaded);
    if (!loaded) return;
    let cancelled = false;
    (async () => {
      const scored = loaded.sections.filter((s) => !s.variable);
      const out: SectionReport[] = [];
      for (const s of scored) {
        const answers = await loadSectionAnswers(runId, s.index, s);
        out.push(buildReport(s, answers));
      }
      if (!cancelled) setReports(out);
    })();
    return () => {
      cancelled = true;
    };
  }, [ready, runId]);

  if (!ready || (run && !reports)) {
    return (
      <Screen title="Exam results">
        <LoadingSkeleton lines={10} />
      </Screen>
    );
  }

  if (!runId || !run) {
    return (
      <Screen title="Exam results">
        <EmptyState
          title="Results not found"
          body="This exam run could not be found. Results live in this tab's session and expire when it closes."
          actionLabel="Back to exam setup"
          onAction={() => navigate('/exam')}
        />
      </Screen>
    );
  }

  const reportsSafe = reports ?? [];
  const totalQ = reportsSafe.reduce((n, r) => n + r.total, 0);
  const totalCorrect = reportsSafe.reduce((n, r) => n + r.correct, 0);
  const totalAnswered = reportsSafe.reduce((n, r) => n + r.answered, 0);
  const totalFlagged = reportsSafe.reduce((n, r) => n + r.flagged, 0);
  const totalTime = reportsSafe.reduce((n, r) => n + r.avgMs * r.answered, 0);
  const overallAvgMs = totalAnswered > 0 ? totalTime / totalAnswered : 0;

  const label =
    run.mode === 'sim'
      ? 'Original Practice Simulation — not an official LSAT score.'
      : 'Original Practice Section — not an official LSAT score.';

  return (
    <Screen title="Exam results">
      <p className="ex-score-label" role="note">{label}</p>

      <div className="ex-statgrid">
        <StatCard label="Accuracy" value={pct(totalCorrect, totalQ)} sub={`${totalCorrect}/${totalQ} correct`} />
        <StatCard label="Answered" value={`${totalAnswered}/${totalQ}`} sub="questions attempted" />
        <StatCard label="Avg time / question" value={formatAvgMs(overallAvgMs)} sub="across scored sections" />
        <StatCard label="Flagged" value={String(totalFlagged)} sub="marked for review" />
      </div>

      {run.mode === 'sim' && run.variablePosition != null && (
        <p className="ex-note" role="note">
          Section {run.variablePosition} was the unscored variable section — its
          results are excluded below.
        </p>
      )}

      {run.usedProvisionalItems && (
        <p className="ex-note" role="note">
          Provisional items: this run included practice items still pending
          full editorial validation. Treat section scores as approximate until
          the validated bank is complete.
        </p>
      )}

      <h2 className="ex-h2">Section breakdown</h2>
      {reportsSafe.length === 0 && (
        <EmptyState
          title="No section data"
          body="We couldn't load the answers for this run."
        />
      )}
      {reportsSafe.map((r) => (
        <section
          key={r.section.index}
          className="ex-card"
          aria-label={`Section ${r.section.index + 1} results`}
        >
          <div className="ex-card-head">
            <h3>Section {r.section.index + 1}</h3>
            <span className="ex-accuracy">{pct(r.correct, r.total)}</span>
          </div>
          <dl className="ex-facts">
            <div>
              <dt>Correct</dt>
              <dd>{r.correct}/{r.total}</dd>
            </div>
            <div>
              <dt>Avg time / question</dt>
              <dd>{formatAvgMs(r.avgMs)}</dd>
            </div>
            <div>
              <dt>Flagged</dt>
              <dd>{r.flagged}</dd>
            </div>
            <div>
              <dt>Unanswered</dt>
              <dd>{r.total - r.answered}</dd>
            </div>
          </dl>
          {r.byDifficulty.length > 0 && (
            <div className="ex-diff">
              <h4>Difficulty breakdown</h4>
              <ul>
                {r.byDifficulty.map((d) => (
                  <li key={d.level}>
                    <span>Level {d.level}</span>
                    <span>{d.correct}/{d.total} · {pct(d.correct, d.total)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      ))}

      <h2 className="ex-h2">Timing</h2>
      <div className="ex-card">
        <p>
          Average <strong>{formatAvgMs(overallAvgMs)}</strong> per answered
          question across scored sections.
          {totalQ - totalAnswered > 0 && (
            <> {totalQ - totalAnswered} question{totalQ - totalAnswered === 1 ? ' was' : 's were'} left unanswered.</>
          )}
        </p>
      </div>

      <div className="ex-actions">
        <Button fullWidth onClick={() => navigate(`/exam/second-pass?runId=${runId}`)}>
          Second-pass review
        </Button>
        <Button variant="ghost" fullWidth onClick={() => navigate('/practice')}>
          Back to Practice
        </Button>
      </div>

      <details className="ex-details">
        <summary>Answer key (scored sections)</summary>
        {reportsSafe.map((r) => (
          <div key={r.section.index} className="ex-key">
            <h4>Section {r.section.index + 1}</h4>
            <ol>
              {r.section.questionIds.map((qid, i) => {
                const q = getQuestion(qid);
                const rec = r.answers[qid];
                return (
                  <li key={qid}>
                    <span>Q{i + 1}</span>
                    <span>
                      {rec?.answered
                        ? rec.correct
                          ? '✓'
                          : '✗'
                        : '—'}{' '}
                      correct: {q ? LETTERS[q.correctIndex] : '?'}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </details>
    </Screen>
  );
}
