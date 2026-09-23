import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Product } from "../data/catalog";
import { Button, Check, Pill } from "./primitives";
import { cn } from "../lib/cn";

const tierTone = {
  standard: "bg-cream-300 text-ink-900",
  pro: "bg-clay-500 text-cream-50",
  premium: "bg-moss-600 text-cream-50",
} as const;

export function ProductCard({
  product,
  featured = false,
}: {
  product: Product;
  featured?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={cn(
        "card flex flex-col p-6 transition-shadow hover:shadow-[5px_6px_0_0_var(--color-ink-900)]",
        featured && "sm:p-8",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow">{product.kicker}</span>
          {product.tier ? (
            <span
              className={cn(
                "rounded-full border-2 border-ink-900 px-2.5 py-0.5 font-display text-[0.65rem] font-bold uppercase tracking-[0.12em]",
                tierTone[product.tier],
              )}
            >
              {product.tier}
            </span>
          ) : null}
        </div>
        {product.badge ? (
          <span className="rounded-full bg-sun-400/45 px-3 py-1 text-xs font-semibold text-ink-700">
            {product.badge}
          </span>
        ) : null}
      </div>

      <h3
        className={cn(
          "mt-3 font-display text-xl leading-tight",
          featured && "text-3xl",
        )}
      >
        {product.title}
      </h3>
      <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-500">{product.blurb}</p>

      <ul className="mt-5 flex flex-1 flex-col gap-2.5">
        {product.features.map((feature) => (
          <Check key={feature}>{feature}</Check>
        ))}
      </ul>

      <div className="mt-7 flex items-end justify-between gap-4 border-t-2 border-dashed border-ink-300/50 pt-5">
        <div>
          <p className="text-sm text-ink-500">From</p>
          <p className="font-display text-3xl font-extrabold">${product.price}</p>
        </div>
        <Button size="sm">
          View <ArrowRight className="size-4" />
        </Button>
      </div>
    </motion.article>
  );
}

export function TierCompare({
  tiers,
}: {
  tiers: {
    tier: "standard" | "pro" | "premium";
    name: string;
    tagline: string;
    price: number;
    badge?: string;
    features: string[];
  }[];
}) {
  const accents = {
    standard: "before:bg-ink-900",
    pro: "before:bg-clay-500",
    premium: "before:bg-moss-600",
  } as const;

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {tiers.map((tier) => (
        <div
          key={tier.tier}
          className={cn(
            "card relative overflow-hidden p-6 pt-7 before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:content-['']",
            accents[tier.tier],
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <h4 className="font-display text-lg">{tier.name}</h4>
            {tier.badge ? <Pill>{tier.badge}</Pill> : null}
          </div>
          <p className="mt-2 font-display text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-500">
            {tier.tagline}
          </p>
          <p className="mt-3 font-display text-4xl font-extrabold">${tier.price}</p>
          <ul className="mt-5 flex flex-col gap-2.5">
            {tier.features.map((feature) => (
              <Check key={feature}>{feature}</Check>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
