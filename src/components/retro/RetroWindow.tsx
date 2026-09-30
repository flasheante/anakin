import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  variant?: "blood" | "acid";
};

/** Box with a Netscape/Win-style title bar. The window controls are decoration. */
export function RetroWindow({ title, children, className = "", bodyClassName = "p-4 sm:p-5", variant = "blood" }: Props) {
  return (
    <div className={`retro-window ${variant === "acid" ? "retro-window--acid" : ""} ${className}`}>
      <div className="retro-window__bar">
        <span className="truncate">{title}</span>
        <span aria-hidden="true" className="shrink-0 tracking-widest">
          [_][□][X]
        </span>
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
