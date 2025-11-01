import { faqData } from "@/components/faq/data/faqData";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

export default function FAQ() {
    return (
        <div className="bg-gray-900 py-12 sm:py-16 lg:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-10 sm:mb-12 lg:mb-16">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
                        Frequently Asked <span className="text-blue-400">Questions</span>
                    </h1>
                    <div className="h-1 w-16 sm:w-20 lg:w-24 bg-blue-400 mx-auto rounded-full mb-4 sm:mb-5 lg:mb-6"></div>
                    <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
                        Have questions? We've got answers. Browse through our most common inquiries below.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <Card className="bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-2xl p-4 sm:p-6">
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
                </Card>

                {/* CTA Section */}
                <div className="text-center mt-8 sm:mt-10 lg:mt-12 p-6 sm:p-7 lg:p-8 bg-gradient-to-r from-blue-600/10 to-blue-700/10 rounded-xl border border-blue-500/20">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                        Still have questions?
                    </h3>
                    <p className="text-gray-300 mb-4 sm:mb-5 lg:mb-6 text-sm sm:text-base">
                        We're here to help! Reach out to us for personalized answers.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base w-full sm:w-auto"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
}