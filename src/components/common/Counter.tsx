import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

interface CounterProps {
  to: number;
  suffix?: string;
  duration?: number;
}

export function Counter({ to, suffix = "", duration = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return controls.stop;
  }, [inView, to, duration, prefersReducedMotion]);
  return (
    <span ref={ref}>
      {Math.round(val).toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}
