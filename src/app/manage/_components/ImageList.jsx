import Image from "next/image";
import SurfaceCard from "@/components/common/SurfaceCard";
import { inputClass } from "./Field";
import ConfirmSubmit from "./ConfirmSubmit";
import { deleteImageAction, moveImageAction, setCoverAction, updateImageAltAction } from "../actions";

const btn =
  "font-mono text-[11px] uppercase tracking-widest border border-tone-line/40 rounded px-2 py-1 " +
  "text-tone-heading hover:bg-tone-line/10 disabled:opacity-30 disabled:cursor-not-allowed";

/**
 * ImageList — the gallery editor. Each row is a thumbnail plus small
 * independent forms (alt text, up/down, set as cover, delete), so every
 * change is one request and the server re-renders the list. The first
 * row is the cover by the sort_order invariant.
 */
export default function ImageList({ project }) {
  const { images } = project;
  if (images.length === 0) {
    return <p className="text-sm text-tone-muted">No photos yet. Upload some below.</p>;
  }

  const hidden = (imageId) => (
    <>
      <input type="hidden" name="imageId" value={imageId} />
      <input type="hidden" name="projectId" value={project.id} />
      <input type="hidden" name="slug" value={project.slug} />
    </>
  );

  return (
    <ol className="space-y-3">
      {images.map((img, i) => (
        <li key={img.id}>
          <SurfaceCard className="flex flex-col sm:flex-row sm:items-center gap-4 p-3">
            <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded bg-ink/10">
              <Image src={img.src} alt={img.alt} fill sizes="144px" className="object-cover" />
              {i === 0 && (
                <span className="absolute left-1 top-1 rounded-full bg-amber-500 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink">
                  Cover
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1 space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-tone-muted">
                {i + 1} / {images.length} · {img.width}×{img.height}
              </p>
              <form action={updateImageAltAction} className="flex gap-2">
                {hidden(img.id)}
                <input
                  name="alt"
                  defaultValue={img.alt}
                  maxLength={300}
                  placeholder="Alt text (describe the photo)"
                  aria-label={`Alt text for photo ${i + 1}`}
                  className={`${inputClass} text-sm`}
                />
                <button type="submit" className={btn}>Save</button>
              </form>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <form action={moveImageAction} className="flex gap-1">
                {hidden(img.id)}
                <button type="submit" name="direction" value="up" className={btn} disabled={i === 0} aria-label={`Move photo ${i + 1} up`}>↑</button>
                <button type="submit" name="direction" value="down" className={btn} disabled={i === images.length - 1} aria-label={`Move photo ${i + 1} down`}>↓</button>
              </form>
              <form action={setCoverAction}>
                {hidden(img.id)}
                <button type="submit" className={btn} disabled={i === 0}>Set as cover</button>
              </form>
              <form action={deleteImageAction}>
                {hidden(img.id)}
                <ConfirmSubmit message="Delete this photo? This cannot be undone." className={`${btn} text-red-700 border-red-700/40 hover:bg-red-700/10`}>
                  Delete
                </ConfirmSubmit>
              </form>
            </div>
          </SurfaceCard>
        </li>
      ))}
    </ol>
  );
}
