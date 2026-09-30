import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href?: string;
  children: ReactNode;
  /** Opens in a new tab and announces it to screen readers. */
  external?: boolean;
  hot?: boolean;
  className?: string;
  rel?: string;
};

/**
 * Old-internet button. Without an href it renders as a disabled placeholder
 * (used for links the band hasn't configured yet).
 */
export function RetroButton({ href, children, external, hot, className = "", rel }: Props) {
  const cls = `retro-btn ${hot ? "retro-btn--hot" : ""} ${className}`;

  if (!href) {
    return (
      <span className={cls} aria-disabled="true">
        {children}
      </span>
    );
  }

  if (external || /^(https?:|mailto:)/.test(href)) {
    const newTab = external ?? href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        {...(newTab ? { target: "_blank", rel: rel ?? "noopener noreferrer" } : { rel })}
      >
        {children}
        {newTab && <span className="sr-only"> (se abre en una pestaña nueva)</span>}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} rel={rel}>
      {children}
    </Link>
  );
}
