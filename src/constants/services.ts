import { Droplets, Gauge, Layers, Shield, Sparkles, Wand2 } from "lucide-react";

import type { ServiceItem } from "@/types/sections";

export const SERVICES: ServiceItem[] = [
  {
    icon: Sparkles,
    name: "Vitrificação Cerâmica",
    desc: "Camadas de SiO₂ 9H que refletem como espelho e repelem sujeira por até 5 anos.",
    tag: "01",
  },
  {
    icon: Gauge,
    name: "Polimento Técnico",
    desc: "Correção multi-etapas para eliminar swirl marks, hologramas e oxidação profunda.",
    tag: "02",
  },
  {
    icon: Droplets,
    name: "Higienização Interna",
    desc: "Extração profunda, ozonização e tratamento de couro com produtos alemães.",
    tag: "03",
  },
  {
    icon: Shield,
    name: "Proteção Cerâmica",
    desc: "Coating para rodas, vidros, plásticos e couro — proteção completa do veículo.",
    tag: "04",
  },
  {
    icon: Layers,
    name: "PPF — Paint Protection Film",
    desc: "Película de poliuretano auto-regenerativa contra pedras, riscos e insetos.",
    tag: "05",
  },
  {
    icon: Wand2,
    name: "Revitalização Estética",
    desc: "Restauração de faróis, plásticos externos e detalhes cromados desgastados.",
    tag: "06",
  },
];
