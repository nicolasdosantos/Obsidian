import { useRef, useState, type KeyboardEvent } from "react";
import { useInView } from "motion/react";
import { ChevronRight } from "lucide-react";

import beforeAfter from "@/assets/images/before-after.jpg";
import { Eyebrow } from "@/components/common/Eyebrow";
import { Reveal } from "@/components/common/Reveal";

const STEP = 5;

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [interacted, setInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const setPosClamped = (p: number) => setPos(Math.max(0, Math.min(100, p)));

  const onMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosClamped(((clientX - rect.left) / rect.width) * 100);
    setInteracted(true);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      setPosClamped(pos - STEP);
      setInteracted(true);
    } else if (e.key === "ArrowRight") {
      setPosClamped(pos + STEP);
      setInteracted(true);
    } else if (e.key === "Home") {
      setPosClamped(0);
      setInteracted(true);
    } else if (e.key === "End") {
      setPosClamped(100);
      setInteracted(true);
    }
  };

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow index={3} label="Antes & Depois" />
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-light leading-[1.05] md:text-6xl">
            A diferença mora <span className="italic text-silver">nos detalhes.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            ref={containerRef}
            onMouseMove={(e) => dragging.current && onMove(e.clientX)}
            onMouseDown={(e) => {
              dragging.current = true;
              onMove(e.clientX);
            }}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
            onTouchMove={(e) => onMove(e.touches[0].clientX)}
            className="relative mt-16 aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl glass"
          >
            <img
              src={beforeAfter}
              alt="Depois"
              className="absolute inset-0 h-full w-full object-cover"
              decoding="async"
            />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
              <img
                src={beforeAfter}
                alt="Antes"
                className="h-full w-full object-cover grayscale"
                style={{ width: `${100 * (100 / Math.max(pos, 1))}%`, maxWidth: "none" }}
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
              <div className="absolute inset-y-0 -translate-x-1/2 w-px bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
              <div
                role="slider"
                tabIndex={0}
                aria-label="Comparar imagem antes e depois"
                aria-valuenow={Math.round(pos)}
                aria-valuemin={0}
                aria-valuemax={100}
                onKeyDown={onKeyDown}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full glass-strong grid place-items-center outline-none"
              >
                {!interacted && inView && (
                  <span className="absolute inset-0 -m-2 rounded-full border border-white/40 animate-pulse-glow" />
                )}
                <div className="flex gap-1">
                  <ChevronRight className="h-3.5 w-3.5 rotate-180" />
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>

            <span className="absolute left-6 top-6 rounded-full glass px-3 py-1 text-[0.65rem] uppercase tracking-widest">
              Antes
            </span>
            <span className="absolute right-6 top-6 rounded-full glass px-3 py-1 text-[0.65rem] uppercase tracking-widest">
              Depois
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
