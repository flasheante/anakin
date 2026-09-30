"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/data/types";

export type GalleryPhoto = Photo & { showLabel?: string };

const spans = ["", "sm:translate-y-3", "sm:-rotate-1", "", "sm:rotate-1", "sm:-translate-y-2"];

/**
 * Contact-sheet grid (CSS columns, so sizes vary naturally) plus a native
 * <dialog> lightbox: Esc closes, ←/→ browse, focus returns to the thumbnail.
 */
export function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<number | null>(null);

  const open = (i: number) => {
    setCurrent(i);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const step = useCallback(
    (dir: 1 | -1) => setCurrent((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setCurrent(null);
    el.addEventListener("keydown", onKey);
    el.addEventListener("close", onClose);
    return () => {
      el.removeEventListener("keydown", onKey);
      el.removeEventListener("close", onClose);
    };
  }, [step]);

  const photo = current === null ? null : photos[current];

  return (
    <>
      <ul className={`columns-2 gap-4 [&>li]:mb-4 ${photos.length > 2 ? "md:columns-3" : ""}`}>
        {photos.map((p, i) => (
          <li key={p.id} className={`break-inside-avoid ${spans[i % spans.length]}`}>
            <button
              type="button"
              onClick={() => open(i)}
              className="photocopy photocopy-hover block w-full border border-paper bg-coal p-1.5 pb-0 text-left"
              aria-label={`Ampliar: ${p.alt}`}
            >
              <Image
                src={p.src}
                alt=""
                width={p.width}
                height={p.height}
                sizes="(min-width: 768px) 330px, 46vw"
                className="h-auto w-full"
                unoptimized={p.src.endsWith(".svg")}
              />
              {p.caption && <span className="pixel block py-1 text-lg">{p.caption}</span>}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={photo ? photo.alt : "Foto"}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto max-h-[94dvh] w-[min(96vw,1100px)] border border-paper bg-ink p-0 text-paper backdrop:bg-ink/90"
      >
        {photo && (
          <figure>
            <div className="retro-window__bar">
              <span className="truncate">
                {photo.src.split("/").pop()} — {current! + 1}/{photos.length}
              </span>
              <button type="button" onClick={close} className="px-2 hover:bg-blood" aria-label="Cerrar">
                [X]
              </button>
            </div>
            {/* The original, untreated file. */}
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="96vw"
              className="mx-auto h-auto max-h-[72dvh] w-auto"
              unoptimized={photo.src.endsWith(".svg")}
            />
            <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-ash p-3">
              <span className="pixel text-xl">
                {photo.caption ?? photo.alt}
                {photo.showLabel && <span className="text-acid">{" // "}{photo.showLabel}</span>}
                {photo.date && <span className="text-dust">{" // "}{photo.date}</span>}
              </span>
              <span className="flex gap-2">
                <button type="button" className="retro-btn text-base" onClick={() => step(-1)}>
                  ← ANT
                </button>
                <button type="button" className="retro-btn text-base" onClick={() => step(1)}>
                  SIG →
                </button>
              </span>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
