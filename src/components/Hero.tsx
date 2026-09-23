import { motion } from "framer-motion";
import {
  Box,
  BookOpen,
  Briefcase,
  FileText,
  GraduationCap,
  Search,
  Shield,
  Sparkles,
  Trophy,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { categories, type Category } from "../data/catalog";
import { Button, Sticker } from "./primitives";
import { cn } from "../lib/cn";

const icons: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  cap: GraduationCap,
  book: BookOpen,
  shield: Shield,
  trophy: Trophy,
  wrench: Wrench,
  box: Box,
};

interface HeroProps {
  query: string;
  onQuery: (value: string) => void;
  active: Category | "all";
  onCategory: (value: Category | "all") => void;
}

export function Hero({ query, onQuery, active, onCategory }: HeroProps) {
  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="panel relative overflow-hidden px-6 py-10 sm:px-12 sm:py-14"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(246,211,74,0.35),transparent_45%)]"
        />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-3">
            <Sticker>Campus HQ</Sticker>
            <span className="rounded-full bg-cream-300/70 px-3.5 py-1.5 text-sm font-semibold text-ink-500">
              US · UK · Europe · Global
            </span>
          </div>

          <h1 className="mt-7 max-w-3xl font-display text-[2.6rem] leading-[1.06] sm:text-6xl">
            Exam prep that actually{" "}
            <span className="text-clay-500">feels premium</span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-700">
            SAT &amp; ACT pathways, grad-school tracks, exam-day readiness checks,
            USACO &amp; olympiad coaching, plus research mentorship and internship matching.
          </p>

          <label className="group mt-8 flex max-w-2xl items-center gap-3 rounded-full border-2 border-ink-900 bg-cream-50 px-5 py-3.5 shadow-[3px_4px_0_0_var(--color-ink-900)] transition-shadow focus-within:shadow-[5px_6px_0_0_var(--color-ink-900)]">
            <Search className="size-5 shrink-0 text-ink-300" />
            <input
              value={query}
              onChange={(event) => onQuery(event.target.value)}
              placeholder="Search SAT, readiness, USACO, IELTS…"
              className="w-full bg-transparent text-[1.05rem] outline-none placeholder:text-ink-300"
              aria-label="Search the catalog"
            />
            {query ? (
              <button
                type="button"
                onClick={() => onQuery("")}
                className="focus-ring rounded-full px-2 py-1 text-sm font-bold text-ink-500 hover:text-ink-900"
              >
                Clear
              </button>
            ) : null}
          </label>

          <p className="eyebrow mt-8">Categories</p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {categories.map((category) => {
              const Icon = icons[category.icon] ?? Sparkles;
              const isActive = active === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onCategory(category.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "focus-ring inline-flex items-center gap-2 rounded-full border-2 px-4 py-2.5 font-sans text-[0.95rem] font-semibold transition-all duration-150 active:translate-y-[1px]",
                    isActive
                      ? "border-ink-900 bg-clay-500 text-cream-50 shadow-[2px_3px_0_0_var(--color-ink-900)]"
                      : "border-ink-900/25 bg-cream-50/70 text-ink-700 hover:border-ink-900 hover:bg-cream-50",
                  )}
                >
                  <Icon className="size-4" />
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className="mt-8 border-t-2 border-dashed border-ink-300/50 pt-6">
            <p className="eyebrow">Services</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a
                href="#services"
                className="focus-ring inline-flex items-center gap-2 rounded-full border-2 border-ink-900/25 bg-cream-50/70 px-4 py-2.5 font-semibold transition-colors hover:border-ink-900 hover:bg-cream-50"
              >
                <FileText className="size-4 text-clay-500" /> Research mentorship
              </a>
              <a
                href="#services"
                className="focus-ring inline-flex items-center gap-2 rounded-full border-2 border-ink-900/25 bg-cream-50/70 px-4 py-2.5 font-semibold transition-colors hover:border-ink-900 hover:bg-cream-50"
              >
                <Briefcase className="size-4 text-clay-500" /> Internships
              </a>
            </div>
            <Button as="a" href="#catalog" variant="outline" className="mt-6">
              Browse all products
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
