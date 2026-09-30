import type { Photo } from "./types";

// Drop files in public/images/photos/ and add an entry here (width/height = real pixels).
// Keep the originals untouched: the photocopy look is applied with CSS.
export const photos: Photo[] = [
  {
    id: "anakin-bw",
    src: "/images/photos/anakin-bw.jpg",
    width: 737,
    height: 1280,
    alt: "Los tres integrantes de ANAKIN en una escalera, mirando a cámara, en blanco y negro",
    caption: "ANAKIN EN LA ESCALERA",
  },
  {
    id: "gira-2026-flyer",
    src: "/images/photos/anakin-gira-2026-flyer.jpg",
    width: 676,
    height: 778,
    alt: "Flyer de la gira 2026 con un parche bordado que dice ANAKIX GIRA 2026 y la lista de fechas",
    caption: "FLYER — GIRA 2026",
    date: "2026",
  },
];
