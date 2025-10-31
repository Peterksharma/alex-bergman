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
        <div className="bg-gray-900 py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
                        Frequently Asked <span className="text-blue-400">Questions</span>
                    </h1>
                    <div className="h-1 w-24 bg-blue-400 mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                        Have questions? We've got answers. Browse through our most common inquiries below.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <Card className="bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-2xl p-6">
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqData.map((data, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border-0 bg-gray-900/50 rounded-lg px-6 backdrop-blur-sm hover:bg-gray-900/70 transition-colors"
                            >
                                <AccordionTrigger className="text-lg font-semibold text-white hover:text-blue-400 transition-colors py-6 hover:no-underline">
                                    <span className="text-left pr-4">{data.question}</span>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 text-base leading-relaxed pb-6 pt-2">
                                    {data.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Card>

                {/* CTA Section */}
                <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-600/10 to-blue-700/10 rounded-xl border border-blue-500/20">
                    <h3 className="text-2xl font-bold text-white mb-3">
                        Still have questions?
                    </h3>
                    <p className="text-gray-300 mb-6">
                        We're here to help! Reach out to us for personalized answers.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
}