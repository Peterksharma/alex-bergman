import Link from "next/link";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SurfaceCard from "./SurfaceCard";

/**
 * IconCard — a simple info card: optional icon + title, body text, and an
 * optional CTA button. Merges the previously duplicated AboutTrustCards and
 * home TrustCards card markup.
 *
 * Layout rule: with an icon the header is a left-aligned icon+title row;
 * without one the card is fully centered (the home-page style).
 *
 * Props: { icon?, title, body, cta?: { label, href } }
 */
export default function IconCard({ icon, title, body, cta }) {
  return (
    <SurfaceCard hover className="h-full flex flex-col">
      <CardHeader className={cn("pb-4 flex-shrink-0", !icon && "text-center")}>
        <h3
          className={cn(
            "font-display text-tone-heading font-bold",
            icon ? "flex items-center gap-3 text-xl" : "text-2xl tracking-tight"
          )}
        >
          {icon && (
            <span className="text-tone-accent text-2xl" aria-hidden="true">
              {icon}
            </span>
          )}
          <span>{title}</span>
        </h3>
      </CardHeader>

      <CardContent className={cn("flex-1", !icon && "text-center px-6")}>
        <p className="text-tone-body leading-relaxed">{body}</p>
      </CardContent>

      {cta && (
        <CardFooter className="justify-center flex-shrink-0 pt-6 pb-6">
          <Button asChild className="w-full h-11 font-semibold rounded-md shadow-lg">
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        </CardFooter>
      )}
    </SurfaceCard>
  );
}
