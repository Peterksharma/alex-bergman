import Hero from "@/components/home/hero/Hero";
import TrustCards from "@/components/home/trust/TrustCards";
import ServicesCards from "@/components/services/AllServicesCards";
import Chapter from "@/components/common/Chapter";
import ServiceAreaStrip from "@/components/common/ServiceAreaStrip";

export default function Home() {
  return (
    <div>
      <Hero />
      <ServiceAreaStrip />
      <Chapter tone="paper" className="py-8">
        <TrustCards />
      </Chapter>
      <ServicesCards headingAs="h2" />
    </div>
  );
}
