import { type RefObject } from "react";
import { useScroll, type MotionValue } from "motion/react";

export function useScrollProgress(target?: RefObject<HTMLElement | null>): MotionValue<number> {
  const { scrollYProgress } = useScroll(
    target ? { target, offset: ["start end", "end start"] } : undefined,
  );
  return scrollYProgress;
}
