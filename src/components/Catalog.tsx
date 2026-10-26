"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useMemo, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RotateCcw, SearchX, SlidersHorizontal } from "lucide-react";
import {
  bairros,
  faixasPreco,
  filtrarImoveis,
  imoveisPublicados,
  parseFaixa,
  tipoLabel,
  type Finalidade,
  type TipoImovel,
} from "@/data/imoveis";
import { PropertyCard } from "./PropertyCard";
import { WhatsAppIcon } from "./icons";
import { whatsappLink } from "@/lib/whatsapp";

const tipos = Object.entries(tipoLabel) as [TipoImovel, string][];

export function Catalog() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const finalidade = (params.get("finalidade") as Finalidade) || undefined;
  const tipo = (params.get("tipo") as TipoImovel) || undefined;
  const bairro = params.get("bairro") || undefined;
  const preco = params.get("preco") || "";
  const incluirSobConsulta = params.get("sobconsulta") !== "0";

  const lista = imoveisPublicados();
  const resultado = useMemo(
    () => filtrarImoveis(lista, { finalidade, tipo, bairro, incluirSobConsulta, ...parseFaixa(preco) }),
    [lista, finalidade, tipo, bairro, preco, incluirSobConsulta]
  );

  function set(key: string, value: string) {
    const p = new URLSearchParams(params.toString());
    if (value) p.set(key, value);
    else p.delete(key);
    startTransition(() => router.replace(`${pathname}${p.size ? `?${p}` : ""}`, { scroll: false }));
  }
  const limpar = () => startTransition(() => router.replace(pathname, { scroll: false }));
  const temFiltro = !!(finalidade || tipo || bairro || preco);

  const chip = (ativo: boolean) =>
    `rounded-full px-4 py-2 text-sm font-bold transition-all ${
      ativo ? "bg-navy-900 text-white" : "bg-white text-ink/75 ring-1 ring-line hover:ring-navy-900"
    }`;
  const select = "field !rounded-full !py-2.5 cursor-pointer text-sm font-semibold";

  return (
    <div id="resultados">
      <div className="sticky top-[76px] z-30 -mx-5 border-b border-line bg-paper/90 px-5 py-4 backdrop-blur-xl md:mx-0 md:rounded-[28px] md:border md:px-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1" role="group" aria-label="Finalidade">
            {[
              ["", "Todos"],
              ["venda", "Comprar"],
              ["aluguel", "Alugar"],
            ].map(([v, l]) => (
              <button key={v} type="button" onClick={() => set("finalidade", v)} className={chip((finalidade ?? "") === v)} aria-pressed={(finalidade ?? "") === v}>
                {l}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:ml-auto lg:flex">
            <label className="sr-only" htmlFor="c-tipo">Tipo</label>
            <select id="c-tipo" className={select} value={tipo ?? ""} onChange={(e) => set("tipo", e.target.value)}>
              <option value="">Todos os tipos</option>
              {tipos.map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
            <label className="sr-only" htmlFor="c-bairro">Bairro</label>
            <select id="c-bairro" className={select} value={bairro ?? ""} onChange={(e) => set("bairro", e.target.value)}>
              <option value="">Todos os bairros</option>
              {bairros().map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
            <label className="sr-only" htmlFor="c-preco">Faixa de preço</label>
            <select id="c-preco" className={`${select} col-span-2 sm:col-span-1`} value={preco} onChange={(e) => set("preco", e.target.value)}>
              {faixasPreco.map((f) => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
          </div>
        </div>
        {preco && (
          <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm font-semibold text-muted">
            <input
              type="checkbox"
              className="h-4 w-4 accent-[#0a1838]"
              checked={incluirSobConsulta}
              onChange={(e) => set("sobconsulta", e.target.checked ? "" : "0")}
            />
            Incluir imóveis com valor sob consulta
          </label>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-muted" aria-live="polite">
          <SlidersHorizontal className="h-4 w-4" />
          {pending ? "Atualizando…" : `${resultado.length} ${resultado.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}`}
        </p>
        {temFiltro && (
          <button onClick={limpar} className="flex items-center gap-1.5 text-sm font-bold text-royal hover:underline">
            <RotateCcw className="h-4 w-4" /> Limpar filtros
          </button>
        )}
      </div>

      {resultado.length > 0 ? (
        <motion.ul layout className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          <AnimatePresence mode="popLayout">
            {resultado.map((i, n) => (
              <motion.li
                layout
                key={i.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <PropertyCard imovel={i} priority={n < 3} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <div className="mt-6 flex flex-col items-center rounded-[32px] border border-dashed border-line bg-white px-6 py-16 text-center">
          <SearchX className="h-10 w-10 text-muted" />
          <p className="mt-4 text-lg font-bold">Nenhum imóvel publicado com esses filtros</p>
          <p className="mt-2 max-w-md text-muted">
            Novos imóveis chegam com frequência. Conte o que você procura e avisamos quando surgir uma opção.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(
                `Olá! Procuro ${tipo ? tipoLabel[tipo].toLowerCase() : "um imóvel"}${finalidade ? ` para ${finalidade === "venda" ? "comprar" : "alugar"}` : ""}${bairro ? ` no ${bairro}` : ""}. Vocês têm opções?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whats"
            >
              <WhatsAppIcon className="h-5 w-5" /> Avise-me pelo WhatsApp
            </a>
            <button onClick={limpar} className="btn btn-outline">
              Ver todos os imóveis
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
