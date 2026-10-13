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
 * Compares the submitted email (case-insensitive) with ADMIN_EMAIL and the
 * password with ADMIN_PASSWORD_HASH via bcrypt. A dummy hash is compared
 * when the email is wrong, so the response time does not reveal whether
 * the email exists, and every failure waits a flat 1 s before answering.
 * One shared error message for both cases for the same reason.
 */
export async function login(_prevState, formData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = safeNext(formData.get("next"));

  const adminEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const adminHash = process.env.ADMIN_PASSWORD_HASH ?? "";
  if (!adminEmail || !adminHash) {
    return { error: "Admin login is not configured on this deployment." };
  }

  // Always run a bcrypt compare so timing is uniform.
  const emailOk = email === adminEmail;
  const passwordOk = await bcrypt.compare(password, emailOk ? adminHash : DUMMY_HASH);

  if (!emailOk || !passwordOk) {
    await new Promise((r) => setTimeout(r, FAILURE_DELAY_MS));
    return { error: "Incorrect email or password." };
  }

  const token = await createSessionToken(adminEmail);
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
