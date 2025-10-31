import Image from "next/image";
import Link from "next/link";
import { projects } from "@/components/portfolio/projects/data/projectData";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";

export default function Portfolio() {
  function renderImageGrid() {
    return projects.map((project, index) => (
      <Link key={index} href={project.url} className="group">
        <Card className='transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 bg-gradient-to-br from-gray-700 to-gray-800 flex flex-col h-full overflow-hidden border-0 hover:scale-105'>
          {/* Image Container */}
          <div className="relative w-full h-[280px] overflow-hidden">
            <Image
              src={`/assets/portfolio/${project.folder}/1.jpg`}
              alt={`${project.name} - Preview`}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Hover Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="bg-blue-600 rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                <FaArrowRight className="text-white text-xl" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-grow">
            <CardTitle className='text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors'>
              {project.name}
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm">
              Click to view project details
            </CardDescription>
          </div>
        </Card>
      </Link>
    ))
  }

  return (
    <div className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Our <span className="text-blue-400">Portfolio</span>
          </h1>
          <div className="h-1 w-24 bg-blue-400 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Explore our collection of completed projects. Click on any card to see detailed information and additional images.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {renderImageGrid()}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <Button
            asChild
            className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <Link href="/contact" className="flex items-center gap-3">
              Start Your Project
              <FaArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}