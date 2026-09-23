import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export function Pill({
  children,
  tone = "sun",
  className,
}: {
  children: ReactNode;
  tone?: "sun" | "clay" | "moss" | "ghost";
  className?: string;
}) {
  const tones = {
    sun: "bg-sun-400 text-ink-900 border-ink-900",
    clay: "bg-clay-500 text-cream-50 border-ink-900",
    moss: "bg-moss-600 text-cream-50 border-ink-900",
    ghost: "bg-cream-300/70 text-ink-700 border-transparent",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border-2 px-3 py-1 font-display text-[0.68rem] font-bold uppercase tracking-[0.12em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Sticker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex -rotate-2 items-center rounded-full border-2 border-ink-900 bg-sun-400 px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.16em] text-ink-900 shadow-[2px_3px_0_0_var(--color-ink-900)]">
      {children}
    </span>
  );
}

export function Check({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-[0.95rem] leading-snug text-ink-700">
      <svg viewBox="0 0 20 20" className="mt-[3px] size-4 shrink-0 text-moss-600" aria-hidden>
        <path
          d="M4 10.5l4 4 8-9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{children}</span>
    </li>
  );
}

export function Button({
  children,
  as = "button",
  href,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: {
  children: ReactNode;
  as?: "button" | "a";
  href?: string;
  variant?: "primary" | "outline" | "soft";
  size?: "sm" | "md" | "lg";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const variants = {
    primary:
      "bg-clay-500 text-cream-50 border-ink-900 hover:bg-clay-600 shadow-[2px_3px_0_0_var(--color-ink-900)]",
    outline:
      "bg-cream-100 text-ink-900 border-ink-900 hover:bg-cream-200 shadow-[2px_3px_0_0_var(--color-ink-900)]",
    soft: "bg-cream-200/80 text-ink-700 border-transparent hover:bg-cream-300",
  } as const;

  const sizes = {
    sm: "px-3.5 py-1.5 text-sm",
    md: "px-5 py-2.5 text-[0.95rem]",
    lg: "px-6 py-3 text-base",
  } as const;

  const classes = cn(
    "focus-ring inline-flex items-center justify-center gap-2 rounded-full border-2 font-display font-bold transition-[transform,background-color] duration-150 active:translate-y-[2px] active:shadow-none",
    variants[variant],
    sizes[size],
    className,
  );

  if (as === "a") {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  id,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div
      id={id}
      className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b-2 border-dashed border-ink-300/60 pb-5"
    >
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-1 font-display text-3xl sm:text-4xl">{title}</h2>
        {subtitle ? <p className="mt-2 max-w-2xl text-ink-500">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}
