import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * SurfaceCard — the site's standard card surface: dark gradient, no border,
 * strong shadow. Centralizes the gradient string that was previously
 * copy-pasted (with two competing gray scales) across ~10 components.
 *
 * Props:
 *   hover — adds the standard lift-on-hover treatment
 *   ...props — forwarded to the underlying shadcn Card (className merges)
 */
export default function SurfaceCard({ className, hover = false, ...props }) {
  return (
    <Card
      className={cn(
        "bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-xl",
        hover && "hover:shadow-2xl hover:scale-105 transition-all duration-300",
        className
      )}
      {...props}
    />
  );
}
