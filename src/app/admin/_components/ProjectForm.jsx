"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/slug";
import { Field, inputClass } from "./Field";

/**
 * ProjectForm — name, slug, summary, description, tags, published.
 *
 * The slug follows the name until the user edits the slug field by hand
 * (`slugTouched`); after that it is theirs. Either way the value sent is
 * run through slugify on the server, so what the user sees is what is
 * stored.
 *
 * `action` is createProjectAction or updateProjectAction; both use the
 * useActionState signature and return { error } or { ok, savedAt }.
 */
export default function ProjectForm({ action, project, submitLabel = "Save" }) {
  const [state, formAction, pending] = useActionState(action, {});
  const [name, setName] = useState(project?.name ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(project?.slug));

  function onNameChange(e) {
    setName(e.target.value);
    if (!slugTouched) setSlug(slugify(e.target.value));
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {project && <input type="hidden" name="id" value={project.id} />}
      {project && <input type="hidden" name="previousSlug" value={project.slug} />}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <input id="name" name="name" required maxLength={120} value={name} onChange={onNameChange} className={inputClass} />
        </Field>
        <Field label="Slug" htmlFor="slug" hint={`Public address: /portfolio/${slug || "…"}`}>
          <input
            id="slug"
            name="slug"
            required
            maxLength={120}
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
            }}
            onBlur={(e) => setSlug(slugify(e.target.value))}
            className={`${inputClass} font-mono`}
          />
        </Field>
      </div>

      <Field label="Summary" htmlFor="summary" hint="One sentence shown on the portfolio card and in search results.">
        <input id="summary" name="summary" maxLength={300} defaultValue={project?.summary ?? ""} className={inputClass} />
      </Field>

      <Field label="Description" htmlFor="description">
        <textarea id="description" name="description" rows={8} maxLength={5000} defaultValue={project?.description ?? ""} className={inputClass} />
      </Field>

      <Field label="Tags" htmlFor="tags" hint="Comma-separated, e.g. Residential, Remodel, ADU">
        <input id="tags" name="tags" defaultValue={(project?.tags ?? []).join(", ")} className={inputClass} />
      </Field>

      <label className="flex items-center gap-3 text-tone-heading">
        <input type="checkbox" name="published" defaultChecked={project ? project.published : true} className="size-4 accent-amber-500" />
        <span className="font-mono text-[11px] uppercase tracking-widest">Published</span>
      </label>

      <div className="flex items-center gap-4" aria-live="polite">
        <Button type="submit" variant="cta" size="lg" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
        {state?.error && <p className="text-sm font-medium text-red-700">{state.error}</p>}
        {state?.ok && !pending && (
          <p className="text-sm text-tone-muted font-mono uppercase tracking-widest">Saved</p>
        )}
      </div>
    </form>
  );
}
