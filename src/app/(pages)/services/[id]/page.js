import { services } from "@/components/services/data/servicesData";
import SingleService from "@/components/services/SingleService";

export default async function ServicePage({ params }) {
    const { id } = await params;

    if (!id) {
        return <div>Loading the project...</div>
    }

    const service = services.find(s => s.url === `/services/${id}`)

    if (!service) {
        return <div>No service found.</div>
    }

    return (
        <div>
            <SingleService service={service} />
        </div>
    )
}