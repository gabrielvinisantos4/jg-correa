"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Grid2X2, Play, X } from "lucide-react";
import type { Foto, Video } from "@/data/imoveis";

type Item = { kind: "foto"; foto: Foto } | { kind: "video"; video: Video };

const fallbackThumb = (itens: Item[]) => {
  const f = itens.find((i) => i.kind === "foto");
  return f && f.kind === "foto" ? f.foto.src : "/og-image.jpg";
};

export function Gallery({ fotos, video, titulo }: { fotos: Foto[]; video?: Video; titulo: string }) {
  const itens: Item[] = [
    ...fotos.map((foto) => ({ kind: "foto" as const, foto })),
    ...(video ? [{ kind: "video" as const, video }] : []),
  ];
  const videoIndex = video ? itens.length - 1 : -1;
  const [aberto, setAberto] = useState<number | null>(null);
  const [mobileIdx, setMobileIdx] = useState(0);
  const trilho = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = trilho.current;
    if (!el) return;
    setMobileIdx(Math.round(el.scrollLeft / el.clientWidth));
  };

  const thumbs = fotos.slice(1, 5);

  return (
    <>
      {/* Mobile: carrossel com swipe */}
      <div className="relative -mx-5 md:hidden">
        <div ref={trilho} onScroll={onScroll} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto">
          {fotos.map((f, n) => (
            <button key={f.src} onClick={() => setAberto(n)} className="relative aspect-[4/5] w-full shrink-0 snap-center" aria-label={`Ampliar foto ${n + 1}: ${f.ambiente}`}>
              <Image src={f.src} alt={`${titulo} — ${f.ambiente}`} fill sizes="100vw" priority={n === 0} className="object-cover" />
            </button>
          ))}
        </div>
        <span className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur">
          {mobileIdx + 1} / {fotos.length}
        </span>
        {video && (
          <button
            onClick={() => setAberto(videoIndex)}
            className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-navy-950 shadow-lg"
          >
            <Play className="h-4 w-4 fill-current" /> Assistir vídeo
          </button>
        )}
      </div>

      {/* Desktop: mosaico */}
      <div className="hidden h-[560px] grid-cols-4 grid-rows-2 gap-3 overflow-hidden rounded-[32px] md:grid">
        <button onClick={() => setAberto(0)} className="group relative col-span-2 row-span-2 overflow-hidden bg-navy-900" aria-label="Ampliar foto principal">
          <Image src={fotos[0].src} alt={`${titulo} — ${fotos[0].ambiente}`} fill priority sizes="50vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
        </button>
        {thumbs.map((f, n) => {
          const idx = n + 1;
          const ultimo = n === thumbs.length - 1;
          return (
            <button key={f.src} onClick={() => setAberto(idx)} className="group relative overflow-hidden bg-navy-900" aria-label={`Ampliar foto: ${f.ambiente}`}>
              <Image src={f.src} alt={`${titulo} — ${f.ambiente}`} fill sizes="25vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
              {ultimo && fotos.length > 5 && (
                <span className="absolute inset-0 grid place-items-center bg-navy-950/55 text-white backdrop-blur-[2px]">
                  <span className="flex items-center gap-2 font-bold">
                    <Grid2X2 className="h-5 w-5" /> +{fotos.length - 5} fotos
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-4 hidden gap-3 md:flex">
        <button onClick={() => setAberto(0)} className="btn btn-outline !py-2.5 text-sm">
          <Grid2X2 className="h-4 w-4" /> Ver todas as {fotos.length} fotos
        </button>
        {video && (
          <button onClick={() => setAberto(videoIndex)} className="btn btn-navy !py-2.5 text-sm">
            <Play className="h-4 w-4 fill-current" /> Assistir vídeo do imóvel
          </button>
        )}
      </div>

      <AnimatePresence>
        {aberto !== null && <Lightbox itens={itens} inicio={aberto} titulo={titulo} onClose={() => setAberto(null)} />}
      </AnimatePresence>
    </>
  );
}

function Lightbox({ itens, inicio, titulo, onClose }: { itens: Item[]; inicio: number; titulo: string; onClose: () => void }) {
  const [idx, setIdx] = useState(inicio);
  const [dir, setDir] = useState(0);
  const go = useCallback(
    (d: number) => {
      setDir(d);
      setIdx((v) => (v + d + itens.length) % itens.length);
    },
    [itens.length]
  );
  const thumbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [go, onClose]);

  useEffect(() => {
    thumbsRef.current?.querySelector(`[data-i="${idx}"]`)?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [idx]);

  const atual = itens[idx];

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col bg-navy-950/97 text-white backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Galeria: ${titulo}`}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        <p className="text-sm font-semibold text-white/70">
          {idx + 1} / {itens.length} · {atual.kind === "foto" ? atual.foto.ambiente : "Vídeo do imóvel"}
        </p>
        <button onClick={onClose} aria-label="Fechar galeria" className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10">
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={idx}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            drag={atual.kind === "foto" ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            className="absolute inset-0 flex items-center justify-center px-2 md:px-20"
          >
            {atual.kind === "foto" ? (
              <div className="relative h-full w-full">
                <Image src={atual.foto.src} alt={`${titulo} — ${atual.foto.ambiente}`} fill sizes="100vw" className="pointer-events-none select-none object-contain" />
              </div>
            ) : atual.video.youtubeId ? (
              <iframe
                className="aspect-[9/16] h-full max-h-full rounded-2xl"
                src={`https://www.youtube-nocookie.com/embed/${atual.video.youtubeId}`}
                title={`Vídeo: ${titulo}`}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video src={atual.video.src} poster={atual.video.poster} controls autoPlay playsInline className="max-h-full max-w-full rounded-2xl bg-black" />
            )}
          </motion.div>
        </AnimatePresence>

        <button onClick={() => go(-1)} aria-label="Anterior" className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 md:grid">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button onClick={() => go(1)} aria-label="Próxima" className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 md:grid">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div ref={thumbsRef} className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-4 md:justify-center md:px-8">
        {itens.map((it, n) => (
          <button
            key={n}
            data-i={n}
            onClick={() => {
              setDir(n > idx ? 1 : -1);
              setIdx(n);
            }}
            aria-label={it.kind === "foto" ? `Foto ${n + 1}` : "Vídeo"}
            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl transition-all ${n === idx ? "ring-2 ring-gold" : "opacity-50 hover:opacity-90"}`}
          >
            <Image
              src={it.kind === "foto" ? it.foto.src : (it.video.poster ?? fallbackThumb(itens))}
              alt=""
              fill
              sizes="64px"
              className="object-cover"
            />
            {it.kind === "video" && (
              <span className="absolute inset-0 grid place-items-center bg-black/40">
                <Play className="h-5 w-5 fill-white" />
              </span>
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
