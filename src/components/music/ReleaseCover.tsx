import Image from "next/image";
import type { Release } from "@/data/types";

const palettes = [
  "bg-blood text-ink",
  "bg-yolk text-ink",
  "bg-acid text-ink",
  "bg-paper text-ink",
];

/** Real cover when available; otherwise a xeroxed stand-in built from the title. */
export function ReleaseCover({ release, index = 0, sizes = "(min-width: 768px) 300px, 90vw" }: { release: Release; index?: number; sizes?: string }) {
  if (release.cover) {
    return (
      <div className="photocopy photocopy-hover aspect-square border border-paper">
        <Image
          src={release.cover}
          alt={`Portada de ${release.title}`}
          fill
          sizes={sizes}
          className="object-cover"
          unoptimized={release.cover.endsWith(".svg")}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Portada provisoria de ${release.title}`}
      className={`relative flex aspect-square flex-col justify-between overflow-hidden border border-paper p-4 ${palettes[index % palettes.length]}`}
    >
      <div aria-hidden="true" className="halftone absolute inset-0 opacity-60 mix-blend-multiply" />
      <p aria-hidden="true" className="pixel relative text-2xl">
        ANAKIN
      </p>
      <p aria-hidden="true" className="pixel relative text-4xl leading-[0.9] uppercase break-words">
        {release.title}
      </p>
      <p aria-hidden="true" className="pixel relative flex justify-between text-xl">
        <span>{release.year}</span>
        <span>◉ {release.type.toUpperCase()}</span>
      </p>
    </div>
  );
}
