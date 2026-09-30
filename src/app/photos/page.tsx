import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { PhotoGrid } from "@/components/photos/PhotoGrid";

export const metadata: Metadata = pageMetadata({
  title: "Photos",
  description: "Archivo de fotos de ANAKIN: shows, backstage y flyers.",
  path: "/photos",
});

export default function PhotosPage() {
  return (
    <Section>
      <PageHeader path="PHOTOS" title="PHOTO ARCHIVE">
        Tocá una foto para verla en grande y sin filtro.
      </PageHeader>
      <PhotoGrid />
    </Section>
  );
}
