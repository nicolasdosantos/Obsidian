import { useRef, type MouseEvent } from "react";

import { Reveal } from "@/components/common/Reveal";
import { DIFFERENTIATORS } from "@/constants/differentiators";

function DifferentiatorCell({
  item,
  delay,
}: {
  item: (typeof DIFFERENTIATORS)[number];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    ref.current?.style.setProperty("--spot-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    ref.current?.style.setProperty("--spot-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <Reveal delay={delay}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        className="spotlight group relative h-full overflow-hidden p-8 transition-colors duration-500 hover:bg-white/[0.02]"
      >
        <item.icon
          className="h-5 w-5 text-[color:var(--electric)] transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110"
          strokeWidth={1.25}
        />
        <h3 className="mt-5 font-display text-lg font-light">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
      </div>
    </Reveal>
  );
}

export function Differentiators() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 divide-y divide-white/5 rounded-3xl border border-white/5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {DIFFERENTIATORS.map((d, i) => (
            <DifferentiatorCell key={d.title} item={d} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
