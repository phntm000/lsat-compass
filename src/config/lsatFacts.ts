/**
 * Versioned LSAT facts (mandate §17).
 *
 * Every current, changeable fact about the LSAT that the app states lives
 * here with a source trail and verification date — never casually embedded
 * in prose. When LSAC changes something, update the entry, bump `asOf`,
 * and the UI follows. Facts that are stable by design (e.g. 120–180 scale)
 * are still sourced so future editors know where they came from.
 *
 * Sources are LSAC publications (lsac.org). `asOf` is the date the fact
 * was last verified against the source, not the date the fact changed.
 */

export interface LsatFact<T> {
  value: T;
  asOf: string; // YYYY-MM-DD last verified
  source: string; // where this was verified
  note?: string;  // caveats editors must not drop
}

const V = '2026-09-12';

/** The Analytical Reasoning ("Logic Games") removal. */
export const FORMAT_TRANSITION: LsatFact<{
  effectiveAdministration: string;
  announcement: string;
  replacement: string;
  reason: string;
}> = {
  value: {
    // The change took effect with the AUGUST 2024 administration — NOT
    // June 2024 (a common misstatement this field exists to prevent).
    effectiveAdministration: 'August 2024',
    announcement: 'October 2023 settlement agreement',
    replacement: 'a second scored Logical Reasoning section',
    reason:
      'settlement with blind test takers for whom the diagram-based section posed an accessibility barrier',
  },
  asOf: V,
  source: 'LSAC announcement, October 2023: Analytical Reasoning removed beginning with the August 2024 LSAT',
  note: 'Do not write "June 2024" anywhere; the June 2024 test still included Logic Games.',
};

/** Test-day structure. */
export const TEST_STRUCTURE: LsatFact<{
  sections: number;
  minutesPerSection: number;
  scoredLR: number;
  scoredRC: number;
  unscoredVariable: boolean;
  variableKinds: string;
  intermissionMinutes: number;
  intermissionAfter: string;
}> = {
  value: {
    sections: 4,
    minutesPerSection: 35,
    scoredLR: 2,
    scoredRC: 1,
    unscoredVariable: true,
    variableKinds: 'LR or RC',
    intermissionMinutes: 10,
    intermissionAfter: 'section 2',
  },
  asOf: V,
  source: 'LSAC "About the LSAT" / test-day structure pages',
  note: 'The variable section is indistinguishable from scored sections; which section is unscored is never disclosed to the test taker.',
};

/** RC section composition. */
export const RC_COMPOSITION: LsatFact<{
  passageSets: number;
  approximateQuestions: number;
  comparativeSets: string;
}> = {
  value: {
    passageSets: 4,
    approximateQuestions: 27,
    comparativeSets: 'zero or one',
  },
  asOf: '2026-09-11',
  source: 'LSAC RC section description; comparative set not guaranteed every section (verified 2026-09-11)',
  note: 'Apps must not promise exactly one comparative set per section.',
};

/** Scoring. */
export const SCORING: LsatFact<{
  scaleMin: number;
  scaleMax: number;
  wrongAnswerPenalty: boolean;
  conversion: string;
  scoreBand: string;
  percentiles: string;
}> = {
  value: {
    scaleMin: 120,
    scaleMax: 180,
    wrongAnswerPenalty: false,
    conversion: 'raw correct count mapped by a per-form conversion table',
    scoreBand: 'approximately ±3 points (standard error of measurement)',
    percentiles:
      'Percentile ranks must be quoted only from the current LSAC percentile table for the relevant testing years; they drift year to year and are never hardcoded here.',
  },
  asOf: V,
  source: 'LSAC scoring pages; LSAC percentile tables (republished annually)',
  note: 'A guess is never worse than a blank. One-point differences are within measurement noise.',
};

/** LSAT Argumentative Writing. */
export const WRITING: LsatFact<{
  name: string;
  prewritingMinutes: number;
  writingMinutes: number;
  scored: boolean;
  availability: string;
}> = {
  value: {
    name: 'LSAT Argumentative Writing',
    prewritingMinutes: 15,
    writingMinutes: 35,
    scored: false,
    availability:
      'completed on demand, opening 8 days before the test-taker\u2019s administration; a completed writing sample is required before scores are released',
  },
  asOf: V,
  source: 'LSAC LSAT Argumentative Writing pages',
  note: 'Unscored but mandatory for score release; sent to schools with the score report.',
};

/** Delivery model. */
export const DELIVERY: LsatFact<{
  modes: string;
  interface: string;
}> = {
  value: {
    modes: 'live remote-proctored at home or in person at a Prometric test center (candidate\u2019s choice at scheduling)',
    interface: 'LSAC\u2019s secure browser-based testing interface with on-screen timer, highlighting, and flagging',
  },
  asOf: V,
  source: 'LSAC "Taking the LSAT" scheduling pages',
  note: 'The multiple-choice test is digital-only; paper formats exist only as approved accommodations.',
};

/** Free official practice. */
export const OFFICIAL_PRACTICE: LsatFact<{
  platform: string;
  freeTier: string;
  paidTier: string;
}> = {
  value: {
    platform: 'LSAC LawHub (lawhub.lsac.org)',
    freeTier: 'a free LawHub account includes official practice tests at no cost',
    paidTier: 'LawHub Advantage (paid) unlocks the full library of official PrepTests',
  },
  asOf: V,
  source: 'LSAC LawHub pages',
  note: 'Exact free/paid test counts change; state tiers, not counts.',
};

/** Bundle for display surfaces that want one import. */
export const LSAT_FACTS = {
  formatTransition: FORMAT_TRANSITION,
  testStructure: TEST_STRUCTURE,
  rcComposition: RC_COMPOSITION,
  scoring: SCORING,
  writing: WRITING,
  delivery: DELIVERY,
  officialPractice: OFFICIAL_PRACTICE,
} as const;
