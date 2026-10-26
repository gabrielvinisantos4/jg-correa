"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "./icons";
import { whatsappLink } from "@/lib/whatsapp";

/** Botão flutuante em vidro fosco. Nas páginas de imóvel a barra fixa própria assume essa função no celular. */
export function WhatsAppFloat() {
  const pathname = usePathname();
  const isImovel = pathname.startsWith("/imoveis/");
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className={`glass-pill group fixed bottom-5 right-5 z-40 items-center gap-3 rounded-full p-1.5 pr-1.5 text-ink transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 active:scale-[0.97] sm:pr-5 ${
        isImovel ? "hidden md:flex" : "flex"
      }`}
    >
      <span className="whats-squircle h-11 w-11">
        <WhatsAppIcon className="h-6 w-6" />
      </span>
      <span className="hidden leading-tight sm:block">
        <span className="block text-[0.68rem] font-medium text-ink/55">Atendimento</span>
        <span className="block text-[0.92rem] font-semibold tracking-[-0.01em]">WhatsApp</span>
      </span>
    </a>
  );
}
