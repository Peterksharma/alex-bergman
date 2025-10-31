import Hero from "@/components/home/hero/Hero";
import TrustCards from "@/components/home/trust/TrustCards";
import ServicesCards from "@/components/services/AllServicesCards";

export default function Home() {
  return (
    <div>
      <Hero/>
      <div className='py-8 bg-gray-900'>
        <TrustCards />
      </div>
      <ServicesCards /> 
    </div>
  );
}
