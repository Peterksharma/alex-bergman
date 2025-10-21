import { contactData } from "@/data/contact";
import { renderContacts } from "@/lib/renderContacts";
import { Card } from "../ui/card";

export default function ContactInfo() {
  return (
    <div>
      <Card className="w-[45vw] h-[65vh] p-4">{renderContacts(contactData)}</Card>
    </div>
  );
}
