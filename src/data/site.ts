/**
 * Dados institucionais da JG Corrêa.
 * Altere aqui e o site inteiro é atualizado (cabeçalho, rodapé, WhatsApp, SEO).
 */
export const site = {
  nome: "JG Corrêa",
  nomeCompleto: "JG Corrêa Construtora e Imobiliária",
  descricaoCurta: "Construtora e Imobiliária",
  creci: "CRECI PJ 813",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://jg-correa.vercel.app"),

  whatsapp: {
    numero: "5544991517069",
    exibicao: "(44) 99151-7069",
  },

  instagram: {
    usuario: "imobiliaria.jgcorrea",
    url: "https://www.instagram.com/imobiliaria.jgcorrea/",
  },

  endereco: {
    logradouro: "Av. Parigot de Souza",
    numero: "309",
    cidade: "Colorado",
    uf: "PR",
    pais: "BR",
  },

  /**
   * Foto do corretor/equipe na seção "Sobre". Coloque o arquivo em /public/equipe/
   * e preencha, ex.: [{ nome: "Fulano", cargo: "Corretor", foto: "/equipe/fulano.webp" }]
   */
  equipe: [] as { nome: string; cargo: string; foto: string }[],

  /**
   * Publicações do Instagram exibidas no site (URLs de posts/reels reais).
   * Ex.: "https://www.instagram.com/reel/XXXXXXXX/". Vazio = mostra mosaico com link para o perfil.
   */
  instagramPosts: [] as string[],

  /** Mensagens automáticas do WhatsApp por contexto */
  mensagens: {
    geral: "Olá! Vim pelo site da JG Corrêa e gostaria de conhecer os imóveis disponíveis.",
    corretor: "Olá! Vim pelo site da JG Corrêa e gostaria de falar com um corretor.",
    anunciar: "Olá! Gostaria de anunciar meu imóvel com a JG Corrêa.",
    sobConsulta: "Olá! Vim pelo site da JG Corrêa e procuro um imóvel desta categoria:",
  },
} as const;

export const enderecoCompleto = `${site.endereco.logradouro}, nº ${site.endereco.numero} – ${site.endereco.cidade} – ${site.endereco.uf}`;
