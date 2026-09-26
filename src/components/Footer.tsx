import { GraduationCap } from "lucide-react";

const columns = [
  {
    title: "Catalog",
    links: ["SAT tiers", "ACT tiers", "GRE tiers", "GMAT tiers", "Exam-day readiness"],
  },
  {
    title: "Explore",
    links: ["Contests & olympiads", "Extra tools", "Bundles"],
  },
  {
    title: "Resources",
    links: ["Research mentorship", "Internships", "Blog", "Sitemap"],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t-2 border-ink-900/15 bg-cream-100/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full border-2 border-ink-900 bg-clay-500 text-cream-50">
              <GraduationCap className="size-4" />
            </span>
            <span className="font-display text-xl font-extrabold">
              Compas<span className="text-clay-500"> Sat</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-ink-500">
            Exam prep pathways for SAT, ACT, GRE and GMAT, contest coaching,
            research mentorship and internship matching — built for students
            worldwide.
          </p>
          <p className="mt-4 text-sm text-ink-500">Support 24/7 · live chat on site</p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <p className="eyebrow">{column.title}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {column.links.map((link) => (
                <li key={link}>
                  <a
                    href="#catalog"
                    className="focus-ring rounded text-[0.95rem] font-semibold text-ink-700 transition-colors hover:text-clay-500"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-dashed border-ink-300/50">
        <p className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-ink-500 sm:px-6">
          © {new Date().getFullYear()} Compas Sat · Built for students worldwide
        </p>
      </div>
    </footer>
  );
}
