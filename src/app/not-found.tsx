import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-5 pt-[100px] text-center">
      <div>
        <p className="eyebrow text-royal">Erro 404</p>
        <h1 className="display mt-4 text-[2.6rem] font-medium text-navy-950">Página não encontrada</h1>
        <p className="mt-3 text-muted">Este imóvel pode ter sido vendido ou removido do site.</p>
        <Link href="/imoveis" className="btn btn-navy mt-8">
          Ver imóveis disponíveis
        </Link>
      </div>
    </section>
  );
}
