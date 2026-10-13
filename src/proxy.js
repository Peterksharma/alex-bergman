import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

/*
 * Proxy (Next 16's name for middleware): gate everything under /admin.
 *
 * - /admin/login is public; a visitor who already has a valid session is
 *   sent to /admin instead of seeing the form again.
 * - Every other /admin path requires a valid session cookie; otherwise
 *   redirect to /admin/login?next=<path> so the login can return them.
 *
 * Only the signature and expiry are checked here (cheap, no I/O). Server
 * actions re-verify the cookie themselves (see src/app/admin/_lib/session.js),
 * so a request that somehow bypasses the proxy still cannot write.
 */
export async function proxy(request) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);

  if (pathname === "/admin/login") {
    if (session) return NextResponse.redirect(new URL("/admin", request.url));
    return NextResponse.next();
  }

  if (!session) {
    const login = new URL("/admin/login", request.url);
    login.searchParams.set("next", pathname + search);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
