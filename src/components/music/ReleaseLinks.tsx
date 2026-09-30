import type { Release } from "@/data/types";
import { RetroButton } from "@/components/retro/RetroButton";

/** Platform buttons in priority order: Spotify, Bandcamp, YouTube. */
export function ReleaseLinks({ release, className = "" }: { release: Release; className?: string }) {
  const links = [
    { label: "SPOTIFY", url: release.spotifyUrl },
    { label: "BANDCAMP", url: release.bandcampUrl },
    { label: "YOUTUBE", url: release.youtubeUrl },
  ].filter((l): l is { label: string; url: string } => Boolean(l.url));

  if (links.length === 0) return null;

  return (
    <ul className={`flex flex-wrap gap-3 ${className}`} aria-label={`Escuchar ${release.title}`}>
      {links.map((l, i) => (
        <li key={l.label}>
          <RetroButton href={l.url} external hot={i === 0}>
            ▶ {l.label}
          </RetroButton>
        </li>
      ))}
    </ul>
  );
}
