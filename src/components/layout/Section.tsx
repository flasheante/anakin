import type { ReactNode } from "react";

type Props = {
  id?: string;
  labelledBy?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, labelledBy, children, className = "" }: Props) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`scroll-mt-6 px-4 py-12 sm:px-6 ${className}`}>
      {children}
    </section>
  );
}
