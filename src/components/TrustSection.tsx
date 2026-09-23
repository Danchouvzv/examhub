import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bitcoin, CreditCard, ShieldCheck, Star, Wallet } from "lucide-react";
import { reviews, scoreVouches } from "../data/catalog";
import { Button, Pill } from "./primitives";

const rating = 4.4;
const ratingCount = 763;

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of 5`}>
      {[0, 1, 2, 3, 4].map((index) => (
        <Star
          key={index}
          className="size-4"
          fill={index < Math.round(value) ? "var(--color-sun-500)" : "none"}
          stroke="var(--color-sun-500)"
        />
      ))}
    </div>
  );
}

const trustTiles = [
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    body: "Card, Apple Pay and bank transfer via a PCI-compliant processor",
  },
  {
    icon: CreditCard,
    title: "Flexible plans",
    body: "Pay once or split across three months at no extra cost",
  },
  {
    icon: Wallet,
    title: "Refund window",
    body: "Full refund within 14 days if you have not started the course",
  },
  {
    icon: Bitcoin,
    title: "Student pricing",
    body: "Need-based discounts for verified school email addresses",
  },
];

export function TrustSection() {
  const [showReviews, setShowReviews] = useState(true);
  const [showPhotos, setShowPhotos] = useState(true);

  return (
    <section id="trust" className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
      <div className="panel p-6 sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid place-items-center rounded-2xl border-2 border-ink-900 bg-cream-50 px-4 py-2.5 shadow-[2px_3px_0_0_var(--color-ink-900)]">
              <span className="font-display text-3xl font-extrabold">{rating}</span>
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink-500">
                avg
              </span>
            </div>
            <div>
              <Pill tone="ghost">Verified</Pill>
              <p className="mt-2 font-display text-2xl">Community trust</p>
              <div className="mt-1 flex items-center gap-2 text-sm text-ink-500">
                <Stars value={rating} />
                <span>{ratingCount} student ratings</span>
              </div>
            </div>
          </div>
          <Button variant="soft" size="sm" onClick={() => setShowReviews((value) => !value)}>
            {showReviews ? "Hide reviews" : "Show reviews"}
          </Button>
        </div>

        <AnimatePresence initial={false}>
          {showReviews ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="mt-7 rounded-2xl border-2 border-dashed border-ink-300/60 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl">Score milestones shared by students</h3>
                    <p className="mt-1 text-sm text-ink-500">
                      Names hidden · shared with permission
                    </p>
                  </div>
                  <Button variant="soft" size="sm" onClick={() => setShowPhotos((value) => !value)}>
                    {showPhotos ? "Hide score cards" : "Show score cards"}
                  </Button>
                </div>

                {showPhotos ? (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {scoreVouches.map((vouch) => (
                      <motion.div
                        key={vouch.id}
                        whileHover={{ y: -3, rotate: -0.6 }}
                        className="card p-4"
                      >
                        <div className="flex items-center justify-between text-sm text-ink-500">
                          <span className="font-semibold">{vouch.name}</span>
                          <span>{vouch.date}</span>
                        </div>
                        <p className="mt-3 font-display text-4xl font-extrabold">{vouch.score}</p>
                        <p className="mt-1 text-sm text-ink-500">Digital SAT · June 2026</p>
                        <span className="mt-3 inline-block rounded-full bg-moss-600/10 px-2.5 py-1 text-xs font-bold text-moss-600">
                          Verified
                        </span>
                      </motion.div>
                    ))}
                  </div>
                ) : null}
              </div>

              <h3 className="mt-8 font-display text-xl">Latest student reviews</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {reviews.map((review) => (
                  <div key={review.id} className="card p-5">
                    <div className="flex items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-full border-2 border-ink-900 bg-cream-300 font-display text-sm font-bold">
                        {review.initials}
                      </span>
                      <span className="text-sm font-semibold text-ink-500">{review.tag}</span>
                    </div>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-700">
                      {review.body}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustTiles.map((tile) => (
            <div key={tile.title} className="card p-5">
              <tile.icon className="size-5 text-clay-500" />
              <p className="mt-3 font-display text-lg">{tile.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{tile.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
