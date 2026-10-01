import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { releases } from "@/data/releases";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { MusicPlayer } from "@/components/music/MusicPlayer";
import { ReleaseCard } from "@/components/music/ReleaseCard";
import { PixelHeading } from "@/components/retro/PixelHeading";

export const metadata: Metadata = pageMetadata({
  title: "Music",
  description: "Discografía de ANAKIN: Fiesta Distroy Vol. 1, Incidente en el Oeste, Re Firme y Más Allá De.",
  path: "/music",
});

export default function MusicPage() {
  const sorted = [...releases].sort((a, b) => b.year - a.year);
  const [latest] = sorted;

  return (
    <Section>
      <PageHeader path="MUSICA" title="MÚSICA" />
      {latest && (
        <div className="mb-14">
          <MusicPlayer release={latest} />
        </div>
      )}
      <PixelHeading className="mb-8" marks={["::", ""]}>
        DISCOGRAFÍA
      </PixelHeading>
      <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((r, i) => (
          <li key={r.id}>
            <ReleaseCard release={r} index={i} />
          </li>
        ))}
      </ol>
    </Section>
  );
}
