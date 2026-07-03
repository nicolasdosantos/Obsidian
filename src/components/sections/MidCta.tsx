import { Reveal } from "@/components/common/Reveal";
import { GlowButton } from "@/components/common/GlowButton";

export function MidCta() {
  return (
    <section className="relative border-y border-white/5 py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 text-center md:flex-row md:justify-between md:text-left">
        <Reveal className="max-w-xl">
          <p className="font-display text-2xl font-light leading-snug md:text-3xl">
            Cada detalhe começa com <span className="italic text-silver">uma inspeção séria.</span>
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <GlowButton href="#processo" variant="ghost">
            Ver o processo
          </GlowButton>
        </Reveal>
      </div>
    </section>
  );
}
