/**
 * slugify — lower-case ASCII, words joined by single hyphens, no leading or
 * trailing hyphen. Deterministic and idempotent (slugify(slugify(x)) ===
 * slugify(x)), which the editor relies on when it re-derives the slug
 * from a user-edited field. Dependency-free so client and server share it.
 *
 *   slugify("Major Home Remodel Addition & ADU") === "major-home-remodel-addition-and-adu"
 */
export function slugify(input) {
  return String(input ?? "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
