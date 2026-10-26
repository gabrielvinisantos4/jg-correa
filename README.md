# Site JG Corrêa — Construtora e Imobiliária

Next.js 15 (App Router) + TypeScript + Tailwind CSS 4 + Motion. Pronto para publicar na Vercel.

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
```

## Publicar na Vercel

1. Suba a pasta para um repositório no GitHub.
2. Na Vercel: **Add New → Project → importar o repositório** (detecta Next.js sozinho).
3. Em *Environment Variables*, configure (opcional):
   - `NEXT_PUBLIC_SITE_URL` — domínio final, ex.: `https://jgcorrea.com.br` (usado no SEO, sitemap e Open Graph).
   - `NEXT_PUBLIC_FORM_ENDPOINT` — endpoint do formulário (ver abaixo).

## Onde mudar cada coisa

| O quê | Arquivo |
|---|---|
| WhatsApp, Instagram, endereço, CRECI, mensagens automáticas | `src/data/site.ts` |
| Imóveis (cadastro central) | `src/data/imoveis.ts` |
| Fotos dos imóveis | `public/imoveis/<slug>/01.webp, 02.webp…` |
| Vídeos dos imóveis | `public/videos/<slug>.mp4` |
| Foto do corretor/equipe | `site.equipe` em `src/data/site.ts` + arquivo em `public/equipe/` |
| Posts do Instagram incorporados | `site.instagramPosts` em `src/data/site.ts` |
| Cores e fontes | `src/app/globals.css` (bloco `@theme`) |

## Como cadastrar um imóvel

1. Crie a pasta `public/imoveis/meu-imovel-slug/` com as fotos (`01.webp` = capa). Fotos em .jpg também funcionam — só ajuste a extensão no cadastro.
2. (Opcional) coloque o vídeo em `public/videos/meu-imovel-slug.mp4`. Vídeos verticais (Reels) são suportados. Também dá para usar YouTube: `video: { youtubeId: "ID_DO_VIDEO" }`.
3. Em `src/data/imoveis.ts`, copie um bloco existente e ajuste:
   - `slug` (vira a URL `/imoveis/slug`) e `codigo` (ex.: `JG-006`)
   - `tipo`: `casa` | `apartamento` | `terreno` | `comercial` | `rural`
   - `finalidades`: `["venda"]`, `["aluguel"]` ou ambos
   - `preco: { venda: 350000 }` ou `{ aluguel: 1800 }` — sem preço aparece **"Valor sob consulta"**
   - `quartos`, `suites`, `banheiros`, `vagas`, `areaConstruida`, `areaTerreno` — campos vazios não aparecem
   - `destaque: true` para aparecer na home (recomendado: 3 destaques)
   - `publicado: false` esconde o imóvel sem apagar (ex.: vendido)
   - `endereco.exibirMapa: false` esconde o mapa quando o endereço não puder ser divulgado
4. Faça commit — a Vercel publica sozinha. Filtros, categorias, bairros, páginas, sitemap e “imóveis semelhantes” se atualizam automaticamente.

Para converter fotos em WebP: `cwebp -q 78 foto.jpg -o 01.webp` (ou use squoosh.app).
Para comprimir vídeo: `ffmpeg -i in.mp4 -c:v libx264 -preset veryfast -crf 27 -vf scale=720:-2 -c:a aac -b:a 96k -movflags +faststart out.mp4`

## Formulário de contato

- **Sem configuração**: o formulário funciona abrindo o WhatsApp da imobiliária com a mensagem já montada (nome, telefone, interesse, imóvel). É funcional, sem backend.
- **Com e-mail**: crie um formulário gratuito no [Formspree](https://formspree.io) e defina `NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxx`. O botão vira “Enviar mensagem”, com estados de envio, sucesso e erro (com alternativa pelo WhatsApp).

## Instagram

A API do Instagram exige app da Meta + token de servidor, por isso não foi integrada. O site mostra um mosaico de fotos reais dos imóveis com link para o perfil. Para exibir publicações específicas, cole as URLs dos posts/reels em `site.instagramPosts` (são incorporadas via embed oficial, sem token).

## O que foi usado de material real

- Logo enviada (versão original na seção “Sobre” e no Open Graph; versão vetorial redesenhada no cabeçalho/favicon).
- 5 vídeos publicados no Instagram (comprimidos para web) e 51 fotos extraídas deles.
- Dados dos imóveis lidos dos textos dos vídeos (endereços, ambientes, medidas do lote).

## ⚠️ Revisar com a imobiliária antes de publicar

- **Preços**: nenhum vídeo informava valor → todos “Valor sob consulta”.
- **Cidade**: os imóveis foram cadastrados em Colorado/PR (cidade do escritório). Confirmar.
- **Quantidades** inferidas pelos ambientes mostrados nos vídeos — confirmar:
  - JG-001 (Av. das Torres, 541): 3 quartos (1 suíte), 3 banheiros; venda **e** aluguel.
  - JG-002 (Av. Atlântica, 590): 2 quartos (banheiros não informados).
  - JG-003 (Rua Otacílio Cardoso, 06): 2 quartos (banheiros não informados).
  - JG-004 (Av. Atlântica, 580): 2 quartos (1 suíte), 2 banheiros.
  - JG-005 (lote Rua Benedito Francelino da Silva): 200 m², 11 × 18,2 m — sem número do lote.
- Áreas construídas, vagas de garagem e número de suítes não informados.
- Autorização para exibir endereços e mapas de cada imóvel (`exibirMapa`).
- Foto do corretor/equipe (opcional).
- Domínio final (`NEXT_PUBLIC_SITE_URL`).
