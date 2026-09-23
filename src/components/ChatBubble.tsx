import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { Button } from "./primitives";

export function ChatBubble() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="w-[min(20rem,calc(100vw-3rem))] rounded-2xl border-2 border-ink-900 bg-cream-100 p-5 shadow-[4px_5px_0_0_var(--color-ink-900)]"
          >
            <p className="font-display text-lg">Questions before checkout?</p>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-500">
              Average reply time is under 10 minutes, 24/7. Tell us your test
              date and target score and we will suggest a tier.
            </p>
            <Button size="sm" className="mt-4 w-full">
              Start a chat
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((value) => !value)}
        className="focus-ring grid size-14 place-items-center rounded-full border-2 border-ink-900 bg-clay-500 text-cream-50 shadow-[3px_4px_0_0_var(--color-ink-900)] transition-transform hover:scale-105 active:translate-y-[2px] active:shadow-none"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </div>
  );
}
