import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { InstagramIcon } from "../icons";
import { Reveal } from "../Reveal";

/**
 * Sem API do Instagram: mostramos fotos reais dos imóveis divulgados no perfil
 * e direcionamos para o perfil oficial. Para incorporar posts específicos,
 * preencha `site.instagramPosts` (veja README).
 */
const mosaico = [
  "/imoveis/casa-av-das-torres-541/16.webp",
  "/imoveis/casa-av-atlantica-590/08.webp",
  "/imoveis/casa-rua-otacilio-cardoso-06/05.webp",
  "/imoveis/casa-av-das-torres-541/06.webp",
  "/imoveis/casa-av-atlantica-580/03.webp",
  "/imoveis/casa-av-das-torres-541/09.webp",
];

export function InstagramBand() {
  const posts = site.instagramPosts;
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white">
              <InstagramIcon className="h-7 w-7" />
            </span>
            <h2 className="display mt-6 text-[2.2rem] font-medium text-navy-950 md:text-[2.9rem]">
              Acompanhe os lançamentos no Instagram
            </h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">
              Novos imóveis, vídeos e oportunidades são publicados primeiro em{" "}
              <strong className="text-ink">@{site.instagram.usuario}</strong>.
            </p>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-navy mt-8">
              Siga no Instagram <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>

          {posts.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2">
              {posts.map((url) => (
                <li key={url} className="overflow-hidden rounded-3xl bg-white ring-1 ring-line">
                  <iframe
                    src={`${url.replace(/\/$/, "")}/embed`}
                    title="Publicação do Instagram"
                    loading="lazy"
                    className="h-[560px] w-full"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid grid-cols-3 gap-2 sm:gap-3">
              {mosaico.map((src, n) => (
                <Reveal as="li" key={src} delay={n * 0.05}>
                  <a
                    href={site.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-square overflow-hidden rounded-2xl bg-navy-900"
                    aria-label="Abrir o Instagram da JG Corrêa"
                  >
                    <Image src={src} alt="" fill sizes="(max-width: 768px) 33vw, 240px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <span className="absolute inset-0 grid place-items-center bg-navy-950/0 text-white opacity-0 transition-all group-hover:bg-navy-950/40 group-hover:opacity-100">
                      <InstagramIcon className="h-7 w-7" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
