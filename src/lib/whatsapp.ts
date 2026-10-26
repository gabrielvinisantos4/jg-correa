import { site } from "@/data/site";

/** Gera o link do WhatsApp com mensagem pré-preenchida. */
export function whatsappLink(mensagem: string = site.mensagens.geral) {
  return `https://wa.me/${site.whatsapp.numero}?text=${encodeURIComponent(mensagem)}`;
}

export function mensagemImovel(titulo: string, codigo: string) {
  return `Olá! Tenho interesse neste imóvel anunciado no site: ${titulo} (código ${codigo}).`;
}
