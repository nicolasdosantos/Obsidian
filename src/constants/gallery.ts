import gallery1 from "@/assets/images/gallery-1.jpg";
import gallery2 from "@/assets/images/gallery-2.jpg";
import gallery3 from "@/assets/images/gallery-3.jpg";
import gallery4 from "@/assets/images/gallery-4.jpg";
import type { GalleryItem } from "@/types/sections";

export const GALLERY_ITEMS: GalleryItem[] = [
  { src: gallery1, span: "md:col-span-2 md:row-span-2", label: "Ceramic Coating" },
  { src: gallery2, span: "", label: "Faróis" },
  { src: gallery3, span: "", label: "Rodas" },
  { src: gallery4, span: "md:col-span-2", label: "Interior" },
];
