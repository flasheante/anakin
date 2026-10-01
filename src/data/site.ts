export const site = {
  name: "ANAKIN",
  // Public domain, used for canonical URLs, sitemap and Open Graph. Change before deploying.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://anakin.com.ar",
  title: "ANAKIN — Mendoza, Argentina",
  description: "ANAKIN — Rock, punk, funk y psicodelia desde Mendoza, Argentina.",
  location: "MENDOZA / ARGENTINA",
  tagline: "ROCK / PUNK / FUNK / PSYCHO",
  genres: ["Rock", "Punk", "Funk", "Psicodelia", "Hardcore"],
  locale: "es_AR",
  /** IANA zone of the shows; decides when a date becomes "past". */
  timeZone: "America/Argentina/Mendoza",
  /** Band logo (black sheep sticker). Regenerate with `npm run logo` from src/assets/source/. */
  logo: { src: "/images/logo.png", width: 800, height: 559, alt: "Logo de ANAKIN: una oveja negra" },
  /**
   * Photos framed at 3:2 in the hero and the band section. The file itself is
   * never cropped; `position` (CSS object-position) picks the visible area.
   */
  heroPhoto: {
    src: "/images/photos/anakin-bw.jpg",
    alt: "Los tres integrantes de ANAKIN en una escalera, mirando a cámara, en blanco y negro",
    position: "50% 5%",
    caption: "ANAKIN_BW.JPG",
  },
  bandPhoto: {
    src: "/images/photos/anakin-en-vivo.jpg",
    alt: "ANAKIN tocando en vivo en una sala, foto movida",
    position: "41% 50%",
    caption: "FIG. 1 — ANAKIN EN VIVO",
  },
};

export const navItems = [
  { href: "/", label: "HOME" },
  { href: "/music", label: "MUSIC" },
  { href: "/shows", label: "SHOWS" },
  { href: "/band", label: "BAND" },
  { href: "/photos", label: "PHOTOS" },
  { href: "/contact", label: "CONTACT" },
] as const;

/** Hit counter on abacus.jasoncameron.dev. Changing the namespace/key starts from zero. */
export const visitCounter = {
  namespace: "anakinbanda-web",
  key: "visits",
};

/** Google Tag Manager container. Empty string = GTM is not loaded. */
export const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-TPBP32ZC";
