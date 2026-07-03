const BRANDS = [
  "Porsche",
  "BMW M",
  "Mercedes-AMG",
  "Audi RS",
  "Ferrari",
  "Lamborghini",
  "McLaren",
  "Tesla",
  "Bentley",
  "Aston Martin",
];

export function Marquee() {
  const doubled = [...BRANDS, ...BRANDS];
  return (
    <section className="relative border-y border-white/5 py-6 overflow-hidden edge-fade-x">
      <div className="flex animate-marquee gap-16 whitespace-nowrap hover:[animation-play-state:paused]">
        {doubled.map((brand, i) => (
          <span
            key={i}
            className="font-display text-2xl font-light tracking-widest text-muted-foreground/60"
          >
            {brand} <span className="mx-8 text-white/10">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}
