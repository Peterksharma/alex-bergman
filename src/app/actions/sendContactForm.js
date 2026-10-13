'use server'

import { sendContactEmail } from '@/lib/email'
import { normalizeContactInput, validateContactInput } from '@/lib/contactSchema'

const GENERIC_FIELD_ERROR = 'Please correct the highlighted fields.'

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

  const fieldErrors = validateContactInput(values)
  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, error: GENERIC_FIELD_ERROR, fieldErrors, values }
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
