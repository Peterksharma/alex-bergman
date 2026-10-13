"use client";

import { useActionState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { CardHeader } from "../ui/card";
import SurfaceCard from "@/components/common/SurfaceCard";
import { Button } from "../ui/button";
import { submitContactForm } from "@/app/actions/sendContactForm";
import { cn } from "@/lib/utils";

/** Shared look of every text control: a white sheet with a drawn edge. */
const controlClass =
  "w-full bg-white border border-tone-line/40 rounded-md text-ink placeholder:text-tone-muted " +
  "focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all " +
  "aria-[invalid=true]:border-destructive";

/**
 * Field definitions in display order. `kind` picks the control; `hint`
 * renders as helper text under it. Everything is required: the point of
 * the form is to give Alex enough to reply with useful feedback.
 */
const FIELDS = [
  {
    label: "Name",
    kind: "input",
    type: "text",
    name: "name",
    autoComplete: "name",
    placeholder: "John Doe",
  },
  {
    label: "Email",
    kind: "input",
    type: "email",
    name: "email",
    autoComplete: "email",
    placeholder: "john@example.com",
  },
  {
    label: "Phone Number",
    kind: "input",
    type: "tel",
    name: "phone",
    autoComplete: "tel",
    placeholder: "(555) 123-4567",
  },
  {
    label: "Project Type",
    kind: "select",
    name: "projectType",
    placeholder: "Select a project type",
    hint: "e.g. New Home, Addition, ADU",
  },
  {
    label: "Project Address",
    kind: "input",
    type: "text",
    name: "address",
    autoComplete: "street-address",
    placeholder: "1234 N Example St, Tacoma, WA 98406",
    hint: "The property the project is for, so we can take a first look.",
  },
  {
    label: "Message",
    kind: "textarea",
    name: "message",
    placeholder: "Tell us about your project...",
  },
];

/**
 * ContactFormClient — the interactive contact form.
 *
 * Props:
 *   projectTypes — allowed values for the Project Type select, in
 *                  display order (supplied by the server shell).
 *
 * State flow: useActionState runs the server action and hands back
 * { success, error?, fieldErrors?, values? }. On failure the entered
 * values come back in `state.values` and are re-applied as defaultValue
 * (React resets the form after an action, using the freshly rendered
 * defaults), and each field's error renders beneath it. On success the
 * form is cleared and a toast confirms.
 */
export default function ContactFormClient({ projectTypes }) {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);
  const formRef = useRef(null);

  useEffect(() => {
    if (state?.success) {
      toast.success("Message has been sent");
      formRef.current?.reset();
      try {
        window.gtag?.("event", "generate_lead", { project_type: state.projectType });
      } catch {
        /* analytics must never break the form */
      }
    } else if (state?.success === false) {
      toast.error(state.error || "Error sending message");
    }
  }, [state]);

  const fieldErrors = state?.success === false ? state.fieldErrors ?? {} : {};
  const values = state?.success === false ? state.values ?? {} : {};

  function renderField(field) {
    const id = `contact-${field.name}`;
    const hintId = field.hint ? `${id}-hint` : undefined;
    const error = fieldErrors[field.name];
    const errorId = error ? `${id}-error` : undefined;
    const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

    const shared = {
      id,
      name: field.name,
      required: true,
      defaultValue: values[field.name] ?? "",
      "aria-describedby": describedBy,
      "aria-invalid": error ? true : undefined,
    };

    let control;
    if (field.kind === "textarea") {
      control = (
        <textarea
          {...shared}
          placeholder={field.placeholder}
          className={cn(controlClass, "h-[200px] sm:h-[280px] p-3 resize-none")}
        />
      );
    } else if (field.kind === "select") {
      control = (
        <div className="relative">
          <select
            {...shared}
            className={cn(
              controlClass,
              /* invalid: is true exactly while the placeholder is selected */
              "h-11 px-4 pr-10 appearance-none cursor-pointer invalid:text-tone-muted"
            )}
          >
            <option value="" disabled>
              {field.placeholder}
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type} className="text-ink">
                {type}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-tone-muted"
          />
        </div>
      );
    } else {
      control = (
        <input
          {...shared}
          type={field.type}
          autoComplete={field.autoComplete}
          placeholder={field.placeholder}
          className={cn(controlClass, "h-11 px-4")}
        />
      );
    }

    return (
      <div key={field.name} className="flex flex-col sm:flex-row gap-2 sm:gap-6 mb-6 sm:items-start">
        <label
          htmlFor={id}
          className="text-tone-heading font-medium w-full sm:w-[140px] flex-shrink-0 text-sm sm:pt-3"
        >
          {field.label}
          <span className="text-tone-accent ml-1" aria-hidden="true">
            *
          </span>
        </label>
        <div className="w-full min-w-0">
          {control}
          {error && (
            <p id={errorId} className="mt-1.5 text-sm text-destructive font-medium">
              {error}
            </p>
          )}
          {field.hint && (
            <p id={hintId} className="mt-1.5 font-mono text-[11px] text-tone-muted">
              {field.hint}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-1/2 lg:px-0">
      <SurfaceCard>
        <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
          <h2 className="font-display text-center text-2xl sm:text-3xl text-tone-heading font-bold tracking-tight leading-none">
            Have an idea? Let's talk!
          </h2>
          <p className="text-center text-tone-muted text-xs sm:text-sm mt-2">
            Fill out the form below and we'll get back to you soon. Required fields are marked with an asterisk (*).
          </p>
        </CardHeader>
        <form ref={formRef} action={formAction} className="px-4 sm:px-8 pb-6 sm:pb-8">
          {FIELDS.map(renderField)}

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
              disabled={isPending}
              className="w-full max-w-md h-12 rounded-md transition-colors hover:shadow-xl"
            >
              {isPending ? "Sending…" : "Send Message"}
            </Button>
          </div>
        </form>
      </SurfaceCard>
    </div>
  );
}
