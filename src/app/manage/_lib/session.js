import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

/**
 * Server-side session helpers for admin pages and actions.
 *
 * `requireAdmin()` is called at the top of every admin page and every
 * mutating server action. The proxy already redirects browsers, but
 * server actions are POSTs that a client could craft directly, so each
 * write re-verifies the cookie. Defence in depth, cheap (no I/O).
 */
export async function getSession() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/manage/login");
  return session;
}
