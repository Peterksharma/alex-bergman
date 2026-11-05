/**
 * Tests for the pure helpers in email.js: HTML escaping, header
 * sanitizing and the Maps link. The Resend call itself is not exercised
 * here; it needs network and credentials.
 */
import { test, describe } from 'node:test'
import assert from 'node:assert/strict'

import { escapeHtml, headerSafe, mapsUrlFor, renderConfirmationEmail, sendContactEmail } from './email.js'

describe('escapeHtml', () => {
  test('escapes all five significant characters', () => {
    assert.equal(escapeHtml(`&<>"'`), '&amp;&lt;&gt;&quot;&#39;')
  })

  test('does not double-escape an ampersand', () => {
    assert.equal(escapeHtml('<a>&amp;</a>'), '&lt;a&gt;&amp;amp;&lt;/a&gt;')
  })

  test('neutralizes a script tag', () => {
    assert.ok(!escapeHtml('<script>alert(1)</script>').includes('<'))
  })

  test('coerces non-strings', () => {
    assert.equal(escapeHtml(42), '42')
  })
})

describe('headerSafe', () => {
  test('strips CR and LF so headers cannot be forged', () => {
    const out = headerSafe('Jane\r\nBcc: victim@example.com')
    assert.ok(!/[\r\n]/.test(out))
    assert.equal(out, 'Jane Bcc: victim@example.com')
  })

  test('removes other control characters and collapses whitespace', () => {
    assert.equal(headerSafe('a\u0000b\t\tc   d'), 'a b c d')
  })

  test('caps the length with an ellipsis', () => {
    const out = headerSafe('x'.repeat(100), 10)
    assert.equal(out.length, 10)
    assert.ok(out.endsWith('…'))
  })
})

describe('mapsUrlFor', () => {
  test('URL-encodes the address', () => {
    assert.equal(
      mapsUrlFor('1234 N Example St, Tacoma, WA 98406'),
      'https://www.google.com/maps/search/?api=1&query=1234%20N%20Example%20St%2C%20Tacoma%2C%20WA%2098406'
    )
  })
})

describe('sendContactEmail', () => {
  test('re-validates and reports field errors without sending', async () => {
    const result = await sendContactEmail({ name: 'J', email: 'nope' })
    assert.equal(result.success, false)
    assert.ok(result.fieldErrors.name)
    assert.ok(result.fieldErrors.email)
    assert.ok(result.fieldErrors.address)
  })
})

describe('renderConfirmationEmail', () => {
  test('names the project type in both parts', () => {
    const { subject, html, text } = renderConfirmationEmail('Additions')
    assert.ok(subject.length > 0)
    assert.ok(html.includes('Additions'))
    assert.ok(text.includes('Additions'))
  })

  test('escapes the project type in HTML and keeps it to one line', () => {
    const { html, text } = renderConfirmationEmail('<b>x</b>\r\nBcc: a@b.c')
    assert.ok(!html.includes('<b>x</b>'))
    assert.ok(!text.includes('\r'))
  })

  test('takes nothing but the project type, so it cannot relay form text', () => {
    assert.equal(renderConfirmationEmail.length, 1)
  })
})
