import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  mask?: boolean;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  blur = false,
  mask = false,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const offsetY = prefersReducedMotion ? 0 : y;
  const initialBlur = blur && !prefersReducedMotion ? "blur(8px)" : "blur(0px)";
  const clipHidden = "inset(0% 0% 100% 0%)";
  const clipVisible = "inset(0% 0% 0% 0%)";

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: offsetY,
        filter: initialBlur,
        ...(mask && !prefersReducedMotion ? { clipPath: clipHidden } : {}),
      }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              ...(mask && !prefersReducedMotion ? { clipPath: clipVisible } : {}),
            }
          : {}
      }
      transition={{
        duration: prefersReducedMotion ? 0.2 : mask ? 1.1 : 1,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
