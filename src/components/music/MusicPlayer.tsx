import type { Release } from "@/data/types";
import { RetroWindow } from "@/components/retro/RetroWindow";
import { ReleaseLinks } from "./ReleaseLinks";
import { SpotifyEmbed } from "./SpotifyEmbed";
import { socialLinks } from "@/data/social";

/**
 * 90s-player look for a release. It doesn't play audio itself: the tracklist
 * is information, playback happens on the platforms (or the Spotify embed).
 */
export function MusicPlayer({ release }: { release: Release }) {
  const tracks = release.tracks ?? [];

  return (
    <RetroWindow title={`ANAKIN // ${release.title}`} variant="acid" bodyClassName="p-0">
      <div className="bg-ink p-4 sm:p-5">
        <p aria-hidden="true" className="pixel mb-3 flex justify-between text-lg text-acid">
          <span>▶ NOW PLAYING</span>
          <span>{release.year} · 128KBPS · STEREO</span>
        </p>

        {tracks.length > 0 ? (
          <ol className="pixel text-xl sm:text-2xl" aria-label={`Temas de ${release.title}`}>
            {tracks.map((t, i) => (
              <li key={t.title} className={`flex gap-3 px-1 ${i === 0 ? "bg-acid text-ink" : ""}`}>
                <span aria-hidden="true">{i === 0 ? "[▶]" : "[ ]"}</span>
                <span className="flex-1 truncate">{t.title}</span>
                {t.duration && <span className="tabular-nums">{t.duration}</span>}
              </li>
            ))}
          </ol>
        ) : (
          <p className="pixel text-2xl">{release.title}</p>
        )}

        <div aria-hidden="true" className="pixel mt-4 overflow-hidden text-lg whitespace-nowrap text-acid">
          ███████████░░░░░░░░░░░░░░░░░░░░░░░░
        </div>
      </div>
      <div className="space-y-4 border-t border-ash p-4 sm:p-5">
        <ReleaseLinks release={release} />
        {socialLinks.spotify && <SpotifyEmbed url={socialLinks.spotify} title="Reproductor de ANAKIN en Spotify" />}
      </div>
    </RetroWindow>
  );
}
