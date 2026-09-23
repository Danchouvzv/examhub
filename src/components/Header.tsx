import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, GraduationCap, Menu, Send, X } from "lucide-react";
import { Button } from "./primitives";
import { cn } from "../lib/cn";

const navLinks = [
  { label: "SAT", href: "#sat" },
  { label: "ACT", href: "#act" },
  { label: "GRE", href: "#gre" },
  { label: "GMAT", href: "#gmat" },
  { label: "Readiness", href: "#readiness" },
];

const moreLinks = [
  { label: "Contests & olympiads", href: "#contests" },
  { label: "Extra tools", href: "#tools" },
  { label: "Bundles", href: "#bundles" },
  { label: "Research mentorship", href: "#services" },
  { label: "Internships", href: "#services" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setMobile(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b-2 transition-colors duration-200",
        scrolled
          ? "border-ink-900/15 bg-cream-100/90 backdrop-blur-md"
          : "border-transparent bg-cream-100/70 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="focus-ring flex items-center gap-2.5 rounded-full">
          <span className="grid size-10 place-items-center rounded-full border-2 border-ink-900 bg-clay-500 text-cream-50 shadow-[2px_3px_0_0_var(--color-ink-900)]">
            <GraduationCap className="size-5" />
          </span>
          <span className="font-display text-2xl font-extrabold tracking-tight">
            Exam<span className="text-clay-500">Hub</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="focus-ring rounded-full px-3.5 py-2 font-sans text-[0.98rem] font-semibold text-ink-700 transition-colors hover:bg-cream-300/70 hover:text-ink-900"
            >
              {link.label}
            </a>
          ))}

          <div className="relative" ref={moreRef}>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              className="focus-ring flex items-center gap-1 rounded-full px-3.5 py-2 font-sans text-[0.98rem] font-semibold text-ink-700 transition-colors hover:bg-cream-300/70 hover:text-ink-900"
            >
              More
              <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
            </button>
            <AnimatePresence>
              {open ? (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="absolute right-0 top-[calc(100%+10px)] w-64 overflow-hidden rounded-2xl border-2 border-ink-900 bg-cream-100 p-2 shadow-[4px_5px_0_0_var(--color-ink-900)]"
                >
                  {moreLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="focus-ring block rounded-xl px-3 py-2 text-[0.95rem] font-semibold text-ink-700 transition-colors hover:bg-cream-300/70 hover:text-ink-900"
                    >
                      {link.label}
                    </a>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <Button as="a" href="#community" variant="outline" size="sm" className="hidden sm:inline-flex">
            <Send className="size-4" />
            Telegram
          </Button>
          <Button size="sm" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobile((value) => !value)}
            className="focus-ring grid size-10 place-items-center rounded-full border-2 border-ink-900 bg-cream-100 lg:hidden"
          >
            {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobile ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t-2 border-ink-900/10 bg-cream-100 lg:hidden"
          >
            <div className="mx-auto grid max-w-6xl gap-1 px-4 py-4 sm:px-6">
              {[...navLinks, ...moreLinks].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobile(false)}
                  className="focus-ring rounded-xl px-3 py-2.5 font-semibold text-ink-700 hover:bg-cream-300/70"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 flex gap-2">
                <Button as="a" href="#community" variant="outline" size="sm">
                  <Send className="size-4" /> Telegram
                </Button>
                <Button size="sm">Sign in</Button>
              </div>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
