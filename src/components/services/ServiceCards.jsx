import { services } from "@/data/services";
import Image from "next/image";
import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ServicesCards() {
  return (
    <div className=" bg-gray-900">
      <div className="container mx-auto px-8 py-8">
        <div className="h-[2px] bg-gray-800 rounded-full"></div>
      </div>
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto px-8">
          <h1 className="text-center text-gray-100 text-4xl font-bold pb-12">
            Our Services
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group relative bg-gray-800 border-gray-700 hover:border-blue-700 transition-all duration-300 overflow-hidden h-64"
              >
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
                {/* <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_0%,rgba(0,0,0,0.25)_100%)] z-[5]"></div>*/}
                <div className="absolute inset-0 flex p-6 z-10 pointer-events-none">
                  <CardTitle className="text-gray-100 text-2xl text-center drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                    {service.name}
                  </CardTitle>
                </div>

                <div className="absolute inset-0 bg-gray-900/95 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out p-6 flex items-center">
                  <p className="text-gray-300 leading-relaxed">
                    {service.description}
                    <Link href={service.link} className="text-blue-400 hover:text-blue-300 underline transition-colors  pointer-events-auto">
                      Learn More
                    </Link>
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
