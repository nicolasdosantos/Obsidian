import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import heroCar from "@/assets/images/hero-car.jpg";
import { Reveal } from "@/components/common/Reveal";
import { GlowButton } from "@/components/common/GlowButton";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section ref={ref} className="relative min-h-[100svh] w-full overflow-hidden noise">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroCar}
          alt="Porsche detalhamento"
          className="h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--background)_85%)]" />
      </motion.div>

      {/* particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/40 animate-particle-float"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 71) % 100}%`,
              animationDuration: `${4 + (i % 5)}s`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between px-6 pt-40 pb-16"
      >
        <div>
          <Reveal delay={0.1}>
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--electric)] animate-pulse-glow" />
              Concours-level detailing · São Paulo
            </div>
          </Reveal>

          <h1 className="mt-8 max-w-5xl font-display text-[clamp(2.75rem,8vw,7.5rem)] font-light leading-[0.95] tracking-[-0.04em]">
            <Reveal delay={0.15} blur>
              <span className="block">Seu carro merece</span>
            </Reveal>
            <Reveal delay={0.28} blur>
              <span className="block italic text-silver font-extralight">um acabamento</span>
            </Reveal>
            <Reveal delay={0.41} blur>
              <span className="block">de outro nível.</span>
            </Reveal>
          </h1>

          <Reveal delay={0.5}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Um santuário para máquinas raras. Vitrificação, PPF e correção de pintura executados
              com precisão obsessiva por especialistas certificados.
            </p>
          </Reveal>

          <Reveal delay={0.65}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <GlowButton href="#contato">Agendar agora</GlowButton>
              <GlowButton href="#servicos" variant="ghost">
                Conhecer serviços
              </GlowButton>
            </div>
            <p className="mt-5 text-xs tracking-wide text-muted-foreground">
              Resposta em até 2h úteis · sem compromisso
            </p>
          </Reveal>
        </div>

        {/* indicators */}
        <Reveal delay={0.85} className="mt-16">
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl glass">
            {[
              { k: "+300", v: "Veículos atendidos" },
              { k: "5.0★", v: "Avaliação Google" },
              { k: "5 anos", v: "Garantia premium" },
            ].map((s) => (
              <div key={s.v} className="bg-background/40 px-6 py-6 md:py-7">
                <div className="font-display text-2xl font-light md:text-4xl">{s.k}</div>
                <div className="mt-1 text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Scroll
      </motion.div>

      {/* dissolve into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
