import type { Show } from "@/data/types";
import { site } from "@/data/site";

const MONTHS = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
const WEEKDAYS = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];

/** Today's date as YYYY-MM-DD in the band's time zone, so shows flip at local midnight. */
export function todayIn(timeZone: string = site.timeZone, now: Date = new Date()): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** A show is past once its day is over in the venue's time zone. Show day itself is still upcoming. */
export function isPastShow(show: Pick<Show, "date">, now: Date = new Date()): boolean {
  return show.date < todayIn(site.timeZone, now);
}

export function sortShows<T extends Pick<Show, "date">>(shows: readonly T[], order: "asc" | "desc" = "asc"): T[] {
  const sorted = [...shows].sort((a, b) => a.date.localeCompare(b.date));
  return order === "asc" ? sorted : sorted.reverse();
}

export function getUpcomingShows<T extends Pick<Show, "date">>(shows: readonly T[], now: Date = new Date()): T[] {
  return sortShows(shows.filter((s) => !isPastShow(s, now)));
}

export function getPastShows<T extends Pick<Show, "date">>(shows: readonly T[], now: Date = new Date()): T[] {
  return sortShows(
    shows.filter((s) => isPastShow(s, now)),
    "desc",
  );
}

export function getNextShow<T extends Pick<Show, "date">>(shows: readonly T[], now: Date = new Date()): T | null {
  return getUpcomingShows(shows, now)[0] ?? null;
}

function parts(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  // Noon UTC avoids any zone shifting the weekday.
  const weekday = new Date(Date.UTC(y, m - 1, d, 12)).getUTCDay();
  return { y, m, d, weekday };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** "07 OCT 2026" */
export function formatLong(date: string): string {
  const { y, m, d } = parts(date);
  return `${pad(d)} ${MONTHS[m - 1]} ${y}`;
}

/** "07 / 10 / 26" */
export function formatSlashes(date: string): string {
  const { y, m, d } = parts(date);
  return `${pad(d)} / ${pad(m)} / ${String(y).slice(-2)}`;
}

/** "07 OCT" */
export function formatShort(date: string): string {
  const { m, d } = parts(date);
  return `${pad(d)} ${MONTHS[m - 1]}`;
}

/** "MIÉ" */
export function formatWeekday(date: string): string {
  return WEEKDAYS[parts(date).weekday];
}

export function mapUrlFor(show: Show): string {
  if (show.mapUrl) return show.mapUrl;
  const q = encodeURIComponent(`${show.venue}, ${show.city}, ${show.country}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/** Google Calendar "add event" link as an all-day event. */
export function calendarUrlFor(show: Show): string {
  const start = show.date.replaceAll("-", "");
  const { y, m, d } = parts(show.date);
  const next = new Date(Date.UTC(y, m - 1, d + 1));
  const end = `${next.getUTCFullYear()}${pad(next.getUTCMonth() + 1)}${pad(next.getUTCDate())}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: showTitle(show),
    dates: `${start}/${end}`,
    location: `${show.venue}, ${show.city}, ${show.country}`,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

export function showTitle(show: Show): string {
  const guests = show.bands?.length ? ` + ${show.bands.join(" + ")}` : "";
  return `ANAKIN${guests} en ${show.venue}`;
}

/** Whole days from today (venue time zone) to the show. 0 = today. */
export function daysUntil(date: string, now: Date = new Date()): number {
  const toUtc = (iso: string) => {
    const { y, m, d } = parts(iso);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((toUtc(date) - toUtc(todayIn(site.timeZone, now))) / 86_400_000);
}
