/**
 * Original argumentative-writing practice prompts.
 *
 * These are written for this app — they are NOT real LSAT items and are not
 * drawn from any official test. Each follows the Argumentative Writing shape:
 * a debatable issue, background context, and two or three competing
 * perspectives the writer must engage.
 */

export interface WritingPerspective {
  label: string;
  body: string;
}

export interface WritingPrompt {
  id: string;
  title: string;
  background: string;
  perspectives: WritingPerspective[];
}

export const WRITING_PROMPTS: WritingPrompt[] = [
  {
    id: 'wp-millbrook',
    title: 'The Millbrook Market',
    background:
      'The town of Millbrook must decide what to do with its aging downtown parking lot, a two-acre parcel the town has owned since the 1960s. A developer has proposed converting the lot into a year-round public market with space for local vendors, food stalls, and a small amphitheater. The plan would eliminate 140 parking spaces in a downtown where business owners already complain about scarce parking. Supporters point to a recent county study showing that pedestrian-friendly districts generate roughly 40% more retail revenue per square foot than car-dependent ones. Opponents note that Millbrook is surrounded by rural communities whose residents depend on cars, and that the nearest public garage is already full on weekends. The town council will vote on the proposal next month.',
    perspectives: [
      {
        label: 'The development office',
        body: 'The market will revitalize downtown. Pedestrian districts outperform car-dependent ones on revenue, and the parking loss can be absorbed by a shuttle service from a peripheral lot. Downtown’s future depends on becoming a destination, not a parking convenience.',
      },
      {
        label: 'Downtown merchants',
        body: 'Our customers arrive by car, and they are already circling for spots. Eliminating 140 spaces will drive shoppers to the highway strip malls. Revitalization that punishes the people who keep us in business is no revitalization at all.',
      },
      {
        label: 'The sustainability coalition',
        body: 'Every downtown that chooses parking over people entrenches car dependence for another generation. The market is a chance to reshape how Millbrook moves — with bike lanes, a shuttle, and a downtown designed for residents rather than through-traffic.',
      },
      {
        label: 'Longtime residents',
        body: 'We have watched three "revitalization" projects raise rents and push out the families who made this neighborhood worth visiting. A market square sounds lovely until the property assessments arrive — development should serve the people already here, not replace them.',
      },
    ],
  },
  {
    id: 'wp-gened',
    title: 'Required Coding in General Education',
    background:
      'Harborview College is considering a proposal to add a one-semester introductory programming course to its general-education requirements, replacing the current quantitative-reasoning distribution option. Proponents argue that computational thinking is now as fundamental as quantitative literacy: graduates in every field encounter data, automation, and algorithmic decision-making, and a required course would ensure no student graduates without basic fluency. Critics respond that the requirement would displace courses many students find more valuable — statistics, logic, or financial literacy — and that forcing non-technical students through programming could increase time to graduation and attrition. The faculty senate has asked for written positions from students before it votes.',
    perspectives: [
      {
        label: 'The computer science department',
        body: 'Programming is the literacy of the modern workplace. Students in history, nursing, and business all encounter algorithmic systems; a required course gives them agency over those systems instead of leaving them as passive subjects.',
      },
      {
        label: 'The mathematics department',
        body: 'This displaces the courses that teach rigorous reasoning without demanding tool fluency. Statistics and logic transfer across every discipline; a syntax-heavy programming requirement teaches a skill many students will never use again after the final exam.',
      },
      {
        label: 'The student government',
        body: 'A required programming course lands hardest on the students with the least margin — working students and first-generation students who cannot afford summer catch-up courses or private tutoring. If the college wants computational fluency, it should fund support, not just mandate the requirement.',
      },
      {
        label: 'The career services office',
        body: 'Employers consistently ask for data literacy and comfort with automation, not necessarily programming syntax. A requirement framed around computational thinking — with programming as one path among several — would serve students better than a single mandatory coding course.',
      },
    ],
  },
  {
    id: 'wp-remote',
    title: 'The Remote-Work Vote',
    background:
      'The board of Northstar Insurance is voting on whether to end the company’s hybrid policy and require all 2,400 employees to work in the office four days a week. Executives argue that in-person collaboration has weakened: cross-team projects now take measurably longer, junior employees receive less mentoring, and the company’s culture surveys show declining attachment. Employee representatives counter that productivity metrics have remained steady or improved since hybrid began, and that a mandate would trigger resignations — an internal survey found 38% of employees would consider leaving, concentrated among the highest performers and working parents. Competitors in the same market remain hybrid, giving disaffected employees somewhere to go.',
    perspectives: [
      {
        label: 'The executive team',
        body: 'Mentorship, spontaneous collaboration, and culture cannot be scheduled over video. The data on project cycle times is unambiguous: we are slower apart than together, and the long-term cost of a hollowed-out culture exceeds any short-term retention risk.',
      },
      {
        label: 'The employee council',
        body: 'Productivity is up, not down — the executives are solving a problem the metrics don’t show. A mandate will drive away exactly the people the company can least afford to lose, while competitors gladly hire them under hybrid policies.',
      },
      {
        label: 'The board’s independent directors',
        body: 'Both sides have evidence, but the evidence measures different things: short-term output versus long-term capability. The right policy is likely neither a mandate nor the status quo, but a structured hybrid with real in-office expectations — though no one is offering that compromise.',
      },
      {
        label: 'The HR analytics team',
        body: 'The headline 38% figure needs context: flight risk is concentrated in roles we already struggle to fill, and replacing a senior engineer costs roughly twice their salary. But the data also shows new-hire ramp time doubled under hybrid — the mandate’s costs and its benefits fall on different groups.',
      },
    ],
  },
  {
    id: 'wp-library',
    title: 'The Library Levy',
    background:
      'Voters in Cedar County will decide on a property-tax levy that would fund a new central library and triple the library system’s operating budget for ten years. The current central library, built in 1972, has a failing roof, no elevator, and serves a county whose population has doubled since it opened. Supporters describe libraries as the last free public space — used by students, job seekers, seniors, and new immigrants — and note the levy costs the median homeowner about $9 per month. Opponents argue the tax burden is already high, that digital lending has reduced the need for physical buildings, and that the county should fix the existing building rather than fund an ambitious expansion.',
    perspectives: [
      {
        label: 'The library board',
        body: 'This is about what kind of county we want to be. The library is the only institution that serves everyone without asking for money or credentials. For nine dollars a month, we can build a civic asset that pays dividends for fifty years.',
      },
      {
        label: 'The taxpayers’ association',
        body: 'Residents are already stretched. Borrowing against a ten-year levy for an ambitious new building, when a renovation of the existing facility would address the urgent problems at a fraction of the cost, is fiscal recklessness dressed as civic virtue.',
      },
      {
        label: 'The county auditor',
        body: 'The numbers deserve scrutiny from both sides. Bonding for new construction carries financing costs the $9-a-month figure understates, but the renovation estimates cited by opponents omit the elevator, roof, and code-compliance work the 1972 building legally requires. Voters should compare honest totals, not slogans.',
      },
      {
        label: 'Volunteer tutors',
        body: 'We turn away children from after-school programs every week for lack of space. This debate is abstract for the families on our waiting list — they need rooms, computers, and staff now, and only the expansion provides them at the scale required.',
      },
    ],
  },
];

export function getWritingPrompt(id: string): WritingPrompt | undefined {
  return WRITING_PROMPTS.find((p) => p.id === id);
}
