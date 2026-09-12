import { Screen } from '../../components';
import { APP_VERSION } from '../../db/db';
import { MoreBack } from './common';

export default function AboutScreen() {
  return (
    <Screen title="About & privacy">
      <div className="more-wrap">
        <MoreBack />

        <h2 className="more-section-title">About</h2>
        <div className="more-card more-prose">
          <h3>LSAT Compass v{APP_VERSION}</h3>
          <p>
            A local-first LSAT study companion. No account, no server, no
            subscription — your study data never leaves this device.
          </p>
          <p>
            All built-in questions and passages are original, written for
            this app. They are designed to train the same reasoning skills
            the LSAT tests, but they are not LSAC material.
          </p>
        </div>

        <h2 className="more-section-title">Privacy</h2>
        <div className="more-card more-prose">
          <p>
            Everything is stored on this device (IndexedDB). Nothing is sent
            anywhere — there is no analytics service, no tracking, and no
            account to sync to.
          </p>
          <p>
            Export deletes nothing: making a backup copies your data to a
            file you control. Deleting data happens only when you ask for it
            in Backup &amp; reset.
          </p>
        </div>

        <h2 className="more-section-title">How this app teaches</h2>
        <div className="more-card more-prose">
          <h3>Retrieval practice</h3>
          <p>
            You learn by pulling answers out of your head, not by re-reading
            explanations. That's why drills and checkpoints ask you to answer
            before you see the solution — the effort of recalling is what
            builds durable memory.
          </p>
          <h3>Spacing</h3>
          <p>
            Skills come back for review right before you'd forget them. Each
            review strengthens the memory and pushes the next one further
            out, so study time goes where forgetting is most likely.
          </p>
          <h3>Interleaving</h3>
          <p>
            Mixed practice blends question types instead of drilling one
            skill in a block. It's harder in the moment, but it's what the
            real test demands: you have to recognize which skill each
            question needs, not just execute a rehearsed move.
          </p>
          <h3>Worked examples</h3>
          <p>
            Lessons show full step-by-step solutions before asking you to
            try. Studying a correct solution first gives your brain a
            template to imitate, which beats trial-and-error when a skill
            is brand new.
          </p>
          <h3>Calibration</h3>
          <p>
            After questions you'll rate your confidence. Over time this
            trains you to know what you actually know — the difference
            between feeling ready and being ready is one of the biggest
            predictors of test-day performance.
          </p>
        </div>
      </div>
    </Screen>
  );
}
