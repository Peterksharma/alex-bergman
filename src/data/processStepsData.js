import { FaCheckCircle, FaClipboardList, FaPencilRuler, FaFileAlt, FaHandshake, FaRocket } from "react-icons/fa";

export const processSteps = [
    {
        id: 1,
        icon: <FaHandshake className="text-5xl" />,
        title: "Initial Consultation",
        description: "Initial consultation to understand vision, needs, and project goals. Discuss ideas, answer questions, determine possible budget and timeline, discuss specific requirements. Minimal consultation fee rebates upon acceptance of a full drafting service.",
        duration: "30-60 minutes",
        deliverable: "Project overview and initial assessment"
    },
    {
        id: 2,
        icon: <FaClipboardList className="text-5xl" />,
        title: "Site Assessment & Measurements",
        description: "Site visit and measurement to create accurate as built drawing. Assess existing structure, identify unique project conditions. Identify potential challenges or opportunities.",
        duration: "1-2 hours on-site",
        deliverable: "Site documentation and photos"
    },
    {
        id: 3,
        icon: <FaPencilRuler className="text-5xl" />,
        title: "Design Development",
        description: "Create accurate as built plan. Create initial design concepts. Provide preliminary drawings. Develop plan through revisions and refinements.",
        duration: "2-3 weeks",
        deliverable: "Preliminary design drawings for project planning and bids"
    },
    {
        id: 4,
        icon: <FaFileAlt className="text-5xl" />,
        title: "Construction Documents",
        description: "Develop detailed construction documents for review by permitting jurisdiction and use by contractor. Include floor plans, framing plans, elevations, sections, technical specifications, project specific notes. Prepare documents for permitting and construction.",
        duration: "1-2 weeks",
        deliverable: "Complete construction document set"
    },
    {
        id: 5,
        icon: <FaCheckCircle className="text-5xl" />,
        title: "Permit Application Support",
        description: "Permitting service available upon request - additional fees apply. Prepare all necessary permit documents. Assist with submission process. Ensure compliance with local building codes and regulations.",
        duration: "Varies by jurisdiction",
        deliverable: "Permit-ready document package"
    },
    {
        id: 6,
        icon: <FaRocket className="text-5xl" />,
        title: "Project Support",
        description: "Answer contractor questions. Provide revisions needed for initial permit approval. Provide clarifications. Provide field revisions - additional fees apply.",
        duration: "Throughout construction",
        deliverable: "Ongoing consultation and support"
    }
];

