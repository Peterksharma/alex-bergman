/**
 * media.js — the single place that turns a bucket object key into a URL.
 *
 * Railway buckets are private (no public object URLs), so by default every
 * key is served through our own `/cdn/[...key]` route handler, which
 * streams the object with a one-year immutable Cache-Control header. Vercel's
 * edge caches those responses, so after the first hit per region the route
 * behaves like a CDN and the bucket is never touched again for that key.
 *
 * If the bucket is ever fronted by a public host, set
 * NEXT_PUBLIC_MEDIA_BASE_URL to that origin and the same keys resolve to
 * direct URLs with no code change.
 *
 * This module is dependency-free so client components can import it.
 */

const PUBLIC_BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL || "").replace(/\/+$/, "");

/**
 * Validate an object key: relative, slash-separated, no traversal, no
 * empty segments, only URL-safe characters. The same rule is enforced by
 * the cdn route so a key that passes here is always servable.
 *
 * @param {string} key
 * @returns {boolean}
 */
export function isValidMediaKey(key) {
  if (typeof key !== "string" || key.length === 0 || key.length > 512) return false;
  if (key.startsWith("/") || key.includes("//") || key.endsWith("/")) return false;
  return key.split("/").every((seg) => seg !== "" && seg !== "." && seg !== ".." && /^[A-Za-z0-9._-]+$/.test(seg));
}

/**
 * URL at which a bucket object is publicly reachable.
 *
 * Precondition: `isValidMediaKey(key)`.
 * The key is encoded segment-by-segment so slashes survive and any other
 * reserved character is escaped exactly once.
 *
 * @param {string} key e.g. "projects/attic-remodel/1.jpg"
 * @returns {string} "/cdn/projects/attic-remodel/1.jpg" or the public URL
 */
export function mediaUrl(key) {
  const path = key.split("/").map(encodeURIComponent).join("/");
  return PUBLIC_BASE ? `${PUBLIC_BASE}/${path}` : `/cdn/${path}`;
}
