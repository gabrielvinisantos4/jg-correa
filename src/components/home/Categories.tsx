import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2, Store, Trees, TrendingUp } from "lucide-react";
import { imoveisPublicados, type TipoImovel } from "@/data/imoveis";
import { whatsappLink } from "@/lib/whatsapp";
import { site } from "@/data/site";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

type Cat = {
  nome: string;
  tipo?: TipoImovel;
  href: string;
  img?: string;
  icon?: typeof Store;
  /** Categorias sem filtro de tipo (ex.: investimento) contam pelo seletor */
  conta?: () => number;
};

const categorias: Cat[] = [
  { nome: "Casas", tipo: "casa", href: "/imoveis?tipo=casa", img: "/imoveis/casa-av-das-torres-541/15.webp" },
  { nome: "Terrenos e lotes", tipo: "terreno", href: "/imoveis?tipo=terreno", img: "/imoveis/lote-rua-benedito-francelino/02.webp" },
  { nome: "Apartamentos", tipo: "apartamento", href: "/imoveis?tipo=apartamento", icon: Building2 },
  { nome: "Imóveis comerciais", tipo: "comercial", href: "/imoveis?tipo=comercial", icon: Store },
  { nome: "Chácaras e sítios", tipo: "rural", href: "/imoveis?tipo=rural", icon: Trees },
  { nome: "Oportunidades de investimento", href: "/imoveis", icon: TrendingUp, conta: () => 0 },
];

export function Categories() {
  const lista = imoveisPublicados();
  const comContagem = categorias.map((c) => ({
    ...c,
    total: c.conta ? c.conta() : lista.filter((i) => i.tipo === c.tipo).length,
  }));
  const ativas = comContagem.filter((c) => c.total > 0);
  const embreve = comContagem.filter((c) => c.total === 0);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Categorias" title="O que você está procurando?" />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {ativas.map((c, n) => (
            <Reveal key={c.nome} delay={n * 0.08}>
              <Link
                href={c.href}
                className="group relative block aspect-[16/11] overflow-hidden rounded-[28px] bg-navy-900 md:aspect-[16/10]"
              >
                {c.img && (
                  <Image
                    src={c.img}
                    alt={c.nome}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-85 transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7 text-white md:p-9">
                  <div>
                    <p className="text-sm font-semibold text-gold">
                      {c.total} {c.total === 1 ? "imóvel disponível" : "imóveis disponíveis"}
                    </p>
                    <h3 className="display mt-1 text-[2rem] md:text-[2.5rem]">{c.nome}</h3>
                  </div>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-navy-950 transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {embreve.length > 0 && (
          <Reveal className="mt-5">
            <div className="rounded-[28px] border border-dashed border-line bg-paper p-6 md:p-8">
              <p className="text-sm font-semibold text-muted">
                Ainda sem anúncios publicados no site — consulte a disponibilidade pelo WhatsApp:
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {embreve.map((c) => {
                  const Icon = c.icon ?? Building2;
                  return (
                    <li key={c.nome}>
                      <a
                        href={whatsappLink(`${site.mensagens.sobConsulta} ${c.nome}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-[0.92rem] font-semibold text-ink ring-1 ring-line transition-all hover:ring-navy-900"
                      >
                        <Icon className="h-5 w-5 text-royal" /> {c.nome}
                        <ArrowUpRight className="ml-auto h-4 w-4 text-muted" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
