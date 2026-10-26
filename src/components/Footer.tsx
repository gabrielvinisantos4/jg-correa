import Link from "next/link";
import { MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { navLinks } from "@/data/nav";
import { enderecoCompleto, site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

export function Footer() {
  const ano = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-royal/25 blur-[120px]" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/60">
            Casas, terrenos e oportunidades imobiliárias em {site.endereco.cidade} – {site.endereco.uf}.
          </p>
          <p className="mt-6 inline-flex items-center rounded-full border border-gold/30 px-3 py-1 text-xs font-bold tracking-[0.18em] text-gold">
            {site.creci}
          </p>
        </div>

        <div>
          <p className="eyebrow text-white/40">Navegação</p>
          <ul className="mt-5 space-y-3">
            {navLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-white/75 transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/imoveis" className="text-white/75 transition-colors hover:text-gold">
                Todos os imóveis
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-white/40">Contato</p>
          <ul className="mt-5 space-y-4 text-white/75">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-gold"
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" /> {site.whatsapp.exibicao}
              </a>
            </li>
            <li>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-gold"
              >
                <InstagramIcon className="h-5 w-5 shrink-0" /> @{site.instagram.usuario}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0" /> {enderecoCompleto}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 pb-28 pt-6 md:pb-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {ano} {site.nomeCompleto} · {site.creci}. Todos os direitos reservados.
          </p>
          <Link href="/privacidade" className="transition-colors hover:text-white">
            Política de privacidade e tratamento de dados
          </Link>
        </div>
      </div>
    </footer>
  );
}
