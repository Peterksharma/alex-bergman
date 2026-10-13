import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

/*
 * Proxy (Next 16's name for middleware): gate everything under /manage.
 *
 * - /manage/login is public; a visitor who already has a valid session is
 *   sent to /manage instead of seeing the form again.
 * - Every other /manage path requires a valid session cookie; otherwise
 *   redirect to /manage/login?next=<path> so the login can return them.
 *
 * Only the signature and expiry are checked here (cheap, no I/O). Server
 * actions re-verify the cookie themselves (see src/app/manage/_lib/session.js),
 * so a request that somehow bypasses the proxy still cannot write.
 */
export async function proxy(request) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);

  if (pathname === "/manage/login") {
    if (session) return NextResponse.redirect(new URL("/manage", request.url));
    return NextResponse.next();
  }

  if (!session) {
    const login = new URL("/manage/login", request.url);
    login.searchParams.set("next", pathname + search);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/manage/:path*"],
};
