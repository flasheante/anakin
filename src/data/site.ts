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
  /** Optional band photo for the hero and band page (path under /public). */
  bandPhoto: "/images/photos/band-placeholder.svg",
  bandPhotoAlt: "Foto de ANAKIN (provisoria)",
};

export const navItems = [
  { href: "/", label: "HOME" },
  { href: "/music", label: "MUSIC" },
  { href: "/shows", label: "SHOWS" },
  { href: "/band", label: "BAND" },
  { href: "/photos", label: "PHOTOS" },
  { href: "/contact", label: "CONTACT" },
] as const;
