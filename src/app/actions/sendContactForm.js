'use server'

export async function submitContactForm(formData) {
    
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        body: formData.get('body')
    }

    console.log(`email send to ${data.email}`)

    return {success: true}

}