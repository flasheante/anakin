import type { Metadata, Viewport } from "next";
import { VT323 } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { gtmId, site } from "@/data/site";
import { shows } from "@/data/shows";
import { formatShort, getNextShow } from "@/lib/shows";
import { musicGroupJsonLd } from "@/lib/jsonld";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Marquee } from "@/components/retro/Marquee";
import { NoiseOverlay, Scanlines } from "@/components/retro/Overlays";
import { KonamiCode } from "@/components/retro/KonamiCode";
import { JsonLd } from "@/components/retro/JsonLd";

// One pixel font for display. Body text uses system Verdana/Tahoma: zero bytes.
const vt323 = VT323({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-vt323",
  display: "swap",
});

// Pages are static but re-rendered hourly so "next show" and past/future flip on their own.
export const revalidate = 3600;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s — ANAKIN" },
  description: site.description,
  applicationName: "ANAKIN",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "ANAKIN",
    locale: site.locale,
    title: site.title,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const next = getNextShow(shows);
  const ticker = next
    ? [`ANAKIN LIVE`, site.location.replace(" / ", " // "), formatShort(next.date), next.venue.toUpperCase()]
    : ["ANAKIN", "ROCK DESDE EL OESTE", "NUEVAS FECHAS PRONTO"];

  return (
    <html lang="es" className={vt323.variable}>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body className="page-texture pixel-cursor min-h-dvh">
        <a
          href="#contenido"
          className="pixel sr-only z-80 bg-yolk px-4 py-2 text-2xl text-ink focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          SALTAR AL CONTENIDO
        </a>

        <div className="site-shell mx-auto max-w-[1080px] border-x border-ash bg-ink sm:my-4 sm:border">
          <Marquee items={ticker} className="pixel border-b border-ash bg-yolk py-0.5 text-lg text-ink" />
          <SiteHeader />
          <main id="contenido" tabIndex={-1} className="focus:outline-none">
            {children}
          </main>
          <SiteFooter />
        </div>

        <NoiseOverlay />
        <Scanlines />
        <KonamiCode />
        <JsonLd data={musicGroupJsonLd()} />
      </body>
    </html>
  );
}
