/**
 * Tests for the contact-form schema. Run with `npm test` (node --test).
 * Each case states the single rule it exercises so a failure names the
 * rule, not just the line.
 */
import { test, describe } from 'node:test'
import assert from 'node:assert/strict'

import {
  PROJECT_TYPES,
  OTHER_PROJECT_TYPE,
  LIMITS,
  TIMING,
  isSuspectedBot,
  normalizeContactInput,
  validateContactInput,
  countPhoneDigits,
} from './contactSchema.js'

/** A submission that satisfies every rule; tests mutate copies of it. */
const VALID = Object.freeze({
  name: 'Jane Builder',
  email: 'jane@example.com',
  phone: '(253) 555-0100',
  projectType: 'Additions',
  address: '1234 N Example St, Tacoma, WA 98406',
  message: 'We want to add a second-story master suite over the garage.',
})

const errorsFor = (overrides) =>
  validateContactInput(normalizeContactInput({ ...VALID, ...overrides }))

describe('PROJECT_TYPES', () => {
  test('is every service name followed by Other', () => {
    assert.deepEqual(PROJECT_TYPES, [
      'Remodels',
      'Garages',
      'Additions',
      'Conceptual Design',
      'New Construction',
      'A.D.U.',
      OTHER_PROJECT_TYPE,
    ])
    assert.equal(PROJECT_TYPES.length, 7)
    assert.ok(Object.isFrozen(PROJECT_TYPES))
  })
})

describe('normalizeContactInput', () => {
  test('trims every field and accepts the legacy "body" key for message', () => {
    const values = normalizeContactInput({
      name: '  Jane  ',
      email: ' jane@example.com ',
      phone: ' 2535550100 ',
      projectType: ' Other ',
      address: '  1 Main St  ',
      body: '  hello from body  ',
    })
    assert.equal(values.name, 'Jane')
    assert.equal(values.email, 'jane@example.com')
    assert.equal(values.projectType, 'Other')
    assert.equal(values.address, '1 Main St')
    assert.equal(values.message, 'hello from body')
  })

  test('reads from a FormData-like object and treats non-strings as empty', () => {
    const fd = new Map([['name', 'Jane'], ['email', { not: 'a string' }]])
    const values = normalizeContactInput(fd)
    assert.equal(values.name, 'Jane')
    assert.equal(values.email, '')
    assert.equal(values.message, '')
  })

  test('normalizes CRLF line endings in the message', () => {
    const values = normalizeContactInput({ message: 'line one\r\nline two\rline three' })
    assert.equal(values.message, 'line one\nline two\nline three')
  })
})

describe('validateContactInput', () => {
  test('accepts a fully valid submission', () => {
    assert.deepEqual(errorsFor({}), {})
  })

  test('accepts "Other" as a project type', () => {
    assert.deepEqual(errorsFor({ projectType: OTHER_PROJECT_TYPE }), {})
  })

  test('rejects a name that is too short or too long', () => {
    assert.ok(errorsFor({ name: 'J' }).name)
    assert.ok(errorsFor({ name: 'x'.repeat(LIMITS.name.max + 1) }).name)
    assert.equal(errorsFor({ name: 'Jo' }).name, undefined)
  })

  test('rejects a malformed email', () => {
    assert.ok(errorsFor({ email: 'not-an-email' }).email)
    assert.ok(errorsFor({ email: 'a@b' }).email)
    assert.ok(errorsFor({ email: 'a b@c.com' }).email)
    assert.equal(errorsFor({ email: 'a.b+c@d.co' }).email, undefined)
  })

  test('rejects a phone number with too few or too many digits', () => {
    assert.ok(errorsFor({ phone: '555-01' }).phone)
    assert.ok(errorsFor({ phone: '1'.repeat(LIMITS.phoneDigits.max + 1) }).phone)
    assert.equal(errorsFor({ phone: '+1 (253) 555-0100' }).phone, undefined)
  })

  test('rejects an unknown project type and the placeholder', () => {
    assert.ok(errorsFor({ projectType: 'Spaceport' }).projectType)
    assert.ok(errorsFor({ projectType: '' }).projectType)
    assert.ok(errorsFor({ projectType: 'remodels' }).projectType, 'is case-sensitive')
  })

  test('rejects an address that is too short or too long', () => {
    assert.ok(errorsFor({ address: '12 A' }).address)
    assert.ok(errorsFor({ address: 'x'.repeat(LIMITS.address.max + 1) }).address)
  })

  test('rejects a message that is too short or too long', () => {
    assert.ok(errorsFor({ message: 'too short' }).message)
    assert.ok(errorsFor({ message: 'x'.repeat(LIMITS.message.max + 1) }).message)
  })

  test('reports every failing field at once', () => {
    const errors = validateContactInput(
      normalizeContactInput({ name: '', email: '', phone: '', projectType: '', address: '', message: '' })
    )
    assert.deepEqual(Object.keys(errors).sort(), [
      'address', 'email', 'message', 'name', 'phone', 'projectType',
    ])
  })
})

describe('isSuspectedBot', () => {
  const NOW = 1_800_000_000_000
  const human = { company: '', t: String(NOW - 30_000) } // rendered 30 s ago

  test('passes a human-paced submission with an empty honeypot', () => {
    assert.equal(isSuspectedBot(human, NOW), false)
  })

  test('flags a filled honeypot', () => {
    assert.equal(isSuspectedBot({ ...human, company: 'Acme Bots' }, NOW), true)
    assert.equal(isSuspectedBot({ ...human, company: '   x' }, NOW), true)
  })

  test('flags a submission faster than the minimum', () => {
    assert.equal(isSuspectedBot({ ...human, t: String(NOW - TIMING.minElapsedMs + 1) }, NOW), true)
    assert.equal(isSuspectedBot({ ...human, t: String(NOW - TIMING.minElapsedMs) }, NOW), false)
  })

  test('flags a submission older than the maximum', () => {
    assert.equal(isSuspectedBot({ ...human, t: String(NOW - TIMING.maxElapsedMs - 1) }, NOW), true)
    assert.equal(isSuspectedBot({ ...human, t: String(NOW - TIMING.maxElapsedMs) }, NOW), false)
  })

  test('flags a missing, empty, or non-numeric timestamp', () => {
    assert.equal(isSuspectedBot({ company: '' }, NOW), true)
    assert.equal(isSuspectedBot({ company: '', t: '' }, NOW), true)
    assert.equal(isSuspectedBot({ company: '', t: 'yesterday' }, NOW), true)
    assert.equal(isSuspectedBot({ company: '', t: '-5' }, NOW), true)
  })

  test('reads from a FormData-like object', () => {
    const fd = new Map([['company', ''], ['t', String(NOW - 10_000)]])
    assert.equal(isSuspectedBot(fd, NOW), false)
  })
})

describe('countPhoneDigits', () => {
  test('counts digits only', () => {
    assert.equal(countPhoneDigits('(253) 555-0100'), 10)
    assert.equal(countPhoneDigits('+44 20 7946 0958'), 12)
    assert.equal(countPhoneDigits('no digits'), 0)
  })
})
