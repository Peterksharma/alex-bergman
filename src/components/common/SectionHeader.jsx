import { cn } from "@/lib/utils";

/**
 * SectionHeader — the site's standard heading block: a centered heading,
 * a blue divider bar, and an optional lead paragraph.
 *
 * This replaces the identical markup previously copy-pasted across
 * Portfolio/Process/Testimonials headers and several inline page headers.
 *
 * Props:
 *   as        — heading tag: "h1" for the page title (default), "h2" for
 *               sections. Every page must have exactly one h1.
 *   title     — heading content. Pass a node to accent words:
 *               title={<>Our <span className="text-blue-400">Services</span></>}
 *   subtitle  — optional lead paragraph below the divider
 *   className — wrapper overrides (e.g. a different bottom margin)
 */
export default function SectionHeader({ as: Heading = "h1", title, subtitle, className }) {
  return (
    <div className={cn("text-center mb-16", className)}>
      <Heading className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
        {title}
      </Heading>
      <div className="h-1 w-16 sm:w-24 bg-blue-400 mx-auto rounded-full mb-6" aria-hidden="true"></div>
      {subtitle && (
        <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
