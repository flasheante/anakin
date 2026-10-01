import { shows } from "@/data/shows";
import { releases } from "@/data/releases";
import { members } from "@/data/members";
import { getNextShow } from "@/lib/shows";
import { Hero } from "@/components/home/Hero";
import { NextShow } from "@/components/home/NextShow";
import { Section } from "@/components/layout/Section";
import { PixelHeading } from "@/components/retro/PixelHeading";
import { RetroButton } from "@/components/retro/RetroButton";
import { MusicPlayer } from "@/components/music/MusicPlayer";
import { ShowList } from "@/components/shows/ShowList";
import { BandIntro } from "@/components/band/BandIntro";
import { PhotoGrid } from "@/components/photos/PhotoGrid";
import { SocialLinks } from "@/components/contact/SocialLinks";

function SectionHead({ id, title, href, cta }: { id: string; title: string; href: string; cta: string }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-ash pb-3">
      <PixelHeading id={id} marks={["::", ""]}>
        {title}
      </PixelHeading>
      <RetroButton href={href}>{cta}</RetroButton>
    </div>
  );
}

export default function HomePage() {
  const now = new Date();
  const latest = [...releases].sort((a, b) => b.year - a.year)[0];

  return (
    <>
      <Hero />
      <NextShow show={getNextShow(shows, now)} now={now} />

      <Section labelledBy="home-music">
        <SectionHead id="home-music" title="MÚSICA" href="/music" cta="DISCOGRAFÍA →" />
        {latest && <MusicPlayer release={latest} />}
      </Section>

      <Section labelledBy="home-shows" className="halftone">
        <SectionHead id="home-shows" title="LIVE / SHOWS / GIGS" href="/shows" cta="TODAS LAS FECHAS →" />
        <ShowList shows={shows} now={now} upcomingOnly limit={3} />
      </Section>

      <Section labelledBy="home-band">
        <SectionHead id="home-band" title="LA BANDA" href="/band" cta="LA BANDA →" />
        <BandIntro headingLevel={3} />
        <ul className="pixel mt-8 grid grid-cols-3 gap-2 text-center sm:gap-4">
          {members.map((m) => (
            <li key={m.id} className="border border-ash p-3">
              <span className="block text-3xl uppercase">{m.name}</span>
              <span className="block text-lg text-yolk uppercase">{m.roles.join(" / ")}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="home-photos" className="border-t border-ash">
        <SectionHead id="home-photos" title="ARCHIVO FOTOS" href="/photos" cta="VER TODO →" />
        <PhotoGrid limit={6} />
      </Section>

      <Section labelledBy="home-social" className="border-t border-ash text-center">
        <PixelHeading id="home-social" className="mb-6">
          FOLLOW THE SIGNAL
        </PixelHeading>
        <SocialLinks className="justify-center" />
      </Section>
    </>
  );
}
