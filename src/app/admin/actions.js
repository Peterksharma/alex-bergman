"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "./_lib/session";
import {
  createProject,
  updateProject,
  setProjectPublished,
  deleteProject,
  moveProject,
  slugTaken,
  addProjectImage,
  updateImageAlt,
  deleteProjectImage,
  moveProjectImage,
  setCoverImage,
} from "@/db/queries";
import { putObject, deleteObject } from "@/lib/storage";
import { normalizeImage } from "@/lib/images";
import { isValidMediaKey } from "@/lib/media";
import { slugify } from "@/lib/slug";

/* ───────────────────────── shared ───────────────────────── */

/**
 * Every write ends here: the public pages are ISR, so they are told to
 * re-render, and the admin pages are force-dynamic so they re-read on
 * the next request anyway.
 */
function revalidatePublic(slug) {
  revalidatePath("/portfolio");
  revalidatePath("/portfolio/[slug]", "page");
  if (slug) revalidatePath(`/portfolio/${slug}`);
  revalidatePath("/sitemap.xml");
}


function parseTags(raw) {
  return String(raw ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .filter((t, i, arr) => arr.indexOf(t) === i);
}

const MAX_LEN = { name: 120, slug: 120, summary: 300, description: 5000 };

/**
 * Read and validate the project form. Returns { data } or { error }.
 * Validation errors are reported, not thrown, so the form can show them.
 */
async function readProjectForm(formData, exceptId = null) {
  const name = String(formData.get("name") ?? "").trim();
  const slug = slugify(formData.get("slug") || name);
  const summary = String(formData.get("summary") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const tags = parseTags(formData.get("tags"));
  const published = formData.get("published") === "on";

  if (!name) return { error: "Name is required." };
  if (!slug) return { error: "Slug is required." };
  for (const [field, max] of Object.entries(MAX_LEN)) {
    if ({ name, slug, summary, description }[field].length > max) {
      return { error: `${field[0].toUpperCase()}${field.slice(1)} must be at most ${max} characters.` };
    }
  }
  if (await slugTaken(slug, exceptId)) return { error: `The slug "${slug}" is already used by another project.` };

  return { data: { name, slug, summary, description, tags, published } };
}

function parseId(value) {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) throw new Error("Invalid id");
  return id;
}

/* ───────────────────────── project actions ───────────────────────── */

/** Create a project (useActionState signature). Redirects to its editor. */
export async function createProjectAction(_prev, formData) {
  await requireAdmin();
  const result = await readProjectForm(formData);
  if (result.error) return { error: result.error };
  const id = await createProject(result.data);
  revalidatePublic(result.data.slug);
  redirect(`/admin/projects/${id}?created=1`);
}

/** Update a project's fields (useActionState signature). */
export async function updateProjectAction(_prev, formData) {
  await requireAdmin();
  const id = parseId(formData.get("id"));
  const previousSlug = String(formData.get("previousSlug") ?? "");
  const result = await readProjectForm(formData, id);
  if (result.error) return { error: result.error };
  await updateProject(id, result.data);
  revalidatePublic(result.data.slug);
  if (previousSlug && previousSlug !== result.data.slug) revalidatePublic(previousSlug);
  return { ok: true, savedAt: Date.now() };
}

export async function togglePublishedAction(formData) {
  await requireAdmin();
  const id = parseId(formData.get("id"));
  const published = formData.get("published") === "true";
  await setProjectPublished(id, published);
  revalidatePublic();
  revalidatePath("/admin");
}

export async function moveProjectAction(formData) {
  await requireAdmin();
  const id = parseId(formData.get("id"));
  const direction = formData.get("direction") === "up" ? -1 : 1;
  await moveProject(id, direction);
  revalidatePublic();
  revalidatePath("/admin");
}

/** Delete a project, its rows (cascade) and its bucket objects. */
export async function deleteProjectAction(formData) {
  await requireAdmin();
  const id = parseId(formData.get("id"));
  const keys = await deleteProject(id);
  await Promise.allSettled(keys.map((k) => deleteObject(k)));
  revalidatePublic();
  revalidatePath("/admin");
  redirect("/admin?deleted=1");
}

/* ───────────────────────── image actions ───────────────────────── */

const MAX_UPLOAD_BYTES = 25 * 1024 * 1024; // per file, before resizing
const ACCEPTED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif", "image/avif", "image/tiff"]);

/**
 * Object key for a new upload: projects/<slug>/<timestamp>-<rand>.jpg.
 * Keys are never reused, so the cdn route's "immutable" caching is safe
 * and a re-upload of a changed photo is a new URL.
 */
function newImageKey(slug) {
  const stamp = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `projects/${slug}/${stamp}-${rand}.jpg`;
}

/**
 * Upload one or many files for a project (useActionState signature).
 * Each file is normalised with sharp (<= 2000px, JPEG q82), stored in the
 * bucket, and appended to the gallery with its real dimensions. Files are
 * processed sequentially to bound memory on a serverless function.
 * Partial failures are reported per file; successful ones stay.
 */
export async function uploadImagesAction(_prev, formData) {
  await requireAdmin();
  const projectId = parseId(formData.get("projectId"));
  const slug = slugify(formData.get("slug"));
  const files = formData.getAll("files").filter((f) => typeof f === "object" && f && f.size > 0);
  if (files.length === 0) return { error: "Choose at least one image." };

  const failures = [];
  let uploaded = 0;
  for (const file of files) {
    try {
      if (file.size > MAX_UPLOAD_BYTES) throw new Error("larger than 25 MB");
      if (file.type && !ACCEPTED_TYPES.has(file.type)) throw new Error(`unsupported type ${file.type}`);
      const input = Buffer.from(await file.arrayBuffer());
      const { buffer, width, height, contentType } = await normalizeImage(input);
      const key = newImageKey(slug);
      await putObject(key, buffer, contentType);
      await addProjectImage({ projectId, key, width, height, alt: "" });
      uploaded++;
    } catch (err) {
      failures.push(`${file.name}: ${err?.message ?? "failed"}`);
    }
  }

  revalidatePublic(slug);
  revalidatePath(`/admin/projects/${projectId}`);
  if (failures.length) {
    return { error: `Uploaded ${uploaded}; failed: ${failures.join("; ")}`, uploaded };
  }
  return { ok: true, uploaded, savedAt: Date.now() };
}

export async function updateImageAltAction(formData) {
  await requireAdmin();
  const imageId = parseId(formData.get("imageId"));
  const projectId = parseId(formData.get("projectId"));
  const alt = String(formData.get("alt") ?? "").trim().slice(0, 300);
  await updateImageAlt(imageId, alt);
  revalidatePublic(String(formData.get("slug") ?? ""));
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function moveImageAction(formData) {
  await requireAdmin();
  const imageId = parseId(formData.get("imageId"));
  const projectId = parseId(formData.get("projectId"));
  const direction = formData.get("direction") === "up" ? -1 : 1;
  await moveProjectImage(imageId, direction);
  revalidatePublic(String(formData.get("slug") ?? ""));
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function setCoverAction(formData) {
  await requireAdmin();
  const imageId = parseId(formData.get("imageId"));
  const projectId = parseId(formData.get("projectId"));
  await setCoverImage(imageId);
  revalidatePublic(String(formData.get("slug") ?? ""));
  revalidatePath(`/admin/projects/${projectId}`);
}

/** Remove the row first, then the object; a stray object is harmless, a stray row is a broken image. */
export async function deleteImageAction(formData) {
  await requireAdmin();
  const imageId = parseId(formData.get("imageId"));
  const projectId = parseId(formData.get("projectId"));
  const key = await deleteProjectImage(imageId);
  if (key && isValidMediaKey(key)) {
    try {
      await deleteObject(key);
    } catch (err) {
      console.error("bucket delete failed for", key, err);
    }
  }
  revalidatePublic(String(formData.get("slug") ?? ""));
  revalidatePath(`/admin/projects/${projectId}`);
}
