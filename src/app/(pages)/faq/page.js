import { faqData } from "@/data/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <div className="bg-gray-900 pb-12">
      <div className="w-[50vw] mx-auto text-gray-100 bg-gray-900">
        <div className="py-12 font-bold text-center text-2xl">
          <h1>Commonly Asked Questions</h1>
        </div>
        <div>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            {faqData.map((data, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className='text-lg'>{data.question}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance text-gray-300 text-lg">
                  <p>{data.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
