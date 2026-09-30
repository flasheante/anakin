type Props = {
  items: string[];
  className?: string;
  /** Seconds per loop. Slow on purpose. */
  duration?: number;
};

/**
 * Slow scrolling ticker for secondary info. The text exists once for
 * assistive tech; the duplicate that makes the loop seamless is hidden.
 * Pauses on hover/focus and stops entirely with prefers-reduced-motion.
 */
export function Marquee({ items, className = "", duration = 45 }: Props) {
  const line = items.map((item) => `>>> ${item} `).join("");
  return (
    <div className={`marquee ${className}`} style={{ ["--marquee-duration" as string]: `${duration}s` }}>
      <div className="marquee__track">
        <span className="pr-8">{line}</span>
        <span className="marquee__dup pr-8" aria-hidden="true">
          {line}
        </span>
      </div>
    </div>
  );
}
