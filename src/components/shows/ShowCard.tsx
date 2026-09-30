import type { Show } from "@/data/types";
import { calendarUrlFor, formatSlashes, formatWeekday, mapUrlFor } from "@/lib/shows";

type Props = {
  show: Show;
  past: boolean;
  /** Visual rotation variant so the grid looks pinned by hand. */
  index?: number;
};

const tilts = ["tilt-l", "", "tilt-r", "nudge-x"];

/** One gig as a photocopied flyer. Past gigs stay visible, stamped ARCHIVED. */
export function ShowCard({ show, past, index = 0 }: Props) {
  const guests = show.bands ?? [];
  const actionCls = "pixel text-lg";

  return (
    <article
      id={show.id}
      aria-label={`${formatSlashes(show.date)}, ${show.venue}${past ? " (show pasado)" : ""}`}
      className={`relative scroll-mt-6 border bg-coal p-5 text-center ${
        past ? "border-ash text-dust grayscale" : `border-paper halftone ${tilts[index % tilts.length]}`
      }`}
    >
      {past && (
        <span className="stamp absolute top-3 right-3 text-blood">
          ARCHIVED
        </span>
      )}

      <p className="pixel text-lg tracking-widest text-dust">
        {past ? "PAST SHOW" : formatWeekday(show.date)}
      </p>
      <p className={`pixel text-5xl leading-none ${past ? "line-through decoration-2" : "text-yolk"}`}>
        <time dateTime={show.date}>{formatSlashes(show.date)}</time>
      </p>

      <div aria-hidden="true" className="ascii-rule ascii-rule--dash my-3" />

      <h3 className={`pixel text-4xl uppercase ${past ? "" : "text-paper"}`}>{show.venue}</h3>
      <p className="pixel text-xl uppercase">{show.city}</p>

      <p className="pixel mt-4 text-2xl leading-tight uppercase">
        <span className={past ? "" : "text-blood"}>ANAKIN</span>
        {guests.length === 0 ? (
          <span className="block text-xl">LIVE</span>
        ) : (
          guests.map((band) => (
            <span key={band} className="block">
              <span aria-hidden="true" className="block text-lg text-dust">
                +
              </span>
              <span className="sr-only">con </span>
              {band}
            </span>
          ))
        )}
      </p>

      {show.description && <p className="mt-3 text-sm">{show.description}</p>}

      {!past && (
        <ul className="mt-5 flex flex-wrap justify-center gap-x-3 gap-y-1">
          {show.ticketUrl && (
            <li>
              <a className={`${actionCls} font-bold`} href={show.ticketUrl} target="_blank" rel="noopener noreferrer">
                [ENTRADAS]<span className="sr-only"> para {show.venue} (pestaña nueva)</span>
              </a>
            </li>
          )}
          <li>
            <a className={actionCls} href={mapUrlFor(show)} target="_blank" rel="noopener noreferrer">
              [MAPA]<span className="sr-only"> de {show.venue} (pestaña nueva)</span>
            </a>
          </li>
          <li>
            <a className={actionCls} href={calendarUrlFor(show)} target="_blank" rel="noopener noreferrer">
              [+AGENDA]<span className="sr-only"> agregar {show.venue} al calendario (pestaña nueva)</span>
            </a>
          </li>
          {show.eventUrl && (
            <li>
              <a className={actionCls} href={show.eventUrl} target="_blank" rel="noopener noreferrer">
                [EVENTO]<span className="sr-only"> de {show.venue} (pestaña nueva)</span>
              </a>
            </li>
          )}
        </ul>
      )}
    </article>
  );
}
