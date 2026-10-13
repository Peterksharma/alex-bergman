import { PROJECT_TYPES } from "@/lib/contactSchema";
import ContactFormClient from "./ContactFormClient";

/**
 * ContactForm — server shell for the contact form.
 *
 * Its only job is to read the allowed project types (derived from the
 * services data inside the schema module) on the server and hand the
 * plain string array to the interactive client form. That keeps the
 * services data, and the schema module, out of the client bundle path
 * for this component.
 */
export default function ContactForm() {
  return <ContactFormClient projectTypes={PROJECT_TYPES} />;
}
