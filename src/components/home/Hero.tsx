import Image from "next/image";
import { site } from "@/data/site";
import { GlitchText } from "@/components/retro/GlitchText";
import { AsciiRule } from "@/components/retro/AsciiRule";
import { RetroButton } from "@/components/retro/RetroButton";

const genreColors = ["text-blood", "text-yolk", "text-acid", "text-paper"];

export function Hero() {
  const genres = site.tagline.split(" / ");
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden px-4 pt-10 pb-12 sm:px-6">
      <AsciiRule />
      <div className="py-8 text-center">
        {/* The sheep, slapped on like a sticker. */}
        <Image
          src={site.logo.src}
          alt={site.logo.alt}
          width={site.logo.width}
          height={site.logo.height}
          priority
          sizes="(min-width: 640px) 420px, 75vw"
          className="mx-auto mb-6 h-auto w-3/4 max-w-[420px] rotate-2"
        />
        <h1 id="hero-title" className="pixel text-[clamp(5.5rem,24vw,13rem)] leading-[0.8]">
          <GlitchText text="ANAKIN" />
        </h1>
        <p className="pixel mt-4 text-3xl sm:text-4xl">{site.location}</p>
        <p className="pixel mt-1 text-2xl sm:text-3xl">
          {genres.map((g, i) => (
            <span key={g}>
              {i > 0 && <span className="text-ash"> / </span>}
              <span className={genreColors[i % genreColors.length]}>{g}</span>
            </span>
          ))}
        </p>
      </div>
      <AsciiRule />

      {site.heroPhoto && (
        <figure className="relative mx-auto mt-10 max-w-3xl tilt-r">
          <span aria-hidden="true" className="tape -top-2 left-8 -rotate-6" />
          <span aria-hidden="true" className="tape -top-2 right-8 rotate-6" />
          <div className="photocopy photocopy--red relative aspect-[3/2] border border-paper">
            <Image
              src={site.heroPhoto.src}
              alt={site.heroPhoto.alt}
              fill
              priority
              sizes="(min-width: 800px) 768px, 92vw"
              className="object-cover"
              style={{ objectPosition: site.heroPhoto.position }}
            />
          </div>
          <figcaption aria-hidden="true" className="pixel mt-2 flex justify-between text-lg text-dust">
            <span>{site.heroPhoto.caption}</span>
            <span>B/N · 1997 MODE</span>
          </figcaption>
        </figure>
      )}

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <RetroButton href="/shows" hot>
          VER FECHAS →
        </RetroButton>
        <RetroButton href="/music">ESCUCHAR →</RetroButton>
      </div>
    </section>
  );
}
