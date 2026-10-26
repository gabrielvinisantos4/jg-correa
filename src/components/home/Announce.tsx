import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { Reveal } from "../Reveal";
import { LogoMark } from "../icons";

export function Announce() {
  return (
    <section className="px-3 md:px-6">
      <Reveal>
        <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[36px] bg-gold text-navy-950">
          <LogoMark className="pointer-events-none absolute -right-16 -top-10 h-[360px] w-[480px] text-navy-950/[0.07]" />
          <div className="grid items-center gap-10 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-14 lg:p-20">
            <div className="relative">
              <p className="eyebrow">Para proprietários</p>
              <h2 className="display mt-4 text-[2.4rem] font-medium md:text-[3.4rem]">Quer vender ou alugar seu imóvel?</h2>
              <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-navy-950/75">
                Entre em contato com a JG Corrêa e apresente seu imóvel para conversarmos sobre as possibilidades de
                divulgação.
              </p>
              <a
                href={whatsappLink(site.mensagens.anunciar)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-navy mt-8 !px-7 !py-4"
              >
                Quero anunciar meu imóvel <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="relative hidden h-[300px] md:block">
              <div className="absolute right-0 top-0 h-[240px] w-[64%] rotate-3 overflow-hidden rounded-3xl shadow-2xl">
                <Image src="/imoveis/casa-rua-otacilio-cardoso-06/01.webp" alt="Imóvel com placa de venda da JG Corrêa" fill sizes="300px" className="object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 h-[200px] w-[56%] -rotate-3 overflow-hidden rounded-3xl shadow-2xl ring-4 ring-gold">
                <Image src="/imoveis/lote-rua-benedito-francelino/01.webp" alt="Lote com placa de venda da JG Corrêa" fill sizes="260px" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
