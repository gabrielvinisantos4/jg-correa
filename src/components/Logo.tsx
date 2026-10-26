import Link from "next/link";
import { LogoMark } from "./icons";

export function Logo({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) {
  const text = tone === "light" ? "text-white" : "text-navy-900";
  const sub = tone === "light" ? "text-white/60" : "text-muted";
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="JG Corrêa — página inicial">
      <span
        className={`grid h-11 w-11 place-items-center rounded-xl ${
          tone === "light" ? "bg-white/5 ring-1 ring-white/15" : "bg-navy-900"
        } transition-transform duration-500 group-hover:-rotate-3`}
      >
        <LogoMark className="h-7 w-8 text-gold" />
      </span>
      <span className="leading-none">
        <span className={`block text-[1.05rem] font-extrabold tracking-[0.04em] ${text}`}>JG CORRÊA</span>
        {!compact && (
          <span className={`mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.2em] ${sub}`}>
            Construtora e Imobiliária
          </span>
        )}
      </span>
    </Link>
  );
}
