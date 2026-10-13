"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/*
 * Reveal — scroll-triggered entrance. Children render server-side as
 * normal and are VISIBLE until the client "arms" them; the CSS in
 * globals.css hides only `.reveal[data-armed]:not(.in)`. On
 * intersection the wrapper gains .in and rises/fades in.
 *
 * Progressive-enhancement invariant: content is never hidden unless
 * JavaScript is running and able to reveal it again. That covers
 *   - no JS / failed hydration: nothing is ever armed, so all visible;
 *   - no IntersectionObserver: we mark .in immediately and never arm;
 *   - prefers-reduced-motion: the hidden rule is scoped to
 *     no-preference in CSS, so armed-but-unrevealed is still visible.
 * Elements already inside the viewport on mount get .in without being
 * armed, so above-the-fold content never blinks (visible → hidden →
 * fade) across hydration; only content scrolled into view animates.
 *
 * One IntersectionObserver is shared across every instance (module
 * scope); each element is unobserved after it reveals, so the animation
 * runs once. Mount-driven registration means App Router navigations
 * re-observe automatically.
 *
 * Wrap rows/grids rather than individual cards to keep the number of
 * client components small.
 */
let observer = null;

function getObserver() {
  if (observer === null) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        }
      },
      /*
       * threshold 0 + a small bottom inset, not a ratio threshold: a
       * wrapper taller than the viewport can never reach a 15% ratio,
       * which would leave it permanently hidden. This fires once ~80px
       * of the element clears the fold.
       */
      { rootMargin: "0px 0px -80px 0px", threshold: 0 }
    );
  }
  return observer;
}

/** True when any part of the element's box is inside the viewport now. */
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

export default function Reveal({ as: Tag = "div", className, children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined" || isInViewport(el)) {
      el.classList.add("in");
      return;
    }

    el.dataset.armed = "";
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <Tag ref={ref} className={cn("reveal", className)} {...props}>
      {children}
    </Tag>
  );
}
