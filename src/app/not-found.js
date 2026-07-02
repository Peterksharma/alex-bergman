import Link from "next/link";
import { Button } from "@/components/ui/button";
import Chapter from "@/components/common/Chapter";
import Eyebrow from "@/components/common/Eyebrow";

export const metadata = {
  title: "Page Not Found",
};

/*
 * 404 — in-world: a request for information about a sheet that isn't
 * in the drawing set.
 */
export default function NotFound() {
  return (
    <Chapter tone="ink" grid className="flex items-center min-h-[60vh] py-24 sm:py-32">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <Eyebrow className="mx-auto mb-6 max-w-xs">RFI-404 · Sheet not found</Eyebrow>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-tone-heading mb-4 tracking-tight">
          This sheet isn't in the set.
        </h1>
        <p className="text-tone-body text-lg leading-relaxed max-w-xl mx-auto mb-10">
          The page you're looking for was moved, renamed, or never drawn.
          Check the address, or head back to the cover sheet.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="cta" size="xl">
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild variant="ctaOutline" size="xl">
            <Link href="/services">View Our Services</Link>
          </Button>
        </div>
      </div>
    </Chapter>
  );
}
