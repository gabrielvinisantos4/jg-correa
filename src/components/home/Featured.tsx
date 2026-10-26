import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { imoveisPublicados } from "@/data/imoveis";
import { PropertyCard } from "../PropertyCard";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

export function Featured() {
  const destaques = imoveisPublicados().filter((i) => i.destaque);
  return (
    <section id="destaques" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Imóveis em destaque"
          title={
            <>
              Oportunidades com <em className="text-royal">fotos e vídeo</em> de cada ambiente
            </>
          }
          text="Selecionamos alguns imóveis disponíveis. Abra cada anúncio para ver a galeria completa e o tour em vídeo."
          action={
            <Link href="/imoveis" className="btn btn-outline">
              Ver todos os imóveis <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {destaques.map((i, n) => (
            <Reveal as="li" key={i.slug} delay={(n % 3) * 0.08}>
              <PropertyCard imovel={i} priority={n < 3} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
