/** @type {import('next').NextConfig} */

/*
 * Media normally comes through our own /cdn/[...key] route (same origin),
 * which next/image accepts without configuration. If the bucket is ever
 * fronted by a public host, NEXT_PUBLIC_MEDIA_BASE_URL names it here so
 * the optimiser will fetch from it.
 */
const mediaBase = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;
const remotePatterns = [];
if (mediaBase) {
  const { protocol, hostname, port } = new URL(mediaBase);
  remotePatterns.push({ protocol: protocol.replace(":", ""), hostname, port, pathname: "/**" });
}

const nextConfig = {
  images: { remotePatterns },
  experimental: {
    serverActions: {
      // Admin photo uploads: many multi-megabyte originals per form post.
      bodySizeLimit: "64mb",
    },
  },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/projects', destination: '/portfolio', permanent: true },
    ]
  }
};


export default nextConfig;
