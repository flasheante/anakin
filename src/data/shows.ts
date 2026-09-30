import type { Show } from "./types";

// Add new dates anywhere in the list: order doesn't matter, the site sorts them.
// Past dates stay here on purpose; they become the show archive.
export const shows: Show[] = [
  {
    id: "2026-10-07-la-reserva",
    date: "2026-10-07",
    venue: "La Reserva",
    city: "Mendoza",
    country: "Argentina",
    bands: [],
  },
  {
    id: "2026-10-23-room",
    date: "2026-10-23",
    venue: "Room",
    city: "Mendoza",
    country: "Argentina",
    bands: ["Los Blandos"],
  },
  {
    id: "2026-10-31-amada-juana",
    date: "2026-10-31",
    venue: "Amada Juana",
    city: "Mendoza",
    country: "Argentina",
    bands: ["Final Girl"],
  },
  {
    id: "2026-11-13-amada-juana",
    date: "2026-11-13",
    venue: "Amada Juana",
    city: "Mendoza",
    country: "Argentina",
    bands: ["Rude Dave", "Dr Spectrum"],
  },
  {
    id: "2026-11-25-maldito-perro",
    date: "2026-11-25",
    venue: "Maldito Perro",
    city: "Mendoza",
    country: "Argentina",
    bands: ["Billordo"],
  },
  {
    id: "2026-12-09-maldito-perro",
    date: "2026-12-09",
    venue: "Maldito Perro",
    city: "Mendoza",
    country: "Argentina",
    bands: [],
  },
];
