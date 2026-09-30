import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  level?: 1 | 2 | 3;
  id?: string;
  /** Decorative markers around the text, e.g. [">>>", "<<<"]. */
  marks?: [string, string];
  className?: string;
  caret?: boolean;
  marksClassName?: string;
};

const sizes = {
  1: "text-5xl sm:text-6xl md:text-7xl",
  2: "text-4xl sm:text-5xl",
  3: "text-2xl sm:text-3xl",
};

export function PixelHeading({ children, level = 2, id, marks, className = "", caret, marksClassName = "text-blood" }: Props) {
  const Tag = `h${level}` as const;
  return (
    <Tag id={id} className={`pixel uppercase ${sizes[level]} ${className}`}>
      {marks && (
        <span aria-hidden="true" className={marksClassName}>
          {marks[0]}{" "}
        </span>
      )}
      <span className={caret ? "caret" : undefined}>{children}</span>
      {marks && (
        <span aria-hidden="true" className={marksClassName}>
          {" "}
          {marks[1]}
        </span>
      )}
    </Tag>
  );
}
