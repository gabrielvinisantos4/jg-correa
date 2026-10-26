"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { site } from "@/data/site";
import { navLinks } from "@/data/nav";
import { whatsappLink } from "@/lib/whatsapp";


export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const dark = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          dark
            ? "bg-transparent"
            : "border-b border-line/70 bg-paper/85 shadow-[0_8px_30px_-20px_rgba(10,24,56,.35)] backdrop-blur-xl"
        }`}
      >
        <div className="container-x flex h-[76px] items-center justify-between gap-6">
          <Logo tone={dark ? "light" : "dark"} />

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`rounded-full px-3.5 py-2 text-[0.9rem] font-semibold transition-colors ${
                  dark ? "text-white/80 hover:text-white" : "text-ink/75 hover:bg-navy-900/5 hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da JG Corrêa"
              className={`hidden h-10 w-10 place-items-center rounded-full transition-colors sm:grid ${
                dark ? "text-white/80 hover:bg-white/10" : "text-ink/70 hover:bg-navy-900/5"
              }`}
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={whatsappLink(site.mensagens.geral)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp da JG Corrêa"
              className={`hidden h-10 w-10 place-items-center rounded-full transition-colors sm:grid ${
                dark ? "text-white/80 hover:bg-white/10" : "text-ink/70 hover:bg-navy-900/5"
              }`}
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <a
              href={whatsappLink(site.mensagens.corretor)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold hidden !py-2.5 md:inline-flex"
            >
              Fale com um corretor <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={open}
              className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${
                dark ? "text-white hover:bg-white/10" : "text-ink hover:bg-navy-900/5"
              }`}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-navy-950 text-white lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="container-x flex h-[76px] items-center justify-between">
              <Logo tone="light" />
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="container-x mt-6 flex flex-1 flex-col" aria-label="Menu móvel">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display flex items-center justify-between border-b border-white/10 py-4 text-[2rem]"
                  >
                    {l.label}
                    <ArrowUpRight className="h-5 w-5 text-gold" />
                  </Link>
                </motion.div>
              ))}
              <div className="mt-auto flex flex-col gap-3 pb-10 pt-8">
                <a
                  href={whatsappLink(site.mensagens.corretor)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whats w-full"
                >
                  <WhatsAppIcon className="h-5 w-5" /> Fale com um corretor
                </a>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost-light w-full"
                >
                  <InstagramIcon className="h-5 w-5" /> @{site.instagram.usuario}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
