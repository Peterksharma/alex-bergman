import { FaCheckCircle, FaClipboardList, FaPencilRuler, FaFileAlt, FaHandshake, FaRocket } from "react-icons/fa";

export const processSteps = [
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

