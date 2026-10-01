import type { Show } from "@/data/types";
import { daysUntil, formatLong, formatWeekday, mapUrlFor } from "@/lib/shows";
import { PixelHeading } from "@/components/retro/PixelHeading";
import { RetroButton } from "@/components/retro/RetroButton";
import { Section } from "@/components/layout/Section";

function countdown(days: number) {
  if (days === 0) return "¡¡HOY!!";
  if (days === 1) return "MAÑANA";
  return `FALTAN ${days} DÍAS`;
}

/** Computed from the shows list: the first date that isn't over yet. */
export function NextShow({ show, now = new Date() }: { show: Show | null; now?: Date }) {
  return (
    <Section id="next-show" labelledBy="next-show-title" className="border-y border-paper bg-blood text-ink">
      <PixelHeading level={2} id="next-show-title" className="text-center" marks={[">>>", "<<<"]} marksClassName="text-paper">
        PRÓXIMO SHOW
      </PixelHeading>

      {show ? (
        <div className="mx-auto mt-6 max-w-xl border-2 border-ink bg-ink p-6 text-center text-paper tilt-l">
          <p className="pixel text-2xl text-yolk">
            <span className="blink">{countdown(daysUntil(show.date, now))}</span>
          </p>
          <p className="pixel mt-2 text-6xl leading-none sm:text-7xl">
            <span className="sr-only">{formatWeekday(show.date)} </span>
            <time dateTime={show.date}>{formatLong(show.date)}</time>
          </p>
          <p className="pixel mt-4 text-5xl uppercase text-acid">{show.venue}</p>
          <p className="pixel text-2xl uppercase">{show.city}</p>
          {show.bands && show.bands.length > 0 && (
            <p className="pixel mt-3 text-2xl uppercase">
              <span className="text-dust">CON</span> {show.bands.join(" + ")}
            </p>
          )}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <RetroButton href={`/shows#${show.id}`} hot>
              [ SHOW INFO ]
            </RetroButton>
            <RetroButton href={mapUrlFor(show)} external>
              [ CÓMO LLEGAR ]
            </RetroButton>
          </div>
        </div>
      ) : (
        <p className="pixel mt-6 text-center text-3xl">NO HAY FECHAS CONFIRMADAS. PRONTO MÁS ATAQUES.</p>
      )}
    </Section>
  );
}
