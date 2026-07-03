import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

import { Reveal } from "@/components/common/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { TESTIMONIALS } from "@/constants/testimonials";

const AUTOPLAY_MS = 5000;

export function Testimonials() {
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

  useEffect(() => {
    if (!api) return;
    const id = setInterval(() => api.scrollNext(), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [api]);

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <div>
              <div className="text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground">
                <span className="text-gold">◆</span> Depoimentos
              </div>
              <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] md:text-6xl">
                Quem confiou <span className="italic text-silver">viu a diferença.</span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => api?.scrollPrev()}
                aria-label="Depoimento anterior"
                data-cursor="hover"
                className="grid h-11 w-11 place-items-center rounded-full glass transition hover:bg-white/[0.08]"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => api?.scrollNext()}
                aria-label="Próximo depoimento"
                data-cursor="hover"
                className="grid h-11 w-11 place-items-center rounded-full glass transition hover:bg-white/[0.08]"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-16">
          <Carousel setApi={setApi} opts={{ loop: true, align: "start" }}>
            <CarouselContent>
              {TESTIMONIALS.map((t) => (
                <CarouselItem key={t.name} className="basis-full pl-6 md:basis-1/2 lg:basis-[42%]">
                  <div className="relative flex h-full flex-col overflow-hidden rounded-3xl glass p-8 md:p-10">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-4 left-6 select-none font-display text-7xl text-white/[0.06]"
                    >
                      "
                    </span>
                    <div className="mb-6 flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-[color:var(--gold)] text-[color:var(--gold)]"
                        />
                      ))}
                    </div>
                    <p className="flex-1 font-display text-xl font-light leading-relaxed md:text-2xl">
                      "{t.quote}"
                    </p>
                    <div className="mt-8">
                      <div className="text-sm font-medium">{t.name}</div>
                      <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="mt-10 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Ir para o depoimento ${i + 1}`}
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
