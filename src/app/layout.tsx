import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/manrope";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { site } from "@/data/site";

const descricao =
  "Casas, terrenos e oportunidades imobiliárias em Colorado – PR. Veja fotos e vídeos dos imóveis à venda e para alugar e fale com a JG Corrêa pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nomeCompleto} | Imóveis em Colorado – PR`,
    template: `%s | ${site.nome} Imobiliária`,
  },
  description: descricao,
  keywords: [
    "imobiliária Colorado PR",
    "casas à venda Colorado PR",
    "terrenos Colorado PR",
    "aluguel de casas Colorado",
    "JG Corrêa",
    "construtora Colorado PR",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nomeCompleto,
    title: `${site.nomeCompleto} | Imóveis em Colorado – PR`,
    description: descricao,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: site.nomeCompleto }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.jpg"] },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0a1838",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: site.nomeCompleto,
  url: site.url,
  telephone: "+55 44 99151-7069",
  image: `${site.url}/og-image.jpg`,
  sameAs: [site.instagram.url],
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.endereco.logradouro}, ${site.endereco.numero}`,
    addressLocality: site.endereco.cidade,
    addressRegion: site.endereco.uf,
    addressCountry: "BR",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <a
          href="#conteudo"
          className="sr-only z-[100] rounded-full bg-gold px-4 py-2 font-bold text-navy-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
