"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, createSessionToken, sessionCookieOptions } from "@/lib/auth";

const FAILURE_DELAY_MS = 1000;

// A real hash of a throwaway string, compared against when the email is
// wrong so the bcrypt work (and so the response time) is the same either way.
const DUMMY_HASH = bcrypt.hashSync("not-the-password", 12);

/**
 * Only allow same-site relative redirect targets, so ?next= cannot be
 * used to bounce a freshly logged-in admin to another origin.
 */
function safeNext(value) {
  if (typeof value !== "string") return "/manage";
  if (!value.startsWith("/manage") || value.startsWith("//")) return "/manage";
  return value;
}

/**
 * Login server action (useActionState signature).
 *
 * Compares the submitted username with ADMIN_USERNAME and the password
 * with ADMIN_PASSWORD_HASH via bcrypt. Usernames are compared in
 * canonical form (trimmed, inner whitespace collapsed, case-folded) so
 * "alex bergman" and "Alex  Bergman" both match; the session subject is
 * the configured spelling. A dummy hash is compared when the username is
 * wrong, so the response time does not reveal whether it exists, and
 * every failure waits a flat 1 s before answering. One shared error
 * message for both cases for the same reason.
 */
function canonicalUsername(value) {
  return String(value ?? "").trim().replace(/\s+/g, " ").toLowerCase();
}

export async function login(_prevState, formData) {
  const username = canonicalUsername(formData.get("username"));
  const password = String(formData.get("password") ?? "");
  const next = safeNext(formData.get("next"));

  const adminUsername = (process.env.ADMIN_USERNAME ?? "").trim();
  const adminHash = process.env.ADMIN_PASSWORD_HASH ?? "";
  if (!adminUsername || !adminHash) {
    return { error: "Admin login is not configured on this deployment." };
  }

  // Always run a bcrypt compare so timing is uniform.
  const usernameOk = username === canonicalUsername(adminUsername);
  const passwordOk = await bcrypt.compare(password, usernameOk ? adminHash : DUMMY_HASH);

  if (!usernameOk || !passwordOk) {
    await new Promise((r) => setTimeout(r, FAILURE_DELAY_MS));
    return { error: "Incorrect username or password." };
  }

  const token = await createSessionToken(adminUsername);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, sessionCookieOptions());
  redirect(next);
}

/** Clear the session cookie and return to the login page. */
export async function logout() {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
  redirect("/manage/login");
}
