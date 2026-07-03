import { Droplets, Gauge, PackageCheck, Search, Shield } from "lucide-react";

import type { ProcessStep } from "@/types/sections";

export const PROCESS_STEPS: ProcessStep[] = [
  {
    n: "01",
    t: "Inspeção",
    d: "Diagnóstico técnico com iluminação profissional e paquímetro digital de espessura.",
    icon: Search,
  },
  {
    n: "02",
    t: "Lavagem Técnica",
    d: "Descontaminação química e mecânica em ambiente controlado — sem contato agressivo.",
    icon: Droplets,
  },
  {
    n: "03",
    t: "Correção",
    d: "Polimento em múltiplas etapas para restaurar 95%+ da refletividade original.",
    icon: Gauge,
  },
  {
    n: "04",
    t: "Proteção",
    d: "Aplicação de vitrificação cerâmica ou PPF selado por curagem controlada.",
    icon: Shield,
  },
  {
    n: "05",
    t: "Entrega",
    d: "Revisão final sob luz LED, laudo fotográfico e cartilha de manutenção premium.",
    icon: PackageCheck,
  },
];
