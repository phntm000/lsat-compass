# LSAT Compass

A local-first, offline-first LSAT prep PWA. Zero backend, zero accounts — all progress lives on-device (IndexedDB), and the app works fully offline via a service worker.

**Not affiliated with, endorsed by, or connected to LSAC.** Practice content is original and written in-house; nothing here is official LSAC material, and nothing predicts an official score.

## Branches

| Branch | Contents | Purpose |
|---|---|---|
| `main` | Built static site (`dist` output) | Served by GitHub Pages at https://phntm000.github.io/lsat-compass/ |
| `source` | Full project source (this branch) | Development, review, CI |

`main` is a deploy artifact — do all work on `source` and rebuild to deploy.

## Quick start

```bash
npm ci
npm run dev        # local dev server
npx tsc -b         # typecheck
npx vitest run     # unit + content tests (92 tests)
npx oxlint         # lint
npm run build      # production build -> dist/
npm run e2e        # Playwright smoke tests (needs a normal browser env)
```

## Project layout

```
src/
  content/            # Curriculum source of truth
    questions/        # 264 LR questions (lr-a..lr-h) + 152 RC questions (rc-a..rc-d)
    passages/         # 25 RC passages (19 single + 6 comparative)
    lessons/          # 88 lessons
    drills/           # 252 drills
    index.ts          # Canonical content types + validation schema
  features/           # App features (learn, practice, exam, review, progress, writing…)
  engine/             # Mastery model, scheduling, exam blueprint
tests/                # vitest suites (incl. content ratchets: 5 choices, answer-length leakage limits, validation metadata)
e2e/                  # Playwright smoke tests
docs/                 # Audits, content QA protocol, gold-standard item doc, LSAC format notes
scripts/              # Content validation/reporting utilities
public/               # PWA manifest, icons
```

## Content model

Every question carries `validationStatus` (`author-reviewed` → `adversarial-reviewed` → `validated`), a multi-dimension `difficultyProfile`, and a `reviewHistory`. RC questions also carry an `evidenceMap` tying each answer to passage text.

Hard rule enforced in code and tests: **timed simulations draw only from `validated` items.** If the validated pool can't fill a section, exam creation fails loudly (`InsufficientValidatedPoolError`) instead of falling back to unvalidated content. The 9 `adversarial-reviewed` LR items are instructional-only and never enter simulations.

Content ratchets in `tests/content.test.ts` enforce per item: exactly 5 choices, a valid `correctIndex`, no answer-length leakage (credited choice ≤ 1.25× longest distractor and not uniquely longest by > 20 chars), and required validation metadata.

## Deploy

Build, then sync `dist/` to the `main` branch root (Pages serves `main /`):

```bash
npm run build
python3 ~/workspace/skills/github/bin/deploy_pages.py lsat-compass dist \
  --description "LSAT Compass - LSAT prep PWA (local-first, offline)"
```

Delete stale hashed assets from `main` first when chunk names change, so old bundles don't linger.

## Honest limitations

- No IRT calibration, percentiles, or official score prediction anywhere in the product.
- The question bank was classified by structured internal review with sampling, not by independent item-by-item proof or field testing.
- Browser E2E runs in CI / a normal local environment — not in restricted sandboxes.
