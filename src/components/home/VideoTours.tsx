"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { imoveisPublicados, localTexto } from "@/data/imoveis";
import { SectionHeading } from "../SectionHeading";
import { WhatsAppIcon } from "../icons";
import { mensagemImovel, whatsappLink } from "@/lib/whatsapp";

export function VideoTours() {
  const comVideo = imoveisPublicados().filter((i) => i.video?.src);
  const [ativo, setAtivo] = useState<string | null>(null);
  const trilho = useRef<HTMLUListElement>(null);
  const rolar = (d: number) => trilho.current?.scrollBy({ left: d * 320, behavior: "smooth" });

  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 text-white md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-royal/25 blur-[140px]" />
      <div className="container-x relative">
        <SectionHeading
          light
          eyebrow="Tour em vídeo"
          title={
            <>
              Conheça cada imóvel <em className="text-gold">por dentro</em>
            </>
          }
          text="Vídeos reais gravados pela JG Corrêa. Dê o play e percorra os ambientes antes mesmo de visitar."
          action={
            <div className="hidden gap-2 md:flex">
              <button onClick={() => rolar(-1)} aria-label="Vídeos anteriores" className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-white/20 hover:bg-white/10">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button onClick={() => rolar(1)} aria-label="Próximos vídeos" className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-white/20 hover:bg-white/10">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          }
        />
      </div>

      <ul
        ref={trilho}
        className="no-scrollbar relative mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:px-[max(32px,calc((100vw_-_1240px)/2_+_32px))] md:scroll-px-[max(32px,calc((100vw_-_1240px)/2_+_32px))] scroll-px-5"
      >
        {comVideo.map((i) => {
          const tocando = ativo === i.slug;
          return (
            <li key={i.slug} className="w-[78vw] max-w-[300px] shrink-0 snap-start">
              <div className="relative aspect-[9/16] overflow-hidden rounded-[28px] bg-black ring-1 ring-white/10">
                {tocando ? (
                  <video
                    src={i.video!.src}
                    poster={i.video!.poster}
                    className="h-full w-full object-cover"
                    controls
                    autoPlay
                    playsInline
                    onEnded={() => setAtivo(null)}
                  />
                ) : (
                  <button
                    onClick={() => setAtivo(i.slug)}
                    className="group absolute inset-0 text-left"
                    aria-label={`Assistir vídeo: ${i.titulo}`}
                  >
                    <Image
                      src={i.video!.poster ?? i.fotos[0].src}
                      alt=""
                      fill
                      sizes="300px"
                      className="origin-top scale-[1.16] object-cover object-top transition-transform duration-700 group-hover:scale-[1.2]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/10" />
                    <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/20 ring-1 ring-white/40 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy-950">
                      <Play className="ml-1 h-6 w-6 fill-current" />
                    </span>
                    <span className="absolute inset-x-0 bottom-0 p-5">
                      <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold">{i.codigo}</span>
                      <span className="mt-1 block font-bold leading-snug">{i.titulo}</span>
                      <span className="mt-1 block text-xs text-white/60">{localTexto(i)}</span>
                    </span>
                  </button>
                )}
              </div>
              <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
                <Link href={`/imoveis/${i.slug}`} className="btn btn-ghost-light !py-2.5 text-sm">
                  Ver anúncio
                </Link>
                <a
                  href={whatsappLink(mensagemImovel(i.titulo, i.codigo))}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp sobre ${i.codigo}`}
                  className="btn btn-whats !px-3.5 !py-2.5"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
