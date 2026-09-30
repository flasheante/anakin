import type { Release } from "@/data/types";
import { ReleaseCover } from "./ReleaseCover";
import { ReleaseLinks } from "./ReleaseLinks";

const typeLabel = { album: "ÁLBUM", ep: "EP", single: "SIMPLE" } as const;

export function ReleaseCard({ release, index = 0 }: { release: Release; index?: number }) {
  return (
    <article aria-labelledby={`release-${release.id}`} className={index % 2 ? "tilt-r" : "tilt-l"}>
      <ReleaseCover release={release} index={index} />
      <div className="mt-3 border border-ash bg-coal p-3">
        <h3 id={`release-${release.id}`} className="pixel text-3xl uppercase">
          {release.title}
        </h3>
        <p className="pixel text-xl text-dust">
          {release.year}{" // "}{typeLabel[release.type]}
          {release.tracks && ` // ${release.tracks.length} TEMAS`}
        </p>
        <ReleaseLinks release={release} className="mt-3" />
      </div>
    </article>
  );
}
