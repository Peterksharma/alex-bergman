'use server'

import { sendContactEmail } from '@/lib/email'

export async function submitContactForm(previousState, formData) {
    
  if (!formData) { 
    return { success: false, error: 'No form data provided' }
  }
  
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    body: formData.get('body')
  }

  // Validate required fields
  if (!data.name || !data.email || !data.phone || !data.body) {
    return { success: false, error: 'All fields are required' }
  }

  try {
    const result = await sendContactEmail(data)
    return result
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return { success: false, error: 'Failed to send message. Please try again.' }
  }
}