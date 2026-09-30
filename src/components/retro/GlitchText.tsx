type Props = {
  text: string;
  className?: string;
};

/** Occasional RGB-split glitch. Only for logo, hero and decoration, never body copy. */
export function GlitchText({ text, className = "" }: Props) {
  return (
    <span className={`glitch ${className}`} data-text={text}>
      {text}
    </span>
  );
}
