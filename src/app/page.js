import Hero from "@/components/home/hero/Hero";
import Trust from "@/components/home/trust/Trust";
import ServicesCards from "@/components/services/ServiceCards";

export default function Home() {
  return (
    <div>
      <Hero/>
      <Trust />
      <ServicesCards /> 
    </div>
  );
}
