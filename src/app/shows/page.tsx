import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { shows } from "@/data/shows";
import { getUpcomingShows } from "@/lib/shows";
import { eventsJsonLd } from "@/lib/jsonld";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { ShowList } from "@/components/shows/ShowList";
import { JsonLd } from "@/components/retro/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Shows",
  description: "Próximas fechas de ANAKIN en Mendoza y archivo de shows.",
  path: "/shows",
});

export default function ShowsPage() {
  const now = new Date();
  return (
    <Section>
      <PageHeader path="SHOWS" title="LIVE / SHOWS / GIGS">
        Fechas confirmadas. Las pasadas quedan en el archivo.
      </PageHeader>
      <ShowList shows={shows} now={now} />
      <JsonLd data={eventsJsonLd(getUpcomingShows(shows, now))} />
    </Section>
  );
}
