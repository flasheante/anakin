import type { Show } from "@/data/types";
import { site } from "@/data/site";
import { socialLinks } from "@/data/social";
import { members } from "@/data/members";
import { showTitle } from "./shows";

/** Safe to inline in <script>: escapes "<" so content can't close the tag. */
export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\u003c");
}

export function musicGroupJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "ANAKIN",
    url: site.url,
    genre: site.genres,
    foundingLocation: { "@type": "Place", name: "Mendoza, Argentina" },
    member: members.map((m) => ({ "@type": "Person", name: m.name })),
    sameAs: Object.values(socialLinks).filter(Boolean),
  };
}

export function eventsJsonLd(shows: Show[]) {
  return shows.map((show) => ({
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: showTitle(show),
    startDate: show.date,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: show.venue,
      address: { "@type": "PostalAddress", addressLocality: show.city, addressCountry: show.country },
    },
    performer: [{ "@type": "MusicGroup", name: "ANAKIN" }, ...(show.bands ?? []).map((name) => ({ "@type": "MusicGroup", name }))],
    ...(show.ticketUrl && { offers: { "@type": "Offer", url: show.ticketUrl } }),
    url: `${site.url}/shows#${show.id}`,
  }));
}
