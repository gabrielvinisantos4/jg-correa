import Image from "next/image";
import { BadgeCheck, Hammer, KeyRound, MapPin } from "lucide-react";
import { enderecoCompleto, site } from "@/data/site";
import { Reveal } from "../Reveal";

const pilares = [
  { icon: Hammer, titulo: "Construtora", texto: "Atuação também na construção de imóveis." },
  { icon: KeyRound, titulo: "Imobiliária", texto: "Venda e locação de casas e terrenos." },
  { icon: BadgeCheck, titulo: site.creci, texto: "Imobiliária com registro no CRECI." },
];

export function About() {
  return (
    <section id="sobre" className="py-20 md:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[32px] bg-black shadow-[0_50px_100px_-50px_rgba(5,13,36,.8)]">
              <Image
                src="/marca/logo-jg-correa.webp"
                alt="Logotipo JG Corrêa Construtora e Imobiliária"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-contain p-6"
              />
            </div>
            {site.equipe.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-4">
                {site.equipe.map((p) => (
                  <li key={p.nome} className="flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5 ring-1 ring-line">
                    <span className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image src={p.foto} alt={p.nome} fill sizes="48px" className="object-cover" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold">{p.nome}</span>
                      <span className="block text-xs text-muted">{p.cargo}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="absolute -bottom-6 left-6 right-6 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-line sm:left-auto sm:right-[-12px] sm:w-[300px]">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-royal-soft text-royal">
                <MapPin className="h-5 w-5" />
              </span>
              <p className="text-[0.82rem] font-semibold leading-snug text-ink">{enderecoCompleto}</p>
            </div>
          </div>
        </Reveal>

        <div className="pt-6 lg:pt-0">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-royal">
              <span className="h-px w-8 bg-royal" /> Sobre a JG Corrêa
            </p>
            <h2 className="display mt-4 text-[2.3rem] font-medium text-navy-950 md:text-[3.1rem]">
              Mais do que encontrar um imóvel, <em className="text-royal">ajudar você a realizar planos.</em>
            </h2>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-muted">
              A JG Corrêa conecta pessoas a oportunidades imobiliárias, ajudando cada cliente a encontrar um imóvel
              alinhado aos seus objetivos. Conheça as opções disponíveis e conte com um atendimento próximo para
              esclarecer suas dúvidas.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {pilares.map((p, n) => (
              <Reveal as="li" key={p.titulo} delay={n * 0.08} className="rounded-3xl bg-white p-5 ring-1 ring-line">
                <p.icon className="h-6 w-6 text-gold-deep" />
                <p className="mt-4 font-bold text-ink">{p.titulo}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{p.texto}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
