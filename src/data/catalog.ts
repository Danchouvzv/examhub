export type Category =
  | "sat"
  | "act"
  | "gmat"
  | "gre"
  | "readiness"
  | "contests"
  | "tools"
  | "bundles";

export type Tier = "standard" | "pro" | "premium";

export interface Product {
  id: string;
  title: string;
  kicker: string;
  blurb: string;
  features: string[];
  price: number;
  category: Category;
  tier?: Tier;
  badge?: string;
  featured?: boolean;
}

export interface CategoryMeta {
  id: Category | "all";
  label: string;
  icon: string;
}

export const categories: CategoryMeta[] = [
  { id: "all", label: "All tools", icon: "sparkles" },
  { id: "sat", label: "SAT", icon: "cap" },
  { id: "act", label: "ACT", icon: "book" },
  { id: "gmat", label: "GMAT", icon: "cap" },
  { id: "gre", label: "GRE", icon: "book" },
  { id: "readiness", label: "Exam-day readiness", icon: "shield" },
  { id: "contests", label: "Contests & olympiads", icon: "trophy" },
  { id: "tools", label: "Extra tools", icon: "wrench" },
  { id: "bundles", label: "Bundles", icon: "box" },
];

/** Tier comparison copy per exam family. */
export interface TierSpec {
  tier: Tier;
  name: string;
  tagline: string;
  price: number;
  badge?: string;
  features: string[];
}

export interface ExamFamily {
  id: "sat" | "act" | "gre" | "gmat";
  name: string;
  subtitle: string;
  live?: boolean;
  tiers: TierSpec[];
}

const tierNames: Record<Tier, { name: string; tagline: string }> = {
  standard: { name: "Standard", tagline: "Core course + practice bank" },
  pro: { name: "Pro", tagline: "Adaptive plan + tutor reviews" },
  premium: { name: "Premium", tagline: "1:1 coaching + full mocks" },
};

const buildTiers = (
  rows: [Tier, number, string | undefined, string[]][],
): TierSpec[] =>
  rows.map(([tier, price, badge, features]) => ({
    tier,
    price,
    badge,
    features,
    name: tierNames[tier].name,
    tagline: tierNames[tier].tagline,
  }));

export const families: ExamFamily[] = [
  {
    id: "sat",
    name: "SAT",
    subtitle: "Standard · Pro · Premium — digital SAT on macOS & Windows",
    live: true,
    tiers: buildTiers([
      ["standard", 290, undefined, [
        "AI-assisted practice engine",
        "Normal sandbox environment",
        "Full digital SAT coverage (RW + Math)",
        "Score tracking dashboard",
      ]],
      ["pro", 550, "Most popular", [
        "Guaranteed 1580+ SAT score",
        "Enhanced sandbox isolation",
        "Leak-aware adaptive modules",
        "Priority live support",
      ]],
      ["premium", 990, "Best results", [
        "1600 every time — perfect-score guarantee",
        "Maximum-security sandbox stack",
        "1:1 strategy coaching session",
        "Unlimited retake practice packs",
      ]],
    ]),
  },
  {
    id: "act",
    name: "ACT",
    subtitle: "Standard · Pro · Premium — per-section builds for each OS",
    tiers: buildTiers([
      ["standard", 260, undefined, [
        "AI-assisted ACT practice",
        "English, Math, Reading, Science modules",
        "Composite score tracking",
      ]],
      ["pro", 610, "Most popular", [
        "Guaranteed 36 ACT pathway",
        "Enhanced sandbox isolation",
        "Leak-aware adaptive modules",
        "Priority live support",
      ]],
      ["premium", 1200, "Best results", [
        "Guaranteed 36 ACT result pathway",
        "Maximum-security sandbox stack",
        "1:1 strategy coaching session",
        "Unlimited retake practice packs",
      ]],
    ]),
  },
  {
    id: "gre",
    name: "GRE",
    subtitle: "Standard · Pro · Premium — General Test, quant-first pathway",
    tiers: buildTiers([
      ["standard", 260, undefined, [
        "AI-assisted GRE General practice",
        "Quant · Verbal · AWA coverage",
        "Score tracking dashboard",
      ]],
      ["pro", 610, "Most popular", [
        "High-score GRE pathway",
        "Enhanced sandbox isolation",
        "Adaptive Quant/Verbal modules",
        "Priority live support",
      ]],
      ["premium", 1200, "Best results", [
        "Top-score GRE pathway",
        "Maximum-security sandbox stack",
        "1:1 strategy coaching session",
        "Unlimited retake practice packs",
      ]],
    ]),
  },
  {
    id: "gmat",
    name: "GMAT",
    subtitle: "Standard · Pro · Premium — Focus Edition syllabus",
    tiers: buildTiers([
      ["standard", 260, undefined, [
        "AI-assisted GMAT Focus practice",
        "Quant · Verbal · Data Insights",
        "Score tracking dashboard",
      ]],
      ["pro", 610, "Most popular", [
        "High-score GMAT Focus pathway",
        "Enhanced sandbox isolation",
        "Adaptive Data Insights modules",
        "Priority live support",
      ]],
      ["premium", 1200, "Best results", [
        "Top-score GMAT Focus pathway",
        "Maximum-security sandbox stack",
        "1:1 strategy coaching session",
        "Unlimited retake practice packs",
      ]],
    ]),
  },
];

const tierProducts: Product[] = families.flatMap((family) =>
  family.tiers.map((tier) => ({
    id: `${family.id}-${tier.tier}`,
    title: `${family.name} ${tier.name}`,
    kicker: family.name,
    blurb: `${family.name} ${tier.name} — ${tier.tagline.toLowerCase()}`,
    features: tier.features,
    price: tier.price,
    category: family.id as Category,
    tier: tier.tier,
    badge: tier.badge,
  })),
);

const readinessSuite: Product = {
  id: "readiness-suite",
  title: "Exam Day Readiness Suite",
  kicker: "Readiness",
  blurb: "One checklist that covers every major remote-testing platform",
  features: [
    "Device, camera and microphone audit",
    "Network stability pre-check",
    "Room setup and ID checklist",
    "Live 30-minute dry run",
    "Timezone-aware exam-day concierge",
    "Backup plan if hardware fails",
  ],
  price: 260,
  category: "readiness",
  featured: true,
  badge: "Campus pick",
};

const readinessRows: [string, string, string[], string?][] = [
  ["Bluebook Setup Check", "Digital SAT app install and compliance pass", ["Bluebook install walkthrough", "Device compliance check", "Offline fallback plan"], "Most requested"],
  ["ACT Online Readiness", "Online ACT environment verification", ["Browser readiness scan", "Account verification", "Practice launch"]],
  ["Remote Proctoring Prep", "What to expect on a proctored session", ["Room scan rehearsal", "ID verification walkthrough", "Rules briefing"]],
  ["Accessibility & Accommodations", "SSD paperwork and timeline planning", ["Document checklist", "Deadline planner", "Submission packaging"]],
  ["Score Report Walkthrough", "Read, verify and send your scores", ["Report walkthrough", "Superscore guidance", "College send checklist"]],
  ["Account Recovery Help", "Regain access to your testing account", ["Recovery steps", "Score linking", "Security hardening"]],
  ["Study Space Audit", "Make your room work for a timed test", ["Lighting & noise check", "Desk layout", "Distraction plan"]],
];

const readiness: Product[] = [
  readinessSuite,
  ...readinessRows.map(([title, blurb, features, badge], i) => ({
    id: `readiness-${i}`,
    title,
    kicker: "Readiness",
    blurb,
    features,
    price: 260,
    category: "readiness" as Category,
    badge,
  })),
];

const contestNames: [string, string, string[], string?][] = [
  ["USACO Bronze", "Bronze division contest preparation", ["Bronze syllabus coverage", "Timed mock contests", "Problem walkthroughs"], "USACO"],
  ["USACO Silver", "Silver division contest preparation", ["Silver topic pack", "Graphs & DP foundations", "Timed mocks"]],
  ["USACO Gold", "Gold division contest preparation", ["Gold algorithms", "Hard mock sets", "Editorial-style review"], "Advanced"],
  ["USACO Platinum", "Platinum division contest preparation", ["Platinum problem bank", "Elite coaching notes", "Full contest sims"], "Elite"],
  ["AMC 8 / 10 / 12", "AMC math contest preparation", ["AMC 8/10/12 modules", "Timed practice tests", "Topic drills"]],
  ["AIME", "AIME preparation package", ["AIME problem bank", "Proof-style solutions", "Timed sections"]],
  ["USAJMO / USAMO", "Olympiad proof-writing track", ["Proof writing labs", "Past paper packs", "Mentor feedback cycles"], "Olympiad"],
  ["IMO Training Track", "International Math Olympiad training", ["Shortlist practice", "Geo · NT · Combo · Algebra camps", "Mock IMOs"]],
  ["IOI Training Track", "Informatics olympiad training", ["IOI syllabus map", "Contest sims", "Code review cycles"]],
  ["Codeforces / AtCoder", "Rated contest coaching", ["Rating roadmap", "Virtual contests", "Editorial review"]],
  ["LeetCode Contest Pack", "Weekly & biweekly contest prep", ["Contest drills", "Pattern sheets", "Timed mocks"]],
  ["ACSL", "Computer science league support", ["ACSL topics", "Past contests", "Team & individual modes"]],
  ["F=ma / USAPhO", "Physics olympiad preparation", ["F=ma drills", "USAPhO free response", "Lab theory pack"]],
  ["USABO", "Biology olympiad preparation", ["Open exam drills", "Semifinal free response", "Topic maps"]],
  ["USNCO", "Chemistry olympiad preparation", ["Local exam pack", "National free response", "Lab theory"]],
  ["Science Bowl / Quiz Bowl", "Team buzzer competition pack", ["Toss-up drills", "Team strategy", "Category banks"]],
  ["Regents Exams (NY)", "New York Regents preparation", ["Core subjects", "Past papers", "Scoring guides"]],
  ["AP Exams Bundle", "Multi-subject AP preparation", ["Subject modules", "FRQ practice", "MCQ drills"]],
  ["IB Exams Support", "International Baccalaureate preparation", ["HL/SL paper practice", "IA guidance notes", "Markscheme review"]],
  ["A-Levels Support", "UK A-Level preparation", ["Board-specific packs", "Past papers", "Mark schemes"]],
  ["GCSE Support", "UK GCSE preparation", ["Core subjects", "Past papers", "Grade 9 pathways"]],
  ["LSAT Pathway", "LSAT preparation pathway", ["LR / LG / RC packs", "Timed sections", "PT reviews"]],
  ["MCAT Pathway", "MCAT preparation pathway", ["Content review map", "CARS drills", "Full-length mocks"]],
];

const contests: Product[] = contestNames.map(([title, blurb, features, badge], i) => ({
  id: `contest-${i}`,
  title,
  kicker: "Contests",
  blurb,
  features,
  price: 190,
  category: "contests",
  badge,
}));

const toolNames: [string, string, string[], string?][] = [
  ["Calculator & Formula Pack", "Exam calculator policies and formula sheets", ["Policy guide", "Formula sheets", "Subject packs"]],
  ["Study Plan Builder", "A 12-week plan mapped to your test date", ["Weekly milestones", "Workload balancing", "Calendar export"], "Popular"],
  ["Flashcard Engine", "Spaced repetition for vocab and formulas", ["SRS scheduling", "Shared decks", "Mobile sync"]],
  ["TOEFL iBT Support", "TOEFL preparation package", ["4-skill modules", "Speaking practice", "Home edition notes"]],
  ["IELTS Support", "IELTS Academic & General support", ["Band target plan", "Writing task labs", "Speaking mocks"]],
  ["Duolingo English Test", "DET preparation package", ["Adaptive practice", "Score estimator", "Device checklist"]],
  ["Citation & Formatting Pass", "APA / MLA / IEEE formatting review", ["APA 7 · MLA · IEEE", "Reference cleanup", "Layout polish"]],
  ["Statement of Purpose Review", "Feedback on your own SOP draft", ["Full review", "Structure notes", "2 revision rounds"]],
  ["Resume + LinkedIn Pack", "Student resume and profile polish", ["1-page resume", "LinkedIn rewrite", "ATS keywords"]],
  ["Interview Practice Lab", "Mock interviews with written feedback", ["2 mock rounds", "Recorded playback", "Feedback rubric"]],
];

const tools: Product[] = toolNames.map(([title, blurb, features, badge], i) => ({
  id: `tool-${i}`,
  title,
  kicker: "Tools",
  blurb,
  features,
  price: 190,
  category: "tools",
  badge,
}));

const bundles: Product[] = [
  {
    id: "bundle-sat-act",
    title: "Pro Bundle: SAT + ACT + Readiness",
    kicker: "Bundle",
    blurb: "Both test pathways plus the exam-day readiness suite, one checkout",
    features: [
      "Full SAT pathway",
      "Full ACT pathway",
      "Exam Day Readiness Suite",
      "Priority support channel",
      "Single checkout",
    ],
    price: 490,
    category: "bundles",
    badge: "Campus pick",
    featured: true,
  },
  {
    id: "bundle-grad",
    title: "Grad Bundle: GRE + GMAT",
    kicker: "Bundle",
    blurb: "Keep both grad-school options open while you decide",
    features: ["GRE Pro pathway", "GMAT Pro pathway", "Shared quant core", "Shortlist planning session"],
    price: 690,
    category: "bundles",
  },
  {
    id: "bundle-olympiad",
    title: "Olympiad Bundle: USACO + AMC",
    kicker: "Bundle",
    blurb: "Informatics and math contest tracks in one season plan",
    features: ["USACO Bronze → Gold", "AMC 10/12 modules", "Weekly mock schedule", "Mentor feedback"],
    price: 390,
    category: "bundles",
  },
];

export const products: Product[] = [
  ...tierProducts,
  ...readiness,
  ...contests,
  ...tools,
  ...bundles,
];

export const services = [
  {
    id: "research",
    title: "Research mentorship",
    blurb: "Flat $800 mentorship — you write the paper, we review structure, method and citations",
    cta: "Open research enquiry",
  },
  {
    id: "internships",
    title: "Internship matching",
    blurb: "Field + state search with weekly stipend estimates, capped at $1,200 base",
    cta: "Open internship form",
  },
];

export interface Review {
  id: string;
  initials: string;
  tag: string;
  body: string;
}

export const reviews: Review[] = [
  { id: "r1", initials: "RL", tag: "SAT", body: "Ignore my earlier review — the dashboard works perfectly now." },
  { id: "r2", initials: "SJ", tag: "Overall", body: "Absolutely phenomenal. The error log alone was worth it." },
  { id: "r3", initials: "IE", tag: "Overall", body: "Support replied in under ten minutes, twice, at midnight." },
  { id: "r4", initials: "XJ", tag: "ACT", body: "Science section pacing finally clicked after the speed labs." },
  { id: "r5", initials: "SY", tag: "SAT", body: "Setup was smooth and the mocks felt like the real thing." },
  { id: "r6", initials: "HJ", tag: "GRE", body: "Vocabulary deck + AWA feedback moved me 6 points." },
  { id: "r7", initials: "MK", tag: "Contests", body: "Went from Bronze to Gold in one season with the mock schedule." },
  { id: "r8", initials: "TA", tag: "Overall", body: "Good structure, honest feedback, no fluff." },
];

export const scoreVouches = [
  { id: "v1", name: "••••••", score: "1580", date: "Jun 6 '26" },
  { id: "v2", name: "L••••", score: "1560", date: "Jun 6 '26" },
  { id: "v3", name: "H••••", score: "1590", date: "Jun 6 '26" },
  { id: "v4", name: "R••", score: "1540", date: "Jun 6 '26" },
];
