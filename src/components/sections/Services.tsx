import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";

import featuredImg from "@/assets/images/gallery-1.jpg";
import { AmbientGlow } from "@/components/common/AmbientGlow";
import { Eyebrow } from "@/components/common/Eyebrow";
import { Reveal } from "@/components/common/Reveal";
import { SERVICES } from "@/constants/services";

function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 200, damping: 20 });
  const springRy = useSpring(ry, { stiffness: 200, damping: 20 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 8);
    rx.set(-py * 8);
    ref.current?.style.setProperty("--spot-x", `${(px + 0.5) * 100}%`);
    ref.current?.style.setProperty("--spot-y", `${(py + 0.5) * 100}%`);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: springRx, rotateY: springRy }}
      className={`tilt-card spotlight ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="servicos" className="relative py-32">
      <AmbientGlow />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal blur>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <Eyebrow index={2} label="Serviços" />
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-light leading-[1.05] md:text-6xl">
                Cada serviço executado com{" "}
                <span className="italic text-silver">precisão de engenharia.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground md:text-base">
              Do detalhamento diário à restauração completa — protocolos rigorosos, produtos
              ceramizados de topo e mãos treinadas por certificações internacionais.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 grid auto-rows-[200px] grid-cols-1 gap-4 md:auto-rows-[180px] md:grid-cols-3">
          {SERVICES.map((service, i) => {
            const featured = i === 0;
            return (
              <Reveal
                key={service.name}
                delay={i * 0.08}
                className={featured ? "md:col-span-2 md:row-span-2" : ""}
              >
                <TiltCard className="group relative h-full overflow-hidden rounded-3xl border border-white/5">
                  {featured ? (
                    <>
                      <img
                        src={featuredImg}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover grayscale contrast-125"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-[color:var(--electric)]/10" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-background/60 transition-all duration-700 group-hover:bg-gradient-to-br group-hover:from-white/[0.04] group-hover:to-transparent" />
                  )}

                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -bottom-6 -right-2 select-none font-display font-light text-white/[0.06] ${
                      featured ? "text-[10rem]" : "text-[6rem]"
                    }`}
                  >
                    {service.tag}
                  </span>

                  <div
                    className={`relative flex h-full flex-col justify-between p-8 ${featured ? "md:p-10" : ""}`}
                  >
                    <div className="rounded-2xl glass w-fit p-3.5 transition-transform duration-700 group-hover:-translate-y-1 group-hover:rotate-3">
                      <service.icon className="h-5 w-5 text-foreground" strokeWidth={1.25} />
                    </div>
                    <div>
                      <h3
                        className={`font-display font-light leading-tight ${featured ? "text-3xl md:text-4xl" : "text-xl"}`}
                      >
                        {service.name}
                      </h3>
                      <p
                        className={`mt-3 text-sm leading-relaxed text-muted-foreground ${featured ? "max-w-md" : ""}`}
                      >
                        {service.desc}
                      </p>
                      <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
                        Saiba mais{" "}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[color:var(--electric)] to-transparent transition-all duration-1000 group-hover:w-full" />
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
