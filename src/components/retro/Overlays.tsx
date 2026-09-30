/** Fixed film grain over the whole page. Purely decorative. */
export function NoiseOverlay() {
  return <div className="noise-overlay" aria-hidden="true" />;
}

/** CRT scanlines. Hidden on mobile via CSS to save paint work. */
export function Scanlines() {
  return <div className="scanlines" aria-hidden="true" />;
}
