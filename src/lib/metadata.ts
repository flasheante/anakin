import type { Metadata } from "next";
import { site } from "@/data/site";
import { ogAlt, ogSize } from "./og";

// Next merges metadata shallowly, so a page that sets `openGraph` wipes the
// layout's. Every page builds its full set here instead.
const image = { url: "/opengraph-image", ...ogSize, alt: ogAlt };

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${title} — ANAKIN`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "ANAKIN",
      locale: site.locale,
      title: fullTitle,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
