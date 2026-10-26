"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BedDouble, Bath, Car, Ruler, ChevronLeft, ChevronRight, Play, MapPin, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { finalidadeLabel, localTexto, precoTexto, tipoLabel, type Imovel } from "@/data/imoveis";
import { mensagemImovel, whatsappLink } from "@/lib/whatsapp";

export function Specs({ i, light = false }: { i: Imovel; light?: boolean }) {
  const items = [
    i.quartos != null && { icon: BedDouble, label: `${i.quartos} ${i.quartos === 1 ? "quarto" : "quartos"}` },
    i.banheiros != null && { icon: Bath, label: `${i.banheiros} ${i.banheiros === 1 ? "banheiro" : "banheiros"}` },
    i.vagas != null && { icon: Car, label: `${i.vagas} ${i.vagas === 1 ? "vaga" : "vagas"}` },
    i.areaConstruida != null && { icon: Ruler, label: `${i.areaConstruida} m² const.` },
    i.areaTerreno != null && { icon: Ruler, label: `${i.areaTerreno} m² terreno` },
  ].filter(Boolean) as { icon: typeof Ruler; label: string }[];
  if (!items.length) return null;
  return (
    <ul className={`flex flex-wrap gap-x-4 gap-y-2 text-[0.85rem] font-semibold ${light ? "text-white/80" : "text-ink/75"}`}>
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-1.5">
          <Icon className={`h-4 w-4 ${light ? "text-gold" : "text-royal"}`} strokeWidth={2} /> {label}
        </li>
      ))}
    </ul>
  );
}

export function PropertyCard({ imovel: i, priority = false }: { imovel: Imovel; priority?: boolean }) {
  const fotos = i.fotos.slice(0, 5);
  const [idx, setIdx] = useState(0);
  const go = (d: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIdx((v) => (v + d + fotos.length) % fotos.length);
  };
  const href = `/imoveis/${i.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white ring-1 ring-line transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_80px_-40px_rgba(10,24,56,.45)]">
      <Link href={href} className="relative block aspect-[4/3.4] overflow-hidden bg-navy-900" aria-label={`Ver detalhes: ${i.titulo}`}>
        {fotos.map((f, n) => (
          <Image
            key={f.src}
            src={f.src}
            alt={`${i.titulo} — ${f.ambiente ?? "foto"}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            priority={priority && n === 0}
            className={`object-cover transition-all duration-700 ${n === idx ? "scale-100 opacity-100" : "scale-105 opacity-0"} group-hover:scale-[1.03]`}
          />
        ))}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {i.finalidades.map((f) => (
            <span
              key={f}
              className={`rounded-full px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.12em] ${
                f === "venda" ? "bg-gold text-navy-950" : "bg-royal text-white"
              }`}
            >
              {finalidadeLabel[f]}
            </span>
          ))}
          {i.etiqueta && !i.etiqueta.toLowerCase().includes("venda ou") && (
            <span className="rounded-full bg-white/90 px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-navy-900">
              {i.etiqueta}
            </span>
          )}
        </div>

        {i.video && (
          <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1 text-[0.7rem] font-bold text-white backdrop-blur">
            <Play className="h-3 w-3 fill-current" /> Vídeo
          </span>
        )}

        {fotos.length > 1 && (
          <>
            <button
              onClick={go(-1)}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink opacity-100 shadow transition-opacity md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={go(1)}
              aria-label="Próxima foto"
              className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink opacity-100 shadow transition-opacity md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
              {fotos.map((_, n) => (
                <span
                  key={n}
                  className={`h-1.5 rounded-full bg-white transition-all ${n === idx ? "w-5 opacity-100" : "w-1.5 opacity-60"}`}
                />
              ))}
            </div>
          </>
        )}
        <span className="absolute bottom-4 right-4 text-[0.7rem] font-bold tracking-wider text-white/85">{i.codigo}</span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-1.5 text-[0.8rem] font-semibold text-muted">
          <MapPin className="h-3.5 w-3.5" /> {tipoLabel[i.tipo]} · {localTexto(i)}
        </p>
        <h3 className="mt-2 text-[1.18rem] font-bold leading-snug text-ink">
          <Link href={href} className="hover:text-royal">
            {i.titulo}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.92rem] leading-relaxed text-muted">{i.resumo}</p>
        <div className="mt-4">
          <Specs i={i} />
        </div>
        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between border-t border-line pt-4">
            <p className="display text-[1.45rem] text-navy-900">{precoTexto(i)}</p>
          </div>
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Link href={href} className="btn btn-navy !py-3">
              Ver detalhes <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappLink(mensagemImovel(i.titulo, i.codigo))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Consultar ${i.codigo} pelo WhatsApp`}
              className="btn btn-whats !px-4 !py-3"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
