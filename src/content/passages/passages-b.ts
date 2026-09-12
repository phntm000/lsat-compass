/**
 * LSAT Compass — RC Passage Set B.
 *
 * 12 original passages: 6 single passages (rc-p14..rc-p19) and
 * 6 comparative pairs (rc-c01..rc-c06). All prose is original and
 * written for this project; no outside knowledge is required to
 * answer the accompanying questions.
 */

import type { Passage } from '../index';


/**
 * Single passages, rc-p14 through rc-p19.
 */
const SINGLES: Passage[] = [
  {
    id: 'rc-p14',
    title: 'Reading Statutes: Plain Meaning or Purpose?',
    domain: 'law',
    comparative: false,
    parts: [
      {
        paragraphs: [
          'When judges interpret a statute, the most frequently announced rule is also the simplest: follow the text. Under the plain-meaning rule, if the language of a law is clear and unambiguous, courts must apply it as written, even when the result seems unwise. The appeal is obvious. Statutes are compromises hammered out by a legislature; letting judges rewrite them in the name of fairness or common sense risks replacing democratic lawmaking with judicial policymaking. The text, proponents insist, is the law.',
          'Yet for every judge who claims the text settles the matter, another insists that words alone rarely settle anything. This second camp, often called purposivists, argues that language is inherently imprecise and that a statute is best understood as a solution to a problem. Consider a law that bars anyone who has "unlawfully killed" another person from inheriting from the victim. A grandson who murders his grandfather to collect the inheritance has plainly done what the words describe — yet no court has hesitated to deny him the inheritance, reasoning that the legislature could not have meant to reward murder. For purposivists, such cases prove that meaning depends on the mischief the law was meant to cure, not merely on dictionary definitions.',
          'Textualists reply that hard cases make bad interpretive theory. The murderous heir is an extreme example, they argue, and building a whole method around extremes licenses judges to smuggle their own preferences into ordinary cases under the respectable cover of "purpose." Purpose, they point out, is not a fact waiting to be discovered; a single statute typically serves several purposes, sometimes in tension, and choosing among them is itself an act of discretion. The plain-meaning rule may occasionally produce a harsh result, but it constrains judges, gives citizens fair notice of the law, and keeps courts out of the legislature\'s business.',
          'The debate, however, is less absolute than the rhetoric suggests. Few textualists claim that a statute should be read with no attention to context: they consult neighboring provisions, established legal usage, and the canons of construction that courts have used for centuries. And few purposivists ignore the text: even the most committed among them begin with the words and depart from them only when the text, read in context, would defeat the law\'s evident design. In practice, the two approaches often converge on the same outcome, differing mainly in what they emphasize — the discipline of the text or the flexibility of its aim.',
          'New technology keeps reopening the quarrel. When a decades-old privacy statute written for telephone wiretaps is applied to location data from smartphones, textualists ask what the words covered at enactment, while purposivists ask what problem the legislature was trying to solve and how that problem appears today. Neither side has surrendered, and neither is likely to.',
          'The deeper question remains whether any method can fully separate interpretation from judgment. The canons and dictionaries that textualists favor are themselves products of judicial choice, and the purposes that purposivists invoke must be inferred from the very texts they claim to transcend. Perhaps the honest conclusion is that the plain-meaning rule describes an aspiration — a commitment to decide cases on the basis of enacted words — rather than a formula that decides cases by itself.',
        ],
      },
    ],
    questionIds: [
      'rc-p14-q1',
      'rc-p14-q2',
      'rc-p14-q3',
      'rc-p14-q4',
      'rc-p14-q5',
      'rc-p14-q6',
      'rc-p14-q7',
      'rc-p14-q8',
    ],
    estimatedMinutes: 11,
  },
  {
    id: 'rc-p15',
    title: "The Restorer's Dilemma",
    domain: 'humanities',
    comparative: false,
    parts: [
      {
        paragraphs: [
          'Every act of art restoration is also an act of interpretation. A conservator who cleans a darkened painting, fills a loss, or reattaches a flaking surface is not simply revealing the work as it was; the conservator is deciding, brushstroke by brushstroke, what the work should be. This tension sits at the heart of modern conservation: the duty to preserve the object for the future collides with the risk of overwriting the past.',
          'Professional conservators have developed an ethical framework to manage the collision. Its central principle is reversibility: any treatment should, as far as possible, be undoable, so that future generations — armed with better techniques and different values — can revisit the decision. Restorers document every intervention, use materials that can be removed without harming the original, and favor minimal action. The cleaning of the Sistine Chapel ceiling in the 1980s and 1990s, which stripped away centuries of soot and overpainting to reveal unexpectedly vivid colors, was defended on exactly these grounds: the grime was not Michelangelo\'s work, and removing it restored the artist\'s own hand.',
          'Critics were not persuaded. Art historians and fellow artists charged that the cleaning had destroyed something authentic — the patina of age, the subtle tonal harmonies that centuries of viewers had actually experienced, and possibly Michelangelo\'s own final glazes, which the restorers mistook for dirt. On this view, reversibility is a comforting fiction: once a surface is altered, no record, however meticulous, can put it back. The cleaned ceiling may be closer to the sixteenth century, the critics argued, but it is farther from every century in between, and those intervening centuries are part of the work\'s history too.',
          'Both sides, notably, accept that some intervention is unavoidable. Paintings flake, sculptures corrode, and textiles fade; a policy of absolute non-interference would simply watch masterpieces disintegrate. The real dispute is about the burden of proof. Conservators place it on those who would leave damage untreated, arguing that neglect is itself a choice with irreversible consequences. Their critics place it on those who would intervene, arguing that every restoration gambles the irreplaceable on the taste of the present.',
          'Digital technology has opened a third path. High-resolution imaging now allows restorers to produce virtual reconstructions — showing how a faded fresco might once have looked — without touching the physical object. Museums increasingly exhibit the damaged original alongside its digital restoration, letting viewers see both the work\'s history and its hypothesized past. Yet even this compromise involves interpretation: someone must decide which pigments to simulate and which losses to fill, and those decisions embed the same judgments the physical restorer makes.',
          'Underlying the technical debate is a question of authority. Does a painting belong primarily to its maker, whose intentions the restorer claims to recover? To the public, whose heritage it has become? Or to the future, which the principle of reversibility tries — perhaps impossibly — to protect? Until that question is answered, every cleaned canvas will remain, in part, a portrait of its restorer.',
        ],
      },
    ],
    questionIds: [
      'rc-p15-q1',
      'rc-p15-q2',
      'rc-p15-q3',
      'rc-p15-q4',
      'rc-p15-q5',
      'rc-p15-q6',
    ],
    estimatedMinutes: 9,
  },
  {
    id: 'rc-p16',
    title: 'Basic Income Pilots: Reading the Evidence',
    domain: 'social-science',
    comparative: false,
    parts: [
      {
        paragraphs: [
          'Few policy ideas have traveled as quickly from the seminar room to the pilot program as the universal basic income — the proposal to give every resident a regular, unconditional cash payment. In the past decade, governments and philanthropies have launched dozens of experiments, from a nationwide trial in Finland to city-level pilots across North America and Africa. Advocates hail the results as vindication; skeptics see the same data and shrug. The dispute is less about the numbers than about what the numbers are allowed to prove.',
          'The headline findings are by now familiar. Recipients report lower stress, better health, and greater ability to handle emergencies. Employment effects are modest: most studies find small reductions in hours worked, concentrated among students, new parents, and people between jobs, rather than a mass exodus from the labor force. Children in recipient households tend to stay in school longer, and some pilots show improvements in nutrition and mental health. For supporters, this is the core of the case: cash works, people do not squander it, and the feared collapse of work effort has not materialized.',
          'Critics do not dispute the measurements; they dispute the leap from pilot to policy. A pilot is, by definition, partial and temporary. Participants know the payments will end, which changes how they behave — a student may sensibly cut back on shifts during a two-year experiment in a way she would not under a permanent program. More fundamentally, pilots are usually funded by outside grants, so they reveal nothing about the taxes that would be needed to pay for a genuine universal program, nor about how those taxes would affect the very labor markets the pilots are meant to study. Testing a lifeboat, the critics say, tells you little about building an ark.',
          'There is also the question of scale. A pilot enrolling a few thousand people cannot capture economy-wide effects: if everyone received a basic income, wages, prices, and migration patterns might all shift in ways no small experiment can detect. Supporters concede the point but reverse its moral: the absence of large-scale evidence, they argue, is a reason to run larger experiments, not a reason to dismiss the idea. Dismissing basic income for lack of perfect evidence, they note, sets a standard that no major social program — public schooling, retirement pensions — could have met in advance.',
          'Where both sides find common ground is on the value of pilots as design tools. Even skeptics acknowledge that the experiments have answered practical questions: monthly payments appear to work better than lump sums, unconditional cash outperforms tightly restricted vouchers in most settings, and administrative simplicity is a genuine virtue. The pilots have not settled whether societies should adopt a basic income, but they have clarified what adopting one would entail.',
          'That clarification may be the experiments\' most important product. The fiercest disagreements about basic income were never really about two-year trials; they are about competing visions of work, security, and the state\'s obligations — questions no randomized trial can answer. The evidence can discipline the debate, but it cannot end it.',
        ],
      },
    ],
    questionIds: [
      'rc-p16-q1',
      'rc-p16-q2',
      'rc-p16-q3',
      'rc-p16-q4',
      'rc-p16-q5',
      'rc-p16-q6',
    ],
    estimatedMinutes: 10,
  },
  {
    id: 'rc-p17',
    title: 'From Protection to Intervention: Coral Conservation’s Change of Course',
    domain: 'natural-science',
    comparative: false,
    parts: [
      {
        paragraphs: [
          'For most of the twentieth century, coral conservation meant one thing: protection. The institutional model was the marine park — set boundaries, restrict fishing and development, and let the reef heal itself. Australia created the Great Barrier Reef Marine Park in 1975, among the world’s largest protected areas, and similar reserves multiplied across the tropics through the 1980s. The operating assumption, shared by managers and funders alike, was that reefs were resilient if left alone: remove local stresses and the ecosystem’s own recuperative powers would do the rest. Intervention in the reef’s biology was not debated; it was simply outside the institutional imagination.',
          'The 1998 global mass-bleaching event broke that assumption. Unprecedented ocean heat turned vast stretches of reef ghostly white — corals expelling the symbiotic algae that feed them — and protection boundaries proved irrelevant against a warming ocean. In the United States, Congress responded with the Coral Reef Conservation Act of 2000, creating a federal program inside the National Oceanic and Atmospheric Administration devoted to reef resilience science. The new institutional language was telling: managers began speaking of “resilience” rather than “preservation,” a semantic shift that licensed a more active role. Monitoring networks expanded, and for the first time, public money flowed toward understanding how reefs might be helped to adapt, not merely shielded.',
          'Australia’s policy evolution traced a parallel arc with higher stakes, since the Great Barrier Reef dominates the country’s conservation politics. The Reef 2050 Long-Term Sustainability Plan, adopted in 2015, committed governments to water-quality targets, crown-of-thorns starfish culling programs, and tens of millions in monitoring — still recognizably the protection playbook, writ large. But successive bleaching events in 2016 and 2017, which killed roughly half the shallow-water coral in the reef’s northern sector, convinced policymakers that protection alone could not hold the line. Funding priorities began to shift from keeping threats out to building tolerance in.',
          'The institutional expression of that shift was the Reef Restoration and Adaptation Program, launched in 2020 with roughly 150 million Australian dollars in public funding. The program’s premise would have been unthinkable to the marine-park generation: that reefs should be deliberately engineered for a hotter ocean. Its research portfolio includes breeding heat-tolerant corals, manipulating the symbiotic algae that confer thermal resistance, and field trials deploying lab-reared corals onto degraded reefs. The program created new bureaucratic facts — permits for releasing bred organisms, protocols for genetic diversity in broodstocks, risk assessments for large-scale outplanting — and with them, new controversies. Traditional conservationists within the agencies warned that intervention spending could siphon support from emissions reduction and water quality, the unglamorous work on which everything else depends.',
          'The funding shift also exposed a governance gap. Marine parks had clear legal authority: they regulated what people could do inside a boundary. Active restoration raised questions no statute had anticipated — who authorizes the release of lab-bred corals into the wild, who bears liability if an introduced strain proves invasive or disease-prone, and how neighboring jurisdictions coordinate when larvae drift across boundaries. Regulators improvised with research permits and case-by-case approvals, but the mismatch between twentieth-century conservation law and twenty-first-century intervention science remains unresolved.',
          'The result is a hybrid institutional regime that would puzzle the founders of the marine-park era. Protection remains the base layer — no serious proposal abandons water quality or fishing limits — but a growing overlay of intervention programs now treats the reef as something to be managed at the genetic level. Whether that overlay grows into the dominant paradigm or remains an emergency supplement will depend less on laboratory results than on political decisions about risk, money, and authority that have barely begun. The reefs of the next century will reflect those decisions as surely as they reflect the temperature of the sea.'
        ],
      },
    ],
    questionIds: ['rc-p17-q1', 'rc-p17-q2', 'rc-p17-q3', 'rc-p17-q4', 'rc-p17-q5', 'rc-p17-q6'],
    estimatedMinutes: 9,
  },
  {
    id: 'rc-p18',
    title: 'The Fall and Reinvention of Eyewitness Testimony',
    domain: 'law',
    comparative: false,
    topicCluster: 'eyewitness-id',
    parts: [
      {
        paragraphs: [
          'For most of the twentieth century, the confident eyewitness was the prosecution\'s crown jewel. Juries found a witness who pointed at the defendant and declared "I\'m sure" nearly irresistible, and appellate courts rarely second-guessed them. The Supreme Court\'s framework, set in Manson v. Brathwaite (1977), reflected that trust: even an identification produced by a suggestive procedure — a lineup in which the suspect conspicuously stood out — could be admitted so long as it seemed "reliable" under a totality of the circumstances. And among the circumstances courts were told to weigh was the witness\'s own certainty. Confidence, in other words, was treated as evidence of accuracy.',
          'The crack in that edifice came from two directions at once. Beginning in the 1990s, DNA testing began freeing prisoners whose convictions had rested on eyewitness testimony; in the majority of the first several hundred such exonerations studied, mistaken identification had played a central role. Psychological research explained them. Memory, the experiments showed, is not a recording but a reconstruction — and reconstruction fails at predictable points. So-called estimator variables lie beyond the justice system\'s control: stress, brief exposure, a weapon drawing attention away from faces, and the well-documented difficulty of identifying members of other races. System variables, by contrast, are the system\'s own doing: how lineups are constructed and administered, what witnesses are told beforehand, and what they are told afterward. The cruelest finding concerned confidence itself. A witness\'s certainty swells with confirming feedback — "good, you picked our suspect" — which meant the Manson factor of certainty was measuring the procedure as much as the memory.',
          'In 2011, the New Jersey Supreme Court did what Manson had not. In State v. Henderson, the court held extensive hearings on the science and rebuilt the framework around it: when the defense shows some evidence that a procedure was suggestive, courts must examine both estimator and system variables at a pretrial hearing, and juries receive instructions explaining how memory can fail. Other states followed with their own versions, and police departments began adopting the laboratory\'s prescriptions — double-blind administration, in which the officer running the lineup does not know who the suspect is; sequential presentation of faces one at a time; unbiased instructions warning that the perpetrator may not be present; and the recording of a confidence statement before any feedback can inflate it. Researchers caution that sequential lineups trade fewer false picks for somewhat fewer correct ones, a reminder that reform reallocates error rather than abolishing it.',
          'The new regime has not gone uncontested. Police organizations warn of training costs and administrative burdens, particularly for small departments, and most states still apply Manson\'s totality test unchanged. Courts remain divided over expert testimony on eyewitness fallibility: some admit it as necessary context for jurors, others exclude it as invading the jury\'s province. And estimator variables set a hard ceiling on what procedure can achieve — no lineup protocol repairs a fleeting, cross-racial glimpse under extreme stress. Reform, its architects concede, can only police the system\'s own contributions to error.',
          'The direction of travel, however, is toward a humbler evidentiary role for identification: one fallible trace among others, prized when corroborated and discounted when standing alone. A caution is in order about how far the Henderson model can travel on science alone: the research establishes that certainty is manufactured, not that any particular reform reliably unmanufactures it in the courtroom. Whether the next generation of wrongful convictions is smaller than the last will depend on reforms tested where they matter — in trials, not laboratories.',
        ],
      },
    ],
    questionIds: [
      'rc-p18-q1',
      'rc-p18-q2',
      'rc-p18-q3',
      'rc-p18-q4',
      'rc-p18-q5',
      'rc-p18-q6',
    ],
    estimatedMinutes: 9,
  },
  {
    id: 'rc-p19',
    title: 'Whose Heritage? The Repatriation Debate',
    domain: 'humanities',
    comparative: false,
    parts: [
      {
        paragraphs: [
          'In storerooms beneath the world\'s great museums sit objects that do not quite belong to the institutions holding them: sculptures removed from temples, manuscripts taken in wartime, ceremonial masks collected under colonial rule. A growing movement demands their return to the communities and nations from which they came. Museum directors counter that these collections serve all of humanity. The repatriation debate is often framed as a legal dispute over ownership, but at bottom it is a dispute about identity — about who gets to tell the story of a culture\'s past.',
          'The case for return begins with context. An artifact ripped from its setting, advocates argue, is a sentence torn from a paragraph: a Benin bronze in a London gallery may be beautifully displayed, but it cannot speak as it would in the palace courtyard for which it was cast. Beyond aesthetics lies history. Many objects entered Western collections through conquest, coercion, or transactions that would not pass scrutiny today, and their continued display, critics say, silently normalizes that history. Returning them is therefore not merely generosity; it is a belated acknowledgment that the original taking was wrong.',
          'The great "universal" museums answer with a different vision. Institutions like the British Museum or the Louvre present themselves as custodians of a shared human heritage, where a visitor can encounter the art of every civilization under one roof. They argue that they preserve objects with resources — climate-controlled storage, expert conservation, security — that many source institutions cannot match, and that dispersing collections would impoverish the cross-cultural encounters these museums make possible. Some directors add a slippery-slope warning: if every object with a contested past must go, few galleries would have anything left to show.',
          'Experience has complicated both positions. The returns that have occurred — a Berlin museum\'s restitution of bronze plaques to Nigeria, the repatriation of ancestral remains to Indigenous communities — have generally been celebrated rather than mourned, and several receiving institutions have built impressive new museums to house returned works, undercutting the claim that they cannot care for them. Conversely, some source governments have themselves been accused of neglecting heritage or using repatriated treasures as political props, lending weight to the universalists\' cautions.',
          'A middle path is emerging in practice if not in principle. Long-term loans, shared stewardship agreements, and joint exhibitions allow objects to return home while remaining accessible to global audiences. Digital archives make collections visible everywhere regardless of where the physical object resides. These arrangements concede something to each side: that cultural context matters, and that broad access matters too.',
          'What remains unresolved is the criterion. Everyone agrees that objects looted in living memory by identifiable thieves should go back; almost no one thinks every antiquity that crossed a border centuries ago must. Between those poles lies the vast majority of contested holdings, and there the debate continues, now conducted less through grand principle than through case-by-case negotiation — a practical settlement the theory has yet to catch up with.',
        ],
      },
    ],
    questionIds: [
      'rc-p19-q1',
      'rc-p19-q2',
      'rc-p19-q3',
      'rc-p19-q4',
      'rc-p19-q5',
      'rc-p19-q6',
    ],
    estimatedMinutes: 10,
  },
];

/**
 * Comparative pairs, rc-c01 through rc-c06.
 */
const PAIRS: Passage[] = [
  {
    id: 'rc-c01',
    title: 'Algorithms on the Hiring Committee',
    domain: 'social-science',
    comparative: true,
    parts: [
      {
        label: 'Passage A',
        paragraphs: [
          'The hiring process is one of the last bastions of pure subjectivity in corporate life. Resumes are skimmed in seconds, interviews reward charm over competence, and study after study shows that candidates with identical qualifications receive different treatment based on their names, their schools, or the interviewer\'s mood. Automated screening tools promise to replace this lottery with something fairer: algorithms that evaluate every applicant against the same criteria, ignore irrelevant personal details, and learn from data rather than gut feeling.',
          'The evidence in favor of automation is substantial. Properly designed systems can be audited in ways human judgment cannot — every decision is logged, every criterion is explicit, and disparate outcomes can be detected and corrected. Several large employers report that after adopting structured algorithmic screening, the diversity of their shortlists improved markedly. Moreover, unlike a biased manager who can hide behind vague impressions, a biased algorithm leaves a paper trail; regulators and researchers can test it, challenge it, and demand fixes.',
          'None of this means algorithms are neutral by nature. It means they are improvable in a way that human prejudice is not. A company cannot easily rewire the intuitions of ten thousand hiring managers, but it can retrain a model, adjust its thresholds, and publish the results. The question is not whether automated hiring is perfect — it is whether it is better than the flawed, opaque, and demonstrably discriminatory system it replaces. What matters is the direction of travel: away from untestable hunches and toward decisions that can be inspected, debated, and steadily improved.',
        ],
      },
      {
        label: 'Passage B',
        paragraphs: [
          'Proponents of algorithmic hiring describe a future of objectivity, but the systems being deployed today look less like impartial judges than like efficient laundries for old biases. An algorithm trained on a company\'s historical hiring data learns exactly what that company has always done: favor graduates of certain universities, penalize employment gaps, reward the vocabulary of the already-employed. The discrimination does not disappear; it is simply expressed in mathematics, which makes it harder to recognize and easier to defend.',
          'The much-vaunted auditability of these systems is largely theoretical. Most commercial hiring tools are proprietary black boxes, and vendors routinely resist independent testing on grounds of trade secrecy. Even when audits occur, they typically measure only narrow statistical parity while missing the deeper question of whether the criteria themselves are fair. An algorithm that screens out caregivers because past "high performers" worked uninterrupted eighty-hour weeks is not removing bias from hiring; it is automating a workplace culture that many consider part of the problem.',
          'There is also an accountability gap with no human equivalent. When a manager discriminates, the victim can at least identify the decision-maker and appeal to conscience, policy, or law. When an algorithm rejects an applicant, there is often no explanation beyond a score, and no one within the company fully understands how the score was produced. Efficiency is a genuine value, but a hiring process that cannot explain its own rejections has sacrificed something essential about fair treatment: the right to be judged by reasons, not by correlations. Until hiring systems can meet that standard, their gains in efficiency remain morally incomplete.',
        ],
      },
    ],
    questionIds: [
      'rc-c01-q1',
      'rc-c01-q2',
      'rc-c01-q3',
      'rc-c01-q4',
      'rc-c01-q5',
      'rc-c01-q6',
    ],
    estimatedMinutes: 12,
  },
  {
    id: 'rc-c02',
    title: 'The Reintroduction Debate',
    domain: 'natural-science',
    comparative: true,
    topicCluster: 'species-reintroduction',
    parts: [
      {
        label: 'Passage A',
        paragraphs: [
          'In 1987, wildlife biologists captured the last 22 California condors flying free and carried them into captivity. The decision felt like an admission of defeat: the birds were dying of lead poisoning, ingesting fragments of spent ammunition from the carcasses they scavenged, and the landscape itself seemed to have turned against them. With the wild population at zero, captive breeding began from those 22 survivors. Four years later the first captive-bred condors were released; today more than 500 condors exist, with over 300 soaring wild over California, Arizona, Utah, and Baja California.',
          'Proponents draw a general lesson from the condor: extinction is not always inevitable, even at the brink. When the threat is identified and removed — here, lead, through regulation and hunters voluntarily switching ammunition — intensive intervention can reverse a decline that looked terminal. Captive breeding, once dismissed as a zoo exercise, becomes a bridge back to the wild. The choice, on this view, is rarely between pristine wilderness and total loss; it is between managed recovery and managed extinction.',
          'None of this was cheap or simple. The program has cost tens of millions of dollars, demands perpetual monitoring of released birds, and depends on hunters accepting non-lead ammunition — an ask that has met sustained political resistance. But the alternative was a sky permanently without condors. The question is whether conservation should be judged by its price tag or by what it preserves: a species pulled back from 22 individuals is not a curiosity but proof that determined intervention works.',
        ],
      },
      {
        label: 'Passage B',
        paragraphs: [
          'The Yellowstone wolf story is a wonderful narrative, and like many wonderful narratives it has outrun its evidence. Recent research suggests that the celebrated trophic cascade was overstated: elk numbers were already declining before the wolves arrived, climate shifts confounded the vegetation data, and some of the attributed recoveries occurred in areas the wolves rarely visit. The wolf\'s ecological role is real but contingent — powerful in some landscapes, marginal in others — and policy built on the grandest version of the story rests on shaky ground.',
          'More importantly, the costs of reintroduction are neither trivial nor equitably shared. Ranchers near wolf territories face predation losses, constant vigilance, and the stress of defending herds through calving season; compensation programs are chronically underfunded and pay only for confirmed kills, a fraction of actual losses. These burdens fall on rural communities that see little of the tourism revenue wolves generate for gateway towns. Conservation that asks one group to subsidize everyone else\'s wilderness ideal is not obviously just, whatever its ecological merits.',
          'None of this means predators have no place in modern landscapes. It means reintroduction should be treated as a site-specific management decision — weighed against local conditions, honest about uncertainties, and negotiated with the people who will live alongside the consequences — rather than as a moral crusade to undo the past. Ecology deserves better than mythology, and so do the communities asked to bear its costs. Sound policy, like sound science, begins by taking those lived costs seriously rather than explaining them away.',
        ],
      },
    ],
    questionIds: [
      'rc-c02-q1',
      'rc-c02-q2',
      'rc-c02-q3',
      'rc-c02-q4',
      'rc-c02-q5',
      'rc-c02-q6',
    ],
    estimatedMinutes: 12,
  },
  {
    id: 'rc-c03',
    title: 'Saving Old Streets',
    domain: 'humanities',
    comparative: true,
    parts: [
      {
        label: 'Passage A',
        paragraphs: [
          'Historic preservation is usually defended in the language of beauty and memory, but its strongest justification may be economic. Designated historic districts consistently outperform comparable neighborhoods on the measures cities care about: property values rise, tourism spending grows, and small businesses — the cafes, galleries, and workshops that thrive on foot traffic and character — cluster in old buildings that new construction cannot replicate cheaply. A restored main street is not a museum piece; it is a productive asset.',
          'The mechanism is straightforward. Distinctive older districts attract visitors and residents willing to pay a premium for authenticity, and that premium funds further rehabilitation in a virtuous cycle. Studies of heritage tourism show that travelers seek out historic character and stay longer — and spend more — where they find it. Meanwhile, rehabilitating existing buildings is often cheaper per square foot than new construction and keeps money circulating locally through skilled trades rather than exporting it to distant developers.',
          'Critics warn that preservation freezes cities in amber and drives up housing costs by restricting supply. But thoughtful preservation does not prohibit growth; it channels it, protecting the irreplaceable core while directing density to appropriate sites. A city that demolishes its distinctive fabric for generic development is not becoming more affordable — it is becoming more interchangeable, and sacrificing the very qualities that made people want to live there. Character, in the end, is infrastructure of another kind: it compounds over decades while generic development depreciates, and cities that understand this build wealth that lasts.',
        ],
      },
      {
        label: 'Passage B',
        paragraphs: [
          'Walk through a historic district and you are walking through a community\'s autobiography. The corner storefront where immigrants opened their first businesses, the church that anchored a neighborhood through hard decades, the modest rowhouses that housed generations of working families — these places carry meanings no plaque can fully capture. Preservation matters, on this view, not because old buildings are profitable but because they are irreplaceable vessels of collective memory. A city that erases them erases the evidence of who its people were.',
          'This argument reaches communities that the economic case never touches. For neighborhoods whose histories include displacement, discrimination, or struggle, preserving the physical traces of that history is an act of recognition: it says these lives counted and this place mattered. The value here cannot be measured in tourist dollars. Indeed, reducing preservation to its return on investment subtly concedes that anything unprofitable may be demolished — a principle that would have erased most of what we now treasure.',
          'None of this denies that preservation has practical benefits; thriving historic districts do attract investment, and no one mourns that. The point is one of priority. We should save old streets first because they embody who we are, and welcome the prosperity that follows as a fortunate consequence — not the other way around. A preservation movement that must justify itself on a balance sheet has already lost the deeper argument. Memory is not a luxury good but the precondition for a community knowing itself, and no balance sheet can price what a neighborhood remembers.',
        ],
      },
    ],
    questionIds: [
      'rc-c03-q1',
      'rc-c03-q2',
      'rc-c03-q3',
      'rc-c03-q4',
      'rc-c03-q5',
      'rc-c03-q6',
    ],
    estimatedMinutes: 11,
  },
  {
    id: 'rc-c04',
    title: 'Cleaning the Sky: Direct Air Capture and Its Critics',
    domain: 'natural-science',
    comparative: true,
    parts: [
      {
        label: 'Passage A',
        paragraphs: [
          'The arithmetic of climate change has grown unforgiving. Even if every nation met its emissions pledges — and most are not on track — the world would still overshoot the temperature targets scientists consider safe. Some emissions, from aviation, shipping, cement, and agriculture, have no scalable clean alternative on the horizon. This is the gap that direct air capture (DAC) is designed to fill: machines that pull carbon dioxide straight from the atmosphere, allowing it to be stored underground permanently. The technology is expensive today, but so were solar panels forty years ago.',
          'Critics call DAC a distraction, yet the models that chart a path to net-zero emissions rely on large-scale carbon removal in virtually every scenario. Planting trees helps, but forests burn, and there is simply not enough land to absorb the residual emissions of a modern economy. DAC\'s advantages are physical, not ideological: it requires little land, its storage can be measured and verified, and it can in principle be sited wherever clean energy and geology are favorable. Dismissing it means betting the climate on the hope that the hardest emissions turn out to be easy.',
          'None of this argues against cutting emissions first — every ton not emitted is cheaper than a ton captured later. But mitigation and removal are complements, not competitors. Refusing to develop carbon removal until emissions reach zero is like refusing to fund hospitals until disease is eradicated. We will need both, and the longer we delay the second, the more expensive the first becomes. Building both at once is not extravagance; it is the prudence the arithmetic demands.',
        ],
      },
      {
        label: 'Passage B',
        paragraphs: [
          'Direct air capture is an engineering marvel in search of a sensible role. Current facilities capture carbon at costs measured in hundreds of dollars per ton while consuming enormous amounts of energy — energy that, in most grids, still comes partly from fossil fuels, partially defeating the purpose. At the scale required to matter for the climate, DAC would demand an industrial buildout comparable to the entire oil and gas industry, constructed in a fraction of the time, to clean up after emissions we could have avoided in the first place.',
          'The deeper objection is about incentives. Every dollar and every political promise devoted to future carbon removal is a dollar and a promise not devoted to the proven, available work of cutting emissions now: deploying renewables, electrifying transport, insulating buildings. Fossil fuel companies have been quick to embrace DAC precisely because it offers a story in which their product can continue indefinitely, with the cleanup handled later by someone else\'s machines. Economists call this moral hazard; the rest of us might call it an excuse.',
          'This is not an argument that carbon removal research should stop — for truly unavoidable emissions, some removal capacity will eventually be needed. It is an argument about sequence and scale. Mitigation first, at full speed, with removal developed as a backstop rather than a centerpiece. A climate strategy that leads with expensive machines to scrub the sky while emissions keep rising has confused the cleanup crew with the fire department. Prevention first, cleanup second: that sequence is the whole of a serious climate strategy.',
        ],
      },
    ],
    questionIds: [
      'rc-c04-q1',
      'rc-c04-q2',
      'rc-c04-q3',
      'rc-c04-q4',
      'rc-c04-q5',
      'rc-c04-q6',
    ],
    estimatedMinutes: 12,
  },
  {
    id: 'rc-c05',
    title: 'How Children Learn a Second Language at School',
    domain: 'social-science',
    comparative: true,
    parts: [
      {
        label: 'Passage A',
        paragraphs: [
          'Children learn languages the way they learn everything else: through massive, meaningful exposure. This simple observation is the foundation of immersion education, in which students are taught mathematics, science, and history entirely in the target language from the first day of school. The classroom becomes a linguistic deep end, and students — like young swimmers — learn fastest when they cannot touch the bottom. Study after study finds that immersion students match or exceed their peers in subject-matter learning while acquiring dramatically stronger second-language skills.',
          'The mechanism is time on task. A student who hears and uses the new language for six hours a day accumulates in one school year the exposure that a traditional forty-five-minute language class would take nearly a decade to provide. Concerns that immersion harms first-language development have not survived scrutiny: follow-up studies consistently show immersion students performing at grade level in their native language by late elementary school, with the temporary lag of the early years fully closed.',
          'What immersion demands, above all, is commitment. Programs that dilute the model — carving out large blocks of native-language instruction or allowing teachers to translate difficult material — see correspondingly diluted results. Language acquisition rewards intensity, and half-measures produce half-speakers. For schools serious about bilingualism, the evidence points in one direction: maximize exposure, trust the process, and resist the temptation to make things easier in ways that make them slower. Schools that commit fully give students the one resource language learning cannot do without: sustained, daily hours in the language itself.',
        ],
      },
      {
        label: 'Passage B',
        paragraphs: [
          'Immersion advocates tell a compelling story about exposure, but they overlook what actually transfers between languages. Literacy is not language-specific: a child who learns to decode text, follow an argument, and organize an essay in her first language carries those skills into her second. This is the foundation of developmental bilingual programs, which build academic proficiency in the home language while systematically adding the second. The result is students who are literate in two languages rather than semi-proficient in one and shaky in the other.',
          'The research on transfer is robust. Students with strong first-language literacy acquire second-language academic skills faster, not slower, than peers whose home language was neglected — a finding that holds across dozens of studies and multiple language pairs. The early "lag" that immersion researchers celebrate as temporary is, for many children, not temporary at all: students pulled from home-language support too early disproportionately populate remedial tracks, suggesting that what looked like a shortcut was actually a detour.',
          'None of this denies the value of rich second-language exposure; developmental programs are emphatically bilingual, not monolingual. The disagreement is about sequencing, not about goals. Build the foundation first — strong literacy, confident academic identity, skills that transfer — and the second language rises faster on top of it. Tearing down the foundation to build the second story sooner is impatience masquerading as pedagogy. Strong foundations are not delays but the very thing that makes later speed possible, and the transfer research proves it term after term in classrooms everywhere.',
        ],
      },
    ],
    questionIds: [
      'rc-c05-q1',
      'rc-c05-q2',
      'rc-c05-q3',
      'rc-c05-q4',
      'rc-c05-q5',
      'rc-c05-q6',
    ],
    estimatedMinutes: 12,
  },
  {
    id: 'rc-c06',
    title: 'Who Owns What the Machine Learned?',
    domain: 'law',
    comparative: true,
    parts: [
      {
        label: 'Passage A',
        paragraphs: [
          'Every major artificial intelligence model was trained on vast quantities of copyrighted text and images, and a wave of lawsuits now asks whether that training was lawful. The answer, under existing doctrine, should be yes: training is a textbook case of fair use. Fair use protects uses that transform the original into something new, and a model that digests millions of works to learn statistical patterns — grammar, style, the relationship between images and captions — produces nothing that substitutes for any particular work it was trained on.',
          'The alternative is unworkable. Requiring licenses for every work in a training corpus of billions of items would not compensate authors meaningfully — the per-work value of training data approaches zero — but it would entrench the largest technology companies, the only ones able to negotiate such licenses at scale. Copyright was designed to promote the progress of knowledge, not to give every author a veto over new technologies that learn from published works the way human readers do.',
          'None of this leaves creators without protection. If a model reproduces substantial portions of a specific work in its outputs, that output can infringe just as a human-authored copy would. The line copyright has always drawn — between learning from works and copying them — applies cleanly here. What fair use has always permitted for the student with a library card, it should permit for the machine with a dataset. To hold otherwise would let copyright obstruct the very progress in knowledge it was written to promote.',
        ],
      },
      {
        label: 'Passage B',
        paragraphs: [
          'The fair-use defense of AI training rests on a sleight of hand: it treats the ingestion of millions of copyrighted works as if it were a student reading in a library. But a student reading a book does not produce a commercial product that competes with the book\'s author; an AI company training on an author\'s entire oeuvre to build a machine that generates competing text does. The scale and purpose of the use are fundamentally different, and copyright law has always treated commercial exploitation of others\' creative labor as the core case for requiring permission.',
          'Nor is licensing the impossibility its critics claim. Collective licensing organizations already manage rights for millions of musical works, distributing royalties to songwriters every time a song is played; a similar regime for training data is administratively feasible and would direct real money to creators. The claim that per-work values are too small to matter ignores how aggregation works: small payments across billions of uses built the entire recorded-music economy.',
          'Both sides of this dispute, notably, accept the same starting premise: that copyright law — with its familiar machinery of exclusive rights, exceptions, and remedies — is the proper framework for deciding the question. No one here proposes scrapping copyright for AI or inventing an entirely new regime. The fight is over how the existing framework applies: whether mass ingestion for model training is the kind of transformative learning fair use was meant to shelter, or the kind of uncompensated commercial exploitation it was meant to prevent.',
        ],
      },
    ],
    questionIds: [
      'rc-c06-q1',
      'rc-c06-q2',
      'rc-c06-q3',
      'rc-c06-q4',
      'rc-c06-q5',
      'rc-c06-q6',
    ],
    estimatedMinutes: 12,
  },
];

/** All passages in Set B: 6 single + 6 comparative pairs. */
export const PASSAGES_B: Passage[] = [...SINGLES, ...PAIRS];

