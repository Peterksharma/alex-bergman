import { cn } from "@/lib/utils";

/**
 * Admin form primitives in the Drafted language: a mono annotation label
 * over a plain paper input with a drawn border that sharpens on focus.
 */
export const inputClass =
  "w-full rounded-md border border-tone-line/40 bg-paper px-3 py-2 text-tone-heading " +
  "placeholder:text-tone-muted/70 outline-none focus-visible:border-tone-line focus-visible:ring-[3px] focus-visible:ring-ring/40 " +
  "disabled:opacity-50";

export function Field({ label, htmlFor, hint, className, children }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={htmlFor} className="block font-mono text-[11px] uppercase tracking-widest text-tone-muted">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-tone-muted">{hint}</p>}
    </div>
  );
}
