import { cn } from "@/lib/utils";

/**
 * StatGrid — dimension-style stats: each value sits against an amber
 * dimension tick with a mono annotation label beneath, like a callout
 * on a drawing sheet. Replaces the old centered blue stat tiles.
 *
 * items: [{ value, label }]
 */
export default function StatGrid({ items, className }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6", className)}>
      {items.map((item) => (
        <div key={item.label} className="border-l-2 border-tone-accent pl-5 py-1">
          <div className="font-display text-4xl font-bold text-tone-heading leading-none">
            {item.value}
          </div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-tone-muted mt-2.5">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
