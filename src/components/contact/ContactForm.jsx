'use client'

import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { submitContactForm } from "@/app/actions/sendContactForm"

export default function ContactForm() {


    const formFields = [
        {
            label: 'Name:',
            type: 'text',
            name: 'name',
            placeholder: 'Full Name',
            require: true,
            className: "border-2 w-[400px]"
        },
        {
            label: 'Email',
            type: 'email',
            name: 'email',
            placeholder: 'Email Address',
            require: true,
            className: "border-2 w-[400px]"
        },        
        {
            label: 'Phone Number',
            type: 'tel',
            name: 'phone',
            placeholder: '360-555-5555',
            require: true,
            className: "border-2 w-[400px]"
        },
        {
            label: 'Tell us more',
            type: 'textarea',
            name: 'body',
            placeholder: 'Tell us more',
            require: true,
            className: "border-2 w-[400px] h-[400px]"
        },
    ]

    function renderForm() {

        return formFields.map((formFields, index) => (
            <div key={index}>
                <div><label>{formFields.label}</label></div>
                <input 
                    type={formFields.type}
                    name={formFields.name}
                    required={formFields.require}
                    placeholder={formFields.placeholder}
                    className={formFields.className}
                />
            </div>
        ))
    }


    return (
        <div>
            <Card>
            <form action={submitContactForm}>
            {renderForm()}
            <Button type='submit' >This button</Button>
            </form>
            </Card>
        </div>
    )
}
