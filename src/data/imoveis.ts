/**
 * CADASTRO CENTRAL DE IMÓVEIS
 * ---------------------------------------------------------------
 * Para adicionar um imóvel: copie um bloco, mude o `slug` e o `codigo`,
 * coloque as fotos em /public/imoveis/<slug>/ e o vídeo em /public/videos/.
 * Campos opcionais que ficarem vazios simplesmente não aparecem no site.
 *
 * IMPORTANTE: os dados abaixo foram extraídos dos vídeos publicados no
 * Instagram da JG Corrêa. Preços, áreas e quantidades não informados nos
 * vídeos foram deixados em branco ("Valor sob consulta"). Revise com a
 * imobiliária antes de publicar.
 */

export type Finalidade = "venda" | "aluguel";
export type TipoImovel = "casa" | "apartamento" | "terreno" | "comercial" | "rural";

export interface Foto {
  src: string;
  alt: string;
  ambiente?: string;
}

export interface Video {
  /** Arquivo próprio em /public/videos ou URL externa .mp4 */
  src?: string;
  /** ID de vídeo do YouTube (alternativa ao arquivo próprio) */
  youtubeId?: string;
  poster?: string;
  vertical?: boolean;
}

export interface Imovel {
  slug: string;
  codigo: string;
  titulo: string;
  tipo: TipoImovel;
  finalidades: Finalidade[];
  /** Em reais. Deixe vazio para "Valor sob consulta". */
  preco?: { venda?: number; aluguel?: number };
  endereco: {
    logradouro: string;
    numero?: string;
    bairro: string;
    cidade: string;
    uf: string;
    /** Só exibe o mapa quando o endereço estiver autorizado para divulgação */
    exibirMapa: boolean;
  };
  quartos?: number;
  suites?: number;
  banheiros?: number;
  vagas?: number;
  /** m² */
  areaConstruida?: number;
  /** m² */
  areaTerreno?: number;
  medidas?: string;
  etiqueta?: string;
  resumo: string;
  descricao: string[];
  caracteristicas: string[];
  fotos: Foto[];
  video?: Video;
  destaque: boolean;
  publicado: boolean;
}

const fotos = (slug: string, itens: [string, string][]): Foto[] =>
  itens.map(([n, ambiente], i) => ({
    src: `/imoveis/${slug}/${n}.webp`,
    ambiente,
    alt: `${ambiente} — foto ${i + 1}`,
  }));

export const imoveis: Imovel[] = [
  {
    slug: "casa-av-das-torres-541",
    codigo: "JG-001",
    titulo: "Casa com piscina e área gourmet no Jardim das Torres",
    tipo: "casa",
    finalidades: ["venda", "aluguel"],
    endereco: {
      logradouro: "Avenida das Torres",
      numero: "541",
      bairro: "Jardim das Torres",
      cidade: "Colorado",
      uf: "PR",
      exibirMapa: true,
    },
    quartos: 3,
    suites: 1,
    banheiros: 3,
    etiqueta: "Venda ou aluguel",
    resumo:
      "Sala e cozinha planejadas, suíte com banheira, piscina com deck e área gourmet com churrasqueira.",
    descricao: [
      "Imóvel disponível para venda ou aluguel na Avenida das Torres, Jardim das Torres.",
      "A casa conta com garagem, sala e cozinha planejadas, suíte com banheira, mais dois quartos, banheiro social e lavanderia.",
      "Na área externa, piscina com deck, gramado, área gourmet com churrasqueira e móveis planejados, despensa e banheiro de apoio.",
    ],
    caracteristicas: [
      "Sala e cozinha planejadas",
      "Suíte com banheira",
      "Banheiro social",
      "Lavanderia",
      "Garagem",
      "Piscina com deck",
      "Área gourmet",
      "Churrasqueira com móveis planejados",
      "Despensa",
      "Banheiro na área gourmet",
    ],
    fotos: fotos("casa-av-das-torres-541", [
      ["01", "Piscina com deck"],
      ["02", "Fachada"],
      ["03", "Jardim frontal"],
      ["04", "Garagem"],
      ["05", "Sala de jantar e cozinha planejada"],
      ["06", "Cozinha planejada"],
      ["07", "Cozinha planejada"],
      ["08", "Suíte"],
      ["09", "Banheiro da suíte com banheira"],
      ["10", "Quarto 01"],
      ["11", "Banheiro social"],
      ["12", "Quarto 02"],
      ["13", "Lavanderia"],
      ["14", "Área externa"],
      ["15", "Piscina com deck"],
      ["16", "Área gourmet"],
      ["17", "Churrasqueira com móveis planejados"],
      ["18", "Área gourmet"],
    ]),
    video: {
      src: "/videos/casa-av-das-torres-541.mp4",
      poster: "/imoveis/casa-av-das-torres-541/01.webp",
      vertical: true,
    },
    destaque: true,
    publicado: true,
  },
  {
    slug: "casa-av-atlantica-590",
    codigo: "JG-002",
    titulo: "Casa nova com jardim de inverno no Jardim Pinheiros",
    tipo: "casa",
    finalidades: ["venda"],
    endereco: {
      logradouro: "Avenida Atlântica",
      numero: "590",
      bairro: "Jardim Pinheiros",
      cidade: "Colorado",
      uf: "PR",
      exibirMapa: true,
    },
    quartos: 2,
    etiqueta: "Nova",
    resumo:
      "Fachada com tijolinho aparente, sala e cozinha integradas, 2 quartos, banheiro e jardim de inverno.",
    descricao: [
      "Casa à venda na Avenida Atlântica, nº 590, Jardim Pinheiros.",
      "Fachada moderna com tijolinho aparente e portão em gradil. Internamente, sala e cozinha integradas, dois quartos, banheiro e jardim de inverno.",
    ],
    caracteristicas: [
      "Sala e cozinha integradas",
      "2 quartos",
      "Jardim de inverno",
      "Fachada com tijolinho aparente",
      "Portão em gradil",
    ],
    fotos: fotos("casa-av-atlantica-590", [
      ["01", "Fachada"],
      ["02", "Fachada"],
      ["03", "Sala e cozinha"],
      ["04", "Sala e cozinha"],
      ["05", "Banheiro"],
      ["06", "Quarto"],
      ["07", "Quarto"],
      ["08", "Jardim de inverno"],
      ["09", "Lateral externa"],
    ]),
    video: {
      src: "/videos/casa-av-atlantica-590.mp4",
      poster: "/imoveis/casa-av-atlantica-590/01.webp",
      vertical: true,
    },
    destaque: true,
    publicado: true,
  },
  {
    slug: "casa-rua-otacilio-cardoso-06",
    codigo: "JG-003",
    titulo: "Casa nova no Jardim Universitário",
    tipo: "casa",
    finalidades: ["venda"],
    endereco: {
      logradouro: "Rua Otacílio Cardoso",
      numero: "06",
      bairro: "Jardim Universitário",
      cidade: "Colorado",
      uf: "PR",
      exibirMapa: true,
    },
    quartos: 2,
    etiqueta: "Nova",
    resumo: "Sala, cozinha, 2 quartos, banheiro social e lavanderia.",
    descricao: [
      "Casa à venda na Rua Otacílio Cardoso, nº 06, Jardim Universitário.",
      "Ambientes claros e bem iluminados: sala, cozinha com pia, dois quartos, banheiro social com revestimento marmorizado e lavanderia.",
    ],
    caracteristicas: ["Sala", "Cozinha", "2 quartos", "Banheiro social", "Lavanderia", "Terreno com gramado"],
    fotos: fotos("casa-rua-otacilio-cardoso-06", [
      ["01", "Fachada"],
      ["02", "Sala"],
      ["03", "Cozinha"],
      ["04", "Quarto 01"],
      ["05", "Banheiro social"],
      ["06", "Quarto 02"],
      ["07", "Lavanderia"],
    ]),
    video: {
      src: "/videos/casa-rua-otacilio-cardoso-06.mp4",
      poster: "/imoveis/casa-rua-otacilio-cardoso-06/01.webp",
      vertical: true,
    },
    destaque: true,
    publicado: true,
  },
  {
    slug: "casa-av-atlantica-580",
    codigo: "JG-004",
    titulo: "Casa com suíte e garagem coberta no Jardim Pinheiros",
    tipo: "casa",
    finalidades: ["venda"],
    endereco: {
      logradouro: "Avenida Atlântica",
      numero: "580",
      bairro: "Jardim Pinheiros",
      cidade: "Colorado",
      uf: "PR",
      exibirMapa: true,
    },
    quartos: 2,
    suites: 1,
    banheiros: 2,
    resumo: "Garagem coberta, sala de TV, suíte, quarto, cozinha, área de serviço e área externa.",
    descricao: [
      "Casa à venda na Avenida Atlântica, nº 580, Bairro Pinheiros.",
      "Conta com garagem coberta, área externa, sala de TV, suíte com banheiro, segundo quarto, banheiro, cozinha e área de serviço.",
    ],
    caracteristicas: [
      "Garagem coberta",
      "Sala de TV",
      "Suíte",
      "Banheiro social",
      "Cozinha",
      "Área de serviço",
      "Área externa",
    ],
    fotos: fotos("casa-av-atlantica-580", [
      ["01", "Fachada"],
      ["02", "Localização"],
      ["03", "Garagem coberta"],
      ["04", "Área externa"],
      ["05", "Sala de TV"],
      ["06", "Banheiro 01"],
      ["07", "Suíte"],
      ["08", "Banheiro da suíte"],
      ["09", "Quarto 02"],
      ["10", "Cozinha"],
      ["11", "Área de serviço"],
    ]),
    video: {
      src: "/videos/casa-av-atlantica-580.mp4",
      poster: "/imoveis/casa-av-atlantica-580/01.webp",
      vertical: true,
    },
    destaque: false,
    publicado: true,
  },
  {
    slug: "lote-rua-benedito-francelino",
    codigo: "JG-005",
    titulo: "Lote de 200 m² no Jardim Pinheiros",
    tipo: "terreno",
    finalidades: ["venda"],
    endereco: {
      logradouro: "Rua Benedito Francelino da Silva",
      bairro: "Jardim Pinheiros",
      cidade: "Colorado",
      uf: "PR",
      exibirMapa: true,
    },
    areaTerreno: 200,
    medidas: "11 m × 18,2 m",
    resumo: "Lote com 200 m² (11 m × 18,2 m) em rua asfaltada, ideal para construir.",
    descricao: [
      "Lote à venda na Rua Benedito Francelino da Silva, Jardim Pinheiros.",
      "Medidas de 11 m × 18,2 m, totalizando 200 m², em rua asfaltada.",
    ],
    caracteristicas: ["200 m² de área total", "Medidas 11 m × 18,2 m", "Rua asfaltada"],
    fotos: fotos("lote-rua-benedito-francelino", [
      ["01", "Lote"],
      ["02", "Lote"],
      ["03", "Lote"],
      ["04", "Rua asfaltada"],
      ["05", "Medidas do lote"],
      ["06", "Área total"],
    ]),
    video: {
      src: "/videos/lote-rua-benedito-francelino.mp4",
      poster: "/imoveis/lote-rua-benedito-francelino/02.webp",
      vertical: true,
    },
    destaque: false,
    publicado: true,
  },
];

/* ---------------- helpers ---------------- */

export const imoveisPublicados = () => imoveis.filter((i) => i.publicado);
export const getImovel = (slug: string) => imoveisPublicados().find((i) => i.slug === slug);

export const tipoLabel: Record<TipoImovel, string> = {
  casa: "Casa",
  apartamento: "Apartamento",
  terreno: "Terreno / Lote",
  comercial: "Comercial",
  rural: "Chácara / Sítio",
};

export const finalidadeLabel: Record<Finalidade, string> = {
  venda: "Venda",
  aluguel: "Aluguel",
};

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function precoTexto(i: Imovel): string {
  if (i.preco?.venda) return brl.format(i.preco.venda);
  if (i.preco?.aluguel) return `${brl.format(i.preco.aluguel)}/mês`;
  return "Valor sob consulta";
}

/** Preço numérico para filtragem (venda tem prioridade). */
export function precoNumero(i: Imovel, finalidade?: Finalidade): number | undefined {
  if (finalidade === "aluguel") return i.preco?.aluguel;
  if (finalidade === "venda") return i.preco?.venda;
  return i.preco?.venda ?? i.preco?.aluguel;
}

export function localTexto(i: Imovel) {
  return `${i.endereco.bairro} · ${i.endereco.cidade}/${i.endereco.uf}`;
}

export function enderecoTexto(i: Imovel) {
  const e = i.endereco;
  return `${e.logradouro}${e.numero ? `, nº ${e.numero}` : ""} – ${e.bairro}, ${e.cidade}/${e.uf}`;
}

export function semelhantes(atual: Imovel, limite = 3) {
  return imoveisPublicados()
    .filter((i) => i.slug !== atual.slug)
    .map((i) => ({
      i,
      score:
        (i.tipo === atual.tipo ? 3 : 0) +
        (i.endereco.bairro === atual.endereco.bairro ? 2 : 0) +
        (i.finalidades.some((f) => atual.finalidades.includes(f)) ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limite)
    .map((x) => x.i);
}

export const bairros = () =>
  Array.from(new Set(imoveisPublicados().map((i) => i.endereco.bairro))).sort((a, b) => a.localeCompare(b, "pt-BR"));

/* ---------------- filtros ---------------- */

export interface Filtros {
  finalidade?: Finalidade;
  tipo?: TipoImovel;
  bairro?: string;
  precoMin?: number;
  precoMax?: number;
  /** Inclui imóveis com valor sob consulta quando há faixa de preço */
  incluirSobConsulta?: boolean;
}

export function filtrarImoveis(lista: Imovel[], f: Filtros) {
  return lista.filter((i) => {
    if (f.finalidade && !i.finalidades.includes(f.finalidade)) return false;
    if (f.tipo && i.tipo !== f.tipo) return false;
    if (f.bairro && i.endereco.bairro !== f.bairro) return false;
    if (f.precoMin != null || f.precoMax != null) {
      const p = precoNumero(i, f.finalidade);
      if (p == null) return f.incluirSobConsulta !== false;
      if (f.precoMin != null && p < f.precoMin) return false;
      if (f.precoMax != null && p > f.precoMax) return false;
    }
    return true;
  });
}

export const faixasPreco = [
  { id: "", label: "Qualquer valor" },
  { id: "0-200000", label: "Até R$ 200 mil" },
  { id: "200000-350000", label: "R$ 200 mil a R$ 350 mil" },
  { id: "350000-500000", label: "R$ 350 mil a R$ 500 mil" },
  { id: "500000-", label: "Acima de R$ 500 mil" },
];

export function parseFaixa(id?: string | null): { precoMin?: number; precoMax?: number } {
  if (!id) return {};
  const [a, b] = id.split("-");
  return { precoMin: a ? Number(a) : undefined, precoMax: b ? Number(b) : undefined };
}
