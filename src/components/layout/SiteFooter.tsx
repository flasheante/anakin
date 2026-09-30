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

      {/* Easter eggs: these lead to the "internet is broken" 404 on purpose. */}
      <div className="pixel mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-lg">
        <a href="/webring/prev" rel="nofollow">
          &lt;&lt; PREV
        </a>
        <span className="text-dust">MENDOZA ROCK WEBRING</span>
        <a href="/webring/next" rel="nofollow">
          NEXT &gt;&gt;
        </a>
      </div>
      <p className="mt-4">
        <a href="/download-this-website" rel="nofollow" className="retro-btn text-base">
          [ DOWNLOAD THIS WEBSITE ]
        </a>
      </p>

      <AsciiRule dashed className="mt-6" />
    </footer>
  );
}
