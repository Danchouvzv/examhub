export type Category =
  | "sat"
  | "act"
  | "gmat"
  | "gre"
  | "proctor"
  | "contests"
  | "tools"
  | "bundles";

export type Tier = "standard" | "pro" | "premium";

export interface Product {
  id: string;
  slug?: string;
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
  { id: "proctor", label: "Proctor & lockdown", icon: "shield" },
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
  standard: { name: "Standard", tagline: "Solid sandbox + coverage" },
  pro: { name: "Pro", tagline: "Pathway guarantee + priority" },
  premium: { name: "Premium", tagline: "Top guarantee + coaching" },
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
    subtitle: "Standard · Pro · Premium — macOS & Windows software delivery",
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
      ["premium", 990, "1600 every time", [
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
    subtitle: "Standard · Pro · Premium — distinct ACT builds per OS",
    tiers: buildTiers([
      ["standard", 247, undefined, [
        "AI-assisted ACT practice",
        "Normal sandbox environment",
        "English, Math, Reading, Science modules",
        "Composite score tracking",
      ]],
      ["pro", 585, "Most popular", [
        "Guaranteed 36 ACT pathway",
        "Enhanced sandbox isolation",
        "Leak-aware adaptive modules",
        "Priority live support",
      ]],
      ["premium", 1157, "Best results", [
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
    subtitle: "Standard · Pro · Premium — Payment Links via admin when ready",
    tiers: buildTiers([
      ["standard", 247, undefined, [
        "AI-assisted GRE General practice",
        "Normal sandbox environment",
        "Quant · Verbal · AWA coverage",
        "Score tracking dashboard",
      ]],
      ["pro", 585, "Most popular", [
        "High-score GRE pathway",
        "Enhanced sandbox isolation",
        "Adaptive Quant/Verbal modules",
        "Priority live support",
      ]],
      ["premium", 1157, "Best results", [
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
    subtitle: "Standard · Pro · Premium — Payment Links via admin when ready",
    tiers: buildTiers([
      ["standard", 247, undefined, [
        "AI-assisted GMAT Focus practice",
        "Normal sandbox environment",
        "Quant · Verbal · Data Insights",
        "Score tracking dashboard",
      ]],
      ["pro", 585, "Most popular", [
        "High-score GMAT Focus pathway",
        "Enhanced sandbox isolation",
        "Adaptive Data Insights modules",
        "Priority live support",
      ]],
      ["premium", 1157, "Best results", [
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
    slug: `${family.id}-${tier.tier}`,
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

const proctorRows: [string, string, string[], string?][] = [
  ["Universal Proctor Bypass", "One stack for every major proctor & lockdown tool", ["Works across 30+ proctor & lockdown platforms", "US · UK · Europe · APAC coverage", "Single $247 checkout", "Priority 24/7 support channel", "Pre-exam dry-run included", "Sandbox isolation guidance pack", "Same-day handoff window"], "Campus pick"],
  ["Respondus LockDown Browser", "LockDown Browser exam support package", ["LockDown Browser environment support", "Pre-exam compatibility checklist", "US & international campus coverage", "Secure handoff workflow", "24h support"], "Most requested"],
  ["Honorlock", "Honorlock proctored exam support", ["Honorlock browser + room scan prep", "Identity verification walkthrough", "US & UK institutions"]],
  ["Proctorio", "Proctorio Chrome extension exam support", ["Chrome extension support", "Canvas / Blackboard / Moodle", "Camera & mic pre-check"]],
  ["ProctorU / Meazure Learning", "ProctorU live & auto proctoring support", ["Live & automated flows", "Appointment scheduling guidance", "Workspace compliance checklist"]],
  ["Examity", "Examity proctored assessment support", ["Session prep", "Tech checklist", "US higher-ed focus"]],
  ["Proctortrack", "Proctortrack AI proctoring support", ["AI proctoring prep", "Identity & room scan", "US + international"]],
  ["Respondus Monitor", "Respondus Monitor webcam proctoring support", ["Webcam session prep", "Pairs with LockDown Browser", "US campus coverage"]],
  ["Examplify / ExamSoft", "ExamSoft Examplify secure exam support", ["Examplify setup guide", "Law & medical programs", "US & UK coverage"]],
  ["Talview", "Talview remote proctoring (EU & global)", ["EU-friendly prep", "Academic + hiring", "Europe + global"]],
  ["Inspera Assessment", "Inspera Assessment support (UK & Nordics)", ["Inspera platform prep", "UK & Nordic universities", "Secure browser guidance"]],
  ["PSI Bridge / Remote Proctor", "PSI Bridge remote proctoring support", ["Professional cert prep", "US & EU windows", "ID verification guidance"]],
  ["Pearson VUE OnVUE", "Pearson VUE OnVUE online proctoring support", ["OnVUE system check", "Professional cert focus", "Global windows"]],
  ["RPNow / Kryterion", "RPNow Kryterion online proctoring support", ["RPNow session prep", "Cert & academic exams", "US & global"]],
  ["SMOWL", "SMOWL proctoring support (Spain & Europe)", ["SMOWL EU prep", "Spanish & EU online unis", "GDPR-aware notes"]],
  ["ProctorExam", "ProctorExam support (Netherlands & EU)", ["EU invigilation prep", "Dutch & EU universities", "Multi-camera guidance"]],
  ["TestReach", "TestReach proctoring (UK & Ireland)", ["UK & Ireland focus", "Professional body exams", "Remote invigilation prep"]],
  ["Safe Exam Browser (SEB)", "Safe Exam Browser lockdown support", ["SEB config support", "Moodle / ILIAS / Canvas", "Europe & APAC focus"], "EU lockdown"],
  ["Questionmark Secure", "Questionmark Secure browser support", ["Secure browser prep", "Enterprise + higher-ed", "US & UK"]],
  ["LockDown Browser + Monitor Bundle", "Respondus LockDown + Monitor combo support", ["LockDown + Monitor together", "Room scan + browser lock", "US campus standard"], "Combo"],
  ["Canvas Quizzes Lockdown", "Canvas LMS lockdown quiz support", ["Canvas New Quizzes", "Lockdown integrations", "US & global campuses"]],
  ["Blackboard SafeAssign + Proctor", "Blackboard proctored assessment support", ["Blackboard Learn prep", "Proctor integrations", "US higher-ed"]],
  ["Moodle Safe Exam / Proctoring", "Moodle SEB & proctor plugins support", ["Moodle quiz prep", "SEB + plugins", "EU universities heavy"]],
  ["Zoom Proctoring / Live Invigilation", "Live Zoom invigilation support package", ["Live Zoom session prep", "Multi-camera guidance", "Global coverage"]],
  ["Microsoft Teams Proctored Exams", "Teams-based live proctoring support", ["Teams session setup", "Corporate + academic", "US & EU"]],
  ["Mercer Mettl", "Mercer Mettl proctoring support", ["Mettl AI proctoring prep", "Hiring + academic", "IN / ME / global"]],
  ["HirePro / Wheebox", "HirePro & Wheebox exam support", ["Campus hiring exams", "India-focused platforms", "Secure handoff"]],
  ["ATLAS / Wise Proctor", "Wise Proctor & ATLAS support", ["Wise Proctor prep", "Online college focus", "US coverage"]],
  ["Integrity Advocate", "Integrity Advocate proctoring support", ["Identity verification", "Canada + international", "LMS plugins"]],
  ["ProctorFree", "ProctorFree automated proctoring support", ["Automated proctoring prep", "Community college focus", "US coverage"]],
  ["SmarterProctoring", "SmarterProctoring support package", ["Live + automated options", "Flexible scheduling", "US higher-ed"]],
  ["Tegrity / YuJa Proctor", "YuJa / Tegrity proctoring support", ["YuJa proctor modules", "Campus LMS links", "US & Canada"]],
  ["Exam.net", "Exam.net digital exam support (Nordics)", ["Exam.net platform prep", "Nordic schools & unis", "Secure handoff"]],
  ["Wiseflow / UNIwise", "Wiseflow digital assessment support", ["Wiseflow prep", "Danish & EU unis", "Secure handoff"]],
  ["Digiexam", "Digiexam lockdown client support", ["Digiexam client prep", "EU secondary + HE", "Secure handoff"]],
  ["Turnitin + Proctor Combo", "Turnitin integrity + proctor combo support", ["Turnitin integrity notes", "Pairs with major proctors", "Global campuses"]],
];

const proctor: Product[] = proctorRows.map(([title, blurb, features, badge], i) => ({
  id: `proctor-${i}`,
  slug: `proctor-${slugify(title)}`,
  title,
  kicker: "Proctor tool",
  blurb,
  features,
  price: 247,
  category: "proctor",
  badge,
  featured: i === 0,
}));

const contestNames: [string, string, string[], string?][] = [
  ["USACO Bronze", "USACO Bronze division contest support", ["Bronze syllabus coverage", "Timed mock contests", "Problem walkthroughs", "Contest-day support window"], "USACO"],
  ["USACO Silver", "USACO Silver division contest support", ["Silver topics pack", "Graph & DP intros", "Timed mocks"]],
  ["USACO Gold", "Advanced USACO Gold division contest support", ["Gold algorithms", "Hard mock sets", "Editorial-style review", "Priority contest support"], "Advanced"],
  ["USACO Platinum", "USACO Platinum division contest support", ["Platinum problem bank", "Elite coaching notes", "Full contest sims"], "Elite"],
  ["AMC 8 / 10 / 12", "AMC math contest prep package", ["AMC 8/10/12 modules", "Timed practice tests", "Topic drills"]],
  ["AIME", "AIME contest prep package", ["AIME problem bank", "Proof-style solutions", "Timed sections"]],
  ["USAJMO / USAMO", "USAJMO & USAMO olympiad support", ["Proof writing labs", "Past paper packs", "Mentor feedback cycles"], "Olympiad"],
  ["IMO Training Track", "International Math Olympiad training track", ["IMO shortlist practice", "Topic camps (geo, NT, combo, algebra)", "Mock IMOs"]],
  ["IOI Training Track", "International Olympiad in Informatics track", ["IOI syllabus map", "Contest sims", "Code review cycles"]],
  ["Codeforces / AtCoder Coaching", "CF & AtCoder rated contest coaching", ["Rating roadmap", "Virtual contests", "Editorial review"]],
  ["LeetCode Contest Pack", "LeetCode weekly & biweekly contest pack", ["Weekly contest drills", "Pattern sheets", "Timed mocks"]],
  ["ACS / ACSL", "ACSL computer science contest support", ["ACSL topics", "Past contests", "Team & individual modes"]],
  ["F=ma / USAPhO", "Physics olympiad F=ma & USAPhO support", ["F=ma drills", "USAPhO free response", "Labs theory pack"]],
  ["USABO", "USA Biology Olympiad support", ["Open exam drills", "Semifinal free response", "Bio topic maps"]],
  ["USNCO", "US National Chemistry Olympiad support", ["Local exam pack", "National free response", "Lab theory"]],
  ["Science Bowl / Quiz Bowl", "Science Bowl & Quiz Bowl team pack", ["Toss-up drills", "Team strategy", "Category banks"]],
  ["Regents Exams (NY)", "NY Regents exam support pack", ["Core Regents subjects", "Past papers", "Scoring guides"]],
  ["AP Exams Bundle Support", "AP exam support (multi-subject)", ["AP subject modules", "FRQ practice", "MCQ drills"]],
  ["IB Exams Support", "International Baccalaureate exam support", ["HL/SL paper practice", "IA guidance notes", "Markscheme review"]],
  ["A-Levels Support", "UK A-Level exam support package", ["Board-specific packs", "Past papers", "Mark schemes"]],
  ["GCSE Support", "UK GCSE exam support package", ["Core GCSE subjects", "Past papers", "Grade 9 pathways"]],
  ["GRE Prep Pathway", "GRE general test prep pathway", ["Quant + Verbal modules", "AWA templates", "Full mocks"]],
  ["GMAT Focus Prep", "GMAT Focus Edition prep pathway", ["Focus Edition syllabus", "Adaptive mocks", "Data Insights drills"]],
  ["LSAT Prep Pathway", "LSAT prep pathway", ["LR / LG / RC packs", "Timed sections", "PT reviews"]],
  ["MCAT Prep Pathway", "MCAT prep pathway", ["Content review map", "CARS drills", "Full-length mocks"]],
];

const contests: Product[] = contestNames.map(([title, blurb, features, badge], i) => ({
  id: `contest-${i}`,
  slug: `contest-${slugify(title)}`,
  title,
  kicker: "Contests",
  blurb,
  features,
  price: 247,
  category: "contests",
  badge,
}));

const toolNames: [string, string, string[], string?][] = [
  ["Digital SAT Device Setup", "Device & browser setup for digital SAT", ["Bluebook app setup", "Device compliance", "Network checklist", "Day-of runbook"]],
  ["ACT Online Testing Setup", "ACT online testing environment setup", ["Online ACT checklist", "Browser readiness", "Account verification"]],
  ["Calculator & Formula Pack", "Exam calculator policies & formula sheets", ["Calculator policy guide", "Formula sheets", "Subject packs"]],
  ["Score Verification Assist", "Score report verification assistance", ["Score report walkthrough", "Superscore guidance", "College send checklist"]],
  ["College Board Account Recovery", "College Board account recovery help", ["Account recovery steps", "Score linking", "Security checklist"]],
  ["Proctor Dry-Run Session", "30-min proctor environment dry-run", ["30-min live dry-run", "Environment fixes", "Device audit", "Written report"], "Popular"],
  ["Exam Day Concierge", "Exam-day live concierge support", ["Live chat during window", "Escalation path", "Timezone coverage"]],
  ["Accommodations Filing Help", "SSD / exam accommodations filing help", ["SSD paperwork checklist", "Timeline planner", "Document packaging"]],
  ["TOEFL iBT Support", "TOEFL iBT test support package", ["4-skill modules", "Speaking practice", "Home edition notes"]],
  ["IELTS Support", "IELTS Academic & General support", ["Band target plan", "Writing task labs", "Speaking mocks"]],
  ["Duolingo English Test Support", "DET support package", ["Adaptive practice", "Score estimator", "Device checklist"]],
  ["Plagiarism Check Pass", "Similarity check + rewrite notes", ["Similarity report", "Rewrite guidance", "Citation tips"]],
  ["Citation & Formatting Pass", "APA / MLA / IEEE formatting pass", ["APA 7 / MLA / IEEE", "Reference cleanup", "Layout polish"]],
  ["Statement of Purpose Review", "SOP / personal statement review", ["Full SOP review", "Structure rewrite notes", "2 revision rounds"]],
  ["Resume + LinkedIn Student Pack", "Student resume & LinkedIn polish", ["1-page resume", "LinkedIn rewrite", "ATS keywords"]],
];

const tools: Product[] = toolNames.map(([title, blurb, features, badge], i) => ({
  id: `tool-${i}`,
  slug: `tool-${slugify(title)}`,
  title,
  kicker: "Tools",
  blurb,
  features,
  price: 247,
  category: "tools",
  badge,
}));

const bundles: Product[] = [
  {
    id: "bundle-pro-sat-act-lockdown",
    slug: "bundle-pro-sat-act-lockdown",
    title: "Pro Bundle: SAT + ACT + LockDown",
    kicker: "Bundle",
    blurb: "SAT + ACT + LockDown pathway — Standard Stripe checkout",
    features: [
      "SAT pathway support",
      "ACT pathway support",
      "Respondus LockDown Browser support",
      "Priority support channel",
      "Single Stripe checkout",
    ],
    price: 247,
    category: "bundles",
    badge: "Campus pick",
    featured: true,
  },
];

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function productHref(product: Product) {
  return `/products/${product.slug ?? product.id}`;
}

export const routeCategories: Record<string, Category> = {
  sat: "sat",
  act: "act",
  gre: "gre",
  gmat: "gmat",
  proctoring: "proctor",
  proctor: "proctor",
  contests: "contests",
  tools: "tools",
  bundles: "bundles",
};

export const products: Product[] = [
  ...tierProducts,
  ...proctor,
  ...contests,
  ...tools,
  ...bundles,
];

export const services = [
  {
    id: "research",
    title: "Research papers",
    price: 1040,
    blurb: "Flat $1,040 package · free Q1/Q2 & add-ons · checkout by arrangement",
    cta: "Open research quote",
  },
  {
    id: "internship",
    title: "Internship matching",
    price: 975,
    blurb: "Field + state search with weekly salary estimate",
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
  { id: "r1", initials: "RL", tag: "SAT", body: "disregard my earlier review. this works perfectly" },
  { id: "r2", initials: "SJ", tag: "Overall", body: "absolutely phenomenal" },
  { id: "r3", initials: "IE", tag: "Overall", body: "nice" },
  { id: "r4", initials: "SX", tag: "Overall", body: "nice" },
  { id: "r5", initials: "SY", tag: "SAT", body: "Vouch, setup was good :)" },
];

export const scoreVouches = [
  { id: "v1", name: "••••••", score: "1600", date: "Jun 6 ’26" },
  { id: "v2", name: "L••••", score: "1600", date: "Jun 6 ’26" },
  { id: "v3", name: "H••••", score: "1600", date: "Jun 6 ’26" },
  { id: "v4", name: "R••", score: "1600", date: "Jun 6 ’26" },
];
