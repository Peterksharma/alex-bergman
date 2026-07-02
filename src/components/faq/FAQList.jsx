import { faqData } from "@/data/faqData";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeader from "@/components/common/SectionHeader";
import CTASection from "@/components/common/CTASection";
import SurfaceCard from "@/components/common/SurfaceCard";

export default function FAQList() {
    return (
        <div className="bg-gray-900 py-12 sm:py-16 lg:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title={<>Frequently Asked <span className="text-blue-400">Questions</span></>}
                    subtitle="Have questions? We've got answers. Browse through our most common inquiries below."
                    className="mb-10 sm:mb-12 lg:mb-16"
                />

                {/* FAQ Accordion */}
                <SurfaceCard className="shadow-2xl p-4 sm:p-6">
                    <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                        {faqData.map((data, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border-0 bg-gray-900/50 rounded-lg px-3 sm:px-4 lg:px-6 backdrop-blur-sm hover:bg-gray-900/70 transition-colors"
                            >
                                <AccordionTrigger className="text-base sm:text-lg font-semibold text-white hover:text-blue-400 transition-colors py-4 sm:py-5 lg:py-6 hover:no-underline">
                                    <span className="text-left pr-2 sm:pr-4">{data.question}</span>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 text-sm sm:text-base leading-relaxed pb-4 sm:pb-5 lg:pb-6 pt-2">
                                    {data.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </SurfaceCard>

                <CTASection
                    className="mt-8 sm:mt-10 lg:mt-12"
                    heading="Still have questions?"
                    text="We're here to help! Reach out to us for personalized answers."
                    actions={[{ label: "Contact Us", href: "/contact" }]}
                />
            </div>
        </div>
    );
}
