/**
 * Content model. Everything the band edits lives in src/data/*.ts and follows
 * these types, so a CMS can later replace the files without touching components.
 */

export type Show = {
  id: string;
  /** ISO date, YYYY-MM-DD, local to the venue (Mendoza). */
  date: string;
  venue: string;
  city: string;
  country: string;
  /** Guest bands sharing the bill. Anakin is implied. */
  bands?: string[];
  description?: string;
  ticketUrl?: string;
  eventUrl?: string;
  mapUrl?: string;
};

export type Track = {
  title: string;
  /** "mm:ss" */
  duration?: string;
};

export type Release = {
  id: string;
  title: string;
  year: number;
  type: "album" | "ep" | "single";
  /** Path under /public, e.g. "/images/covers/fiesta-distroy.jpg". */
  cover?: string;
  spotifyUrl?: string;
  bandcampUrl?: string;
  youtubeUrl?: string;
  tracks?: Track[];
};

export type Member = {
  id: string;
  name: string;
  roles: string[];
  bio?: string;
  photo?: string;
};

export type Photo = {
  id: string;
  /** Path under /public. Original file is never modified; effects are CSS. */
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  /** Free text or ISO date. */
  date?: string;
  /** Links the photo to a show in shows.ts. */
  showId?: string;
};
