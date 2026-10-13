/**
 * Small, pure helpers for page metadata.
 */

/**
 * truncateAtWord — shorten `text` to at most `max` characters without
 * cutting a word in half, appending an ellipsis when anything was cut.
 *
 * Preconditions: `text` is a string, `max` is a positive integer.
 * Postcondition: result.length <= max. When text already fits it is
 * returned unchanged (no ellipsis). Otherwise the cut lands at the last
 * whitespace boundary at or before `max - 1`, so the ellipsis ("…", one
 * code unit) still fits; if the first word alone exceeds the budget the
 * cut is a hard one, which is the only honest choice.
 *
 * O(n) in the length of the text (one lastIndexOf).
 */
export function truncateAtWord(text, max) {
  if (text.length <= max) return text;
  const budget = max - 1; // leave room for the ellipsis
  const cut = text.lastIndexOf(" ", budget);
  const head = cut > 0 ? text.slice(0, cut) : text.slice(0, budget);
  return `${head.replace(/[,;:.\s]+$/, "")}…`;
}
