import { Award, CalendarCheck, ShieldCheck, Star } from "lucide-react";

import type { DifferentiatorItem } from "@/types/sections";

export const DIFFERENTIATORS: DifferentiatorItem[] = [
  {
    icon: ShieldCheck,
    title: "Garantia por escrito",
    desc: "Toda vitrificação e PPF saem com certificado do fabricante e garantia de execução.",
  },
  {
    icon: Award,
    title: "Produtos certificados",
    desc: "Linha alemã e coatings 9H homologados — nada de genérico ou diluído.",
  },
  {
    icon: CalendarCheck,
    title: "Agenda exclusiva",
    desc: "Atendimento só com hora marcada, um veículo por vez, sem correria.",
  },
  {
    icon: Star,
    title: "5.0 no Google",
    desc: "Mais de 300 veículos atendidos com avaliação máxima dos clientes.",
  },
];
