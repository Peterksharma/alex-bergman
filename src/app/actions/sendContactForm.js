'use server'

export async function submitContactForm(previousState, formData) {
    
  if (!formData) { 
    return { success: false}
  }
  
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        body: formData.get('body')
    }

    console.log(`email send to ${data.email}`)

    return {success: true}

}