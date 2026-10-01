import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { GlitchText } from "@/components/retro/GlitchText";

export function SiteHeader() {
  const host = site.url.replace(/^https?:\/\//, "");
  return (
    <header>
      {/* Fake browser location bar: decoration only. */}
      <div aria-hidden="true" className="hidden items-center gap-2 border-b border-ash bg-coal px-3 py-1 text-[11px] text-dust sm:flex">
        <span className="border border-ash px-1">Location:</span>
        <span className="flex-1 truncate border border-ash bg-ink px-2 text-paper">http://www.{host}/~anakin/index.html</span>
        <span className="pixel border border-ash px-2 text-base leading-none text-yolk">N</span>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1 px-4 pt-4 pb-3 sm:px-6">
        <Link
          href="/"
          className="group pixel flex items-center gap-3 text-6xl leading-none text-paper no-underline hover:bg-transparent hover:text-acid visited:text-paper sm:text-7xl"
          aria-label="ANAKIN, inicio"
        >
          <Image
            src={site.logo.src}
            alt=""
            width={site.logo.width}
            height={site.logo.height}
            priority
            sizes="100px"
            className="h-auto w-20 -rotate-3 transition-transform duration-150 group-hover:rotate-3 motion-reduce:transition-none sm:w-24"
          />
          <GlitchText text="ANAKIN" />
        </Link>
        <div className="pixel pb-1 text-xl leading-tight sm:text-right">
          <p>{site.location}</p>
          <p className="text-dust">{site.tagline}</p>
        </div>
      </div>
    </header>
  );
}
