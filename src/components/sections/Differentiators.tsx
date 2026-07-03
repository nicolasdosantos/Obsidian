import { Reveal } from "@/components/common/Reveal";
import { DIFFERENTIATORS } from "@/constants/differentiators";

export function Differentiators() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 divide-y divide-white/5 rounded-3xl border border-white/5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {DIFFERENTIATORS.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.08} className="p-8">
              <d.icon className="h-5 w-5 text-[color:var(--electric)]" strokeWidth={1.25} />
              <h3 className="mt-5 font-display text-lg font-light">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
