import { faqData } from "@/data/faqData";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Chapter from "@/components/common/Chapter";
import Reveal from "@/components/common/Reveal";
import SectionHeader from "@/components/common/SectionHeader";
import CTASection from "@/components/common/CTASection";
import SurfaceCard from "@/components/common/SurfaceCard";

export default function FAQList() {
    return (
        <>
            <Chapter tone="paper" grid className="py-12 sm:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        eyebrow="Sheet Q-1 · Specifications"
                        title={<>Frequently Asked <span className="text-tone-accent">Questions</span></>}
                        subtitle="Have questions? We've got answers. Browse through our most common inquiries below."
                        className="mb-10 sm:mb-12 lg:mb-16"
                    />

                    {/* FAQ Accordion */}
                    <Reveal>
                        <SurfaceCard className="p-4 sm:p-6">
                            <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                                {faqData.map((data, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                        className="border border-tone-line/20 bg-tone-bg rounded-lg px-3 sm:px-4 lg:px-6 hover:border-tone-line/40 transition-colors"
                                    >
                                        <AccordionTrigger className="text-base sm:text-lg font-semibold text-tone-heading hover:text-tone-accent transition-colors py-4 sm:py-5 lg:py-6 hover:no-underline">
                                            <span className="text-left pr-2 sm:pr-4">{data.question}</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-tone-body text-sm sm:text-base leading-relaxed pb-4 sm:pb-5 lg:pb-6 pt-2">
                                            {data.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </SurfaceCard>
                    </Reveal>
                </div>
            </Chapter>

            <Chapter tone="ink" grid className="py-12 sm:py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <CTASection
                        className="mt-0"
                        heading="Still have questions?"
                        text="We're here to help! Reach out to us for personalized answers."
                        actions={[{ label: "Contact Us", href: "/contact" }]}
                    />
                </div>
            </Chapter>
        </>
    );
}
