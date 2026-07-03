import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus } from "lucide-react";

import { Eyebrow } from "@/components/common/Eyebrow";
import { Reveal } from "@/components/common/Reveal";
import { FAQ_ITEMS } from "@/constants/faq";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <Eyebrow index={7} label="FAQ" />
          <h2 className="mt-4 font-display text-4xl font-light md:text-6xl">
            Perguntas <span className="italic text-silver">frequentes.</span>
          </h2>
        </Reveal>

        <div className="mt-16 divide-y divide-white/5 border-y border-white/5">
          {FAQ_ITEMS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`${baseId}-panel-${i}`}
                className="group flex w-full items-center justify-between gap-6 py-7 text-left"
              >
                <span className="font-display text-lg font-light md:text-2xl transition-colors group-hover:text-silver">
                  {f.q}
                </span>
                <div className="relative h-8 w-8 shrink-0 grid place-items-center rounded-full glass">
                  <AnimatePresence mode="wait">
                    {open === i ? (
                      <motion.div
                        key="m"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                      >
                        <Minus className="h-4 w-4" strokeWidth={1.5} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="p"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                      >
                        <Plus className="h-4 w-4" strokeWidth={1.5} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    id={`${baseId}-panel-${i}`}
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-9 pr-16 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
