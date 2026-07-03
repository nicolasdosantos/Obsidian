import ctaBg from "@/assets/images/cta-bg.jpg";
import { GlowButton } from "@/components/common/GlowButton";
import { Reveal } from "@/components/common/Reveal";

export function FinalCta() {
  return (
    <section id="contato" className="relative overflow-hidden py-32">
      <div className="absolute inset-0">
        <img
          src={ctaBg}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
      </div>
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <div className="text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground">
            Está pronto?
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-5xl font-extralight leading-[0.95] tracking-tight md:text-8xl">
            Reserve um horário
            <br />
            no <span className="italic text-silver">santuário.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mx-auto mt-8 max-w-xl text-base text-muted-foreground md:text-lg">
            Agendas limitadas por semana para garantir dedicação absoluta a cada veículo.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <GlowButton>Agendar consultoria</GlowButton>
            <GlowButton variant="ghost" href="#">
              WhatsApp direto
            </GlowButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
