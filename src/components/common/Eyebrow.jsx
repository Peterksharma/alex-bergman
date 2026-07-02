import { cn } from "@/lib/utils";

/*
 * Eyebrow — the annotation voice. A monospace, uppercase,
 * letter-spaced callout that opens a section like a dimension label
 * on a drawing sheet ("Sheet A-2 · Our services").
 *
 * rules — flank the text with thin dimension lines (default true).
 *         Turn off where the eyebrow sits flush-left (hero, footer).
 */
export default function Eyebrow({ rules = true, className, children }) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] uppercase tracking-widest text-tone-accent",
        rules && "dimline",
        className
      )}
    >
      {children}
    </p>
  );
}
