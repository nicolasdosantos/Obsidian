import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

import { Eyebrow } from "@/components/common/Eyebrow";
import { Reveal } from "@/components/common/Reveal";
import { PROCESS_STEPS } from "@/constants/process";
import type { ProcessStep } from "@/types/sections";

function StepCard({ step, align }: { step: ProcessStep; align: "left" | "right" }) {
  return (
    <div
      className={`glass rounded-2xl p-6 md:p-8 hover-float ${align === "right" ? "md:text-right" : ""}`}
    >
      <div className="font-mono text-[0.7rem] tracking-widest text-muted-foreground">
        STEP {step.number}
      </div>
      <h3 className="mt-2 font-display text-2xl font-light md:text-3xl">{step.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
    </div>
  );
}

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="processo" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow index={5} label="Processo" />
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-light leading-[1.05] md:text-6xl">
            Cinco etapas. <span className="italic text-silver">Zero atalhos.</span>
          </h2>
        </Reveal>

        <div ref={sectionRef} className="relative mt-20">
          <div className="absolute left-[1.125rem] top-0 bottom-0 w-px bg-white/5 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ scaleY: lineProgress }}
            className="absolute left-[1.125rem] top-0 bottom-0 w-px origin-top bg-gradient-to-b from-[color:var(--electric)] to-[color:var(--gold)] md:left-1/2 md:-translate-x-1/2"
          />

          <div className="relative z-10 space-y-10 md:space-y-14">
            {PROCESS_STEPS.map((step, i) => {
              const reversed = i % 2 === 1;
              return (
                <Reveal key={step.number} delay={i * 0.1}>
                  <div className="grid grid-cols-[2.25rem_1fr] items-start gap-6 md:grid-cols-[1fr_2.25rem_1fr] md:gap-10">
                    {/* desktop left slot */}
                    <div className="hidden md:block">
                      {!reversed && <StepCard step={step} align="right" />}
                    </div>

                    {/* icon — always centered on the line, opaque so it masks it cleanly */}
                    <div className="md:justify-self-center">
                      <div className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-background shadow-[0_0_0_6px_var(--background)]">
                        <step.icon
                          className="h-4 w-4 text-[color:var(--electric)]"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    {/* mobile card */}
                    <div className="md:hidden">
                      <StepCard step={step} align="left" />
                    </div>

                    {/* desktop right slot */}
                    <div className="hidden md:block">
                      {reversed && <StepCard step={step} align="left" />}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
