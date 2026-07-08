import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, Menu, X } from "lucide-react";

import { NAV_LINKS } from "@/constants/nav";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => !!el,
    );
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) firstLinkRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/[0.06] bg-background/70 shadow-[0_1px_0_0_oklch(1_0_0/0.04),0_20px_40px_-30px_oklch(0_0_0/0.8)] backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        {/* hairline gradient accent, only visible once scrolled */}
        <div
          className={`absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[color:var(--electric)]/40 to-transparent transition-opacity duration-700 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#" className="group flex items-center gap-2.5" data-cursor="hover">
            <div className="relative h-7 w-7 shrink-0">
              <img
                src="/logo.svg"
                alt="Obsidian"
                className="relative h-7 w-7 transition-transform duration-500 ease-out group-hover:rotate-45 group-hover:scale-110"
              />
              <div className="absolute inset-0 -z-10 rounded-full bg-[color:var(--electric)]/30 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <span className="text-[0.95rem] font-semibold tracking-[0.2em] text-silver">
              OBSIDIAN
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor="hover"
                className="group/link relative py-1 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {l.label}
                <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-px origin-center scale-x-0 bg-white/25 transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
                {active === l.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-[color:var(--electric)] to-[color:var(--gold)]"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <a
            href="#contato"
            data-cursor="hover"
            className="group/cta relative hidden overflow-hidden rounded-full glass px-5 py-2.5 text-xs font-medium tracking-wider uppercase transition-all duration-500 hover:border-transparent hover:shadow-[0_0_30px_oklch(0.72_0.17_245/0.25)] md:inline-flex md:items-center md:gap-2"
          >
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-[color:var(--electric)] to-[color:var(--gold)] opacity-0 transition-opacity duration-500 group-hover/cta:opacity-100" />
            <span className="relative text-foreground transition-colors duration-500 group-hover/cta:text-background">
              Agendar
            </span>
            <ChevronRight className="relative h-3.5 w-3.5 transition-transform duration-500 group-hover/cta:translate-x-0.5 group-hover/cta:text-background" />
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full glass transition-colors duration-300 hover:bg-white/[0.08] md:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="fixed inset-0 z-[100] overflow-hidden bg-background/97 backdrop-blur-xl md:hidden"
          >
            <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[color:var(--electric)]/10 blur-[100px]" />

            <div className="relative flex items-center justify-between px-6 py-5">
              <span className="text-[0.95rem] font-semibold tracking-[0.2em] text-silver">
                OBSIDIAN
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="grid h-10 w-10 place-items-center rounded-full glass transition-colors duration-300 hover:bg-white/[0.08]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="relative mt-12 flex flex-col items-center gap-7 px-6">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="font-display text-3xl font-light text-foreground transition-colors duration-300 hover:text-silver"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#contato"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06, duration: 0.4 }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--electric)] to-[color:var(--gold)] px-6 py-3 text-xs font-medium tracking-wider uppercase text-background"
              >
                Agendar <ChevronRight className="h-3.5 w-3.5" />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
