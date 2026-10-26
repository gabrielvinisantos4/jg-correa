import type { Metadata } from "next";
import { enderecoCompleto, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Política de privacidade e tratamento de dados",
  alternates: { canonical: "/privacidade" },
};

export default function Privacidade() {
  return (
    <section className="pb-24 pt-[120px] md:pt-[140px]">
      <div className="container-x max-w-3xl">
        <p className="eyebrow text-royal">LGPD</p>
        <h1 className="display mt-4 text-[2.4rem] font-medium text-navy-950 md:text-[3.2rem]">
          Política de privacidade e tratamento de dados
        </h1>
        <div className="mt-8 space-y-5 text-[1.02rem] leading-relaxed text-ink/80 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink">
          <p>
            Esta política explica como a {site.nomeCompleto} ({site.creci}) trata os dados pessoais informados neste
            site, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
          </p>
          <h2>Quais dados coletamos</h2>
          <p>
            Apenas os dados que você informa voluntariamente no formulário de contato ou ao iniciar uma conversa pelo
            WhatsApp: nome, telefone, tipo de interesse e a mensagem enviada.
          </p>
          <h2>Para que usamos</h2>
          <p>
            Para responder ao seu contato, apresentar imóveis compatíveis com o seu interesse e dar andamento ao
            atendimento solicitado. Não vendemos nem compartilhamos seus dados para fins de publicidade de terceiros.
          </p>
          <h2>Serviços de terceiros</h2>
          <p>
            O site utiliza links para o WhatsApp e o Instagram e mapas do Google Maps. Ao utilizá-los, aplicam-se também
            as políticas de privacidade dessas plataformas.
          </p>
          <h2>Seus direitos</h2>
          <p>
            Você pode solicitar a qualquer momento acesso, correção ou exclusão dos seus dados pelo WhatsApp{" "}
            {site.whatsapp.exibicao} ou presencialmente em {enderecoCompleto}.
          </p>
        </div>
      </div>
    </section>
  );
}
