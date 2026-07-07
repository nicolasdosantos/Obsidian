import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const DISPLAY_MS = 3200;
const EXIT_DURATION = 1;
const EASE = [0.16, 1, 0.3, 1] as const;

export function Preloader() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (prefersReducedMotion) return;

    setVisible(true);
    const timer = setTimeout(() => setVisible(false), DISPLAY_MS);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
          transition={{ duration: EXIT_DURATION, ease: EASE }}
          className="fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-background"
        >
          {/* ambient backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--electric)]/10 blur-[120px]" />
            <div className="absolute inset-0 grid-lines opacity-[0.15]" />
          </motion.div>

          {/* rotating light beams */}
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 0.9, rotate: 360 }}
            transition={{
              opacity: { duration: 0.8, ease: EASE },
              rotate: { duration: 7, ease: "linear", repeat: Infinity },
            }}
            className="pointer-events-none absolute h-44 w-44 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, oklch(0.72 0.17 245 / 0.9) 12%, transparent 28%, transparent 72%, oklch(0.82 0.11 85 / 0.8) 88%, transparent 100%)",
              WebkitMask:
                "radial-gradient(closest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
              mask: "radial-gradient(closest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
              filter: "drop-shadow(0 0 10px oklch(0.72 0.17 245 / 0.5))",
            }}
          />
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 0.6, rotate: -360 }}
            transition={{
              opacity: { duration: 0.8, delay: 0.1, ease: EASE },
              rotate: { duration: 10, ease: "linear", repeat: Infinity },
            }}
            className="pointer-events-none absolute h-64 w-64 rounded-full"
            style={{
              background:
                "conic-gradient(from 90deg, transparent 0%, oklch(0.82 0.11 85 / 0.6) 8%, transparent 22%, transparent 78%, oklch(0.72 0.17 245 / 0.6) 92%, transparent 100%)",
              WebkitMask:
                "radial-gradient(closest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
              mask: "radial-gradient(closest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
            }}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative flex flex-col items-center"
          >
            <div className="relative h-12 w-12">
              <motion.img
                src="/logo.svg"
                alt="Obsidian"
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: [0, 1.15, 1], rotate: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                className="absolute inset-0 h-full w-full drop-shadow-[0_0_40px_oklch(1_0_0/0.25)]"
              />
              <motion.div
                initial={{ opacity: 0.6, scale: 1 }}
                animate={{ opacity: 0, scale: 1.9 }}
                transition={{
                  duration: 1.6,
                  delay: 0.5,
                  repeat: Infinity,
                  repeatDelay: 0.4,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-md border border-white/30"
                style={{ rotate: "45deg" }}
              />
            </div>

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
              className="mt-5 font-display text-lg font-semibold tracking-[0.35em]"
            >
              OBSIDIAN
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: EASE }}
              className="mt-2 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground"
            >
              Estética automotiva de alta performance
            </motion.span>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="mt-7 h-px w-40 overflow-hidden rounded-full bg-white/10"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{
                  duration: (DISPLAY_MS - 800) / 1000,
                  delay: 0.8,
                  ease: [0.65, 0, 0.35, 1],
                }}
                className="h-full w-full bg-gradient-to-r from-white/20 via-white to-white/20"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
