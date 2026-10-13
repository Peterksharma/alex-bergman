/**
 * contactSchema — the single source of truth for what a contact-form
 * submission must look like.
 *
 * Everything here is a pure function of its arguments: no I/O, no
 * environment, no clock except the one passed in. That is what lets the
 * server action, the client form (for the option list) and the test
 * suite agree on one definition of "valid".
 *
 * The services list is imported ONLY here (relative path, with the
 * extension, so Node's test runner can load this module without the
 * bundler's "@/" alias). Client code receives the derived `PROJECT_TYPES`
 * array as a prop and never touches the services data directly.
 */

import { services } from '../data/servicesData.js'

/** The catch-all project type, always the last option. */
export const OTHER_PROJECT_TYPE = 'Other'

/**
 * Allowed values for the Project Type select, in display order:
 * every service name from the services data, followed by "Other".
 * Frozen so no caller can mutate the shared list.
 */
export const PROJECT_TYPES = Object.freeze([
  ...services.map((service) => service.name),
  OTHER_PROJECT_TYPE,
])

/**
 * Length bounds (inclusive) per field, measured after trimming.
 * `phoneDigits` counts digits only, after punctuation is stripped.
 */
export const LIMITS = Object.freeze({
  name: Object.freeze({ min: 2, max: 100 }),
  address: Object.freeze({ min: 5, max: 200 }),
  message: Object.freeze({ min: 10, max: 3000 }),
  phoneDigits: Object.freeze({ min: 7, max: 15 }),
})

/** The fields a submission carries, in form order. */
export const CONTACT_FIELDS = Object.freeze([
  'name',
  'email',
  'phone',
  'projectType',
  'address',
  'message',
])

/**
 * A deliberately modest email pattern: one "@", no whitespace, and a
 * dot somewhere in the domain part. Full RFC 5322 validation is both
 * impractical and pointless here — Resend's reply-to and the human
 * reading the lead are the real validators. Rejecting obvious garbage
 * ("foo", "a@b") is all that is needed.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Coerce an unknown form value to a trimmed string.
 *
 * Precondition:  `value` may be anything a FormData.get() returns
 *                (string, File, or null).
 * Postcondition: returns a string with surrounding whitespace removed;
 *                non-string input becomes the empty string, so a File
 *                smuggled into a text field is treated as "missing".
 */
export function asTrimmedString(value) {
  return typeof value === 'string' ? value.trim() : ''
}

/**
 * Build a normalized submission object from raw form values.
 *
 * Precondition:  `raw` is an object (or FormData-like via `get`) whose
 *                keys may include any of CONTACT_FIELDS. The message
 *                field may arrive under the legacy name `body`.
 * Postcondition: every CONTACT_FIELDS key is present and is a trimmed
 *                string. Internal line endings are normalized to "\n" so
 *                the rest of the pipeline sees one convention.
 */
export function normalizeContactInput(raw) {
  const read = (key) =>
    typeof raw?.get === 'function' ? raw.get(key) : raw?.[key]
  const clean = (key) => asTrimmedString(read(key)).replace(/\r\n?/g, '\n')

  const values = {}
  for (const field of CONTACT_FIELDS) values[field] = clean(field)
  if (!values.message) values.message = clean('body')
  return values
}

/**
 * Count the digits in a phone string, ignoring punctuation, spaces and
 * an optional leading "+". E.g. "(253) 555-0100" -> 10.
 */
export function countPhoneDigits(phone) {
  return (phone.match(/\d/g) ?? []).length
}

/**
 * Validate a normalized submission and report every problem at once.
 *
 * Precondition:  `values` is the output of normalizeContactInput (all
 *                CONTACT_FIELDS present, trimmed strings).
 * Postcondition: returns an object mapping field name -> human-readable
 *                error message. The object is empty exactly when the
 *                submission is acceptable. Each field gets at most one
 *                message, the first rule it fails, so the form can show
 *                one line under each input.
 *
 * Complexity: O(total input length); every rule is a single pass.
 */
export function validateContactInput(values) {
  const errors = {}
  const { name, email, phone, projectType, address, message } = values

  if (name.length < LIMITS.name.min || name.length > LIMITS.name.max) {
    errors.name = `Please enter your name (${LIMITS.name.min}–${LIMITS.name.max} characters).`
  }

  if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.'
  }

  const digits = countPhoneDigits(phone)
  if (digits < LIMITS.phoneDigits.min || digits > LIMITS.phoneDigits.max) {
    errors.phone = `Please enter a phone number with ${LIMITS.phoneDigits.min}–${LIMITS.phoneDigits.max} digits.`
  }

  if (!PROJECT_TYPES.includes(projectType)) {
    errors.projectType = 'Please select a project type.'
  }

  if (address.length < LIMITS.address.min || address.length > LIMITS.address.max) {
    errors.address = `Please enter the project address (${LIMITS.address.min}–${LIMITS.address.max} characters).`
  }

  if (message.length < LIMITS.message.min || message.length > LIMITS.message.max) {
    errors.message = `Please tell us a little about the project (${LIMITS.message.min}–${LIMITS.message.max} characters).`
  }

  return errors
}
