"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { bairros, faixasPreco, tipoLabel, type TipoImovel } from "@/data/imoveis";

const tipos = Object.entries(tipoLabel) as [TipoImovel, string][];

export function SearchBar() {
  const router = useRouter();
  const [finalidade, setFinalidade] = useState("");
  const [tipo, setTipo] = useState("");
  const [bairro, setBairro] = useState("");
  const [preco, setPreco] = useState("");
  const listaBairros = bairros();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const p = new URLSearchParams();
    if (finalidade) p.set("finalidade", finalidade);
    if (tipo) p.set("tipo", tipo);
    if (bairro) p.set("bairro", bairro);
    if (preco) p.set("preco", preco);
    router.push(`/imoveis${p.size ? `?${p}` : ""}#resultados`);
  }

  const label = "block text-[0.66rem] font-bold uppercase tracking-[0.16em] text-muted";
  const select =
    "mt-1 w-full cursor-pointer appearance-none bg-transparent pr-6 text-[0.98rem] font-semibold text-ink outline-none";

  return (
    <form
      onSubmit={submit}
      role="search"
      aria-label="Buscar imóveis"
      className="grid gap-1 rounded-[26px] bg-white p-2 shadow-[0_30px_80px_-30px_rgba(5,13,36,.55)] ring-1 ring-black/5 md:grid-cols-[auto_1fr_1fr_1fr_auto] md:items-center"
    >
      <div className="flex rounded-[20px] bg-paper p-1" role="radiogroup" aria-label="Finalidade">
        {[
          ["", "Todos"],
          ["venda", "Comprar"],
          ["aluguel", "Alugar"],
        ].map(([v, l]) => (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={finalidade === v}
            onClick={() => setFinalidade(v)}
            className={`flex-1 rounded-[16px] px-4 py-2.5 text-sm font-bold transition-all md:flex-none ${
              finalidade === v ? "bg-navy-900 text-white shadow" : "text-muted hover:text-ink"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <label className="relative rounded-2xl px-4 py-2.5 transition-colors hover:bg-paper md:border-l md:border-line md:rounded-none">
        <span className={label}>Tipo de imóvel</span>
        <select className={select} value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">Todos os tipos</option>
          {tipos.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
      </label>

      <label className="relative rounded-2xl px-4 py-2.5 transition-colors hover:bg-paper md:border-l md:border-line md:rounded-none">
        <span className={label}>Bairro · Colorado/PR</span>
        <select className={select} value={bairro} onChange={(e) => setBairro(e.target.value)}>
          <option value="">Todos os bairros</option>
          {listaBairros.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </label>

      <label className="relative rounded-2xl px-4 py-2.5 transition-colors hover:bg-paper md:border-l md:border-line md:rounded-none">
        <span className={label}>Faixa de preço</span>
        <select className={select} value={preco} onChange={(e) => setPreco(e.target.value)}>
          {faixasPreco.map((f) => (
            <option key={f.id} value={f.id}>
              {f.label}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" className="btn btn-gold m-1 !rounded-[20px] !py-4 md:!px-7">
        <Search className="h-5 w-5" /> Buscar
      </button>
    </form>
  );
}
