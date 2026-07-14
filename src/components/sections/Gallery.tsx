import { Eyebrow } from "@/components/common/Eyebrow";
import { Reveal } from "@/components/common/Reveal";
import { GALLERY_ITEMS } from "@/constants/gallery";

export function Gallery() {
  return (
    <section id="galeria" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal blur>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <Eyebrow index={4} label="Portfolio" />
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-light leading-[1.05] md:text-6xl">
                Trabalhos <span className="italic text-silver">selecionados.</span>
              </h2>
            </div>
            <a
              href="#contato"
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition"
            >
              Agendar uma avaliação →
            </a>
          </div>
        </Reveal>

        <div className="mt-16 grid auto-rows-[240px] grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[280px]">
          {GALLERY_ITEMS.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 0.08}
              mask
              className={`group relative overflow-hidden rounded-2xl ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70" />
              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                  Estudo · 2025
                </span>
                <div className="mt-1 font-display text-xl font-light">{item.label}</div>
              </div>
              <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
