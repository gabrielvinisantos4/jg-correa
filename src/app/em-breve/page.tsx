import type { Metadata } from "next";
import { LogoMark } from "@/components/icons";

export const metadata: Metadata = {
  title: "Em breve",
  robots: { index: false, follow: false },
};

export default function EmBreve() {
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center overflow-hidden bg-navy-950 px-6 text-center text-white">
      <div className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-royal/35 blur-[140px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-gold/15 blur-[140px]" />
      <div className="relative">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/15">
          <LogoMark className="h-10 w-12 text-gold" />
        </span>
        <p className="eyebrow mt-8 text-gold">JG Corrêa · Construtora e Imobiliária</p>
        <h1 className="display mt-4 text-[2.6rem] font-medium md:text-[3.6rem]">Site em breve</h1>
        <p className="mx-auto mt-4 max-w-sm text-white/60">Estamos preparando uma nova experiência.</p>
      </div>
    </div>
  );
}
