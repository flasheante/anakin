export function AsciiRule({ dashed, className = "" }: { dashed?: boolean; className?: string }) {
  return <div aria-hidden="true" className={`ascii-rule ${dashed ? "ascii-rule--dash" : ""} ${className}`} />;
}
