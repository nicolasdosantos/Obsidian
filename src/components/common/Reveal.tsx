import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  mask?: boolean;
  className?: string;
}

// Some responsive/device-preview contexts (e.g. a scaled iframe) can make
// useInView's IntersectionObserver misreport or never fire. Since `mask`/
// `blur` start the content invisible, a stuck observer would hide it
// forever, so we cross-check with a plain getBoundingClientRect poll and
// force a reveal if the element is genuinely on screen but the observer
// missed it.
function isGeometricallyInView(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < viewportHeight && rect.bottom > 0 && rect.height > 0;
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
  const observedInView = useInView(ref, { once: true, margin: "-80px" });
  const [fallbackVisible, setFallbackVisible] = useState(false);
  const inView = observedInView || fallbackVisible;
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (observedInView || fallbackVisible) return;
    const check = () => {
      const el = ref.current;
      if (el && isGeometricallyInView(el)) setFallbackVisible(true);
    };
    // Wait for the page to settle (images above can still shift layout while
    // loading) before trusting a geometric reading.
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = () => {
      check();
      window.addEventListener("scroll", check, { passive: true });
      window.addEventListener("resize", check);
      interval = setInterval(check, 300);
    };
    let cleanupLoadListener: (() => void) | undefined;
    if (document.readyState === "complete") {
      start();
    } else {
      const onLoad = () => start();
      window.addEventListener("load", onLoad, { once: true });
      cleanupLoadListener = () => window.removeEventListener("load", onLoad);
    }
    return () => {
      cleanupLoadListener?.();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      clearInterval(interval);
    };
  }, [observedInView, fallbackVisible]);

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
