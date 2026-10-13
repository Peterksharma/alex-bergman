import { SignJWT, jwtVerify } from "jose";

/**
 * auth.js — the admin session.
 *
 * A session is a signed (HS256) JWT in an httpOnly cookie. There is one
 * admin (ADMIN_EMAIL), so the token carries only the subject and expiry;
 * there is no user table to look up. Verification happens in proxy.js
 * (edge runtime) and in server actions, so this module must stay free of
 * Node-only imports: jose and the Web Crypto API work in both.
 *
 * Secret rotation: changing AUTH_SECRET invalidates every session.
 */

export const SESSION_COOKIE = "arb_admin";
export const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

function secretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET must be set to at least 32 characters");
  }
  return new TextEncoder().encode(secret);
}

/** Create a session token for `email`, expiring in SESSION_TTL_SECONDS. */
export async function createSessionToken(email) {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(secretKey());
}

/**
 * Verify a token. Returns `{ email }` for a valid, unexpired admin
 * session and `null` for anything else (bad signature, expired, missing).
 * Never throws: callers treat the result as a boolean gate.
 */
export async function verifySessionToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ["HS256"] });
    if (payload.role !== "admin" || typeof payload.sub !== "string") return null;
    return { email: payload.sub };
  } catch {
    return null;
  }
}

/** Cookie attributes shared by set and clear so they always match. */
export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}
