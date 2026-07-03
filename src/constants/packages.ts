import type { PackagePlan } from "@/types/sections";

export const PACKAGE_PLANS: PackagePlan[] = [
  {
    name: "Bronze",
    tag: "Essencial",
    price: "890",
    features: [
      "Lavagem técnica premium",
      "Descontaminação química",
      "Cera sintética 3 meses",
      "Pretinho de pneus long-life",
      "Higienização básica interna",
    ],
    featured: false,
    swatch: "oklch(0.62 0.09 55)",
  },
  {
    name: "Black",
    tag: "Signature",
    price: "3.490",
    features: [
      "Correção 2 etapas",
      "Vitrificação cerâmica 9H · 3 anos",
      "PPF em áreas de impacto",
      "Higienização completa + ozônio",
      "Tratamento couro premium",
      "Coating em rodas e vidros",
      "Garantia de 3 anos",
    ],
    featured: true,
    swatch: "oklch(0.72 0.17 245)",
  },
  {
    name: "Silver",
    tag: "Refinado",
    price: "1.790",
    features: [
      "Polimento técnico 1 etapa",
      "Vitrificação cerâmica 12 meses",
      "Higienização completa interna",
      "Hidratação de couro",
      "Cristalização de vidros",
    ],
    featured: false,
    swatch: "oklch(0.85 0.008 260)",
  },
];
