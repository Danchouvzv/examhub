const jumps = [
  { label: "SAT", href: "#sat" },
  { label: "ACT", href: "#act" },
  { label: "GRE", href: "#gre" },
  { label: "GMAT", href: "#gmat" },
  { label: "Readiness", href: "#readiness" },
  { label: "Contests", href: "#contests" },
];

export function JumpTo() {
  return (
    <nav
      aria-label="Jump to section"
      className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center gap-2.5 px-4 sm:px-6"
    >
      <span className="eyebrow mr-1">Jump to</span>
      {jumps.map((jump) => (
        <a
          key={jump.label}
          href={jump.href}
          className="focus-ring rounded-full border-2 border-ink-900/20 bg-cream-100/80 px-3.5 py-1.5 text-sm font-semibold text-ink-700 transition-colors hover:border-ink-900 hover:bg-cream-100"
        >
          {jump.label}
        </a>
      ))}
    </nav>
  );
}
