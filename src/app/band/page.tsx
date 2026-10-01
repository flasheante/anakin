import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { members } from "@/data/members";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { BandIntro } from "@/components/band/BandIntro";
import { BandMember } from "@/components/band/BandMember";
import { PixelHeading } from "@/components/retro/PixelHeading";

export const metadata: Metadata = pageMetadata({
  title: "Band",
  description: "ANAKIN: Leo, Luis y Jumpi. Rock, punk, funk y psicodelia desde Mendoza.",
  path: "/band",
});

export default function BandPage() {
  return (
    <Section>
      <PageHeader path="BANDA" title="LA BANDA" />
      <BandIntro />
      <PixelHeading className="mt-14 mb-8" marks={["::", ""]}>
        LINE-UP
      </PixelHeading>
      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        {members.map((m, i) => (
          <li key={m.id}>
            <BandMember member={m} index={i} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
