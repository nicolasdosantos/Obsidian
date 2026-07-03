import { ArrowUp, Clock, Instagram, Mail, MapPin, Phone } from "lucide-react";

import { SITE } from "@/constants/site";

const SOCIAL_LINKS = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Mail, label: "E-mail" },
  { Icon: Phone, label: "Telefone" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="relative h-7 w-7">
                <div className="absolute inset-0 rotate-45 rounded-sm bg-gradient-to-br from-white to-white/40" />
                <div className="absolute inset-1 rotate-45 rounded-sm bg-background" />
              </div>
              <span className="text-[0.95rem] font-semibold tracking-[0.2em]">{SITE.name}</span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {SITE.tagline}
            </p>
            <div className="mt-8 flex gap-3">
              {SOCIAL_LINKS.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full glass hover:bg-white/[0.08] transition"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Contato
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} /> {SITE.address}
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} /> {SITE.phone}
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} /> {SITE.email}
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Horário
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />{" "}
                {SITE.hours[0].label}
              </li>
              <li className="pl-6">{SITE.hours[1].label}</li>
              <li className="pl-6">{SITE.hours[2].label}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 text-xs text-muted-foreground md:flex-row">
          <span>
            © {new Date().getFullYear()} {SITE.name} Auto Detailing. Todos os direitos reservados.
          </span>
          <div className="flex items-center gap-6">
            <span className="font-mono tracking-widest">MADE WITH OBSESSION · SP</span>
            <a
              href="#"
              aria-label="Voltar ao topo"
              className="grid h-9 w-9 place-items-center rounded-full glass transition hover:bg-white/[0.08]"
            >
              <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
