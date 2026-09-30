import { socialLabels, socialLinks, socialOrder } from "@/data/social";
import { RetroButton } from "@/components/retro/RetroButton";

type Props = {
  className?: string;
  /** Smaller text links instead of buttons. */
  compact?: boolean;
};

/** Every platform from src/data/social.ts. Empty URLs render as "SOON". */
export function SocialLinks({ className = "", compact }: Props) {
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {socialOrder.map((key) => {
        const url = socialLinks[key];
        const label = socialLabels[key].toUpperCase();

        if (compact) {
          return (
            <li key={key} className="pixel text-xl">
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  [{label}]<span className="sr-only"> (se abre en una pestaña nueva)</span>
                </a>
              ) : (
                <span className="text-dust" title="Próximamente">
                  [{label}: SOON]
                </span>
              )}
            </li>
          );
        }

        return (
          <li key={key}>
            <RetroButton href={url || undefined} external>
              {url ? `${label} →` : `${label} // SOON`}
            </RetroButton>
          </li>
        );
      })}
    </ul>
  );
}
