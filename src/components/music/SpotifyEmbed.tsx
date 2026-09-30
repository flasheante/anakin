"use client";

import { useState } from "react";

/**
 * Click-to-load Spotify player. Nothing from Spotify is downloaded until the
 * visitor asks for it, keeping the page light (56K modem friendly).
 */
export function SpotifyEmbed({ url, title }: { url: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const embedUrl = url.replace("open.spotify.com/", "open.spotify.com/embed/") + "?theme=0";

  if (!loaded) {
    return (
      <button type="button" onClick={() => setLoaded(true)} className="retro-btn w-full justify-center">
        [ CARGAR REPRODUCTOR DE SPOTIFY ]
      </button>
    );
  }

  return (
    <iframe
      title={title}
      src={embedUrl}
      width="100%"
      height="352"
      loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      className="block border border-paper bg-ink"
    />
  );
}
