"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "./icons";
import { whatsappLink } from "@/lib/whatsapp";

/** Botão flutuante. Nas páginas de imóvel a barra fixa própria assume essa função no celular. */
export function WhatsAppFloat() {
  const pathname = usePathname();
  const isImovel = pathname.startsWith("/imoveis/");
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className={`group fixed bottom-5 right-5 z-40 items-center gap-2 rounded-full bg-whats py-3.5 pl-3.5 pr-3.5 text-white shadow-[0_18px_40px_-12px_rgba(31,174,91,.65)] transition-all duration-300 hover:pr-5 ${
        isImovel ? "hidden md:flex" : "flex"
      }`}
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-whats/40 [animation-duration:2.6s]" />
      <WhatsAppIcon className="h-7 w-7" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 group-hover:max-w-[160px]">
        Fale conosco
      </span>
    </a>
  );
}
