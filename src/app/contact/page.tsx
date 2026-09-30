import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { contact } from "@/data/social";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { RetroWindow } from "@/components/retro/RetroWindow";
import { SocialLinks } from "@/components/contact/SocialLinks";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Booking y contacto de ANAKIN.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section>
      <PageHeader path="CONTACT" title="CONTACT / BOOKING" />
      <RetroWindow title="BOOKING.TXT" className="mx-auto max-w-2xl tilt-l">
        <p className="pixel text-4xl sm:text-5xl">WANT ANAKIN TO PLAY?</p>
        <p className="mt-3">Fechas, festivales, prensa o lo que sea: escribinos.</p>
        <p className="pixel mt-6 text-lg text-dust">CONTACT</p>
        <p className="pixel text-3xl break-all sm:text-4xl">
          <a href={`mailto:${contact.bookingEmail}`}>{contact.bookingEmail}</a>
        </p>
      </RetroWindow>

      <h2 className="pixel mt-14 mb-6 text-center text-4xl">ELSEWHERE ON THE NET</h2>
      <SocialLinks className="justify-center" />
    </Section>
  );
}
