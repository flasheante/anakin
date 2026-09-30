import { VisitorCounter } from "@/components/retro/VisitorCounter";
import { AsciiRule } from "@/components/retro/AsciiRule";
import { SocialLinks } from "@/components/contact/SocialLinks";

export function SiteFooter() {
  const now = new Date();

  return (
    <footer className="mt-16 border-t border-paper bg-coal px-4 pt-6 pb-10 text-center sm:px-6">
      <AsciiRule dashed className="mb-5" />
      <SocialLinks compact className="mb-6 justify-center" />

      <VisitorCounter />

      <div className="pixel mt-4 space-y-1 text-lg text-dust">
        <p>BEST VIEWED IN NETSCAPE 3.0 @ 800x600</p>
        <p>
          <span className="text-acid">56K MODEM FRIENDLY</span>
        </p>
        <p className="text-paper">ANAKIN © 1997–{now.getFullYear()}</p>
      </div>

      <p className="pixel mt-6 text-lg text-dust">@flasheante</p>

      <AsciiRule dashed className="mt-6" />
    </footer>
  );
}
