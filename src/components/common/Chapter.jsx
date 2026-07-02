import { cn } from "@/lib/utils";

/*
 * Chapter — a page section with a tone. Pages alternate ink (dark
 * blueprint sheet) and paper (warm drawing paper) chapters so
 * scrolling has rhythm.
 *
 * The data-tone attribute re-resolves every --tone-* variable for
 * this subtree (see globals.css), so any component using tone
 * utilities (text-tone-heading, bg-tone-surface, …) renders
 * correctly inside either chapter with no props threaded.
 *
 * Props:
 *   tone      — "ink" (default) | "paper"
 *   grid      — draw the blueprint grid texture for this tone
 *   as        — element type, default "section"
 *   className — padding/layout overrides (default py rhythm applies)
 */
export default function Chapter({
  tone = "ink",
  grid = false,
  as: Tag = "section",
  className,
  children,
  ...props
}) {
  return (
    <Tag
      data-tone={tone}
      className={cn(
        "bg-tone-bg text-tone-body",
        grid && (tone === "paper" ? "bp-grid-paper" : "bp-grid"),
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
