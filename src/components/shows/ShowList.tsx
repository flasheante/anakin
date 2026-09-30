import type { Show } from "@/data/types";
import { getPastShows, getUpcomingShows } from "@/lib/shows";
import { PixelHeading } from "@/components/retro/PixelHeading";
import { ShowCard } from "./ShowCard";

type Props = {
  shows: Show[];
  now?: Date;
  /** Hide the archive (home preview). */
  upcomingOnly?: boolean;
  limit?: number;
};

export function ShowList({ shows, now = new Date(), upcomingOnly, limit }: Props) {
  const upcoming = getUpcomingShows(shows, now).slice(0, limit);
  const past = upcomingOnly ? [] : getPastShows(shows, now);

  return (
    <div className="space-y-14">
      {upcoming.length > 0 ? (
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((show, i) => (
            <li key={show.id}>
              <ShowCard show={show} past={false} index={i} />
            </li>
          ))}
        </ol>
      ) : (
        <p className="pixel border border-dashed border-ash p-6 text-center text-2xl text-dust">
          NO HAY FECHAS CONFIRMADAS. PRONTO MÁS ATAQUES.
        </p>
      )}

      {past.length > 0 && (
        <div>
          <PixelHeading level={2} id="archivo" className="mb-6 text-dust">
            ARCHIVE // PAST SHOWS
          </PixelHeading>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((show) => (
              <li key={show.id}>
                <ShowCard show={show} past />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
