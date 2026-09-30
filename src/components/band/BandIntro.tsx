import Image from "next/image";
import { site } from "@/data/site";
import { bandBio } from "@/data/members";

/** Band "ficha": name, origin, genres, photocopied promo photo and a short bio. */
export function BandIntro({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const Heading = `h${headingLevel}` as const;
  return (
    <div className="grid items-start gap-8 md:grid-cols-[1.3fr_1fr]">
      {site.bandPhoto && (
        <figure className="relative tilt-l">
          <span aria-hidden="true" className="tape -top-2 left-6 -rotate-6" />
          <span aria-hidden="true" className="tape -top-2 right-6 rotate-3" />
          <div className="photocopy photocopy-hover relative aspect-[3/2] border border-paper">
            <Image src={site.bandPhoto} alt={site.bandPhotoAlt} fill sizes="(min-width: 768px) 560px, 92vw" className="object-cover" unoptimized={site.bandPhoto.endsWith(".svg")} />
          </div>
          <figcaption className="pixel mt-2 text-lg text-dust">FIG. 1 — ANAKIN, MENDOZA</figcaption>
        </figure>
      )}
      <div className="border-l-4 border-blood pl-5">
        <Heading className="pixel text-5xl">ANAKIN</Heading>
        <p className="pixel text-2xl">{site.location}</p>
        <p className="pixel text-2xl text-acid">{site.genres.join(" / ").toUpperCase()}</p>
        <p className="mt-4 max-w-prose">{bandBio}</p>
      </div>
    </div>
  );
}
