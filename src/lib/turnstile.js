/**
 * Server-side verification of a Cloudflare Turnstile token.
 * Docs: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

/** The form field Turnstile's widget writes its token into. */
export const TURNSTILE_FIELD = 'cf-turnstile-response'

/** Warn about a missing secret once per server process, not per submit. */
let warnedMissingSecret = false

/**
 * Verify a Turnstile token with Cloudflare.
 *
 * Precondition:  `token` is the widget's response (string or empty);
 *                `remoteIp` is the submitter's IP or undefined.
 * Postcondition: resolves to { ok: boolean, skipped?: true, errorCodes? }.
 *   - No TURNSTILE_SECRET_KEY configured: { ok: true, skipped: true }
 *     after one warning. Fails open on purpose: leads must not be lost
 *     while keys are not yet set up; honeypot + timing still apply.
 *   - Secret configured: ok is true iff Cloudflare reports success.
 *     Network or parse failures resolve to ok: false; never throws.
 */
export async function verifyTurnstile(token, remoteIp) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    if (!warnedMissingSecret) {
      console.warn(
        'TURNSTILE_SECRET_KEY is not set; skipping Turnstile verification of contact submissions.'
      )
      warnedMissingSecret = true
    }
    return { ok: true, skipped: true }
  }

  if (typeof token !== 'string' || token.length === 0) {
    return { ok: false, errorCodes: ['missing-input-response'] }
  }

  const body = new URLSearchParams({ secret, response: token })
  if (remoteIp) body.set('remoteip', remoteIp)

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      body,
      cache: 'no-store',
    })
    const outcome = await response.json()
    return { ok: outcome.success === true, errorCodes: outcome['error-codes'] }
  } catch (error) {
    console.error('Turnstile siteverify request failed:', error)
    return { ok: false, errorCodes: ['siteverify-unreachable'] }
  }
}

/**
 * The client's IP from a proxied request: the first entry in
 * X-Forwarded-For (Vercel appends its own hops after it).
 */
export function clientIpFrom(headerList) {
  const forwarded = headerList.get('x-forwarded-for')
  if (!forwarded) return headerList.get('x-real-ip') ?? undefined
  return forwarded.split(',')[0].trim() || undefined
}
