import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, Hash, MapPin, Ruler } from "lucide-react";
import {
  enderecoTexto,
  finalidadeLabel,
  getImovel,
  imoveisPublicados,
  precoTexto,
  semelhantes,
  tipoLabel,
} from "@/data/imoveis";
import { site } from "@/data/site";
import { Gallery } from "@/components/Gallery";
import { PropertyCard, Specs } from "@/components/PropertyCard";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { mensagemImovel, whatsappLink } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return imoveisPublicados().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const i = getImovel(slug);
  if (!i) return {};
  const desc = `${i.resumo} ${enderecoTexto(i)}. ${precoTexto(i)}.`;
  return {
    title: `${i.titulo} (${i.codigo})`,
    description: desc,
    alternates: { canonical: `/imoveis/${i.slug}` },
    openGraph: {
      title: i.titulo,
      description: desc,
      images: [{ url: i.fotos[0].src, alt: i.titulo }],
    },
  };
}

export default async function ImovelPage({ params }: Props) {
  const { slug } = await params;
  const i = getImovel(slug);
  if (!i) notFound();

  const linkWhats = whatsappLink(mensagemImovel(i.titulo, i.codigo));
  const similares = semelhantes(i);
  const mapa = `https://www.google.com/maps?q=${encodeURIComponent(
    `${i.endereco.logradouro}${i.endereco.numero ? `, ${i.endereco.numero}` : ""}, ${i.endereco.bairro}, ${i.endereco.cidade} - ${i.endereco.uf}`
  )}&output=embed`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: i.titulo,
    description: i.descricao.join(" "),
    url: `${site.url}/imoveis/${i.slug}`,
    image: i.fotos.slice(0, 6).map((f) => `${site.url}${f.src}`),
    identifier: i.codigo,
    ...(i.preco?.venda || i.preco?.aluguel
      ? { offers: { "@type": "Offer", price: i.preco.venda ?? i.preco.aluguel, priceCurrency: "BRL" } }
      : {}),
    contentLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: `${i.endereco.logradouro}${i.endereco.numero ? `, ${i.endereco.numero}` : ""}`,
        addressLocality: i.endereco.cidade,
        addressRegion: i.endereco.uf,
        addressCountry: "BR",
      },
    },
  };

  const ficha = [
    ["Código", i.codigo],
    ["Tipo", tipoLabel[i.tipo]],
    ["Finalidade", i.finalidades.map((f) => finalidadeLabel[f]).join(" e ")],
    i.quartos != null && ["Quartos", String(i.quartos)],
    i.suites != null && ["Suítes", String(i.suites)],
    i.banheiros != null && ["Banheiros", String(i.banheiros)],
    i.vagas != null && ["Vagas", String(i.vagas)],
    i.areaConstruida != null && ["Área construída", `${i.areaConstruida} m²`],
    i.areaTerreno != null && ["Área do terreno", `${i.areaTerreno} m²`],
    i.medidas && ["Medidas", i.medidas],
    ["Bairro", i.endereco.bairro],
  ].filter(Boolean) as [string, string][];

  return (
    <>
      <article className="pb-28 pt-[96px] md:pb-24 md:pt-[110px]">
        <div className="container-x">
          <nav aria-label="Navegação estrutural" className="flex items-center gap-1.5 text-xs font-semibold text-muted">
            <Link href="/" className="hover:text-ink">Início</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/imoveis" className="hover:text-ink">Imóveis</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="truncate text-ink">{i.codigo}</span>
          </nav>

          <header className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2">
                {i.finalidades.map((f) => (
                  <span key={f} className={`rounded-full px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.12em] ${f === "venda" ? "bg-gold text-navy-950" : "bg-royal text-white"}`}>
                    {finalidadeLabel[f]}
                  </span>
                ))}
                <span className="rounded-full bg-white px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-navy-900 ring-1 ring-line">
                  {tipoLabel[i.tipo]}
                </span>
              </div>
              <h1 className="display mt-4 text-[2.1rem] font-medium text-navy-950 md:text-[3.2rem]">{i.titulo}</h1>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.95rem] text-muted">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-royal" /> {enderecoTexto(i)}</span>
                <span className="flex items-center gap-1.5"><Hash className="h-4 w-4 text-royal" /> Código {i.codigo}</span>
              </p>
            </div>
            <div className="hidden text-right md:block">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Valor</p>
              <p className="display mt-1 text-[2.2rem] text-navy-900">{precoTexto(i)}</p>
            </div>
          </header>

          <div className="mt-8">
            <Gallery fotos={i.fotos} video={i.video} titulo={i.titulo} />
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
            <div className="min-w-0">
              <Reveal>
                <div className="rounded-[28px] bg-white p-6 ring-1 ring-line md:p-8">
                  <Specs i={i} />
                  <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 sm:grid-cols-3">
                    {ficha.map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">{k}</dt>
                        <dd className="mt-1 font-bold text-ink">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>

              <Reveal className="mt-12">
                <h2 className="display text-[1.9rem] font-medium text-navy-950">Sobre o imóvel</h2>
                <div className="mt-4 space-y-4 text-[1.04rem] leading-relaxed text-ink/80">
                  {i.descricao.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>

              {i.caracteristicas.length > 0 && (
                <Reveal className="mt-12">
                  <h2 className="display text-[1.9rem] font-medium text-navy-950">Características e diferenciais</h2>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {i.caracteristicas.map((c) => (
                      <li key={c} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 font-semibold ring-1 ring-line">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-soft text-gold-deep">
                          <Check className="h-4 w-4" strokeWidth={3} />
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {i.video?.src && (
                <Reveal className="mt-12">
                  <h2 className="display text-[1.9rem] font-medium text-navy-950">Vídeo de apresentação</h2>
                  <div className="mt-5 grid items-center gap-6 rounded-[28px] bg-navy-950 p-4 text-white sm:grid-cols-[minmax(0,300px)_1fr] sm:p-6">
                    <video
                      src={i.video.src}
                      poster={i.video.poster}
                      controls
                      playsInline
                      preload="none"
                      className="aspect-[9/16] w-full rounded-2xl bg-black object-cover"
                    />
                    <div className="px-2 pb-2 sm:px-0">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Tour completo</p>
                      <p className="mt-2 text-xl font-bold leading-snug">Percorra todos os ambientes em vídeo</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/65">
                        Gostou? Agende uma visita ou tire suas dúvidas diretamente com um corretor.
                      </p>
                      <a href={linkWhats} target="_blank" rel="noopener noreferrer" className="btn btn-whats mt-5">
                        <WhatsAppIcon className="h-5 w-5" /> Quero visitar
                      </a>
                    </div>
                  </div>
                </Reveal>
              )}
              {i.video?.youtubeId && !i.video.src && (
                <Reveal className="mt-12">
                  <h2 className="display text-[1.9rem] font-medium text-navy-950">Vídeo de apresentação</h2>
                  <iframe
                    className="mt-5 aspect-video w-full rounded-[28px]"
                    src={`https://www.youtube-nocookie.com/embed/${i.video.youtubeId}`}
                    title={`Vídeo: ${i.titulo}`}
                    loading="lazy"
                    allowFullScreen
                  />
                </Reveal>
              )}

              {i.endereco.exibirMapa && (
                <Reveal className="mt-12">
                  <h2 className="display text-[1.9rem] font-medium text-navy-950">Localização</h2>
                  <p className="mt-2 flex items-center gap-2 text-muted"><MapPin className="h-4 w-4" /> {enderecoTexto(i)}</p>
                  <iframe
                    src={mapa}
                    title={`Mapa: ${enderecoTexto(i)}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="mt-5 h-[320px] w-full rounded-[28px] ring-1 ring-line"
                  />
                </Reveal>
              )}
            </div>

            <aside className="lg:sticky lg:top-[100px] lg:self-start">
              <div className="rounded-[28px] bg-white p-6 shadow-[0_30px_80px_-50px_rgba(10,24,56,.6)] ring-1 ring-line md:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Valor</p>
                <p className="display mt-1 text-[2rem] text-navy-900">{precoTexto(i)}</p>
                {i.areaTerreno && (
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted"><Ruler className="h-4 w-4" /> {i.areaTerreno} m² {i.medidas ? `· ${i.medidas}` : ""}</p>
                )}
                <a href={linkWhats} target="_blank" rel="noopener noreferrer" className="btn btn-whats mt-5 w-full !py-4">
                  <WhatsAppIcon className="h-5 w-5" /> Consultar pelo WhatsApp
                </a>
                <div className="my-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                  <span className="h-px flex-1 bg-line" /> ou deixe seu contato <span className="h-px flex-1 bg-line" />
                </div>
                <ContactForm compact imovel={{ titulo: i.titulo, codigo: i.codigo }} />
              </div>
            </aside>
          </div>

          {similares.length > 0 && (
            <section className="mt-24">
              <h2 className="display text-[2rem] font-medium text-navy-950 md:text-[2.6rem]">Imóveis semelhantes</h2>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {similares.map((s, n) => (
                  <Reveal as="li" key={s.slug} delay={n * 0.08}>
                    <PropertyCard imovel={s} />
                  </Reveal>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>

      {/* Barra fixa no celular */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-5 py-3 backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-muted">{i.codigo}</p>
            <p className="truncate font-bold text-navy-900">{precoTexto(i)}</p>
          </div>
          <a href={linkWhats} target="_blank" rel="noopener noreferrer" className="btn btn-whats !py-3">
            <WhatsAppIcon className="h-5 w-5" /> WhatsApp
          </a>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
