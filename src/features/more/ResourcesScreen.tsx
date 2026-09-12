import { Screen } from '../../components';
import { WRITING } from '../../config/lsatFacts';
import { MoreBack } from './common';

const LINKS = [
  {
    title: 'LSAC LawHub',
    sub: 'Official digital practice platform · Opens lsac.org',
    href: 'https://www.lsac.org/lawhub',
  },
  {
    title: 'About the LSAT',
    sub: 'Test format, scoring, and test dates · Opens lsac.org',
    href: 'https://www.lsac.org/',
  },
  {
    title: 'Free official practice',
    sub: 'Free PrepTests and familiarization tools · Opens lsac.org',
    href: 'https://www.lsac.org/lawhub',
  },
];

export default function ResourcesScreen() {
  return (
    <Screen title="Resources">
      <div className="more-wrap">
        <MoreBack />

        <h2 className="more-section-title">Official LSAC links</h2>
        <div className="more-link-list">
          {LINKS.map((l) => (
            <a
              key={l.title}
              className="more-ext-link"
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="t">
                <b>{l.title}</b>
                <span>{l.sub}</span>
              </span>
              <span className="ext" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>

        <h2 className="more-section-title">How official practice works</h2>
        <div className="more-card more-prose">
          <p>
            The only official practice material is published by LSAC, the
            organization that makes the LSAT. Their digital platform, LawHub,
            hosts real PrepTests — previously administered exams — that you
            take under the same interface as test day.
          </p>
          <p>
            Each PrepTest is scored on the 120–180 scale using LSAC's
            form-specific conversion table. Every test form converts a little
            differently, so there is no universal raw-to-scaled formula.
            LSAT Compass never converts your scores: official scores come
            from LSAC, and you log them yourself in the Official practice
            log under More.
          </p>
          <p>
            In-app practice in this app uses original questions written for
            LSAT Compass. They train the same skills, but they are not
            LSAC material and their difficulty is not equated to the real
            test. Treat in-app accuracy as training feedback and official
            PrepTest scores as your real benchmark.
          </p>
        </div>

        <h2 className="more-section-title">Argumentative Writing</h2>
        <div className="more-card more-prose">
          <p>
            {WRITING.value.name} is a separate, unscored part of the test.
            You get {WRITING.value.prewritingMinutes} minutes to analyze a
            prompt and {WRITING.value.writingMinutes} minutes to write an
            essay taking a position and defending it. Law schools receive
            your writing sample alongside your score.
          </p>
          <p>
            Because it is unscored, the goal is simple: write a clear,
            organized argument with a recognizable thesis and reasons that
            actually support it. The Writing module in this app gives you
            prompts, a timer, and a self-assessment rubric to practice
            exactly that.
          </p>
        </div>
      </div>
    </Screen>
  );
}
