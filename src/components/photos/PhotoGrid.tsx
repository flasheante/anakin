import { photos as allPhotos } from "@/data/photos";
import { shows } from "@/data/shows";
import { formatSlashes } from "@/lib/shows";
import { PhotoGallery, type GalleryPhoto } from "./PhotoGallery";

/** Resolves show references on the server, then hands off to the interactive gallery. */
export function PhotoGrid({ limit }: { limit?: number }) {
  const photos: GalleryPhoto[] = allPhotos.slice(0, limit).map((p) => {
    const show = p.showId ? shows.find((s) => s.id === p.showId) : undefined;
    return show ? { ...p, showLabel: `${show.venue.toUpperCase()} ${formatSlashes(show.date)}` } : p;
  });
  return <PhotoGallery photos={photos} />;
}
