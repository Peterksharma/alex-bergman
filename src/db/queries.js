import "server-only";
import { asc, desc, eq, sql, and, inArray } from "drizzle-orm";
import { db } from "./client";
import { projects, projectImages } from "./schema";
import { mediaUrl } from "@/lib/media";

/*
 * Caching strategy — page-level ISR, not per-query caching.
 *
 * The public portfolio pages export `revalidate = 3600`, so Next renders
 * them at most once an hour (and immediately on `revalidatePath` after an
 * admin write). That already collapses every read below into one DB
 * round-trip per page per hour, so wrapping them in `unstable_cache` would
 * add a second cache with its own invalidation keys for no gain. `use
 * cache` would be the Next 16 idiom, but it requires `cacheComponents`,
 * which changes rendering semantics for the whole site; that migration is
 * out of scope here. Admin pages are `force-dynamic` and always read live.
 */

/* ───────────────────────── shape helpers ───────────────────────── */

/**
 * Convert an image row into the plain object the UI consumes.
 * `src` is resolved here so no component needs to know about buckets.
 */
export function toPublicImage(row, projectName) {
  return {
    id: row.id,
    key: row.key,
    src: mediaUrl(row.key),
    alt: row.alt || projectName,
    width: row.width,
    height: row.height,
    sortOrder: row.sortOrder,
  };
}

/** Project row + images → the plain `project` object pages receive. */
function toPublicProject(row, imageRows) {
  const images = imageRows.map((img) => toPublicImage(img, row.name));
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    summary: row.summary,
    description: row.description,
    tags: row.tags ?? [],
    sortOrder: row.sortOrder,
    published: row.published,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    url: `/portfolio/${row.slug}`,
    images,
    cover: images[0] ?? null, // lowest sortOrder = cover, by invariant
  };
}

/** Group image rows by project id, preserving the query's ordering. */
function groupImages(imageRows) {
  const byProject = new Map();
  for (const img of imageRows) {
    if (!byProject.has(img.projectId)) byProject.set(img.projectId, []);
    byProject.get(img.projectId).push(img);
  }
  return byProject;
}

const imageOrder = [asc(projectImages.sortOrder), asc(projectImages.id)];
const projectOrder = [asc(projects.sortOrder), asc(projects.id)];

/* ───────────────────────── public reads ───────────────────────── */

/**
 * Published projects in display order, each with its full image list.
 * Two queries (projects, then images for those ids) rather than N+1.
 */
export async function listPublishedProjects() {
  const rows = await db.select().from(projects).where(eq(projects.published, true)).orderBy(...projectOrder);
  if (rows.length === 0) return [];
  const imgs = await db
    .select()
    .from(projectImages)
    .where(inArray(projectImages.projectId, rows.map((r) => r.id)))
    .orderBy(...imageOrder);
  const grouped = groupImages(imgs);
  return rows.map((r) => toPublicProject(r, grouped.get(r.id) ?? []));
}

/** Slugs of published projects, for generateStaticParams. */
export async function listPublishedSlugs() {
  const rows = await db.select({ slug: projects.slug }).from(projects).where(eq(projects.published, true));
  return rows.map((r) => r.slug);
}

/** One published project by slug, or null. */
export async function getProjectBySlug(slug) {
  const [row] = await db
    .select()
    .from(projects)
    .where(and(eq(projects.slug, slug), eq(projects.published, true)))
    .limit(1);
  if (!row) return null;
  const imgs = await db.select().from(projectImages).where(eq(projectImages.projectId, row.id)).orderBy(...imageOrder);
  return toPublicProject(row, imgs);
}

/* ───────────────────────── admin reads ───────────────────────── */

/** Every project (published or not) in display order, with cover only. */
export async function listAllProjects() {
  const rows = await db.select().from(projects).orderBy(...projectOrder);
  if (rows.length === 0) return [];
  const imgs = await db
    .select()
    .from(projectImages)
    .where(inArray(projectImages.projectId, rows.map((r) => r.id)))
    .orderBy(...imageOrder);
  const grouped = groupImages(imgs);
  return rows.map((r) => {
    const p = toPublicProject(r, grouped.get(r.id) ?? []);
    return { ...p, imageCount: p.images.length };
  });
}

/** One project by id regardless of publish state, or null. */
export async function getProjectById(id) {
  const [row] = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  if (!row) return null;
  const imgs = await db.select().from(projectImages).where(eq(projectImages.projectId, row.id)).orderBy(...imageOrder);
  return toPublicProject(row, imgs);
}

/** True if another project (not `exceptId`) already owns `slug`. */
export async function slugTaken(slug, exceptId = null) {
  const rows = await db.select({ id: projects.id }).from(projects).where(eq(projects.slug, slug)).limit(1);
  return rows.length > 0 && rows[0].id !== exceptId;
}

/* ───────────────────────── writers ───────────────────────── */

/**
 * Insert a project at the end of the display order.
 * @param {{slug:string,name:string,summary?:string,description?:string,tags?:string[],published?:boolean}} data
 * @returns {Promise<number>} new id
 */
export async function createProject(data) {
  const [{ max }] = await db.select({ max: sql`coalesce(max(${projects.sortOrder}), -1)` }).from(projects);
  const [row] = await db
    .insert(projects)
    .values({ ...data, sortOrder: Number(max) + 1 })
    .returning({ id: projects.id });
  return row.id;
}

/** Patch the editable fields of a project and bump updatedAt. */
export async function updateProject(id, data) {
  await db
    .update(projects)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(projects.id, id));
}

/** Flip `published`. */
export async function setProjectPublished(id, published) {
  await updateProject(id, { published });
}

/**
 * Delete a project. Returns the image keys that were attached so the
 * caller can remove the bucket objects (DB cascade handles the rows).
 */
export async function deleteProject(id) {
  const keys = await db.select({ key: projectImages.key }).from(projectImages).where(eq(projectImages.projectId, id));
  await db.delete(projects).where(eq(projects.id, id));
  return keys.map((k) => k.key);
}

/**
 * Move a project one step up (direction = -1) or down (+1) in display
 * order by swapping sortOrder with its neighbour. Because sortOrder values
 * are first normalised to 0..n-1 (a single UPDATE over a window function),
 * the swap is always between distinct consecutive integers, which keeps the
 * order total even if earlier writes left gaps or duplicates. O(n) once,
 * then O(1).
 */
export async function moveProject(id, direction) {
  await db.transaction(async (tx) => {
    await tx.execute(sql`
      update projects p set sort_order = r.rn
      from (select id, row_number() over (order by sort_order, id) - 1 as rn from projects) r
      where p.id = r.id and p.sort_order <> r.rn`);
    const [me] = await tx.select({ sortOrder: projects.sortOrder }).from(projects).where(eq(projects.id, id));
    if (!me) return;
    const target = me.sortOrder + direction;
    const [neighbour] = await tx.select({ id: projects.id }).from(projects).where(eq(projects.sortOrder, target));
    if (!neighbour) return; // already at an end
    await tx.update(projects).set({ sortOrder: target }).where(eq(projects.id, id));
    await tx.update(projects).set({ sortOrder: me.sortOrder }).where(eq(projects.id, neighbour.id));
  });
}

/* ───────────────────────── image writers ───────────────────────── */

/** Append an image to a project's gallery (after the current last). */
export async function addProjectImage({ projectId, key, width, height, alt = "", sortOrder = null }) {
  let order = sortOrder;
  if (order == null) {
    const [{ max }] = await db
      .select({ max: sql`coalesce(max(${projectImages.sortOrder}), -1)` })
      .from(projectImages)
      .where(eq(projectImages.projectId, projectId));
    order = Number(max) + 1;
  }
  const [row] = await db
    .insert(projectImages)
    .values({ projectId, key, width, height, alt, sortOrder: order })
    .returning({ id: projectImages.id });
  await touchProject(projectId);
  return row.id;
}

export async function updateImageAlt(imageId, alt) {
  const [row] = await db
    .update(projectImages)
    .set({ alt })
    .where(eq(projectImages.id, imageId))
    .returning({ projectId: projectImages.projectId });
  if (row) await touchProject(row.projectId);
}

/** Remove an image row; returns its key (for bucket cleanup) or null. */
export async function deleteProjectImage(imageId) {
  const [row] = await db
    .delete(projectImages)
    .where(eq(projectImages.id, imageId))
    .returning({ key: projectImages.key, projectId: projectImages.projectId });
  if (!row) return null;
  await touchProject(row.projectId);
  return row.key;
}

/**
 * Reorder images within one project. Same normalise-then-swap scheme as
 * moveProject, scoped to the project. `direction` is -1 (up) or +1 (down).
 */
export async function moveProjectImage(imageId, direction) {
  await db.transaction(async (tx) => {
    const [me] = await tx
      .select({ projectId: projectImages.projectId })
      .from(projectImages)
      .where(eq(projectImages.id, imageId));
    if (!me) return;
    await normaliseImageOrder(tx, me.projectId);
    const [cur] = await tx.select({ sortOrder: projectImages.sortOrder }).from(projectImages).where(eq(projectImages.id, imageId));
    const target = cur.sortOrder + direction;
    const [neighbour] = await tx
      .select({ id: projectImages.id })
      .from(projectImages)
      .where(and(eq(projectImages.projectId, me.projectId), eq(projectImages.sortOrder, target)));
    if (!neighbour) return;
    await tx.update(projectImages).set({ sortOrder: target }).where(eq(projectImages.id, imageId));
    await tx.update(projectImages).set({ sortOrder: cur.sortOrder }).where(eq(projectImages.id, neighbour.id));
    await touchProject(me.projectId, tx);
  });
}

/**
 * Make an image the cover by moving it to the front: it takes sortOrder 0
 * and every image that was ahead of it shifts back by one. Relative order
 * of the others is preserved, and the "lowest sortOrder = cover" invariant
 * holds with no separate flag to keep in sync.
 */
export async function setCoverImage(imageId) {
  await db.transaction(async (tx) => {
    const [me] = await tx
      .select({ projectId: projectImages.projectId })
      .from(projectImages)
      .where(eq(projectImages.id, imageId));
    if (!me) return;
    await normaliseImageOrder(tx, me.projectId);
    const [cur] = await tx.select({ sortOrder: projectImages.sortOrder }).from(projectImages).where(eq(projectImages.id, imageId));
    await tx.execute(sql`
      update project_images set sort_order = sort_order + 1
      where project_id = ${me.projectId} and sort_order < ${cur.sortOrder}`);
    await tx.update(projectImages).set({ sortOrder: 0 }).where(eq(projectImages.id, imageId));
    await touchProject(me.projectId, tx);
  });
}

/** Renumber a project's images 0..n-1 by (sortOrder, id). */
async function normaliseImageOrder(tx, projectId) {
  await tx.execute(sql`
    update project_images i set sort_order = r.rn
    from (select id, row_number() over (order by sort_order, id) - 1 as rn
          from project_images where project_id = ${projectId}) r
    where i.id = r.id and i.sort_order <> r.rn`);
}

/** Bump updatedAt so the sitemap's lastmod reflects gallery edits too. */
async function touchProject(projectId, tx = db) {
  await tx.update(projects).set({ updatedAt: new Date() }).where(eq(projects.id, projectId));
}
