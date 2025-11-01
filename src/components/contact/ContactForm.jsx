"use client";

import { Card, CardHeader, CardTitle } from "../ui/card";
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
      label: "Name",
      type: "text",
      name: "name",
      require: true,
      placeholder: "John Doe"
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      require: true,
      placeholder: "john@example.com"
    },
    {
      label: "Phone Number",
      type: "tel",
      name: "phone",
      require: true,
      placeholder: "(555) 123-4567"
    },
    {
      label: "Message",
      type: "textarea",
      name: "body",
      require: true,
      placeholder: "Tell us about your project..."
    },
  ];

  function renderForm() {
    return formFields.map((formField, index) => (
      <div
        key={index}
        className={`flex flex-col sm:flex-row gap-2 sm:gap-6 mb-6 ${formField.type === "textarea" ? "items-start" : "sm:items-center"}`}
      >
        <label className="text-gray-200 font-medium w-full sm:w-[140px] flex-shrink-0 text-sm">
          {formField.label}
        </label>
        {formField.type === "textarea" ? (
          <textarea
            name={formField.name}
            required={formField.require}
            placeholder={formField.placeholder}
            className='w-full h-[200px] sm:h-[280px] bg-white border border-gray-300 rounded-md p-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none'
          />
        ) : (
          <input
            type={formField.type}
            name={formField.name}
            required={formField.require}
            placeholder={formField.placeholder}
            className="w-full h-11 bg-white border border-gray-300 rounded-md px-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        )}
      </div>
    ));
  }

  return (
    <div className='w-full lg:w-1/2 lg:px-0'>
      <Card className="bg-gradient-to-br from-gray-600 to-gray-700 shadow-xl border-0">
        <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
          <h2 className="text-center text-2xl sm:text-3xl text-white font-bold tracking-tight leading-none">
            Have an idea? Let's talk!
          </h2>
          <p className="text-center text-gray-300 text-xs sm:text-sm mt-2">
            Fill out the form below and we'll get back to you soon
          </p>
        </CardHeader>
        <form action={formAction} className="px-4 sm:px-8 pb-6 sm:pb-8">
          {renderForm()}
          <div className="flex justify-center mt-6 sm:mt-8">
            <Button
              type="submit"
              className="w-full max-w-md h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors shadow-lg hover:shadow-xl"
            >
              Send Message
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}