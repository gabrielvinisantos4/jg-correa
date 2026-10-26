import { NextResponse, type NextRequest } from "next/server";

/**
 * MODO "FORA DO AR"
 * Enquanto MAINTENANCE estiver ativo, visitantes veem só a página /em-breve.
 * Para ver o site completo, abra uma vez: https://SEU-DOMINIO/?preview=<PREVIEW_KEY>
 * (fica liberado nesse navegador por 30 dias). Para sair: /?preview=sair
 *
 * Para colocar o site no ar de verdade: na Vercel, crie a variável SITE_PUBLICO=1
 * e faça um novo deploy (ou apague este arquivo).
 */
const PREVIEW_KEY = process.env.PREVIEW_KEY ?? "SuIpBmWLxW-X";
const COOKIE = "jg_preview";

export function middleware(req: NextRequest) {
  if (process.env.SITE_PUBLICO === "1") return NextResponse.next();

  const { searchParams, pathname } = req.nextUrl;
  const preview = searchParams.get("preview");

  if (preview === "sair") {
    const res = NextResponse.redirect(new URL("/", req.url));
    res.cookies.delete(COOKIE);
    return res;
  }
  if (preview === PREVIEW_KEY) {
    const url = req.nextUrl.clone();
    url.searchParams.delete("preview");
    const res = NextResponse.redirect(url);
    res.cookies.set(COOKIE, PREVIEW_KEY, { httpOnly: true, sameSite: "lax", secure: true, maxAge: 60 * 60 * 24 * 30, path: "/" });
    return res;
  }
  if (req.cookies.get(COOKIE)?.value === PREVIEW_KEY) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  if (pathname === "/em-breve") {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }
  const res = NextResponse.rewrite(new URL("/em-breve", req.url));
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export const config = {
  // Bloqueia todas as páginas; arquivos estáticos (_next, imagens, fontes) passam
  matcher: ["/((?!_next/|.*\\.(?:webp|jpg|jpeg|png|svg|ico|woff2?|css|js|mp4)$).*)"],
};
