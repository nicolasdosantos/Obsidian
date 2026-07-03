import { Clock, MapPin, Phone } from "lucide-react";

import { Eyebrow } from "@/components/common/Eyebrow";
import { Reveal } from "@/components/common/Reveal";
import { SITE } from "@/constants/site";

const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-46.6958%2C-23.6025%2C-46.6758%2C-23.5925&layer=mapnik&marker=-23.5975%2C-46.6858";

export function Location() {
  return (
    <section id="localizacao" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal blur>
          <Eyebrow index={8} label="Localização" />
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-light leading-[1.05] md:text-6xl">
            Um endereço só para <span className="italic text-silver">poucos carros por dia.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="glass grid-lines h-full rounded-3xl p-8 md:p-10">
              <ul className="space-y-6 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--electric)]"
                    strokeWidth={1.5}
                  />
                  <span className="text-muted-foreground">{SITE.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone
                    className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--electric)]"
                    strokeWidth={1.5}
                  />
                  <span className="text-muted-foreground">{SITE.phone}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock
                    className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--electric)]"
                    strokeWidth={1.5}
                  />
                  <div className="text-muted-foreground">
                    {SITE.hours.map((h) => (
                      <div key={h.label}>{h.label}</div>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} mask className="lg:col-span-3">
            <div className="h-[320px] overflow-hidden rounded-3xl border border-white/10 lg:h-full">
              <iframe
                title="Localização da OBSIDIAN Auto Detailing"
                src={MAP_EMBED_URL}
                loading="lazy"
                className="h-full w-full grayscale invert-[0.92] hue-rotate-180 contrast-[0.9]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
