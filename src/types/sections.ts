import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  icon: LucideIcon;
  name: string;
  desc: string;
  tag: string;
}

export interface GalleryItem {
  src: string;
  span: string;
  label: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
}

export interface PackagePlan {
  name: string;
  tag: string;
  price: string;
  features: string[];
  featured: boolean;
  swatch: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface DifferentiatorItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface ShowcaseSlide {
  src: string;
  label: string;
  tag: string;
}
