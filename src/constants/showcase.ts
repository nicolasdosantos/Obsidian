import beforeAfter from "@/assets/images/before-after.jpg";
import ctaBg from "@/assets/images/cta-bg.jpg";
import gallery1 from "@/assets/images/gallery-1.jpg";
import gallery2 from "@/assets/images/gallery-2.jpg";
import gallery3 from "@/assets/images/gallery-3.jpg";
import gallery4 from "@/assets/images/gallery-4.jpg";
import heroCar from "@/assets/images/hero-car.jpg";
import type { ShowcaseSlide } from "@/types/sections";

export const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  { src: heroCar, tag: "Acabamento", label: "Espelhado sob qualquer luz" },
  { src: gallery1, tag: "Vitrificação", label: "Camada cerâmica de 9H" },
  { src: gallery2, tag: "Faróis", label: "Restauração óptica total" },
  { src: gallery3, tag: "Rodas", label: "Detalhe milimétrico" },
  { src: gallery4, tag: "Interior", label: "Higienização premium" },
  { src: beforeAfter, tag: "Transformação", label: "Antes vira depois" },
  { src: ctaBg, tag: "Resultado", label: "Pronto para rodar" },
];
