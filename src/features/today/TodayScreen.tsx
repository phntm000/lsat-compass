import { Navigate, useNavigate } from 'react-router-dom';
import { useStudy } from '../../state/study';
import { allSkills } from '../../content';
import type { PlanBlock } from '../../engine/recommend';
import {
  Button,
  ProgressBar,
  EmptyState,
  LoadingSkeleton,
  Screen,
} from '../../components';
import './today.css';

const KIND_LABEL: Record<PlanBlock['kind'], string> = {
  review: 'Review',
  lesson: 'Lesson',
  drill: 'Drill',
  contrast: 'Contrast',
  mixed: 'Mixed',
  timed: 'Timed',
  remediation: 'Focus',
  quest: 'Quest',
  official: 'Official',
};

function blockUrl(block: PlanBlock): string {
  const minutes = block.minutes;
  const skills = block.refIds.join(',');
  switch (block.kind) {
    case 'review':
      return `/practice/session?mode=review&minutes=${minutes}`;
    case 'lesson':
      return block.refIds[0]
        ? `/learn/lesson/${block.refIds[0]}`
        : '/learn';
    case 'drill':
      return `/practice/session?mode=drill&minutes=${minutes}&skills=${skills}`;
    case 'contrast':
      return `/practice/session?mode=contrast&minutes=${minutes}`;
    case 'mixed':
      return `/practice/session?mode=mixed&minutes=${minutes}`;
    case 'timed':
      return `/practice/session?mode=timed&minutes=${minutes}`;
    case 'remediation':
      return `/practice/session?mode=weakness-repair&minutes=${minutes}&skills=${skills}`;
    case 'quest':
      return '/practice';
    case 'official':
      return '/more/official-log';
  }
}

const SEVERITY_META = {
  info: { icon: 'ℹ️', label: 'Insight' },
  watch: { icon: '👀', label: 'Watch' },
  act: { icon: '⚠️', label: 'Act now' },
} as const;

function greetingFor(hour: number): string {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

const skillTitle = (skillId: string): string =>
  allSkills.find((s) => s.id === skillId)?.title ?? skillId;

export default function TodayScreen() {
  const navigate = useNavigate();
  const {
    ready,
    profile,
    xp,
    levelName,
    nextLevelXp,
    streak,
    todayPlan,
    reviewPlan,
    insights,
    lessonProgress,
  } = useStudy();

  if (!ready || !profile) {
    return (
      <Screen title="Today">
        <LoadingSkeleton />
      </Screen>
    );
  }

  if (!profile.onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  const isBrandNew =
    Object.keys(lessonProgress ?? {}).length === 0 && xp === 0;

  if (isBrandNew) {
    return (
      <Screen title="Today">
        <div className="today">
          <EmptyState
            title="Welcome to LSAT Compass"
            body="Start with Stage 0: how the LSAT thinks."
            actionLabel="Start learning"
            onAction={() => navigate('/learn')}
          />
        </div>
      </Screen>
    );
  }

  const now = new Date();
  const greeting = greetingFor(now.getHours());
  const dateLine = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const blocks = todayPlan?.blocks ?? [];
  const firstBlockUrl = blocks.length > 0 ? blockUrl(blocks[0]) : null;
  const insight = insights.length > 0 ? insights[0] : null;
  const severity = insight ? SEVERITY_META[insight.severity] : null;

  return (
    <Screen title="Today">
      <div className="today">
        <header className="today-header">
          <div>
            <h2 className="today-greeting">{greeting}</h2>
            <p className="today-date">{dateLine}</p>
          </div>
          <div className="today-chips">
            <span className="chip chip-streak" aria-label={`${streak}-day streak`}>
              {streak > 0 ? `🔥 ${streak}-day streak` : '🌱 Streak starts today'}
            </span>
            <span className="chip chip-xp" aria-label={`${levelName}, ${xp} XP`}>
              {levelName} · {xp} XP
            </span>
          </div>
          {nextLevelXp !== null && (
            <ProgressBar
              value={xp / nextLevelXp}
              label={`${xp} / ${nextLevelXp} XP to next level`}
              ariaLabel="Progress to next level"
            />
          )}
        </header>

        <section className="today-section" aria-labelledby="today-plan-heading">
          <h3 id="today-plan-heading">Today&apos;s plan</h3>
          {todayPlan && (
            <p className="today-summary">About {todayPlan.totalMinutes} min today</p>
          )}
          {firstBlockUrl && (
            <Button
              variant="primary"
              fullWidth
              onClick={() => navigate(firstBlockUrl)}
            >
              Start today&apos;s plan
            </Button>
          )}
          <div className="plan-list">
            {blocks.length === 0 && (
              <p className="plan-empty">
                Your plan is being prepared — check back soon.
              </p>
            )}
            {blocks.map((block, i) => (
              <article key={`${block.kind}-${i}`} className="plan-card">
                <span className={`kind-chip kind-${block.kind}`}>
                  {KIND_LABEL[block.kind]}
                </span>
                <h4 className="plan-title">{block.title}</h4>
                <p className="plan-detail">{block.detail}</p>
                <p className="plan-meta">{block.minutes} min</p>
                <p className="plan-reason">
                  <strong>Why:</strong> {block.reason}
                </p>
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={() => navigate(blockUrl(block))}
                >
                  Start
                </Button>
              </article>
            ))}
          </div>
        </section>

        {insight && severity && (
          <section className="today-section" aria-labelledby="today-insight-heading">
            <h3 id="today-insight-heading">Today&apos;s insight</h3>
            <article className={`insight-card insight-${insight.severity}`}>
              <p className="insight-label">
                {severity.icon} {severity.label}
              </p>
              <h4 className="insight-title">{insight.title}</h4>
              <p className="insight-body">{insight.body}</p>
            </article>
          </section>
        )}

        {reviewPlan && (
          <section className="today-section" aria-labelledby="review-heading">
            <h3 id="review-heading">Spaced review</h3>
            <article className="review-card">
              {reviewPlan.totalDue === 0 ? (
                <p className="review-caught-up">
                  Nothing due — you&apos;re caught up.
                </p>
              ) : (
                <>
                  <p className="review-due">
                    {reviewPlan.totalDue} due
                    {reviewPlan.capped &&
                      ` (showing first ${reviewPlan.items.length})`}
                  </p>
                  <ul className="review-list">
                    {reviewPlan.items.slice(0, 3).map((item) => (
                      <li key={item.skillId} className="review-item">
                        <span className="review-skill">
                          {skillTitle(item.skillId)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="ghost"
                    fullWidth
                    onClick={() =>
                      navigate('/practice/session?mode=review&minutes=15')
                    }
                  >
                    Review now
                  </Button>
                </>
              )}
            </article>
          </section>
        )}
      </div>
    </Screen>
  );
}
