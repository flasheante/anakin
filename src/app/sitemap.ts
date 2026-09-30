import type { MetadataRoute } from "next";
import { navItems, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return navItems.map((item) => ({
    url: `${site.url}${item.href === "/" ? "" : item.href}`,
    lastModified: new Date(),
    changeFrequency: item.href === "/" || item.href === "/shows" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : item.href === "/shows" ? 0.9 : 0.6,
  }));
}
