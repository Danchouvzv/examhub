import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, FileText } from "lucide-react";
import { Button } from "./primitives";

const cards = [
  {
    id: "research",
    icon: FileText,
    title: "Research papers",
    price: "Flat $800 package",
    body: "Free Q1/Q2 and add-ons with Stripe checkout.",
    cta: "Open research quote",
  },
  {
    id: "internships",
    icon: Briefcase,
    title: "Internships",
    price: "Max $1,200 base",
    body: "Field + state search with weekly salary estimate.",
    cta: "Open internship form",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
      <div className="grid gap-5 md:grid-cols-2">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="panel flex flex-col p-7 sm:p-9"
          >
            <span className="grid size-12 place-items-center rounded-2xl border-2 border-ink-900 bg-sun-400">
              <card.icon className="size-5" />
            </span>
            <h2 className="mt-5 font-display text-3xl">{card.title}</h2>
            <p className="mt-1 font-display text-sm font-bold uppercase tracking-[0.14em] text-clay-500">
              {card.price}
            </p>
            <p className="mt-3 flex-1 leading-relaxed text-ink-700">{card.body}</p>
            <Button variant="outline" className="mt-6 self-start">
              {card.cta} <ArrowUpRight className="size-4" />
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
