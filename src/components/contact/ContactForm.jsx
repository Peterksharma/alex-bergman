"use client";

import { CardHeader } from "../ui/card";
import SurfaceCard from "@/components/common/SurfaceCard";
import { Button } from "../ui/button";
import { submitContactForm } from "@/app/actions/sendContactForm";
import { useActionState } from "react";
import { toast } from "sonner";
import { useEffect } from "react";

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, null);

  useEffect(() => {
    if (state?.success) {
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
    return formFields.map((formField, index) => {
      const fieldId = `contact-${formField.name}`;
      return (
        <div
          key={index}
          className={`flex flex-col sm:flex-row gap-2 sm:gap-6 mb-6 ${formField.type === "textarea" ? "items-start" : "sm:items-center"}`}
        >
          <label
            htmlFor={fieldId}
            className="text-tone-heading font-medium w-full sm:w-[140px] flex-shrink-0 text-sm"
          >
            {formField.label}
            {formField.require && (
              <span className="text-tone-accent ml-1" aria-hidden="true">*</span>
            )}
          </label>
          {formField.type === "textarea" ? (
            <textarea
              id={fieldId}
              name={formField.name}
              required={formField.require}
              placeholder={formField.placeholder}
              className='w-full h-[200px] sm:h-[280px] bg-white border border-tone-line/40 rounded-md p-3 text-ink placeholder:text-tone-muted focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none'
            />
          ) : (
            <input
              id={fieldId}
              type={formField.type}
              name={formField.name}
              required={formField.require}
              placeholder={formField.placeholder}
              className="w-full h-11 bg-white border border-tone-line/40 rounded-md px-4 text-ink placeholder:text-tone-muted focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          )}
        </div>
      );
    });
  }

  return (
    <div className='w-full lg:w-1/2 lg:px-0'>
      <SurfaceCard>
        <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
          <h2 className="font-display text-center text-2xl sm:text-3xl text-tone-heading font-bold tracking-tight leading-none">
            Have an idea? Let's talk!
          </h2>
          <p className="text-center text-tone-muted text-xs sm:text-sm mt-2">
            Fill out the form below and we'll get back to you soon. Required fields are marked with an asterisk (*).
          </p>
        </CardHeader>
        <form action={formAction} className="px-4 sm:px-8 pb-6 sm:pb-8">
          {renderForm()}
          {/* aria-live region so screen readers announce submission failures */}
          <div role="alert" aria-live="assertive">
            {state?.success === false && (
              <p className="text-destructive text-sm text-center mb-4 font-medium">
                {state.error || "Something went wrong. Please try again."}
              </p>
            )}
          </div>
          <div className="flex justify-center mt-6 sm:mt-8">
            <Button
              type="submit"
              variant="cta"
              className="w-full max-w-md h-12 rounded-md transition-colors hover:shadow-xl"
            >
              Send Message
            </Button>
          </div>
        </form>
      </SurfaceCard>
    </div>
  );
}