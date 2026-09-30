import type { ReactNode } from "react";
import { AsciiRule } from "@/components/retro/AsciiRule";
import { PixelHeading } from "@/components/retro/PixelHeading";

type Props = {
  path: string;
  title: string;
  children?: ReactNode;
};

/** Inner-page title with a DOS-style path above it. */
export function PageHeader({ path, title, children }: Props) {
  return (
    <div className="mb-10">
      <p aria-hidden="true" className="pixel mb-2 text-lg text-dust">
        C:\ANAKIN\{path}&gt;
      </p>
      <PixelHeading level={1} caret>
        {title}
      </PixelHeading>
      {children && <div className="mt-4 max-w-2xl text-dust">{children}</div>}
      <AsciiRule className="mt-5" />
    </div>
  );
}
