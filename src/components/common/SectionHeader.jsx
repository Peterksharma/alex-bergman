import { cn } from "@/lib/utils";
import Eyebrow from "./Eyebrow";

/**
 * SectionHeader — the site's standard heading block: an optional mono
 * annotation eyebrow, a display heading, a drawn dimension rule with an
 * amber tick, and an optional lead paragraph.
 *
 * Tone-aware: renders correctly inside either an ink or paper Chapter.
 *
 * Props:
 *   as        — heading tag: "h1" for the page title (default), "h2" for
 *               sections. Every page must have exactly one h1.
 *   eyebrow   — optional annotation line, e.g. "Sheet A-2 · Our services"
 *   title     — heading content. Pass a node to accent words:
 *               title={<>Our <span className="text-tone-accent">Services</span></>}
 *   subtitle  — optional lead paragraph below the rule
 *   className — wrapper overrides (e.g. a different bottom margin)
 */
export default function SectionHeader({ as: Heading = "h1", eyebrow, title, subtitle, className }) {
  return (
    <div className={cn("text-center mb-16", className)}>
      {eyebrow && <Eyebrow className="mx-auto mb-5 max-w-xs">{eyebrow}</Eyebrow>}
      <Heading className="font-display text-4xl sm:text-5xl font-bold text-tone-heading mb-4 tracking-tight">
        {title}
      </Heading>
      {/* drawn dimension rule with a center tick */}
      <div className="relative mx-auto mb-6 h-px w-24 sm:w-32 bg-tone-line/40" aria-hidden="true">
        <span className="absolute left-1/2 top-1/2 h-[3px] w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tone-accent" />
      </div>
      {subtitle && (
        <p className="text-tone-body text-lg max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
