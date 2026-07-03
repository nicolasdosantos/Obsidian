import { createFileRoute } from "@tanstack/react-router";

import { CustomCursor } from "@/components/common/CustomCursor";
import { Preloader } from "@/components/common/Preloader";
import { ScrollProgressBar } from "@/components/common/ScrollProgressBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Differentiators } from "@/components/sections/Differentiators";
import { Showcase } from "@/components/sections/Showcase";
import { Services } from "@/components/sections/Services";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Gallery } from "@/components/sections/Gallery";
import { MidCta } from "@/components/sections/MidCta";
import { Process } from "@/components/sections/Process";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { Packages } from "@/components/sections/Packages";
import { Faq } from "@/components/sections/Faq";
import { Location } from "@/components/sections/Location";
import { FinalCta } from "@/components/sections/FinalCta";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Preloader />
      <ScrollProgressBar />
      <CustomCursor />
      <Navbar />
      <Hero />
      <Marquee />
      <Differentiators />
      <Showcase />
      <Services />
      <BeforeAfter />
      <Gallery />
      <MidCta />
      <Process />
      <Stats />
      <Testimonials />
      <Packages />
      <Faq />
      <Location />
      <FinalCta />
      <Footer />
    </main>
  );
}
