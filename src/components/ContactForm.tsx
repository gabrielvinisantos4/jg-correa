"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * Envio do formulário:
 * - Se NEXT_PUBLIC_FORM_ENDPOINT estiver configurado (ex.: Formspree), os dados são enviados por POST.
 * - Sem endpoint, o formulário abre o WhatsApp da imobiliária com a mensagem montada
 *   (funcionamento real, sem backend). Veja README.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

const interesses = ["Comprar um imóvel", "Alugar um imóvel", "Anunciar meu imóvel", "Terrenos e lotes", "Outro assunto"];

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
}

type Status = { tipo: "idle" | "enviando" | "ok" | "whats" | "erro"; msg?: string };

export function ContactForm({ imovel, compact = false }: { imovel?: { titulo: string; codigo: string }; compact?: boolean }) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [interesse, setInteresse] = useState(imovel ? "Comprar um imóvel" : interesses[0]);
  const [mensagem, setMensagem] = useState(
    imovel ? `Tenho interesse no imóvel ${imovel.titulo} (código ${imovel.codigo}). Gostaria de mais informações.` : ""
  );
  const [status, setStatus] = useState<Status>({ tipo: "idle" });
  const [erros, setErros] = useState<Record<string, string>>({});

  function validar() {
    const e: Record<string, string> = {};
    if (nome.trim().length < 2) e.nome = "Informe seu nome.";
    if (telefone.replace(/\D/g, "").length < 10) e.telefone = "Informe um telefone com DDD.";
    setErros(e);
    return Object.keys(e).length === 0;
  }

  const textoWhats = () =>
    [
      `Olá! Meu nome é ${nome.trim()}.`,
      `Interesse: ${interesse}.`,
      imovel ? `Imóvel: ${imovel.titulo} (${imovel.codigo}).` : "",
      mensagem.trim() ? `Mensagem: ${mensagem.trim()}` : "",
      `Telefone: ${telefone}`,
      "(enviado pelo site)",
    ]
      .filter(Boolean)
      .join("\n");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validar()) return;

    if (!ENDPOINT) {
      window.open(whatsappLink(textoWhats()), "_blank", "noopener,noreferrer");
      setStatus({ tipo: "whats", msg: "Abrimos o WhatsApp com sua mensagem pronta. É só tocar em enviar." });
      return;
    }

    setStatus({ tipo: "enviando" });
    try {
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ nome, telefone, interesse, mensagem, imovel: imovel?.codigo ?? "" }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setStatus({ tipo: "ok", msg: "Mensagem enviada! Em breve entraremos em contato." });
      setNome("");
      setTelefone("");
      setMensagem("");
    } catch {
      setStatus({ tipo: "erro", msg: "Não foi possível enviar agora. Tente pelo WhatsApp." });
    }
  }

  const label = "mb-1.5 block text-[0.8rem] font-bold text-ink";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label htmlFor="f-nome" className={label}>
            Nome
          </label>
          <input
            id="f-nome"
            className="field"
            autoComplete="name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            aria-invalid={!!erros.nome}
            aria-describedby={erros.nome ? "e-nome" : undefined}
            placeholder="Seu nome"
          />
          {erros.nome && (
            <p id="e-nome" className="mt-1 text-xs font-semibold text-red-600">
              {erros.nome}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="f-tel" className={label}>
            Telefone / WhatsApp
          </label>
          <input
            id="f-tel"
            className="field"
            inputMode="tel"
            autoComplete="tel"
            value={telefone}
            onChange={(e) => setTelefone(maskPhone(e.target.value))}
            aria-invalid={!!erros.telefone}
            aria-describedby={erros.telefone ? "e-tel" : undefined}
            placeholder="(44) 90000-0000"
          />
          {erros.telefone && (
            <p id="e-tel" className="mt-1 text-xs font-semibold text-red-600">
              {erros.telefone}
            </p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="f-int" className={label}>
          Tipo de interesse
        </label>
        <select id="f-int" className="field cursor-pointer" value={interesse} onChange={(e) => setInteresse(e.target.value)}>
          {interesses.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="f-msg" className={label}>
          Mensagem
        </label>
        <textarea
          id="f-msg"
          rows={compact ? 3 : 4}
          className="field resize-none"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Conte o que você procura"
        />
      </div>

      <button type="submit" disabled={status.tipo === "enviando"} className={`btn ${ENDPOINT ? "btn-navy" : "btn-whats"} !py-4 disabled:opacity-60`}>
        {status.tipo === "enviando" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Enviando…
          </>
        ) : ENDPOINT ? (
          <>
            <Send className="h-4 w-4" /> Enviar mensagem
          </>
        ) : (
          <>
            <WhatsAppIcon className="h-5 w-5" /> Enviar pelo WhatsApp
          </>
        )}
      </button>

      <div aria-live="polite">
        {(status.tipo === "ok" || status.tipo === "whats") && (
          <p className="flex items-start gap-2 rounded-2xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> {status.msg}
          </p>
        )}
        {status.tipo === "erro" && (
          <p className="flex items-start gap-2 rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {status.msg}{" "}
            <a className="underline" href={whatsappLink(textoWhats())} target="_blank" rel="noopener noreferrer">
              Abrir WhatsApp
            </a>
          </p>
        )}
      </div>
      <p className="text-xs leading-relaxed text-muted">
        Ao enviar, você concorda com o uso dos seus dados apenas para retorno do contato, conforme nossa{" "}
        <a href="/privacidade" className="underline">
          política de privacidade
        </a>
        .
      </p>
    </form>
  );
}
