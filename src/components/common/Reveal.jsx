"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/*
 * Reveal — scroll-triggered entrance. Children render server-side as
 * normal; on intersection this wrapper gains .in and the CSS in
 * globals.css rises/fades it in. Under prefers-reduced-motion the
 * hidden state never applies, so content is always visible.
 *
 * One IntersectionObserver is shared across every instance
 * (module scope); each element is unobserved after it reveals, so
 * the animation runs once. Mount-driven registration means App
 * Router navigations re-observe automatically.
 *
 * Wrap rows/grids rather than individual cards to keep the number
 * of client components small.
 */
let observer = null;

function observe(el) {
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
  observer.observe(el);
}

export default function Reveal({ as: Tag = "div", className, children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    observe(el);
    return () => observer?.unobserve(el);
  }, []);

  return (
    <Tag ref={ref} className={cn("reveal", className)} {...props}>
      {children}
    </Tag>
  );
}
