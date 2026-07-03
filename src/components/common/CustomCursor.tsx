import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mql.matches);
    const onChange = () => setEnabled(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled || prefersReducedMotion) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.("a, button, [data-cursor='hover']");
      setHovering(!!target);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled, prefersReducedMotion, x, y]);

  if (!enabled || prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border border-white/50 mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      initial={{ width: 20, height: 20, opacity: 0 }}
      animate={{ width: hovering ? 56 : 20, height: hovering ? 56 : 20, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    />
  );
}
