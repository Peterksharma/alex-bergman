"use client";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { submitContactForm } from "@/app/actions/sendContactForm";
import { useActionState } from "react";
import { toast } from "sonner";
import { useEffect } from "react";

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, null);

  useEffect(() => {
    if (state?.success) {
      console.log("message sent");
      toast.success("Message has been sent");
    } else if (state?.success === false) {
      toast.error("Error sending message");
    }
  }, [state]);
  
  const formFields = [
    {
      label: "Name:",
      type: "text",
      name: "name",
      placeholder: "Full Name",
      require: true,
      className: "border-2 w-full",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Email Address",
      require: true,
      className: "border-2 w-full",
    },
    {
      label: "Phone Number",
      type: "tel",
      name: "phone",
      placeholder: "360-555-5555",
      require: true,
      className: "border-2 w-full",
    },
    {
      label: "Tell us more",
      type: "textarea",
      name: "body",
      placeholder: "Tell us more",
      require: true,
      className: "border-2 w-full h-[300px]",
    },
  ];

  function renderForm() {
    return formFields.map((formFields, index) => (
      <div key={index}>
        <div>
          <label>{formFields.label}</label>
        </div>
        {formFields.type === "textarea" ? (
          <textarea
            type={formFields.type}
            name={formFields.name}
            required={formFields.require}
            placeholder={formFields.placeholder}
            className={formFields.className}
          />
        ) : (
          <input
            type={formFields.type}
            name={formFields.name}
            required={formFields.require}
            placeholder={formFields.placeholder}
            className={formFields.className}
          />
        )}
      </div>
    ));
  }

  return (
    <div>
      <Card className=" w-[45vw]  h-[65vh] p-4">
        <form action={formAction}>
          {renderForm()}
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </div>
  );
}
