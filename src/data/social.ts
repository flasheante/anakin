/**
 * Single source for every external link and contact address.
 * Leave a value as "" and the site shows it as "SOON" instead of a broken link.
 */
export const socialLinks = {
  spotify: "https://open.spotify.com/artist/13vo008hHsTD8ayhNOK8ZF",
  bandcamp: "https://ana-kin.bandcamp.com/",
  instagram: "https://www.instagram.com/anakinbanda/",
  youtube: "https://www.youtube.com/@anakinbanda",
};

export type SocialKey = keyof typeof socialLinks;

export const socialLabels: Record<SocialKey, string> = {
  spotify: "Spotify",
  bandcamp: "Bandcamp",
  instagram: "Instagram",
  youtube: "YouTube",
};

// Display order: listening platforms first, then the rest.
export const socialOrder: SocialKey[] = ["spotify", "bandcamp", "youtube", "instagram"];

export const contact = {
  bookingEmail: "booking@example.com",
};
