import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  text,
  light = false,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  light?: boolean;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <Reveal className="max-w-2xl">
        <p className={`eyebrow flex items-center gap-3 ${light ? "text-gold" : "text-royal"}`}>
          <span className={`h-px w-8 ${light ? "bg-gold" : "bg-royal"}`} />
          {eyebrow}
        </p>
        <h2 className={`display mt-4 text-[2.3rem] font-medium md:text-[3.2rem] ${light ? "text-white" : "text-navy-950"}`}>
          {title}
        </h2>
        {text && (
          <p className={`mt-4 max-w-xl text-[1.02rem] leading-relaxed ${light ? "text-white/65" : "text-muted"}`}>{text}</p>
        )}
      </Reveal>
      {action && <Reveal delay={0.1}>{action}</Reveal>}
    </div>
  );
}
