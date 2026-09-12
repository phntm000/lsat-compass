# LSAT Compass — Release Audit (Overhaul, 2026-09-11)

Candid release-readiness record for the autonomous overhaul. This document
states what was changed, what was verified, and what remains before the
release can be called ready. It does not claim LSAC accreditation,
endorsement, official equivalence, score prediction, or IRT calibration —
the app makes none of those claims either.

## 1. Content validation — COMPLETE

- **LR:** 264/264 items classified. 255 `validated`, 9 `adversarial-reviewed`
  (kept as instructional items, excluded from simulations). Every item carries
  a ≥3-dimension `difficultyProfile` and `reviewHistory`.
- **RC:** 152/152 questions hostile-reviewed and `validated` (150 original +
  2 net new from set-size diversification), each with `evidenceMap`,
  ≥3-dimension `difficultyProfile`, `reviewHistory`.
- **Answer-length leakage (P0):** all 416 items re-checked — zero credited
  choices exceed 1.25× the mean of the other four; zero uniquely-longest
  credited gaps >20 chars. Ratchets in `tests/content.test.ts`.
- **Calibration:** `docs/GOLD_STANDARD_ITEMS.md` defines the validation bar
  with exemplars per question type.
- **Redundancy fixed:** rc-p18 rewritten (eyewitness testimony, was a
  plea-bargaining duplicate of rc-p02); rc-c02 Passage A rewritten
  (California condor, was a Yellowstone-wolf duplicate of rc-p12).
- **Structural diversity:** 3 passages converted to new archetypes
  (rc-p09 historical-development, rc-p11 survey, rc-p17 institutional-history);
  closers diversified across 11 single passages; set sizes varied (one 5-,
  one 7-, one 8-question set alongside the 6-question standard).

## 2. Simulation integrity — COMPLETE

- **Hard validation gate:** `examStore.ts` throws
  `InsufficientValidatedPoolError` when the validated pool cannot fill a
  section. The old provisional fallback (serving adversarial/author-reviewed
  items with disclosure) is removed. Only validated items enter simulations.
- Pool sufficiency: 255 validated LR (≥120 needed), 25 fully-validated
  passages (≥4 needed) — the gate is a safety net, not a live constraint.
- Timed assessment removes teaching cues (feedback deferred in timed /
  full-section modes).

## 3. Remediation engine — COMPLETE

- Five branches (misconception, discrimination, fluency, reacquisition,
  general) selected from mastery dimensions; exact misconception re-facing;
  type-label and trap-identification proof flows.
- **Fixed 2026-09-11:** fluency sessions are now genuinely timed
  (`plan.timed` forced for the fluency branch; previously the timer only ran
  for `mode === 'timed'`, so fluency remediation ran untimed).
- **Added 2026-09-11:** delayed rechecks — repaired skills' `dueAt` is pulled
  forward to ≤2 days after a completed weakness-repair session.
- Regression tests: `tests/remediation.test.ts` 8/8.

## 4. Build / test status — VERIFIED

- `npx tsc -b`: clean.
- `npx vitest run`: 92/92 passing (8 files), including content ratchets.
- `npm run build`: clean production bundle.
- `npx oxlint`: (run at final verification).

## 5. Remaining before release

- [ ] Playwright E2E suite — infrastructure complete (`playwright.config.ts`,
  `e2e/smoke.spec.ts` with axe), but **cannot execute in this sandbox**:
  Chrome 152's Local Network Access checks block all localhost navigations
  (no flag combination disables it) and the egress proxy blocks the
  Playwright CDN browser download. Verified the app builds and serves
  correctly; E2E must run on the user's machine or CI.
- [ ] Accessibility axe passes beyond the smoke spec.
- [ ] Offline-interaction and IndexedDB migration E2E.
- [ ] Physical iPhone QA (manual).
- [ ] Explicit user approval for push/deploy — NOT yet requested or granted.
    The public release at https://phntm000.github.io/lsat-compass/ is untouched.

## 6. Known limitations (honest)

- The 224-item LR mass classification was done quickly by subagents; a
  hostile sample was spot-checked (clean), but it is not independently
  proven item-by-item.
- Structural-diversity edits (3 archetype rewrites, 11 closer rewrites,
  3 set-size changes) were verified structurally and via the content-test
  ratchets (all 152 RC questions carry validation metadata), but the new
  prose has not had an independent hostile read beyond the authoring agents.
- No IRT calibration, no percentiles, no score prediction — by design.
- Official LawHub work is tracked separately and never mixed into the
  internal bank.
- The existing public deployment predates this overhaul and has not been
  independently verified live.
- Browser E2E cannot execute in this sandbox (Chrome LNA blocks localhost;
  Playwright CDN blocked by egress proxy). Suite is ready for CI/user machine.

## 7. Verdict

Content, simulation integrity, remediation, and automated verification are
complete. Release is blocked on E2E/browser QA, physical-device QA, and the
user's explicit deploy approval. Do not deploy without all three.
