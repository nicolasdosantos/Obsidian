import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // The background glow trails slightly behind the main dot/ring for depth —
  // only this layer gets a spring; the dot and ring below track the raw
  // motion values so the primary cursor never feels delayed.
  const glowX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.7 });
  const glowY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.7 });

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
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled, prefersReducedMotion, x, y]);

  if (!enabled || prefersReducedMotion) return null;

  return (
    <>
      {/* background glow — bigger, trails behind with a small delay */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[69] rounded-full blur-xl"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, oklch(0.72 0.17 245 / 0.32), oklch(0.82 0.11 85 / 0.14) 60%, transparent 75%)",
          willChange: "transform",
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: hovering ? 0.9 : 0.5,
          width: hovering ? 170 : pressed ? 70 : 110,
          height: hovering ? 170 : pressed ? 70 : 110,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
      />

      {/* dot + ring — track the raw pointer position, no delay */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] grid place-items-center"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* gradient ring */}
        <motion.div
          className="absolute rounded-full"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\"), conic-gradient(from 0deg, oklch(0.72 0.17 245 / 0.9), oklch(0.82 0.11 85 / 0.9), oklch(0.72 0.17 245 / 0.9))",
            backgroundSize: "22px 22px, 100% 100%",
            backgroundRepeat: "repeat, no-repeat",
            backgroundBlendMode: "overlay, normal",
            WebkitMask:
              "radial-gradient(closest-side, transparent calc(100% - 4.5px), #000 calc(100% - 2px))",
            mask: "radial-gradient(closest-side, transparent calc(100% - 4.5px), #000 calc(100% - 2px))",
            filter: "drop-shadow(0 0 6px oklch(0.72 0.17 245 / 0.45))",
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
          animate={{
            width: hovering ? 52 : pressed ? 16 : 26,
            height: hovering ? 52 : pressed ? 16 : 26,
            opacity: hovering ? 1 : 0.7,
            rotate: hovering ? 360 : 0,
          }}
          transition={{
            width: { type: "spring", stiffness: 300, damping: 24 },
            height: { type: "spring", stiffness: 300, damping: 24 },
            opacity: { duration: 0.3 },
            rotate: hovering
              ? { duration: 3.4, ease: "linear", repeat: Infinity }
              : { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          }}
        />

        {/* center dot */}
        <motion.div
          className="absolute rounded-full bg-white mix-blend-difference"
          animate={{
            width: hovering ? 0 : pressed ? 5 : 6,
            height: hovering ? 0 : pressed ? 5 : 6,
            opacity: hovering ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        />
      </motion.div>
    </>
  );
}
