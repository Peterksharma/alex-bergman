import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * CTASection — the closing call-to-action block used at the bottom of pages.
 *
 * Two presentations:
 *   boxed (default) — the blue-tinted bordered panel with heading + text + buttons
 *   boxed={false}   — just the centered button row (the lighter portfolio style)
 *
 * actions: [{ label, href, variant?, withArrow? }]
 *   variant defaults to "cta" (brand blue); use "ctaOutline" for the
 *   white-outline secondary action.
 */
export default function CTASection({ heading, text, actions = [], boxed = true, className }) {
  const buttons = (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {actions.map((action) => (
        <Button
          key={action.label}
          asChild
          variant={action.variant ?? "cta"}
          size="xl"
          className="transition-all duration-300 hover:scale-105"
        >
          <Link href={action.href} className="flex items-center gap-3">
            {action.label}
            {action.withArrow && <FaArrowRight aria-hidden="true" />}
          </Link>
        </Button>
      ))}
    </div>
  );

  if (!boxed) {
    return <div className={cn("text-center mt-16", className)}>{buttons}</div>;
  }

  return (
    <div
      className={cn(
        "text-center mt-16 p-8 sm:p-12 bg-tone-surface/60 rounded-xl border border-tone-line/30",
        className
      )}
    >
      {heading && (
        <h2 className="font-display text-3xl font-bold text-tone-heading mb-4">{heading}</h2>
      )}
      {text && <p className="text-tone-body text-lg mb-8 max-w-2xl mx-auto">{text}</p>}
      {buttons}
    </div>
  );
}
