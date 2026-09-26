import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import type { ExamFamily, Product } from "../data/catalog";
import { ProductCard, TierCompare } from "./ProductCard";
import { Sticker } from "./primitives";

export function ExamSection({
  family,
  products,
}: {
  family: ExamFamily;
  products: Product[];
}) {
  return (
    <section id={family.id} className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
      <div className="flex flex-wrap items-center gap-4">
        <span className="grid size-14 place-items-center rounded-2xl border-2 border-ink-900 bg-cream-100 shadow-[2px_3px_0_0_var(--color-ink-900)]">
          <BookOpen className="size-6 text-clay-500" />
        </span>
        <div>
          <p className="eyebrow">Exam pathway</p>
          <div className="flex items-center gap-3">
            <h2 className="font-display text-4xl sm:text-5xl">{family.name}</h2>
            {family.live ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-moss-600 px-2.5 py-0.5 font-display text-[0.65rem] font-bold uppercase tracking-[0.14em] text-moss-600">
                <span className="size-1.5 animate-pulse rounded-full bg-moss-600" />
                Live
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-ink-500">{family.subtitle}</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="panel mt-7 p-6 sm:p-9"
      >
        <Sticker>Compare</Sticker>
        <h3 className="mt-5 font-display text-2xl sm:text-3xl">
          Standard · Pro · Premium — what changes
        </h3>
        <p className="mt-2 max-w-2xl text-ink-500">
          Same exam family. Clear upgrades in sandbox, support, and pathway — pick the tier that matches your goal.
        </p>

        <div className="mt-7">
          <TierCompare tiers={family.tiers} />
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
