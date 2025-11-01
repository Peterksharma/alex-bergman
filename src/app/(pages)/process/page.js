import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaCheckCircle, FaClipboardList, FaPencilRuler, FaFileAlt, FaHandshake, FaRocket } from "react-icons/fa";

// Process steps data
const processSteps = [
    {
        id: 1,
        icon: <FaHandshake className="text-5xl text-blue-400" />,
        title: "Initial Consultation",
        description: "We begin with a free consultation to understand your vision, needs, and project goals. This is where we discuss your ideas, budget, timeline, and any specific requirements you have.",
        duration: "30-60 minutes",
        deliverable: "Project overview and initial assessment"
    },
    {
        id: 2,
        icon: <FaClipboardList className="text-5xl text-blue-400" />,
        title: "Site Assessment & Measurements",
        description: "For remodels and additions, we visit your property to take accurate measurements, assess the existing structure, and identify any potential challenges or opportunities.",
        duration: "1-2 hours on-site",
        deliverable: "Site documentation and photos"
    },
    {
        id: 3,
        icon: <FaPencilRuler className="text-5xl text-blue-400" />,
        title: "Design Development",
        description: "We create initial design concepts based on our consultation and site assessment. You'll receive preliminary drawings that bring your vision to life, with opportunities for revisions and refinements.",
        duration: "1-2 weeks",
        deliverable: "Preliminary design drawings"
    },
    {
        id: 4,
        icon: <FaFileAlt className="text-5xl text-blue-400" />,
        title: "Construction Documents",
        description: "Once the design is approved, we develop detailed construction documents including floor plans, elevations, sections, and all technical specifications needed for permitting and construction.",
        duration: "2-4 weeks",
        deliverable: "Complete construction document set"
    },
    {
        id: 5,
        icon: <FaCheckCircle className="text-5xl text-blue-400" />,
        title: "Permit Application Support",
        description: "We prepare all necessary documents for your permit application and can assist with the submission process, ensuring everything meets local building codes and regulations.",
        duration: "Varies by jurisdiction",
        deliverable: "Permit-ready document package"
    },
    {
        id: 6,
        icon: <FaRocket className="text-5xl text-blue-400" />,
        title: "Project Support",
        description: "Even after documents are complete, we're here to answer questions from your contractor, provide clarifications, and ensure your project proceeds smoothly from start to finish.",
        duration: "Throughout construction",
        deliverable: "Ongoing consultation and support"
    }
];

export default function OurProcessPage() {
    return (
        <div className="bg-gray-900 min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
                        Our <span className="text-blue-400">Process</span>
                    </h1>
                    <div className="h-1 w-24 bg-blue-400 mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                        From initial consultation to final construction support, we guide you through every step of the architectural drafting process with professionalism and expertise.
                    </p>
                </div>

                {/* Process Timeline */}
                <div className="relative">
                    {/* Vertical Line (desktop only) */}
                    <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-blue-500 to-blue-400"></div>

                    {/* Process Steps */}
                    <div className="space-y-12">
                        {processSteps.map((step, index) => (
                            <div key={step.id} className={`relative ${index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2'}`}>
                                <Card className={`relative bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'
                                    }`}>
                                    {/* Step Number Badge */}
                                    <div className={`absolute -top-4 -left-4 ${index % 2 === 0 ? 'lg:-left-4' : 'lg:-right-4'} bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg z-10`}>
                                        {step.id}
                                    </div>

                                    <CardHeader>
                                        <div className="flex items-center gap-4 mb-4">
                                            {step.icon}
                                            <CardTitle className="text-2xl font-bold text-white">
                                                {step.title}
                                            </CardTitle>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        <p className="text-gray-300 leading-relaxed text-base">
                                            {step.description}
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-600">
                                            <div>
                                                <p className="text-sm font-semibold text-blue-400 mb-1">Timeline</p>
                                                <p className="text-gray-300">{step.duration}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-blue-400 mb-1">Deliverable</p>
                                                <p className="text-gray-300">{step.deliverable}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Choose Our Process Section */}
                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Why Our Process <span className="text-blue-400">Works</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-xl text-center">
                            <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8 px-4 sm:px-6">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mb-2">Clear Communication</div>
                                <p className="text-gray-300 text-sm sm:text-base">
                                    We keep you informed at every stage, ensuring you understand the process and feel confident in your decisions.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-xl text-center">
                            <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8 px-4 sm:px-6">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mb-2">Attention to Detail</div>
                                <p className="text-gray-300 text-sm sm:text-base">
                                    Every measurement, specification, and detail is carefully documented to ensure accuracy and compliance.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-xl text-center">
                            <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8 px-4 sm:px-6">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mb-2">Proven Results</div>
                                <p className="text-gray-300 text-sm sm:text-base">
                                    With 15+ years of experience and 500+ completed projects, our process delivers consistent, quality results.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center mt-20 p-12 bg-gradient-to-r from-blue-600/10 to-blue-700/10 rounded-xl border border-blue-500/20">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                        Let's discuss your project and how our proven process can bring your vision to life.
                    </p>

                    <a
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-lg"
                    >
                    Schedule Your Free Consultation
                </a>
            </div>
        </div>
    </div >
  );
}