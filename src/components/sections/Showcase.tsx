import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { AmbientGlow } from "@/components/common/AmbientGlow";
import { Eyebrow } from "@/components/common/Eyebrow";
import { Reveal } from "@/components/common/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { SHOWCASE_SLIDES } from "@/constants/showcase";

const AUTOPLAY_MS = 4500;

export function Showcase() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const pausedRef = useRef(false);

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
    const id = setInterval(() => {
      if (!pausedRef.current) api.scrollNext();
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [api]);

  return (
    <section className="relative py-32">
      <AmbientGlow />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal blur>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <Eyebrow index={1} label="Vitrine" />
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-light leading-[1.05] md:text-6xl">
                Um raio-x do <span className="italic text-silver">nosso padrão de acabamento.</span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => api?.scrollPrev()}
                aria-label="Slide anterior"
                data-cursor="hover"
                className="grid h-11 w-11 place-items-center rounded-full glass transition hover:bg-white/[0.08]"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => api?.scrollNext()}
                aria-label="Próximo slide"
                data-cursor="hover"
                className="grid h-11 w-11 place-items-center rounded-full glass transition hover:bg-white/[0.08]"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} mask>
          <div
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
            className="mt-16"
          >
            <Carousel setApi={setApi} opts={{ loop: true, align: "center" }}>
              <CarouselContent>
                {SHOWCASE_SLIDES.map((slide, i) => (
                  <CarouselItem key={slide.label} className="basis-[85%] pl-4 md:basis-[68%]">
                    <div
                      className={`group relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/5 transition-opacity duration-500 md:aspect-[16/9] ${
                        i === selected ? "opacity-100" : "opacity-40"
                      }`}
                    >
                      <img
                        src={slide.src}
                        alt={slide.label}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                        <span className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                          {slide.tag}
                        </span>
                        <div className="mt-1 font-display text-xl font-light md:text-2xl">
                          {slide.label}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="mt-8 flex justify-center gap-2">
              {SHOWCASE_SLIDES.map((slide, i) => (
                <button
                  key={slide.label}
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Ir para o slide ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === selected ? "w-8 bg-foreground" : "w-3 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
