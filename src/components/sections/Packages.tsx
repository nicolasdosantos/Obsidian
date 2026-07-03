import { useEffect, useState } from "react";
import { Check } from "lucide-react";

import { AmbientGlow } from "@/components/common/AmbientGlow";
import { Eyebrow } from "@/components/common/Eyebrow";
import { GlowButton } from "@/components/common/GlowButton";
import { Reveal } from "@/components/common/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { PACKAGE_PLANS } from "@/constants/packages";
import type { PackagePlan } from "@/types/sections";

function PlanCard({ plan }: { plan: PackagePlan }) {
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl p-8 md:p-10 transition-all duration-700 hover-float ${
        plan.featured
          ? "glass-strong gradient-border lg:scale-105 lg:py-14 shadow-[0_0_60px_oklch(0.72_0.17_245/0.15)]"
          : "glass"
      }`}
    >
      {plan.featured && (
        <div className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-[color:var(--electric)] to-[color:var(--gold)] px-3 py-1 text-[0.6rem] font-medium uppercase tracking-widest text-background">
          Mais escolhido
        </div>
      )}
      <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: plan.swatch }}
        />
        {plan.tag}
      </div>
      <div className="mt-3 font-display text-4xl font-light md:text-5xl">Plano {plan.name}</div>
      <div className="mt-9 flex items-baseline gap-1.5">
        <span className="text-sm text-muted-foreground">R$</span>
        <span className="font-display text-6xl font-extralight">{plan.price}</span>
      </div>
      <div className="mt-2 text-xs text-muted-foreground">a partir de · pagamento único</div>

      <ul className="mt-12 space-y-4">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" strokeWidth={1.5} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 border-t border-white/5 pt-6">
        <GlowButton
          href="#contato"
          variant={plan.featured ? "primary" : "ghost"}
          className="w-full justify-center"
        >
          Contratar {plan.name}
        </GlowButton>
      </div>
    </div>
  );
}

export function Packages() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section id="pacotes" className="relative py-32">
      <AmbientGlow />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal blur>
          <div className="text-center">
            <div className="flex justify-center">
              <Eyebrow index={6} label="Pacotes" />
            </div>
            <h2 className="mt-4 font-display text-4xl font-light md:text-6xl">
              Escolha o <span className="italic text-silver">seu ritual.</span>
            </h2>
          </div>
        </Reveal>

        {/* desktop: static grid */}
        <div className="mt-20 hidden gap-6 lg:grid lg:grid-cols-3 lg:items-center">
          {PACKAGE_PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <PlanCard plan={p} />
            </Reveal>
          ))}
        </div>

        {/* mobile/tablet: swipeable carousel */}
        <Reveal delay={0.1} className="mt-20 lg:hidden">
          <Carousel setApi={setApi} opts={{ loop: true, align: "center" }}>
            <CarouselContent>
              {PACKAGE_PLANS.map((p) => (
                <CarouselItem key={p.name} className="basis-[88%] pl-4 sm:basis-[60%]">
                  <PlanCard plan={p} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="mt-8 flex justify-center gap-2">
            {PACKAGE_PLANS.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Ir para o plano ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === selected ? "w-8 bg-foreground" : "w-3 bg-white/20"
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
