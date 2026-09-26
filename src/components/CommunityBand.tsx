import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "./primitives";

export function CommunityBand() {
  return (
    <section id="community" className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[28px] border-2 border-ink-900 bg-sky-600 p-7 text-cream-50 shadow-[4px_5px_0_0_var(--color-ink-900)] sm:p-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-16 size-64 rounded-full bg-cream-50/10"
        />
        <div className="relative flex flex-wrap items-center gap-6">
          <span className="grid size-14 place-items-center rounded-2xl border-2 border-cream-50/40 bg-cream-50/15">
            <Send className="size-6" />
          </span>
          <div className="min-w-[260px] flex-1">
            <p className="font-display text-[0.7rem] font-bold uppercase tracking-[0.18em] text-cream-50/75">
              Community · Support · Updates
            </p>
            <h2 className="mt-1.5 font-display text-3xl sm:text-4xl">Telegram · @compassat</h2>
            <p className="mt-2.5 max-w-xl text-cream-50/85">
              Join for delivery help, score pathways, and proctor tips —
              the same channel linked in the header and footer.
            </p>
          </div>
          <Button as="a" href="#community" variant="outline" size="lg">
            Open Telegram
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
