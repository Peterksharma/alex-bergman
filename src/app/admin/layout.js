/*
 * Admin layout. Nothing under /admin is for search engines, so the robots
 * meta is set here (the app's robots.js is owned elsewhere; this
 * per-page noindex is sufficient and independent of it). Pages render
 * live: force-dynamic is set on each route, and the proxy gates access.
 */
export const metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }) {
  return children;
}
