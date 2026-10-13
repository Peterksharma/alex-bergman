"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/*
 * HeroVideo — the hero's moving background: a silent 15 s drone loop
 * (see scripts/encode-hero.sh) laid over its own first frame.
 *
 * Rendering strategy, in order of what the visitor sees:
 *
 *   1. The poster (the loop's first frame) is always rendered first via
 *      next/image with `priority`, so it is the Largest Contentful Paint
 *      candidate and is in the server HTML — no JS required to see it.
 *   2. On the client, after mount, we decide whether a <video> belongs
 *      here at all. We render nothing but the poster on the server and
 *      during hydration so the server and client trees agree; the
 *      decision needs `matchMedia` and `navigator`, which only exist in
 *      the browser.
 *   3. If motion is welcome, the <video> mounts invisibly (opacity 0)
 *      over the poster and fades in once it can play. Because the
 *      video's first frame IS the poster, the fade is imperceptible.
 *
 * No video is ever rendered when the visitor asked for reduced motion
 * (prefers-reduced-motion: reduce) or for lighter pages (Save-Data).
 *
 * Invariant: the poster is in the DOM for the whole lifetime of the
 * component, so there is never a frame where the hero has no backdrop.
 */

const POSTER = "/assets/hero/hero-poster.jpg";
const WEBM_1080 = "/assets/hero/hero-loop-1080.webm";
const MP4_1080 = "/assets/hero/hero-loop-1080.mp4";
const MP4_720 = "/assets/hero/hero-loop-720.mp4";

/* Below this viewport width the 720p encode is served: the hero is
   object-cover cropped anyway, and the file is less than half the size. */
const SMALL_SCREEN_QUERY = "(max-width: 768px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/*
 * Decide, in the browser only, which background to show.
 * Returns "poster" (no video), "720" or "1080".
 */
function chooseVariant() {
    if (typeof window === "undefined") return "poster";
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
    const saveData = Boolean(navigator.connection?.saveData);
    if (reducedMotion || saveData) return "poster";
    return window.matchMedia(SMALL_SCREEN_QUERY).matches ? "720" : "1080";
}

export default function HeroVideo({ alt }) {
    // null until mounted: SSR and the hydration pass both render poster-only.
    const [variant, setVariant] = useState(null);
    const [canPlay, setCanPlay] = useState(false);

    useEffect(() => {
        setVariant(chooseVariant());
    }, []);

    const showVideo = variant === "720" || variant === "1080";

    return (
        <>
            <Image
                src={POSTER}
                alt={alt}
                fill
                sizes="100vw"
                className="object-cover"
                priority
            />

            {showVideo && (
                <video
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                        canPlay ? "opacity-100" : "opacity-0"
                    }`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={POSTER}
                    aria-hidden="true"
                    tabIndex={-1}
                    disablePictureInPicture
                    onCanPlay={() => setCanPlay(true)}
                >
                    {/* The browser takes the first source it can decode:
                        VP9/WebM where supported, else H.264/MP4. The 720p
                        encode is a single MP4, since small screens are
                        overwhelmingly mobile Safari/Chrome and both play
                        H.264 natively. */}
                    {variant === "1080" && <source src={WEBM_1080} type="video/webm" />}
                    <source src={variant === "720" ? MP4_720 : MP4_1080} type="video/mp4" />
                </video>
            )}
        </>
    );
}
