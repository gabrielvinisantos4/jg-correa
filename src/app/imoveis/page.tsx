import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalog } from "@/components/Catalog";

export const metadata: Metadata = {
  title: "Imóveis à venda e para alugar em Colorado – PR",
  description:
    "Casas e terrenos à venda e para alugar em Colorado – PR. Filtre por tipo, finalidade, bairro e faixa de preço e veja fotos e vídeos de cada imóvel.",
  alternates: { canonical: "/imoveis" },
};

export default function ImoveisPage() {
  return (
    <section className="pb-24 pt-[120px] md:pt-[140px]">
      <div className="container-x">
        <p className="eyebrow flex items-center gap-3 text-royal">
          <span className="h-px w-8 bg-royal" /> Catálogo
        </p>
        <h1 className="display mt-4 text-[2.6rem] font-medium text-navy-950 md:text-[3.8rem]">Imóveis disponíveis</h1>
        <p className="mt-3 max-w-xl text-muted">
          Use os filtros para encontrar casas e terrenos por finalidade, tipo, bairro e faixa de preço.
        </p>
        <div className="mt-10">
          <Suspense fallback={<div className="h-40 animate-pulse rounded-[28px] bg-white" />}>
            <Catalog />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
