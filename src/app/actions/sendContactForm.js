'use server'

import { headers } from 'next/headers'
import { sendContactEmail } from '@/lib/email'
import { TURNSTILE_FIELD, clientIpFrom, verifyTurnstile } from '@/lib/turnstile'
import {
  isSuspectedBot,
  normalizeContactInput,
  validateContactInput,
} from '@/lib/contactSchema'

const GENERIC_FIELD_ERROR = 'Please correct the highlighted fields.'

/**
 * What a bot sees. Indistinguishable from a real success so the
 * operator learns nothing about which defense caught them.
 */
function fakeSuccess(values) {
  return { success: true, projectType: values.projectType }
}

/**
 * Server action behind the contact form.
 *
 * Precondition:  `formData` is the FormData of the submitted form
 *                (React passes it as the second argument of a
 *                useActionState action).
 * Postcondition: resolves to one of
 *   { success: true, projectType }
 *   { success: false, error, fieldErrors?, values? }
 * `values` echoes the normalized input so the form can re-populate its
 * fields; `fieldErrors` maps field name -> message. Never throws.
 */
export async function submitContactForm(previousState, formData) {
  if (!(formData instanceof FormData)) {
    return { success: false, error: 'No form data provided' }
  }

  const values = normalizeContactInput(formData)

  /* Honeypot + timing: decided before validation so a bot cannot even
     learn the field rules. Silently dropped with a convincing reply. */
  if (isSuspectedBot(formData)) {
    console.warn('contact form: dropped suspected bot submission')
    return fakeSuccess(values)
  }

  const fieldErrors = validateContactInput(values)
  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, error: GENERIC_FIELD_ERROR, fieldErrors, values }
  }

  /* Turnstile: checked after validation so a typo does not burn a
     single-use token. Fails open only when no secret is configured. */
  const headerList = await headers()
  const turnstile = await verifyTurnstile(
    formData.get(TURNSTILE_FIELD),
    clientIpFrom(headerList)
  )
  if (!turnstile.ok) {
    console.warn('contact form: Turnstile verification failed', turnstile.errorCodes)
    return {
      success: false,
      error: GENERIC_FIELD_ERROR,
      fieldErrors: { turnstile: 'Please complete the verification and try again.' },
      values,
    }
  }

  try {
    const result = await sendContactEmail(values)
    if (!result.success) {
      return { success: false, error: result.error, fieldErrors: result.fieldErrors, values }
    }
    return { success: true, projectType: values.projectType }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return { success: false, error: 'Failed to send message. Please try again.', values }
  }
}
