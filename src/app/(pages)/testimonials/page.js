import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

// Sample testimonials data - replace with your actual data
const testimonials = [
    {
        id: 1,
        name: "John Smith",
        project: "Custom Home Design",
        rating: 5,
        text: "A.R.Bergman Drafting exceeded our expectations. Alex was professional, responsive, and delivered exactly what we needed for our custom home. The attention to detail in the construction documents was impressive.",
        date: "2024"
    },
    {
        id: 2,
        name: "Sarah Johnson",
        project: "Garage Addition",
        rating: 5,
        text: "Working with Alex was a pleasure. He listened to our needs and created the perfect design for our new garage. The permit process was smooth thanks to his thorough documentation.",
        date: "2024"
    },
    {
        id: 3,
        name: "Mike Davis",
        project: "Home Remodel",
        rating: 5,
        text: "Outstanding service! Alex helped us reimagine our living space with a complete remodel design. His expertise and friendly approach made the entire process stress-free.",
        date: "2023"
    },
    {
        id: 4,
        name: "Emily Rodriguez",
        project: "ADU Design",
        rating: 5,
        text: "Alex designed a beautiful ADU for our property. His knowledge of local codes and regulations saved us time and money. Highly recommend his services!",
        date: "2023"
    },
    {
        id: 5,
        name: "David Chen",
        project: "Kitchen Addition",
        rating: 5,
        text: "Professional, affordable, and fast! Alex delivered high-quality plans that our contractor praised. We couldn't be happier with the results.",
        date: "2024"
    },
    {
        id: 6,
        name: "Lisa Martinez",
        project: "Conceptual Design",
        rating: 5,
        text: "Alex's conceptual design service was exactly what we needed to get started. The plans were clear, detailed, and helped us get accurate bids from contractors.",
        date: "2023"
    }
];

export default function TestimonialsPage() {
    const renderStars = (rating) => {
        return (
            <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                    <FaStar
                        key={index}
                        className={`${index < rating ? "text-yellow-400" : "text-gray-600"
                            } text-lg`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="bg-gray-900 min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
                        Client <span className="text-blue-400">Testimonials</span>
                    </h1>
                    <div className="h-1 w-24 bg-blue-400 mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                        Don't just take our word for it. Hear what our satisfied clients have to say about their experience working with A.R.Bergman Drafting.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <Card
                            key={testimonial.id}
                            className="bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            <CardHeader className="pb-4">
                                {/* Quote Icon */}
                                <div className="flex justify-between items-start mb-4">
                                    <FaQuoteLeft className="text-blue-400 text-3xl opacity-50" />
                                    {renderStars(testimonial.rating)}
                                </div>

                                {/* Client Info */}
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-blue-400 font-medium text-sm">
                                        {testimonial.project}
                                    </p>
                                </div>
                            </CardHeader>

                            <CardContent>
                                {/* Testimonial Text */}
                                <p className="text-gray-300 leading-relaxed mb-4">
                                    &quot;{testimonial.text}&quot;
                                </p>

                                {/* Date */}
                                <p className="text-gray-500 text-sm">
                                    {testimonial.date}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16 p-12 bg-gradient-to-r from-blue-600/10 to-blue-700/10 rounded-xl border border-blue-500/20">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Start Your Project?
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                        Join our growing list of satisfied clients. Let us help bring your vision to life with professional drafting services.
                    </p>

                    <a
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-lg"
                    >
                    Get Your Free Consultation
                </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                    <div className="text-4xl font-bold text-blue-400 mb-2">15+</div>
                    <div className="text-gray-300 font-medium">Years Experience</div>
                </div>
                <div className="p-6">
                    <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
                    <div className="text-gray-300 font-medium">Happy Clients</div>
                </div>
                <div className="p-6">
                    <div className="text-4xl font-bold text-blue-400 mb-2">5.0</div>
                    <div className="text-gray-300 font-medium">Average Rating</div>
                </div>
            </div>
        </div>
        </div >
    );
}