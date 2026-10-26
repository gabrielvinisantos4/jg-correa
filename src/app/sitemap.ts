import type { MetadataRoute } from "next";
import { imoveisPublicados } from "@/data/imoveis";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/imoveis`, lastModified: now, priority: 0.9 },
    ...imoveisPublicados().map((i) => ({ url: `${site.url}/imoveis/${i.slug}`, lastModified: now, priority: 0.8 })),
    { url: `${site.url}/privacidade`, lastModified: now, priority: 0.2 },
  ];
}
