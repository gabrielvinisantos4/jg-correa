"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { SearchBar } from "../SearchBar";
import { WhatsAppIcon } from "../icons";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yPhone = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);

  const words = ["Encontre", "o", "imóvel", "ideal", "para", "sua", "próxima", "conquista."];

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy-950 pb-10 pt-[110px] text-white md:pb-16 md:pt-[130px]">
      {/* luzes de fundo */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-royal/35 blur-[140px]" />
      <div className="pointer-events-none absolute right-[-10%] top-[30%] h-[420px] w-[420px] rounded-full bg-gold/15 blur-[140px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 30% 30%, black 20%, transparent 70%)",
        }}
      />
      <div className="grain" />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="eyebrow inline-flex items-center gap-3 text-gold"
          >
            <span className="h-px w-8 bg-gold" /> Construtora e Imobiliária · {site.endereco.cidade} – {site.endereco.uf}
          </motion.p>

          <h1 className="display mt-6 text-[2.75rem] font-medium sm:text-[3.6rem] lg:text-[4.6rem]">
            {words.map((w, n) => (
              <span key={n} className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span
                  className={`inline-block ${w === "ideal" ? "italic text-gold" : ""}`}
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + n * 0.055, ease }}
                >
                  {w}
                </motion.span>
                {n < words.length - 1 && " "}
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="mt-6 max-w-[34rem] text-[1.06rem] leading-relaxed text-white/70 md:text-[1.15rem]"
          >
            Casas, terrenos e oportunidades imobiliárias para você encontrar o lugar certo para viver ou investir.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/imoveis" className="btn btn-gold !px-7 !py-4">
              Explorar imóveis <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light !px-7 !py-4">
              <span className="whats-squircle -my-1 -ml-2 h-8 w-8"><WhatsAppIcon className="h-[18px] w-[18px]" /></span> Falar pelo WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Vídeo real de um imóvel da JG Corrêa */}
        <div className="relative mx-auto h-[460px] w-full max-w-[420px] sm:h-[540px] lg:h-[600px]">
          <motion.div
            style={{ y: yCard }}
            initial={reduce ? false : { opacity: 0, x: -30, rotate: -8 }}
            animate={{ opacity: 1, x: 0, rotate: -6 }}
            transition={{ duration: 1.1, delay: 0.5, ease }}
            className="absolute left-0 top-16 hidden h-[300px] w-[190px] overflow-hidden rounded-[26px] ring-1 ring-white/15 sm:block lg:left-[-30px]"
          >
            <Image
              src="/imoveis/casa-av-atlantica-590/01.webp"
              alt="Fachada de casa à venda na Avenida Atlântica"
              fill
              sizes="190px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent" />
            <p className="absolute bottom-4 left-4 right-4 text-xs font-semibold text-white/90">
              Casa nova · Jardim Pinheiros
            </p>
          </motion.div>

          <motion.div
            style={{ y: yPhone }}
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease }}
            className="absolute right-0 top-0 h-full w-[78%] max-w-[320px] sm:right-4"
          >
            <div className="relative h-full overflow-hidden rounded-[36px] bg-black p-[6px] shadow-[0_60px_120px_-30px_rgba(0,0,0,.8)] ring-1 ring-white/15">
              <div className="relative h-full overflow-hidden rounded-[30px]">
                <video
                  className="h-full w-full object-cover"
                  src="/videos/hero-loop.mp4"
                  poster="/imoveis/casa-av-das-torres-541/01.webp"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Vídeo da área externa com piscina de imóvel anunciado pela JG Corrêa"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 pt-16">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold">Venda ou aluguel · JG-001</p>
                  <p className="mt-1 text-[1.02rem] font-bold leading-snug">Casa com piscina e área gourmet</p>
                  <Link
                    href="/imoveis/casa-av-das-torres-541"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-2 text-xs font-bold backdrop-blur transition-colors hover:bg-white/25"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" /> Ver tour completo
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.9, ease }}
        className="container-x relative mt-12 lg:mt-14"
      >
        <SearchBar />
        <a
          href="#destaques"
          className="mx-auto mt-8 hidden w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white md:flex"
        >
          <ArrowDown className="h-4 w-4 animate-bounce" /> Imóveis em destaque
        </a>
      </motion.div>
    </section>
  );
}
