import type { Release } from "./types";
import { socialLinks } from "./social";

// Newest first is not required; the site sorts by year.
// Until each release has its own URL, links fall back to the artist pages.
export const releases: Release[] = [
  {
    id: "fiesta-distroy-vol-1",
    title: "Fiesta Distroy Volumen 1",
    year: 2024,
    type: "album",
    spotifyUrl: socialLinks.spotify,
    bandcampUrl: socialLinks.bandcamp,
    tracks: [
      { title: "José Antinatural", duration: "02:36" },
      { title: "Una Trampa", duration: "02:21" },
      { title: "El Pináculo...", duration: "03:48" },
      { title: "Escena Eliminada", duration: "01:49" },
    ],
  },
  {
    id: "incidente-en-el-oeste",
    title: "Incidente en el Oeste",
    year: 2021,
    type: "album",
    spotifyUrl: socialLinks.spotify,
    bandcampUrl: socialLinks.bandcamp,
  },
  {
    id: "re-firme",
    title: "Re Firme",
    year: 2020,
    type: "album",
    spotifyUrl: socialLinks.spotify,
    bandcampUrl: socialLinks.bandcamp,
  },
  {
    id: "mas-alla-de",
    title: "Más Allá De",
    year: 2019,
    type: "album",
    spotifyUrl: socialLinks.spotify,
    bandcampUrl: socialLinks.bandcamp,
  },
];
