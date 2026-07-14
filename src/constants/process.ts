import { Droplets, Gauge, PackageCheck, Search, Shield } from "lucide-react";

import type { ProcessStep } from "@/types/sections";

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Inspeção",
    description:
      "Diagnóstico técnico com iluminação profissional e paquímetro digital de espessura.",
    icon: Search,
  },
  {
    number: "02",
    title: "Lavagem Técnica",
    description:
      "Descontaminação química e mecânica em ambiente controlado — sem contato agressivo.",
    icon: Droplets,
  },
  {
    number: "03",
    title: "Correção",
    description: "Polimento em múltiplas etapas para restaurar 95%+ da refletividade original.",
    icon: Gauge,
  },
  {
    number: "04",
    title: "Proteção",
    description: "Aplicação de vitrificação cerâmica ou PPF selado por curagem controlada.",
    icon: Shield,
  },
  {
    number: "05",
    title: "Entrega",
    description: "Revisão final sob luz LED, laudo fotográfico e cartilha de manutenção premium.",
    icon: PackageCheck,
  },
];
