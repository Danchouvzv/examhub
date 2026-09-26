import { useState, type FormEvent } from "react";
import { ArrowLeft, BookOpen, Send } from "lucide-react";
import { families, products, productHref, routeCategories, type Product } from "../data/catalog";
import { ChatBubble } from "./ChatBubble";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ProductCard } from "./ProductCard";
import { Button, Check, Pill } from "./primitives";

const telegramUrl = "https://t.me/compassat";
const routeLinks = [
  ["SAT tiers", "/category/sat"],
  ["ACT tiers", "/category/act"],
  ["Proctor & lockdown", "/category/proctoring"],
  ["Contests & olympiads", "/category/contests"],
  ["Extra tools", "/category/tools"],
  ["Research papers", "/research"],
  ["Internships", "/internships"],
  ["Blog", "/blog"],
] as const;

const detailCopy: Record<string, string> = {
  "sat-standard": "Compas Sat Standard pairs a modern AI practice engine with a reliable sandbox. Ideal for students who want structured prep, digital exam coverage, and clear progress tracking.",
  "sat-pro": "Compas Sat Pro upgrades isolation, unlocks leak-aware adaptive modules, and guarantees a 1580+ pathway with priority live support.",
  "sat-premium": "Compas Sat Premium is the flagship stack: maximum sandbox security, 1600 every time, 1:1 coaching, unlimited practice, and same-day support.",
  "act-standard": "Compas Sat ACT Standard pairs a modern AI practice engine with a reliable sandbox. Ideal for students who want structured prep, digital exam coverage, and clear progress tracking.",
  "act-pro": "Compas Sat ACT Pro upgrades isolation, unlocks leak-aware adaptive modules, and targets a top score pathway (36) with priority support.",
  "act-premium": "Compas Sat ACT Premium is the flagship stack: maximum sandbox security, guaranteed top-score pathway, 1:1 coaching, unlimited practice, and same-day support.",
  "gre-standard": "Compas Sat GRE Standard pairs a modern AI practice engine with a reliable sandbox. Ideal for students who want structured prep, digital exam coverage, and clear progress tracking.",
  "gre-pro": "Compas Sat GRE Pro upgrades isolation, unlocks leak-aware adaptive modules, and targets a top score pathway (330+) with priority support.",
  "gre-premium": "Compas Sat GRE Premium is the flagship stack: maximum sandbox security, top-score pathway, 1:1 coaching, unlimited practice, and same-day support.",
  "gmat-standard": "Compas Sat GMAT Standard pairs a modern AI practice engine with a reliable sandbox. Ideal for students who want structured prep, digital exam coverage, and clear progress tracking.",
  "gmat-pro": "Compas Sat GMAT Pro upgrades isolation, unlocks leak-aware adaptive modules, and targets a top score pathway (705+) with priority support.",
  "gmat-premium": "Compas Sat GMAT Premium is the flagship stack: maximum sandbox security, top-score pathway, 1:1 coaching, unlimited practice, and same-day support.",
};

const categoryCopy: Record<string, { title: string; description: string }> = {
  sat: { title: "SAT", description: "Standard · Pro · Premium pathways" },
  act: { title: "ACT", description: "Standard · Pro · Premium pathways" },
  gre: { title: "GRE", description: "Standard · Pro · Premium pathways" },
  gmat: { title: "GMAT", description: "Standard · Pro · Premium — Payment Links configurable" },
  proctoring: { title: "Proctor & lockdown", description: "Universal · LockDown · 30+ tools" },
  proctor: { title: "Proctor & lockdown", description: "Universal · LockDown · 30+ tools" },
  contests: { title: "Contests & olympiads", description: "USACO, AMC, AIME, IOI, AP, IB & more" },
  tools: { title: "Extra tools", description: "Setup, dry-runs, essays, TOEFL & more" },
  bundles: { title: "Pro bundle", description: "SAT + ACT + lockdown stack in one checkout" },
};

function RouteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto min-h-[60vh] max-w-6xl px-4 py-10 sm:px-6 sm:py-14">{children}</main>
      <Footer />
      <ChatBubble />
    </div>
  );
}

function PageTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <header className="mb-8 border-b-2 border-ink-900/15 pb-6">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-2 font-display text-4xl sm:text-5xl">{title}</h1>
      {subtitle ? <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink-500">{subtitle}</p> : null}
    </header>
  );
}

function CatalogPage({ categoryId }: { categoryId: string }) {
  const category = routeCategories[categoryId];
  const copy = categoryCopy[categoryId];
  const categoryProducts = products.filter((product) => product.category === category);
  if (!category || !copy) return <NotFound />;

  return (
    <RouteShell>
      <PageTitle eyebrow="Category" title={copy.title} subtitle={copy.description} />
      <p className="mb-5 text-sm font-semibold text-ink-500">{categoryProducts.length} listings</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categoryProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      <AdditionalLinks />
    </RouteShell>
  );
}

function ProductPage({ product }: { product: Product }) {
  const family = families.find((item) => item.id === product.category);
  const related = products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 3);
  const description = detailCopy[product.id] ?? product.blurb;
  const isUniversal = product.id === "proctor-0";

  return (
    <RouteShell>
      <a href="/#catalog" className="focus-ring inline-flex items-center gap-2 text-sm font-bold text-ink-500 hover:text-ink-900">
        <ArrowLeft className="size-4" /> Back to catalog
      </a>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        <article>
          <Pill tone="ghost">{product.kicker}{product.badge ? ` · ${product.badge}` : ""}</Pill>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl">{product.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-500">{description}</p>
          <section className="mt-8">
            <h2 className="font-display text-2xl">What’s included</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {product.features.map((feature) => <Check key={feature}>{feature}</Check>)}
              {family && product.tier === "standard" ? <Check key="email-support">Email support within 24h</Check> : null}
              {family && product.tier === "pro" ? <Check key="simulations">Full-length timed simulations</Check> : null}
              {family && product.tier === "premium" ? <>
                <Check key="sla">Same-day support SLA</Check>
                <Check key="review">Post-exam review + score report kit</Check>
              </> : null}
            </ul>
          </section>
          {isUniversal ? (
            <section className="mt-8">
              <h2 className="font-display text-2xl">Regions covered</h2>
              <p className="mt-3 text-ink-700">United States · United Kingdom · Europe · Canada · Asia-Pacific · Global</p>
            </section>
          ) : null}
          {related.length ? (
            <section className="mt-12">
              <h2 className="font-display text-2xl">Related</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {related.map((item) => <ProductCard key={item.id} product={item} />)}
              </div>
            </section>
          ) : null}
        </article>
        <aside className="panel h-fit p-6 sm:p-7">
          <p className="eyebrow">{family ? "Exam pathway" : product.kicker}</p>
          <p className="mt-2 font-display text-4xl font-extrabold">${product.price}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-500">Questions before checkout? Message us on Telegram @compassat.</p>
          <Button as="a" href={telegramUrl} variant="primary" className="mt-5 w-full">
            <Send className="size-4" /> Order via Telegram
          </Button>
          <p className="mt-4 text-xs leading-relaxed text-ink-500">Payment arrangements are confirmed directly with Compas Sat support.</p>
        </aside>
      </div>
      <AdditionalLinks />
    </RouteShell>
  );
}

const researchAddons = [
  ["Q1 journal target", "Top-quartile indexing aim (Scopus/WoS Q1)"],
  ["Q2 journal target", "Second-quartile indexing aim"],
  ["Q3 journal target", "Solid mid-tier indexing aim"],
  ["Scopus indexing", "Scopus-eligible structure & keywords"],
  ["Web of Science", "WoS-oriented framing & references"],
  ["Extended literature review", "Deep related-work chapter (40+ sources)"],
  ["Methodology design", "Full methods section + instruments"],
  ["Data analysis package", "Stats tables, figures, interpretation"],
  ["Plagiarism report", "Similarity check + rewrite pass"],
  ["7-day rush", "Priority delivery in one week"],
  ["3 revision rounds", "Post-delivery polish cycles"],
  ["Defense presentation", "Slide deck for oral defense"],
  ["APA 7th formatting", "Full APA layout & citations"],
  ["IEEE formatting", "Full IEEE layout & citations"],
];

function ResearchPage() {
  return (
    <RouteShell>
      <PageTitle eyebrow="Research" title="Research paper package" subtitle="Flat $1,040. Pay by arrangement, share your brief, and receive a quote for the selected options." />
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <section>
          <h2 className="font-display text-2xl">Subjects & free options</h2>
          <p className="mt-3 leading-relaxed text-ink-700">Subjects: Computer Science, Business & Economics, Psychology, Biology & Life Sciences, Medicine & Health, Engineering, Education, Law & Legal Studies, Sociology, Political Science, Environmental Science, Mathematics & Statistics…</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {researchAddons.map(([title, description]) => (
              <div key={title} className="card p-4"><h3 className="font-display text-lg">{title}</h3><p className="mt-1 text-sm text-ink-500">{description}</p></div>
            ))}
          </div>
          <div className="mt-10"><h2 className="font-display text-2xl">Already submitted?</h2><a className="mt-3 inline-flex font-semibold text-clay-600" href="/login">Open your orders · Optional login</a></div>
        </section>
        <ServiceOrderCard title="Research · $1,040" text="Flat $1,040. Message us with your subject and options to receive a quote." />
      </div>
      <AdditionalLinks />
    </RouteShell>
  );
}

const internshipOptions = [
  ["Priority fast track", "Jump the queue — first host outreach within 72 hours · Free"],
  ["7-day priority matching", "Expedited host shortlist in one week · Free"],
  ["AI role matching", "AI-optimized host & role matching against your profile · Free"],
  ["Advanced state search", "Deep employer scan focused on your selected US state · Free"],
  ["Remote-friendly placement", "Prioritize remote or hybrid roles · Free"],
  ["Fortune 500 preference", "Target large enterprise hosts · Free"],
  ["Startup track", "High-growth startup hosts · Free"],
  ["Resume + LinkedIn polish", "Professional rewrite package · Free"],
  ["Interview coaching", "2 mock interview sessions · Free"],
  ["CPT/OPT letter support", "Documentation guidance for F-1 students · Free"],
];

function InternshipPage() {
  return (
    <RouteShell>
      <PageTitle eyebrow="Internships" title="Internship matching" subtitle="One price. Pay by arrangement, share your field and state, and we’ll confirm matching options." />
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <section>
          <h2 className="font-display text-2xl">Fields & free add-ons</h2>
          <p className="mt-3 leading-relaxed text-ink-700">Fields: Software Engineering, Data Science & ML, AI Research, Cybersecurity, Product Management, Finance & Investment, Digital Marketing, UI/UX Design, Biotech & Life Sciences, Legal / Law Firm…</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {internshipOptions.map(([title, description]) => (
              <div key={title} className="card p-4"><h3 className="font-display text-lg">{title}</h3><p className="mt-1 text-sm text-ink-500">{description}</p></div>
            ))}
          </div>
        </section>
        <ServiceOrderCard title="Internship · $975 flat" text="One price. Message us with your field, location, and resume to get started." />
      </div>
      <AdditionalLinks />
    </RouteShell>
  );
}

function ServiceOrderCard({ title, text }: { title: string; text: string }) {
  return (
    <aside className="panel h-fit p-6 sm:p-7">
      <p className="eyebrow">Compas Sat services</p>
      <h2 className="mt-2 font-display text-2xl">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-500">{text}</p>
      <Button as="a" href={telegramUrl} className="mt-5 w-full">
        <Send className="size-4" /> Message @compassat
      </Button>
    </aside>
  );
}

function BlogPage() {
  return (
    <RouteShell>
      <PageTitle eyebrow="Resources" title="Compas Sat Blog" subtitle="Guides and updates for exam prep, proctoring tools, and student success." />
      <div className="panel p-8 text-center sm:p-12">
        <BookOpen className="mx-auto size-8 text-clay-500" />
        <p className="mt-4 font-display text-2xl">No posts yet</p>
        <p className="mt-2 text-ink-500">New guides and updates will appear here.</p>
      </div>
      <AdditionalLinks />
    </RouteShell>
  );
}

function LoginPage() {
  const [registering, setRegistering] = useState(false);
  const [message, setMessage] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Account access is not connected yet. Contact support on Telegram @compassat.");
  };

  return (
    <RouteShell>
      <div className="mx-auto max-w-md">
        <div className="panel p-7 sm:p-9">
          <PageTitle eyebrow="Account" title={registering ? "Create an account" : "Sign in with email"} subtitle="Email + password only — no Google" />
          <form onSubmit={submit} className="grid gap-4">
            <label className="grid gap-1.5 text-sm font-semibold">Email<input className="focus-ring rounded-lg border-2 border-ink-900/20 bg-cream-50 px-3 py-2.5" type="email" required autoComplete="email" /></label>
            <label className="grid gap-1.5 text-sm font-semibold">Password<input className="focus-ring rounded-lg border-2 border-ink-900/20 bg-cream-50 px-3 py-2.5" type="password" required autoComplete={registering ? "new-password" : "current-password"} /></label>
            <Button type="submit" className="mt-1 w-full">{registering ? "Create account" : "Sign in"}</Button>
          </form>
          {message ? <p role="status" className="mt-4 text-sm text-ink-500">{message}</p> : null}
          <p className="mt-5 text-center text-sm text-ink-500">{registering ? "Already have an account?" : "New here?"} <button className="font-bold text-clay-600" onClick={() => { setRegistering((value) => !value); setMessage(""); }}>{registering ? "Sign in" : "Create an account"}</button></p>
          <a href="/" className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-ink-500"><ArrowLeft className="size-4" /> Back to home</a>
        </div>
      </div>
    </RouteShell>
  );
}

function AccountUtilityPage({ activation = false }: { activation?: boolean }) {
  const title = activation ? "Activate your order" : "Look up your orders";
  const [message, setMessage] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Order services are not connected yet. Message support on Telegram @compassat.");
  };

  return (
    <RouteShell>
      <div className="mx-auto max-w-lg">
        <div className="panel p-7 sm:p-9">
          <PageTitle eyebrow="Orders" title={title} subtitle={activation ? "Enter the auth code from your order to continue." : "Enter the email used at checkout to find your order."} />
          <form onSubmit={submit} className="grid gap-4">
            {activation ? <label className="grid gap-1.5 text-sm font-semibold">Auth code<input className="focus-ring rounded-lg border-2 border-ink-900/20 bg-cream-50 px-3 py-2.5" required /></label> : null}
            <label className="grid gap-1.5 text-sm font-semibold">Email<input className="focus-ring rounded-lg border-2 border-ink-900/20 bg-cream-50 px-3 py-2.5" type="email" required /></label>
            <Button type="submit" className="w-full">{activation ? "Activate" : "Find my orders"}</Button>
          </form>
          {message ? <p role="status" className="mt-4 text-sm text-ink-500">{message}</p> : null}
          <a href="https://t.me/compassat" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-clay-600"><Send className="size-4" /> Contact support</a>
        </div>
      </div>
    </RouteShell>
  );
}

function SitemapPage() {
  return (
    <RouteShell>
      <PageTitle eyebrow="Explore" title="Sitemap" subtitle="Browse Compas Sat pages and product listings." />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <section><h2 className="font-display text-xl">Categories</h2><ul className="mt-3 grid gap-2">{Object.entries(categoryCopy).map(([key, value]) => <li key={key}><a className="font-semibold text-clay-600" href={`/category/${key === "proctor" ? "proctoring" : key}`}>{value.title}</a></li>)}</ul></section>
        <section><h2 className="font-display text-xl">Resources</h2><ul className="mt-3 grid gap-2">{routeLinks.slice(5).map(([label, href]) => <li key={href}><a className="font-semibold text-clay-600" href={href}>{label}</a></li>)}</ul></section>
        <section><h2 className="font-display text-xl">Account</h2><ul className="mt-3 grid gap-2">{[["Sign in", "/login"], ["Orders", "/orders"], ["Activate", "/activate"]].map(([label, href]) => <li key={href}><a className="font-semibold text-clay-600" href={href}>{label}</a></li>)}</ul></section>
      </div>
      <section className="mt-10"><h2 className="font-display text-xl">Products</h2><div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <a key={product.id} className="text-sm font-semibold text-ink-500 hover:text-clay-600" href={productHref(product)}>{product.title}</a>)}</div></section>
    </RouteShell>
  );
}

function AdditionalLinks() {
  return (
    <nav aria-label="Additional links" className="mt-12 border-t-2 border-ink-900/10 pt-6">
      <p className="eyebrow">Additional links</p>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
        {routeLinks.map(([label, href]) => <a key={href} href={href} className="text-sm font-semibold text-ink-500 hover:text-clay-600">{label}</a>)}
      </div>
    </nav>
  );
}

function NotFound() {
  return (
    <RouteShell>
      <div className="mx-auto max-w-xl py-16 text-center">
        <p className="eyebrow">404</p><h1 className="mt-2 font-display text-4xl">Page not found</h1>
        <p className="mt-3 text-ink-500">That page isn’t in the Compas Sat catalog.</p>
        <Button as="a" href="/" className="mt-6"><ArrowLeft className="size-4" /> Back to home</Button>
      </div>
    </RouteShell>
  );
}

export function RoutePage({ pathname }: { pathname: string }) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "category" && parts[1]) return <CatalogPage categoryId={parts[1]} />;
  if (parts[0] === "products" && parts[1]) {
    const product = products.find((item) => item.slug === parts[1] || item.id === parts[1]);
    return product ? <ProductPage product={product} /> : <NotFound />;
  }
  if (pathname === "/research") return <ResearchPage />;
  if (pathname === "/internships") return <InternshipPage />;
  if (pathname === "/blog") return <BlogPage />;
  if (pathname === "/login") return <LoginPage />;
  if (pathname === "/orders") return <AccountUtilityPage />;
  if (pathname === "/activate") return <AccountUtilityPage activation />;
  if (pathname === "/sitemap") return <SitemapPage />;
  return <NotFound />;
}