import { Counter } from "@/components/common/Counter";
import { Reveal } from "@/components/common/Reveal";
import { STATS } from "@/constants/stats";

export function Stats() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="glass-strong gradient-border grid-lines rounded-3xl overflow-hidden">
            <div className="grid grid-cols-2 gap-px lg:grid-cols-4">
              {STATS.map((st, i) => {
                const highlighted = i === 1;
                return (
                  <div
                    key={i}
                    className={`bg-background/40 px-6 py-12 text-center md:py-16 ${highlighted ? "bg-[color:var(--electric)]/[0.04]" : ""}`}
                  >
                    <div
                      className={`font-display font-extralight tracking-tight ${highlighted ? "text-6xl md:text-8xl" : "text-5xl md:text-7xl"}`}
                    >
                      {st.n % 1 === 0 ? <Counter to={st.n} /> : <>{st.n}</>}
                      <span
                        className={highlighted ? "text-[color:var(--electric)]" : "text-silver"}
                      >
                        {st.s}
                      </span>
                    </div>
                    <div className="mt-3 text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground">
                      {st.l}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
