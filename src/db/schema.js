import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

/**
 * projects — one row per portfolio project.
 *
 * Invariants:
 *   - `slug` is unique and is the public URL segment (/portfolio/<slug>).
 *   - `sortOrder` is the manual display order on /portfolio; lower first.
 *     Ties are broken by `id` so the order is total and deterministic.
 *   - `published = false` hides a project from every public surface
 *     (grid, detail page, sitemap) but keeps it editable in /admin.
 *   - `tags` is a Postgres text[]; an empty array is the "no tags" value,
 *     never NULL, so callers can map over it without a guard.
 *   - `updatedAt` is maintained by the writers in queries.js (not a trigger)
 *     and feeds <lastmod> in the sitemap.
 */
export const projects = pgTable(
  "projects",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    summary: text("summary").notNull().default(""),
    description: text("description").notNull().default(""),
    tags: text("tags").array().notNull().default([]),
    sortOrder: integer("sort_order").notNull().default(0),
    published: boolean("published").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("projects_sort_order_idx").on(t.sortOrder, t.id)]
);

/**
 * project_images — the gallery for a project, ordered by `sortOrder`.
 *
 * Invariants:
 *   - `key` is the object key in the arbergman-media bucket
 *     (e.g. "projects/attic-remodel/1.jpg"); it is unique because one
 *     object is never two gallery entries.
 *   - `width`/`height` are the stored pixel dimensions, recorded at upload
 *     time so <Image> can reserve layout without a round-trip.
 *   - The cover image is the row with the lowest `sortOrder` (ties by id).
 *     "Set as cover" therefore means "move to the front", not a flag, so
 *     there is exactly one cover by construction.
 *   - Deleting a project cascades to its images (the bucket objects are
 *     removed by the application, see queries.js).
 */
export const projectImages = pgTable(
  "project_images",
  {
    id: serial("id").primaryKey(),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    key: text("key").notNull().unique(),
    width: integer("width").notNull(),
    height: integer("height").notNull(),
    alt: text("alt").notNull().default(""),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("project_images_project_sort_idx").on(t.projectId, t.sortOrder, t.id)]
);
