import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * SurfaceCard — the site's standard card surface: a flat tone-aware
 * sheet with a thin drawn border, like a detail view on a drawing.
 * Resolves to ink-2 inside ink Chapters and warm paper-2 inside paper
 * Chapters via the tone tokens.
 *
 * Props:
 *   hover — adds the standard lift-on-hover treatment (a drafted lift,
 *           not a scale — the border sharpens as the card rises)
 *   ...props — forwarded to the underlying shadcn Card (className merges)
 */
export default function SurfaceCard({ className, hover = false, ...props }) {
  return (
    <Card
      className={cn(
        "bg-tone-surface border border-tone-line/25 shadow-sm rounded-lg",
        hover &&
          "hover:-translate-y-1 hover:border-tone-line/50 hover:shadow-lg transition-all duration-300",
        className
      )}
      {...props}
    />
  );
}
