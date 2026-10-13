"use client";

import { useActionState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { uploadImagesAction } from "../actions";
import { Field } from "./Field";

/**
 * UploadForm — pick one or many photos; the server action resizes and
 * stores them. The file input is cleared after a successful upload so a
 * second submit does not re-send the same files.
 */
export default function UploadForm({ projectId, slug }) {
  const [state, formAction, pending] = useActionState(
    async (prev, formData) => {
      const result = await uploadImagesAction(prev, formData);
      if (result?.ok && inputRef.current) inputRef.current.value = "";
      return result;
    },
    {}
  );
  const inputRef = useRef(null);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="projectId" value={projectId} />
      <input type="hidden" name="slug" value={slug} />
      <Field label="Add photos" htmlFor="files" hint="JPEG, PNG, WebP or HEIC, up to 25 MB each. Photos are resized to 2000px and converted to JPEG.">
        <input
          ref={inputRef}
          id="files"
          name="files"
          type="file"
          accept="image/*"
          multiple
          required
          className="block w-full text-sm text-tone-body file:mr-4 file:rounded-md file:border file:border-tone-line/40 file:bg-paper file:px-3 file:py-2 file:font-mono file:text-[11px] file:uppercase file:tracking-widest file:text-tone-heading hover:file:bg-tone-line/10"
        />
      </Field>
      <div className="flex items-center gap-4" aria-live="polite">
        <Button type="submit" variant="cta" disabled={pending}>
          {pending ? "Uploading…" : "Upload"}
        </Button>
        {state?.error && <p className="text-sm font-medium text-red-700">{state.error}</p>}
        {state?.ok && !pending && (
          <p className="text-sm text-tone-muted font-mono uppercase tracking-widest">
            {state.uploaded} photo{state.uploaded === 1 ? "" : "s"} added
          </p>
        )}
      </div>
    </form>
  );
}
