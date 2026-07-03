import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";

interface GlowButtonProps {
  children: ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
  className?: string;
}

const MAGNET_STRENGTH = 0.35;
const MAGNET_RANGE = 18;

export function GlowButton({
  children,
  variant = "primary",
  href = "#",
  className = "",
}: GlowButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const base =
    "group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-500 btn-shine";
  const styles =
    variant === "primary"
      ? "bg-foreground text-primary-foreground hover:shadow-[0_0_40px_oklch(1_0_0/0.25)]"
      : "text-foreground glass hover:bg-white/[0.08]";

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-MAGNET_RANGE, Math.min(MAGNET_RANGE, relX * MAGNET_STRENGTH)));
    y.set(Math.max(-MAGNET_RANGE, Math.min(MAGNET_RANGE, relY * MAGNET_STRENGTH)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      data-cursor="hover"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${base} ${styles} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
    </motion.a>
  );
}
