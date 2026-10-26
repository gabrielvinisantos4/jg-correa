import { MapPin } from "lucide-react";
import { enderecoCompleto, site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { ContactForm } from "../ContactForm";
import { InstagramIcon, WhatsAppIcon } from "../icons";
import { Reveal } from "../Reveal";

export function Contact() {
  const mapa = `https://www.google.com/maps?q=${encodeURIComponent(
    `${site.endereco.logradouro}, ${site.endereco.numero}, ${site.endereco.cidade} - ${site.endereco.uf}`
  )}&output=embed`;
  const rota = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoCompleto)}`;

  return (
    <section id="contato" className="bg-white py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-royal">
              <span className="h-px w-8 bg-royal" /> Contato
            </p>
            <h2 className="display mt-4 text-[2.3rem] font-medium text-navy-950 md:text-[3.1rem]">Vamos conversar?</h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">
              Fale com a JG Corrêa pelo WhatsApp, pelo Instagram ou envie sua mensagem pelo formulário.
            </p>
          </Reveal>

          <ul className="mt-8 grid gap-3">
            <Reveal as="li">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-3xl bg-paper p-5 ring-1 ring-line transition-all hover:ring-whats"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-whats text-white">
                  <WhatsAppIcon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] text-muted">WhatsApp</span>
                  <span className="block text-lg font-bold">{site.whatsapp.exibicao}</span>
                </span>
              </a>
            </Reveal>
            <Reveal as="li" delay={0.05}>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-3xl bg-paper p-5 ring-1 ring-line transition-all hover:ring-[#ee2a7b]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white">
                  <InstagramIcon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] text-muted">Instagram</span>
                  <span className="block text-lg font-bold">@{site.instagram.usuario}</span>
                </span>
              </a>
            </Reveal>
            <Reveal as="li" delay={0.1}>
              <a
                href={rota}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-3xl bg-paper p-5 ring-1 ring-line transition-all hover:ring-royal"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-royal text-white">
                  <MapPin className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] text-muted">Endereço</span>
                  <span className="block font-bold leading-snug">{enderecoCompleto}</span>
                </span>
              </a>
            </Reveal>
          </ul>

          <Reveal className="mt-4 overflow-hidden rounded-3xl ring-1 ring-line">
            <iframe
              src={mapa}
              title={`Mapa: ${enderecoCompleto}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[240px] w-full grayscale-[30%]"
            />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-[32px] bg-paper p-6 ring-1 ring-line md:p-10">
            <h3 className="text-xl font-bold">Envie sua mensagem</h3>
            <p className="mt-1 text-sm text-muted">Respondemos pelo telefone informado.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
